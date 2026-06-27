"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Gamepad2, Mail, Lock, ArrowRight, ShieldAlert, Check } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register, login } = useAppStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Register account in MongoDB
    const regResult = await register(email, password);
    
    if (regResult.success) {
      // Automatically log them in immediately for supreme UX
      const loginResult = await login(email, password);
      setIsSubmitting(false);
      if (loginResult.success) {
        router.push("/dashboard");
      } else {
        router.push("/login?registered=true");
      }
    } else {
      setIsSubmitting(false);
      setError(regResult.error || "Failed to register account.");
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-background bg-grid-pattern flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[300px] w-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl relative">
        <div className="absolute top-0 right-0 p-3 bg-primary/10 text-primary text-[9px] font-black tracking-widest uppercase rounded-bl-xl border-l border-b border-primary/20">
          📝 REGISTRATION
        </div>

        <div className="text-center space-y-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 mx-auto">
            <Gamepad2 className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-black text-foreground">Create Free Account</h1>
          <p className="text-xs text-muted-foreground">Set up your account and deploy your first server instantly.</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-red-400 flex items-start gap-2 mb-4">
            <ShieldAlert className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-[#141517] text-xs text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground/30"
                placeholder="steve@minecraft.net"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-[#141517] text-xs text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground/30"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-[#141517] text-xs text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground/30"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-95 transition-all text-xs flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin h-3.5 w-3.5 border-b-2 border-current rounded-full" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Register & Deploy Server</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Login here &rarr;
          </Link>
        </p>
      </div>
    </div>
  );
}
