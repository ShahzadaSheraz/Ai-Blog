"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export function LoginForm({
  googleEnabled,
}: {
  googleEnabled?: boolean;
}) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") ?? "/profile";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });
    setBusy(false);
    if (res?.error) {
      setError("Invalid credentials or incomplete setup (database / auth secret).");
      return;
    }
    window.location.assign(res?.url ?? callbackUrl);
  };

  return (
    <div className="space-y-8">
      {googleEnabled ? (
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-3 text-sm font-semibold text-[color:var(--foreground)] shadow-soft transition hover:bg-[color:var(--muted-bg)]"
          onClick={() =>
            signIn("google", {
              callbackUrl,
            }).catch(() => setError("Google sign-in unavailable in this deployment."))
          }
        >
          <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--background)] text-sm font-bold text-[color:var(--foreground-muted)]">
            G
          </span>
          Continue with Google
        </button>
      ) : (
        <p className="text-center text-xs text-[color:var(--muted)]">
          Google SSO is dormant until <code>AUTH_GOOGLE_ID</code> / <code>AUTH_GOOGLE_SECRET</code> are configured.
        </p>
      )}

      <div className="relative">
        <div className="absolute inset-x-10 top-1/2 border-t border-[color:var(--border)]" />
        <span className="relative block w-max mx-auto rounded-full bg-[color:var(--background)] px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-[color:var(--muted)]">
          or email
        </span>
      </div>

      <form className="space-y-5" onSubmit={submit}>
        <div>
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 text-sm text-[color:var(--foreground)] outline-none focus:border-indigo-500/35 focus:ring-2 focus:ring-[color:var(--ring)]"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 text-sm text-[color:var(--foreground)] outline-none focus:border-indigo-500/35 focus:ring-2 focus:ring-[color:var(--ring)]"
          />
        </div>
        {error ? <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-900 dark:text-rose-100">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="h-12 w-full rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 text-sm font-semibold text-white shadow-soft-lg hover:opacity-95 disabled:pointer-events-none disabled:opacity-50"
        >
          {busy ? "Signing in…" : "Continue"}
        </button>
      </form>

      <p className="text-center text-xs text-[color:var(--muted)]">
        No account yet?{' '}
        <Link href="/signup" className="font-semibold text-indigo-600 dark:text-indigo-400">
          Create one
        </Link>
      </p>
    </div>
  );
}
