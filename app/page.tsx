import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { SiteSearch } from "@/components/SiteSearch";
import { NewsletterBox } from "@/components/NewsletterBox";
import { LatestPostsMore } from "@/components/LatestPostsMore";
import { getAllPostSummaries, getFeaturedSummaries } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import { CATEGORY_DEFINITIONS } from "@/lib/categories";

export default function HomePage() {
  const posts = getAllPostSummaries();
  const featured = getFeaturedSummaries(6);
  const searchIndex = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    tags: p.tags,
  }));

  return (
    <>
      <section className="relative overflow-hidden border-b border-[color:var(--border)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/15 via-indigo-500/10 to-transparent dark:from-indigo-900/40 dark:via-zinc-950 dark:to-zinc-950" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-400">
            AI & tech · Mobile-first · {new Date().getFullYear()}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-5xl lg:text-6xl">
            Learn AI &amp; Tech Smarter
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--muted)]">
            {siteConfig.tagline} Deep dives for students and builders—organized by category with modern tools and zero
            hype.
          </p>

          <div className="mt-10 flex max-w-xl flex-col gap-4 sm:max-w-2xl">
            <SiteSearch litePosts={searchIndex} placeholder="Search 2+ letters for instant matches…" className="w-full" />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-soft-lg shadow-indigo-600/35 transition hover:opacity-95"
            >
              Browse articles
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-6 py-3 text-sm font-semibold text-[color:var(--foreground)] shadow-soft transition hover:border-indigo-500/35 hover:bg-[color:var(--muted-bg)]"
            >
              Join for bookmarks & discussion
            </Link>
          </div>

          <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-8 border-t border-[color:var(--border)] pt-10 text-sm md:grid-cols-4">
            <div>
              <dt className="text-[color:var(--muted)]">Guides live</dt>
              <dd className="mt-2 text-2xl font-semibold tabular-nums text-[color:var(--foreground)]">{posts.length}</dd>
            </div>
            <div>
              <dt className="text-[color:var(--muted)]">Categories</dt>
              <dd className="mt-2 text-2xl font-semibold tabular-nums text-[color:var(--foreground)]">
                {CATEGORY_DEFINITIONS.length}
              </dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-[color:var(--muted)]">Audience</dt>
              <dd className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
                Students & creators
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[color:var(--foreground)]">Featured posts</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[color:var(--muted)]">
              Editors surface high-signal tutorials you can execute this week—each with pacing, typography, and
              context-rich guidance.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex shrink-0 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
          >
            View full archive →
          </Link>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="border-y border-[color:var(--border)] bg-[color:var(--muted-bg)] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-[color:var(--foreground)]">Explore categories</h2>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
              Dive into stacks that match where you want to focus next.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORY_DEFINITIONS.map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="block h-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-soft transition hover:border-indigo-500/35 hover:shadow-soft-lg"
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                  Category
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-[color:var(--foreground)]">{c.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">{c.description}</p>
                <span className="mt-6 inline-flex text-sm font-semibold text-[color:var(--foreground-muted)]">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[color:var(--foreground)]">Latest posts</h2>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
              Stretch the list here, or open the structured archive when you want filters or deep search.
            </p>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
            Paginated archive →
          </Link>
        </div>
        <LatestPostsMore posts={posts} initial={6} pageSize={4} />

        <div className="mt-16 rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-soft sm:p-12">
          <NewsletterBox id="newsletter" />
          <div className="mt-12 flex flex-wrap gap-6 text-sm text-[color:var(--muted)]">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">Need help?</p>
              <Link
                href="/contact"
                className="mt-3 inline-flex font-semibold text-[color:var(--foreground)] hover:text-indigo-600 dark:hover:text-indigo-300"
              >
                Reach the editorial desk →
              </Link>
            </div>
            <div className="h-px w-full bg-[color:var(--border)] sm:hidden" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">About the project</p>
              <Link
                href="/about"
                className="mt-3 inline-flex font-semibold text-[color:var(--foreground)] hover:text-indigo-600 dark:hover:text-indigo-300"
              >
                Our principles →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
