import { server } from "./server";
import { ShutdownAtEvent, ShutdownInEvent } from "./types";
import * as env from "./env";
import * as db from "./db";
import * as util from "./util";

const REFRESH_INTERVAL = 5 * 60 * 1000;

async function refreshAsync() {
    try {
        const dvs = Object.values(await db.getDevicesAsync());
        for (const dv of dvs) {
            const sht = await db.getShutdownAsync(dv.id);
            if (!sht) continue;
            switch (sht.type) {
                case "shutdown-at": {
                    if (sht.shutdownAt < Date.now()) {
                        db.delShutdownAsync(dv.id);
                    }
                    break;
                }
                case "shutdown-in": {
                    if (sht.startedAt + sht.durationMins * 60 * 1000 < Date.now()) {
                        db.delShutdownAsync(dv.id);
                    }
                    break;
                }
            }
        }
    } catch (e: any) {
        console.error(e.toString());
    }

    setTimeout(refreshAsync, (REFRESH_INTERVAL + Math.random() * 1000) | 0);
}

export async function initAsync() {
    // Periodically clear out stale shutdowns
    setTimeout(refreshAsync, REFRESH_INTERVAL);

    // GET /api/shutdown
    server.get<{
        Querystring: {
            deviceid: string;
        };
    }>("/api/shutdown", async (req, res) => {
        const { deviceid } = req.query;
        const device = await db.getDeviceAsync(deviceid);
        if (!device) {
            return res.status(404).send();
        }
        const sht = (await db.getShutdownAsync(deviceid)) ?? {};
        return res
            .status(200)
            .header("Cache-Control", "no-cache, no-store")
            .send(sht);
    });

    // POST /api/shutdown/in
    server.post<{
        Body: {
            deviceid: string;
            durationMins: number; // minutes
        };
    }>("/api/shutdown/in", async (req, res) => {
        const { passkey } = req.headers;
        if (passkey !== env.getSetting("PASSKEY")) {
            return res.status(401).send();
        }
        const { deviceid, durationMins } = req.body;
        const device = await db.getDeviceAsync(deviceid);
        if (!device) {
            return res.status(404).send();
        }
        const event: ShutdownInEvent = {
            id: util.uniqueId(),
            type: "shutdown-in",
            startedAt: Date.now(),
            durationMins,
        };
        await db.setShutdownAsync(deviceid, event);
        return res.status(200).send();
    });

    // POST /api/shutdown/at
    server.post<{
        Body: {
            deviceid: string;
            shutdownAt: number; // unix timestamp
        };
    }>("/api/shutdown/at", async (req, res) => {
        const { passkey } = req.headers;
        if (passkey !== env.getSetting("PASSKEY")) {
            return res.status(401).send();
        }
        const { deviceid, shutdownAt } = req.body;
        const device = await db.getDeviceAsync(deviceid);
        if (!device) {
            return res.status(404).send();
        }
        const event: ShutdownAtEvent = {
            id: util.uniqueId(),
            type: "shutdown-at",
            shutdownAt,
        };
        await db.setShutdownAsync(deviceid, event);
        return res.status(200).send();
    });

    // POST /api/shutdown/cancel
    server.post<{
        Body: {
            deviceid: string;
        };
    }>("/api/shutdown/cancel", async (req, res) => {
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
