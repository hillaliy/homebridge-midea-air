/// <reference types="node" />
import { SerializedService, Service, ServiceId } from './Service';
import { Characteristic, CharacteristicSetCallback } from './Characteristic';
import { Advertiser } from './Advertiser';
import { CharacteristicsWriteRequest, HAPServer } from './HAPServer';
import { AccessoryInfo, PairingInformation, PermissionTypes } from './model/AccessoryInfo';
import { IdentifierCache } from './model/IdentifierCache';
import { CharacteristicChange, CharacteristicData, MacAddress, NodeCallback, Nullable, PairingsCallback, SessionIdentifier, ToHAPOptions, VoidCallback, WithUUID } from '../types';
import { LegacyCameraSource } from './camera';
import { EventEmitter } from './EventEmitter';
import { Session } from "./util/eventedhttp";
import { CameraController, Controller, ControllerConstructor, ControllerServiceMap, ControllerType } from "./controller";
import { ControllerStorage } from "./model/ControllerStorage";
export declare const enum Categories {
    OTHER = 1,
    BRIDGE = 2,
    FAN = 3,
    GARAGE_DOOR_OPENER = 4,
    LIGHTBULB = 5,
    DOOR_LOCK = 6,
    OUTLET = 7,
    SWITCH = 8,
    THERMOSTAT = 9,
    SENSOR = 10,
    ALARM_SYSTEM = 11,
    SECURITY_SYSTEM = 11,
    DOOR = 12,
    WINDOW = 13,
    WINDOW_COVERING = 14,
    PROGRAMMABLE_SWITCH = 15,
    RANGE_EXTENDER = 16,
    CAMERA = 17,
    IP_CAMERA = 17,
    VIDEO_DOORBELL = 18,
    AIR_PURIFIER = 19,
    AIR_HEATER = 20,
    AIR_CONDITIONER = 21,
    AIR_HUMIDIFIER = 22,
    AIR_DEHUMIDIFIER = 23,
    APPLE_TV = 24,
    HOMEPOD = 25,
    SPEAKER = 26,
    AIRPORT = 27,
    SPRINKLER = 28,
    FAUCET = 29,
    SHOWER_HEAD = 30,
    TELEVISION = 31,
    TARGET_CONTROLLER = 32,
    ROUTER = 33,
    AUDIO_RECEIVER = 34,
    TV_SET_TOP_BOX = 35,
    TV_STREAMING_STICK = 36
}
export interface SerializedAccessory {
    displayName: string;
    UUID: string;
    lastKnownUsername?: MacAddress;
    category: Categories;
    services: SerializedService[];
    linkedServices?: Record<ServiceId, ServiceId[]>;
    controllers?: SerializedControllerContext[];
}
export interface SerializedControllerContext {
    type: ControllerType;
    services: SerializedServiceMap;
}
export declare type SerializedServiceMap = Record<string, ServiceId>;
export interface ControllerContext {
    controller: Controller;
    serviceMap: ControllerServiceMap;
}
export declare const enum AccessoryEventTypes {
    IDENTIFY = "identify",
    LISTENING = "listening",
    SERVICE_CONFIGURATION_CHANGE = "service-configurationChange",
    SERVICE_CHARACTERISTIC_CHANGE = "service-characteristic-change",
    PAIRED = "paired",
    UNPAIRED = "unpaired"
}
declare type Events = {
    identify: (paired: boolean, cb: VoidCallback) => void;
    listening: (port: number) => void;
    "service-configurationChange": VoidCallback;
    "service-characteristic-change": (change: ServiceCharacteristicChange) => void;
    [AccessoryEventTypes.PAIRED]: () => void;
    [AccessoryEventTypes.UNPAIRED]: () => void;
};
/**
 * @deprecated Use AccessoryEventTypes instead
 */
export declare type EventAccessory = "identify" | "listening" | "service-configurationChange" | "service-characteristic-change";
export declare type CharacteristicEvents = Record<string, any>;
export interface PublishInfo {
    username: MacAddress;
    pincode: string;
    category?: Categories;
    setupID?: string;
    port?: number;
    mdns?: any;
}
export declare type ServiceCharacteristicChange = CharacteristicChange & {
    accessory: Accessory;
    service: Service;
};
export declare const enum ResourceTypes {
    IMAGE = "image"
}
export declare type Resource = {
    'aid'?: number;
    'image-height': number;
    'image-width': number;
    'resource-type': ResourceTypes;
};
declare type IdentifyCallback = VoidCallback;
declare type PairCallback = VoidCallback;
declare type AddPairingCallback = PairingsCallback<void>;
declare type RemovePairingCallback = PairingsCallback<void>;
declare type ListPairingsCallback = PairingsCallback<PairingInformation[]>;
declare type HandleAccessoriesCallback = NodeCallback<{
    accessories: any[];
}>;
declare type HandleGetCharacteristicsCallback = NodeCallback<CharacteristicData[]>;
declare type HandleSetCharacteristicsCallback = NodeCallback<CharacteristicData[]>;
/**
 * Accessory is a virtual HomeKit device. It can publish an associated HAP server for iOS devices to communicate
 * with - or it can run behind another "Bridge" Accessory server.
 *
 * Bridged Accessories in this implementation must have a UUID that is unique among all other Accessories that
 * are hosted by the Bridge. This UUID must be "stable" and unchanging, even when the server is restarted. This
 * is required so that the Bridge can provide consistent "Accessory IDs" (aid) and "Instance IDs" (iid) for all
 * Accessories, Services, and Characteristics for iOS clients to reference later.
 *
 * @event 'identify' => function(paired, callback(err)) { }
 *        Emitted when an iOS device wishes for this Accessory to identify itself. If `paired` is false, then
 *        this device is currently browsing for Accessories in the system-provided "Add Accessory" screen. If
 *        `paired` is true, then this is a device that has already paired with us. Note that if `paired` is true,
 *        listening for this event is a shortcut for the underlying mechanism of setting the `Identify` Characteristic:
 *        `getService(Service.AccessoryInformation).getCharacteristic(Characteristic.Identify).on('set', ...)`
 *        You must call the callback for identification to be successful.
 *
 * @event 'service-characteristic-change' => function({service, characteristic, oldValue, newValue, context}) { }
 *        Emitted after a change in the value of one of the provided Service's Characteristics.
 */
export declare class Accessory extends EventEmitter<Events> {
    displayName: string;
    UUID: string;
    /**
     * @deprecated Please use the Categories const enum above. Scheduled to be removed in 2021-06.
     */
    static Categories: typeof Categories;
    aid: Nullable<number>;
    _isBridge: boolean;
    bridged: boolean;
    bridge?: Accessory;
    bridgedAccessories: Accessory[];
    reachable: boolean;
    lastKnownUsername?: MacAddress;
    category: Categories;
    services: Service[];
    private primaryService?;
    shouldPurgeUnusedIDs: boolean;
    private controllers;
    private serializedControllers?;
    private activeCameraController?;
    _accessoryInfo?: Nullable<AccessoryInfo>;
    _setupID: Nullable<string>;
    _identifierCache?: Nullable<IdentifierCache>;
    controllerStorage: ControllerStorage;
    _advertiser?: Advertiser;
    _server?: HAPServer;
    _setupURI?: string;
    constructor(displayName: string, UUID: string);
    _identificationRequest: (paired: boolean, callback: CharacteristicSetCallback) => void;
    addService: (serviceParam: Service | typeof Service, ...constructorArgs: any[]) => Service;
    /**
     * @deprecated use {@link Service.setPrimaryService} directly
     */
    setPrimaryService: (service: Service) => void;
    removeService: (service: Service) => void;
    getService: <T extends WithUUID<typeof Service>>(name: string | T) => Service | undefined;
    getServiceById<T extends WithUUID<typeof Service>>(uuid: string | T, subType: string): Service | undefined;
    /**
     * Returns the bridging accessory if this accessory is bridged.
     * Otherwise returns itself.
     *
     * @returns the primary accessory
     */
    getPrimaryAccessory: () => Accessory;
    updateReachability: (reachable: boolean) => void;
    addBridgedAccessory: (accessory: Accessory, deferUpdate?: boolean) => Accessory;
    addBridgedAccessories: (accessories: Accessory[]) => void;
    removeBridgedAccessory: (accessory: Accessory, deferUpdate: boolean) => void;
    removeBridgedAccessories: (accessories: Accessory[]) => void;
    removeAllBridgedAccessories: () => void;
    getCharacteristicByIID: (iid: number) => Characteristic | undefined;
    getBridgedAccessoryByAID: (aid: number) => Accessory | undefined;
    findCharacteristic: (aid: number, iid: number) => Characteristic | undefined;
    /**
     * Method is used to configure an old style CameraSource.
     * The CameraSource API was fully replaced by the new Controller API used by {@link CameraController}.
     * The {@link CameraStreamingDelegate} used by the CameraController is the equivalent to the old CameraSource.
     *
     * The new Controller API is much more refined and robust way of "grouping" services together.
     * It especially is intended to fully support serialization/deserialization to/from persistent storage.
     * This feature is also gained when using the old style CameraSource API.
     * The {@link CameraStreamingDelegate} improves on the overall camera API though and provides some reworked
     * type definitions and a refined callback interface to better signal errors to the requesting HomeKit device.
     * It is advised to update to it.
     *
     * Full backwards compatibility is currently maintained. A legacy CameraSource will be wrapped into an Adapter.
     * All legacy StreamControllers in the "streamControllers" property will be replaced by CameraRTPManagement instances.
     * Any services in the "services" property which are one of the following are ignored:
     *     - CameraRTPStreamManagement
     *     - CameraOperatingMode
     *     - CameraEventRecordingManagement
     *
     * @param cameraSource {LegacyCameraSource}
     * @deprecated please refer to the new {@see CameraController} API and {@link configureController}
     */
    configureCameraSource(cameraSource: LegacyCameraSource): CameraController;
    /**
     * This method is used to setup a new Controller for this accessory. See {@see Controller} for a more detailed
     * explanation what a Controller is and what it is capable of.
     *
     * The controller can be passed as an instance of the class or as a constructor (without any necessary parameters)
     * for a new Controller.
     * Only one Controller of a given {@link ControllerType} can be configured for a given Accessory.
     *
     * When called, it will be checked if there are any services and persistent data the Controller (for the given
     * {@link ControllerType}) can be restored from. Otherwise the Controller will be created with new services.
     *
     *
     * @param controllerConstructor {Controller | ControllerConstructor}
     */
    configureController(controllerConstructor: Controller | ControllerConstructor): void;
    private handleUpdatedControllerServiceMap;
    setupURI: () => string;
    /**
     * This method is called right before the accessory is published. It should be used to check for common
     * mistakes in Accessory structured, which may lead to HomeKit rejecting the accessory when pairing.
     * If it is called on a bridge it will call this method for all bridged accessories.
     */
    private validateAccessory;
    /**
     * Assigns aid/iid to ourselves, any Accessories we are bridging, and all associated Services+Characteristics. Uses
     * the provided identifierCache to keep IDs stable.
     */
    _assignIDs: (identifierCache: IdentifierCache) => void;
    disableUnusedIDPurge: () => void;
    enableUnusedIDPurge: () => void;
    /**
     * Manually purge the unused ids if you like, comes handy
     * when you have disabled auto purge so you can do it manually
     */
    purgeUnusedIDs: () => void;
    /**
     * Returns a JSON representation of this Accessory suitable for delivering to HAP clients.
     */
    toHAP: (opt?: ToHAPOptions | undefined) => {
        aid: number | null;
        services: import("../types").HapService[];
    }[];
    /**
     * Publishes this Accessory on the local network for iOS clients to communicate with.
     *
     * @param {Object} info - Required info for publishing.
     * @param {string} info.username - The "username" (formatted as a MAC address - like "CC:22:3D:E3:CE:F6") of
     *                                this Accessory. Must be globally unique from all Accessories on your local network.
     * @param {string} info.pincode - The 8-digit pincode for clients to use when pairing this Accessory. Must be formatted
     *                               as a string like "031-45-154".
     * @param {string} info.category - One of the values of the Accessory.Category enum, like Accessory.Category.SWITCH.
     *                                This is a hint to iOS clients about what "type" of Accessory this represents, so
     *                                that for instance an appropriate icon can be drawn for the user while adding a
     *                                new Accessory.
     */
    publish: (info: PublishInfo, allowInsecureRequest?: boolean | undefined) => void;
    /**
     * Removes this Accessory from the local network
     * Accessory object will no longer valid after invoking this method
     * Trying to invoke publish() on the object will result undefined behavior
     */
    destroy: () => void;
    unpublish: () => void;
    _updateConfiguration: () => void;
    _onListening: (port: number) => void;
    _handleIdentify: (callback: IdentifyCallback) => void;
    _handlePair: (username: string, publicKey: Buffer, callback: PairCallback) => void;
    _handleAddPairing: (controller: Session, username: string, publicKey: Buffer, permission: PermissionTypes, callback: AddPairingCallback) => void;
    _handleRemovePairing: (controller: Session, username: string, callback: RemovePairingCallback) => void;
    _handleListPairings: (controller: Session, callback: ListPairingsCallback) => void;
    _handleAccessories: (callback: HandleAccessoriesCallback) => void;
    _handleGetCharacteristics: (data: CharacteristicData[], events: CharacteristicEvents, callback: HandleGetCharacteristicsCallback, remote: boolean, session: Session) => void;
    _handleSetCharacteristics: (writeRequest: CharacteristicsWriteRequest, events: CharacteristicEvents, callback: HandleSetCharacteristicsCallback, remote: boolean, session: Session) => void;
    _handleResource(data: Resource, callback: NodeCallback<Buffer>): void;
    _handleSessionClose: (sessionID: SessionIdentifier, events: CharacteristicEvents) => void;
    _unsubscribeEvents: (events: CharacteristicEvents) => void;
    _handleCharacteristicChange: (change: ServiceCharacteristicChange) => void;
    _setupService: (service: Service) => void;
    _sideloadServices: (targetServices: Service[]) => void;
    _generateSetupID: () => string;
    static serialize(accessory: Accessory): SerializedAccessory;
    static deserialize(json: SerializedAccessory): Accessory;
    static cleanupAccessoryData(username: MacAddress): void;
    private static serializeServiceMap;
    private static deserializeServiceMap;
}
export {};
//# sourceMappingURL=Accessory.d.ts.map