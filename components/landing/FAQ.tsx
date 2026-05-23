"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is SkillSwap Morocco completely free?",
    a: "Yes, 100% free. You exchange skills directly with other people.",
  },
  {
    q: "How does the skill matching work?",
    a: "Our algorithm analyzes your 'skills to teach' and 'skills to learn' and finds users with complementary profiles.",
  },
  {
    q: "What if someone doesn't show up for a session?",
    a: "We have a reliability rating system and a dispute system to handle this situation.",
  },
  {
    q: "Can I exchange more than one skill at a time?",
    a: "Absolutely! You can have multiple active exchanges with different people simultaneously.",
  },
  {
    q: "How do sessions happen - online or in-person?",
    a: "Both! You can add a Zoom or Google Meet link for online sessions, or arrange in-person meetings.",
  },
  {
    q: "What are XP points and levels?",
    a: "XP (Experience Points) are earned by completing exchanges, receiving reviews, and maintaining streaks. They unlock levels and badges.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black mb-4">
            <span className="text-white">Got </span>
            <span className="gradient-text">Questions?</span>
          </h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={`glass border rounded-2xl overflow-hidden transition-all duration-200 ${open === i ? "border-neon-green/30" : "border-white/5"}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                <span className={`font-semibold text-sm sm:text-base transition-colors ${open === i ? "text-neon-green" : "text-white/80"}`}>{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={18} className={open === i ? "text-neon-green" : "text-white/30"} />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                    <div className="px-6 pb-5 text-sm text-white/50 leading-relaxed border-t border-white/5 pt-4">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
