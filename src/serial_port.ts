import type { SerialPortInfo, SerialPort, SerialOptions } from "./common/serial_port.ts"

export function getPorts(): Promise<SerialPortInfo[]> {
    if (Deno.build.os === "windows") {
        return import("./windows/serial_port.ts").then((mod) => mod.getPortsWin())
    } else if (Deno.build.os === "darwin") {
        return import("./darwin/serial_port.ts").then((mod) => mod.getPortsDarwin())
    } else if (Deno.build.os === "linux") {
        return import("./linux/serial_port.ts").then((mod) => mod.getPortsLinux())
    } else {
        throw new Error(`Unsupported OS: ${Deno.build.os}`)
    }
}

export async function open(name: string | SerialPortInfo, options: SerialOptions): Promise<SerialPort> {
    name = (name?.name ?? name) as string
    if (Deno.build.os === "windows") {
        const { SerialPortWin } = await import("./windows/serial_port.ts")
        const port = new SerialPortWin(name)
        return port.open(options).then(() => port)
    } else if (Deno.build.os === "darwin") {
        const { SerialPortDarwin } = await import("./darwin/serial_port.ts")
        const port = new SerialPortDarwin(name)
        return port.open(options).then(() => port)
    } else if (Deno.build.os === "linux") {
        const { SerialPortLinux } = await import("./linux/serial_port.ts")
        const port = new SerialPortLinux(name)
        return port.open(options).then(() => port)
    } else {
        throw new Error(`Unsupported OS: ${Deno.build.os}`)
    }
}
