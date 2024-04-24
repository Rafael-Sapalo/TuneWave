export const passwordSec = {
    hashing: async (password: string): Promise<string> => {
        return (await Bun.password.hash(password, {
            algorithm: "argon2id",
            memoryCost: 4,
            timeCost: 10
        })).toString();
    },
    comparing: async (password: string, hash: string): Promise<boolean> => {
        return await Bun.password.verify(password, hash);
    }
}

export type UserRegister = {
    email: string;
    password: string;
    username: string;
}

export type UserLogin = {
    username: string;
    password: string;
}
