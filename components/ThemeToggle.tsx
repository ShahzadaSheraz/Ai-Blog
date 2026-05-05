"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-soft text-[color:var(--foreground)] transition hover:border-indigo-500/35 hover:bg-[color:var(--muted-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--ring)]"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      title={`Theme: ${mounted ? resolvedTheme ?? "loading" : "loading"}`}
    >
      {mounted ? (
        resolvedTheme === "dark" ? (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 3v1M12 20v1M4.22 4.22l.7.7M18.92 18.92l.7.7M3 12h1M20 12h1M4.22 19.78l.7-.7M18.92 5.08l.7-.7" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 14.25A8.25 8.25 0 0111.75 5a10.03 10.03 0 001.933 9.283A9.962 9.962 0 0021 14.25z" />
          </svg>
        )
      ) : (
        <span className="h-5 w-5 rounded-full bg-[color:var(--muted-bg)] animate-pulse" />
      )}
    </button>
  );
}
