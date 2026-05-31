import { PublicNav } from "@/components/layouts/public-nav";
import { Footer } from "@/components/layouts/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  GraduationCap,
  Users,
  Target,
  Rocket,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const values = [
  {
    title: "Practical Learning",
    description:
      "We focus on hands-on skills that prepare learners for real-world careers and opportunities.",
    icon: GraduationCap,
  },
  {
    title: "Community Growth",
    description:
      "Our platform helps students, instructors, and businesses grow together through collaboration.",
    icon: Users,
  },
  {
    title: "Mission Driven",
    description:
      "We empower Nairobi youth and SMEs with accessible and affordable digital education.",
    icon: Target,
  },
  {
    title: "Innovation First",
    description:
      "We embrace modern technology and innovation to improve learning experiences.",
    icon: Rocket,
  },
];

const achievements = [
  "10,000+ Active Learners",
  "200+ Expert Courses",
  "50+ Industry Partners",
  "95% Student Satisfaction",
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#09090B] text-white">
      <PublicNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#111827] via-[#09090B] to-[#09090B] py-24">
          {/* Background Glow */}
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
              About Nairobi LMS
            </div>

            <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              Empowering The Future Through{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Digital Learning
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-zinc-400">
              Nairobi LMS is a modern learning platform designed to help
              students, professionals, and businesses gain practical skills
              through immersive online education.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button className="bg-violet-600 hover:bg-violet-700">
                Explore Courses
              </Button>

              <Button
                variant="outline"
                className="border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                Our Story
              </div>

              <h2 className="mb-6 text-4xl font-bold">
                Building Skills For A Competitive Digital World
              </h2>

              <p className="mb-6 leading-8 text-zinc-400">
                Nairobi LMS was created to bridge the gap between education
                and practical industry skills. We believe modern learning
                should be accessible, interactive, and aligned with real-world
                opportunities.
              </p>

              <p className="mb-8 leading-8 text-zinc-400">
                Our platform combines expert instructors, flexible learning,
                and modern technology to help learners grow confidently in
                today’s digital economy.
              </p>

              <Button className="group bg-violet-600 hover:bg-violet-700">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Image Section */}
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/20 to-cyan-500/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111827] p-3">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                  alt="About Nairobi LMS"
                  className="h-[450px] w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-y border-white/10 bg-[#111827]/40 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <div className="mb-4 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                Our Values
              </div>

              <h2 className="mb-4 text-4xl font-bold">
                What Makes Nairobi LMS Different
              </h2>

              <p className="text-zinc-400">
                We combine innovation, accessibility, and practical education
                to create a learning experience that truly matters.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <Card
                  key={value.title}
                  className="
                    group
                    overflow-hidden
                    border
                    border-white/10
                    bg-[#09090B]
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-violet-500/40
                    hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]
                  "
                >
                  <CardContent className="p-6">
                    <div
                      className="
                        mb-5
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-violet-500/10
                        transition-all
                        duration-300
                        group-hover:scale-110
                        group-hover:bg-violet-500/20
                      "
                    >
                      <value.icon className="h-7 w-7 text-violet-400 transition-transform duration-300 group-hover:rotate-6" />
                    </div>

                    <h3 className="mb-3 text-xl font-semibold transition-colors duration-300 group-hover:text-violet-400">
                      {value.title}
                    </h3>

                    <p className="leading-7 text-zinc-400">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 p-10 backdrop-blur">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-4xl font-bold">
                  Our Impact So Far
                </h2>

                <p className="text-zinc-400">
                  We continue helping learners and professionals achieve
                  their goals through modern education.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {achievements.map((item) => (
                  <div
                    key={item}
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-[#09090B]/70
                      p-6
                      transition-all
                      duration-300
                      hover:border-cyan-500/40
                      hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]
                    "
                  >
                    <CheckCircle className="mb-4 h-8 w-8 text-cyan-400" />

                    <p className="font-medium text-zinc-200">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}