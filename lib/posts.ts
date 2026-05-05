import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CATEGORY_DEFINITIONS, CATEGORY_LABELS, type CategorySlug } from "@/lib/categories";
import { siteConfig } from "@/lib/site";

const postsDir = path.join(process.cwd(), "content/posts");

const LEGACY_CATEGORY_MAP: Record<string, (typeof CATEGORY_LABELS)[number]> = {
  "Student Study Stack": "Study Tips",
  "Beginner Guides": "Programming",
  "Online Earning": "Productivity Tools",
  "Ethics & Safety": "Tech News",
};

function normalizeCategoryLabel(raw: string): string {
  return LEGACY_CATEGORY_MAP[raw] ?? raw;
}

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  category: string;
  keywords?: string[];
  tags?: string[];
  author?: string;
  coverImage?: string;
  featured?: boolean;
};

export type PostSummary = Omit<PostFrontmatter, "tags" | "keywords"> & {
  slug: string;
  readingMinutes: number;
  tags: string[];
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

function toSummary(slug: string, data: PostFrontmatter, content: string): PostSummary {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const tags = data.tags ?? data.keywords ?? [];
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    category: normalizeCategoryLabel(data.category),
    author: data.author ?? siteConfig.defaultAuthor,
    coverImage: data.coverImage,
    featured: Boolean(data.featured),
    tags,
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

export function getPostBySlug(slug: string): Post | null {
  const parsed = parseFile(slug);
  if (!parsed) return null;
  const { data, content } = parsed;
  return {
    ...toSummary(slug, data, content),
    content,
  };
}

export function getAllPostSummaries(): PostSummary[] {
  return getSlugs()
    .map((slug) => {
      const parsed = parseFile(slug);
      if (!parsed) throw new Error(`Post not found: ${slug}`);
      const { data, content } = parsed;
      return toSummary(slug, data, content);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedSummaries(limit = 6): PostSummary[] {
  const featured = getAllPostSummaries().filter((p) => p.featured);
  if (featured.length) return featured.slice(0, limit);
  return getAllPostSummaries().slice(0, Math.min(limit, 6));
}

export function getPostsBySlugCategory(slug: string, limit = 4): PostSummary[] {
  const post = getPostBySlug(slug);
  if (!post) return [];
  return getAllPostSummaries()
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, limit);
}

export function getRecommendedByTags(slug: string, limit = 4): PostSummary[] {
  const post = getPostBySlug(slug);
  if (!post?.tags?.length)
    return getPostsBySlugCategory(slug, limit).length
      ? getPostsBySlugCategory(slug, limit)
      : getAllPostSummaries()
          .filter((p) => p.slug !== slug)
          .slice(0, limit);

  const scores = getAllPostSummaries()
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const overlap = p.tags.filter((t) => post.tags.includes(t)).length;
      return { post: p, score: overlap };
    })
    .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime());

  const picked = scores.filter((s) => s.score > 0).map((s) => s.post);
  if (picked.length >= limit) return picked.slice(0, limit);
  const fill = getPostsBySlugCategory(slug, limit);
  const merged = [...picked];
  for (const p of [...fill, ...getAllPostSummaries().filter((p) => p.slug !== slug)]) {
    if (merged.length >= limit) break;
    if (!merged.some((x) => x.slug === p.slug)) merged.push(p);
  }
  return merged.slice(0, limit);
}

export function getTrendingSummaries(limit = 5): PostSummary[] {
  const list = [...getAllPostSummaries()];
  /* Weighted heuristic: prioritize featured then recency × length hint */
  return list
    .sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        b.readingMinutes - a.readingMinutes ||
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
    .slice(0, limit);
}

export function getPostsByCategorySlug(categorySlug: CategorySlug | undefined): PostSummary[] {
  const cat = CATEGORY_DEFINITIONS.find((c) => c.slug === categorySlug);
  if (!cat) return getAllPostSummaries();
  return getAllPostSummaries().filter((p) => p.category === cat.label);
}

/** Nav + chips: `"All"` plus every main category label. */
export const categories = ["All", ...CATEGORY_LABELS] as const;

export type CategoryFilter = (typeof categories)[number];

export function getPostsByCategory(category: string | undefined): PostSummary[] {
  const all = getAllPostSummaries();
  if (!category || category === "All") return all;
  return all.filter((p) => normalizeCategoryLabel(p.category) === category);
}

export function searchSummaries(query: string): PostSummary[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getAllPostSummaries().filter((p) => {
    const blob = `${p.title} ${p.description} ${p.tags.join(" ")} ${p.category}`.toLowerCase();
    return blob.includes(q);
  });
}

/** Category filter + substring search combined (archive page). */
export function filterPostsByCategoryAndQuery(category: string | undefined, qRaw: string | undefined): PostSummary[] {
  const base = getPostsByCategory(category && category !== "All" ? category : undefined);
  const q = qRaw?.trim().toLowerCase();
  if (!q) return base;
  return base.filter((p) => {
    const blob = `${p.title} ${p.description} ${p.tags.join(" ")} ${p.category}`.toLowerCase();
    return blob.includes(q);
  });
}

export function paginateSummaries(items: PostSummary[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const rawPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safePage = Math.min(rawPage, totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    page: safePage,
    items: items.slice(start, start + pageSize),
    total: items.length,
    totalPages,
    hasMore: safePage < totalPages,
  };
}
