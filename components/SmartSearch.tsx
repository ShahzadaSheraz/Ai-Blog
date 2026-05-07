"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { PostSummary } from "@/lib/posts";

interface SmartSearchProps {
  posts: PostSummary[];
  categories: string[];
  onFilterChange?: (results: PostSummary[]) => void;
}

export function SmartSearch({ posts, categories, onFilterChange }: SmartSearchProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [selectedTags, setSelectedTags] = React.useState<Set<string>>(new Set());

  // Get all tags from posts
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  // Filter posts based on search, category, and tags
  const filteredPosts = React.useMemo(() => {
    let results = posts;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory) {
      results = results.filter((p) => p.category === selectedCategory);
    }

    // Filter by tags
    if (selectedTags.size > 0) {
      results = results.filter((p) =>
        Array.from(selectedTags).some((tag) => p.tags.includes(tag))
      );
    }

    onFilterChange?.(results);
    return results;
  }, [searchQuery, selectedCategory, selectedTags, posts, onFilterChange]);

  const toggleTag = (tag: string) => {
    const newTags = new Set(selectedTags);
    if (newTags.has(tag)) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }
    setSelectedTags(newTags);
  };

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div>
        <input
          type="text"
          placeholder="Search articles by title or keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--foreground)] placeholder:text-[color:var(--muted)] outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition"
        />
      </div>

      {/* Category filter */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)] mb-3">
          Categories
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              selectedCategory === null
                ? "bg-indigo-600 text-white"
                : "border border-[color:var(--border)] text-[color:var(--foreground-muted)] hover:border-indigo-500/35"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "border border-[color:var(--border)] text-[color:var(--foreground-muted)] hover:border-indigo-500/35"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)] mb-3">
            Filter by Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 12).map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  selectedTags.has(tag)
                    ? "bg-indigo-600/20 border border-indigo-600 text-indigo-600 dark:text-indigo-400"
                    : "border border-[color:var(--border)] text-[color:var(--foreground-muted)] hover:border-indigo-500/35"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="p-4 rounded-lg bg-[color:var(--muted-bg)] text-sm text-[color:var(--muted)]">
        Found <span className="font-semibold text-[color:var(--foreground)]">{filteredPosts.length}</span> article{filteredPosts.length !== 1 ? "s" : ""}
        {selectedCategory && ` in ${selectedCategory}`}
        {selectedTags.size > 0 && ` with ${Array.from(selectedTags).join(", ")}`}
      </div>
    </div>
  );
}
