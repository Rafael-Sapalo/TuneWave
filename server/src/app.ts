import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());

app.get("/", (ctx) => {
    return ctx.json({
        message: "Hello, World!"
    });
});

export default app;
