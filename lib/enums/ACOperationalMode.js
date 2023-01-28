"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACOperationalMode = void 0;
var ACOperationalMode;
(function (ACOperationalMode) {
    ACOperationalMode[ACOperationalMode["Off"] = 0] = "Off";
    ACOperationalMode[ACOperationalMode["Auto"] = 1] = "Auto";
    ACOperationalMode[ACOperationalMode["Cooling"] = 2] = "Cooling";
    ACOperationalMode[ACOperationalMode["Dry"] = 3] = "Dry";
    ACOperationalMode[ACOperationalMode["Heating"] = 4] = "Heating";
    ACOperationalMode[ACOperationalMode["FanOnly"] = 5] = "FanOnly";
    ACOperationalMode[ACOperationalMode["CustomDry"] = 6] = "CustomDry"; // automatic dehumidification
})(ACOperationalMode = exports.ACOperationalMode || (exports.ACOperationalMode = {}));
