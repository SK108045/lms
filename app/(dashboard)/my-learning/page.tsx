import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, BookOpen, CheckCircle } from "lucide-react";
import type { Enrollment, Course } from "@/types";

async function getEnrollments(userId: string) {
  const supabase = await createClient();

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(`
      *,
      course:courses(
        id, title, slug, thumbnail_url, short_description, duration_hours,
        instructor:profiles!courses_instructor_id_fkey(full_name),
        lessons(id)
      )
    `)
    .eq("user_id", userId)
    .order("enrolled_at", { ascending: false });

  return (enrollments || []) as (Enrollment & { course: Course & { lessons: { id: string }[] } })[];
}

function CourseEnrollmentCard({ enrollment }: { enrollment: Enrollment & { course: Course & { lessons: { id: string }[] } } }) {
  const isCompleted = enrollment.status === "completed";
  const progress = Number(enrollment.progress);

  return (
    <Link href={`/my-learning/${enrollment.course?.slug}`}>
      <Card className="group overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
        <CardContent className="flex gap-4 p-4">
          <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 sm:size-32">
            {enrollment.course?.thumbnailUrl ? (
              <img
                src={enrollment.course.thumbnailUrl}
                alt={enrollment.course.title}
                className="size-full object-cover"
              />
            ) : (
              <PlayCircle className="size-10 text-primary/50" />
            )}
            {isCompleted && (
              <div className="absolute inset-0 flex items-center justify-center bg-accent/80">
                <CheckCircle className="size-10 text-accent-foreground" />
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col">
            <div className="mb-1 flex items-start justify-between gap-2">
              <h3 className="font-semibold line-clamp-2 group-hover:text-primary">
                {enrollment.course?.title}
              </h3>
              <Badge variant={isCompleted ? "default" : "secondary"} className="shrink-0">
                {isCompleted ? "Completed" : "In Progress"}
              </Badge>
            </div>
            <p className="mb-2 text-sm text-muted-foreground">
              {enrollment.course?.instructor?.fullName}
            </p>
            <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <BookOpen className="size-3" />
                {enrollment.course?.lessons?.length || 0} lessons
              </span>
              {enrollment.course?.durationHours && (
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {enrollment.course.durationHours}h
                </span>
              )}
            </div>
            <div className="mt-auto flex items-center gap-3">
              <Progress value={progress} className="h-2 flex-1" />
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default async function MyLearningPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const enrollments = await getEnrollments(user.id);

  const inProgress = enrollments.filter((e) => e.status === "active");
  const completed = enrollments.filter((e) => e.status === "completed");

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold lg:text-3xl">My Learning</h1>
        <p className="text-muted-foreground">Track your enrolled courses and progress</p>
      </div>

      {enrollments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
              <BookOpen className="size-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No courses yet</h3>
            <p className="mb-6 max-w-sm text-muted-foreground">
              You haven&apos;t enrolled in any courses yet. Browse our catalog to find courses that match your interests.
            </p>
            <Link href="/courses">
              <Button>Browse Courses</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All ({enrollments.length})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress ({inProgress.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="flex flex-col gap-4">
              {enrollments.map((enrollment) => (
                <CourseEnrollmentCard key={enrollment.id} enrollment={enrollment} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in-progress" className="mt-6">
            {inProgress.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No courses in progress</p>
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col gap-4">
                {inProgress.map((enrollment) => (
                  <CourseEnrollmentCard key={enrollment.id} enrollment={enrollment} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            {completed.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No completed courses yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col gap-4">
                {completed.map((enrollment) => (
                  <CourseEnrollmentCard key={enrollment.id} enrollment={enrollment} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
