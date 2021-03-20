import { Characteristic } from '../Characteristic';
import { Service } from '../Service';
/**
 * Characteristic "Target Control Supported Configuration"
 */
export declare class TargetControlSupportedConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Control List"
 */
export declare class TargetControlList extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Button Event"
 */
export declare class ButtonEvent extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Selected Audio Stream Configuration"
 */
export declare class SelectedAudioStreamConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Siri Input Type"
 */
export declare class SiriInputType extends Characteristic {
    static readonly PUSH_BUTTON_TRIGGERED_APPLE_TV = 0;
    static readonly UUID: string;
    constructor();
}
/**
 * Service "Target Control Management"
 */
export declare class TargetControlManagement extends Service {
    static readonly UUID: string;
    constructor(displayName: string, subtype: string);
}
/**
 * Service "Target Control"
 */
export declare class TargetControl extends Service {
    static readonly UUID: string;
    constructor(displayName: string, subtype: string);
}
/**
 * Service "Audio Stream Management"
 */
export declare class AudioStreamManagement extends Service {
    static readonly UUID: string;
    constructor(displayName: string, subtype: string);
}
/**
 * Service "Siri"
 */
export declare class Siri extends Service {
    static readonly UUID: string;
    constructor(displayName: string, subtype: string);
}
//# sourceMappingURL=HomeKit-Remote.d.ts.map