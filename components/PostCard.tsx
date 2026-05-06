import Link from "next/link";
import type { PostSummary } from "@/lib/posts";
import { RemoteImage } from "@/components/RemoteImage";

const FALLBACK_IMG = "/fallback-cover.svg";

export function PostCard({ post, compact }: { post: PostSummary; compact?: boolean }) {
  const cover = post.coverImage ?? FALLBACK_IMG;
  const alt = `Cover image for ${post.title}`;

  if (compact) {
    return (
      <article className="group flex overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-soft transition hover:border-indigo-500/35 hover:shadow-soft-lg">
        <div className="relative min-h-[6.75rem] w-[9.5rem] shrink-0 sm:min-h-[8rem] sm:w-44">
          <Link href={`/blog/${post.slug}`}>
            <RemoteImage
              src={cover}
              alt={alt}
              fill
              sizes="176px"
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          </Link>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
          <p className="text-[0.65rem] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {post.category}
          </p>
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
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-soft transition hover:border-indigo-500/35 hover:shadow-soft-lg">
      <div className="relative aspect-[16/10] w-full">
        <Link href={`/blog/${post.slug}`}>
          <RemoteImage
            src={cover}
            alt={alt}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        </Link>
      </div>
      <div className="flex flex-col p-6">
        <p className="text-[0.7rem] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          {post.category}
        </p>
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
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full bg-[color:var(--muted-bg)] px-2.5 py-1 text-[0.65rem] font-medium text-[color:var(--muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
