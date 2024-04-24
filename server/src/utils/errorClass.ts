import type { StatusCode } from "hono/utils/http-status";

export class HttpException extends Error {
    public statusCode: StatusCode;
    public message: string;

    constructor(statusCode: StatusCode, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}
