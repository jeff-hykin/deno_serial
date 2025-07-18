import type { Port, SerialConnection, SerialOptions } from "./common/serial_port.ts"
export * from "./common/serial_port.ts"

export function listPorts(): Promise<Port[]> {
    if (Deno.build.os === "windows") {
        return import("./windows/list_ports.ts").then((mod) => mod.getPortsWin())
    } else if (Deno.build.os === "darwin") {
        return import("./darwin/list_ports.ts").then((mod) => mod.getPortsDarwin())
    } else if (Deno.build.os === "linux") {
        return import("./linux/list_ports.ts").then((mod) => mod.getPortsLinux())
    } else {
        throw new Error(`Unsupported OS: ${Deno.build.os}`)
    }
}

export async function connect(name: string | Port, options: SerialOptions): Promise<SerialConnection> {
    name = (name?.name ?? name) as string
    if (Deno.build.os === "windows") {
        const { SerialConnectionWin } = await import("./windows/serial_connection.ts")
        const port = new SerialConnectionWin(name)
        return port.open(options).then(() => port)
    } else if (Deno.build.os === "darwin") {
        const { SerialConnectionDarwin } = await import("./darwin/serial_connection.ts")
        const port = new SerialConnectionDarwin(name)
        return port.open(options).then(() => port)
    } else if (Deno.build.os === "linux") {
        const { SerialConnectionLinux } = await import("./linux/serial_connection.ts")
        const port = new SerialConnectionLinux(name)
        return port.open(options).then(() => port)
    } else {
        throw new Error(`Unsupported OS: ${Deno.build.os}`)
    }
}
