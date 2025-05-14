import { drizzle } from "drizzle-orm/postgres-js";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { readdirSync, statSync } from "fs";
import { join } from "path";

let client = postgres(`${process.env.POSTGRES_URL!}`);
let db = drizzle(client);

// Ensure categories table is initialized at application start
ensureCategoriesTableExists().catch(console.error);

export async function getUser(email: string) {
  const users = await ensureTableExists();
  return await db.select().from(users).where(eq(users.email, email));
}

export async function createUser(email: string, password: string) {
  const users = await ensureTableExists();
  await ensureUserProgressTableExists();
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  // Insert user and get the new user's id
  const inserted = await db
    .insert(users)
    .values({ email, password: hash })
    .returning();
  const userId = inserted[0]?.id;

  if (userId) {
    // Get all categories
    const categories = await client`SELECT id FROM "Categories";`;
    // Insert a UserProgress row for each category
    for (const cat of categories) {
      await client`
        INSERT INTO "UserProgress" (user_id, category_id, level_index)
        VALUES (${userId}, ${cat.id}, 0)
        ON CONFLICT (user_id, category_id) DO NOTHING;`;
    }
  }

  return inserted;
}

export async function incrementUserLevel(
  userId: number,
  categoryId: number,
  levelId: number
) {
  // Check if the user has completed the level
  const completed = await client`
    SELECT level_index FROM "UserProgress"
    WHERE user_id = ${userId} AND category_id = ${categoryId};
  `;
  if (levelId > completed[0]?.level_index) {
    await client`
    UPDATE "UserProgress"
    SET level_index = level_index + 1
    WHERE user_id = ${userId} AND category_id = ${categoryId};
  `;
  }
}

export async function getUserLevelIndex(
  userId: number,
  categoryId: number
): Promise<number> {
  const progress = await client`
    SELECT level_index FROM "UserProgress"
    WHERE user_id = ${userId} AND category_id = ${categoryId};
  `;
  return progress[0]?.level_index ?? 0;
}

export async function getNumLevelsForCategoryId(
  categoryId: number
): Promise<number> {
  // Get levels from the Categories table by id
  const res = await client`
    SELECT levels FROM "Categories" WHERE id = ${categoryId};
  `;
  return res[0]?.levels ?? 0;
}

export async function getAllCategories(): Promise<
  { id: number; name: string }[]
> {
  const categories = await client`
    SELECT id, name FROM "Categories";
  `;
  return categories.map((cat: any) => ({ id: cat.id, name: cat.name }));
}

export async function getCategoryNameById(
  categoryId: number
): Promise<string | null> {
  const res = await client`
    SELECT name FROM "Categories" WHERE id = ${categoryId};
  `;
  return res[0]?.name ?? null;
}

async function ensureTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'User'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "User" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(64),
        password VARCHAR(64)
      );`;
  }

  const table = pgTable("User", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 64 }),
    password: varchar("password", { length: 64 }),
  });

  return table;
}

async function ensureCategoriesTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'Categories'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "Categories" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        levels INT DEFAULT 0
      );`;
  }

  // Read category names from subfolders in the "data" directory
  const dataDir = join(process.cwd(), "data");
  const categories = readdirSync(dataDir).filter((name) => {
    const fullPath = join(dataDir, name);
    return statSync(fullPath).isDirectory();
  });
  for (const name of categories) {
    // Find how much files this category has
    const levels = readdirSync(join(dataDir, name)).filter(
      (f) => f.startsWith("level_") && f.endsWith(".json")
    ).length;
    await client`
      INSERT INTO "Categories" (name, levels)
      VALUES (${name}, ${levels})
      ON CONFLICT (name) DO NOTHING;`;
  }
}

async function ensureUserProgressTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'UserProgress'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "UserProgress" (
        user_id INT NOT NULL,
        category_id INT NOT NULL,
        level_index INT NOT NULL,
        PRIMARY KEY (user_id, category_id),
        FOREIGN KEY (user_id) REFERENCES "User"(id),
        FOREIGN KEY (category_id) REFERENCES "Categories"(id)
      );`;
  }
}
