"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var HomeKit_TV_1 = require("../lib/gen/HomeKit-TV");
var speakerUUID = __1.uuid.generate('hap-nodejs:accessories:smart-speaker');
var speaker = exports.accessory = new __1.Accessory('SmartSpeaker', speakerUUID);
// @ts-ignore
speaker.username = "89:A8:E4:1E:95:EE";
// @ts-ignore
speaker.pincode = "676-54-344";
speaker.category = 26 /* SPEAKER */;
var service = new __1.Service.SmartSpeaker('Smart Speaker', '');
var currentMediaState = HomeKit_TV_1.CurrentMediaState.PAUSE;
var targetMediaState = HomeKit_TV_1.TargetMediaState.PAUSE;
// ConfigureName is used to listen for Name changes inside the Home App.
// A device manufacturer would probably need to adjust the name of the device in the AirPlay 2 protocol (or something)
service.setCharacteristic(__1.Characteristic.ConfiguredName, "Smart Speaker");
service.setCharacteristic(__1.Characteristic.Mute, false);
service.setCharacteristic(__1.Characteristic.Volume, 100);
service.getCharacteristic(__1.Characteristic.CurrentMediaState)
    .on("get" /* GET */, function (callback) {
    console.log("Reading CurrentMediaState: " + currentMediaState);
    callback(undefined, currentMediaState);
}).getValue();
service.getCharacteristic(__1.Characteristic.TargetMediaState)
    .on("set" /* SET */, function (value, callback) {
    console.log("Setting TargetMediaState to: " + value);
    targetMediaState = value;
    currentMediaState = targetMediaState;
    callback();
    service.setCharacteristic(__1.Characteristic.CurrentMediaState, targetMediaState);
})
    .on("get" /* GET */, function (callback) {
    console.log("Reading TargetMediaState: " + targetMediaState);
    callback(undefined, targetMediaState);
}).getValue();
service.getCharacteristic(__1.Characteristic.ConfiguredName)
    .on("set" /* SET */, function (value, callback) {
    console.log("Name was changed to: '" + value + "'");
    callback();
});
speaker.addService(service);
//# sourceMappingURL=SmartSpeaker_accessory.js.map