import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "General disclaimer, affiliate disclosure guidance, and limitation of liability for AI Student Insights.",
};

export default function DisclaimerPage() {
  const updated = "May 4, 2026";
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Disclaimer</h1>
      <p className="mt-2 text-sm text-zinc-500">Last updated: {updated}</p>

      <div className="prose-blog mt-10 space-y-6 text-zinc-300">
        <p>
          The information on <strong>{siteConfig.name}</strong> ({siteConfig.url}) is provided for
          general educational and informational purposes only. Nothing on this Site constitutes
          professional financial, legal, tax, medical, or academic advice. Always consult qualified
          professionals and follow your school’s policies before making decisions.
        </p>

        <h2>No warranty</h2>
        <p>
          We strive for accuracy, but we make no representations or warranties of any kind, express or
          implied, about the completeness, accuracy, reliability, suitability, or availability of the Site
          or the information contained on it. Any reliance you place on such information is strictly at
          your own risk.
        </p>

        <h2>AI tools and third-party services</h2>
        <p>
          Guides may discuss third-party AI tools, APIs, marketplaces, and platforms. Features, pricing,
          terms, and safety practices change frequently. Your use of third-party services is governed by
          those providers’ terms and policies, not ours. We are not responsible for outages, account
          actions, model behavior, or outputs produced by third-party systems.
        </p>

        <h2>Academic integrity</h2>
        <p>
          Students must follow instructor and institutional rules regarding generative AI. Some
          assignments prohibit AI assistance entirely; others require disclosure. Our content is not an
          endorsement of any particular use case in a graded context. See our related article themes in
          the <Link href="/blog">blog</Link> for ethical workflows and disclosure checklists.
        </p>

        <h2>Earnings and business outcomes</h2>
        <p>
          Case studies, examples, and “online earning” discussions are illustrative. Individual results
          vary based on skill, effort, market conditions, compliance, and luck. Past performance of a tool
          or tactic does not guarantee future results.
        </p>

        <h2>Affiliate and sponsorship disclosure</h2>
        <p>
          Some posts may contain affiliate links. If we use affiliate links, we will disclose them near
          the relevant recommendation. Affiliate relationships do not increase your cost; they may pay
          us a commission when you purchase through the link. Sponsored content, if published, will be
          labeled clearly as advertising or sponsorship.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {siteConfig.name} and its contributors disclaim
          liability for any direct, indirect, incidental, consequential, or special damages arising out
          of or in connection with your use of the Site or reliance on any content, including loss of
          profits, data, goodwill, or other intangible losses.
        </p>

        <h2>External links</h2>
        <p>
          The Site may link to external websites. We do not control and are not responsible for the
          content, privacy practices, or availability of those sites.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about this Disclaimer, visit the <Link href="/contact">Contact</Link> page.
        </p>
      </div>
    </div>
  );
}
