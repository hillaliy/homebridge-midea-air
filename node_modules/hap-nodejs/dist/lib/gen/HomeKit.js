"use strict";
// THIS FILE IS AUTO-GENERATED - DO NOT MODIFY
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WiFiTransport = exports.Diagnostics = exports.AccessoryRuntimeInformation = exports.TransferTransportManagement = exports.PowerManagement = exports.WiFiSatellite = exports.WiFiRouter = exports.CameraEventRecordingManagement = exports.CameraOperatingMode = exports.WindowCovering = exports.Window = exports.Valve = exports.Thermostat = exports.TemperatureSensor = exports.Switch = exports.StatelessProgrammableSwitch = exports.Speaker = exports.SmartSpeaker = exports.SmokeSensor = exports.Slat = exports.ServiceLabel = exports.SecuritySystem = exports.Outlet = exports.OccupancySensor = exports.MotionSensor = exports.Microphone = exports.LockMechanism = exports.LockManagement = exports.Lightbulb = exports.LightSensor = exports.LeakSensor = exports.IrrigationSystem = exports.HumiditySensor = exports.HumidifierDehumidifier = exports.HeaterCooler = exports.GarageDoorOpener = exports.Faucet = exports.FilterMaintenance = exports.Fanv2 = exports.Fan = exports.Doorbell = exports.Door = exports.ContactSensor = exports.CarbonMonoxideSensor = exports.CarbonDioxideSensor = exports.CameraRTPStreamManagement = exports.BatteryService = exports.AirQualitySensor = exports.AirPurifier = exports.AccessoryInformation = exports.AccessControl = exports.WiFiConfigurationControl = exports.WiFiCapabilities = exports.VideoAnalysisActive = exports.TransmitPowerMaximum = exports.TransmitPower = exports.SupportedDiagnosticsSnapshot = exports.SignalToNoiseRatio = exports.SleepInterval = exports.ReceivedSignalStrengthIndication = exports.ReceiverSensitivity = exports.Ping = exports.OperatingStateResponse = exports.MACTransmissionCounters = exports.MACRetransmissionMaximum = exports.HeartBeat = exports.EventTransmissionCounters = exports.EventRetransmissionMaximum = exports.DataStreamHAPTransportInterrupt = exports.DataStreamHAPTransport = exports.CurrentTransport = exports.SupportedCharacteristicValueTransitionConfiguration = exports.CharacteristicValueTransitionControl = exports.CCASignalDetectThreshold = exports.CCAEnergyDetectThreshold = exports.ActivityInterval = exports.SetupTransferTransport = exports.SupportedTransferTransportConfiguration = exports.WakeConfiguration = exports.WiFiSatelliteStatus = exports.NetworkAccessViolationControl = exports.ManagedNetworkEnable = exports.WANStatusList = exports.WANConfigurationList = exports.SupportedRouterConfiguration = exports.RouterStatus = exports.NetworkClientStatusControl = exports.NetworkClientProfileControl = exports.PeriodicSnapshotsActive = exports.ThirdPartyCameraActive = exports.ManuallyDisabled = exports.HomeKitCameraActive = exports.DiagonalFieldOfView = exports.EventSnapshotsActive = exports.CameraOperatingModeIndicator = exports.SelectedCameraRecordingConfiguration = exports.SupportedAudioRecordingConfiguration = exports.SupportedVideoRecordingConfiguration = exports.SupportedCameraRecordingConfiguration = exports.RecordingAudioActive = exports.WaterLevel = exports.Volume = exports.VOCDensity = exports.Version = exports.ValveType = exports.TemperatureDisplayUnits = exports.TargetVerticalTiltAngle = exports.TargetTiltAngle = exports.TargetTemperature = exports.TargetSlatState = exports.TargetRelativeHumidity = exports.TargetPosition = exports.TargetHumidifierDehumidifierState = exports.TargetHorizontalTiltAngle = exports.TargetHeatingCoolingState = exports.TargetHeaterCoolerState = exports.TargetFanState = exports.TargetDoorState = exports.TargetAirQuality = exports.TargetAirPurifierState = exports.SwingMode = exports.SupportedVideoStreamConfiguration = exports.SupportedRTPConfiguration = exports.SupportedAudioStreamConfiguration = exports.SulphurDioxideDensity = exports.StreamingStatus = exports.StatusTampered = exports.StatusLowBattery = exports.StatusJammed = exports.StatusFault = exports.StatusActive = exports.SmokeDetected = exports.SlatType = exports.SetupEndpoints = exports.SetDuration = exports.ServiceLabelNamespace = exports.ServiceLabelIndex = exports.SerialNumber = exports.SelectedRTPStreamConfiguration = exports.SecuritySystemTargetState = exports.SecuritySystemCurrentState = exports.SecuritySystemAlarmType = exports.Saturation = exports.RotationSpeed = exports.RotationDirection = exports.ResetFilterIndication = exports.RemainingDuration = exports.RelativeHumidityHumidifierThreshold = exports.RelativeHumidityDehumidifierThreshold = exports.ProgrammableSwitchEvent = exports.ProgramMode = exports.PositionState = exports.PM2_5Density = exports.PM10Density = exports.PasswordSetting = exports.PairingPairings = exports.PairingFeatures = exports.PairVerify = exports.PairSetup = exports.OzoneDensity = exports.OutletInUse = exports.OpticalZoom = exports.On = exports.OccupancyDetected = exports.ObstructionDetected = exports.NitrogenDioxideDensity = exports.NightVision = exports.Name = exports.Mute = exports.MotionDetected = exports.Model = exports.Manufacturer = exports.Logs = exports.LockTargetState = exports.LockPhysicalControls = exports.LockManagementAutoSecurityTimeout = exports.LockLastKnownAction = exports.LockCurrentState = exports.LockControlPoint = exports.LeakDetected = exports.IsConfigured = exports.InUse = exports.ImageRotation = exports.ImageMirroring = exports.Identify = exports.Hue = exports.HoldPosition = exports.HeatingThresholdTemperature = exports.HardwareRevision = exports.FirmwareRevision = exports.FilterLifeLevel = exports.FilterChangeIndication = exports.DigitalZoom = exports.CurrentVerticalTiltAngle = exports.CurrentTiltAngle = exports.CurrentTemperature = exports.CurrentSlatState = exports.CurrentRelativeHumidity = exports.CurrentPosition = exports.CurrentHumidifierDehumidifierState = exports.CurrentHorizontalTiltAngle = exports.CurrentHeatingCoolingState = exports.CurrentHeaterCoolerState = exports.CurrentFanState = exports.CurrentDoorState = exports.CurrentAmbientLightLevel = exports.CurrentAirPurifierState = exports.CoolingThresholdTemperature = exports.ContactSensorState = exports.ColorTemperature = exports.ChargingState = exports.CarbonMonoxidePeakLevel = exports.CarbonMonoxideLevel = exports.CarbonMonoxideDetected = exports.CarbonDioxidePeakLevel = exports.CarbonDioxideLevel = exports.CarbonDioxideDetected = exports.Brightness = exports.BatteryLevel = exports.AudioFeedback = exports.AirQuality = exports.AirParticulateSize = exports.AirParticulateDensity = exports.AdministratorOnlyAccess = exports.Active = exports.ProductData = exports.AccessoryFlags = exports.AccessControlLevel = void 0;
var Characteristic_1 = require("../Characteristic");
var Service_1 = require("../Service");
/**
 * Characteristic "Access Control Level"
 */
var AccessControlLevel = /** @class */ (function (_super) {
    __extends(AccessControlLevel, _super);
    function AccessControlLevel() {
        var _this = _super.call(this, 'Access Control Level', AccessControlLevel.UUID) || this;
        _this.setProps({
            format: "uint16" /* UINT16 */,
            perms: ["ev" /* NOTIFY */, "pr" /* PAIRED_READ */, "pw" /* PAIRED_WRITE */],
            maxValue: 2,
            minValue: 0,
            minStep: 1,
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AccessControlLevel.UUID = '000000E5-0000-1000-8000-0026BB765291';
    return AccessControlLevel;
}(Characteristic_1.Characteristic));
exports.AccessControlLevel = AccessControlLevel;
Characteristic_1.Characteristic.AccessControlLevel = AccessControlLevel;
/**
 * Characteristic "Accessory Flags"
 */
var AccessoryFlags = /** @class */ (function (_super) {
    __extends(AccessoryFlags, _super);
    function AccessoryFlags() {
        var _this = _super.call(this, 'Accessory Flags', AccessoryFlags.UUID) || this;
        _this.setProps({
            format: "uint32" /* UINT32 */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AccessoryFlags.UUID = '000000A6-0000-1000-8000-0026BB765291';
    return AccessoryFlags;
}(Characteristic_1.Characteristic));
exports.AccessoryFlags = AccessoryFlags;
Characteristic_1.Characteristic.AccessoryFlags = AccessoryFlags;
/**
 * Characteristic "Product Data"
 */
var ProductData = /** @class */ (function (_super) {
    __extends(ProductData, _super);
    function ProductData() {
        var _this = _super.call(this, 'Product Data', ProductData.UUID) || this;
        _this.setProps({
            format: "data" /* DATA */,
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ProductData.UUID = '00000220-0000-1000-8000-0026BB765291';
    return ProductData;
}(Characteristic_1.Characteristic));
exports.ProductData = ProductData;
Characteristic_1.Characteristic.ProductData = ProductData;
/**
 * Characteristic "Active"
 */
var Active = /** @class */ (function (_super) {
    __extends(Active, _super);
    function Active() {
        var _this = _super.call(this, 'Active', Active.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of Active must be one of the following:
    Active.INACTIVE = 0;
    Active.ACTIVE = 1;
    Active.UUID = '000000B0-0000-1000-8000-0026BB765291';
    return Active;
}(Characteristic_1.Characteristic));
exports.Active = Active;
Characteristic_1.Characteristic.Active = Active;
/**
 * Characteristic "Administrator Only Access"
 */
var AdministratorOnlyAccess = /** @class */ (function (_super) {
    __extends(AdministratorOnlyAccess, _super);
    function AdministratorOnlyAccess() {
        var _this = _super.call(this, 'Administrator Only Access', AdministratorOnlyAccess.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AdministratorOnlyAccess.UUID = '00000001-0000-1000-8000-0026BB765291';
    return AdministratorOnlyAccess;
}(Characteristic_1.Characteristic));
exports.AdministratorOnlyAccess = AdministratorOnlyAccess;
Characteristic_1.Characteristic.AdministratorOnlyAccess = AdministratorOnlyAccess;
/**
 * Characteristic "Air Particulate Density"
 */
var AirParticulateDensity = /** @class */ (function (_super) {
    __extends(AirParticulateDensity, _super);
    function AirParticulateDensity() {
        var _this = _super.call(this, 'Air Particulate Density', AirParticulateDensity.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            maxValue: 1000,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AirParticulateDensity.UUID = '00000064-0000-1000-8000-0026BB765291';
    return AirParticulateDensity;
}(Characteristic_1.Characteristic));
exports.AirParticulateDensity = AirParticulateDensity;
Characteristic_1.Characteristic.AirParticulateDensity = AirParticulateDensity;
/**
 * Characteristic "Air Particulate Size"
 */
var AirParticulateSize = /** @class */ (function (_super) {
    __extends(AirParticulateSize, _super);
    function AirParticulateSize() {
        var _this = _super.call(this, 'Air Particulate Size', AirParticulateSize.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of AirParticulateSize must be one of the following:
    AirParticulateSize._2_5_M = 0;
    AirParticulateSize._10_M = 1;
    AirParticulateSize.UUID = '00000065-0000-1000-8000-0026BB765291';
    return AirParticulateSize;
}(Characteristic_1.Characteristic));
exports.AirParticulateSize = AirParticulateSize;
Characteristic_1.Characteristic.AirParticulateSize = AirParticulateSize;
/**
 * Characteristic "Air Quality"
 */
var AirQuality = /** @class */ (function (_super) {
    __extends(AirQuality, _super);
    function AirQuality() {
        var _this = _super.call(this, 'Air Quality', AirQuality.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 5,
            minValue: 0,
            validValues: [0, 1, 2, 3, 4, 5],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of AirQuality must be one of the following:
    AirQuality.UNKNOWN = 0;
    AirQuality.EXCELLENT = 1;
    AirQuality.GOOD = 2;
    AirQuality.FAIR = 3;
    AirQuality.INFERIOR = 4;
    AirQuality.POOR = 5;
    AirQuality.UUID = '00000095-0000-1000-8000-0026BB765291';
    return AirQuality;
}(Characteristic_1.Characteristic));
exports.AirQuality = AirQuality;
Characteristic_1.Characteristic.AirQuality = AirQuality;
/**
 * Characteristic "Audio Feedback"
 */
var AudioFeedback = /** @class */ (function (_super) {
    __extends(AudioFeedback, _super);
    function AudioFeedback() {
        var _this = _super.call(this, 'Audio Feedback', AudioFeedback.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AudioFeedback.UUID = '00000005-0000-1000-8000-0026BB765291';
    return AudioFeedback;
}(Characteristic_1.Characteristic));
exports.AudioFeedback = AudioFeedback;
Characteristic_1.Characteristic.AudioFeedback = AudioFeedback;
/**
 * Characteristic "Battery Level"
 */
var BatteryLevel = /** @class */ (function (_super) {
    __extends(BatteryLevel, _super);
    function BatteryLevel() {
        var _this = _super.call(this, 'Battery Level', BatteryLevel.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            unit: "percentage" /* PERCENTAGE */,
            maxValue: 100,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    BatteryLevel.UUID = '00000068-0000-1000-8000-0026BB765291';
    return BatteryLevel;
}(Characteristic_1.Characteristic));
exports.BatteryLevel = BatteryLevel;
Characteristic_1.Characteristic.BatteryLevel = BatteryLevel;
/**
 * Characteristic "Brightness"
 */
var Brightness = /** @class */ (function (_super) {
    __extends(Brightness, _super);
    function Brightness() {
        var _this = _super.call(this, 'Brightness', Brightness.UUID) || this;
        _this.setProps({
            format: "int" /* INT */,
            unit: "percentage" /* PERCENTAGE */,
            maxValue: 100,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Brightness.UUID = '00000008-0000-1000-8000-0026BB765291';
    return Brightness;
}(Characteristic_1.Characteristic));
exports.Brightness = Brightness;
Characteristic_1.Characteristic.Brightness = Brightness;
/**
 * Characteristic "Carbon Dioxide Detected"
 */
var CarbonDioxideDetected = /** @class */ (function (_super) {
    __extends(CarbonDioxideDetected, _super);
    function CarbonDioxideDetected() {
        var _this = _super.call(this, 'Carbon Dioxide Detected', CarbonDioxideDetected.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of CarbonDioxideDetected must be one of the following:
    CarbonDioxideDetected.CO2_LEVELS_NORMAL = 0;
    CarbonDioxideDetected.CO2_LEVELS_ABNORMAL = 1;
    CarbonDioxideDetected.UUID = '00000092-0000-1000-8000-0026BB765291';
    return CarbonDioxideDetected;
}(Characteristic_1.Characteristic));
exports.CarbonDioxideDetected = CarbonDioxideDetected;
Characteristic_1.Characteristic.CarbonDioxideDetected = CarbonDioxideDetected;
/**
 * Characteristic "Carbon Dioxide Level"
 */
var CarbonDioxideLevel = /** @class */ (function (_super) {
    __extends(CarbonDioxideLevel, _super);
    function CarbonDioxideLevel() {
        var _this = _super.call(this, 'Carbon Dioxide Level', CarbonDioxideLevel.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            maxValue: 100000,
            minValue: 0,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CarbonDioxideLevel.UUID = '00000093-0000-1000-8000-0026BB765291';
    return CarbonDioxideLevel;
}(Characteristic_1.Characteristic));
exports.CarbonDioxideLevel = CarbonDioxideLevel;
Characteristic_1.Characteristic.CarbonDioxideLevel = CarbonDioxideLevel;
/**
 * Characteristic "Carbon Dioxide Peak Level"
 */
var CarbonDioxidePeakLevel = /** @class */ (function (_super) {
    __extends(CarbonDioxidePeakLevel, _super);
    function CarbonDioxidePeakLevel() {
        var _this = _super.call(this, 'Carbon Dioxide Peak Level', CarbonDioxidePeakLevel.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            maxValue: 100000,
            minValue: 0,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CarbonDioxidePeakLevel.UUID = '00000094-0000-1000-8000-0026BB765291';
    return CarbonDioxidePeakLevel;
}(Characteristic_1.Characteristic));
exports.CarbonDioxidePeakLevel = CarbonDioxidePeakLevel;
Characteristic_1.Characteristic.CarbonDioxidePeakLevel = CarbonDioxidePeakLevel;
/**
 * Characteristic "Carbon Monoxide Detected"
 */
var CarbonMonoxideDetected = /** @class */ (function (_super) {
    __extends(CarbonMonoxideDetected, _super);
    function CarbonMonoxideDetected() {
        var _this = _super.call(this, 'Carbon Monoxide Detected', CarbonMonoxideDetected.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of CarbonMonoxideDetected must be one of the following:
    CarbonMonoxideDetected.CO_LEVELS_NORMAL = 0;
    CarbonMonoxideDetected.CO_LEVELS_ABNORMAL = 1;
    CarbonMonoxideDetected.UUID = '00000069-0000-1000-8000-0026BB765291';
    return CarbonMonoxideDetected;
}(Characteristic_1.Characteristic));
exports.CarbonMonoxideDetected = CarbonMonoxideDetected;
Characteristic_1.Characteristic.CarbonMonoxideDetected = CarbonMonoxideDetected;
/**
 * Characteristic "Carbon Monoxide Level"
 */
var CarbonMonoxideLevel = /** @class */ (function (_super) {
    __extends(CarbonMonoxideLevel, _super);
    function CarbonMonoxideLevel() {
        var _this = _super.call(this, 'Carbon Monoxide Level', CarbonMonoxideLevel.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            maxValue: 100,
            minValue: 0,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CarbonMonoxideLevel.UUID = '00000090-0000-1000-8000-0026BB765291';
    return CarbonMonoxideLevel;
}(Characteristic_1.Characteristic));
exports.CarbonMonoxideLevel = CarbonMonoxideLevel;
Characteristic_1.Characteristic.CarbonMonoxideLevel = CarbonMonoxideLevel;
/**
 * Characteristic "Carbon Monoxide Peak Level"
 */
var CarbonMonoxidePeakLevel = /** @class */ (function (_super) {
    __extends(CarbonMonoxidePeakLevel, _super);
    function CarbonMonoxidePeakLevel() {
        var _this = _super.call(this, 'Carbon Monoxide Peak Level', CarbonMonoxidePeakLevel.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            maxValue: 100,
            minValue: 0,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CarbonMonoxidePeakLevel.UUID = '00000091-0000-1000-8000-0026BB765291';
    return CarbonMonoxidePeakLevel;
}(Characteristic_1.Characteristic));
exports.CarbonMonoxidePeakLevel = CarbonMonoxidePeakLevel;
Characteristic_1.Characteristic.CarbonMonoxidePeakLevel = CarbonMonoxidePeakLevel;
/**
 * Characteristic "Charging State"
 */
var ChargingState = /** @class */ (function (_super) {
    __extends(ChargingState, _super);
    function ChargingState() {
        var _this = _super.call(this, 'Charging State', ChargingState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 2,
            minValue: 0,
            validValues: [0, 1, 2],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of ChargingState must be one of the following:
    ChargingState.NOT_CHARGING = 0;
    ChargingState.CHARGING = 1;
    ChargingState.NOT_CHARGEABLE = 2;
    ChargingState.UUID = '0000008F-0000-1000-8000-0026BB765291';
    return ChargingState;
}(Characteristic_1.Characteristic));
exports.ChargingState = ChargingState;
Characteristic_1.Characteristic.ChargingState = ChargingState;
/**
 * Characteristic "Color Temperature"
 */
var ColorTemperature = /** @class */ (function (_super) {
    __extends(ColorTemperature, _super);
    function ColorTemperature() {
        var _this = _super.call(this, 'Color Temperature', ColorTemperature.UUID) || this;
        _this.setProps({
            format: "uint32" /* UINT32 */,
            maxValue: 500,
            minValue: 140,
            minStep: 1,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ColorTemperature.UUID = '000000CE-0000-1000-8000-0026BB765291';
    return ColorTemperature;
}(Characteristic_1.Characteristic));
exports.ColorTemperature = ColorTemperature;
Characteristic_1.Characteristic.ColorTemperature = ColorTemperature;
/**
 * Characteristic "Contact Sensor State"
 */
var ContactSensorState = /** @class */ (function (_super) {
    __extends(ContactSensorState, _super);
    function ContactSensorState() {
        var _this = _super.call(this, 'Contact Sensor State', ContactSensorState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of ContactSensorState must be one of the following:
    ContactSensorState.CONTACT_DETECTED = 0;
    ContactSensorState.CONTACT_NOT_DETECTED = 1;
    ContactSensorState.UUID = '0000006A-0000-1000-8000-0026BB765291';
    return ContactSensorState;
}(Characteristic_1.Characteristic));
exports.ContactSensorState = ContactSensorState;
Characteristic_1.Characteristic.ContactSensorState = ContactSensorState;
/**
 * Characteristic "Cooling Threshold Temperature"
 */
var CoolingThresholdTemperature = /** @class */ (function (_super) {
    __extends(CoolingThresholdTemperature, _super);
    function CoolingThresholdTemperature() {
        var _this = _super.call(this, 'Cooling Threshold Temperature', CoolingThresholdTemperature.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            unit: "celsius" /* CELSIUS */,
            maxValue: 35,
            minValue: 10,
            minStep: 0.1,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CoolingThresholdTemperature.UUID = '0000000D-0000-1000-8000-0026BB765291';
    return CoolingThresholdTemperature;
}(Characteristic_1.Characteristic));
exports.CoolingThresholdTemperature = CoolingThresholdTemperature;
Characteristic_1.Characteristic.CoolingThresholdTemperature = CoolingThresholdTemperature;
/**
 * Characteristic "Current Air Purifier State"
 */
var CurrentAirPurifierState = /** @class */ (function (_super) {
    __extends(CurrentAirPurifierState, _super);
    function CurrentAirPurifierState() {
        var _this = _super.call(this, 'Current Air Purifier State', CurrentAirPurifierState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 2,
            minValue: 0,
            validValues: [0, 1, 2],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of CurrentAirPurifierState must be one of the following:
    CurrentAirPurifierState.INACTIVE = 0;
    CurrentAirPurifierState.IDLE = 1;
    CurrentAirPurifierState.PURIFYING_AIR = 2;
    CurrentAirPurifierState.UUID = '000000A9-0000-1000-8000-0026BB765291';
    return CurrentAirPurifierState;
}(Characteristic_1.Characteristic));
exports.CurrentAirPurifierState = CurrentAirPurifierState;
Characteristic_1.Characteristic.CurrentAirPurifierState = CurrentAirPurifierState;
/**
 * Characteristic "Current Ambient Light Level"
 */
var CurrentAmbientLightLevel = /** @class */ (function (_super) {
    __extends(CurrentAmbientLightLevel, _super);
    function CurrentAmbientLightLevel() {
        var _this = _super.call(this, 'Current Ambient Light Level', CurrentAmbientLightLevel.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            unit: "lux" /* LUX */,
            maxValue: 100000,
            minValue: 0.0001,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentAmbientLightLevel.UUID = '0000006B-0000-1000-8000-0026BB765291';
    return CurrentAmbientLightLevel;
}(Characteristic_1.Characteristic));
exports.CurrentAmbientLightLevel = CurrentAmbientLightLevel;
Characteristic_1.Characteristic.CurrentAmbientLightLevel = CurrentAmbientLightLevel;
/**
 * Characteristic "Current Door State"
 */
var CurrentDoorState = /** @class */ (function (_super) {
    __extends(CurrentDoorState, _super);
    function CurrentDoorState() {
        var _this = _super.call(this, 'Current Door State', CurrentDoorState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 4,
            minValue: 0,
            validValues: [0, 1, 2, 3, 4],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of CurrentDoorState must be one of the following:
    CurrentDoorState.OPEN = 0;
    CurrentDoorState.CLOSED = 1;
    CurrentDoorState.OPENING = 2;
    CurrentDoorState.CLOSING = 3;
    CurrentDoorState.STOPPED = 4;
    CurrentDoorState.UUID = '0000000E-0000-1000-8000-0026BB765291';
    return CurrentDoorState;
}(Characteristic_1.Characteristic));
exports.CurrentDoorState = CurrentDoorState;
Characteristic_1.Characteristic.CurrentDoorState = CurrentDoorState;
/**
 * Characteristic "Current Fan State"
 */
var CurrentFanState = /** @class */ (function (_super) {
    __extends(CurrentFanState, _super);
    function CurrentFanState() {
        var _this = _super.call(this, 'Current Fan State', CurrentFanState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 2,
            minValue: 0,
            validValues: [0, 1, 2],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of CurrentFanState must be one of the following:
    CurrentFanState.INACTIVE = 0;
    CurrentFanState.IDLE = 1;
    CurrentFanState.BLOWING_AIR = 2;
    CurrentFanState.UUID = '000000AF-0000-1000-8000-0026BB765291';
    return CurrentFanState;
}(Characteristic_1.Characteristic));
exports.CurrentFanState = CurrentFanState;
Characteristic_1.Characteristic.CurrentFanState = CurrentFanState;
/**
 * Characteristic "Current Heater Cooler State"
 */
var CurrentHeaterCoolerState = /** @class */ (function (_super) {
    __extends(CurrentHeaterCoolerState, _super);
    function CurrentHeaterCoolerState() {
        var _this = _super.call(this, 'Current Heater Cooler State', CurrentHeaterCoolerState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 3,
            minValue: 0,
            validValues: [0, 1, 2, 3],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of CurrentHeaterCoolerState must be one of the following:
    CurrentHeaterCoolerState.INACTIVE = 0;
    CurrentHeaterCoolerState.IDLE = 1;
    CurrentHeaterCoolerState.HEATING = 2;
    CurrentHeaterCoolerState.COOLING = 3;
    CurrentHeaterCoolerState.UUID = '000000B1-0000-1000-8000-0026BB765291';
    return CurrentHeaterCoolerState;
}(Characteristic_1.Characteristic));
exports.CurrentHeaterCoolerState = CurrentHeaterCoolerState;
Characteristic_1.Characteristic.CurrentHeaterCoolerState = CurrentHeaterCoolerState;
/**
 * Characteristic "Current Heating Cooling State"
 */
var CurrentHeatingCoolingState = /** @class */ (function (_super) {
    __extends(CurrentHeatingCoolingState, _super);
    function CurrentHeatingCoolingState() {
        var _this = _super.call(this, 'Current Heating Cooling State', CurrentHeatingCoolingState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 2,
            minValue: 0,
            validValues: [0, 1, 2],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of CurrentHeatingCoolingState must be one of the following:
    CurrentHeatingCoolingState.OFF = 0;
    CurrentHeatingCoolingState.HEAT = 1;
    CurrentHeatingCoolingState.COOL = 2;
    CurrentHeatingCoolingState.UUID = '0000000F-0000-1000-8000-0026BB765291';
    return CurrentHeatingCoolingState;
}(Characteristic_1.Characteristic));
exports.CurrentHeatingCoolingState = CurrentHeatingCoolingState;
Characteristic_1.Characteristic.CurrentHeatingCoolingState = CurrentHeatingCoolingState;
/**
 * Characteristic "Current Horizontal Tilt Angle"
 */
var CurrentHorizontalTiltAngle = /** @class */ (function (_super) {
    __extends(CurrentHorizontalTiltAngle, _super);
    function CurrentHorizontalTiltAngle() {
        var _this = _super.call(this, 'Current Horizontal Tilt Angle', CurrentHorizontalTiltAngle.UUID) || this;
        _this.setProps({
            format: "int" /* INT */,
            unit: "arcdegrees" /* ARC_DEGREE */,
            maxValue: 90,
            minValue: -90,
            minStep: 1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentHorizontalTiltAngle.UUID = '0000006C-0000-1000-8000-0026BB765291';
    return CurrentHorizontalTiltAngle;
}(Characteristic_1.Characteristic));
exports.CurrentHorizontalTiltAngle = CurrentHorizontalTiltAngle;
Characteristic_1.Characteristic.CurrentHorizontalTiltAngle = CurrentHorizontalTiltAngle;
/**
 * Characteristic "Current Humidifier Dehumidifier State"
 */
var CurrentHumidifierDehumidifierState = /** @class */ (function (_super) {
    __extends(CurrentHumidifierDehumidifierState, _super);
    function CurrentHumidifierDehumidifierState() {
        var _this = _super.call(this, 'Current Humidifier Dehumidifier State', CurrentHumidifierDehumidifierState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 3,
            minValue: 0,
            validValues: [0, 1, 2, 3],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of CurrentHumidifierDehumidifierState must be one of the following:
    CurrentHumidifierDehumidifierState.INACTIVE = 0;
    CurrentHumidifierDehumidifierState.IDLE = 1;
    CurrentHumidifierDehumidifierState.HUMIDIFYING = 2;
    CurrentHumidifierDehumidifierState.DEHUMIDIFYING = 3;
    CurrentHumidifierDehumidifierState.UUID = '000000B3-0000-1000-8000-0026BB765291';
    return CurrentHumidifierDehumidifierState;
}(Characteristic_1.Characteristic));
exports.CurrentHumidifierDehumidifierState = CurrentHumidifierDehumidifierState;
Characteristic_1.Characteristic.CurrentHumidifierDehumidifierState = CurrentHumidifierDehumidifierState;
/**
 * Characteristic "Current Position"
 */
var CurrentPosition = /** @class */ (function (_super) {
    __extends(CurrentPosition, _super);
    function CurrentPosition() {
        var _this = _super.call(this, 'Current Position', CurrentPosition.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            unit: "percentage" /* PERCENTAGE */,
            maxValue: 100,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentPosition.UUID = '0000006D-0000-1000-8000-0026BB765291';
    return CurrentPosition;
}(Characteristic_1.Characteristic));
exports.CurrentPosition = CurrentPosition;
Characteristic_1.Characteristic.CurrentPosition = CurrentPosition;
/**
 * Characteristic "Current Relative Humidity"
 */
var CurrentRelativeHumidity = /** @class */ (function (_super) {
    __extends(CurrentRelativeHumidity, _super);
    function CurrentRelativeHumidity() {
        var _this = _super.call(this, 'Current Relative Humidity', CurrentRelativeHumidity.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            unit: "percentage" /* PERCENTAGE */,
            maxValue: 100,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentRelativeHumidity.UUID = '00000010-0000-1000-8000-0026BB765291';
    return CurrentRelativeHumidity;
}(Characteristic_1.Characteristic));
exports.CurrentRelativeHumidity = CurrentRelativeHumidity;
Characteristic_1.Characteristic.CurrentRelativeHumidity = CurrentRelativeHumidity;
/**
 * Characteristic "Current Slat State"
 */
var CurrentSlatState = /** @class */ (function (_super) {
    __extends(CurrentSlatState, _super);
    function CurrentSlatState() {
        var _this = _super.call(this, 'Current Slat State', CurrentSlatState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 2,
            minValue: 0,
            validValues: [0, 1, 2],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of CurrentSlatState must be one of the following:
    CurrentSlatState.FIXED = 0;
    CurrentSlatState.JAMMED = 1;
    CurrentSlatState.SWINGING = 2;
    CurrentSlatState.UUID = '000000AA-0000-1000-8000-0026BB765291';
    return CurrentSlatState;
}(Characteristic_1.Characteristic));
exports.CurrentSlatState = CurrentSlatState;
Characteristic_1.Characteristic.CurrentSlatState = CurrentSlatState;
/**
 * Characteristic "Current Temperature"
 */
var CurrentTemperature = /** @class */ (function (_super) {
    __extends(CurrentTemperature, _super);
    function CurrentTemperature() {
        var _this = _super.call(this, 'Current Temperature', CurrentTemperature.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            unit: "celsius" /* CELSIUS */,
            maxValue: 100,
            minValue: 0,
            minStep: 0.1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentTemperature.UUID = '00000011-0000-1000-8000-0026BB765291';
    return CurrentTemperature;
}(Characteristic_1.Characteristic));
exports.CurrentTemperature = CurrentTemperature;
Characteristic_1.Characteristic.CurrentTemperature = CurrentTemperature;
/**
 * Characteristic "Current Tilt Angle"
 */
var CurrentTiltAngle = /** @class */ (function (_super) {
    __extends(CurrentTiltAngle, _super);
    function CurrentTiltAngle() {
        var _this = _super.call(this, 'Current Tilt Angle', CurrentTiltAngle.UUID) || this;
        _this.setProps({
            format: "int" /* INT */,
            unit: "arcdegrees" /* ARC_DEGREE */,
            maxValue: 90,
            minValue: -90,
            minStep: 1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentTiltAngle.UUID = '000000C1-0000-1000-8000-0026BB765291';
    return CurrentTiltAngle;
}(Characteristic_1.Characteristic));
exports.CurrentTiltAngle = CurrentTiltAngle;
Characteristic_1.Characteristic.CurrentTiltAngle = CurrentTiltAngle;
/**
 * Characteristic "Current Vertical Tilt Angle"
 */
var CurrentVerticalTiltAngle = /** @class */ (function (_super) {
    __extends(CurrentVerticalTiltAngle, _super);
    function CurrentVerticalTiltAngle() {
        var _this = _super.call(this, 'Current Vertical Tilt Angle', CurrentVerticalTiltAngle.UUID) || this;
        _this.setProps({
            format: "int" /* INT */,
            unit: "arcdegrees" /* ARC_DEGREE */,
            maxValue: 90,
            minValue: -90,
            minStep: 1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentVerticalTiltAngle.UUID = '0000006E-0000-1000-8000-0026BB765291';
    return CurrentVerticalTiltAngle;
}(Characteristic_1.Characteristic));
exports.CurrentVerticalTiltAngle = CurrentVerticalTiltAngle;
Characteristic_1.Characteristic.CurrentVerticalTiltAngle = CurrentVerticalTiltAngle;
/**
 * Characteristic "Digital Zoom"
 */
var DigitalZoom = /** @class */ (function (_super) {
    __extends(DigitalZoom, _super);
    function DigitalZoom() {
        var _this = _super.call(this, 'Digital Zoom', DigitalZoom.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    DigitalZoom.UUID = '0000011D-0000-1000-8000-0026BB765291';
    return DigitalZoom;
}(Characteristic_1.Characteristic));
exports.DigitalZoom = DigitalZoom;
Characteristic_1.Characteristic.DigitalZoom = DigitalZoom;
/**
 * Characteristic "Filter Change Indication"
 */
var FilterChangeIndication = /** @class */ (function (_super) {
    __extends(FilterChangeIndication, _super);
    function FilterChangeIndication() {
        var _this = _super.call(this, 'Filter Change Indication', FilterChangeIndication.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of FilterChangeIndication must be one of the following:
    FilterChangeIndication.FILTER_OK = 0;
    FilterChangeIndication.CHANGE_FILTER = 1;
    FilterChangeIndication.UUID = '000000AC-0000-1000-8000-0026BB765291';
    return FilterChangeIndication;
}(Characteristic_1.Characteristic));
exports.FilterChangeIndication = FilterChangeIndication;
Characteristic_1.Characteristic.FilterChangeIndication = FilterChangeIndication;
/**
 * Characteristic "Filter Life Level"
 */
var FilterLifeLevel = /** @class */ (function (_super) {
    __extends(FilterLifeLevel, _super);
    function FilterLifeLevel() {
        var _this = _super.call(this, 'Filter Life Level', FilterLifeLevel.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            maxValue: 100,
            minValue: 0,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    FilterLifeLevel.UUID = '000000AB-0000-1000-8000-0026BB765291';
    return FilterLifeLevel;
}(Characteristic_1.Characteristic));
exports.FilterLifeLevel = FilterLifeLevel;
Characteristic_1.Characteristic.FilterLifeLevel = FilterLifeLevel;
/**
 * Characteristic "Firmware Revision"
 */
var FirmwareRevision = /** @class */ (function (_super) {
    __extends(FirmwareRevision, _super);
    function FirmwareRevision() {
        var _this = _super.call(this, 'Firmware Revision', FirmwareRevision.UUID) || this;
        _this.setProps({
            format: "string" /* STRING */,
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    FirmwareRevision.UUID = '00000052-0000-1000-8000-0026BB765291';
    return FirmwareRevision;
}(Characteristic_1.Characteristic));
exports.FirmwareRevision = FirmwareRevision;
Characteristic_1.Characteristic.FirmwareRevision = FirmwareRevision;
/**
 * Characteristic "Hardware Revision"
 */
var HardwareRevision = /** @class */ (function (_super) {
    __extends(HardwareRevision, _super);
    function HardwareRevision() {
        var _this = _super.call(this, 'Hardware Revision', HardwareRevision.UUID) || this;
        _this.setProps({
            format: "string" /* STRING */,
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    HardwareRevision.UUID = '00000053-0000-1000-8000-0026BB765291';
    return HardwareRevision;
}(Characteristic_1.Characteristic));
exports.HardwareRevision = HardwareRevision;
Characteristic_1.Characteristic.HardwareRevision = HardwareRevision;
/**
 * Characteristic "Heating Threshold Temperature"
 */
var HeatingThresholdTemperature = /** @class */ (function (_super) {
    __extends(HeatingThresholdTemperature, _super);
    function HeatingThresholdTemperature() {
        var _this = _super.call(this, 'Heating Threshold Temperature', HeatingThresholdTemperature.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            unit: "celsius" /* CELSIUS */,
            maxValue: 25,
            minValue: 0,
            minStep: 0.1,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    HeatingThresholdTemperature.UUID = '00000012-0000-1000-8000-0026BB765291';
    return HeatingThresholdTemperature;
}(Characteristic_1.Characteristic));
exports.HeatingThresholdTemperature = HeatingThresholdTemperature;
Characteristic_1.Characteristic.HeatingThresholdTemperature = HeatingThresholdTemperature;
/**
 * Characteristic "Hold Position"
 */
var HoldPosition = /** @class */ (function (_super) {
    __extends(HoldPosition, _super);
    function HoldPosition() {
        var _this = _super.call(this, 'Hold Position', HoldPosition.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pw" /* WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    HoldPosition.UUID = '0000006F-0000-1000-8000-0026BB765291';
    return HoldPosition;
}(Characteristic_1.Characteristic));
exports.HoldPosition = HoldPosition;
Characteristic_1.Characteristic.HoldPosition = HoldPosition;
/**
 * Characteristic "Hue"
 */
var Hue = /** @class */ (function (_super) {
    __extends(Hue, _super);
    function Hue() {
        var _this = _super.call(this, 'Hue', Hue.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            unit: "arcdegrees" /* ARC_DEGREE */,
            maxValue: 360,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Hue.UUID = '00000013-0000-1000-8000-0026BB765291';
    return Hue;
}(Characteristic_1.Characteristic));
exports.Hue = Hue;
Characteristic_1.Characteristic.Hue = Hue;
/**
 * Characteristic "Identify"
 */
var Identify = /** @class */ (function (_super) {
    __extends(Identify, _super);
    function Identify() {
        var _this = _super.call(this, 'Identify', Identify.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pw" /* WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Identify.UUID = '00000014-0000-1000-8000-0026BB765291';
    return Identify;
}(Characteristic_1.Characteristic));
exports.Identify = Identify;
Characteristic_1.Characteristic.Identify = Identify;
/**
 * Characteristic "Image Mirroring"
 */
var ImageMirroring = /** @class */ (function (_super) {
    __extends(ImageMirroring, _super);
    function ImageMirroring() {
        var _this = _super.call(this, 'Image Mirroring', ImageMirroring.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ImageMirroring.UUID = '0000011F-0000-1000-8000-0026BB765291';
    return ImageMirroring;
}(Characteristic_1.Characteristic));
exports.ImageMirroring = ImageMirroring;
Characteristic_1.Characteristic.ImageMirroring = ImageMirroring;
/**
 * Characteristic "Image Rotation"
 */
var ImageRotation = /** @class */ (function (_super) {
    __extends(ImageRotation, _super);
    function ImageRotation() {
        var _this = _super.call(this, 'Image Rotation', ImageRotation.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            unit: "arcdegrees" /* ARC_DEGREE */,
            maxValue: 270,
            minValue: 0,
            minStep: 90,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ImageRotation.UUID = '0000011E-0000-1000-8000-0026BB765291';
    return ImageRotation;
}(Characteristic_1.Characteristic));
exports.ImageRotation = ImageRotation;
Characteristic_1.Characteristic.ImageRotation = ImageRotation;
/**
 * Characteristic "In Use"
 */
var InUse = /** @class */ (function (_super) {
    __extends(InUse, _super);
    function InUse() {
        var _this = _super.call(this, 'In Use', InUse.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of InUse must be one of the following:
    InUse.NOT_IN_USE = 0;
    InUse.IN_USE = 1;
    InUse.UUID = '000000D2-0000-1000-8000-0026BB765291';
    return InUse;
}(Characteristic_1.Characteristic));
exports.InUse = InUse;
Characteristic_1.Characteristic.InUse = InUse;
/**
 * Characteristic "Is Configured"
 */
var IsConfigured = /** @class */ (function (_super) {
    __extends(IsConfigured, _super);
    function IsConfigured() {
        var _this = _super.call(this, 'Is Configured', IsConfigured.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of IsConfigured must be one of the following:
    IsConfigured.NOT_CONFIGURED = 0;
    IsConfigured.CONFIGURED = 1;
    IsConfigured.UUID = '000000D6-0000-1000-8000-0026BB765291';
    return IsConfigured;
}(Characteristic_1.Characteristic));
exports.IsConfigured = IsConfigured;
Characteristic_1.Characteristic.IsConfigured = IsConfigured;
/**
 * Characteristic "Leak Detected"
 */
var LeakDetected = /** @class */ (function (_super) {
    __extends(LeakDetected, _super);
    function LeakDetected() {
        var _this = _super.call(this, 'Leak Detected', LeakDetected.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of LeakDetected must be one of the following:
    LeakDetected.LEAK_NOT_DETECTED = 0;
    LeakDetected.LEAK_DETECTED = 1;
    LeakDetected.UUID = '00000070-0000-1000-8000-0026BB765291';
    return LeakDetected;
}(Characteristic_1.Characteristic));
exports.LeakDetected = LeakDetected;
Characteristic_1.Characteristic.LeakDetected = LeakDetected;
/**
 * Characteristic "Lock Control Point"
 */
var LockControlPoint = /** @class */ (function (_super) {
    __extends(LockControlPoint, _super);
    function LockControlPoint() {
        var _this = _super.call(this, 'Lock Control Point', LockControlPoint.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pw" /* WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    LockControlPoint.UUID = '00000019-0000-1000-8000-0026BB765291';
    return LockControlPoint;
}(Characteristic_1.Characteristic));
exports.LockControlPoint = LockControlPoint;
Characteristic_1.Characteristic.LockControlPoint = LockControlPoint;
/**
 * Characteristic "Lock Current State"
 */
var LockCurrentState = /** @class */ (function (_super) {
    __extends(LockCurrentState, _super);
    function LockCurrentState() {
        var _this = _super.call(this, 'Lock Current State', LockCurrentState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 3,
            minValue: 0,
            validValues: [0, 1, 2, 3],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of LockCurrentState must be one of the following:
    LockCurrentState.UNSECURED = 0;
    LockCurrentState.SECURED = 1;
    LockCurrentState.JAMMED = 2;
    LockCurrentState.UNKNOWN = 3;
    LockCurrentState.UUID = '0000001D-0000-1000-8000-0026BB765291';
    return LockCurrentState;
}(Characteristic_1.Characteristic));
exports.LockCurrentState = LockCurrentState;
Characteristic_1.Characteristic.LockCurrentState = LockCurrentState;
/**
 * Characteristic "Lock Last Known Action"
 */
var LockLastKnownAction = /** @class */ (function (_super) {
    __extends(LockLastKnownAction, _super);
    function LockLastKnownAction() {
        var _this = _super.call(this, 'Lock Last Known Action', LockLastKnownAction.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 8,
            minValue: 0,
            validValues: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of LockLastKnownAction must be one of the following:
    LockLastKnownAction.SECURED_PHYSICALLY_INTERIOR = 0;
    LockLastKnownAction.UNSECURED_PHYSICALLY_INTERIOR = 1;
    LockLastKnownAction.SECURED_PHYSICALLY_EXTERIOR = 2;
    LockLastKnownAction.UNSECURED_PHYSICALLY_EXTERIOR = 3;
    LockLastKnownAction.SECURED_BY_KEYPAD = 4;
    LockLastKnownAction.UNSECURED_BY_KEYPAD = 5;
    LockLastKnownAction.SECURED_REMOTELY = 6;
    LockLastKnownAction.UNSECURED_REMOTELY = 7;
    LockLastKnownAction.SECURED_BY_AUTO_SECURE_TIMEOUT = 8;
    LockLastKnownAction.UUID = '0000001C-0000-1000-8000-0026BB765291';
    return LockLastKnownAction;
}(Characteristic_1.Characteristic));
exports.LockLastKnownAction = LockLastKnownAction;
Characteristic_1.Characteristic.LockLastKnownAction = LockLastKnownAction;
/**
 * Characteristic "Lock Management Auto Security Timeout"
 */
var LockManagementAutoSecurityTimeout = /** @class */ (function (_super) {
    __extends(LockManagementAutoSecurityTimeout, _super);
    function LockManagementAutoSecurityTimeout() {
        var _this = _super.call(this, 'Lock Management Auto Security Timeout', LockManagementAutoSecurityTimeout.UUID) || this;
        _this.setProps({
            format: "uint32" /* UINT32 */,
            unit: "seconds" /* SECONDS */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    LockManagementAutoSecurityTimeout.UUID = '0000001A-0000-1000-8000-0026BB765291';
    return LockManagementAutoSecurityTimeout;
}(Characteristic_1.Characteristic));
exports.LockManagementAutoSecurityTimeout = LockManagementAutoSecurityTimeout;
Characteristic_1.Characteristic.LockManagementAutoSecurityTimeout = LockManagementAutoSecurityTimeout;
/**
 * Characteristic "Lock Physical Controls"
 */
var LockPhysicalControls = /** @class */ (function (_super) {
    __extends(LockPhysicalControls, _super);
    function LockPhysicalControls() {
        var _this = _super.call(this, 'Lock Physical Controls', LockPhysicalControls.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of LockPhysicalControls must be one of the following:
    LockPhysicalControls.CONTROL_LOCK_DISABLED = 0;
    LockPhysicalControls.CONTROL_LOCK_ENABLED = 1;
    LockPhysicalControls.UUID = '000000A7-0000-1000-8000-0026BB765291';
    return LockPhysicalControls;
}(Characteristic_1.Characteristic));
exports.LockPhysicalControls = LockPhysicalControls;
Characteristic_1.Characteristic.LockPhysicalControls = LockPhysicalControls;
/**
 * Characteristic "Lock Target State"
 */
var LockTargetState = /** @class */ (function (_super) {
    __extends(LockTargetState, _super);
    function LockTargetState() {
        var _this = _super.call(this, 'Lock Target State', LockTargetState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of LockTargetState must be one of the following:
    LockTargetState.UNSECURED = 0;
    LockTargetState.SECURED = 1;
    LockTargetState.UUID = '0000001E-0000-1000-8000-0026BB765291';
    return LockTargetState;
}(Characteristic_1.Characteristic));
exports.LockTargetState = LockTargetState;
Characteristic_1.Characteristic.LockTargetState = LockTargetState;
/**
 * Characteristic "Logs"
 */
var Logs = /** @class */ (function (_super) {
    __extends(Logs, _super);
    function Logs() {
        var _this = _super.call(this, 'Logs', Logs.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Logs.UUID = '0000001F-0000-1000-8000-0026BB765291';
    return Logs;
}(Characteristic_1.Characteristic));
exports.Logs = Logs;
Characteristic_1.Characteristic.Logs = Logs;
/**
 * Characteristic "Manufacturer"
 */
var Manufacturer = /** @class */ (function (_super) {
    __extends(Manufacturer, _super);
    function Manufacturer() {
        var _this = _super.call(this, 'Manufacturer', Manufacturer.UUID) || this;
        _this.setProps({
            format: "string" /* STRING */,
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Manufacturer.UUID = '00000020-0000-1000-8000-0026BB765291';
    return Manufacturer;
}(Characteristic_1.Characteristic));
exports.Manufacturer = Manufacturer;
Characteristic_1.Characteristic.Manufacturer = Manufacturer;
/**
 * Characteristic "Model"
 */
var Model = /** @class */ (function (_super) {
    __extends(Model, _super);
    function Model() {
        var _this = _super.call(this, 'Model', Model.UUID) || this;
        _this.setProps({
            format: "string" /* STRING */,
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Model.UUID = '00000021-0000-1000-8000-0026BB765291';
    return Model;
}(Characteristic_1.Characteristic));
exports.Model = Model;
Characteristic_1.Characteristic.Model = Model;
/**
 * Characteristic "Motion Detected"
 */
var MotionDetected = /** @class */ (function (_super) {
    __extends(MotionDetected, _super);
    function MotionDetected() {
        var _this = _super.call(this, 'Motion Detected', MotionDetected.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    MotionDetected.UUID = '00000022-0000-1000-8000-0026BB765291';
    return MotionDetected;
}(Characteristic_1.Characteristic));
exports.MotionDetected = MotionDetected;
Characteristic_1.Characteristic.MotionDetected = MotionDetected;
/**
 * Characteristic "Mute"
 */
var Mute = /** @class */ (function (_super) {
    __extends(Mute, _super);
    function Mute() {
        var _this = _super.call(this, 'Mute', Mute.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Mute.UUID = '0000011A-0000-1000-8000-0026BB765291';
    return Mute;
}(Characteristic_1.Characteristic));
exports.Mute = Mute;
Characteristic_1.Characteristic.Mute = Mute;
/**
 * Characteristic "Name"
 */
var Name = /** @class */ (function (_super) {
    __extends(Name, _super);
    function Name() {
        var _this = _super.call(this, 'Name', Name.UUID) || this;
        _this.setProps({
            format: "string" /* STRING */,
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Name.UUID = '00000023-0000-1000-8000-0026BB765291';
    return Name;
}(Characteristic_1.Characteristic));
exports.Name = Name;
Characteristic_1.Characteristic.Name = Name;
/**
 * Characteristic "Night Vision"
 */
var NightVision = /** @class */ (function (_super) {
    __extends(NightVision, _super);
    function NightVision() {
        var _this = _super.call(this, 'Night Vision', NightVision.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */, "tw" /* TIMED_WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    NightVision.UUID = '0000011B-0000-1000-8000-0026BB765291';
    return NightVision;
}(Characteristic_1.Characteristic));
exports.NightVision = NightVision;
Characteristic_1.Characteristic.NightVision = NightVision;
/**
 * Characteristic "Nitrogen Dioxide Density"
 */
var NitrogenDioxideDensity = /** @class */ (function (_super) {
    __extends(NitrogenDioxideDensity, _super);
    function NitrogenDioxideDensity() {
        var _this = _super.call(this, 'Nitrogen Dioxide Density', NitrogenDioxideDensity.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            maxValue: 1000,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    NitrogenDioxideDensity.UUID = '000000C4-0000-1000-8000-0026BB765291';
    return NitrogenDioxideDensity;
}(Characteristic_1.Characteristic));
exports.NitrogenDioxideDensity = NitrogenDioxideDensity;
Characteristic_1.Characteristic.NitrogenDioxideDensity = NitrogenDioxideDensity;
/**
 * Characteristic "Obstruction Detected"
 */
var ObstructionDetected = /** @class */ (function (_super) {
    __extends(ObstructionDetected, _super);
    function ObstructionDetected() {
        var _this = _super.call(this, 'Obstruction Detected', ObstructionDetected.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ObstructionDetected.UUID = '00000024-0000-1000-8000-0026BB765291';
    return ObstructionDetected;
}(Characteristic_1.Characteristic));
exports.ObstructionDetected = ObstructionDetected;
Characteristic_1.Characteristic.ObstructionDetected = ObstructionDetected;
/**
 * Characteristic "Occupancy Detected"
 */
var OccupancyDetected = /** @class */ (function (_super) {
    __extends(OccupancyDetected, _super);
    function OccupancyDetected() {
        var _this = _super.call(this, 'Occupancy Detected', OccupancyDetected.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of OccupancyDetected must be one of the following:
    OccupancyDetected.OCCUPANCY_NOT_DETECTED = 0;
    OccupancyDetected.OCCUPANCY_DETECTED = 1;
    OccupancyDetected.UUID = '00000071-0000-1000-8000-0026BB765291';
    return OccupancyDetected;
}(Characteristic_1.Characteristic));
exports.OccupancyDetected = OccupancyDetected;
Characteristic_1.Characteristic.OccupancyDetected = OccupancyDetected;
/**
 * Characteristic "On"
 */
var On = /** @class */ (function (_super) {
    __extends(On, _super);
    function On() {
        var _this = _super.call(this, 'On', On.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    On.UUID = '00000025-0000-1000-8000-0026BB765291';
    return On;
}(Characteristic_1.Characteristic));
exports.On = On;
Characteristic_1.Characteristic.On = On;
/**
 * Characteristic "Optical Zoom"
 */
var OpticalZoom = /** @class */ (function (_super) {
    __extends(OpticalZoom, _super);
    function OpticalZoom() {
        var _this = _super.call(this, 'Optical Zoom', OpticalZoom.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    OpticalZoom.UUID = '0000011C-0000-1000-8000-0026BB765291';
    return OpticalZoom;
}(Characteristic_1.Characteristic));
exports.OpticalZoom = OpticalZoom;
Characteristic_1.Characteristic.OpticalZoom = OpticalZoom;
/**
 * Characteristic "Outlet In Use"
 */
var OutletInUse = /** @class */ (function (_super) {
    __extends(OutletInUse, _super);
    function OutletInUse() {
        var _this = _super.call(this, 'Outlet In Use', OutletInUse.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    OutletInUse.UUID = '00000026-0000-1000-8000-0026BB765291';
    return OutletInUse;
}(Characteristic_1.Characteristic));
exports.OutletInUse = OutletInUse;
Characteristic_1.Characteristic.OutletInUse = OutletInUse;
/**
 * Characteristic "Ozone Density"
 */
var OzoneDensity = /** @class */ (function (_super) {
    __extends(OzoneDensity, _super);
    function OzoneDensity() {
        var _this = _super.call(this, 'Ozone Density', OzoneDensity.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            maxValue: 1000,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    OzoneDensity.UUID = '000000C3-0000-1000-8000-0026BB765291';
    return OzoneDensity;
}(Characteristic_1.Characteristic));
exports.OzoneDensity = OzoneDensity;
Characteristic_1.Characteristic.OzoneDensity = OzoneDensity;
/**
 * Characteristic "Pair Setup"
 */
var PairSetup = /** @class */ (function (_super) {
    __extends(PairSetup, _super);
    function PairSetup() {
        var _this = _super.call(this, 'Pair Setup', PairSetup.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "pw" /* WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    PairSetup.UUID = '0000004C-0000-1000-8000-0026BB765291';
    return PairSetup;
}(Characteristic_1.Characteristic));
exports.PairSetup = PairSetup;
Characteristic_1.Characteristic.PairSetup = PairSetup;
/**
 * Characteristic "Pair Verify"
 */
var PairVerify = /** @class */ (function (_super) {
    __extends(PairVerify, _super);
    function PairVerify() {
        var _this = _super.call(this, 'Pair Verify', PairVerify.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "pw" /* WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    PairVerify.UUID = '0000004E-0000-1000-8000-0026BB765291';
    return PairVerify;
}(Characteristic_1.Characteristic));
exports.PairVerify = PairVerify;
Characteristic_1.Characteristic.PairVerify = PairVerify;
/**
 * Characteristic "Pairing Features"
 */
var PairingFeatures = /** @class */ (function (_super) {
    __extends(PairingFeatures, _super);
    function PairingFeatures() {
        var _this = _super.call(this, 'Pairing Features', PairingFeatures.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    PairingFeatures.UUID = '0000004F-0000-1000-8000-0026BB765291';
    return PairingFeatures;
}(Characteristic_1.Characteristic));
exports.PairingFeatures = PairingFeatures;
Characteristic_1.Characteristic.PairingFeatures = PairingFeatures;
/**
 * Characteristic "Pairing Pairings"
 */
var PairingPairings = /** @class */ (function (_super) {
    __extends(PairingPairings, _super);
    function PairingPairings() {
        var _this = _super.call(this, 'Pairing Pairings', PairingPairings.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "pw" /* WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    PairingPairings.UUID = '00000050-0000-1000-8000-0026BB765291';
    return PairingPairings;
}(Characteristic_1.Characteristic));
exports.PairingPairings = PairingPairings;
Characteristic_1.Characteristic.PairingPairings = PairingPairings;
/**
 * Characteristic "Password Setting"
 */
var PasswordSetting = /** @class */ (function (_super) {
    __extends(PasswordSetting, _super);
    function PasswordSetting() {
        var _this = _super.call(this, 'Password Setting', PasswordSetting.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["ev" /* NOTIFY */, "pr" /* PAIRED_READ */, "pw" /* PAIRED_WRITE */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    PasswordSetting.UUID = '000000E4-0000-1000-8000-0026BB765291';
    return PasswordSetting;
}(Characteristic_1.Characteristic));
exports.PasswordSetting = PasswordSetting;
Characteristic_1.Characteristic.PasswordSetting = PasswordSetting;
/**
 * Characteristic "PM10 Density"
 */
var PM10Density = /** @class */ (function (_super) {
    __extends(PM10Density, _super);
    function PM10Density() {
        var _this = _super.call(this, 'PM10 Density', PM10Density.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            maxValue: 1000,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    PM10Density.UUID = '000000C7-0000-1000-8000-0026BB765291';
    return PM10Density;
}(Characteristic_1.Characteristic));
exports.PM10Density = PM10Density;
Characteristic_1.Characteristic.PM10Density = PM10Density;
/**
 * Characteristic "PM2.5 Density"
 */
var PM2_5Density = /** @class */ (function (_super) {
    __extends(PM2_5Density, _super);
    function PM2_5Density() {
        var _this = _super.call(this, 'PM2.5 Density', PM2_5Density.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            maxValue: 1000,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    PM2_5Density.UUID = '000000C6-0000-1000-8000-0026BB765291';
    return PM2_5Density;
}(Characteristic_1.Characteristic));
exports.PM2_5Density = PM2_5Density;
Characteristic_1.Characteristic.PM2_5Density = PM2_5Density;
/**
 * Characteristic "Position State"
 */
var PositionState = /** @class */ (function (_super) {
    __extends(PositionState, _super);
    function PositionState() {
        var _this = _super.call(this, 'Position State', PositionState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 2,
            minValue: 0,
            validValues: [0, 1, 2],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of PositionState must be one of the following:
    PositionState.DECREASING = 0;
    PositionState.INCREASING = 1;
    PositionState.STOPPED = 2;
    PositionState.UUID = '00000072-0000-1000-8000-0026BB765291';
    return PositionState;
}(Characteristic_1.Characteristic));
exports.PositionState = PositionState;
Characteristic_1.Characteristic.PositionState = PositionState;
/**
 * Characteristic "Program Mode"
 */
var ProgramMode = /** @class */ (function (_super) {
    __extends(ProgramMode, _super);
    function ProgramMode() {
        var _this = _super.call(this, 'Program Mode', ProgramMode.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 2,
            minValue: 0,
            validValues: [0, 1, 2],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of ProgramMode must be one of the following:
    ProgramMode.NO_PROGRAM_SCHEDULED = 0;
    ProgramMode.PROGRAM_SCHEDULED = 1;
    ProgramMode.PROGRAM_SCHEDULED_MANUAL_MODE_ = 2;
    ProgramMode.UUID = '000000D1-0000-1000-8000-0026BB765291';
    return ProgramMode;
}(Characteristic_1.Characteristic));
exports.ProgramMode = ProgramMode;
Characteristic_1.Characteristic.ProgramMode = ProgramMode;
/**
 * Characteristic "Programmable Switch Event"
 */
var ProgrammableSwitchEvent = /** @class */ (function (_super) {
    __extends(ProgrammableSwitchEvent, _super);
    function ProgrammableSwitchEvent() {
        var _this = _super.call(this, 'Programmable Switch Event', ProgrammableSwitchEvent.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 2,
            minValue: 0,
            validValues: [0, 1, 2],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.eventOnlyCharacteristic = true; //Manual addition.
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of ProgrammableSwitchEvent must be one of the following:
    ProgrammableSwitchEvent.SINGLE_PRESS = 0;
    ProgrammableSwitchEvent.DOUBLE_PRESS = 1;
    ProgrammableSwitchEvent.LONG_PRESS = 2;
    ProgrammableSwitchEvent.UUID = '00000073-0000-1000-8000-0026BB765291';
    return ProgrammableSwitchEvent;
}(Characteristic_1.Characteristic));
exports.ProgrammableSwitchEvent = ProgrammableSwitchEvent;
Characteristic_1.Characteristic.ProgrammableSwitchEvent = ProgrammableSwitchEvent;
/**
 * Characteristic "Relative Humidity Dehumidifier Threshold"
 */
var RelativeHumidityDehumidifierThreshold = /** @class */ (function (_super) {
    __extends(RelativeHumidityDehumidifierThreshold, _super);
    function RelativeHumidityDehumidifierThreshold() {
        var _this = _super.call(this, 'Relative Humidity Dehumidifier Threshold', RelativeHumidityDehumidifierThreshold.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            maxValue: 100,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RelativeHumidityDehumidifierThreshold.UUID = '000000C9-0000-1000-8000-0026BB765291';
    return RelativeHumidityDehumidifierThreshold;
}(Characteristic_1.Characteristic));
exports.RelativeHumidityDehumidifierThreshold = RelativeHumidityDehumidifierThreshold;
Characteristic_1.Characteristic.RelativeHumidityDehumidifierThreshold = RelativeHumidityDehumidifierThreshold;
/**
 * Characteristic "Relative Humidity Humidifier Threshold"
 */
var RelativeHumidityHumidifierThreshold = /** @class */ (function (_super) {
    __extends(RelativeHumidityHumidifierThreshold, _super);
    function RelativeHumidityHumidifierThreshold() {
        var _this = _super.call(this, 'Relative Humidity Humidifier Threshold', RelativeHumidityHumidifierThreshold.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            unit: "percentage" /* PERCENTAGE */,
            maxValue: 100,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RelativeHumidityHumidifierThreshold.UUID = '000000CA-0000-1000-8000-0026BB765291';
    return RelativeHumidityHumidifierThreshold;
}(Characteristic_1.Characteristic));
exports.RelativeHumidityHumidifierThreshold = RelativeHumidityHumidifierThreshold;
Characteristic_1.Characteristic.RelativeHumidityHumidifierThreshold = RelativeHumidityHumidifierThreshold;
/**
 * Characteristic "Remaining Duration"
 */
var RemainingDuration = /** @class */ (function (_super) {
    __extends(RemainingDuration, _super);
    function RemainingDuration() {
        var _this = _super.call(this, 'Remaining Duration', RemainingDuration.UUID) || this;
        _this.setProps({
            format: "uint32" /* UINT32 */,
            maxValue: 3600,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RemainingDuration.UUID = '000000D4-0000-1000-8000-0026BB765291';
    return RemainingDuration;
}(Characteristic_1.Characteristic));
exports.RemainingDuration = RemainingDuration;
Characteristic_1.Characteristic.RemainingDuration = RemainingDuration;
/**
 * Characteristic "Reset Filter Indication"
 */
var ResetFilterIndication = /** @class */ (function (_super) {
    __extends(ResetFilterIndication, _super);
    function ResetFilterIndication() {
        var _this = _super.call(this, 'Reset Filter Indication', ResetFilterIndication.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 1,
            minStep: 1,
            perms: ["pw" /* WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ResetFilterIndication.UUID = '000000AD-0000-1000-8000-0026BB765291';
    return ResetFilterIndication;
}(Characteristic_1.Characteristic));
exports.ResetFilterIndication = ResetFilterIndication;
Characteristic_1.Characteristic.ResetFilterIndication = ResetFilterIndication;
/**
 * Characteristic "Rotation Direction"
 */
var RotationDirection = /** @class */ (function (_super) {
    __extends(RotationDirection, _super);
    function RotationDirection() {
        var _this = _super.call(this, 'Rotation Direction', RotationDirection.UUID) || this;
        _this.setProps({
            format: "int" /* INT */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of RotationDirection must be one of the following:
    RotationDirection.CLOCKWISE = 0;
    RotationDirection.COUNTER_CLOCKWISE = 1;
    RotationDirection.UUID = '00000028-0000-1000-8000-0026BB765291';
    return RotationDirection;
}(Characteristic_1.Characteristic));
exports.RotationDirection = RotationDirection;
Characteristic_1.Characteristic.RotationDirection = RotationDirection;
/**
 * Characteristic "Rotation Speed"
 */
var RotationSpeed = /** @class */ (function (_super) {
    __extends(RotationSpeed, _super);
    function RotationSpeed() {
        var _this = _super.call(this, 'Rotation Speed', RotationSpeed.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            unit: "percentage" /* PERCENTAGE */,
            maxValue: 100,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RotationSpeed.UUID = '00000029-0000-1000-8000-0026BB765291';
    return RotationSpeed;
}(Characteristic_1.Characteristic));
exports.RotationSpeed = RotationSpeed;
Characteristic_1.Characteristic.RotationSpeed = RotationSpeed;
/**
 * Characteristic "Saturation"
 */
var Saturation = /** @class */ (function (_super) {
    __extends(Saturation, _super);
    function Saturation() {
        var _this = _super.call(this, 'Saturation', Saturation.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            unit: "percentage" /* PERCENTAGE */,
            maxValue: 100,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Saturation.UUID = '0000002F-0000-1000-8000-0026BB765291';
    return Saturation;
}(Characteristic_1.Characteristic));
exports.Saturation = Saturation;
Characteristic_1.Characteristic.Saturation = Saturation;
/**
 * Characteristic "Security System Alarm Type"
 */
var SecuritySystemAlarmType = /** @class */ (function (_super) {
    __extends(SecuritySystemAlarmType, _super);
    function SecuritySystemAlarmType() {
        var _this = _super.call(this, 'Security System Alarm Type', SecuritySystemAlarmType.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SecuritySystemAlarmType.UUID = '0000008E-0000-1000-8000-0026BB765291';
    return SecuritySystemAlarmType;
}(Characteristic_1.Characteristic));
exports.SecuritySystemAlarmType = SecuritySystemAlarmType;
Characteristic_1.Characteristic.SecuritySystemAlarmType = SecuritySystemAlarmType;
/**
 * Characteristic "Security System Current State"
 */
var SecuritySystemCurrentState = /** @class */ (function (_super) {
    __extends(SecuritySystemCurrentState, _super);
    function SecuritySystemCurrentState() {
        var _this = _super.call(this, 'Security System Current State', SecuritySystemCurrentState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 4,
            minValue: 0,
            validValues: [0, 1, 2, 3, 4],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of SecuritySystemCurrentState must be one of the following:
    SecuritySystemCurrentState.STAY_ARM = 0;
    SecuritySystemCurrentState.AWAY_ARM = 1;
    SecuritySystemCurrentState.NIGHT_ARM = 2;
    SecuritySystemCurrentState.DISARMED = 3;
    SecuritySystemCurrentState.ALARM_TRIGGERED = 4;
    SecuritySystemCurrentState.UUID = '00000066-0000-1000-8000-0026BB765291';
    return SecuritySystemCurrentState;
}(Characteristic_1.Characteristic));
exports.SecuritySystemCurrentState = SecuritySystemCurrentState;
Characteristic_1.Characteristic.SecuritySystemCurrentState = SecuritySystemCurrentState;
/**
 * Characteristic "Security System Target State"
 */
var SecuritySystemTargetState = /** @class */ (function (_super) {
    __extends(SecuritySystemTargetState, _super);
    function SecuritySystemTargetState() {
        var _this = _super.call(this, 'Security System Target State', SecuritySystemTargetState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 3,
            minValue: 0,
            validValues: [0, 1, 2, 3],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of SecuritySystemTargetState must be one of the following:
    SecuritySystemTargetState.STAY_ARM = 0;
    SecuritySystemTargetState.AWAY_ARM = 1;
    SecuritySystemTargetState.NIGHT_ARM = 2;
    SecuritySystemTargetState.DISARM = 3;
    SecuritySystemTargetState.UUID = '00000067-0000-1000-8000-0026BB765291';
    return SecuritySystemTargetState;
}(Characteristic_1.Characteristic));
exports.SecuritySystemTargetState = SecuritySystemTargetState;
Characteristic_1.Characteristic.SecuritySystemTargetState = SecuritySystemTargetState;
/**
 * Characteristic "Selected RTP Stream Configuration"
 */
var SelectedRTPStreamConfiguration = /** @class */ (function (_super) {
    __extends(SelectedRTPStreamConfiguration, _super);
    function SelectedRTPStreamConfiguration() {
        var _this = _super.call(this, 'Selected RTP Stream Configuration', SelectedRTPStreamConfiguration.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "pw" /* WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SelectedRTPStreamConfiguration.UUID = '00000117-0000-1000-8000-0026BB765291';
    return SelectedRTPStreamConfiguration;
}(Characteristic_1.Characteristic));
exports.SelectedRTPStreamConfiguration = SelectedRTPStreamConfiguration;
Characteristic_1.Characteristic.SelectedRTPStreamConfiguration = SelectedRTPStreamConfiguration;
/**
 * Characteristic "Serial Number"
 */
var SerialNumber = /** @class */ (function (_super) {
    __extends(SerialNumber, _super);
    function SerialNumber() {
        var _this = _super.call(this, 'Serial Number', SerialNumber.UUID) || this;
        _this.setProps({
            format: "string" /* STRING */,
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SerialNumber.UUID = '00000030-0000-1000-8000-0026BB765291';
    return SerialNumber;
}(Characteristic_1.Characteristic));
exports.SerialNumber = SerialNumber;
Characteristic_1.Characteristic.SerialNumber = SerialNumber;
/**
 * Characteristic "Service Label Index"
 */
var ServiceLabelIndex = /** @class */ (function (_super) {
    __extends(ServiceLabelIndex, _super);
    function ServiceLabelIndex() {
        var _this = _super.call(this, 'Service Label Index', ServiceLabelIndex.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 255,
            minValue: 1,
            minStep: 1,
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ServiceLabelIndex.UUID = '000000CB-0000-1000-8000-0026BB765291';
    return ServiceLabelIndex;
}(Characteristic_1.Characteristic));
exports.ServiceLabelIndex = ServiceLabelIndex;
Characteristic_1.Characteristic.ServiceLabelIndex = ServiceLabelIndex;
/**
 * Characteristic "Service Label Namespace"
 */
var ServiceLabelNamespace = /** @class */ (function (_super) {
    __extends(ServiceLabelNamespace, _super);
    function ServiceLabelNamespace() {
        var _this = _super.call(this, 'Service Label Namespace', ServiceLabelNamespace.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of ServiceLabelNamespace must be one of the following:
    ServiceLabelNamespace.DOTS = 0;
    ServiceLabelNamespace.ARABIC_NUMERALS = 1;
    ServiceLabelNamespace.UUID = '000000CD-0000-1000-8000-0026BB765291';
    return ServiceLabelNamespace;
}(Characteristic_1.Characteristic));
exports.ServiceLabelNamespace = ServiceLabelNamespace;
Characteristic_1.Characteristic.ServiceLabelNamespace = ServiceLabelNamespace;
/**
 * Characteristic "Set Duration"
 */
var SetDuration = /** @class */ (function (_super) {
    __extends(SetDuration, _super);
    function SetDuration() {
        var _this = _super.call(this, 'Set Duration', SetDuration.UUID) || this;
        _this.setProps({
            format: "uint32" /* UINT32 */,
            maxValue: 3600,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SetDuration.UUID = '000000D3-0000-1000-8000-0026BB765291';
    return SetDuration;
}(Characteristic_1.Characteristic));
exports.SetDuration = SetDuration;
Characteristic_1.Characteristic.SetDuration = SetDuration;
/**
 * Characteristic "Setup Endpoints"
 */
var SetupEndpoints = /** @class */ (function (_super) {
    __extends(SetupEndpoints, _super);
    function SetupEndpoints() {
        var _this = _super.call(this, 'Setup Endpoints', SetupEndpoints.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "pw" /* WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SetupEndpoints.UUID = '00000118-0000-1000-8000-0026BB765291';
    return SetupEndpoints;
}(Characteristic_1.Characteristic));
exports.SetupEndpoints = SetupEndpoints;
Characteristic_1.Characteristic.SetupEndpoints = SetupEndpoints;
/**
 * Characteristic "Slat Type"
 */
var SlatType = /** @class */ (function (_super) {
    __extends(SlatType, _super);
    function SlatType() {
        var _this = _super.call(this, 'Slat Type', SlatType.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of SlatType must be one of the following:
    SlatType.HORIZONTAL = 0;
    SlatType.VERTICAL = 1;
    SlatType.UUID = '000000C0-0000-1000-8000-0026BB765291';
    return SlatType;
}(Characteristic_1.Characteristic));
exports.SlatType = SlatType;
Characteristic_1.Characteristic.SlatType = SlatType;
/**
 * Characteristic "Smoke Detected"
 */
var SmokeDetected = /** @class */ (function (_super) {
    __extends(SmokeDetected, _super);
    function SmokeDetected() {
        var _this = _super.call(this, 'Smoke Detected', SmokeDetected.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of SmokeDetected must be one of the following:
    SmokeDetected.SMOKE_NOT_DETECTED = 0;
    SmokeDetected.SMOKE_DETECTED = 1;
    SmokeDetected.UUID = '00000076-0000-1000-8000-0026BB765291';
    return SmokeDetected;
}(Characteristic_1.Characteristic));
exports.SmokeDetected = SmokeDetected;
Characteristic_1.Characteristic.SmokeDetected = SmokeDetected;
/**
 * Characteristic "Status Active"
 */
var StatusActive = /** @class */ (function (_super) {
    __extends(StatusActive, _super);
    function StatusActive() {
        var _this = _super.call(this, 'Status Active', StatusActive.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    StatusActive.UUID = '00000075-0000-1000-8000-0026BB765291';
    return StatusActive;
}(Characteristic_1.Characteristic));
exports.StatusActive = StatusActive;
Characteristic_1.Characteristic.StatusActive = StatusActive;
/**
 * Characteristic "Status Fault"
 */
var StatusFault = /** @class */ (function (_super) {
    __extends(StatusFault, _super);
    function StatusFault() {
        var _this = _super.call(this, 'Status Fault', StatusFault.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of StatusFault must be one of the following:
    StatusFault.NO_FAULT = 0;
    StatusFault.GENERAL_FAULT = 1;
    StatusFault.UUID = '00000077-0000-1000-8000-0026BB765291';
    return StatusFault;
}(Characteristic_1.Characteristic));
exports.StatusFault = StatusFault;
Characteristic_1.Characteristic.StatusFault = StatusFault;
/**
 * Characteristic "Status Jammed"
 */
var StatusJammed = /** @class */ (function (_super) {
    __extends(StatusJammed, _super);
    function StatusJammed() {
        var _this = _super.call(this, 'Status Jammed', StatusJammed.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of StatusJammed must be one of the following:
    StatusJammed.NOT_JAMMED = 0;
    StatusJammed.JAMMED = 1;
    StatusJammed.UUID = '00000078-0000-1000-8000-0026BB765291';
    return StatusJammed;
}(Characteristic_1.Characteristic));
exports.StatusJammed = StatusJammed;
Characteristic_1.Characteristic.StatusJammed = StatusJammed;
/**
 * Characteristic "Status Low Battery"
 */
var StatusLowBattery = /** @class */ (function (_super) {
    __extends(StatusLowBattery, _super);
    function StatusLowBattery() {
        var _this = _super.call(this, 'Status Low Battery', StatusLowBattery.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of StatusLowBattery must be one of the following:
    StatusLowBattery.BATTERY_LEVEL_NORMAL = 0;
    StatusLowBattery.BATTERY_LEVEL_LOW = 1;
    StatusLowBattery.UUID = '00000079-0000-1000-8000-0026BB765291';
    return StatusLowBattery;
}(Characteristic_1.Characteristic));
exports.StatusLowBattery = StatusLowBattery;
Characteristic_1.Characteristic.StatusLowBattery = StatusLowBattery;
/**
 * Characteristic "Status Tampered"
 */
var StatusTampered = /** @class */ (function (_super) {
    __extends(StatusTampered, _super);
    function StatusTampered() {
        var _this = _super.call(this, 'Status Tampered', StatusTampered.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of StatusTampered must be one of the following:
    StatusTampered.NOT_TAMPERED = 0;
    StatusTampered.TAMPERED = 1;
    StatusTampered.UUID = '0000007A-0000-1000-8000-0026BB765291';
    return StatusTampered;
}(Characteristic_1.Characteristic));
exports.StatusTampered = StatusTampered;
Characteristic_1.Characteristic.StatusTampered = StatusTampered;
/**
 * Characteristic "Streaming Status"
 */
var StreamingStatus = /** @class */ (function (_super) {
    __extends(StreamingStatus, _super);
    function StreamingStatus() {
        var _this = _super.call(this, 'Streaming Status', StreamingStatus.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    StreamingStatus.UUID = '00000120-0000-1000-8000-0026BB765291';
    return StreamingStatus;
}(Characteristic_1.Characteristic));
exports.StreamingStatus = StreamingStatus;
Characteristic_1.Characteristic.StreamingStatus = StreamingStatus;
/**
 * Characteristic "Sulphur Dioxide Density"
 */
var SulphurDioxideDensity = /** @class */ (function (_super) {
    __extends(SulphurDioxideDensity, _super);
    function SulphurDioxideDensity() {
        var _this = _super.call(this, 'Sulphur Dioxide Density', SulphurDioxideDensity.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            maxValue: 1000,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SulphurDioxideDensity.UUID = '000000C5-0000-1000-8000-0026BB765291';
    return SulphurDioxideDensity;
}(Characteristic_1.Characteristic));
exports.SulphurDioxideDensity = SulphurDioxideDensity;
Characteristic_1.Characteristic.SulphurDioxideDensity = SulphurDioxideDensity;
/**
 * Characteristic "Supported Audio Stream Configuration"
 */
var SupportedAudioStreamConfiguration = /** @class */ (function (_super) {
    __extends(SupportedAudioStreamConfiguration, _super);
    function SupportedAudioStreamConfiguration() {
        var _this = _super.call(this, 'Supported Audio Stream Configuration', SupportedAudioStreamConfiguration.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedAudioStreamConfiguration.UUID = '00000115-0000-1000-8000-0026BB765291';
    return SupportedAudioStreamConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedAudioStreamConfiguration = SupportedAudioStreamConfiguration;
Characteristic_1.Characteristic.SupportedAudioStreamConfiguration = SupportedAudioStreamConfiguration;
/**
 * Characteristic "Supported RTP Configuration"
 */
var SupportedRTPConfiguration = /** @class */ (function (_super) {
    __extends(SupportedRTPConfiguration, _super);
    function SupportedRTPConfiguration() {
        var _this = _super.call(this, 'Supported RTP Configuration', SupportedRTPConfiguration.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedRTPConfiguration.UUID = '00000116-0000-1000-8000-0026BB765291';
    return SupportedRTPConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedRTPConfiguration = SupportedRTPConfiguration;
Characteristic_1.Characteristic.SupportedRTPConfiguration = SupportedRTPConfiguration;
/**
 * Characteristic "Supported Video Stream Configuration"
 */
var SupportedVideoStreamConfiguration = /** @class */ (function (_super) {
    __extends(SupportedVideoStreamConfiguration, _super);
    function SupportedVideoStreamConfiguration() {
        var _this = _super.call(this, 'Supported Video Stream Configuration', SupportedVideoStreamConfiguration.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedVideoStreamConfiguration.UUID = '00000114-0000-1000-8000-0026BB765291';
    return SupportedVideoStreamConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedVideoStreamConfiguration = SupportedVideoStreamConfiguration;
Characteristic_1.Characteristic.SupportedVideoStreamConfiguration = SupportedVideoStreamConfiguration;
/**
 * Characteristic "Swing Mode"
 */
var SwingMode = /** @class */ (function (_super) {
    __extends(SwingMode, _super);
    function SwingMode() {
        var _this = _super.call(this, 'Swing Mode', SwingMode.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of SwingMode must be one of the following:
    SwingMode.SWING_DISABLED = 0;
    SwingMode.SWING_ENABLED = 1;
    SwingMode.UUID = '000000B6-0000-1000-8000-0026BB765291';
    return SwingMode;
}(Characteristic_1.Characteristic));
exports.SwingMode = SwingMode;
Characteristic_1.Characteristic.SwingMode = SwingMode;
/**
 * Characteristic "Target Air Purifier State"
 */
var TargetAirPurifierState = /** @class */ (function (_super) {
    __extends(TargetAirPurifierState, _super);
    function TargetAirPurifierState() {
        var _this = _super.call(this, 'Target Air Purifier State', TargetAirPurifierState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of TargetAirPurifierState must be one of the following:
    TargetAirPurifierState.MANUAL = 0;
    TargetAirPurifierState.AUTO = 1;
    TargetAirPurifierState.UUID = '000000A8-0000-1000-8000-0026BB765291';
    return TargetAirPurifierState;
}(Characteristic_1.Characteristic));
exports.TargetAirPurifierState = TargetAirPurifierState;
Characteristic_1.Characteristic.TargetAirPurifierState = TargetAirPurifierState;
/**
 * Characteristic "Target Air Quality"
 */
var TargetAirQuality = /** @class */ (function (_super) {
    __extends(TargetAirQuality, _super);
    function TargetAirQuality() {
        var _this = _super.call(this, 'Target Air Quality', TargetAirQuality.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 2,
            minValue: 0,
            validValues: [0, 1, 2],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of TargetAirQuality must be one of the following:
    TargetAirQuality.EXCELLENT = 0;
    TargetAirQuality.GOOD = 1;
    TargetAirQuality.FAIR = 2;
    TargetAirQuality.UUID = '000000AE-0000-1000-8000-0026BB765291';
    return TargetAirQuality;
}(Characteristic_1.Characteristic));
exports.TargetAirQuality = TargetAirQuality;
Characteristic_1.Characteristic.TargetAirQuality = TargetAirQuality;
/**
 * Characteristic "Target Door State"
 */
var TargetDoorState = /** @class */ (function (_super) {
    __extends(TargetDoorState, _super);
    function TargetDoorState() {
        var _this = _super.call(this, 'Target Door State', TargetDoorState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of TargetDoorState must be one of the following:
    TargetDoorState.OPEN = 0;
    TargetDoorState.CLOSED = 1;
    TargetDoorState.UUID = '00000032-0000-1000-8000-0026BB765291';
    return TargetDoorState;
}(Characteristic_1.Characteristic));
exports.TargetDoorState = TargetDoorState;
Characteristic_1.Characteristic.TargetDoorState = TargetDoorState;
/**
 * Characteristic "Target Fan State"
 */
var TargetFanState = /** @class */ (function (_super) {
    __extends(TargetFanState, _super);
    function TargetFanState() {
        var _this = _super.call(this, 'Target Fan State', TargetFanState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of TargetFanState must be one of the following:
    TargetFanState.MANUAL = 0;
    TargetFanState.AUTO = 1;
    TargetFanState.UUID = '000000BF-0000-1000-8000-0026BB765291';
    return TargetFanState;
}(Characteristic_1.Characteristic));
exports.TargetFanState = TargetFanState;
Characteristic_1.Characteristic.TargetFanState = TargetFanState;
/**
 * Characteristic "Target Heater Cooler State"
 */
var TargetHeaterCoolerState = /** @class */ (function (_super) {
    __extends(TargetHeaterCoolerState, _super);
    function TargetHeaterCoolerState() {
        var _this = _super.call(this, 'Target Heater Cooler State', TargetHeaterCoolerState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 2,
            minValue: 0,
            validValues: [0, 1, 2],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of TargetHeaterCoolerState must be one of the following:
    TargetHeaterCoolerState.AUTO = 0;
    TargetHeaterCoolerState.HEAT = 1;
    TargetHeaterCoolerState.COOL = 2;
    TargetHeaterCoolerState.UUID = '000000B2-0000-1000-8000-0026BB765291';
    return TargetHeaterCoolerState;
}(Characteristic_1.Characteristic));
exports.TargetHeaterCoolerState = TargetHeaterCoolerState;
Characteristic_1.Characteristic.TargetHeaterCoolerState = TargetHeaterCoolerState;
/**
 * Characteristic "Target Heating Cooling State"
 */
var TargetHeatingCoolingState = /** @class */ (function (_super) {
    __extends(TargetHeatingCoolingState, _super);
    function TargetHeatingCoolingState() {
        var _this = _super.call(this, 'Target Heating Cooling State', TargetHeatingCoolingState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 3,
            minValue: 0,
            validValues: [0, 1, 2, 3],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of TargetHeatingCoolingState must be one of the following:
    TargetHeatingCoolingState.OFF = 0;
    TargetHeatingCoolingState.HEAT = 1;
    TargetHeatingCoolingState.COOL = 2;
    TargetHeatingCoolingState.AUTO = 3;
    TargetHeatingCoolingState.UUID = '00000033-0000-1000-8000-0026BB765291';
    return TargetHeatingCoolingState;
}(Characteristic_1.Characteristic));
exports.TargetHeatingCoolingState = TargetHeatingCoolingState;
Characteristic_1.Characteristic.TargetHeatingCoolingState = TargetHeatingCoolingState;
/**
 * Characteristic "Target Horizontal Tilt Angle"
 */
var TargetHorizontalTiltAngle = /** @class */ (function (_super) {
    __extends(TargetHorizontalTiltAngle, _super);
    function TargetHorizontalTiltAngle() {
        var _this = _super.call(this, 'Target Horizontal Tilt Angle', TargetHorizontalTiltAngle.UUID) || this;
        _this.setProps({
            format: "int" /* INT */,
            unit: "arcdegrees" /* ARC_DEGREE */,
            maxValue: 90,
            minValue: -90,
            minStep: 1,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetHorizontalTiltAngle.UUID = '0000007B-0000-1000-8000-0026BB765291';
    return TargetHorizontalTiltAngle;
}(Characteristic_1.Characteristic));
exports.TargetHorizontalTiltAngle = TargetHorizontalTiltAngle;
Characteristic_1.Characteristic.TargetHorizontalTiltAngle = TargetHorizontalTiltAngle;
/**
 * Characteristic "Target Humidifier Dehumidifier State"
 */
var TargetHumidifierDehumidifierState = /** @class */ (function (_super) {
    __extends(TargetHumidifierDehumidifierState, _super);
    function TargetHumidifierDehumidifierState() {
        var _this = _super.call(this, 'Target Humidifier Dehumidifier State', TargetHumidifierDehumidifierState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 2,
            minValue: 0,
            validValues: [0, 1, 2],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    /**
     * @deprecated Removed in iOS 11. Use HUMIDIFIER_OR_DEHUMIDIFIER instead.
     */
    TargetHumidifierDehumidifierState.AUTO = 0;
    // The value property of TargetHumidifierDehumidifierState must be one of the following:
    TargetHumidifierDehumidifierState.HUMIDIFIER_OR_DEHUMIDIFIER = 0;
    TargetHumidifierDehumidifierState.HUMIDIFIER = 1;
    TargetHumidifierDehumidifierState.DEHUMIDIFIER = 2;
    TargetHumidifierDehumidifierState.UUID = '000000B4-0000-1000-8000-0026BB765291';
    return TargetHumidifierDehumidifierState;
}(Characteristic_1.Characteristic));
exports.TargetHumidifierDehumidifierState = TargetHumidifierDehumidifierState;
Characteristic_1.Characteristic.TargetHumidifierDehumidifierState = TargetHumidifierDehumidifierState;
/**
 * Characteristic "Target Position"
 */
var TargetPosition = /** @class */ (function (_super) {
    __extends(TargetPosition, _super);
    function TargetPosition() {
        var _this = _super.call(this, 'Target Position', TargetPosition.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            unit: "percentage" /* PERCENTAGE */,
            maxValue: 100,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetPosition.UUID = '0000007C-0000-1000-8000-0026BB765291';
    return TargetPosition;
}(Characteristic_1.Characteristic));
exports.TargetPosition = TargetPosition;
Characteristic_1.Characteristic.TargetPosition = TargetPosition;
/**
 * Characteristic "Target Relative Humidity"
 */
var TargetRelativeHumidity = /** @class */ (function (_super) {
    __extends(TargetRelativeHumidity, _super);
    function TargetRelativeHumidity() {
        var _this = _super.call(this, 'Target Relative Humidity', TargetRelativeHumidity.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            unit: "percentage" /* PERCENTAGE */,
            maxValue: 100,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetRelativeHumidity.UUID = '00000034-0000-1000-8000-0026BB765291';
    return TargetRelativeHumidity;
}(Characteristic_1.Characteristic));
exports.TargetRelativeHumidity = TargetRelativeHumidity;
Characteristic_1.Characteristic.TargetRelativeHumidity = TargetRelativeHumidity;
/**
 * Characteristic "Target Slat State"
 */
var TargetSlatState = /** @class */ (function (_super) {
    __extends(TargetSlatState, _super);
    function TargetSlatState() {
        var _this = _super.call(this, 'Target Slat State', TargetSlatState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of TargetSlatState must be one of the following:
    TargetSlatState.MANUAL = 0;
    TargetSlatState.AUTO = 1;
    TargetSlatState.UUID = '000000BE-0000-1000-8000-0026BB765291';
    return TargetSlatState;
}(Characteristic_1.Characteristic));
exports.TargetSlatState = TargetSlatState;
Characteristic_1.Characteristic.TargetSlatState = TargetSlatState;
/**
 * Characteristic "Target Temperature"
 */
var TargetTemperature = /** @class */ (function (_super) {
    __extends(TargetTemperature, _super);
    function TargetTemperature() {
        var _this = _super.call(this, 'Target Temperature', TargetTemperature.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            unit: "celsius" /* CELSIUS */,
            maxValue: 38,
            minValue: 10,
            minStep: 0.1,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetTemperature.UUID = '00000035-0000-1000-8000-0026BB765291';
    return TargetTemperature;
}(Characteristic_1.Characteristic));
exports.TargetTemperature = TargetTemperature;
Characteristic_1.Characteristic.TargetTemperature = TargetTemperature;
/**
 * Characteristic "Target Tilt Angle"
 */
var TargetTiltAngle = /** @class */ (function (_super) {
    __extends(TargetTiltAngle, _super);
    function TargetTiltAngle() {
        var _this = _super.call(this, 'Target Tilt Angle', TargetTiltAngle.UUID) || this;
        _this.setProps({
            format: "int" /* INT */,
            unit: "arcdegrees" /* ARC_DEGREE */,
            maxValue: 90,
            minValue: -90,
            minStep: 1,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetTiltAngle.UUID = '000000C2-0000-1000-8000-0026BB765291';
    return TargetTiltAngle;
}(Characteristic_1.Characteristic));
exports.TargetTiltAngle = TargetTiltAngle;
Characteristic_1.Characteristic.TargetTiltAngle = TargetTiltAngle;
/**
 * Characteristic "Target Vertical Tilt Angle"
 */
var TargetVerticalTiltAngle = /** @class */ (function (_super) {
    __extends(TargetVerticalTiltAngle, _super);
    function TargetVerticalTiltAngle() {
        var _this = _super.call(this, 'Target Vertical Tilt Angle', TargetVerticalTiltAngle.UUID) || this;
        _this.setProps({
            format: "int" /* INT */,
            unit: "arcdegrees" /* ARC_DEGREE */,
            maxValue: 90,
            minValue: -90,
            minStep: 1,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TargetVerticalTiltAngle.UUID = '0000007D-0000-1000-8000-0026BB765291';
    return TargetVerticalTiltAngle;
}(Characteristic_1.Characteristic));
exports.TargetVerticalTiltAngle = TargetVerticalTiltAngle;
Characteristic_1.Characteristic.TargetVerticalTiltAngle = TargetVerticalTiltAngle;
/**
 * Characteristic "Temperature Display Units"
 */
var TemperatureDisplayUnits = /** @class */ (function (_super) {
    __extends(TemperatureDisplayUnits, _super);
    function TemperatureDisplayUnits() {
        var _this = _super.call(this, 'Temperature Display Units', TemperatureDisplayUnits.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of TemperatureDisplayUnits must be one of the following:
    TemperatureDisplayUnits.CELSIUS = 0;
    TemperatureDisplayUnits.FAHRENHEIT = 1;
    TemperatureDisplayUnits.UUID = '00000036-0000-1000-8000-0026BB765291';
    return TemperatureDisplayUnits;
}(Characteristic_1.Characteristic));
exports.TemperatureDisplayUnits = TemperatureDisplayUnits;
Characteristic_1.Characteristic.TemperatureDisplayUnits = TemperatureDisplayUnits;
/**
 * Characteristic "Valve Type"
 */
var ValveType = /** @class */ (function (_super) {
    __extends(ValveType, _super);
    function ValveType() {
        var _this = _super.call(this, 'Valve Type', ValveType.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 3,
            minValue: 0,
            validValues: [0, 1, 2, 3],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of ValveType must be one of the following:
    ValveType.GENERIC_VALVE = 0;
    ValveType.IRRIGATION = 1;
    ValveType.SHOWER_HEAD = 2;
    ValveType.WATER_FAUCET = 3;
    ValveType.UUID = '000000D5-0000-1000-8000-0026BB765291';
    return ValveType;
}(Characteristic_1.Characteristic));
exports.ValveType = ValveType;
Characteristic_1.Characteristic.ValveType = ValveType;
/**
 * Characteristic "Version"
 */
var Version = /** @class */ (function (_super) {
    __extends(Version, _super);
    function Version() {
        var _this = _super.call(this, 'Version', Version.UUID) || this;
        _this.setProps({
            format: "string" /* STRING */,
            perms: ["pr" /* PAIRED_READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Version.UUID = '00000037-0000-1000-8000-0026BB765291';
    return Version;
}(Characteristic_1.Characteristic));
exports.Version = Version;
Characteristic_1.Characteristic.Version = Version;
/**
 * Characteristic "VOC Density"
 */
var VOCDensity = /** @class */ (function (_super) {
    __extends(VOCDensity, _super);
    function VOCDensity() {
        var _this = _super.call(this, 'VOC Density', VOCDensity.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            maxValue: 1000,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    VOCDensity.UUID = '000000C8-0000-1000-8000-0026BB765291';
    return VOCDensity;
}(Characteristic_1.Characteristic));
exports.VOCDensity = VOCDensity;
Characteristic_1.Characteristic.VOCDensity = VOCDensity;
/**
 * Characteristic "Volume"
 */
var Volume = /** @class */ (function (_super) {
    __extends(Volume, _super);
    function Volume() {
        var _this = _super.call(this, 'Volume', Volume.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            unit: "percentage" /* PERCENTAGE */,
            maxValue: 100,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Volume.UUID = '00000119-0000-1000-8000-0026BB765291';
    return Volume;
}(Characteristic_1.Characteristic));
exports.Volume = Volume;
Characteristic_1.Characteristic.Volume = Volume;
/**
 * Characteristic "Water Level"
 */
var WaterLevel = /** @class */ (function (_super) {
    __extends(WaterLevel, _super);
    function WaterLevel() {
        var _this = _super.call(this, 'Water Level', WaterLevel.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            maxValue: 100,
            minValue: 0,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    WaterLevel.UUID = '000000B5-0000-1000-8000-0026BB765291';
    return WaterLevel;
}(Characteristic_1.Characteristic));
exports.WaterLevel = WaterLevel;
Characteristic_1.Characteristic.WaterLevel = WaterLevel;
/**
 * Characteristic "Recording Audio Active"
 */
var RecordingAudioActive = /** @class */ (function (_super) {
    __extends(RecordingAudioActive, _super);
    function RecordingAudioActive() {
        var _this = _super.call(this, 'Recording Audio Active', RecordingAudioActive.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RecordingAudioActive.DISABLE = 0;
    RecordingAudioActive.ENABLE = 1;
    RecordingAudioActive.UUID = '00000226-0000-1000-8000-0026BB765291';
    return RecordingAudioActive;
}(Characteristic_1.Characteristic));
exports.RecordingAudioActive = RecordingAudioActive;
Characteristic_1.Characteristic.RecordingAudioActive = RecordingAudioActive;
/**
 * Characteristic "Supported Camera Recording Configuration"
 */
var SupportedCameraRecordingConfiguration = /** @class */ (function (_super) {
    __extends(SupportedCameraRecordingConfiguration, _super);
    function SupportedCameraRecordingConfiguration() {
        var _this = _super.call(this, 'Supported Camera Recording Configuration', SupportedCameraRecordingConfiguration.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedCameraRecordingConfiguration.UUID = '00000205-0000-1000-8000-0026BB765291';
    return SupportedCameraRecordingConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedCameraRecordingConfiguration = SupportedCameraRecordingConfiguration;
Characteristic_1.Characteristic.SupportedCameraRecordingConfiguration = SupportedCameraRecordingConfiguration;
/**
 * Characteristic "Supported Video Recording Configuration"
 */
var SupportedVideoRecordingConfiguration = /** @class */ (function (_super) {
    __extends(SupportedVideoRecordingConfiguration, _super);
    function SupportedVideoRecordingConfiguration() {
        var _this = _super.call(this, 'Supported Video Recording Configuration', SupportedVideoRecordingConfiguration.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedVideoRecordingConfiguration.UUID = '00000206-0000-1000-8000-0026BB765291';
    return SupportedVideoRecordingConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedVideoRecordingConfiguration = SupportedVideoRecordingConfiguration;
Characteristic_1.Characteristic.SupportedVideoRecordingConfiguration = SupportedVideoRecordingConfiguration;
/**
 * Characteristic "Supported Audio Recording Configuration"
 */
var SupportedAudioRecordingConfiguration = /** @class */ (function (_super) {
    __extends(SupportedAudioRecordingConfiguration, _super);
    function SupportedAudioRecordingConfiguration() {
        var _this = _super.call(this, 'Supported Audio Recording Configuration', SupportedAudioRecordingConfiguration.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedAudioRecordingConfiguration.UUID = '00000207-0000-1000-8000-0026BB765291';
    return SupportedAudioRecordingConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedAudioRecordingConfiguration = SupportedAudioRecordingConfiguration;
Characteristic_1.Characteristic.SupportedAudioRecordingConfiguration = SupportedAudioRecordingConfiguration;
/**
 * Characteristic "Selected Camera Recording Configuration"
 */
var SelectedCameraRecordingConfiguration = /** @class */ (function (_super) {
    __extends(SelectedCameraRecordingConfiguration, _super);
    function SelectedCameraRecordingConfiguration() {
        var _this = _super.call(this, 'Selected Camera Recording Configuration', SelectedCameraRecordingConfiguration.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SelectedCameraRecordingConfiguration.UUID = '00000209-0000-1000-8000-0026BB765291';
    return SelectedCameraRecordingConfiguration;
}(Characteristic_1.Characteristic));
exports.SelectedCameraRecordingConfiguration = SelectedCameraRecordingConfiguration;
Characteristic_1.Characteristic.SelectedCameraRecordingConfiguration = SelectedCameraRecordingConfiguration;
/**
 * Characteristic "Camera Operating Mode Indicator"
 */
var CameraOperatingModeIndicator = /** @class */ (function (_super) {
    __extends(CameraOperatingModeIndicator, _super);
    function CameraOperatingModeIndicator() {
        var _this = _super.call(this, 'Camera Operating Mode Indicator', CameraOperatingModeIndicator.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */, "tw" /* TIMED_WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CameraOperatingModeIndicator.DISABLE = 0;
    CameraOperatingModeIndicator.ENABLE = 1;
    CameraOperatingModeIndicator.UUID = '0000021D-0000-1000-8000-0026BB765291';
    return CameraOperatingModeIndicator;
}(Characteristic_1.Characteristic));
exports.CameraOperatingModeIndicator = CameraOperatingModeIndicator;
Characteristic_1.Characteristic.CameraOperatingModeIndicator = CameraOperatingModeIndicator;
/**
 * Characteristic "Event Snapshots Active"
 */
var EventSnapshotsActive = /** @class */ (function (_super) {
    __extends(EventSnapshotsActive, _super);
    function EventSnapshotsActive() {
        var _this = _super.call(this, 'Event Snapshots Active', EventSnapshotsActive.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    EventSnapshotsActive.DISABLE = 0;
    EventSnapshotsActive.ENABLE = 1;
    EventSnapshotsActive.UUID = '00000223-0000-1000-8000-0026BB765291';
    return EventSnapshotsActive;
}(Characteristic_1.Characteristic));
exports.EventSnapshotsActive = EventSnapshotsActive;
Characteristic_1.Characteristic.EventSnapshotsActive = EventSnapshotsActive;
/**
 * Characteristic "Diagonal Field Of View"
 *
 * @deprecated was removed again
 */
var DiagonalFieldOfView = /** @class */ (function (_super) {
    __extends(DiagonalFieldOfView, _super);
    function DiagonalFieldOfView() {
        var _this = _super.call(this, 'Diagonal Field Of View', DiagonalFieldOfView.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            unit: "arcdegrees" /* ARC_DEGREE */,
            maxValue: 360,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    DiagonalFieldOfView.UUID = '00000224-0000-1000-8000-0026BB765291';
    return DiagonalFieldOfView;
}(Characteristic_1.Characteristic));
exports.DiagonalFieldOfView = DiagonalFieldOfView;
Characteristic_1.Characteristic.DiagonalFieldOfView = DiagonalFieldOfView;
/**
 * Characteristic "HomeKit Camera Active"
 */
var HomeKitCameraActive = /** @class */ (function (_super) {
    __extends(HomeKitCameraActive, _super);
    function HomeKitCameraActive() {
        var _this = _super.call(this, 'HomeKit Camera Active', HomeKitCameraActive.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */, "tw" /* TIMED_WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    HomeKitCameraActive.OFF = 0;
    HomeKitCameraActive.ON = 1;
    HomeKitCameraActive.UUID = '0000021B-0000-1000-8000-0026BB765291';
    return HomeKitCameraActive;
}(Characteristic_1.Characteristic));
exports.HomeKitCameraActive = HomeKitCameraActive;
Characteristic_1.Characteristic.HomeKitCameraActive = HomeKitCameraActive;
/**
 * Characteristic "Manually disabled"
 */
var ManuallyDisabled = /** @class */ (function (_super) {
    __extends(ManuallyDisabled, _super);
    function ManuallyDisabled() {
        var _this = _super.call(this, 'Manually disabled', ManuallyDisabled.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ManuallyDisabled.ENABLED = 0;
    ManuallyDisabled.DISABLED = 1;
    ManuallyDisabled.UUID = '00000227-0000-1000-8000-0026BB765291';
    return ManuallyDisabled;
}(Characteristic_1.Characteristic));
exports.ManuallyDisabled = ManuallyDisabled;
Characteristic_1.Characteristic.ManuallyDisabled = ManuallyDisabled;
/**
 * Characteristic "Third Party Camera Active"
 */
var ThirdPartyCameraActive = /** @class */ (function (_super) {
    __extends(ThirdPartyCameraActive, _super);
    function ThirdPartyCameraActive() {
        var _this = _super.call(this, 'Third Party Camera Active', ThirdPartyCameraActive.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ThirdPartyCameraActive.OFF = 0;
    ThirdPartyCameraActive.ON = 1;
    ThirdPartyCameraActive.UUID = '0000021C-0000-1000-8000-0026BB765291';
    return ThirdPartyCameraActive;
}(Characteristic_1.Characteristic));
exports.ThirdPartyCameraActive = ThirdPartyCameraActive;
Characteristic_1.Characteristic.ThirdPartyCameraActive = ThirdPartyCameraActive;
/**
 * Characteristic "Periodic Snapshots Active"
 */
var PeriodicSnapshotsActive = /** @class */ (function (_super) {
    __extends(PeriodicSnapshotsActive, _super);
    function PeriodicSnapshotsActive() {
        var _this = _super.call(this, 'Periodic Snapshots Active', PeriodicSnapshotsActive.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    PeriodicSnapshotsActive.DISABLE = 0;
    PeriodicSnapshotsActive.ENABLE = 1;
    PeriodicSnapshotsActive.UUID = '00000225-0000-1000-8000-0026BB765291';
    return PeriodicSnapshotsActive;
}(Characteristic_1.Characteristic));
exports.PeriodicSnapshotsActive = PeriodicSnapshotsActive;
Characteristic_1.Characteristic.PeriodicSnapshotsActive = PeriodicSnapshotsActive;
/**
 * Characteristic "Network Client Profile Control"
 */
var NetworkClientProfileControl = /** @class */ (function (_super) {
    __extends(NetworkClientProfileControl, _super);
    function NetworkClientProfileControl() {
        var _this = _super.call(this, 'Network Client Profile Control', NetworkClientProfileControl.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */, "tw" /* TIMED_WRITE */, "wr" /* WRITE_RESPONSE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    NetworkClientProfileControl.UUID = '0000020C-0000-1000-8000-0026BB765291';
    return NetworkClientProfileControl;
}(Characteristic_1.Characteristic));
exports.NetworkClientProfileControl = NetworkClientProfileControl;
Characteristic_1.Characteristic.NetworkClientProfileControl = NetworkClientProfileControl;
/**
 * Characteristic "Network Client Status Control"
 */
var NetworkClientStatusControl = /** @class */ (function (_super) {
    __extends(NetworkClientStatusControl, _super);
    function NetworkClientStatusControl() {
        var _this = _super.call(this, 'Network Client Status Control', NetworkClientStatusControl.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "wr" /* WRITE_RESPONSE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    NetworkClientStatusControl.UUID = '0000020D-0000-1000-8000-0026BB765291';
    return NetworkClientStatusControl;
}(Characteristic_1.Characteristic));
exports.NetworkClientStatusControl = NetworkClientStatusControl;
Characteristic_1.Characteristic.NetworkClientStatusControl = NetworkClientStatusControl;
/**
 * Characteristic "Router Status"
 */
var RouterStatus = /** @class */ (function (_super) {
    __extends(RouterStatus, _super);
    function RouterStatus() {
        var _this = _super.call(this, 'Router Status', RouterStatus.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RouterStatus.READY = 0;
    RouterStatus.NOT_READY = 1;
    RouterStatus.UUID = '0000020E-0000-1000-8000-0026BB765291';
    return RouterStatus;
}(Characteristic_1.Characteristic));
exports.RouterStatus = RouterStatus;
Characteristic_1.Characteristic.RouterStatus = RouterStatus;
/**
 * Characteristic "Supported Router Configuration"
 */
var SupportedRouterConfiguration = /** @class */ (function (_super) {
    __extends(SupportedRouterConfiguration, _super);
    function SupportedRouterConfiguration() {
        var _this = _super.call(this, 'Supported Router Configuration', SupportedRouterConfiguration.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedRouterConfiguration.UUID = '00000210-0000-1000-8000-0026BB765291';
    return SupportedRouterConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedRouterConfiguration = SupportedRouterConfiguration;
Characteristic_1.Characteristic.SupportedRouterConfiguration = SupportedRouterConfiguration;
/**
 * Characteristic "WAN Configuration List"
 */
var WANConfigurationList = /** @class */ (function (_super) {
    __extends(WANConfigurationList, _super);
    function WANConfigurationList() {
        var _this = _super.call(this, 'WAN Configuration List', WANConfigurationList.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    WANConfigurationList.UUID = '00000211-0000-1000-8000-0026BB765291';
    return WANConfigurationList;
}(Characteristic_1.Characteristic));
exports.WANConfigurationList = WANConfigurationList;
Characteristic_1.Characteristic.WANConfigurationList = WANConfigurationList;
/**
 * Characteristic "WAN Status List"
 */
var WANStatusList = /** @class */ (function (_super) {
    __extends(WANStatusList, _super);
    function WANStatusList() {
        var _this = _super.call(this, 'WAN Status List', WANStatusList.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    WANStatusList.UUID = '00000212-0000-1000-8000-0026BB765291';
    return WANStatusList;
}(Characteristic_1.Characteristic));
exports.WANStatusList = WANStatusList;
Characteristic_1.Characteristic.WANStatusList = WANStatusList;
/**
 * Characteristic "Managed Network Enable"
 */
var ManagedNetworkEnable = /** @class */ (function (_super) {
    __extends(ManagedNetworkEnable, _super);
    function ManagedNetworkEnable() {
        var _this = _super.call(this, 'Managed Network Enable', ManagedNetworkEnable.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            validValues: [0, 1],
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */, "tw" /* TIMED_WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ManagedNetworkEnable.DISABLED = 0;
    ManagedNetworkEnable.ENABLED = 1;
    ManagedNetworkEnable.UNKNOWN = 2;
    ManagedNetworkEnable.UUID = '00000215-0000-1000-8000-0026BB765291';
    return ManagedNetworkEnable;
}(Characteristic_1.Characteristic));
exports.ManagedNetworkEnable = ManagedNetworkEnable;
Characteristic_1.Characteristic.ManagedNetworkEnable = ManagedNetworkEnable;
/**
 * Characteristic "Network Access Violation Control"
 */
var NetworkAccessViolationControl = /** @class */ (function (_super) {
    __extends(NetworkAccessViolationControl, _super);
    function NetworkAccessViolationControl() {
        var _this = _super.call(this, 'Network Access Violation Control', NetworkAccessViolationControl.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */, "tw" /* TIMED_WRITE */, "wr" /* WRITE_RESPONSE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    NetworkAccessViolationControl.UUID = '0000021F-0000-1000-8000-0026BB765291';
    return NetworkAccessViolationControl;
}(Characteristic_1.Characteristic));
exports.NetworkAccessViolationControl = NetworkAccessViolationControl;
Characteristic_1.Characteristic.NetworkAccessViolationControl = NetworkAccessViolationControl;
/**
 * Characteristic "Wi-Fi Satellite Status"
 */
var WiFiSatelliteStatus = /** @class */ (function (_super) {
    __extends(WiFiSatelliteStatus, _super);
    function WiFiSatelliteStatus() {
        var _this = _super.call(this, 'Wi-Fi Satellite Status', WiFiSatelliteStatus.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 2,
            minValue: 0,
            validValues: [0, 1, 2],
            perms: ["pr" /* PAIRED_READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of WiFiSatelliteStatus must be one of the following:
    WiFiSatelliteStatus.UNKNOWN = 0;
    WiFiSatelliteStatus.CONNECTED = 1;
    WiFiSatelliteStatus.NOT_CONNECTED = 2;
    WiFiSatelliteStatus.UUID = '0000021E-0000-1000-8000-0026BB765291';
    return WiFiSatelliteStatus;
}(Characteristic_1.Characteristic));
exports.WiFiSatelliteStatus = WiFiSatelliteStatus;
Characteristic_1.Characteristic.WiFiSatelliteStatus = WiFiSatelliteStatus;
/**
 * Characteristic "Wake Configuration"
 */
var WakeConfiguration = /** @class */ (function (_super) {
    __extends(WakeConfiguration, _super);
    function WakeConfiguration() {
        var _this = _super.call(this, 'Wake Configuration', WakeConfiguration.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    WakeConfiguration.UUID = '00000222-0000-1000-8000-0026BB765291';
    return WakeConfiguration;
}(Characteristic_1.Characteristic));
exports.WakeConfiguration = WakeConfiguration;
Characteristic_1.Characteristic.WakeConfiguration = WakeConfiguration;
/**
 * Characteristic "Supported Transfer Transport Configuration"
 */
var SupportedTransferTransportConfiguration = /** @class */ (function (_super) {
    __extends(SupportedTransferTransportConfiguration, _super);
    function SupportedTransferTransportConfiguration() {
        var _this = _super.call(this, 'Supported Transfer Transport Configuration', SupportedTransferTransportConfiguration.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedTransferTransportConfiguration.UUID = '00000202-0000-1000-8000-0026BB765291';
    return SupportedTransferTransportConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedTransferTransportConfiguration = SupportedTransferTransportConfiguration;
Characteristic_1.Characteristic.SupportedTransferTransportConfiguration = SupportedTransferTransportConfiguration;
/**
 * Characteristic "Setup Transfer Transport"
 */
var SetupTransferTransport = /** @class */ (function (_super) {
    __extends(SetupTransferTransport, _super);
    function SetupTransferTransport() {
        var _this = _super.call(this, 'Setup Transfer Transport', SetupTransferTransport.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pw" /* PAIRED_WRITE */, "wr" /* WRITE_RESPONSE */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SetupTransferTransport.UUID = '00000201-0000-1000-8000-0026BB765291';
    return SetupTransferTransport;
}(Characteristic_1.Characteristic));
exports.SetupTransferTransport = SetupTransferTransport;
Characteristic_1.Characteristic.SetupTransferTransport = SetupTransferTransport;
/**
 * Characteristic "Activity Interval"
 */
var ActivityInterval = /** @class */ (function (_super) {
    __extends(ActivityInterval, _super);
    function ActivityInterval() {
        var _this = _super.call(this, "Activity Interval", ActivityInterval.UUID) || this;
        _this.setProps({
            format: "uint32" /* UINT32 */,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* PAIRED_READ */, "ev" /* NOTIFY */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ActivityInterval.UUID = '0000021E-0000-1000-8000-0000023B';
    return ActivityInterval;
}(Characteristic_1.Characteristic));
exports.ActivityInterval = ActivityInterval;
Characteristic_1.Characteristic.ActivityInterval = ActivityInterval;
/**
 * Characteristic "CCA Energy Detect Threshold"
 */
var CCAEnergyDetectThreshold = /** @class */ (function (_super) {
    __extends(CCAEnergyDetectThreshold, _super);
    function CCAEnergyDetectThreshold() {
        var _this = _super.call(this, "CCA Energy Detect Threshold", CCAEnergyDetectThreshold.UUID) || this;
        _this.setProps({
            format: "int" /* INT */,
            perms: ["pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CCAEnergyDetectThreshold.UUID = '0000021E-0000-1000-8000-00000246';
    return CCAEnergyDetectThreshold;
}(Characteristic_1.Characteristic));
exports.CCAEnergyDetectThreshold = CCAEnergyDetectThreshold;
Characteristic_1.Characteristic.CCAEnergyDetectThreshold = CCAEnergyDetectThreshold;
/**
 * Characteristic "CCA Signal Detect Threshold"
 */
var CCASignalDetectThreshold = /** @class */ (function (_super) {
    __extends(CCASignalDetectThreshold, _super);
    function CCASignalDetectThreshold() {
        var _this = _super.call(this, "CCA Signal Detect Threshold", CCASignalDetectThreshold.UUID) || this;
        _this.setProps({
            format: "int" /* INT */,
            perms: ["pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CCASignalDetectThreshold.UUID = '0000021E-0000-1000-8000-00000245';
    return CCASignalDetectThreshold;
}(Characteristic_1.Characteristic));
exports.CCASignalDetectThreshold = CCASignalDetectThreshold;
Characteristic_1.Characteristic.CCASignalDetectThreshold = CCASignalDetectThreshold;
/**
 * Characteristic "Characteristic Value Transition Control"
 */
var CharacteristicValueTransitionControl = /** @class */ (function (_super) {
    __extends(CharacteristicValueTransitionControl, _super);
    function CharacteristicValueTransitionControl() {
        var _this = _super.call(this, "Characteristic Value Transition Control", CharacteristicValueTransitionControl.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* PAIRED_READ */, "pw" /* PAIRED_WRITE */, "ev" /* NOTIFY */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CharacteristicValueTransitionControl.UUID = '0000021E-0000-1000-8000-00000143';
    return CharacteristicValueTransitionControl;
}(Characteristic_1.Characteristic));
exports.CharacteristicValueTransitionControl = CharacteristicValueTransitionControl;
Characteristic_1.Characteristic.CharacteristicValueTransitionControl = CharacteristicValueTransitionControl;
/**
 * Characteristic "Supported Characteristic Value Transition Configuration"
 */
var SupportedCharacteristicValueTransitionConfiguration = /** @class */ (function (_super) {
    __extends(SupportedCharacteristicValueTransitionConfiguration, _super);
    function SupportedCharacteristicValueTransitionConfiguration() {
        var _this = _super.call(this, "Supported Characteristic Value Transition Configuration", SupportedCharacteristicValueTransitionConfiguration.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedCharacteristicValueTransitionConfiguration.UUID = '0000021E-0000-1000-8000-00000144';
    return SupportedCharacteristicValueTransitionConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedCharacteristicValueTransitionConfiguration = SupportedCharacteristicValueTransitionConfiguration;
Characteristic_1.Characteristic.SupportedCharacteristicValueTransitionConfiguration = SupportedCharacteristicValueTransitionConfiguration;
/**
 * Characteristic "Current Transport"
 */
var CurrentTransport = /** @class */ (function (_super) {
    __extends(CurrentTransport, _super);
    function CurrentTransport() {
        var _this = _super.call(this, "Current Transport", CurrentTransport.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentTransport.UUID = '0000021E-0000-1000-8000-0000022B';
    return CurrentTransport;
}(Characteristic_1.Characteristic));
exports.CurrentTransport = CurrentTransport;
Characteristic_1.Characteristic.CurrentTransport = CurrentTransport;
/**
 * Characteristic "Data Stream HAP Transport"
 */
var DataStreamHAPTransport = /** @class */ (function (_super) {
    __extends(DataStreamHAPTransport, _super);
    function DataStreamHAPTransport() {
        var _this = _super.call(this, "Data Stream HAP Transport", DataStreamHAPTransport.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* PAIRED_READ */, "pw" /* PAIRED_WRITE */, "wr" /* WRITE_RESPONSE */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    DataStreamHAPTransport.UUID = '0000021E-0000-1000-8000-00000138';
    return DataStreamHAPTransport;
}(Characteristic_1.Characteristic));
exports.DataStreamHAPTransport = DataStreamHAPTransport;
Characteristic_1.Characteristic.DataStreamHAPTransport = DataStreamHAPTransport;
/**
 * Characteristic "Data Stream HAP Transport Interrupt"
 */
var DataStreamHAPTransportInterrupt = /** @class */ (function (_super) {
    __extends(DataStreamHAPTransportInterrupt, _super);
    function DataStreamHAPTransportInterrupt() {
        var _this = _super.call(this, "Data Stream HAP Transport Interrupt", DataStreamHAPTransportInterrupt.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* PAIRED_READ */, "ev" /* NOTIFY */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    DataStreamHAPTransportInterrupt.UUID = '0000021E-0000-1000-8000-00000139';
    return DataStreamHAPTransportInterrupt;
}(Characteristic_1.Characteristic));
exports.DataStreamHAPTransportInterrupt = DataStreamHAPTransportInterrupt;
Characteristic_1.Characteristic.DataStreamHAPTransportInterrupt = DataStreamHAPTransportInterrupt;
/**
 * Characteristic "Event Retransmission Maximum"
 */
var EventRetransmissionMaximum = /** @class */ (function (_super) {
    __extends(EventRetransmissionMaximum, _super);
    function EventRetransmissionMaximum() {
        var _this = _super.call(this, "Event Retransmission Maximum", EventRetransmissionMaximum.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            perms: ["pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    EventRetransmissionMaximum.UUID = '0000021E-0000-1000-8000-0000023D';
    return EventRetransmissionMaximum;
}(Characteristic_1.Characteristic));
exports.EventRetransmissionMaximum = EventRetransmissionMaximum;
Characteristic_1.Characteristic.EventRetransmissionMaximum = EventRetransmissionMaximum;
/**
 * Characteristic "Event Transmission Counters"
 */
var EventTransmissionCounters = /** @class */ (function (_super) {
    __extends(EventTransmissionCounters, _super);
    function EventTransmissionCounters() {
        var _this = _super.call(this, "Event Transmission Counters", EventTransmissionCounters.UUID) || this;
        _this.setProps({
            format: "uint32" /* UINT32 */,
            perms: ["pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    EventTransmissionCounters.UUID = '0000021E-0000-1000-8000-0000023E';
    return EventTransmissionCounters;
}(Characteristic_1.Characteristic));
exports.EventTransmissionCounters = EventTransmissionCounters;
Characteristic_1.Characteristic.EventTransmissionCounters = EventTransmissionCounters;
/**
 * Characteristic "Heart Beat"
 */
var HeartBeat = /** @class */ (function (_super) {
    __extends(HeartBeat, _super);
    function HeartBeat() {
        var _this = _super.call(this, "Heart Beat", HeartBeat.UUID) || this;
        _this.setProps({
            format: "uint32" /* UINT32 */,
            perms: ["ev" /* NOTIFY */, "pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    HeartBeat.UUID = '0000021E-0000-1000-8000-0000024A';
    return HeartBeat;
}(Characteristic_1.Characteristic));
exports.HeartBeat = HeartBeat;
Characteristic_1.Characteristic.HeartBeat = HeartBeat;
/**
 * Characteristic "MAC Retransmission Maximum"
 */
var MACRetransmissionMaximum = /** @class */ (function (_super) {
    __extends(MACRetransmissionMaximum, _super);
    function MACRetransmissionMaximum() {
        var _this = _super.call(this, "MAC Retransmission Maximum", MACRetransmissionMaximum.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            perms: ["pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    MACRetransmissionMaximum.UUID = '0000021E-0000-1000-8000-00000247';
    return MACRetransmissionMaximum;
}(Characteristic_1.Characteristic));
exports.MACRetransmissionMaximum = MACRetransmissionMaximum;
Characteristic_1.Characteristic.MACRetransmissionMaximum = MACRetransmissionMaximum;
/**
 * Characteristic "MAC Transmission Counters"
 */
var MACTransmissionCounters = /** @class */ (function (_super) {
    __extends(MACTransmissionCounters, _super);
    function MACTransmissionCounters() {
        var _this = _super.call(this, "MAC Transmission Counters", MACTransmissionCounters.UUID) || this;
        _this.setProps({
            format: "data" /* DATA */,
            perms: ["pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    MACTransmissionCounters.UUID = '0000021E-0000-1000-8000-00000248';
    return MACTransmissionCounters;
}(Characteristic_1.Characteristic));
exports.MACTransmissionCounters = MACTransmissionCounters;
Characteristic_1.Characteristic.MACTransmissionCounters = MACTransmissionCounters;
/**
 * Characteristic "Operating State Response"
 */
var OperatingStateResponse = /** @class */ (function (_super) {
    __extends(OperatingStateResponse, _super);
    function OperatingStateResponse() {
        var _this = _super.call(this, "Operating State Response", OperatingStateResponse.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* PAIRED_READ */, "ev" /* NOTIFY */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    OperatingStateResponse.UUID = '0000021E-0000-1000-8000-00000232';
    return OperatingStateResponse;
}(Characteristic_1.Characteristic));
exports.OperatingStateResponse = OperatingStateResponse;
Characteristic_1.Characteristic.OperatingStateResponse = OperatingStateResponse;
/**
 * Characteristic "Ping"
 */
var Ping = /** @class */ (function (_super) {
    __extends(Ping, _super);
    function Ping() {
        var _this = _super.call(this, "Ping", Ping.UUID) || this;
        _this.setProps({
            format: "data" /* DATA */,
            perms: ["pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Ping.UUID = '0000021E-0000-1000-8000-0000023C';
    return Ping;
}(Characteristic_1.Characteristic));
exports.Ping = Ping;
Characteristic_1.Characteristic.Ping = Ping;
/**
 * Characteristic "Receiver Sensitivity"
 */
var ReceiverSensitivity = /** @class */ (function (_super) {
    __extends(ReceiverSensitivity, _super);
    function ReceiverSensitivity() {
        var _this = _super.call(this, "Receiver Sensitivity", ReceiverSensitivity.UUID) || this;
        _this.setProps({
            format: "int" /* INT */,
            perms: ["pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ReceiverSensitivity.UUID = '0000021E-0000-1000-8000-00000244';
    return ReceiverSensitivity;
}(Characteristic_1.Characteristic));
exports.ReceiverSensitivity = ReceiverSensitivity;
Characteristic_1.Characteristic.ReceiverSensitivity = ReceiverSensitivity;
/**
 * Characteristic "Received Signal Strength Indication"
 */
var ReceivedSignalStrengthIndication = /** @class */ (function (_super) {
    __extends(ReceivedSignalStrengthIndication, _super);
    function ReceivedSignalStrengthIndication() {
        var _this = _super.call(this, "Received Signal Strength Indication", ReceivedSignalStrengthIndication.UUID) || this;
        _this.setProps({
            format: "int" /* INT */,
            perms: ["pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ReceivedSignalStrengthIndication.UUID = '0000021E-0000-1000-8000-0000023F';
    return ReceivedSignalStrengthIndication;
}(Characteristic_1.Characteristic));
exports.ReceivedSignalStrengthIndication = ReceivedSignalStrengthIndication;
Characteristic_1.Characteristic.ReceivedSignalStrengthIndication = ReceivedSignalStrengthIndication;
/**
 * Characteristic "Sleep Interval"
 */
var SleepInterval = /** @class */ (function (_super) {
    __extends(SleepInterval, _super);
    function SleepInterval() {
        var _this = _super.call(this, "Sleep Interval", SleepInterval.UUID) || this;
        _this.setProps({
            format: "uint32" /* UINT32 */,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* PAIRED_READ */, "ev" /* NOTIFY */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SleepInterval.UUID = '0000021E-0000-1000-8000-0000023A';
    return SleepInterval;
}(Characteristic_1.Characteristic));
exports.SleepInterval = SleepInterval;
Characteristic_1.Characteristic.SleepInterval = SleepInterval;
/**
 * Characteristic "Signal-to-noise Ration"
 */
var SignalToNoiseRatio = /** @class */ (function (_super) {
    __extends(SignalToNoiseRatio, _super);
    function SignalToNoiseRatio() {
        var _this = _super.call(this, "Signal-to-noise Ration", SignalToNoiseRatio.UUID) || this;
        _this.setProps({
            format: "int" /* INT */,
            perms: ["pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SignalToNoiseRatio.UUID = '0000021E-0000-1000-8000-00000241';
    return SignalToNoiseRatio;
}(Characteristic_1.Characteristic));
exports.SignalToNoiseRatio = SignalToNoiseRatio;
Characteristic_1.Characteristic.SignalToNoiseRatio = SignalToNoiseRatio;
/**
 * Characteristic "Supported Diagnostics Snapshot"
 */
var SupportedDiagnosticsSnapshot = /** @class */ (function (_super) {
    __extends(SupportedDiagnosticsSnapshot, _super);
    function SupportedDiagnosticsSnapshot() {
        var _this = _super.call(this, "Supported Diagnostics Snapshot", SupportedDiagnosticsSnapshot.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedDiagnosticsSnapshot.UUID = '0000021E-0000-1000-8000-00000238';
    return SupportedDiagnosticsSnapshot;
}(Characteristic_1.Characteristic));
exports.SupportedDiagnosticsSnapshot = SupportedDiagnosticsSnapshot;
Characteristic_1.Characteristic.SupportedDiagnosticsSnapshot = SupportedDiagnosticsSnapshot;
/**
 * Characteristic "Transmit Power"
 */
var TransmitPower = /** @class */ (function (_super) {
    __extends(TransmitPower, _super);
    function TransmitPower() {
        var _this = _super.call(this, "Transmit Power", TransmitPower.UUID) || this;
        _this.setProps({
            format: "int" /* INT */,
            perms: ["pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TransmitPower.UUID = '0000021E-0000-1000-8000-00000242';
    return TransmitPower;
}(Characteristic_1.Characteristic));
exports.TransmitPower = TransmitPower;
Characteristic_1.Characteristic.TransmitPower = TransmitPower;
/**
 * Characteristic "Transmit Power Maximum"
 */
var TransmitPowerMaximum = /** @class */ (function (_super) {
    __extends(TransmitPowerMaximum, _super);
    function TransmitPowerMaximum() {
        var _this = _super.call(this, "Transmit Power Maximum", TransmitPowerMaximum.UUID) || this;
        _this.setProps({
            format: "int" /* INT */,
            perms: ["pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TransmitPowerMaximum.UUID = '0000021E-0000-1000-8000-00000243';
    return TransmitPowerMaximum;
}(Characteristic_1.Characteristic));
exports.TransmitPowerMaximum = TransmitPowerMaximum;
Characteristic_1.Characteristic.TransmitPowerMaximum = TransmitPowerMaximum;
/**
 * Characteristic "Video Analysis Active"
 */
var VideoAnalysisActive = /** @class */ (function (_super) {
    __extends(VideoAnalysisActive, _super);
    function VideoAnalysisActive() {
        var _this = _super.call(this, "Video Analysis Active", VideoAnalysisActive.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            perms: ["pr" /* PAIRED_READ */, "pw" /* PAIRED_WRITE */, "ev" /* NOTIFY */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    VideoAnalysisActive.UUID = '0000021E-0000-1000-8000-00000229';
    return VideoAnalysisActive;
}(Characteristic_1.Characteristic));
exports.VideoAnalysisActive = VideoAnalysisActive;
Characteristic_1.Characteristic.VideoAnalysisActive = VideoAnalysisActive;
/**
 * Characteristic "Wi-Fi Capabilities"
 */
var WiFiCapabilities = /** @class */ (function (_super) {
    __extends(WiFiCapabilities, _super);
    function WiFiCapabilities() {
        var _this = _super.call(this, "Wi-Fi Capabilities", WiFiCapabilities.UUID) || this;
        _this.setProps({
            format: "uint32" /* UINT32 */,
            perms: ["pr" /* PAIRED_READ */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    WiFiCapabilities.UUID = '0000021E-0000-1000-8000-0000022C';
    return WiFiCapabilities;
}(Characteristic_1.Characteristic));
exports.WiFiCapabilities = WiFiCapabilities;
Characteristic_1.Characteristic.WiFiCapabilities = WiFiCapabilities;
/**
 * Characteristic "Wi-Fi Configuration Control"
 */
var WiFiConfigurationControl = /** @class */ (function (_super) {
    __extends(WiFiConfigurationControl, _super);
    function WiFiConfigurationControl() {
        var _this = _super.call(this, "Wi-Fi Configuration Control", WiFiConfigurationControl.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* PAIRED_READ */, "pw" /* PAIRED_WRITE */, "ev" /* NOTIFY */, "tw" /* TIMED_WRITE */, "wr" /* WRITE_RESPONSE */],
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    WiFiConfigurationControl.UUID = '0000021E-0000-1000-8000-0000022D';
    return WiFiConfigurationControl;
}(Characteristic_1.Characteristic));
exports.WiFiConfigurationControl = WiFiConfigurationControl;
Characteristic_1.Characteristic.WiFiConfigurationControl = WiFiConfigurationControl;
/**
 * Service "Access Control"
 */
var AccessControl = /** @class */ (function (_super) {
    __extends(AccessControl, _super);
    function AccessControl(displayName, subtype) {
        var _this = _super.call(this, displayName, AccessControl.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.AccessControlLevel);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.PasswordSetting);
        return _this;
    }
    AccessControl.UUID = '000000DA-0000-1000-8000-0026BB765291';
    return AccessControl;
}(Service_1.Service));
exports.AccessControl = AccessControl;
Service_1.Service.AccessControl = AccessControl;
/**
 * Service "Accessory Information"
 */
var AccessoryInformation = /** @class */ (function (_super) {
    __extends(AccessoryInformation, _super);
    function AccessoryInformation(displayName, subtype) {
        var _this = _super.call(this, displayName, AccessoryInformation.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Identify);
        _this.addCharacteristic(Characteristic_1.Characteristic.Manufacturer).updateValue("Default-Manufacturer");
        _this.addCharacteristic(Characteristic_1.Characteristic.Model).updateValue("Default-Model");
        _this.addCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addCharacteristic(Characteristic_1.Characteristic.SerialNumber).updateValue("Default-SerialNumber");
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.AccessoryFlags);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.AppMatchingIdentifier);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ConfiguredName);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.FirmwareRevision);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.HardwareRevision);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SoftwareRevision);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ProductData);
        // Firmware Revision is defined to be a optional characteristics but is actually REQUIRED
        _this.getCharacteristic(Characteristic_1.Characteristic.FirmwareRevision).updateValue("0.0.0");
        return _this;
    }
    AccessoryInformation.UUID = '0000003E-0000-1000-8000-0026BB765291';
    return AccessoryInformation;
}(Service_1.Service));
exports.AccessoryInformation = AccessoryInformation;
Service_1.Service.AccessoryInformation = AccessoryInformation;
/**
 * Service "Air Purifier"
 */
var AirPurifier = /** @class */ (function (_super) {
    __extends(AirPurifier, _super);
    function AirPurifier(displayName, subtype) {
        var _this = _super.call(this, displayName, AirPurifier.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentAirPurifierState);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetAirPurifierState);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.LockPhysicalControls);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SwingMode);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RotationSpeed);
        return _this;
    }
    AirPurifier.UUID = '000000BB-0000-1000-8000-0026BB765291';
    return AirPurifier;
}(Service_1.Service));
exports.AirPurifier = AirPurifier;
Service_1.Service.AirPurifier = AirPurifier;
/**
 * Service "Air Quality Sensor"
 */
var AirQualitySensor = /** @class */ (function (_super) {
    __extends(AirQualitySensor, _super);
    function AirQualitySensor(displayName, subtype) {
        var _this = _super.call(this, displayName, AirQualitySensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.AirQuality);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.OzoneDensity);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.NitrogenDioxideDensity);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SulphurDioxideDensity);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.PM2_5Density);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.PM10Density);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.VOCDensity);
        return _this;
    }
    AirQualitySensor.UUID = '0000008D-0000-1000-8000-0026BB765291';
    return AirQualitySensor;
}(Service_1.Service));
exports.AirQualitySensor = AirQualitySensor;
Service_1.Service.AirQualitySensor = AirQualitySensor;
/**
 * Service "Battery Service"
 */
var BatteryService = /** @class */ (function (_super) {
    __extends(BatteryService, _super);
    function BatteryService(displayName, subtype) {
        var _this = _super.call(this, displayName, BatteryService.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.BatteryLevel); // this is actually optional since iOS 14
        _this.addCharacteristic(Characteristic_1.Characteristic.ChargingState); // this is actually optional since iOS 14
        _this.addCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    BatteryService.UUID = '00000096-0000-1000-8000-0026BB765291';
    return BatteryService;
}(Service_1.Service));
exports.BatteryService = BatteryService;
Service_1.Service.BatteryService = BatteryService;
/**
 * Service "Camera RTP Stream Management"
 */
var CameraRTPStreamManagement = /** @class */ (function (_super) {
    __extends(CameraRTPStreamManagement, _super);
    function CameraRTPStreamManagement(displayName, subtype) {
        var _this = _super.call(this, displayName, CameraRTPStreamManagement.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedVideoStreamConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedAudioStreamConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedRTPConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.SelectedRTPStreamConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.StreamingStatus);
        _this.addCharacteristic(Characteristic_1.Characteristic.SetupEndpoints);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Active);
        return _this;
    }
    CameraRTPStreamManagement.UUID = '00000110-0000-1000-8000-0026BB765291';
    return CameraRTPStreamManagement;
}(Service_1.Service));
exports.CameraRTPStreamManagement = CameraRTPStreamManagement;
Service_1.Service.CameraRTPStreamManagement = CameraRTPStreamManagement;
/**
 * Service "Carbon Dioxide Sensor"
 */
var CarbonDioxideSensor = /** @class */ (function (_super) {
    __extends(CarbonDioxideSensor, _super);
    function CarbonDioxideSensor(displayName, subtype) {
        var _this = _super.call(this, displayName, CarbonDioxideSensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CarbonDioxideDetected);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CarbonDioxideLevel);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CarbonDioxidePeakLevel);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    CarbonDioxideSensor.UUID = '00000097-0000-1000-8000-0026BB765291';
    return CarbonDioxideSensor;
}(Service_1.Service));
exports.CarbonDioxideSensor = CarbonDioxideSensor;
Service_1.Service.CarbonDioxideSensor = CarbonDioxideSensor;
/**
 * Service "Carbon Monoxide Sensor"
 */
var CarbonMonoxideSensor = /** @class */ (function (_super) {
    __extends(CarbonMonoxideSensor, _super);
    function CarbonMonoxideSensor(displayName, subtype) {
        var _this = _super.call(this, displayName, CarbonMonoxideSensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CarbonMonoxideDetected);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CarbonMonoxideLevel);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CarbonMonoxidePeakLevel);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    CarbonMonoxideSensor.UUID = '0000007F-0000-1000-8000-0026BB765291';
    return CarbonMonoxideSensor;
}(Service_1.Service));
exports.CarbonMonoxideSensor = CarbonMonoxideSensor;
Service_1.Service.CarbonMonoxideSensor = CarbonMonoxideSensor;
/**
 * Service "Contact Sensor"
 */
var ContactSensor = /** @class */ (function (_super) {
    __extends(ContactSensor, _super);
    function ContactSensor(displayName, subtype) {
        var _this = _super.call(this, displayName, ContactSensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ContactSensorState);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    ContactSensor.UUID = '00000080-0000-1000-8000-0026BB765291';
    return ContactSensor;
}(Service_1.Service));
exports.ContactSensor = ContactSensor;
Service_1.Service.ContactSensor = ContactSensor;
/**
 * Service "Door"
 */
var Door = /** @class */ (function (_super) {
    __extends(Door, _super);
    function Door(displayName, subtype) {
        var _this = _super.call(this, displayName, Door.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentPosition);
        _this.addCharacteristic(Characteristic_1.Characteristic.PositionState);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetPosition);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.HoldPosition);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ObstructionDetected);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    Door.UUID = '00000081-0000-1000-8000-0026BB765291';
    return Door;
}(Service_1.Service));
exports.Door = Door;
Service_1.Service.Door = Door;
/**
 * Service "Doorbell"
 */
var Doorbell = /** @class */ (function (_super) {
    __extends(Doorbell, _super);
    function Doorbell(displayName, subtype) {
        var _this = _super.call(this, displayName, Doorbell.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ProgrammableSwitchEvent);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Brightness);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Mute);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.OperatingStateResponse);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Volume);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    Doorbell.UUID = '00000121-0000-1000-8000-0026BB765291';
    return Doorbell;
}(Service_1.Service));
exports.Doorbell = Doorbell;
Service_1.Service.Doorbell = Doorbell;
/**
 * Service "Fan"
 */
var Fan = /** @class */ (function (_super) {
    __extends(Fan, _super);
    function Fan(displayName, subtype) {
        var _this = _super.call(this, displayName, Fan.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.On);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RotationDirection);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RotationSpeed);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    Fan.UUID = '00000040-0000-1000-8000-0026BB765291';
    return Fan;
}(Service_1.Service));
exports.Fan = Fan;
Service_1.Service.Fan = Fan;
/**
 * Service "Fan v2"
 */
var Fanv2 = /** @class */ (function (_super) {
    __extends(Fanv2, _super);
    function Fanv2(displayName, subtype) {
        var _this = _super.call(this, displayName, Fanv2.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CurrentFanState);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TargetFanState);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.LockPhysicalControls);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RotationDirection);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RotationSpeed);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SwingMode);
        return _this;
    }
    Fanv2.UUID = '000000B7-0000-1000-8000-0026BB765291';
    return Fanv2;
}(Service_1.Service));
exports.Fanv2 = Fanv2;
Service_1.Service.Fanv2 = Fanv2;
/**
 * Service "Filter Maintenance"
 */
var FilterMaintenance = /** @class */ (function (_super) {
    __extends(FilterMaintenance, _super);
    function FilterMaintenance(displayName, subtype) {
        var _this = _super.call(this, displayName, FilterMaintenance.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.FilterChangeIndication);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.FilterLifeLevel);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ResetFilterIndication);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    FilterMaintenance.UUID = '000000BA-0000-1000-8000-0026BB765291';
    return FilterMaintenance;
}(Service_1.Service));
exports.FilterMaintenance = FilterMaintenance;
Service_1.Service.FilterMaintenance = FilterMaintenance;
/**
 * Service "Faucet"
 */
var Faucet = /** @class */ (function (_super) {
    __extends(Faucet, _super);
    function Faucet(displayName, subtype) {
        var _this = _super.call(this, displayName, Faucet.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        return _this;
    }
    Faucet.UUID = '000000D7-0000-1000-8000-0026BB765291';
    return Faucet;
}(Service_1.Service));
exports.Faucet = Faucet;
Service_1.Service.Faucet = Faucet;
/**
 * Service "Garage Door Opener"
 */
var GarageDoorOpener = /** @class */ (function (_super) {
    __extends(GarageDoorOpener, _super);
    function GarageDoorOpener(displayName, subtype) {
        var _this = _super.call(this, displayName, GarageDoorOpener.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentDoorState);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetDoorState);
        _this.addCharacteristic(Characteristic_1.Characteristic.ObstructionDetected);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.LockCurrentState);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.LockTargetState);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    GarageDoorOpener.UUID = '00000041-0000-1000-8000-0026BB765291';
    return GarageDoorOpener;
}(Service_1.Service));
exports.GarageDoorOpener = GarageDoorOpener;
Service_1.Service.GarageDoorOpener = GarageDoorOpener;
/**
 * Service "Heater Cooler"
 */
var HeaterCooler = /** @class */ (function (_super) {
    __extends(HeaterCooler, _super);
    function HeaterCooler(displayName, subtype) {
        var _this = _super.call(this, displayName, HeaterCooler.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentHeaterCoolerState);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetHeaterCoolerState);
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentTemperature);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.LockPhysicalControls);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SwingMode);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CoolingThresholdTemperature);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.HeatingThresholdTemperature);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TemperatureDisplayUnits);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RotationSpeed);
        return _this;
    }
    HeaterCooler.UUID = '000000BC-0000-1000-8000-0026BB765291';
    return HeaterCooler;
}(Service_1.Service));
exports.HeaterCooler = HeaterCooler;
Service_1.Service.HeaterCooler = HeaterCooler;
/**
 * Service "Humidifier Dehumidifier"
 */
var HumidifierDehumidifier = /** @class */ (function (_super) {
    __extends(HumidifierDehumidifier, _super);
    function HumidifierDehumidifier(displayName, subtype) {
        var _this = _super.call(this, displayName, HumidifierDehumidifier.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentRelativeHumidity);
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentHumidifierDehumidifierState);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetHumidifierDehumidifierState);
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.LockPhysicalControls);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SwingMode);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.WaterLevel);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RelativeHumidityDehumidifierThreshold);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RelativeHumidityHumidifierThreshold);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RotationSpeed);
        return _this;
    }
    HumidifierDehumidifier.UUID = '000000BD-0000-1000-8000-0026BB765291';
    return HumidifierDehumidifier;
}(Service_1.Service));
exports.HumidifierDehumidifier = HumidifierDehumidifier;
Service_1.Service.HumidifierDehumidifier = HumidifierDehumidifier;
/**
 * Service "Humidity Sensor"
 */
var HumiditySensor = /** @class */ (function (_super) {
    __extends(HumiditySensor, _super);
    function HumiditySensor(displayName, subtype) {
        var _this = _super.call(this, displayName, HumiditySensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentRelativeHumidity);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    HumiditySensor.UUID = '00000082-0000-1000-8000-0026BB765291';
    return HumiditySensor;
}(Service_1.Service));
exports.HumiditySensor = HumiditySensor;
Service_1.Service.HumiditySensor = HumiditySensor;
/**
 * Service "Irrigation System"
 */
var IrrigationSystem = /** @class */ (function (_super) {
    __extends(IrrigationSystem, _super);
    function IrrigationSystem(displayName, subtype) {
        var _this = _super.call(this, displayName, IrrigationSystem.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addCharacteristic(Characteristic_1.Characteristic.ProgramMode);
        _this.addCharacteristic(Characteristic_1.Characteristic.InUse);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RemainingDuration);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        return _this;
    }
    IrrigationSystem.UUID = '000000CF-0000-1000-8000-0026BB765291';
    return IrrigationSystem;
}(Service_1.Service));
exports.IrrigationSystem = IrrigationSystem;
Service_1.Service.IrrigationSystem = IrrigationSystem;
/**
 * Service "Leak Sensor"
 */
var LeakSensor = /** @class */ (function (_super) {
    __extends(LeakSensor, _super);
    function LeakSensor(displayName, subtype) {
        var _this = _super.call(this, displayName, LeakSensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.LeakDetected);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    LeakSensor.UUID = '00000083-0000-1000-8000-0026BB765291';
    return LeakSensor;
}(Service_1.Service));
exports.LeakSensor = LeakSensor;
Service_1.Service.LeakSensor = LeakSensor;
/**
 * Service "Light Sensor"
 */
var LightSensor = /** @class */ (function (_super) {
    __extends(LightSensor, _super);
    function LightSensor(displayName, subtype) {
        var _this = _super.call(this, displayName, LightSensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentAmbientLightLevel);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    LightSensor.UUID = '00000084-0000-1000-8000-0026BB765291';
    return LightSensor;
}(Service_1.Service));
exports.LightSensor = LightSensor;
Service_1.Service.LightSensor = LightSensor;
/**
 * Service "Lightbulb"
 */
var Lightbulb = /** @class */ (function (_super) {
    __extends(Lightbulb, _super);
    function Lightbulb(displayName, subtype) {
        var _this = _super.call(this, displayName, Lightbulb.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.On);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Brightness);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Hue);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Saturation);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ColorTemperature);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CharacteristicValueTransitionControl); // Ambient Lightning
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SupportedCharacteristicValueTransitionConfiguration); // Ambient Lightning
        return _this;
    }
    Lightbulb.UUID = '00000043-0000-1000-8000-0026BB765291';
    return Lightbulb;
}(Service_1.Service));
exports.Lightbulb = Lightbulb;
Service_1.Service.Lightbulb = Lightbulb;
/**
 * Service "Lock Management"
 */
var LockManagement = /** @class */ (function (_super) {
    __extends(LockManagement, _super);
    function LockManagement(displayName, subtype) {
        var _this = _super.call(this, displayName, LockManagement.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.LockControlPoint);
        _this.addCharacteristic(Characteristic_1.Characteristic.Version);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Logs);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.AudioFeedback);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.LockManagementAutoSecurityTimeout);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.AdministratorOnlyAccess);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.LockLastKnownAction);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CurrentDoorState);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.MotionDetected);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    LockManagement.UUID = '00000044-0000-1000-8000-0026BB765291';
    return LockManagement;
}(Service_1.Service));
exports.LockManagement = LockManagement;
Service_1.Service.LockManagement = LockManagement;
/**
 * Service "Lock Mechanism"
 */
var LockMechanism = /** @class */ (function (_super) {
    __extends(LockMechanism, _super);
    function LockMechanism(displayName, subtype) {
        var _this = _super.call(this, displayName, LockMechanism.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.LockCurrentState);
        _this.addCharacteristic(Characteristic_1.Characteristic.LockTargetState);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    LockMechanism.UUID = '00000045-0000-1000-8000-0026BB765291';
    return LockMechanism;
}(Service_1.Service));
exports.LockMechanism = LockMechanism;
Service_1.Service.LockMechanism = LockMechanism;
/**
 * Service "Microphone"
 */
var Microphone = /** @class */ (function (_super) {
    __extends(Microphone, _super);
    function Microphone(displayName, subtype) {
        var _this = _super.call(this, displayName, Microphone.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Mute);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Volume);
        return _this;
    }
    Microphone.UUID = '00000112-0000-1000-8000-0026BB765291';
    return Microphone;
}(Service_1.Service));
exports.Microphone = Microphone;
Service_1.Service.Microphone = Microphone;
/**
 * Service "Motion Sensor"
 */
var MotionSensor = /** @class */ (function (_super) {
    __extends(MotionSensor, _super);
    function MotionSensor(displayName, subtype) {
        var _this = _super.call(this, displayName, MotionSensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.MotionDetected);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    MotionSensor.UUID = '00000085-0000-1000-8000-0026BB765291';
    return MotionSensor;
}(Service_1.Service));
exports.MotionSensor = MotionSensor;
Service_1.Service.MotionSensor = MotionSensor;
/**
 * Service "Occupancy Sensor"
 */
var OccupancySensor = /** @class */ (function (_super) {
    __extends(OccupancySensor, _super);
    function OccupancySensor(displayName, subtype) {
        var _this = _super.call(this, displayName, OccupancySensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.OccupancyDetected);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    OccupancySensor.UUID = '00000086-0000-1000-8000-0026BB765291';
    return OccupancySensor;
}(Service_1.Service));
exports.OccupancySensor = OccupancySensor;
Service_1.Service.OccupancySensor = OccupancySensor;
/**
 * Service "Outlet"
 */
var Outlet = /** @class */ (function (_super) {
    __extends(Outlet, _super);
    function Outlet(displayName, subtype) {
        var _this = _super.call(this, displayName, Outlet.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.On);
        _this.addCharacteristic(Characteristic_1.Characteristic.OutletInUse);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    Outlet.UUID = '00000047-0000-1000-8000-0026BB765291';
    return Outlet;
}(Service_1.Service));
exports.Outlet = Outlet;
Service_1.Service.Outlet = Outlet;
/**
 * Service "Security System"
 */
var SecuritySystem = /** @class */ (function (_super) {
    __extends(SecuritySystem, _super);
    function SecuritySystem(displayName, subtype) {
        var _this = _super.call(this, displayName, SecuritySystem.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.SecuritySystemCurrentState);
        _this.addCharacteristic(Characteristic_1.Characteristic.SecuritySystemTargetState);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SecuritySystemAlarmType);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    SecuritySystem.UUID = '0000007E-0000-1000-8000-0026BB765291';
    return SecuritySystem;
}(Service_1.Service));
exports.SecuritySystem = SecuritySystem;
Service_1.Service.SecuritySystem = SecuritySystem;
/**
 * Service "Service Label"
 */
var ServiceLabel = /** @class */ (function (_super) {
    __extends(ServiceLabel, _super);
    function ServiceLabel(displayName, subtype) {
        var _this = _super.call(this, displayName, ServiceLabel.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ServiceLabelNamespace);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    ServiceLabel.UUID = '000000CC-0000-1000-8000-0026BB765291';
    return ServiceLabel;
}(Service_1.Service));
exports.ServiceLabel = ServiceLabel;
Service_1.Service.ServiceLabel = ServiceLabel;
/**
 * Service "Slat"
 */
var Slat = /** @class */ (function (_super) {
    __extends(Slat, _super);
    function Slat(displayName, subtype) {
        var _this = _super.call(this, displayName, Slat.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.SlatType);
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentSlatState);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CurrentTiltAngle);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TargetTiltAngle);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SwingMode);
        return _this;
    }
    Slat.UUID = '000000B9-0000-1000-8000-0026BB765291';
    return Slat;
}(Service_1.Service));
exports.Slat = Slat;
Service_1.Service.Slat = Slat;
/**
 * Service "Smoke Sensor"
 */
var SmokeSensor = /** @class */ (function (_super) {
    __extends(SmokeSensor, _super);
    function SmokeSensor(displayName, subtype) {
        var _this = _super.call(this, displayName, SmokeSensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.SmokeDetected);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    SmokeSensor.UUID = '00000087-0000-1000-8000-0026BB765291';
    return SmokeSensor;
}(Service_1.Service));
exports.SmokeSensor = SmokeSensor;
Service_1.Service.SmokeSensor = SmokeSensor;
/**
 * Service "Smart Speaker"
 */
var SmartSpeaker = /** @class */ (function (_super) {
    __extends(SmartSpeaker, _super);
    function SmartSpeaker(displayName, subtype) {
        var _this = _super.call(this, displayName, SmartSpeaker.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentMediaState);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetMediaState);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ConfiguredName);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Volume);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Mute);
        return _this;
    }
    SmartSpeaker.UUID = '00000228-0000-1000-8000-0026BB765291';
    return SmartSpeaker;
}(Service_1.Service));
exports.SmartSpeaker = SmartSpeaker;
Service_1.Service.SmartSpeaker = SmartSpeaker;
/**
 * Service "Speaker"
 *
 * {@see TelevisionSpeaker} for the same Service defined with {@link VolumeControlType},
 * {@link VolumeSelector} and {@link Active} characteristics.
 */
var Speaker = /** @class */ (function (_super) {
    __extends(Speaker, _super);
    function Speaker(displayName, subtype) {
        var _this = _super.call(this, displayName, Speaker.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Mute);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Volume);
        return _this;
    }
    Speaker.UUID = '00000113-0000-1000-8000-0026BB765291';
    return Speaker;
}(Service_1.Service));
exports.Speaker = Speaker;
Service_1.Service.Speaker = Speaker;
/**
 * Service "Stateless Programmable Switch"
 */
var StatelessProgrammableSwitch = /** @class */ (function (_super) {
    __extends(StatelessProgrammableSwitch, _super);
    function StatelessProgrammableSwitch(displayName, subtype) {
        var _this = _super.call(this, displayName, StatelessProgrammableSwitch.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ProgrammableSwitchEvent);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ServiceLabelIndex);
        return _this;
    }
    StatelessProgrammableSwitch.UUID = '00000089-0000-1000-8000-0026BB765291';
    return StatelessProgrammableSwitch;
}(Service_1.Service));
exports.StatelessProgrammableSwitch = StatelessProgrammableSwitch;
Service_1.Service.StatelessProgrammableSwitch = StatelessProgrammableSwitch;
/**
 * Service "Switch"
 */
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch(displayName, subtype) {
        var _this = _super.call(this, displayName, Switch.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.On);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    Switch.UUID = '00000049-0000-1000-8000-0026BB765291';
    return Switch;
}(Service_1.Service));
exports.Switch = Switch;
Service_1.Service.Switch = Switch;
/**
 * Service "Temperature Sensor"
 */
var TemperatureSensor = /** @class */ (function (_super) {
    __extends(TemperatureSensor, _super);
    function TemperatureSensor(displayName, subtype) {
        var _this = _super.call(this, displayName, TemperatureSensor.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentTemperature);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusLowBattery);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusTampered);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    TemperatureSensor.UUID = '0000008A-0000-1000-8000-0026BB765291';
    return TemperatureSensor;
}(Service_1.Service));
exports.TemperatureSensor = TemperatureSensor;
Service_1.Service.TemperatureSensor = TemperatureSensor;
/**
 * Service "Thermostat"
 */
var Thermostat = /** @class */ (function (_super) {
    __extends(Thermostat, _super);
    function Thermostat(displayName, subtype) {
        var _this = _super.call(this, displayName, Thermostat.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentHeatingCoolingState);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetHeatingCoolingState);
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentTemperature);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetTemperature);
        _this.addCharacteristic(Characteristic_1.Characteristic.TemperatureDisplayUnits);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CurrentRelativeHumidity);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TargetRelativeHumidity);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CoolingThresholdTemperature);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.HeatingThresholdTemperature);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    Thermostat.UUID = '0000004A-0000-1000-8000-0026BB765291';
    return Thermostat;
}(Service_1.Service));
exports.Thermostat = Thermostat;
Service_1.Service.Thermostat = Thermostat;
/**
 * Service "Valve"
 */
var Valve = /** @class */ (function (_super) {
    __extends(Valve, _super);
    function Valve(displayName, subtype) {
        var _this = _super.call(this, displayName, Valve.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addCharacteristic(Characteristic_1.Characteristic.InUse);
        _this.addCharacteristic(Characteristic_1.Characteristic.ValveType);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SetDuration);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RemainingDuration);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.IsConfigured);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ServiceLabelIndex);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.StatusFault);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    Valve.UUID = '000000D0-0000-1000-8000-0026BB765291';
    return Valve;
}(Service_1.Service));
exports.Valve = Valve;
Service_1.Service.Valve = Valve;
/**
 * Service "Window"
 */
var Window = /** @class */ (function (_super) {
    __extends(Window, _super);
    function Window(displayName, subtype) {
        var _this = _super.call(this, displayName, Window.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentPosition);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetPosition);
        _this.addCharacteristic(Characteristic_1.Characteristic.PositionState);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.HoldPosition);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ObstructionDetected);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    Window.UUID = '0000008B-0000-1000-8000-0026BB765291';
    return Window;
}(Service_1.Service));
exports.Window = Window;
Service_1.Service.Window = Window;
/**
 * Service "Window Covering"
 */
var WindowCovering = /** @class */ (function (_super) {
    __extends(WindowCovering, _super);
    function WindowCovering(displayName, subtype) {
        var _this = _super.call(this, displayName, WindowCovering.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentPosition);
        _this.addCharacteristic(Characteristic_1.Characteristic.TargetPosition);
        _this.addCharacteristic(Characteristic_1.Characteristic.PositionState);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.HoldPosition);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TargetHorizontalTiltAngle);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TargetVerticalTiltAngle);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CurrentHorizontalTiltAngle);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CurrentVerticalTiltAngle);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ObstructionDetected);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    WindowCovering.UUID = '0000008C-0000-1000-8000-0026BB765291';
    return WindowCovering;
}(Service_1.Service));
exports.WindowCovering = WindowCovering;
Service_1.Service.WindowCovering = WindowCovering;
/**
 * Service "Camera Operating Mode"
 */
var CameraOperatingMode = /** @class */ (function (_super) {
    __extends(CameraOperatingMode, _super);
    function CameraOperatingMode(displayName, subtype) {
        var _this = _super.call(this, displayName, CameraOperatingMode.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.EventSnapshotsActive);
        _this.addCharacteristic(Characteristic_1.Characteristic.HomeKitCameraActive);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ManuallyDisabled);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.NightVision);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ThirdPartyCameraActive);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CameraOperatingModeIndicator);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.PeriodicSnapshotsActive);
        return _this;
    }
    CameraOperatingMode.UUID = '0000021A-0000-1000-8000-0026BB765291';
    return CameraOperatingMode;
}(Service_1.Service));
exports.CameraOperatingMode = CameraOperatingMode;
Service_1.Service.CameraOperatingMode = CameraOperatingMode;
/**
 * Service "Camera Event Recording Management"
 */
var CameraEventRecordingManagement = /** @class */ (function (_super) {
    __extends(CameraEventRecordingManagement, _super);
    function CameraEventRecordingManagement(displayName, subtype) {
        var _this = _super.call(this, displayName, CameraEventRecordingManagement.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Active);
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedCameraRecordingConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedVideoRecordingConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedAudioRecordingConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.SelectedCameraRecordingConfiguration);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.RecordingAudioActive);
        return _this;
    }
    CameraEventRecordingManagement.UUID = '00000204-0000-1000-8000-0026BB765291';
    return CameraEventRecordingManagement;
}(Service_1.Service));
exports.CameraEventRecordingManagement = CameraEventRecordingManagement;
Service_1.Service.CameraEventRecordingManagement = CameraEventRecordingManagement;
/**
 * Service "Wi-Fi Router"
 */
var WiFiRouter = /** @class */ (function (_super) {
    __extends(WiFiRouter, _super);
    function WiFiRouter(displayName, subtype) {
        var _this = _super.call(this, displayName, WiFiRouter.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ConfiguredName);
        _this.addCharacteristic(Characteristic_1.Characteristic.ManagedNetworkEnable);
        _this.addCharacteristic(Characteristic_1.Characteristic.NetworkAccessViolationControl);
        _this.addCharacteristic(Characteristic_1.Characteristic.NetworkClientProfileControl);
        _this.addCharacteristic(Characteristic_1.Characteristic.NetworkClientStatusControl);
        _this.addCharacteristic(Characteristic_1.Characteristic.RouterStatus);
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedRouterConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.WANConfigurationList);
        _this.addCharacteristic(Characteristic_1.Characteristic.WANStatusList);
        return _this;
    }
    WiFiRouter.UUID = '0000020A-0000-1000-8000-0026BB765291';
    return WiFiRouter;
}(Service_1.Service));
exports.WiFiRouter = WiFiRouter;
Service_1.Service.WiFiRouter = WiFiRouter;
/**
 * Service "Wi-Fi Satellite"
 */
var WiFiSatellite = /** @class */ (function (_super) {
    __extends(WiFiSatellite, _super);
    function WiFiSatellite(displayName, subtype) {
        var _this = _super.call(this, displayName, WiFiSatellite.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.WiFiSatelliteStatus);
        return _this;
    }
    WiFiSatellite.UUID = '0000020F-0000-1000-8000-0026BB765291';
    return WiFiSatellite;
}(Service_1.Service));
exports.WiFiSatellite = WiFiSatellite;
Service_1.Service.WiFiSatellite = WiFiSatellite;
/**
 * Service "Power Management"
 */
var PowerManagement = /** @class */ (function (_super) {
    __extends(PowerManagement, _super);
    function PowerManagement(displayName, subtype) {
        var _this = _super.call(this, displayName, PowerManagement.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.WakeConfiguration);
        return _this;
    }
    PowerManagement.UUID = '00000221-0000-1000-8000-0026BB765291';
    return PowerManagement;
}(Service_1.Service));
exports.PowerManagement = PowerManagement;
Service_1.Service.PowerManagement = PowerManagement;
/**
 * Service "Transfer Transport Management"
 */
var TransferTransportManagement = /** @class */ (function (_super) {
    __extends(TransferTransportManagement, _super);
    function TransferTransportManagement(displayName, subtype) {
        var _this = _super.call(this, displayName, TransferTransportManagement.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedTransferTransportConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.SetupTransferTransport);
        return _this;
    }
    TransferTransportManagement.UUID = '00000203-0000-1000-8000-0026BB765291';
    return TransferTransportManagement;
}(Service_1.Service));
exports.TransferTransportManagement = TransferTransportManagement;
Service_1.Service.TransferTransportManagement = TransferTransportManagement;
/**
 * Service "Accessory Runtime Information"
 */
var AccessoryRuntimeInformation = /** @class */ (function (_super) {
    __extends(AccessoryRuntimeInformation, _super);
    function AccessoryRuntimeInformation(displayName, subtype) {
        var _this = _super.call(this, displayName, AccessoryRuntimeInformation.UUID, subtype) || this;
        // Require Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Ping);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ActivityInterval);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.HeartBeat);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.SleepInterval);
        return _this;
    }
    AccessoryRuntimeInformation.UUID = '00000203-0000-1000-8000-00000239';
    return AccessoryRuntimeInformation;
}(Service_1.Service));
exports.AccessoryRuntimeInformation = AccessoryRuntimeInformation;
Service_1.Service.AccessoryRuntimeInformation = AccessoryRuntimeInformation;
/**
 * Service "Diagnostics"
 */
var Diagnostics = /** @class */ (function (_super) {
    __extends(Diagnostics, _super);
    function Diagnostics(displayName, subtype) {
        var _this = _super.call(this, displayName, Diagnostics.UUID, subtype) || this;
        // Require Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedDiagnosticsSnapshot);
        return _this;
    }
    Diagnostics.UUID = '00000203-0000-1000-8000-00000237';
    return Diagnostics;
}(Service_1.Service));
exports.Diagnostics = Diagnostics;
Service_1.Service.Diagnostics = Diagnostics;
/**
 * Service "Wi-Fi Transport"
 */
var WiFiTransport = /** @class */ (function (_super) {
    __extends(WiFiTransport, _super);
    function WiFiTransport(displayName, subtype) {
        var _this = _super.call(this, displayName, WiFiTransport.UUID, subtype) || this;
        // Require Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentTransport);
        _this.addCharacteristic(Characteristic_1.Characteristic.WiFiCapabilities);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.WiFiConfigurationControl);
        return _this;
    }
    WiFiTransport.UUID = '00000203-0000-1000-8000-0000022A';
    return WiFiTransport;
}(Service_1.Service));
exports.WiFiTransport = WiFiTransport;
Service_1.Service.WiFiTransport = WiFiTransport;
//# sourceMappingURL=HomeKit.js.map