import { Characteristic } from '../Characteristic';
import { Service } from '../Service';
/**
 * Characteristic "Active Identifier"
 */
export declare class ActiveIdentifier extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Configured Name"
 */
export declare class ConfiguredName extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Sleep Discovery Mode"
 */
export declare class SleepDiscoveryMode extends Characteristic {
    static readonly NOT_DISCOVERABLE = 0;
    static readonly ALWAYS_DISCOVERABLE = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Closed Captions"
 */
export declare class ClosedCaptions extends Characteristic {
    static readonly DISABLED = 0;
    static readonly ENABLED = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Display Order"
 */
export declare class DisplayOrder extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Media State"
 */
export declare class CurrentMediaState extends Characteristic {
    static readonly PLAY = 0;
    static readonly PAUSE = 1;
    static readonly STOP = 2;
    static readonly LOADING = 4;
    static readonly INTERRUPTED = 5;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Media State"
 */
export declare class TargetMediaState extends Characteristic {
    static readonly PLAY = 0;
    static readonly PAUSE = 1;
    static readonly STOP = 2;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Picture Mode"
 */
export declare class PictureMode extends Characteristic {
    static readonly OTHER = 0;
    static readonly STANDARD = 1;
    static readonly CALIBRATED = 2;
    static readonly CALIBRATED_DARK = 3;
    static readonly VIVID = 4;
    static readonly GAME = 5;
    static readonly COMPUTER = 6;
    static readonly CUSTOM = 7;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Power Mode Selection"
 */
export declare class PowerModeSelection extends Characteristic {
    static readonly SHOW = 0;
    static readonly HIDE = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Remote Key"
 */
export declare class RemoteKey extends Characteristic {
    static readonly REWIND = 0;
    static readonly FAST_FORWARD = 1;
    static readonly NEXT_TRACK = 2;
    static readonly PREVIOUS_TRACK = 3;
    static readonly ARROW_UP = 4;
    static readonly ARROW_DOWN = 5;
    static readonly ARROW_LEFT = 6;
    static readonly ARROW_RIGHT = 7;
    static readonly SELECT = 8;
    static readonly BACK = 9;
    static readonly EXIT = 10;
    static readonly PLAY_PAUSE = 11;
    static readonly INFORMATION = 15;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Input Source Type"
 */
export declare class InputSourceType extends Characteristic {
    static readonly OTHER = 0;
    static readonly HOME_SCREEN = 1;
    static readonly TUNER = 2;
    static readonly HDMI = 3;
    static readonly COMPOSITE_VIDEO = 4;
    static readonly S_VIDEO = 5;
    static readonly COMPONENT_VIDEO = 6;
    static readonly DVI = 7;
    static readonly AIRPLAY = 8;
    static readonly USB = 9;
    static readonly APPLICATION = 10;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Input Device Type"
 */
export declare class InputDeviceType extends Characteristic {
    static readonly OTHER = 0;
    static readonly TV = 1;
    static readonly RECORDING = 2;
    static readonly TUNER = 3;
    static readonly PLAYBACK = 4;
    static readonly AUDIO_SYSTEM = 5;
    static readonly UNKNOWN_6 = 6;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Identifier"
 */
export declare class Identifier extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Current Visibility State"
 */
export declare class CurrentVisibilityState extends Characteristic {
    static readonly SHOWN = 0;
    static readonly HIDDEN = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Target Visibility State"
 */
export declare class TargetVisibilityState extends Characteristic {
    static readonly SHOWN = 0;
    static readonly HIDDEN = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Volume Control Type"
 */
export declare class VolumeControlType extends Characteristic {
    static readonly NONE = 0;
    static readonly RELATIVE = 1;
    static readonly RELATIVE_WITH_CURRENT = 2;
    static readonly ABSOLUTE = 3;
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Volume Selector"
 */
export declare class VolumeSelector extends Characteristic {
    static readonly INCREMENT = 0;
    static readonly DECREMENT = 1;
    static readonly UUID: string;
    constructor();
}
/**
 * Service "Television"
 */
export declare class Television extends Service {
    static readonly UUID: string;
    constructor(displayName: string, subtype: string);
}
/**
 * Service "Input Source"
 */
export declare class InputSource extends Service {
    static readonly UUID: string;
    constructor(displayName: string, subtype: string);
}
/**
 * Service "Television Speaker"
 */
export declare class TelevisionSpeaker extends Service {
    static readonly UUID: string;
    constructor(displayName: string, subtype: string);
}
//# sourceMappingURL=HomeKit-TV.d.ts.map