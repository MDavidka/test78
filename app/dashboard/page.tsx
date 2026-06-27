"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore, UserServer } from "@/lib/store";
import { 
  Server, 
  Cpu, 
  Users, 
  MapPin, 
  Copy, 
  Check, 
  Terminal, 
  LogOut, 
  Plus, 
  ShieldCheck, 
  Activity,
  Gamepad2,
  HelpCircle
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { 
    user, 
    isLoggedIn, 
    fetchUser, 
    isLoadingAuth, 
    servers, 
    isLoadingServers, 
    fetchServers, 
    updateServerStatus, 
    logout 
  } = useAppStore();

  const [copiedIp, setCopiedIp] = useState<string | null>(null);

  // Authenticate session and fetch servers
  useEffect(() => {
    fetchUser().then((loggedIn) => {
      if (!isLoggedIn && !loggedIn) {
        router.push("/login");
      }
    });
  }, [isLoggedIn]);

  const handleCopyIp = (ip: string) => {
    navigator.clipboard.writeText(ip);
    setCopiedIp(ip);
    setTimeout(() => setCopiedIp(null), 2000);
  };

  const handlePowerToggle = async (srv: UserServer) => {
    const nextStatus = srv.status === "online" ? "offline" : "online";
    await updateServerStatus(srv.id, nextStatus);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
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

  if (!isLoggedIn || !user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="relative min-h-screen bg-background bg-grid-pattern pb-16">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 h-[350px] w-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Dashboard Top Header */}
      <section className="bg-[#141517] border-b border-border px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Active Database Connected (MongoDB)</span>
            </div>
            <h1 className="text-2xl font-black text-foreground">My Game Servers</h1>
            <p className="text-xs text-muted-foreground">Welcome back, <strong className="text-foreground">{user.email}</strong></p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/minecraft"
              className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity text-xs flex items-center gap-1.5"
            >
              <Plus className="h-4 w-4" />
              <span>Deploy New Node</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </section>

      {/* Servers Grid Workspace */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {isLoadingServers ? (
          <div className="py-20 text-center space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
            <p className="text-xs text-muted-foreground">Syncing servers from MongoDB...</p>
          </div>
        ) : servers.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center max-w-xl mx-auto space-y-6">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
              <Server className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-foreground">No active servers found</h3>
              <p className="text-xs text-muted-foreground">
                You haven't provisioned any game servers yet. Browse our configurations to deploy a high-performance container.
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <Link
                href="/minecraft"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90"
              >
                Host Minecraft
              </Link>
              <Link
                href="/games"
                className="px-4 py-2 rounded-lg border border-border bg-card text-muted-foreground text-xs font-bold hover:bg-muted"
              >
                Other Games
              </Link>
            </div>
          </div>
        ) : (
          /* Servers Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servers.map((srv) => (
              <div
                key={srv.id}
                className="rounded-2xl border border-border bg-card p-5 flex flex-col justify-between hover:border-primary/20 transition-all group relative"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                        {srv.gameId === "minecraft" ? <Server className="h-5 w-5" /> : <Gamepad2 className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {srv.name}
                        </h3>
                        <p className="text-[10px] text-muted-foreground font-semibold uppercase">{srv.gameName}</p>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        srv.status === "online" ? "bg-emerald-500 animate-pulse" :
                        srv.status === "starting" ? "bg-yellow-500 animate-pulse" :
                        "bg-zinc-600"
                      }`} />
                      <span className="text-[10px] font-bold uppercase text-foreground">{srv.status}</span>
                    </div>
                  </div>

                  {/* Server Connection IP */}
                  <div className="p-2.5 rounded-lg bg-muted/40 border border-border/60 flex items-center justify-between gap-3 text-xs font-mono">
                    <span className="truncate text-muted-foreground/90">{srv.ip}</span>
                    <button
                      onClick={() => handleCopyIp(srv.ip)}
                      className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Copy IP"
                    >
                      {copiedIp === srv.ip ? (
                        <Check className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Resource specs */}
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-muted-foreground pt-1 border-t border-border/40">
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-muted-foreground/60">RAM</span>
                      <span className="font-bold text-foreground">{srv.ram}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-muted-foreground/60">Slots</span>
                      <span className="font-bold text-foreground">{srv.slots} Slots</span>
                    </div>
                    <div className="truncate">
                      <span className="block text-[9px] uppercase font-bold text-muted-foreground/60">Location</span>
                      <span className="font-bold text-foreground flex items-center gap-1">
                        <span>{srv.location.flag}</span>
                        <span className="truncate">{srv.location.city}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-border/40 flex gap-2">
                  <button
                    onClick={() => handlePowerToggle(srv)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      srv.status === "online"
                        ? "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/15"
                        : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15"
                    }`}
                  >
                    <Activity className="h-3.5 w-3.5" />
                    <span>{srv.status === "online" ? "Stop Server" : "Start Server"}</span>
                  </button>

                  <Link
                    href={`/panel?id=${srv.id}`}
                    className="flex-1 py-2 rounded-lg bg-secondary text-secondary-foreground border border-border hover:bg-muted text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Terminal className="h-3.5 w-3.5" />
                    <span>Manage Server</span>
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* Support Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 border-t border-border/60">
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center flex-shrink-0">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Need help configuring your database or servers?</h3>
              <p className="text-xs text-muted-foreground">Our technical support team is online 24/7/365 to resolve your queries.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="px-4 py-2 rounded-lg border border-border bg-secondary text-secondary-foreground hover:bg-muted text-xs font-bold transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
}
