"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LoginPrompt } from "@/components/LoginPrompt";

type CommentRow = {
  id: string;
  body: string;
  createdAt: string;
  authorName: string;
};

export function ArticleComments({ slug }: { slug: string }) {
  const { status } = useSession();
  const [items, setItems] = useState<CommentRow[]>([]);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [prompt, setPrompt] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/posts/${slug}/comments`, { cache: "no-store" });
      const json = (await res.json()) as { comments: CommentRow[] };
      setItems(json.comments ?? []);
    } catch {
      setItems([]);
    }
  }, [slug]);

  useEffect(() => {
    void load();
  }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "authenticated") {
      setPrompt(true);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/posts/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: draft }),
      });
      const json = (await res.json()) as { comment?: CommentRow };
      if (res.ok && json.comment) {
        setDraft("");
        setItems((prev) => [json.comment!, ...prev]);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mt-14 border-t border-[color:var(--border)] pt-10">
      <h2 className="text-lg font-semibold text-[color:var(--foreground)]">Discussion</h2>
      <p className="mt-2 text-sm text-[color:var(--muted)]">
        Comments are moderated for spam. Respectful questions and experiences welcome.
      </p>

      {status !== "authenticated" ? (
        <div className="mt-6 rounded-2xl border border-dashed border-[color:var(--border)] bg-[color:var(--muted-bg)] p-6 text-center text-sm text-[color:var(--muted)]">
          Guest readers can browse in full.&nbsp;
          <button type="button" className="font-semibold text-indigo-600 dark:text-indigo-400" onClick={() => setPrompt(true)}>
            Sign in to comment.
          </button>
          {" · "}
          <Link href="/signup" className="font-semibold text-indigo-600 dark:text-indigo-400">
            Create account
          </Link>
        </div>
      ) : null}

      <form onSubmit={submit} className="mt-6 space-y-3">
        <label htmlFor="comment-body" className="sr-only">
          Comment
        </label>
        <textarea
          id="comment-body"
          value={draft}
          disabled={status !== "authenticated"}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={status === "authenticated" ? "Share a takeaway or question…" : "Log in to share a takeaway…"}
          className="min-h-[112px] w-full resize-y rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-4 text-sm text-[color:var(--foreground)] shadow-soft outline-none placeholder:text-[color:var(--muted)] focus:border-indigo-500/35 focus:ring-2 focus:ring-[color:var(--ring)] disabled:opacity-60"
          maxLength={2000}
        />
        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="submit"
            disabled={saving || draft.trim().length < 2 || status !== "authenticated"}
            className="inline-flex rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft-lg hover:opacity-95 disabled:pointer-events-none disabled:opacity-50"
          >
            {saving ? "Posting…" : "Post comment"}
          </button>
        </div>
      </form>

      <ul className="mt-10 space-y-5">
        {items.map((c) => (
          <li key={c.id} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5 shadow-soft">
            <p className="text-sm font-semibold text-[color:var(--foreground)]">{c.authorName}</p>
            <p className="mt-1 text-[0.7rem] uppercase tracking-wide text-[color:var(--muted)]">
              {new Date(c.createdAt).toLocaleString()}
            </p>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[color:var(--foreground-muted)]">{c.body}</p>
          </li>
        ))}
        {items.length === 0 ? (
          <li className="text-sm text-[color:var(--muted)]">No comments yet—start the thread.</li>
        ) : null}
      </ul>

      <LoginPrompt open={prompt} onClose={() => setPrompt(false)} />
    </section>
  );
}
