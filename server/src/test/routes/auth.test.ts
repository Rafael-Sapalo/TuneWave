import { expect, test, describe } from "bun:test"
import { RouterService } from "../../routes/router.service";
import { statusCodes } from "../../utils/statusCodes";

const app = new RouterService().getApp();

describe('Auth Routes', () => {

    describe('POST testing /api/auth/register routes', () => {
        test('POST /api/auth/register', async () => {
            const res = await app.request('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ username: `test-${Math.random()}`, password: 'test', email: `test.${Math.random()}@test.com`})
            })
            expect(res.status).toBe(statusCodes.C200.CREATED)
            expect(await res.json()).toEqual({ message: "User registered" })

        })

        test('POST /api/auth/register when username is missing', async () => {
            const res = await app.request('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ password: 'test', email: `test.${Math.random()}@test.com`})
            })
            expect(res.status).toBe(statusCodes.C400.BAD_REQUEST)
            expect(await res.json()).toEqual({ message: "Invalid parameters" }) 
        })

        test('POST /api/auth/register when password is missing', async () => {
            const res = await app.request('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ username: 'test', email: `test.${Math.random()}@test.com`})
            })
            expect(res.status).toBe(statusCodes.C400.BAD_REQUEST)
            expect(await res.json()).toEqual({ message: "Invalid parameters" }) 
        })
    })

    describe('POST testing /api/auth/login routes', () => {

        test('POST /api/auth/login when everything is normal', async () => {
            const res = await app.request('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username: 'test', password: 'test'})
            })
            expect(res.status).toBe(statusCodes.C200.OK)
            expect(await res.json()).toEqual({ message: "User logged in" }) 
        })

        test('POST /api/auth/login when username is missing', async () => {
            const res = await app.request('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ password: 'test'})
            })
            expect(res.status).toBe(statusCodes.C400.BAD_REQUEST)
            expect(await res.json()).toEqual({ message: "Invalid parameters" }) 
        })

        test('POST /api/auth/login when password is missing', async () => {
            const res = await app.request('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username: 'test'})
            })
            expect(res.status).toBe(statusCodes.C400.BAD_REQUEST)
            expect(await res.json()).toEqual({ message: "Invalid parameters" }) 
        })

        test('POST /api/auth/login when username and password are missing', async () => {
            const res = await app.request('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({})
            })
            expect(res.status).toBe(statusCodes.C400.BAD_REQUEST)
            expect(await res.json()).toEqual({ message: "Invalid parameters" }) 
        })
    })
})
