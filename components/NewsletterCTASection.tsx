"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function NewsletterCTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-slate-950/50 to-violet-950/20" />
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-500/10 to-violet-500/10 blur-3xl -mr-48" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gradient-to-tr from-violet-500/10 to-indigo-500/10 blur-3xl -ml-48" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/80 to-slate-900/80 backdrop-blur-xl p-8 sm:p-12 lg:p-16 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex rounded-full bg-gradient-to-r from-sky-500/20 to-violet-500/20 px-4 py-2 mb-6"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Join the Community
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white"
          >
            Stay ahead with our
            <span className="block mt-2 bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Weekly Newsletter
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Get curated AI tools, programming tips, study systems, and productivity workflows delivered to your inbox every week. No spam, just practical insights for modern learners.
          </motion.p>

          {/* Newsletter form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="flex-1 px-4 py-3.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder:text-white/50 outline-none focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/20 transition backdrop-blur-sm"
              disabled={submitted}
            />
            <button
              type="submit"
              disabled={submitted}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 text-white font-semibold shadow-lg hover:opacity-95 transition disabled:opacity-50 whitespace-nowrap"
            >
              {submitted ? "✓ Subscribed!" : "Subscribe"}
            </button>
          </motion.form>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-slate-400"
          >
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>No spam</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Unsubscribe anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>5,000+ subscribers</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
