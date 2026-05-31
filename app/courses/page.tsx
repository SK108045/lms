import Link from "next/link";
import { Suspense } from "react";
import { Search, Filter, Star, Clock, Users } from "lucide-react";

import { PublicNav } from "@/components/layouts/public-nav";
import { Footer } from "@/components/layouts/footer";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const courses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    category: "Technology & IT",
    difficulty: "advanced",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    students: 3200,
    duration: "12 Weeks",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Digital Marketing Masterclass",
    category: "Marketing",
    difficulty: "beginner",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    students: 1800,
    duration: "8 Weeks",
    rating: 4.7,
  },
  {
    id: 3,
    title: "Business Entrepreneurship",
    category: "Business",
    difficulty: "intermediate",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
    students: 2400,
    duration: "10 Weeks",
    rating: 4.8,
  },
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    category: "Design",
    difficulty: "beginner",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1200&auto=format&fit=crop",
    students: 1400,
    duration: "6 Weeks",
    rating: 4.6,
  },
];

interface CoursesPageProps {
  searchParams: Promise<{
    search?: string;
    difficulty?: string;
  }>;
}

function CoursesGrid({
  search,
  difficulty,
}: {
  search?: string;
  difficulty?: string;
}) {
  let filteredCourses = courses;

  if (search) {
    filteredCourses = filteredCourses.filter((course) =>
      course.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (difficulty) {
    filteredCourses = filteredCourses.filter(
      (course) => course.difficulty === difficulty
    );
  }

  if (filteredCourses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-900/20">
          <Search className="h-8 w-8 text-blue-400" />
        </div>

        <h3 className="mb-2 text-xl font-semibold text-white">
          No courses found
        </h3>

        <p className="text-blue-100/60">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredCourses.map((course) => (
        <Card
          key={course.id}
          className="overflow-hidden border border-blue-900/40 bg-[#0B1730] transition hover:-translate-y-1 hover:border-blue-500"
        >
          <img
            src={course.image}
            alt={course.title}
            className="h-48 w-full object-cover"
          />

          <CardContent className="p-5">
            <Badge className="mb-3 bg-blue-600 hover:bg-blue-700">
              {course.category}
            </Badge>

            <h3 className="mb-3 text-lg font-semibold text-white">
              {course.title}
            </h3>

            <div className="mb-4 flex items-center gap-4 text-sm text-blue-100/60">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {course.duration}
              </div>

              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {course.students}
              </div>
            </div>

            <div className="mb-4 flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-blue-100/70">
                {course.rating}
              </span>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Enroll Now
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CoursesSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-[350px] animate-pulse rounded-xl bg-[#0B1730]"
        />
      ))}
    </div>
  );
}

export default async function CoursesPage({
  searchParams,
}: CoursesPageProps) {
  const params = await searchParams;

  const difficulties = ["beginner", "intermediate", "advanced"];

  return (
    <div className="flex min-h-screen flex-col bg-[#050B1E] text-white">
      <PublicNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-blue-900/30 bg-gradient-to-b from-[#0B1730] to-[#050B1E] py-16">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-4xl font-bold">
              Browse Courses
            </h1>

            <p className="max-w-2xl text-blue-100/60">
              Explore our library of expert-led courses designed to help
              you develop practical skills for your career.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-blue-900/30 py-6">
          <div className="container mx-auto px-4">
            <form className="flex flex-wrap items-center gap-4">
              <div className="relative min-w-[220px] flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-300" />

                <Input
                  name="search"
                  placeholder="Search courses..."
                  defaultValue={params.search}
                  className="border-blue-900 bg-[#0B1730] pl-10 text-white placeholder:text-blue-100/40"
                />
              </div>

              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Filter className="mr-2 h-4 w-4" />
                Search
              </Button>
            </form>

            {/* Difficulty */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-sm text-blue-100/60">
                Difficulty:
              </span>

              {difficulties.map((diff) => (
                <Link
                  key={diff}
                  href={`/courses?difficulty=${diff}`}
                >
                  <Badge
                    className={`cursor-pointer capitalize ${
                      params.difficulty === diff
                        ? "bg-blue-600"
                        : "border border-blue-700 bg-[#0B1730] text-blue-100 hover:bg-blue-900"
                    }`}
                  >
                    {diff}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Courses */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-blue-100/60">
                {courses.length} courses found
              </p>
            </div>

            <Suspense fallback={<CoursesSkeleton />}>
              <CoursesGrid
                search={params.search}
                difficulty={params.difficulty}
              />
            </Suspense>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}