"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MideaErrorCodes = void 0;
// MideaErrorCodes enum – This is a list of errors and their meaning to better understand them in code
var MideaErrorCodes;
(function (MideaErrorCodes) {
    // MideaAir / NetHomePlus
    MideaErrorCodes[MideaErrorCodes["DeviceUnreachable"] = 3123] = "DeviceUnreachable";
    MideaErrorCodes[MideaErrorCodes["CommandNotAccepted"] = 3176] = "CommandNotAccepted";
    MideaErrorCodes[MideaErrorCodes["InvalidLogin"] = 3101] = "InvalidLogin";
    MideaErrorCodes[MideaErrorCodes["InvalidSession"] = 3106] = "InvalidSession";
    MideaErrorCodes[MideaErrorCodes["SignIllegal"] = 3301] = "SignIllegal";
    MideaErrorCodes[MideaErrorCodes["ValueIllegal"] = 3004] = "ValueIllegal";
    MideaErrorCodes[MideaErrorCodes["NoOpenIdOrUnionId"] = 3002] = "NoOpenIdOrUnionId";
    // MSmartHome
    MideaErrorCodes[MideaErrorCodes["UnknownError"] = 1] = "UnknownError";
    MideaErrorCodes[MideaErrorCodes["InvalidArgument"] = 30005] = "InvalidArgument";
    MideaErrorCodes[MideaErrorCodes["NoAccessTokenSupplied"] = 40001] = "NoAccessTokenSupplied";
    MideaErrorCodes[MideaErrorCodes["NoRouteMatchedWithThoseValues"] = 40404] = "NoRouteMatchedWithThoseValues";
    MideaErrorCodes[MideaErrorCodes["BadSignature"] = 44003] = "BadSignature";
})(MideaErrorCodes = exports.MideaErrorCodes || (exports.MideaErrorCodes = {}));
