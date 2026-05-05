"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export type UiNotification = {
  id: string;
  title: string;
  body: string;
  href?: string;
  kind: "article" | "trending" | "digest";
};

const demo: UiNotification[] = [
  {
    id: "1",
    kind: "article",
    title: "New tutorial published",
    body: "AI coding assistants guide was refreshed with 2026 tool notes.",
    href: "/blog/ai-coding-assistants-for-self-taught-learners",
  },
  {
    id: "2",
    kind: "trending",
    title: "Trending across readers",
    body: "Students are revisiting ethical exam prep and AI study stacks this week.",
    href: "/blog/ethical-exam-prep-with-ai-support",
  },
  {
    id: "3",
    kind: "digest",
    title: "Weekly digest",
    body: "You will see personalized digests here once subscribed to the newsletter.",
    href: "/#newsletter",
  },
];

export function NotificationsMenu({ seedItems }: { seedItems?: UiNotification[] }) {
  const items = seedItems ?? demo;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const unread = items.length;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-soft text-[color:var(--foreground)] transition hover:bg-[color:var(--muted-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--ring)]"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Notifications"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M14 21a2 2 0 01-4 0M18 10a6 6 0 10-12 0c0 7-4 9-4 9h16s-4-2-4-9z" />
        </svg>
        {unread > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-rose-500 px-1 text-[0.625rem] font-bold text-white ring-2 ring-[color:var(--background)]">
            {Math.min(unread, 9)}
          </span>
        ) : null}
      </button>
      {open ? (
        <div className="absolute right-0 z-60 mt-2 w-[min(calc(100vw-2rem),20rem)] origin-top-right rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-3 shadow-soft-lg">
          <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">
            Notifications
          </p>
          <ul className="max-h-[min(24rem,calc(100vh-12rem))] space-y-1 overflow-y-auto">
            {items.map((n) => (
              <li key={n.id}>
                {n.href ? (
                  <Link
                    href={n.href}
                    className="block rounded-xl px-2 py-2.5 hover:bg-[color:var(--muted-bg)] focus-visible:bg-[color:var(--muted-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--ring)]"
                    onClick={() => setOpen(false)}
                  >
                    <p className="text-sm font-semibold text-[color:var(--foreground)]">{n.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[color:var(--muted)]">{n.body}</p>
                  </Link>
                ) : (
                  <div className="rounded-xl px-2 py-2.5">
                    <p className="text-sm font-semibold text-[color:var(--foreground)]">{n.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[color:var(--muted)]">{n.body}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
