import { NextResponse } from "next/server";
import { getAllCategories } from "../../db";

export async function GET() {
  return NextResponse.json(getAllCategories());
}
