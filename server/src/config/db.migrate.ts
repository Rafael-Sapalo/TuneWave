import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const migrationclient = postgres(Bun.env.DATABASE_URL as string, {max: 1});


async function main() {
    try {
        await migrate(drizzle(migrationclient), {
            migrationsFolder: "./src/config/migration",
        });
    } catch(err: unknown) {
        console.error(err);
        process.exit(1);
    }
    await migrationclient.end();
}

main().catch(console.error);
