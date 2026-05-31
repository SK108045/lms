import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: lessonId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const enrollmentId = formData.get("enrollmentId") as string;
  const courseSlug = formData.get("courseSlug") as string;

  // Upsert lesson progress
  const { error: progressError } = await supabase
    .from("lesson_progress")
    .upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,lesson_id" }
    );

  if (progressError) {
    console.error("Progress error:", progressError);
    return NextResponse.json({ error: progressError.message }, { status: 500 });
  }

  // Recalculate course progress
  if (enrollmentId) {
    // Get total lessons for this enrollment's course
    const { data: enrollment } = await supabase
      .from("enrollments")
      .select("course_id")
      .eq("id", enrollmentId)
      .single();

    if (enrollment) {
      const { count: totalLessons } = await supabase
        .from("lessons")
        .select("*", { count: "exact", head: true })
        .eq("course_id", enrollment.course_id);

      const { count: completedLessons } = await supabase
        .from("lesson_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("completed", true)
        .in(
          "lesson_id",
          (
            await supabase
              .from("lessons")
              .select("id")
              .eq("course_id", enrollment.course_id)
          ).data?.map((l) => l.id) || []
        );

      const progress =
        totalLessons && totalLessons > 0
          ? Math.round(((completedLessons || 0) / totalLessons) * 100)
          : 0;

      const isCompleted = progress === 100;

      await supabase
        .from("enrollments")
        .update({
          progress: progress.toString(),
          status: isCompleted ? "completed" : "active",
          completed_at: isCompleted ? new Date().toISOString() : null,
        })
        .eq("id", enrollmentId);

      // Auto-issue certificate on completion
      if (isCompleted) {
        const { data: existingCert } = await supabase
          .from("certificates")
          .select("id")
          .eq("user_id", user.id)
          .eq("course_id", enrollment.course_id)
          .single();

        if (!existingCert) {
          const certNumber = `CERT-${Date.now()}-${user.id.slice(0, 8).toUpperCase()}`;
          await supabase.from("certificates").insert({
            user_id: user.id,
            course_id: enrollment.course_id,
            certificate_number: certNumber,
            issued_at: new Date().toISOString(),
          });
        }
      }
    }
  }

  // Redirect back to the lesson
  const redirectUrl = courseSlug
    ? `/my-learning/${courseSlug}?lesson=${lessonId}`
    : `/dashboard`;

  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
