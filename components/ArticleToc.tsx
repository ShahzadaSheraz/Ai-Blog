"use client";

import type { TocItem } from "@/lib/toc";

export function ArticleToc({
  items,
  className,
}: {
  items: TocItem[];
  className?: string;
}) {
  if (!items.length) return null;

  return (
    <nav aria-label="On this page" className={`text-sm ${className ?? ""}`}>
      <p className="text-[0.65rem] font-bold uppercase tracking-widest text-[color:var(--muted)]">On this page</p>
      <ul className="mt-4 space-y-2 border-l border-[color:var(--border)] pl-4">
        {items.map((item) => (
          <li key={`${item.id}-${item.level}`} style={{ marginLeft: item.level === 3 ? "0.5rem" : 0 }}>
            <a href={`#${item.id}`} className="block rounded-md py-0.5 font-medium text-[color:var(--foreground-muted)] transition hover:text-indigo-600 dark:hover:text-indigo-300">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
