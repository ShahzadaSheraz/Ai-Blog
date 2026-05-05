"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export function SignupForm({
  googleEnabled,
}: {
  googleEnabled?: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name || undefined, email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Signup failed.");
        setBusy(false);
        return;
      }
      const sign = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/profile",
      });
      if (sign?.error) {
        setError("Registered, but login failed. Try signing in manually.");
        setBusy(false);
        return;
      }
      window.location.assign(sign?.url ?? "/profile");
    } catch {
      setError("Network error.");
      setBusy(false);
    }
  };

  return (
    <div className="space-y-8">
      {googleEnabled ? (
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-3 text-sm font-semibold text-[color:var(--foreground)] shadow-soft transition hover:bg-[color:var(--muted-bg)]"
          onClick={() => signIn("google", { callbackUrl: "/profile" })}
        >
          <span aria-hidden className="text-lg font-bold text-[color:var(--foreground-muted)]">
            G
          </span>
          Continue with Google
        </button>
      ) : (
        <p className="text-center text-xs text-[color:var(--muted)]">
          Google SSO is dormant until OAuth keys are configured. Email signup still works once the database is ready.
        </p>
      )}

      <div className="relative">
        <div className="absolute inset-x-10 top-1/2 border-t border-[color:var(--border)]" />
        <span className="relative mx-auto block w-max rounded-full bg-[color:var(--background)] px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-[color:var(--muted)]">
          create with email
        </span>
      </div>

      <form className="space-y-5" onSubmit={submit}>
        <div>
          <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">
            Display name <span className="font-normal">(optional)</span>
          </label>
          <input
            id="name"
            type="text"
            maxLength={120}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 text-sm text-[color:var(--foreground)] outline-none focus:border-indigo-500/35 focus:ring-2 focus:ring-[color:var(--ring)]"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 text-sm text-[color:var(--foreground)] outline-none focus:border-indigo-500/35 focus:ring-2 focus:ring-[color:var(--ring)]"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">
            Password (8+ chars)
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="new-password"
            minLength={8}
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
          {busy ? "Creating account…" : "Sign up"}
        </button>
      </form>

      <p className="text-center text-xs text-[color:var(--muted)]">
        Already onboard?{' '}
        <Link href="/login" className="font-semibold text-indigo-600 dark:text-indigo-400">
          Log in
        </Link>
      </p>
    </div>
  );
}
