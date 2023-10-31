import process from "process";
import dotenv from "dotenv";
import * as env from "./env";
import * as rest from "./rest";
import * as server from "./server";
import * as db from "./db";

dotenv.config();

process
    .on("unhandledRejection", (reason, p) => {
        console.error(reason, "Unhandled Rejection at ", p);
    })
    .on("uncaughtException", (err) => {
        console.error(err, "Uncaught Exception");
    });

async function initAsync() {
    await env.initAsync();
    await db.initAsync();
    await rest.initAsync();
}

async function startAsync() {
    await env.startAsync();
    await server.startAsync();
    await rest.startAsync();
}

(async () => {
    await initAsync();
    await startAsync();
})();
