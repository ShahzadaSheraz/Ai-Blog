"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PostSummary } from "@/lib/posts";

interface PostAnalyticsProps {
  posts: PostSummary[];
}

export function PostAnalytics({ posts }: PostAnalyticsProps) {
  // Sort by reading minutes (proxy for engagement/value)
  const topPosts = posts.sort((a, b) => b.readingMinutes - a.readingMinutes).slice(0, 5);

  // Calculate category distribution
  const categoryDistribution = posts.reduce(
    (acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Calculate total words and average
  const totalWords = posts.reduce((acc, post) => acc + (post.readingMinutes * 200), 0);
  const averageWords = Math.round(totalWords / posts.length);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="space-y-12">
      {/* Overview stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-3"
      >
        <motion.div variants={itemVariants} className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--muted)]">
            Total Articles
          </p>
          <p className="mt-3 text-4xl font-bold text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text">
            {posts.length}
          </p>
          <p className="mt-2 text-xs text-[color:var(--muted)]">
            Across all categories
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--muted)]">
            Avg. Reading Time
          </p>
          <p className="mt-3 text-4xl font-bold text-transparent bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text">
            {Math.round(posts.reduce((acc, p) => acc + p.readingMinutes, 0) / posts.length)} min
          </p>
          <p className="mt-2 text-xs text-[color:var(--muted)]">
            Per article
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--muted)]">
            Total Content
          </p>
          <p className="mt-3 text-4xl font-bold text-transparent bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text">
            {Math.round(totalWords / 1000)}k
          </p>
          <p className="mt-2 text-xs text-[color:var(--muted)]">
            Words published
          </p>
        </motion.div>
      </motion.div>

      {/* Category breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-soft"
      >
        <h3 className="text-lg font-bold text-[color:var(--foreground)] mb-6">
          Content by Category
        </h3>
        <div className="space-y-4">
          {Object.entries(categoryDistribution)
            .sort((a, b) => b[1] - a[1])
            .map(([category, count]) => (
              <div key={category} className="flex items-center gap-4">
                <div className="min-w-[150px] text-sm font-medium text-[color:var(--foreground)]">
                  {category}
                </div>
                <div className="flex-1 h-2 rounded-full bg-[color:var(--muted-bg)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(count / posts.length) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
                  />
                </div>
                <div className="min-w-[40px] text-right text-sm font-semibold text-[color:var(--muted)]">
                  {count}
                </div>
              </div>
            ))}
        </div>
      </motion.div>

      {/* Top posts by length */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-soft"
      >
        <h3 className="text-lg font-bold text-[color:var(--foreground)] mb-6">
          Longest Articles
        </h3>
        <div className="space-y-3">
          {topPosts.map((post, idx) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-[color:var(--border)] hover:bg-[color:var(--muted-bg)] transition group"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[color:var(--muted)]">#{idx + 1}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[color:var(--foreground)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                      {post.title}
                    </p>
                    <p className="text-xs text-[color:var(--muted)]">{post.category}</p>
                  </div>
                </div>
              </div>
              <div className="ml-4 text-right flex-shrink-0">
                <p className="text-sm font-bold text-[color:var(--foreground)]">
                  {post.readingMinutes} min
                </p>
                <p className="text-xs text-[color:var(--muted)]">
                  {Math.round(post.readingMinutes * 200)} words
                </p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
