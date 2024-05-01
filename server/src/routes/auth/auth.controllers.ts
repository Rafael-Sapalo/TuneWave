import { registerErrorMessagesArray } from "../../utils/error.message";
import { checkTypes, isStrongPassword } from '../../utils/checktypes';
import { UserTable } from '../../config/schema/db.schema';
import { statusCodes } from '../../utils/statusCodes';
import { userSchema } from "../../utils/zod.schema";
import { zValidator } from "@hono/zod-validator";
import { passwordSec } from '../../utils/Types';
import { createFactory } from "hono/factory";
import { db } from '../../config/db';

export class AuthController {
    private authFactory = createFactory();

    readonly registerFactory = this.authFactory.createHandlers(zValidator('json', userSchema, (value, ctx) => {
        if (value.data.password.length < 8) {
            return ctx.json({ message: registerErrorMessagesArray[0] }, statusCodes.C400.BAD_REQUEST);
        }
        if (!isStrongPassword(value.data.password)) {
            return ctx.json({ message: registerErrorMessagesArray[1] }, statusCodes.C400.BAD_REQUEST);
        }
    }), 
    async (ctx) => {
        const body = ctx.req.valid('json');
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
