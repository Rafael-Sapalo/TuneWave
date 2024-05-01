import { expect, test, describe } from "bun:test"
import { RouterService } from "../../routes/router.service";
import { statusCodes } from "../../utils/statusCodes";

const app = new RouterService().getApp();

function generateStrongPassword(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

const strongPassword = generateStrongPassword(12);

describe('Auth Routes', () => {

    describe('POST /api/auth/register', () => {
        test('should return 201 status code', async () => {
            let validMail = `test${Math.floor(Math.random() * 1000)}@test.com`.toString();
            const body = {
                email: validMail,
                username: `test${Math.floor(Math.random() * 10 ** 6)}`,
                password: `${generateStrongPassword(12)}`.toString()
            }
            const response = await app.request('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            expect(response.status).toBe(statusCodes.C200.CREATED);
            expect(await response.json()).toEqual({message: 'User registered'});
        });

        test('should return 400 status code becaus of password length', async () => {
            const body = {
                email: `test${Math.floor(Math.random() * 1000)}@test.com`,
                username: `test${Math.floor(Math.random() * 10 ** 6)}`,
                password: `test`
            }
            const response = await app.request('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            expect(response.status).toBe(statusCodes.C400.BAD_REQUEST);
            expect(await response.json()).toEqual({message: 'Password must be at least 8 characters long'});
        });
    });

    describe('POST /api/auth/login', () => {
        test('should return 200 status code', async () => {
            const body = {
                username: "test_username",
                password:  "test_password"
            }
            const response = await app.request('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            expect(response.status).toBe(statusCodes.C200.OK);
            expect(await response.json()).toEqual({message: 'User logged in'});
        });
    });
});
