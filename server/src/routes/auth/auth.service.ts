import { Hono } from 'hono';
import { checkTypes } from '../../utils/checktypes';
import { statusCodes } from '../../utils/statusCodes';
import { db } from '../../config/db';
import { UserTable } from '../../config/schema/db.schema';
import { passwordSec, type UserRegister } from '../../utils/Types';
import { use } from 'hono/jsx';

export class AuthService {
    private auth = new Hono();

    constructor () {
        this.initAuthMiddleware();
        this.initRoutes();
    }

    public getAuth() {
        return this.auth;
    }

    private initAuthMiddleware() {
        // Add auth middleware here
    }

    private initRoutes() {
        this.auth.post('/register', async (ctx) => {
            const body = await ctx.req.json();

            if (!checkTypes(body.username, 'string') || 
                !checkTypes(body.password, 'string') || 
                !checkTypes(body.email, 'string')) {
                return ctx.json({
                    message: 'Invalid parameters'
                }, statusCodes.C400.BAD_REQUEST);
            }
            const user = await db.insert(UserTable).values({
                email: body.email,
                username: body.username,
                password: await passwordSec.hashing(body.password),
            });
            return ctx.json({
                message: 'User registered',
            }, statusCodes.C200.CREATED);
        });

        this.auth.post('/login', async (ctx) => {
            const body = await ctx.req.json();
            if (!checkTypes(body.username, 'string') || !checkTypes(body.password, 'string')) {
                return ctx.json({
                    message: 'Invalid parameters'
                }, statusCodes.C400.BAD_REQUEST);
            }
            return ctx.json({
                message: 'User logged in'
            }, statusCodes.C200.OK);
        });
    }
}
