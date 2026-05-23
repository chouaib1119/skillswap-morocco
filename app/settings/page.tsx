"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Camera, Save, Loader2, Bell, Shield, Palette, Globe } from "lucide-react";
import { MOCK_USERS } from "@/lib/mockData";
import { MOROCCAN_CITIES } from "@/types";
import toast from "react-hot-toast";

const tabs = [
  { id: "profile", label: "Profile", icon: Globe },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function SettingsPage() {
  const user = MOCK_USERS[0];
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    bio: user.bio || "",
    city: user.city || "",
    github: user.socialLinks?.github || "",
    linkedin: user.socialLinks?.linkedin || "",
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Settings saved successfully!");
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="p-2 glass border border-white/10 text-white/40 hover:text-white rounded-xl transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white">Settings</h1>
            <p className="text-white/30 text-sm">Manage your account preferences</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-48 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? "bg-neon-green/10 border border-neon-green/20 text-neon-green" : "text-white/40 hover:text-white hover:bg-white/5"}`}>
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>
          <div className="flex-1 space-y-5">
            {activeTab === "profile" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                <div className="gloss border border-white/5 rounded-2xl p-6">
                  <h3 className="font-bold text-white mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5">Full Name</label>
                      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-cyber w-full px-4 py-3 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-1.5">City</label>
                      <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input-cyber w-full px-4 py-3 rounded-xl text-sm">
                        {MOROCCAN_CITIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5">Bio</label>
                    <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className="input-cyber w-full px-4 py-3 rounded-xl text-sm resize-none" placeholder="Tell the community about yourself..." />
                  </div>
                </div>
              </motion.div>
            )}
            <button onClick={handleSave} disabled={saving} className="w-full flex items-center justify-center gap-2 py-3 bg-neon-green text-black font-bold rounded-2xl hover:bg-neon-green/90 transition-all shadow-neon disabled:opacity-60">
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
