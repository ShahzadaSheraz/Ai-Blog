"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export type UiNotification = {
  id: string;
  title: string;
  body: string;
  href?: string;
  kind: "article" | "trending" | "digest" | "system";
  timestamp?: string;
  read?: boolean;
};

const demo: UiNotification[] = [
  {
    id: "1",
    kind: "article",
    title: "New tutorial published",
    body: "AI coding assistants guide was refreshed with 2026 tool notes.",
    href: "/blog/ai-coding-assistants-for-self-taught-learners",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    kind: "trending",
    title: "Trending across readers",
    body: "Students are revisiting ethical exam prep and AI study stacks this week.",
    href: "/blog/ethical-exam-prep-with-ai-support",
    timestamp: "4 hours ago",
    read: false,
  },
  {
    id: "3",
    kind: "digest",
    title: "Weekly digest",
    body: "You will see personalized digests here once subscribed to the newsletter.",
    href: "/#newsletter",
    timestamp: "1 day ago",
    read: true,
  },
];

const notificationColors: Record<string, { icon: string; bgLight: string; bgDark: string }> = {
  article: {
    icon: "📝",
    bgLight: "bg-blue-500/10",
    bgDark: "dark:bg-blue-500/10",
  },
  trending: {
    icon: "🔥",
    bgLight: "bg-orange-500/10",
    bgDark: "dark:bg-orange-500/10",
  },
  digest: {
    icon: "📬",
    bgLight: "bg-purple-500/10",
    bgDark: "dark:bg-purple-500/10",
  },
  system: {
    icon: "⚙️",
    bgLight: "bg-gray-500/10",
    bgDark: "dark:bg-gray-500/10",
  },
};

export function NotificationsMenu({ seedItems }: { seedItems?: UiNotification[] }) {
  const items = seedItems ?? demo;
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<UiNotification[]>(items);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const unread = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClear = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const colors = (kind: string) => notificationColors[kind] || notificationColors.system;

  return (
    <div className="relative" ref={ref}>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-soft text-[color:var(--foreground)] transition hover:bg-[color:var(--muted-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--ring)]"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Notifications"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M14 21a2 2 0 01-4 0M18 10a6 6 0 10-12 0c0 7-4 9-4 9h16s-4-2-4-9z" />
        </svg>
        <AnimatePresence>
          {unread > 0 ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-rose-500 px-1 text-[0.625rem] font-bold text-white ring-2 ring-[color:var(--background)]"
            >
              {Math.min(unread, 9)}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute right-0 z-50 mt-2 w-[min(calc(100vw-2rem),24rem)] origin-top-right rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-soft-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[color:var(--border)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">
                Notifications
              </p>
              <div className="flex gap-2">
                {unread > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
                  >
                    Mark all read
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            {notifications.length > 0 ? (
              <ul className="max-h-[min(32rem,calc(100vh-12rem))] space-y-0 overflow-y-auto divide-y divide-[color:var(--border)]">
                {notifications.map((n, idx) => {
                  const color = colors(n.kind);
                  return (
                    <motion.li
                      key={n.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      {n.href ? (
                        <Link
                          href={n.href}
                          onClick={() => {
                            handleMarkAsRead(n.id);
                            setOpen(false);
                          }}
                          className={`block p-4 transition ${
                            n.read
                              ? "hover:bg-[color:var(--muted-bg)]"
                              : "bg-indigo-500/5 hover:bg-indigo-500/10 dark:bg-indigo-500/5"
                          }`}
                        >
                          <div className="flex gap-3">
                            <div
                              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-lg ${color.bgLight} ${color.bgDark}`}
                            >
                              {color.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                                  {n.title}
                                  {!n.read && (
                                    <span className="ml-2 inline-block h-2 w-2 rounded-full bg-indigo-600"></span>
                                  )}
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleClear(n.id);
                                  }}
                                  className="text-[color:var(--muted)] hover:text-[color:var(--foreground-muted)] transition"
                                  aria-label="Dismiss"
                                >
                                  ×
                                </button>
                              </div>
                              <p className="mt-1 text-xs leading-relaxed text-[color:var(--muted)]">
                                {n.body}
                              </p>
                              {n.timestamp && (
                                <p className="mt-2 text-[0.7rem] text-[color:var(--muted)]">
                                  {n.timestamp}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div
                          className={`block p-4 transition ${
                            n.read
                              ? ""
                              : "bg-indigo-500/5 dark:bg-indigo-500/5"
                          }`}
                        >
                          <div className="flex gap-3">
                            <div
                              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-lg ${color.bgLight} ${color.bgDark}`}
                            >
                              {color.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-semibold text-[color:var(--foreground)]">
                                  {n.title}
                                  {!n.read && (
                                    <span className="ml-2 inline-block h-2 w-2 rounded-full bg-indigo-600"></span>
                                  )}
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleClear(n.id);
                                  }}
                                  className="text-[color:var(--muted)] hover:text-[color:var(--foreground-muted)] transition"
                                  aria-label="Dismiss"
                                >
                                  ×
                                </button>
                              </div>
                              <p className="mt-1 text-xs leading-relaxed text-[color:var(--muted)]">
                                {n.body}
                              </p>
                              {n.timestamp && (
                                <p className="mt-2 text-[0.7rem] text-[color:var(--muted)]">
                                  {n.timestamp}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            ) : (
              <div className="px-4 py-12 text-center">
                <p className="text-sm text-[color:var(--muted)]">
                  No notifications yet
                </p>
                <p className="mt-1 text-xs text-[color:var(--muted)]">
                  You’re logged in
                </p>
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
