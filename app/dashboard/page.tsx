import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Engagement snapshots for signed-in readers (bookmarks, likes, comments).",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/dashboard");
  }

  let bookmarks = 0;
  let likes = 0;
  let comments = 0;
  let rows: { postSlug: string; createdAt: Date }[] = [];

  try {
    ;[bookmarks, likes, comments] = await Promise.all([
      prisma.bookmark.count({ where: { userId: session.user.id } }),
      prisma.like.count({ where: { userId: session.user.id } }),
      prisma.comment.count({ where: { userId: session.user.id } }),
    ]);
    rows = await prisma.bookmark.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 12,
      select: { postSlug: true, createdAt: true },
    });
  } catch {
    /* optional DB */
  }

  const totalReaders = bookmarks + likes + comments;

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <nav className="text-xs text-[color:var(--muted)]">
        <Link href="/profile" className="hover:text-[color:var(--foreground-muted)]">
          Profile
        </Link>
        <span aria-hidden className="mx-2">
          /
        </span>
        <span className="text-[color:var(--foreground-muted)]">Dashboard</span>
      </nav>

      <header className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl">Reader dashboard</h1>
          <p className="mt-3 max-w-xl text-[color:var(--muted)]">
            A compact snapshot of interactions across {siteConfig.name}. Extend this route with editorial analytics later.
          </p>
        </div>
        <Link
          href="/blog"
          className="rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft-lg hover:opacity-95"
        >
          Browse guides
        </Link>
      </header>

      <section className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Bookmarks" value={bookmarks} hint="Articles you flagged for later." />
        <Metric label="Likes" value={likes} hint="Public appreciation signals." />
        <Metric label="Comments" value={comments} hint="Thoughtful threads opened." />
        <Metric label="Engagement score" value={totalReaders} hint="Simple rollup for quick motivation." dense />
      </section>

      <section className="mt-14 rounded-[1rem] border border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-[color:var(--foreground)]">Recent bookmarks</h2>
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">Last 12 saves</p>
        </div>
        {rows.length ? (
          <ul className="mt-8 divide-y divide-[color:var(--border)] text-sm">
            {rows.map((r) => (
              <li key={`${r.postSlug}-${r.createdAt.toISOString()}`} className="flex flex-wrap items-center justify-between gap-4 py-4">
                <Link href={`/blog/${r.postSlug}`} className="font-semibold text-indigo-600 dark:text-indigo-400">
                  View article → /{r.postSlug}
                </Link>
                <time dateTime={r.createdAt.toISOString()} className="text-[color:var(--muted)]">
                  {r.createdAt.toLocaleString()}
                </time>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-sm text-[color:var(--muted)]">
            Bookmark posts while signed in—they will populate this list automatically once the database is connected.
          </p>
        )}
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
  hint,
  dense,
}: {
  label: string;
  value: number;
  hint: string;
  dense?: boolean;
}) {
  return (
    <article className="rounded-[1rem] border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-soft">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--muted)]">{label}</p>
      <p className={`mt-3 font-bold tabular-nums text-[color:var(--foreground)] ${dense ? "text-4xl" : "text-4xl sm:text-5xl"}`}>
        {value}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-[color:var(--muted)]">{hint}</p>
    </article>
  );
}
