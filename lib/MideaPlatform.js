"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MideaPlatform = void 0;
const axios = require('axios').default;
const tunnel_1 = __importDefault(require("tunnel"));
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough_cookie_1 = __importDefault(require("tough-cookie"));
const querystring_1 = __importDefault(require("querystring"));
const Utils_1 = __importDefault(require("./Utils"));
const Constants_1 = __importDefault(require("./Constants"));
const PacketBuilder_1 = __importDefault(require("./PacketBuilder"));
const ACSetCommand_1 = __importDefault(require("./commands/ACSetCommand"));
const DehumidifierSetCommand_1 = __importDefault(require("./commands/DehumidifierSetCommand"));
const ACApplianceResponse_1 = __importDefault(require("./responses/ACApplianceResponse"));
const DehumidifierApplianceResponse_1 = __importDefault(require("./responses/DehumidifierApplianceResponse"));
const MideaAccessory_1 = require("./MideaAccessory");
const MideaDeviceType_1 = require("./enums/MideaDeviceType");
class MideaPlatform {
    constructor(log, config, api) {
        this.log = log;
        this.config = config;
        this.api = api;
        this.Service = this.api.hap.Service;
        this.Characteristic = this.api.hap.Characteristic;
        this.updateInterval = null;
        this.reauthInterval = null;
        this.atoken = '';
        this.sessionId = '';
        this.dataKey = '';
        this.accessories = [];
        this.mideaAccessories = [];
        axiosCookieJarSupport(axios);
        this.jar = new tough_cookie_1.default.CookieJar();
        let agent;
        if (this.config.proxy) {
            this.log.info('Using debugging proxy specified in config.json');
            const agent = tunnel_1.default.httpsOverHttp({
                proxy: this.config.proxy
            });
            this.apiClient = axios.create({
                baseURL: 'https://mapp.appsmb.com/v1',
                headers: {
                    'User-Agent': Constants_1.default.UserAgent,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                jar: this.jar,
                httpsAgent: agent
            });
        }
        else {
            this.apiClient = axios.create({
                baseURL: 'https://mapp.appsmb.com/v1',
                headers: {
                    'User-Agent': Constants_1.default.UserAgent,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                jar: this.jar
            });
        }
        this.log = log;
        this.config = config;
        api.on('didFinishLaunching', () => {
            this.onReady();
        });
    }
    async onReady() {
        try {
            await this.login();
            this.log.debug('Login successful');
            try {
                await this.getUserList();
                this.updateValues();
            }
            catch (err) {
                this.log.debug('getUserList failed');
            }
            this.updateInterval = setInterval(() => {
                this.updateValues();
            }, this.config['interval'] * 1000);
        }
        catch (err) {
            this.log.debug('Login failed');
        }
    }
    async login() {
        return new Promise(async (resolve, reject) => {
            const url = '/user/login/id/get';
            const form = {
                loginAccount: this.config['user'],
                clientType: Constants_1.default.ClientType,
                src: Constants_1.default.RequestSource,
                appId: Constants_1.default.AppId,
                format: Constants_1.default.RequestFormat,
                stamp: Utils_1.default.getStamp(),
                language: Constants_1.default.Language
            };
            const sign = Utils_1.default.getSign(url, form);
            form.sign = sign;
            //this.log.debug('login request', qs.stringify(form));
            try {
                const response = await this.apiClient.post(url, querystring_1.default.stringify(form));
                if (response.data) {
                    if (response.data.errorCode && response.data.errorCode != '0') {
                        this.log.debug('Login request failed with error', response.data.msg);
                    }
                    else {
                        const loginId = response.data.result.loginId;
                        const password = Utils_1.default.getSignPassword(loginId, this.config.password);
                        const url = "/user/login";
                        const form = {
                            loginAccount: this.config['user'],
                            src: Constants_1.default.RequestSource,
                            format: Constants_1.default.RequestFormat,
                            stamp: Utils_1.default.getStamp(),
                            language: Constants_1.default.Language,
                            password: password,
                            clientType: Constants_1.default.ClientType,
                            appId: Constants_1.default.AppId,
                        };
                        const sign = Utils_1.default.getSign(url, form);
                        form.sign = sign;
                        try {
                            const loginResponse = await this.apiClient.post(url, querystring_1.default.stringify(form));
                            //this.log.debug(response);
                            if (loginResponse.data.errorCode && loginResponse.data.errorCode != '0') {
                                this.log.debug('Login request 2 returned error', loginResponse.data.msg);
                                reject();
                            }
                            else {
                                this.atoken = loginResponse.data.result.accessToken;
                                this.sessionId = loginResponse.data.result.sessionId;
                                this.dataKey = Utils_1.default.generateDataKey(this.atoken);
                                resolve();
                            }
                        }
                        catch (err) {
                            this.log.debug('Login request 2 failed with', err);
                            reject();
                        }
                    }
                }
            }
            catch (err) {
                this.log.debug('Login request failed with', err);
                reject();
            }
        });
    }
    async getUserList() {
        this.log.debug('getUserList called');
        return new Promise(async (resolve, reject) => {
            const form = {
                src: Constants_1.default.RequestSource,
                format: Constants_1.default.RequestFormat,
                stamp: Utils_1.default.getStamp(),
                language: Constants_1.default.Language,
                sessionId: this.sessionId
            };
            const url = "/appliance/user/list/get";
            const sign = Utils_1.default.getSign(url, form);
            form.sign = sign;
            try {
                const response = await this.apiClient.post(url, querystring_1.default.stringify(form));
                if (response.data.errorCode && response.data.errorCode != '0') {
                    this.log.error('getUserList returned error', response.data.msg);
                    reject();
                }
                else {
                    if (response.data.result && response.data.result.list && response.data.result.list.length > 0) {
                        response.data.result.list.forEach(async (currentElement) => {
                            if (parseInt(currentElement.type) == MideaDeviceType_1.MideaDeviceType.AirConditioner || parseInt(currentElement.type) == MideaDeviceType_1.MideaDeviceType.Dehumidifier) {
                                const uuid = this.api.hap.uuid.generate(currentElement.id);
                                const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);
                                if (existingAccessory) {
                                    this.log.debug('Restoring cached accessory', existingAccessory.displayName);
                                    existingAccessory.context.deviceId = currentElement.id;
                                    existingAccessory.context.deviceType = parseInt(currentElement.type);
                                    existingAccessory.context.name = currentElement.name;
                                    this.api.updatePlatformAccessories([existingAccessory]);
                                    var ma = new MideaAccessory_1.MideaAccessory(this, existingAccessory, currentElement.id, parseInt(currentElement.type), currentElement.name, currentElement.userId);
                                    this.mideaAccessories.push(ma);
                                }
                                else {
                                    this.log.debug('Adding new device:', currentElement.name);
                                    const accessory = new this.api.platformAccessory(currentElement.name, uuid);
                                    accessory.context.deviceId = currentElement.id;
                                    accessory.context.name = currentElement.name;
                                    accessory.context.deviceType = parseInt(currentElement.type);
                                    var ma = new MideaAccessory_1.MideaAccessory(this, accessory, currentElement.id, parseInt(currentElement.type), currentElement.name, currentElement.userId);
                                    this.api.registerPlatformAccessories('homebridge-midea-air', 'midea-air', [accessory]);
                                    this.mideaAccessories.push(ma);
                                }
                                // this.log.debug('mideaAccessories now contains', this.mideaAccessories)
                            }
                            else {
                                this.log.warn('Device ' + currentElement.name + ' is of unsupported type ' + MideaDeviceType_1.MideaDeviceType[parseInt(currentElement.type)]);
                                this.log.warn('Please open an issue on GitHub with your specific device model');
                            }
                        });
                        resolve();
                    }
                    else {
                        this.log.error('getUserList invalid response');
                        reject();
                    }
                }
            }
            catch (err) {
                this.log.debug('getUserList error', err);
                reject();
            }
        });
    }
    async sendCommand(device, order, intent) {
        return new Promise(async (resolve, reject) => {
            if (device) {
                const orderEncode = Utils_1.default.encode(order);
                const orderEncrypt = Utils_1.default.encryptAes(orderEncode, this.dataKey);
                const form = {
                    applianceId: device.deviceId,
                    src: Constants_1.default.RequestSource,
                    format: Constants_1.default.RequestFormat,
                    funId: "FC02",
                    order: orderEncrypt,
                    stamp: Utils_1.default.getStamp(),
                    language: Constants_1.default.Language,
                    sessionId: this.sessionId,
                };
                const url = "/appliance/transparent/send";
                const sign = Utils_1.default.getSign(url, form);
                form.sign = sign;
                //this.log.debug('sendCommand request', qs.stringify(form));
                try {
                    const response = await this.apiClient.post(url, querystring_1.default.stringify(form));
                    if (response.data.errorCode && response.data.errorCode != '0') {
                        this.log.error(`[MideaPlatform.ts] sendCommand (Intent: ${intent}) returned error ${response.data.msg}`);
                        reject();
                    }
                    else {
                        this.log.debug(`[MideaPlatform.ts] sendCommand (Intent: ${intent}) success!`);
                        let applianceResponse;
                        if (device.deviceType == MideaDeviceType_1.MideaDeviceType.AirConditioner) {
                            applianceResponse = new ACApplianceResponse_1.default(Utils_1.default.decode(Utils_1.default.decryptAes(response.data.result.reply, this.dataKey)));
                            device.targetTemperature = applianceResponse.targetTemperature;
                            device.indoorTemperature = applianceResponse.indoorTemperature;
                            device.useFahrenheit = applianceResponse.tempUnit;
                            device.swingMode = applianceResponse.swingMode;
                            this.log.debug('[AirConditioner] useFahrenheit is set to', applianceResponse.tempUnit);
                            this.log.debug('[AirConditioner] ecoMode is set to', applianceResponse.ecoMode);
                            this.log.debug('[AirConditioner] Target temperature', applianceResponse.targetTemperature);
                        }
                        else if (device.deviceType == MideaDeviceType_1.MideaDeviceType.Dehumidifier) {
                            applianceResponse = new DehumidifierApplianceResponse_1.default(Utils_1.default.decode(Utils_1.default.decryptAes(response.data.result.reply, this.dataKey)));
                            device.currentHumidity = applianceResponse.currentHumidity;
                            this.log.debug('[Dehumidifier] Current Humidity is', device.currentHumidity);
                            device.targetHumidity = applianceResponse.targetHumidity;
                            this.log.debug('[Dehumidifier] Target humidity is set to', device.targetHumidity);
                            device.waterLevel = applianceResponse.waterLevel;
                            this.log.debug('[Dehumidifier] Water level is at', device.waterLevel);
                        }
                        // Common to all devices
                        device.fanSpeed = applianceResponse.fanSpeed;
                        device.powerState = applianceResponse.powerState ? 1 : 0;
                        device.operationalMode = applianceResponse.operationalMode;
                        device.ecoMode = applianceResponse.ecoMode;
                        this.log.debug('fanSpeed is set to', applianceResponse.fanSpeed);
                        this.log.debug('swingMode is set to', applianceResponse.swingMode);
                        this.log.debug('powerState is set to', applianceResponse.powerState);
                        this.log.debug('operational mode is set to', applianceResponse.operationalMode);
                        this.log.debug('Full data is', Utils_1.default.formatResponse(applianceResponse.data));
                        resolve();
                    }
                }
                catch (err) {
                    this.log.error(`[MideaPlatform.ts] sendCommand (Intent: ${intent}) request failed ${err}`);
                    reject();
                }
            }
            else {
                this.log.error('No device specified');
                reject();
            }
        });
    }
    updateValues() {
        // STATUS ONLY OR POWER ON/OFF HEADER
        const ac_data_header = [90, 90, 1, 16, 89, 0, 32, 0, 80, 0, 0, 0, 169, 65, 48, 9, 14, 5, 20, 20, 213, 50, 1, 0, 0, 17, 0, 0, 0, 4, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0];
        const dh_data_header = [90, 90, 1, 0, 89, 0, 32, 0, 1, 0, 0, 0, 39, 36, 17, 9, 13, 10, 18, 20, 218, 73, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let data = [];
        this.accessories.forEach(async (accessory) => {
            // this.log.debug('current ma are ', this.mideaAccessories)
            this.log.debug('Updating accessory', accessory.context.deviceId);
            // this.log.debug(JSON.stringify(this.mideaAccessories))
            let mideaAccessory = this.mideaAccessories.find(ma => ma.deviceId == accessory.context.deviceId);
            if (mideaAccessory == undefined) {
                this.log.warn('Could not find accessory with id', accessory.context.deviceId);
            }
            else {
                // Setup the data payload based on deviceType
                if (mideaAccessory.deviceType == MideaDeviceType_1.MideaDeviceType.AirConditioner) {
                    data = ac_data_header.concat(Constants_1.default.UpdateCommand_AirCon);
                }
                else if (mideaAccessory.deviceType == MideaDeviceType_1.MideaDeviceType.Dehumidifier) {
                    data = dh_data_header.concat(Constants_1.default.UpdateCommand_Dehumidifier);
                }
                this.log.debug(`[updateValues] Command + Header: ${data}`);
                try {
                    await this.sendCommand(mideaAccessory, data, '[updateValues] (fetch params?) attempt 1/2');
                    this.log.debug(`[updateValues] Sent update command to ${mideaAccessory.deviceType}`);
                }
                catch (err) {
                    // TODO: this should be handled only on invalidSession error. Also all the retry logic could be done better (Promise retry instead of await?)
                    this.log.warn(`[updateValues] Error sending the command: ${err}. Trying to re-login before re-issuing command...`);
                    try {
                        const loginResponse = await this.login();
                        this.log.debug("[updateValues] Login successful!");
                        try {
                            await this.sendCommand(mideaAccessory, data, '[updateValues] (fetch params?) attempt 2/2');
                        }
                        catch (err) {
                            this.log.error(`[updateValues] sendCommand command still failed after retrying: ${err}`);
                        }
                    }
                    catch (err) {
                        this.log.error("[updateValues] re-login attempt failed");
                    }
                }
            }
        });
    }
    async sendUpdateToDevice(device) {
        if (device) {
            let command;
            if (device.deviceType == MideaDeviceType_1.MideaDeviceType.AirConditioner) {
                command = new ACSetCommand_1.default();
                command.useFahrenheit = device.useFahrenheit;
                command.targetTemperature = device.targetTemperature;
                command.swingMode = device.swingMode;
                command.ecoMode = device.ecoMode;
                command.fanSpeed = device.fanSpeed;
            }
            else if (device.deviceType == MideaDeviceType_1.MideaDeviceType.Dehumidifier) {
                command = new DehumidifierSetCommand_1.default();
                this.log.debug(`[sendUpdateToDevice] Generated a new command to set targetHumidity to: ${device.targetHumidity}`);
                command.targetHumidity = device.targetHumidity;
            }
            command.powerState = device.powerState;
            command.operationalMode = device.operationalMode;
            //operational mode for workaround with fan only mode on device
            const pktBuilder = new PacketBuilder_1.default();
            pktBuilder.command = command;
            const data = pktBuilder.finalize();
            // this.log.debug("[sendUpdateToDevice] Command: " + JSON.stringify(command));
            this.log.debug("[sendUpdateToDevice]  Command + Header: " + JSON.stringify(data));
            try {
                await this.sendCommand(device, data, '[sendUpdateToDevice] (set new params?) attempt 1/2');
                this.log.debug('[sendUpdateToDevice] Sent update to device ' + device.name);
            }
            catch (err) {
                // TODO: this should be handled only on invalidSession error. Also all the retry logic could be done better (Promise retry instead of await?)
                this.log.warn(`[sendUpdateToDevice] Error sending the command: ${err}. Trying to re-login before re-issuing command...`);
                this.log.debug("[sendUpdateToDevice] Trying to re-login first");
                try {
                    const loginResponse = await this.login();
                    this.log.debug("Login successful");
                    try {
                        await this.sendCommand(device, data, '[sendUpdateToDevice] (set new params?) attempt 2/2');
                    }
                    catch (err) {
                        this.log.error(`[sendUpdateToDevice] sendCommand command still failed after retrying: ${err}`);
                    }
                }
                catch (err) {
                    this.log.warn("[sendUpdateToDevice] re-login attempt failed");
                }
            }
            //after sending, update because sometimes the api hangs
            try {
                this.log.debug("[sendUpdateToDevice] Fetching again the state of the device after setting new parameters...");
                this.updateValues();
            }
            catch (err) {
                this.log.error("[sendUpdateToDevice] something went wrong while fetching the state of the device after setting new paramenters: ", err);
            }
        }
    }
    getDeviceSpecificOverrideValue(deviceId, key) {
        if (this.config) {
            if (this.config.hasOwnProperty('devices')) {
                for (let i = 0; i < this.config.devices.length; i++) {
                    if (this.config.devices[i].deviceId == deviceId) {
                        return this.config.devices[i][key];
                    }
                }
            }
        }
        return null;
    }
    configureAccessory(accessory) {
        this.log.info('Loading accessory from cache:', accessory.displayName);
        // add the restored accessory to the accessories cache so we can track if it has already been registered
        this.accessories.push(accessory);
    }
}
exports.MideaPlatform = MideaPlatform;
