import { ArticleBody } from "@/components/ArticleBody";
import { ArticleComments } from "@/components/ArticleComments";
import { ArticleShortcuts } from "@/components/ArticleShortcuts";
import { ArticleToc } from "@/components/ArticleToc";
import { BlogSidebar } from "@/components/BlogSidebar";
import { PostCard } from "@/components/PostCard";
import { PostEngagement } from "@/components/PostEngagement";
import { ShareButtons } from "@/components/ShareButtons";
import { getRecommendedByTags, getPostBySlug, getSlugs, getTrendingSummaries } from "@/lib/posts";
import { extractToc } from "@/lib/toc";
import { categorySlugFromLabel } from "@/lib/categories";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import { RemoteImage } from "@/components/RemoteImage";
import Link from "next/link";
import { notFound } from "next/navigation";

const FALLBACK_COVER = "/fallback-cover.svg";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  const cover = post.coverImage ?? FALLBACK_COVER;
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${post.slug}`,
      images: [{ url: cover }],
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

  const recommended = getRecommendedByTags(slug, 4);
  const toc = extractToc(post.content);
  const catSlugNav = categorySlugFromLabel(post.category);

  const cover = post.coverImage ?? FALLBACK_COVER;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    image: cover,
    author: {
      "@type": "Person",
      name: post.author ?? siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,230px)_minmax(0,1fr)_minmax(0,290px)] lg:items-start xl:gap-14">
        <div className="hidden lg:block lg:sticky lg:top-28 lg:self-start lg:space-y-10">
          <ArticleShortcuts tags={post.tags} categoryLabel={post.category} />
          <ArticleToc items={toc} />
        </div>

        <article className="min-w-0">
          {toc.length ? (
            <details className="mb-10 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-5 py-4 shadow-soft lg:hidden">
              <summary className="cursor-pointer text-sm font-semibold text-[color:var(--foreground)]">
                Jump to sections
              </summary>
              <div className="mt-4">
                <ArticleToc items={toc} />
              </div>
            </details>
          ) : null}

          <nav className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] text-[color:var(--muted)]">
            <Link href="/blog" className="hover:text-[color:var(--foreground-muted)]">
              Articles
            </Link>
            <span aria-hidden>/</span>
            {catSlugNav ? (
              <Link href={`/categories/${catSlugNav}`} className="hover:text-[color:var(--foreground-muted)]">
                {post.category}
              </Link>
            ) : (
              <span className="text-[color:var(--foreground-muted)]">{post.category}</span>
            )}
          </nav>

          <header className="mt-6">
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-[color:var(--border)] shadow-soft-lg">
              <RemoteImage src={cover} alt={`Cover illustration for ${post.title}`} fill priority className="object-cover" />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-6 text-[0.7rem] font-bold uppercase tracking-widest text-white/95">
                {post.category}
              </span>
            </div>

            <h1 className="mt-8 text-[2rem] font-bold tracking-tight text-[color:var(--foreground)] sm:text-[2.5rem] lg:text-[2.75rem]">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[color:var(--muted)]">{post.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-5 py-4 text-sm shadow-soft">
              <div className="flex min-w-[14rem] items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-soft">
                  {(post.author ?? "A")[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">Author</p>
                  <p className="font-semibold text-[color:var(--foreground)]">{post.author ?? siteConfig.defaultAuthor}</p>
                </div>
              </div>
              <span className="hidden h-12 w-px bg-[color:var(--border)] sm:inline" aria-hidden />
              <dl className="flex flex-wrap gap-6">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-[color:var(--muted)]">Published</dt>
                  <dd className="font-medium text-[color:var(--foreground-muted)]">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-[color:var(--muted)]">Reading time</dt>
                  <dd className="font-medium text-[color:var(--foreground-muted)]">{post.readingMinutes} min read</dd>
                </div>
              </dl>
            </div>
          </header>

          <div className="mt-14">
            <ArticleBody content={post.content} />
          </div>

          {/* Share buttons section */}
          <div className="mt-12 py-8 border-t border-b border-[color:var(--border)]">
            <ShareButtons slug={post.slug} title={post.title} />
          </div>

          {/* Engagement section */}
          <div className="mt-8">
            <PostEngagement slug={post.slug} title={post.title} />
          </div>

          {/* Comments section */}
          <div className="mt-12">
            <ArticleComments slug={post.slug} />
          </div>

          {/* Recommended posts section */}
          {recommended.length > 0 && (
            <footer className="mt-20 pt-12 border-t border-[color:var(--border)]">
              <div className="space-y-2 mb-10">
                <h2 className="text-2xl font-bold tracking-tight text-[color:var(--foreground)]">
                  Recommended for you
                </h2>
                <p className="text-sm text-[color:var(--muted)]">
                  Related articles based on tags and category
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {recommended.slice(0, 4).map((p) => (
                  <PostCard key={p.slug} post={p} compact />
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link
                  href={`/blog?category=${encodeURIComponent(post.category)}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 text-white font-semibold shadow-soft-lg hover:opacity-95 transition"
                >
                  Browse more {post.category} articles
                  <span>→</span>
                </Link>
              </div>
            </footer>
          )}
        </article>

        <BlogSidebar trending={getTrendingSummaries(6)} currentSlug={slug} />
      </div>
    </>
  );
}
