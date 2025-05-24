import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import postgres from "postgres";

// Ensure env variable is set
if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL environment variable is not defined.");
}

const sql = postgres(process.env.POSTGRES_URL);

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.POSTGRES_URL,
    }),
  }),
});

interface Categories {
  id: number;
  name: string;
  levels: number;
}

interface UserProgress {
  user_id: string;
  category_id: number;
  level_index: number;
}

interface Database {
  Categories: Categories;
  UserProgress: UserProgress;
}

export async function incrementUserLevel(
  userId: string,
  categoryId: number,
  levelId: number
) {
  const current = await db
    .selectFrom("UserProgress")
    .select("level_index")
    .where("user_id", "=", userId)
    .where("category_id", "=", categoryId)
    .executeTakeFirst();

  if (current && levelId > current.level_index) {
    await db
      .updateTable("UserProgress")
      .set({ level_index: current.level_index + 1 })
      .where("user_id", "=", userId)
      .where("category_id", "=", categoryId)
      .execute();
  }
}

export async function addUserToUserProgress(id: string) {
  const categories = await db.selectFrom("Categories").select("id").execute();

  for (const cat of categories) {
    await db
      .insertInto("UserProgress")
      .values({
        user_id: id,
        category_id: cat.id,
        level_index: 0,
      })
      .onConflict((oc) => oc.columns(["user_id", "category_id"]).doNothing())
      .execute();
  }
}

export async function getUserLevelIndex(
  userId: string,
  categoryId: number
): Promise<number> {
  const result = await db
    .selectFrom("UserProgress")
    .select("level_index")
    .where("user_id", "=", userId)
    .where("category_id", "=", categoryId)
    .executeTakeFirst();

  return result?.level_index ?? 0;
}

export async function getNumLevelsForCategoryId(
  categoryId: number
): Promise<number> {
  const result = await db
    .selectFrom("Categories")
    .select("levels")
    .where("id", "=", categoryId)
    .executeTakeFirst();

  return result?.levels ?? 0;
}

export async function getAllCategories(): Promise<
  { id: number; name: string }[]
> {
  return await db.selectFrom("Categories").select(["id", "name"]).execute();
}

export async function getCategoryNameById(
  categoryId: number
): Promise<string | null> {
  const result = await db
    .selectFrom("Categories")
    .select("name")
    .where("id", "=", categoryId)
    .executeTakeFirst();

  return result?.name ?? null;
}

export async function ensureCategoriesTableExists() {
  const exists = await sql`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'Categories'
    );
  `;

  if (!exists[0].exists) {
    await sql`
      CREATE TABLE "Categories" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        levels INT DEFAULT 0
      );
    `;
  }

  const dataDir = join(process.cwd(), "data");

  if (!statSync(dataDir).isDirectory()) return;

  const categories = readdirSync(dataDir).filter((name) =>
    statSync(join(dataDir, name)).isDirectory()
  );

  for (const name of categories) {
    const levels = readdirSync(join(dataDir, name)).filter(
      (f) => f.startsWith("level_") && f.endsWith(".json")
    ).length;

    await sql`
      INSERT INTO "Categories" (name, levels)
      VALUES (${name}, ${levels})
      ON CONFLICT (name) DO NOTHING;
    `;
  }
}

export async function ensureUserProgressTableExists() {
  const exists = await sql`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'UserProgress'
    );
  `;

  if (!exists[0].exists) {
    await sql`
      CREATE TABLE "UserProgress" (
        user_id TEXT NOT NULL,
        category_id INT NOT NULL,
        level_index INT NOT NULL,
        PRIMARY KEY (user_id, category_id),
        FOREIGN KEY (user_id) REFERENCES "user"(id),
        FOREIGN KEY (category_id) REFERENCES "Categories"(id)
      );
    `;
  }
}

async function init() {
  await ensureCategoriesTableExists();
  await ensureUserProgressTableExists();
}

init().catch((err) => {
  console.error("Database initialization failed:", err);
});
