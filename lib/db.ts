import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";
import postgres from "postgres";

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

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface UserProgress {
  user_id: string;
  category_id: number;
  level_index: number;
}

interface Database {
  Categories: Categories;
  UserProgress: UserProgress;
  user: User;
}

export async function getLeaderboardData(): Promise<
  { userId: string; name: string; score: string | bigint | number }[]
> {
  return await db
    .selectFrom("UserProgress")
    .innerJoin("user", "user.id", "UserProgress.user_id")
    .select([
      "UserProgress.user_id as userId",
      "user.name as name",
      db.fn.sum("UserProgress.level_index").as("score"),
    ])
    .groupBy(["UserProgress.user_id", "user.name"])
    .orderBy("score", "desc")
    .execute();
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

export async function getAllCategories(): Promise<Categories[]> {
  return await db.selectFrom("Categories").selectAll().execute();
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
        description TEXT NOT NULL,
        difficulty_level TEXT NOT NULL,
        levels INT DEFAULT 0
      );
    `;
  }

  const dataDir = join(process.cwd(), "data");
  if (!existsSync(dataDir) || !statSync(dataDir).isDirectory()) return;

  const categories = readdirSync(dataDir).filter((name) =>
    statSync(join(dataDir, name)).isDirectory()
  );

  for (const name of categories) {
    const categoryPath = join(dataDir, name);
    const metaPath = join(categoryPath, "meta.json");

    if (!existsSync(metaPath)) {
      console.warn(`Skipping category "${name}" — missing meta.json.`);
      continue;
    }

    let description: string | null = null;
    let difficulty_level: string | null = null;

    try {
      const meta = JSON.parse(readFileSync(metaPath, "utf-8"));
      description =
        typeof meta.description === "string" ? meta.description : null;
      difficulty_level =
        typeof meta.difficulty_level === "string"
          ? meta.difficulty_level
          : null;
    } catch (e) {
      console.warn(`Skipping category "${name}" — invalid meta.json.`, e);
      continue;
    }

    if (!description || !difficulty_level) {
      console.warn(
        `Skipping category "${name}" — missing required fields in meta.json.`
      );
      continue;
    }

    const levels = readdirSync(categoryPath).filter(
      (f) => f.startsWith("level_") && f.endsWith(".json")
    ).length;

    await sql`
      INSERT INTO "Categories" (name, description, difficulty_level, levels)
      VALUES (${name}, ${description}, ${difficulty_level}, ${levels})
      ON CONFLICT (name) DO UPDATE
      SET description = EXCLUDED.description,
          difficulty_level = EXCLUDED.difficulty_level,
          levels = EXCLUDED.levels;
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
