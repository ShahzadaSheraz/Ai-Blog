import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { NewsletterBox } from "@/components/NewsletterBox";
import type { PostSummary } from "@/lib/posts";
import { CATEGORY_DEFINITIONS } from "@/lib/categories";

export function BlogSidebar({
  trending,
  currentSlug,
}: {
  trending: PostSummary[];
  currentSlug?: string;
}) {
  const filtered = trending.filter((p) => p.slug !== currentSlug);

  return (
    <aside className="flex flex-col gap-8">
      <section>
        <h2 className="text-[0.65rem] font-bold uppercase tracking-widest text-[color:var(--muted)]">Trending</h2>
        <div className="mt-4 space-y-4">
          {filtered.slice(0, 4).map((p) => (
            <PostCard key={p.slug} post={p} compact />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-[0.65rem] font-bold uppercase tracking-widest text-[color:var(--muted)]">Categories</h2>
        <ul className="mt-4 space-y-2">
          {CATEGORY_DEFINITIONS.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/categories/${c.slug}`}
                className="flex items-center justify-between rounded-xl border border-transparent px-3 py-2 text-sm font-medium text-[color:var(--foreground-muted)] transition hover:border-[color:var(--border)] hover:bg-[color:var(--muted-bg)]"
              >
                {c.label}
                <span aria-hidden className="text-[color:var(--muted)]">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <NewsletterBox id="newsletter" />

      <section className="rounded-2xl border border-dashed border-[color:var(--border)] bg-[color:var(--muted-bg)] p-5 text-center">
        <p className="text-[0.65rem] font-bold uppercase tracking-widest text-[color:var(--muted)]">Partner spot</p>
        <p className="mt-2 text-sm text-[color:var(--foreground-muted)]">
          Drop an affiliate or sponsor module here. Keep disclosures visible to readers.
        </p>
        <div className="mt-4 h-24 rounded-xl bg-[color:var(--card)] shadow-inner" aria-hidden />
      </section>
    </aside>
  );
}
