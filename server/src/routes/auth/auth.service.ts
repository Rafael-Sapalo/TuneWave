import { Hono } from 'hono';
import { checkTypes } from '../../utils/checktypes';


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
            if (!checkTypes(body.username, 'string') || !checkTypes(body.password, 'string')) {
                return ctx.json({
                    message: 'Invalid parameters'
                }, 400);
            }
            console.log(body);
            return ctx.json({
                message: 'User registered'
            }, 200);
        });

        this.auth.post('/login', async (ctx) => {
            return ctx.json({
                message: 'User logged in'
            }, 200);
        });
    }
}
