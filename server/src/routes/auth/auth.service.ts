import { AuthController } from './auth.controllers';
import { Hono } from 'hono';

export class AuthService extends AuthController {

    private auth = new Hono().basePath('/auth');
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
        this.auth.post('/logout', ...this.logoutFactory);
    }
}
