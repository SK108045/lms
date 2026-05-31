"use client";

import { useState } from "react";

import { PublicNav } from "@/components/layouts/public-nav";
import { Footer } from "@/components/layouts/footer";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  ChevronDown,
  Search,
  HelpCircle,
} from "lucide-react";

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer:
      "You can enroll by creating an account, browsing available courses, and clicking the enroll button.",
  },
  {
    question: "Are the courses free?",
    answer:
      "Some courses are free while others require payment depending on the program.",
  },
  {
    question: "Do I get a certificate after completion?",
    answer:
      "Yes. Students receive verified certificates after successfully completing eligible courses.",
  },
  {
    question: "Can I access courses on mobile?",
    answer:
      "Yes. Nairobi LMS is fully responsive and works on phones, tablets, and desktops.",
  },
  {
    question: "How do instructors upload lessons?",
    answer:
      "Instructors can access their dashboard and upload lessons, quizzes, and assignments easily.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
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
              FAQ • Nairobi LMS
            </div>

            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              Frequently Asked Questions
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-8 text-zinc-400">
              Find answers to common questions about courses,
              enrollment, certificates, and learning on Nairobi LMS.
            </p>

            {/* Search */}
            <div className="mx-auto mt-10 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

                <Input
                  placeholder="Search questions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-14 border-white/10 bg-[#111827]/80 pl-12 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="space-y-5">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <Card
                    key={faq.question}
                    className="
                      overflow-hidden
                      border
                      border-white/10
                      bg-[#111827]/60
                      backdrop-blur
                      transition-all
                      duration-300
                      hover:border-violet-500/30
                      hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]
                    "
                  >
                    <button
                      onClick={() =>
                        setOpenIndex(isOpen ? null : index)
                      }
                      className="w-full text-left"
                    >
                      <CardContent className="p-0">
                        <div className="flex items-center justify-between p-6">
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
                              <HelpCircle className="h-6 w-6 text-violet-400" />
                            </div>

                            <h2 className="text-lg font-semibold">
                              {faq.question}
                            </h2>
                          </div>

                          <ChevronDown
                            className={`h-5 w-5 text-zinc-400 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </div>

                        <div
                          className={`grid transition-all duration-300 ${
                            isOpen
                              ? "grid-rows-[1fr]"
                              : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="border-t border-white/10 px-6 pb-6 pt-4 text-zinc-400 leading-7">
                              {faq.answer}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </button>
                  </Card>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredFaqs.length === 0 && (
              <div className="mt-20 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/10">
                    <Search className="h-8 w-8 text-violet-400" />
                  </div>
                </div>

                <h3 className="mb-2 text-2xl font-semibold">
                  No questions found
                </h3>

                <p className="text-zinc-400">
                  Try searching with different keywords.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}