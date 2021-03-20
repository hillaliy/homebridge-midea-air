import { AccessoryIdentifier, AccessoryName, PlatformIdentifier, PlatformName, PluginIdentifier } from "./api";
import { MacAddress } from "./util/mac";
export interface HomebridgeOptions {
    config?: HomebridgeConfig;
    keepOrphanedCachedAccessories?: boolean;
    hideQRCode?: boolean;
    insecureAccess?: boolean;
    customPluginPath?: string;
}
export interface HomebridgeConfig {
    bridge: BridgeConfiguration;
    mdns?: any;
    accessories: AccessoryConfig[];
    platforms: PlatformConfig[];
    plugins?: PluginIdentifier[];
    ports?: ExternalPortsConfiguration;
}
export interface BridgeConfiguration {
    name: string;
    username: MacAddress;
    pin: string;
    port?: number;
    setupID?: string[4];
    manufacturer?: string;
    model?: string;
}
export interface AccessoryConfig extends Record<string, any> {
    accessory: AccessoryName | AccessoryIdentifier;
    name: string;
    uuid_base?: string;
}
export interface PlatformConfig extends Record<string, any> {
    platform: PlatformName | PlatformIdentifier;
    name?: string;
}
export interface ExternalPortsConfiguration {
    start: number;
    end: number;
}
export declare class Server {
    private readonly api;
    private readonly pluginManager;
    private readonly bridge;
    private readonly config;
    private readonly keepOrphanedCachedAccessories;
    private readonly hideQRCode;
    private readonly allowInsecureAccess;
    private readonly externalPorts?;
    private nextExternalPort?;
    private cachedPlatformAccessories;
    private cachedAccessoriesFileCreated;
    private readonly publishedExternalAccessories;
    constructor(options?: HomebridgeOptions);
    start(): Promise<void>;
    private publishBridge;
    private static _loadConfig;
    private loadCachedPlatformAccessoriesFromDisk;
    private restoreCachedPlatformAccessories;
    private saveCachedPlatformAccessoriesOnDisk;
    private _loadAccessories;
    private loadPlatforms;
    private loadPlatformAccessories;
    private createHAPAccessory;
    private handleRegisterPlatformAccessories;
    private handleUpdatePlatformAccessories;
    private handleUnregisterPlatformAccessories;
    private handlePublishExternalAccessories;
    teardown(): void;
    private printSetupInfo;
}
//# sourceMappingURL=server.d.ts.map