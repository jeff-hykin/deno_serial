export interface Port {
    name: string // TODO: change to path
    type?: string
    friendlyName?: string
    manufacturer?: string
    usbVendorId?: number
    usbProductId?: number
    serialNumber?: string
}

export interface SerialConnection {
    readonly name?: string
    readonly options?: SerialOptions
    open(options: SerialOptions): Promise<void>
    close(): Promise<void>
    read(): Promise<Uint8Array>
    write(buffer: Uint8Array | string): Promise<number>
}

export type ParityType = "none" | "even" | "odd"
export type FlowControlType = "none" | "software" | "hardware"

export interface SerialOptions {
    baudRate: 9600 | 19200 | 38400 | 57600 | 115200 | 230400 | 460800 | 500000 | 576000 | 921600 | 1000000 | 1152000 | 1500000 | 2000000 | 2500000 | 3000000 | 3500000 | 4000000
    dataBits?: 7 | 8 // default 8
    stopBits?: 0 | 1 | 2 // default 1
    parity?: ParityType // default none
    flowControl?: FlowControlType
    bufferSize?: number // default 255
    timeoutSeconds?: number
}