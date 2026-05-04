import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/25">
            AI
          </span>
          <span className="text-sm font-semibold tracking-tight text-white sm:text-base">
            AI Student Insights
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800/80 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <details className="relative md:hidden">
      <summary className="list-none cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-100 [&::-webkit-details-marker]:hidden">
        Menu
      </summary>
      <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 py-1 shadow-xl">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-900 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
