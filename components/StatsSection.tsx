"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface StatsProps {
  totalArticles: number;
  totalCategories: number;
  estimatedReaders?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export function StatsSection({ totalArticles, totalCategories, estimatedReaders = 2500 }: StatsProps) {
  const stats = [
    {
      value: totalArticles,
      label: "Articles Published",
      icon: "📚",
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: totalCategories,
      label: "Learning Categories",
      icon: "🎯",
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "120+",
      label: "Topics Covered",
      icon: "🔬",
      color: "from-green-500 to-emerald-500",
    },
    {
      value: `${Math.round(estimatedReaders / 100)}k+`,
      label: "Active Readers",
      icon: "👥",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-violet-500/5" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
            By The Numbers
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-[color:var(--foreground)]">
            A learning platform built for scale
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-soft transition hover:border-indigo-500/35 hover:shadow-soft-lg hover:-translate-y-1">
                {/* Background gradient accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition duration-300`} />

                {/* Content */}
                <div className="relative space-y-4">
                  <div className="text-4xl">{stat.icon}</div>
                  <div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="mt-2 text-sm font-semibold text-[color:var(--muted)]">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call-to-action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/5 to-violet-600/5 p-8 text-center sm:p-12"
        >
          <h3 className="text-2xl font-bold text-[color:var(--foreground)]">
            Join thousands learning AI & tech
          </h3>
          <p className="mt-3 text-[color:var(--muted)]">
            Get weekly guides, tool reviews, and study workflows delivered straight to your inbox.
          </p>
          <div className="mt-6">
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 text-white font-semibold shadow-soft-lg hover:opacity-95 transition"
            >
              Subscribe Now
              <span>→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
