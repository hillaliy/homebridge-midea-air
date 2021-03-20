"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierCache = void 0;
var crypto_1 = __importDefault(require("crypto"));
var util_1 = __importDefault(require("util"));
var HAPStorage_1 = require("./HAPStorage");
/**
 * IdentifierCache is a model class that manages a system of associating HAP "Accessory IDs" and "Instance IDs"
 * with other values that don't usually change. HomeKit Clients use Accessory/Instance IDs as a primary key of
 * sorts, so the IDs need to remain "stable". For instance, if you create a HomeKit "Scene" called "Leaving Home"
 * that sets your Alarm System's "Target Alarm State" Characteristic to "Arm Away", that Scene will store whatever
 * "Instance ID" it was given for the "Target Alarm State" Characteristic. If the ID changes later on this server,
 * the scene will stop working.
 */
var IdentifierCache = /** @class */ (function () {
    function IdentifierCache(username) {
        var _this = this;
        this.username = username;
        this._cache = {}; // cache[key:string] = id:number
        this._usedCache = null; // for usage tracking and expiring old keys
        this._savedCacheHash = ""; // for checking if new cache neeed to be saved
        this.startTrackingUsage = function () {
            _this._usedCache = {};
        };
        this.stopTrackingUsageAndExpireUnused = function () {
            // simply rotate in the new cache that was built during our normal getXYZ() calls.
            _this._cache = _this._usedCache || _this._cache;
            _this._usedCache = null;
        };
        this.getCache = function (key) {
            var value = _this._cache[key];
            // track this cache item if needed
            if (_this._usedCache && typeof value !== 'undefined')
                _this._usedCache[key] = value;
            return value;
        };
        this.setCache = function (key, value) {
            _this._cache[key] = value;
            // track this cache item if needed
            if (_this._usedCache)
                _this._usedCache[key] = value;
            return value;
        };
        this.getAID = function (accessoryUUID) {
            var key = accessoryUUID;
            // ensure that our "next AID" field is not expired
            _this.getCache('|nextAID');
            return _this.getCache(key) || _this.setCache(key, _this.getNextAID());
        };
        this.getIID = function (accessoryUUID, serviceUUID, serviceSubtype, characteristicUUID) {
            var key = accessoryUUID
                + '|' + serviceUUID
                + (serviceSubtype ? '|' + serviceSubtype : '')
                + (characteristicUUID ? '|' + characteristicUUID : '');
            // ensure that our "next IID" field for this accessory is not expired
            _this.getCache(accessoryUUID + '|nextIID');
            return _this.getCache(key) || _this.setCache(key, _this.getNextIID(accessoryUUID));
        };
        this.getNextAID = function () {
            var key = '|nextAID';
            var nextAID = _this.getCache(key) || 2; // start at 2 because the root Accessory or Bridge must be 1
            _this.setCache(key, nextAID + 1); // increment
            return nextAID;
        };
        this.getNextIID = function (accessoryUUID) {
            var key = accessoryUUID + '|nextIID';
            var nextIID = _this.getCache(key) || 2; // iid 1 is reserved for the Accessory Information service
            _this.setCache(key, nextIID + 1); // increment
            return nextIID;
        };
        this.save = function () {
            var newCacheHash = crypto_1.default.createHash('sha1').update(JSON.stringify(_this._cache)).digest('hex'); //calculate hash of new cache
            if (newCacheHash != _this._savedCacheHash) { //check if cache need to be saved and proceed accordingly
                var saved = {
                    cache: _this._cache
                };
                var key = IdentifierCache.persistKey(_this.username);
                HAPStorage_1.HAPStorage.storage().setItemSync(key, saved);
                _this._savedCacheHash = newCacheHash; //update hash of saved cache for future use
            }
        };
    }
    IdentifierCache.remove = function (username) {
        var key = this.persistKey(username);
        HAPStorage_1.HAPStorage.storage().removeItemSync(key);
    };
    /**
     * Persisting to File System
     */
    // Gets a key for storing this IdentifierCache in the filesystem, like "IdentifierCache.CC223DE3CEF3.json"
    IdentifierCache.persistKey = function (username) {
        return util_1.default.format("IdentifierCache.%s.json", username.replace(/:/g, "").toUpperCase());
    };
    IdentifierCache.load = function (username) {
        var key = IdentifierCache.persistKey(username);
        var saved = HAPStorage_1.HAPStorage.storage().getItem(key);
        if (saved) {
            var info = new IdentifierCache(username);
            info._cache = saved.cache;
            info._savedCacheHash = crypto_1.default.createHash('sha1').update(JSON.stringify(info._cache)).digest('hex'); //calculate hash of the saved hash to decide in future if saving of new cache is neeeded
            return info;
        }
        else {
            return null;
        }
    };
    return IdentifierCache;
}());
exports.IdentifierCache = IdentifierCache;
//# sourceMappingURL=IdentifierCache.js.map