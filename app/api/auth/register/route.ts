import { signUp } from "@/lib/auth-client";
import { addUserToUserProgress } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body as { email?: string; password?: string };
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await signUp.email(
      {
        email,
        password,
        callbackURL: "/login",
        name: "",
      },
      {}
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const id = data?.user.id;
    if (!id) {
      return NextResponse.json(
        { error: "Failed to get user id" },
        { status: 400 }
      );
    }
    await addUserToUserProgress(id);

    return NextResponse.json({ data: { data } }, { status: 200 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
