"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard, Users, MessageSquare, Calendar, Settings, Bell, Star,
  TrendingUp, Zap, Award, ChevronRight, Clock, Check, X, Plus, Search, LogOut
} from "lucide-react";
import { signOut } from "next-auth/react";
import { MOCK_EXCHANGES, MOCK_NOTIFICATIONS, MOCK_USERS } from "@/lib/mockData";
import { formatRelativeTime, getCategoryColor, getLevelInfo } from "@/lib/utils";
import toast from "react-hot-toast";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: Users, label: "Explore", href: "/explore" },
  { icon: MessageSquare, label: "Messages", href: "/chat", badge: 3 },
  { icon: Calendar, label: "Sessions", href: "/sessions" },
  { icon: Star, label: "Reviews", href: "/reviews" },
  { icon: Award, label: "Badges", href: "/badges" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"active" | "pending" | "completed">("active");
  const [notifOpen, setNotifOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentUser = MOCK_USERS[0];
  const levelInfo = getLevelInfo(currentUser.xp);
  const unreadNotifs = MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length;

  const filteredExchanges = MOCK_EXCHANGES.filter((e) => {
    if (activeTab === "active") return e.status === "active";
    if (activeTab === "pending") return e.status === "pending";
    return e.status === "completed";
  });

  const stats = [
    { label: "Active Swaps", value: "3", icon: Zap, color: "neon-green", delta: "+1 this week" },
    { label: "Total XP", value: currentUser.xp.toLocaleString(), icon: TrendingUp, color: "neon-cyan", delta: "+120 today" },
    { label: "Sessions Done", value: "24", icon: Calendar, color: "neon-purple", delta: "+2 this month" },
    { label: "Rating", value: `${currentUser.rating}★`, icon: Star, color: "yellow-400", delta: `${currentUser.reviewCount} reviews` },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 glass border-r border-white/5 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-green to-neon-cyan flex items-center justify-center">
              <span className="text-black font-bold text-sm">SS</span>
            </div>
            <span className="font-bold gradient-text">SkillSwap</span>
          </Link>
        </div>
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-neon-green/20">
                <Image src={currentUser.image || ""} alt={currentUser.name} width={40} height={40} className="object-cover" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{session?.user?.name || currentUser.name}</p>
              <p className="text-xs text-neon-green/60">Lvl {levelInfo.level} - {levelInfo.title}</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${link.active ? "bg-neon-green/10 text-neon-green" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
              <link.icon size={17} />
              {link.label}
              {link.badge && <span className="ml-auto w-5 h-5 bg-neon-green text-black text-xs font-bold rounded-full flex items-center justify-center">{link.badge}</span>}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all">
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 lg:ml-64 min-h-screen">
        <header className="sticky top-0 z-30 glass border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-white/40">
              <LayoutDashboard size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-white">Dashboard</h1>
              <p className="text-xs text-white/30">Welcome back, {session?.user?.name || currentUser.name}!</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/explore" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/20 text-neon-green text-sm rounded-xl">
              <Plus size={15} /> New Swap
            </Link>
            <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 text-white/40">
              <Bell size={20} />
              {unreadNotifs > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-neon-green text-black text-xs font-bold rounded-full flex items-center justify-center">{unreadNotifs}</span>}
            </button>
          </div>
        </header>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="gloss border border-white/5 rounded-2xl p-5">
                <p className="text-xs text-white/40">{stat.label}</p>
                <p className="text-2xl font-black text-white mt-1">{stat.value}</p>
                <p className="text-xs text-white/30 mt-0.5">{stat.delta}</p>
              </motion.div>
            ))}
          </div>
          <div className="glass border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <h2 className="font-bold text-white">My Exchanges</h2>
            </div>
            <div className="flex border-b border-white/5">
              {(["active", "pending", "completed"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-xs font-medium capitalize transition-colors ${activeTab === tab ? "text-neon-green border-b-2 border-neon-green" : "text-white/30"}`}>{tab}</button>
              ))}
            </div>
            <div className="divide-y-divide-white/5">
              {filteredExchanges.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-white/20">No {activeTab} exchanges</p>
                </div>
              ) : (
                filteredExchanges.map((ex) => (
                  <div key={ex._id} className="p-4 hover:bg-white/2 transition-colors">
                    <p className="text-sm text-white">{ex.requesterSkill.name} ↔;{ex.receiverSkill.name}</p>
                    <p className="text-xs text-white/40 mt-0.5">{ex.status}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
