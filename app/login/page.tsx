"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Gamepad2, Mail, Lock, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn, fetchUser, isLoadingAuth } = useAppStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if already logged in
  useEffect(() => {
    fetchUser().then((loggedIn) => {
      if (isLoggedIn || loggedIn) {
        router.push("/dashboard");
      }
    });
  }, [isLoggedIn]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || "Invalid credentials.");
    }
  };

  const handleDemoLogin = async () => {
    setIsSubmitting(true);
    setError(null);
    
    // Create a unique demo email based on timestamp to ensure a fresh MongoDB entry if needed
    const demoEmail = `demo.${Math.floor(Math.random() * 9000) + 1000}@nivle.host`;
    const demoPassword = "password123";

    // Register first
    const regResult = await useAppStore.getState().register(demoEmail, demoPassword);
    if (regResult.success) {
      // Login
      const loginResult = await login(demoEmail, demoPassword);
      if (loginResult.success) {
        router.push("/dashboard");
        return;
      }
    }
    
    // Fallback to static demo login if registration fails
    const fallbackResult = await login("demo@nivle.host", "password123");
    setIsSubmitting(false);
    if (fallbackResult.success) {
      router.push("/dashboard");
    } else {
      setError("Demo server registration failed. Please register a free account manually.");
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto" />
          <p className="text-xs text-muted-foreground">Authenticating session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-background bg-grid-pattern flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[300px] w-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl relative">
        <div className="absolute top-0 right-0 p-3 bg-primary/10 text-primary text-[9px] font-black tracking-widest uppercase rounded-bl-xl border-l border-b border-primary/20">
          🔐 SECURE PORTAL
        </div>

        <div className="text-center space-y-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 mx-auto">
            <Gamepad2 className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-black text-foreground">Log in to Nivle Host</h1>
          <p className="text-xs text-muted-foreground">Access your active game containers and server settings.</p>
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
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Password</label>
              <span className="text-[10px] text-primary hover:underline cursor-pointer">Forgot?</span>
            </div>
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-95 transition-all text-xs flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin h-3.5 w-3.5 border-b-2 border-current rounded-full" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-card px-2 text-muted-foreground font-bold">OR</span></div>
        </div>

        {/* Demo Button */}
        <button
          onClick={handleDemoLogin}
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl border border-primary/20 bg-primary/5 text-primary font-bold hover:bg-primary/10 transition-all text-xs flex items-center justify-center gap-2"
        >
          <Sparkles className="h-4 w-4" />
          <span>Quick Demo Login (No Sign Up Needed)</span>
        </button>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary font-bold hover:underline">
            Register free account &rarr;
          </Link>
        </p>
      </div>
    </div>
  );
}
