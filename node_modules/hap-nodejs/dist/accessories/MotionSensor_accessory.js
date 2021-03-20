"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// here's a fake hardware device that we'll expose to HomeKit
var __1 = require("..");
var MOTION_SENSOR = {
    motionDetected: false,
    getStatus: function () {
        //set the boolean here, this will be returned to the device
        MOTION_SENSOR.motionDetected = false;
    },
    identify: function () {
        console.log("Identify the motion sensor!");
    }
};
// Generate a consistent UUID for our Motion Sensor Accessory that will remain the same even when
// restarting our server. We use the `uuid.generate` helper function to create a deterministic
// UUID based on an arbitrary "namespace" and the word "motionsensor".
var motionSensorUUID = __1.uuid.generate('hap-nodejs:accessories:motionsensor');
// This is the Accessory that we'll return to HAP-NodeJS that represents our fake motionSensor.
var motionSensor = exports.accessory = new __1.Accessory('Motion Sensor', motionSensorUUID);
// Add properties for publishing (in case we're using Core.js and not BridgedCore.js)
// @ts-ignore
motionSensor.username = "1A:2B:3D:4D:2E:AF";
// @ts-ignore
motionSensor.pincode = "031-45-154";
// @ts-ignore
motionSensor.category = 10 /* SENSOR */;
// set some basic properties (these values are arbitrary and setting them is optional)
motionSensor
    .getService(__1.Service.AccessoryInformation)
    .setCharacteristic(__1.Characteristic.Manufacturer, "Oltica")
    .setCharacteristic(__1.Characteristic.Model, "Rev-1")
    .setCharacteristic(__1.Characteristic.SerialNumber, "A1S2NASF88EW");
// listen for the "identify" event for this Accessory
motionSensor.on("identify" /* IDENTIFY */, function (paired, callback) {
    MOTION_SENSOR.identify();
    callback(); // success
});
motionSensor
    .addService(__1.Service.MotionSensor, "Fake Motion Sensor") // services exposed to the user should have "names" like "Fake Motion Sensor" for us
    .getCharacteristic(__1.Characteristic.MotionDetected)
    .on("get" /* GET */, function (callback) {
    MOTION_SENSOR.getStatus();
    callback(null, Boolean(MOTION_SENSOR.motionDetected));
});
//# sourceMappingURL=MotionSensor_accessory.js.map