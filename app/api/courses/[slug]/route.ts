import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = await createClient();

  const { data: course, error } = await supabase
    .from("courses")
    .select(
      `
      *,
      instructor:profiles!courses_instructor_id_fkey(id, full_name, avatar_url, bio),
      category:categories(id, name, slug),
      lessons:lessons(
        id, title, description, duration_minutes, is_preview, video_url, order_index
      )
      `
    )
    .eq("slug", params.slug)
    .eq("status", "published")
    .single();

  if (error || !course) {
    return NextResponse.json(
      { error: "Course not found" },
      { status: 404 }
    );
  }

  // Check if user is enrolled
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isEnrolled = false;
  if (user) {
    const { data: enrollment } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", user.id)
      .eq("course_id", course.id)
      .single();

    isEnrolled = !!enrollment;
  }

  return NextResponse.json(
    {
      course: {
        ...course,
        isEnrolled,
      },
    },
    { status: 200 }
  );
}
