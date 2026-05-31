import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import type { Enrollment, Course } from "@/types";

async function getDashboardData(userId: string) {
  const supabase = await createClient();

  // Get enrollments with course data
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(`
      *,
      course:courses(
        id, title, slug, thumbnail_url, short_description,
        instructor:profiles!courses_instructor_id_fkey(full_name)
      )
    `)
    .eq("user_id", userId)
    .order("enrolled_at", { ascending: false })
    .limit(4);

  // Get certificates count
  const { count: certificatesCount } = await supabase
    .from("certificates")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  // Get completed courses count
  const { count: completedCount } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("status", "completed");

  // Get total enrolled count
  const { count: totalEnrolled } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  return {
    enrollments: (enrollments || []) as (Enrollment & { course: Course })[],
    stats: {
      totalEnrolled: totalEnrolled || 0,
      completedCourses: completedCount || 0,
      certificates: certificatesCount || 0,
      inProgress: (totalEnrolled || 0) - (completedCount || 0),
    },
  };
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { enrollments, stats } = await getDashboardData(user.id);

  const statCards = [
    { label: "Enrolled Courses", value: stats.totalEnrolled, icon: BookOpen, color: "text-primary" },
    { label: "In Progress", value: stats.inProgress, icon: Clock, color: "text-warning" },
    { label: "Completed", value: stats.completedCourses, icon: TrendingUp, color: "text-accent" },
    { label: "Certificates", value: stats.certificates, icon: Award, color: "text-primary" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold lg:text-3xl">Welcome back!</h1>
        <p className="text-muted-foreground">Continue your learning journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`flex size-12 items-center justify-center rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="size-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Continue Learning Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </div>
          <Link href="/my-learning">
            <Button variant="ghost" size="sm" className="gap-1">
              View all
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {enrollments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                <BookOpen className="size-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 font-semibold">No courses yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Start your learning journey by enrolling in a course
              </p>
              <Link href="/courses">
                <Button>Browse Courses</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {enrollments.map((enrollment) => (
                <Link
                  key={enrollment.id}
                  href={`/my-learning/${enrollment.course?.slug}`}
                  className="group"
                >
                  <Card className="overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
                    <CardContent className="flex gap-4 p-4">
                      <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-primary/20 to-accent/20">
                        {enrollment.course?.thumbnailUrl ? (
                          <img
                            src={enrollment.course.thumbnailUrl}
                            alt={enrollment.course.title}
                            className="size-full object-cover"
                          />
                        ) : (
                          <PlayCircle className="size-8 text-primary/50" />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <h4 className="mb-1 font-medium line-clamp-1 group-hover:text-primary">
                          {enrollment.course?.title}
                        </h4>
                        <p className="mb-2 text-xs text-muted-foreground">
                          {enrollment.course?.instructor?.fullName}
                        </p>
                        <div className="mt-auto flex items-center gap-2">
                          <Progress value={Number(enrollment.progress)} className="h-2 flex-1" />
                          <span className="text-xs font-medium text-muted-foreground">
                            {Math.round(Number(enrollment.progress))}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/courses">
          <Card className="cursor-pointer transition-all hover:border-primary/50 hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="size-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Browse Courses</p>
                <p className="text-sm text-muted-foreground">Find new courses to learn</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/certificates">
          <Card className="cursor-pointer transition-all hover:border-primary/50 hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-lg bg-accent/10">
                <Award className="size-6 text-accent" />
              </div>
              <div>
                <p className="font-medium">My Certificates</p>
                <p className="text-sm text-muted-foreground">View your achievements</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/profile">
          <Card className="cursor-pointer transition-all hover:border-primary/50 hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex size-12 items-center justify-center rounded-lg bg-muted">
                <TrendingUp className="size-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Learning Stats</p>
                <p className="text-sm text-muted-foreground">Track your progress</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
