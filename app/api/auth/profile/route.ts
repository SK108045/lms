import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, fullName, role } = await request.json();

    const supabase = await createClient();

    // Get the current user (should be the newly signed up user)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Create profile in the database
    const { error } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        email: email || user.email,
        full_name: fullName,
        role: role || "student",
      },
      { onConflict: "id" }
    );

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Profile created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
