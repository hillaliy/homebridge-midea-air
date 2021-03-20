import { AccessoryIdentifier, AccessoryName, HomebridgeAPI, PlatformIdentifier, PlatformName, PluginIdentifier, PluginName } from "./api";
import { Plugin } from "./plugin";
export interface PackageJSON {
    name: string;
    version: string;
    keywords?: string[];
    main?: string;
    engines?: Record<string, string>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
}
export interface PluginManagerOptions {
    /**
     * Additional path to search for plugins in. Specified relative to the current working directory.
     */
    customPluginPath?: string;
    /**
     * When defined, only plugins specified here will be initialized.
     */
    activePlugins?: PluginIdentifier[];
}
/**
 * Utility which exposes methods to search for installed Homebridge plugins
 */
export declare class PluginManager {
    private static readonly PLUGIN_IDENTIFIER_PATTERN;
    private readonly api;
    private readonly searchPaths;
    private readonly activePlugins?;
    private readonly plugins;
    private readonly pluginIdentifierTranslation;
    private readonly accessoryToPluginMap;
    private readonly platformToPluginMap;
    private currentInitializingPlugin?;
    constructor(api: HomebridgeAPI, options?: PluginManagerOptions);
    static isQualifiedPluginIdentifier(identifier: string): boolean;
    static extractPluginName(name: string): PluginName;
    static extractPluginScope(name: string): string;
    static getAccessoryName(identifier: AccessoryIdentifier): AccessoryName;
    static getPlatformName(identifier: PlatformIdentifier): PlatformIdentifier;
    static getPluginIdentifier(identifier: AccessoryIdentifier | PlatformIdentifier): PluginIdentifier;
    initializeInstalledPlugins(): void;
    private handleRegisterAccessory;
    private handleRegisterPlatform;
    getPluginForAccessory(accessoryIdentifier: AccessoryIdentifier | AccessoryName): Plugin;
    getPluginForPlatform(platformIdentifier: PlatformIdentifier | PlatformName): Plugin;
    hasPluginRegistered(pluginIdentifier: PluginIdentifier): boolean;
    getPlugin(pluginIdentifier: PluginIdentifier): Plugin | undefined;
    getPluginByActiveDynamicPlatform(platformName: PlatformName): Plugin | undefined;
    private loadInstalledPlugins;
    private loadPlugin;
    private static loadPackageJSON;
    private loadDefaultPaths;
}
//# sourceMappingURL=pluginManager.d.ts.map