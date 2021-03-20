/// <reference types="node" />
import { EventEmitter } from "events";
import { Accessory, CameraController, Categories, Controller, ControllerConstructor, LegacyCameraSource, SerializedAccessory, Service, WithUUID } from "hap-nodejs";
import { PlatformName, PluginIdentifier, PluginName } from "./api";
export interface SerializedPlatformAccessory extends SerializedAccessory {
    plugin: PluginName;
    platform: PlatformName;
    context: Record<string, any>;
}
export declare const enum PlatformAccessoryEvent {
    IDENTIFY = "identify"
}
export declare interface PlatformAccessory {
    on(event: "identify", listener: () => void): this;
    emit(event: "identify"): boolean;
}
export declare class PlatformAccessory extends EventEmitter {
    private static injectedAccessory?;
    _associatedPlugin?: PluginIdentifier;
    _associatedPlatform?: PlatformName;
    _associatedHAPAccessory: Accessory;
    displayName: string;
    UUID: string;
    category: Categories;
    services: Service[];
    /**
     * @deprecated reachability has no effect and isn't supported anymore
     */
    reachable: boolean;
    /**
     * This is a way for Plugin developers to store custom data with their accessory
     */
    context: Record<string, any>;
    constructor(displayName: string, uuid: string, category?: Categories);
    addService(service: Service | typeof Service, ...constructorArgs: any[]): Service;
    removeService(service: Service): void;
    getService<T extends WithUUID<typeof Service>>(name: string | T): Service | undefined;
    /**
     *
     * @param uuid
     * @param subType
     * @deprecated use {@link getServiceById} directly
     */
    getServiceByUUIDAndSubType<T extends WithUUID<typeof Service>>(uuid: string | T, subType: string): Service | undefined;
    getServiceById<T extends WithUUID<typeof Service>>(uuid: string | T, subType: string): Service | undefined;
    /**
     *
     * @param reachable
     * @deprecated reachability has no effect and isn't supported anymore
     */
    updateReachability(reachable: boolean): void;
    /**
     *
     * @param cameraSource
     * @deprecated see {@link Accessory.configureCameraSource}
     */
    configureCameraSource(cameraSource: LegacyCameraSource): CameraController;
    configureController(controller: Controller | ControllerConstructor): void;
    static serialize(accessory: PlatformAccessory): SerializedPlatformAccessory;
    static deserialize(json: SerializedPlatformAccessory): PlatformAccessory;
}
//# sourceMappingURL=platformAccessory.d.ts.map