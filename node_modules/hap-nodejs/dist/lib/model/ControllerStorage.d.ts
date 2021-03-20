import { MacAddress } from "../../types";
import { SerializableController } from "../controller";
import { Accessory } from "../Accessory";
export declare class ControllerStorage {
    private readonly accessoryUUID;
    private initialized;
    private username?;
    private fileCreated;
    purgeUnidentifiedAccessoryData: boolean;
    private trackedControllers;
    private controllerData;
    private restoredAccessories?;
    private parent?;
    private linkedAccessories?;
    constructor(accessory: Accessory);
    linkAccessory(accessory: Accessory): void;
    trackController(controller: SerializableController): void;
    purgeControllerData(controller: SerializableController): void;
    private handleStateChange;
    private restoreController;
    /**
     * Called when this particular Storage object is feed with data loaded from disk.
     * This method is only called once.
     *
     * @param data - array of {@link StoredControllerData}. undefined if nothing was stored on disk for this particular storage object
     */
    private init;
    load(username: MacAddress): void;
    save(): void;
    static persistKey(username: MacAddress): string;
    static remove(username: MacAddress): void;
}
//# sourceMappingURL=ControllerStorage.d.ts.map