"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delShutdownAsync = exports.setShutdownAsync = exports.getShutdownAsync = exports.getMessagesAsync = exports.delMessageAsync = exports.addMessageAsync = exports.delDeviceAsync = exports.setDeviceAsync = exports.getDeviceAsync = exports.getDevicesAsync = exports.initAsync = void 0;
const node_json_db_1 = require("node-json-db");
const fs_1 = __importDefault(require("fs"));
try {
    fs_1.default.mkdirSync("./db");
}
catch (e) { }
const devices = new node_json_db_1.JsonDB(new node_json_db_1.Config("./db/devices.json", true, true, undefined, true));
const messages = new node_json_db_1.JsonDB(new node_json_db_1.Config("./db/messages.json", true, true, undefined, true));
const shutdowns = new node_json_db_1.JsonDB(new node_json_db_1.Config("./db/shutdowns.json", true, true, undefined, true));
async function initAsync() { }
exports.initAsync = initAsync;
async function getDevicesAsync() {
    return await devices.getObjectDefault("/devices");
}
exports.getDevicesAsync = getDevicesAsync;
async function getDeviceAsync(deviceid) {
    return await devices.getObjectDefault(`/devices/${deviceid}`);
}
exports.getDeviceAsync = getDeviceAsync;
async function setDeviceAsync(device) {
    await devices.push(`/devices/${device.id}`, device);
}
exports.setDeviceAsync = setDeviceAsync;
async function delDeviceAsync(deviceid) {
    await devices.delete(`/devices/${deviceid}`);
}
exports.delDeviceAsync = delDeviceAsync;
async function addMessageAsync(deviceid, message) {
    await messages.push(`/devices/${deviceid}/messages/${message.id}`, message);
}
exports.addMessageAsync = addMessageAsync;
async function delMessageAsync(deviceid, messageid) {
    await messages.delete(`/devices/${deviceid}/messages/${messageid}`);
}
exports.delMessageAsync = delMessageAsync;
async function getMessagesAsync(deviceid) {
    var _a;
    const map = (_a = (await messages.getObjectDefault(`/devices/${deviceid}/messages`))) !== null && _a !== void 0 ? _a : {};
    const arr = Object.values(map).sort((a, b) => a.createdAt - b.createdAt);
    return arr;
}
exports.getMessagesAsync = getMessagesAsync;
async function getShutdownAsync(deviceid) {
    return await shutdowns.getObjectDefault(`/devices/${deviceid}`);
}
exports.getShutdownAsync = getShutdownAsync;
async function setShutdownAsync(deviceid, shutdown) {
    return await shutdowns.push(`/devices/${deviceid}`, shutdown);
}
exports.setShutdownAsync = setShutdownAsync;
async function delShutdownAsync(deviceid) {
    return await shutdowns.delete(`/devices/${deviceid}`);
}
exports.delShutdownAsync = delShutdownAsync;
//# sourceMappingURL=db.js.map