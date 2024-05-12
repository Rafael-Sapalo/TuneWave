import { defineConfig } from "drizzle-kit"

export default defineConfig({
    schema: "./src/config/schema/db.schema.ts",
    out: "./src/config/migration",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL as string,
    },
    verbose: true,
    strict: true,
})
