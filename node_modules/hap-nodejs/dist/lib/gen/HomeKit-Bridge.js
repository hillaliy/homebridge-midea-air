"use strict";
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
exports.TunneledBTLEAccessoryService = exports.TimeInformation = exports.Relay = exports.ProtocolInformation = exports.Pairing = exports.BridgingState = exports.BridgeConfiguration = exports.TunneledAccessoryStateNumber = exports.TunneledAccessoryConnected = exports.TunneledAccessoryAdvertising = exports.TunnelConnectionTimeout = exports.TimeUpdate = exports.RelayState = exports.RelayEnabled = exports.RelayControlPoint = exports.Reachable = exports.LinkQuality = exports.DiscoveredBridgedAccessories = exports.DiscoverBridgedAccessories = exports.DayoftheWeek = exports.CurrentTime = exports.ConfigureBridgedAccessoryStatus = exports.ConfigureBridgedAccessory = exports.Category = exports.AccessoryIdentifier = exports.StatefulProgrammableSwitch = exports.CameraControl = exports.SoftwareRevision = exports.ProgrammableSwitchOutputState = exports.AppMatchingIdentifier = void 0;
var Characteristic_1 = require("../Characteristic");
var Service_1 = require("../Service");
/**
 *
 * Removed in iOS 11
 *
 */
/**
 * Characteristic "App Matching Identifier"
 */
var AppMatchingIdentifier = /** @class */ (function (_super) {
    __extends(AppMatchingIdentifier, _super);
    function AppMatchingIdentifier() {
        var _this = _super.call(this, 'App Matching Identifier', AppMatchingIdentifier.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AppMatchingIdentifier.UUID = '000000A4-0000-1000-8000-0026BB765291';
    return AppMatchingIdentifier;
}(Characteristic_1.Characteristic));
exports.AppMatchingIdentifier = AppMatchingIdentifier;
Characteristic_1.Characteristic.AppMatchingIdentifier = AppMatchingIdentifier;
/**
 * Characteristic "Programmable Switch Output State"
 */
var ProgrammableSwitchOutputState = /** @class */ (function (_super) {
    __extends(ProgrammableSwitchOutputState, _super);
    function ProgrammableSwitchOutputState() {
        var _this = _super.call(this, 'Programmable Switch Output State', ProgrammableSwitchOutputState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 1,
            minValue: 0,
            minStep: 1,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ProgrammableSwitchOutputState.UUID = '00000074-0000-1000-8000-0026BB765291';
    return ProgrammableSwitchOutputState;
}(Characteristic_1.Characteristic));
exports.ProgrammableSwitchOutputState = ProgrammableSwitchOutputState;
Characteristic_1.Characteristic.ProgrammableSwitchOutputState = ProgrammableSwitchOutputState;
/**
 * Characteristic "Software Revision"
 */
var SoftwareRevision = /** @class */ (function (_super) {
    __extends(SoftwareRevision, _super);
    function SoftwareRevision() {
        var _this = _super.call(this, 'Software Revision', SoftwareRevision.UUID) || this;
        _this.setProps({
            format: "string" /* STRING */,
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SoftwareRevision.UUID = '00000054-0000-1000-8000-0026BB765291';
    return SoftwareRevision;
}(Characteristic_1.Characteristic));
exports.SoftwareRevision = SoftwareRevision;
Characteristic_1.Characteristic.SoftwareRevision = SoftwareRevision;
/**
 * Service "Camera Control"
 */
var CameraControl = /** @class */ (function (_super) {
    __extends(CameraControl, _super);
    function CameraControl(displayName, subtype) {
        var _this = _super.call(this, displayName, CameraControl.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.On);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CurrentHorizontalTiltAngle);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.CurrentVerticalTiltAngle);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TargetHorizontalTiltAngle);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.TargetVerticalTiltAngle);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.NightVision);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.OpticalZoom);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.DigitalZoom);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ImageRotation);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.ImageMirroring);
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    CameraControl.UUID = '00000111-0000-1000-8000-0026BB765291';
    return CameraControl;
}(Service_1.Service));
exports.CameraControl = CameraControl;
Service_1.Service.CameraControl = CameraControl;
/**
 * Service "Stateful Programmable Switch"
 */
var StatefulProgrammableSwitch = /** @class */ (function (_super) {
    __extends(StatefulProgrammableSwitch, _super);
    function StatefulProgrammableSwitch(displayName, subtype) {
        var _this = _super.call(this, displayName, StatefulProgrammableSwitch.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ProgrammableSwitchEvent);
        _this.addCharacteristic(Characteristic_1.Characteristic.ProgrammableSwitchOutputState);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    StatefulProgrammableSwitch.UUID = '00000088-0000-1000-8000-0026BB765291';
    return StatefulProgrammableSwitch;
}(Service_1.Service));
exports.StatefulProgrammableSwitch = StatefulProgrammableSwitch;
Service_1.Service.StatefulProgrammableSwitch = StatefulProgrammableSwitch;
/**
 *
 * Removed in iOS 10
 *
 */
/**
 * Characteristic "Accessory Identifier"
 */
var AccessoryIdentifier = /** @class */ (function (_super) {
    __extends(AccessoryIdentifier, _super);
    function AccessoryIdentifier() {
        var _this = _super.call(this, 'Accessory Identifier', AccessoryIdentifier.UUID) || this;
        _this.setProps({
            format: "string" /* STRING */,
            perms: ["pr" /* READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    AccessoryIdentifier.UUID = '00000057-0000-1000-8000-0026BB765291';
    return AccessoryIdentifier;
}(Characteristic_1.Characteristic));
exports.AccessoryIdentifier = AccessoryIdentifier;
Characteristic_1.Characteristic.AccessoryIdentifier = AccessoryIdentifier;
/**
 * Characteristic "Category"
 */
var Category = /** @class */ (function (_super) {
    __extends(Category, _super);
    function Category() {
        var _this = _super.call(this, 'Category', Category.UUID) || this;
        _this.setProps({
            format: "uint16" /* UINT16 */,
            maxValue: 16,
            minValue: 1,
            minStep: 1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Category.UUID = '000000A3-0000-1000-8000-0026BB765291';
    return Category;
}(Characteristic_1.Characteristic));
exports.Category = Category;
Characteristic_1.Characteristic.Category = Category;
/**
 * Characteristic "Configure Bridged Accessory"
 */
var ConfigureBridgedAccessory = /** @class */ (function (_super) {
    __extends(ConfigureBridgedAccessory, _super);
    function ConfigureBridgedAccessory() {
        var _this = _super.call(this, 'Configure Bridged Accessory', ConfigureBridgedAccessory.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pw" /* WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ConfigureBridgedAccessory.UUID = '000000A0-0000-1000-8000-0026BB765291';
    return ConfigureBridgedAccessory;
}(Characteristic_1.Characteristic));
exports.ConfigureBridgedAccessory = ConfigureBridgedAccessory;
Characteristic_1.Characteristic.ConfigureBridgedAccessory = ConfigureBridgedAccessory;
/**
 * Characteristic "Configure Bridged Accessory Status"
 */
var ConfigureBridgedAccessoryStatus = /** @class */ (function (_super) {
    __extends(ConfigureBridgedAccessoryStatus, _super);
    function ConfigureBridgedAccessoryStatus() {
        var _this = _super.call(this, 'Configure Bridged Accessory Status', ConfigureBridgedAccessoryStatus.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    ConfigureBridgedAccessoryStatus.UUID = '0000009D-0000-1000-8000-0026BB765291';
    return ConfigureBridgedAccessoryStatus;
}(Characteristic_1.Characteristic));
exports.ConfigureBridgedAccessoryStatus = ConfigureBridgedAccessoryStatus;
Characteristic_1.Characteristic.ConfigureBridgedAccessoryStatus = ConfigureBridgedAccessoryStatus;
/**
 * Characteristic "Current Time"
 */
var CurrentTime = /** @class */ (function (_super) {
    __extends(CurrentTime, _super);
    function CurrentTime() {
        var _this = _super.call(this, 'Current Time', CurrentTime.UUID) || this;
        _this.setProps({
            format: "string" /* STRING */,
            perms: ["pr" /* READ */, "pw" /* WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    CurrentTime.UUID = '0000009B-0000-1000-8000-0026BB765291';
    return CurrentTime;
}(Characteristic_1.Characteristic));
exports.CurrentTime = CurrentTime;
Characteristic_1.Characteristic.CurrentTime = CurrentTime;
/**
 * Characteristic "Day of the Week"
 */
var DayoftheWeek = /** @class */ (function (_super) {
    __extends(DayoftheWeek, _super);
    function DayoftheWeek() {
        var _this = _super.call(this, 'Day of the Week', DayoftheWeek.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 7,
            minValue: 1,
            minStep: 1,
            perms: ["pr" /* READ */, "pw" /* WRITE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    DayoftheWeek.UUID = '00000098-0000-1000-8000-0026BB765291';
    return DayoftheWeek;
}(Characteristic_1.Characteristic));
exports.DayoftheWeek = DayoftheWeek;
Characteristic_1.Characteristic.DayoftheWeek = DayoftheWeek;
/**
 * Characteristic "Discover Bridged Accessories"
 */
var DiscoverBridgedAccessories = /** @class */ (function (_super) {
    __extends(DiscoverBridgedAccessories, _super);
    function DiscoverBridgedAccessories() {
        var _this = _super.call(this, 'Discover Bridged Accessories', DiscoverBridgedAccessories.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    // The value property of DiscoverBridgedAccessories must be one of the following:
    DiscoverBridgedAccessories.START_DISCOVERY = 0;
    DiscoverBridgedAccessories.STOP_DISCOVERY = 1;
    DiscoverBridgedAccessories.UUID = '0000009E-0000-1000-8000-0026BB765291';
    return DiscoverBridgedAccessories;
}(Characteristic_1.Characteristic));
exports.DiscoverBridgedAccessories = DiscoverBridgedAccessories;
Characteristic_1.Characteristic.DiscoverBridgedAccessories = DiscoverBridgedAccessories;
/**
 * Characteristic "Discovered Bridged Accessories"
 */
var DiscoveredBridgedAccessories = /** @class */ (function (_super) {
    __extends(DiscoveredBridgedAccessories, _super);
    function DiscoveredBridgedAccessories() {
        var _this = _super.call(this, 'Discovered Bridged Accessories', DiscoveredBridgedAccessories.UUID) || this;
        _this.setProps({
            format: "uint16" /* UINT16 */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    DiscoveredBridgedAccessories.UUID = '0000009F-0000-1000-8000-0026BB765291';
    return DiscoveredBridgedAccessories;
}(Characteristic_1.Characteristic));
exports.DiscoveredBridgedAccessories = DiscoveredBridgedAccessories;
Characteristic_1.Characteristic.DiscoveredBridgedAccessories = DiscoveredBridgedAccessories;
/**
 * Characteristic "Link Quality"
 */
var LinkQuality = /** @class */ (function (_super) {
    __extends(LinkQuality, _super);
    function LinkQuality() {
        var _this = _super.call(this, 'Link Quality', LinkQuality.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            maxValue: 4,
            minValue: 1,
            minStep: 1,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    LinkQuality.UUID = '0000009C-0000-1000-8000-0026BB765291';
    return LinkQuality;
}(Characteristic_1.Characteristic));
exports.LinkQuality = LinkQuality;
Characteristic_1.Characteristic.LinkQuality = LinkQuality;
/**
 * Characteristic "Reachable"
 */
var Reachable = /** @class */ (function (_super) {
    __extends(Reachable, _super);
    function Reachable() {
        var _this = _super.call(this, 'Reachable', Reachable.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    Reachable.UUID = '00000063-0000-1000-8000-0026BB765291';
    return Reachable;
}(Characteristic_1.Characteristic));
exports.Reachable = Reachable;
Characteristic_1.Characteristic.Reachable = Reachable;
/**
 * Characteristic "Relay Control Point"
 */
var RelayControlPoint = /** @class */ (function (_super) {
    __extends(RelayControlPoint, _super);
    function RelayControlPoint() {
        var _this = _super.call(this, 'Relay Control Point', RelayControlPoint.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RelayControlPoint.UUID = '0000005E-0000-1000-8000-0026BB765291';
    return RelayControlPoint;
}(Characteristic_1.Characteristic));
exports.RelayControlPoint = RelayControlPoint;
Characteristic_1.Characteristic.RelayControlPoint = RelayControlPoint;
/**
 * Characteristic "Relay Enabled"
 */
var RelayEnabled = /** @class */ (function (_super) {
    __extends(RelayEnabled, _super);
    function RelayEnabled() {
        var _this = _super.call(this, 'Relay Enabled', RelayEnabled.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pr" /* READ */, "pw" /* WRITE */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RelayEnabled.UUID = '0000005B-0000-1000-8000-0026BB765291';
    return RelayEnabled;
}(Characteristic_1.Characteristic));
exports.RelayEnabled = RelayEnabled;
Characteristic_1.Characteristic.RelayEnabled = RelayEnabled;
/**
 * Characteristic "Relay State"
 */
var RelayState = /** @class */ (function (_super) {
    __extends(RelayState, _super);
    function RelayState() {
        var _this = _super.call(this, 'Relay State', RelayState.UUID) || this;
        _this.setProps({
            format: "uint8" /* UINT8 */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    RelayState.UUID = '0000005C-0000-1000-8000-0026BB765291';
    return RelayState;
}(Characteristic_1.Characteristic));
exports.RelayState = RelayState;
Characteristic_1.Characteristic.RelayState = RelayState;
/**
 * Characteristic "Time Update"
 */
var TimeUpdate = /** @class */ (function (_super) {
    __extends(TimeUpdate, _super);
    function TimeUpdate() {
        var _this = _super.call(this, 'Time Update', TimeUpdate.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TimeUpdate.UUID = '0000009A-0000-1000-8000-0026BB765291';
    return TimeUpdate;
}(Characteristic_1.Characteristic));
exports.TimeUpdate = TimeUpdate;
Characteristic_1.Characteristic.TimeUpdate = TimeUpdate;
/**
 * Characteristic "Tunnel Connection Timeout "
 */
var TunnelConnectionTimeout = /** @class */ (function (_super) {
    __extends(TunnelConnectionTimeout, _super);
    function TunnelConnectionTimeout() {
        var _this = _super.call(this, 'Tunnel Connection Timeout ', TunnelConnectionTimeout.UUID) || this;
        _this.setProps({
            format: "uint32" /* UINT32 */,
            perms: ["pw" /* WRITE */, "pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TunnelConnectionTimeout.UUID = '00000061-0000-1000-8000-0026BB765291';
    return TunnelConnectionTimeout;
}(Characteristic_1.Characteristic));
exports.TunnelConnectionTimeout = TunnelConnectionTimeout;
Characteristic_1.Characteristic.TunnelConnectionTimeout = TunnelConnectionTimeout;
/**
 * Characteristic "Tunneled Accessory Advertising"
 */
var TunneledAccessoryAdvertising = /** @class */ (function (_super) {
    __extends(TunneledAccessoryAdvertising, _super);
    function TunneledAccessoryAdvertising() {
        var _this = _super.call(this, 'Tunneled Accessory Advertising', TunneledAccessoryAdvertising.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pw" /* WRITE */, "pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TunneledAccessoryAdvertising.UUID = '00000060-0000-1000-8000-0026BB765291';
    return TunneledAccessoryAdvertising;
}(Characteristic_1.Characteristic));
exports.TunneledAccessoryAdvertising = TunneledAccessoryAdvertising;
Characteristic_1.Characteristic.TunneledAccessoryAdvertising = TunneledAccessoryAdvertising;
/**
 * Characteristic "Tunneled Accessory Connected"
 */
var TunneledAccessoryConnected = /** @class */ (function (_super) {
    __extends(TunneledAccessoryConnected, _super);
    function TunneledAccessoryConnected() {
        var _this = _super.call(this, 'Tunneled Accessory Connected', TunneledAccessoryConnected.UUID) || this;
        _this.setProps({
            format: "bool" /* BOOL */,
            perms: ["pw" /* WRITE */, "pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TunneledAccessoryConnected.UUID = '00000059-0000-1000-8000-0026BB765291';
    return TunneledAccessoryConnected;
}(Characteristic_1.Characteristic));
exports.TunneledAccessoryConnected = TunneledAccessoryConnected;
Characteristic_1.Characteristic.TunneledAccessoryConnected = TunneledAccessoryConnected;
/**
 * Characteristic "Tunneled Accessory State Number"
 */
var TunneledAccessoryStateNumber = /** @class */ (function (_super) {
    __extends(TunneledAccessoryStateNumber, _super);
    function TunneledAccessoryStateNumber() {
        var _this = _super.call(this, 'Tunneled Accessory State Number', TunneledAccessoryStateNumber.UUID) || this;
        _this.setProps({
            format: "float" /* FLOAT */,
            perms: ["pr" /* READ */, "ev" /* NOTIFY */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    TunneledAccessoryStateNumber.UUID = '00000058-0000-1000-8000-0026BB765291';
    return TunneledAccessoryStateNumber;
}(Characteristic_1.Characteristic));
exports.TunneledAccessoryStateNumber = TunneledAccessoryStateNumber;
Characteristic_1.Characteristic.TunneledAccessoryStateNumber = TunneledAccessoryStateNumber;
/**
 * Service "Bridge Configuration"
 */
var BridgeConfiguration = /** @class */ (function (_super) {
    __extends(BridgeConfiguration, _super);
    function BridgeConfiguration(displayName, subtype) {
        var _this = _super.call(this, displayName, BridgeConfiguration.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.ConfigureBridgedAccessoryStatus);
        _this.addCharacteristic(Characteristic_1.Characteristic.DiscoverBridgedAccessories);
        _this.addCharacteristic(Characteristic_1.Characteristic.DiscoveredBridgedAccessories);
        _this.addCharacteristic(Characteristic_1.Characteristic.ConfigureBridgedAccessory);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    BridgeConfiguration.UUID = '000000A1-0000-1000-8000-0026BB765291';
    return BridgeConfiguration;
}(Service_1.Service));
exports.BridgeConfiguration = BridgeConfiguration;
Service_1.Service.BridgeConfiguration = BridgeConfiguration;
/**
 * Service "Bridging State"
 */
var BridgingState = /** @class */ (function (_super) {
    __extends(BridgingState, _super);
    function BridgingState(displayName, subtype) {
        var _this = _super.call(this, displayName, BridgingState.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Reachable);
        _this.addCharacteristic(Characteristic_1.Characteristic.LinkQuality);
        _this.addCharacteristic(Characteristic_1.Characteristic.AccessoryIdentifier);
        _this.addCharacteristic(Characteristic_1.Characteristic.Category);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    BridgingState.UUID = '00000062-0000-1000-8000-0026BB765291';
    return BridgingState;
}(Service_1.Service));
exports.BridgingState = BridgingState;
Service_1.Service.BridgingState = BridgingState;
/**
 * Service "Pairing"
 */
var Pairing = /** @class */ (function (_super) {
    __extends(Pairing, _super);
    function Pairing(displayName, subtype) {
        var _this = _super.call(this, displayName, Pairing.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.PairSetup);
        _this.addCharacteristic(Characteristic_1.Characteristic.PairVerify);
        _this.addCharacteristic(Characteristic_1.Characteristic.PairingFeatures);
        _this.addCharacteristic(Characteristic_1.Characteristic.PairingPairings);
        return _this;
        // Optional Characteristics
    }
    Pairing.UUID = '00000055-0000-1000-8000-0026BB765291';
    return Pairing;
}(Service_1.Service));
exports.Pairing = Pairing;
Service_1.Service.Pairing = Pairing;
/**
 * Service "Protocol Information"
 */
var ProtocolInformation = /** @class */ (function (_super) {
    __extends(ProtocolInformation, _super);
    function ProtocolInformation(displayName, subtype) {
        var _this = _super.call(this, displayName, ProtocolInformation.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.Version);
        return _this;
        // Optional Characteristics
    }
    ProtocolInformation.UUID = '000000A2-0000-1000-8000-0026BB765291';
    return ProtocolInformation;
}(Service_1.Service));
exports.ProtocolInformation = ProtocolInformation;
Service_1.Service.ProtocolInformation = ProtocolInformation;
/**
 * Service "Relay"
 */
var Relay = /** @class */ (function (_super) {
    __extends(Relay, _super);
    function Relay(displayName, subtype) {
        var _this = _super.call(this, displayName, Relay.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.RelayEnabled);
        _this.addCharacteristic(Characteristic_1.Characteristic.RelayState);
        _this.addCharacteristic(Characteristic_1.Characteristic.RelayControlPoint);
        return _this;
        // Optional Characteristics
    }
    Relay.UUID = '0000005A-0000-1000-8000-0026BB765291';
    return Relay;
}(Service_1.Service));
exports.Relay = Relay;
Service_1.Service.Relay = Relay;
/**
 * Service "Time Information"
 */
var TimeInformation = /** @class */ (function (_super) {
    __extends(TimeInformation, _super);
    function TimeInformation(displayName, subtype) {
        var _this = _super.call(this, displayName, TimeInformation.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.CurrentTime);
        _this.addCharacteristic(Characteristic_1.Characteristic.DayoftheWeek);
        _this.addCharacteristic(Characteristic_1.Characteristic.TimeUpdate);
        // Optional Characteristics
        _this.addOptionalCharacteristic(Characteristic_1.Characteristic.Name);
        return _this;
    }
    TimeInformation.UUID = '00000099-0000-1000-8000-0026BB765291';
    return TimeInformation;
}(Service_1.Service));
exports.TimeInformation = TimeInformation;
Service_1.Service.TimeInformation = TimeInformation;
/**
 * Service "Tunneled BTLE Accessory Service"
 */
var TunneledBTLEAccessoryService = /** @class */ (function (_super) {
    __extends(TunneledBTLEAccessoryService, _super);
    function TunneledBTLEAccessoryService(displayName, subtype) {
        var _this = _super.call(this, displayName, TunneledBTLEAccessoryService.UUID, subtype) || this;
        // Required Characteristics
        if (!_this.testCharacteristic(Characteristic_1.Characteristic.Name)) { // workaround for name characteristic collision in constructor
            _this.addCharacteristic(Characteristic_1.Characteristic.Name);
        }
        _this.addCharacteristic(Characteristic_1.Characteristic.AccessoryIdentifier);
        _this.addCharacteristic(Characteristic_1.Characteristic.TunneledAccessoryStateNumber);
        _this.addCharacteristic(Characteristic_1.Characteristic.TunneledAccessoryConnected);
        _this.addCharacteristic(Characteristic_1.Characteristic.TunneledAccessoryAdvertising);
        _this.addCharacteristic(Characteristic_1.Characteristic.TunnelConnectionTimeout);
        return _this;
        // Optional Characteristics
    }
    TunneledBTLEAccessoryService.UUID = '00000056-0000-1000-8000-0026BB765291';
    return TunneledBTLEAccessoryService;
}(Service_1.Service));
exports.TunneledBTLEAccessoryService = TunneledBTLEAccessoryService;
Service_1.Service.TunneledBTLEAccessoryService = TunneledBTLEAccessoryService;
//# sourceMappingURL=HomeKit-Bridge.js.map