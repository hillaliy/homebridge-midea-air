// @ts-ignore
import { LocalStorage } from "node-persist";
export declare class HAPStorage {
    private static readonly INSTANCE;
    private localStore?;
    private customStoragePath?;
    static storage(): LocalStorage;
    static setCustomStoragePath(path: string): void;
    storage(): LocalStorage;
    setCustomStoragePath(path: string): void;
}
//# sourceMappingURL=HAPStorage.d.ts.map