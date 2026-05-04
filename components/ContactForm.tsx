"use client";

import { siteConfig } from "@/lib/site";
import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6 max-w-xl">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none ring-indigo-500/0 transition focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/20"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none ring-indigo-500/0 transition focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/20"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none ring-indigo-500/0 transition focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/20"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-rose-400" role="alert">
          Please fill in every field before sending.
        </p>
      )}
      {status === "sent" && (
        <p className="text-sm text-emerald-400" role="status">
          Your mail app should open with a draft message. If nothing happens, email us directly at
          {siteConfig.email} (update `lib/site.ts` for production).
        </p>
      )}
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-400 sm:w-auto sm:px-8"
      >
        Send message
      </button>
    </form>
  );
}
