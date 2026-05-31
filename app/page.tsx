import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicNav } from "@/components/layouts/public-nav";
import { Footer } from "@/components/layouts/footer";
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Expert-Led Courses",
    description: "Learn from industry professionals with real-world experience in their fields.",
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Connect with peers, join study groups, and collaborate on projects.",
  },
  {
    icon: Award,
    title: "Verified Certificates",
    description: "Earn recognized certificates upon course completion to boost your career.",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Monitor your learning journey with detailed analytics and milestones.",
  },
  {
    icon: Briefcase,
    title: "Career Support",
    description: "Access job opportunities and connect with potential employers.",
  },
  {
    icon: GraduationCap,
    title: "Flexible Learning",
    description: "Study at your own pace with lifetime access to course materials.",
  },
];

const categories = [
  { name: "Business & Entrepreneurship", count: 45, icon: Briefcase },
  { name: "Digital Marketing", count: 32, icon: TrendingUp },
  { name: "Technology & IT", count: 58, icon: BookOpen },
  { name: "Finance & Accounting", count: 28, icon: Award },
];

const testimonials = [
  {
    name: "Roque Junior",
    role: "SME Owner",
    content: "Nairobi LMS transformed how I manage my business. The courses are practical and directly applicable.",
    rating: 5,
  },
  {
    name: "Wendy Atieno",
    role: "Software Developer",
    content: "The tech courses here are up-to-date and taught by experts. I landed my dream job after completing the full-stack program.",
    rating: 5,
  },
  {
    name: "Oscar Omaria",
    role: "Marketing Manager",
    content: "The digital marketing certification helped me advance my career. Highly recommended for professionals.",
    rating: 5,
  },
];

const stats = [
  { value: "10,000+", label: "Active Learners" },
  { value: "200+", label: "Expert Courses" },
  { value: "50+", label: "Industry Partners" },
  { value: "95%", label: "Success Rate" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050B1E] text-white">
      <PublicNav />

      <main className="flex-1">

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1B3A] via-[#050B1E] to-[#050B1E] py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4 bg-blue-900/40 text-blue-200 border border-blue-700">
                Empowering Nairobi&apos;s Future
              </Badge>

              <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-6xl">
                Learn Skills That <span className="text-blue-400">Transform</span> Your Career
              </h1>

              <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100/70">
                Join thousands of SMEs and youth in Nairobi gaining practical skills through
                expert-led courses. Start your learning journey today.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/courses">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Browse Courses <ArrowRight className="size-4 ml-2" />
                  </Button>
                </Link>

                <Link href="/register">
                  <Button size="lg" variant="outline" className="border-blue-500 text-blue-200 hover:bg-blue-900/30">
                    <Play className="size-4 mr-2" />
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute -right-20 -top-20 size-[400px] rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-[400px] rounded-full bg-blue-500/10 blur-3xl" />
        </section>

        {/* Stats Section */}
        <section className="border-y border-blue-900 bg-[#07122B] py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-blue-400 lg:text-4xl">{stat.value}</p>
                  <p className="text-sm text-blue-100/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-[#050B1E]">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Why Choose Nairobi LMS?</h2>
              <p className="text-blue-100/60">
                Everything you need to succeed in your learning journey, all in one platform.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-[#0B1B3A] border-blue-900/50">
                  <CardHeader>
                    <div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-blue-900/30">
                      <feature.icon className="size-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-blue-100/60">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-[#07122B] py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Popular Categories</h2>
              <p className="text-blue-100/60">
                Explore our most popular course categories tailored for SMEs and professionals.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <Link key={category.name} href={`/courses?category=${encodeURIComponent(category.name)}`}>
                  <Card className="cursor-pointer bg-[#0B1B3A] border-blue-900/50 hover:border-blue-500">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="flex size-12 items-center justify-center rounded-lg bg-blue-900/30">
                        <category.icon className="size-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{category.name}</p>
                        <p className="text-sm text-blue-100/60">{category.count} courses</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-[#050B1E]">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold">What Our Learners Say</h2>
              <p className="text-blue-100/60">
                Join thousands of satisfied learners who have transformed their careers.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <Card key={t.name} className="bg-[#0B1B3A] border-blue-900/50">
                  <CardContent className="p-6">
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="size-4 fill-blue-400 text-blue-400" />
                      ))}
                    </div>
                    <p className="mb-4 text-blue-100/60">"{t.content}"</p>
                    <p className="font-medium text-white">{t.name}</p>
                    <p className="text-sm text-blue-100/60">{t.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-900 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Start Learning?</h2>
            <p className="mb-8 text-blue-100/70">
              Join our community and start building your future today.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-100">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}