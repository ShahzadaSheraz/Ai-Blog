"use client";

import { useState } from "react";

export function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" 
    ? `${window.location.origin}/blog/${slug}`
    : `https://yourblog.com/blog/${slug}`;

  const shares = [
    {
      name: "Twitter",
      icon: "𝕏",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: "hover:text-black dark:hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: "in",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "hover:text-[#0A66C2]",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">Share</span>
      <div className="flex gap-2">
        {shares.map((share) => (
          <a
            key={share.name}
            href={share.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[color:var(--border)] bg-[color:var(--muted-bg)] text-[color:var(--foreground-muted)] shadow-soft transition ${share.color}`}
            title={`Share on ${share.name}`}
            aria-label={`Share on ${share.name}`}
          >
            <span className="text-xs font-bold">{share.icon}</span>
          </a>
        ))}
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[color:var(--border)] bg-[color:var(--muted-bg)] text-[color:var(--foreground-muted)] shadow-soft transition hover:text-indigo-600 dark:hover:text-indigo-400"
          title="Copy link"
          aria-label="Copy article link"
        >
          <span className="text-lg">{copied ? "✓" : "🔗"}</span>
        </button>
      </div>
    </div>
  );
}
