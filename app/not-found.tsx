"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background cyber-grid flex items-center justify-center px-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center relative"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="text-8xl mb-6"
        >
          🤖
        </motion.div>

        <div className="font-mono text-neon-green/60 text-sm mb-2">ERROR_404</div>
        <h1 className="text-6xl font-black text-white mb-4">Page Not Found</h1>
        <p className="text-white/40 text-lg mb-8 max-w-md mx-auto">
          Looks like this skill swap went to the wrong address. Let&apos;s get you back on track.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 transition-all shadow-neon"
          >
            <Home size={18} /> Go Home
          </Link>
          <Link
            href="/explore"
            className="flex items-center gap-2 px-6 py-3 glass border border-white/10 text-white/60 font-medium rounded-xl hover:border-white/20 transition-all"
          >
            Explore Skills
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
