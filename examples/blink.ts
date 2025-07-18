import { listPorts, connect } from "../src/main.ts"

const portInfo = (await listPorts()).find((port) => port.type === "USB")
if (!portInfo) {
    throw new Error("No serial ports found.")
}

const port = await connect(portInfo.name, { baudRate: 9600 })
console.log("Opened port:", portInfo.name)

let on = false
setInterval(async () => {
    on = !on
    await port.write(new Uint8Array([on ? 0x01 : 0x02]))
}, 1000)

while (true) {
    console.log("read bytes:", await port.read())
}
