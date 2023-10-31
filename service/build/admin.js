"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAsync = void 0;
const server_1 = require("./server");
async function initAsync() {
    server_1.server.get("/api/hello", async (req, res) => {
        return res.status(200).send("Hello World!");
    });
    server_1.server.put("/api/admin/devices/add", async (req, res) => {
        return res.status(200).send("Hello World!");
    });
}
exports.initAsync = initAsync;
//# sourceMappingURL=admin.js.map