"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = void 0;
/**
 * A simple clone function that also allows you to pass an "extend" object whose properties will be
 * added to the cloned copy of the original object passed.
 */
function clone(object, extend) {
    var cloned = {};
    for (var key in object) {
        cloned[key] = object[key];
    }
    for (var key2 in extend) {
        cloned[key2] = extend[key2];
    }
    return cloned;
}
exports.clone = clone;
;
//# sourceMappingURL=clone.js.map