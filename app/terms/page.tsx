import { PublicNav } from "@/components/layouts/public-nav";
import { Footer } from "@/components/layouts/footer";

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050B1E] text-white">
      <PublicNav />

      <main className="flex-1">

        {/* HERO */}
        <section className="bg-gradient-to-b from-[#0B1B3A] to-[#050B1E] py-20">
          <div className="container mx-auto px-4 text-center">

            <h1 className="text-4xl font-bold lg:text-5xl mb-4">
              Terms of Service
            </h1>

            <p className="text-blue-100/70 max-w-2xl mx-auto">
              These terms govern your use of Nairobi LMS. By accessing our platform,
              you agree to follow these rules.
            </p>

          </div>
        </section>

        {/* CONTENT */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-10">

            <div className="bg-[#0B1B3A] border border-blue-900/40 p-6 rounded-xl hover:border-blue-500 transition">
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                1. Acceptance of Terms
              </h2>
              <p className="text-blue-100/70">
                By using Nairobi LMS, you agree to comply with these Terms of Service.
                If you do not agree, please discontinue use of the platform.
              </p>
            </div>

            <div className="bg-[#0B1B3A] border border-blue-900/40 p-6 rounded-xl hover:border-blue-500 transition">
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                2. User Accounts
              </h2>
              <p className="text-blue-100/70">
                You are responsible for maintaining the confidentiality of your account
                credentials and all activities under your account.
              </p>
            </div>

            <div className="bg-[#0B1B3A] border border-blue-900/40 p-6 rounded-xl hover:border-blue-500 transition">
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                3. Course Access
              </h2>
              <p className="text-blue-100/70">
                Course content is provided for personal learning only. Redistribution or
                resale is strictly prohibited.
              </p>
            </div>

            <div className="bg-[#0B1B3A] border border-blue-900/40 p-6 rounded-xl hover:border-blue-500 transition">
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                4. Payments & Subscriptions
              </h2>
              <p className="text-blue-100/70">
                Some courses may require payment. All payments are processed securely through
                trusted third-party providers.
              </p>
            </div>

            <div className="bg-[#0B1B3A] border border-blue-900/40 p-6 rounded-xl hover:border-blue-500 transition">
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                5. Prohibited Activities
              </h2>
              <p className="text-blue-100/70">
                Users must not engage in hacking, data scraping, or any misuse of the platform
                that may harm the system or other users.
              </p>
            </div>

            <div className="bg-[#0B1B3A] border border-blue-900/40 p-6 rounded-xl hover:border-blue-500 transition">
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                6. Termination
              </h2>
              <p className="text-blue-100/70">
                We reserve the right to suspend or terminate accounts that violate these terms.
              </p>
            </div>

            <div className="bg-[#0B1B3A] border border-blue-900/40 p-6 rounded-xl hover:border-blue-500 transition">
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                7. Contact
              </h2>
              <p className="text-blue-100/70">
                For any questions regarding these Terms, please contact support via Nairobi LMS.
              </p>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}