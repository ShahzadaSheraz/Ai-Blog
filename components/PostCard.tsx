import Link from "next/link";
import type { PostSummary } from "@/lib/posts";

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-indigo-500/40 hover:bg-zinc-900/80">
      <p className="text-xs font-medium uppercase tracking-wide text-indigo-400">
        {post.category}
      </p>
      <h2 className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
        <Link
          href={`/blog/${post.slug}`}
          className="transition group-hover:text-indigo-200"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{post.description}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <span>{post.readingMinutes} min read</span>
      </div>
    </article>
  );
}
