"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/lib/site";
import { CATEGORY_DEFINITIONS } from "@/lib/categories";
import { useState } from "react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Login" },
];

const legal = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative mt-auto border-t border-[color:var(--border)] bg-gradient-to-b from-[color:var(--card)] to-[color:var(--muted-bg)]">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-sky-500/5 via-indigo-500/5 to-violet-600/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-600/5 via-indigo-500/5 to-sky-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        {/* Main footer grid */}
        <div className="grid gap-12 md:gap-8 lg:grid-cols-5">
          {/* About section */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <Logo variant="footer" className="items-start" />
            </div>
            <p className="text-sm leading-relaxed text-[color:var(--muted)]">
              AI Blog helps students and developers learn AI, programming, productivity, and modern technology smarter and faster.
            </p>
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)] mb-2">Contact</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm font-medium text-[color:var(--foreground-muted)] hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[color:var(--foreground)] mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[color:var(--foreground-muted)] hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[color:var(--foreground)] mb-5">Categories</h3>
            <ul className="space-y-3">
              {CATEGORY_DEFINITIONS.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className="text-sm text-[color:var(--foreground-muted)] hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[color:var(--foreground)] mb-3">Newsletter</h3>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-[color:var(--border)] bg-[color:var(--card)] text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--muted)] outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 text-sm font-semibold text-white shadow-soft-lg hover:opacity-95 transition"
                >
                  {subscribed ? "✓ Subscribed!" : "Subscribe"}
                </button>
              </form>
              <p className="text-xs text-[color:var(--muted)] mt-2">
                No spam. One thoughtful email per week.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[color:var(--foreground)] mb-3">Follow Us</h3>
              <div className="flex gap-2 flex-wrap">
                {siteConfig.socials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[color:var(--border)] bg-[color:var(--muted-bg)] text-[color:var(--foreground-muted)] hover:border-indigo-500/50 hover:bg-gradient-to-br hover:from-sky-500/10 hover:via-indigo-500/10 hover:to-violet-600/10 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-soft transition"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <span className="text-xs font-bold">{social.label.slice(0, 2)}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-[color:var(--border)]" />

        {/* Footer bottom */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[color:var(--muted)]">
            © {new Date().getFullYear()} {siteConfig.name}. Educational content only—not financial or legal advice.
          </p>
          <div className="flex gap-1 text-xs">
            <span className="text-[color:var(--muted)]">Built with</span>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--foreground-muted)] hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition"
            >
              Next.js
            </a>
          </div>
          <div className="flex gap-3">
            {legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
