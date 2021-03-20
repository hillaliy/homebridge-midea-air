/// <reference path="../@types/bonjour-hap.d.ts" />
import './lib/gen';
import * as accessoryLoader from './lib/AccessoryLoader';
import * as uuidFunctions from './lib/util/uuid';
import * as legacyTypes from './accessories/types';
export declare const AccessoryLoader: typeof accessoryLoader;
export declare const uuid: typeof uuidFunctions;
export * from './lib/model/HAPStorage';
export * from './lib/Accessory';
export * from './lib/Bridge';
export * from './lib/Service';
export * from './lib/Characteristic';
export * from './lib/AccessoryLoader';
export * from './lib/camera';
export * from './lib/tv/AccessControlManagement';
export * from './lib/HAPServer';
export * from './lib/gen';
export * from './lib/datastream';
export * from './lib/controller';
export * from './lib/util/clone';
export * from './lib/util/once';
export * from './lib/util/tlv';
export * from './types';
export declare const LegacyTypes: typeof legacyTypes;
/**
 *
 * @param {string} storagePath
 * @deprecated the need to manually initialize the internal storage was removed. If you want to set a custom
 *  storage path location, please use {@link HAPStorage.setCustomStoragePath} directly.
 */
export declare function init(storagePath?: string): void;
//# sourceMappingURL=index.d.ts.map