"use client";

import Link from "next/link";
import { Github, Twitter, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = {
  Platform: [
    { label: "Explore Skills", href: "/explore" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Categories", href: "/#categories" },
    { label: "Leaderboard", href: "/leaderboard" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Community", href: "/community" },
    { label: "Contact Us", href: "/contact" },
    { label: "Report a Bug", href: "/report" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neon-green to-neon-cyan flex items-center justify-center">
                <span className="text-black font-bold">SS</span>
              </div>
              <span className="font-bold text-lg gradient-text">SkillSwap Morocco</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              Morocco&apos;s first skill-exchange platform. Teach what you know, learn what you love. 
              Connect with talented people across Morocco and grow together.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 glass border border-white/10 rounded-lg flex items-center justify-center text-white/40 hover:text-neon-green hover:border-neon-green/30 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white/80 mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-neon-green transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} SkillSwap Morocco. Made with ❤️ in Morocco.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
            <span className="text-xs text-neon-green/60 font-mono">1,247 skills being exchanged right now</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
