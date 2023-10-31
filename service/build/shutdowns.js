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
    // GET /api/shutdown
    server_1.server.get("/api/shutdown", async (req, res) => {
        var _a;
        const { deviceid } = req.query;
        const device = await db.getDeviceAsync(deviceid);
        if (!device) {
            return res.status(404).send();
        }
        const sht = (_a = (await db.getShutdownAsync(deviceid))) !== null && _a !== void 0 ? _a : {};
        return res
            .status(200)
            .header("Cache-Control", "no-cache, no-store")
            .send(sht);
    });
    // POST /api/shutdown/in
    server_1.server.post("/api/shutdown/in", async (req, res) => {
        const { passkey } = req.headers;
        if (passkey !== env.getSetting("PASSKEY")) {
            return res.status(401).send();
        }
        const { deviceid, shutdownIn } = req.body;
        const device = await db.getDeviceAsync(deviceid);
        if (!device) {
            return res.status(404).send();
        }
        const event = {
            id: util.uniqueId(),
            type: "shutdown-in",
            createdAt: Date.now(),
            startedAt: Date.now(),
            duration: shutdownIn,
        };
        await db.setShutdownAsync(deviceid, event);
        return res.status(200).send();
    });
    // POST /api/shutdown/at
    server_1.server.post("/api/shutdown/at", async (req, res) => {
        const { passkey } = req.headers;
        if (passkey !== env.getSetting("PASSKEY")) {
            return res.status(401).send();
        }
        const { deviceid, shutdownAt } = req.body;
        const device = await db.getDeviceAsync(deviceid);
        if (!device) {
            return res.status(404).send();
        }
        const event = {
            id: util.uniqueId(),
            type: "shutdown-at",
            createdAt: Date.now(),
            shutdownAt,
        };
        await db.setShutdownAsync(deviceid, event);
        return res.status(200).send();
    });
    // POST /api/shutdown/cancel
    server_1.server.post("/api/shutdown/cancel", async (req, res) => {
        const { passkey } = req.headers;
        if (passkey !== env.getSetting("PASSKEY")) {
            return res.status(401).send();
        }
        const { deviceid } = req.body;
        const device = await db.getDeviceAsync(deviceid);
        if (!device) {
            return res.status(404).send();
        }
        await db.delShutdownAsync(deviceid);
    });
}
exports.initAsync = initAsync;
//# sourceMappingURL=shutdowns.js.map