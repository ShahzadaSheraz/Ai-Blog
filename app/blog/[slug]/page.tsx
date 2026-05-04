import { ArticleBody } from "@/components/ArticleBody";
import { PostCard } from "@/components/PostCard";
import { getAllPostSummaries, getPostBySlug, getSlugs } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getAllPostSummaries()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const fallbackRelated = getAllPostSummaries()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);
  const showRelated = related.length ? related : fallbackRelated;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="text-xs text-zinc-500">
        <Link href="/blog" className="hover:text-zinc-300">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">{post.category}</span>
      </nav>
      <header className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-400">{post.category}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{post.title}</h1>
        <p className="mt-4 text-lg text-zinc-400">{post.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
          <time dateTime={post.date}>
            Published{" "}
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
      </header>

      <div className="mt-12">
        <ArticleBody content={post.content} />
      </div>

      <footer className="mt-16 border-t border-zinc-800 pt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Keep reading</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {showRelated.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </footer>
    </article>
  );
}
