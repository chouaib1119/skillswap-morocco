"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SKILL_CATEGORIES } from "@/types";
import { ArrowRight } from "lucide-react";

const categoryColors: Record<string, string> = {
  technology: "group-hover:border-neon-green/40 group-hover:bg-neon-green/5",
  design: "group-hover:border-neon-cyan/40 group-hover:bg-neon-cyan/5",
  business: "group-hover:border-neon-purple/40 group-hover:bg-neon-purple/5",
  language: "group-hover:border-yellow-400/40 group-hover:bg-yellow-400/5",
  music: "group-hover:border-pink-400/40 group-hover:bg-pink-400/5",
  cooking: "group-hover:border-orange-400/40 group-hover:bg-orange-400/5",
  fitness: "group-hover:border-red-400/40 group-hover:bg-red-400/5",
  art: "group-hover:border-indigo-400/40 group-hover:bg-indigo-400/5",
  writing: "group-hover:border-teal-400/40 group-hover:bg-teal-400/5",
  science: "group-hover:border-blue-400/40 group-hover:bg-blue-400/5",
  crafts: "group-hover:border-amber-400/40 group-hover:bg-amber-400/5",
  other: "group-hover:border-gray-400/40 group-hover:bg-gray-400/5",
};

const categoryCounts: Record<string, number> = {
  technology: 142,
  design: 98,
  business: 76,
  language: 54,
  music: 48,
  cooking: 43,
  fitness: 38,
  art: 35,
  writing: 31,
  science: 24,
  crafts: 19,
  other: 12,
};

export default function SkillCategories() {
  return (
    <section id="categories" className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-black mb-4">
            <span className="text-white">Skills for</span>{" "}
            <span className="neon-text-cyan">Every Passion</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div key={cat.value} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link href={`/explore?category=${cat.value}`} className={`group flex flex-col items-center gap-3 p-5 glass border border-white/5 rounded-2xl transition-all duration-300 cursor-pointer ${categoryColors[cat.value] || ""}`}>
                <span className="text-3xl">{cat.icon}</span>
                <div className="text-center">
                  <p className="text-sm font-semibold text-white/80">{cat.label}</p>
                  <p className="text-xs text-white/30 mt-0.5">{categoryCounts[cat.value] || 0} skills</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
          <Link href="/explore" className="inline-flex items-center gap-2 text-sm text-neon-green font-medium">
            Browse all skills <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
