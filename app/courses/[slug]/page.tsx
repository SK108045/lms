import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { PublicNav } from "@/components/layouts/public-nav";
import { Footer } from "@/components/layouts/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock,
  Users,
  BookOpen,
  PlayCircle,
  CheckCircle,
  Award,
  FileText,
  Lock,
} from "lucide-react";
import type { Course, Lesson } from "@/types";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

async function getCourse(slug: string) {
  const supabase = await createClient();

  const { data: course, error } = await supabase
    .from("courses")
    .select(`
      *,
      instructor:profiles!courses_instructor_id_fkey(id, full_name, avatar_url, bio),
      category:categories(id, name, slug),
      lessons(id, title, description, duration_minutes, order_index, is_preview)
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !course) {
    return null;
  }

  // Get enrollment count
  const { count } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("course_id", course.id);

  return {
    ...course,
    enrollmentCount: count || 0,
    lessons: (course.lessons as Lesson[])?.sort((a, b) => a.orderIndex - b.orderIndex),
  } as Course & { lessons: Lesson[] };
}

async function checkEnrollment(courseId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return false;

  const { data } = await supabase
    .from("enrollments")
    .select("id")
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .single();

  return !!data;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  const isEnrolled = await checkEnrollment(course.id);
  const totalDuration = course.lessons?.reduce((acc, l) => acc + (l.durationMinutes || 0), 0) || 0;
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;

  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Course Info */}
              <div className="lg:col-span-2">
                {course.category && (
                  <Badge variant="secondary" className="mb-4">
                    {course.category.name}
                  </Badge>
                )}
                <h1 className="mb-4 text-3xl font-bold lg:text-4xl">{course.title}</h1>
                <p className="mb-6 text-lg text-muted-foreground">{course.shortDescription}</p>

                <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="size-4" />
                    {hours > 0 && `${hours}h `}{minutes}m total
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="size-4" />
                    {course.lessons?.length || 0} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="size-4" />
                    {course.enrollmentCount} enrolled
                  </span>
                  <Badge variant="outline" className="capitalize">
                    {course.difficulty}
                  </Badge>
                </div>

                {/* Instructor */}
                {course.instructor && (
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={course.instructor.avatarUrl || undefined} />
                      <AvatarFallback>
                        {course.instructor.fullName?.charAt(0) || "I"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {course.instructor.fullName || "Instructor"}
                      </p>
                      <p className="text-xs text-muted-foreground">Course Instructor</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Enrollment Card */}
              <div>
                <Card className="sticky top-20">
                  <div className="relative aspect-video overflow-hidden rounded-t-lg bg-muted">
                    {course.thumbnailUrl ? (
                      <Image
                        src={course.thumbnailUrl}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                        <PlayCircle className="size-16 text-primary/50" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4 text-center">
                      <p className="text-3xl font-bold text-primary">
                        {course.isFree ? "Free" : `KES ${Number(course.price).toLocaleString()}`}
                      </p>
                    </div>
                    {isEnrolled ? (
                      <Link href={`/my-learning/${course.slug}`}>
                        <Button className="w-full" size="lg">
                          Continue Learning
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/courses/${course.slug}/enroll`}>
                        <Button className="w-full" size="lg">
                          {course.isFree ? "Enroll for Free" : "Enroll Now"}
                        </Button>
                      </Link>
                    )}
                    <Separator className="my-6" />
                    <ul className="flex flex-col gap-3 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="size-4 text-accent" />
                        Full lifetime access
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="size-4 text-accent" />
                        Access on mobile and desktop
                      </li>
                      <li className="flex items-center gap-2">
                        <Award className="size-4 text-accent" />
                        Certificate of completion
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="size-4 text-accent" />
                        Downloadable resources
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                {/* Description */}
                {course.description && (
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>About This Course</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <p className="whitespace-pre-wrap">{course.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* What You&apos;ll Learn */}
                {course.whatYouLearn && course.whatYouLearn.length > 0 && (
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>What You&apos;ll Learn</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {course.whatYouLearn.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="mt-0.5 size-4 shrink-0 text-accent" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Requirements */}
                {course.requirements && course.requirements.length > 0 && (
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="flex flex-col gap-2">
                        {course.requirements.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Course Content */}
                <Card>
                  <CardHeader>
                    <CardTitle>Course Content</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {course.lessons?.length || 0} lessons
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex flex-col gap-1">
                      {course.lessons?.map((lesson, index) => (
                        <li
                          key={lesson.id}
                          className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                              {index + 1}
                            </span>
                            <div>
                              <p className="font-medium">{lesson.title}</p>
                              {lesson.description && (
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {lesson.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {lesson.durationMinutes && (
                              <span className="text-xs text-muted-foreground">
                                {lesson.durationMinutes} min
                              </span>
                            )}
                            {lesson.isPreview ? (
                              <Badge variant="outline" className="text-xs">
                                Preview
                              </Badge>
                            ) : (
                              <Lock className="size-4 text-muted-foreground" />
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - Instructor Bio */}
              <div className="hidden lg:block">
                {course.instructor?.bio && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">About the Instructor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 flex items-center gap-3">
                        <Avatar className="size-12">
                          <AvatarImage src={course.instructor.avatarUrl || undefined} />
                          <AvatarFallback>
                            {course.instructor.fullName?.charAt(0) || "I"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {course.instructor.fullName || "Instructor"}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {course.instructor.bio}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
