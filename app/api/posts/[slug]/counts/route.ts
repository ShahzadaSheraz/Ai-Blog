import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ slug: string }>;

export async function GET(_req: Request, ctx: { params: Params }) {
  const { slug } = await ctx.params;

  try {
    const [likes, bookmarks] = await Promise.all([
      prisma.like.count({ where: { postSlug: slug } }),
      prisma.bookmark.count({ where: { postSlug: slug } }),
    ]);
    return NextResponse.json({ likes, bookmarks });
  } catch {
    return NextResponse.json({ likes: 0, bookmarks: 0 }, { status: 200 });
  }
}
