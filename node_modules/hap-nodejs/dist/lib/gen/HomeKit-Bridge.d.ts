import { Characteristic } from '../Characteristic';
import { Service } from '../Service';
/**
 *
 * Removed in iOS 11
 *
 */
/**
 * Characteristic "App Matching Identifier"
 */
export declare class AppMatchingIdentifier extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Programmable Switch Output State"
 */
export declare class ProgrammableSwitchOutputState extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Software Revision"
 */
export declare class SoftwareRevision extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Service "Camera Control"
 */
export declare class CameraControl extends Service {
    static readonly UUID: string;
    constructor(displayName: string, subtype: string);
}
/**
 * Service "Stateful Programmable Switch"
 */
export declare class StatefulProgrammableSwitch extends Service {
    static readonly UUID: string;
    constructor(displayName: string, subtype: string);
}
/**
 *
 * Removed in iOS 10
 *
 */
/**
 * Characteristic "Accessory Identifier"
 */
export declare class AccessoryIdentifier extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Category"
 */
export declare class Category extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Configure Bridged Accessory"
 */
export declare class ConfigureBridgedAccessory extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Configure Bridged Accessory Status"
 */
export declare class ConfigureBridgedAccessoryStatus extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Time"
 */
export declare class CurrentTime extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Day of the Week"
 */
export declare class DayoftheWeek extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Discover Bridged Accessories"
 */
export declare class DiscoverBridgedAccessories extends Characteristic {
    static readonly START_DISCOVERY = 0;
    static readonly STOP_DISCOVERY = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Discovered Bridged Accessories"
 */
export declare class DiscoveredBridgedAccessories extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Link Quality"
 */
export declare class LinkQuality extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Reachable"
 */
export declare class Reachable extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Relay Control Point"
 */
export declare class RelayControlPoint extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Relay Enabled"
 */
export declare class RelayEnabled extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Relay State"
 */
export declare class RelayState extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Time Update"
 */
export declare class TimeUpdate extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Tunnel Connection Timeout "
 */
export declare class TunnelConnectionTimeout extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Tunneled Accessory Advertising"
 */
export declare class TunneledAccessoryAdvertising extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Tunneled Accessory Connected"
 */
export declare class TunneledAccessoryConnected extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Tunneled Accessory State Number"
 */
export declare class TunneledAccessoryStateNumber extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Service "Bridge Configuration"
 */
export declare class BridgeConfiguration extends Service {
    static readonly UUID: string;
    constructor(displayName: string, subtype: string);
}
/**
 * Service "Bridging State"
 */
export declare class BridgingState extends Service {
    static readonly UUID: string;
    constructor(displayName: string, subtype: string);
}
/**
 * Service "Pairing"
 */
export declare class Pairing extends Service {
    static readonly UUID: string;
    constructor(displayName: string, subtype: string);
}
/**
 * Service "Protocol Information"
 */
export declare class ProtocolInformation extends Service {
    static readonly UUID: string;
    constructor(displayName: string, subtype: string);
}
/**
 * Service "Relay"
 */
export declare class Relay extends Service {
    static readonly UUID: string;
    constructor(displayName: string, subtype: string);
}
/**
 * Service "Time Information"
 */
export declare class TimeInformation extends Service {
    static readonly UUID: string;
    constructor(displayName: string, subtype: string);
}
/**
 * Service "Tunneled BTLE Accessory Service"
 */
export declare class TunneledBTLEAccessoryService extends Service {
    static readonly UUID: string;
    constructor(displayName: string, subtype: string);
}
//# sourceMappingURL=HomeKit-Bridge.d.ts.map