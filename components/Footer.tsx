"use client";

import React from "react";
import Link from "next/link";
import { Gamepad2, Shield, Heart, Cpu, HelpCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-[#141517] text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                <Gamepad2 className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                nivle<span className="text-primary font-extrabold">.host</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed">
              Premium game server hosting built for creators, competitive communities, and casual players alike. Powered by extreme hardware, enterprise networks, and our custom control panel.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground/60">
              <Shield className="h-3.5 w-3.5 text-primary" />
              <span>12Tbps+ Global DDoS Shield Active</span>
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4">Our Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/minecraft" className="hover:text-primary transition-colors">
                  Minecraft Server Hosting
                </Link>
              </li>
              <li>
                <Link href="/games?filter=survival" className="hover:text-primary transition-colors">
                  Survival Game Servers
                </Link>
              </li>
              <li>
                <Link href="/games?filter=fps" className="hover:text-primary transition-colors">
                  CS2 & Shooter Servers
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-primary transition-colors">
                  All Supported Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/panel" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>Server Control Panel</span>
                  <span className="px-1 py-0.2 text-[8px] bg-primary/10 text-primary border border-primary/20 rounded">LIVE</span>
                </Link>
              </li>
              <li>
                <Link href="/network" className="hover:text-primary transition-colors">
                  Global Network Latency
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Knowledge Base
                </Link>
              </li>
              <li>
                <div className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>All Systems Operational</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Contact */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Submit a Ticket
                </Link>
              </li>
              <li>
                <span className="block text-muted-foreground/80">Support: 24/7/365</span>
              </li>
              <li>
                <span className="block text-muted-foreground/80">Billing: billing@nivle.host</span>
              </li>
              <li>
                <span className="block text-muted-foreground/80">Privacy Policy &bull; Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-muted-foreground/60 max-w-2xl text-center md:text-left leading-normal">
            Minecraft is a trademark of Mojang Synergies AB / Microsoft. Nivle Host is not affiliated with, endorsed, or supported by Mojang Studios, Microsoft, or any other game publisher mentioned. All product names, logos, and brands are property of their respective owners.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80 font-medium">
            <span>&copy; {currentYear} Nivle Host. Crafted with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            <span>by Syra.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
