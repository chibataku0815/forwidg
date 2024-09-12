/**
 * @file Drizzleの設定ファイルです。
 * データベースへの接続情報やスキーマ定義、マイグレーション設定などを定義します。
 */
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
