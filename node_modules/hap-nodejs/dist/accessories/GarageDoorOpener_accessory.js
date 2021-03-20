"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var FAKE_GARAGE = {
    opened: false,
    open: function () {
        console.log("Opening the Garage!");
        //add your code here which allows the garage to open
        FAKE_GARAGE.opened = true;
    },
    close: function () {
        console.log("Closing the Garage!");
        //add your code here which allows the garage to close
        FAKE_GARAGE.opened = false;
    },
    identify: function () {
        //add your code here which allows the garage to be identified
        console.log("Identify the Garage");
    },
    status: function () {
        //use this section to get sensor values. set the boolean FAKE_GARAGE.opened with a sensor value.
        console.log("Sensor queried!");
        //FAKE_GARAGE.opened = true/false;
    }
};
var garageUUID = __1.uuid.generate('hap-nodejs:accessories:' + 'GarageDoor');
var garage = exports.accessory = new __1.Accessory('Garage Door', garageUUID);
// Add properties for publishing (in case we're using Core.js and not BridgedCore.js)
// @ts-ignore
garage.username = "C1:5D:3F:EE:5E:FA"; //edit this if you use Core.js
// @ts-ignore
garage.pincode = "031-45-154";
// @ts-ignore
garage.category = 4 /* GARAGE_DOOR_OPENER */;
garage
    .getService(__1.Service.AccessoryInformation)
    .setCharacteristic(__1.Characteristic.Manufacturer, "Liftmaster")
    .setCharacteristic(__1.Characteristic.Model, "Rev-1")
    .setCharacteristic(__1.Characteristic.SerialNumber, "TW000165");
garage.on("identify" /* IDENTIFY */, function (paired, callback) {
    FAKE_GARAGE.identify();
    callback();
});
garage
    .addService(__1.Service.GarageDoorOpener, "Garage Door")
    .setCharacteristic(__1.Characteristic.TargetDoorState, __1.Characteristic.TargetDoorState.CLOSED) // force initial state to CLOSED
    .getCharacteristic(__1.Characteristic.TargetDoorState)
    .on("set" /* SET */, function (value, callback) {
    if (value == __1.Characteristic.TargetDoorState.CLOSED) {
        FAKE_GARAGE.close();
        callback();
        garage
            .getService(__1.Service.GarageDoorOpener)
            .setCharacteristic(__1.Characteristic.CurrentDoorState, __1.Characteristic.CurrentDoorState.CLOSED);
    }
    else if (value == __1.Characteristic.TargetDoorState.OPEN) {
        FAKE_GARAGE.open();
        callback();
        garage
            .getService(__1.Service.GarageDoorOpener)
            .setCharacteristic(__1.Characteristic.CurrentDoorState, __1.Characteristic.CurrentDoorState.OPEN);
    }
});
garage
    .getService(__1.Service.GarageDoorOpener)
    .getCharacteristic(__1.Characteristic.CurrentDoorState)
    .on("get" /* GET */, function (callback) {
    var err = null;
    FAKE_GARAGE.status();
    if (FAKE_GARAGE.opened) {
        console.log("Query: Is Garage Open? Yes.");
        callback(err, __1.Characteristic.CurrentDoorState.OPEN);
    }
    else {
        console.log("Query: Is Garage Open? No.");
        callback(err, __1.Characteristic.CurrentDoorState.CLOSED);
    }
});
//# sourceMappingURL=GarageDoorOpener_accessory.js.map