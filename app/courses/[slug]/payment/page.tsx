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
  Smartphone,
  Shield,
  Clock,
  BookOpen,
} from "lucide-react";
import type { Course } from "@/types";
import { MpesaPaymentForm } from "./mpesa-form";

interface PaymentPageProps {
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
      lessons(id)
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !course) return null;
  return course as unknown as Course;
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/login?redirect=/courses/${slug}/payment`);

  // If course is free, redirect to enroll
  if (course.isFree) redirect(`/courses/${slug}/enroll`);

  // Check if already enrolled
  const { data: existing } = await supabase
    .from("enrollments")
    .select("id")
    .eq("user_id", user.id)
    .eq("course_id", course.id)
    .single();

  if (existing) redirect(`/my-learning/${slug}`);

  // Get user profile for phone
  const { data: profile } = await supabase
    .from("profiles")
    .select("phone, full_name")
    .eq("id", user.id)
    .single();

  const price = Number(course.price);
  const priceFormatted = `KES ${price.toLocaleString()}`;

  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
            {/* Course Summary */}
            <div className="flex flex-col gap-4">
              <Badge variant="secondary" className="w-fit">
                {course.category?.name || "Course"}
              </Badge>
              <h1 className="text-2xl font-bold">{course.title}</h1>
              <p className="text-muted-foreground">{course.shortDescription}</p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BookOpen className="size-4" />
                  {course.lessons?.length || 0} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-4" />
                  {course.durationHours || 0}h total
                </span>
              </div>

              <Separator />

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">What you get:</h3>
                {[
                  "Full lifetime access",
                  "Mobile & desktop access",
                  "Certificate of completion",
                  "Downloadable resources",
                  "7-day money back guarantee",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="size-4 text-green-500" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="size-4 text-primary" />
                  <span className="font-medium">Secure M-Pesa Payment</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Your payment is processed securely by Safaricom M-Pesa. We
                  never store your PIN.
                </p>
              </div>
            </div>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="size-5 text-green-600" />
                  Pay with M-Pesa
                </CardTitle>
                <div className="text-3xl font-bold text-primary">
                  {priceFormatted}
                </div>
              </CardHeader>
              <CardContent>
                <MpesaPaymentForm
                  courseId={course.id}
                  courseSlug={slug}
                  amount={price}
                  defaultPhone={profile?.phone || ""}
                  userId={user.id}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
