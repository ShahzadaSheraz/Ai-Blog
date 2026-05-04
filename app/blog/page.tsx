import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { categories, getPostsByCategory } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Browse SEO-optimized guides on AI tools for students, beginners, and online earning—with categories and internal deep links.",
};

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const { category: raw } = await searchParams;
  const decoded = raw ? decodeURIComponent(raw) : undefined;
  const active =
    decoded && (categories as readonly string[]).includes(decoded) ? decoded : "All";
  const posts = getPostsByCategory(active === "All" ? undefined : active);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Blog</h1>
        <p className="mt-4 text-zinc-400">
          Actionable articles on AI-assisted learning, beginner workflows, and ethical online income
          strategies. Use categories to filter, then follow internal links inside each guide for
          deeper context.
        </p>
      </header>

      <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Categories">
        {categories.map((cat) => {
          const href = cat === "All" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`;
          const isActive = active === cat;
          return (
            <Link
              key={cat}
              href={href}
              scroll={false}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                isActive
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                  : "border border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:border-zinc-600 hover:text-white"
              }`}
            >
              {cat}
            </Link>
          );
        })}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="mt-12 text-sm text-zinc-500">No posts in this category yet.</p>
      )}
    </div>
  );
}
