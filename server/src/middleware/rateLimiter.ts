import { rateLimiter } from "hono-rate-limiter";
import { genUniqueCode } from "../utils/genUniqueCode";

export const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: "Too many requests from this IP, please try again after 15 minutes",
    keyGenerator: () => genUniqueCode(),
});
