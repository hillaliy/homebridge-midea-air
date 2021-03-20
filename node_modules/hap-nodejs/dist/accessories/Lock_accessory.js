"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../");
// here's a fake hardware device that we'll expose to HomeKit
var FAKE_LOCK = {
    locked: false,
    lock: function () {
        console.log("Locking the lock!");
        FAKE_LOCK.locked = true;
    },
    unlock: function () {
        console.log("Unlocking the lock!");
        FAKE_LOCK.locked = false;
    },
    identify: function () {
        console.log("Identify the lock!");
    }
};
// Generate a consistent UUID for our Lock Accessory that will remain the same even when
// restarting our server. We use the `uuid.generate` helper function to create a deterministic
// UUID based on an arbitrary "namespace" and the word "lock".
var lockUUID = __1.uuid.generate('hap-nodejs:accessories:lock');
// This is the Accessory that we'll return to HAP-NodeJS that represents our fake lock.
var lock = exports.accessory = new __1.Accessory('Lock', lockUUID);
// Add properties for publishing (in case we're using Core.js and not BridgedCore.js)
// @ts-ignore
lock.username = "C1:5D:3A:EE:5E:FA";
// @ts-ignore
lock.pincode = "031-45-154";
// @ts-ignore
lock.category = 6 /* DOOR_LOCK */;
// set some basic properties (these values are arbitrary and setting them is optional)
lock
    .getService(__1.Service.AccessoryInformation)
    .setCharacteristic(__1.Characteristic.Manufacturer, "Oltica")
    .setCharacteristic(__1.Characteristic.Model, "Rev-1")
    .setCharacteristic(__1.Characteristic.SerialNumber, "A1S2NASF88EW");
// listen for the "identify" event for this Accessory
lock.on("identify" /* IDENTIFY */, function (paired, callback) {
    FAKE_LOCK.identify();
    callback(); // success
});
// Add the actual Door Lock Service and listen for change events from iOS.
// We can see the complete list of Services and Characteristics in `lib/gen/HomeKit.ts`
lock
    .addService(__1.Service.LockMechanism, "Fake Lock") // services exposed to the user should have "names" like "Fake Light" for us
    .getCharacteristic(__1.Characteristic.LockTargetState)
    .on("set" /* SET */, function (value, callback) {
    if (value == __1.Characteristic.LockTargetState.UNSECURED) {
        FAKE_LOCK.unlock();
        callback(); // Our fake Lock is synchronous - this value has been successfully set
        // now we want to set our lock's "actual state" to be unsecured so it shows as unlocked in iOS apps
        lock
            .getService(__1.Service.LockMechanism)
            .setCharacteristic(__1.Characteristic.LockCurrentState, __1.Characteristic.LockCurrentState.UNSECURED);
    }
    else if (value == __1.Characteristic.LockTargetState.SECURED) {
        FAKE_LOCK.lock();
        callback(); // Our fake Lock is synchronous - this value has been successfully set
        // now we want to set our lock's "actual state" to be locked so it shows as open in iOS apps
        lock
            .getService(__1.Service.LockMechanism)
            .setCharacteristic(__1.Characteristic.LockCurrentState, __1.Characteristic.LockCurrentState.SECURED);
    }
});
// We want to intercept requests for our current state so we can query the hardware itself instead of
// allowing HAP-NodeJS to return the cached Characteristic.value.
lock
    .getService(__1.Service.LockMechanism)
    .getCharacteristic(__1.Characteristic.LockCurrentState)
    .on("get" /* GET */, function (callback) {
    // this event is emitted when you ask Siri directly whether your lock is locked or not. you might query
    // the lock hardware itself to find this out, then call the callback. But if you take longer than a
    // few seconds to respond, Siri will give up.
    var err = null; // in case there were any problems
    if (FAKE_LOCK.locked) {
        console.log("Are we locked? Yes.");
        callback(err, __1.Characteristic.LockCurrentState.SECURED);
    }
    else {
        console.log("Are we locked? No.");
        callback(err, __1.Characteristic.LockCurrentState.UNSECURED);
    }
});
//# sourceMappingURL=Lock_accessory.js.map