"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { LoginPrompt } from "@/components/LoginPrompt";

interface UserInteractionState {
  liked: boolean;
  bookmarked: boolean;
  likeCount: number;
  bookmarkCount: number;
}

export function PostInteractions({ slug, title }: { slug: string; title: string }) {
  const { status } = useSession();
  const [state, setState] = useState<UserInteractionState>({
    liked: false,
    bookmarked: false,
    likeCount: 0,
    bookmarkCount: 0,
  });
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [loading, setLoading] = useState<"like" | "bookmark" | null>(null);

  // Load initial state
  useEffect(() => {
    const loadState = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}/interactions`);
        if (response.ok) {
          const data = (await response.json()) as UserInteractionState;
          setState(data);
        }
      } catch (error) {
        console.error("Failed to load interactions:", error);
      }
    };

    loadState();
  }, [slug]);

  const requireAuth = useCallback(() => {
    if (status !== "authenticated") {
      setShowLoginPrompt(true);
      return false;
    }
    return true;
  }, [status]);

  const handleLike = useCallback(async () => {
    if (!requireAuth()) return;

    setLoading("like");
    try {
      const response = await fetch(`/api/posts/${slug}/like`, {
        method: state.liked ? "DELETE" : "POST",
      });

      if (response.ok) {
        setState((prev) => ({
          ...prev,
          liked: !prev.liked,
          likeCount: prev.liked ? prev.likeCount - 1 : prev.likeCount + 1,
        }));
      }
    } catch (error) {
      console.error("Failed to update like:", error);
    } finally {
      setLoading(null);
    }
  }, [slug, state.liked, requireAuth]);

  const handleBookmark = useCallback(async () => {
    if (!requireAuth()) return;

    setLoading("bookmark");
    try {
      const response = await fetch(`/api/posts/${slug}/bookmark`, {
        method: state.bookmarked ? "DELETE" : "POST",
      });

      if (response.ok) {
        setState((prev) => ({
          ...prev,
          bookmarked: !prev.bookmarked,
          bookmarkCount: prev.bookmarked ? prev.bookmarkCount - 1 : prev.bookmarkCount + 1,
        }));
      }
    } catch (error) {
      console.error("Failed to update bookmark:", error);
    } finally {
      setLoading(null);
    }
  }, [slug, state.bookmarked, requireAuth]);

  return (
    <>
      <div className="flex flex-wrap gap-4 items-center">
        {/* Like button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLike}
          disabled={loading === "like"}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border transition ${
            state.liked
              ? "bg-rose-500/10 border-rose-500/35 text-rose-600 dark:text-rose-400"
              : "border-[color:var(--border)] text-[color:var(--foreground-muted)] hover:border-rose-500/35 hover:text-rose-600 dark:hover:text-rose-400"
          }`}
        >
          <motion.span
            key={state.liked ? "liked" : "unliked"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-lg"
          >
            {state.liked ? "❤️" : "🤍"}
          </motion.span>
          <span className="text-sm font-semibold">{state.likeCount}</span>
        </motion.button>

        {/* Bookmark button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBookmark}
          disabled={loading === "bookmark"}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border transition ${
            state.bookmarked
              ? "bg-indigo-500/10 border-indigo-500/35 text-indigo-600 dark:text-indigo-400"
              : "border-[color:var(--border)] text-[color:var(--foreground-muted)] hover:border-indigo-500/35 hover:text-indigo-600 dark:hover:text-indigo-400"
          }`}
        >
          <motion.span
            key={state.bookmarked ? "bookmarked" : "unbookmarked"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-lg"
          >
            {state.bookmarked ? "📌" : "📍"}
          </motion.span>
          <span className="text-sm font-semibold">{state.bookmarkCount}</span>
        </motion.button>
      </div>

      <LoginPrompt open={showLoginPrompt} onClose={() => setShowLoginPrompt(false)} />
    </>
  );
}
