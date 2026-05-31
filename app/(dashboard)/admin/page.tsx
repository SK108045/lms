import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, CreditCard, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

async function getAdminStats() {
  const supabase = await createClient();

  const [
    { count: totalUsers },
    { count: totalCourses },
    { count: totalEnrollments },
    { data: payments },
    { data: pendingCourses },
    { data: recentUsers },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("courses").select("*", { count: "exact", head: true }),
    supabase.from("enrollments").select("*", { count: "exact", head: true }),
    supabase.from("payments").select("amount, status").eq("status", "completed"),
    supabase
      .from("courses")
      .select("id, title, slug, status, created_at, instructor:profiles!courses_instructor_id_fkey(full_name)")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("profiles")
      .select("id, email, full_name, role, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const totalRevenue = (payments || []).reduce((sum, p) => sum + Number(p.amount), 0);

  return {
    stats: {
      totalUsers: totalUsers || 0,
      totalCourses: totalCourses || 0,
      totalEnrollments: totalEnrollments || 0,
      totalRevenue,
    },
    pendingCourses: pendingCourses || [],
    recentUsers: recentUsers || [],
  };
}

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") redirect("/dashboard");

  const { stats, pendingCourses, recentUsers } = await getAdminStats();

  const statCards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-500" },
    { label: "Total Courses", value: stats.totalCourses, icon: BookOpen, color: "text-green-500" },
    { label: "Enrollments", value: stats.totalEnrollments, icon: TrendingUp, color: "text-purple-500" },
    { label: "Revenue (KES)", value: stats.totalRevenue.toLocaleString(), icon: CreditCard, color: "text-yellow-500" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Platform overview and management</p>
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Courses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-5 text-yellow-500" />
              Pending Approval
            </CardTitle>
            <Badge variant="secondary">{pendingCourses.length}</Badge>
          </CardHeader>
          <CardContent>
            {pendingCourses.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No courses pending approval
              </p>
            ) : (
              <div className="flex flex-col divide-y">
                {pendingCourses.map((course: any) => (
                  <div key={course.id} className="flex items-center gap-3 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{course.title}</p>
                      <p className="text-xs text-muted-foreground">
                        by {course.instructor?.full_name || "Unknown"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                        Approve
                      </Button>
                      <Link href={`/courses/${course.slug}`}>
                        <Button size="sm" variant="ghost">View</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5 text-blue-500" />
              Recent Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col divide-y">
              {recentUsers.map((u: any) => (
                <div key={u.id} className="flex items-center gap-3 py-3">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                    {(u.full_name || u.email)?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {u.full_name || u.email}
                    </p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                  <Badge variant={u.role === "admin" ? "default" : "secondary"} className="text-xs">
                    {u.role}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
