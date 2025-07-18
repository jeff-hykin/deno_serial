export function getPortsLinux() {
  const ports = []
  for (const each of Deno.readDirSync("/dev/")) {
    if (!each.isDirectory && each.name.startsWith("tty")) {
      const type = each.name.startsWith("ttyUSB") ? "USB" : undefined
      ports.push({name:"/dev/" + each.name, type})
    }
  }
  return ports
}