import { expect, test, describe } from "bun:test"
import { notExists } from "drizzle-orm"
import { RouterService } from "../../routes/router.service"

const app = new RouterService().getApp()

describe('Middleware test', () => {
    test('should return 404 status code', async () => {
        const response = await app.request('/api/notExist');
        expect(response.status).toBe(404);
    })
})