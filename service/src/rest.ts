import { server } from "./server";
import path from "path";
import fastifystatic from "@fastify/static";
import * as devices from "./devices";
import * as shutdowns from "./shutdowns";
//import * as messages from "./message";

export async function initAsync() {
    server.register(fastifystatic, {
        root: path.join(__dirname, "../public"),
    });

    await devices.initAsync();
    await shutdowns.initAsync();
    //await messages.initAsync();
}
