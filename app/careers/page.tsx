import { PublicNav } from "@/components/layouts/public-nav";
import { Footer } from "@/components/layouts/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Star,
} from "lucide-react";

const jobs = [
  {
    title: "Frontend Developer",
    type: "Full-Time",
    location: "Nairobi, Kenya",
    description:
      "Build modern UI interfaces for Nairobi LMS using Next.js and Tailwind CSS.",
  },
  {
    title: "Backend Developer",
    type: "Remote",
    location: "Africa (Remote)",
    description:
      "Develop APIs, authentication systems, and database integrations.",
  },
  {
    title: "UI/UX Designer",
    type: "Contract",
    location: "Nairobi, Kenya",
    description:
      "Design modern, clean, and user-friendly interfaces for our LMS platform.",
  },
  {
    title: "Digital Marketing Intern",
    type: "Internship",
    location: "Hybrid",
    description:
      "Assist in social media growth, SEO, and content marketing strategies.",
  },
];

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050B1E] text-white">
      <PublicNav />

      <main className="flex-1">

        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1B3A] via-[#050B1E] to-[#050B1E] py-20">
          <div className="container mx-auto px-4 text-center">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-900/40 px-4 py-2 text-sm text-blue-200 border border-blue-700">
              <Briefcase className="size-4" />
              Careers at Nairobi LMS
            </div>

            <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
              Join Our Team
            </h1>

            <p className="mx-auto max-w-2xl text-blue-100/70">
              Help us build the future of online learning in Africa.
              We are always looking for passionate creators and developers.
            </p>

          </div>
        </section>

        {/* JOB LIST */}
        <section className="py-16">
          <div className="container mx-auto px-4 grid gap-6 md:grid-cols-2">

            {jobs.map((job) => (
              <Card
                key={job.title}
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

                  <h2 className="mb-2 text-xl font-semibold group-hover:text-blue-400">
                    {job.title}
                  </h2>

                  <p className="mb-4 text-sm text-blue-100/60">
                    {job.description}
                  </p>

                  <div className="mb-5 flex flex-wrap gap-4 text-xs text-blue-200/60">

                    <div className="flex items-center gap-2">
                      <Clock className="size-4" />
                      {job.type}
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="size-4" />
                      {job.location}
                    </div>

                  </div>

                  <Button
                    variant="ghost"
                    className="p-0 text-blue-400 hover:text-blue-300 group"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
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
              Don’t See a Role For You?
            </h2>

            <p className="mb-6 text-blue-100/70">
              Send us your CV and we’ll contact you when a suitable role opens.
            </p>

            <Button className="bg-blue-600 hover:bg-blue-700">
              Send CV
            </Button>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}