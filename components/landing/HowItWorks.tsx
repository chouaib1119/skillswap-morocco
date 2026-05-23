"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, Handshake, Star } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Profile",
    description: "Sign up and list the skills you can teach and the skills you want to learn. Add your city, bio, and experience level.",
    color: "neon-green",
    glow: "rgba(0,255,135,0.2)",
  },
  {
    icon: Search,
    step: "02",
    title: "Discover Matches",
    description: "Our smart algorithm finds people whose skills align perfectly with yours. Browse profiles, filter by city or category.",
    color: "neon-cyan",
    glow: "rgba(6,182,212,0.2)",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Send a Swap Request",
    description: "Found your match? Send a skill-swap request with a message. Once accepted, schedule your first session.",
    color: "neon-purple",
    glow: "rgba(124,58,237,0.2)",
  },
  {
    icon: Star,
    step: "04",
    title: "Learn & Rate",
    description: "Complete sessions, earn XP points, unlock badges, and leave reviews. Level up in the SkillSwap Morocco community.",
    color: "yellow-400",
    glow: "rgba(250,204,21,0.2)",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-neon-green/60 tracking-widest uppercase mb-4 px-3 py-1 glass border border-neon-green/20 rounded-full">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-5xl font-black mb-4">
            <span className="text-white">Four Steps to</span>{" "}
            <span className="gradient-text">Your First Swap</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Getting started is simple. No credit card, no fees. Just skills and a willingness to learn.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-14 left-[12%] right-[12%] h-px bg-gradient-to-r from-neon-green/20 via-neon-cyan/20 to-neon-purple/20 via-yellow-400/20" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="relative group"
            >
              <div className="glass border border-white/5 group-hover:border-white/10 rounded-2xl p-6 transition-all duration-300 h-full">
                {/* Step number */}
                <div className="text-xs font-mono text-white/20 mb-4">{step.step}</div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative"
                  style={{ background: step.glow }}
                >
                  <step.icon
                    size={22}
                    className={`text-${step.color}`}
                    style={{ color: step.color === "neon-green" ? "#00ff87" : step.color === "neon-cyan" ? "#06b6d4" : step.color === "neon-purple" ? "#7c3aed" : "#facc15" }}
                  />
                </div>

                <h3 className="font-bold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
