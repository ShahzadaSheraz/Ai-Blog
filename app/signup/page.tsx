import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create an account for bookmarks, likes, comments, and future newsletter sync.",
};

export default function SignupPage() {
  const googleEnabled =
    Boolean(process.env.AUTH_GOOGLE_ID?.length) && Boolean(process.env.AUTH_GOOGLE_SECRET?.length);

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:py-24">
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
        Join free
      </p>
      <h1 className="mt-4 text-center text-3xl font-bold tracking-tight text-[color:var(--foreground)]">
        Create account
      </h1>
      <p className="mt-3 text-center text-sm text-[color:var(--muted)]">
        Use email or optional Google SSO. You can browse everywhere as a guest beforehand.
      </p>
      <div className="mt-12 rounded-[1rem] border border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-soft-lg">
        <SignupForm googleEnabled={googleEnabled} />
      </div>
      <p className="mt-8 text-center text-xs text-[color:var(--muted)]">
        <Link href="/" className="font-semibold text-[color:var(--foreground-muted)] hover:text-indigo-600 dark:hover:text-indigo-300">
          ← Back home
        </Link>
      </p>
    </div>
  );
}
