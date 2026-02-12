import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Cylvor IT",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full bg-transparent min-h-screen relative">
      <div className="pt-20">
        <section className="container max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto border border-white/10 bg-zinc-950/60 rounded-2xl p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-black font-oswald text-white uppercase leading-none">
              Privacy Policy
            </h1>
            <p className="mt-6 text-zinc-400 font-sans leading-relaxed max-w-3xl">
              This Privacy Policy explains how Cylvor IT (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
              collects, uses, and shares information when you visit our website or contact us
              about services.
            </p>

            <div className="mt-10 space-y-10">

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Information We Collect
              </h2>
              <p className="text-zinc-400 font-sans leading-relaxed">
                Depending on how you interact with us, we may collect:
              </p>
              <ul className="list-disc pl-6 text-zinc-400 font-sans leading-relaxed space-y-2">
                <li>
                  Contact details (such as name, email, phone number, company name) when you
                  submit a form or message us.
                </li>
                <li>
                  Project-related details you choose to share (requirements, timelines,
                  budgets, brand assets).
                </li>
                <li>
                  Website usage data (such as approximate location, device/browser info,
                  pages viewed) collected via cookies or similar technologies.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                How We Use Information
              </h2>
              <ul className="list-disc pl-6 text-zinc-400 font-sans leading-relaxed space-y-2">
                <li>To respond to inquiries and communicate with you.</li>
                <li>To provide, maintain, and improve our services and website.</li>
                <li>To prepare proposals, quotes, and project documentation.</li>
                <li>To detect and prevent spam, abuse, or security incidents.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Cookies &amp; Analytics
              </h2>
              <p className="text-zinc-400 font-sans leading-relaxed">
                We may use cookies and similar technologies to operate the site and understand
                how it&apos;s used. You can control cookies through your browser settings. Some
                features may not work properly if cookies are disabled.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Sharing of Information
              </h2>
              <p className="text-zinc-400 font-sans leading-relaxed">
                We don&apos;t sell your personal information. We may share information only when
                necessary to:
              </p>
              <ul className="list-disc pl-6 text-zinc-400 font-sans leading-relaxed space-y-2">
                <li>
                  Work with service providers (e.g., hosting, email, analytics) who process
                  data on our behalf.
                </li>
                <li>Comply with legal obligations or respond to lawful requests.</li>
                <li>Protect our rights, users, and services (fraud/security prevention).</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Data Retention
              </h2>
              <p className="text-zinc-400 font-sans leading-relaxed">
                We keep information only as long as needed for the purposes described above,
                including maintaining business records and resolving disputes.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Security
              </h2>
              <p className="text-zinc-400 font-sans leading-relaxed">
                We use reasonable administrative and technical safeguards designed to protect
                information. No method of transmission or storage is 100% secure.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Your Choices
              </h2>
              <ul className="list-disc pl-6 text-zinc-400 font-sans leading-relaxed space-y-2">
                <li>
                  You can request access, correction, or deletion of your personal information
                  by contacting us.
                </li>
                <li>You can opt out of non-essential communications at any time.</li>
              </ul>
              <p className="text-zinc-500 font-sans text-sm leading-relaxed">
                Note: rights and response timelines may vary depending on your location.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Changes to This Policy
              </h2>
              <p className="text-zinc-400 font-sans leading-relaxed">
                We may update this Privacy Policy from time to time. The effective date above
                will be updated when changes are posted.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Contact
              </h2>
              <p className="text-zinc-400 font-sans leading-relaxed">
                If you have questions about this Privacy Policy or how we handle information,
                contact us via the details on the Contact section of this website.
              </p>
            </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
