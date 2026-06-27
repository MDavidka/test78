import { create } from "zustand";
import { ServerLocation, GamePlan } from "./data";

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
  login: (email: string) => boolean;
  register: (email: string) => boolean;
  logout: () => void;

  // Servers Database State
  servers: UserServer[];
  addServer: (server: Omit<UserServer, "id" | "status" | "ip">) => void;
  updateServerStatus: (serverId: string, status: UserServer["status"]) => void;
  initializeDefaultServers: () => void;

  // Cart State
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  checkoutCart: () => void;

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

export const useAppStore = create<AppState>((set, get) => {
  // Helper to load/save from localStorage if available
  const isClient = typeof window !== "undefined";
  
  const getStoredUser = () => {
    if (!isClient) return null;
    const stored = localStorage.getItem("nivle_user");
    return stored ? JSON.parse(stored) : null;
  };

  const getStoredServers = (): UserServer[] => {
    if (!isClient) return [];
    const stored = localStorage.getItem("nivle_servers");
    return stored ? JSON.parse(stored) : [];
  };

  const initialUser = getStoredUser();
  const initialServers = getStoredServers();

  return {
    // Auth
    user: initialUser,
    isLoggedIn: !!initialUser,
    login: (email) => {
      const mockUser = { id: `usr-${Date.now()}`, email };
      if (isClient) {
        localStorage.setItem("nivle_user", JSON.stringify(mockUser));
      }
      set({ user: mockUser, isLoggedIn: true });
      // Initialize default servers for a new user session if they don't have any
      const { servers, initializeDefaultServers } = get();
      if (servers.length === 0) {
        initializeDefaultServers();
      }
      return true;
    },
    register: (email) => {
      const mockUser = { id: `usr-${Date.now()}`, email };
      if (isClient) {
        localStorage.setItem("nivle_user", JSON.stringify(mockUser));
      }
      set({ user: mockUser, isLoggedIn: true });
      get().initializeDefaultServers();
      return true;
    },
    logout: () => {
      if (isClient) {
        localStorage.removeItem("nivle_user");
      }
      set({ user: null, isLoggedIn: false, activeServerId: null });
    },

    // Servers Database
    servers: initialServers,
    addServer: (serverData) => {
      const newServer: UserServer = {
        ...serverData,
        id: `srv-${Math.floor(Math.random() * 90000) + 10000}`,
        status: "offline",
        ip: `${serverData.location.ip}:${Math.floor(Math.random() * 9000) + 25565}`,
      };
      
      const updated = [...get().servers, newServer];
      if (isClient) {
        localStorage.setItem("nivle_servers", JSON.stringify(updated));
      }
      set({ servers: updated });
    },
    updateServerStatus: (serverId, status) => {
      const updated = get().servers.map((srv) => 
        srv.id === serverId ? { ...srv, status } : srv
      );
      if (isClient) {
        localStorage.setItem("nivle_servers", JSON.stringify(updated));
      }
      set({ servers: updated });
      if (get().activeServerId === serverId) {
        set({ panelStatus: status });
      }
    },
    initializeDefaultServers: () => {
      const defaultServers: UserServer[] = [
        {
          id: "srv-mc-lobby",
          name: "Lobby Minecraft Server",
          gameId: "minecraft",
          gameName: "Minecraft Java",
          ram: "4 GB LPDDR5",
          slots: 100,
          location: {
            id: "us-east",
            city: "Dallas",
            country: "USA",
            region: "North America",
            ip: "45.132.112.18",
            flag: "🇺🇸",
            coordinates: { x: 25, y: 42 }
          },
          ip: "45.132.112.18:25565",
          status: "online",
        },
        {
          id: "srv-rust-wipe",
          name: "Rust Main Clan Server",
          gameId: "rust",
          gameName: "Rust",
          ram: "8 GB LPDDR5",
          slots: 150,
          location: {
            id: "eu-central",
            city: "Frankfurt",
            country: "Germany",
            region: "Europe",
            ip: "185.244.195.4",
            flag: "🇩🇪",
            coordinates: { x: 50, y: 32 }
          },
          ip: "185.244.195.4:28015",
          status: "offline",
        }
      ];
      if (isClient) {
        localStorage.setItem("nivle_servers", JSON.stringify(defaultServers));
      }
      set({ servers: defaultServers });
    },

    // Cart
    cart: [],
    addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
    removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
    clearCart: () => set({ cart: [] }),
    checkoutCart: () => {
      const { cart, addServer, clearCart } = get();
      cart.forEach((item) => {
        addServer({
          name: `${item.gameName} Node`,
          gameId: item.gameId,
          gameName: item.gameName,
          ram: item.ram || "4 GB LPDDR5",
          slots: item.slots || 100,
          location: item.location,
        });
      });
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
  };
});
