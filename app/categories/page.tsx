import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORY_DEFINITIONS } from "@/lib/categories";
import { getPostsByCategorySlug } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse every canonical topic lane—AI & ML through tech news—with descriptions and curated entry points.",
};

// Category icon mapping
const categoryIcons: Record<string, string> = {
  "ai-machine-learning": "🤖",
  "data-science": "📊",
  "programming": "💻",
  "study-tips": "📚",
  "productivity-tools": "⚡",
  "tech-news": "📰",
};

// Category color gradients
const categoryColors: Record<string, { from: string; to: string }> = {
  "ai-machine-learning": { from: "from-purple-500/10", to: "to-pink-500/10" },
  "data-science": { from: "from-blue-500/10", to: "to-cyan-500/10" },
  "programming": { from: "from-green-500/10", to: "to-emerald-500/10" },
  "study-tips": { from: "from-yellow-500/10", to: "to-orange-500/10" },
  "productivity-tools": { from: "from-indigo-500/10", to: "to-blue-500/10" },
  "tech-news": { from: "from-red-500/10", to: "to-pink-500/10" },
};

const categoryBorderColors: Record<string, string> = {
  "ai-machine-learning": "hover:border-purple-500/35",
  "data-science": "hover:border-blue-500/35",
  "programming": "hover:border-green-500/35",
  "study-tips": "hover:border-yellow-500/35",
  "productivity-tools": "hover:border-indigo-500/35",
  "tech-news": "hover:border-red-500/35",
};

export default function CategoriesIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      {/* Header */}
      <header className="max-w-3xl mb-14">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[color:var(--foreground)]">
          Categories
        </h1>
        <p className="mt-5 text-[color:var(--muted)] text-lg leading-relaxed">
          Explore our curated learning paths. Each lane keeps tutorials aligned around the same mastery outcomes. Pick a category, then glide into adjacent topics while you explore the archive.
        </p>
      </header>

      {/* Categories Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORY_DEFINITIONS.map((category) => {
          const postCount = getPostsByCategorySlug(category.slug).length;
          const icon = categoryIcons[category.slug] || "📌";
          const colors = categoryColors[category.slug];
          const borderColor = categoryBorderColors[category.slug];

          return (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group"
            >
              <article
                className={`relative h-full overflow-hidden rounded-2xl border border-[color:var(--border)] bg-gradient-to-br ${colors.from} ${colors.to} bg-[color:var(--card)] p-7 shadow-soft transition hover:shadow-soft-lg hover:border-indigo-500/35 ${borderColor}`}
              >
                {/* Decorative accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-violet-600/5 rounded-full -mr-16 -mt-16 blur-2xl" />

                {/* Content */}
                <div className="relative space-y-4">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-600/15 text-2xl group-hover:scale-110 transition-transform">
                    {icon}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold tracking-tight text-[color:var(--foreground)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                    {category.label}
                  </h2>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-[color:var(--muted)]">
                    {category.description}
                  </p>

                  {/* Footer with count and link */}
                  <div className="pt-4 flex items-center justify-between border-t border-[color:var(--border)]">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 bg-clip-text">
                        {postCount}
                      </span>
                      <span className="text-xs font-medium text-[color:var(--muted)]">
                        {postCount === 1 ? "article" : "articles"}
                      </span>
                    </div>
                    <span className="text-[color:var(--muted)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition font-semibold">
                      →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      {/* Feature callout */}
      <div className="mt-16 rounded-2xl border border-[color:var(--border)] bg-gradient-to-br from-indigo-500/5 to-violet-600/5 p-8 sm:p-10">
        <h2 className="text-xl font-bold text-[color:var(--foreground)] mb-3">Pro Tip</h2>
        <p className="text-[color:var(--muted)] leading-relaxed">
          Each category has related tags and trending content. Use the filters to explore articles by specific topics like AI, Python, or productivity systems. Search works across titles, descriptions, and tags for quick discovery.
        </p>
      </div>
    </div>
  );
}
