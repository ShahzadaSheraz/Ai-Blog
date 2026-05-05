"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationsMenu } from "@/components/NotificationsMenu";
import { SiteSearch } from "@/components/SiteSearch";
import { CategoriesDropdown } from "@/components/CategoriesDropdown";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useScrollShadow } from "@/lib/useScrollShadow";
import type { PostSummary } from "@/lib/posts";

function NavLink({
  href,
  children,
  subtle,
}: {
  href: string;
  children: React.ReactNode;
  subtle?: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Link
        href={href}
        className={`relative whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 ${
          active
            ? "text-transparent bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 bg-clip-text"
            : subtle
              ? "text-[color:var(--muted)] hover:bg-[color:var(--muted-bg)] hover:text-[color:var(--foreground)]"
              : "text-[color:var(--foreground-muted)] hover:bg-[color:var(--muted-bg)] hover:text-[color:var(--foreground)]"
        }`}
      >
        {children}
        {active ? (
          <motion.span
            className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-600"
            layoutId="underline"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        ) : null}
      </Link>
    </motion.div>
  );
}

export function Header({
  liteSearchPosts,
}: {
  liteSearchPosts?: Pick<PostSummary, "slug" | "title" | "category" | "tags">[];
}) {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const hasScrolled = useScrollShadow();

  const centerNav = (
    <>
      <NavLink href="/">Home</NavLink>
      <CategoriesDropdown />
      <NavLink href="/blog">Blog</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/contact">Contact</NavLink>
    </>
  );

  const authChrome = useMemo(() => {
    if (status === "loading") {
      return (
        <div className="h-10 w-24 animate-pulse rounded-xl bg-[color:var(--muted-bg)]" />
      );
    }
    if (session?.user) {
      return (
        <div className="flex flex-wrap items-center justify-end gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/dashboard"
              className="inline-flex rounded-xl px-3 py-2 text-xs font-semibold text-[color:var(--foreground-muted)] hover:bg-[color:var(--muted-bg)] hover:text-[color:var(--foreground)] transition-colors"
            >
              Dashboard
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/profile"
              className="inline-flex max-w-[160px] items-center gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-2 text-xs font-semibold text-[color:var(--foreground)] shadow-soft transition hover:bg-[color:var(--muted-bg)]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-[0.7rem] text-white shrink-0 font-bold">
                {(session.user.name ?? session.user.email ?? "?")
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
              <span className="truncate">{session.user.name ?? "Profile"}</span>
            </Link>
          </motion.div>
        </div>
      );
    }
    return (
      <div className="flex flex-wrap items-center gap-2">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-[color:var(--foreground-muted)] hover:bg-[color:var(--muted-bg)] hover:text-[color:var(--foreground)] transition-colors"
          >
            Login
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/signup"
            className="rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-soft-lg shadow-indigo-600/35 transition hover:opacity-95"
          >
            Sign up
          </Link>
        </motion.div>
      </div>
    );
  }, [session, status]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-[color:var(--navbar-bg)] backdrop-blur-xl border-b border-[color:var(--border)] transition-all duration-300 ${
          hasScrolled ? "shadow-soft-lg" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 sm:py-3.5">
          {/* Logo section */}
          <motion.div
            className="flex min-w-0 flex-1 items-center gap-3 md:flex-none lg:flex-1"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Logo />
          </motion.div>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex lg:flex-[2] lg:justify-center xl:flex-[none] xl:grow xl:justify-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-1">
              {centerNav}
            </div>
          </nav>

          {/* Search bar - desktop */}
          <div className="hidden min-[520px]:flex flex-1 items-center justify-center lg:flex-none xl:flex-1 xl:max-w-xl xl:justify-end xl:px-4">
            <motion.div
              className="w-full"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <SiteSearch
                litePosts={liteSearchPosts}
                placeholder="Search articles…"
                className="w-full"
              />
            </motion.div>
          </div>

          {/* Right side controls */}
          <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ThemeToggle />
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <NotificationsMenu />
            </motion.div>

            {/* Desktop auth */}
            <div className="hidden lg:flex items-center gap-2">
              {authChrome}
            </div>

            {/* Mobile menu button */}
            <motion.button
              type="button"
              className="inline-flex lg:hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-2 shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--ring)] transition-colors hover:bg-[color:var(--muted-bg)]"
              aria-expanded={mobileOpen}
              aria-label="Open navigation menu"
              onClick={() => setMobileOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="h-6 w-6 text-[color:var(--foreground)]"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        liteSearchPosts={liteSearchPosts}
        authChrome={authChrome}
      />
    </>
  );
}
