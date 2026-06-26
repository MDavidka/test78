"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import { MINECRAFT_PLANS, LOCATIONS, FAQS, ServerLocation } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Users, 
  Sparkles, 
  MapPin, 
  Check, 
  HelpCircle, 
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  Layers
} from "lucide-react";

interface SliderStep {
  ram: string;
  ramGb: number;
  cpu: string;
  slots: string;
  storage: string;
  price: number;
  suitability: string;
  desc: string;
}

const SLIDER_STEPS: SliderStep[] = [
  {
    ram: "2 GB LPDDR5",
    ramGb: 2,
    cpu: "2 vCPUs (Ryzen 9)",
    slots: "15 Players",
    storage: "30 GB NVMe SSD",
    price: 4.99,
    suitability: "Vanilla / Spigot / Purpur",
    desc: "Perfect for a small vanilla survival world with 5-10 friends.",
  },
  {
    ram: "4 GB LPDDR5",
    ramGb: 4,
    cpu: "3 vCPUs (Ryzen 9)",
    slots: "35 Players",
    storage: "60 GB NVMe SSD",
    price: 9.99,
    suitability: "Light Modpacks / Plugins",
    desc: "Great for community servers running Spigot plugins or small modpacks.",
  },
  {
    ram: "6 GB LPDDR5",
    ramGb: 6,
    cpu: "3 vCPUs (Ryzen 9)",
    slots: "50 Players",
    storage: "90 GB NVMe SSD",
    price: 14.99,
    suitability: "Medium Modpacks (100+ mods)",
    desc: "Ideal for popular modpacks like SkyFactory or Pixelmon with medium player count.",
  },
  {
    ram: "8 GB LPDDR5",
    ramGb: 8,
    cpu: "4 vCPUs (Ryzen 9)",
    slots: "75 Players",
    storage: "120 GB NVMe SSD",
    price: 19.99,
    suitability: "Heavy Modpacks (200+ mods)",
    desc: "Built for heavy modpacks (ATM9, RL Craft) and high player activity.",
  },
  {
    ram: "12 GB LPDDR5",
    ramGb: 12,
    cpu: "5 vCPUs (Ryzen 9)",
    slots: "110 Players",
    storage: "180 GB NVMe SSD",
    price: 28.99,
    suitability: "Ultra Modpacks / Small Networks",
    desc: "Excellent for small BungeeCord/Velocity networks or extreme modding.",
  },
  {
    ram: "16 GB LPDDR5",
    ramGb: 16,
    cpu: "6 vCPUs (Ryzen 9)",
    slots: "150+ Players",
    storage: "250 GB Enterprise NVMe",
    price: 37.99,
    suitability: "Large Networks / Massive Modpacks",
    desc: "Enterprise standard. Run massive networks, heavy modpacks, with tuned GC flags.",
  },
];

export default function MinecraftHostingPage() {
  const addToCart = useAppStore((state) => state.addToCart);
  
  // Custom Slider State
  const [sliderIndex, setSliderIndex] = useState(2); // Default to 6GB plan
  const [selectedLocation, setSelectedLocation] = useState<ServerLocation>(LOCATIONS[0]);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  
  // FAQ toggling
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const activeStep = SLIDER_STEPS[sliderIndex];

  // Calculate price based on billing cycle discount
  const getCyclePrice = (basePrice: number) => {
    if (billingCycle === "quarterly") return basePrice * 3 * 0.9; // 10% off
    if (billingCycle === "yearly") return basePrice * 12 * 0.8; // 20% off
    return basePrice;
  };

  const getPriceLabel = (basePrice: number) => {
    const calculated = getCyclePrice(basePrice);
    if (billingCycle === "quarterly") return `${formatPrice(calculated / 3)}/mo (Billed quarterly)`;
    if (billingCycle === "yearly") return `${formatPrice(calculated / 12)}/mo (Billed yearly)`;
    return `${formatPrice(calculated)}/mo`;
  };

  // Add Custom Slider Config to Cart
  const handleAddCustomToCart = () => {
    const finalPrice = getCyclePrice(activeStep.price) / (billingCycle === "monthly" ? 1 : billingCycle === "quarterly" ? 3 : 12);
    
    addToCart({
      id: `custom-mc-${Date.now()}`,
      gameId: "minecraft",
      gameName: `Minecraft Custom Server (${activeStep.ramGb}GB)`,
      ram: activeStep.ram,
      location: selectedLocation,
      billingCycle,
      price: finalPrice,
    });
    alert(`Successfully added custom Minecraft Server (${activeStep.ramGb}GB RAM) in ${selectedLocation.city} to your cart!`);
  };

  // Add Standard Plan to Cart
  const handleAddPlanToCart = (plan: typeof MINECRAFT_PLANS[0]) => {
    addToCart({
      id: `${plan.id}-${Date.now()}`,
      planId: plan.id,
      gameId: "minecraft",
      gameName: `Minecraft ${plan.name}`,
      ram: plan.ram,
      location: selectedLocation,
      billingCycle: "monthly",
      price: plan.price,
    });
    alert(`Successfully added Minecraft ${plan.name} (${plan.ram} RAM) in ${selectedLocation.city} to your cart!`);
  };

  const minecraftFaqs = FAQS.filter((faq) => faq.category === "minecraft" || faq.category === "general");

  return (
    <div className="relative min-h-screen bg-background bg-grid-pattern pb-16">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
          <Server className="h-3.5 w-3.5" />
          <span>Optimized for Paper, Purpur, Forge & Fabric</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Minecraft Server Hosting
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Configure a high-performance Minecraft server in seconds. Experience lag-free chunk loading and peak TPS with our customized Ryzen 9 setups.
        </p>
      </section>

      {/* Interactive RAM Configurator */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary/20 bg-card/80 backdrop-blur p-6 sm:p-8 shadow-2xl relative">
          <div className="absolute top-0 right-0 p-3 bg-primary/10 text-primary text-[9px] font-black tracking-widest uppercase rounded-bl-xl border-l border-b border-primary/20">
            🎛️ CUSTOM CONFIGURATOR
          </div>

          <h2 className="text-xl font-extrabold text-foreground mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            Drag to Customize Your Server Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left side: Controls */}
            <div className="md:col-span-7 space-y-6">
              {/* Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Allocated RAM</span>
                  <span className="text-2xl font-black text-primary">{activeStep.ramGb} GB LPDDR5</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={SLIDER_STEPS.length - 1}
                  value={sliderIndex}
                  onChange={(e) => setSliderIndex(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  aria-label="RAM Slider"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground px-1 font-bold">
                  <span>2GB</span>
                  <span>4GB</span>
                  <span>6GB</span>
                  <span>8GB</span>
                  <span>12GB</span>
                  <span>16GB</span>
                </div>
              </div>

              {/* Server Location Selector */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">1. Select Server Location</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc)}
                      className={`p-3 rounded-lg border text-left transition-all flex items-center gap-2 ${
                        selectedLocation.id === loc.id
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border bg-[#141517] text-muted-foreground hover:border-border/80"
                      }`}
                    >
                      <span className="text-lg">{loc.flag}</span>
                      <div className="truncate">
                        <p className="text-xs font-bold truncate">{loc.city}</p>
                        <p className="text-[9px] text-muted-foreground truncate">{loc.country}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Billing Cycle */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">2. Choose Billing Cycle</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "monthly", label: "Monthly", discount: "Base Price" },
                    { id: "quarterly", label: "Quarterly", discount: "10% OFF" },
                    { id: "yearly", label: "Yearly", discount: "20% OFF" },
                  ].map((cycle) => (
                    <button
                      key={cycle.id}
                      onClick={() => setBillingCycle(cycle.id as any)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        billingCycle === cycle.id
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border bg-[#141517] text-muted-foreground hover:border-border/80"
                      }`}
                    >
                      <p className="text-xs font-bold">{cycle.label}</p>
                      <p className={`text-[9px] font-semibold ${cycle.id !== "monthly" ? "text-primary" : "text-muted-foreground"}`}>
                        {cycle.discount}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Summary & Action */}
            <div className="md:col-span-5 rounded-xl border border-border bg-[#141517] p-5 space-y-6">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider border-b border-border pb-3">
                Server Specifications
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-primary">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">CPU Allocation</p>
                    <p className="text-xs font-bold text-foreground">{activeStep.cpu}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-primary">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Recommended Slots</p>
                    <p className="text-xs font-bold text-foreground">{activeStep.slots}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-primary">
                    <HardDrive className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">NVMe SSD Storage</p>
                    <p className="text-xs font-bold text-foreground">{activeStep.storage}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-primary">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Optimized For</p>
                    <p className="text-xs font-bold text-primary">{activeStep.suitability}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs text-muted-foreground font-semibold">Total Price:</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-foreground">{getPriceLabel(activeStep.price)}</span>
                  </div>
                </div>

                <button
                  onClick={handleAddCustomToCart}
                  className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-95 transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/10"
                >
                  <Server className="h-4 w-4" />
                  <span>Configure & Rent Server</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                
                <p className="text-[10px] text-muted-foreground/80 text-center flex items-center justify-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  Deploying to: <strong className="text-foreground">{selectedLocation.city} ({selectedLocation.country})</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-configured Plans Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border/60">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
            Popular Pre-configured Plans
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Prefer a standard configuration? Choose one of our pre-optimized Minecraft plans. Deployable instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MINECRAFT_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative overflow-hidden rounded-2xl border bg-card p-6 flex flex-col justify-between group hover:border-primary/30 transition-all ${
                plan.popular ? "border-primary/40 shadow-lg shadow-primary/5" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 p-2.5 bg-primary/15 text-primary text-[9px] font-black tracking-wider uppercase rounded-bl-xl border-l border-b border-primary/20">
                  🔥 BEST VALUE
                </div>
              )}

              <div className="space-y-4">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">
                  {plan.name}
                </span>
                <div className="flex items-baseline">
                  <span className="text-3xl font-black text-foreground">${plan.price}</span>
                  <span className="text-xs text-muted-foreground ml-1">/mo</span>
                </div>

                <div className="space-y-2 pt-2 border-t border-border/60 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RAM</span>
                    <span className="font-bold text-foreground">{plan.ram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CPU</span>
                    <span className="font-bold text-foreground truncate max-w-[120px]">{plan.cpu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage</span>
                    <span className="font-bold text-foreground">{plan.storage}</span>
                  </div>
                </div>

                <ul className="space-y-2 pt-4 border-t border-border/60 text-xs text-muted-foreground">
                  {plan.features.slice(0, 5).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleAddPlanToCart(plan)}
                className={`mt-6 w-full py-2.5 rounded-lg text-xs font-bold transition-all ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "bg-secondary text-secondary-foreground border border-border hover:bg-muted"
                }`}
              >
                Order {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Minecraft specific feature highlights */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">1-Click Modpack Installer</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Install over 1,500 modpacks from CurseForge, FTB, and Technic instantly. Our installer handles all server JAR switches and config files automatically.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">Free Custom Subdomains</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Don't force your players to memorize ugly ports. Every server includes a free custom subdomain like <code className="text-primary font-bold">yourname.nivle.host</code> instantly on boot.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">Pre-tuned Java GC Flags</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our servers boot with Aikars Flags pre-configured. This optimizes Java's garbage collection, heavily reducing memory leak spikes and micro-stutters.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border/60">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
            Minecraft Hosting FAQ
          </h2>
          <p className="text-xs text-muted-foreground">
            Have questions about running a Minecraft server? We have answers.
          </p>
        </div>

        <div className="space-y-2">
          {minecraftFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
              >
                <span className="text-xs font-bold text-foreground">{faq.question}</span>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${openFaqIndex === idx ? "rotate-180" : ""}`} />
              </button>
              {openFaqIndex === idx && (
                <div className="p-4 pt-0 border-t border-border/40 text-xs text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
