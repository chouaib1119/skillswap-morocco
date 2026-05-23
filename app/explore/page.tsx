"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MOCK_USERS, TRENDING_SKILLS } from "@/lib/mockData";
import { SKILL_CATEGORIES, MOROCCAN_CITIES } from "@/types";
import { getCategoryColor, getLevelInfo } from "@/lib/utils";
import { Search, SlidersHorizontal, Star, MapPin, TrendingUp, X, Zap } from "lucide-react";

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [onlineOnly, setOnlineOnly] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_USERS.filter((u) => {
      const allSkills = [...u.skillsTeach, ...u.skillsLearn].map((s) => s.name.toLowerCase());
      const matchQuery = !query || u.name.toLowerCase().includes(query.toLowerCase()) || allSkills.some((s) => s.includes(query.toLowerCase()));
      const matchCity = !selectedCity || u.city === selectedCity;
      const matchCategory = !selectedCategory || [...u.skillsTeach, ...u.skillsLearn].some((s) => s.category === selectedCategory);
      const matchVerified = !verifiedOnly || u.isVerified;
      const matchOnline = !onlineOnly || u.isOnline;
      return matchQuery && matchCity && matchCategory && matchVerified && matchOnline;
    });
  }, [query, selectedCity, selectedCategory, verifiedOnly, onlineOnly]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-4xl font-black text-white mb-2">Explore <span className="gradient-text">Skills</span></h1>
            <p className="text-white/40">Find your perfect skill-swap partner across Morocco.</p>
          </motion.div>
          <div className="flex gap-6">
            <div className="flex-1">
              <p className="text-sm text-white/30 mb-4">{filtered.length} people found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((user, i) => (
                  <motion.div key={user._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}>
                    <Link href={`/profile/${user.username}`}>
                      <div className="glass border border-white/5 hover:border-neon-green/20 rounded-2xl p-5 h-full cursor-pointer group transition-all duration-300">
                        <div className="flex items-start gap-3 mb-4">
                          <Image src={user.image || ""} alt={user.name} width={52} height={52} className="w-13 h-13 rounded-2xl border border-white/10 object-cover" />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-white text-sm truncate">{user.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-white/40 mt-0.5">
                              <MapPin size={10} />{user.city}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
