/// Auto-generated by Deno Win32: Windows.Win32.Devices.DeviceAccess.Apis

import * as util from "../../util.ts";

// Constants
export const ED_BASE = 4096;
export const DEV_PORT_SIM = 1;
export const DEV_PORT_COM1 = 2;
export const DEV_PORT_COM2 = 3;
export const DEV_PORT_COM3 = 4;
export const DEV_PORT_COM4 = 5;
export const DEV_PORT_DIAQ = 6;
export const DEV_PORT_ARTI = 7;
export const DEV_PORT_1394 = 8;
export const DEV_PORT_USB = 9;
export const DEV_PORT_MIN = 1;
export const DEV_PORT_MAX = 9;
export const ED_TOP = 1;
export const ED_MIDDLE = 2;
export const ED_BOTTOM = 4;
export const ED_LEFT = 256;
export const ED_CENTER = 512;
export const ED_RIGHT = 1024;
export const ED_AUDIO_ALL = 268435456;
export const ED_AUDIO_1 = 1;
export const ED_AUDIO_2 = 2;
export const ED_AUDIO_3 = 4;
export const ED_AUDIO_4 = 8;
export const ED_AUDIO_5 = 16;
export const ED_AUDIO_6 = 32;
export const ED_AUDIO_7 = 64;
export const ED_AUDIO_8 = 128;
export const ED_AUDIO_9 = 256;
export const ED_AUDIO_10 = 512;
export const ED_AUDIO_11 = 1024;
export const ED_AUDIO_12 = 2048;
export const ED_AUDIO_13 = 4096;
export const ED_AUDIO_14 = 8192;
export const ED_AUDIO_15 = 16384;
export const ED_AUDIO_16 = 32768;
export const ED_AUDIO_17 = 65536;
export const ED_AUDIO_18 = 131072;
export const ED_AUDIO_19 = 262144;
export const ED_AUDIO_20 = 524288;
export const ED_AUDIO_21 = 1048576;
export const ED_AUDIO_22 = 2097152;
export const ED_AUDIO_23 = 4194304;
export const ED_AUDIO_24 = 8388608;
export const ED_VIDEO = 33554432;

// Structs

export type PWSTR = Deno.PointerValue | Uint8Array;

export type HRESULT = number;

// Native Libraries

try {
  var libdeviceaccess_dll = Deno.dlopen("deviceaccess.dll", {
    CreateDeviceAccessInstance: {
      parameters: ["buffer", "u32", "pointer"],
      result: "pointer",
      optional: true,
    },
  }).symbols;
} catch(e) { /* ignore */ }

// Symbols

export function CreateDeviceAccessInstance(
  deviceInterfacePath: string | null | Uint8Array | Uint16Array /* Windows.Win32.Foundation.PWSTR */,
  desiredAccess: number /* u32 */,
  createAsync: Deno.PointerValue | Uint8Array /* ptr */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libdeviceaccess_dll.CreateDeviceAccessInstance!(util.pwstrToFfi(deviceInterfacePath), desiredAccess, util.toPointer(createAsync));
}

