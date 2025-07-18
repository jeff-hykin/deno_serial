/// Auto-generated by Deno Win32: Windows.Win32.Security.DirectoryServices.Apis

import * as util from "../../util.ts";

// Constants
export const DSSI_READ_ONLY = 1;
export const DSSI_NO_ACCESS_CHECK = 2;
export const DSSI_NO_EDIT_SACL = 4;
export const DSSI_NO_EDIT_OWNER = 8;
export const DSSI_IS_ROOT = 16;
export const DSSI_NO_FILTER = 32;
export const DSSI_NO_READONLY_MESSAGE = 64;

// Structs

export type PWSTR = Deno.PointerValue | Uint8Array;

export type LPARAM = bigint | number;

export type HRESULT = number;

export type HWND = bigint | number;

// Native Libraries

try {
  var libDSSEC_dll = Deno.dlopen("DSSEC.dll", {
    DSCreateISecurityInfoObject: {
      parameters: ["buffer", "buffer", "u32", "pointer", "pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    DSCreateISecurityInfoObjectEx: {
      parameters: ["buffer", "buffer", "buffer", "buffer", "buffer", "u32", "pointer", "pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    DSCreateSecurityPage: {
      parameters: ["buffer", "buffer", "u32", "pointer", "pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
    DSEditSecurity: {
      parameters: ["pointer", "buffer", "buffer", "u32", "buffer", "pointer", "pointer", "pointer"],
      result: "pointer",
      optional: true,
    },
  }).symbols;
} catch(e) { /* ignore */ }

// Symbols

export function DSCreateISecurityInfoObject(
  pwszObjectPath: string | null | Uint8Array | Uint16Array /* Windows.Win32.Foundation.PWSTR */,
  pwszObjectClass: string | null | Uint8Array | Uint16Array /* Windows.Win32.Foundation.PWSTR */,
  dwFlags: number /* u32 */,
  ppSI: Deno.PointerValue | Uint8Array /* ptr */,
  pfnReadSD: Uint8Array | Deno.PointerValue /* Windows.Win32.Security.DirectoryServices.PFNREADOBJECTSECURITY */,
  pfnWriteSD: Uint8Array | Deno.PointerValue /* Windows.Win32.Security.DirectoryServices.PFNWRITEOBJECTSECURITY */,
  lpContext: Uint8Array | Deno.PointerValue /* Windows.Win32.Foundation.LPARAM */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libDSSEC_dll.DSCreateISecurityInfoObject!(util.pwstrToFfi(pwszObjectPath), util.pwstrToFfi(pwszObjectClass), dwFlags, util.toPointer(ppSI), util.toPointer(pfnReadSD), util.toPointer(pfnWriteSD), util.toPointer(lpContext));
}

export function DSCreateISecurityInfoObjectEx(
  pwszObjectPath: string | null | Uint8Array | Uint16Array /* Windows.Win32.Foundation.PWSTR */,
  pwszObjectClass: string | null | Uint8Array | Uint16Array /* Windows.Win32.Foundation.PWSTR */,
  pwszServer: string | null | Uint8Array | Uint16Array /* Windows.Win32.Foundation.PWSTR */,
  pwszUserName: string | null | Uint8Array | Uint16Array /* Windows.Win32.Foundation.PWSTR */,
  pwszPassword: string | null | Uint8Array | Uint16Array /* Windows.Win32.Foundation.PWSTR */,
  dwFlags: number /* u32 */,
  ppSI: Deno.PointerValue | Uint8Array /* ptr */,
  pfnReadSD: Uint8Array | Deno.PointerValue /* Windows.Win32.Security.DirectoryServices.PFNREADOBJECTSECURITY */,
  pfnWriteSD: Uint8Array | Deno.PointerValue /* Windows.Win32.Security.DirectoryServices.PFNWRITEOBJECTSECURITY */,
  lpContext: Uint8Array | Deno.PointerValue /* Windows.Win32.Foundation.LPARAM */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libDSSEC_dll.DSCreateISecurityInfoObjectEx!(util.pwstrToFfi(pwszObjectPath), util.pwstrToFfi(pwszObjectClass), util.pwstrToFfi(pwszServer), util.pwstrToFfi(pwszUserName), util.pwstrToFfi(pwszPassword), dwFlags, util.toPointer(ppSI), util.toPointer(pfnReadSD), util.toPointer(pfnWriteSD), util.toPointer(lpContext));
}

export function DSCreateSecurityPage(
  pwszObjectPath: string | null | Uint8Array | Uint16Array /* Windows.Win32.Foundation.PWSTR */,
  pwszObjectClass: string | null | Uint8Array | Uint16Array /* Windows.Win32.Foundation.PWSTR */,
  dwFlags: number /* u32 */,
  phPage: Deno.PointerValue | Uint8Array /* ptr */,
  pfnReadSD: Uint8Array | Deno.PointerValue /* Windows.Win32.Security.DirectoryServices.PFNREADOBJECTSECURITY */,
  pfnWriteSD: Uint8Array | Deno.PointerValue /* Windows.Win32.Security.DirectoryServices.PFNWRITEOBJECTSECURITY */,
  lpContext: Uint8Array | Deno.PointerValue /* Windows.Win32.Foundation.LPARAM */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libDSSEC_dll.DSCreateSecurityPage!(util.pwstrToFfi(pwszObjectPath), util.pwstrToFfi(pwszObjectClass), dwFlags, util.toPointer(phPage), util.toPointer(pfnReadSD), util.toPointer(pfnWriteSD), util.toPointer(lpContext));
}

export function DSEditSecurity(
  hwndOwner: Deno.PointerValue /* Windows.Win32.Foundation.HWND */,
  pwszObjectPath: string | null | Uint8Array | Uint16Array /* Windows.Win32.Foundation.PWSTR */,
  pwszObjectClass: string | null | Uint8Array | Uint16Array /* Windows.Win32.Foundation.PWSTR */,
  dwFlags: number /* u32 */,
  pwszCaption: string | null | Uint8Array | Uint16Array /* Windows.Win32.Foundation.PWSTR */,
  pfnReadSD: Uint8Array | Deno.PointerValue /* Windows.Win32.Security.DirectoryServices.PFNREADOBJECTSECURITY */,
  pfnWriteSD: Uint8Array | Deno.PointerValue /* Windows.Win32.Security.DirectoryServices.PFNWRITEOBJECTSECURITY */,
  lpContext: Uint8Array | Deno.PointerValue /* Windows.Win32.Foundation.LPARAM */,
): Deno.PointerValue /* Windows.Win32.Foundation.HRESULT */ {
  return libDSSEC_dll.DSEditSecurity!((hwndOwner), util.pwstrToFfi(pwszObjectPath), util.pwstrToFfi(pwszObjectClass), dwFlags, util.pwstrToFfi(pwszCaption), util.toPointer(pfnReadSD), util.toPointer(pfnWriteSD), util.toPointer(lpContext));
}

