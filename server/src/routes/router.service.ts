import { LibraryService } from "./library/library.service";
import { selectUser } from "../config/utils/user.querries";
import { UserTable } from "../config/schema/db.schema";
import { limiter } from "../middleware/rateLimiter";
import { HTTPException } from "hono/http-exception";
import { statusCodes } from "../utils/statusCodes";
import { AuthService } from "./auth/auth.service";
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import { db } from "../config/db";
import { cors } from "hono/cors";
import { Hono } from "hono";
import redis from 'redis'

export namespace Server {
    export class RouterService {
        private app = new Hono().basePath('/api');
        private authRouter = new AuthService().getAuth();
        private libraryRouter = new LibraryService().LibInstance();
        private readonly baseRoute = `/v1`;
        
        get getApp() {
            return this.app;
        }

        constructor() {
            this.initGlobalMiddleware();
            this.initRoutes();
        }

        private initGlobalMiddleware() {
            this.app.use(limiter);
            this.app.use(cors());
            this.app.use(logger());
            this.app.use(poweredBy());

            this.app.notFound((ctx) => {
                return ctx.json({ message: "Not found" }, statusCodes.C400.NOT_FOUND);
            });

            this.app.onError((err, ctx) => {
                if (err instanceof HTTPException)
                    return err.getResponse();
                throw new HTTPException(statusCodes.C500.INTERNAL_SERVER_ERROR, { message: "Internal server error" });
            });
        }

        private initRoutes() {
            this.app.route(`${this.baseRoute}`, this.authRouter);
            this.app.route(`${this.baseRoute}`, this.libraryRouter);

            this.app.delete(`${this.baseRoute}/deleteUser`, async (ctx) => {
                try {
                    await db.delete(UserTable);
                } catch (error) {
                    if (error instanceof Error)
                        throw new HTTPException(statusCodes.C500.INTERNAL_SERVER_ERROR, { message: error.message });
                    return ctx.json({ message: "No users found" }, statusCodes.C400.NOT_FOUND);
                }
                return ctx.json({ message: "All users deleted" }, statusCodes.C200.OK);
            });

            this.app.get(`${this.baseRoute}/get-user/:id`, async (ctx) => {
                const { id } = ctx.req.param();
                let user;
                try {
                    user = await selectUser(true, true, false, id);
                } catch (err: unknown) {
                    if (err instanceof Error) throw new Error(err.message);
                    return ctx.json({ message: "an error as occured"}, statusCodes.C400.BAD_REQUEST);
                }
                return ctx.json({ user: user}, statusCodes.C200.OK);
            });

            this.app.get(`${this.baseRoute}/getAllUsers`, async (ctx) => {
                let users;
                try {
                    users = await db.query.UserTable.findMany();
                } catch (error) {
                    if (error instanceof Error)
                        throw new HTTPException(statusCodes.C500.INTERNAL_SERVER_ERROR, { message: error.message });
                    return ctx.json({ message: "No users found" }, statusCodes.C400.NOT_FOUND);
                }
                if (users.length === 0) return ctx.json({ message: "No users found" }, statusCodes.C400.BAD_REQUEST);
                return ctx.json({
                    message: "All users", User: users,
                }, statusCodes.C200.OK);
            });

            this.app.get(`${this.baseRoute}/`, async (ctx) => {
                return ctx.json({ message: "Hello, World!" }, statusCodes.C200.OK);
            });
        }

    }
}
