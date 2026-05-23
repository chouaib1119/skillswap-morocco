"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MOCK_LEADERBOARD } from "@/lib/mockData";
import { getLevelInfo } from "@/lib/utils";
import { Trophy, Star, Handshake, Zap } from "lucide-react";

const rankStyles: Record<number, { bg: string; text: string; icon: string }> = {
  1: { bg: "bg-yellow-400/10 border-yellow-400/30", text: "text-yellow-400", icon: "🥇" },
  2: { bg: "bg-gray-300/10 border-gray-300/30", text: "text-gray-300", icon: "🥈" },
  3: { bg: "bg-orange-400/10 border-orange-400/30", text: "text-orange-400", icon: "🥉" },
};

export default function LeaderboardPage() {
  const top3 = MOCK_LEADERBOARD.slice(0, 3);
  const rest = MOCK_LEADERBOARD.slice(3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-yellow-400/20 text-yellow-400 text-sm font-medium mb-6">
              <Trophy size={14} /> Community Leaderboard
            </div>
            <h1 className="text-4xl font-black text-white mb-2">
              Top <span className="text-yellow-400">Swappers</span>
            </h1>
            <p className="text-white/40">Morocco&apos;s most active skill exchangers this month.</p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
