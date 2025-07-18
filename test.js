// src/common/util.ts
function cString(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str + "\0");
}
function bigIntTo64IntLittleEndianBytes(bigInt) {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setBigUint64(0, bigInt, true);
  const uint8Array = new Uint8Array(buffer);
  return uint8Array;
}
function int64LittleEndianBytesToBigInt(uint8Array) {
  if (uint8Array instanceof Array) {
    if (uint8Array.length != 8) {
      throw new Error("Invalid input: Array must have exactly 8 elements for int64LittleEndianBytesToBigInt()");
    }
    uint8Array = new Uint8Array(uint8Array);
  }
  const buffer = uint8Array.buffer;
  const view = new DataView(buffer);
  const bigInt = view.getBigUint64(0, true);
  return bigInt;
}

// src/darwin/settings.ts
var settings = {
  corefoundationPath: "/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation",
  iokitPath: "/System/Library/Frameworks/IOKit.framework/IOKit",
  darwinLibcPath: "libSystem.dylib"
};

// src/darwin/system_apis/lib_system.ts
var darwinLibSystem;
var getDarwinLibSystem = (pathToLibSystem = null) => {
  return darwinLibSystem = darwinLibSystem || Deno.dlopen(pathToLibSystem || settings.darwinLibcPath, {
    open: {
      parameters: ["buffer", "i32", "i32"],
      result: "i32"
      // nonblocking: true,
    },
    ioctl: {
      parameters: ["i32", "i64"],
      result: "i32"
    },
    ioctl1: {
      parameters: ["i32", "i64", "buffer"],
      result: "i32",
      name: "ioctl"
    },
    tcgetattr: {
      parameters: ["i32", "buffer"],
      result: "i32"
    },
    tcsetattr: {
      parameters: ["i32", "i32", "buffer"],
      result: "i32"
    },
    cfmakeraw: {
      parameters: ["buffer"],
      result: "void"
    },
    fcntl: {
      parameters: ["i32", "i32", "i32"],
      result: "i32"
    },
    strerror: {
      parameters: ["i32"],
      result: "pointer"
    },
    aio_read: {
      parameters: ["buffer"],
      result: "i32"
    },
    aio_write: {
      parameters: ["buffer"],
      result: "i32"
    },
    aio_suspend: {
      parameters: ["buffer", "i32", "buffer"],
      result: "i32",
      nonblocking: true
    },
    aio_cancel: {
      parameters: ["i32", "buffer"],
      result: "i32"
    },
    aio_error: {
      parameters: ["buffer"],
      result: "i32"
    },
    aio_return: {
      parameters: ["buffer"],
      result: "i64"
    },
    cfsetospeed: {
      parameters: ["buffer", "i32"],
      result: "i32"
    },
    cfsetispeed: {
      parameters: ["buffer", "i32"],
      result: "i32"
    },
    tcflush: {
      parameters: ["i32", "i32"],
      result: "i32"
    },
    close: {
      parameters: ["i32"],
      result: "i32"
    },
    read: {
      parameters: ["i32", "buffer", "i32"],
      result: "i32"
      // nonblocking: true,
    },
    write: {
      parameters: ["i32", "buffer", "i32"],
      result: "i32"
      // nonblocking: true,
    }
  }).symbols;
};
var UnixError = class extends Error {
  errno;
  constructor(errno) {
    getDarwinLibSystem();
    const str = darwinLibSystem.strerror(errno);
    const jstr = Deno.UnsafePointerView.getCString(str);
    super(`UnixError: ${errno}: ${jstr}`);
    this.errno = errno;
  }
};
function unwrap(result, error) {
  if (result < 0) {
    let errno;
    if (error !== void 0) {
      errno = error;
    } else {
      const lib = Deno.dlopen("libSystem.dylib", {
        errno: {
          type: "i32"
        }
      });
      errno = lib.symbols.errno;
      lib.close();
    }
    throw new UnixError(errno);
  }
  return result;
}
var CREAD = 0b000000100000000000n;
var CLOCAL = 0b001000000000000000n;
var PARENB = 0b000001000000000000n;
var PARODD = 0b000010000000000000n;
var CSTOPB = 0b000000010000000000n;
var CSIZE = 0b000000001100000000n;
var CS7 = 0b000000001000000000n;
var CS8 = 0b000000001100000000n;
var CRTSCTS = 0b110000000000000000n;
var IXON = 0b000000001000000000n;
var IXOFF = 0b000000010000000000n;
var IXANY = 0b000000100000000000n;
var ICANON = 0b000000000100000000n;
var ECHO = 0b000000000000001000n;
var ECHOE = 0b000000000000000010n;
var ISIG = 0b000000000010000000n;
var VMIN = 0b000000000000010000n;
var VTIME = 0b000000000000010001n;
var TCSANOW = 0b000000000000000000n;
var O_RDWR = 0b000000000000000010n;
var O_NOCTTY = 0b100000000000000000n;
var O_NDELAY = 0b000000000000000100n;

// src/darwin/serial_port.ts
var SerialPortDarwin = class {
  name;
  options;
  _fd;
  _state = "uninitialized";
  _bufferSize;
  constructor(name) {
    this._darwinLibc = getDarwinLibSystem();
    this.name = name;
  }
  async open(options) {
    this.options = options;
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
    if (options.flowControl && options.flowControl !== "none" && options.flowControl !== "software" && options.flowControl !== "hardware") {
      throw new TypeError(
        "Invalid flowControl, must be one of: none, software, hardware"
      );
    }
    if (options.parity && options.parity !== "none" && options.parity !== "even" && options.parity !== "odd") {
      throw new TypeError(
        "Invalid parity, must be one of: none, even, odd"
      );
    }
    this.options = options;
    const shouldCreate = 0;
    const fd = await this._darwinLibc.open(
      cString(this.name),
      Number(O_RDWR | O_NOCTTY | O_NDELAY),
      shouldCreate
    );
    unwrap(fd);
    this._fd = fd;
    var termiosStruct = new Uint8Array(72);
    unwrap(this._darwinLibc.tcgetattr(fd, termiosStruct));
    const timeoutInSeconds = options.timeoutSeconds ?? 2;
    let timeoutInTenthsOfASecond = Math.round(timeoutInSeconds * 10);
    if (timeoutInTenthsOfASecond < 1) {
      console.warn(`Given timeout of ${timeoutInSeconds} seconds, clamping to 0.1 seconds`);
      timeoutInTenthsOfASecond = 1;
    } else if (timeoutInTenthsOfASecond > 255) {
      console.warn(`Given timeout of ${timeoutInSeconds} seconds larger than max of 25.5 seconds, clamping to 25.5 seconds`);
      timeoutInTenthsOfASecond = 255;
    }
    var iflagAsArray = [0, 0, 0, 0, 0, 0, 0, 0];
    var oflagAsArray = [0, 0, 0, 0, 0, 0, 0, 0];
    var cflagAsArray = [0, 203, 0, 0, 0, 0, 0, 0];
    var lflagAsArray = [0, 0, 0, 0, 0, 0, 0, 0];
    var ccAsArray = [4, 255, 255, 127, 23, 21, 18, 255, 3, 28, 26, 25, 17, 19, 22, 15, 0, 20, 20, 255];
    var unknownAsArray = [0, 0, 0, 0];
    var ispeedAsArray = [128, 37, 0, 0, 0, 0, 0, 0];
    var ospeedAsArray = [128, 37, 0, 0, 0, 0, 0, 0];
    var termiosStruct = new Uint8Array([
      ...iflagAsArray,
      ...oflagAsArray,
      ...cflagAsArray,
      ...lflagAsArray,
      ...ccAsArray,
      ...unknownAsArray,
      ...ispeedAsArray,
      ...ospeedAsArray
    ]);
    unwrap(this._darwinLibc.cfsetispeed(termiosStruct, options.baudRate));
    unwrap(this._darwinLibc.cfsetospeed(termiosStruct, options.baudRate));
    var iflag = int64LittleEndianBytesToBigInt(termiosStruct.slice(0, 8));
    var oflag = int64LittleEndianBytesToBigInt(termiosStruct.slice(8, 16));
    var cflag = int64LittleEndianBytesToBigInt(termiosStruct.slice(16, 24));
    var lflag = int64LittleEndianBytesToBigInt(termiosStruct.slice(24, 32));
    var cc = termiosStruct.slice(32, 52);
    var unknown = termiosStruct.slice(52, 56);
    var ispeed = termiosStruct.slice(56, 64);
    var ospeed = termiosStruct.slice(64, 72);
    cc[Number(VMIN)] = 0;
    cc[Number(VTIME)] = timeoutInTenthsOfASecond;
    cflag &= ~CSIZE;
    switch (options.dataBits) {
      case 7:
        cflag |= CS7;
        break;
      case 8:
        cflag |= CS8;
        break;
    }
    switch (options.parity) {
      case "odd":
        cflag |= PARENB;
        cflag |= PARODD;
        break;
      case "even":
        cflag |= PARENB;
        cflag &= ~PARODD;
        break;
      default:
        cflag &= ~PARENB;
        cflag &= ~(PARENB | PARODD);
        break;
    }
    switch (options.stopBits) {
      case 1:
        cflag &= ~CSTOPB;
        break;
      case 2:
        cflag |= CSTOPB;
        break;
    }
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
    cflag |= CREAD | CLOCAL;
    lflag &= ~(ICANON | ECHO | ECHOE | ISIG);
    var termiosStruct = new Uint8Array([
      ...bigIntTo64IntLittleEndianBytes(iflag),
      ...bigIntTo64IntLittleEndianBytes(oflag),
      ...bigIntTo64IntLittleEndianBytes(cflag),
      ...bigIntTo64IntLittleEndianBytes(lflag),
      ...cc,
      ...unknown,
      ...ispeed,
      ...ospeed
    ]);
    unwrap(this._darwinLibc.tcsetattr(fd, Number(TCSANOW), termiosStruct));
    this._state = "opened";
    this._bufferSize = options.bufferSize ?? 255;
  }
  write(strOrBytes) {
    if (this._state == "closed" || this._state == "uninitialized") {
      throw new Error(`Can't write to port because port is ${this._state}`);
    }
    if (typeof strOrBytes === "string") {
      strOrBytes = new TextEncoder().encode(strOrBytes);
    }
    return this._darwinLibc.write(this._fd, strOrBytes, strOrBytes.byteLength);
  }
  async read() {
    if (this._state == "closed" || this._state == "uninitialized") {
      throw new Error(`Can't read from port because port is ${this._state}`);
    }
    const buf = new Uint8Array(this._bufferSize + 1);
    while (true) {
      let howManyBytes = unwrap(this._darwinLibc.read(this._fd, buf, this._bufferSize));
      if (typeof howManyBytes === "bigint") {
        howManyBytes = Number(howManyBytes);
      }
      if (howManyBytes > 0) {
        return buf.subarray(0, howManyBytes);
      } else {
        await new Promise((r) => setTimeout(r, this?.options.waitTime ?? 50));
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
  [Symbol.for("Deno.customInspect")](inspect, options) {
    return `SerialPort ${inspect({ name: this.name, state: this._state }, options)}`;
  }
};
export {
  SerialPortDarwin
};
