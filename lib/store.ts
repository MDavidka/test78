import { create } from "zustand";
import { GamePlan, ServerLocation, Game } from "./data";

// Cart Types
export interface CartItem {
  id: string; // Unique instance ID
  planId?: string; // If standard plan
  gameId: string; // "minecraft" or other game IDs
  gameName: string;
  ram?: string;
  slots?: number;
  location: ServerLocation;
  billingCycle: "monthly" | "quarterly" | "yearly";
  price: number;
}

interface AppState {
  // Cart State
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

  // Control Panel Simulator State
  panelStatus: "offline" | "starting" | "online" | "stopping";
  setPanelStatus: (status: "offline" | "starting" | "online" | "stopping") => void;
  panelLogs: string[];
  addPanelLog: (log: string) => void;
  clearPanelLogs: () => void;
  panelCpu: number;
  panelRam: number;
  panelPlayers: number;
  updatePanelStats: () => void;

  // Network Test State
  pings: Record<string, number | "testing" | null>;
  startPingTest: (locationId: string) => void;
  setPingResult: (locationId: string, ping: number) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Cart
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
  clearCart: () => set({ cart: [] }),

  // Panel Simulator
  panelStatus: "offline",
  setPanelStatus: (status) => {
    set({ panelStatus: status });
    if (status === "offline") {
      set({ panelCpu: 0, panelRam: 0, panelPlayers: 0 });
    }
  },
  panelLogs: [
    "[Nivle Daemon]: System initialized.",
    "[Nivle Daemon]: Ready to boot server container.",
  ],
  addPanelLog: (log) => set((state) => ({ panelLogs: [...state.panelLogs, log].slice(-100) })), // Keep last 100 logs
  clearPanelLogs: () => set({ panelLogs: [] }),
  panelCpu: 0,
  panelRam: 0,
  panelPlayers: 0,
  updatePanelStats: () => {
    const { panelStatus } = get();
    if (panelStatus === "online") {
      set({
        panelCpu: Math.floor(Math.random() * 35) + 15, // 15% to 50%
        panelRam: parseFloat((Math.random() * 1.5 + 4.2).toFixed(2)), // 4.2GB to 5.7GB
        panelPlayers: Math.floor(Math.random() * 8) + 12, // 12 to 20 players
      });
    } else if (panelStatus === "starting") {
      set({
        panelCpu: Math.floor(Math.random() * 40) + 50, // 50% to 90% during boot
        panelRam: parseFloat((Math.random() * 1 + 2.5).toFixed(2)),
        panelPlayers: 0,
      });
    } else if (panelStatus === "stopping") {
      set({
        panelCpu: Math.floor(Math.random() * 15) + 5,
        panelRam: parseFloat((Math.random() * 0.5 + 1.2).toFixed(2)),
        panelPlayers: 0,
      });
    } else {
      set({ panelCpu: 0, panelRam: 0, panelPlayers: 0 });
    }
  },

  // Network Ping Simulator
  pings: {},
  startPingTest: (locationId) => {
    set((state) => ({
      pings: { ...state.pings, [locationId]: "testing" },
    }));
    // Simulate network round-trip delay
    const delay = Math.random() * 600 + 400; // 400ms to 1000ms delay for simulation
    setTimeout(() => {
      let basePing = 12; // default low ping
      if (locationId === "us-east") basePing = Math.floor(Math.random() * 15) + 20; // 20-35ms
      else if (locationId === "eu-central") basePing = Math.floor(Math.random() * 20) + 15; // 15-35ms
      else if (locationId === "ap-southeast") basePing = Math.floor(Math.random() * 40) + 80; // 80-120ms
      else if (locationId === "ap-south") basePing = Math.floor(Math.random() * 50) + 140; // 140-190ms
      else if (locationId === "uk-london") basePing = Math.floor(Math.random() * 15) + 10; // 10-25ms

      set((state) => ({
        pings: { ...state.pings, [locationId]: basePing },
      }));
    }, delay);
  },
  setPingResult: (locationId, ping) => {
    set((state) => ({
      pings: { ...state.pings, [locationId]: ping },
    }));
  },
}));
