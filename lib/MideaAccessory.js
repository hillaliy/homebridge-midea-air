"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MideaAccessory = void 0;
const MideaDeviceType_1 = require("./enums/MideaDeviceType");
const MideaSwingMode_1 = require("./enums/MideaSwingMode");
const MideaOperationalMode_1 = require("./enums/MideaOperationalMode");
class MideaAccessory {
    constructor(platform, accessory, _deviceId, _deviceType, _name, _userId) {
        this.platform = platform;
        this.accessory = accessory;
        this._deviceId = _deviceId;
        this._deviceType = _deviceType;
        this._name = _name;
        this._userId = _userId;
        this.deviceId = '';
        this.deviceType = MideaDeviceType_1.MideaDeviceType.AirConditioner;
        this.targetTemperature = 0;
        this.indoorTemperature = 0;
        this.useFahrenheit = false;
        this.fanSpeed = 0;
        this.fanOnlyMode = false;
        this.fanOnlyModeName = '';
        this.temperatureSteps = 1;
        this.supportedSwingMode = MideaSwingMode_1.MideaSwingMode.None;
        this.operationalMode = MideaOperationalMode_1.MideaOperationalMode.Off;
        this.swingMode = 0;
        this.ecoMode = false;
        this.name = '';
        this.currentHumidity = 0;
        this.targetHumidity = 0;
        this.waterLevel = 0;
        this.userId = '';
        this.firmwareVersion = '1.0.0';
        this.deviceId = _deviceId;
        this.deviceType = _deviceType;
        this.name = _name;
        this.userId = _userId;
        // Check for device specific overrides
        var smode = this.platform.getDeviceSpecificOverrideValue(this.deviceId, 'supportedSwingMode');
        if (smode) {
            switch (smode) {
                case 'Vertical':
                    this.supportedSwingMode = MideaSwingMode_1.MideaSwingMode.Vertical;
                    break;
                case 'Horizontal':
                    this.supportedSwingMode = MideaSwingMode_1.MideaSwingMode.Horizontal;
                    break;
                case 'Both':
                    this.supportedSwingMode = MideaSwingMode_1.MideaSwingMode.Both;
                    break;
                default:
                    this.supportedSwingMode = MideaSwingMode_1.MideaSwingMode.None;
                    break;
            }
        }
        // var tsteps = this.platform.getDeviceSpecificOverrideValue(this.deviceId, 'temperatureSteps');
        // if (tsteps) {
        // 	this.temperatureSteps = tsteps;
        // }
        this.platform.log.debug('created device', this.name, 'with id', this.deviceId, 'and type', this.deviceType);
        this.accessory.getService(this.platform.Service.AccessoryInformation)
            .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Midea')
            .setCharacteristic(this.platform.Characteristic.FirmwareRevision, '1.0.0')
            .setCharacteristic(this.platform.Characteristic.Model, 'Air Conditioner')
            .setCharacteristic(this.platform.Characteristic.SerialNumber, this.deviceId);
        this.platform.log.debug("Device type is ", this.deviceType);
        switch (this.deviceType) {
            case MideaDeviceType_1.MideaDeviceType.Dehumidifier:
                {
                    this.accessory.getService(this.platform.Service.AccessoryInformation).setCharacteristic(this.platform.Characteristic.Model, 'Dehumidifier');
                    this.service = this.accessory.getService(this.platform.Service.HumidifierDehumidifier) || this.accessory.addService(this.platform.Service.HumidifierDehumidifier);
                }
                break;
            case MideaDeviceType_1.MideaDeviceType.AirConditioner:
                {
                    this.service = this.accessory.getService(this.platform.Service.HeaterCooler) || this.accessory.addService(this.platform.Service.HeaterCooler);
                    if (this.platform.getDeviceSpecificOverrideValue(this.deviceId, 'fanOnlyMode') == true) {
                        this.fanService = this.accessory.getService(this.platform.Service.Fanv2) || this.accessory.addService(this.platform.Service.Fanv2);
                        this.fanService.setCharacteristic(this.platform.Characteristic.Name, this.platform.getDeviceSpecificOverrideValue(this.deviceId, 'fanOnlyModeName') || 'Fan');
                    }
                }
                break;
            default: {
                this.platform.log.error('Unsupported device type ', MideaDeviceType_1.MideaDeviceType[this.deviceType]);
                return;
            }
        }
        this.service.setCharacteristic(this.platform.Characteristic.Name, this.name);
        this.service.getCharacteristic(this.platform.Characteristic.Active)
            .on('get', this.handleActiveGet.bind(this))
            .on('set', this.handleActiveSet.bind(this));
        switch (this.deviceType) {
            case MideaDeviceType_1.MideaDeviceType.Dehumidifier:
                {
                    this.service.getCharacteristic(this.platform.Characteristic.CurrentRelativeHumidity)
                        .on('get', this.handleCurrentRelativeHumidityGet.bind(this));
                    this.service.getCharacteristic(this.platform.Characteristic.TargetRelativeHumidity)
                        .on('set', this.handleTargetRelativeHumiditySet.bind(this));
                    this.service.getCharacteristic(this.platform.Characteristic.CurrentHumidifierDehumidifierState)
                        .on('get', this.handleCurrentHumidifierDehumidifierStateGet.bind(this));
                    this.service.getCharacteristic(this.platform.Characteristic.TargetHumidifierDehumidifierState)
                        .on('get', this.handleTargetHumidifierDehumidifierStateGet.bind(this))
                        .on('set', this.handleTargetHumidifierDehumidifierStateSet.bind(this));
                    this.service.getCharacteristic(this.platform.Characteristic.RelativeHumidityDehumidifierThreshold)
                        .on('get', this.handleRelativeDehumidifierThresholdGet.bind(this))
                        .on('set', this.handleRelativeDehumidifierThresholdSet.bind(this));
                    this.service.getCharacteristic(this.platform.Characteristic.RelativeHumidityHumidifierThreshold)
                        .on('get', this.handleRelativeHumidifierThresholdGet.bind(this))
                        .on('set', this.handleRelativeHumidifierThresholdSet.bind(this));
                    this.service.getCharacteristic(this.platform.Characteristic.WaterLevel).
                        on('get', this.handleWaterLevelGet.bind(this));
                }
                break;
            case MideaDeviceType_1.MideaDeviceType.AirConditioner:
                {
                    this.service.getCharacteristic(this.platform.Characteristic.CurrentHeaterCoolerState)
                        .on('get', this.handleCurrentHeaterCoolerStateGet.bind(this));
                    this.service.getCharacteristic(this.platform.Characteristic.TargetHeaterCoolerState)
                        .on('get', this.handleTargetHeaterCoolerStateGet.bind(this))
                        .on('set', this.handleTargetHeaterCoolerStateSet.bind(this))
                        .setProps({
                        validValues: [
                            this.platform.Characteristic.TargetHeaterCoolerState.AUTO,
                            this.platform.Characteristic.TargetHeaterCoolerState.HEAT,
                            this.platform.Characteristic.TargetHeaterCoolerState.COOL
                        ]
                    });
                    this.service.getCharacteristic(this.platform.Characteristic.CurrentTemperature)
                        .on('get', this.handleCurrentTemperatureGet.bind(this));
                    this.service.getCharacteristic(this.platform.Characteristic.RotationSpeed)
                        .on('get', this.handleRotationSpeedGet.bind(this))
                        .on('set', this.handleRotationSpeedSet.bind(this));
                    this.service.getCharacteristic(this.platform.Characteristic.SwingMode)
                        .on('get', this.handleSwingModeGet.bind(this))
                        .on('set', this.handleSwingModeSet.bind(this));
                    this.service.getCharacteristic(this.platform.Characteristic.CoolingThresholdTemperature)
                        .on('get', this.handleCoolingThresholdTemperatureGet.bind(this))
                        .on('set', this.handleCoolingThresholdTemperatureSet.bind(this))
                        .setProps({
                        minStep: this.temperatureSteps,
                        minValue: 17,
                        maxValue: 30
                    });
                    this.service.getCharacteristic(this.platform.Characteristic.HeatingThresholdTemperature)
                        .on('get', this.handleHeatingThresholdTemperatureGet.bind(this))
                        .on('set', this.handleHeatingThresholdTemperatureSet.bind(this))
                        .setProps({
                        minStep: this.temperatureSteps,
                        minValue: 17,
                        maxValue: 30
                    });
                    this.service.getCharacteristic(this.platform.Characteristic.TemperatureDisplayUnits)
                        .on('get', this.handleTemperatureDisplayUnitsGet.bind(this))
                        .on('set', this.handleTemperatureDisplayUnitsSet.bind(this))
                        .setProps({
                        validValues: [
                            this.platform.Characteristic.TemperatureDisplayUnits.FAHRENHEIT,
                            this.platform.Characteristic.TemperatureDisplayUnits.CELSIUS
                        ]
                    });
                    if (this.fanService != undefined) {
                        // for fan only mode
                        this.fanService.getCharacteristic(this.platform.Characteristic.Active)
                            .on('get', this.handleFanActiveGet.bind(this))
                            .on('set', this.handleFanActiveSet.bind(this));
                    }
                }
                break;
            default: {
                this.platform.log.warn('Unsupported device type', MideaDeviceType_1.MideaDeviceType[this.deviceType]);
            }
        }
    }
    // Handle requests to get the current value of the "Active" characteristic
    handleActiveGet(callback) {
        this.platform.log.debug('Triggered GET Active, returning', this.powerState);
        // set this to a valid value for Active
        if (this.powerState == 1) {
            callback(null, this.platform.Characteristic.Active.ACTIVE);
        }
        else {
            callback(null, this.platform.Characteristic.Active.INACTIVE);
        }
    }
    // Handle requests to set the "Active" characteristic
    handleActiveSet(value, callback) {
        this.platform.log.debug('Triggered SET Active:', value);
        if (this.powerState != value) {
            this.powerState = value;
            this.platform.sendUpdateToDevice(this);
        }
        callback(null, value);
    }
    // Handle requests to get the current value of the "Current Heater Cooler State" characteristic
    handleCurrentHeaterCoolerStateGet(callback) {
        this.platform.log.debug('Triggered GET CurrentHeaterCoolerState');
        // set this to a valid value for CurrentHeaterCoolerState
        let currentValue;
        if (this.powerState == this.platform.Characteristic.Active.INACTIVE) {
            currentValue = this.platform.Characteristic.CurrentHeaterCoolerState.INACTIVE;
        }
        else if (this.operationalMode == MideaOperationalMode_1.MideaOperationalMode.Cooling) {
            currentValue = this.platform.Characteristic.CurrentHeaterCoolerState.COOLING;
        }
        else if (this.operationalMode == MideaOperationalMode_1.MideaOperationalMode.Heating) {
            currentValue = this.platform.Characteristic.CurrentHeaterCoolerState.HEATING;
        }
        callback(null, currentValue);
    }
    // Handle requests to get the current value of the "Target Heater Cooler State" characteristic
    handleTargetHeaterCoolerStateGet(callback) {
        this.platform.log.debug('Triggered GET TargetHeaterCoolerState while powerState is', this.powerState);
        // set this to a valid value for TargetHeaterCoolerState
        let currentValue;
        if (this.powerState == this.platform.Characteristic.Active.INACTIVE) {
            currentValue = this.platform.Characteristic.CurrentHeaterCoolerState.INACTIVE;
        }
        else if (this.operationalMode == MideaOperationalMode_1.MideaOperationalMode.Cooling) {
            currentValue = this.platform.Characteristic.TargetHeaterCoolerState.COOL;
        }
        else if (this.operationalMode == MideaOperationalMode_1.MideaOperationalMode.Heating) {
            currentValue = this.platform.Characteristic.TargetHeaterCoolerState.HEAT;
        }
        else if (this.operationalMode == MideaOperationalMode_1.MideaOperationalMode.Auto) {
            currentValue = this.platform.Characteristic.TargetHeaterCoolerState.AUTO;
        }
        callback(null, currentValue);
    }
    // Handle requests to set the "Target Heater Cooler State" characteristic
    handleTargetHeaterCoolerStateSet(value, callback) {
        this.platform.log.debug('Triggered SET TargetHeaterCoolerState:', value);
        switch (value) {
            case this.platform.Characteristic.CurrentHeaterCoolerState.INACTIVE:
                this.powerState = this.platform.Characteristic.Active.INACTIVE;
                break;
            case this.platform.Characteristic.TargetHeaterCoolerState.COOL:
                this.powerState = this.platform.Characteristic.CurrentHeaterCoolerState.COOLING;
                break;
            case this.platform.Characteristic.TargetHeaterCoolerState.HEAT:
                this.powerState = this.platform.Characteristic.CurrentHeaterCoolerState.HEATING;
                break;
            case this.platform.Characteristic.TargetHeaterCoolerState.AUTO:
                if (this.indoorTemperature > this.targetTemperature) {
                    this.powerState = this.platform.Characteristic.CurrentHeaterCoolerState.COOLING;
                }
                else
                    this.powerState = this.platform.Characteristic.CurrentHeaterCoolerState.HEATING;
                break;
            default:
                this.powerState = this.platform.Characteristic.Active.ACTIVE;
                break;
        }
        this.platform.sendUpdateToDevice(this);
        callback(null, value);
    }
    // Handle requests to get the current value of the "Current Temperature" characteristic
    handleCurrentTemperatureGet(callback) {
        this.platform.log.debug('Triggered GET CurrentTemperature');
        // set this to a valid value for CurrentTemperature
        const currentValue = this.indoorTemperature;
        callback(null, currentValue);
    }
    // Handle requests to get the current value of the "RotationSpeed" characteristic
    handleRotationSpeedGet(callback) {
        this.platform.log.debug('Triggered GET RotationSpeed');
        // set this to a valid value for RotationSpeed
        // values from device are 20.0="Silent",40.0="Low",60.0="Medium",80.0="High",102.0="Auto"
        // convert to good usable slider in homekit in percent
        let currentValue = 0;
        if (this.fanSpeed == 40) {
            currentValue = 25;
        }
        else if (this.fanSpeed == 60) {
            currentValue = 50;
        }
        else if (this.fanSpeed == 80) {
            currentValue = 75;
        }
        else {
            currentValue = 100;
        }
        callback(null, currentValue);
    }
    // Handle requests to set the "RotationSpeed" characteristic
    handleRotationSpeedSet(value, callback) {
        this.platform.log.debug('Triggered SET RotationSpeed:', value);
        if (this.fanSpeed != value) {
            // transform values in percent
            // values from device are 20.0="Silent",40.0="Low",60.0="Medium",80.0="High",102.0="Auto"
            // Silent are not now available in devices?
            if (value <= 25) {
                value = 40;
            }
            else if (value <= 50) {
                value = 60;
            }
            else if (value <= 75) {
                value = 80;
            }
            else {
                value = 102;
            }
            this.fanSpeed = value;
            this.platform.sendUpdateToDevice(this);
        }
        callback(null, value);
    }
    // Handle requests to get the current value of the "swingMode" characteristic
    handleSwingModeGet(callback) {
        this.platform.log.debug('Triggered GET swingMode');
        // set this to a valid value for swingMode
        // values from device are 0.0="Off",12.0="Vertical",3.0="Horizontal",15.0="Both"
        let currentValue = this.platform.Characteristic.SwingMode.SWING_DISABLED;
        if (this.swingMode != 0) {
            currentValue = this.platform.Characteristic.SwingMode.SWING_ENABLED;
        }
        callback(null, currentValue);
    }
    // Handle requests to set the "swingMode" characteristic
    handleSwingModeSet(value, callback) {
        this.platform.log.debug('Triggered SET swingMode:', value);
        // convert this.swingMode to a 0/1
        var currentSwingMode = this.swingMode != 0 ? 1 : 0;
        if (currentSwingMode != value) {
            if (value == 0) {
                this.swingMode = 0;
            }
            else {
                this.swingMode = this.supportedSwingMode;
            }
            this.platform.sendUpdateToDevice(this);
        }
        callback(null, value);
    }
    // Handle requests to get the current value of the "CoolingThresholdTemperature" characteristic
    handleCoolingThresholdTemperatureGet(callback) {
        this.platform.log.debug('Triggered GET handleCoolingThresholdTemperature');
        // set this to a valid value for TargetTemperature
        const currentValue = this.targetTemperature;
        callback(null, currentValue);
    }
    // Handle requests to set the "CoolingThresholdTemperature" characteristic
    handleCoolingThresholdTemperatureSet(value, callback) {
        this.platform.log.debug('Triggered SET handleCoolingThresholdTemperature:', value);
        if (this.targetTemperature != value) {
            this.targetTemperature = value;
            this.platform.sendUpdateToDevice(this);
        }
        callback(null, value);
    }
    // Handle requests to get the current value of the "HeatingThresholdTemperature" characteristic
    handleHeatingThresholdTemperatureGet(callback) {
        this.platform.log.debug('Triggered GET handleHeatingThresholdTemperature');
        // set this to a valid value for TargetTemperature
        const currentValue = this.targetTemperature;
        callback(null, currentValue);
    }
    // Handle requests to set the "HeatingThresholdTemperature" characteristic
    handleHeatingThresholdTemperatureSet(value, callback) {
        this.platform.log.debug('Triggered SET handleHeatingThresholdTemperature:', value);
        if (this.targetTemperature != value) {
            this.targetTemperature = value;
            this.platform.sendUpdateToDevice(this);
        }
        callback(null, value);
    }
    // Handle requests to get the current value of the "Temperature Display Units" characteristic
    handleTemperatureDisplayUnitsGet(callback) {
        this.platform.log.debug('Triggered GET TemperatureDisplayUnits', this.useFahrenheit);
        // set this to a valid value for TemperatureDisplayUnits
        if (this.useFahrenheit == true) {
            callback(null, this.platform.Characteristic.TemperatureDisplayUnits.FAHRENHEIT);
        }
        else {
            callback(null, this.platform.Characteristic.TemperatureDisplayUnits.CELSIUS);
        }
    }
    // Handle requests to set the "Temperature Display Units" characteristic
    handleTemperatureDisplayUnitsSet(value, callback) {
        this.platform.log.debug('Triggered SET TemperatureDisplayUnits:', value);
        if (value == this.platform.Characteristic.TemperatureDisplayUnits.FAHRENHEIT) {
            this.useFahrenheit = true;
        }
        else {
            this.useFahrenheit = false;
        }
        this.platform.sendUpdateToDevice(this);
        callback(null, value);
    }
    // Fan only mode
    // Handle requests to get the current value of the "On" characteristic
    handleFanActiveGet(callback) {
        this.platform.log.debug('Triggered GET Fan');
        // workaround to get the "fan only mode" from device
        // device operation values are 1.0="Auto",2.0="Cool",3.0="Dry",4.0="Heat",5.0="Fan"
        // set this to a valid value for Active
        if (this.operationalMode == MideaOperationalMode_1.MideaOperationalMode.FanOnly) {
            callback(null, this.platform.Characteristic.Active.ACTIVE);
        }
        else {
            callback(null, this.platform.Characteristic.Active.INACTIVE);
        }
    }
    // Handle requests to set the "On" characteristic
    handleFanActiveSet(value, callback) {
        this.platform.log.debug('Triggered SET Fan:', value);
        // workaround to get the "fan only mode" from device
        // device operation values are 1.0="Auto",2.0="Cool",3.0="Dry",4.0="Heat",5.0="Fan"
        if (value == this.platform.Characteristic.Active.ACTIVE) {
            this.operationalMode = MideaOperationalMode_1.MideaOperationalMode.FanOnly;
        }
        else {
            this.operationalMode = MideaOperationalMode_1.MideaOperationalMode.Cooling;
        }
        this.platform.sendUpdateToDevice(this);
        callback(null, value);
    }
    // HumidifierDehumidifier
    // TODO implement Auto (should map to Smart mode) and HUMIDIFIER_OR_DEHUMIDIFIER/HUMIDIFIER/DEHUMIDIFIER (should map to Target mode) - do not map to dry (can't handle fan speed) or maybe play with pre-setting a fan speed combination
    // From Homebridge:
    // export declare class TargetHumidifierDehumidifierState extends Characteristic {
    // 	/**
    // 	 * @deprecated Removed in iOS 11. Use HUMIDIFIER_OR_DEHUMIDIFIER instead.
    // 	 */
    // 	static readonly AUTO = 0;
    // 	static readonly HUMIDIFIER_OR_DEHUMIDIFIER = 0;
    // 	static readonly HUMIDIFIER = 1;
    // 	static readonly DEHUMIDIFIER = 2;
    // 	static readonly UUID: string;
    // 	constructor();
    // }
    handleCurrentRelativeHumidityGet(callback) {
        this.platform.log.debug(`Triggered GET CurrentRelativeHumidity (currently set to ${this.currentHumidity})`);
        callback(null, this.currentHumidity);
    }
    handleTargetRelativeHumiditySet(value, callback) {
        this.platform.log.debug(`Triggered SET TargetRelativeHumidity (currently set to ${this.currentHumidity})`);
        callback(null, this.targetHumidity);
        this.targetHumidity = value;
        this.platform.sendUpdateToDevice(this);
    }
    handleCurrentHumidifierDehumidifierStateGet(callback) {
        this.platform.log.debug('Triggered GET CurrentHumidifierDehumidifierState');
        callback(null, this.operationalMode);
    }
    handleTargetHumidifierDehumidifierStateGet(callback) {
        this.platform.log.debug('Triggered GET TargetHumidifierDehumidifierState');
        callback(null, this.operationalMode);
    }
    handleTargetHumidifierDehumidifierStateSet(value, callback) {
        this.platform.log.debug('Triggered SET TargetHumidifierDehumidifierState');
        callback(null, this.operationalMode);
        // this.operationalMode = value
        // this.platform.sendUpdateToDevice(this);
    }
    handleRelativeDehumidifierThresholdGet(callback) {
        this.platform.log.debug('Triggered GET RelativeDehumidifierThreshold. Humidity:', this.targetHumidity);
        callback(null, this.targetHumidity);
    }
    handleRelativeDehumidifierThresholdSet(value, callback) {
        this.platform.log.debug('Triggered SET RelativeDehumidifierThreshold. Target Humidity:', value);
        callback(null, this.targetHumidity);
        this.targetHumidity = value;
        this.platform.sendUpdateToDevice(this);
    }
    handleRelativeHumidifierThresholdGet(callback) {
        this.platform.log.debug('Triggered GET RelativeHumidifierThreshold. Humidity:', this.targetHumidity);
        callback(null, this.targetHumidity);
    }
    handleRelativeHumidifierThresholdSet(value, callback) {
        this.platform.log.debug('Triggered SET RelativeHumidifierThreshold. Target Humidity:', value);
        callback(null, this.targetHumidity);
        this.targetHumidity = value;
        this.platform.sendUpdateToDevice(this);
    }
    handleWaterLevelGet(callback) {
        this.platform.log.debug(`Triggered GET WaterLevel. WaterLevel: ${this.waterLevel}`);
        callback(null, this.waterLevel);
    }
}
exports.MideaAccessory = MideaAccessory;
