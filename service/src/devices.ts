import { customAlphabet } from "nanoid";
import { server } from "./server";
import { Device } from "./types";
import * as env from "./env";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4);

// TODO: Put in a file
export const devices: { [id: string]: Device } = {};

export async function initAsync() {
    server.get<{ Headers: { passkey: string } }>(
        "/api/devices",
        async (req, res) => {
            const { passkey } = req.headers;
            if (passkey !== env.getSetting("PASSKEY")) {
                return res.status(401).send();
            }
            const ds = Object.values(devices).sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            if (ds) {
                return res
                    .status(200)
                    .header("Cache-Control", "no-cache, no-store")
                    .send(ds);
            } else {
                return res.status(404).send();
            }
        }
    );

    server.post<{
        Body: { name: string };
        Reply: { deviceid?: string };
        Headers: { passkey: string };
    }>("/api/devices/add", async (req, res) => {
        const { passkey } = req.headers;
        if (passkey !== env.getSetting("PASSKEY")) {
            return res.status(401).send();
        }
        const { name } = req.body;
        const deviceid = nanoid();
        const device = devices[deviceid];
        if (device) {
            return res.status(409).send();
        }
        devices[deviceid] = {
            id: deviceid,
            name: name,
            lastSeen: 0,
            timerStart: 0,
            timerDuration: 0,
        };
        return res.status(200).send({ deviceid });
    });

    server.post<{
        Body: { deviceid: string };
        Headers: { passkey: string };
    }>("/api/devices/remove", async (req, res) => {
        const { passkey } = req.headers;
        if (passkey !== env.getSetting("PASSKEY")) {
            return res.status(401).send();
        }
        const { deviceid } = req.body;
        const device = devices[deviceid];
        if (!device) {
            return res.status(404).send();
        }
        delete devices[deviceid];
        return res.status(200).send();
    });

    server.post<{
        Body: { deviceid: string; minutes: number };
        Headers: { passkey: string };
    }>("/api/devices/settimer", async (req, res) => {
        const { passkey } = req.headers;
        if (passkey !== env.getSetting("PASSKEY")) {
            return res.status(401).send();
        }
        const { deviceid, minutes } = req.body;
        const device = devices[deviceid];
        if (!device) {
            return res.status(404).send();
        }
        device.timerStart = Date.now();
        device.timerDuration = minutes;
        return res.status(200).send();
    });

    server.post<{
        Body: { deviceid: string };
        Headers: { passkey: string };
    }>("/api/devices/canceltimer", async (req, res) => {
        const { passkey } = req.headers;
        if (passkey !== env.getSetting("PASSKEY")) {
            return res.status(401).send();
        }
        const { deviceid } = req.body;
        const device = devices[deviceid];
        if (!device) {
            return res.status(404).send();
        }
        device.timerStart = 0;
        device.timerDuration = 0;
        return res.status(200).send();
    });
}
