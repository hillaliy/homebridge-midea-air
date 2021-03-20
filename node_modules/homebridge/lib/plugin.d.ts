import { AccessoryIdentifier, AccessoryName, AccessoryPluginConstructor, API, PlatformIdentifier, PlatformName, DynamicPlatformPlugin, PlatformPluginConstructor, PluginIdentifier, PluginName } from "./api";
import { PackageJSON } from "./pluginManager";
/**
 * Represents a loaded Homebridge plugin.
 */
export declare class Plugin {
    private readonly pluginName;
    private readonly scope?;
    private readonly pluginPath;
    readonly version: string;
    private readonly main;
    private loadContext?;
    private pluginInitializer?;
    private readonly registeredAccessories;
    private readonly registeredPlatforms;
    private readonly activeDynamicPlatforms;
    constructor(name: PluginName, path: string, packageJSON: PackageJSON, scope?: string);
    getPluginIdentifier(): PluginIdentifier;
    getPluginPath(): string;
    registerAccessory(name: AccessoryName, constructor: AccessoryPluginConstructor): void;
    registerPlatform(name: PlatformName, constructor: PlatformPluginConstructor): void;
    getAccessoryConstructor(accessoryIdentifier: AccessoryIdentifier | AccessoryName): AccessoryPluginConstructor;
    getPlatformConstructor(platformIdentifier: PlatformIdentifier | PlatformName): PlatformPluginConstructor;
    assignDynamicPlatform(platformIdentifier: PlatformIdentifier | PlatformName, platformPlugin: DynamicPlatformPlugin): void;
    getActiveDynamicPlatform(platformName: PlatformName): DynamicPlatformPlugin | undefined;
    load(): void;
    initialize(api: API): void;
}
//# sourceMappingURL=plugin.d.ts.map