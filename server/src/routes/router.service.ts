import { Hono } from "hono";
import { logger } from "hono/logger";
import { AuthService } from "./auth/auth.service";
import { poweredBy } from "hono/powered-by";
import { statusCodes } from "../utils/statusCodes";
import { db } from "../config/db";
import { UserTable } from "../config/schema/db.schema";
import { HTTPException } from "hono/http-exception";
import { eq } from "drizzle-orm";

export class RouterService {
    private app = new Hono();
    private authRouter = new AuthService().getAuth();
    private readonly baseRoute = `/api`;

    constructor() {
        this.initGlobalMiddleware();
        this.initRoutes();
    }

    private initGlobalMiddleware() {
        // Add global middleware here
        this.app.use(logger());
        this.app.use(poweredBy());
        this.app.notFound(async (ctx) => {
            return ctx.json({ message: "Not found" }, statusCodes.C400.NOT_FOUND);
        });
        this.app.onError((err, ctx) => {
            if (err instanceof HTTPException)
                return err.getResponse();
            throw new HTTPException(statusCodes.C500.INTERNAL_SERVER_ERROR, { message: "Internal server error" });
        })
    }

    private initRoutes() {

        this.app.route(`${this.baseRoute}/auth`, this.authRouter);
        this.app.get(`${this.baseRoute}/getAllUsers`, async (ctx) => {
            const users = await db.transaction(async (trx) => {
                const users = await db.query.UserTable.findMany();
                if (!users) {
                    return trx.rollback();
                }
                return users;
            });
            if (!users) {
                return ctx.json({ message: "No users found" }, statusCodes.C400.NOT_FOUND);
            }
            return ctx.json({
                message: "All users",
                User: users,
            }, statusCodes.C200.OK);
        });
        this.app.get(`${this.baseRoute}/`, async (ctx) => {
            return ctx.json({
                message: "Hello, World!",
            }, statusCodes.C200.OK);
        });
    }

    public getApp() {
        return this.app;
    }
}
