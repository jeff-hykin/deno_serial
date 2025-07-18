export function cString(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str + "\0");
}

export function refptr() {
  return new Uint8Array(8);
}

export function deref(ptr: Uint8Array): Deno.PointerValue {
  return Deno.UnsafePointer.create(new BigUint64Array(ptr.buffer)[0]);
}

export class Deferred {
  promise: Promise<void>;
  resolve!: () => void;
  reject!: () => void;

  constructor() {
    this.promise = new Promise<void>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

export function bigIntTo64IntLittleEndianBytes(bigInt) {
    const buffer = new ArrayBuffer(8); // 64-bit number (8 bytes)
    const view = new DataView(buffer);
    // Store the BigInt into the DataView in little-endian format
    view.setBigUint64(0, bigInt, true); // true for little-endian
    // Convert the ArrayBuffer into a Uint8Array
    const uint8Array = new Uint8Array(buffer);
    return uint8Array;
}

export function int64LittleEndianBytesToBigInt(uint8Array) {
    if (uint8Array instanceof Array) {
        if (uint8Array.length != 8) {
            throw new Error("Invalid input: Array must have exactly 8 elements for int64LittleEndianBytesToBigInt()");
        }
        uint8Array = new Uint8Array(uint8Array);
    }
    const buffer = uint8Array.buffer;
    const view = new DataView(buffer);
    // Extract the BigInt from the DataView, assuming little-endian byte order
    const bigInt = view.getBigUint64(0, true); // true for little-endian
    return bigInt;
}

export function getBit(bits: number, bit: number) {
    return (bits & bit) === bit
}

export function setBit(bits: number, bit: number, value: boolean) {
    if (value) {
        return bits | bit
    } else {
        return bits & ~bit
    }
}