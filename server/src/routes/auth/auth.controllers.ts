import { UserLogSchema, userSchema } from "../../utils/zod.schema";
import { authErrorMessage } from "../../utils/error.message";
import { isStrongPassword } from '../../utils/checktypes';
import { UserTable } from '../../config/schema/db.schema';
import { statusCodes } from '../../utils/statusCodes';
import { zValidator } from "@hono/zod-validator";
import { passwordSec } from '../../utils/Types';
import { setSignedCookie } from "hono/cookie";
import { createFactory } from "hono/factory";
import { db } from '../../config/db';
import { eq } from "drizzle-orm";
import { sign } from "hono/jwt";
//import {MailService} from "../../services/mail/email.service.tsx";

export class AuthController {
    private authFactory = createFactory();

    readonly registerFactory = this.authFactory.createHandlers(zValidator('json', userSchema, (value, ctx) => {
        if (value.data.password.length < 8)
            return ctx.json({ message: authErrorMessage[0] }, statusCodes.C400.BAD_REQUEST);
        if (!isStrongPassword(value.data.password))
            return ctx.json({ message: authErrorMessage[1] }, statusCodes.C400.BAD_REQUEST);
    }),
    async (ctx) => {
        const body = ctx.req.valid('json');
        let user;
        try {
            user = await db.insert(UserTable).values(
                {
                    email: body.email.toString().toLowerCase(),
                    username: body.username.toString(),
                    password: await passwordSec.hashing(body.password.toString()),
                }
            );
        } catch (error) {
            return ctx.json({ message: "user already exist" }, statusCodes.C400.BAD_REQUEST);
        }
        //const mail = await (new MailService()).sendEmail(body.email.toString(), 'Verify your email', 'Please verify your email');
        return ctx.json({ message: 'User registered' }, statusCodes.C200.CREATED);
    });

    readonly loginFactory = this.authFactory.createHandlers(zValidator('json', UserLogSchema), async (ctx) => {
        const body = ctx.req.valid('json');
        let user;
        //TODO: add a the function that checks the local storage if the user was already logged in
        try {
            user = await db.select({
                email: UserTable.email, password: UserTable.password
            }).from(UserTable).where(eq(UserTable.username, body.username));
        } catch (error) {
            return ctx.json({ message: authErrorMessage[2] as string }, statusCodes.C400.NOT_FOUND);
        }
        const compare = await passwordSec.comparing(body.password.toString(), user[0].password);
        if (!compare)
            return ctx.json({ message: authErrorMessage[3] }, statusCodes.C400.BAD_REQUEST);
        const playload = {
            id: user[0].email,
            role: 'user',
            exp: 7 * 24 * 60 * 60 * 1000
        };
        const token = await sign(playload, process.env.TOKEN_SECRET as string);
        await setSignedCookie(ctx, 'Set-cookie', process.env.COOKIE_SECRET as string, token, { 
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            prefix: 'secure'
        });
        return ctx.json({ message: 'User logged in' }, statusCodes.C200.OK);
    });

    readonly logoutFactory = this.authFactory.createHandlers(async (ctx) => {
        return ctx.json({ message: 'Log Out' });
    })
}
