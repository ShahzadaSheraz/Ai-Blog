"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/PostCard";
import type { PostSummary } from "@/lib/posts";

export function LatestPostsMore({
  posts,
  initial,
  pageSize,
}: {
  posts: PostSummary[];
  initial: number;
  pageSize: number;
}) {
  const [visible, setVisible] = useState(initial);

  const slice = useMemo(() => posts.slice(0, visible), [posts, visible]);

  const canLoadMore = visible < posts.length;

  return (
    <>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {slice.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          disabled={!canLoadMore}
          onClick={() => setVisible((n) => Math.min(n + pageSize, posts.length))}
          className="inline-flex rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-8 py-3 text-sm font-semibold text-[color:var(--foreground)] shadow-soft transition hover:border-indigo-500/35 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {canLoadMore ? "Load more guides" : "You have reached the end"}
        </button>
      </div>
    </>
  );
}
