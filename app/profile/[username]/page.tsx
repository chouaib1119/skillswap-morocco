"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MOCK_USERS, MOCK_REVIEWS } from "@/lib/mockData";
import { getCategoryColor, getLevelInfo, formatDate } from "@/lib/utils";
import {
  MapPin, Star, Github, Linkedin, Twitter, Globe, MessageSquare,
  Handshake, Award, Calendar, Check
} from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage({ params }: { params: { username: string } }) {
  const [activeTab, setActiveTab] = useState<"skills" | "reviews" | "badges">("skills");
  const user = MOCK_USERS.find((u) => u.username === params.username) || MOCK_USERS[0];
  const levelInfo = getLevelInfo(user.xp);

  const handleSwapRequest = () => {
    toast.success(`Swap request sent to ${user.name}!`, { icon: "🤝" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-black text-white mb-2">{user.name}</h1>
          <p className="text-white/40">{user.bio}</p>
          <button onClick={handleSwapRequest} className="btn-cyber mt-4">Request Swap</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
