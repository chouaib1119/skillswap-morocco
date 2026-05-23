"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { MOCK_USERS } from "@/lib/mockData";
import { getCategoryColor } from "@/lib/utils";

export default function FeaturedUsers() {
  const featured = MOCK_USERS.slice(0, 4);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <h2 className="text-3xl sm:text-5xl font-black">
              <span className="text-white">Meet the</span>{" "}
              <span className="gradient-text-purple">Community</span>
            </h2>
          </div>
          <Link href="/explore" className="flex items-center gap-2 text-sm text-white/40 hover:text-neon-green transition-colors">
            See all members <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((user, i) => (
            <motion.div key={user._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}>
              <Link href={`/profile/${user.username}`}>
                <div className="glass border border-white/5 hover:border-neon-green/20 rounded-2xl p-5 transition-all duration-300 h-full cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10">
                        <Image src={user.image || ""} alt={user.name} width={56} height={56} className="object-cover" />
                      </div>
                      {user.isOnline && <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-neon-green rounded-full border-2 border-background" />}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star size={13} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-white">{user.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-white group-hover:text-neon-green transition-colors mb-1">{user.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-white/40 mb-3">
                    <MapPin size={11} /> {user.city}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {user.skillsTeach.slice(0, 2).map((skill) => (
                      <span key={skill.name} className={`tag ${getCategoryColor(skill.category)}`}>{Skill.name}</span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/30">
                    <span>{user.completedExchanges} swaps</span>
                    <span className="font-mono text-neon-purple/60">Lvl {user.level}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
