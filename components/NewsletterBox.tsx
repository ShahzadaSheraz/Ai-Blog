"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function NewsletterBox({ id }: { id?: string }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <motion.div
      id={id}
      layout
      className="rounded-2xl border border-[color:var(--border)] bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-violet-600/10 p-5 shadow-soft"
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-widest text-[color:var(--muted)]">Newsletter</p>
      <h3 className="mt-2 text-base font-semibold text-[color:var(--foreground)]">Stay ahead of the curve</h3>
      <p className="mt-2 text-xs leading-relaxed text-[color:var(--muted)]">
        One thoughtful email per week—new guides, tool notes, and responsible AI workflows.
      </p>
      {sent ? (
        <p className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">Thanks! This demo UI recorded your interest.</p>
      ) : (
        <form
          className="mt-4 flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (email.includes("@")) setSent(true);
          }}
        >
          <label htmlFor="nl-email" className="sr-only">
            Email
          </label>
          <input
            id="nl-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@school.edu"
            className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] px-3 text-sm text-[color:var(--foreground)] outline-none focus:border-indigo-500/45 focus:ring-2 focus:ring-[color:var(--ring)]"
          />
          <button
            type="submit"
            className="h-11 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 text-sm font-semibold text-white shadow-soft-lg hover:opacity-95"
          >
            Subscribe
          </button>
        </form>
      )}
      <p className="mt-3 text-[0.65rem] text-[color:var(--muted)]">No spam. Unsubscribe any time.</p>
    </motion.div>
  );
}
