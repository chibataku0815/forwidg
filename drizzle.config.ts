import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  migrations: {
    prefix: "supabase",
  },
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgres://localhost:5432/drizzle",
  },
});
