"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationsMenu } from "@/components/NotificationsMenu";
import { SiteSearch } from "@/components/SiteSearch";
import type { PostSummary } from "@/lib/posts";
import { CATEGORY_DEFINITIONS } from "@/lib/categories";

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
    <Link
      href={href}
      className={`relative whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold transition ${
        active
          ? "text-transparent bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 bg-clip-text"
          : subtle
            ? "text-[color:var(--muted)] hover:bg-[color:var(--muted-bg)] hover:text-[color:var(--foreground)]"
            : "text-[color:var(--foreground-muted)] hover:bg-[color:var(--muted-bg)] hover:text-[color:var(--foreground)]"
      }`}
    >
      {children}
      {active ? (
        <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-600" />
      ) : null}
    </Link>
  );
}

export function Header({
  liteSearchPosts,
}: {
  liteSearchPosts?: Pick<PostSummary, "slug" | "title" | "category" | "tags">[];
}) {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const centerNav = (
    <>
      <NavLink href="/">Home</NavLink>

      {/* Categories dropdown */}
      <div className="relative group py-2">
        <button
          type="button"
          className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition ${
            pathname.startsWith("/categories")
              ? "text-transparent bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 bg-clip-text"
              : "text-[color:var(--foreground-muted)] hover:bg-[color:var(--muted-bg)] hover:text-[color:var(--foreground)]"
          }`}
        >
          Categories
          <svg className="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 8l4 4 4-4h-8z" />
          </svg>
        </button>
        <div className="invisible opacity-0 transition group-hover:visible group-hover:opacity-100">
          <div className="absolute left-1/2 z-55 mt-1 w-[min(calc(100vw-3rem),16rem)] -translate-x-1/2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] py-2 shadow-soft-lg lg:left-0 lg:translate-x-0 lg:w-[18rem]">
            {CATEGORY_DEFINITIONS.map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="block px-4 py-2.5 text-sm text-[color:var(--foreground)] hover:bg-[color:var(--muted-bg)]"
              >
                <span className="font-semibold">{c.label}</span>
                <span className="mt-1 block text-xs font-normal leading-relaxed text-[color:var(--muted)]">
                  {c.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <NavLink href="/blog">Blog</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/contact">Contact</NavLink>
    </>
  );

  const authChrome = useMemo(() => {
    if (status === "loading") {
      return <span className="h-10 w-24 animate-pulse rounded-xl bg-[color:var(--muted-bg)]" />;
    }
    if (session?.user) {
      return (
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Link
            href="/dashboard"
            className="inline-flex rounded-xl px-3 py-2 text-xs font-semibold text-[color:var(--foreground-muted)] hover:bg-[color:var(--muted-bg)] hover:text-[color:var(--foreground)]"
          >
            Dashboard
          </Link>
          <Link
            href="/profile"
            className="inline-flex max-w-[160px] items-center gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-2 text-xs font-semibold text-[color:var(--foreground)] shadow-soft transition hover:bg-[color:var(--muted-bg)]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-[0.7rem] text-white shrink-0">
              {(session.user.name ?? session.user.email ?? "?")
                .split(" ")
                .map((p) => p[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
            <span className="truncate">{session.user.name ?? "Profile"}</span>
          </Link>
        </div>
      );
    }
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/login"
          className="rounded-xl px-4 py-2 text-sm font-semibold text-[color:var(--foreground-muted)] hover:bg-[color:var(--muted-bg)] hover:text-[color:var(--foreground)]"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-soft-lg shadow-indigo-600/35 transition hover:opacity-95"
        >
          Sign up
        </Link>
      </div>
    );
  }, [session, status]);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--navbar-bg)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3.5 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3 md:flex-none lg:flex-1">
          <Logo />
        </div>

        <nav
          aria-label="Primary"
          className="hidden lg:flex lg:flex-[2] lg:justify-center xl:flex-[none] xl:grow xl:justify-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-1">{centerNav}</div>
        </nav>

        <div className="hidden min-[520px]:flex flex-1 items-center justify-center lg:flex-none xl:flex-1 xl:max-w-xl xl:justify-end xl:px-8">
          <SiteSearch litePosts={liteSearchPosts} placeholder="Instant search…" className="w-full" />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
          <ThemeToggle />
          <NotificationsMenu />
          <div className="hidden lg:block">{authChrome}</div>

          <button
            type="button"
            className="inline-flex lg:hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-2 shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--ring)]"
            aria-expanded={mobileOpen}
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
          >
            <svg className="h-6 w-6 text-[color:var(--foreground)]" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen ? (
            <>
              <motion.div
                className="fixed inset-0 z-[80] bg-black/55 backdrop-blur-sm lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
              />
              <motion.aside
                className="fixed inset-y-0 right-0 z-[90] w-[min(20rem,calc(100vw-3rem))] border-l border-[color:var(--border)] bg-[color:var(--background)] px-5 py-6 shadow-2xl lg:hidden flex flex-col gap-6"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 32 }}
              >
                <div className="flex items-center justify-between gap-4">
                  <Logo variant="compact" />
                  <button
                    type="button"
                    className="rounded-lg p-2 text-[color:var(--muted)] hover:bg-[color:var(--muted-bg)]"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close navigation"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <SiteSearch litePosts={liteSearchPosts} className="hidden min-[420px]:block sm:block" placeholder="Search…" />
                <nav aria-label="Mobile" className="flex flex-col gap-2 text-[color:var(--foreground)]">
                  <MobileLink href="/" onNavigate={() => setMobileOpen(false)}>
                    Home
                  </MobileLink>
                  <p className="mt-4 text-[0.65rem] font-bold uppercase tracking-widest text-[color:var(--muted)]">Categories</p>
                  {CATEGORY_DEFINITIONS.map((c) => (
                    <MobileLink key={c.slug} href={`/categories/${c.slug}`} subtle onNavigate={() => setMobileOpen(false)}>
                      {c.label}
                    </MobileLink>
                  ))}
                  <p className="mt-6 text-[0.65rem] font-bold uppercase tracking-widest text-[color:var(--muted)]">Site</p>
                  <MobileLink href="/blog" onNavigate={() => setMobileOpen(false)}>
                    Blog
                  </MobileLink>
                  <MobileLink href="/about" onNavigate={() => setMobileOpen(false)}>
                    About
                  </MobileLink>
                  <MobileLink href="/contact" onNavigate={() => setMobileOpen(false)}>
                    Contact
                  </MobileLink>
                </nav>
                <div className="mt-auto pt-8 border-t border-[color:var(--border)]">{authChrome}</div>
              </motion.aside>
            </>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}

function MobileLink({
  href,
  children,
  subtle,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  subtle?: boolean;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
        active
          ? "bg-[color:var(--muted-bg)] text-[color:var(--foreground)] shadow-soft"
          : subtle
            ? "pl-5 text-[color:var(--muted)] hover:bg-[color:var(--muted-bg)] hover:text-[color:var(--foreground)]"
            : "text-[color:var(--foreground-muted)] hover:bg-[color:var(--muted-bg)] hover:text-[color:var(--foreground)]"
      }`}
      onClick={onNavigate}
    >
      {children}
    </Link>
  );
}
