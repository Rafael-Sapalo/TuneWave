import { expect, test, describe } from "bun:test"
import { RouterService } from "../routes/router.service";

const app = new RouterService().getApp();

describe('Example', () => {
    test('GET /api/', async () => {
        const res = await app.request('/api/')
        expect(res.status).toBe(200)
        expect(await res.json()).toEqual({ message: "Hello, World!" }) 
    })

    test('POST /api/auth/register', async () => {
        const res = await app.request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username: 'test', password: 'test'})
        })
        expect(res.status).toBe(200)
        expect(await res.json()).toEqual({ message: "User registered" }) 
    })
})
