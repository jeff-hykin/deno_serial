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
import { settings } from "../settings.ts"

export const O_RDWR = 0x2
export const O_NOCTTY = 0x100
export const O_SYNC = 0x101000
export const TCSANOW = 0

export const CSIZE = 0o000060
export const CS5 = 0o000000
export const CS6 = 0o000020
export const CS7 = 0o000040
export const CS8 = 0o000060
export const CSTOPB = 0o000100
export const CREAD = 0o000200
export const PARENB = 0o000400
export const PARODD = 0o001000
export const HUPCL = 0o002000
export const CLOCAL = 0o004000
export const CRTSCTS = 0o20000000000
export const VTIME = 5
export const VMIN = 6

export function numberBaudrateToBaudrateValue(num: number) {
    switch (num) {
        case 9600:
            return 0o000015
        case 19200:
            return 0o000016
        case 38400:
            return 0o000017
        case 57600:
            return 0o010001
        case 115200:
            return 0o010002
        case 230400:
            return 0o010003
        case 460800:
            return 0o010004
        case 500000:
            return 0o010005
        case 576000:
            return 0o010006
        case 921600:
            return 0o010007
        case 1000000:
            return 0o010010
        case 1152000:
            return 0o010011
        case 1500000:
            return 0o010012
        case 2000000:
            return 0o010013
        case 2500000:
            return 0o010014
        case 3000000:
            return 0o010015
        case 3500000:
            return 0o010016
        case 4000000:
            return 0o010017
    }
    throw new Error("unsupported baudrate")
}

let libc
export const getLibc = () => {
    if (libc) {
        return libc
    }

    const possibleLibs = [settings.defaultLibcPath, "/lib/libc.so.6", "/lib64/libc.so.6", "/lib64/libc.so.6", "/usr/lib/aarch64-linux-gnu/libc.so.6", "/usr/lib/aarch64-linux-gnu/libc.so"].filter((each) => each) as string[]
    const standardPosixInterfaces = {
        open: {
            parameters: ["pointer", "i32"],
            result: "i32",
            nonblocking: false,
        },
        close: {
            parameters: ["i32"],
            result: "i32",
            nonblocking: false,
        },
        write: {
            parameters: ["i32", "pointer", "usize"],
            result: "isize",
            nonblocking: false,
        },
        read: {
            parameters: ["i32", "pointer", "usize"],
            result: "isize",
            nonblocking: true,
        },
        strerror: {
            parameters: ["i32"],
            result: "pointer",
            nonblocking: false,
        },
        tcgetattr: {
            parameters: ["i32", "pointer"],
            result: "i32",
            nonblocking: false,
        },
        tcsetattr: {
            parameters: ["i32", "i32", "pointer"],
            result: "i32",
            nonblocking: false,
        },
        cfsetspeed: {
            parameters: ["pointer", "u32"],
            result: "i32",
            nonblocking: false,
        },
    } as const
    const glibcInterfaces = {
        ...standardPosixInterfaces,
        non_blocking__errno_location: {
            parameters: [],
            result: "pointer",
            nonblocking: true,
            name: "__errno_location",
        },
        __errno_location: {
            parameters: [],
            result: "pointer",
            nonblocking: false,
        },
    } as const

    for (const eachPath of possibleLibs) {
        let exists = false
        try {
            Deno.statSync(eachPath)
            exists = true
        } catch (_error) {}
        if (exists) {
            try {
                libc = Deno.dlopen(eachPath, glibcInterfaces)
            } catch (error) {
                libc = Deno.dlopen(eachPath, standardPosixInterfaces)
            }
            break
        }
    }
}

export async function nonBlockingErrno() {
    getLibc()
    // non-glibc systems have their own way
    if (!libc.symbols.non_blocking__errno_location) {
        return 0
    }
    const ret = await libc.symbols.non_blocking__errno_location()
    if (ret === null) {
        return 0
    }
    const ptrView = new Deno.UnsafePointerView(ret)
    return ptrView.getInt32()
}

export async function errno() {
    getLibc()
    // non-glibc systems have their own way
    if (!libc.symbols.__errno_location) {
        return 0
    }
    const ret = await libc.symbols.__errno_location()
    if (ret === null) {
        return 0
    }
    const ptrView = new Deno.UnsafePointerView(ret)
    return ptrView.getInt32()
}

export async function strerror(errnum: number) {
    getLibc()
    const ret = await libc.symbols.strerror(errnum)
    if (ret === null) {
        return ""
    }
    const ptrView = new Deno.UnsafePointerView(ret)
    return ptrView.getCString()
}

export async function geterrnoString() {
    return strerror(await errno())
}

export async function getNonBlockingErrnoString() {
    return strerror(await nonBlockingErrno())
}