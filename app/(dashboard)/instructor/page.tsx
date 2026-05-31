import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen, Users, DollarSign, PlusCircle, Eye, BarChart3,
} from "lucide-react";

async function getInstructorData(userId: string) {
  const supabase = await createClient();

  const { data: courses } = await supabase
    .from("courses")
    .select(`
      id, title, slug, status, price, is_free, created_at, duration_hours,
      enrollments(id)
    `)
    .eq("instructor_id", userId)
    .order("created_at", { ascending: false });

  const { data: payments } = await supabase
    .from("payments")
    .select("amount, status, course:courses(instructor_id)")
    .eq("status", "completed");

  const instructorPayments = (payments || []).filter(
    (p: any) => p.course?.instructor_id === userId
  );
  const totalRevenue = instructorPayments.reduce(
    (sum: number, p: any) => sum + Number(p.amount), 0
  );

  const totalStudents = (courses || []).reduce(
    (sum: number, c: any) => sum + (c.enrollments?.length || 0), 0
  );

  return {
    courses: courses || [],
    stats: {
      totalCourses: (courses || []).length,
      totalStudents,
      totalRevenue,
      publishedCourses: (courses || []).filter((c: any) => c.status === "published").length,
    },
  };
}

export default async function InstructorDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (!profile || !["instructor", "admin"].includes(profile.role)) {
    redirect("/dashboard");
  }

  const { courses, stats } = await getInstructorData(user.id);

  const statCards = [
    { label: "Total Courses", value: stats.totalCourses, icon: BookOpen, color: "text-blue-500" },
    { label: "Total Students", value: stats.totalStudents, icon: Users, color: "text-green-500" },
    { label: "Revenue (KES)", value: stats.totalRevenue.toLocaleString(), icon: DollarSign, color: "text-yellow-500" },
    { label: "Published", value: stats.publishedCourses, icon: BarChart3, color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Welcome back, {profile.full_name || "Instructor"}
          </p>
        </div>
        <Button className="gap-2">
          <PlusCircle className="size-4" />
          New Course
        </Button>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`rounded-lg bg-muted p-3 ${stat.color}`}>
                <stat.icon className="size-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Courses</CardTitle>
        </CardHeader>
        <CardContent>
          {courses.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <BookOpen className="size-12 text-muted-foreground/50" />
              <p className="text-muted-foreground">No courses yet. Create your first course!</p>
              <Button className="gap-2">
                <PlusCircle className="size-4" />
                Create Course
              </Button>
            </div>
          ) : (
            <div className="flex flex-col divide-y">
              {courses.map((course: any) => (
                <div key={course.id} className="flex items-center gap-4 py-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{course.title}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="size-3" />
                        {course.enrollments?.length || 0} students
                      </span>
                      <span>
                        {course.is_free ? "Free" : `KES ${Number(course.price).toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant={
                      course.status === "published"
                        ? "default"
                        : course.status === "draft"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {course.status}
                  </Badge>
                  <Link href={`/courses/${course.slug}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="size-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
