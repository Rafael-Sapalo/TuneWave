import { defineConfig } from "drizzle-kit"

export default defineConfig({
    schema: "./src/config/schema/db.schema.ts",
    out: "./src/config/migration",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL as string,
    },
    verbose: true,
    strict: true,
})
