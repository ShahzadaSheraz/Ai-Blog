"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PostSummary } from "@/lib/posts";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function TrendingPostsSection({ posts }: { posts: PostSummary[] }) {
  const trending = posts.slice(0, 3);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
            Trending Now
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-[color:var(--foreground)]">
            What readers are exploring
          </h2>
          <p className="mt-4 text-lg text-[color:var(--muted)]">
            Our most viewed and shared articles this week
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3"
        >
          {trending.map((post, idx) => (
            <motion.div
              key={post.slug}
              variants={itemVariants}
              className="group relative"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-full overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-soft transition hover:border-indigo-500/35 hover:shadow-soft-lg hover:-translate-y-1">
                  {/* Trending badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1.5 text-xs font-bold text-white">
                    <span className="animate-pulse">🔥</span>
                    #{idx + 1}
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <p className="inline-flex rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        {post.category}
                      </p>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-[color:var(--foreground)] line-clamp-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                      {post.title}
                    </h3>

                    <p className="text-sm text-[color:var(--muted)] line-clamp-2">
                      {post.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-[color:var(--border)]">
                      <div className="flex gap-3 text-xs text-[color:var(--muted)]">
                        <span className="flex items-center gap-1">
                          📅 {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          ⏱️ {post.readingMinutes} min
                        </span>
                      </div>
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-1 transition">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 text-white font-semibold shadow-soft-lg hover:opacity-95 transition"
          >
            Explore all articles
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
