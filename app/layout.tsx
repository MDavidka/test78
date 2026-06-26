import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nivle Host | Premium Minecraft & Game Server Hosting",
  description: "High-performance game server hosting for Minecraft, Rust, Valheim, CS2, Palworld & more. Powered by Ryzen 9 CPUs, 12Tbps+ DDoS protection, and instant setup.",
  keywords: "minecraft server hosting, game server hosting, rust server hosting, palworld hosting, ryzen 9 7950x3d, high tickrate game servers, nivle host",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-[#1e1f22]">
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
