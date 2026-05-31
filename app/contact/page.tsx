import { PublicNav } from "@/components/layouts/public-nav";
import { Footer } from "@/components/layouts/footer";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#09090B] text-white">
      <PublicNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#111827] via-[#09090B] to-[#09090B] py-24">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
              Contact Nairobi LMS
            </div>

            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              Let&apos;s Connect
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-8 text-zinc-400">
              Have questions, feedback, or partnership inquiries?
              We’d love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2">
            {/* Contact Form */}
            <Card className="border border-white/10 bg-[#111827]/60 backdrop-blur">
              <CardContent className="p-8">
                <h2 className="mb-6 text-3xl font-bold">
                  Send A Message
                </h2>

                <form className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm text-zinc-400">
                      Full Name
                    </label>

                    <Input
                      placeholder="Enter your name"
                      className="border-white/10 bg-[#09090B] text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-zinc-400">
                      Email Address
                    </label>

                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="border-white/10 bg-[#09090B] text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-zinc-400">
                      Subject
                    </label>

                    <Input
                      placeholder="Message subject"
                      className="border-white/10 bg-[#09090B] text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-zinc-400">
                      Message
                    </label>

                    <Textarea
                      placeholder="Write your message..."
                      className="min-h-[150px] border-white/10 bg-[#09090B] text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
                    />
                  </div>

                  <Button className="group w-full bg-violet-600 hover:bg-violet-700">
                    Send Message
                    <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="group border border-white/10 bg-[#111827]/60 transition-all duration-300 hover:border-violet-500/40 hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
                    <Mail className="h-7 w-7 text-violet-400" />
                  </div>

                  <div>
                    <h3 className="mb-1 text-xl font-semibold">
                      Email
                    </h3>

                    <p className="text-zinc-400">
                      support@nairobi-lms.com
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border border-white/10 bg-[#111827]/60 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">
                    <Phone className="h-7 w-7 text-cyan-400" />
                  </div>

                  <div>
                    <h3 className="mb-1 text-xl font-semibold">
                      Phone
                    </h3>

                    <p className="text-zinc-400">
                      +254 700 123 456
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border border-white/10 bg-[#111827]/60 transition-all duration-300 hover:border-pink-500/40 hover:shadow-[0_0_25px_rgba(236,72,153,0.2)]">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10">
                    <MapPin className="h-7 w-7 text-pink-400" />
                  </div>

                  <div>
                    <h3 className="mb-1 text-xl font-semibold">
                      Location
                    </h3>

                    <p className="text-zinc-400">
                      Nairobi, Kenya
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group border border-white/10 bg-[#111827]/60 transition-all duration-300 hover:border-yellow-500/40 hover:shadow-[0_0_25px_rgba(234,179,8,0.2)]">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10">
                    <Clock className="h-7 w-7 text-yellow-400" />
                  </div>

                  <div>
                    <h3 className="mb-1 text-xl font-semibold">
                      Working Hours
                    </h3>

                    <p className="text-zinc-400">
                      Monday - Friday, 8AM - 5PM
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}