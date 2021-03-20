"use strict";
// manually created
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
exports.DataStreamTransportManagement = exports.SetupDataStreamTransport = exports.SupportedDataStreamTransportConfiguration = void 0;
var Characteristic_1 = require("../Characteristic");
var Service_1 = require("../Service");
/**
 * Characteristic "Supported Data Stream Transport Configuration"
 */
var SupportedDataStreamTransportConfiguration = /** @class */ (function (_super) {
    __extends(SupportedDataStreamTransportConfiguration, _super);
    function SupportedDataStreamTransportConfiguration() {
        var _this = _super.call(this, 'Supported Data Stream Transport Configuration', SupportedDataStreamTransportConfiguration.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* PAIRED_READ */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SupportedDataStreamTransportConfiguration.UUID = '00000130-0000-1000-8000-0026BB765291';
    return SupportedDataStreamTransportConfiguration;
}(Characteristic_1.Characteristic));
exports.SupportedDataStreamTransportConfiguration = SupportedDataStreamTransportConfiguration;
Characteristic_1.Characteristic.SupportedDataStreamTransportConfiguration = SupportedDataStreamTransportConfiguration;
/**
 * Characteristic "Setup Data Stream Transport"
 */
var SetupDataStreamTransport = /** @class */ (function (_super) {
    __extends(SetupDataStreamTransport, _super);
    function SetupDataStreamTransport() {
        var _this = _super.call(this, 'Setup Data Stream Transport', SetupDataStreamTransport.UUID) || this;
        _this.setProps({
            format: "tlv8" /* TLV8 */,
            perms: ["pr" /* PAIRED_READ */, "pw" /* PAIRED_WRITE */, "wr" /* WRITE_RESPONSE */]
        });
        _this.value = _this.getDefaultValue();
        return _this;
    }
    SetupDataStreamTransport.UUID = '00000131-0000-1000-8000-0026BB765291';
    return SetupDataStreamTransport;
}(Characteristic_1.Characteristic));
exports.SetupDataStreamTransport = SetupDataStreamTransport;
Characteristic_1.Characteristic.SetupDataStreamTransport = SetupDataStreamTransport;
/**
 * Service "Data Stream Transport Management"
 */
var DataStreamTransportManagement = /** @class */ (function (_super) {
    __extends(DataStreamTransportManagement, _super);
    function DataStreamTransportManagement(displayName, subtype) {
        var _this = _super.call(this, displayName, DataStreamTransportManagement.UUID, subtype) || this;
        // Required Characteristics
        _this.addCharacteristic(Characteristic_1.Characteristic.SupportedDataStreamTransportConfiguration);
        _this.addCharacteristic(Characteristic_1.Characteristic.SetupDataStreamTransport);
        _this.addCharacteristic(Characteristic_1.Characteristic.Version);
        return _this;
    }
    DataStreamTransportManagement.UUID = '00000129-0000-1000-8000-0026BB765291';
    return DataStreamTransportManagement;
}(Service_1.Service));
exports.DataStreamTransportManagement = DataStreamTransportManagement;
Service_1.Service.DataStreamTransportManagement = DataStreamTransportManagement;
//# sourceMappingURL=HomeKit-DataStream.js.map