"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CATEGORY_DEFINITIONS } from "@/lib/categories";

export function CategoriesDropdown() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = pathname.startsWith("/categories");

  const getCategoryIcon = (slug: string) => {
    const icons: Record<string, string> = {
      "ai-machine-learning": "🤖",
      "data-science": "📊",
      programming: "💻",
      "study-tips": "📚",
      "productivity-tools": "⚡",
      "tech-news": "📰",
    };
    return icons[slug] || "📌";
  };

  return (
    <div className="relative group py-2">
      <button
        type="button"
        className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 ${
          isActive
            ? "text-transparent bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 bg-clip-text"
            : "text-[color:var(--foreground-muted)] hover:text-[color:var(--foreground)] hover:bg-[color:var(--muted-bg)]"
        }`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        Categories
        <svg
          className={`h-4 w-4 opacity-70 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M6 8l4 4 4-4H6z" />
        </svg>
      </button>

      {/* Dropdown menu */}
      <div
        className={`invisible opacity-0 transition-all duration-200 origin-top group-hover:visible group-hover:opacity-100 ${
          isOpen ? "visible opacity-100" : ""
        }`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="absolute left-1/2 z-50 mt-2 w-[min(calc(100vw-3rem),20rem)] -translate-x-1/2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] py-2 shadow-soft-lg backdrop-blur-sm lg:left-0 lg:translate-x-0 lg:w-[22rem]">
          {/* Header */}
          <div className="px-4 py-2 border-b border-[color:var(--border)]">
            <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">
              Browse Topics
            </p>
          </div>

          {/* Category items */}
          <div className="grid grid-cols-1 gap-1 p-2">
            {CATEGORY_DEFINITIONS.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group/item rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-gradient-to-r hover:from-sky-500/5 hover:via-indigo-500/5 hover:to-violet-600/5"
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5 flex-shrink-0">
                    {getCategoryIcon(category.slug)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-[color:var(--foreground)] group-hover/item:text-transparent group-hover/item:bg-gradient-to-r group-hover/item:from-sky-500 group-hover/item:via-indigo-500 group-hover/item:to-violet-600 group-hover/item:bg-clip-text transition-all">
                      {category.label}
                    </p>
                    <p className="text-xs text-[color:var(--muted)] leading-relaxed mt-0.5 group-hover/item:text-[color:var(--foreground-muted)]">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer divider */}
          <div className="border-t border-[color:var(--border)] px-4 py-2 mt-1">
            <Link
              href="/categories"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              View all categories →
            </Link>
          </div>
        </div>
      </div>

      {isActive ? (
        <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-600" />
      ) : null}
    </div>
  );
}
