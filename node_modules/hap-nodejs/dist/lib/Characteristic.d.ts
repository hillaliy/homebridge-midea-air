import { IdentifierCache } from './model/IdentifierCache';
import { CharacteristicChange, CharacteristicValue, HapCharacteristic, SessionIdentifier, Nullable, ToHAPOptions, VoidCallback } from '../types';
import { EventEmitter } from './EventEmitter';
import * as HomeKitTypes from './gen';
export declare const enum Formats {
    BOOL = "bool",
    INT = "int",
    FLOAT = "float",
    STRING = "string",
    UINT8 = "uint8",
    UINT16 = "uint16",
    UINT32 = "uint32",
    UINT64 = "uint64",
    DATA = "data",
    TLV8 = "tlv8",
    ARRAY = "array",
    DICTIONARY = "dict"
}
export declare const enum Units {
    CELSIUS = "celsius",
    PERCENTAGE = "percentage",
    ARC_DEGREE = "arcdegrees",
    LUX = "lux",
    SECONDS = "seconds"
}
export declare const enum Perms {
    /**
     * @deprecated replaced by {@link PAIRED_READ}. Kept for backwards compatibility.
     */
    READ = "pr",
    /**
     * @deprecated replaced by {@link PAIRED_WRITE}. Kept for backwards compatibility.
     */
    WRITE = "pw",
    PAIRED_READ = "pr",
    PAIRED_WRITE = "pw",
    NOTIFY = "ev",
    EVENTS = "ev",
    ADDITIONAL_AUTHORIZATION = "aa",
    TIMED_WRITE = "tw",
    HIDDEN = "hd",
    WRITE_RESPONSE = "wr"
}
export interface CharacteristicProps {
    format: Formats;
    unit?: Units;
    perms: Perms[];
    ev?: boolean;
    description?: string;
    minValue?: number;
    maxValue?: number;
    minStep?: number;
    maxLen?: number;
    maxDataLen?: number;
    validValues?: number[];
    validValueRanges?: [number, number];
    adminOnlyAccess?: Access[];
}
export declare const enum Access {
    READ = 0,
    WRITE = 1,
    NOTIFY = 2
}
export interface SerializedCharacteristic {
    displayName: string;
    UUID: string;
    props: CharacteristicProps;
    value: Nullable<CharacteristicValue>;
    eventOnlyCharacteristic: boolean;
}
export declare const enum CharacteristicEventTypes {
    GET = "get",
    SET = "set",
    SUBSCRIBE = "subscribe",
    UNSUBSCRIBE = "unsubscribe",
    CHANGE = "change"
}
export declare type CharacteristicGetCallback<T = Nullable<CharacteristicValue>> = (error?: Error | null, value?: T) => void;
export declare type CharacteristicSetCallback = (error?: Error | null, value?: CharacteristicValue) => void;
declare type Events = {
    ["change"]: (change: CharacteristicChange) => void;
    ["get"]: (cb: CharacteristicGetCallback, context?: any, connectionID?: SessionIdentifier) => void;
    ["set"]: (value: CharacteristicValue, cb: CharacteristicSetCallback, context?: any, connectionID?: SessionIdentifier) => void;
    ["subscribe"]: VoidCallback;
    ["unsubscribe"]: VoidCallback;
};
/**
 * Characteristic represents a particular typed variable that can be assigned to a Service. For instance, a
 * "Hue" Characteristic might store a 'float' value of type 'arcdegrees'. You could add the Hue Characteristic
 * to a Service in order to store that value. A particular Characteristic is distinguished from others by its
 * UUID. HomeKit provides a set of known Characteristic UUIDs defined in HomeKit.ts along with a
 * corresponding concrete subclass.
 *
 * You can also define custom Characteristics by providing your own UUID. Custom Characteristics can be added
 * to any native or custom Services, but Siri will likely not be able to work with these.
 *
 * Note that you can get the "value" of a Characteristic by accessing the "value" property directly, but this
 * is really a "cached value". If you want to fetch the latest value, which may involve doing some work, then
 * call getValue().
 *
 * @event 'get' => function(callback(err, newValue), context) { }
 *        Emitted when someone calls getValue() on this Characteristic and desires the latest non-cached
 *        value. If there are any listeners to this event, one of them MUST call the callback in order
 *        for the value to ever be delivered. The `context` object is whatever was passed in by the initiator
 *        of this event (for instance whomever called `getValue`).
 *
 * @event 'set' => function(newValue, callback(err), context) { }
 *        Emitted when someone calls setValue() on this Characteristic with a desired new value. If there
 *        are any listeners to this event, one of them MUST call the callback in order for this.value to
 *        actually be set. The `context` object is whatever was passed in by the initiator of this change
 *        (for instance, whomever called `setValue`).
 *
 * @event 'change' => function({ oldValue, newValue, context }) { }
 *        Emitted after a change in our value has occurred. The new value will also be immediately accessible
 *        in this.value. The event object contains the new value as well as the context object originally
 *        passed in by the initiator of this change (if known).
 */
export declare class Characteristic extends EventEmitter<Events> {
    displayName: string;
    UUID: string;
    /**
     * @deprecated Please use the Formats const enum above. Scheduled to be removed in 2021-06.
     */
    static Formats: typeof Formats;
    /**
     * @deprecated Please use the Units const enum above. Scheduled to be removed in 2021-06.
     */
    static Units: typeof Units;
    /**
     * @deprecated Please use the Perms const enum above. Scheduled to be removed in 2021-06.
     */
    static Perms: typeof Perms;
    static AccessControlLevel: typeof HomeKitTypes.Generated.AccessControlLevel;
    static AccessoryFlags: typeof HomeKitTypes.Generated.AccessoryFlags;
    static AccessoryIdentifier: typeof HomeKitTypes.Bridged.AccessoryIdentifier;
    static Active: typeof HomeKitTypes.Generated.Active;
    static ActiveIdentifier: typeof HomeKitTypes.TV.ActiveIdentifier;
    static AdministratorOnlyAccess: typeof HomeKitTypes.Generated.AdministratorOnlyAccess;
    static AirParticulateDensity: typeof HomeKitTypes.Generated.AirParticulateDensity;
    static AirParticulateSize: typeof HomeKitTypes.Generated.AirParticulateSize;
    static AirQuality: typeof HomeKitTypes.Generated.AirQuality;
    static AppMatchingIdentifier: typeof HomeKitTypes.Bridged.AppMatchingIdentifier;
    static AudioFeedback: typeof HomeKitTypes.Generated.AudioFeedback;
    static BatteryLevel: typeof HomeKitTypes.Generated.BatteryLevel;
    static Brightness: typeof HomeKitTypes.Generated.Brightness;
    static ButtonEvent: typeof HomeKitTypes.Remote.ButtonEvent;
    static CarbonDioxideDetected: typeof HomeKitTypes.Generated.CarbonDioxideDetected;
    static CarbonDioxideLevel: typeof HomeKitTypes.Generated.CarbonDioxideLevel;
    static CarbonDioxidePeakLevel: typeof HomeKitTypes.Generated.CarbonDioxidePeakLevel;
    static CarbonMonoxideDetected: typeof HomeKitTypes.Generated.CarbonMonoxideDetected;
    static CarbonMonoxideLevel: typeof HomeKitTypes.Generated.CarbonMonoxideLevel;
    static CarbonMonoxidePeakLevel: typeof HomeKitTypes.Generated.CarbonMonoxidePeakLevel;
    static Category: typeof HomeKitTypes.Bridged.Category;
    static ChargingState: typeof HomeKitTypes.Generated.ChargingState;
    static ClosedCaptions: typeof HomeKitTypes.TV.ClosedCaptions;
    static ColorTemperature: typeof HomeKitTypes.Generated.ColorTemperature;
    static ConfigureBridgedAccessory: typeof HomeKitTypes.Bridged.ConfigureBridgedAccessory;
    static ConfigureBridgedAccessoryStatus: typeof HomeKitTypes.Bridged.ConfigureBridgedAccessoryStatus;
    static ConfiguredName: typeof HomeKitTypes.TV.ConfiguredName;
    static ContactSensorState: typeof HomeKitTypes.Generated.ContactSensorState;
    static CoolingThresholdTemperature: typeof HomeKitTypes.Generated.CoolingThresholdTemperature;
    static CurrentAirPurifierState: typeof HomeKitTypes.Generated.CurrentAirPurifierState;
    static CurrentAmbientLightLevel: typeof HomeKitTypes.Generated.CurrentAmbientLightLevel;
    static CurrentDoorState: typeof HomeKitTypes.Generated.CurrentDoorState;
    static CurrentFanState: typeof HomeKitTypes.Generated.CurrentFanState;
    static CurrentHeaterCoolerState: typeof HomeKitTypes.Generated.CurrentHeaterCoolerState;
    static CurrentHeatingCoolingState: typeof HomeKitTypes.Generated.CurrentHeatingCoolingState;
    static CurrentHorizontalTiltAngle: typeof HomeKitTypes.Generated.CurrentHorizontalTiltAngle;
    static CurrentHumidifierDehumidifierState: typeof HomeKitTypes.Generated.CurrentHumidifierDehumidifierState;
    static CurrentMediaState: typeof HomeKitTypes.TV.CurrentMediaState;
    static CurrentPosition: typeof HomeKitTypes.Generated.CurrentPosition;
    static CurrentRelativeHumidity: typeof HomeKitTypes.Generated.CurrentRelativeHumidity;
    static CurrentSlatState: typeof HomeKitTypes.Generated.CurrentSlatState;
    static CurrentTemperature: typeof HomeKitTypes.Generated.CurrentTemperature;
    static CurrentTiltAngle: typeof HomeKitTypes.Generated.CurrentTiltAngle;
    static CurrentTime: typeof HomeKitTypes.Bridged.CurrentTime;
    static CurrentVerticalTiltAngle: typeof HomeKitTypes.Generated.CurrentVerticalTiltAngle;
    static CurrentVisibilityState: typeof HomeKitTypes.TV.CurrentVisibilityState;
    static DayoftheWeek: typeof HomeKitTypes.Bridged.DayoftheWeek;
    static DigitalZoom: typeof HomeKitTypes.Generated.DigitalZoom;
    static DiscoverBridgedAccessories: typeof HomeKitTypes.Bridged.DiscoverBridgedAccessories;
    static DiscoveredBridgedAccessories: typeof HomeKitTypes.Bridged.DiscoveredBridgedAccessories;
    static DisplayOrder: typeof HomeKitTypes.TV.DisplayOrder;
    static FilterChangeIndication: typeof HomeKitTypes.Generated.FilterChangeIndication;
    static FilterLifeLevel: typeof HomeKitTypes.Generated.FilterLifeLevel;
    static FirmwareRevision: typeof HomeKitTypes.Generated.FirmwareRevision;
    static HardwareRevision: typeof HomeKitTypes.Generated.HardwareRevision;
    static HeatingThresholdTemperature: typeof HomeKitTypes.Generated.HeatingThresholdTemperature;
    static HoldPosition: typeof HomeKitTypes.Generated.HoldPosition;
    static Hue: typeof HomeKitTypes.Generated.Hue;
    static Identifier: typeof HomeKitTypes.TV.Identifier;
    static Identify: typeof HomeKitTypes.Generated.Identify;
    static ImageMirroring: typeof HomeKitTypes.Generated.ImageMirroring;
    static ImageRotation: typeof HomeKitTypes.Generated.ImageRotation;
    static InUse: typeof HomeKitTypes.Generated.InUse;
    static InputDeviceType: typeof HomeKitTypes.TV.InputDeviceType;
    static InputSourceType: typeof HomeKitTypes.TV.InputSourceType;
    static IsConfigured: typeof HomeKitTypes.Generated.IsConfigured;
    /**
     * @deprecated Removed in iOS 11. Use ServiceLabelIndex instead.
     */
    static LabelIndex: typeof HomeKitTypes.Generated.ServiceLabelIndex;
    /**
     * @deprecated Removed in iOS 11. Use ServiceLabelNamespace instead.
     */
    static LabelNamespace: typeof HomeKitTypes.Generated.ServiceLabelNamespace;
    static LeakDetected: typeof HomeKitTypes.Generated.LeakDetected;
    static LinkQuality: typeof HomeKitTypes.Bridged.LinkQuality;
    static LockControlPoint: typeof HomeKitTypes.Generated.LockControlPoint;
    static LockCurrentState: typeof HomeKitTypes.Generated.LockCurrentState;
    static LockLastKnownAction: typeof HomeKitTypes.Generated.LockLastKnownAction;
    static LockManagementAutoSecurityTimeout: typeof HomeKitTypes.Generated.LockManagementAutoSecurityTimeout;
    static LockPhysicalControls: typeof HomeKitTypes.Generated.LockPhysicalControls;
    static LockTargetState: typeof HomeKitTypes.Generated.LockTargetState;
    static Logs: typeof HomeKitTypes.Generated.Logs;
    static Manufacturer: typeof HomeKitTypes.Generated.Manufacturer;
    static Model: typeof HomeKitTypes.Generated.Model;
    static MotionDetected: typeof HomeKitTypes.Generated.MotionDetected;
    static Mute: typeof HomeKitTypes.Generated.Mute;
    static Name: typeof HomeKitTypes.Generated.Name;
    static NightVision: typeof HomeKitTypes.Generated.NightVision;
    static NitrogenDioxideDensity: typeof HomeKitTypes.Generated.NitrogenDioxideDensity;
    static ObstructionDetected: typeof HomeKitTypes.Generated.ObstructionDetected;
    static OccupancyDetected: typeof HomeKitTypes.Generated.OccupancyDetected;
    static On: typeof HomeKitTypes.Generated.On;
    static OpticalZoom: typeof HomeKitTypes.Generated.OpticalZoom;
    static OutletInUse: typeof HomeKitTypes.Generated.OutletInUse;
    static OzoneDensity: typeof HomeKitTypes.Generated.OzoneDensity;
    static PM10Density: typeof HomeKitTypes.Generated.PM10Density;
    static PM2_5Density: typeof HomeKitTypes.Generated.PM2_5Density;
    static PairSetup: typeof HomeKitTypes.Generated.PairSetup;
    static PairVerify: typeof HomeKitTypes.Generated.PairVerify;
    static PairingFeatures: typeof HomeKitTypes.Generated.PairingFeatures;
    static PairingPairings: typeof HomeKitTypes.Generated.PairingPairings;
    static PasswordSetting: typeof HomeKitTypes.Generated.PasswordSetting;
    static PictureMode: typeof HomeKitTypes.TV.PictureMode;
    static PositionState: typeof HomeKitTypes.Generated.PositionState;
    static PowerModeSelection: typeof HomeKitTypes.TV.PowerModeSelection;
    static ProgramMode: typeof HomeKitTypes.Generated.ProgramMode;
    static ProgrammableSwitchEvent: typeof HomeKitTypes.Generated.ProgrammableSwitchEvent;
    static ProductData: typeof HomeKitTypes.Generated.ProductData;
    static ProgrammableSwitchOutputState: typeof HomeKitTypes.Bridged.ProgrammableSwitchOutputState;
    static Reachable: typeof HomeKitTypes.Bridged.Reachable;
    static RelativeHumidityDehumidifierThreshold: typeof HomeKitTypes.Generated.RelativeHumidityDehumidifierThreshold;
    static RelativeHumidityHumidifierThreshold: typeof HomeKitTypes.Generated.RelativeHumidityHumidifierThreshold;
    static RelayControlPoint: typeof HomeKitTypes.Bridged.RelayControlPoint;
    static RelayEnabled: typeof HomeKitTypes.Bridged.RelayEnabled;
    static RelayState: typeof HomeKitTypes.Bridged.RelayState;
    static RemainingDuration: typeof HomeKitTypes.Generated.RemainingDuration;
    static RemoteKey: typeof HomeKitTypes.TV.RemoteKey;
    static ResetFilterIndication: typeof HomeKitTypes.Generated.ResetFilterIndication;
    static RotationDirection: typeof HomeKitTypes.Generated.RotationDirection;
    static RotationSpeed: typeof HomeKitTypes.Generated.RotationSpeed;
    static Saturation: typeof HomeKitTypes.Generated.Saturation;
    static SecuritySystemAlarmType: typeof HomeKitTypes.Generated.SecuritySystemAlarmType;
    static SecuritySystemCurrentState: typeof HomeKitTypes.Generated.SecuritySystemCurrentState;
    static SecuritySystemTargetState: typeof HomeKitTypes.Generated.SecuritySystemTargetState;
    static SelectedAudioStreamConfiguration: typeof HomeKitTypes.Remote.SelectedAudioStreamConfiguration;
    /**
     * @deprecated Removed in iOS 11. Use SelectedRTPStreamConfiguration instead.
     */
    static SelectedStreamConfiguration: typeof HomeKitTypes.Generated.SelectedRTPStreamConfiguration;
    static SelectedRTPStreamConfiguration: typeof HomeKitTypes.Generated.SelectedRTPStreamConfiguration;
    static SerialNumber: typeof HomeKitTypes.Generated.SerialNumber;
    static ServiceLabelIndex: typeof HomeKitTypes.Generated.ServiceLabelIndex;
    static ServiceLabelNamespace: typeof HomeKitTypes.Generated.ServiceLabelNamespace;
    static SetDuration: typeof HomeKitTypes.Generated.SetDuration;
    static SetupDataStreamTransport: typeof HomeKitTypes.DataStream.SetupDataStreamTransport;
    static SetupEndpoints: typeof HomeKitTypes.Generated.SetupEndpoints;
    static SiriInputType: typeof HomeKitTypes.Remote.SiriInputType;
    static SlatType: typeof HomeKitTypes.Generated.SlatType;
    static SleepDiscoveryMode: typeof HomeKitTypes.TV.SleepDiscoveryMode;
    static SmokeDetected: typeof HomeKitTypes.Generated.SmokeDetected;
    static SoftwareRevision: typeof HomeKitTypes.Bridged.SoftwareRevision;
    static StatusActive: typeof HomeKitTypes.Generated.StatusActive;
    static StatusFault: typeof HomeKitTypes.Generated.StatusFault;
    static StatusJammed: typeof HomeKitTypes.Generated.StatusJammed;
    static StatusLowBattery: typeof HomeKitTypes.Generated.StatusLowBattery;
    static StatusTampered: typeof HomeKitTypes.Generated.StatusTampered;
    static StreamingStatus: typeof HomeKitTypes.Generated.StreamingStatus;
    static SulphurDioxideDensity: typeof HomeKitTypes.Generated.SulphurDioxideDensity;
    static SupportedAudioStreamConfiguration: typeof HomeKitTypes.Generated.SupportedAudioStreamConfiguration;
    static SupportedDataStreamTransportConfiguration: typeof HomeKitTypes.DataStream.SupportedDataStreamTransportConfiguration;
    static SupportedRTPConfiguration: typeof HomeKitTypes.Generated.SupportedRTPConfiguration;
    static SupportedVideoStreamConfiguration: typeof HomeKitTypes.Generated.SupportedVideoStreamConfiguration;
    static SwingMode: typeof HomeKitTypes.Generated.SwingMode;
    static TargetAirPurifierState: typeof HomeKitTypes.Generated.TargetAirPurifierState;
    static TargetAirQuality: typeof HomeKitTypes.Generated.TargetAirQuality;
    static TargetControlList: typeof HomeKitTypes.Remote.TargetControlList;
    static TargetControlSupportedConfiguration: typeof HomeKitTypes.Remote.TargetControlSupportedConfiguration;
    static TargetDoorState: typeof HomeKitTypes.Generated.TargetDoorState;
    static TargetFanState: typeof HomeKitTypes.Generated.TargetFanState;
    static TargetHeaterCoolerState: typeof HomeKitTypes.Generated.TargetHeaterCoolerState;
    static TargetHeatingCoolingState: typeof HomeKitTypes.Generated.TargetHeatingCoolingState;
    static TargetHorizontalTiltAngle: typeof HomeKitTypes.Generated.TargetHorizontalTiltAngle;
    static TargetHumidifierDehumidifierState: typeof HomeKitTypes.Generated.TargetHumidifierDehumidifierState;
    static TargetMediaState: typeof HomeKitTypes.TV.TargetMediaState;
    static TargetPosition: typeof HomeKitTypes.Generated.TargetPosition;
    static TargetRelativeHumidity: typeof HomeKitTypes.Generated.TargetRelativeHumidity;
    static TargetSlatState: typeof HomeKitTypes.Generated.TargetSlatState;
    static TargetTemperature: typeof HomeKitTypes.Generated.TargetTemperature;
    static TargetTiltAngle: typeof HomeKitTypes.Generated.TargetTiltAngle;
    static TargetVerticalTiltAngle: typeof HomeKitTypes.Generated.TargetVerticalTiltAngle;
    static TargetVisibilityState: typeof HomeKitTypes.TV.TargetVisibilityState;
    static TemperatureDisplayUnits: typeof HomeKitTypes.Generated.TemperatureDisplayUnits;
    static TimeUpdate: typeof HomeKitTypes.Bridged.TimeUpdate;
    static TunnelConnectionTimeout: typeof HomeKitTypes.Bridged.TunnelConnectionTimeout;
    static TunneledAccessoryAdvertising: typeof HomeKitTypes.Bridged.TunneledAccessoryAdvertising;
    static TunneledAccessoryConnected: typeof HomeKitTypes.Bridged.TunneledAccessoryConnected;
    static TunneledAccessoryStateNumber: typeof HomeKitTypes.Bridged.TunneledAccessoryStateNumber;
    static VOCDensity: typeof HomeKitTypes.Generated.VOCDensity;
    static ValveType: typeof HomeKitTypes.Generated.ValveType;
    static Version: typeof HomeKitTypes.Generated.Version;
    static Volume: typeof HomeKitTypes.Generated.Volume;
    static VolumeControlType: typeof HomeKitTypes.TV.VolumeControlType;
    static VolumeSelector: typeof HomeKitTypes.TV.VolumeSelector;
    static WaterLevel: typeof HomeKitTypes.Generated.WaterLevel;
    static ManuallyDisabled: typeof HomeKitTypes.Generated.ManuallyDisabled;
    static ThirdPartyCameraActive: typeof HomeKitTypes.Generated.ThirdPartyCameraActive;
    static PeriodicSnapshotsActive: typeof HomeKitTypes.Generated.PeriodicSnapshotsActive;
    static EventSnapshotsActive: typeof HomeKitTypes.Generated.EventSnapshotsActive;
    static HomeKitCameraActive: typeof HomeKitTypes.Generated.HomeKitCameraActive;
    static RecordingAudioActive: typeof HomeKitTypes.Generated.RecordingAudioActive;
    static SupportedCameraRecordingConfiguration: typeof HomeKitTypes.Generated.SupportedCameraRecordingConfiguration;
    static SupportedVideoRecordingConfiguration: typeof HomeKitTypes.Generated.SupportedVideoRecordingConfiguration;
    static SupportedAudioRecordingConfiguration: typeof HomeKitTypes.Generated.SupportedAudioRecordingConfiguration;
    static SelectedCameraRecordingConfiguration: typeof HomeKitTypes.Generated.SelectedCameraRecordingConfiguration;
    static CameraOperatingModeIndicator: typeof HomeKitTypes.Generated.CameraOperatingModeIndicator;
    /**
     * @deprecated Removed in iOS 13.4
     */
    static DiagonalFieldOfView: typeof HomeKitTypes.Generated.DiagonalFieldOfView;
    static NetworkClientProfileControl: typeof HomeKitTypes.Generated.NetworkClientProfileControl;
    static NetworkClientStatusControl: typeof HomeKitTypes.Generated.NetworkClientStatusControl;
    static RouterStatus: typeof HomeKitTypes.Generated.RouterStatus;
    static SupportedRouterConfiguration: typeof HomeKitTypes.Generated.SupportedRouterConfiguration;
    static WANConfigurationList: typeof HomeKitTypes.Generated.WANConfigurationList;
    static WANStatusList: typeof HomeKitTypes.Generated.WANStatusList;
    static ManagedNetworkEnable: typeof HomeKitTypes.Generated.ManagedNetworkEnable;
    static NetworkAccessViolationControl: typeof HomeKitTypes.Generated.NetworkAccessViolationControl;
    static WiFiSatelliteStatus: typeof HomeKitTypes.Generated.WiFiSatelliteStatus;
    static WakeConfiguration: typeof HomeKitTypes.Generated.WakeConfiguration;
    static SupportedTransferTransportConfiguration: typeof HomeKitTypes.Generated.SupportedTransferTransportConfiguration;
    static SetupTransferTransport: typeof HomeKitTypes.Generated.SetupTransferTransport;
    static ActivityInterval: typeof HomeKitTypes.Generated.ActivityInterval;
    static CCAEnergyDetectThreshold: typeof HomeKitTypes.Generated.CCAEnergyDetectThreshold;
    static CCASignalDetectThreshold: typeof HomeKitTypes.Generated.CCASignalDetectThreshold;
    static CharacteristicValueTransitionControl: typeof HomeKitTypes.Generated.CharacteristicValueTransitionControl;
    static SupportedCharacteristicValueTransitionConfiguration: typeof HomeKitTypes.Generated.SupportedCharacteristicValueTransitionConfiguration;
    static CurrentTransport: typeof HomeKitTypes.Generated.CurrentTransport;
    static DataStreamHAPTransport: typeof HomeKitTypes.Generated.DataStreamHAPTransport;
    static DataStreamHAPTransportInterrupt: typeof HomeKitTypes.Generated.DataStreamHAPTransportInterrupt;
    static EventRetransmissionMaximum: typeof HomeKitTypes.Generated.EventRetransmissionMaximum;
    static EventTransmissionCounters: typeof HomeKitTypes.Generated.EventTransmissionCounters;
    static HeartBeat: typeof HomeKitTypes.Generated.HeartBeat;
    static MACRetransmissionMaximum: typeof HomeKitTypes.Generated.MACRetransmissionMaximum;
    static MACTransmissionCounters: typeof HomeKitTypes.Generated.MACTransmissionCounters;
    static OperatingStateResponse: typeof HomeKitTypes.Generated.OperatingStateResponse;
    static Ping: typeof HomeKitTypes.Generated.Ping;
    static ReceiverSensitivity: typeof HomeKitTypes.Generated.ReceiverSensitivity;
    static ReceivedSignalStrengthIndication: typeof HomeKitTypes.Generated.ReceivedSignalStrengthIndication;
    static SleepInterval: typeof HomeKitTypes.Generated.SleepInterval;
    static SignalToNoiseRatio: typeof HomeKitTypes.Generated.SignalToNoiseRatio;
    static SupportedDiagnosticsSnapshot: typeof HomeKitTypes.Generated.SupportedDiagnosticsSnapshot;
    static TransmitPower: typeof HomeKitTypes.Generated.TransmitPower;
    static TransmitPowerMaximum: typeof HomeKitTypes.Generated.TransmitPowerMaximum;
    static VideoAnalysisActive: typeof HomeKitTypes.Generated.VideoAnalysisActive;
    static WiFiCapabilities: typeof HomeKitTypes.Generated.WiFiCapabilities;
    static WiFiConfigurationControl: typeof HomeKitTypes.Generated.WiFiConfigurationControl;
    iid: Nullable<number>;
    value: Nullable<CharacteristicValue>;
    status: Nullable<Error>;
    eventOnlyCharacteristic: boolean;
    props: CharacteristicProps;
    subscriptions: number;
    'valid-values': number[];
    'valid-values-range': [number, number];
    constructor(displayName: string, UUID: string, props?: CharacteristicProps);
    /**
     * Copies the given properties to our props member variable,
     * and returns 'this' for chaining.
     *
     * @param 'props' {
     *   format: <one of Formats>,
     *   unit: <one of Characteristic.Units>,
     *   perms: array of [Characteristic.Perms] like [Characteristic.Perms.READ, Characteristic.Perms.WRITE]
     *   ev: <Event Notifications Enabled Boolean>, (Optional)
     *   description: <String of description>, (Optional)
     *   minValue: <minimum value for numeric characteristics>, (Optional)
     *   maxValue: <maximum value for numeric characteristics>, (Optional)
     *   minStep: <smallest allowed increment for numeric characteristics>, (Optional)
     *   maxLen: <max length of string up to 256>, (Optional default: 64)
     *   maxDataLen: <max length of data>, (Optional default: 2097152)
     *   valid-values: <array of numbers>, (Optional)
     *   valid-values-range: <array of two numbers for start and end range> (Optional)
     * }
     */
    setProps: (props: Partial<CharacteristicProps>) => this;
    subscribe: () => void;
    unsubscribe: () => void;
    getValue: (callback?: CharacteristicGetCallback<Nullable<CharacteristicValue>> | undefined, context?: any, connectionID?: string | undefined) => void;
    validateValue: (newValue: Nullable<CharacteristicValue>) => Nullable<CharacteristicValue>;
    setValue: (newValue: Nullable<CharacteristicValue | Error>, callback?: CharacteristicSetCallback | undefined, context?: any, connectionID?: string | undefined) => Characteristic;
    updateValue: (newValue: Nullable<CharacteristicValue | Error>, callback?: (() => void) | undefined, context?: any) => Characteristic;
    getDefaultValue: () => Nullable<CharacteristicValue>;
    _assignID: (identifierCache: IdentifierCache, accessoryName: string, serviceUUID: string, serviceSubtype?: string | undefined) => void;
    /**
     * Returns a JSON representation of this Accessory suitable for delivering to HAP clients.
     */
    toHAP: (opt?: ToHAPOptions | undefined) => HapCharacteristic;
    static serialize: (characteristic: Characteristic) => SerializedCharacteristic;
    static deserialize: (json: SerializedCharacteristic) => Characteristic;
}
export {};
//# sourceMappingURL=Characteristic.d.ts.map