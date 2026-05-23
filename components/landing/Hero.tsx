"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import Image from "next/image";
import { MOCK_USERS } from "@/lib/mockData";

const roles = ["React Developer", "UI/UX Designer", "Music Producer", "Yoga Instructor", "Chef", "Data Scientist", "Photographer"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const current = roles[roleIndex];
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid moroccan-pattern pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-neon-green/20 text-neon-green text-sm font-medium mb-8">
          <Sparkles size={14} />
          Morocco's #1 Skill Exchange Platform
          <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
          <span className="text-white">Teach.</span> <span className="gradient-text">Learn.</span> <span className="text-white">Grow.</span>
          <br />
          <span className="text-white/30 text-3xl sm:text-4xl lg:text-5xl font-bold">No Money. Just <span className="neon-text">Skills.</span></span>
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="text-xl sm:text-2xl text-white/50 mb-4 font-mono h-8">
          Find a <span className="text-neon-cyan border-r-2 border-neon-cyan">{displayed}</span>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg text-white/40 max-w-2xl mx-auto mb-10">
          Connect with talented people across Morocco. Exchange your expertise for something new. No fees — just pure, community-driven learning.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/register" className="group flex items-center gap-2 px-8 py-4 bg-neon-green text-black font-bold text-base rounded-2xl hover:bg-neon-green/90 transition-all duration-200 shadow-neon">
            Start Swapping Free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/explore" className="flex items-center gap-2 px-8 py-4 glass border border-white/10 text-white/80 font-semibold text-base rounded-2xl hover:border-neon-green/30 hover:text-neon-green transition-all duration-200">
            <Users size={18} /> Explore Skills
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
