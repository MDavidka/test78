"use client";

import React, { useState } from "react";
import { LOCATIONS, ServerLocation } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { 
  Wifi, 
  Copy, 
  Check, 
  Activity, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Globe, 
  Server,
  Play,
  Clock
} from "lucide-react";

export default function NetworkPage() {
  const { pings, startPingTest } = useAppStore();
  const [copiedIp, setCopiedIp] = useState<string | null>(null);

  const handleCopyIp = (ip: string) => {
    navigator.clipboard.writeText(ip);
    setCopiedIp(ip);
    setTimeout(() => setCopiedIp(null), 2000);
  };

  const handlePingAll = () => {
    LOCATIONS.forEach((loc) => {
      startPingTest(loc.id);
    });
  };

  const getPingColor = (ping: number | string | null | "testing") => {
    if (ping === "testing") return "text-yellow-500";
    if (ping === null || ping === undefined) return "text-muted-foreground";
    const num = ping as number;
    if (num < 40) return "text-emerald-500 font-extrabold";
    if (num < 100) return "text-yellow-500 font-bold";
    return "text-red-400 font-bold";
  };

  return (
    <div className="relative min-h-screen bg-background bg-grid-pattern pb-16">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
          <Globe className="h-3.5 w-3.5" />
          <span>Multi-Homed Tier-1 Bandwidth Providers</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Global Network Latency
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Test your connection to our global server nodes. We operate low-latency routing tables powered by Anycast DNS and Tier-1 carriers.
        </p>
      </section>

      {/* Ping Test Workspace */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur p-6 sm:p-8 shadow-2xl space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <h2 className="text-lg font-bold text-foreground">Interactive Ping Tool</h2>
              <p className="text-xs text-muted-foreground">Simulate network packets traveling from your browser to our datacenters.</p>
            </div>
            <button
              onClick={handlePingAll}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity text-xs flex items-center justify-center gap-2"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Ping All Locations</span>
            </button>
          </div>

          {/* Locations Latency List */}
          <div className="space-y-3">
            {LOCATIONS.map((loc) => {
              const currentPing = pings[loc.id];
              return (
                <div
                  key={loc.id}
                  className="p-4 rounded-xl border border-border bg-[#141517] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 group hover:border-primary/20 transition-all"
                >
                  {/* Location Info */}
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{loc.flag}</span>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{loc.city}, {loc.country}</h3>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{loc.region}</p>
                    </div>
                  </div>

                  {/* Public IP */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground/80 bg-muted/40 border border-border/60 px-3 py-1.5 rounded-lg">
                      {loc.ip}
                    </span>
                    <button
                      onClick={() => handleCopyIp(loc.ip)}
                      className="p-2 rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      aria-label="Copy IP"
                    >
                      {copiedIp === loc.ip ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Ping Results & Trigger */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-border/40 sm:border-none pt-3 sm:pt-0">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground/60" />
                      <span className="text-xs text-muted-foreground">Latency:</span>
                      <span className={`text-sm font-mono ${getPingColor(currentPing)}`}>
                        {currentPing === "testing" && (
                          <span className="flex items-center gap-1.5">
                            <span className="animate-spin h-3.5 w-3.5 border-b-2 border-primary rounded-full" />
                            <span>Testing...</span>
                          </span>
                        )}
                        {typeof currentPing === "number" && `${currentPing} ms`}
                        {currentPing === undefined && "Not tested"}
                      </span>
                    </div>

                    <button
                      onClick={() => startPingTest(loc.id)}
                      disabled={currentPing === "testing"}
                      className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground border border-border text-xs font-bold hover:bg-muted hover:text-foreground transition-all flex items-center gap-1.5"
                    >
                      <Activity className="h-3.5 w-3.5" />
                      <span>Test Ping</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-muted/20 border border-border/40 text-[11px] text-muted-foreground leading-relaxed">
            <strong>How to run a manual ping:</strong> Open your local terminal or command prompt and type <code className="text-primary font-bold">ping {LOCATIONS[0].ip}</code>. This will query our Dallas datacenter directly from your computer network interface for an exact real-world route calculation.
          </div>
        </div>
      </section>

      {/* Network Architecture Details */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border/60">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
            Premium Network Infrastructure
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Nivle Host operates on multi-homed Tier-1 redundant network uplinks to guarantee maximum uptime and optimal routing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">10 Gbps Port Uplinks</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every hosting node is equipped with premium 10 Gbps redundant fiber uplinks. This prevents bandwidth bottlenecks even during periods of heavy player connection spikes.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">12 Tbps+ DDoS Mitigation</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our network filters UDP/TCP query attacks at the edge before they hit our nodes. Game traffic remains completely unaffected during active DDoS incidents.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
              <Server className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">Inteligent Anycast DNS</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our Anycast routing DNS tables automatically resolve your subdomain to the geographically nearest server node, optimizing player handshake speeds.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
