import { Hono } from "hono";
import { logger } from "hono/logger";
import { AuthService } from "./auth/auth.service";
import { poweredBy } from "hono/powered-by";
import { statusCodes } from "../utils/statusCodes";
import { db } from "../config/db";
import { UserTable } from "../config/schema/db.schema";

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
        this.app.get(`${this.path}/getAllUsers`, async (ctx) => {
            const users = await db.transaction(async (trx) => {
                const users = await db.query.UserTable.findMany();
                if (!users) {
                    return await trx.rollback();
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
        this.app.get(`${this.path}/`, async (ctx) => {
            return ctx.json({
                message: "Hello, World!",
            }, statusCodes.C200.OK);
        });
    }

    public getApp() {
        return this.app;
    }
}
