import { RouterService } from "./src/routes/router.service";

const app = new RouterService().getApp();

Bun.serve({
    port: process.env.PORT || 3000,
    fetch: app.fetch
})
