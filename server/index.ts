import { Server } from "./src/routes/router.service";
import fs from 'fs'

const app = new Server.RouterService().getApp;

Bun.serve({
    port: process.env.PORT || 3000,
    fetch: app.fetch
})
