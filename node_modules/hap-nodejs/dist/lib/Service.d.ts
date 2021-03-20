import { Characteristic, SerializedCharacteristic } from './Characteristic';
import { EventEmitter } from './EventEmitter';
import { IdentifierCache } from './model/IdentifierCache';
import { CharacteristicChange, CharacteristicValue, HapService, Nullable, ToHAPOptions, WithUUID } from '../types';
import * as HomeKitTypes from './gen';
export interface SerializedService {
    displayName: string;
    UUID: string;
    subtype?: string;
    hiddenService?: boolean;
    primaryService?: boolean;
    characteristics: SerializedCharacteristic[];
    optionalCharacteristics?: SerializedCharacteristic[];
}
export declare type ServiceId = string;
export declare const enum ServiceEventTypes {
    CHARACTERISTIC_CHANGE = "characteristic-change",
    SERVICE_CONFIGURATION_CHANGE = "service-configurationChange"
}
export declare type ServiceConfigurationChange = {
    service: Service;
};
declare type Events = {
    [ServiceEventTypes.CHARACTERISTIC_CHANGE]: (change: CharacteristicChange) => void;
    [ServiceEventTypes.SERVICE_CONFIGURATION_CHANGE]: (change: ServiceConfigurationChange) => void;
};
/**
 * @deprecated Use ServiceEventTypes instead
 */
export declare type EventService = ServiceEventTypes.CHARACTERISTIC_CHANGE | ServiceEventTypes.SERVICE_CONFIGURATION_CHANGE;
/**
 * Service represents a set of grouped values necessary to provide a logical function. For instance, a
 * "Door Lock Mechanism" service might contain two values, one for the "desired lock state" and one for the
 * "current lock state". A particular Service is distinguished from others by its "type", which is a UUID.
 * HomeKit provides a set of known Service UUIDs defined in HomeKit.ts along with a corresponding
 * concrete subclass that you can instantiate directly to setup the necessary values. These natively-supported
 * Services are expected to contain a particular set of Characteristics.
 *
 * Unlike Characteristics, where you cannot have two Characteristics with the same UUID in the same Service,
 * you can actually have multiple Services with the same UUID in a single Accessory. For instance, imagine
 * a Garage Door Opener with both a "security light" and a "backlight" for the display. Each light could be
 * a "Lightbulb" Service with the same UUID. To account for this situation, we define an extra "subtype"
 * property on Service, that can be a string or other string-convertible object that uniquely identifies the
 * Service among its peers in an Accessory. For instance, you might have `service1.subtype = 'security_light'`
 * for one and `service2.subtype = 'backlight'` for the other.
 *
 * You can also define custom Services by providing your own UUID for the type that you generate yourself.
 * Custom Services can contain an arbitrary set of Characteristics, but Siri will likely not be able to
 * work with these.
 *
 * @event 'characteristic-change' => function({characteristic, oldValue, newValue, context}) { }
 *        Emitted after a change in the value of one of our Characteristics has occurred.
 */
export declare class Service extends EventEmitter<Events> {
    displayName: string;
    UUID: string;
    subtype?: string | undefined;
    static AccessControl: typeof HomeKitTypes.Generated.AccessControl;
    static AccessoryInformation: typeof HomeKitTypes.Generated.AccessoryInformation;
    static AirPurifier: typeof HomeKitTypes.Generated.AirPurifier;
    static AirQualitySensor: typeof HomeKitTypes.Generated.AirQualitySensor;
    static AudioStreamManagement: typeof HomeKitTypes.Remote.AudioStreamManagement;
    static BatteryService: typeof HomeKitTypes.Generated.BatteryService;
    static BridgeConfiguration: typeof HomeKitTypes.Bridged.BridgeConfiguration;
    static BridgingState: typeof HomeKitTypes.Bridged.BridgingState;
    static CameraControl: typeof HomeKitTypes.Bridged.CameraControl;
    static CameraRTPStreamManagement: typeof HomeKitTypes.Generated.CameraRTPStreamManagement;
    static CarbonDioxideSensor: typeof HomeKitTypes.Generated.CarbonDioxideSensor;
    static CarbonMonoxideSensor: typeof HomeKitTypes.Generated.CarbonMonoxideSensor;
    static ContactSensor: typeof HomeKitTypes.Generated.ContactSensor;
    static DataStreamTransportManagement: typeof HomeKitTypes.DataStream.DataStreamTransportManagement;
    static Door: typeof HomeKitTypes.Generated.Door;
    static Doorbell: typeof HomeKitTypes.Generated.Doorbell;
    static Fan: typeof HomeKitTypes.Generated.Fan;
    static Fanv2: typeof HomeKitTypes.Generated.Fanv2;
    static Faucet: typeof HomeKitTypes.Generated.Faucet;
    static FilterMaintenance: typeof HomeKitTypes.Generated.FilterMaintenance;
    static GarageDoorOpener: typeof HomeKitTypes.Generated.GarageDoorOpener;
    static HeaterCooler: typeof HomeKitTypes.Generated.HeaterCooler;
    static HumidifierDehumidifier: typeof HomeKitTypes.Generated.HumidifierDehumidifier;
    static HumiditySensor: typeof HomeKitTypes.Generated.HumiditySensor;
    static InputSource: typeof HomeKitTypes.TV.InputSource;
    static IrrigationSystem: typeof HomeKitTypes.Generated.IrrigationSystem;
    /**
     * @deprecated Removed in iOS 11. Use ServiceLabel instead.
     */
    static Label: typeof HomeKitTypes.Generated.ServiceLabel;
    static LeakSensor: typeof HomeKitTypes.Generated.LeakSensor;
    static LightSensor: typeof HomeKitTypes.Generated.LightSensor;
    static Lightbulb: typeof HomeKitTypes.Generated.Lightbulb;
    static LockManagement: typeof HomeKitTypes.Generated.LockManagement;
    static LockMechanism: typeof HomeKitTypes.Generated.LockMechanism;
    static Microphone: typeof HomeKitTypes.Generated.Microphone;
    static MotionSensor: typeof HomeKitTypes.Generated.MotionSensor;
    static OccupancySensor: typeof HomeKitTypes.Generated.OccupancySensor;
    static Outlet: typeof HomeKitTypes.Generated.Outlet;
    static Pairing: typeof HomeKitTypes.Bridged.Pairing;
    static ProtocolInformation: typeof HomeKitTypes.Bridged.ProtocolInformation;
    static Relay: typeof HomeKitTypes.Bridged.Relay;
    static SecuritySystem: typeof HomeKitTypes.Generated.SecuritySystem;
    static ServiceLabel: typeof HomeKitTypes.Generated.ServiceLabel;
    static Siri: typeof HomeKitTypes.Remote.Siri;
    static Slat: typeof HomeKitTypes.Generated.Slat;
    static SmokeSensor: typeof HomeKitTypes.Generated.SmokeSensor;
    static SmartSpeaker: typeof HomeKitTypes.Generated.SmartSpeaker;
    static Speaker: typeof HomeKitTypes.Generated.Speaker;
    static StatefulProgrammableSwitch: typeof HomeKitTypes.Bridged.StatefulProgrammableSwitch;
    static StatelessProgrammableSwitch: typeof HomeKitTypes.Generated.StatelessProgrammableSwitch;
    static Switch: typeof HomeKitTypes.Generated.Switch;
    static TargetControl: typeof HomeKitTypes.Remote.TargetControl;
    static TargetControlManagement: typeof HomeKitTypes.Remote.TargetControlManagement;
    static Television: typeof HomeKitTypes.TV.Television;
    static TelevisionSpeaker: typeof HomeKitTypes.TV.TelevisionSpeaker;
    static TemperatureSensor: typeof HomeKitTypes.Generated.TemperatureSensor;
    static Thermostat: typeof HomeKitTypes.Generated.Thermostat;
    static TimeInformation: typeof HomeKitTypes.Bridged.TimeInformation;
    static TunneledBTLEAccessoryService: typeof HomeKitTypes.Bridged.TunneledBTLEAccessoryService;
    static Valve: typeof HomeKitTypes.Generated.Valve;
    static Window: typeof HomeKitTypes.Generated.Window;
    static WindowCovering: typeof HomeKitTypes.Generated.WindowCovering;
    static CameraOperatingMode: typeof HomeKitTypes.Generated.CameraOperatingMode;
    static CameraEventRecordingManagement: typeof HomeKitTypes.Generated.CameraEventRecordingManagement;
    static WiFiRouter: typeof HomeKitTypes.Generated.WiFiRouter;
    static WiFiSatellite: typeof HomeKitTypes.Generated.WiFiSatellite;
    static PowerManagement: typeof HomeKitTypes.Generated.PowerManagement;
    static TransferTransportManagement: typeof HomeKitTypes.Generated.TransferTransportManagement;
    static AccessoryRuntimeInformation: typeof HomeKitTypes.Generated.AccessoryRuntimeInformation;
    static Diagnostics: typeof HomeKitTypes.Generated.Diagnostics;
    static WiFiTransport: typeof HomeKitTypes.Generated.WiFiTransport;
    iid: Nullable<number>;
    name: Nullable<string>;
    characteristics: Characteristic[];
    optionalCharacteristics: Characteristic[];
    isHiddenService: boolean;
    isPrimaryService: boolean;
    linkedServices: Service[];
    constructor(displayName: string, UUID: string, subtype?: string | undefined);
    /**
     * Returns an id which uniquely identifies an service on the associated accessory.
     * The serviceId is a concatenation of the UUID for the service (defined by HAP) and the subtype (could be empty)
     * which is programmatically defined by the programmer.
     *
     * @returns the serviceId
     */
    getServiceId(): ServiceId;
    addCharacteristic: (characteristic: Characteristic | (new (...args: any[]) => Characteristic), ...constructorArgs: any[]) => Characteristic;
    /**
     * Sets this service as the new primary service.
     * Any currently active primary service will be reset to be not primary.
     * This will happen immediately, if the service was already added to an accessory, or later
     * when the service gets added to an accessory.
     *
     * @param isPrimary {boolean} - optional boolean (default true) if the service should be the primary service
     */
    setPrimaryService: (isPrimary?: boolean) => void;
    /**
     * Marks the service as hidden
     *
     * @param isHidden {boolean} - optional boolean (default true) if the service should be marked hidden
     */
    setHiddenService: (isHidden?: boolean) => void;
    addLinkedService: (newLinkedService: Service) => void;
    removeLinkedService: (oldLinkedService: Service) => void;
    removeCharacteristic: (characteristic: Characteristic) => void;
    getCharacteristic(constructor: WithUUID<{
        new (): Characteristic;
    }>): Characteristic;
    getCharacteristic(name: string | WithUUID<{
        new (): Characteristic;
    }>): Characteristic | undefined;
    testCharacteristic: <T extends WithUUID<typeof Characteristic>>(name: string | T) => boolean;
    setCharacteristic: <T extends WithUUID<new () => Characteristic>>(name: string | T, value: CharacteristicValue) => this;
    updateCharacteristic: <T extends WithUUID<new () => Characteristic>>(name: string | T, value: CharacteristicValue) => this;
    addOptionalCharacteristic: (characteristic: Characteristic | {
        new (): Characteristic;
    }) => void;
    /**
     * This method was created to copy all characteristics from another service to this.
     * It's only adopting is currently in homebridge to merge the AccessoryInformation service. So some things
     * my be explicitly tailored towards this use case.
     *
     * It will not remove characteristics which are present currently but not added on the other characteristic.
     * It will not replace the characteristic if the value is falsey (except of '0' or 'false')
     * @param service
     */
    replaceCharacteristicsFromService(service: Service): void;
    getCharacteristicByIID: (iid: number) => Characteristic | undefined;
    _assignIDs: (identifierCache: IdentifierCache, accessoryName: string, baseIID?: number) => void;
    /**
     * Returns a JSON representation of this Accessory suitable for delivering to HAP clients.
     */
    toHAP: (opt?: ToHAPOptions | undefined) => HapService;
    _setupCharacteristic: (characteristic: Characteristic) => void;
    _sideloadCharacteristics: (targetCharacteristics: Characteristic[]) => void;
    static serialize: (service: Service) => SerializedService;
    static deserialize: (json: SerializedService) => Service;
}
export {};
//# sourceMappingURL=Service.d.ts.map