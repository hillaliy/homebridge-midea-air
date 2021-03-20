"use strict";
/**
 * Type Length Value encoding/decoding, used by HAP as a wire format.
 * https://en.wikipedia.org/wiki/Type-length-value
 */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readUInt16 = exports.writeUInt16 = exports.readUInt32 = exports.writeUInt32 = exports.readUInt64 = exports.writeUInt64 = exports.decodeList = exports.decode = exports.encode = exports.EMPTY_TLV_TYPE = void 0;
exports.EMPTY_TLV_TYPE = 0x00; // and empty tlv with id 0 is usually used as delimiter for tlv lists
function encode(type, data) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var encodedTLVBuffer = Buffer.alloc(0);
    // coerce data to Buffer if needed
    if (typeof data === 'number')
        data = Buffer.from([data]);
    else if (typeof data === 'string')
        data = Buffer.from(data);
    if (data.length <= 255) {
        encodedTLVBuffer = Buffer.concat([Buffer.from([type, data.length]), data]);
    }
    else {
        var leftLength = data.length;
        var tempBuffer = Buffer.alloc(0);
        var currentStart = 0;
        for (; leftLength > 0;) {
            if (leftLength >= 255) {
                tempBuffer = Buffer.concat([tempBuffer, Buffer.from([type, 0xFF]), data.slice(currentStart, currentStart + 255)]);
                leftLength -= 255;
                currentStart = currentStart + 255;
            }
            else {
                tempBuffer = Buffer.concat([tempBuffer, Buffer.from([type, leftLength]), data.slice(currentStart, currentStart + leftLength)]);
                leftLength -= leftLength;
            }
        }
        encodedTLVBuffer = tempBuffer;
    }
    // do we have more to encode?
    if (args.length >= 2) {
        // chop off the first two arguments which we already processed, and process the rest recursively
        var nextType = args[0], nextData = args[1], nextArgs = args.slice(2);
        var remainingTLVBuffer = encode.apply(void 0, __spreadArrays([nextType, nextData], nextArgs));
        // append the remaining encoded arguments directly to the buffer
        encodedTLVBuffer = Buffer.concat([encodedTLVBuffer, remainingTLVBuffer]);
    }
    return encodedTLVBuffer;
}
exports.encode = encode;
function decode(data) {
    var objects = {};
    var leftLength = data.length;
    var currentIndex = 0;
    for (; leftLength > 0;) {
        var type = data[currentIndex];
        var length = data[currentIndex + 1];
        currentIndex += 2;
        leftLength -= 2;
        var newData = data.slice(currentIndex, currentIndex + length);
        if (objects[type]) {
            objects[type] = Buffer.concat([objects[type], newData]);
        }
        else {
            objects[type] = newData;
        }
        currentIndex += length;
        leftLength -= length;
    }
    return objects;
}
exports.decode = decode;
function decodeList(data, entryStartId) {
    var objectsList = [];
    var leftLength = data.length;
    var currentIndex = 0;
    var objects = undefined;
    for (; leftLength > 0;) {
        var type = data[currentIndex]; // T
        var length = data[currentIndex + 1]; // L
        var value = data.slice(currentIndex + 2, currentIndex + 2 + length); // V
        if (type === entryStartId) { // we got the start of a new entry
            if (objects !== undefined) { // save the previous entry
                objectsList.push(objects);
            }
            objects = {};
        }
        if (objects === undefined)
            throw new Error("Error parsing tlv list: Encountered uninitialized storage object");
        if (objects[type]) { // append to buffer if we have an already data for this type
            objects[type] = Buffer.concat([value, objects[type]]);
        }
        else {
            objects[type] = value;
        }
        currentIndex += 2 + length;
        leftLength -= 2 + length;
    }
    if (objects !== undefined)
        objectsList.push(objects); // push last entry
    return objectsList;
}
exports.decodeList = decodeList;
function writeUInt64(value) {
    var float64 = new Float64Array(1);
    float64[0] = value;
    var buffer = Buffer.alloc(float64.buffer.byteLength);
    var view = new Uint8Array(float64.buffer);
    for (var i = 0; i < buffer.length; i++) {
        buffer[i] = view[i];
    }
    return buffer;
}
exports.writeUInt64 = writeUInt64;
function readUInt64(buffer) {
    var float64 = new Float64Array(buffer);
    return float64[0];
}
exports.readUInt64 = readUInt64;
function writeUInt32(value) {
    var buffer = Buffer.alloc(4);
    buffer.writeUInt32LE(value, 0);
    return buffer;
}
exports.writeUInt32 = writeUInt32;
function readUInt32(buffer) {
    return buffer.readUInt32LE(0);
}
exports.readUInt32 = readUInt32;
function writeUInt16(value) {
    var buffer = Buffer.alloc(2);
    buffer.writeUInt16LE(value, 0);
    return buffer;
}
exports.writeUInt16 = writeUInt16;
function readUInt16(buffer) {
    return buffer.readUInt16LE(0);
}
exports.readUInt16 = readUInt16;
//# sourceMappingURL=tlv.js.map