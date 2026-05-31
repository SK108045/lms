import { PublicNav } from "@/components/layouts/public-nav";
import { Footer } from "@/components/layouts/footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Briefcase,
  Code,
  Megaphone,
  ArrowRight,
} from "lucide-react";

const programs = [
  {
    title: "Business & Entrepreneurship",
    description:
      "Learn business management, entrepreneurship, and startup growth strategies.",
    icon: Briefcase,
  },
  {
    title: "Software Development",
    description:
      "Master frontend, backend, and full-stack web development technologies.",
    icon: Code,
  },
  {
    title: "Digital Marketing",
    description:
      "Build modern digital marketing skills including SEO and social media marketing.",
    icon: Megaphone,
  },
  {
    title: "Professional Development",
    description:
      "Improve communication, leadership, and workplace productivity skills.",
    icon: GraduationCap,
  },
];

export default function ProgramsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050B1E] text-white">
      <PublicNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-blue-900/30 bg-gradient-to-b from-[#0B1730] to-[#050B1E] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold">
              Our Programs
            </h1>

            <p className="mx-auto max-w-2xl text-blue-100/60">
              Explore practical training programs designed to equip
              students and professionals with real-world skills.
            </p>
          </div>
        </section>

        {/* Programs */}
        <section className="py-14">
          <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <Card
                key={program.title}
                className="
                  group
                  relative
                  overflow-hidden
                  border
                  border-blue-900/40
                  bg-[#0B1730]
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-blue-500
                  hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]
                  cursor-pointer
                "
              >
                {/* Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-blue-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <CardContent className="relative z-10 p-6">
                  {/* Icon */}
                  <div
                    className="
                      mb-5
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-600/20
                      transition-all
                      duration-300
                      group-hover:scale-110
                      group-hover:bg-blue-600/30
                    "
                  >
                    <program.icon className="h-7 w-7 text-blue-400 transition-transform duration-300 group-hover:rotate-6" />
                  </div>

                  {/* Title */}
                  <h2 className="mb-3 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-blue-400">
                    {program.title}
                  </h2>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-6 text-blue-100/60">
                    {program.description}
                  </p>

                  {/* Button */}
                  <button
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-medium
                      text-blue-400
                      transition-all
                      duration-300
                      group-hover:gap-3
                    "
                  >
                    Explore Program
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}