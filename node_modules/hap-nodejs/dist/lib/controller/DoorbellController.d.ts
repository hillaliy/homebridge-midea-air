import { CameraController, CameraControllerOptions, CameraControllerServiceMap } from "./CameraController";
import { ControllerServiceMap } from "./Controller";
export declare class DoorbellController extends CameraController {
    private doorbellService?;
    constructor(options: CameraControllerOptions);
    ringDoorbell(): void;
    constructServices(): CameraControllerServiceMap;
    initWithServices(serviceMap: CameraControllerServiceMap): void | CameraControllerServiceMap;
    protected migrateFromDoorbell(serviceMap: ControllerServiceMap): boolean;
    configureServices(): void;
}
//# sourceMappingURL=DoorbellController.d.ts.map