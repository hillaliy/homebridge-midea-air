import { MacAddress } from "../../types";
/**
 * IdentifierCache is a model class that manages a system of associating HAP "Accessory IDs" and "Instance IDs"
 * with other values that don't usually change. HomeKit Clients use Accessory/Instance IDs as a primary key of
 * sorts, so the IDs need to remain "stable". For instance, if you create a HomeKit "Scene" called "Leaving Home"
 * that sets your Alarm System's "Target Alarm State" Characteristic to "Arm Away", that Scene will store whatever
 * "Instance ID" it was given for the "Target Alarm State" Characteristic. If the ID changes later on this server,
 * the scene will stop working.
 */
export declare class IdentifierCache {
    username: MacAddress;
    _cache: Record<string, number>;
    _usedCache: Record<string, number> | null;
    _savedCacheHash: string;
    constructor(username: MacAddress);
    startTrackingUsage: () => void;
    stopTrackingUsageAndExpireUnused: () => void;
    getCache: (key: string) => number;
    setCache: (key: string, value: number) => number;
    getAID: (accessoryUUID: string) => number;
    getIID: (accessoryUUID: string, serviceUUID: string, serviceSubtype?: string | undefined, characteristicUUID?: string | undefined) => number;
    getNextAID: () => number;
    getNextIID: (accessoryUUID: string) => number;
    save: () => void;
    /**
     * Persisting to File System
     */
    static persistKey: (username: MacAddress) => string;
    static load: (username: MacAddress) => import("../../types").Nullable<IdentifierCache>;
    static remove(username: MacAddress): void;
}
//# sourceMappingURL=IdentifierCache.d.ts.map