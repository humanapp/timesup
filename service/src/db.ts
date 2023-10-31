import { JsonDB, Config } from "node-json-db";
import fs from "fs";
import {
    Device,
    DeviceMap,
    ShutdownEvent,
    MessageEvent,
    MessageMap,
} from "./types";
import * as util from "./util";

try {
    fs.mkdirSync("./db");
} catch (e) {}

const devices = new JsonDB(
    new Config("./db/devices.json", true, true, undefined, true)
);
const messages = new JsonDB(
    new Config("./db/messages.json", true, true, undefined, true)
);
const shutdowns = new JsonDB(
    new Config("./db/shutdowns.json", true, true, undefined, true)
);

export async function initAsync() {}

export async function getDevicesAsync(): Promise<DeviceMap> {
    return await devices.getObjectDefault<DeviceMap>("/devices");
}

export async function getDeviceAsync(deviceid: string): Promise<Device> {
    return await devices.getObjectDefault<Device>(`/devices/${deviceid}`);
}

export async function setDeviceAsync(device: Device) {
    await devices.push(`/devices/${device.id}`, device);
}

export async function delDeviceAsync(deviceid: string) {
    await devices.delete(`/devices/${deviceid}`);
}

export async function addMessageAsync(deviceid: string, message: MessageEvent) {
    await messages.push(`/devices/${deviceid}/messages/${message.id}`, message);
}

export async function delMessageAsync(deviceid: string, messageid: string) {
    await messages.delete(`/devices/${deviceid}/messages/${messageid}`);
}

export async function getMessagesAsync(
    deviceid: string
): Promise<MessageEvent[]> {
    const map =
        (await messages.getObjectDefault<MessageMap>(
            `/devices/${deviceid}/messages`
        )) ?? {};
    const arr = Object.values(map).sort((a, b) => a.createdAt - b.createdAt);
    return arr;
}

export async function getShutdownAsync(
    deviceid: string
): Promise<ShutdownEvent> {
    return await shutdowns.getObjectDefault<ShutdownEvent>(
        `/devices/${deviceid}`
    );
}

export async function setShutdownAsync(
    deviceid: string,
    shutdown: ShutdownEvent
) {
    return await shutdowns.push(`/devices/${deviceid}`, shutdown);
}

export async function delShutdownAsync(deviceid: string) {
    return await shutdowns.delete(`/devices/${deviceid}`);
}
