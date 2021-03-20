"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Advertiser = void 0;
var crypto_1 = __importDefault(require("crypto"));
var bonjour_hap_1 = __importDefault(require("bonjour-hap"));
/**
 * Advertiser uses mdns to broadcast the presence of an Accessory to the local network.
 *
 * Note that as of iOS 9, an accessory can only pair with a single client. Instead of pairing your
 * accessories with multiple iOS devices in your home, Apple intends for you to use Home Sharing.
 * To support this requirement, we provide the ability to be "discoverable" or not (via a "service flag" on the
 * mdns payload).
 */
var Advertiser = /** @class */ (function () {
    function Advertiser(accessoryInfo, mdnsConfig) {
        var _this = this;
        this.accessoryInfo = accessoryInfo;
        this.startAdvertising = function (port) {
            // stop advertising if necessary
            if (_this._advertisement) {
                _this.stopAdvertising();
            }
            var txtRecord = {
                md: _this.accessoryInfo.displayName,
                pv: Advertiser.protocolVersion,
                id: _this.accessoryInfo.username,
                "c#": _this.accessoryInfo.configVersion + "",
                "s#": "1",
                "ff": "0",
                "ci": _this.accessoryInfo.category,
                "sf": _this.accessoryInfo.paired() ? "0" : "1",
                "sh": _this._setupHash
            };
            /**
             * The host name of the component is probably better to be
             * the username of the hosted accessory + '.local'.
             * By default 'bonjour' doesnt add '.local' at the end of the os.hostname
             * this causes to return 'raspberrypi' on raspberry pi / raspbian
             * then when the phone queryies for A/AAAA record it is being queried
             * on normal dns, not on mdns. By Adding the username of the accessory
             * probably the problem will also fix a possible problem
             * of having multiple pi's on same network
             */
            var host = _this.accessoryInfo.username.replace(/\:/ig, "_") + '.local';
            var advertiseName = _this.accessoryInfo.displayName
                + " "
                + crypto_1.default.createHash('sha512').update(_this.accessoryInfo.username, 'utf8').digest('hex').slice(0, 4).toUpperCase();
            // create/recreate our advertisement
            _this._advertisement = _this._bonjourService.publish({
                name: advertiseName,
                type: "hap",
                port: port,
                txt: txtRecord,
                host: host
            });
        };
        this.isAdvertising = function () {
            return (_this._advertisement != null);
        };
        this.updateAdvertisement = function () {
            if (_this._advertisement) {
                var txtRecord = {
                    md: _this.accessoryInfo.displayName,
                    pv: Advertiser.protocolVersion,
                    id: _this.accessoryInfo.username,
                    "c#": _this.accessoryInfo.configVersion + "",
                    "s#": "1",
                    "ff": "0",
                    "ci": "" + _this.accessoryInfo.category,
                    "sf": _this.accessoryInfo.paired() ? "0" : "1",
                    "sh": _this._setupHash
                };
                _this._advertisement.updateTxt(txtRecord);
            }
        };
        this.stopAdvertising = function () {
            if (_this._advertisement) {
                _this._advertisement.stop();
                _this._advertisement.destroy();
                _this._advertisement = null;
            }
            _this._bonjourService.destroy();
        };
        this._computeSetupHash = function () {
            var setupHashMaterial = _this.accessoryInfo.setupID + _this.accessoryInfo.username;
            var hash = crypto_1.default.createHash('sha512');
            hash.update(setupHashMaterial);
            var setupHash = hash.digest().slice(0, 4).toString('base64');
            return setupHash;
        };
        this._bonjourService = bonjour_hap_1.default(mdnsConfig);
        this._advertisement = null;
        this._setupHash = this._computeSetupHash();
    }
    Advertiser.protocolVersion = "1.1";
    Advertiser.protocolVersionService = "1.1.0";
    return Advertiser;
}());
exports.Advertiser = Advertiser;
//# sourceMappingURL=Advertiser.js.map