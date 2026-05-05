"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { PostSummary } from "@/lib/posts";

type LitePost = Pick<PostSummary, "slug" | "title" | "category" | "tags">;

export function SiteSearch({
  placeholder = "Search articles…",
  className,
  litePosts,
}: {
  placeholder?: string;
  className?: string;
  litePosts?: LitePost[];
}) {
  const [q, setQ] = useState("");
  /** `null` = not hydrated from props or fetch yet during client-only mounts */
  const [store, setStore] = useState<LitePost[] | null>(() => litePosts ?? null);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (litePosts) setStore(litePosts);
  }, [litePosts]);

  useEffect(() => {
    if (store !== null || litePosts) return;
    void (async () => {
      try {
        const res = await fetch("/api/posts");
        const json = (await res.json()) as { posts: LitePost[] };
        setStore(json.posts ?? []);
      } catch {
        setStore([]);
      }
    })();
  }, [store, litePosts]);

  const source = useMemo(() => store ?? litePosts ?? [], [litePosts, store]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    return source.filter((p) =>
      `${p.title} ${p.category} ${(p.tags ?? []).join(" ")}`.toLowerCase().includes(term),
    );
  }, [q, source]);

  const onNavigate = useCallback(() => {
    setQ("");
    setOpen(false);
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className={`relative ${className ?? ""}`} ref={root}>
      <label className="sr-only" htmlFor="site-search-input">
        Search
      </label>
      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[color:var(--muted)]">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-3.8-3.8" strokeLinecap="round" />
        </svg>
      </div>
      <input
        id="site-search-input"
        value={q}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        placeholder={placeholder}
        className="h-11 w-full min-w-[12rem] max-w-md rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] py-2.5 pl-10 pr-4 text-sm text-[color:var(--foreground)] shadow-soft placeholder:text-[color:var(--muted)] outline-none ring-1 ring-transparent transition focus:border-indigo-500/40 focus:ring-[color:var(--ring)]"
        autoComplete="off"
      />
      {open && results.length ? (
        <ul
          role="listbox"
          className="absolute left-0 right-0 z-70 mt-2 max-h-[min(20rem,calc(100vh-12rem))] overflow-auto rounded-[1rem] border border-[color:var(--border)] bg-[color:var(--card)] shadow-soft-lg"
        >
          {results.slice(0, 10).map((p) => (
            <li key={p.slug} role="option" aria-selected="false">
              <Link
                href={`/blog/${p.slug}`}
                className="block border-b border-[color:var(--border)] px-4 py-3 last:border-none hover:bg-[color:var(--muted-bg)]"
                onMouseDown={(e) => e.preventDefault()}
                onClick={onNavigate}
              >
                <p className="text-sm font-medium text-[color:var(--foreground)]">{p.title}</p>
                <p className="mt-0.5 text-xs text-[color:var(--muted)]">{p.category}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
