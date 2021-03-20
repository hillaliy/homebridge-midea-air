import { Characteristic } from '../Characteristic';
import { Service } from '../Service';
/**
 * Characteristic "Access Control Level"
 */
export declare class AccessControlLevel extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Accessory Flags"
 */
export declare class AccessoryFlags extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Product Data"
 */
export declare class ProductData extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Active"
 */
export declare class Active extends Characteristic {
    static readonly INACTIVE = 0;
    static readonly ACTIVE = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Administrator Only Access"
 */
export declare class AdministratorOnlyAccess extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Air Particulate Density"
 */
export declare class AirParticulateDensity extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Air Particulate Size"
 */
export declare class AirParticulateSize extends Characteristic {
    static readonly _2_5_M = 0;
    static readonly _10_M = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Air Quality"
 */
export declare class AirQuality extends Characteristic {
    static readonly UNKNOWN = 0;
    static readonly EXCELLENT = 1;
    static readonly GOOD = 2;
    static readonly FAIR = 3;
    static readonly INFERIOR = 4;
    static readonly POOR = 5;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Audio Feedback"
 */
export declare class AudioFeedback extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Battery Level"
 */
export declare class BatteryLevel extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Brightness"
 */
export declare class Brightness extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Carbon Dioxide Detected"
 */
export declare class CarbonDioxideDetected extends Characteristic {
    static readonly CO2_LEVELS_NORMAL = 0;
    static readonly CO2_LEVELS_ABNORMAL = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Carbon Dioxide Level"
 */
export declare class CarbonDioxideLevel extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Carbon Dioxide Peak Level"
 */
export declare class CarbonDioxidePeakLevel extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Carbon Monoxide Detected"
 */
export declare class CarbonMonoxideDetected extends Characteristic {
    static readonly CO_LEVELS_NORMAL = 0;
    static readonly CO_LEVELS_ABNORMAL = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Carbon Monoxide Level"
 */
export declare class CarbonMonoxideLevel extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Carbon Monoxide Peak Level"
 */
export declare class CarbonMonoxidePeakLevel extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Charging State"
 */
export declare class ChargingState extends Characteristic {
    static readonly NOT_CHARGING = 0;
    static readonly CHARGING = 1;
    static readonly NOT_CHARGEABLE = 2;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Color Temperature"
 */
export declare class ColorTemperature extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Contact Sensor State"
 */
export declare class ContactSensorState extends Characteristic {
    static readonly CONTACT_DETECTED = 0;
    static readonly CONTACT_NOT_DETECTED = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Cooling Threshold Temperature"
 */
export declare class CoolingThresholdTemperature extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Air Purifier State"
 */
export declare class CurrentAirPurifierState extends Characteristic {
    static readonly INACTIVE = 0;
    static readonly IDLE = 1;
    static readonly PURIFYING_AIR = 2;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Ambient Light Level"
 */
export declare class CurrentAmbientLightLevel extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Door State"
 */
export declare class CurrentDoorState extends Characteristic {
    static readonly OPEN = 0;
    static readonly CLOSED = 1;
    static readonly OPENING = 2;
    static readonly CLOSING = 3;
    static readonly STOPPED = 4;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Fan State"
 */
export declare class CurrentFanState extends Characteristic {
    static readonly INACTIVE = 0;
    static readonly IDLE = 1;
    static readonly BLOWING_AIR = 2;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Heater Cooler State"
 */
export declare class CurrentHeaterCoolerState extends Characteristic {
    static readonly INACTIVE = 0;
    static readonly IDLE = 1;
    static readonly HEATING = 2;
    static readonly COOLING = 3;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Heating Cooling State"
 */
export declare class CurrentHeatingCoolingState extends Characteristic {
    static readonly OFF = 0;
    static readonly HEAT = 1;
    static readonly COOL = 2;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Horizontal Tilt Angle"
 */
export declare class CurrentHorizontalTiltAngle extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Humidifier Dehumidifier State"
 */
export declare class CurrentHumidifierDehumidifierState extends Characteristic {
    static readonly INACTIVE = 0;
    static readonly IDLE = 1;
    static readonly HUMIDIFYING = 2;
    static readonly DEHUMIDIFYING = 3;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Position"
 */
export declare class CurrentPosition extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Relative Humidity"
 */
export declare class CurrentRelativeHumidity extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Slat State"
 */
export declare class CurrentSlatState extends Characteristic {
    static readonly FIXED = 0;
    static readonly JAMMED = 1;
    static readonly SWINGING = 2;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Temperature"
 */
export declare class CurrentTemperature extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Tilt Angle"
 */
export declare class CurrentTiltAngle extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Vertical Tilt Angle"
 */
export declare class CurrentVerticalTiltAngle extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Digital Zoom"
 */
export declare class DigitalZoom extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Filter Change Indication"
 */
export declare class FilterChangeIndication extends Characteristic {
    static readonly FILTER_OK = 0;
    static readonly CHANGE_FILTER = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Filter Life Level"
 */
export declare class FilterLifeLevel extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Firmware Revision"
 */
export declare class FirmwareRevision extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Hardware Revision"
 */
export declare class HardwareRevision extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Heating Threshold Temperature"
 */
export declare class HeatingThresholdTemperature extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Hold Position"
 */
export declare class HoldPosition extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Hue"
 */
export declare class Hue extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Identify"
 */
export declare class Identify extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Image Mirroring"
 */
export declare class ImageMirroring extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Image Rotation"
 */
export declare class ImageRotation extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "In Use"
 */
export declare class InUse extends Characteristic {
    static readonly NOT_IN_USE = 0;
    static readonly IN_USE = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Is Configured"
 */
export declare class IsConfigured extends Characteristic {
    static readonly NOT_CONFIGURED = 0;
    static readonly CONFIGURED = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Leak Detected"
 */
export declare class LeakDetected extends Characteristic {
    static readonly LEAK_NOT_DETECTED = 0;
    static readonly LEAK_DETECTED = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Lock Control Point"
 */
export declare class LockControlPoint extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Lock Current State"
 */
export declare class LockCurrentState extends Characteristic {
    static readonly UNSECURED = 0;
    static readonly SECURED = 1;
    static readonly JAMMED = 2;
    static readonly UNKNOWN = 3;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Lock Last Known Action"
 */
export declare class LockLastKnownAction extends Characteristic {
    static readonly SECURED_PHYSICALLY_INTERIOR = 0;
    static readonly UNSECURED_PHYSICALLY_INTERIOR = 1;
    static readonly SECURED_PHYSICALLY_EXTERIOR = 2;
    static readonly UNSECURED_PHYSICALLY_EXTERIOR = 3;
    static readonly SECURED_BY_KEYPAD = 4;
    static readonly UNSECURED_BY_KEYPAD = 5;
    static readonly SECURED_REMOTELY = 6;
    static readonly UNSECURED_REMOTELY = 7;
    static readonly SECURED_BY_AUTO_SECURE_TIMEOUT = 8;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Lock Management Auto Security Timeout"
 */
export declare class LockManagementAutoSecurityTimeout extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Lock Physical Controls"
 */
export declare class LockPhysicalControls extends Characteristic {
    static readonly CONTROL_LOCK_DISABLED = 0;
    static readonly CONTROL_LOCK_ENABLED = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Lock Target State"
 */
export declare class LockTargetState extends Characteristic {
    static readonly UNSECURED = 0;
    static readonly SECURED = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Logs"
 */
export declare class Logs extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Manufacturer"
 */
export declare class Manufacturer extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Model"
 */
export declare class Model extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Motion Detected"
 */
export declare class MotionDetected extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Mute"
 */
export declare class Mute extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Name"
 */
export declare class Name extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Night Vision"
 */
export declare class NightVision extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Nitrogen Dioxide Density"
 */
export declare class NitrogenDioxideDensity extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Obstruction Detected"
 */
export declare class ObstructionDetected extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Occupancy Detected"
 */
export declare class OccupancyDetected extends Characteristic {
    static readonly OCCUPANCY_NOT_DETECTED = 0;
    static readonly OCCUPANCY_DETECTED = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "On"
 */
export declare class On extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Optical Zoom"
 */
export declare class OpticalZoom extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Outlet In Use"
 */
export declare class OutletInUse extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Ozone Density"
 */
export declare class OzoneDensity extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Pair Setup"
 */
export declare class PairSetup extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Pair Verify"
 */
export declare class PairVerify extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Pairing Features"
 */
export declare class PairingFeatures extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Pairing Pairings"
 */
export declare class PairingPairings extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Password Setting"
 */
export declare class PasswordSetting extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "PM10 Density"
 */
export declare class PM10Density extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "PM2.5 Density"
 */
export declare class PM2_5Density extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Position State"
 */
export declare class PositionState extends Characteristic {
    static readonly DECREASING = 0;
    static readonly INCREASING = 1;
    static readonly STOPPED = 2;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Program Mode"
 */
export declare class ProgramMode extends Characteristic {
    static readonly NO_PROGRAM_SCHEDULED = 0;
    static readonly PROGRAM_SCHEDULED = 1;
    static readonly PROGRAM_SCHEDULED_MANUAL_MODE_ = 2;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Programmable Switch Event"
 */
export declare class ProgrammableSwitchEvent extends Characteristic {
    static readonly SINGLE_PRESS = 0;
    static readonly DOUBLE_PRESS = 1;
    static readonly LONG_PRESS = 2;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Relative Humidity Dehumidifier Threshold"
 */
export declare class RelativeHumidityDehumidifierThreshold extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Relative Humidity Humidifier Threshold"
 */
export declare class RelativeHumidityHumidifierThreshold extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Remaining Duration"
 */
export declare class RemainingDuration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Reset Filter Indication"
 */
export declare class ResetFilterIndication extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Rotation Direction"
 */
export declare class RotationDirection extends Characteristic {
    static readonly CLOCKWISE = 0;
    static readonly COUNTER_CLOCKWISE = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Rotation Speed"
 */
export declare class RotationSpeed extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Saturation"
 */
export declare class Saturation extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Security System Alarm Type"
 */
export declare class SecuritySystemAlarmType extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Security System Current State"
 */
export declare class SecuritySystemCurrentState extends Characteristic {
    static readonly STAY_ARM = 0;
    static readonly AWAY_ARM = 1;
    static readonly NIGHT_ARM = 2;
    static readonly DISARMED = 3;
    static readonly ALARM_TRIGGERED = 4;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Security System Target State"
 */
export declare class SecuritySystemTargetState extends Characteristic {
    static readonly STAY_ARM = 0;
    static readonly AWAY_ARM = 1;
    static readonly NIGHT_ARM = 2;
    static readonly DISARM = 3;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Selected RTP Stream Configuration"
 */
export declare class SelectedRTPStreamConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Serial Number"
 */
export declare class SerialNumber extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Service Label Index"
 */
export declare class ServiceLabelIndex extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Service Label Namespace"
 */
export declare class ServiceLabelNamespace extends Characteristic {
    static readonly DOTS = 0;
    static readonly ARABIC_NUMERALS = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Set Duration"
 */
export declare class SetDuration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Setup Endpoints"
 */
export declare class SetupEndpoints extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Slat Type"
 */
export declare class SlatType extends Characteristic {
    static readonly HORIZONTAL = 0;
    static readonly VERTICAL = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Smoke Detected"
 */
export declare class SmokeDetected extends Characteristic {
    static readonly SMOKE_NOT_DETECTED = 0;
    static readonly SMOKE_DETECTED = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Status Active"
 */
export declare class StatusActive extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Status Fault"
 */
export declare class StatusFault extends Characteristic {
    static readonly NO_FAULT = 0;
    static readonly GENERAL_FAULT = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Status Jammed"
 */
export declare class StatusJammed extends Characteristic {
    static readonly NOT_JAMMED = 0;
    static readonly JAMMED = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Status Low Battery"
 */
export declare class StatusLowBattery extends Characteristic {
    static readonly BATTERY_LEVEL_NORMAL = 0;
    static readonly BATTERY_LEVEL_LOW = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Status Tampered"
 */
export declare class StatusTampered extends Characteristic {
    static readonly NOT_TAMPERED = 0;
    static readonly TAMPERED = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Streaming Status"
 */
export declare class StreamingStatus extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Sulphur Dioxide Density"
 */
export declare class SulphurDioxideDensity extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Audio Stream Configuration"
 */
export declare class SupportedAudioStreamConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported RTP Configuration"
 */
export declare class SupportedRTPConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Video Stream Configuration"
 */
export declare class SupportedVideoStreamConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Swing Mode"
 */
export declare class SwingMode extends Characteristic {
    static readonly SWING_DISABLED = 0;
    static readonly SWING_ENABLED = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Air Purifier State"
 */
export declare class TargetAirPurifierState extends Characteristic {
    static readonly MANUAL = 0;
    static readonly AUTO = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Air Quality"
 */
export declare class TargetAirQuality extends Characteristic {
    static readonly EXCELLENT = 0;
    static readonly GOOD = 1;
    static readonly FAIR = 2;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Door State"
 */
export declare class TargetDoorState extends Characteristic {
    static readonly OPEN = 0;
    static readonly CLOSED = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Fan State"
 */
export declare class TargetFanState extends Characteristic {
    static readonly MANUAL = 0;
    static readonly AUTO = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Heater Cooler State"
 */
export declare class TargetHeaterCoolerState extends Characteristic {
    static readonly AUTO = 0;
    static readonly HEAT = 1;
    static readonly COOL = 2;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Heating Cooling State"
 */
export declare class TargetHeatingCoolingState extends Characteristic {
    static readonly OFF = 0;
    static readonly HEAT = 1;
    static readonly COOL = 2;
    static readonly AUTO = 3;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Horizontal Tilt Angle"
 */
export declare class TargetHorizontalTiltAngle extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Humidifier Dehumidifier State"
 */
export declare class TargetHumidifierDehumidifierState extends Characteristic {
    /**
     * @deprecated Removed in iOS 11. Use HUMIDIFIER_OR_DEHUMIDIFIER instead.
     */
    static readonly AUTO = 0;
    static readonly HUMIDIFIER_OR_DEHUMIDIFIER = 0;
    static readonly HUMIDIFIER = 1;
    static readonly DEHUMIDIFIER = 2;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Position"
 */
export declare class TargetPosition extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Relative Humidity"
 */
export declare class TargetRelativeHumidity extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Slat State"
 */
export declare class TargetSlatState extends Characteristic {
    static readonly MANUAL = 0;
    static readonly AUTO = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Temperature"
 */
export declare class TargetTemperature extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Tilt Angle"
 */
export declare class TargetTiltAngle extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Vertical Tilt Angle"
 */
export declare class TargetVerticalTiltAngle extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Temperature Display Units"
 */
export declare class TemperatureDisplayUnits extends Characteristic {
    static readonly CELSIUS = 0;
    static readonly FAHRENHEIT = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Valve Type"
 */
export declare class ValveType extends Characteristic {
    static readonly GENERIC_VALVE = 0;
    static readonly IRRIGATION = 1;
    static readonly SHOWER_HEAD = 2;
    static readonly WATER_FAUCET = 3;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Version"
 */
export declare class Version extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "VOC Density"
 */
export declare class VOCDensity extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Volume"
 */
export declare class Volume extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Water Level"
 */
export declare class WaterLevel extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Recording Audio Active"
 */
export declare class RecordingAudioActive extends Characteristic {
    static readonly DISABLE = 0;
    static readonly ENABLE = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Camera Recording Configuration"
 */
export declare class SupportedCameraRecordingConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Video Recording Configuration"
 */
export declare class SupportedVideoRecordingConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Audio Recording Configuration"
 */
export declare class SupportedAudioRecordingConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Selected Camera Recording Configuration"
 */
export declare class SelectedCameraRecordingConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Camera Operating Mode Indicator"
 */
export declare class CameraOperatingModeIndicator extends Characteristic {
    static readonly DISABLE = 0;
    static readonly ENABLE = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Event Snapshots Active"
 */
export declare class EventSnapshotsActive extends Characteristic {
    static readonly DISABLE = 0;
    static readonly ENABLE = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Diagonal Field Of View"
 *
 * @deprecated was removed again
 */
export declare class DiagonalFieldOfView extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "HomeKit Camera Active"
 */
export declare class HomeKitCameraActive extends Characteristic {
    static readonly OFF = 0;
    static readonly ON = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Manually disabled"
 */
export declare class ManuallyDisabled extends Characteristic {
    static readonly ENABLED = 0;
    static readonly DISABLED = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Third Party Camera Active"
 */
export declare class ThirdPartyCameraActive extends Characteristic {
    static readonly OFF = 0;
    static readonly ON = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Periodic Snapshots Active"
 */
export declare class PeriodicSnapshotsActive extends Characteristic {
    static readonly DISABLE = 0;
    static readonly ENABLE = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Network Client Profile Control"
 */
export declare class NetworkClientProfileControl extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Network Client Status Control"
 */
export declare class NetworkClientStatusControl extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Router Status"
 */
export declare class RouterStatus extends Characteristic {
    static readonly READY = 0;
    static readonly NOT_READY = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Router Configuration"
 */
export declare class SupportedRouterConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "WAN Configuration List"
 */
export declare class WANConfigurationList extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "WAN Status List"
 */
export declare class WANStatusList extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Managed Network Enable"
 */
export declare class ManagedNetworkEnable extends Characteristic {
    static readonly DISABLED = 0;
    static readonly ENABLED = 1;
    static readonly UNKNOWN = 2;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Network Access Violation Control"
 */
export declare class NetworkAccessViolationControl extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Wi-Fi Satellite Status"
 */
export declare class WiFiSatelliteStatus extends Characteristic {
    static readonly UNKNOWN = 0;
    static readonly CONNECTED = 1;
    static readonly NOT_CONNECTED = 2;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Wake Configuration"
 */
export declare class WakeConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Transfer Transport Configuration"
 */
export declare class SupportedTransferTransportConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Setup Transfer Transport"
 */
export declare class SetupTransferTransport extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Activity Interval"
 */
export declare class ActivityInterval extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "CCA Energy Detect Threshold"
 */
export declare class CCAEnergyDetectThreshold extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "CCA Signal Detect Threshold"
 */
export declare class CCASignalDetectThreshold extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Characteristic Value Transition Control"
 */
export declare class CharacteristicValueTransitionControl extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Characteristic Value Transition Configuration"
 */
export declare class SupportedCharacteristicValueTransitionConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Transport"
 */
export declare class CurrentTransport extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Data Stream HAP Transport"
 */
export declare class DataStreamHAPTransport extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Data Stream HAP Transport Interrupt"
 */
export declare class DataStreamHAPTransportInterrupt extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Event Retransmission Maximum"
 */
export declare class EventRetransmissionMaximum extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Event Transmission Counters"
 */
export declare class EventTransmissionCounters extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Heart Beat"
 */
export declare class HeartBeat extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "MAC Retransmission Maximum"
 */
export declare class MACRetransmissionMaximum extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "MAC Transmission Counters"
 */
export declare class MACTransmissionCounters extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Operating State Response"
 */
export declare class OperatingStateResponse extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Ping"
 */
export declare class Ping extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Receiver Sensitivity"
 */
export declare class ReceiverSensitivity extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Received Signal Strength Indication"
 */
export declare class ReceivedSignalStrengthIndication extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Sleep Interval"
 */
export declare class SleepInterval extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Signal-to-noise Ration"
 */
export declare class SignalToNoiseRatio extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Supported Diagnostics Snapshot"
 */
export declare class SupportedDiagnosticsSnapshot extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Transmit Power"
 */
export declare class TransmitPower extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Transmit Power Maximum"
 */
export declare class TransmitPowerMaximum extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Video Analysis Active"
 */
export declare class VideoAnalysisActive extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Wi-Fi Capabilities"
 */
export declare class WiFiCapabilities extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Wi-Fi Configuration Control"
 */
export declare class WiFiConfigurationControl extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Service "Access Control"
 */
export declare class AccessControl extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Accessory Information"
 */
export declare class AccessoryInformation extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Air Purifier"
 */
export declare class AirPurifier extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Air Quality Sensor"
 */
export declare class AirQualitySensor extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Battery Service"
 */
export declare class BatteryService extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Camera RTP Stream Management"
 */
export declare class CameraRTPStreamManagement extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Carbon Dioxide Sensor"
 */
export declare class CarbonDioxideSensor extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Carbon Monoxide Sensor"
 */
export declare class CarbonMonoxideSensor extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Contact Sensor"
 */
export declare class ContactSensor extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Door"
 */
export declare class Door extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Doorbell"
 */
export declare class Doorbell extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Fan"
 */
export declare class Fan extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Fan v2"
 */
export declare class Fanv2 extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Filter Maintenance"
 */
export declare class FilterMaintenance extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Faucet"
 */
export declare class Faucet extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Garage Door Opener"
 */
export declare class GarageDoorOpener extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Heater Cooler"
 */
export declare class HeaterCooler extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Humidifier Dehumidifier"
 */
export declare class HumidifierDehumidifier extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Humidity Sensor"
 */
export declare class HumiditySensor extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Irrigation System"
 */
export declare class IrrigationSystem extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Leak Sensor"
 */
export declare class LeakSensor extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Light Sensor"
 */
export declare class LightSensor extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Lightbulb"
 */
export declare class Lightbulb extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Lock Management"
 */
export declare class LockManagement extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Lock Mechanism"
 */
export declare class LockMechanism extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Microphone"
 */
export declare class Microphone extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Motion Sensor"
 */
export declare class MotionSensor extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Occupancy Sensor"
 */
export declare class OccupancySensor extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Outlet"
 */
export declare class Outlet extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Security System"
 */
export declare class SecuritySystem extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Service Label"
 */
export declare class ServiceLabel extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Slat"
 */
export declare class Slat extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Smoke Sensor"
 */
export declare class SmokeSensor extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Smart Speaker"
 */
export declare class SmartSpeaker extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Speaker"
 *
 * {@see TelevisionSpeaker} for the same Service defined with {@link VolumeControlType},
 * {@link VolumeSelector} and {@link Active} characteristics.
 */
export declare class Speaker extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Stateless Programmable Switch"
 */
export declare class StatelessProgrammableSwitch extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Switch"
 */
export declare class Switch extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Temperature Sensor"
 */
export declare class TemperatureSensor extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Thermostat"
 */
export declare class Thermostat extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Valve"
 */
export declare class Valve extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Window"
 */
export declare class Window extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Window Covering"
 */
export declare class WindowCovering extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Camera Operating Mode"
 */
export declare class CameraOperatingMode extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Camera Event Recording Management"
 */
export declare class CameraEventRecordingManagement extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Wi-Fi Router"
 */
export declare class WiFiRouter extends Service {
    static UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Wi-Fi Satellite"
 */
export declare class WiFiSatellite extends Service {
    static readonly UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Power Management"
 */
export declare class PowerManagement extends Service {
    static readonly UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Transfer Transport Management"
 */
export declare class TransferTransportManagement extends Service {
    static readonly UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Accessory Runtime Information"
 */
export declare class AccessoryRuntimeInformation extends Service {
    static readonly UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Diagnostics"
 */
export declare class Diagnostics extends Service {
    static readonly UUID: string;
    constructor(displayName?: string, subtype?: string);
}
/**
 * Service "Wi-Fi Transport"
 */
export declare class WiFiTransport extends Service {
    static readonly UUID: string;
    constructor(displayName?: string, subtype?: string);
}
//# sourceMappingURL=HomeKit.d.ts.map