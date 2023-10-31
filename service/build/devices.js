"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAsync = void 0;
const server_1 = require("./server");
const env = __importStar(require("./env"));
const db = __importStar(require("./db"));
const util = __importStar(require("./util"));
async function initAsync() {
    // GET /api/devices
    server_1.server.get("/api/devices", async (req, res) => {
        const { passkey } = req.headers;
        if (passkey !== env.getSetting("PASSKEY")) {
            return res.status(401).send();
        }
        let ds = [];
        const dm = await db.getDevicesAsync();
        if (dm) {
            ds = Object.values(dm).sort((a, b) => a.name.localeCompare(b.name));
        }
        return res
            .status(200)
            .header("Cache-Control", "no-cache, no-store")
            .send(ds);
    });
    // POST /api/devices/add
    server_1.server.post("/api/devices/add", async (req, res) => {
        const { passkey } = req.headers;
        if (passkey !== env.getSetting("PASSKEY")) {
            return res.status(401).send();
        }
        const { name } = req.query;
        const deviceid = util.uniqueId();
        let device = await db.getDeviceAsync(deviceid);
        if (device) {
            return res.status(409).send();
        }
        device = {
            id: deviceid,
            name: name,
            lastSeen: 0,
            timerStart: 0,
            timerDuration: 0,
        };
        await db.setDeviceAsync(device);
        return res.status(200).send({ deviceid });
    });
    // POST /api/devices/remove
    server_1.server.post("/api/devices/remove", async (req, res) => {
        const { passkey } = req.headers;
        if (passkey !== env.getSetting("PASSKEY")) {
            return res.status(401).send();
        }
        const { deviceid } = req.query;
        const device = await db.getDeviceAsync(deviceid);
        if (!device) {
            return res.status(404).send();
        }
        await db.delDeviceAsync(deviceid);
        return res.status(200).send();
    });
    // POST /api/devices/settimes
    server_1.server.post("/api/devices/settimer", async (req, res) => {
        const { passkey } = req.headers;
        if (passkey !== env.getSetting("PASSKEY")) {
            return res.status(401).send();
        }
        const { deviceid, minutes } = req.query;
        const device = await db.getDeviceAsync(deviceid);
        if (!device) {
            return res.status(404).send();
        }
        device.timerStart = Date.now();
        device.timerDuration = minutes;
        return res.status(200).send();
    });
    // POST /api/devices/canceltimer
    server_1.server.post("/api/devices/canceltimer", async (req, res) => {
        const { passkey } = req.headers;
        if (passkey !== env.getSetting("PASSKEY")) {
            return res.status(401).send();
        }
        const { deviceid } = req.query;
        const device = await db.getDeviceAsync(deviceid);
        if (!device) {
            return res.status(404).send();
        }
        device.timerStart = 0;
        device.timerDuration = 0;
        return res.status(200).send();
    });
}
exports.initAsync = initAsync;
//# sourceMappingURL=devices.js.map