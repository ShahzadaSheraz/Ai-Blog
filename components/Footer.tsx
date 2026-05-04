import Link from "next/link";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="text-lg font-semibold text-white">{siteConfig.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{siteConfig.tagline}</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm" aria-label="Footer">
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-zinc-400 transition hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-10 border-t border-zinc-800 pt-8 text-xs text-zinc-500">
          © {new Date().getFullYear()} {siteConfig.name}. Educational content only; not financial or legal advice.
        </p>
      </div>
    </footer>
  );
}
