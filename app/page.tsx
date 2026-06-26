"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Shield, 
  Cpu, 
  Zap, 
  Clock, 
  ArrowRight, 
  MapPin, 
  Star, 
  Activity, 
  HardDrive, 
  Terminal, 
  Gamepad2, 
  ChevronRight,
  Sparkles,
  Server
} from "lucide-react";
import { OTHER_GAMES, LOCATIONS, REVIEWS } from "@/lib/data";

export default function HomePage() {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const stats = [
    { label: "Uptime SLA", value: "99.99%", icon: Clock, desc: "Guaranteed by redundant power & hardware" },
    { label: "Average Provisioning", value: "< 45s", icon: Zap, desc: "Instant container deployment" },
    { label: "DDoS Capacity", value: "12+ Tbps", icon: Shield, desc: "Always-on multi-layered mitigation" },
    { label: "Hardware Standard", value: "Ryzen 9", icon: Cpu, desc: "Clock speeds up to 5.7GHz" },
  ];

  return (
    <div className="relative min-h-screen bg-background bg-grid-pattern">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24 lg:px-8">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Instant Setup Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Minecraft & Game Servers Online Instantly</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:leading-[1.1] text-balance">
            Extreme Performance <br />
            <span className="text-primary">Game Server Hosting</span>
          </h1>

          <p className="text-base text-muted-foreground sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Stop lagging. Run your Minecraft networks, modpacks, and multiplayer game servers on premium Ryzen 9 7950X3D nodes with enterprise NVMe storage and 12Tbps+ DDoS defense.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/minecraft"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-center hover:opacity-95 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              <Server className="h-5 w-5" />
              <span>Host Minecraft Server</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/panel"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-bold text-center border border-border hover:bg-muted/80 transition-all flex items-center justify-center gap-2"
            >
              <Terminal className="h-5 w-5 text-primary" />
              <span>Try Control Panel</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 group"
              >
                <div className="absolute top-0 right-0 h-16 w-16 translate-x-4 -translate-y-4 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors" />
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/10">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-foreground tracking-tight">{stat.value}</p>
                    <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase">{stat.label}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground/80 leading-relaxed">{stat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Game Catalog Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
              Supported Game Servers
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              We offer specialized game templates pre-configured for instant launch. Select your game below to view real-time slot pricing.
            </p>
          </div>
          <Link
            href="/games"
            className="text-xs font-bold text-primary flex items-center gap-1.5 hover:underline"
          >
            <span>View All Supported Games</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Featured Minecraft Card */}
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card p-6 flex flex-col justify-between group shadow-lg shadow-primary/5 min-h-[320px]">
            <div className="absolute top-0 right-0 p-3 bg-primary/10 text-primary text-[10px] font-black tracking-wider uppercase rounded-bl-xl border-l border-b border-primary/20">
              ⚡ MOST POPULAR
            </div>
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Server className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                  Minecraft Server Hosting
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Host Vanilla, Paper, Purpur, Forge, or Fabric. Seamless 1-click modpack installs, free subdomains, and custom performance tuning.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="px-2 py-0.5 rounded bg-muted text-[10px] text-muted-foreground font-semibold">Ryzen 9 7950X3D</span>
                <span className="px-2 py-0.5 rounded bg-muted text-[10px] text-muted-foreground font-semibold">1-Click Modpacks</span>
                <span className="px-2 py-0.5 rounded bg-muted text-[10px] text-muted-foreground font-semibold">Free Subdomain</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <div>
                <span className="text-[10px] text-muted-foreground block uppercase font-bold">Starting at</span>
                <span className="text-lg font-black text-foreground">$4.99<span className="text-xs font-normal text-muted-foreground">/mo</span></span>
              </div>
              <Link
                href="/minecraft"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity"
              >
                Configure Server
              </Link>
            </div>
          </div>

          {/* Other Games Grid */}
          {OTHER_GAMES.slice(0, 5).map((game) => (
            <div
              key={game.id}
              className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 flex flex-col justify-between group hover:border-primary/30 transition-all min-h-[320px]"
            >
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary border border-border group-hover:border-primary/20 transition-all">
                  <Gamepad2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {game.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {game.features.slice(0, 3).map((feat, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-muted text-[10px] text-muted-foreground font-semibold">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold">Starting at</span>
                  <span className="text-lg font-black text-foreground">${game.basePrice}<span className="text-xs font-normal text-muted-foreground">/mo</span></span>
                </div>
                <Link
                  href={`/games?select=${game.id}`}
                  className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-xs font-bold border border-border hover:bg-muted hover:text-foreground transition-all"
                >
                  Configure Server
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extreme Hardware Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border/60">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
              <Cpu className="h-3.5 w-3.5" />
              <span>Enterprise Hardware Only</span>
            </div>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
              Engineered for Ultimate Speed. Zero Overselling.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Many budget hosting providers pack hundreds of game servers onto outdated, low-frequency Intel Xeon chips. This results in heavy TPS drops, lag spikes, and slow chunk rendering.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              At Nivle Host, we use dedicated, high-frequency **AMD Ryzen 9** cores on every single node. Combined with PCIe Gen5 NVMe SSDs and DDR5 memory, your server gets unmatched single-thread performance.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-primary">
                  <Activity className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Ryzen 9 7950X3D Core Clock</h4>
                  <p className="text-xs text-muted-foreground">Massive 3D V-Cache heavily accelerates Java operations and game tick calculations.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-primary">
                  <HardDrive className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Enterprise PCIe Gen5 NVMe Storage</h4>
                  <p className="text-xs text-muted-foreground">Read/write speeds up to 14,000 MB/s. Say goodbye to lag spikes during world generation or chunk loading.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Graphical Hardware Comparison */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Single-Thread Performance Comparison
            </h3>
            
            <div className="space-y-4">
              {/* Ryzen 9 */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-foreground flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    AMD Ryzen 9 7950X3D (Nivle Host)
                  </span>
                  <span className="font-extrabold text-primary">5.7 GHz (100%)</span>
                </div>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-full" />
                </div>
              </div>

              {/* Ryzen 9 5900X */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-muted-foreground flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground"></span>
                    AMD Ryzen 9 5900X (Standard Host)
                  </span>
                  <span className="font-bold text-muted-foreground">4.8 GHz (78%)</span>
                </div>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-muted-foreground/60 rounded-full w-[78%]" />
                </div>
              </div>

              {/* Intel Xeon */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-muted-foreground flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground"></span>
                    Intel Xeon E-2288G (Budget Host)
                  </span>
                  <span className="font-bold text-muted-foreground">3.7 GHz (45%)</span>
                </div>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-muted-foreground/30 rounded-full w-[45%]" />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 border border-border/40 text-xs text-muted-foreground leading-relaxed">
              <strong>Why clock speed matters:</strong> Game servers (especially Minecraft) run critical tick logic on a **single main thread**. More cores do not prevent server lag; only faster core clock speed and modern instruction architectures do.
            </div>
          </div>
        </div>
      </section>

      {/* Global Network Map Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border/60">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
            Global Enterprise Network
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            We operate five low-latency server datacenters across North America, Europe, Asia, and Oceania. Choose the location closest to your player base.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Map display */}
          <div className="lg:col-span-2 relative aspect-[16/9] w-full rounded-2xl border border-border bg-card overflow-hidden p-4 flex items-center justify-center">
            {/* Simple stylized dots represent a map */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2d2f34_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Render Location Hotspots */}
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onMouseEnter={() => setHoveredLocation(loc.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                className="absolute group"
                style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                aria-label={`Server in ${loc.city}`}
              >
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-background"></span>
                </span>
                
                {/* Tooltip on Hover */}
                {(hoveredLocation === loc.id) && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#141517] border border-primary text-foreground text-xs rounded-lg p-2.5 shadow-xl z-10 w-44 pointer-events-none">
                    <p className="font-bold flex items-center gap-1.5">
                      <span>{loc.flag}</span>
                      <span>{loc.city}, {loc.country}</span>
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{loc.region}</p>
                    <p className="text-[10px] text-primary font-mono mt-1 font-bold">{loc.ip}</p>
                  </div>
                )}
              </button>
            ))}

            <div className="absolute bottom-4 left-4 flex gap-4 text-[10px] text-muted-foreground bg-[#141517]/80 backdrop-blur border border-border rounded-lg p-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>Active Datacenter</span>
              </div>
              <span>Hover node to view details</span>
            </div>
          </div>

          {/* Locations details list */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Our Edge Locations</h3>
            <div className="space-y-2.5">
              {LOCATIONS.map((loc) => (
                <div
                  key={loc.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    hoveredLocation === loc.id
                      ? "border-primary/50 bg-primary/5"
                      : "border-border bg-card hover:border-border/80"
                  }`}
                  onMouseEnter={() => setHoveredLocation(loc.id)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{loc.flag}</span>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">{loc.city}, {loc.country}</h4>
                      <p className="text-[10px] text-muted-foreground">{loc.region}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded font-bold">
                    {loc.ip}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/network"
              className="mt-4 w-full py-2.5 rounded-lg border border-border bg-secondary text-secondary-foreground hover:bg-muted text-xs font-bold text-center block transition-all"
            >
              Run Network Ping Test &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border/60">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
            Trusted by Server Owners
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            See why game creators, network administrators, and friend groups choose Nivle Host for their communities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="h-10 w-10 rounded-full border border-border object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-foreground">{rev.author}</h4>
                  <p className="text-[10px] text-muted-foreground">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Panel CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card p-8 sm:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 h-[300px] w-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
                <Terminal className="h-3.5 w-3.5" />
                <span>Revolutionary Control Panel</span>
              </div>
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
                The Nivle Daemon Panel. Simple. Fast. Powerful.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Take complete control of your server. Our custom control panel loads instantly, features a real-time terminal console, full server stat monitoring, sub-user management, and a 1-click modpack installer.
              </p>
              
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Real-time resource graphs & terminal console logs.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Integrated multi-user access permissions.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Automated scheduled backups & server wipe schedulers.</span>
                </li>
              </ul>

              <div className="pt-2">
                <Link
                  href="/panel"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity text-sm"
                >
                  <Terminal className="h-4 w-4" />
                  <span>Open Live Control Panel Simulator</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Mock panel screen */}
            <div className="rounded-xl border border-border bg-[#0d0e10] overflow-hidden shadow-2xl relative">
              {/* Panel Top Bar */}
              <div className="bg-[#141517] px-4 py-2.5 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[10px] font-mono text-muted-foreground ml-2">daemon-mc-01.nivle.host</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[8px] font-bold border border-emerald-500/20">
                  ONLINE
                </span>
              </div>
              {/* Panel Content Preview */}
              <div className="p-4 space-y-4 font-mono text-xs">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 bg-muted/20 border border-border rounded">
                    <span className="text-[9px] text-muted-foreground block uppercase">CPU</span>
                    <span className="text-xs font-bold text-primary">24.5%</span>
                  </div>
                  <div className="p-2 bg-muted/20 border border-border rounded">
                    <span className="text-[9px] text-muted-foreground block uppercase">RAM</span>
                    <span className="text-xs font-bold text-foreground">4.8 GB / 8 GB</span>
                  </div>
                  <div className="p-2 bg-muted/20 border border-border rounded">
                    <span className="text-[9px] text-muted-foreground block uppercase">Players</span>
                    <span className="text-xs font-bold text-foreground">15 / 100</span>
                  </div>
                </div>
                {/* Terminal logs */}
                <div className="bg-[#060708] p-3 rounded border border-border/60 text-[10px] text-zinc-400 space-y-1 h-32 overflow-hidden">
                  <p className="text-zinc-500">[14:32:01 INFO]: Preparing start region for dimension minecraft:overworld</p>
                  <p className="text-zinc-500">[14:32:02 INFO]: Time elapsed: 954 ms</p>
                  <p className="text-primary font-bold">[14:32:03 INFO]: Done (1.42s)! For help, type &ldquo;help&rdquo;</p>
                  <p className="text-emerald-400">[Nivle Daemon]: Server started successfully on port 25565.</p>
                  <p className="text-zinc-300">&gt; player AlexMercer joined the server.</p>
                  <p className="text-zinc-300">&gt; player SarahJ joined the server.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
