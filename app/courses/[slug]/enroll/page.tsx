import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PublicNav } from "@/components/layouts/public-nav";
import { Footer } from "@/components/layouts/footer";
import {
  CheckCircle,
  Clock,
  BookOpen,
  Users,
  ArrowRight,
  Lock,
} from "lucide-react";
import type { Course } from "@/types";

interface EnrollPageProps {
  params: Promise<{ slug: string }>;
}

async function getCourse(slug: string) {
  const supabase = await createClient();

  const { data: course, error } = await supabase
    .from("courses")
    .select(`
      *,
      instructor:profiles!courses_instructor_id_fkey(id, full_name),
      category:categories(id, name),
      lessons(id, title, order_index)
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !course) {
    return null;
  }

  const { count } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("course_id", course.id);

  return {
    ...course,
    enrollmentCount: count || 0,
    lessons: (course.lessons || []).sort((a: any, b: any) => a.order_index - b.order_index),
  } as Course;
}

async function enrollUser(courseId: string, userId: string) {
  const supabase = await createClient();

  // Check if already enrolled
  const { data: existing } = await supabase
    .from("enrollments")
    .select("id")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .single();

  if (existing) {
    return { success: true, alreadyEnrolled: true };
  }

  const { error } = await supabase.from("enrollments").insert({
    user_id: userId,
    course_id: courseId,
    status: "active",
    progress: 0,
  });

  if (error) {
    console.error("Enrollment error:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export default async function EnrollPage({ params }: EnrollPageProps) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If not logged in, redirect to login
  if (!user) {
    redirect(`/login?redirect=/courses/${slug}/enroll`);
  }

  // If course is free, auto-enroll and redirect
  if (course.isFree) {
    const result = await enrollUser(course.id, user.id);
    if (result.success) {
      redirect(`/my-learning/${slug}`);
    }
  }

  // For paid courses, show enrollment page
  const priceFormatted = `KES ${Number(course.price).toLocaleString()}`;

  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader className="text-center">
                <Badge variant="secondary" className="mx-auto mb-4 w-fit">
                  {course.category?.name || "Course"}
                </Badge>
                <CardTitle className="text-2xl">{course.title}</CardTitle>
                <p className="text-muted-foreground">{course.shortDescription}</p>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                {/* Course Info */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="size-4" />
                    {course.lessons?.length || 0} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-4" />
                    {course.durationHours || 0}h
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="size-4" />
                    {course.enrollmentCount} enrolled
                  </span>
                </div>

                <Separator />

                {/* Price and Enroll */}
                <div className="text-center">
                  <p className="mb-2 text-sm text-muted-foreground">Course Price</p>
                  <p className="mb-6 text-4xl font-bold text-primary">{priceFormatted}</p>
                  
                  {/* M-Pesa Payment Button */}
                  <Link href={`/courses/${slug}/payment`}>
                    <Button size="lg" className="w-full gap-2">
                      Pay with M-Pesa
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                  
                  <p className="mt-4 text-xs text-muted-foreground">
                    Secure payment powered by M-Pesa
                  </p>
                </div>

                <Separator />

                {/* What&apos;s Included */}
                <div>
                  <h3 className="mb-4 font-semibold">What&apos;s included:</h3>
                  <ul className="flex flex-col gap-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="size-4 text-accent" />
                      Full lifetime access
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="size-4 text-accent" />
                      Access on mobile and desktop
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="size-4 text-accent" />
                      Certificate of completion
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="size-4 text-accent" />
                      Downloadable resources
                    </li>
                  </ul>
                </div>

                <Separator />

                {/* Money Back Guarantee */}
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <Lock className="mx-auto mb-2 size-6 text-muted-foreground" />
                  <p className="text-sm font-medium">7-Day Money Back Guarantee</p>
                  <p className="text-xs text-muted-foreground">
                    Not satisfied? Get a full refund within 7 days
                  </p>
                </div>
              </CardContent>
            </Card>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              By enrolling, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
