"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Amine Benkirane",
    role: "Software Engineer, Casablanca",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    content: "I taught React to a designer and got Figma lessons in return. My apps look 10x better now! SkillSwap Morocco is genuinely revolutionary for the Moroccan tech community.",
    rating: 5,
    skillSwapped: "React.js ↔ Figma",
  },
  {
    name: "Salma Berrada",
    role: "Graphic Designer, Rabat",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
    content: "As a self-taught designer, learning to code felt impossible financially. This platform connected me with a developer who taught me JavaScript for free in exchange for branding work!",
    rating: 5,
    skillSwapped: "Branding ↔ JavaScript",
  },
  {
    name: "Omar El Fadl",
    role: "Chef & Food Blogger, Fès",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    content: "Exchanged traditional Moroccan cooking lessons for SEO and digital marketing skills. My restaurant website now gets 3x more traffic. The community here is incredibly supportive.",
    rating: 5,
    skillSwapped: "Moroccan Cuisine ↔ SEO",
  },
  {
    name: "Houda Tahiri",
    role: "Music Teacher, Marrakech",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
    content: "I've been teaching piano for 8 years and never thought I'd learn video editing. Found an amazing swap partner who turned my teaching videos into professional content!",
    rating: 5,
    skillSwapped: "Piano ↔ Video Editing",
  },
  {
    name: "RacHIdt Ouhilal",
    role: "Personal Trainer, Agadir",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    content: "Swapped fitness coaching for English lessons. My international client base doubled after improving my communication skills.",
    rating: 5,
    skillSwapped: "Fitness ↔ English",
  },
  {
    name: "Zineb Fassi",
    role: "Marketing Manager, Tanger",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
    content: "The platform is beautiful, easy to use, and the community is genuine. It feels like a movement, not just an app.",
    rating: 5,
    skillSwapped: "Marketing ↔ Photography",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-surface/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black mb-4">
            <span className="text-white">Real Stories from</span><br />
            <span className="text-yellow-400">Real Swappers</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300 relative">
              <Quote size={24} className="text-neon-green/20 absolute top-5 right-5" />
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-5">{t.content}</p>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neon-green/10 border border-neon-green/20 text-neon-green text-xs font-mono mb-5">{t.skillSwapped}</div>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                  <Image src={t.image} alt={t.name} width={40} height={40} className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/30">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
