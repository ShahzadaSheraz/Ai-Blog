import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { categories, filterPostsByCategoryAndQuery, paginateSummaries } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "SEO-friendly archive of guides on AI, data, programming, study systems, productivity, and ethics—filter by category.",
};

function buildHref(opts: {
  category?: string;
  q?: string;
  page?: number;
}) {
  const sp = new URLSearchParams();
  if (opts.category && opts.category !== "All") sp.set("category", opts.category);
  if (opts.q?.trim()) sp.set("q", opts.q.trim());
  if (opts.page && opts.page > 1) sp.set("page", String(opts.page));
  const s = sp.toString();
  return s ? `/blog?${s}` : "/blog";
}

type Props = {
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
};

const PAGE_SIZE = 9;

export default async function BlogPage({ searchParams }: Props) {
  const raw = await searchParams;
  const decodedCat = raw.category ? decodeURIComponent(raw.category) : undefined;
  const active =
    decodedCat && (categories as readonly string[]).includes(decodedCat) ? decodedCat : "All";
  const q = typeof raw.q === "string" ? raw.q : undefined;
  const pageNum = Math.max(1, Number.parseInt(raw.page ?? "1", 10) || 1);

  const filtered = filterPostsByCategoryAndQuery(active === "All" ? undefined : active, q);
  const { items, page, totalPages, hasMore } = paginateSummaries(filtered, pageNum, PAGE_SIZE);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-14">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl">Blog</h1>
        <p className="mt-4 text-[color:var(--muted)]">
          Structured archive with category filters and instant substring search backed by curated markdown content.
          Guests can read everything; richer interactions unlock when you authenticate.
        </p>
      </header>

      <form className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end" action="/blog" method="get" role="search">
        <div className="flex-1">
          <label htmlFor="blog-search" className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">
            Search guides
          </label>
          <input
            id="blog-search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Prompt engineering, tutoring, gigs…"
            className="mt-2 h-12 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 text-sm text-[color:var(--foreground)] shadow-soft outline-none focus:border-indigo-500/35 focus:ring-2 focus:ring-[color:var(--ring)]"
          />
        </div>
        <button
          type="submit"
          className="h-12 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 px-6 text-sm font-semibold text-white shadow-soft-lg"
        >
          Search
        </button>
      </form>
      <p className="mt-6 text-[0.7rem] text-[color:var(--muted)]">
        Tip: the header exposes the same catalogue for quick jumps while you browse other pages.
      </p>

      <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Categories">
        {categories.map((cat) => {
          const href = buildHref({ category: cat === "All" ? undefined : cat, q });
          const isActive = active === cat;
          return (
            <Link
              key={cat}
              href={href}
              scroll={false}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                isActive
                  ? "bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 text-white shadow-soft-lg shadow-indigo-600/35"
                  : "border border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--foreground-muted)] hover:border-indigo-500/35"
              }`}
            >
              {cat}
            </Link>
          );
        })}
      </div>

      <p className="mt-10 text-xs text-[color:var(--muted)]">
        {filtered.length === 0
          ? "No guides to show yet."
          : `Showing ${(page - 1) * PAGE_SIZE + 1}–${(page - 1) * PAGE_SIZE + items.length} of ${filtered.length} guides`}
      </p>

      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {items.length === 0 ? (
        <p className="mt-12 text-sm text-[color:var(--muted)]">No posts matched these filters.</p>
      ) : null}

      <nav className="mt-14 flex flex-wrap items-center justify-center gap-3" aria-label="Pagination">
        {page > 1 ? (
          <Link
            href={buildHref({ category: active === "All" ? undefined : active, q, page: page - 1 })}
            className="rounded-full border border-[color:var(--border)] px-5 py-2 text-sm font-semibold text-[color:var(--foreground)] hover:bg-[color:var(--muted-bg)]"
          >
            ← Previous
          </Link>
        ) : (
          <span className="rounded-full px-5 py-2 text-sm font-semibold text-[color:var(--muted)]">← Previous</span>
        )}
        <span className="text-sm text-[color:var(--muted)]">
          Page {page} / {totalPages}
        </span>
        {hasMore ? (
          <Link
            href={buildHref({ category: active === "All" ? undefined : active, q, page: page + 1 })}
            className="rounded-full border border-[color:var(--border)] px-5 py-2 text-sm font-semibold text-[color:var(--foreground)] hover:bg-[color:var(--muted-bg)]"
          >
            Next →
          </Link>
        ) : (
          <span className="rounded-full px-5 py-2 text-sm font-semibold text-[color:var(--muted)]">Next →</span>
        )}
      </nav>
    </div>
  );
}
