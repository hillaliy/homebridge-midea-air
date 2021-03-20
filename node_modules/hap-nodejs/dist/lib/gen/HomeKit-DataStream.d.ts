import { Characteristic } from '../Characteristic';
import { Service } from "../Service";
/**
 * Characteristic "Supported Data Stream Transport Configuration"
 */
export declare class SupportedDataStreamTransportConfiguration extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Characteristic "Setup Data Stream Transport"
 */
export declare class SetupDataStreamTransport extends Characteristic {
    static readonly UUID: string;
    constructor();
}
/**
 * Service "Data Stream Transport Management"
 */
export declare class DataStreamTransportManagement extends Service {
    static readonly UUID: string;
    constructor(displayName: string, subtype: string);
}
//# sourceMappingURL=HomeKit-DataStream.d.ts.map