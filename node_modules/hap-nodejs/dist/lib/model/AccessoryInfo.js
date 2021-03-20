"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessoryInfo = exports.PermissionTypes = void 0;
var util_1 = __importDefault(require("util"));
var assert_1 = __importDefault(require("assert"));
var tweetnacl_1 = __importDefault(require("tweetnacl"));
var eventedhttp_1 = require("../util/eventedhttp");
var HAPStorage_1 = require("./HAPStorage");
var PermissionTypes;
(function (PermissionTypes) {
    PermissionTypes[PermissionTypes["USER"] = 0] = "USER";
    PermissionTypes[PermissionTypes["ADMIN"] = 1] = "ADMIN";
})(PermissionTypes = exports.PermissionTypes || (exports.PermissionTypes = {}));
/**
 * AccessoryInfo is a model class containing a subset of Accessory data relevant to the internal HAP server,
 * such as encryption keys and username. It is persisted to disk.
 */
var AccessoryInfo = /** @class */ (function () {
    function AccessoryInfo(username) {
        var _this = this;
        /**
         * Add a paired client to memory.
         * @param {string} username
         * @param {Buffer} publicKey
         * @param {PermissionTypes} permission
         */
        this.addPairedClient = function (username, publicKey, permission) {
            _this.pairedClients[username] = {
                username: username,
                publicKey: publicKey,
                permission: permission
            };
            if (permission === 1 /* ADMIN */)
                _this.pairedAdminClients++;
        };
        this.updatePermission = function (username, permission) {
            var pairingInformation = _this.pairedClients[username];
            if (pairingInformation) {
                var oldPermission = pairingInformation.permission;
                pairingInformation.permission = permission;
                if (oldPermission === 1 /* ADMIN */ && permission !== 1 /* ADMIN */) {
                    _this.pairedAdminClients--;
                }
                else if (oldPermission !== 1 /* ADMIN */ && permission === 1 /* ADMIN */) {
                    _this.pairedAdminClients++;
                }
            }
        };
        this.listPairings = function () {
            var array = [];
            for (var username in _this.pairedClients) {
                var pairingInformation = _this.pairedClients[username];
                array.push(pairingInformation);
            }
            return array;
        };
        /**
         * Remove a paired client from memory.
         * @param controller - the session of the controller initiated the removal of the pairing
         * @param {string} username
         */
        this.removePairedClient = function (controller, username) {
            _this._removePairedClient0(controller, username);
            if (_this.pairedAdminClients === 0) { // if we don't have any admin clients left paired it is required to kill all normal clients
                for (var username0 in _this.pairedClients) {
                    _this._removePairedClient0(controller, username0);
                }
            }
        };
        this._removePairedClient0 = function (controller, username) {
            if (_this.pairedClients[username] && _this.pairedClients[username].permission === 1 /* ADMIN */)
                _this.pairedAdminClients--;
            delete _this.pairedClients[username];
            eventedhttp_1.Session.destroyExistingConnectionsAfterUnpair(controller, username);
        };
        /**
         * Check if username is paired
         * @param username
         */
        this.isPaired = function (username) {
            return !!_this.pairedClients[username];
        };
        this.hasAdminPermissions = function (username) {
            if (!username)
                return false;
            var pairingInformation = _this.pairedClients[username];
            return !!pairingInformation && pairingInformation.permission === 1 /* ADMIN */;
        };
        // Gets the public key for a paired client as a Buffer, or falsey value if not paired.
        this.getClientPublicKey = function (username) {
            var pairingInformation = _this.pairedClients[username];
            if (pairingInformation) {
                return pairingInformation.publicKey;
            }
            else {
                return undefined;
            }
        };
        // Returns a boolean indicating whether this accessory has been paired with a client.
        this.paired = function () {
            return Object.keys(_this.pairedClients).length > 0; // if we have any paired clients, we're paired.
        };
        this.save = function () {
            var saved = {
                displayName: _this.displayName,
                category: _this.category,
                pincode: _this.pincode,
                signSk: _this.signSk.toString('hex'),
                signPk: _this.signPk.toString('hex'),
                pairedClients: {},
                // moving permissions into an extra object, so there is nothing to migrate from old files.
                // if the legacy node-persist storage should be upgraded some time, it would be reasonable to combine the storage
                // of public keys (pairedClients object) and permissions.
                pairedClientsPermission: {},
                configVersion: _this.configVersion,
                configHash: _this.configHash,
                setupID: _this.setupID,
            };
            for (var username in _this.pairedClients) {
                var pairingInformation = _this.pairedClients[username];
                //@ts-ignore
                saved.pairedClients[username] = pairingInformation.publicKey.toString('hex');
                // @ts-ignore
                saved.pairedClientsPermission[username] = pairingInformation.permission;
            }
            var key = AccessoryInfo.persistKey(_this.username);
            HAPStorage_1.HAPStorage.storage().setItemSync(key, saved);
        };
        this.username = username;
        this.displayName = "";
        // @ts-ignore
        this.category = "";
        this.pincode = "";
        this.signSk = Buffer.alloc(0);
        this.signPk = Buffer.alloc(0);
        this.pairedClients = {};
        this.pairedAdminClients = 0;
        this.configVersion = 1;
        this.configHash = "";
        this.setupID = "";
    }
    AccessoryInfo.remove = function (username) {
        var key = AccessoryInfo.persistKey(username);
        HAPStorage_1.HAPStorage.storage().removeItemSync(key);
    };
    AccessoryInfo.deviceIdPattern = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    // Gets a key for storing this AccessoryInfo in the filesystem, like "AccessoryInfo.CC223DE3CEF3.json"
    AccessoryInfo.persistKey = function (username) {
        return util_1.default.format("AccessoryInfo.%s.json", username.replace(/:/g, "").toUpperCase());
    };
    AccessoryInfo.create = function (username) {
        AccessoryInfo.assertValidUsername(username);
        var accessoryInfo = new AccessoryInfo(username);
        // Create a new unique key pair for this accessory.
        var keyPair = tweetnacl_1.default.sign.keyPair();
        accessoryInfo.signSk = Buffer.from(keyPair.secretKey);
        accessoryInfo.signPk = Buffer.from(keyPair.publicKey);
        return accessoryInfo;
    };
    AccessoryInfo.load = function (username) {
        AccessoryInfo.assertValidUsername(username);
        var key = AccessoryInfo.persistKey(username);
        var saved = HAPStorage_1.HAPStorage.storage().getItem(key);
        if (saved) {
            var info = new AccessoryInfo(username);
            info.displayName = saved.displayName || "";
            info.category = saved.category || "";
            info.pincode = saved.pincode || "";
            info.signSk = Buffer.from(saved.signSk || '', 'hex');
            info.signPk = Buffer.from(saved.signPk || '', 'hex');
            info.pairedClients = {};
            for (var username in saved.pairedClients || {}) {
                var publicKey = saved.pairedClients[username];
                var permission = saved.pairedClientsPermission ? saved.pairedClientsPermission[username] : undefined;
                if (permission === undefined)
                    permission = 1 /* ADMIN */; // defaulting to admin permissions is the only suitable solution, there is no way to recover permissions
                info.pairedClients[username] = {
                    username: username,
                    publicKey: Buffer.from(publicKey, 'hex'),
                    permission: permission
                };
                if (permission === 1 /* ADMIN */)
                    info.pairedAdminClients++;
            }
            info.configVersion = saved.configVersion || 1;
            info.configHash = saved.configHash || "";
            info.setupID = saved.setupID || "";
            return info;
        }
        else {
            return null;
        }
    };
    AccessoryInfo.assertValidUsername = function (username) {
        assert_1.default.ok(AccessoryInfo.deviceIdPattern.test(username), "The supplied username (" + username + ") is not valid " +
            "(expected a format like 'XX:XX:XX:XX:XX:XX' with XX being a valid hexadecimal string). " +
            "Note that, if you had this accessory already paired with the invalid username, you will need to repair " +
            "the accessory and reconfigure your services in the Home app. " +
            "Using an invalid username will lead to unexpected behaviour.");
    };
    return AccessoryInfo;
}());
exports.AccessoryInfo = AccessoryInfo;
//# sourceMappingURL=AccessoryInfo.js.map