import { NextRequest, NextResponse } from "next/server";
import {
  getUserLevelIndex,
  getNumLevelsForCategoryId,
  incrementUserLevel,
} from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const categoryId = Number(searchParams.get("categoryId"));

  if (!userId || !categoryId) {
    return NextResponse.json(
      { error: "Missing userId or categoryId" },
      { status: 400 }
    );
  }

  const levelIndex = await getUserLevelIndex(userId, categoryId);
  const numLevels = getNumLevelsForCategoryId(categoryId);

  return NextResponse.json({ levelIndex: 10, numLevels: 11 });
  return NextResponse.json({ levelIndex, numLevels });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { searchParams } = new URL(req.url);
  const categoryId = Number(searchParams.get("categoryId"));
  const levelId = Number(searchParams.get("levelId"));
  const user = session?.user;
  if (!user || !categoryId) {
    return NextResponse.json(
      { error: "Missing user or categoryId" },
      { status: 400 }
    );
  }

  await incrementUserLevel(user.id, categoryId, levelId);
  return NextResponse.json({ success: true });
}
