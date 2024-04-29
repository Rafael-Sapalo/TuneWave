import { createFactory } from "hono/factory";
import { checkTypes, isStrongPassword } from '../../utils/checktypes';
import { statusCodes } from '../../utils/statusCodes';
import { db } from '../../config/db';
import { UserTable } from '../../config/schema/db.schema';
import { passwordSec, type UserRegister } from '../../utils/Types';
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../../utils/zod.schema";

export class AuthController {
    private authFactory = createFactory();


    readonly registerFactory = this.authFactory.createHandlers(zValidator('form', userSchema, (value, ctx) => {
        if (value.data.password.length < 8) {
            return ctx.json({ message: 'Password must be at least 8 characters long' }, statusCodes.C400.BAD_REQUEST);
        }
        if (!isStrongPassword(value.data.password)) {
            return ctx.json({ 
                message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' 
            }, statusCodes.C400.BAD_REQUEST);
        }
    }), 
    async (ctx) => {
        const body = await ctx.req.parseBody();
        const user = await db.insert(UserTable).values(
            {
                email: body.email.toString().toLowerCase(),
                username: body.username.toString(),
                password: await passwordSec.hashing(body.password.toString()),
            }
        );
        return ctx.json({
            message: 'User registered',
        }, statusCodes.C200.CREATED);
    });

    public loginFactory = this.authFactory.createHandlers(async (ctx) => {
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
