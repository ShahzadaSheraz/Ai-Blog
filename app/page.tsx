import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { getAllPostSummaries } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPostSummaries();
  const featured = posts.slice(0, 3);
  const latest = posts.slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-zinc-950 to-zinc-950" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Practical guides · Updated for 2026
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Learn smarter, earn online, and use AI with clarity—not hype.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            {siteConfig.tagline} Deep dives on study workflows, beginner-friendly tool stacks, and
            responsible ways to build income with AI support.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
            >
              Browse all articles
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/60 px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-900"
            >
              Why we publish
            </Link>
          </div>
          <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-zinc-800 pt-10 text-sm">
            <div>
              <dt className="text-zinc-500">Guides</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">{posts.length}+</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Focus</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">Study & earn</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Tone</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">No fluff</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">Featured guides</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Long-form breakdowns you can apply this week in class or client work.
            </p>
          </div>
          <Link href="/blog" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
            View blog archive →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-900/30">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Latest on the blog</h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Categories span study stacks, beginner onboarding, online earning playbooks, and ethics so
            you stay aligned with school policies and platform rules.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-950 p-8 sm:p-10">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">Start with a category</h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Jump straight into the workflow that matches where you are today.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Student Study Stack",
              "Beginner Guides",
              "Online Earning",
              "Ethics & Safety",
            ].map((c) => (
              <Link
                key={c}
                href={`/blog?category=${encodeURIComponent(c)}`}
                className="rounded-full border border-zinc-700 bg-zinc-950/60 px-4 py-2 text-xs font-medium text-zinc-200 transition hover:border-indigo-500/50 hover:text-white"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
