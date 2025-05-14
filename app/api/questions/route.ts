import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getCategoryNameById } from "@/app/db";

// Helper to recursively get all question JSON files
function getQuestionFiles(dir: string, levelId: number): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  console.log("List of files:", list);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    if (file.startsWith(`level_${levelId}`) && file.endsWith(".json")) {
      results.push(filePath);
    }
  });
  return results;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const rootdir = path.join(process.cwd(), "data");
  const categoryId = url.searchParams.get("categoryId") || "data";
  const dataPath = (await getCategoryNameById(parseInt(categoryId))) || "data";
  console.log("Data path:", dataPath);
  const levelId = url.searchParams.get("levelId") || "1"; // Get levelId from URL
  const dataDir = path.join(rootdir, dataPath);
  console.log("Data directory:", dataDir);
  let questions = [];
  try {
    const questionFiles = getQuestionFiles(dataDir, parseInt(levelId));

    for (const file of questionFiles) {
      path.resolve(file);
      console.log("Reading file:", file);
      const content = fs.readFileSync(file, "utf-8");
      questions = JSON.parse(content);
      // Derive an ID from the filename (e.g., question_1.json -> 1)
      const fileName = path.basename(file, ".json");
      const idMatch = fileName.match(/question_(\d+)/);
      const fileId = idMatch ? idMatch[1] : fileName;
    }

    return NextResponse.json({ questions });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load questions", details: String(error) },
      { status: 500 }
    );
  }
}
