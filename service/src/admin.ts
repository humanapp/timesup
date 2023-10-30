import { server } from "./server";

export async function initAsync() {
    server.get("/api/hello", async (req, res) => {
        return res.status(200).send("Hello World!");
    });

    server.put<{ Querystring: { deviceid: string } }>(
        "/api/admin/devices/add",
        async (req, res) => {
            return res.status(200).send("Hello World!");
        }
    );
}
