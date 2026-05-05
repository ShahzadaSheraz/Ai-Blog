import Link from "next/link";
import { categorySlugFromLabel } from "@/lib/categories";

export function ArticleShortcuts({
  tags,
  categoryLabel,
}: {
  tags: string[];
  categoryLabel: string;
}) {
  const catSlug = categorySlugFromLabel(categoryLabel);

  return (
    <div className="space-y-5 text-sm">
      <div>
        <p className="text-[0.65rem] font-bold uppercase tracking-widest text-[color:var(--muted)]">Category</p>
        {catSlug ? (
          <Link
            href={`/categories/${catSlug}`}
            className="mt-3 inline-flex rounded-xl bg-[color:var(--muted-bg)] px-3 py-2 font-semibold text-[color:var(--foreground-muted)] hover:text-indigo-600 dark:hover:text-indigo-300"
          >
            {categoryLabel}
          </Link>
        ) : (
          <p className="mt-3 font-medium text-[color:var(--foreground-muted)]">{categoryLabel}</p>
        )}
      </div>

      {(tags?.length ?? 0) > 0 ? (
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-widest text-[color:var(--muted)]">Topics</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-2.5 py-1 text-xs font-medium text-[color:var(--muted)] shadow-soft"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <p className="text-[0.65rem] font-bold uppercase tracking-widest text-[color:var(--muted)]">Shortcuts</p>
        <ul className="mt-3 space-y-2 text-[color:var(--foreground-muted)]">
          <li>
            <Link href="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-300">
              ← Back to archive
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-300">
              Suggest edits
            </Link>
          </li>
          <li>
            <Link href="/login" className="hover:text-indigo-600 dark:hover:text-indigo-300">
              Sign in for saves
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
