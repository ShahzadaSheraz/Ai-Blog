import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ slug: string }>;

async function guardAuth() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;
  return userId;
}

export async function POST(_req: Request, ctx: { params: Params }) {
  const userId = await guardAuth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await ctx.params;

  try {
    await prisma.like.upsert({
      where: {
        userId_postSlug: { userId, postSlug: slug },
      },
      create: { userId, postSlug: slug },
      update: {},
    });
    const likes = await prisma.like.count({ where: { postSlug: slug } });
    return NextResponse.json({ ok: true, likes });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: { params: Params }) {
  const userId = await guardAuth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await ctx.params;

  try {
    await prisma.like.deleteMany({ where: { userId, postSlug: slug } });
    const likes = await prisma.like.count({ where: { postSlug: slug } });
    return NextResponse.json({ ok: true, likes });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
