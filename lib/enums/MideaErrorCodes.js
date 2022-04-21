"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MideaErrorCodes = void 0;
// MideaErrorCodes enum – This is a list of errors and their meaning to better understand them in code
var MideaErrorCodes;
(function (MideaErrorCodes) {
    MideaErrorCodes[MideaErrorCodes["NoOpenIdOrUnionId"] = 3002] = "NoOpenIdOrUnionId";
    MideaErrorCodes[MideaErrorCodes["ValueIllegal"] = 3004] = "ValueIllegal";
    MideaErrorCodes[MideaErrorCodes["InvalidPassword"] = 3101] = "InvalidPassword";
    MideaErrorCodes[MideaErrorCodes["InvalidUsername"] = 3102] = "InvalidUsername";
    MideaErrorCodes[MideaErrorCodes["InvalidSession"] = 3106] = "InvalidSession";
    MideaErrorCodes[MideaErrorCodes["DeviceUnreachable"] = 3123] = "DeviceUnreachable";
    MideaErrorCodes[MideaErrorCodes["RestartFull"] = 3144] = "RestartFull";
    MideaErrorCodes[MideaErrorCodes["CommandNotAccepted"] = 3176] = "CommandNotAccepted";
    MideaErrorCodes[MideaErrorCodes["SignIllegal"] = 3301] = "SignIllegal";
    MideaErrorCodes[MideaErrorCodes["RetryLater"] = 7610] = "RetryLater";
    MideaErrorCodes[MideaErrorCodes["SystemError"] = 9999] = "SystemError";
})(MideaErrorCodes = exports.MideaErrorCodes || (exports.MideaErrorCodes = {}));
