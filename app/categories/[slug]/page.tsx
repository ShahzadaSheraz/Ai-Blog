import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { categoryBySlug, type CategorySlug } from "@/lib/categories";
import { getPostsByCategorySlug } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return ["ai-machine-learning", "data-science", "programming", "study-tips", "productivity-tools", "tech-news"].map(
    (slug) => ({ slug }),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = categoryBySlug(slug as CategorySlug);
  if (!cat) return { title: "Category" };
  return {
    title: cat.label,
    description: `${cat.label} tutorials and explainers • ${cat.description}`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = categoryBySlug(slug as CategorySlug);
  if (!cat) notFound();

  const posts = getPostsByCategorySlug(slug as CategorySlug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-xs text-[color:var(--muted)]">
        <Link href="/categories" className="hover:text-[color:var(--foreground-muted)]">
          Categories
        </Link>
        <span aria-hidden className="mx-2">
          /
        </span>
        <span className="text-[color:var(--foreground-muted)]">{cat.label}</span>
      </nav>

      <header className="mt-8 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Topic lane</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl">{cat.label}</h1>
        <p className="mt-5 text-[color:var(--muted)]">{cat.description}</p>
      </header>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="mt-14 text-center text-sm text-[color:var(--muted)]">No posts archived for this lane yet.</p>
      ) : null}
    </div>
  );
}
