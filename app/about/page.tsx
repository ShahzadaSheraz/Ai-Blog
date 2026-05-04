import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn why AI Student Insights publishes practical, SEO-focused guidance for students, beginners, and online earners using AI responsibly.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">About AI Student Insights</h1>
      <p className="mt-6 text-lg text-zinc-400">
        We are an editorial publication focused on one question: how can learners and early-career
        builders use AI tools without trading away judgment, originality, or long-term skill?
      </p>
      <div className="prose-blog mt-10 space-y-6 text-zinc-300">
        <p>
          Our writers test workflows in real study contexts—research papers, language practice,
          portfolio projects, and lightweight freelance gigs—then document what actually saves time
          versus what creates hidden rework. Expect checklists, example prompts, and candid notes on
          limitations, not breathless tool reviews.
        </p>
        <p>
          Whether you are balancing coursework with a part-time remote role or exploring your first
          digital side project, our guides connect strategy across the site. Start with the{" "}
          <Link href="/blog">blog archive</Link>, filter by category, and follow internal links inside
          each article to build a coherent learning path rather than isolated tips.
        </p>
        <p>
          We believe disclosure matters: when AI assists drafting or outlining, we say so, and we
          encourage readers to follow institutional policies. For a deeper stance, read{" "}
          <Link href="/privacy-policy">Privacy Policy</Link> and <Link href="/disclaimer">Disclaimer</Link>{" "}
          pages, which explain how information is handled and where professional advice boundaries sit.
        </p>
        <p>
          Editorial independence is important to us. Sponsored placements, if ever introduced, will
          be labeled clearly and will never change our testing methodology. Reach out on the{" "}
          <Link href="/contact">Contact</Link> page with collaboration ideas, corrections, or topics you
          want covered next.
        </p>
      </div>
    </div>
  );
}
