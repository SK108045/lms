import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle,
  Circle,
  PlayCircle,
  Clock,
  BookOpen,
  ArrowLeft,
  ChevronRight,
  Award,
} from "lucide-react";
import type { Course, Lesson, Enrollment, LessonProgress } from "@/types";

interface CourseLearningPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lesson?: string }>;
}

async function getCourseWithProgress(slug: string, userId: string) {
  const supabase = await createClient();

  // Get the course
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select(`
      *,
      instructor:profiles!courses_instructor_id_fkey(id, full_name, avatar_url),
      lessons(id, title, description, duration_minutes, order_index, video_url, content)
    `)
    .eq("slug", slug)
    .single();

  if (courseError || !course) {
    return null;
  }

  // Get enrollment
  const { data: enrollment, error: enrollmentError } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", userId)
    .eq("course_id", course.id)
    .single();

  if (enrollmentError || !enrollment) {
    return null;
  }

  // Get lesson progress - query by user_id (no enrollment_id column in schema)
  const lessonIds = ((course.lessons as Lesson[]) || []).map((l) => l.id);
  const { data: lessonProgress } = await supabase
    .from("lesson_progress")
    .select("*")
    .eq("user_id", userId)
    .in("lesson_id", lessonIds.length > 0 ? lessonIds : ["none"]);

  const lessons = (course.lessons as Lesson[])
    ?.sort((a, b) => a.orderIndex - b.orderIndex)
    .map((lesson) => ({
      ...lesson,
      progress: (lessonProgress || []).find((p) => p.lesson_id === lesson.id),
    }));

  // Helper - completed field is the correct field name in schema
  const isLessonCompleted = (lesson: any) => lesson.progress?.completed === true;

  return {
    course: course as Course,
    enrollment: enrollment as Enrollment,
    lessons,
    lessonProgress: lessonProgress as LessonProgress[],
  };
}

export default async function CourseLearningPage({ params, searchParams }: CourseLearningPageProps) {
  const { slug } = await params;
  const { lesson: lessonId } = await searchParams;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect=/my-learning/${slug}`);
  }

  const data = await getCourseWithProgress(slug, user.id);

  if (!data) {
    // Not enrolled, redirect to course page
    redirect(`/courses/${slug}`);
  }

  const { course, enrollment, lessons, lessonProgress } = data;

  // Get current lesson
  const currentLesson = lessonId 
    ? lessons.find((l) => l.id === lessonId) 
    : lessons.find((l) => !l.progress?.completed) || lessons[0];

  const completedCount = lessonProgress?.filter((p) => p.completed).length || 0;
  const totalLessons = lessons.length;
  const progressPercent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  const currentIndex = lessons.findIndex((l) => l.id === currentLesson?.id);
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Sidebar - Lesson List */}
      <aside className="w-full border-b border-border bg-card lg:w-80 lg:border-b-0 lg:border-r">
        <div className="flex h-16 items-center gap-3 border-b border-border px-4">
          <Link href="/my-learning">
            <Button variant="ghost" size="icon" className="size-8">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold">{course.title}</h2>
            <p className="text-xs text-muted-foreground">
              {completedCount} of {totalLessons} lessons completed
            </p>
          </div>
        </div>
        <div className="p-4">
          <Progress value={progressPercent} className="mb-4 h-2" />
          {progressPercent === 100 && (
            <Link href={`/certificates?course=${course.id}`}>
              <Badge variant="default" className="mb-4 w-full justify-center gap-1 py-2">
                <Award className="size-4" />
                Get Certificate
              </Badge>
            </Link>
          )}
        </div>
        <ScrollArea className="h-[300px] lg:h-[calc(100vh-180px)]">
          <div className="flex flex-col gap-1 p-2">
            {lessons.map((lesson, index) => {
              const isActive = lesson.id === currentLesson?.id;
              const isCompleted = lesson.progress?.completed === true;

              return (
                <Link
                  key={lesson.id}
                  href={`/my-learning/${slug}?lesson=${lesson.id}`}
                  className={`flex items-start gap-3 rounded-lg p-3 transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="mt-0.5">
                    {isCompleted ? (
                      <CheckCircle className="size-5 text-accent" />
                    ) : isActive ? (
                      <PlayCircle className="size-5 text-primary" />
                    ) : (
                      <Circle className="size-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium ${isActive ? "" : "text-foreground"}`}>
                      {index + 1}. {lesson.title}
                    </p>
                    {lesson.durationMinutes && (
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {lesson.durationMinutes} min
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {currentLesson ? (
          <div className="flex flex-col">
            {/* Video/Content Area */}
            <div className="relative aspect-video w-full bg-black">
              {currentLesson.videoUrl ? (
                <iframe
                  src={currentLesson.videoUrl}
                  className="size-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-white">
                  <div className="text-center">
                    <BookOpen className="mx-auto mb-4 size-16 opacity-50" />
                    <p>This lesson has text content</p>
                  </div>
                </div>
              )}
            </div>

            {/* Lesson Info */}
            <div className="p-6">
              <div className="mx-auto max-w-4xl">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      Lesson {currentIndex + 1} of {totalLessons}
                    </Badge>
                    <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
                  </div>
                  <form action={`/api/lessons/${currentLesson.id}/complete`} method="POST">
                    <input type="hidden" name="enrollmentId" value={enrollment.id} />
                    <input type="hidden" name="courseSlug" value={slug} />
                    <Button
                      type="submit"
                      variant={currentLesson.progress?.completed ? "outline" : "default"}
                      className="gap-2"
                    >
                      {currentLesson.progress?.completed ? (
                        <>
                          <CheckCircle className="size-4" />
                          Completed
                        </>
                      ) : (
                        <>
                          <CheckCircle className="size-4" />
                          Mark Complete
                        </>
                      )}
                    </Button>
                  </form>
                </div>

                {/* Lesson Content */}
                {currentLesson.content && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Lesson Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <div className="whitespace-pre-wrap">{currentLesson.content}</div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {currentLesson.description && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">About This Lesson</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{currentLesson.description}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  {prevLesson ? (
                    <Link href={`/my-learning/${slug}?lesson=${prevLesson.id}`}>
                      <Button variant="outline" className="gap-2">
                        <ArrowLeft className="size-4" />
                        Previous
                      </Button>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextLesson ? (
                    <Link href={`/my-learning/${slug}?lesson=${nextLesson.id}`}>
                      <Button className="gap-2">
                        Next
                        <ChevronRight className="size-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/certificates?course=${course.id}`}>
                      <Button className="gap-2">
                        <Award className="size-4" />
                        Get Certificate
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <BookOpen className="mx-auto mb-4 size-16 text-muted-foreground" />
              <h2 className="text-lg font-semibold">No lessons available</h2>
              <p className="text-muted-foreground">This course has no lessons yet.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
