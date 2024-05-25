import { rateLimiter } from "hono-rate-limiter";
import { genUniqueCode } from "../utils/genUniqueCode";

export const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: "Too many requests from this IP, please try again after 15 minutes",
    keyGenerator: () => genUniqueCode(),
});

export const registerLimiter = rateLimiter({
    windowMs: 10 * 60 * 1000,
    limit: 10,
    message: "Too many request sent for the regoster method",
    keyGenerator: () => {
        const length = 10;
        let code = '';
        for (let i = 0; i < length; i++)
            code += Math.floor(Math.random() * 10);
        return code;
    }
})


export const loginLimiter = rateLimiter({
    windowMs: 10 * 60 * 1000,
    limit: 5,
    message: "Too many login attempt were made",
    keyGenerator: () => {
        const length: number = 20;
        let code: string = '';
        for (let i = 0; i < length; i++)
            code += Math.floor(Math.random() * length)
        return code;
    }
})

export const logoutLimiter = rateLimiter({
    windowMs: 5 * 60 * 1000,
    limit: 5,
    message: "Too many logout attempt were made try again later",
    keyGenerator: () => {
        const length: number = 15;
        let code: string = '';
        for (let i = 0; i < length; i++)
            code += Math.floor(Math.random() * length)
        return code;
    }
})