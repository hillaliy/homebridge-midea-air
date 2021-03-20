/// <reference types="node" />
declare type Binary = Buffer | NodeJS.TypedArray | DataView;
export declare type BinaryLike = string | Binary;
export declare function generate(data: BinaryLike): string;
export declare function isValid(UUID: string): boolean;
export declare function unparse(buf: Buffer | string, offset?: number): string;
export declare function write(uuid: string, buf?: Buffer, offset?: number): Buffer;
export declare function toShortForm(uuid: string, base?: string): string;
export declare function toLongForm(uuid: string, base: string): string;
export {};
//# sourceMappingURL=uuid.d.ts.map