/// <reference types="node" />
import { EventEmitter } from "events";
import * as hapNodeJs from "hap-nodejs";
import { PlatformAccessory } from "./platformAccessory";
import { User } from "./user";
import { Logging } from "./logger";
import { Controller, Service } from "hap-nodejs";
import { AccessoryConfig, PlatformConfig } from "./server";
export declare type HAP = typeof hapNodeJs;
export declare type HAPLegacyTypes = typeof hapNodeJs.LegacyTypes;
export declare type PluginIdentifier = PluginName | ScopedPluginName;
export declare type PluginName = string;
export declare type ScopedPluginName = string;
export declare type AccessoryName = string;
export declare type PlatformName = string;
export declare type AccessoryIdentifier = string;
export declare type PlatformIdentifier = string;
export declare const enum PluginType {
    ACCESSORY = "accessory",
    PLATFORM = "platform"
}
/**
 * The {PluginInitializer} is a method which must be the default export for every homebridge plugin.
 * It is called once the plugin is loaded from disk.
 */
export interface PluginInitializer {
    /**
     * When the initializer is called the plugin must use the provided api instance and call the appropriate
     * register methods - {@link API.registerAccessory} or {@link API.registerPlatform} - in order to
     * correctly register for the following startup sequence.
     *
     * @param {API} api
     */
    (api: API): void;
}
export interface AccessoryPluginConstructor {
    new (logger: Logging, config: AccessoryConfig, api: API): AccessoryPlugin;
}
export interface AccessoryPlugin {
    /**
     * Optional method which will be called if a 'identify' of a Accessory is requested by HomeKit.
     */
    identify?(): void;
    /**
     * This method will be called once on startup, to query all services to be exposed by the Accessory.
     * All event handlers for characteristics should be set up before the array is returned.
     *
     * @returns {Service[]} services - returned services will be added to the Accessory
     */
    getServices(): Service[];
    /**
     * This method will be called once on startup, to query all controllers to be exposed by the Accessory.
     * It is optional to implement.
     *
     * This includes controllers like the RemoteController or the CameraController.
     * Any necessary controller specific setup should have been done when returning the array.
     * In most cases the plugin will only return a array of the size 1.
     *
     * In the case that the Plugin does not add any additional services (returned by {@link getServices}) the
     * method {@link getServices} must defined in any way and should just return an empty array.
     *
     * @returns {Controller[]} controllers - returned controllers will be configured for the Accessory
     */
    getControllers?(): Controller[];
}
export interface PlatformPluginConstructor {
    new (logger: Logging, config: PlatformConfig, api: API): DynamicPlatformPlugin | StaticPlatformPlugin | IndependentPlatformPlugin;
}
export interface PlatformPlugin {
}
/**
 * Platform that is able to dynamically add or remove accessories.
 * All configured accessories are stored to disk and recreated on startup.
 * Accessories can be added or removed by using {@link API.registerPlatformAccessories} or {@link API.unregisterPlatformAccessories}.
 */
export interface DynamicPlatformPlugin extends PlatformPlugin {
    /**
     * This method is called for every PlatformAccessory, which is recreated from disk on startup.
     * It should be used to properly initialize the Accessory and setup all event handlers for
     * all services and their characteristics.
     *
     * @param {PlatformAccessory} accessory which needs to be configured
     */
    configureAccessory(accessory: PlatformAccessory): void;
}
/**
 * Platform that exposes all available characteristics at the start of the plugin.
 * The set of accessories can not change at runtime.
 * The bridge waits for all callbacks to return before it is published and accessible by HomeKit controllers.
 */
export interface StaticPlatformPlugin extends PlatformPlugin {
    /**
     * This method is called once at startup. The Platform should pass all accessories which need to be created
     * to the callback in form of a {@link AccessoryPlugin}.
     * The Platform must respond in a timely manner as otherwise the startup of the bridge would be unnecessarily delayed.
     *
     * @param {(foundAccessories: AccessoryPlugin[]) => void} callback
     */
    accessories(callback: (foundAccessories: AccessoryPlugin[]) => void): void;
}
/**
 * Platform that does not aim to add any accessories to the main bridge accessory.
 * This platform should be used if for example a plugin aims to only expose external accessories.
 * It should also be used when the platform doesn't intend to expose any accessories at all, like plugins
 * providing a UI for homebridge.
 */
export interface IndependentPlatformPlugin extends PlatformPlugin {
}
export declare const enum APIEvent {
    /**
     * Event is fired once homebridge has finished with booting up and initializing all components and plugins.
     * When this event is fired it is possible that the Bridge accessory isn't published yet, if homebridge still needs
     * to wait for some {@see StaticPlatformPlugin | StaticPlatformPlugins} to finish accessory creation.
     */
    DID_FINISH_LAUNCHING = "didFinishLaunching",
    /**
     * This event is fired when homebridge got shutdown. This could be a regular shutdown or a unexpected crash.
     * At this stage all Accessories are already unpublished and all PlatformAccessories are already saved to disk!
     */
    SHUTDOWN = "shutdown"
}
export declare const enum InternalAPIEvent {
    REGISTER_ACCESSORY = "registerAccessory",
    REGISTER_PLATFORM = "registerPlatform",
    PUBLISH_EXTERNAL_ACCESSORIES = "publishExternalAccessories",
    REGISTER_PLATFORM_ACCESSORIES = "registerPlatformAccessories",
    UPDATE_PLATFORM_ACCESSORIES = "updatePlatformAccessories",
    UNREGISTER_PLATFORM_ACCESSORIES = "unregisterPlatformAccessories"
}
export declare interface API {
    on(event: "didFinishLaunching", listener: () => void): this;
    on(event: "shutdown", listener: () => void): this;
}
export interface API {
    readonly version: number;
    readonly serverVersion: string;
    readonly user: typeof User;
    readonly hap: HAP;
    readonly hapLegacyTypes: HAPLegacyTypes;
    readonly platformAccessory: typeof PlatformAccessory;
    registerAccessory(accessoryName: AccessoryName, constructor: AccessoryPluginConstructor): void;
    registerAccessory(pluginIdentifier: PluginIdentifier, accessoryName: AccessoryName, constructor: AccessoryPluginConstructor): void;
    registerPlatform(platformName: PlatformName, constructor: PlatformPluginConstructor): void;
    registerPlatform(pluginIdentifier: PluginIdentifier, platformName: PlatformName, constructor: PlatformPluginConstructor): void;
    registerPlatformAccessories(pluginIdentifier: PluginIdentifier, platformName: PlatformName, accessories: PlatformAccessory[]): void;
    updatePlatformAccessories(accessories: PlatformAccessory[]): void;
    unregisterPlatformAccessories(pluginIdentifier: PluginIdentifier, platformName: PlatformName, accessories: PlatformAccessory[]): void;
    /**
     * @deprecated use {@link publishExternalAccessories} directly to publish a standalone Accessory
     */
    publishCameraAccessories(pluginIdentifier: PluginIdentifier, accessories: PlatformAccessory[]): void;
    publishExternalAccessories(pluginIdentifier: PluginIdentifier, accessories: PlatformAccessory[]): void;
}
export declare interface HomebridgeAPI {
    on(event: "didFinishLaunching", listener: () => void): this;
    on(event: "shutdown", listener: () => void): this;
    on(event: InternalAPIEvent.REGISTER_ACCESSORY, listener: (accessoryName: AccessoryName, accessoryConstructor: AccessoryPluginConstructor, pluginIdentifier?: PluginIdentifier) => void): this;
    on(event: InternalAPIEvent.REGISTER_PLATFORM, listener: (platformName: PlatformName, platformConstructor: PlatformPluginConstructor, pluginIdentifier?: PluginIdentifier) => void): this;
    on(event: InternalAPIEvent.PUBLISH_EXTERNAL_ACCESSORIES, listener: (accessories: PlatformAccessory[]) => void): this;
    on(event: InternalAPIEvent.REGISTER_PLATFORM_ACCESSORIES, listener: (accessories: PlatformAccessory[]) => void): this;
    on(event: InternalAPIEvent.UPDATE_PLATFORM_ACCESSORIES, listener: (accessories: PlatformAccessory[]) => void): this;
    on(event: InternalAPIEvent.UNREGISTER_PLATFORM_ACCESSORIES, listener: (accessories: PlatformAccessory[]) => void): this;
    emit(event: "didFinishLaunching"): boolean;
    emit(event: "shutdown"): boolean;
    emit(event: InternalAPIEvent.REGISTER_ACCESSORY, accessoryName: AccessoryName, accessoryConstructor: AccessoryPluginConstructor, pluginIdentifier?: PluginIdentifier): boolean;
    emit(event: InternalAPIEvent.REGISTER_PLATFORM, platformName: PlatformName, platformConstructor: PlatformPluginConstructor, pluginIdentifier?: PluginIdentifier): boolean;
    emit(event: InternalAPIEvent.PUBLISH_EXTERNAL_ACCESSORIES, accessories: PlatformAccessory[]): boolean;
    emit(event: InternalAPIEvent.REGISTER_PLATFORM_ACCESSORIES, accessories: PlatformAccessory[]): boolean;
    emit(event: InternalAPIEvent.UPDATE_PLATFORM_ACCESSORIES, accessories: PlatformAccessory[]): boolean;
    emit(event: InternalAPIEvent.UNREGISTER_PLATFORM_ACCESSORIES, accessories: PlatformAccessory[]): boolean;
}
export declare class HomebridgeAPI extends EventEmitter implements API {
    readonly version = 2.6;
    readonly serverVersion: string;
    readonly user: typeof User;
    readonly hap: typeof hapNodeJs;
    readonly hapLegacyTypes: typeof import("hap-nodejs/dist/accessories/types");
    readonly platformAccessory: typeof PlatformAccessory;
    constructor();
    static isDynamicPlatformPlugin(platformPlugin: PlatformPlugin): platformPlugin is DynamicPlatformPlugin;
    static isStaticPlatformPlugin(platformPlugin: PlatformPlugin): platformPlugin is StaticPlatformPlugin;
    signalFinished(): void;
    signalShutdown(): void;
    registerAccessory(accessoryName: AccessoryName, constructor: AccessoryPluginConstructor): void;
    registerAccessory(pluginIdentifier: PluginIdentifier, accessoryName: AccessoryName, constructor: AccessoryPluginConstructor): void;
    registerPlatform(platformName: PlatformName, constructor: PlatformPluginConstructor): void;
    registerPlatform(pluginIdentifier: PluginIdentifier, platformName: PlatformName, constructor: PlatformPluginConstructor): void;
    publishCameraAccessories(pluginIdentifier: PluginIdentifier, accessories: PlatformAccessory[]): void;
    publishExternalAccessories(pluginIdentifier: PluginIdentifier, accessories: PlatformAccessory[]): void;
    registerPlatformAccessories(pluginIdentifier: PluginIdentifier, platformName: PlatformName, accessories: PlatformAccessory[]): void;
    updatePlatformAccessories(accessories: PlatformAccessory[]): void;
    unregisterPlatformAccessories(pluginIdentifier: PluginIdentifier, platformName: PlatformName, accessories: PlatformAccessory[]): void;
}
//# sourceMappingURL=api.d.ts.map