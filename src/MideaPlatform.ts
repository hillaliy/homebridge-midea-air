import { API, DynamicPlatformPlugin, Logging, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';

const axios = require('axios').default

import tunnel from 'tunnel';

const axiosCookieJarSupport = require('axios-cookiejar-support').default;
import tough from 'tough-cookie';
import qs from 'querystring';
import Utils from './Utils';
import Constants from './Constants';
import PacketBuilder from './PacketBuilder';

import ACSetCommand from './commands/ACSetCommand';
import DehumidifierSetCommand from './commands/DehumidifierSetCommand';

import ACApplianceResponse from './responses/ACApplianceResponse';
import DehumidifierApplianceResponse from './responses/DehumidifierApplianceResponse';

import { MideaAccessory } from './MideaAccessory';
import { MideaDeviceType } from './enums/MideaDeviceType';


export class MideaPlatform implements DynamicPlatformPlugin {
	public readonly Service: typeof Service = this.api.hap.Service;
	public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;
	jar: any;
	updateInterval: any = null;
	reauthInterval: any = null;
	atoken: string = '';
	sessionId: string = '';
	dataKey: string = '';
	baseHeader: object;
	apiClient: any;
	public readonly accessories: PlatformAccessory[] = [];
	mideaAccessories: MideaAccessory[] = []

	constructor(public readonly log: Logging, public readonly config: PlatformConfig, public readonly api: API) {
		axiosCookieJarSupport(axios);
		this.jar = new tough.CookieJar()
		let agent: any;
		if (this.config.proxy) {
			this.log.info('Using debugging proxy specified in config.json')
			const agent = tunnel.httpsOverHttp({
				proxy: this.config.proxy
			})
			this.apiClient = axios.create({
				baseURL: 'https://mapp.appsmb.com/v1',
				headers: {
					'User-Agent': Constants.UserAgent,
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				jar: this.jar,
				httpsAgent: agent
			})
		} else {
			this.apiClient = axios.create({
				baseURL: 'https://mapp.appsmb.com/v1',
				headers: {
					'User-Agent': Constants.UserAgent,
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				jar: this.jar
			});
		};
		this.log = log;
		this.config = config;
		api.on('didFinishLaunching', () => {
			this.onReady();
		});
	};

	async onReady() {
		try {
			await this.login()
			this.log.debug('Login successful')
			try {
				await this.getUserList()
				this.updateValues()
			} catch (err) {
				this.log.debug('getUserList failed')
			};
			this.updateInterval = setInterval(() => {
				this.updateValues();
			}, this.config['interval'] * 1000);
		} catch (err) {
			this.log.debug('Login failed')
		};
	};

	async login() {
		return new Promise<void>(async (resolve, reject) => {
			const url = '/user/login/id/get';
			const form: any = {
				loginAccount: this.config['user'],
				clientType: Constants.ClientType,
				src: Constants.RequestSource,
				appId: Constants.AppId,
				format: Constants.RequestFormat,
				stamp: Utils.getStamp(),
				language: Constants.Language
			};
			const sign = Utils.getSign(url, form);
			form.sign = sign;
			//this.log.debug('login request', qs.stringify(form));
			try {
				const response = await this.apiClient.post(url, qs.stringify(form))
				if (response.data) {
					if (response.data.errorCode && response.data.errorCode != '0') {
						this.log.debug('Login request failed with error', response.data.msg)
					} else {
						const loginId: string = response.data.result.loginId;
						const password: string = Utils.getSignPassword(loginId, this.config.password);
						const url = "/user/login";
						const form: any = {
							loginAccount: this.config['user'],
							src: Constants.RequestSource,
							format: Constants.RequestFormat,
							stamp: Utils.getStamp(),
							language: Constants.Language,
							password: password,
							clientType: Constants.ClientType,
							appId: Constants.AppId,
						};
						const sign = Utils.getSign(url, form);
						form.sign = sign;
						try {
							const loginResponse = await this.apiClient.post(url, qs.stringify(form));
							//this.log.debug(response);
							if (loginResponse.data.errorCode && loginResponse.data.errorCode != '0') {
								this.log.debug('Login request 2 returned error', loginResponse.data.msg);
								reject();
							} else {
								this.atoken = loginResponse.data.result.accessToken;
								this.sessionId = loginResponse.data.result.sessionId;
								this.dataKey = Utils.generateDataKey(this.atoken);
								resolve();
							};
						} catch (err) {
							this.log.debug('Login request 2 failed with', err)
							reject();
						};
					};
				};
			} catch (err) {
				this.log.debug('Login request failed with', err);
				reject();
			};
		});
	};

	async getUserList() {
		this.log.debug('getUserList called');
		return new Promise<void>(async (resolve, reject) => {
			const form: any = {
				src: Constants.RequestSource,
				format: Constants.RequestFormat,
				stamp: Utils.getStamp(),
				language: Constants.Language,
				sessionId: this.sessionId
			};
			const url = "/appliance/user/list/get";
			const sign = Utils.getSign(url, form);
			form.sign = sign;
			try {
				const response = await this.apiClient.post(url, qs.stringify(form))
				if (response.data.errorCode && response.data.errorCode != '0') {
					this.log.error('getUserList returned error', response.data.msg);
					reject();
				} else {
					if (response.data.result && response.data.result.list && response.data.result.list.length > 0) {
						response.data.result.list.forEach(async (currentElement: any) => {
							if (parseInt(currentElement.type) == MideaDeviceType.AirConditioner || parseInt(currentElement.type) == MideaDeviceType.Dehumidifier) {
								const uuid = this.api.hap.uuid.generate(currentElement.id)
								const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid)
								if (existingAccessory) {
									this.log.debug('Restoring cached accessory', existingAccessory.displayName)
									existingAccessory.context.deviceId = currentElement.id
									existingAccessory.context.deviceType = parseInt(currentElement.type)
									existingAccessory.context.name = currentElement.name
									this.api.updatePlatformAccessories([existingAccessory])

									var ma = new MideaAccessory(this, existingAccessory, currentElement.id, parseInt(currentElement.type), currentElement.name, currentElement.userId)
									this.mideaAccessories.push(ma)
								} else {
									this.log.debug('Adding new device:', currentElement.name)
									const accessory = new this.api.platformAccessory(currentElement.name, uuid)
									accessory.context.deviceId = currentElement.id
									accessory.context.name = currentElement.name
									accessory.context.deviceType = parseInt(currentElement.type)
									var ma = new MideaAccessory(this, accessory, currentElement.id, parseInt(currentElement.type), currentElement.name, currentElement.userId)
									this.api.registerPlatformAccessories('homebridge-midea-air', 'midea-air', [accessory])
									this.mideaAccessories.push(ma)
								};
								// this.log.debug('mideaAccessories now contains', this.mideaAccessories)
							} else {
								this.log.warn('Device ' + currentElement.name + ' is of unsupported type ' + MideaDeviceType[parseInt(currentElement.type)])
								this.log.warn('Please open an issue on GitHub with your specific device model')
							};
						});
						resolve();
					} else {
						this.log.error('getUserList invalid response');
						reject();
					};
				};
			} catch (err) {
				this.log.debug('getUserList error', err);
				reject();
			};
		});
	};

	async sendCommand(device: MideaAccessory, order: any, intent: string) {
		return new Promise<void>(async (resolve, reject) => {
			if (device) {
				const orderEncode = Utils.encode(order);
				const orderEncrypt = Utils.encryptAes(orderEncode, this.dataKey);
				const form: any = {
					applianceId: device.deviceId,
					src: Constants.RequestSource,
					format: Constants.RequestFormat,
					funId: "FC02", //maybe it is also "0000"
					order: orderEncrypt,
					stamp: Utils.getStamp(),
					language: Constants.Language,
					sessionId: this.sessionId,
				};
				const url = "/appliance/transparent/send";
				const sign = Utils.getSign(url, form);
				form.sign = sign;
				//this.log.debug('sendCommand request', qs.stringify(form));
				try {
					const response = await this.apiClient.post(url, qs.stringify(form))
					if (response.data.errorCode && response.data.errorCode !== '0') {
						if (response.data.errorCode === "3123") {
							this.log.debug('Device Unreachable');
							resolve();
							return;
						};
						if (response.data.errorCode === "3176") {
							this.log.debug('Command was not accepted by device. Command wrong or device not reachable');
							resolve();
							return;
						};
						this.log.error(`[MideaPlatform.ts] sendCommand (Intent: ${intent}) returned error ${response.data.msg}`)
						return;
					} else {
						this.log.debug(`[MideaPlatform.ts] sendCommand (Intent: ${intent}) success!`);
						let applianceResponse: any

						device.powerState = applianceResponse.powerState ? 1 : 0;
						device.operationalMode = applianceResponse.operationalMode;
						device.fanSpeed = applianceResponse.fanSpeed;
						device.ecoMode = applianceResponse.ecoMode;

						this.log.debug('Power State is set to:', applianceResponse.powerState);
						this.log.debug('Operational Mode is set to:', applianceResponse.operationalMode);
						this.log.debug('Fan Speed is set to:', applianceResponse.fanSpeed);
						this.log.debug('ecoMode is set to:', applianceResponse.ecoMode);

						if (device.deviceType == MideaDeviceType.AirConditioner) {
							applianceResponse = new ACApplianceResponse(Utils.decode(Utils.decryptAes(response.data.result.reply, this.dataKey)));

							device.swingMode = applianceResponse.swingMode;
							device.useFahrenheit = applianceResponse.tempUnit;
							device.targetTemperature = applianceResponse.targetTemperature;
							device.indoorTemperature = applianceResponse.indoorTemperature;
							device.outdoorTemperature = applianceResponse.outdoorTemperature;

							this.log.debug('Swing Mode is set to:', applianceResponse.swingMode);
							this.log.debug('useFahrenheit is set to:', applianceResponse.tempUnit);
							this.log.debug('Target Temperature:', applianceResponse.targetTemperature + '˚C');
							this.log.debug('Indoor Temperature is:', applianceResponse.indoorTemperature + '˚C');
							if (applianceResponse.outdoorTemperature < 100) {
								this.log.debug('Outdoor Temperature is:', applianceResponse.outdoorTemperature + '˚C');
							};

						} else if (device.deviceType == MideaDeviceType.Dehumidifier) {
							applianceResponse = new DehumidifierApplianceResponse(Utils.decode(Utils.decryptAes(response.data.result.reply, this.dataKey)));

							device.currentHumidity = applianceResponse.currentHumidity;
							device.targetHumidity = applianceResponse.targetHumidity;
							device.waterLevel = applianceResponse.waterLevel;

							this.log.debug('[Dehumidifier] Current Humidity is', device.currentHumidity);
							this.log.debug('[Dehumidifier] Target humidity is set to', device.targetHumidity);
							this.log.debug('[Dehumidifier] Water level is at', device.waterLevel);
						};
						this.log.debug('Full data is', Utils.formatResponse(applianceResponse.data))
						resolve();
					};
				} catch (err) {
					this.log.error(`[MideaPlatform.ts] sendCommand (Intent: ${intent}) request failed ${err}`);
					reject();
				};
			} else {
				this.log.error('No device specified');
				reject();
			};
		});
	};

	updateValues() {
		// STATUS ONLY OR POWER ON/OFF HEADER
		const ac_data_header = [90, 90, 1, 16, 89, 0, 32, 0, 80, 0, 0, 0, 169, 65, 48, 9, 14, 5, 20, 20, 213, 50, 1, 0, 0, 17, 0, 0, 0, 4, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0];
		const dh_data_header = [90, 90, 1, 0, 89, 0, 32, 0, 1, 0, 0, 0, 39, 36, 17, 9, 13, 10, 18, 20, 218, 73, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		let data: number[] = []

		this.accessories.forEach(async (accessory: PlatformAccessory) => {
			this.log.debug('Updating accessory:', accessory.context.deviceId)
			let mideaAccessory = this.mideaAccessories.find(ma => ma.deviceId == accessory.context.deviceId)
			if (mideaAccessory == undefined) {
				this.log.warn('Could not find accessory with id', accessory.context.deviceId)
			} else {
				// Setup the data payload based on deviceType
				if (mideaAccessory.deviceType == MideaDeviceType.AirConditioner) {
					data = ac_data_header.concat(Constants.UpdateCommand_AirCon);
				} else if (mideaAccessory.deviceType == MideaDeviceType.Dehumidifier) {
					data = dh_data_header.concat(Constants.UpdateCommand_Dehumidifier);
				};
				this.log.debug(`[updateValues] Header + Command: ${data}`)
				try {
					await this.sendCommand(mideaAccessory, data, '[updateValues] (fetch params?) attempt 1/2')
					this.log.debug(`[updateValues] Sent update command to: ${mideaAccessory.deviceType}`)
				} catch (err) {
					// TODO: this should be handled only on invalidSession error. Also all the retry logic could be done better (Promise retry instead of await?)
					this.log.warn(`[updateValues] Error sending the command: ${err}. Trying to re-login before re-issuing command...`);
					try {
						const loginResponse = await this.login()
						this.log.debug("[updateValues] Login successful!");
						try {
							await this.sendCommand(mideaAccessory, data, '[updateValues] (fetch params?) attempt 2/2')
						} catch (err) {
							this.log.error(`[updateValues] sendCommand command still failed after retrying: ${err}`);
						}
					} catch (err) {
						this.log.error("[updateValues] re-login attempt failed");
					};
				};
			};
		});
	};

	async sendUpdateToDevice(device?: MideaAccessory) {
		if (device) {
			let command: any

			if (device.deviceType == MideaDeviceType.AirConditioner) {
				command = new ACSetCommand();
				command.fanSpeed = device.fanSpeed;
				command.swingMode = device.swingMode;
				command.ecoMode = device.ecoMode;
				command.useFahrenheit = device.useFahrenheit;
				command.targetTemperature = device.targetTemperature;
			} else if (device.deviceType == MideaDeviceType.Dehumidifier) {
				command = new DehumidifierSetCommand()
				this.log.debug(`[sendUpdateToDevice] Generated a new command to set targetHumidity to: ${device.targetHumidity}`)
				command.targetHumidity = device.targetHumidity
			};

			command.powerState = device.powerState;
			command.operationalMode = device.operationalMode;

			//operational mode for workaround with fan only mode on device
			const pktBuilder = new PacketBuilder();
			pktBuilder.command = command;
			const data = pktBuilder.finalize();
			// this.log.debug("[sendUpdateToDevice] Command: " + JSON.stringify(command));
			this.log.debug("[sendUpdateToDevice]  Command + Header: " + JSON.stringify(data));
			try {
				await this.sendCommand(device, data, '[sendUpdateToDevice] (set new params?) attempt 1/2')
				this.log.debug('[sendUpdateToDevice] Sent update to device ' + device.name)
			} catch (err) {
				// TODO: this should be handled only on invalidSession error. Also all the retry logic could be done better (Promise retry instead of await?)
				this.log.warn(`[sendUpdateToDevice] Error sending the command: ${err}. Trying to re-login before re-issuing command...`);
				this.log.debug("[sendUpdateToDevice] Trying to re-login first");
				try {
					const loginResponse = await this.login();
					this.log.debug("Login successful");
					try {
						await this.sendCommand(device, data, '[sendUpdateToDevice] (set new params?) attempt 2/2')
					} catch (err) {
						this.log.error(`[sendUpdateToDevice] sendCommand command still failed after retrying: ${err}`);
					};
				} catch (err) {
					this.log.warn("[sendUpdateToDevice] re-login attempt failed");
				};
			};
			//after sending, update because sometimes the api hangs
			try {
				this.log.debug("[sendUpdateToDevice] Fetching again the state of the device after setting new parameters...");
				this.updateValues();
			} catch (err) {
				this.log.error("[sendUpdateToDevice] something went wrong while fetching the state of the device after setting new paramenters: ", err)
			};
		};
	};

	getDeviceSpecificOverrideValue(deviceId: string, key: string) {
		if (this.config) {
			if (this.config.hasOwnProperty('devices')) {
				for (let i = 0; i < this.config.devices.length; i++) {
					if (this.config.devices[i].deviceId == deviceId) {
						return this.config.devices[i][key];
					};
				};
			};
		};
		return null;
	};

	configureAccessory(accessory: PlatformAccessory) {
		this.log.info('Loading accessory from cache:', accessory.displayName);
		// add the restored accessory to the accessories cache so we can track if it has already been registered
		this.accessories.push(accessory);
	};
};