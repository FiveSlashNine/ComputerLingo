import { NextRequest, NextResponse } from "next/server";
import {
  getUserLevelIndex,
  getNumLevelsForCategoryId,
  incrementUserLevel,
  getUser,
} from "../../db";
import { auth } from "@/app/auth";
import { SquaresIntersectIcon } from "lucide-react";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = Number(searchParams.get("userId"));
  const categoryId = Number(searchParams.get("categoryId"));

  if (!userId || !categoryId) {
    return NextResponse.json(
      { error: "Missing userId or categoryId" },
      { status: 400 }
    );
  }

  const levelIndex = await getUserLevelIndex(userId, categoryId);
  const numLevels = getNumLevelsForCategoryId(categoryId);

  return NextResponse.json({ levelIndex, numLevels });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const { searchParams } = new URL(req.url);
  const user = session?.user;
  const categoryId = Number(searchParams.get("categoryId"));
  const levelId = Number(searchParams.get("levelId"));
  console.log("Category ID:", categoryId);
  console.log("Level ID:", levelId);
  console.log("Session:", session);
  console.log("User:", session?.user);
  console.log("User :", user);
  const finalUser = await getUser(user?.email!);
  if (!finalUser[0].id || !categoryId) {
    return NextResponse.json(
      { error: "Missing userId or categoryId" },
      { status: 400 }
    );
  }

  await incrementUserLevel(finalUser[0].id, categoryId, levelId);
  return NextResponse.json({ success: true });
}
