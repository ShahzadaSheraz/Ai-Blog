import Link from "next/link";

/** Minimal gradient mark + wordmark — scales for header/footer. */
export function Logo({
  variant = "default",
  className,
  ...props
}: { variant?: "default" | "footer" | "compact"; className?: string } & Omit<
  React.ComponentProps<typeof Link>,
  "href" | "children"
>) {
  const compact = variant === "compact";
  const size = variant === "footer" ? "h-10 w-10" : compact ? "h-8 w-8" : "h-10 w-10";

  return (
    <Link
      href="/"
      className={`group flex shrink-0 items-center gap-2.5 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--ring)] ${className ?? ""}`}
      {...props}
    >
      <span
        className={`relative flex ${size} items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-600 shadow-soft-lg shadow-indigo-500/30`}
        aria-hidden
      >
        <svg
          viewBox="0 0 32 32"
          className="h-[55%] w-[55%] text-white/95"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Abstract nodes / synapse motif */}
          <path d="M8 22c4-10 18-14 22-14" opacity="0.78" />
          <path d="M10 8c8 8 14 16 17 21" opacity="0.78" />
          <circle cx="11" cy="11" r="2.25" fill="currentColor" stroke="none" />
          <circle cx="21" cy="9" r="2" fill="currentColor" stroke="none" opacity="0.92" />
          <circle cx="18" cy="20" r="2.25" fill="currentColor" stroke="none" />
        </svg>
      </span>
      {variant !== "compact" ? (
        <span className="hidden min-[420px]:flex flex-col leading-tight">
          <span className="logo-text-gradient text-[0.9375rem] font-bold tracking-tight sm:text-base">
            AI Student Insights
          </span>
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[color:var(--muted)]">
            Learn · Build · Earn
          </span>
        </span>
      ) : null}
    </Link>
  );
}
