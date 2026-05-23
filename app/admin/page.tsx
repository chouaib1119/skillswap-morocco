"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Users, Handshake, Star, TrendingUp, AlertTriangle, Settings,
  Search, MoreVertical, ChevronDown, BarChart3, Activity, ArrowLeft
} from "lucide-react";
import { MOCK_USERS, MOCK_EXCHANGES } from "@/lib/mockData";
import { formatDate } from "@/lib/utils";

const adminStats = [
  { label: "Total Users", value: "2,417", delta: "+23 this week", icon: Users, color: "#00ff87" },
  { label: "Active Exchanges", value: "384", delta: "+12 today", icon: Handshake, color: "#06b6d4" },
  { label: "Avg Rating", value: "4.87", delta: "+0.02 this month", icon: Star, color: "#facc15" },
  { label: "Daily Active", value: "847", delta: "+5% vs last week", icon: Activity, color: "#7c3aed" },
];

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [userSearch, setUserSearch] = useState("");

  const filteredUsers = MOCK_USERS.filter((u) =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Admin Sidebar */}
        <aside className="w-56 min-h-screen glass border-r border-white/5 fixed flex flex-col">
          <div className="p-5 border-b border-white/5">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
                <span className="text-white font-bold text-xs">ADM</span>
              </div>
              <span className="font-bold text-sm text-white">Admin Panel</span>
            </Link>
          </div>

          <nav className="p-4 space-y-1 flex-1">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "users", label: "Users", icon: Users },
              { id: "exchanges", label: "Exchanges", icon: Handshake },
              { id: "reports", label: "Reports", icon: AlertTriangle },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? "bg-neon-purple/10 border border-neon-purple/20 text-neon-purple"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-white/5">
            <Link href="/dashboard" className="flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors">
              <ArrowLeft size={15} /> Back to App
            </Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 ml-56 p-6">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-black text-white capitalize">{activeSection}</h1>
              <p className="text-white/30 text-sm">SkillSwap Morocco Administration</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 px-3 py-1.5 glass border border-neon-green/20 text-neon-green text-xs font-mono rounded-lg">
                <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" />
                System Online
              </span>
            </div>
          </div>

          {activeSection === "overview" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {adminStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass border border-white/5 rounded-2xl p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-white/40">{stat.label}</span>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}20` }}>
                        <stat.icon size={16} style={{ color: stat.color }} />
                      </div>
                    </div>
                    <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
                    <p className="text-xs" style={{ color: `${stat.color}80` }}>{stat.delta}</p>
                  </motion.div>
                ))}
              </div>

              {/* Charts placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass border border-white/5 rounded-2xl p-5">
                  <h3 className="font-bold text-white text-sm mb-4">User Growth</h3>
                  <div className="flex items-end gap-1.5 h-32">
                    {[40, 55, 45, 70, 80, 65, 90, 85, 95, 88, 100, 92].map((h, i) => (
                      <div key={i} className="flex-1 bg-neon-green/20 rounded-t hover:bg-neon-green/40 transition-colors cursor-pointer" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-white/20 mt-2">
                    <span>Jan</span><span>Dec</span>
                  </div>
                </div>
                <div className="glass border border-white/5 rounded-2xl p-5">
                  <h3 className="font-bold text-white text-sm mb-4">Skills by Category</h3>
                  <div className="space-y-2">
                    {[
                      { label: "Technology", pct: 35, color: "#00ff87" },
                      { label: "Design", pct: 24, color: "#06b6d4" },
                      { label: "Business", pct: 19, color: "#7c3aed" },
                      { label: "Music", pct: 12, color: "#f472b6" },
                      { label: "Other", pct: 10, color: "#facc15" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3 text-xs">
                        <span className="w-20 text-white/40">{item.label}</span>
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                        </div>
                        <span className="text-white/30 w-8 text-right">{item.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent exchanges */}
              <div className="glass border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-white/5">
                  <h3 className="font-bold text-white text-sm">Recent Exchanges</h3>
                </div>
                <div className="divide-y divide-white/5">
                  {MOCK_EXCHANGES.map((ex) => (
                    <div key={ex._id} className="px-5 py-3 flex items-center gap-4 hover:bg-white/2 transition-colors">
                      <div className="flex items-center gap-2">
                        <Image src={ex.requester.image || ""} alt="" width={28} height={28} className="w-7 h-7 rounded-full" />
                        <span className="text-xs text-white/60">{ex.requester.name}</span>
                      </div>
                      <span className="text-white/20 text-xs">↔</span>
                      <div className="flex items-center gap-2">
                        <Image src={ex.receiver.image || ""} alt="" width={28} height={28} className="w-7 h-7 rounded-full" />
                        <span className="text-xs text-white/60">{ex.receiver.name}</span>
                      </div>
                      <div className="flex-1" />
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        ex.status === "active" ? "bg-neon-green/10 text-neon-green" :
                        ex.status === "pending" ? "bg-yellow-400/10 text-yellow-400" :
                        "bg-white/5 text-white/30"
                      }`}>{ex.status}</span>
                      <span className="text-xs text-white/20">{formatDate(ex.createdAt)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "users" && (
            <div className="space-y-4">
              <div className="flex gap-3 mb-5">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input value={userSearch} onChange={(e) => setUserSearch(e.target.value)} placeholder="Search users..." className="input-cyber w-full pl-9 pr-4 py-3 rounded-xl text-sm" />
                </div>
              </div>
              <div className="glass border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      {["User", "City", "Skills", "Exchanges", "Rating", "Status", ""].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-xs text-white/30 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-white/2 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <Image src={user.image || ""} alt="" width={32} height={32} className="w-8 h-8 rounded-full" />
                            <div>
                              <p className="text-sm text-white font-medium">{user.name}</p>
                              <p className="text-xs text-white/30">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-sm text-white/40">{user.city}</td>
                        <td className="px-5 py-3 text-sm text-white/40">{user.skillsTeach.length} teach / {user.skillsLearn.length} learn</td>
                        <td className="px-5 py-3 text-sm text-white/40">{user.completedExchanges}</td>
                        <td className="px-5 py-3">
                          <span className="flex items-center gap-1 text-sm text-yellow-400">★ {user.rating}</span>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${user.isVerified ? "bg-neon-green/10 text-neon-green" : "bg-white/5 text-white/30"}`}>
                            {user.isVerified ? "Verified" : "Unverified"}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <button className="p-1 text-white/30 hover:text-white transition-colors">
                            <MoreVertical size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === "reports" && (
            <div className="glass border border-white/5 rounded-2xl p-8 text-center">
              <AlertTriangle size={40} className="text-yellow-400 mx-auto mb-4" />
              <h3 className="font-bold text-white text-lg mb-2">No Active Reports</h3>
              <p className="text-white/30 text-sm">The community is behaving well! All reports will appear here.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
