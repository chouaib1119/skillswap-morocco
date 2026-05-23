"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Bell, LogOut, User, Settings, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { getInitials } from "@/lib/utils";

export default function Navbar() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Explore", href: "/explore" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Categories", href: "/#categories" },
    { label: "Leaderboard", href: "/leaderboard" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/5 py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-green to-neon-cyan flex items-center justify-center">
            <span className="text-black font-bold text-sm">SS</span>
          </div>
          <span className="font-bold text-lg">
            <span className="gradient-text">SkillSwap</span>
            <span className="text-white/60 ml-1 text-sm font-normal">Morocco</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-neon-green transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <>
              <Link href="/dashboard" className="relative p-2 text-white/50 hover:text-neon-green transition-colors">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-neon-green rounded-full" />
              </Link>
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-green/30 to-neon-cyan/30 border border-neon-green/30 flex items-center justify-center overflow-hidden">
                    {session.user?.image ? (
                      <Image src={session.user.image} alt="avatar" width={32} height={32} className="rounded-full" />
                    ) : (
                      <span className="text-xs font-bold text-neon-green">{getInitials(session.user?.name || "U")}</span>
                    )}
                  </div>
                  <ChevronDown size={14} className="text-white/40" />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 glass border border-white/10 rounded-xl overflow-hidden shadow-xl"
                    >
                      <div className="p-3 border-b border-white/5">
                        <p className="text-sm font-medium text-white">{session.user?.name}</p>
                        <p className="text-xs text-white/40 truncate">{session.user?.email}</p>
                      </div>
                      {[
                        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
                        { label: "Profile", href: "/profile/me", icon: User },
                        { label: "Settings", href: "/settings", icon: Settings },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <item.icon size={14} />
                          {item.label}
                        </Link>
                      ))}
                      <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 transition-colors border-t border-white/5"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-white/60 hover:text-white transition-colors font-medium px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-sm font-semibold px-5 py-2 rounded-xl bg-neon-green text-black hover:bg-neon-green/90 transition-all duration-200 shadow-neon"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-white/60 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-sm text-white/60 hover:text-neon-green transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
                {session ? (
                  <>
                    <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-white/60">Dashboard</Link>
                    <button onClick={() => signOut()} className="text-left py-2 text-sm text-red-400">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-white/60">Sign In</Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className="block text-center py-2 text-sm font-semibold rounded-xl bg-neon-green text-black"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
