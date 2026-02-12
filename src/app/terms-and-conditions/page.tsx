import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions | Cylvor IT",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="w-full bg-transparent min-h-screen relative">
      <div className="pt-20">
        <section className="container max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto border border-white/10 bg-zinc-950/60 rounded-2xl p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-black font-oswald text-white uppercase leading-none">
              Terms and Conditions
            </h1>
            <p className="mt-6 text-zinc-400 font-sans leading-relaxed max-w-3xl">
              These Terms and Conditions (&quot;Terms&quot;) govern your use of this website and any
              services provided by Cylvor IT (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By using
              this website or engaging us for services, you agree to these Terms.
            </p>

            <div className="mt-10 space-y-10">
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Services
              </h2>
              <p className="text-zinc-400 font-sans leading-relaxed">
                We provide digital services such as web development, UI/UX design, and related
                consulting. Specific deliverables, timelines, and pricing will be defined in a
                written proposal, quote, statement of work, or invoice.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Quotes, Scope &amp; Revisions
              </h2>
              <ul className="list-disc pl-6 text-zinc-400 font-sans leading-relaxed space-y-2">
                <li>
                  Quotes are based on the scope and assumptions shared at the time of
                  estimation.
                </li>
                <li>
                  Changes to scope (new features, pages, integrations, content, or design
                  changes) may impact cost and timelines.
                </li>
                <li>
                  We&apos;ll confirm any scope changes in writing before proceeding.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Payments (Advance &amp; Non-Refundable)
              </h2>
              <ul className="list-disc pl-6 text-zinc-400 font-sans leading-relaxed space-y-2">
                <li>
                  Unless otherwise agreed in writing, work begins after an advance payment or
                  deposit is received.
                </li>
                <li>
                  The advance payment/deposit is non-refundable. It reserves capacity and
                  covers initial discovery, planning, and project setup.
                </li>
                <li>
                  Remaining balances are due according to the agreed milestone schedule or
                  invoice terms.
                </li>
                <li>
                  Late payments may pause delivery, disable access to work in progress, or
                  delay timelines until accounts are brought current.
                </li>
              </ul>
              <p className="text-zinc-500 font-sans text-sm leading-relaxed">
                If you require different payment terms (e.g., split milestones), we can agree
                them in writing before the project starts.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Client Responsibilities
              </h2>
              <ul className="list-disc pl-6 text-zinc-400 font-sans leading-relaxed space-y-2">
                <li>
                  You agree to provide timely feedback, approvals, and required content
                  (text, images, branding) unless content creation is included in scope.
                </li>
                <li>
                  You are responsible for ensuring you have rights to materials you provide
                  (e.g., logos, images, copy).
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Intellectual Property
              </h2>
              <ul className="list-disc pl-6 text-zinc-400 font-sans leading-relaxed space-y-2">
                <li>
                  Unless otherwise agreed in writing, ownership of final deliverables transfers
                  to you after full payment is received.
                </li>
                <li>
                  We retain ownership of our pre-existing tools, frameworks, templates, and
                  know-how used to create the deliverables.
                </li>
                <li>
                  Third-party licenses (fonts, plugins, stock assets, hosting) remain subject
                  to their respective terms.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Project Timelines
              </h2>
              <p className="text-zinc-400 font-sans leading-relaxed">
                Timelines are estimates and depend on timely client feedback and deliverables.
                Delays in approvals, content, or payments may shift delivery dates.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Termination
              </h2>
              <p className="text-zinc-400 font-sans leading-relaxed">
                Either party may terminate a project in writing. You are responsible for
                paying for work completed up to the termination date. The advance/deposit
                remains non-refundable.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Warranties &amp; Disclaimers
              </h2>
              <p className="text-zinc-400 font-sans leading-relaxed">
                This website and our services are provided on an &quot;as is&quot; and &quot;as available&quot;
                basis. We do not guarantee that the website will be uninterrupted or error-free
                at all times, especially where third-party services are involved.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Limitation of Liability
              </h2>
              <p className="text-zinc-400 font-sans leading-relaxed">
                To the maximum extent permitted by law, Cylvor IT will not be liable for any
                indirect, incidental, special, consequential, or punitive damages, or any loss
                of profits, revenue, data, or goodwill.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Updates to These Terms
              </h2>
              <p className="text-zinc-400 font-sans leading-relaxed">
                We may update these Terms from time to time. Continued use of the website after
                changes are posted means you accept the updated Terms.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-oswald uppercase tracking-wider text-white">
                Contact
              </h2>
              <p className="text-zinc-400 font-sans leading-relaxed">
                For questions about these Terms or to request a written agreement for a
                project, contact us via the details in the Contact section of this website.
              </p>
              <p className="text-zinc-500 font-sans text-sm leading-relaxed">
                These Terms are provided for general informational purposes and may not cover
                all legal requirements for your jurisdiction.
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
