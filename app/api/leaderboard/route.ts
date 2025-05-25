import { NextResponse } from "next/server";
import { getLeaderboardData } from "@/lib/db";

export async function GET() {
  return NextResponse.json(await getLeaderboardData());
}
