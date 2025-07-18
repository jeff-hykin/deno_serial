import type { SerialPort, SerialOptions } from "../common/serial_port.ts"
import { getBit, setBit } from "../common/util.ts"
export * as Comm from "./system_apis/api/Devices/Communication.ts";
export * as Foundation from "./system_apis/api/Foundation.ts";
export * as Fs from "./system_apis/api/Storage/FileSystem.ts";
export { OverlappedPromise } from "./system_apis/overlapped.ts";
export { unwrap } from "./system_apis/util.ts";

export enum ClearBuffer {
    INPUT,
    OUTPUT,
    ALL,
}

export enum DataBits {
    FIVE = 5,
    SIX = 6,
    SEVEN = 7,
    EIGHT = 8,
}

export enum Parity {
    NONE = 0,
    ODD = 1,
    EVEN = 2,
}

export enum StopBits {
    ONE = 0,
    TWO = 2,
}

export enum FlowControl {
    NONE,
    SOFTWARE,
    HARDWARE,
}

const fBinary            = 0b0000_0000_0000_0001
// const         fParity = 0b0000_0000_0000_0010
const fOutxCtsFlow       = 0b0000_0000_0000_0100
const fOutxDsrFlow       = 0b0000_0000_0000_1000
const fDtrControl0       = 0b0000_0000_0001_0000
const fDtrControl1       = 0b0000_0000_0010_0000
const fDsrSensitivity    = 0b0000_0000_0100_0000
const fOutX              = 0b0000_0001_0000_0000
const fInX               = 0b0000_0010_0000_0000
const fErrorChar         = 0b0000_0100_0000_0000
const fNull              = 0b0000_1000_0000_0000
const fRtsControl0       = 0b0001_0000_0000_0000
const fRtsControl1       = 0b0010_0000_0000_0000
// const     fRtsControl = 0b0011_0000_0000_0000
const fAbortOnError      = 0b0100_0000_0000_0000

function flowControlToDcb(flowControl: FlowControl, dcb: Comm.DCBView) {
    let bits = dcb._bitfield
    switch (flowControl) {
        case FlowControl.NONE:
            bits = setBit(bits, fOutxCtsFlow, false)
            bits = setBit(bits, fRtsControl0, false)
            bits = setBit(bits, fRtsControl1, false)
            bits = setBit(bits, fOutX, false)
            bits = setBit(bits, fInX, false)
            break
        case FlowControl.SOFTWARE:
            bits = setBit(bits, fOutxCtsFlow, true)
            bits = setBit(bits, fRtsControl0, false)
            bits = setBit(bits, fRtsControl1, false)
            bits = setBit(bits, fOutX, true)
            bits = setBit(bits, fInX, true)
            break
        case FlowControl.HARDWARE:
            bits = setBit(bits, fOutxCtsFlow, false)
            bits = setBit(bits, fRtsControl0, true)
            bits = setBit(bits, fRtsControl1, false)
            bits = setBit(bits, fOutX, false)
            bits = setBit(bits, fInX, false)
            break
    }
    dcb._bitfield = bits
}

function dcbToFlowControl(dcb: Comm.DCBView) {
    const bits = dcb._bitfield
    if (getBit(bits, fOutxCtsFlow)) {
        return FlowControl.SOFTWARE
    } else if (getBit(bits, fRtsControl0)) {
        return FlowControl.HARDWARE
    } else {
        return FlowControl.NONE
    }
}

let comstat : Uint8Array
export class SerialPortWin implements SerialPort {
    name?: string;
    options?: SerialOptions;
    _handle?: Deno.PointerValue
    _timeout = 2
    __dcb?: Comm.DCBView

    constructor(name: string) {
        this.name = name
    }
    
    open(options: SerialOptions) {
        this.options = options
        const windowsOptions = {...options}
        if (!comstat) {
            comstat = Comm.allocCOMSTAT()
        }

        //
        // translate the standard options into windows options
        //
        if (windowsOptions.flowControl && windowsOptions.flowControl !== "none" && windowsOptions.flowControl !== "software" && windowsOptions.flowControl !== "hardware") {
            throw new TypeError("Invalid flowControl, must be one of: none, software, hardware")
        }
        windowsOptions.stopBits = windowsOptions.stopBits == 1 ? StopBits.ONE : StopBits.TWO
        windowsOptions.flowControl =
            {
                none: FlowControl.NONE,
                software: FlowControl.SOFTWARE,
                hardware: FlowControl.HARDWARE,
            }[windowsOptions.flowControl||"none"]
        windowsOptions.parity =
            {
                none: Parity.NONE,
                even: Parity.EVEN,
                odd: Parity.ODD,
            }[windowsOptions.parity||"none"]
        windowsOptions.timeout = windowsOptions.timeoutSeconds ?? 2

        // start the normal handling
        this._handle = Fs.CreateFileA("\\\\.\\" + this.name, Fs.FILE_GENERIC_READ | Fs.FILE_GENERIC_WRITE, 0, null, Fs.OPEN_EXISTING, Fs.FILE_ATTRIBUTE_NORMAL | Fs.FILE_FLAG_OVERLAPPED, null)!

        const dcb = Comm.allocDCB()
        unwrap(Comm.GetCommState(this._handle, dcb))
        const dv = new Comm.DCBView(dcb)
        dv.XonChar = 17
        dv.XoffChar = 19
        dv.ErrorChar = 0
        dv.EofChar = 26
        let bitfield = dv._bitfield
        bitfield = setBit(bitfield, fBinary, true)
        bitfield = setBit(bitfield, fOutxDsrFlow, false)
        bitfield = setBit(bitfield, fDtrControl0, false)
        bitfield = setBit(bitfield, fDtrControl1, false)
        bitfield = setBit(bitfield, fDsrSensitivity, false)
        bitfield = setBit(bitfield, fErrorChar, false)
        bitfield = setBit(bitfield, fNull, false)
        bitfield = setBit(bitfield, fAbortOnError, false)

        dv.BaudRate = windowsOptions.baudRate
        dv.ByteSize = windowsOptions.dataBits || DataBits.EIGHT
        dv.StopBits = windowsOptions.stopBits || StopBits.ONE
        dv.Parity = windowsOptions.parity || Parity.NONE
        flowControlToDcb(windowsOptions.flowControl as FlowControl, dv)
        Comm.SetCommState(this._handle, dcb)

        this.__dcb = dv

        this.timeout = windowsOptions.timeout ?? 0
        
        return Promise.resolve()
    }

    get _dcb() {
        if (!this._handle || !this.__dcb) {
            throw new Error("Port is not open")
        }
        unwrap(Comm.GetCommState(this._handle, this.__dcb.buffer))
        return this.__dcb
    }

    set _dcb(dcb: Comm.DCBView) {
        if (!this._handle) {
            throw new Error("Port is not open")
        }
        unwrap(Comm.SetCommState(this._handle, dcb.buffer))
    }

    get baudRate(): number {
        return this._dcb.BaudRate
    }

    set baudRate(value: number) {
        const dcb = this._dcb
        dcb.BaudRate = value
        this._dcb = dcb
    }

    get dataBits(): DataBits {
        return this._dcb.ByteSize
    }

    set dataBits(value: DataBits) {
        const dcb = this._dcb
        dcb.ByteSize = value
        this._dcb = dcb
    }

    set stopBits(value: StopBits) {
        const dcb = this._dcb
        dcb.StopBits = value
        this._dcb = dcb
    }

    get stopBits(): StopBits {
        return this._dcb.StopBits
    }

    get parity(): Parity {
        return this._dcb.Parity
    }

    set parity(value: Parity) {
        const dcb = this._dcb
        dcb.Parity = value
        this._dcb = dcb
    }

    get flowControl(): FlowControl {
        const dcb = this._dcb
        return dcbToFlowControl(dcb)
    }

    set flowControl(value: FlowControl) {
        const dcb = this._dcb
        flowControlToDcb(value, dcb)
        this._dcb = dcb
    }

    get timeout() {
        return this._timeout
    }

    set timeout(seconds: number) {
        if (!this._handle) {
            throw new Error("Port is not open")
        }
        const ms = seconds * 1000
        const timeouts = Comm.allocCOMMTIMEOUTS({
            ReadTotalTimeoutConstant: ms,
        })
        Comm.SetCommTimeouts(this._handle, timeouts)
        this._timeout = ms
    }

    writeRequestToSend(level: boolean): void {
        if (!this._handle) {
            throw new Error("Port is not open")
        }
        Comm.EscapeCommFunction(this._handle, level ? 3 : 4)
    }

    writeDataTerminalReady(level: boolean): void {
        if (!this._handle) {
            throw new Error("Port is not open")
        }
        Comm.EscapeCommFunction(this._handle, level ? 5 : 6)
    }

    // get #modemStatus() {
    //     if (!this._handle) {
    //         throw new Error("Port is not open")
    //     }
    //     const status = new Uint32Array(1)
    //     unwrap(Comm.GetCommModemStatus(this._handle, new Uint8Array(status.buffer)))
    //     return status[0]
    // }

    // readClearToSend(): boolean {
    //     return (this._modemStatus & 0x0010) !== 0
    // }

    // readDataSetReady(): boolean {
    //     return (this._modemStatus & 0x0020) !== 0
    // }

    // readRingIndicator(): boolean {
    //     return (this._modemStatus & 0x0040) !== 0
    // }

    // readCarrierDetect(): boolean {
    //     return (this._modemStatus & 0x0080) !== 0
    // }

    bytesToRead(): number {
        if (!this._handle) {
            throw new Error("Port is not open")
        }
        const errors = new Uint32Array(1)
        Comm.ClearCommError(this._handle, new Uint8Array(errors.buffer), comstat)
        return new Comm.COMSTATView(comstat).cbInQue
    }

    bytesToWrite(): number {
        if (!this._handle) {
            throw new Error("Port is not open")
        }
        const errors = new Uint32Array(1)
        Comm.ClearCommError(this._handle, new Uint8Array(errors.buffer), comstat)
        return new Comm.COMSTATView(comstat).cbOutQue
    }

    clear(buffer: ClearBuffer): void {
        if (!this._handle) {
            throw new Error("Port is not open")
        }
        Comm.PurgeComm(
            this._handle,
            {
                [ClearBuffer.INPUT]: 0x0001 | 0x0004,
                [ClearBuffer.OUTPUT]: 0x0002 | 0x0008,
                [ClearBuffer.ALL]: 0x0001 | 0x0002 | 0x0004 | 0x0008,
            }[buffer]
        )
    }

    setBreak(): void {
        Comm.SetCommBreak(this._handle)
    }

    clearBreak(): void {
        Comm.ClearCommBreak(this._handle)
    }

    flush(): void {
        Fs.FlushFileBuffers(this._handle)
    }

    _pending = new Set<AbortController>()

    async _read(p: Uint8Array): Promise<number | null> {
        try {
            const controller = new AbortController()
            const overlapped = new OverlappedPromise(this._handle, controller.signal)
            // const bytes = new Uint32Array(1);
            Fs.ReadFile(
                this._handle,
                p,
                p.byteLength,
                null, // new Uint8Array(bytes.buffer),
                overlapped.buffer
            )
            this._pending.add(controller)
            await overlapped
            this._pending.delete(controller)
            return Number(overlapped.internalHigh)
        } catch (_) {
            return null
        }
    }

    async read(): Promise<Uint8Array> {
        const sizeArray = new Uint8Array(1)
        const buffer = new Uint8Array(255)
        // TODO: this needs testing
        const actualAmount = await this._read(sizeArray)
        if (actualAmount) {
            const n = await this._read(buffer.subarray(0, sizeArray[0]))
            return buffer.subarray(0, actualAmount)
        } else {
            return new Uint8Array(0)
        }
    }

    async write(p: Uint8Array | string): Promise<number> {
        if (typeof p === "string") {
            p = new TextEncoder().encode(p)
        }
        if (!this._handle) {
            throw new Error("Port is not open")
        }
        const controller = new AbortController()
        const overlapped = new OverlappedPromise(this._handle, controller.signal)
        // const bytes = new Uint32Array(1);
        Fs.WriteFile(
            this._handle,
            p,
            p.byteLength,
            null, // new Uint8Array(bytes.buffer),
            overlapped.buffer
        )
        this._pending.add(controller)
        await overlapped
        this._pending.delete(controller)
        return Number(overlapped.internalHigh)
    }

    close() {
        for (const overlapped of this._pending) {
            overlapped.abort()
        }
        if (this._handle) {
            Foundation.CloseHandle(this._handle)
        }
        return Promise.resolve();
    }
}
