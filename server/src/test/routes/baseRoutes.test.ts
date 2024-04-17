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
})