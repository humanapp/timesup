"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueId = void 0;
const nanoid_1 = require("nanoid");
const nanoid = (0, nanoid_1.customAlphabet)("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4);
function uniqueId(size = 4) {
    return nanoid(size);
}
exports.uniqueId = uniqueId;
//# sourceMappingURL=util.js.map