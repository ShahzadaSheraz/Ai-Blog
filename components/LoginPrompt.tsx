"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export function LoginPrompt({
  open,
  onClose,
  reason,
}: {
  open: boolean;
  onClose: () => void;
  reason?: string;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal
            aria-labelledby="login-prompt-title"
            className="fixed left-1/2 top-1/2 z-[110] w-[min(calc(100vw-2rem),22rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-soft-lg"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <h2 id="login-prompt-title" className="text-lg font-semibold text-[color:var(--foreground)]">
              Save your progress
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
              {reason ?? "Create a free account to comment, like, and bookmark posts."}
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link
                href="/login"
                className="inline-flex justify-center rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft-lg hover:opacity-95"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="inline-flex justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--muted-bg)] px-4 py-2.5 text-sm font-semibold text-[color:var(--foreground)] hover:bg-[color:var(--card)]"
              >
                Create account
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="mt-1 text-center text-xs font-semibold text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
              >
                Continue as guest
              </button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
