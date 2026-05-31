import { PublicNav } from "@/components/layouts/public-nav";
import { Footer } from "@/components/layouts/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050B1E] text-white">
      <PublicNav />

      <main className="flex-1">

        {/* HERO */}
        <section className="bg-gradient-to-b from-[#0B1B3A] to-[#050B1E] py-20">
          <div className="container mx-auto px-4 text-center">

            <h1 className="text-4xl font-bold lg:text-5xl mb-4">
              Privacy Policy
            </h1>

            <p className="text-blue-100/70 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how Nairobi LMS
              collects, uses, and protects your information.
            </p>

          </div>
        </section>

        {/* CONTENT */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-10">

            <div className="bg-[#0B1B3A] border border-blue-900/40 p-6 rounded-xl hover:border-blue-500 transition">
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                1. Information We Collect
              </h2>
              <p className="text-blue-100/70">
                We collect information such as your name, email address, and learning activity
                when you register or use our platform.
              </p>
            </div>

            <div className="bg-[#0B1B3A] border border-blue-900/40 p-6 rounded-xl hover:border-blue-500 transition">
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                2. How We Use Your Information
              </h2>
              <p className="text-blue-100/70">
                We use your data to provide courses, track progress, improve user experience,
                and personalize learning content.
              </p>
            </div>

            <div className="bg-[#0B1B3A] border border-blue-900/40 p-6 rounded-xl hover:border-blue-500 transition">
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                3. Data Protection
              </h2>
              <p className="text-blue-100/70">
                We implement strong security measures to protect your personal data
                from unauthorized access or misuse.
              </p>
            </div>

            <div className="bg-[#0B1B3A] border border-blue-900/40 p-6 rounded-xl hover:border-blue-500 transition">
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                4. Third-Party Services
              </h2>
              <p className="text-blue-100/70">
                We may use trusted third-party services like Supabase for authentication
                and data storage.
              </p>
            </div>

            <div className="bg-[#0B1B3A] border border-blue-900/40 p-6 rounded-xl hover:border-blue-500 transition">
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                5. Your Rights
              </h2>
              <p className="text-blue-100/70">
                You have the right to access, update, or delete your personal information
                at any time.
              </p>
            </div>

            <div className="bg-[#0B1B3A] border border-blue-900/40 p-6 rounded-xl hover:border-blue-500 transition">
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                6. Contact Us
              </h2>
              <p className="text-blue-100/70">
                If you have any questions about this Privacy Policy, contact us via
                the support section of Nairobi LMS.
              </p>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}