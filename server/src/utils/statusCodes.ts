import type { StatusCode } from "hono/utils/http-status";

const statusCodes = {
    C200: {
        OK: 200 as StatusCode,
        CREATED: 201 as StatusCode,
        ACCEPTED: 202 as StatusCode,
        NO_CONTENT: 204 as StatusCode,
        PARTIAL_CONTENT: 206 as StatusCode,
    },
    C300: {
        MULTIPLE_CHOICES: 300 as StatusCode,
        MOVED_PERMANENTLY: 301 as StatusCode,
        FOUND: 302 as StatusCode,
        SEE_OTHER: 303 as StatusCode,
        NOT_MODIFIED: 304 as StatusCode,
        USE_PROXY: 305 as StatusCode,
        TEMPORARY_REDIRECT: 307 as StatusCode,
        PERMANENT_REDIRECT: 308 as StatusCode,
    },
    C400: {
        BAD_REQUEST: 400 as StatusCode,
        UNAUTHORIZED: 401 as StatusCode,
        PAYMENT_REQUIRED: 402 as StatusCode,
        FORBIDDEN: 403 as StatusCode,
        NOT_FOUND: 404 as StatusCode,
        NOT_ACCEPTABLE: 406 as StatusCode,
        PROXY_AUTHENTICATION_REQUIRED: 407 as StatusCode,
        REQUEST_TIMEOUT: 408 as StatusCode,
        CONFLICT: 409 as StatusCode,
        GONE: 410 as StatusCode,
    },
    C500: {
        INTERNAL_SERVER_ERROR: 500 as StatusCode,
        NOT_IMPLEMENTED: 501 as StatusCode,
        BAD_GATEWAY: 502 as StatusCode,
        SERVICE_UNAVAILABLE: 503 as StatusCode,
        GATEWAY_TIMEOUT: 504 as StatusCode,
        HTTP_VERSION_NOT_SUPPORTED: 505 as StatusCode,
        NETWORK_AUTHENTICATION_REQUIRED: 511 as StatusCode,
    },
}

export { statusCodes };
