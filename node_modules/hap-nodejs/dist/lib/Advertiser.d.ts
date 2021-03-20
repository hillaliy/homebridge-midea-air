import { BonjourHap, MulticastOptions, Service } from 'bonjour-hap';
import { Nullable } from '../types';
import { AccessoryInfo } from './model/AccessoryInfo';
/**
 * Advertiser uses mdns to broadcast the presence of an Accessory to the local network.
 *
 * Note that as of iOS 9, an accessory can only pair with a single client. Instead of pairing your
 * accessories with multiple iOS devices in your home, Apple intends for you to use Home Sharing.
 * To support this requirement, we provide the ability to be "discoverable" or not (via a "service flag" on the
 * mdns payload).
 */
export declare class Advertiser {
    accessoryInfo: AccessoryInfo;
    static protocolVersion: string;
    static protocolVersionService: string;
    _bonjourService: BonjourHap;
    _advertisement: Nullable<Service>;
    _setupHash: string;
    constructor(accessoryInfo: AccessoryInfo, mdnsConfig: MulticastOptions);
    startAdvertising: (port: number) => void;
    isAdvertising: () => boolean;
    updateAdvertisement: () => void;
    stopAdvertising: () => void;
    _computeSetupHash: () => string;
}
//# sourceMappingURL=Advertiser.d.ts.map