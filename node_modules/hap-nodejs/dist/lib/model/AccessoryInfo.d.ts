/// <reference types="node" />
import { Categories } from '../Accessory';
import { Session } from "../util/eventedhttp";
import { MacAddress } from "../../types";
export declare const enum PermissionTypes {
    USER = 0,
    ADMIN = 1
}
export declare type PairingInformation = {
    username: string;
    publicKey: Buffer;
    permission: PermissionTypes;
};
/**
 * AccessoryInfo is a model class containing a subset of Accessory data relevant to the internal HAP server,
 * such as encryption keys and username. It is persisted to disk.
 */
export declare class AccessoryInfo {
    static readonly deviceIdPattern: RegExp;
    username: MacAddress;
    displayName: string;
    category: Categories;
    pincode: string;
    signSk: Buffer;
    signPk: Buffer;
    pairedClients: Record<string, PairingInformation>;
    pairedAdminClients: number;
    configVersion: number;
    configHash: string;
    setupID: string;
    private constructor();
    /**
     * Add a paired client to memory.
     * @param {string} username
     * @param {Buffer} publicKey
     * @param {PermissionTypes} permission
     */
    addPairedClient: (username: string, publicKey: Buffer, permission: PermissionTypes) => void;
    updatePermission: (username: string, permission: PermissionTypes) => void;
    listPairings: () => PairingInformation[];
    /**
     * Remove a paired client from memory.
     * @param controller - the session of the controller initiated the removal of the pairing
     * @param {string} username
     */
    removePairedClient: (controller: Session, username: string) => void;
    _removePairedClient0: (controller: Session, username: string) => void;
    /**
     * Check if username is paired
     * @param username
     */
    isPaired: (username: string) => boolean;
    hasAdminPermissions: (username: string) => boolean;
    getClientPublicKey: (username: string) => Buffer | undefined;
    paired: () => boolean;
    save: () => void;
    static persistKey: (username: MacAddress) => string;
    static create: (username: MacAddress) => AccessoryInfo;
    static load: (username: MacAddress) => AccessoryInfo | null;
    static remove(username: MacAddress): void;
    static assertValidUsername: (username: MacAddress) => void;
}
//# sourceMappingURL=AccessoryInfo.d.ts.map