"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLongForm = exports.toShortForm = exports.write = exports.unparse = exports.isValid = exports.generate = void 0;
var crypto_1 = __importDefault(require("crypto"));
// http://stackoverflow.com/a/25951500/66673
function generate(data) {
    var sha1sum = crypto_1.default.createHash('sha1');
    sha1sum.update(data);
    var s = sha1sum.digest('hex');
    var i = -1;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        i += 1;
        switch (c) {
            case 'y':
                return ((parseInt('0x' + s[i], 16) & 0x3) | 0x8).toString(16);
            case 'x':
            default:
                return s[i];
        }
    });
}
exports.generate = generate;
var VALID_UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isValid(UUID) {
    return VALID_UUID_REGEX.test(UUID);
}
exports.isValid = isValid;
// https://github.com/defunctzombie/node-uuid/blob/master/uuid.js
function unparse(buf, offset) {
    if (offset === void 0) { offset = 0; }
    if (typeof buf === "string" && isValid(buf)) {
        /*
          This check was added to fix backwards compatibility with the old style CameraSource API.
          The old StreamController implementation would not unparse the HAP provided sessionId for the current streaming session.
          This was changed when the new Controller API was introduced, which now turns the sessionId Buffer into a string
          and passes it to the implementor of the Camera.
          Old style CameraSource implementations would use this unparse function to turn the Buffer into a string.
          As the sessionId is already a string we just return it here.
    
          The buf attribute being a also type of "string" as actually an error. Also I don't know who decided to
          not unparse the sessionId. I'm only here to fix things.
         */
        return buf;
    }
    var i = offset;
    return buf[i++].toString(16) + buf[i++].toString(16) +
        buf[i++].toString(16) + buf[i++].toString(16) + '-' +
        buf[i++].toString(16) + buf[i++].toString(16) + '-' +
        buf[i++].toString(16) + buf[i++].toString(16) + '-' +
        buf[i++].toString(16) + buf[i++].toString(16) + '-' +
        buf[i++].toString(16) + buf[i++].toString(16) +
        buf[i++].toString(16) + buf[i++].toString(16) +
        buf[i++].toString(16) + buf[i++].toString(16);
}
exports.unparse = unparse;
function write(uuid, buf, offset) {
    if (buf === void 0) { buf = Buffer.alloc(16); }
    if (offset === void 0) { offset = 0; }
    uuid = uuid.replace(/-/g, "");
    for (var i = 0; i < uuid.length; i += 2) {
        var octet = uuid.substring(i, i + 2);
        buf.write(octet, offset++, undefined, "hex");
    }
    return buf;
}
exports.write = write;
var SHORT_FORM_REGEX = /^0*([0-9a-f]{1,8})-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
function toShortForm(uuid, base) {
    if (!isValid(uuid))
        throw new TypeError('uuid was not a valid UUID or short form UUID');
    if (base && !isValid('00000000' + base))
        throw new TypeError('base was not a valid base UUID');
    if (base && !uuid.endsWith(base))
        return uuid.toUpperCase();
    return uuid.replace(SHORT_FORM_REGEX, '$1').toUpperCase();
}
exports.toShortForm = toShortForm;
var VALID_SHORT_REGEX = /^[0-9a-f]{1,8}$/i;
function toLongForm(uuid, base) {
    if (isValid(uuid))
        return uuid.toUpperCase();
    if (!VALID_SHORT_REGEX.test(uuid))
        throw new TypeError('uuid was not a valid UUID or short form UUID');
    if (!isValid('00000000' + base))
        throw new TypeError('base was not a valid base UUID');
    return (('00000000' + uuid).substr(-8) + base).toUpperCase();
}
exports.toLongForm = toLongForm;
//# sourceMappingURL=uuid.js.map