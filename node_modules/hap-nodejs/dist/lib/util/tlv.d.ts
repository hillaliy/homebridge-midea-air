/**
 * Type Length Value encoding/decoding, used by HAP as a wire format.
 * https://en.wikipedia.org/wiki/Type-length-value
 */
/// <reference types="node" />
export declare const EMPTY_TLV_TYPE = 0;
export declare function encode(type: number, data: Buffer | number | string, ...args: any[]): Buffer;
export declare function decode(data: Buffer): Record<number, Buffer>;
export declare function decodeList(data: Buffer, entryStartId: number): Record<number, Buffer>[];
export declare function writeUInt64(value: number): Buffer;
export declare function readUInt64(buffer: Buffer): number;
export declare function writeUInt32(value: number): Buffer;
export declare function readUInt32(buffer: Buffer): number;
export declare function writeUInt16(value: number): Buffer;
export declare function readUInt16(buffer: Buffer): number;
//# sourceMappingURL=tlv.d.ts.map