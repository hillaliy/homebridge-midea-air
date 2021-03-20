"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStreamWriter = exports.DataStreamReader = exports.DataStreamParser = exports.DataFormatTags = exports.UUID = exports.SecondsSince2001 = exports.Float64 = exports.Float32 = exports.Int64 = exports.Int32 = exports.Int16 = exports.Int8 = exports.ValueWrapper = void 0;
var uuid = __importStar(require("../util/uuid"));
var hapCrypto = __importStar(require("../util/hapCrypto"));
var assert_1 = __importDefault(require("assert"));
var debug_1 = __importDefault(require("debug"));
// welcome to hell :)
// in this file lies madness and frustration. and its not only about HDS. also JavaScript is hell
var debug = debug_1.default("HAP-NodeJS:DataStream:Parser");
var Magics = /** @class */ (function () {
    function Magics() {
    }
    Magics.TERMINATOR = { type: "terminator" };
    return Magics;
}());
var ValueWrapper = /** @class */ (function () {
    function ValueWrapper(value) {
        this.value = value;
    }
    ValueWrapper.prototype.equals = function (obj) {
        return this.constructor.name === obj.constructor.name && obj.value === this.value;
    };
    return ValueWrapper;
}());
exports.ValueWrapper = ValueWrapper;
var Int8 = /** @class */ (function (_super) {
    __extends(Int8, _super);
    function Int8() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Int8;
}(ValueWrapper));
exports.Int8 = Int8;
var Int16 = /** @class */ (function (_super) {
    __extends(Int16, _super);
    function Int16() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Int16;
}(ValueWrapper));
exports.Int16 = Int16;
var Int32 = /** @class */ (function (_super) {
    __extends(Int32, _super);
    function Int32() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Int32;
}(ValueWrapper));
exports.Int32 = Int32;
var Int64 = /** @class */ (function (_super) {
    __extends(Int64, _super);
    function Int64() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Int64;
}(ValueWrapper));
exports.Int64 = Int64;
var Float32 = /** @class */ (function (_super) {
    __extends(Float32, _super);
    function Float32() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Float32;
}(ValueWrapper));
exports.Float32 = Float32;
var Float64 = /** @class */ (function (_super) {
    __extends(Float64, _super);
    function Float64() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Float64;
}(ValueWrapper));
exports.Float64 = Float64;
var SecondsSince2001 = /** @class */ (function (_super) {
    __extends(SecondsSince2001, _super);
    function SecondsSince2001() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SecondsSince2001;
}(ValueWrapper));
exports.SecondsSince2001 = SecondsSince2001;
var UUID = /** @class */ (function (_super) {
    __extends(UUID, _super);
    function UUID(value) {
        var _this = this;
        assert_1.default(uuid.isValid(value), "invalid uuid format");
        _this = _super.call(this, value) || this;
        return _this;
    }
    return UUID;
}(ValueWrapper));
exports.UUID = UUID;
var DataFormatTags;
(function (DataFormatTags) {
    DataFormatTags[DataFormatTags["INVALID"] = 0] = "INVALID";
    DataFormatTags[DataFormatTags["TRUE"] = 1] = "TRUE";
    DataFormatTags[DataFormatTags["FALSE"] = 2] = "FALSE";
    DataFormatTags[DataFormatTags["TERMINATOR"] = 3] = "TERMINATOR";
    DataFormatTags[DataFormatTags["NULL"] = 4] = "NULL";
    DataFormatTags[DataFormatTags["UUID"] = 5] = "UUID";
    DataFormatTags[DataFormatTags["DATE"] = 6] = "DATE";
    DataFormatTags[DataFormatTags["INTEGER_MINUS_ONE"] = 7] = "INTEGER_MINUS_ONE";
    DataFormatTags[DataFormatTags["INTEGER_RANGE_START_0"] = 8] = "INTEGER_RANGE_START_0";
    DataFormatTags[DataFormatTags["INTEGER_RANGE_STOP_39"] = 46] = "INTEGER_RANGE_STOP_39";
    DataFormatTags[DataFormatTags["INT8"] = 48] = "INT8";
    DataFormatTags[DataFormatTags["INT16LE"] = 49] = "INT16LE";
    DataFormatTags[DataFormatTags["INT32LE"] = 50] = "INT32LE";
    DataFormatTags[DataFormatTags["INT64LE"] = 51] = "INT64LE";
    DataFormatTags[DataFormatTags["FLOAT32LE"] = 53] = "FLOAT32LE";
    DataFormatTags[DataFormatTags["FLOAT64LE"] = 54] = "FLOAT64LE";
    DataFormatTags[DataFormatTags["UTF8_LENGTH_START"] = 64] = "UTF8_LENGTH_START";
    DataFormatTags[DataFormatTags["UTF8_LENGTH_STOP"] = 96] = "UTF8_LENGTH_STOP";
    DataFormatTags[DataFormatTags["UTF8_LENGTH8"] = 97] = "UTF8_LENGTH8";
    DataFormatTags[DataFormatTags["UTF8_LENGTH16LE"] = 98] = "UTF8_LENGTH16LE";
    DataFormatTags[DataFormatTags["UTF8_LENGTH32LE"] = 99] = "UTF8_LENGTH32LE";
    DataFormatTags[DataFormatTags["UTF8_LENGTH64LE"] = 100] = "UTF8_LENGTH64LE";
    DataFormatTags[DataFormatTags["UTF8_NULL_TERMINATED"] = 111] = "UTF8_NULL_TERMINATED";
    DataFormatTags[DataFormatTags["DATA_LENGTH_START"] = 112] = "DATA_LENGTH_START";
    DataFormatTags[DataFormatTags["DATA_LENGTH_STOP"] = 144] = "DATA_LENGTH_STOP";
    DataFormatTags[DataFormatTags["DATA_LENGTH8"] = 145] = "DATA_LENGTH8";
    DataFormatTags[DataFormatTags["DATA_LENGTH16LE"] = 146] = "DATA_LENGTH16LE";
    DataFormatTags[DataFormatTags["DATA_LENGTH32LE"] = 147] = "DATA_LENGTH32LE";
    DataFormatTags[DataFormatTags["DATA_LENGTH64LE"] = 148] = "DATA_LENGTH64LE";
    DataFormatTags[DataFormatTags["DATA_TERMINATED"] = 159] = "DATA_TERMINATED";
    DataFormatTags[DataFormatTags["DEDUPLICATION_START"] = 160] = "DEDUPLICATION_START";
    DataFormatTags[DataFormatTags["DEDUPLICATION_STOP"] = 207] = "DEDUPLICATION_STOP";
    DataFormatTags[DataFormatTags["ARRAY_LENGTH_START"] = 208] = "ARRAY_LENGTH_START";
    DataFormatTags[DataFormatTags["ARRAY_LENGTH_STOP"] = 222] = "ARRAY_LENGTH_STOP";
    DataFormatTags[DataFormatTags["ARRAY_TERMINATED"] = 223] = "ARRAY_TERMINATED";
    DataFormatTags[DataFormatTags["DICTIONARY_LENGTH_START"] = 224] = "DICTIONARY_LENGTH_START";
    DataFormatTags[DataFormatTags["DICTIONARY_LENGTH_STOP"] = 238] = "DICTIONARY_LENGTH_STOP";
    DataFormatTags[DataFormatTags["DICTIONARY_TERMINATED"] = 239] = "DICTIONARY_TERMINATED";
})(DataFormatTags = exports.DataFormatTags || (exports.DataFormatTags = {}));
var DataStreamParser;
(function (DataStreamParser) {
    function decode(buffer) {
        var tag = buffer.readTag();
        if (tag === 0 /* INVALID */) {
            throw new Error("HDSDecoder: zero tag detected on index " + buffer.readerIndex);
        }
        else if (tag === 1 /* TRUE */) {
            return buffer.readTrue();
        }
        else if (tag === 2 /* FALSE */) {
            return buffer.readFalse();
        }
        else if (tag === 3 /* TERMINATOR */) {
            return Magics.TERMINATOR;
        }
        else if (tag === 4 /* NULL */) {
            return null;
        }
        else if (tag === 5 /* UUID */) {
            return buffer.readUUID();
        }
        else if (tag === 6 /* DATE */) {
            return buffer.readSecondsSince2001_01_01();
        }
        else if (tag === 7 /* INTEGER_MINUS_ONE */) {
            return buffer.readNegOne();
        }
        else if (tag >= 8 /* INTEGER_RANGE_START_0 */ && tag <= 46 /* INTEGER_RANGE_STOP_39 */) {
            return buffer.readIntRange(tag); // integer values from 0-39
        }
        else if (tag === 48 /* INT8 */) {
            return buffer.readInt8();
        }
        else if (tag === 49 /* INT16LE */) {
            return buffer.readInt16LE();
        }
        else if (tag === 50 /* INT32LE */) {
            return buffer.readInt32LE();
        }
        else if (tag === 51 /* INT64LE */) {
            return buffer.readInt64LE();
        }
        else if (tag === 53 /* FLOAT32LE */) {
            return buffer.readFloat32LE();
        }
        else if (tag === 54 /* FLOAT64LE */) {
            return buffer.readFloat64LE();
        }
        else if (tag >= 64 /* UTF8_LENGTH_START */ && tag <= 96 /* UTF8_LENGTH_STOP */) {
            var length = tag - 64 /* UTF8_LENGTH_START */;
            return buffer.readUTF8(length);
        }
        else if (tag === 97 /* UTF8_LENGTH8 */) {
            return buffer.readUTF8_Length8();
        }
        else if (tag === 98 /* UTF8_LENGTH16LE */) {
            return buffer.readUTF8_Length16LE();
        }
        else if (tag === 99 /* UTF8_LENGTH32LE */) {
            return buffer.readUTF8_Length32LE();
        }
        else if (tag === 100 /* UTF8_LENGTH64LE */) {
            return buffer.readUTF8_Length64LE();
        }
        else if (tag === 111 /* UTF8_NULL_TERMINATED */) {
            return buffer.readUTF8_NULL_terminated();
        }
        else if (tag >= 112 /* DATA_LENGTH_START */ && tag <= 144 /* DATA_LENGTH_STOP */) {
            var length = tag - 112 /* DATA_LENGTH_START */;
            buffer.readData(length);
        }
        else if (tag === 145 /* DATA_LENGTH8 */) {
            return buffer.readData_Length8();
        }
        else if (tag === 146 /* DATA_LENGTH16LE */) {
            return buffer.readData_Length16LE();
        }
        else if (tag === 147 /* DATA_LENGTH32LE */) {
            return buffer.readData_Length32LE();
        }
        else if (tag === 148 /* DATA_LENGTH64LE */) {
            return buffer.readData_Length64LE();
        }
        else if (tag === 159 /* DATA_TERMINATED */) {
            return buffer.readData_terminated();
        }
        else if (tag >= 160 /* DEDUPLICATION_START */ && tag <= 207 /* DEDUPLICATION_STOP */) {
            var index = tag - 160 /* DEDUPLICATION_START */;
            return buffer.deduplicateData(index);
        }
        else if (tag >= 208 /* ARRAY_LENGTH_START */ && tag <= 222 /* ARRAY_LENGTH_STOP */) {
            var length = tag - 208 /* ARRAY_LENGTH_START */;
            var array = [];
            for (var i = 0; i < length; i++) {
                array.push(decode(buffer));
            }
            return array;
        }
        else if (tag === 223 /* ARRAY_TERMINATED */) {
            var array = [];
            var element = void 0;
            while ((element = decode(buffer)) != Magics.TERMINATOR) {
                array.push(element);
            }
            return array;
        }
        else if (tag >= 224 /* DICTIONARY_LENGTH_START */ && tag <= 238 /* DICTIONARY_LENGTH_STOP */) {
            var length = tag - 224 /* DICTIONARY_LENGTH_START */;
            var dictionary = {};
            for (var i = 0; i < length; i++) {
                var key = decode(buffer);
                dictionary[key] = decode(buffer);
            }
            return dictionary;
        }
        else if (tag === 239 /* DICTIONARY_TERMINATED */) {
            var dictionary = {};
            var key = void 0;
            while ((key = decode(buffer)) != Magics.TERMINATOR) {
                dictionary[key] = decode(buffer); // decode value
            }
            return dictionary;
        }
        else {
            throw new Error("HDSDecoder: encountered unknown tag on index " + buffer.readerIndex + ": " + tag.toString(16));
        }
    }
    DataStreamParser.decode = decode;
    function encode(data, buffer) {
        if (data === undefined) {
            throw new Error("HDSEncoder: cannot encode undefined");
        }
        if (data === null) {
            buffer.writeTag(4 /* NULL */);
            return;
        }
        switch (typeof data) {
            case "boolean":
                if (data) {
                    buffer.writeTrue();
                }
                else {
                    buffer.writeFalse();
                }
                break;
            case "number":
                if (Number.isInteger(data)) {
                    buffer.writeNumber(data);
                }
                else {
                    buffer.writeFloat64LE(new Float64(data));
                }
                break;
            case "string":
                buffer.writeUTF8(data);
                break;
            case "object":
                if (Array.isArray(data)) {
                    var length = data.length;
                    if (length <= 12) {
                        buffer.writeTag(208 /* ARRAY_LENGTH_START */ + length);
                    }
                    else {
                        buffer.writeTag(223 /* ARRAY_TERMINATED */);
                    }
                    data.forEach(function (element) {
                        encode(element, buffer);
                    });
                    if (length > 12) {
                        buffer.writeTag(3 /* TERMINATOR */);
                    }
                }
                else if (data instanceof ValueWrapper) {
                    if (data instanceof Int8) {
                        buffer.writeInt8(data);
                    }
                    else if (data instanceof Int16) {
                        buffer.writeInt16LE(data);
                    }
                    else if (data instanceof Int32) {
                        buffer.writeInt32LE(data);
                    }
                    else if (data instanceof Int64) {
                        buffer.writeInt64LE(data);
                    }
                    else if (data instanceof Float32) {
                        buffer.writeFloat32LE(data);
                    }
                    else if (data instanceof Float64) {
                        buffer.writeFloat64LE(data);
                    }
                    else if (data instanceof SecondsSince2001) {
                        buffer.writeSecondsSince2001_01_01(data);
                    }
                    else if (data instanceof UUID) {
                        buffer.writeUUID(data.value);
                    }
                    else {
                        throw new Error("Unknown wrapped object 'ValueWrapper' of class " + data.constructor.name);
                    }
                }
                else if (data instanceof Buffer) {
                    buffer.writeData(data);
                }
                else { // object is treated as dictionary
                    var entries = Object.entries(data);
                    if (entries.length <= 14) {
                        buffer.writeTag(224 /* DICTIONARY_LENGTH_START */ + entries.length);
                    }
                    else {
                        buffer.writeTag(239 /* DICTIONARY_TERMINATED */);
                    }
                    entries.forEach(function (entry) {
                        encode(entry[0], buffer); // encode key
                        encode(entry[1], buffer); // encode value
                    });
                    if (entries.length > 14) {
                        buffer.writeTag(3 /* TERMINATOR */);
                    }
                }
                break;
            default:
                throw new Error("HDSEncoder: no idea how to encode value of type '" + (typeof data) + "': " + data);
        }
    }
    DataStreamParser.encode = encode;
})(DataStreamParser = exports.DataStreamParser || (exports.DataStreamParser = {}));
var DataStreamReader = /** @class */ (function () {
    function DataStreamReader(data) {
        this.deduplicationData = [];
        this.data = data;
        this.readerIndex = 0;
    }
    DataStreamReader.prototype.finished = function () {
        if (this.readerIndex < this.data.length) {
            var remainingHex = this.data.slice(this.readerIndex, this.data.length).toString("hex");
            debug("WARNING Finished reading HDS stream, but there are still %d bytes remaining () %s", this.data.length - this.readerIndex, remainingHex);
        }
    };
    DataStreamReader.prototype.deduplicateData = function (index) {
        if (index >= this.deduplicationData.length) {
            throw new Error("HDSDecoder: Tried deduplication of data for an index out of range (index " + index + " and got " + this.deduplicationData.length + " elements)");
        }
        return this.deduplicationData[index];
    };
    DataStreamReader.prototype.cache = function (data) {
        this.deduplicationData.push(data);
        return data;
    };
    DataStreamReader.prototype.ensureLength = function (bytes) {
        if (this.readerIndex + bytes > this.data.length) {
            var remaining = this.data.length - this.readerIndex;
            throw new Error("HDSDecoder: End of data stream. Tried reading " + bytes + " bytes however got only " + remaining + " remaining!");
        }
    };
    DataStreamReader.prototype.readTag = function () {
        this.ensureLength(1);
        return this.data.readUInt8(this.readerIndex++);
    };
    DataStreamReader.prototype.readTrue = function () {
        return this.cache(true); // do those tag encoded values get cached?
    };
    DataStreamReader.prototype.readFalse = function () {
        return this.cache(false);
    };
    DataStreamReader.prototype.readNegOne = function () {
        return this.cache(-1);
    };
    DataStreamReader.prototype.readIntRange = function (tag) {
        return this.cache(tag - 8 /* INTEGER_RANGE_START_0 */); // integer values from 0-39
    };
    DataStreamReader.prototype.readInt8 = function () {
        this.ensureLength(1);
        return this.cache(this.data.readInt8(this.readerIndex++));
    };
    DataStreamReader.prototype.readInt16LE = function () {
        this.ensureLength(2);
        var value = this.data.readInt16LE(this.readerIndex);
        this.readerIndex += 2;
        return this.cache(value);
    };
    DataStreamReader.prototype.readInt32LE = function () {
        this.ensureLength(4);
        var value = this.data.readInt32LE(this.readerIndex);
        this.readerIndex += 4;
        return this.cache(value);
    };
    DataStreamReader.prototype.readInt64LE = function () {
        this.ensureLength(8);
        var low = this.data.readInt32LE(this.readerIndex);
        var value = this.data.readInt32LE(this.readerIndex + 4) * 0x100000000 + low;
        if (low < 0) {
            value += 0x100000000;
        }
        this.readerIndex += 8;
        return this.cache(value);
    };
    DataStreamReader.prototype.readFloat32LE = function () {
        this.ensureLength(4);
        var value = this.data.readFloatLE(this.readerIndex);
        this.readerIndex += 4;
        return this.cache(value);
    };
    DataStreamReader.prototype.readFloat64LE = function () {
        this.ensureLength(8);
        var value = this.data.readDoubleLE(this.readerIndex);
        return this.cache(value);
    };
    DataStreamReader.prototype.readLength8 = function () {
        this.ensureLength(1);
        return this.data.readUInt8(this.readerIndex++);
    };
    DataStreamReader.prototype.readLength16LE = function () {
        this.ensureLength(2);
        var value = this.data.readUInt16LE(this.readerIndex);
        this.readerIndex += 2;
        return value;
    };
    DataStreamReader.prototype.readLength32LE = function () {
        this.ensureLength(4);
        var value = this.data.readUInt32LE(this.readerIndex);
        this.readerIndex += 4;
        return value;
    };
    DataStreamReader.prototype.readLength64LE = function () {
        this.ensureLength(8);
        var low = this.data.readUInt32LE(this.readerIndex);
        var value = this.data.readUInt32LE(this.readerIndex + 4) * 0x100000000 + low;
        this.readerIndex += 8;
        return value;
    };
    DataStreamReader.prototype.readUTF8 = function (length) {
        this.ensureLength(length);
        var value = this.data.toString('utf8', this.readerIndex, this.readerIndex + length);
        this.readerIndex += length;
        return this.cache(value);
    };
    DataStreamReader.prototype.readUTF8_Length8 = function () {
        var length = this.readLength8();
        return this.readUTF8(length);
    };
    DataStreamReader.prototype.readUTF8_Length16LE = function () {
        var length = this.readLength16LE();
        return this.readUTF8(length);
    };
    DataStreamReader.prototype.readUTF8_Length32LE = function () {
        var length = this.readLength32LE();
        return this.readUTF8(length);
    };
    DataStreamReader.prototype.readUTF8_Length64LE = function () {
        var length = this.readLength64LE();
        return this.readUTF8(length);
    };
    DataStreamReader.prototype.readUTF8_NULL_terminated = function () {
        var offset = this.readerIndex;
        var nextByte;
        for (;;) {
            nextByte = this.data[offset];
            if (nextByte === undefined) {
                throw new Error("HDSDecoder: Reached end of data stream while reading NUL terminated string!");
            }
            else if (nextByte === 0) {
                break;
            }
            else {
                offset++;
            }
        }
        var value = this.data.toString('utf8', this.readerIndex, offset);
        this.readerIndex = offset + 1;
        return this.cache(value);
    };
    DataStreamReader.prototype.readData = function (length) {
        this.ensureLength(length);
        var value = this.data.slice(this.readerIndex, this.readerIndex + length);
        this.readerIndex += length;
        return this.cache(value);
    };
    DataStreamReader.prototype.readData_Length8 = function () {
        var length = this.readLength8();
        return this.readData(length);
    };
    DataStreamReader.prototype.readData_Length16LE = function () {
        var length = this.readLength16LE();
        return this.readData(length);
    };
    DataStreamReader.prototype.readData_Length32LE = function () {
        var length = this.readLength32LE();
        return this.readData(length);
    };
    DataStreamReader.prototype.readData_Length64LE = function () {
        var length = this.readLength64LE();
        return this.readData(length);
    };
    DataStreamReader.prototype.readData_terminated = function () {
        var offset = this.readerIndex;
        var nextByte;
        for (;;) {
            nextByte = this.data[offset];
            if (nextByte === undefined) {
                throw new Error("HDSDecoder: Reached end of data stream while reading terminated data!");
            }
            else if (nextByte === 3 /* TERMINATOR */) {
                break;
            }
            else {
                offset++;
            }
        }
        var value = this.data.slice(this.readerIndex, offset);
        this.readerIndex = offset + 1;
        return this.cache(value);
    };
    DataStreamReader.prototype.readSecondsSince2001_01_01 = function () {
        // second since 2001-01-01 00:00:00
        return this.readFloat64LE();
    };
    DataStreamReader.prototype.readUUID = function () {
        this.ensureLength(16);
        var value = uuid.unparse(this.data, this.readerIndex);
        this.readerIndex += 16;
        return this.cache(value);
    };
    return DataStreamReader;
}());
exports.DataStreamReader = DataStreamReader;
var WrittenDataList = /** @class */ (function () {
    function WrittenDataList() {
        this.writtenData = [];
    }
    WrittenDataList.prototype.push = function (data) {
        this.writtenData.push(data);
    };
    WrittenDataList.prototype.indexOf = function (data) {
        for (var i = 0; i < this.writtenData.length; i++) {
            var data0 = this.writtenData[i];
            if (data === data0) {
                return i;
            }
            if (data instanceof ValueWrapper && data0 instanceof ValueWrapper) {
                if (data.equals(data0)) {
                    return i;
                }
            }
        }
        return -1;
    };
    return WrittenDataList;
}());
var DataStreamWriter = /** @class */ (function () {
    function DataStreamWriter() {
        this.writtenData = new WrittenDataList();
        this.data = Buffer.alloc(DataStreamWriter.chunkSize);
        this.writerIndex = 0;
    }
    DataStreamWriter.prototype.length = function () {
        return this.writerIndex; // since writerIndex points to the next FREE index it also represents the length
    };
    DataStreamWriter.prototype.getData = function () {
        return this.data.slice(0, this.writerIndex);
    };
    DataStreamWriter.prototype.ensureLength = function (bytes) {
        var neededBytes = (this.writerIndex + bytes) - this.data.length;
        if (neededBytes > 0) {
            var chunks = Math.ceil(neededBytes / DataStreamWriter.chunkSize);
            // don't know if it's best for performance to immediately concatenate the buffers. That way it's
            // the easiest way to handle writing though.
            this.data = Buffer.concat([this.data, Buffer.alloc(chunks * DataStreamWriter.chunkSize)]);
        }
    };
    DataStreamWriter.prototype.checkDeduplication = function (data) {
        var index = this.writtenData.indexOf(data);
        if (index < 0) {
            // data is not present yet
            this.writtenData.push(data);
            return false;
        }
        else if (index <= 207 /* DEDUPLICATION_STOP */ - 160 /* DEDUPLICATION_START */) {
            // data was already written and the index is in the applicable range => shorten the payload
            this.writeTag(160 /* DEDUPLICATION_START */ + index);
            return true;
        }
        return false;
    };
    DataStreamWriter.prototype.writeTag = function (tag) {
        this.ensureLength(1);
        this.data.writeUInt8(tag, this.writerIndex++);
    };
    DataStreamWriter.prototype.writeTrue = function () {
        this.writeTag(1 /* TRUE */);
    };
    DataStreamWriter.prototype.writeFalse = function () {
        this.writeTag(2 /* FALSE */);
    };
    DataStreamWriter.prototype.writeNumber = function (number) {
        if (number === -1) {
            this.writeTag(7 /* INTEGER_MINUS_ONE */);
        }
        else if (number >= 0 && number <= 39) {
            this.writeTag(8 /* INTEGER_RANGE_START_0 */ + number);
        }
        else if (number >= -128 && number <= 127) {
            this.writeInt8(new Int8(number));
        }
        else if (number >= -32768 && number <= 32767) {
            this.writeInt16LE(new Int16(number));
        }
        else if (number >= -2147483648 && number <= -2147483648) {
            this.writeInt32LE(new Int32(number));
        }
        else if (number >= Number.MIN_SAFE_INTEGER && number <= Number.MAX_SAFE_INTEGER) { // use correct uin64 restriction when we convert to bigint
            this.writeInt64LE(new Int64(number));
        }
        else {
            throw new Error("Tried writing unrepresentable number (" + number + ")");
        }
    };
    DataStreamWriter.prototype.writeInt8 = function (int8) {
        if (this.checkDeduplication(int8)) {
            return;
        }
        this.ensureLength(2);
        this.writeTag(48 /* INT8 */);
        this.data.writeInt8(int8.value, this.writerIndex++);
    };
    DataStreamWriter.prototype.writeInt16LE = function (int16) {
        if (this.checkDeduplication(int16)) {
            return;
        }
        this.ensureLength(3);
        this.writeTag(49 /* INT16LE */);
        this.data.writeInt16LE(int16.value, this.writerIndex);
        this.writerIndex += 2;
    };
    DataStreamWriter.prototype.writeInt32LE = function (int32) {
        if (this.checkDeduplication(int32)) {
            return;
        }
        this.ensureLength(5);
        this.writeTag(50 /* INT32LE */);
        this.data.writeInt32LE(int32.value, this.writerIndex);
        this.writerIndex += 4;
    };
    DataStreamWriter.prototype.writeInt64LE = function (int64) {
        if (this.checkDeduplication(int64)) {
            return;
        }
        this.ensureLength(9);
        this.writeTag(51 /* INT64LE */);
        this.data.writeUInt32LE(int64.value, this.writerIndex); // TODO correctly implement int64; currently it's basically an int32
        this.data.writeUInt32LE(0, this.writerIndex + 4);
        this.writerIndex += 8;
    };
    DataStreamWriter.prototype.writeFloat32LE = function (float32) {
        if (this.checkDeduplication(float32)) {
            return;
        }
        this.ensureLength(5);
        this.writeTag(53 /* FLOAT32LE */);
        this.data.writeFloatLE(float32.value, this.writerIndex);
        this.writerIndex += 4;
    };
    DataStreamWriter.prototype.writeFloat64LE = function (float64) {
        if (this.checkDeduplication(float64)) {
            return;
        }
        this.ensureLength(9);
        this.writeTag(54 /* FLOAT64LE */);
        this.data.writeDoubleLE(float64.value, this.writerIndex);
        this.writerIndex += 8;
    };
    DataStreamWriter.prototype.writeLength8 = function (length) {
        this.ensureLength(1);
        this.data.writeUInt8(length, this.writerIndex++);
    };
    DataStreamWriter.prototype.writeLength16LE = function (length) {
        this.ensureLength(2);
        this.data.writeUInt16LE(length, this.writerIndex);
        this.writerIndex += 2;
    };
    DataStreamWriter.prototype.writeLength32LE = function (length) {
        this.ensureLength(4);
        this.data.writeUInt32LE(length, this.writerIndex);
        this.writerIndex += 4;
    };
    DataStreamWriter.prototype.writeLength64LE = function (length) {
        this.ensureLength(8);
        hapCrypto.writeUInt64LE(length, this.data, this.writerIndex);
        this.writerIndex += 8;
    };
    DataStreamWriter.prototype.writeUTF8 = function (utf8) {
        if (this.checkDeduplication(utf8)) {
            return;
        }
        var length = Buffer.byteLength(utf8);
        if (length <= 32) {
            this.ensureLength(1 + length);
            this.writeTag(64 /* UTF8_LENGTH_START */ + utf8.length);
            this._writeUTF8(utf8);
        }
        else if (length <= 255) {
            this.writeUTF8_Length8(utf8);
        }
        else if (length <= 65535) {
            this.writeUTF8_Length16LE(utf8);
        }
        else if (length <= 4294967295) {
            this.writeUTF8_Length32LE(utf8);
        }
        else if (length <= Number.MAX_SAFE_INTEGER) { // use correct uin64 restriction when we convert to bigint
            this.writeUTF8_Length64LE(utf8);
        }
        else {
            this.writeUTF8_NULL_terminated(utf8);
        }
    };
    DataStreamWriter.prototype._writeUTF8 = function (utf8) {
        var byteLength = Buffer.byteLength(utf8);
        this.ensureLength(byteLength);
        this.data.write(utf8, this.writerIndex, undefined, "utf8");
        this.writerIndex += byteLength;
    };
    DataStreamWriter.prototype.writeUTF8_Length8 = function (utf8) {
        var length = Buffer.byteLength(utf8);
        this.ensureLength(2 + length);
        this.writeTag(97 /* UTF8_LENGTH8 */);
        this.writeLength8(length);
        this._writeUTF8(utf8);
    };
    DataStreamWriter.prototype.writeUTF8_Length16LE = function (utf8) {
        var length = Buffer.byteLength(utf8);
        this.ensureLength(3 + length);
        this.writeTag(98 /* UTF8_LENGTH16LE */);
        this.writeLength16LE(length);
        this._writeUTF8(utf8);
    };
    DataStreamWriter.prototype.writeUTF8_Length32LE = function (utf8) {
        var length = Buffer.byteLength(utf8);
        this.ensureLength(5 + length);
        this.writeTag(99 /* UTF8_LENGTH32LE */);
        this.writeLength32LE(length);
        this._writeUTF8(utf8);
    };
    DataStreamWriter.prototype.writeUTF8_Length64LE = function (utf8) {
        var length = Buffer.byteLength(utf8);
        this.ensureLength(9 + length);
        this.writeTag(100 /* UTF8_LENGTH64LE */);
        this.writeLength64LE(length);
        this._writeUTF8(utf8);
    };
    DataStreamWriter.prototype.writeUTF8_NULL_terminated = function (utf8) {
        this.ensureLength(1 + Buffer.byteLength(utf8) + 1);
        this.writeTag(111 /* UTF8_NULL_TERMINATED */);
        this._writeUTF8(utf8);
        this.data.writeUInt8(0, this.writerIndex++);
    };
    DataStreamWriter.prototype.writeData = function (data) {
        if (this.checkDeduplication(data)) {
            return;
        }
        if (data.length <= 32) {
            this.writeTag(112 /* DATA_LENGTH_START */ + data.length);
            this._writeData(data);
        }
        else if (data.length <= 255) {
            this.writeData_Length8(data);
        }
        else if (data.length <= 65535) {
            this.writeData_Length16LE(data);
        }
        else if (data.length <= 4294967295) {
            this.writeData_Length32LE(data);
        }
        else if (data.length <= Number.MAX_SAFE_INTEGER) {
            this.writeData_Length64LE(data);
        }
        else {
            this.writeData_terminated(data);
        }
    };
    DataStreamWriter.prototype._writeData = function (data) {
        this.ensureLength(data.length);
        for (var i = 0; i < data.length; i++) {
            this.data[this.writerIndex++] = data[i];
        }
    };
    DataStreamWriter.prototype.writeData_Length8 = function (data) {
        this.ensureLength(2 + data.length);
        this.writeTag(145 /* DATA_LENGTH8 */);
        this.writeLength8(data.length);
        this._writeData(data);
    };
    DataStreamWriter.prototype.writeData_Length16LE = function (data) {
        this.ensureLength(3 + data.length);
        this.writeTag(146 /* DATA_LENGTH16LE */);
        this.writeLength16LE(data.length);
        this._writeData(data);
    };
    DataStreamWriter.prototype.writeData_Length32LE = function (data) {
        this.ensureLength(5 + data.length);
        this.writeTag(147 /* DATA_LENGTH32LE */);
        this.writeLength32LE(data.length);
        this._writeData(data);
    };
    DataStreamWriter.prototype.writeData_Length64LE = function (data) {
        this.ensureLength(9 + data.length);
        this.writeTag(148 /* DATA_LENGTH64LE */);
        this.writeLength64LE(data.length);
        this._writeData(data);
    };
    DataStreamWriter.prototype.writeData_terminated = function (data) {
        this.ensureLength(1 + data.length + 1);
        this.writeTag(159 /* DATA_TERMINATED */);
        this._writeData(data);
        this.writeTag(3 /* TERMINATOR */);
    };
    DataStreamWriter.prototype.writeSecondsSince2001_01_01 = function (seconds) {
        if (this.checkDeduplication(seconds)) {
            return;
        }
        this.ensureLength(9);
        this.writeTag(6 /* DATE */);
        this.data.writeDoubleLE(seconds.value, this.writerIndex);
        this.writerIndex += 8;
    };
    DataStreamWriter.prototype.writeUUID = function (uuid_string) {
        assert_1.default(uuid.isValid(uuid_string), "supplied uuid is invalid");
        if (this.checkDeduplication(new UUID(uuid_string))) {
            return;
        }
        this.ensureLength(17);
        this.writeTag(5 /* UUID */);
        uuid.write(uuid_string, this.data, this.writerIndex);
        this.writerIndex += 16;
    };
    DataStreamWriter.chunkSize = 128; // seems to be a good default
    return DataStreamWriter;
}());
exports.DataStreamWriter = DataStreamWriter;
//# sourceMappingURL=DataStreamParser.js.map