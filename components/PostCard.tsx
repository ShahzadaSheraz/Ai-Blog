"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PostSummary } from "@/lib/posts";
import { RemoteImage } from "@/components/RemoteImage";

const FALLBACK_IMG = "/fallback-cover.svg";

export function PostCard({ post, compact }: { post: PostSummary; compact?: boolean }) {
  const cover = post.coverImage ?? FALLBACK_IMG;
  const alt = `Cover image for ${post.title}`;

  if (compact) {
    return (
      <motion.article
        className="group flex overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-soft transition"
        whileHover={{
          scale: 1.02,
          y: -4,
          boxShadow: "var(--shadow-soft-lg)",
          borderColor: "rgb(129, 140, 248, 0.35)",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="relative min-h-[6.75rem] w-[9.5rem] shrink-0 overflow-hidden sm:min-h-[8rem] sm:w-44">
          <Link href={`/blog/${post.slug}`}>
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
              className="relative h-full w-full"
            >
              <RemoteImage
                src={cover}
                alt={alt}
                fill
                sizes="176px"
                className="object-cover"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </motion.div>
          </Link>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
          <motion.p
            className="text-[0.65rem] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {post.category}
          </motion.p>
          <h2 className="text-base font-semibold leading-snug tracking-tight text-[color:var(--foreground)] transition group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <p className="line-clamp-2 flex-1 text-xs leading-relaxed text-[color:var(--muted)]">{post.description}</p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.65rem] text-[color:var(--muted)]">
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      className="group flex flex-col overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-soft transition"
      whileHover={{
        scale: 1.03,
        y: -6,
        boxShadow: "var(--shadow-soft-lg)",
        borderColor: "rgb(129, 140, 248, 0.35)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Link href={`/blog/${post.slug}`}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="relative h-full w-full"
          >
            <RemoteImage
              src={cover}
              alt={alt}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          </motion.div>
        </Link>
      </div>
      <motion.div
        className="flex flex-col p-6"
        initial={{ opacity: 0.9 }}
        whileHover={{ opacity: 1 }}
      >
        <motion.p
          className="text-[0.7rem] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {post.category}
        </motion.p>
        <h2 className="mt-2 text-lg font-semibold tracking-tight text-[color:var(--foreground)] transition group-hover:text-indigo-600 dark:group-hover:text-indigo-300 sm:text-xl">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--muted)]">{post.description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[color:var(--border)] pt-4 text-[0.7rem] text-[color:var(--muted)]">
          <span className="truncate font-medium text-[color:var(--foreground-muted)]">{post.author}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        {(post.tags?.length ?? 0) > 0 ? (
          <motion.div
            className="mt-4 flex flex-wrap gap-2"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {post.tags.slice(0, 4).map((t, i) => (
              <motion.span
                key={t}
                className="rounded-full bg-[color:var(--muted-bg)] px-2.5 py-1 text-[0.65rem] font-medium text-[color:var(--muted)]"
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {t}
              </motion.span>
            ))}
          </motion.div>
        ) : null}
      </motion.div>
    </motion.article>
  );
}
