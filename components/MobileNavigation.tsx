"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { CATEGORY_DEFINITIONS } from "@/lib/categories";
import type { PostSummary } from "@/lib/posts";
import { SiteSearch } from "@/components/SiteSearch";

type LitePost = Pick<PostSummary, "slug" | "title" | "category" | "tags">;

function MobileNavLink({
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
      className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-violet-600/10 text-transparent bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 bg-clip-text shadow-soft"
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

export function MobileNavigation({
  isOpen,
  onClose,
  liteSearchPosts,
  authChrome,
}: {
  isOpen: boolean;
  onClose: () => void;
  liteSearchPosts?: LitePost[];
  authChrome: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 w-[min(20rem,calc(100vw-3rem))] border-l border-[color:var(--border)] bg-[color:var(--background)] shadow-2xl lg:hidden flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-[color:var(--border)] px-5 py-4">
              <Logo variant="compact" />
              <motion.button
                type="button"
                className="rounded-lg p-2 text-[color:var(--muted)] hover:bg-[color:var(--muted-bg)] transition-colors"
                onClick={onClose}
                aria-label="Close navigation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </div>

            {/* Search */}
            <div className="border-b border-[color:var(--border)] px-5 py-4">
              <SiteSearch litePosts={liteSearchPosts} className="hidden sm:block" placeholder="Search…" />
            </div>

            {/* Navigation content */}
            <nav
              aria-label="Mobile Navigation"
              className="flex-1 overflow-y-auto px-5 py-4 space-y-1 text-[color:var(--foreground)]"
            >
              {/* Main menu */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <MobileNavLink href="/" onNavigate={onClose}>
                  🏠 Home
                </MobileNavLink>
                <MobileNavLink href="/blog" onNavigate={onClose}>
                  📝 Blog
                </MobileNavLink>
                <MobileNavLink href="/about" onNavigate={onClose}>
                  ℹ️ About
                </MobileNavLink>
                <MobileNavLink href="/contact" onNavigate={onClose}>
                  💬 Contact
                </MobileNavLink>
              </motion.div>

              {/* Categories section */}
              <motion.div
                className="pt-4 mt-4 border-t border-[color:var(--border)]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-[color:var(--muted)] px-3 mb-3">
                  Categories
                </p>
                <div className="space-y-1">
                  {CATEGORY_DEFINITIONS.map((category) => (
                    <MobileNavLink
                      key={category.slug}
                      href={`/categories/${category.slug}`}
                      subtle
                      onNavigate={onClose}
                    >
                      {category.label}
                    </MobileNavLink>
                  ))}
                </div>
              </motion.div>
            </nav>

            {/* Footer with auth */}
            <motion.div
              className="border-t border-[color:var(--border)] px-5 py-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {authChrome}
            </motion.div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
