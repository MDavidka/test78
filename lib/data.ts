export interface GamePlan {
  id: string;
  name: string;
  game: string;
  ram: string;
  cpu: string;
  slots: string;
  storage: string;
  price: number;
  popular?: boolean;
  features: string[];
}

export interface Game {
  id: string;
  name: string;
  logo: string;
  banner: string;
  basePrice: number;
  description: string;
  minSlots: number;
  maxSlots: number;
  pricePerSlot: number;
  features: string[];
}

export interface ServerLocation {
  id: string;
  city: string;
  country: string;
  region: string;
  ip: string;
  flag: string;
  coordinates: { x: number; y: number }; // Percentage coordinates for a network map
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "general" | "minecraft" | "billing" | "technical";
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  content: string;
  avatar: string;
  date: string;
}

export const MINECRAFT_PLANS: GamePlan[] = [
  {
    id: "mc-dirt",
    name: "Dirt Plan",
    game: "Minecraft",
    ram: "2 GB LPDDR5",
    cpu: "2 vCPUs (Ryzen 9 7900X)",
    slots: "Unlimited",
    storage: "30 GB NVMe SSD",
    price: 4.99,
    features: [
      "Up to 15 players recommended",
      "Instant Setup",
      "Full FTP & Database Access",
      "DDoS Protection (12Tbps+)",
      "Standard Support",
      "99.9% Uptime SLA",
    ],
  },
  {
    id: "mc-iron",
    name: "Iron Plan",
    game: "Minecraft",
    ram: "4 GB LPDDR5",
    cpu: "3 vCPUs (Ryzen 9 7900X)",
    slots: "Unlimited",
    storage: "60 GB NVMe SSD",
    price: 9.99,
    popular: true,
    features: [
      "Up to 35 players recommended",
      "Modpack Installer (1-Click)",
      "Full FTP & Database Access",
      "DDoS Protection (12Tbps+)",
      "Priority Support (24/7)",
      "Automated Daily Backups",
      "Free Dedicated IP",
    ],
  },
  {
    id: "mc-diamond",
    name: "Diamond Plan",
    game: "Minecraft",
    ram: "8 GB LPDDR5",
    cpu: "4 vCPUs (Ryzen 9 7900X)",
    slots: "Unlimited",
    storage: "120 GB NVMe SSD",
    price: 19.99,
    features: [
      "Up to 75 players / Heavy Mods",
      "Modpack Installer (1-Click)",
      "Premium Ryzen 9 7950X3D CPU",
      "Full FTP & Database Access",
      "DDoS Protection (12Tbps+)",
      "VIP Support (Discord & Ticket)",
      "Automated Hourly Backups",
      "Free Dedicated IP & Subdomain",
    ],
  },
  {
    id: "mc-netherite",
    name: "Netherite Plan",
    game: "Minecraft",
    ram: "16 GB LPDDR5",
    cpu: "6 vCPUs (Ryzen 9 7950X3D)",
    slots: "Unlimited",
    storage: "250 GB Enterprise NVMe",
    price: 37.99,
    features: [
      "150+ players / Ultra Modpacks",
      "Pre-tuned Java GC Flags",
      "Premium Ryzen 9 7950X3D CPU",
      "Full FTP & Database Access",
      "Custom Port Allocation",
      "Dedicated Account Manager",
      "Automated Hourly Backups",
      "Free Dedicated IP & Custom Domain",
    ],
  },
];

export const OTHER_GAMES: Game[] = [
  {
    id: "rust",
    name: "Rust",
    logo: "Rust",
    banner: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=600&auto=format&fit=crop",
    basePrice: 12.99,
    description: "Build, raid, survive. Run high-tickrate Rust servers on extreme CPU hardware.",
    minSlots: 50,
    maxSlots: 250,
    pricePerSlot: 0.18,
    features: ["Oxide/Umod Support", "Automated Wipes", "Tickrate Lock (100Hz)", "Anti-DDoS Shield"],
  },
  {
    id: "palworld",
    name: "Palworld",
    logo: "Palworld",
    banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop",
    basePrice: 14.99,
    description: "Capture, fight, and build with pals in a stable, lag-free multiplayer world.",
    minSlots: 4,
    maxSlots: 32,
    pricePerSlot: 0.50,
    features: ["4-32 Player Support", "Auto-restarts (Memory Leak Prevention)", "Config Editor", "Instant Setup"],
  },
  {
    id: "valheim",
    name: "Valheim",
    logo: "Valheim",
    banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
    basePrice: 8.99,
    description: "Conquer the Norse realm with up to 10 Vikings on dedicated performance.",
    minSlots: 10,
    maxSlots: 10,
    pricePerSlot: 0.90,
    features: ["Valheim Plus Support", "Crossplay Enabled", "World Backups", "Custom Seed Installer"],
  },
  {
    id: "cs2",
    name: "Counter-Strike 2",
    logo: "CS2",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    basePrice: 7.99,
    description: "Competitive 128-tickrate CS2 servers for scrims, matches, or community mods.",
    minSlots: 10,
    maxSlots: 32,
    pricePerSlot: 0.25,
    features: ["128-Tick Performance", "Metamod/Sourcemod", "Workshop Map Downloader", "RCON Console Access"],
  },
  {
    id: "ark",
    name: "ARK: Survival Ascended",
    logo: "ARK",
    banner: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
    basePrice: 18.99,
    description: "Tame dinosaurs and conquer pristine landscapes with extreme performance.",
    minSlots: 20,
    maxSlots: 100,
    pricePerSlot: 0.25,
    features: ["Cross-platform Mods", "Cluster Server Support", "Daily Database Backups", "High RAM Allocation"],
  },
  {
    id: "satisfactory",
    name: "Satisfactory",
    logo: "Satisfactory",
    banner: "https://images.unsplash.com/photo-1580234810907-b40315b76418?q=80&w=600&auto=format&fit=crop",
    basePrice: 11.99,
    description: "Automate huge factories in dynamic co-op. Zero lag even with 10,000+ conveyor belts.",
    minSlots: 4,
    maxSlots: 10,
    pricePerSlot: 1.20,
    features: ["Experimental Branch Support", "Auto-saves", "Unlimited Bandwidth", "Save File Upload"],
  },
];

export const LOCATIONS: ServerLocation[] = [
  {
    id: "us-east",
    city: "Dallas",
    country: "USA",
    region: "North America",
    ip: "45.132.112.18",
    flag: "🇺🇸",
    coordinates: { x: 25, y: 42 },
  },
  {
    id: "eu-central",
    city: "Frankfurt",
    country: "Germany",
    region: "Europe",
    ip: "185.244.195.4",
    flag: "🇩🇪",
    coordinates: { x: 50, y: 32 },
  },
  {
    id: "ap-southeast",
    city: "Singapore",
    country: "Singapore",
    region: "Asia Pacific",
    ip: "103.150.188.10",
    flag: "🇸🇬",
    coordinates: { x: 74, y: 64 },
  },
  {
    id: "ap-south",
    city: "Sydney",
    country: "Australia",
    region: "Oceania",
    ip: "139.99.144.52",
    flag: "🇦🇺",
    coordinates: { x: 88, y: 82 },
  },
  {
    id: "uk-london",
    city: "London",
    country: "United Kingdom",
    region: "Europe",
    ip: "212.102.38.10",
    flag: "🇬🇧",
    coordinates: { x: 47, y: 28 },
  },
];

export const FAQS: FAQItem[] = [
  {
    category: "general",
    question: "How fast is server setup?",
    answer: "All servers are provisioned instantly! The moment your payment is processed, our system automatically boots up your container, and your server details are emailed to you. You can log in and start playing within 45 seconds.",
  },
  {
    category: "minecraft",
    question: "Can I install mods or modpacks on my Minecraft server?",
    answer: "Absolutely! Nivle Host supports all major modpacks (CurseForge, FTB, Technic, Void Wrath, etc.) and server jars (Paper, Purpur, Forge, Fabric). You can install them in literally one click using our integrated Modpack Installer in the control panel.",
  },
  {
    category: "general",
    question: "What hardware does Nivle Host run on?",
    answer: "We never oversell our nodes. All game servers run on premium, high-frequency AMD Ryzen 9 processors (specifically Ryzen 9 7900X and 7950X3D) clocked up to 5.7GHz, equipped with ultra-fast DDR5 RAM and enterprise PCIe Gen5 NVMe SSDs.",
  },
  {
    category: "billing",
    question: "Is there a contract, and can I upgrade/downgrade later?",
    answer: "No contracts! All our plans are month-to-month, and you can cancel anytime. You can upgrade or downgrade your RAM, CPU, or slot allocation instantly from your client area. Our system will automatically adjust your server resources without losing any file data.",
  },
  {
    category: "technical",
    question: "How does your DDoS protection work?",
    answer: "We provide enterprise-grade, multi-layered DDoS mitigation with a capacity of over 12 Tbps. Our system filters out malicious traffic (including UDP floods, query attacks, and botnets) at the edge, meaning your server's tickrate remains perfectly stable even during active attacks.",
  },
  {
    category: "minecraft",
    question: "Do you offer a free subdomain?",
    answer: "Yes! Every Minecraft server comes with a free custom subdomain (e.g., yourname.nivle.host) so you and your players don't have to memorize a complicated IP address with a port number.",
  },
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Alex Mercer",
    role: "Minecraft Network Owner (200+ Players)",
    rating: 5,
    content: "We migrated our Skyblock network to Nivle Host's Ryzen 9 7950X3D plans last month. The TPS hasn't dropped below 20.00 since. Their custom panel is insanely fast, and customer service actually knows how to debug Java garbage collection issues.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
    date: "2 days ago",
  },
  {
    id: "rev-2",
    author: "Sarah Jenkins",
    role: "Co-op Host (Valheim & Rust)",
    rating: 5,
    content: "I host a Valheim server for 8 friends. Setup was literally instant. We also rented a Rust server for wipes and the automatic wipe scheduling tool in the Nivle panel saves me hours of manual configuration. 10/10 service.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    date: "1 week ago",
  },
  {
    id: "rev-3",
    author: "Dmitri Volkov",
    role: "Modded Server Enthusiast",
    rating: 5,
    content: "Running ATM9 (All The Mods 9) requires serious RAM and CPU single-core speed. Other hosts lagged with 5 players online. On Nivle's Diamond Plan, we have 18 people exploring different dimensions simultaneously with zero tick lag.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    date: "3 weeks ago",
  },
];

export const KB_ARTICLES = [
  {
    id: "kb-1",
    title: "How to connect to your server using FTP",
    category: "Getting Started",
    description: "Learn how to access and manage your server files using FileZilla or WinSCP.",
    readTime: "3 min read",
  },
  {
    id: "kb-2",
    title: "Optimizing Paper/Purpur for maximum performance",
    category: "Optimization",
    description: "A complete guide on tuning your paper.yml, spigot.yml, and server.properties to eliminate lag.",
    readTime: "7 min read",
  },
  {
    id: "kb-3",
    title: "How to set up a custom domain (SRV Record)",
    category: "Domains",
    description: "Step-by-step instructions to link your custom domain (like play.mycraft.com) to your server.",
    readTime: "4 min read",
  },
  {
    id: "kb-4",
    title: "Installing Forge or Fabric modpacks manually",
    category: "Mods & Modpacks",
    description: "How to upload and configure custom server jars and mods that are not in the 1-click installer.",
    readTime: "5 min read",
  },
  {
    id: "kb-5",
    title: "Setting up automatic backups to Google Drive or S3",
    category: "Backups",
    description: "Configure external backup storage endpoints for peace of mind and redundant data storage.",
    readTime: "6 min read",
  },
  {
    id: "kb-6",
    title: "How to add sub-users to your game server panel",
    category: "Panel Usage",
    description: "Grant administrative or console-only permissions to your moderators and co-owners.",
    readTime: "2 min read",
  },
];
