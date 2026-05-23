"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="glass border border-white/8 rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-black text-white mb-6">Welcome back</h1>
        <Link href="/register" className="text-neon-green">Create account</Link>
      </div>
    </div>
  );
}
