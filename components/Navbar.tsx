"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { 
  Gamepad2, 
  ShoppingCart, 
  Trash2, 
  Menu, 
  X, 
  Terminal, 
  ChevronDown, 
  Check, 
  Server,
  Wifi,
  HelpCircle
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { cart, removeFromCart, clearCart } = useAppStore();
  
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const navLinks = [
    { href: "/minecraft", label: "Minecraft", icon: Server },
    { href: "/games", label: "Game Servers", icon: Gamepad2 },
    { href: "/network", label: "Network Test", icon: Wifi },
    { href: "/contact", label: "Support", icon: HelpCircle },
  ];

  const handleCheckoutSim = () => {
    alert("Thank you for choosing Nivle Host! Since this is a premium simulation, your server is being provisioned instantly in our database. Let's redirect you to the live Control Panel to view your server!");
    clearCart();
    setIsCartOpen(false);
    window.location.href = "/panel?demo=true";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 transition-all group-hover:bg-primary/20">
            <Gamepad2 className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            nivle<span className="text-primary font-extrabold">.host</span>
          </span>
        </Link>

        {/* Desktop Main Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons: Cart, Panel Simulator, Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Panel Simulator Link */}
          <Link
            href="/panel"
            className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-sm font-semibold transition-all ${
              pathname === "/panel"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-primary/5 text-primary border-primary/20 hover:bg-primary/10"
            }`}
          >
            <Terminal className="h-4 w-4" />
            <span>Control Panel</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </Link>

          {/* Cart Icon Button */}
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Dropdown Box */}
            {isCartOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-border bg-card p-4 shadow-2xl z-50">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-primary" />
                    Your Cart ({cart.length})
                  </h3>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-muted-foreground hover:text-foreground text-xs"
                  >
                    Close
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-sm text-muted-foreground">Your shopping cart is empty.</p>
                    <Link
                      href="/minecraft"
                      onClick={() => setIsCartOpen(false)}
                      className="mt-3 inline-block text-xs text-primary font-semibold hover:underline"
                    >
                      Browse Minecraft Plans &rarr;
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-start justify-between gap-3 p-2 rounded-lg bg-muted/30 border border-border/40">
                          <div className="space-y-0.5">
                            <p className="text-xs font-bold text-foreground">{item.gameName}</p>
                            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <span>{item.ram || `${item.slots} slots`}</span>
                              <span>•</span>
                              <span>{item.location.city}</span>
                              <span>•</span>
                              <span className="capitalize">{item.billingCycle}</span>
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-primary">{formatPrice(item.price)}</span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-border space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-medium">Total:</span>
                        <span className="text-lg font-extrabold text-foreground">{formatPrice(cartTotal)}</span>
                      </div>
                      <button
                        onClick={handleCheckoutSim}
                        className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity text-sm flex items-center justify-center gap-2"
                      >
                        <Check className="h-4 w-4" />
                        Complete Order (Instant Setup)
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground md:hidden hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden px-4 py-4 space-y-3">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}
            
            {/* Control Panel in Mobile Menu */}
            <Link
              href="/panel"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/panel"
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-primary border border-primary/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <Terminal className="h-5 w-5" />
                <span>Control Panel Simulator</span>
              </div>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
