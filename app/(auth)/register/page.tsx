"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, ArrowLeft, Check } from "lucide-react";
import { MOROCCAN_CITIES } from "@/types";

const steps = ["Account", "Profile", "Skills"];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    bio: "",
    skillsTeach: [] as string[],
    skillsLearn: [] as string[],
    skillInput: "",
    learnInput: "",
  });

  const update = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const addSkillTeach = () => {
    if (form.skillInput.trim() && !form.skillsTeach.includes(form.skillInput.trim())) {
      setForm((f) => ({ ...f, skillsTeach: [...f.skillsTeach, f.skillInput.trim()], skillInput: "" }));
    }
  };

  const addSkillLearn = () => {
    if (form.learnInput.trim() && !form.skillsLearn.includes(form.learnInput.trim())) {
      setForm((f) => ({ ...f, skillsLearn: [...f.skillsLearn, f.learnInput.trim()], learnInput: "" }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      toast.success("Account created! Welcome to SkillSwap Morocco 🎉");
      await signIn("credentials", {
        email: "demo@skillswap.ma",
        password: "demo123",
        redirect: false,
      });
      router.push("/dashboard");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-background cyber-grid flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative"
      >
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="glass border border-white/8 rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">SS</span>
            </div>
            <h1 className="text-2xl font-black text-white mb-1">Join SkillSwap Morocco</h1>
            <p className="text-white/40 text-sm">Free forever. No credit card needed.</p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step ? "bg-neon-green text-black" : i === step ? "bg-neon-green/20 border border-neon-green text-neon-green" : "bg-white/5 text-white/30"
                }`}>
                  {i < step ? <Check size={12} /> : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i === step ? "text-white" : "text-white/30"}`}>{s}</span>
                {i < steps.length - 1 && <div className={`w-8 h-px ${i < step ? "bg-neon-green" : "bg-white/10"}`} />}
              </div>
            ))}
          </div>

          {step === 0 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 py-3 px-4 glass border border-white/10 hover:border-white/20 rounded-xl text-sm font-medium text-white/80 transition-all">Continue with Google</button>
              <div>
                <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Full Name" className="input-cyber w-full px-4 py-3 rounded-xl text-sm" />
              </div>
              <div>
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Email" className="input-cyber w-full px-4 py-3 rounded-xl text-sm" />
              </div>
              <div>
                <input type={showPass ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="Min 8 characters" className="input-cyber w-full px-4 py-3 rounded-xl text-sm" />
              </div>
              <button onClick={() => setStep(1)} disabled={!form.name || !form.email || form.password.length < 8} className="w-full py-3 bg-neon-green text-black font-bold text-sm rounded-xl disabled:opacity-40">Continue</button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <select value={form.city} onChange={(e) => update("city", e.target.value)} className="input-cyber w-full px-4 py-3 rounded-xl text-sm">
                <option value="">Select your city</option>
                {MOROCCAN_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <textarea value={form.bio} onChange={(e) => update("bio", e.target.value)} placeholder="Bio..." rows={3} className="input-cyber w-full px-4 py-3 rounded-xl text-sm resize-none" />
              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="flex-1 py-3 glass border border-white/10 text-white/60 text-sm rounded-xl">Back</button>
                <button onClick={() => setStep(2)} className="flex-1 py-3 bg-neon-green text-black font-bold text-sm rounded-xl">Continue</button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 glass border border-white/10 text-white/60 text-sm rounded-xl">Back</button>
                <button onClick={handleSubmit} disabled={loading} className="flex-1 py-3 bg-neon-green text-black font-bold text-sm rounded-xl flex items-center justify-center gap-2">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : "Create Account"}
                </button>
              </div>
            </motion.div>
          )}

          <p className="text-center text-xs text-white/30 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-neon-green hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
