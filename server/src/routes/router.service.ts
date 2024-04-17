import { Hono } from "hono";
import { logger } from "hono/logger";
import { AuthService } from "./auth/auth.service";
import { poweredBy } from "hono/powered-by";

export class RouterService {
    private app = new Hono();
    private authRouter = new AuthService().getAuth();
    private readonly path = "/api";

    constructor() {
        this.initGlobalMiddleware();
        this.initRoutes();
    }

    private initGlobalMiddleware() {
        // Add global middleware here
        this.app.use(logger());
        this.app.use(poweredBy());
    }

    private initRoutes() {
        // Add routes here
        this.app.route(`${this.path}/auth`, this.authRouter);
        this.app.get(`${this.path}/`, async (ctx) => {
            return ctx.json({
                message: "Hello, World!"
            }, 200);
        });
    }

    public getApp() {
        return this.app;
    }

}
