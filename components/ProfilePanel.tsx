"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export function ProfilePanel({
  bookmarks,
  likes,
  comments,
}: {
  bookmarks: number;
  likes: number;
  comments: number;
}) {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name ?? "");

  useEffect(() => {
    setName(session?.user?.name ?? "");
  }, [session?.user?.name]);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  if (!session?.user) return null;

  const saveName = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNotice(null);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        setNotice("Could not save name.");
        setSaving(false);
        return;
      }
      await update({ name });
      setNotice("Saved.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="rounded-[1rem] border border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-soft-lg">
        <h2 className="text-lg font-semibold text-[color:var(--foreground)]">Account</h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">{session.user.email}</p>
        <form onSubmit={saveName} className="mt-6 space-y-4">
          <div>
            <label htmlFor="display-name" className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">
              Display name
            </label>
            <input
              id="display-name"
              value={name ?? ""}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 h-12 w-full max-w-lg rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] px-4 text-sm text-[color:var(--foreground)] outline-none focus:border-indigo-500/35 focus:ring-2 focus:ring-[color:var(--ring)]"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft-lg hover:opacity-95 disabled:pointer-events-none disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save name"}
            </button>
            {notice ? <span className="self-center text-sm text-emerald-600 dark:text-emerald-400">{notice}</span> : null}
          </div>
        </form>
      </div>

      <div className="rounded-[1rem] border border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-soft">
        <h2 className="text-lg font-semibold text-[color:var(--foreground)]">Reading activity</h2>
        <dl className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted-bg)] px-5 py-4">
            <dt className="text-xs uppercase tracking-[0.12em] text-[color:var(--muted)]">Bookmarks</dt>
            <dd className="mt-2 text-3xl font-bold tabular-nums text-[color:var(--foreground)]">{bookmarks}</dd>
          </div>
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted-bg)] px-5 py-4">
            <dt className="text-xs uppercase tracking-[0.12em] text-[color:var(--muted)]">Likes given</dt>
            <dd className="mt-2 text-3xl font-bold tabular-nums text-[color:var(--foreground)]">{likes}</dd>
          </div>
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--muted-bg)] px-5 py-4">
            <dt className="text-xs uppercase tracking-[0.12em] text-[color:var(--muted)]">Comments</dt>
            <dd className="mt-2 text-3xl font-bold tabular-nums text-[color:var(--foreground)]">{comments}</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/dashboard"
          className="inline-flex rounded-xl border border-[color:var(--border)] bg-[color:var(--muted-bg)] px-5 py-2.5 text-sm font-semibold text-[color:var(--foreground)] hover:border-indigo-500/35"
        >
          Open dashboard
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="inline-flex rounded-xl border border-[color:var(--border)] px-5 py-2.5 text-sm font-semibold text-[color:var(--foreground-muted)] hover:bg-[color:var(--muted-bg)]"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
