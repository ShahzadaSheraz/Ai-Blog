"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { LoginPrompt } from "@/components/LoginPrompt";

export function PostEngagement({ slug, title }: { slug: string; title: string }) {
  const { status } = useSession();
  const [likes, setLikes] = useState(0);
  const [bookmarks, setBookmarks] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const [cRes, mRes] = await Promise.all([
        fetch(`/api/posts/${slug}/counts`, { cache: "no-store" }),
        fetch(`/api/posts/${slug}/me`, { cache: "no-store" }),
      ]);
      const counts = (await cRes.json()) as { likes: number; bookmarks: number };
      const me = (await mRes.json()) as { liked: boolean; bookmarked: boolean };
      setLikes(counts.likes ?? 0);
      setBookmarks(counts.bookmarks ?? 0);
      if (status === "authenticated") {
        setLiked(me.liked);
        setBookmarked(me.bookmarked);
      } else {
        setLiked(false);
        setBookmarked(false);
      }
    } catch {
      /* ignore */
    }
  }, [slug, status]);

  useEffect(() => {
    void load();
  }, [load]);

  const requireAuth = () => {
    if (status !== "authenticated") {
      setPrompt(true);
      return false;
    }
    return true;
  };

  const toggleLike = async () => {
    if (!requireAuth()) return;
    setBusy("like");
    try {
      const method = liked ? "DELETE" : "POST";
      const res = await fetch(`/api/posts/${slug}/like`, { method });
      const json = (await res.json()) as { likes?: number };
      if (res.ok) {
        setLiked(!liked);
        if (typeof json.likes === "number") setLikes(json.likes);
      }
    } finally {
      setBusy(null);
    }
  };

  const toggleBookmark = async () => {
    if (!requireAuth()) return;
    setBusy("bm");
    try {
      const method = bookmarked ? "DELETE" : "POST";
      const res = await fetch(`/api/posts/${slug}/bookmark`, { method });
      const json = (await res.json()) as { bookmarks?: number };
      if (res.ok) {
        setBookmarked(!bookmarked);
        if (typeof json.bookmarks === "number") setBookmarks(json.bookmarks);
      }
    } finally {
      setBusy(null);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(title);
  const shareLink = encodeURIComponent(shareUrl);

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[color:var(--border)] pt-8">
      <button
        type="button"
        onClick={toggleLike}
        disabled={busy === "like"}
        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
          liked
            ? "border-rose-500/50 bg-rose-500/10 text-rose-700 dark:text-rose-300"
            : "border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--foreground)] hover:bg-[color:var(--muted-bg)]"
        }`}
      >
        <span aria-hidden>♥</span>
        {liked ? "Liked" : "Like"} <span className="text-xs font-medium text-[color:var(--muted)]">({likes})</span>
      </button>
      <button
        type="button"
        onClick={toggleBookmark}
        disabled={busy === "bm"}
        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
          bookmarked
            ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-800 dark:text-indigo-200"
            : "border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--foreground)] hover:bg-[color:var(--muted-bg)]"
        }`}
      >
        <span aria-hidden>⌕</span>
        {bookmarked ? "Saved" : "Bookmark"} <span className="text-xs font-medium text-[color:var(--muted)]">({bookmarks})</span>
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareLink}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-2 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--muted-bg)]"
      >
        Share on X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareLink}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-2 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--muted-bg)]"
      >
        LinkedIn
      </a>

      <LoginPrompt open={prompt} onClose={() => setPrompt(false)} />
    </div>
  );
}
