import { expect, test, describe } from "bun:test"
import { RouterService } from "../../routes/router.service";
import { statusCodes } from "../../utils/statusCodes";

const app = new RouterService().getApp();

describe('Base routes test', () => {
    test('should return 200 status code', async () => {
        const response = await app.request('api/');
        expect(response.status).toBe(200);
    });
});
