/// Auto-generated by Deno Win32: Windows.Win32.Media.Audio.Endpoints.Apis

import * as util from "../../../util.ts";

// Enums
export type EndpointConnectorType = number;

// Constants
export const eHostProcessConnector = 0;
export const eOffloadConnector = 1;
export const eLoopbackConnector = 2;
export const eKeywordDetectorConnector = 3;
export const eConnectorCount = 4;

// Structs

/**
 * Windows.Win32.UI.Shell.PropertiesSystem.PROPERTYKEY (size: 16)
 */
export interface PROPERTYKEY {
  /** System.Guid */
  fmtid: Uint8Array | Deno.PointerValue;
  /** u32 */
  pid: number;
}

export const sizeofPROPERTYKEY = 16;

export function allocPROPERTYKEY(data?: Partial<PROPERTYKEY>): Uint8Array {
  const buf = new Uint8Array(sizeofPROPERTYKEY);
  const view = new DataView(buf.buffer);
  // 0x00: pointer
  if (data?.fmtid !== undefined) view.setBigUint64(0, data.fmtid === null ? 0n : BigInt(Deno.UnsafePointer.value(util.toPointer(data.fmtid))), true);
  // 0x08: u32
  if (data?.pid !== undefined) view.setUint32(8, Number(data.pid), true);
  // 0x0c: pad4
  return buf;
}

export class PROPERTYKEYView {
  private readonly view: DataView;
  constructor(private readonly buf: Uint8Array) {
    this.view = new DataView(buf.buffer);
  }

  get buffer(): Uint8Array {
    return this.buf;
  }

  // 0x00: pointer
  get fmtid(): Uint8Array | Deno.PointerValue {
    const ptr = this.view.getBigUint64(0, true);
    return Deno.UnsafePointer.create(ptr);
  }

  // 0x08: u32
  get pid(): number {
    return this.view.getUint32(8, true);
  }

  // 0x0c: pad4

  // 0x00: pointer
  set fmtid(value: Uint8Array | Deno.PointerValue) {
    this.view.setBigUint64(0, BigInt(Deno.UnsafePointer.value(util.toPointer(value))), true);
  }

  // 0x08: u32
  set pid(value: number) {
    this.view.setUint32(8, value, true);
  }

  // 0x0c: pad4
}

/**
 * Windows.Win32.Media.Audio.WAVEFORMATEX (size: 24)
 */
export interface WAVEFORMATEX {
  /** u16 */
  wFormatTag: number;
  /** u16 */
  nChannels: number;
  /** u32 */
  nSamplesPerSec: number;
  /** u32 */
  nAvgBytesPerSec: number;
  /** u16 */
  nBlockAlign: number;
  /** u16 */
  wBitsPerSample: number;
  /** u16 */
  cbSize: number;
}

export const sizeofWAVEFORMATEX = 24;

export function allocWAVEFORMATEX(data?: Partial<WAVEFORMATEX>): Uint8Array {
  const buf = new Uint8Array(sizeofWAVEFORMATEX);
  const view = new DataView(buf.buffer);
  // 0x00: u16
  if (data?.wFormatTag !== undefined) view.setUint16(0, Number(data.wFormatTag), true);
  // 0x02: u16
  if (data?.nChannels !== undefined) view.setUint16(2, Number(data.nChannels), true);
  // 0x04: u32
  if (data?.nSamplesPerSec !== undefined) view.setUint32(4, Number(data.nSamplesPerSec), true);
  // 0x08: u32
  if (data?.nAvgBytesPerSec !== undefined) view.setUint32(8, Number(data.nAvgBytesPerSec), true);
  // 0x0c: u16
  if (data?.nBlockAlign !== undefined) view.setUint16(12, Number(data.nBlockAlign), true);
  // 0x0e: u16
  if (data?.wBitsPerSample !== undefined) view.setUint16(14, Number(data.wBitsPerSample), true);
  // 0x10: u16
  if (data?.cbSize !== undefined) view.setUint16(16, Number(data.cbSize), true);
  // 0x12: pad6
  return buf;
}

export class WAVEFORMATEXView {
  private readonly view: DataView;
  constructor(private readonly buf: Uint8Array) {
    this.view = new DataView(buf.buffer);
  }

  get buffer(): Uint8Array {
    return this.buf;
  }

  // 0x00: u16
  get wFormatTag(): number {
    return this.view.getUint16(0, true);
  }

  // 0x02: u16
  get nChannels(): number {
    return this.view.getUint16(2, true);
  }

  // 0x04: u32
  get nSamplesPerSec(): number {
    return this.view.getUint32(4, true);
  }

  // 0x08: u32
  get nAvgBytesPerSec(): number {
    return this.view.getUint32(8, true);
  }

  // 0x0c: u16
  get nBlockAlign(): number {
    return this.view.getUint16(12, true);
  }

  // 0x0e: u16
  get wBitsPerSample(): number {
    return this.view.getUint16(14, true);
  }

  // 0x10: u16
  get cbSize(): number {
    return this.view.getUint16(16, true);
  }

  // 0x12: pad6

  // 0x00: u16
  set wFormatTag(value: number) {
    this.view.setUint16(0, value, true);
  }

  // 0x02: u16
  set nChannels(value: number) {
    this.view.setUint16(2, value, true);
  }

  // 0x04: u32
  set nSamplesPerSec(value: number) {
    this.view.setUint32(4, value, true);
  }

  // 0x08: u32
  set nAvgBytesPerSec(value: number) {
    this.view.setUint32(8, value, true);
  }

  // 0x0c: u16
  set nBlockAlign(value: number) {
    this.view.setUint16(12, value, true);
  }

  // 0x0e: u16
  set wBitsPerSample(value: number) {
    this.view.setUint16(14, value, true);
  }

  // 0x10: u16
  set cbSize(value: number) {
    this.view.setUint16(16, value, true);
  }

  // 0x12: pad6
}

/**
 * Windows.Win32.Media.Audio.Endpoints.AUDIO_ENDPOINT_SHARED_CREATE_PARAMS (size: 24)
 */
export interface AUDIO_ENDPOINT_SHARED_CREATE_PARAMS {
  /** u32 */
  u32Size: number;
  /** u32 */
  u32TSSessionId: number;
  /** Windows.Win32.Media.Audio.Endpoints.EndpointConnectorType */
  targetEndpointConnectorType: EndpointConnectorType;
  /** Windows.Win32.Media.Audio.WAVEFORMATEX */
  wfxDeviceFormat: Uint8Array | Deno.PointerValue;
}

export const sizeofAUDIO_ENDPOINT_SHARED_CREATE_PARAMS = 24;

export function allocAUDIO_ENDPOINT_SHARED_CREATE_PARAMS(data?: Partial<AUDIO_ENDPOINT_SHARED_CREATE_PARAMS>): Uint8Array {
  const buf = new Uint8Array(sizeofAUDIO_ENDPOINT_SHARED_CREATE_PARAMS);
  const view = new DataView(buf.buffer);
  // 0x00: u32
  if (data?.u32Size !== undefined) view.setUint32(0, Number(data.u32Size), true);
  // 0x04: u32
  if (data?.u32TSSessionId !== undefined) view.setUint32(4, Number(data.u32TSSessionId), true);
  // 0x08: i32
  if (data?.targetEndpointConnectorType !== undefined) view.setInt32(8, Number(data.targetEndpointConnectorType), true);
  // 0x0c: pad4
  // 0x10: pointer
  if (data?.wfxDeviceFormat !== undefined) view.setBigUint64(16, data.wfxDeviceFormat === null ? 0n : BigInt(Deno.UnsafePointer.value(util.toPointer(data.wfxDeviceFormat))), true);
  return buf;
}

export class AUDIO_ENDPOINT_SHARED_CREATE_PARAMSView {
  private readonly view: DataView;
  constructor(private readonly buf: Uint8Array) {
    this.view = new DataView(buf.buffer);
  }

  get buffer(): Uint8Array {
    return this.buf;
  }

  // 0x00: u32
  get u32Size(): number {
    return this.view.getUint32(0, true);
  }

  // 0x04: u32
  get u32TSSessionId(): number {
    return this.view.getUint32(4, true);
  }

  // 0x08: i32
  get targetEndpointConnectorType(): number {
    return this.view.getInt32(8, true);
  }

  // 0x0c: pad4

  // 0x10: pointer
  get wfxDeviceFormat(): Uint8Array | Deno.PointerValue {
    const ptr = this.view.getBigUint64(16, true);
    return Deno.UnsafePointer.create(ptr);
  }

  // 0x00: u32
  set u32Size(value: number) {
    this.view.setUint32(0, value, true);
  }

  // 0x04: u32
  set u32TSSessionId(value: number) {
    this.view.setUint32(4, value, true);
  }

  // 0x08: i32
  set targetEndpointConnectorType(value: number) {
    this.view.setInt32(8, value, true);
  }

  // 0x0c: pad4

  // 0x10: pointer
  set wfxDeviceFormat(value: Uint8Array | Deno.PointerValue) {
    this.view.setBigUint64(16, BigInt(Deno.UnsafePointer.value(util.toPointer(value))), true);
  }
}

// Native Libraries

// Symbols

