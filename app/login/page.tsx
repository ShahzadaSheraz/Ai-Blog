import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to bookmark posts, react with likes, and join the discussion.",
};

function LoginFallback() {
  return <div className="mx-auto mt-24 h-56 max-w-md animate-pulse rounded-3xl bg-[color:var(--muted-bg)]" />;
}

export default function LoginPage() {
  const googleEnabled =
    Boolean(process.env.AUTH_GOOGLE_ID?.length) && Boolean(process.env.AUTH_GOOGLE_SECRET?.length);

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:py-24">
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
        Welcome back
      </p>
      <h1 className="mt-4 text-center text-3xl font-bold tracking-tight text-[color:var(--foreground)]">
        Log in
      </h1>
      <p className="mt-3 text-center text-sm text-[color:var(--muted)]">
        Guests can still read articles. Authenticate only when you want interaction features.
      </p>
      <div className="mt-12 rounded-[1rem] border border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-soft-lg">
        <Suspense fallback={<LoginFallback />}>
          <LoginForm googleEnabled={googleEnabled} />
        </Suspense>
      </div>
      <p className="mt-8 text-center text-xs text-[color:var(--muted)]">
        <Link href="/" className="font-semibold text-[color:var(--foreground-muted)] hover:text-indigo-600 dark:hover:text-indigo-300">
          ← Back home
        </Link>
      </p>
    </div>
  );
}
