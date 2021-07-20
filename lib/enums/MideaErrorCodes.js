"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MideaErrorCodes = void 0;
// MideaErrorCodes enum – This is a list of errors and their meaning to better understand them in code
var MideaErrorCodes;
(function (MideaErrorCodes) {
    MideaErrorCodes[MideaErrorCodes["DeviceUnreachable"] = 3123] = "DeviceUnreachable";
    MideaErrorCodes[MideaErrorCodes["CommandNotAccepted"] = 3176] = "CommandNotAccepted";
    MideaErrorCodes[MideaErrorCodes["InvalidLogin"] = 3101] = "InvalidLogin";
    MideaErrorCodes[MideaErrorCodes["InvalidSession"] = 3106] = "InvalidSession";
    MideaErrorCodes[MideaErrorCodes["SignIllegal"] = 3301] = "SignIllegal";
    MideaErrorCodes[MideaErrorCodes["ValueIllegal"] = 3004] = "ValueIllegal";
    MideaErrorCodes[MideaErrorCodes["NoOpenIdOrUnionId"] = 3002] = "NoOpenIdOrUnionId";
})(MideaErrorCodes = exports.MideaErrorCodes || (exports.MideaErrorCodes = {}));
