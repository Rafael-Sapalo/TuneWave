import app from "./src/app";

Bun.serve({
    port: process.env.PORT || 3000,
    fetch: app.fetch
})
