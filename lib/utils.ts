import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatRelativeTime(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getLevelInfo(xp: number) {
  const levels = [
    { level: 1, minXP: 0, maxXP: 100, title: "Novice" },
    { level: 2, minXP: 100, maxXP: 300, title: "Apprentice" },
    { level: 3, minXP: 300, maxXP: 600, title: "Learner" },
    { level: 4, minXP: 600, maxXP: 1000, title: "Practitioner" },
    { level: 5, minXP: 1000, maxXP: 1500, title: "Skilled" },
    { level: 6, minXP: 1500, maxXP: 2200, title: "Expert" },
    { level: 7, minXP: 2200, maxXP: 3000, title: "Master" },
    { level: 8, minXP: 3000, maxXP: 4000, title: "Grand Master" },
    { level: 9, minXP: 4000, maxXP: 5500, title: "Legend" },
    { level: 10, minXP: 5500, maxXP: Infinity, title: "Grandmaster" },
  ];

  const current = levels.find((l) => xp >= l.minXP && xp < l.maxXP) || levels[levels.length - 1];
  const progress = current.maxXP === Infinity
    ? 100
    : Math.floor(((xp - current.minXP) / (current.maxXP - current.minXP)) * 100);

  return { ...current, progress, xp };
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    technology: "text-neon-green border-neon-green/30 bg-neon-green/10",
    design: "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10",
    business: "text-neon-purple border-neon-purple/30 bg-neon-purple/10",
    language: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
    music: "text-pink-400 border-pink-400/30 bg-pink-400/10",
    cooking: "text-orange-400 border-orange-400/30 bg-orange-400/10",
    fitness: "text-red-400 border-red-400/30 bg-red-400/10",
    art: "text-indigo-400 border-indigo-400/30 bg-indigo-400/10",
    writing: "text-teal-400 border-teal-400/30 bg-teal-400/10",
    science: "text-blue-400 border-blue-400/30 bg-blue-400/10",
    crafts: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    other: "text-gray-400 border-gray-400/30 bg-gray-400/10",
  };
  return colors[category] || colors.other;
}

export function generateUsername(name: string): string {
  return name.toLowerCase().replace(/\s+/g, ".") + Math.floor(Math.random() * 1000);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}
