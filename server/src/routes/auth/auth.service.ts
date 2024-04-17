import { Hono } from 'hono';
import { checkTypes } from '../../utils/checktypes';
import type { StatusCode } from 'hono/utils/http-status';
import { statusCodes } from '../../utils/statusCodes';

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
                }, statusCodes.C400.BAD_REQUEST as StatusCode);
            }
            console.log(body);
            return ctx.json({
                message: 'User registered'
            }, statusCodes.C200.CREATED as StatusCode);
        });

        this.auth.post('/login', async (ctx) => {
            const body = await ctx.req.json();
            if (!checkTypes(body.username, 'string') || !checkTypes(body.password, 'string')) {
                return ctx.json({
                    message: 'Invalid parameters'
                }, 400);
            }
            return ctx.json({
                message: 'User logged in'
            }, 200);
        });
    }
}
