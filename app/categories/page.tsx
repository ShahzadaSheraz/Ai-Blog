import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORY_DEFINITIONS } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse every canonical topic lane—AI & ML through tech news—with descriptions and curated entry points.",
};

export default function CategoriesIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl">Categories</h1>
        <p className="mt-5 text-[color:var(--muted)]">
          Each lane keeps long-form tutorials aligned around the same mastery outcomes. Pick one, then glide into adjacent
          tags while you explore the archive.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORY_DEFINITIONS.map((c) => (
          <article
            key={c.slug}
            className="flex h-full flex-col rounded-[1rem] border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-soft transition hover:border-indigo-500/35 hover:shadow-soft-lg"
          >
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Focus area
            </p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--foreground)]">{c.label}</h2>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-[color:var(--muted)]">{c.description}</p>
            <Link
              href={`/categories/${c.slug}`}
              className="mt-8 inline-flex text-sm font-semibold text-[color:var(--foreground-muted)] hover:text-indigo-600 dark:hover:text-indigo-300"
            >
              Browse posts →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
