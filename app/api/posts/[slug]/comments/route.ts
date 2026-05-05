import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

type Params = Promise<{ slug: string }>;

export async function GET(_req: Request, ctx: { params: Params }) {
  const { slug } = await ctx.params;
  try {
    const rows = await prisma.comment.findMany({
      where: { postSlug: slug },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { user: { select: { name: true } } },
    });
    const comments = rows.map((c) => ({
      id: c.id,
      body: c.body,
      createdAt: c.createdAt.toISOString(),
      authorName: c.user.name ?? "Member",
    }));
    return NextResponse.json({ comments });
  } catch {
    return NextResponse.json({ comments: [] }, { status: 200 });
  }
}

const postSchema = z.object({
  body: z.string().min(1).max(2000),
});

export async function POST(req: Request, ctx: { params: Params }) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "Sign in to comment." }, { status: 401 });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = postSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Comment must be 1–2000 characters." }, { status: 400 });
  }

  const { slug } = await ctx.params;
  try {
    const comment = await prisma.comment.create({
      data: {
        userId,
        postSlug: slug,
        body: parsed.data.body.trim(),
      },
      include: { user: { select: { name: true } } },
    });
    return NextResponse.json({
      comment: {
        id: comment.id,
        body: comment.body,
        createdAt: comment.createdAt.toISOString(),
        authorName: comment.user.name ?? "Member",
      },
    });
  } catch {
    return NextResponse.json({ error: "Could not save comment." }, { status: 500 });
  }
}
