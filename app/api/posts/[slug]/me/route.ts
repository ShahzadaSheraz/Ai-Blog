import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ slug: string }>;

/** Current user's like/bookmark state for a slug (authenticated only). */
export async function GET(_req: Request, ctx: { params: Params }) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ liked: false, bookmarked: false });
  const { slug } = await ctx.params;

  try {
    const [like, bookmark] = await Promise.all([
      prisma.like.findUnique({ where: { userId_postSlug: { userId, postSlug: slug } } }),
      prisma.bookmark.findUnique({ where: { userId_postSlug: { userId, postSlug: slug } } }),
    ]);
    return NextResponse.json({ liked: Boolean(like), bookmarked: Boolean(bookmark) });
  } catch {
    return NextResponse.json({ liked: false, bookmarked: false });
  }
}
