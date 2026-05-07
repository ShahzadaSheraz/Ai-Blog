import type { ReactNode } from "react";
import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { SiteSearch } from "@/components/SiteSearch";
import { NewsletterBox } from "@/components/NewsletterBox";
import { LatestPostsMore } from "@/components/LatestPostsMore";
import { TrendingPostsSection } from "@/components/TrendingPostsSection";
import { StatsSection } from "@/components/StatsSection";
import { NewsletterCTASection } from "@/components/NewsletterCTASection";
import { Parallax } from "@/components/animations/Parallax";
import { GlowingBlob } from "@/components/animations/GlowingBlob";
import { FadeIn } from "@/components/animations/FadeIn";
import { AnimatedDivider } from "@/components/animations/AnimatedDivider";
import { AnimatedButton } from "@/components/animations/AnimatedButton";
import { getAllPostSummaries, getFeaturedSummaries } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import { CATEGORY_DEFINITIONS, type CategorySlug } from "@/lib/categories";
import { MotionDiv } from "@/components/animations/MotionDiv";
import { motion } from "framer-motion";

const CATEGORY_ICONS: Record<CategorySlug, ReactNode> = {
  "ai-machine-learning": (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M5 12h14M12 5v14" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M8 8.5l-3 1.5v4l3 1.5m8-9l3 1.5v4l-3 1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "data-science": (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 19h16M7 15v4M12 11v8M17 7v12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 15a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm5-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm5-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    </svg>
  ),
  programming: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M9 6 3 12l6 6M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4v16" strokeLinecap="round" />
    </svg>
  ),
  "study-tips": (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M12 3a6 6 0 0 0-6 6c0 3.6 2.4 5.5 4.5 6.5v2.5h3v-2.5C15.6 14.5 18 12.6 18 9a6 6 0 0 0-6-6Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 16h5" strokeLinecap="round" />
    </svg>
  ),
  "productivity-tools": (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M12 3v18M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 8l5-1-1 5-4 2-2-4 2-2Z" />
    </svg>
  ),
  "tech-news": (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M5 5h14v14H5z" strokeLinejoin="round" />
      <path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" />
    </svg>
  ),
};

export default function HomePage() {
  const posts = getAllPostSummaries();
  const featured = getFeaturedSummaries(6);
  const searchIndex = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    tags: p.tags,
  }));

  return (
    <>
      <section className="relative overflow-hidden border-b border-[color:var(--border)]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900/40 opacity-95" />
        
        {/* Animated glowing blobs */}
        <div className="pointer-events-none absolute inset-0">
          <GlowingBlob size="lg" color="sky" className="left-[-4rem] top-0" delay={0} />
          <GlowingBlob size="md" color="indigo" className="right-[-3rem] top-32" delay={0.5} />
          <GlowingBlob size="md" color="violet" className="left-1/4 bottom-0" delay={1} />
        </div>

        <Parallax offset={30} className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <FadeIn direction="up" delay={0} duration={0.6}>
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-200/80">
                  AI-driven learning for creators
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.1} duration={0.6}>
                <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Learn AI &amp; Tech Smarter
                </h1>
              </FadeIn>

              <FadeIn direction="up" delay={0.2} duration={0.6}>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
                  {siteConfig.tagline} Practical AI, data, and programming guides built for modern learners, with
                  clear examples and research-backed workflows.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.3} duration={0.6}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <AnimatedButton href="#featured-posts" variant="primary" magneticEffect>
                    Start Reading
                  </AnimatedButton>
                  <AnimatedButton href="#categories" variant="outline">
                    Explore Categories
                  </AnimatedButton>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.4} duration={0.6}>
                <div className="mt-10 max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-soft-backdrop backdrop-blur-xl">
                  <SiteSearch
                    litePosts={searchIndex}
                    placeholder="Search AI, programming, data science, or study tips…"
                    className="w-full"
                  />
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.5} duration={0.6}>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "120+ guides", small: "AI, data, and productivity" },
                    { label: "6 focused categories", small: "Structure for every learning path" },
                    { label: "Built for students", small: "Practical, no-fluff tutorials" },
                  ].map((item, i) => (
                     <MotionDiv
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-100 shadow-soft transition"
                    >
                      <p className="font-semibold text-white">{item.label}</p>
                      <p className="mt-2 text-[0.95rem] text-slate-300">{item.small}</p>
                    </MotionDiv>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="right" delay={0.2} duration={0.8}>
               <MotionDiv
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 shadow-soft-lg backdrop-blur-xl"
              >
                 <MotionDiv
                  className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-violet-500/20 to-transparent"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="relative flex h-full flex-col justify-between gap-6">
                  <div className="space-y-4">
                    < MotionDiv
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="inline-flex rounded-full bg-slate-900/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200/80"
                    >
                      Latest insight
                    </MotionDiv>
                    <div className="space-y-3">
                      <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Feature spotlight</p>
                      <h2 className="text-3xl font-semibold tracking-tight text-white">AI study tools, prompts, and workflows for fast retention.</h2>
                      <p className="max-w-xl text-sm leading-7 text-slate-300">
                        Browse curated articles, quick-start guides, and category-first reading paths to sharpen your tech skills.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { title: "AI tools", value: "Prompt labs" },
                      { title: "Programming", value: "Hands-on examples" },
                      { title: "Data science", value: "Visual workflows" },
                      { title: "Study tips", value: "Focus routines" },
                    ].map((item, i) => (
                       <MotionDiv
                        key={item.title}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-slate-200 shadow-sm transition"
                      >
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{item.title}</p>
                      <p className="mt-2 font-semibold text-white">{item.value}</p>
                    </MotionDiv>
                  ))}
                </div>
              </div>
            </MotionDiv>
            </FadeIn>
          </div>
        </Parallax>
      </section>

      <section id="featured-posts" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <FadeIn direction="left" delay={0} className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">Featured articles</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[color:var(--foreground)]">Curated stories for your next project</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[color:var(--muted)]">
              Six top posts selected for impact, practical examples, and fast learning.
            </p>
          </FadeIn>
          <MotionDiv whileHover={{ scale: 1.05, x: 4 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/blog"
              className="inline-flex shrink-0 rounded-full bg-slate-950/80 px-5 py-3 text-sm font-semibold text-sky-100 shadow-soft transition hover:bg-slate-900"
            >
              View full archive →
            </Link>
          </MotionDiv>
        </div>
         <MotionDiv
          className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {featured.map((post, i) => (
            <MotionDiv
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            >
              <PostCard post={post} />
            </MotionDiv>
          ))}
        </MotionDiv>
      </section>

      <AnimatedDivider style="gradient" className="my-8" />
 <MotionDiv
        id="categories"
        className="border-y border-[color:var(--border)] bg-[color:var(--muted-bg)] py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn direction="up" delay={0}>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-500/80">Learning paths</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[color:var(--foreground)]">Explore topics by category</h2>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted)]">
                Navigate the AI, data science, programming, study, and productivity content that fits your goals.
              </p>
            </div>
          </FadeIn>
          <MotionDiv
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
          >
            {CATEGORY_DEFINITIONS.map((category, i) => (
              <MotionDiv
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <Link
                  href={`/categories/${category.slug}`}
                  className="group block h-full overflow-hidden rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-soft transition duration-300 hover:border-indigo-400/40 hover:shadow-soft-lg"
                >
                  <MotionDiv
                    className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-950/80 text-sky-200 transition group-hover:bg-sky-500/15"
                    whileHover={{ scale: 1.1 }}
                  >
                    {CATEGORY_ICONS[category.slug]}
                  </MotionDiv>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-[color:var(--foreground)]">{category.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">{category.description}</p>
                  <MotionDiv className="mt-6 inline-flex text-sm font-semibold text-indigo-600 transition group-hover:text-indigo-500">
                    Explore →
                  </MotionDiv>
                </Link>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </MotionDiv>

      <AnimatedDivider style="gradient" className="my-8" />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <FadeIn direction="left" delay={0}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">Latest posts</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[color:var(--foreground)]">Fresh reads, updated weekly</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[color:var(--muted)]">
                Browse the newest guides and tutorials, then load more when you are ready to dive deeper.
              </p>
            </div>
            <MotionDiv whileHover={{ scale: 1.05, x: 4 }} whileTap={{ scale: 0.95 }}>
              <Link href="/blog" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                Paginated archive →
              </Link>
            </MotionDiv>
          </div>
        </FadeIn>
        <LatestPostsMore posts={posts} initial={6} pageSize={4} />
      </section>

      <AnimatedDivider style="wave" className="my-12" />

      {/* Trending posts section */}
      <TrendingPostsSection posts={posts} />

      <AnimatedDivider style="dots" className="my-12" />

      {/* Stats section */}
      <StatsSection totalArticles={posts.length} totalCategories={CATEGORY_DEFINITIONS.length} />

      <AnimatedDivider style="gradient" className="my-12" />

      {/* Newsletter CTA section */}
      <NewsletterCTASection />

      {/* Footer section with newsletter and links */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-soft sm:p-12">
          <NewsletterBox id="newsletter" />
          <div className="mt-12 flex flex-wrap gap-6 text-sm text-[color:var(--muted)]">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">Need help?</p>
              <Link
                href="/contact"
                className="mt-3 inline-flex font-semibold text-[color:var(--foreground)] hover:text-indigo-600 dark:hover:text-indigo-300"
              >
                Reach the editorial desk →
              </Link>
            </div>
            <div className="h-px w-full bg-[color:var(--border)] sm:hidden" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">About the project</p>
              <Link
                href="/about"
                className="mt-3 inline-flex font-semibold text-[color:var(--foreground)] hover:text-indigo-600 dark:hover:text-indigo-300"
              >
                Our principles →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
