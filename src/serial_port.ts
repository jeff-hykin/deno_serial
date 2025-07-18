import type { SerialPortInfo, SerialPort, SerialOptions } from "./common/serial_port.ts"
import { SerialPortWin } from "./windows/serial_port.ts"
import { getPortsWin } from "./windows/enumerate.ts"
import { getPortsDarwin } from "./darwin/enumerate.ts"
import { SerialPortDarwin } from "./darwin/serial_port.ts"
import { getPortsLinux } from "./linux/enumerate.ts"
import { SerialPortLinux } from "./linux/serial_port.ts"

export function getPorts(): SerialPortInfo[] {
    if (Deno.build.os === "windows") {
        return getPortsWin()
    } else if (Deno.build.os === "darwin") {
        return getPortsDarwin()
    } else if (Deno.build.os === "linux") {
        return getPortsLinux()
    } else {
        throw new Error(`Unsupported OS: ${Deno.build.os}`)
    }
}

export function open(name: string | SerialPortInfo, options: SerialOptions): Promise<SerialPort> {
    name = (name?.name ?? name) as string
    if (Deno.build.os === "windows") {
        const port = new SerialPortWin(name)
        return port.open(options).then(()=>port)
    } else if (Deno.build.os === "darwin") {
        const port = new SerialPortDarwin(name)
        return port.open(options).then(()=>port)
    } else if (Deno.build.os === "linux") {
        const port = new SerialPortLinux(name)
        return port.open(options).then(()=>port)
    } else {
        throw new Error(`Unsupported OS: ${Deno.build.os}`)
    }
}
