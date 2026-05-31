"use client";

import { useState } from "react";

import { PublicNav } from "@/components/layouts/public-nav";
import { Footer } from "@/components/layouts/footer";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Search,
  BookOpen,
  CreditCard,
  Shield,
  Settings,
  Users,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

const helpTopics = [
  {
    title: "Getting Started",
    description:
      "Learn how to create an account, enroll in courses, and begin learning.",
    icon: BookOpen,
  },
  {
    title: "Billing & Payments",
    description:
      "Manage subscriptions, invoices, and payment-related issues.",
    icon: CreditCard,
  },
  {
    title: "Account & Security",
    description:
      "Update your password, secure your account, and manage privacy settings.",
    icon: Shield,
  },
  {
    title: "Platform Settings",
    description:
      "Customize notifications, profile settings, and preferences.",
    icon: Settings,
  },
  {
    title: "Community & Instructors",
    description:
      "Interact with instructors, join discussions, and collaborate with learners.",
    icon: Users,
  },
];

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");

  const filteredTopics = helpTopics.filter((topic) =>
    topic.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#09090B] text-white">
      <PublicNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#111827] via-[#09090B] to-[#09090B] py-24">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
              Help Center • Nairobi LMS
            </div>

            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              How Can We Help?
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-8 text-zinc-400">
              Search help articles, explore guides, and get support
              for your Nairobi LMS experience.
            </p>

            {/* Search */}
            <div className="mx-auto mt-10 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

                <Input
                  placeholder="Search help articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-14 border-white/10 bg-[#111827]/80 pl-12 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold">
                Popular Help Topics
              </h2>

              <p className="text-zinc-400">
                Browse categories to quickly find answers and support.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTopics.map((topic) => (
                <Card
                  key={topic.title}
                  className="
                    group
                    overflow-hidden
                    border
                    border-white/10
                    bg-[#111827]/60
                    backdrop-blur
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-violet-500/40
                    hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]
                    cursor-pointer
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
                      <topic.icon className="h-7 w-7 text-violet-400 transition-transform duration-300 group-hover:rotate-6" />
                    </div>

                    <h3 className="mb-3 text-xl font-semibold transition-colors duration-300 group-hover:text-violet-400">
                      {topic.title}
                    </h3>

                    <p className="mb-6 leading-7 text-zinc-400">
                      {topic.description}
                    </p>

                    <Button
                      variant="ghost"
                      className="group/btn p-0 text-violet-400 hover:bg-transparent hover:text-violet-300"
                    >
                      Explore Topic
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredTopics.length === 0 && (
              <div className="mt-20 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/10">
                    <HelpCircle className="h-8 w-8 text-violet-400" />
                  </div>
                </div>

                <h3 className="mb-2 text-2xl font-semibold">
                  No Help Topics Found
                </h3>

                <p className="text-zinc-400">
                  Try using different keywords in your search.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Contact Support */}
        <section className="border-t border-white/10 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 p-10 text-center backdrop-blur">
              <h2 className="mb-4 text-4xl font-bold">
                Still Need Help?
              </h2>

              <p className="mx-auto mb-8 max-w-2xl text-zinc-400">
                Our support team is available to assist you with any
                questions or issues you mssssay have.
              </p>

              <Button className="group bg-violet-600 hover:bg-violet-700">
                Contact Support
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}