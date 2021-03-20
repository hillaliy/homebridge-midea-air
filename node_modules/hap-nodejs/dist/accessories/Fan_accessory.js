"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// here's a fake hardware device that we'll expose to HomeKit
var __1 = require("..");
var FAKE_FAN = {
    powerOn: false,
    rSpeed: 100,
    setPowerOn: function (on) {
        if (on) {
            //put your code here to turn on the fan
            FAKE_FAN.powerOn = on;
        }
        else {
            //put your code here to turn off the fan
            FAKE_FAN.powerOn = on;
        }
    },
    setSpeed: function (value) {
        console.log("Setting fan rSpeed to %s", value);
        FAKE_FAN.rSpeed = value;
        //put your code here to set the fan to a specific value
    },
    identify: function () {
        //put your code here to identify the fan
        console.log("Fan Identified!");
    }
};
// This is the Accessory that we'll return to HAP-NodeJS that represents our fake fan.
var fan = exports.accessory = new __1.Accessory('Fan', __1.uuid.generate('hap-nodejs:accessories:Fan'));
// Add properties for publishing (in case we're using Core.js and not BridgedCore.js)
// @ts-ignore
fan.username = "1A:2B:3C:4D:5E:FF";
// @ts-ignore
fan.pincode = "031-45-154";
// @ts-ignore
fan.category = 3 /* FAN */;
// set some basic properties (these values are arbitrary and setting them is optional)
fan
    .getService(__1.Service.AccessoryInformation)
    .setCharacteristic(__1.Characteristic.Manufacturer, "Sample Company");
// listen for the "identify" event for this Accessory
fan.on("identify" /* IDENTIFY */, function (paired, callback) {
    FAKE_FAN.identify();
    callback(); // success
});
// Add the actual Fan Service and listen for change events from iOS.
// We can see the complete list of Services and Characteristics in `lib/gen/HomeKit.ts`
fan
    .addService(__1.Service.Fan, "Fan") // services exposed to the user should have "names" like "Fake Light" for us
    .getCharacteristic(__1.Characteristic.On)
    .on("set" /* SET */, function (value, callback) {
    FAKE_FAN.setPowerOn(value);
    callback(); // Our fake Fan is synchronous - this value has been successfully set
});
// We want to intercept requests for our current power state so we can query the hardware itself instead of
// allowing HAP-NodeJS to return the cached Characteristic.value.
fan
    .getService(__1.Service.Fan)
    .getCharacteristic(__1.Characteristic.On)
    .on("get" /* GET */, function (callback) {
    // this event is emitted when you ask Siri directly whether your fan is on or not. you might query
    // the fan hardware itself to find this out, then call the callback. But if you take longer than a
    // few seconds to respond, Siri will give up.
    var err = null; // in case there were any problems
    if (FAKE_FAN.powerOn) {
        callback(err, true);
    }
    else {
        callback(err, false);
    }
});
// also add an "optional" Characteristic for speed
fan
    .getService(__1.Service.Fan)
    .addCharacteristic(__1.Characteristic.RotationSpeed)
    .on("get" /* GET */, function (callback) {
    callback(null, FAKE_FAN.rSpeed);
})
    .on("set" /* SET */, function (value, callback) {
    FAKE_FAN.setSpeed(value);
    callback();
});
//# sourceMappingURL=Fan_accessory.js.map