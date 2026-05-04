import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/posts");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  category: string;
  keywords?: string[];
};

export type PostSummary = PostFrontmatter & {
  slug: string;
  readingMinutes: number;
};

export type Post = PostSummary & {
  content: string;
};

export function getSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function parseFile(slug: string): { data: PostFrontmatter; content: string } | null {
  const full = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  return { data: data as PostFrontmatter, content };
}

export function getPostBySlug(slug: string): Post | null {
  const parsed = parseFile(slug);
  if (!parsed) return null;
  const { data, content } = parsed;
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
    keywords: data.keywords,
    readingMinutes: Math.max(1, Math.round(words / 200)),
    content,
  };
}

export function getAllPostSummaries(): PostSummary[] {
  return getSlugs()
    .map((slug) => {
      const parsed = parseFile(slug);
      if (!parsed) throw new Error(`Post not found: ${slug}`);
      const { data, content } = parsed;
      const words = content.trim().split(/\s+/).filter(Boolean).length;
      return {
        slug,
        ...data,
        readingMinutes: Math.max(1, Math.round(words / 200)),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const categories = [
  "All",
  "Student Study Stack",
  "Beginner Guides",
  "Online Earning",
  "Ethics & Safety",
] as const;

export type CategoryFilter = (typeof categories)[number];

export function getPostsByCategory(category: string | undefined): PostSummary[] {
  const all = getAllPostSummaries();
  if (!category || category === "All") return all;
  return all.filter((p) => p.category === category);
}
