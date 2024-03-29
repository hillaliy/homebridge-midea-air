"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MideaPlatform = void 0;
const axios = require('axios');
const strftime = require('strftime');
// import tunnel from 'tunnel';
const { wrapper: axiosCookieJarSupport } = require('axios-cookiejar-support');
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
const MideaErrorCodes_1 = require("./enums/MideaErrorCodes");
class MideaPlatform {
    constructor(log, config, api) {
        this.log = log;
        this.config = config;
        this.api = api;
        this.Service = this.api.hap.Service;
        this.Characteristic = this.api.hap.Characteristic;
        this.updateInterval = null;
        this.reauthInterval = null;
        this.accessToken = '';
        this.sessionId = '';
        this.userId = '';
        this.dataKey = '';
        this.accessories = [];
        this.mideaAccessories = [];
        axiosCookieJarSupport(axios);
        this.jar = new tough_cookie_1.default.CookieJar();
        if (this.config.registeredApp === 'MSmartHome') {
            this.log.info('Using proxy login');
            const form = {
                appId: '1010',
                format: 2,
                clientType: 1,
                language: 'en_US',
                src: '1010',
                stamp: strftime('%Y%m%d%H%M%S'),
                reqId: Utils_1.default.reqId,
                loginAccount: this.config['user'],
            };
            const formJSON = JSON.stringify(form);
            const signature = Utils_1.default.getSignProxied(formJSON);
            this.apiClient = axios.create({
                baseURL: 'https://mp-prod.appsmb.com/mas/v5/app/proxy?alias=/v1',
                headers: {
                    Authorization: `Basic ${Buffer.from('1010:meicloud').toString('base64')}`,
                    sign: signature,
                    secretVersion: '1',
                    random: Utils_1.default.randomString,
                    'Content-Type': 'application/json',
                    accessToken: this.accessToken,
                },
                jar: this.jar,
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
        ;
        this.log = log;
        this.config = config;
        api.on('didFinishLaunching', () => {
            this.onReady();
        });
    }
    ;
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
            ;
            this.updateInterval = setInterval(() => {
                this.updateValues();
            }, this.config['interval'] * 1000);
        }
        catch (err) {
            this.log.debug('Login failed');
        }
        ;
    }
    ;
    async login() {
        return new Promise(async (resolve, reject) => {
            var _a;
            const url = '/user/login/id/get';
            const form = {
                loginAccount: this.config['user'],
                clientType: Constants_1.default.ClientType,
                src: Constants_1.default.RequestSource,
                appId: Constants_1.default.AppId,
                format: Constants_1.default.RequestFormat,
                stamp: strftime('%Y%m%d%H%M%S'),
                language: Constants_1.default.Language,
                reqid: Utils_1.default.reqId,
            };
            const sign = Utils_1.default.getSign(url, form, Constants_1.default.AppKey);
            form.sign = sign;
            try {
                const response = await this.apiClient.post(url, querystring_1.default.stringify(form));
                if (((_a = response.data) === null || _a === void 0 ? void 0 : _a.errorCode) && response.data.errorCode !== '0') {
                    this.log.debug(`Login request failed with error: ${response.data.msg}`);
                }
                else {
                    const loginId = response.data.result.loginId;
                    const password = Utils_1.default.getSignPassword(loginId, this.config.password, Constants_1.default.AppKey);
                    const url = '/user/login';
                    const form = {
                        loginAccount: this.config['user'],
                        src: Constants_1.default.RequestSource,
                        format: Constants_1.default.RequestFormat,
                        stamp: strftime('%Y%m%d%H%M%S'),
                        language: Constants_1.default.Language,
                        password: password,
                        clientType: Constants_1.default.ClientType,
                        appId: Constants_1.default.AppId,
                    };
                    const sign = Utils_1.default.getSign(url, form, Constants_1.default.AppKey);
                    form.sign = sign;
                    try {
                        const loginResponse = await this.apiClient.post(url, querystring_1.default.stringify(form));
                        if (loginResponse.data.errorCode && loginResponse.data.errorCode !== '0') {
                            this.log.debug(`Login request 2 returned error: ${loginResponse.data.msg}`);
                            reject();
                        }
                        else {
                            this.accessToken = loginResponse.data.result.accessToken;
                            this.sessionId = loginResponse.data.result.sessionId;
                            this.userId = loginResponse.data.result.userId;
                            this.dataKey = Utils_1.default.generateDataKey(this.accessToken, Constants_1.default.AppKey);
                            resolve();
                        }
                        ;
                    }
                    catch (err) {
                        this.log.debug(`Login request 2 failed with: ${err}`);
                        reject();
                    }
                    ;
                }
                ;
            }
            catch (err) {
                this.log.debug(`Login request failed with: ${err}`);
                reject();
            }
            ;
        });
    }
    ;
    async getUserList() {
        this.log.debug('getUserList called');
        return new Promise(async (resolve, reject) => {
            var _a;
            const form = {
                src: Constants_1.default.RequestSource,
                format: Constants_1.default.RequestFormat,
                stamp: strftime('%Y%m%d%H%M%S'),
                language: Constants_1.default.Language,
                sessionId: this.sessionId
            };
            const url = '/appliance/user/list/get';
            const sign = Utils_1.default.getSign(url, form, Constants_1.default.AppKey);
            form.sign = sign;
            try {
                const response = await this.apiClient.post(url, querystring_1.default.stringify(form));
                if (response.data.errorCode && response.data.errorCode !== '0') {
                    this.log.error(`getUserList returned error: ${response.data.msg}`);
                    reject();
                }
                else {
                    if (((_a = response.data.result) === null || _a === void 0 ? void 0 : _a.list) && response.data.result.list.length > 0) {
                        response.data.result.list.forEach(async (currentElement) => {
                            if (parseInt(currentElement.type) === MideaDeviceType_1.MideaDeviceType.AirConditioner || parseInt(currentElement.type) === MideaDeviceType_1.MideaDeviceType.Dehumidifier) {
                                const uuid = this.api.hap.uuid.generate(currentElement.id);
                                const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);
                                if (existingAccessory) {
                                    this.log.debug('Restoring cached accessory', existingAccessory.displayName);
                                    existingAccessory.context.deviceId = currentElement.id;
                                    existingAccessory.context.deviceType = parseInt(currentElement.type);
                                    existingAccessory.context.name = currentElement.name;
                                    existingAccessory.context.userId = currentElement.userId;
                                    existingAccessory.context.modelNumber = currentElement.modelNumber;
                                    existingAccessory.context.sn = Utils_1.default.decryptAesString(currentElement.sn, this.dataKey);
                                    this.log.debug(`Model Number:${existingAccessory.context.modelNumber}`);
                                    this.log.debug(`Serial Number:${existingAccessory.context.sn}`);
                                    this.api.updatePlatformAccessories([existingAccessory]);
                                    var ma = new MideaAccessory_1.MideaAccessory(this, existingAccessory, currentElement.id, parseInt(currentElement.type), currentElement.name, currentElement.userId);
                                    this.mideaAccessories.push(ma);
                                }
                                else {
                                    this.log.debug(`Adding new device: ${currentElement.name}`);
                                    const accessory = new this.api.platformAccessory(currentElement.name, uuid);
                                    accessory.context.deviceId = currentElement.id;
                                    accessory.context.deviceType = parseInt(currentElement.type);
                                    accessory.context.name = currentElement.name;
                                    accessory.context.userId = currentElement.userId;
                                    accessory.context.modelNumber = currentElement.modelNumber;
                                    accessory.context.sn = Utils_1.default.decryptAesString(currentElement.sn, this.dataKey);
                                    this.log.debug(`Model Number:${accessory.context.modelNumber}`);
                                    this.log.debug(`Serial Number:${accessory.context.sn}`);
                                    var ma = new MideaAccessory_1.MideaAccessory(this, accessory, currentElement.id, parseInt(currentElement.type), currentElement.name, currentElement.userId);
                                    this.api.registerPlatformAccessories('homebridge-midea-air', 'midea-air', [accessory]);
                                    this.mideaAccessories.push(ma);
                                }
                                ;
                            }
                            else {
                                this.log.warn(`Device: ${currentElement.name} is of unsupported type: ${MideaDeviceType_1.MideaDeviceType[parseInt(currentElement.type)]}`);
                                this.log.warn('Please open an issue on GitHub with your specific device model');
                            }
                            ;
                        });
                        resolve();
                    }
                    else {
                        this.log.error('getUserList invalid response');
                        reject();
                    }
                    ;
                }
                ;
            }
            catch (err) {
                this.log.debug(`getUserList error: ${err}`);
                reject();
            }
            ;
        });
    }
    ;
    async sendCommand(device, order, intent) {
        return new Promise(async (resolve, reject) => {
            if (device) {
                const orderEncode = Utils_1.default.encode(order);
                const orderEncrypt = Utils_1.default.encryptAes(orderEncode, this.dataKey);
                const form = {
                    applianceId: device.deviceId,
                    src: Constants_1.default.RequestSource,
                    format: Constants_1.default.RequestFormat,
                    funId: "0000",
                    order: orderEncrypt,
                    stamp: strftime('%Y%m%d%H%M%S'),
                    language: Constants_1.default.Language,
                    sessionId: this.sessionId,
                };
                const url = '/appliance/transparent/send';
                const sign = Utils_1.default.getSign(url, form, Constants_1.default.AppKey);
                form.sign = sign;
                try {
                    const response = await this.apiClient.post(url, querystring_1.default.stringify(form));
                    if (response.data.errorCode && response.data.errorCode !== '0') {
                        if (response.data.errorCode = MideaErrorCodes_1.MideaErrorCodes.CommandNotAccepted) {
                            this.log.debug(`Send command to: ${device.name} (${device.deviceId}) ${intent} returned error: ${response.data.msg} (${response.data.errorCode})`);
                            return;
                        }
                        else {
                            this.log.info(`Send command to: ${device.name} (${device.deviceId}) ${intent} returned error: ${response.data.msg} (${response.data.errorCode})`);
                            return;
                        }
                    }
                    else {
                        this.log.debug(`Send command to: ${device.name} (${device.deviceId}) ${intent} success!`);
                        let applianceResponse;
                        if (device.deviceType === MideaDeviceType_1.MideaDeviceType.AirConditioner) {
                            applianceResponse = new ACApplianceResponse_1.default(Utils_1.default.decode(Utils_1.default.decryptAes(response.data.result.reply, this.dataKey)));
                            device.targetTemperature = applianceResponse.targetTemperature;
                            device.indoorTemperature = applianceResponse.indoorTemperature;
                            device.outdoorTemperature = applianceResponse.outdoorTemperature;
                            device.swingMode = applianceResponse.swingMode;
                            device.useFahrenheit = applianceResponse.useFahrenheit;
                            device.turboFan = applianceResponse.turboFan;
                            device.ecoMode = applianceResponse.ecoMode;
                            device.turboMode = applianceResponse.turboMode;
                            device.comfortSleep = applianceResponse.comfortSleep;
                            device.dryer = applianceResponse.dryer;
                            device.purifier = applianceResponse.purifier;
                            if (device.useFahrenheit === true) {
                                this.log.debug(`Target Temperature: ${this.toFahrenheit(device.targetTemperature)}˚F`);
                                this.log.debug(`Indoor Temperature: ${this.toFahrenheit(device.indoorTemperature)}˚F`);
                            }
                            else {
                                this.log.debug(`Target Temperature: ${device.targetTemperature}˚C`);
                                this.log.debug(`Indoor Temperature: ${device.indoorTemperature}˚C`);
                            }
                            ;
                            if (applianceResponse.outdoorTemperature < 100) {
                                if (device.useFahrenheit === true) {
                                    this.log.debug(`Outdoor Temperature: ${this.toFahrenheit(device.outdoorTemperature)}˚F`);
                                }
                                else {
                                    this.log.debug(`Outdoor Temperature: ${device.outdoorTemperature}˚C`);
                                }
                                ;
                            }
                            ;
                            this.log.debug(`Swing Mode set to: ${device.swingMode}`);
                            this.log.debug(`Fahrenheit set to: ${device.useFahrenheit}`);
                            this.log.debug(`Turbo Fan set to: ${device.turboFan}`);
                            this.log.debug(`Eco Mode set to: ${device.ecoMode}`);
                            this.log.debug(`Turbo Mode set to: ${device.turboMode}`);
                            this.log.debug(`Comfort Sleep set to: ${device.comfortSleep}`);
                            this.log.debug(`Dryer set to: ${device.dryer}`);
                            this.log.debug(`Purifier set to: ${device.purifier}`);
                        }
                        else if (device.deviceType === MideaDeviceType_1.MideaDeviceType.Dehumidifier) {
                            applianceResponse = new DehumidifierApplianceResponse_1.default(Utils_1.default.decode(Utils_1.default.decryptAes(response.data.result.reply, this.dataKey)));
                            device.currentHumidity = applianceResponse.currentHumidity;
                            device.targetHumidity = applianceResponse.targetHumidity;
                            device.waterLevel = applianceResponse.waterLevel;
                            this.log.debug(`Current Humidity: ${device.currentHumidity}`);
                            this.log.debug(`Target humidity set to: ${device.targetHumidity}`);
                            this.log.debug(`Water level at: ${device.waterLevel}`);
                        }
                        ;
                        // Common
                        device.powerState = applianceResponse.powerState ? 1 : 0;
                        device.operationalMode = applianceResponse.operationalMode;
                        device.fanSpeed = applianceResponse.fanSpeed;
                        this.log.debug(`Power State set to: ${device.powerState}`);
                        this.log.debug(`Operational Mode set to: ${device.operationalMode}`);
                        this.log.debug(`Fan Speed set to: ${device.fanSpeed}`);
                        this.log.debug(`Full data: ${Utils_1.default.formatResponse(applianceResponse.data)}`);
                        resolve();
                    }
                    ;
                }
                catch (err) {
                    this.log.error(`SendCommand (${intent}) request failed: ${err}`);
                    reject();
                }
                ;
            }
            else {
                this.log.error('No device specified');
                reject();
            }
            ;
        });
    }
    ;
    updateValues() {
        // STATUS ONLY OR POWER ON/OFF HEADER
        const ac_data_header = [90, 90, 1, 16, 89, 0, 32, 0, 80, 0, 0, 0, 169, 65, 48, 9, 14, 5, 20, 20, 213, 50, 1, 0, 0, 17, 0, 0, 0, 4, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0];
        const dh_data_header = [90, 90, 1, 0, 89, 0, 32, 0, 1, 0, 0, 0, 39, 36, 17, 9, 13, 10, 18, 20, 218, 73, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let data = [];
        this.accessories.forEach(async (accessory) => {
            this.log.debug(`Updating accessory: ${accessory.context.name} (${accessory.context.deviceId})`);
            let mideaAccessory = this.mideaAccessories.find(ma => ma.deviceId === accessory.context.deviceId);
            if (mideaAccessory === undefined) {
                this.log.warn(`Could not find accessory with id: ${accessory.context.deviceId}`);
            }
            else {
                // Setup the data payload based on deviceType
                if (mideaAccessory.deviceType === MideaDeviceType_1.MideaDeviceType.AirConditioner) {
                    data = ac_data_header.concat(Constants_1.default.UpdateCommand_AirCon);
                }
                else if (mideaAccessory.deviceType === MideaDeviceType_1.MideaDeviceType.Dehumidifier) {
                    data = dh_data_header.concat(Constants_1.default.UpdateCommand_Dehumidifier);
                }
                ;
                this.log.debug(`[updateValues] Header + Command: ${data}`);
                try {
                    await this.sendCommand(mideaAccessory, data, '[updateValues] attempt 1/2');
                    this.log.debug(`[updateValues] Send update command to: ${mideaAccessory.name} (${mideaAccessory.deviceId})`);
                }
                catch (err) {
                    // TODO: this should be handled only on invalidSession error. Also all the retry logic could be done better (Promise retry instead of await?)
                    this.log.warn(`[updateValues] Error sending the command: ${err}. Trying to re-login before re-issuing command...`);
                    try {
                        const loginResponse = await this.login();
                        this.log.debug('[updateValues] Login successful!');
                        try {
                            await this.sendCommand(mideaAccessory, data, '[updateValues] attempt 2/2');
                        }
                        catch (err) {
                            this.log.error(`[updateValues] sendCommand command still failed after retrying: ${err}`);
                        }
                    }
                    catch (err) {
                        this.log.error('[updateValues] re-login attempt failed');
                    }
                    ;
                }
                ;
            }
            ;
        });
    }
    ;
    async sendUpdateToDevice(device) {
        if (device) {
            let command;
            if (device.deviceType === MideaDeviceType_1.MideaDeviceType.AirConditioner) {
                command = new ACSetCommand_1.default();
                command.targetTemperature = device.targetTemperature;
                command.swingMode = device.swingMode;
                command.useFahrenheit = device.useFahrenheit;
                command.ecoMode = device.ecoMode;
                // command.screenDisplay = device.screenDisplay;
            }
            else if (device.deviceType === MideaDeviceType_1.MideaDeviceType.Dehumidifier) {
                command = new DehumidifierSetCommand_1.default();
                this.log.debug(`[sendUpdateToDevice] Generated a new command to set targetHumidity to: ${device.targetHumidity}`);
                command.targetHumidity = device.targetHumidity;
            }
            ;
            command.powerState = device.powerState;
            command.audibleFeedback = device.audibleFeedback;
            command.operationalMode = device.operationalMode;
            command.fanSpeed = device.fanSpeed;
            //operational mode for workaround with fan only mode on device
            const pktBuilder = new PacketBuilder_1.default();
            pktBuilder.command = command;
            const data = pktBuilder.finalize();
            this.log.debug(`[sendUpdateToDevice] Header + Command: ${JSON.stringify(data)}`);
            try {
                await this.sendCommand(device, data, '[sendUpdateToDevice] attempt 1/2');
                this.log.debug(`[sendUpdateToDevice] Send command to device: ${device.name} (${device.deviceId})`);
            }
            catch (err) {
                this.log.warn(`[sendUpdateToDevice] Error sending the command: ${err}. Trying to re-login before re-issuing command...`);
                this.log.debug(`[sendUpdateToDevice] Trying to re-login first`);
                try {
                    const loginResponse = await this.login();
                    this.log.debug('Login successful');
                    try {
                        await this.sendCommand(device, data, '[sendUpdateToDevice] attempt 2/2');
                    }
                    catch (err) {
                        this.log.error(`[sendUpdateToDevice] Send command still failed after retrying: ${err}`);
                    }
                    ;
                }
                catch (err) {
                    this.log.warn('[sendUpdateToDevice] re-login attempt failed');
                }
                ;
            }
            ;
            //after sending, update because sometimes the api hangs
            try {
                this.log.debug('[sendUpdateToDevice] Fetching again the state of the device after setting new parameters...');
                this.updateValues();
            }
            catch (err) {
                this.log.error(`[sendUpdateToDevice] Something went wrong while fetching the state of the device after setting new paramenters: ${err}`);
            }
            ;
        }
        ;
    }
    ;
    getDeviceSpecificOverrideValue(deviceId, key) {
        if (this.config) {
            if (this.config.hasOwnProperty('devices')) {
                for (let i = 0; i < this.config.devices.length; i++) {
                    if (this.config.devices[i].deviceId === deviceId) {
                        return this.config.devices[i][key];
                    }
                    ;
                }
                ;
            }
            ;
        }
        ;
        return null;
    }
    ;
    configureAccessory(accessory) {
        this.log.info(`Loading accessory from cache: ${accessory.displayName}`);
        // add the restored accessory to the accessories cache so we can track if it has already been registered
        this.accessories.push(accessory);
    }
    ;
    toFahrenheit(value) {
        return Math.round((value * 1.8) + 32);
    }
    ;
}
exports.MideaPlatform = MideaPlatform;
;
