import { create } from "zustand";
import { ServerLocation } from "./data";

// Auth Types
export interface User {
  id: string;
  email: string;
}

// Server Database Types
export interface UserServer {
  id: string;
  name: string;
  gameId: string;
  gameName: string;
  ram: string;
  slots: number;
  location: ServerLocation;
  ip: string;
  status: "offline" | "starting" | "online" | "stopping";
}

// Cart Types
export interface CartItem {
  id: string;
  planId?: string;
  gameId: string;
  gameName: string;
  ram?: string;
  slots?: number;
  location: ServerLocation;
  billingCycle: "monthly" | "quarterly" | "yearly";
  price: number;
}

interface AppState {
  // Auth State
  user: User | null;
  isLoggedIn: boolean;
  isLoadingAuth: boolean;
  fetchUser: () => Promise<boolean>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;

  // Servers Database State
  servers: UserServer[];
  isLoadingServers: boolean;
  fetchServers: () => Promise<void>;
  addServer: (server: Omit<UserServer, "id" | "status" | "ip">) => Promise<void>;
  updateServerStatus: (serverId: string, status: UserServer["status"]) => Promise<void>;

  // Cart State
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  checkoutCart: () => Promise<void>;

  // Control Panel Simulator State (tied to active server)
  activeServerId: string | null;
  setActiveServerId: (id: string | null) => void;
  panelStatus: "offline" | "starting" | "online" | "stopping";
  setPanelStatus: (status: "offline" | "starting" | "online" | "stopping") => void;
  panelLogs: Record<string, string[]>; // serverId -> logs
  addPanelLog: (serverId: string, log: string) => void;
  panelCpu: number;
  panelRam: number;
  panelPlayers: number;
  updatePanelStats: (serverId: string) => void;

  // Network Test State
  pings: Record<string, number | "testing" | null>;
  startPingTest: (locationId: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Auth
  user: null,
  isLoggedIn: false,
  isLoadingAuth: true,
  fetchUser: async () => {
    set({ isLoadingAuth: true });
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        set({ user: data.user, isLoggedIn: true, isLoadingAuth: false });
        get().fetchServers(); // Load servers immediately
        return true;
      }
    } catch (e) {
      console.error("Fetch session failed", e);
    }
    set({ user: null, isLoggedIn: false, isLoadingAuth: false });
    return false;
  },
  login: async (email, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        set({ user: data.user, isLoggedIn: true });
        get().fetchServers(); // Fetch servers
        return { success: true };
      }
      return { success: false, error: data.error || "Failed to log in." };
    } catch (e) {
      return { success: false, error: "An unexpected error occurred." };
    }
  },
  register: async (email, password) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return { success: true };
      }
      return { success: false, error: data.error || "Failed to register." };
    } catch (e) {
      return { success: false, error: "An unexpected error occurred." };
    }
  },
  logout: async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout request failed", e);
    }
    set({ user: null, isLoggedIn: false, servers: [], activeServerId: null });
  },

  // Servers Database
  servers: [],
  isLoadingServers: false,
  fetchServers: async () => {
    set({ isLoadingServers: true });
    try {
      const res = await fetch("/api/servers");
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          set({ servers: data.servers });
        }
      }
    } catch (e) {
      console.error("Fetch servers failed", e);
    }
    set({ isLoadingServers: false });
  },
  addServer: async (serverData) => {
    try {
      const res = await fetch("/api/servers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serverData),
      });
      if (res.ok) {
        get().fetchServers(); // Reload from database
      }
    } catch (e) {
      console.error("Failed to add server to database", e);
    }
  },
  updateServerStatus: async (serverId, status) => {
    // Optimistically update local state first
    set((state) => ({
      servers: state.servers.map((srv) =>
        srv.id === serverId ? { ...srv, status } : srv
      ),
    }));

    if (get().activeServerId === serverId) {
      set({ panelStatus: status });
    }

    try {
      await fetch(`/api/servers/${serverId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
    } catch (e) {
      console.error("Failed to sync server status with MongoDB", e);
    }
  },

  // Cart
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
  clearCart: () => set({ cart: [] }),
  checkoutCart: async () => {
    const { cart, addServer, clearCart } = get();
    for (const item of cart) {
      await addServer({
        name: `${item.gameName} Node`,
        gameId: item.gameId,
        gameName: item.gameName,
        ram: item.ram || "4 GB LPDDR5",
        slots: item.slots || 100,
        location: item.location,
      });
    }
    clearCart();
  },

  // Control Panel Simulator
  activeServerId: null,
  setActiveServerId: (id) => {
    set({ activeServerId: id });
    if (id) {
      const srv = get().servers.find((s) => s.id === id);
      if (srv) {
        set({ panelStatus: srv.status });
      }
    }
  },
  panelStatus: "offline",
  setPanelStatus: (status) => {
    const { activeServerId, updateServerStatus } = get();
    set({ panelStatus: status });
    if (activeServerId) {
      updateServerStatus(activeServerId, status);
    }
  },
  panelLogs: {},
  addPanelLog: (serverId, log) => set((state) => {
    const serverLogs = state.panelLogs[serverId] || [
      "[Nivle Daemon]: System initialized.",
      "[Nivle Daemon]: Ready to boot server container.",
    ];
    return {
      panelLogs: {
        ...state.panelLogs,
        [serverId]: [...serverLogs, log].slice(-100),
      }
    };
  }),
  panelCpu: 0,
  panelRam: 0,
  panelPlayers: 0,
  updatePanelStats: (serverId) => {
    const srv = get().servers.find((s) => s.id === serverId);
    if (!srv) return;

    if (srv.status === "online") {
      set({
        panelCpu: Math.floor(Math.random() * 30) + 12,
        panelRam: parseFloat((Math.random() * 1.2 + 3.8).toFixed(2)),
        panelPlayers: Math.floor(Math.random() * 15) + 8,
      });
    } else if (srv.status === "starting") {
      set({
        panelCpu: Math.floor(Math.random() * 35) + 55,
        panelRam: parseFloat((Math.random() * 0.8 + 2.2).toFixed(2)),
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
    const delay = Math.random() * 500 + 300;
    setTimeout(() => {
      let basePing = 15;
      if (locationId === "us-east") basePing = Math.floor(Math.random() * 15) + 20;
      else if (locationId === "eu-central") basePing = Math.floor(Math.random() * 15) + 15;
      else if (locationId === "ap-southeast") basePing = Math.floor(Math.random() * 30) + 80;
      else if (locationId === "ap-south") basePing = Math.floor(Math.random() * 40) + 140;
      else if (locationId === "uk-london") basePing = Math.floor(Math.random() * 15) + 10;

      set((state) => ({
        pings: { ...state.pings, [locationId]: basePing },
      }));
    }, delay);
  },
}));
