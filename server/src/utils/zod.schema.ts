import { password } from 'bun';
import { z } from 'zod';

export const userSchema = z.object({
    username: z.string(),
    password: z.string().min(8),
    email: z.string().email({ message: 'Invalid email'}),
})

export const UserLogSchema = z.object({
    username: z.string(),
    password: z.string()
})

export type UserRegister = z.infer<typeof userSchema>
export type UserLogin = z.infer<typeof userSchema>
