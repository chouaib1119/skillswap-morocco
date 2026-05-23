"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useEffect, useState } from "react";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * value));
      if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
    };
    requestAnimationFrame((t) => step(t, t));
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { value: 2400, suffix: "+", label: "Active Users", icon: "👤", color: "text-neon-green" },
  { value: 580, suffix: "+", label: "Skills Listed", icon: "💡", color: "text-neon-cyan" },
  { value: 1240, suffix: "+", label: "Exchanges Done", icon: "🤝", color: "text-neon-purple" },
  { value: 16, suffix: "", label: "Moroccan Cities", icon: "🇲🇦", color: "text-yellow-400" },
];

export default function Stats() {
  return (
    <section className="py-16 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-3xl font-black mb-1 ${stat.color}`}>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/40">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
