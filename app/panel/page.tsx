"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { 
  Terminal as TermIcon, 
  Play, 
  Square, 
  RotateCw, 
  Folder, 
  FileCode, 
  Settings, 
  Cpu, 
  HardDrive, 
  Users, 
  Download, 
  Save, 
  Activity, 
  ChevronRight, 
  Check, 
  Clock, 
  Search,
  BookOpen
} from "lucide-react";

// Mock Files for File Manager
interface MockFile {
  name: string;
  content: string;
}

const MOCK_FILES: Record<string, MockFile> = {
  "server.properties": {
    name: "server.properties",
    content: `# Minecraft server properties
# Mon May 20 12:00:00 UTC 2024
enable-jmx-monitoring=false
rcon.port=25575
level-seed=nivlehost777
enable-query=false
allow-flight=false
server-port=25565
online-mode=true
pvp=true
difficulty=easy
enable-command-block=true
max-players=100
motd=A Custom Server Hosted on Nivle Host!
view-distance=10
resource-pack-sha1=
max-world-size=29999984`,
  },
  "ops.json": {
    name: "ops.json",
    content: `[
  {
    "uuid": "85348a24-3452-473d-8e42-70b19280d524",
    "name": "AlexMercer",
    "level": 4,
    "bypassesPlayerLimit": true
  }
]`,
  },
  "whitelist.json": {
    name: "whitelist.json",
    content: `[
  {
    "uuid": "49479010-8377-be9c-29b2-93301008377b",
    "name": "SarahJenkins"
  }
]`,
  },
};

// Mock Modpacks
interface Modpack {
  id: string;
  name: string;
  version: string;
  size: string;
  logo: string;
  downloads: string;
}

const MODPACKS: Modpack[] = [
  { id: "atm9", name: "All The Mods 9", version: "v0.2.45", size: "412 MB", logo: "ATM9", downloads: "1.2M" },
  { id: "rlcraft", name: "RL Craft", version: "v2.9.3", size: "284 MB", logo: "RLC", downloads: "4.8M" },
  { id: "pixelmon", name: "Pixelmon Reforged", version: "v9.1.12", size: "530 MB", logo: "PIX", downloads: "2.5M" },
  { id: "skyfactory", name: "SkyFactory 4", version: "v4.2.4", size: "192 MB", logo: "SF4", downloads: "3.1M" },
];

export default function PanelPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Initializing Control Panel...</p>
        </div>
      </div>
    }>
      <PanelContent />
    </React.Suspense>
  );
}

function PanelContent() {
  const searchParams = useSearchParams();
  
  // App Store States
  const { 
    panelStatus, 
    setPanelStatus, 
    panelLogs, 
    addPanelLog, 
    clearPanelLogs, 
    panelCpu, 
    panelRam, 
    panelPlayers, 
    updatePanelStats 
  } = useAppStore();

  // Component States
  const [activeTab, setActiveTab] = useState<"console" | "files" | "mods" | "settings">("console");
  const [terminalInput, setTerminalInput] = useState("");
  const [selectedFileName, setSelectedFileName] = useState<string>("server.properties");
  const [editorContent, setEditorContent] = useState(MOCK_FILES["server.properties"].content);
  const [isInstallingMod, setIsInstallingMod] = useState<string | null>(null);
  
  // Custom charts historical values (CPU and RAM history for custom SVG graphs)
  const [cpuHistory, setCpuHistory] = useState<number[]>([10, 15, 12, 18, 14, 20, 15, 22, 25, 20]);
  const [ramHistory, setRamHistory] = useState<number[]>([4.2, 4.3, 4.2, 4.5, 4.4, 4.6, 4.5, 4.8, 4.7, 4.8]);

  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Parse query for demo mode
  useEffect(() => {
    if (searchParams.get("demo") === "true") {
      handleStartServer();
    }
  }, [searchParams]);

  // Handle live resource stat updates
  useEffect(() => {
    const timer = setInterval(() => {
      updatePanelStats();
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  // Sync historical resource graphs with current stats
  useEffect(() => {
    if (panelStatus === "online") {
      setCpuHistory(prev => [...prev.slice(1), panelCpu]);
      setRamHistory(prev => [...prev.slice(1), panelRam]);
    } else {
      setCpuHistory(prev => [...prev.slice(1), 0]);
      setRamHistory(prev => [...prev.slice(1), 0]);
    }
  }, [panelCpu, panelRam, panelStatus]);

  // Scroll terminal console to bottom
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [panelLogs, activeTab]);

  // Server Control Actions
  const handleStartServer = () => {
    if (panelStatus !== "offline") return;
    
    setPanelStatus("starting");
    addPanelLog("[Nivle Daemon]: Starting server container...");
    addPanelLog("[Nivle Daemon]: Allocating Ryzen 9 CPU cores and DDR5 RAM...");
    addPanelLog("[Nivle Daemon]: Loading Java Virtual Machine (JVM) flags...");
    addPanelLog("[Nivle Daemon]: Using Aikars GC optimization flags.");
    
    // Simulate boot sequence logs
    setTimeout(() => {
      addPanelLog("[Server INFO]: Starting minecraft server version 1.20.4");
      addPanelLog("[Server INFO]: Loading properties");
      addPanelLog("[Server INFO]: Default game type: SURVIVAL");
    }, 1000);

    setTimeout(() => {
      addPanelLog("[Server INFO]: Generating world 'world' using seed 'nivlehost777'");
      addPanelLog("[Server INFO]: Preparing start region for dimension minecraft:overworld");
      addPanelLog("[Server INFO]: Preparing spawn area: 24%");
      addPanelLog("[Server INFO]: Preparing spawn area: 68%");
    }, 2500);

    setTimeout(() => {
      addPanelLog("[Server INFO]: Preparing spawn area: 100%");
      addPanelLog("[Server INFO]: Done (3.12s)! For help, type \"help\"");
      addPanelLog("[Nivle Daemon]: Server container status changed to: ONLINE");
      addPanelLog("[Nivle Daemon]: Listening on dedicated IP: 45.132.112.18:25565");
      setPanelStatus("online");
    }, 4500);
  };

  const handleStopServer = () => {
    if (panelStatus !== "online" && panelStatus !== "starting") return;

    setPanelStatus("stopping");
    addPanelLog("[Nivle Daemon]: Stopping server container gracefully...");
    addPanelLog("[Server INFO]: Saving players");
    addPanelLog("[Server INFO]: Saving worlds");
    addPanelLog("[Server INFO]: Saving chunks for level 'ServerLevel[world]'/minecraft:overworld");

    setTimeout(() => {
      addPanelLog("[Nivle Daemon]: Server container stopped.");
      setPanelStatus("offline");
    }, 2000);
  };

  const handleRestartServer = () => {
    handleStopServer();
    setTimeout(() => {
      handleStartServer();
    }, 2500);
  };

  // Command Input Handler
  const handleSendCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim();
    addPanelLog(`> ${cmd}`);
    setTerminalInput("");

    if (panelStatus !== "online") {
      addPanelLog("[Nivle Daemon Error]: Command ignored. Server is not online.");
      return;
    }

    // Process dummy commands
    const args = cmd.split(" ");
    const primary = args[0].toLowerCase();

    setTimeout(() => {
      if (primary === "help") {
        addPanelLog("[Server INFO]: Available commands: help, op, say, stop, list, tps");
      } else if (primary === "op") {
        const target = args[1] || "Player";
        addPanelLog(`[Server INFO]: Made ${target} a server operator`);
      } else if (primary === "say") {
        const msg = args.slice(1).join(" ") || "Hello everyone!";
        addPanelLog(`[Server BROADCAST]: ${msg}`);
      } else if (primary === "stop") {
        handleStopServer();
      } else if (primary === "list") {
        addPanelLog(`[Server INFO]: There are ${panelPlayers} of 100 players online: AlexMercer, SarahJenkins, CraftyJoe, Miner49er, Notch...`);
      } else if (primary === "tps") {
        addPanelLog("[Server INFO]: Current TPS: 20.00 (100% stable) | Memory: 4.82 GB / 8.00 GB");
      } else {
        addPanelLog(`[Server INFO]: Unknown or incomplete command. Type "help" for a list of server commands.`);
      }
    }, 200);
  };

  // File Manager Select
  const handleSelectFile = (fileName: string) => {
    setSelectedFileName(fileName);
    setEditorContent(MOCK_FILES[fileName].content);
  };

  const handleSaveFile = () => {
    MOCK_FILES[selectedFileName].content = editorContent;
    addPanelLog(`[Nivle Daemon]: Saved changes to file '${selectedFileName}' successfully.`);
    alert(`File '${selectedFileName}' has been updated and saved to the daemon database!`);
  };

  // Modpack Installer Simulation
  const handleInstallModpack = (modpack: Modpack) => {
    if (panelStatus !== "offline") {
      alert("Please stop your server before installing modpacks to prevent file corruption.");
      return;
    }

    setIsInstallingMod(modpack.id);
    addPanelLog(`[Nivle Daemon]: Initializing installation of modpack '${modpack.name}'...`);
    
    setTimeout(() => {
      addPanelLog(`[Nivle Daemon]: Downloading archive files from CurseForge API (${modpack.size})...`);
    }, 1000);

    setTimeout(() => {
      addPanelLog(`[Nivle Daemon]: Extracting files to server root directory...`);
      addPanelLog(`[Nivle Daemon]: Applied 284 mods and configurations.`);
    }, 3000);

    setTimeout(() => {
      addPanelLog(`[Nivle Daemon]: Updating server.properties JAR file pointer to Fabric-1.20.4.`);
      addPanelLog(`[Nivle Daemon]: Modpack '${modpack.name}' installed successfully!`);
      setIsInstallingMod(null);
      alert(`Modpack '${modpack.name}' has been successfully installed in 1 click! You can now START your server.`);
    }, 5000);
  };

  return (
    <div className="relative min-h-screen bg-background flex flex-col">
      {/* Top dashboard summary header */}
      <section className="bg-[#141517] border-b border-border px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <TermIcon className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-foreground flex items-center gap-2">
                <span>daemon-mc-01.nivle.host</span>
                <span className="text-[10px] text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded font-normal">US-East (Dallas)</span>
              </h1>
              <p className="text-xs text-muted-foreground">Minecraft Java Edition • Ryzen 9 7950X3D Dedicated Core</p>
            </div>
          </div>

          {/* Quick Stats Header */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="h-2 w-2 rounded-full relative">
                {panelStatus === "online" && (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </>
                )}
                {panelStatus === "starting" && <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500 animate-pulse"></span>}
                {panelStatus === "stopping" && <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500 animate-pulse"></span>}
                {panelStatus === "offline" && <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-600"></span>}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                {panelStatus}
              </span>
            </div>

            {/* Server Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleStartServer}
                disabled={panelStatus !== "offline"}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  panelStatus === "offline"
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Start</span>
              </button>

              <button
                onClick={handleStopServer}
                disabled={panelStatus === "offline" || panelStatus === "stopping"}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  panelStatus === "online" || panelStatus === "starting"
                    ? "bg-destructive text-destructive-foreground hover:opacity-90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                <Square className="h-3.5 w-3.5 fill-current" />
                <span>Stop</span>
              </button>

              <button
                onClick={handleRestartServer}
                disabled={panelStatus === "offline" || panelStatus === "stopping"}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border border-border transition-all ${
                  panelStatus === "online" || panelStatus === "starting"
                    ? "bg-secondary text-secondary-foreground hover:bg-muted"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                <RotateCw className="h-3.5 w-3.5" />
                <span>Restart</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Panel Workspace Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        
        {/* LEFT: Sidebar Tabs Navigation (3 columns) */}
        <div className="lg:col-span-3 space-y-3">
          {[
            { id: "console", label: "Terminal Console", icon: TermIcon },
            { id: "files", label: "File Manager", icon: Folder },
            { id: "mods", label: "1-Click Modpacks", icon: Download },
            { id: "settings", label: "Server Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                  activeTab === tab.id
                    ? "border-primary bg-primary/5 text-primary font-bold"
                    : "border-border bg-card text-muted-foreground hover:border-border/80 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}

          {/* Quick Info Box */}
          <div className="rounded-xl border border-border bg-[#141517] p-4 space-y-3 text-[11px] text-muted-foreground">
            <h3 className="font-bold text-foreground flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
              <Activity className="h-3.5 w-3.5 text-primary" />
              Node Information
            </h3>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span>Daemon IP:</span>
                <span className="font-mono text-foreground font-bold">45.132.112.18:25565</span>
              </div>
              <div className="flex justify-between">
                <span>CPU Core:</span>
                <span className="text-foreground">Ryzen 9 (5.7GHz)</span>
              </div>
              <div className="flex justify-between">
                <span>SSD Storage:</span>
                <span className="text-foreground">120 GB PCIe Gen5</span>
              </div>
              <div className="flex justify-between">
                <span>RAM Limit:</span>
                <span className="text-foreground">8.00 GB LPDDR5</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Dynamic Tab Window Content (9 columns) */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          
          {/* Real-time resource usage panel (Only visible when server is running) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* CPU Monitor */}
            <div className="rounded-xl border border-border bg-card p-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                  <Cpu className="h-4 w-4 text-primary" />
                  CPU Usage
                </span>
                <span className="font-black text-foreground">{panelCpu}%</span>
              </div>
              
              {/* Custom SVG sparkline */}
              <div className="h-10 w-full bg-[#141517] rounded border border-border/40 overflow-hidden flex items-end">
                <svg className="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    points={cpuHistory.map((val, idx) => `${idx * 11}, ${40 - (val / 100) * 35}`).join(" ")}
                  />
                </svg>
              </div>
            </div>

            {/* RAM Monitor */}
            <div className="rounded-xl border border-border bg-card p-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                  <HardDrive className="h-4 w-4 text-primary" />
                  RAM Usage
                </span>
                <span className="font-black text-foreground">{panelRam} GB / 8.00 GB</span>
              </div>

              {/* Custom SVG sparkline */}
              <div className="h-10 w-full bg-[#141517] rounded border border-border/40 overflow-hidden flex items-end">
                <svg className="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    points={ramHistory.map((val, idx) => `${idx * 11}, ${40 - (val / 8) * 35}`).join(" ")}
                  />
                </svg>
              </div>
            </div>

            {/* Players Monitor */}
            <div className="rounded-xl border border-border bg-card p-4 space-y-3 flex flex-col justify-between">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-primary" />
                  Active Players
                </span>
                <span className="font-black text-foreground">{panelPlayers} / 100</span>
              </div>
              
              <div className="p-2 bg-[#141517] rounded border border-border/40 text-[10px] text-muted-foreground flex items-center justify-between">
                <span>GC Allocation:</span>
                <span className="text-emerald-500 font-bold">Aikars Flags Tuned</span>
              </div>
            </div>
          </div>

          {/* TAB 1: Console / Terminal logs */}
          {activeTab === "console" && (
            <div className="rounded-xl border border-border bg-card flex flex-col overflow-hidden h-[500px]">
              {/* Terminal header */}
              <div className="bg-[#141517] px-4 py-3 border-b border-border flex items-center justify-between text-xs text-muted-foreground font-mono">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span>Interactive Terminal Console</span>
                </div>
                <span>Port: 25565</span>
              </div>

              {/* Console window */}
              <div className="flex-grow bg-[#060708] p-4 overflow-y-auto font-mono text-[11px] text-zinc-400 space-y-1">
                {panelLogs.map((log, idx) => {
                  let color = "text-zinc-500";
                  if (log.includes("ONLINE") || log.includes("successfully")) color = "text-emerald-400 font-bold";
                  else if (log.includes("Error") || log.includes("Warning")) color = "text-red-400 font-bold";
                  else if (log.includes("> ")) color = "text-primary font-bold";
                  else if (log.includes("[Nivle Daemon]")) color = "text-primary/90";
                  else if (log.includes("Done")) color = "text-emerald-500 font-bold";

                  return (
                    <p key={idx} className={color}>
                      {log}
                    </p>
                  );
                })}
                <div ref={consoleEndRef} />
              </div>

              {/* Terminal Input Form */}
              <form onSubmit={handleSendCommand} className="border-t border-border bg-[#141517] p-3 flex gap-2">
                <span className="text-muted-foreground font-mono text-xs flex items-center pl-2">&gt;</span>
                <input
                  type="text"
                  placeholder="Type a command (e.g. help, say, list, tps, op)..."
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-grow bg-transparent text-xs font-mono text-foreground focus:outline-none placeholder:text-muted-foreground/60"
                  aria-label="Terminal Command"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-opacity"
                >
                  Send
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: File Manager */}
          {activeTab === "files" && (
            <div className="rounded-xl border border-border bg-card grid grid-cols-1 md:grid-cols-12 overflow-hidden h-[500px]">
              
              {/* File tree navigation (4 columns) */}
              <div className="md:col-span-4 border-r border-border bg-[#141517] p-4 space-y-4">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">File Directory</h3>
                <div className="space-y-1">
                  {Object.keys(MOCK_FILES).map((fileName) => (
                    <button
                      key={fileName}
                      onClick={() => handleSelectFile(fileName)}
                      className={`w-full p-2 rounded text-left text-xs flex items-center gap-2.5 transition-colors ${
                        selectedFileName === fileName
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <FileCode className="h-4 w-4" />
                      <span className="truncate">{fileName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* File editor (8 columns) */}
              <div className="md:col-span-8 flex flex-col justify-between bg-[#0c0d0e]">
                {/* Editor Header */}
                <div className="bg-[#141517] px-4 py-3 border-b border-border flex items-center justify-between text-xs">
                  <span className="font-mono text-foreground font-bold">{selectedFileName}</span>
                  <button
                    onClick={handleSaveFile}
                    className="px-3 py-1.5 rounded bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>Save File</span>
                  </button>
                </div>

                {/* Textarea Code Area */}
                <textarea
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  className="flex-grow p-4 bg-transparent font-mono text-[11px] text-zinc-300 focus:outline-none resize-none h-full leading-relaxed"
                  aria-label="File Editor"
                />
              </div>

            </div>
          )}

          {/* TAB 3: Modpack Installer */}
          {activeTab === "mods" && (
            <div className="rounded-xl border border-border bg-card p-6 space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">1-Click Modpack Installer</h3>
                <p className="text-xs text-muted-foreground">
                  Install popular Modpacks instantly on your server node. Make sure your server is stopped before installing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MODPACKS.map((mod) => (
                  <div key={mod.id} className="p-4 rounded-xl border border-border bg-[#141517] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-black text-xs">
                        {mod.logo}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground">{mod.name}</h4>
                        <p className="text-[10px] text-muted-foreground">{mod.version} • {mod.size}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleInstallModpack(mod)}
                      disabled={isInstallingMod !== null}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isInstallingMod === mod.id
                          ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                          : "bg-primary text-primary-foreground hover:opacity-90"
                      }`}
                    >
                      {isInstallingMod === mod.id ? (
                        <>
                          <span className="animate-spin h-3.5 w-3.5 border-b-2 border-current rounded-full" />
                          <span>Installing...</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-3.5 w-3.5" />
                          <span>Install</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Settings */}
          {activeTab === "settings" && (
            <div className="rounded-xl border border-border bg-card p-6 space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">Server Settings</h3>
                <p className="text-xs text-muted-foreground">Quickly adjust core server parameters without editing raw configuration files.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border">
                {/* Setting 1 */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground block">Server Port</label>
                  <input
                    type="text"
                    value="25565"
                    disabled
                    className="w-full px-3.5 py-2 rounded-lg border border-border bg-muted/40 text-xs text-muted-foreground font-mono focus:outline-none"
                  />
                  <span className="text-[10px] text-muted-foreground">Standard Minecraft port. Dedicated IP bypasses port sharing.</span>
                </div>

                {/* Setting 2 */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground block">Max Player Slots</label>
                  <input
                    type="number"
                    defaultValue="100"
                    className="w-full px-3.5 py-2 rounded-lg border border-border bg-[#141517] text-xs text-foreground font-mono focus:outline-none focus:border-primary"
                  />
                  <span className="text-[10px] text-muted-foreground">Maximum concurrent connection limit.</span>
                </div>

                {/* Setting 3 */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground block">Java Version</label>
                  <select className="w-full px-3.5 py-2 rounded-lg border border-border bg-[#141517] text-xs text-foreground focus:outline-none focus:border-primary">
                    <option>Java 17 (Recommended)</option>
                    <option>Java 21 (LTS)</option>
                    <option>Java 11 (Legacy)</option>
                    <option>Java 8 (Legacy 1.7-1.12)</option>
                  </select>
                  <span className="text-[10px] text-muted-foreground">Select the JVM runtime version.</span>
                </div>

                {/* Setting 4 */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground block">Automatic Auto-Restart</label>
                  <select className="w-full px-3.5 py-2 rounded-lg border border-border bg-[#141517] text-xs text-foreground focus:outline-none focus:border-primary">
                    <option>Every 24 Hours (Graceful)</option>
                    <option>Every 12 Hours</option>
                    <option>Disabled</option>
                  </select>
                  <span className="text-[10px] text-muted-foreground">Graceful container reboot to flush memory cache.</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
