"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { OTHER_GAMES, LOCATIONS, ServerLocation, Game } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { 
  Search, 
  Gamepad2, 
  Users, 
  MapPin, 
  Check, 
  ArrowRight, 
  Server, 
  Activity, 
  Settings, 
  ShieldCheck,
  Zap,
  Sparkles
} from "lucide-react";

// Wrap the main content in a client-only shell to handle search parameters safely
export default function GameServersPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Loading Game Catalog...</p>
        </div>
      </div>
    }>
      <GameServersContent />
    </React.Suspense>
  );
}

function GameServersContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const addToCart = useAppStore((state) => state.addToCart);

  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<number>(10);
  const [selectedLocation, setSelectedLocation] = useState<ServerLocation>(LOCATIONS[0]);

  // Read query parameters
  useEffect(() => {
    const gameId = searchParams.get("select");
    const filter = searchParams.get("filter");

    if (gameId) {
      const found = OTHER_GAMES.find((g) => g.id === gameId);
      if (found) {
        setSelectedGame(found);
        setSelectedSlots(found.minSlots);
      }
    }

    if (filter) {
      setActiveCategory(filter);
    }
  }, [searchParams]);

  // Categories mapping
  const categories = [
    { id: "all", label: "All Games" },
    { id: "survival", label: "Survival" },
    { id: "fps", label: "Shooters / FPS" },
    { id: "automation", label: "Automation / Co-op" },
  ];

  // Map games to categories for filtering
  const getGameCategory = (gameId: string) => {
    if (["rust", "palworld", "valheim", "ark"].includes(gameId)) return "survival";
    if (["cs2"].includes(gameId)) return "fps";
    if (["satisfactory"].includes(gameId)) return "automation";
    return "all";
  };

  // Filter games list
  const filteredGames = OTHER_GAMES.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || getGameCategory(game.id) === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectGame = (game: Game) => {
    setSelectedGame(game);
    setSelectedSlots(game.minSlots);
    // Update URL query param without full reload
    router.push(`/games?select=${game.id}`, { scroll: false });
  };

  // Calculate price dynamically
  const calculatePrice = (game: Game, slots: number) => {
    const extraSlots = Math.max(0, slots - game.minSlots);
    return game.basePrice + extraSlots * game.pricePerSlot;
  };

  const handleAddGameToCart = () => {
    if (!selectedGame) return;

    const finalPrice = calculatePrice(selectedGame, selectedSlots);

    addToCart({
      id: `game-${selectedGame.id}-${Date.now()}`,
      gameId: selectedGame.id,
      gameName: `${selectedGame.name} Server`,
      slots: selectedSlots,
      location: selectedLocation,
      billingCycle: "monthly",
      price: finalPrice,
    });

    alert(`Successfully added ${selectedGame.name} Server (${selectedSlots} Slots) in ${selectedLocation.city} to your cart!`);
  };

  return (
    <div className="relative min-h-screen bg-background bg-grid-pattern pb-16">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
          <Gamepad2 className="h-3.5 w-3.5" />
          <span>High-Tickrate Gaming Containers</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Multiplayer Game Servers
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Launch high-tickrate servers for your favorite multiplayer games. Configured on isolated Docker containers for peak resource allocation and instant boot.
        </p>
      </section>

      {/* Main Content Area */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Game Catalog List (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Search & Filter Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Categories */}
              <div className="flex flex-wrap gap-1 bg-[#141517] p-1 rounded-lg border border-border">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      router.push(`/games?filter=${cat.id}`, { scroll: false });
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                      activeCategory === cat.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative flex-grow sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-card text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Catalog Grid */}
            {filteredGames.length === 0 ? (
              <div className="text-center py-16 border border-border bg-card rounded-2xl">
                <Gamepad2 className="h-10 w-10 text-muted-foreground/60 mx-auto mb-3" />
                <p className="text-sm font-bold text-foreground">No games found</p>
                <p className="text-xs text-muted-foreground mt-1">Try resetting your filters or search query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredGames.map((game) => {
                  const isSelected = selectedGame?.id === game.id;
                  return (
                    <button
                      key={game.id}
                      onClick={() => handleSelectGame(game)}
                      className={`text-left rounded-2xl border bg-card overflow-hidden transition-all flex flex-col justify-between group ${
                        isSelected 
                          ? "border-primary shadow-lg shadow-primary/5 ring-1 ring-primary" 
                          : "border-border hover:border-border/80"
                      }`}
                    >
                      {/* Stylized Game Header */}
                      <div className="relative aspect-[21/9] w-full bg-zinc-800 overflow-hidden">
                        <img 
                          src={game.banner} 
                          alt={game.name} 
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                        <div className="absolute bottom-3 left-4">
                          <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                            {game.logo}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                        <div className="space-y-1">
                          <h3 className="text-sm font-extrabold text-foreground group-hover:text-primary transition-colors">
                            {game.name} Server
                          </h3>
                          <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                            {game.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                          <div>
                            <span className="text-[9px] text-muted-foreground block uppercase font-bold">Slots: {game.minSlots}-{game.maxSlots}</span>
                            <span className="text-sm font-black text-foreground">${game.basePrice}<span className="text-[10px] font-normal text-muted-foreground">/mo</span></span>
                          </div>
                          <span className="text-[10px] font-bold text-primary flex items-center gap-1">
                            <span>Configure</span>
                            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT: Selected Game Configurator (5 columns) */}
          <div className="lg:col-span-5">
            {selectedGame ? (
              <div className="rounded-2xl border border-primary/20 bg-card p-5 sm:p-6 space-y-6 shadow-2xl relative sticky top-24">
                <div className="absolute top-0 right-0 p-3 bg-primary/10 text-primary text-[9px] font-black tracking-widest uppercase rounded-bl-xl border-l border-b border-primary/20">
                  ⚙️ CONFIG
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">Selected Game</span>
                  <h2 className="text-2xl font-black text-foreground">{selectedGame.name}</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">{selectedGame.description}</p>
                </div>

                {/* Slot Slider */}
                <div className="space-y-3 pt-2 border-t border-border">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-muted-foreground uppercase tracking-wider">Player Slots</span>
                    <span className="text-lg font-black text-primary flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {selectedSlots} Slots
                    </span>
                  </div>
                  <input
                    type="range"
                    min={selectedGame.minSlots}
                    max={selectedGame.maxSlots}
                    step="1"
                    value={selectedSlots}
                    onChange={(e) => setSelectedSlots(parseInt(e.target.value))}
                    className="w-full h-2.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    aria-label="Slots Slider"
                  />
                  <div className="flex justify-between text-[9px] text-muted-foreground font-bold">
                    <span>Min: {selectedGame.minSlots}</span>
                    <span>Max: {selectedGame.maxSlots}</span>
                  </div>
                </div>

                {/* Location Selector */}
                <div className="space-y-3 pt-2 border-t border-border">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Server Location</span>
                  <div className="grid grid-cols-2 gap-2">
                    {LOCATIONS.slice(0, 4).map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => setSelectedLocation(loc)}
                        className={`p-2.5 rounded-lg border text-left transition-all flex items-center gap-2 ${
                          selectedLocation.id === loc.id
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-border bg-[#141517] text-muted-foreground hover:border-border/80"
                        }`}
                      >
                        <span className="text-base">{loc.flag}</span>
                        <div className="truncate">
                          <p className="text-[10px] font-bold truncate">{loc.city}</p>
                          <p className="text-[8px] text-muted-foreground truncate">{loc.country}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Included Features List */}
                <div className="space-y-2.5 pt-2 border-t border-border">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Included Features</span>
                  <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[10px] text-muted-foreground">
                    {selectedGame.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                      <span>Instant Boot Setup</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                      <span>FTP & DB Access</span>
                    </li>
                  </ul>
                </div>

                {/* Price and Checkout */}
                <div className="pt-4 border-t border-border space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-muted-foreground font-semibold">Monthly Total:</span>
                    <span className="text-2xl font-black text-foreground">
                      {formatPrice(calculatePrice(selectedGame, selectedSlots))}
                      <span className="text-xs font-normal text-muted-foreground">/mo</span>
                    </span>
                  </div>

                  <button
                    onClick={handleAddGameToCart}
                    className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-95 transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/10"
                  >
                    <Server className="h-4 w-4" />
                    <span>Deploy Game Server</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="text-[10px] text-muted-foreground/80 text-center flex items-center justify-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    Deploying container to: <strong className="text-foreground">{selectedLocation.city}</strong>
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center space-y-3 sticky top-24">
                <Gamepad2 className="h-10 w-10 text-muted-foreground/40 mx-auto" />
                <h3 className="text-sm font-bold text-foreground">Select a Game Server</h3>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Click on any game template on the left to configure slots, locations, and deploy your custom container.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Tech Specs Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">Extreme Tickrate Stability</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We lock game server tickrates (e.g. Rust at 100Hz, CS2 at 128-tick) by dedicating isolated CPU threads in Docker containers. No CPU sharing, no throttling.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
              <Settings className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">Automatic Wipe Schedulers</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Manage Rust or ARK wipes directly from your dashboard. Schedule automatic map wipes, blueprint wipes, and seed rotations with customizable timers.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">Memory Leak Prevention</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Games like Palworld suffer from heavy server-side memory leaks. Our daemon monitors RAM usage and performs graceful auto-restarts when the server is empty.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
