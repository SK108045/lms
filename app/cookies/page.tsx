import { PublicNav } from "@/components/layouts/public-nav";
import { Footer } from "@/components/layouts/footer";

export default function CookiePolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050B1E] text-white">
      <PublicNav />

      <main className="flex-1">

        {/* HERO */}
        <section className="bg-gradient-to-b from-[#0B1B3A] to-[#050B1E] py-20">
          <div className="container mx-auto px-4 text-center">

            <h1 className="text-4xl font-bold lg:text-5xl mb-4">
              Cookie Policy
            </h1>

            <p className="text-blue-100/70 max-w-2xl mx-auto">
              This policy explains how Nairobi LMS uses cookies to improve your experience.
            </p>

          </div>
        </section>

        {/* CONTENT */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-10">

            <div className="bg-[#0B1B3A] border border-blue-900/40 p-6 rounded-xl hover:border-blue-500 transition">
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                1. What Are Cookies?
              </h2>
              <p className="text-blue-100/70">
                Cookies are small text files stored on your device that help websites remember your preferences and activity.
              </p>
            </div>

            <div className="bg-[#0B1B3A] border border-blue-900/40 p-6 rounded-xl hover:border-blue-500 transition">
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                2. How We Use Cookies
              </h2>
              <p className="text-blue-100/70">
                We use cookies to improve login sessions, track learning progress, and enhance user experience.
              </p>
            </div>

            <div className="bg-[#0B1B3A] border border-blue-900/40 p-6 rounded-xl hover:border-blue-500 transition">
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                3. Types of Cookies We Use
              </h2>
              <p className="text-blue-100/70">
                Essential cookies, analytics cookies, and preference cookies are used across our platform.
              </p>
            </div>

            <div className="bg-[#0B1B3A] border border-blue-900/40 p-6 rounded-xl hover:border-blue-500 transition">
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                4. Managing Cookies
              </h2>
              <p className="text-blue-100/70">
                You can disable cookies in your browser settings, but some features may not work properly.
              </p>
            </div>

            <div className="bg-[#0B1B3A] border border-blue-900/40 p-6 rounded-xl hover:border-blue-500 transition">
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                5. Updates to This Policy
              </h2>
              <p className="text-blue-100/70">
                We may update this Cookie Policy from time to time to reflect changes in technology or regulations.
              </p>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}