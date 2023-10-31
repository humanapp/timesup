import { server } from "./server";
import { Device } from "./types";
import * as env from "./env";
import * as db from "./db";
import * as util from "./util";

export async function initAsync() {
    // GET /api/devices
    server.get<{ Headers: { passkey: string } }>(
        "/api/devices",
        async (req, res) => {
            const { passkey } = req.headers;
            if (passkey !== env.getSetting("PASSKEY")) {
                return res.status(401).send();
            }
            let ds: Device[] = [];
            const dm = await db.getDevicesAsync();
            if (dm) {
                ds = Object.values(dm).sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
            }
            return res
                .status(200)
                .header("Cache-Control", "no-cache, no-store")
                .send(ds);
        }
    );

    // POST /api/devices/add
    server.post<{
        Querystring: { name: string };
        Reply: { deviceid?: string };
        Headers: { passkey: string };
    }>("/api/devices/add", async (req, res) => {
        const { passkey } = req.headers;
        if (passkey !== env.getSetting("PASSKEY")) {
            return res.status(401).send();
        }
        const { name } = req.query;
        const deviceid = util.uniqueId();
        let device: Device = await db.getDeviceAsync(deviceid);
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
    server.post<{
        Querystring: { deviceid: string };
        Headers: { passkey: string };
    }>("/api/devices/remove", async (req, res) => {
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
    server.post<{
        Querystring: { deviceid: string; minutes: number };
        Headers: { passkey: string };
    }>("/api/devices/settimer", async (req, res) => {
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
    server.post<{
        Querystring: { deviceid: string };
        Headers: { passkey: string };
    }>("/api/devices/canceltimer", async (req, res) => {
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
