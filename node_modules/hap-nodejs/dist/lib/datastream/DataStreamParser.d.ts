/// <reference types="node" />
export declare class ValueWrapper<T> {
    value: T;
    constructor(value: T);
    equals(obj: ValueWrapper<T>): boolean;
}
export declare class Int8 extends ValueWrapper<number> {
}
export declare class Int16 extends ValueWrapper<number> {
}
export declare class Int32 extends ValueWrapper<number> {
}
export declare class Int64 extends ValueWrapper<number> {
}
export declare class Float32 extends ValueWrapper<number> {
}
export declare class Float64 extends ValueWrapper<number> {
}
export declare class SecondsSince2001 extends ValueWrapper<number> {
}
export declare class UUID extends ValueWrapper<string> {
    constructor(value: string);
}
export declare const enum DataFormatTags {
    INVALID = 0,
    TRUE = 1,
    FALSE = 2,
    TERMINATOR = 3,
    NULL = 4,
    UUID = 5,
    DATE = 6,
    INTEGER_MINUS_ONE = 7,
    INTEGER_RANGE_START_0 = 8,
    INTEGER_RANGE_STOP_39 = 46,
    INT8 = 48,
    INT16LE = 49,
    INT32LE = 50,
    INT64LE = 51,
    FLOAT32LE = 53,
    FLOAT64LE = 54,
    UTF8_LENGTH_START = 64,
    UTF8_LENGTH_STOP = 96,
    UTF8_LENGTH8 = 97,
    UTF8_LENGTH16LE = 98,
    UTF8_LENGTH32LE = 99,
    UTF8_LENGTH64LE = 100,
    UTF8_NULL_TERMINATED = 111,
    DATA_LENGTH_START = 112,
    DATA_LENGTH_STOP = 144,
    DATA_LENGTH8 = 145,
    DATA_LENGTH16LE = 146,
    DATA_LENGTH32LE = 147,
    DATA_LENGTH64LE = 148,
    DATA_TERMINATED = 159,
    DEDUPLICATION_START = 160,
    DEDUPLICATION_STOP = 207,
    ARRAY_LENGTH_START = 208,
    ARRAY_LENGTH_STOP = 222,
    ARRAY_TERMINATED = 223,
    DICTIONARY_LENGTH_START = 224,
    DICTIONARY_LENGTH_STOP = 238,
    DICTIONARY_TERMINATED = 239
}
export declare namespace DataStreamParser {
    function decode(buffer: DataStreamReader): any;
    function encode(data: any, buffer: DataStreamWriter): void;
}
export declare class DataStreamReader {
    private readonly data;
    readerIndex: number;
    private deduplicationData;
    constructor(data: Buffer);
    finished(): void;
    deduplicateData(index: number): any;
    private cache;
    private ensureLength;
    readTag(): number;
    readTrue(): any;
    readFalse(): any;
    readNegOne(): any;
    readIntRange(tag: number): any;
    readInt8(): any;
    readInt16LE(): any;
    readInt32LE(): any;
    readInt64LE(): any;
    readFloat32LE(): any;
    readFloat64LE(): any;
    private readLength8;
    private readLength16LE;
    private readLength32LE;
    private readLength64LE;
    readUTF8(length: number): any;
    readUTF8_Length8(): any;
    readUTF8_Length16LE(): any;
    readUTF8_Length32LE(): any;
    readUTF8_Length64LE(): any;
    readUTF8_NULL_terminated(): any;
    readData(length: number): any;
    readData_Length8(): any;
    readData_Length16LE(): any;
    readData_Length32LE(): any;
    readData_Length64LE(): any;
    readData_terminated(): any;
    readSecondsSince2001_01_01(): any;
    readUUID(): any;
}
export declare class DataStreamWriter {
    private static readonly chunkSize;
    private data;
    private writerIndex;
    private writtenData;
    constructor();
    length(): number;
    getData(): Buffer;
    private ensureLength;
    private checkDeduplication;
    writeTag(tag: DataFormatTags): void;
    writeTrue(): void;
    writeFalse(): void;
    writeNumber(number: number): void;
    writeInt8(int8: Int8): void;
    writeInt16LE(int16: Int16): void;
    writeInt32LE(int32: Int32): void;
    writeInt64LE(int64: Int64): void;
    writeFloat32LE(float32: Float32): void;
    writeFloat64LE(float64: Float64): void;
    private writeLength8;
    private writeLength16LE;
    private writeLength32LE;
    private writeLength64LE;
    writeUTF8(utf8: string): void;
    private _writeUTF8;
    private writeUTF8_Length8;
    private writeUTF8_Length16LE;
    private writeUTF8_Length32LE;
    private writeUTF8_Length64LE;
    private writeUTF8_NULL_terminated;
    writeData(data: Buffer): void;
    private _writeData;
    private writeData_Length8;
    private writeData_Length16LE;
    private writeData_Length32LE;
    private writeData_Length64LE;
    private writeData_terminated;
    writeSecondsSince2001_01_01(seconds: SecondsSince2001): void;
    writeUUID(uuid_string: string): void;
}
//# sourceMappingURL=DataStreamParser.d.ts.map