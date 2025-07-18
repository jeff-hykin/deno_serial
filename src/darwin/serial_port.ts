import { cString, bigIntTo64IntLittleEndianBytes, int64LittleEndianBytesToBigInt } from "../common/util.ts";
import { getDarwinLibSystem, UnixError, unwrap, CREAD, CLOCAL, PARENB, PARODD, CSTOPB, CSIZE, CS7, CS8, CRTSCTS, IXON, IXOFF, IXANY, ICANON, ECHO, ECHOE, ISIG, VMIN, VTIME, TCSANOW, F_SETFL, O_RDWR, O_NOCTTY, O_NDELAY, OPOST, INPCK, IGNPAR, } from "./system_apis/lib_system.ts";
import {
  SerialOptions,
  SerialPort,
} from "../common/serial_port.ts";

export class SerialPortDarwin implements SerialPort, AsyncDisposable {
  name?: string;
  options?: SerialOptions;
  _fd?: number;
  _state: "opened" | "closed" | "uninitialized" = "uninitialized";
  _bufferSize?: number;

  constructor(name: string) {
    this._darwinLibc = getDarwinLibSystem()
    this.name = name
  }
  
  async open(options: SerialOptions) {
    this.options = options
    if (this._state == "opened") {
      throw new Error("Port is already open");
    }

    if (options.dataBits && options.dataBits !== 7 && options.dataBits !== 8) {
      throw new TypeError("Invalid dataBits, must be one of: 7, 8");
    }

    if (options.stopBits && options.stopBits !== 1 && options.stopBits !== 2) {
      throw new TypeError("Invalid stopBits, must be one of: 1, 2");
    }

    if (options.bufferSize === 0) {
      throw new TypeError("Invalid bufferSize, must be greater than 0");
    }

    if (
      options.flowControl && options.flowControl !== "none" &&
      options.flowControl !== "software" && options.flowControl !== "hardware"
    ) {
      throw new TypeError(
        "Invalid flowControl, must be one of: none, software, hardware",
      );
    }

    if (
      options.parity && options.parity !== "none" &&
      options.parity !== "even" && options.parity !== "odd"
    ) {
      throw new TypeError(
        "Invalid parity, must be one of: none, even, odd",
      );
    }
    this.options = options;
    
    const shouldCreate = 0;
    const fd = await this._darwinLibc.open(
      cString(this.name),
      Number(O_RDWR | O_NOCTTY | O_NDELAY),
      shouldCreate,
    );
    unwrap(fd);
    this._fd = fd;
    
    // 
    // set all the termios settings
    // 
    var termiosStruct = new Uint8Array(72)
    unwrap(this._darwinLibc.tcgetattr(fd, termiosStruct));

    const timeoutInSeconds = options.timeoutSeconds ?? 2
    let timeoutInTenthsOfASecond = Math.round(timeoutInSeconds*10)
    if (timeoutInTenthsOfASecond < 1) {
        console.warn(`Given timeout of ${timeoutInSeconds} seconds, clamping to 0.1 seconds`)
        timeoutInTenthsOfASecond = 1
    } else if (timeoutInTenthsOfASecond > 255) {
        console.warn(`Given timeout of ${timeoutInSeconds} seconds larger than max of 25.5 seconds, clamping to 25.5 seconds`)
        timeoutInTenthsOfASecond = 255
    }
    
    // 
    // default termios struct bits
    // 
    var iflagAsArray   = [0,0,0,0,0,0,0,0];
    var oflagAsArray   = [0,0,0,0,0,0,0,0,];
    var cflagAsArray   = [0,203,0,0,0,0,0,0,];
    var lflagAsArray   = [0,0,0,0,0,0,0,0];
    var ccAsArray      = [4, 255, 255, 127, 23, 21, 18, 255, 3, 28, 26, 25, 17, 19, 22, 15, 0, 20, 20, 255];
    var unknownAsArray = [0,0,0,0];
    var ispeedAsArray  = [128,37,0,0,0,0,0,0]; // [128,37,0,0,0,0,0,0] means baudRate = 9600, (cfsetispeed() below changes this though)
    var ospeedAsArray  = [128,37,0,0,0,0,0,0];
    var termiosStruct = new Uint8Array([
        ...iflagAsArray, 
        ...oflagAsArray, 
        ...cflagAsArray, 
        ...lflagAsArray, 
        ...ccAsArray, 
        ...unknownAsArray,
        ...ispeedAsArray,
        ...ospeedAsArray,
    ])
    // set: baudRate
    unwrap(this._darwinLibc.cfsetispeed(termiosStruct, options.baudRate));
    unwrap(this._darwinLibc.cfsetospeed(termiosStruct, options.baudRate));
    
    // 
    // extract the termios struct values (it was just overwritten)
    // 
    var iflag   = int64LittleEndianBytesToBigInt(termiosStruct.slice(0,8));
    var oflag   = int64LittleEndianBytesToBigInt(termiosStruct.slice(8,16));
    var cflag   = int64LittleEndianBytesToBigInt(termiosStruct.slice(16,24));
    var lflag   = int64LittleEndianBytesToBigInt(termiosStruct.slice(24,32));
    var cc      = termiosStruct.slice(32,52);
    // var cc      = [4, 255, 255, 127, 23, 21, 18, 255, 3, 28, 26, 25, 17, 19, 22, 15, 0, 20, 20, 255];
    var unknown = termiosStruct.slice(52,56);
    var ispeed  = termiosStruct.slice(56,64);
    var ospeed  = termiosStruct.slice(64,72);
    
    // 
    // manipulate the termios struct values
    // 
    cc[Number(VMIN)]    = 0;
    // set: timeout
    cc[Number(VTIME)]   = timeoutInTenthsOfASecond;

    // set: size
    cflag &= ~CSIZE;       // Clear data size bits
    switch (options.dataBits) {
        case 7:
            cflag |= CS7;
            break;
        case 8:
            cflag |= CS8;
            break;
    }

    // set: parity
    switch (options.parity) {
        case "odd":
            cflag |= PARENB; // parity enable = on
            cflag |= PARODD; // odd parity
            
            // iflag |= INPCK; // not sure what this does/did
            // iflag &= ~IGNPAR;
            break;
        case "even":
            cflag |= PARENB; // parity enable = on
            cflag &= ~PARODD; // even parity
            
            // iflag |= INPCK;
            // iflag &= ~IGNPAR;
            break;
        default:
            cflag &= ~PARENB;      // Disable parity
            cflag &= ~(PARENB | PARODD);
            
            // iflag &= ~INPCK;
            // iflag |= IGNPAR;
            break;
    }
    
    // set: stop bits
    switch (options.stopBits) {
        case 1:
            cflag &= ~CSTOPB;
            break;
        case 2:
            cflag |= CSTOPB;
            break;
    }

    // set: flow control
    switch (options.flowControl) {
        case "software":
            cflag &= ~CRTSCTS;
            iflag |= IXON | IXOFF;
            break;
        case "hardware":
            cflag |= CRTSCTS;
            iflag &= ~(IXON | IXOFF | IXANY);
            break;
        default:
            cflag &= ~CRTSCTS;
            iflag &= ~(IXON | IXOFF | IXANY);
    }
    
    // turn on READ & ignore ctrl lines
    cflag |= CREAD | CLOCAL;
    // make raw
    lflag &= ~(ICANON | ECHO | ECHOE | ISIG);

    var termiosStruct = new Uint8Array([
        ...bigIntTo64IntLittleEndianBytes(iflag),
        ...bigIntTo64IntLittleEndianBytes(oflag),
        ...bigIntTo64IntLittleEndianBytes(cflag),
        ...bigIntTo64IntLittleEndianBytes(lflag),
        ...cc,
        ...unknown,
        ...ispeed,
        ...ospeed,
    ])
    unwrap(this._darwinLibc.tcsetattr(fd, Number(TCSANOW), termiosStruct));

    this._state = "opened";
    this._bufferSize = options.bufferSize ?? 255;
  }

  write(strOrBytes: string | Uint8Array): Promise<number> {
    if (this._state == "closed" || this._state == "uninitialized") {
        throw new Error(`Can't write to port because port is ${this._state}`);
    }
    if (typeof strOrBytes === "string") {
      strOrBytes = new TextEncoder().encode(strOrBytes);
    }
    return this._darwinLibc.write(this._fd, strOrBytes, strOrBytes.byteLength)
  }
  
  async read(): Promise<Uint8Array> {
    if (this._state == "closed" || this._state == "uninitialized") {
        throw new Error(`Can't read from port because port is ${this._state}`);
    }
    const buf = new Uint8Array(this._bufferSize+1);
    while (true) {
        let howManyBytes = unwrap(this._darwinLibc.read(this._fd, buf, this._bufferSize));
        if (typeof howManyBytes === "bigint") {
            howManyBytes = Number(howManyBytes)
        }
        if (howManyBytes > 0) {
            return buf.subarray(0,howManyBytes);
        } else {
            await new Promise(r=>setTimeout(r,this?.options.waitTime??50))
        }
    }
  }
  
  close() {
    if (this._state !== "opened") {
      throw new Error("Port is not open");
    }
    unwrap(this._darwinLibc.close(this._fd));
    return Promise.resolve();
  }
  
  async [Symbol.asyncDispose]() {
    await this.close();
  }

  [Symbol.for("Deno.customInspect")](
    inspect: typeof Deno.inspect,
    options: Deno.InspectOptions,
  ) {
    return `SerialPort ${
      inspect({ name: this.name, state: this._state }, options)
    }`;
  }
}
