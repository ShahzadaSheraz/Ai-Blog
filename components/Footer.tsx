import Link from "next/link";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/lib/site";
import { CATEGORY_DEFINITIONS } from "@/lib/categories";

const quick = [
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
  return (
    <footer className="mt-auto border-t border-[color:var(--border)] bg-[color:var(--card)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo variant="footer" className="items-start" />
            <p className="text-sm leading-relaxed text-[color:var(--muted)]">{siteConfig.tagline}</p>
            <p className="text-sm text-[color:var(--foreground-muted)]">
              <span className="font-semibold text-[color:var(--foreground)]">Email</span>
              <br />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-indigo-600 dark:hover:text-indigo-300">
                {siteConfig.email}
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">Navigate</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {quick.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-medium text-[color:var(--foreground-muted)] transition hover:text-indigo-600 dark:hover:text-indigo-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">Topics</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {CATEGORY_DEFINITIONS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className="text-sm font-medium text-[color:var(--foreground-muted)] transition hover:text-indigo-600 dark:hover:text-indigo-300"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">Follow</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {siteConfig.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--muted-bg)] text-[color:var(--foreground-muted)] shadow-soft transition hover:border-indigo-500/35 hover:text-indigo-600 dark:hover:text-indigo-300"
                  aria-label={s.label}
                >
                  <span className="text-xs font-semibold">{s.label.slice(0, 2)}</span>
                </a>
              ))}
            </div>
            <ul className="mt-6 flex flex-col gap-2">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-[color:var(--muted)] hover:text-[color:var(--foreground)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-[color:var(--border)] pt-8 text-center text-xs text-[color:var(--muted)] sm:text-left">
          © {new Date().getFullYear()} {siteConfig.name}. Educational content only—not financial or legal advice.
        </p>
      </div>
    </footer>
  );
}
