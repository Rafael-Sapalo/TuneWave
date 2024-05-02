import { registerErrorMessagesArray } from "../../utils/error.message";
import { isStrongPassword } from '../../utils/checktypes';
import { UserTable } from '../../config/schema/db.schema';
import { statusCodes } from '../../utils/statusCodes';
import { UserLogSchema, userSchema } from "../../utils/zod.schema";
import { zValidator } from "@hono/zod-validator";
import { passwordSec } from '../../utils/Types';
import { createFactory } from "hono/factory";
import { db } from '../../config/db';
import { z } from "zod";
import { eq } from "drizzle-orm";
import { password } from "bun";

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
        return ctx.json({ message: 'User registered' }, statusCodes.C200.CREATED);
    });

    readonly loginFactory = this.authFactory.createHandlers(zValidator('json', UserLogSchema), async (ctx) => {
        const body = ctx.req.valid('json');
        const user = await db.select({email: UserTable.email, password: UserTable.password}).from(UserTable).where(eq(UserTable.username, body.username.toString()));
        if (!user) return ctx.json({ message: 'User not found' }, statusCodes.C400.NOT_FOUND);
        const compare = await passwordSec.comparing(body.password.toString(), user[0].password);
        if (!compare) return ctx.json({ message: 'Invalid password' }, statusCodes.C400.BAD_REQUEST);
        return ctx.json({
            message: 'User logged in',
        }, statusCodes.C200.OK);
    });

    readonly logoutFactory = this.authFactory.createHandlers(async (ctx) => {
        return ctx.json({
            message: 'Log Out'
        })
    })
}
