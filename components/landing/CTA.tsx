"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neon-green/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass border border-neon-green/20 rounded-3xl p-12 relative overflow-hidden">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 border border-neon-green/20 text-neon-green text-sm font-medium mb-8">
            <Zap size={14} /> Join the Movement
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl sm:text-6xl font-black mb-6 leading-tight">
            <span className="text-white">Your next skill is</span><br />
            <span className="gradient-text">one swap away.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg text-white/40 max-w-xl mx-auto mb-10">
            Join 2,400+ Moroccans already exchanging skills. Free forever.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="group flex items-center gap-2 px-10 py-4 bg-neon-green text-black font-bold text-lg rounded-2xl hover:bg-neon-green/90 transition-all duration-200 shadow-neon">
              Create Free Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/explore" className="flex items-center gap-2 px-8 py-4 glass border border-white/10 text-white/70 font-semibold text-base rounded-2xl hover:border-neon-green/30 hover:text-white transition-all">
              Explore Skills First
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
