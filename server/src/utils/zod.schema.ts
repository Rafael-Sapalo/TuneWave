import { z } from 'zod';

export const userSchema = z.object({
    username: z.string(),
    password: z.string().min(8),
    email: z.string().email(),
})

export type User = z.infer<typeof userSchema>
