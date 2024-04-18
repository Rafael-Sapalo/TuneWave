import { expect, test, describe } from "bun:test"
import { RouterService } from "../../routes/router.service";
import { statusCodes } from "../../utils/statusCodes";

const app = new RouterService().getApp();

describe('Basse Routes', () => {
    test('GET /api/', async () => {
        const res = await app.request('/api/')
        expect(res.status).toBe(statusCodes.C200.OK)
        expect(await res.json()).toEqual({ message: "Hello, World!" }) 
    })

    test('GET /api/404', async () => {
        const res = await app.request('/api/404')
        expect(res.status).toBe(statusCodes.C400.NOT_FOUND)
        expect(await res.text()).toEqual("404 Not Found" ) 
    })
})