import { UserTable } from "../schema/db.schema";
import { eq, or } from "drizzle-orm";
import { db } from "../db";


export async function selectUser(
    withName: boolean,
    withEmail: boolean,
    withPassword: boolean,
    userId: string,
): Promise<any> {
    return db.select({
        id: UserTable.id,
        ...(withName ? {username: UserTable.username} : {}),
        ...(withEmail ? {email: UserTable.email}: {}),
        ...(withPassword ? {password: UserTable.password}: {})
    }).from(UserTable).where(eq(UserTable.id, userId!))
}

export async function selectAllUsers() {
    return db.select({
        id: UserTable.id,
        username: UserTable.username,
        email: UserTable.email
    }).from(UserTable)
}

export async function deleteUser(userId: string) {
    return db.delete(UserTable).where(eq(UserTable.id, userId))
}

export async function updateUser(userId: string, username: string, email: string) {
    return db.update(UserTable).set({
        username,
        email
    }).where(eq(UserTable.id, userId))
}

export async function insertUser(username: string, email: string, password: string) {
    return await db.insert(UserTable).values({
        username,
        email,
        password
    })
}
