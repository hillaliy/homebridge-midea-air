import { Service, PlatformAccessory, CharacteristicValue, CharacteristicSetCallback, CharacteristicGetCallback, ValueWrapper } from 'homebridge';
import { MideaPlatform } from './MideaPlatform'
import { MideaDeviceType } from './enums/MideaDeviceType'
import { MideaSwingMode } from './enums/MideaSwingMode'
import { MideaOperationalMode } from './enums/MideaOperationalMode'

export class MideaAccessory {

	public deviceId: string = ''
	public deviceType: MideaDeviceType = MideaDeviceType.AirConditioner
	public targetTemperature: number = 0
	public indoorTemperature: number = 0
	public outdoorTemperature: number = 0
	public useFahrenheit: boolean = false

	public fanSpeed: number = 0
	public fanOnlyMode: boolean = false
	public temperatureSteps: number = 1
	public minTemperature: number = 17
	public maxTemperature: number = 30
	public powerState: any
	public supportedSwingMode: MideaSwingMode = MideaSwingMode.None
	public operationalMode: number = MideaOperationalMode.Off
	public currentTarget: number = 0
	public swingMode: number = 0
	public ecoMode: boolean = false
	public name: string = ''
	public userId: string = ''
	public firmwareVersion: string = '1.0.5'

	private service!: Service
	private fanService!: Service

	constructor(
		private readonly platform: MideaPlatform,
		private readonly accessory: PlatformAccessory,
		private _deviceId: string,
		private _deviceType: MideaDeviceType,
		private _name: string,
		private _userId: string
	) {
		this.deviceId = _deviceId
		this.deviceType = _deviceType
		this.name = _name
		this.userId = _userId

		// Check for device specific overrides
		var smode = this.platform.getDeviceSpecificOverrideValue(this.deviceId, 'supportedSwingMode');

		if (smode) {
			switch (smode) {
				case 'Vertical':
					this.supportedSwingMode = MideaSwingMode.Vertical;
					break;
				case 'Horizontal':
					this.supportedSwingMode = MideaSwingMode.Horizontal;
					break;
				case 'Both':
					this.supportedSwingMode = MideaSwingMode.Both;
					break;
				default:
					this.supportedSwingMode = MideaSwingMode.None;
					break;
			}
		}

		// var tsteps = this.platform.getDeviceSpecificOverrideValue(this.deviceId, 'temperatureSteps');
		// if (tsteps) {
		// 	this.temperatureSteps = tsteps;
		// }

		this.platform.log.debug('created device', this.name, 'with id', this.deviceId, 'and type', this.deviceType)

		this.accessory.getService(this.platform.Service.AccessoryInformation)!
			.setCharacteristic(this.platform.Characteristic.Manufacturer, 'Midea')
			.setCharacteristic(this.platform.Characteristic.FirmwareRevision, this.firmwareVersion)
			.setCharacteristic(this.platform.Characteristic.Model, 'Air Conditioner')
			.setCharacteristic(this.platform.Characteristic.SerialNumber, this.deviceId)

		if (this.deviceType == MideaDeviceType.AirConditioner) {
			this.service = this.accessory.getService(this.platform.Service.HeaterCooler) || this.accessory.addService(this.platform.Service.HeaterCooler)
			// if (this.platform.getDeviceSpecificOverrideValue(this.deviceId, 'fanOnlyMode') == true) {
			// 	this.fanService = this.accessory.getService(this.platform.Service.Fanv2) || this.accessory.addService(this.platform.Service.Fanv2);
			// 	this.fanService.setCharacteristic(this.platform.Characteristic.Name, 'Fan');
			// 	this.fanService.getCharacteristic(this.platform.Characteristic.Active)
			// 		.on('get', this.handleFanActiveGet.bind(this))
			// 		.on('set', this.handleFanActiveSet.bind(this));
			// 	this.fanService.getCharacteristic(this.platform.Characteristic.RotationSpeed)
			// 		.on('get', this.handleRotationSpeedGet.bind(this))
			// 		.on('set', this.handleRotationSpeedSet.bind(this));
			// 	this.fanService.getCharacteristic(this.platform.Characteristic.SwingMode)
			// 		.on('get', this.handleSwingModeGet.bind(this))
			// 		.on('set', this.handleSwingModeSet.bind(this));
			// } else {
			// 	this.accessory.removeService(this.fanService);
			// }
			this.service.setCharacteristic(this.platform.Characteristic.Name, this.name);
			this.service.getCharacteristic(this.platform.Characteristic.Active)
				.on('get', this.handleActiveGet.bind(this))
				.on('set', this.handleActiveSet.bind(this));
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
				.on('get', this.handleCurrentTemperatureGet.bind(this))
				.setProps({
					minValue: -100,
					maxValue: 100,
					minStep: 0.1
				})
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
					minValue: this.minTemperature,
					maxValue: this.maxTemperature,
					minStep: this.temperatureSteps
				});
			this.service.getCharacteristic(this.platform.Characteristic.HeatingThresholdTemperature)
				.on('get', this.handleHeatingThresholdTemperatureGet.bind(this))
				.on('set', this.handleHeatingThresholdTemperatureSet.bind(this))
				.setProps({
					minValue: this.minTemperature,
					maxValue: this.maxTemperature,
					minStep: this.temperatureSteps
				});
			// this.service.getCharacteristic(this.platform.Characteristic.TemperatureDisplayUnits)
			// 		.on('get', this.handleTemperatureDisplayUnitsGet.bind(this))
			// 		.on('set', this.handleTemperatureDisplayUnitsSet.bind(this))
			// 		.setProps({
			// 			validValues: [
			// 				this.platform.Characteristic.TemperatureDisplayUnits.FAHRENHEIT,
			// 				this.platform.Characteristic.TemperatureDisplayUnits.CELSIUS
			// 			]
			// 		});
		} else this.platform.log.error('Unsupported device type ', MideaDeviceType[this.deviceType]);
	};

	// Handle requests to get the current value of the "Active" characteristic
	handleActiveGet(callback: CharacteristicGetCallback) {
		this.platform.log.debug('<---------- Current Active State:', this.powerState, '---------->');
		// set this to a valid value for Active
		if (this.powerState == 1) {
			callback(null, this.platform.Characteristic.Active.ACTIVE);
		} else {
			callback(null, this.platform.Characteristic.Active.INACTIVE);
		};
	};
	// Handle requests to set the "Active" characteristic
	handleActiveSet(value: any, callback: CharacteristicSetCallback) {
		this.platform.log.debug('Set Target Active State To:', value);
		if (this.powerState != value) {
			this.powerState = value;
			this.platform.sendUpdateToDevice(this);
		};
		callback(null, value);
	};
	// Handle requests to get the current value of the "Current Heater Cooler State" characteristic
	handleCurrentHeaterCoolerStateGet(callback: CharacteristicSetCallback) {
		this.platform.log.debug('Current HeaterCooler State:', this.operationalMode)
		// set this to a valid value for CurrentHeaterCoolerState
		let currentValue;
		if (this.powerState == MideaOperationalMode.Off) {
			currentValue = this.platform.Characteristic.CurrentHeaterCoolerState.INACTIVE;
		} else if (this.operationalMode == MideaOperationalMode.Cooling) {
			currentValue = this.platform.Characteristic.CurrentHeaterCoolerState.COOLING;
		} else if (this.operationalMode == MideaOperationalMode.Heating) {
			currentValue = this.platform.Characteristic.CurrentHeaterCoolerState.HEATING;
		} else if (this.indoorTemperature > this.targetTemperature) {
			currentValue = this.platform.Characteristic.CurrentHeaterCoolerState.COOLING;
		} else currentValue = this.platform.Characteristic.CurrentHeaterCoolerState.HEATING;
		callback(null, currentValue);
	};
	// Handle requests to get the current value of the "Target Heater Cooler State" characteristic
	handleTargetHeaterCoolerStateGet(callback: CharacteristicGetCallback) {
		this.platform.log.debug('Target HeaterCooler State:', this.operationalMode)
		// set this to a valid value for TargetHeaterCoolerState
		if (this.operationalMode == MideaOperationalMode.Cooling) {
			this.currentTarget = this.platform.Characteristic.TargetHeaterCoolerState.COOL;
		} else if (this.operationalMode == MideaOperationalMode.Heating) {
			this.currentTarget = this.platform.Characteristic.TargetHeaterCoolerState.HEAT;
		} else if (this.operationalMode == MideaOperationalMode.Auto) {
			this.currentTarget = this.platform.Characteristic.TargetHeaterCoolerState.AUTO;
		};
		callback(null, this.currentTarget);
	};
	// Handle requests to set the "Target Heater Cooler State" characteristic
	handleTargetHeaterCoolerStateSet(value: CharacteristicValue, callback: CharacteristicSetCallback) {
		this.platform.log.debug('Set Target HeaterCooler State To:', value)
		if (value != this.currentTarget) {
			switch (value) {
				case value = this.platform.Characteristic.TargetHeaterCoolerState.AUTO: {
					this.operationalMode = MideaOperationalMode.Auto;
					this.platform.sendUpdateToDevice(this);
					break;
				};
				case value = this.platform.Characteristic.TargetHeaterCoolerState.HEAT: {
					this.operationalMode = MideaOperationalMode.Heating;
					this.platform.sendUpdateToDevice(this);
					break;
				};
				case value = this.platform.Characteristic.TargetHeaterCoolerState.COOL: {
					this.operationalMode = MideaOperationalMode.Cooling;
					this.platform.sendUpdateToDevice(this);
					break;
				};
			};
			callback(null, value);
		};
	};
	// Handle requests to get the current value of the "Current Temperature" characteristic
	handleCurrentTemperatureGet(callback: CharacteristicGetCallback) {
		this.platform.log.debug('Indoor Temperature:', this.indoorTemperature + '˚C');
		// this.platform.log.debug('Outdoor Temperature:', this.outdoorTemperature + '˚C');
		// set this to a valid value for CurrentTemperature
		callback(null, this.indoorTemperature);
	};
	// Handle requests to get the current value of the "RotationSpeed" characteristic
	handleRotationSpeedGet(callback: CharacteristicGetCallback) {
		this.platform.log.debug('Current Rotation Speed:', this.fanSpeed);
		// set this to a valid value for RotationSpeed
		// values from device are 20.0="Silent",40.0="Low",60.0="Medium",80.0="High",102.0="Auto"
		// convert to good usable slider in homekit in percent
		let currentValue;
		if (this.fanSpeed == 40) {
			currentValue = 25;
		} else if (this.fanSpeed == 60) {
			currentValue = 50;
		} else if (this.fanSpeed == 80) {
			currentValue = 75;
		} else {
			currentValue = 100;
		};
		callback(null, currentValue);
	};
	// Handle requests to set the "RotationSpeed" characteristic
	handleRotationSpeedSet(value: CharacteristicValue, callback: CharacteristicSetCallback) {
		this.platform.log.debug('Set Target Rotation Speed To:', value);
		if (this.fanSpeed != value) {
			// transform values in percent
			// values from device are 20.0="Silent",40.0="Low",60.0="Medium",80.0="High",102.0="Auto"
			// Silent are not now available in devices?
			if (value <= 25) {
				this.fanSpeed = 40;
			} else if (value > 25 && value <= 50) {
				this.fanSpeed = 60;
			} else if (value > 50 && value <= 75) {
				this.fanSpeed = 80;
			} else {
				this.fanSpeed = 102;
			};
			this.platform.sendUpdateToDevice(this);
		};
		callback(null, value);
	};
	// Handle requests to get the current value of the "swingMode" characteristic
	handleSwingModeGet(callback: CharacteristicGetCallback) {
		this.platform.log.debug('Current Swing Mode:', this.swingMode)
		// set this to a valid value for swingMode
		// values from device are 0="Off",12="Vertical",3="Horizontal",15="Both"
		if (this.swingMode != 0) {
			callback(null, this.platform.Characteristic.SwingMode.SWING_ENABLED);
		} else {
			callback(null, this.platform.Characteristic.SwingMode.SWING_DISABLED);
		};
	};
	// Handle requests to set the "swingMode" characteristic
	handleSwingModeSet(value: CharacteristicValue, callback: CharacteristicSetCallback) {
		this.platform.log.debug('Set Target Swing Mode To:', value);
		// convert this.swingMode to a 0/1
		if (this.swingMode != value) {
			if (value == 0) {
				this.swingMode = 0;
			} else {
				this.swingMode = this.supportedSwingMode;
			};
			this.platform.sendUpdateToDevice(this)
		};
		callback(null, value);
	};
	// Handle requests to get the current value of the "CoolingThresholdTemperature" characteristic
	handleCoolingThresholdTemperatureGet(callback: CharacteristicSetCallback) {
		this.platform.log.debug('Current Cooling Threshold Temperature:', this.targetTemperature + '˚C');
		// set this to a valid value for TargetTemperature
		callback(null, this.targetTemperature);
	};
	// Handle requests to set the "CoolingThresholdTemperature" characteristic
	handleCoolingThresholdTemperatureSet(value: any, callback: CharacteristicSetCallback) {
		this.platform.log.debug('Set Target Cooling Threshold Temperature To:', value + '˚C');
		if (this.targetTemperature != value) {
			this.targetTemperature = value;
			this.platform.sendUpdateToDevice(this);
		};
		callback(null, value);
	};
	// Handle requests to get the current value of the "HeatingThresholdTemperature" characteristic
	handleHeatingThresholdTemperatureGet(callback: CharacteristicSetCallback) {
		this.platform.log.debug('Current Heating Threshold Temperature:', this.targetTemperature + '˚C');
		// set this to a valid value for TargetTemperature
		callback(null, this.targetTemperature);
	};
	// Handle requests to set the "HeatingThresholdTemperature" characteristic
	handleHeatingThresholdTemperatureSet(value: any, callback: CharacteristicSetCallback) {
		this.platform.log.debug('Set Target Heating Threshold Temperature To:', value + '˚C');
		if (this.targetTemperature != value) {
			this.targetTemperature = value;
			this.platform.sendUpdateToDevice(this);
		};
		callback(null, value);
	};
	// Handle requests to get the current value of the "Temperature Display Units" characteristic
	// handleTemperatureDisplayUnitsGet(callback: CharacteristicSetCallback) {
	// 	this.platform.log.debug('Current Temperature Display Units', this.useFahrenheit);
	// 	// set this to a valid value for TemperatureDisplayUnits
	// 	if (this.useFahrenheit == true) {
	// 		callback(null, this.platform.Characteristic.TemperatureDisplayUnits.FAHRENHEIT)
	// 	} else {
	// 		callback(null, this.platform.Characteristic.TemperatureDisplayUnits.CELSIUS)
	// 	}
	// }
	// Handle requests to set the "Temperature Display Units" characteristic
	// handleTemperatureDisplayUnitsSet(value: CharacteristicValue, callback: CharacteristicSetCallback) {
	// 	this.platform.log.debug('Set Target Temperature Display Units To:', value);
	// 	if (this.useFahrenheit != value) {
	// 		if (value == true) {
	// 			this.useFahrenheit = true;
	// 		} else {
	// 			this.useFahrenheit = false;
	// 		}
	// 		this.platform.sendUpdateToDevice(this);
	// 	}
	// 	callback(null, value);
	// }

	// Fan only mode
	// Handle requests to get the current value of the "On" characteristic
	// handleFanActiveGet(callback: CharacteristicGetCallback) {
	// 	this.platform.log.debug('Current Fan Mode:', this.fanOnlyMode);
	// 	// workaround to get the "fan only mode" from device
	// 	// device operation values are 1.0="Auto",2.0="Cool",3.0="Dry",4.0="Heat",5.0="Fan"
	// 	// set this to a valid value for Active
	// 	if (this.powerState == 1 && this.operationalMode == MideaOperationalMode.FanOnly) {
	// 		callback(null, this.platform.Characteristic.Active.ACTIVE);
	// 	} else {
	// 		callback(null, this.platform.Characteristic.Active.INACTIVE);
	// 	};
	// };
	// Handle requests to set the "On" characteristic
	// handleFanActiveSet(value: CharacteristicValue, callback: CharacteristicSetCallback) {
	// 	this.platform.log.debug('Set Target Fan Mode To:', value);
	// 	// workaround to get the "fan only mode" from device
	// 	// device operation values are 1.0="Auto",2.0="Cool",3.0="Dry",4.0="Heat",5.0="Fan"
	// 	if (this.powerState == 1 && value == 1) {
	// 		this.operationalMode = MideaOperationalMode.FanOnly;
	// 		this.platform.sendUpdateToDevice(this);
	// 	} else if (this.powerState == 0 && value == 1) {
	// 		this.powerState = 1;
	// 		this.operationalMode = MideaOperationalMode.FanOnly;
	// 		this.platform.sendUpdateToDevice(this);
	// 	} else {
	// 		this.operationalMode = MideaOperationalMode.Off;
	// 		this.powerState = 0;
	// 		this.platform.sendUpdateToDevice(this);
	// 	};
	// 	callback(null, value);
	// };
};