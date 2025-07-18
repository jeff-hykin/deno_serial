# Deno SerialPort

[![Tags](https://img.shields.io/github/release/DjDeveloperr/deno_serial)](https://github.com/DjDeveloperr/deno_serial/releases)
[![License](https://img.shields.io/github/license/DjDeveloperr/deno_serial)](https://github.com/DjDeveloperr/deno_serial/blob/master/LICENSE)
[![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/DjDeveloperr)

Serial Port API for Deno with zero third-party native dependencies.

| Platform | `getPorts` | `open` |`write` |
| -------- | ---------- | ------ |------ |
| macOS    | ✅         | ✅     | ✅     |
| Linux    | ✅         | ✅     | ✅     |
| Windows  | ✅         | ✅     | ❔     |

## Try out

Run the following to list all available ports:

```sh
deno run --allow-ffi -r https://raw.githubusercontent.com/jeff-hykin/deno_serial/main/examples/print_ports.ts
```

## Usage

```ts
import { getPorts, open } from "https://esm.sh/gh/jeff-hykin/deno_serial/mod.ts";

const ports = getPorts();
console.log("Ports:", ports);

const port = await open(ports[0].name, { baudRate: 9600 });
await port.write("Hello, world!");
await port.write(new Uint8Array([0x01, 0x02, 0x03]));
let data = await port.read()

// ...

port.close();
```

## License

Apache-2.0. Check [LICENSE](./LICENSE) for more information.

Copyright © 2022-2023 DjDeveloperr
