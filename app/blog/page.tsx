import { PublicNav } from "@/components/layouts/public-nav";
import { Footer } from "@/components/layouts/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  ArrowRight,
  Calendar,
  User,
  Tag,
  BookOpen,
} from "lucide-react";

const posts = [
  {
    title: "Top 10 Skills Every Student Should Learn in 2026",
    excerpt:
      "Discover the most in-demand skills that will shape careers in the next digital era.",
    author: "Admin",
    date: "May 2026",
    tag: "Education",
  },
  {
    title: "How Nairobi Youth Can Build Tech Careers",
    excerpt:
      "A complete guide to starting a career in software development and digital jobs.",
    author: "Editor",
    date: "April 2026",
    tag: "Technology",
  },
  {
    title: "Why Online Learning Is the Future of Education",
    excerpt:
      "Explore how digital platforms are transforming education across Africa.",
    author: "Admin",
    date: "March 2026",
    tag: "Insights",
  },
];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050B1E] text-white">
      <PublicNav />

      <main className="flex-1">

        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1B3A] via-[#050B1E] to-[#050B1E] py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-900/40 px-4 py-2 text-sm text-blue-200 border border-blue-700">
              <BookOpen className="size-4" />
              Nairobi LMS Blog
            </div>

            <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
              Latest Articles & Insights
            </h1>

            <p className="mx-auto max-w-2xl text-blue-100/70">
              Learn, grow, and stay updated with trends in education,
              technology, and career development.
            </p>
          </div>
        </section>

        {/* BLOG GRID */}
        <section className="py-16">
          <div className="container mx-auto px-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {posts.map((post) => (
              <Card
                key={post.title}
                className="
                  group
                  bg-[#0B1B3A]
                  border-blue-900/50
                  hover:border-blue-500
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]
                  cursor-pointer
                "
              >
                <CardContent className="p-6">

                  {/* TAG */}
                  <div className="mb-4 flex items-center gap-2 text-xs text-blue-300">
                    <Tag className="size-4" />
                    {post.tag}
                  </div>

                  {/* TITLE */}
                  <h2 className="mb-3 text-xl font-semibold group-hover:text-blue-400">
                    {post.title}
                  </h2>

                  {/* EXCERPT */}
                  <p className="mb-5 text-sm text-blue-100/60">
                    {post.excerpt}
                  </p>

                  {/* META */}
                  <div className="mb-6 flex items-center justify-between text-xs text-blue-200/60">
                    <div className="flex items-center gap-2">
                      <User className="size-4" />
                      {post.author}
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="size-4" />
                      {post.date}
                    </div>
                  </div>

                  {/* BUTTON */}
                  <Button
                    variant="ghost"
                    className="group/btn p-0 text-blue-400 hover:text-blue-300"
                  >
                    Read More
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>

                </CardContent>
              </Card>
            ))}

          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#07122B] border-t border-blue-900">
          <div className="container mx-auto px-4 text-center">

            <h2 className="mb-4 text-3xl font-bold">
              Want More Learning Content?
            </h2>

            <p className="mb-8 text-blue-100/70">
              Subscribe to get updates on new courses and articles.
            </p>

            <Button className="bg-blue-600 hover:bg-blue-700">
              Subscribe Now
            </Button>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}