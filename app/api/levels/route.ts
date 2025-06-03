import { NextRequest, NextResponse } from "next/server";
import {
  getUserLevelIndex,
  getNumLevelsForCategoryId,
  incrementUserLevel,
} from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// GET /api/level?userId=123&categoryId=1
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const categoryId = Number(searchParams.get("categoryId"));

  if (!userId || isNaN(categoryId)) {
    return NextResponse.json(
      { error: "Missing or invalid userId or categoryId" },
      { status: 400 }
    );
  }

  const levelIndex = await getUserLevelIndex(userId, categoryId);
  const numLevels = await getNumLevelsForCategoryId(categoryId); // Make sure this is async

  return NextResponse.json({ levelIndex, numLevels });
}

// POST /api/level?categoryId=1&levelId=2
export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: headers(), // Removed unnecessary `await`
  });

  const { searchParams } = new URL(req.url);
  const categoryId = Number(searchParams.get("categoryId"));
  const levelId = Number(searchParams.get("levelId"));
  const user = session?.user;

  if (!user || isNaN(categoryId) || isNaN(levelId)) {
    return NextResponse.json(
      { error: "Missing or invalid user, categoryId, or levelId" },
      { status: 400 }
    );
  }

  await incrementUserLevel(user.id, categoryId, levelId);
  return NextResponse.json({ success: true });
}
