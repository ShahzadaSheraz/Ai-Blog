"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PostSummary } from "@/lib/posts";

interface RecommendationsProps {
  currentPostTags: string[];
  allPosts: PostSummary[];
  currentSlug: string;
  limit?: number;
}

export function SmartRecommendations({
  currentPostTags,
  allPosts,
  currentSlug,
  limit = 4,
}: RecommendationsProps) {
  // Score posts based on tag overlap and category
  const scoredPosts = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((post) => {
      const tagOverlap = post.tags.filter((t) => currentPostTags.includes(t)).length;
      const recency = new Date(post.date).getTime();
      const score = tagOverlap * 100 + recency / 1000000;
      return { post, score, tagOverlap };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (scoredPosts.length === 0) return null;

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-[color:var(--foreground)]">
          Smart Recommendations
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Based on your interests in {currentPostTags.slice(0, 2).join(", ")}
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-2"
      >
        {scoredPosts.map(({ post, tagOverlap }) => (
          <motion.div key={post.slug} variants={itemVariants}>
            <Link href={`/blog/${post.slug}`}>
              <div className="group relative h-full overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-soft transition hover:border-indigo-500/35 hover:shadow-soft-lg hover:-translate-y-1">
                {/* Match indicator */}
                {tagOverlap > 0 && (
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-semibold text-green-600 dark:text-green-400">
                    <span>✓</span>
                    <span>{tagOverlap} match{tagOverlap !== 1 ? "es" : ""}</span>
                  </div>
                )}

                {/* Content */}
                <div className="space-y-3">
                  <div className="inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {post.category}
                  </div>

                  <h3 className="text-lg font-bold text-[color:var(--foreground)] line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                    {post.title}
                  </h3>

                  <p className="text-sm text-[color:var(--muted)] line-clamp-2">
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags
                      .filter((t) => currentPostTags.includes(t))
                      .slice(0, 2)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="inline-block rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                        >
                          #{tag}
                        </span>
                      ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[color:var(--border)] text-xs text-[color:var(--muted)]">
                    <span>{post.readingMinutes} min read</span>
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
    </section>
  );
}
