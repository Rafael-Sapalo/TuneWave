import { Hono } from 'hono';
import { AuthController } from './auth.controllers';

export class AuthService extends AuthController {

    private auth = new Hono();
    constructor () {
        super()
        this.initRoutes();
    }
    public getAuth() {
        return this.auth;
    }

    private initRoutes() {
        this.auth.post('/register', ...this.registerFactory);
        this.auth.post('/login', ...this.loginFactory);
    }
}
