/**
MIT License

Copyright (c) 2023 Bernd Amend

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
import type { SerialOptions, SerialPort } from "../common/serial_port.ts"
import { isPlatformLittleEndian } from "../common/util.ts"
import {
    getLibc,
    // helpers
    numberBaudrateToBaudrateValue,
    nonBlockingErrno,
    errno,
    strerror,
    geterrnoString,
    getNonBlockingErrnoString,
    // constants
    O_RDWR,
    O_NOCTTY,
    O_SYNC,
    TCSANOW,
    CSIZE,
    CS5,
    CS6,
    CS7,
    CS8,
    CSTOPB,
    CREAD,
    PARENB,
    PARODD,
    HUPCL,
    CLOCAL,
    CRTSCTS,
    VTIME,
    VMIN,
} from "./system_apis/libc.ts"

let libc
export class SerialPortLinux implements AsyncDisposable, SerialPort {
    name?: string;
    options?: SerialOptions;
    _fd: number | undefined
    _state: "opened" | "closed" | "uninitialized" = "uninitialized"

    constructor(name: string) {
        libc = getLibc()
        this.name = name
    }

    async open(options: SerialOptions) {
        this.options = options
        if (this._fd !== undefined) {
            throw new Error("already open")
        }

        const baudRate = numberBaudrateToBaudrateValue(options.baudRate)
        if (options.dataBits !== undefined && options.dataBits !== 7 && options.dataBits !== 8) {
            throw new Error("dataBits can only be undefined | 7 | 8")
        }

        if (options.stopBits !== undefined) {
            throw new Error("setting stopBits is not implemented")
        }

        if (options.parity !== undefined) {
            throw new Error("setting parity is not implemented")
        }
        if (options.bufferSize !== undefined && options.bufferSize <= 0) {
            throw new Error("bufferSize needs to be >0")
        }

        if (options.flowControl !== undefined) {
            throw new Error("setting flowControl is not implemented")
        }

        this.options = options
        const buffer = new TextEncoder().encode(options.name)
        const fd = await libc.symbols.open(Deno.UnsafePointer.of(buffer), O_RDWR | O_NOCTTY | O_SYNC)

        if (fd < 0) {
            throw new Error(`Couldn't open '${options.name}': ${await geterrnoString()}`)
        }

        // termios tty{};
        const tty = new ArrayBuffer(100)
        const ttyPtr = Deno.UnsafePointer.of(tty)
        if ((await libc.symbols.tcgetattr(fd, ttyPtr)) != 0) {
            SerialPortLinux._internalClose(fd)
            throw new Error(`tcgetattr: ${await geterrnoString()}`)
        }

        await libc.symbols.cfsetspeed(ttyPtr, baudRate)

        const dataView = new DataView(tty)
        const littleEndian = isPlatformLittleEndian()
        dataView.setUint32(0, 0, littleEndian) // c_iflag
        dataView.setUint32(4, 0, littleEndian) // c_oflag

        let cflag = dataView.getUint32(8, littleEndian)
        cflag &= ~PARENB // Clear parity bit, disabling parity (most common)
        cflag &= ~CSTOPB // Clear stop field, only one stop bit used in communication (most common)
        cflag &= ~CSIZE // Clear all bits that set the data size
        if (options.dataBits === 7) {
            cflag |= CS7
        } else {
            cflag |= CS8 // 8 bits per byte (most common)
        }
        cflag &= ~CRTSCTS // Disable RTS/CTS hardware flow control (most common)
        cflag |= CREAD | CLOCAL // Turn on READ & ignore ctrl lines (CLOCAL = 1)
        dataView.setUint32(8, cflag, littleEndian) // c_cflag

        dataView.setUint32(12, 0, littleEndian) // c_lflag

        const timeoutInSeconds = options.timeoutSeconds ?? 2
        let timeoutInTenthsOfASecond = Math.round(timeoutInSeconds * 10)
        if (timeoutInTenthsOfASecond < 1) {
            console.warn(`Given timeout of ${timeoutInSeconds} seconds, clamping to 0.1 seconds`)
            timeoutInTenthsOfASecond = 1
        } else if (timeoutInTenthsOfASecond > 255) {
            console.warn(`Given timeout of ${timeoutInSeconds} seconds larger than max of 25.5 seconds, clamping to 25.5 seconds`)
            timeoutInTenthsOfASecond = 255
        }
        // Wait for up to 1s (10 deciseconds), returning as soon as any data is received.
        dataView.setUint8(17 + VTIME, timeoutInTenthsOfASecond)
        dataView.setUint8(17 + VMIN, options.minimumNumberOfCharsRead ?? 0)

        if ((await libc.symbols.tcsetattr(fd, TCSANOW, ttyPtr)) != 0) {
            SerialPortLinux._internalClose(fd)
            throw new Error(`tcsetattr: ${await geterrnoString()}`)
        }
        this._fd = fd
        this._state = "opened"
    }

    async write(strOrBytes: string | Uint8Array) {
        if (this._state == "closed" || this._state == "uninitialized") {
            throw new Error(`Can't write to port because port is ${this._state}`, "InvalidStateError")
        }
        if (typeof strOrBytes === "string") {
            strOrBytes = new TextEncoder().encode(strOrBytes)
        }
        const wlen = Number(await libc.symbols.write(this._fd, Deno.UnsafePointer.of(strOrBytes), BigInt(strOrBytes.byteLength)))
        if (wlen < 0) {
            throw new Error(`Error while writing: ${await geterrnoString()}`)
        }
        if (wlen !== strOrBytes.byteLength) {
            throw new Error("Couldn't write data, but OS didn't report an error")
        }
        return wlen
    }

    async read(): Promise<Uint8Array> {
        if (this._state == "closed" || this._state == "uninitialized") {
            throw new Error(`Can't read from port because port is ${this._state}`, "InvalidStateError")
        }
        const bufferSize = this?.options?.bufferSize ?? 255
        const buffer = new Uint8Array(bufferSize + 1)
        while (true) {
            let howManyBytes = await libc.symbols.read(this._fd, Deno.UnsafePointer.of(buffer), BigInt(bufferSize))
            if (typeof howManyBytes === "bigint") {
                howManyBytes = Number(howManyBytes)
            }
            if (howManyBytes > 0) {
                return buffer.subarray(0, howManyBytes)
            } else {
                await new Promise((r) => setTimeout(r, this?.options.waitTime ?? 50))
            }
        }
    }

    async close() {
        const fd = this._fd
        this._fd = undefined
        await SerialPortLinux._internalClose(fd)
    }

    static async _internalClose(fd: number | undefined) {
        if (fd === undefined) {
            return
        }
        const ret = await libc.symbols.close(fd)
        if (ret < 0) {
            throw new Error(`Error while closing: ${await geterrnoString()}`)
        }
    }

    async [Symbol.asyncDispose]() {
        await this.close()
    }

    [Symbol.for("Deno.customInspect")](inspect: typeof Deno.inspect, options: Deno.InspectOptions) {
        return `SerialPort ${inspect({ name: this.name, state: this._state }, options)}`
    }
}