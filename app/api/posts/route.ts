import { NextResponse } from "next/server";
import { getAllPostSummaries } from "@/lib/posts";

export async function GET() {
  const posts = getAllPostSummaries().map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    category: p.category,
    tags: p.tags,
    readingMinutes: p.readingMinutes,
    coverImage: p.coverImage,
    featured: p.featured,
  }));
  return NextResponse.json({ posts });
}
