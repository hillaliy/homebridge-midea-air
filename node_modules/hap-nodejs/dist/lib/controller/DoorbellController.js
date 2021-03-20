"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoorbellController = void 0;
var CameraController_1 = require("./CameraController");
var HomeKit_1 = require("../gen/HomeKit");
var Service_1 = require("../Service");
var Characteristic_1 = require("../Characteristic");
var DoorbellController = /** @class */ (function (_super) {
    __extends(DoorbellController, _super);
    function DoorbellController(options) {
        return _super.call(this, options) || this;
    }
    DoorbellController.prototype.ringDoorbell = function () {
        this.doorbellService.updateCharacteristic(Characteristic_1.Characteristic.ProgrammableSwitchEvent, HomeKit_1.ProgrammableSwitchEvent.SINGLE_PRESS);
    };
    DoorbellController.prototype.constructServices = function () {
        this.doorbellService = new Service_1.Service.Doorbell('', '');
        this.doorbellService.setPrimaryService();
        var serviceMap = _super.prototype.constructServices.call(this);
        serviceMap.doorbell = this.doorbellService;
        return serviceMap;
    };
    DoorbellController.prototype.initWithServices = function (serviceMap) {
        var updatedServiceMap = _super.prototype.initWithServices.call(this, serviceMap);
        this.doorbellService = serviceMap.doorbell;
        if (!this.doorbellService) { // see NOTICE above
            this.doorbellService = new Service_1.Service.Doorbell('', '');
            this.doorbellService.setPrimaryService();
            serviceMap.doorbell = this.doorbellService;
            return serviceMap;
        }
        return updatedServiceMap;
    };
    DoorbellController.prototype.migrateFromDoorbell = function (serviceMap) {
        return false;
    };
    DoorbellController.prototype.configureServices = function () {
        _super.prototype.configureServices.call(this);
        this.doorbellService.getCharacteristic(Characteristic_1.Characteristic.ProgrammableSwitchEvent)
            .on("get" /* GET */, function (callback) {
            callback(null, null); // a value of null represent nothing is pressed
        });
    };
    return DoorbellController;
}(CameraController_1.CameraController));
exports.DoorbellController = DoorbellController;
//# sourceMappingURL=DoorbellController.js.map