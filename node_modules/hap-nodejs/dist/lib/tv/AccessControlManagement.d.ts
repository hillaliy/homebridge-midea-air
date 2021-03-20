import { AccessControl } from "../gen/HomeKit";
import { EventEmitter } from "../EventEmitter";
/**
 * This defines the Access Level for TVs and Speakers. It is pretty much only used for the AirPlay 2 protocol
 * so this information is not really useful.
 */
export declare const enum AccessLevel {
    /**
     * This access level is set when the users selects "Anyone" or "Anyone On The Same Network"
     * in the Access Control settings.
     */
    ANYONE = 0,
    /**
     * This access level is set when the users selects "Only People Sharing this Home" in the
     * Access Control settings.
     * On this level password setting is ignored.
     * Requests to the HAPServer can only come from Home members anyways, so there is no real use to it.
     * This is pretty much only used for the AirPlay 2 protocol.
     */
    HOME_MEMBERS_ONLY = 1
}
export declare const enum AccessControlEvent {
    ACCESS_LEVEL_UPDATED = "update-control-level",
    PASSWORD_SETTING_UPDATED = "update-password"
}
export declare type AccessControlEventMap = {
    [AccessControlEvent.ACCESS_LEVEL_UPDATED]: (accessLevel: AccessLevel) => void;
    [AccessControlEvent.PASSWORD_SETTING_UPDATED]: (password: string | undefined, passwordRequired: boolean) => void;
};
export declare class AccessControlManagement extends EventEmitter<AccessControlEventMap> {
    private readonly accessControlService;
    /**
     * The current access level set for the Home
     */
    private accessLevel;
    private passwordRequired;
    private password?;
    private lastPasswordTLVReceived;
    /**
     * Instantiates a new AccessControlManagement.
     *
     * @param {boolean} password - if set to true the service will listen for password settings
     */
    constructor(password?: boolean);
    /**
     * Instantiates a new AccessControlManagement.
     *
     * @param {boolean} password - if set to true the service will listen for password settings
     * @param {AccessControl} service - supply your own instance to sideload the AccessControl service
     */
    constructor(password?: boolean, service?: AccessControl);
    /**
     * @returns the AccessControl service
     */
    getService(): AccessControl;
    /**
     * @returns the current {@link AccessLevel} configured for the Home
     */
    getAccessLevel(): AccessLevel;
    /**
     * @returns the current password configured for the Home or `undefined` if no password is required.
     */
    getPassword(): string | undefined;
    private handleAccessLevelChange;
    private handlePasswordChange;
    private setupServiceHandlers;
}
//# sourceMappingURL=AccessControlManagement.d.ts.map