/// Auto-generated by Deno Win32: Windows.Win32.System.UpdateAssessment.Apis

import * as util from "../../util.ts";

// Enums
export type UpdateImpactLevel = number;
export type UpdateAssessmentStatus = number;

// Constants
export const UpdateImpactLevel_None = 0;
export const UpdateImpactLevel_Low = 1;
export const UpdateImpactLevel_Medium = 2;
export const UpdateImpactLevel_High = 3;
export const UpdateAssessmentStatus_Latest = 0;
export const UpdateAssessmentStatus_NotLatestSoftRestriction = 1;
export const UpdateAssessmentStatus_NotLatestHardRestriction = 2;
export const UpdateAssessmentStatus_NotLatestEndOfSupport = 3;
export const UpdateAssessmentStatus_NotLatestServicingTrain = 4;
export const UpdateAssessmentStatus_NotLatestDeferredFeature = 5;
export const UpdateAssessmentStatus_NotLatestDeferredQuality = 6;
export const UpdateAssessmentStatus_NotLatestPausedFeature = 7;
export const UpdateAssessmentStatus_NotLatestPausedQuality = 8;
export const UpdateAssessmentStatus_NotLatestManaged = 9;
export const UpdateAssessmentStatus_NotLatestUnknown = 10;
export const UpdateAssessmentStatus_NotLatestTargetedVersion = 11;

// Structs

/**
 * Windows.Win32.System.UpdateAssessment.UpdateAssessment (size: 16)
 */
export interface UpdateAssessment {
  /** Windows.Win32.System.UpdateAssessment.UpdateAssessmentStatus */
  status: UpdateAssessmentStatus;
  /** Windows.Win32.System.UpdateAssessment.UpdateImpactLevel */
  impact: UpdateImpactLevel;
  /** u32 */
  daysOutOfDate: number;
}

export const sizeofUpdateAssessment = 16;

export function allocUpdateAssessment(data?: Partial<UpdateAssessment>): Uint8Array {
  const buf = new Uint8Array(sizeofUpdateAssessment);
  const view = new DataView(buf.buffer);
  // 0x00: i32
  if (data?.status !== undefined) view.setInt32(0, Number(data.status), true);
  // 0x04: i32
  if (data?.impact !== undefined) view.setInt32(4, Number(data.impact), true);
  // 0x08: u32
  if (data?.daysOutOfDate !== undefined) view.setUint32(8, Number(data.daysOutOfDate), true);
  // 0x0c: pad4
  return buf;
}

export class UpdateAssessmentView {
  private readonly view: DataView;
  constructor(private readonly buf: Uint8Array) {
    this.view = new DataView(buf.buffer);
  }

  get buffer(): Uint8Array {
    return this.buf;
  }

  // 0x00: i32
  get status(): number {
    return this.view.getInt32(0, true);
  }

  // 0x04: i32
  get impact(): number {
    return this.view.getInt32(4, true);
  }

  // 0x08: u32
  get daysOutOfDate(): number {
    return this.view.getUint32(8, true);
  }

  // 0x0c: pad4

  // 0x00: i32
  set status(value: number) {
    this.view.setInt32(0, value, true);
  }

  // 0x04: i32
  set impact(value: number) {
    this.view.setInt32(4, value, true);
  }

  // 0x08: u32
  set daysOutOfDate(value: number) {
    this.view.setUint32(8, value, true);
  }

  // 0x0c: pad4
}

export type BOOL = number;

/**
 * Windows.Win32.Foundation.FILETIME (size: 8)
 */
export interface FILETIME {
  /** u32 */
  dwLowDateTime: number;
  /** u32 */
  dwHighDateTime: number;
}

export const sizeofFILETIME = 8;

export function allocFILETIME(data?: Partial<FILETIME>): Uint8Array {
  const buf = new Uint8Array(sizeofFILETIME);
  const view = new DataView(buf.buffer);
  // 0x00: u32
  if (data?.dwLowDateTime !== undefined) view.setUint32(0, Number(data.dwLowDateTime), true);
  // 0x04: u32
  if (data?.dwHighDateTime !== undefined) view.setUint32(4, Number(data.dwHighDateTime), true);
  return buf;
}

export class FILETIMEView {
  private readonly view: DataView;
  constructor(private readonly buf: Uint8Array) {
    this.view = new DataView(buf.buffer);
  }

  get buffer(): Uint8Array {
    return this.buf;
  }

  // 0x00: u32
  get dwLowDateTime(): number {
    return this.view.getUint32(0, true);
  }

  // 0x04: u32
  get dwHighDateTime(): number {
    return this.view.getUint32(4, true);
  }

  // 0x00: u32
  set dwLowDateTime(value: number) {
    this.view.setUint32(0, value, true);
  }

  // 0x04: u32
  set dwHighDateTime(value: number) {
    this.view.setUint32(4, value, true);
  }
}

export type PWSTR = Deno.PointerValue | Uint8Array;

/**
 * Windows.Win32.System.UpdateAssessment.OSUpdateAssessment (size: 80)
 */
export interface OSUpdateAssessment {
  /** Windows.Win32.Foundation.BOOL */
  isEndOfSupport: boolean;
  /** Windows.Win32.System.UpdateAssessment.UpdateAssessment */
  assessmentForCurrent: Uint8Array | Deno.PointerValue;
  /** Windows.Win32.System.UpdateAssessment.UpdateAssessment */
  assessmentForUpToDate: Uint8Array | Deno.PointerValue;
  /** Windows.Win32.System.UpdateAssessment.UpdateAssessmentStatus */
  securityStatus: UpdateAssessmentStatus;
  /** Windows.Win32.Foundation.FILETIME */
  assessmentTime: Uint8Array | Deno.PointerValue;
  /** Windows.Win32.Foundation.FILETIME */
  releaseInfoTime: Uint8Array | Deno.PointerValue;
  /** Windows.Win32.Foundation.PWSTR */
  currentOSBuild: string | null | Uint8Array | Uint16Array;
  /** Windows.Win32.Foundation.FILETIME */
  currentOSReleaseTime: Uint8Array | Deno.PointerValue;
  /** Windows.Win32.Foundation.PWSTR */
  upToDateOSBuild: string | null | Uint8Array | Uint16Array;
  /** Windows.Win32.Foundation.FILETIME */
  upToDateOSReleaseTime: Uint8Array | Deno.PointerValue;
}

export const sizeofOSUpdateAssessment = 80;

export function allocOSUpdateAssessment(data?: Partial<OSUpdateAssessment>): Uint8Array {
  const buf = new Uint8Array(sizeofOSUpdateAssessment);
  const view = new DataView(buf.buffer);
  // 0x00: i32
  if (data?.isEndOfSupport !== undefined) view.setInt32(0, Number(data.isEndOfSupport), true);
  // 0x04: pad4
  // 0x08: pointer
  if (data?.assessmentForCurrent !== undefined) view.setBigUint64(8, data.assessmentForCurrent === null ? 0n : BigInt(Deno.UnsafePointer.value(util.toPointer(data.assessmentForCurrent))), true);
  // 0x10: pointer
  if (data?.assessmentForUpToDate !== undefined) view.setBigUint64(16, data.assessmentForUpToDate === null ? 0n : BigInt(Deno.UnsafePointer.value(util.toPointer(data.assessmentForUpToDate))), true);
  // 0x18: i32
  if (data?.securityStatus !== undefined) view.setInt32(24, Number(data.securityStatus), true);
  // 0x1c: pad4
  // 0x20: pointer
  if (data?.assessmentTime !== undefined) view.setBigUint64(32, data.assessmentTime === null ? 0n : BigInt(Deno.UnsafePointer.value(util.toPointer(data.assessmentTime))), true);
  // 0x28: pointer
  if (data?.releaseInfoTime !== undefined) view.setBigUint64(40, data.releaseInfoTime === null ? 0n : BigInt(Deno.UnsafePointer.value(util.toPointer(data.releaseInfoTime))), true);
  // 0x30: buffer
  if (data?.currentOSBuild !== undefined) {
    (buf as any)._f48 = util.pwstrToFfi(data.currentOSBuild);
    view.setBigUint64(48, (buf as any)._f48 === null ? 0n : BigInt(Deno.UnsafePointer.value(Deno.UnsafePointer.of((buf as any)._f48))), true);
  }
  // 0x38: pointer
  if (data?.currentOSReleaseTime !== undefined) view.setBigUint64(56, data.currentOSReleaseTime === null ? 0n : BigInt(Deno.UnsafePointer.value(util.toPointer(data.currentOSReleaseTime))), true);
  // 0x40: buffer
  if (data?.upToDateOSBuild !== undefined) {
    (buf as any)._f64 = util.pwstrToFfi(data.upToDateOSBuild);
    view.setBigUint64(64, (buf as any)._f64 === null ? 0n : BigInt(Deno.UnsafePointer.value(Deno.UnsafePointer.of((buf as any)._f64))), true);
  }
  // 0x48: pointer
  if (data?.upToDateOSReleaseTime !== undefined) view.setBigUint64(72, data.upToDateOSReleaseTime === null ? 0n : BigInt(Deno.UnsafePointer.value(util.toPointer(data.upToDateOSReleaseTime))), true);
  return buf;
}

export class OSUpdateAssessmentView {
  private readonly view: DataView;
  constructor(private readonly buf: Uint8Array) {
    this.view = new DataView(buf.buffer);
  }

  get buffer(): Uint8Array {
    return this.buf;
  }

  // 0x00: i32
  get isEndOfSupport(): number {
    return this.view.getInt32(0, true);
  }

  // 0x04: pad4

  // 0x08: pointer
  get assessmentForCurrent(): Uint8Array | Deno.PointerValue {
    const ptr = this.view.getBigUint64(8, true);
    return Deno.UnsafePointer.create(ptr);
  }

  // 0x10: pointer
  get assessmentForUpToDate(): Uint8Array | Deno.PointerValue {
    const ptr = this.view.getBigUint64(16, true);
    return Deno.UnsafePointer.create(ptr);
  }

  // 0x18: i32
  get securityStatus(): number {
    return this.view.getInt32(24, true);
  }

  // 0x1c: pad4

  // 0x20: pointer
  get assessmentTime(): Uint8Array | Deno.PointerValue {
    const ptr = this.view.getBigUint64(32, true);
    return Deno.UnsafePointer.create(ptr);
  }

  // 0x28: pointer
  get releaseInfoTime(): Uint8Array | Deno.PointerValue {
    const ptr = this.view.getBigUint64(40, true);
    return Deno.UnsafePointer.create(ptr);
  }

  // 0x30: buffer
  get currentOSBuild(): Uint8Array | Deno.PointerValue {
    const ptr = this.view.getBigUint64(48, true);
    return Deno.UnsafePointer.create(ptr);
  }

  // 0x38: pointer
  get currentOSReleaseTime(): Uint8Array | Deno.PointerValue {
    const ptr = this.view.getBigUint64(56, true);
    return Deno.UnsafePointer.create(ptr);
  }

  // 0x40: buffer
  get upToDateOSBuild(): Uint8Array | Deno.PointerValue {
    const ptr = this.view.getBigUint64(64, true);
    return Deno.UnsafePointer.create(ptr);
  }

  // 0x48: pointer
  get upToDateOSReleaseTime(): Uint8Array | Deno.PointerValue {
    const ptr = this.view.getBigUint64(72, true);
    return Deno.UnsafePointer.create(ptr);
  }

  // 0x00: i32
  set isEndOfSupport(value: number) {
    this.view.setInt32(0, value, true);
  }

  // 0x04: pad4

  // 0x08: pointer
  set assessmentForCurrent(value: Uint8Array | Deno.PointerValue) {
    this.view.setBigUint64(8, BigInt(Deno.UnsafePointer.value(util.toPointer(value))), true);
  }

  // 0x10: pointer
  set assessmentForUpToDate(value: Uint8Array | Deno.PointerValue) {
    this.view.setBigUint64(16, BigInt(Deno.UnsafePointer.value(util.toPointer(value))), true);
  }

  // 0x18: i32
  set securityStatus(value: number) {
    this.view.setInt32(24, value, true);
  }

  // 0x1c: pad4

  // 0x20: pointer
  set assessmentTime(value: Uint8Array | Deno.PointerValue) {
    this.view.setBigUint64(32, BigInt(Deno.UnsafePointer.value(util.toPointer(value))), true);
  }

  // 0x28: pointer
  set releaseInfoTime(value: Uint8Array | Deno.PointerValue) {
    this.view.setBigUint64(40, BigInt(Deno.UnsafePointer.value(util.toPointer(value))), true);
  }

  // 0x30: buffer
  set currentOSBuild(value: Uint8Array | Deno.PointerValue) {
    (this.buf as any)._f48 = value;
    this.view.setBigUint64(48, BigInt(Deno.UnsafePointer.value(util.toPointer((this.buf as any)._f48))), true);
  }

  // 0x38: pointer
  set currentOSReleaseTime(value: Uint8Array | Deno.PointerValue) {
    this.view.setBigUint64(56, BigInt(Deno.UnsafePointer.value(util.toPointer(value))), true);
  }

  // 0x40: buffer
  set upToDateOSBuild(value: Uint8Array | Deno.PointerValue) {
    (this.buf as any)._f64 = value;
    this.view.setBigUint64(64, BigInt(Deno.UnsafePointer.value(util.toPointer((this.buf as any)._f64))), true);
  }

  // 0x48: pointer
  set upToDateOSReleaseTime(value: Uint8Array | Deno.PointerValue) {
    this.view.setBigUint64(72, BigInt(Deno.UnsafePointer.value(util.toPointer(value))), true);
  }
}

// Native Libraries

// Symbols

