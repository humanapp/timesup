import { server } from "./server";
import path from "path";
import fastifystatic from "@fastify/static";
import * as devices from "./devices";

export async function initAsync() {
    server.register(fastifystatic, {
        root: path.join(__dirname, "../public"),
    });

    await devices.initAsync();
}
