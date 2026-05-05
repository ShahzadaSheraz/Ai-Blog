import { auth } from "@/auth";
import { ProfilePanel } from "@/components/ProfilePanel";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your editorial identity and see lightweight engagement totals.",
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/profile");
  }

  let bookmarks = 0;
  let likes = 0;
  let comments = 0;

  try {
    [bookmarks, likes, comments] = await Promise.all([
      prisma.bookmark.count({ where: { userId: session.user.id } }),
      prisma.like.count({ where: { userId: session.user.id } }),
      prisma.comment.count({ where: { userId: session.user.id } }),
    ]);
  } catch {
    /* database optional at build/demo time */
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <nav className="text-xs text-[color:var(--muted)]">
        <Link href="/" className="hover:text-[color:var(--foreground-muted)]">
          Home
        </Link>
        <span aria-hidden className="mx-2">
          /
        </span>
        <span className="text-[color:var(--foreground-muted)]">Profile</span>
      </nav>
      <h1 className="mt-8 text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl">
        Your workspace
      </h1>
      <p className="mt-4 text-[color:var(--muted)]">
        Lightweight stats stay here; comments and reactions stay attached to articles for context.
      </p>
      <div className="mt-12">
        <ProfilePanel bookmarks={bookmarks} likes={likes} comments={comments} />
      </div>
    </div>
  );
}
