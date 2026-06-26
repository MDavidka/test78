"use client";

import React, { useState } from "react";
import { KB_ARTICLES } from "@/lib/data";
import { 
  Search, 
  BookOpen, 
  Clock, 
  Send, 
  HelpCircle, 
  Check, 
  ArrowRight,
  MessageSquare,
  Mail,
  X,
  FileText
} from "lucide-react";

interface KBArticle {
  id: string;
  title: string;
  category: string;
  description: string;
  readTime: string;
}

export default function ContactPage() {
  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<KBArticle | null>(null);
  
  // Ticket Form States
  const [ticketName, setTicketName] = useState("");
  const [ticketEmail, setTicketEmail] = useState("");
  const [ticketPriority, setTicketPriority] = useState("medium");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState("");

  // Filter KB Articles
  const filteredArticles = KB_ARTICLES.filter((art: any) => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Ticket Submit Handler
  const handleTicketSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ticketName || !ticketEmail || !ticketSubject || !ticketMessage) {
      alert("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API round-trip
    setTimeout(() => {
      const ticketId = `NV-${Math.floor(Math.random() * 9000) + 1000}`;
      setGeneratedTicketId(ticketId);
      setIsSubmitting(false);
      setTicketSuccess(true);
      
      // Clear form
      setTicketName("");
      setTicketEmail("");
      setTicketSubject("");
      setTicketMessage("");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-background bg-grid-pattern pb-16">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/3 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Average response time: 12 minutes</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Support & Help Desk
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Search our comprehensive knowledge base or submit a support ticket directly to our 24/7 technical team.
        </p>
      </section>

      {/* Main Support Workspace */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Knowledge Base Search (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Knowledge Base Articles
              </h2>
              
              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles (e.g. FTP, mods, domains, optimization)..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Articles Grid */}
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12 border border-border bg-card rounded-2xl">
                <FileText className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-xs font-bold text-foreground">No articles found</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Try searching for other terms like &ldquo;Paper&rdquo; or &ldquo;backup&rdquo;.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredArticles.map((art: any) => (
                  <button
                    key={art.id}
                    onClick={() => setSelectedArticle(art)}
                    className="text-left p-5 rounded-xl border border-border bg-card hover:border-primary/20 transition-all flex flex-col justify-between group min-h-[160px]"
                  >
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold text-primary uppercase tracking-wider bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                        {art.category}
                      </span>
                      <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {art.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                        {art.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border/40 mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {art.readTime}
                      </span>
                      <span className="font-bold text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Read Guide &rarr;
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Ticket Submission Form (5 Columns) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-6 shadow-2xl relative">
              <div className="absolute top-0 right-0 p-3 bg-primary/10 text-primary text-[9px] font-black tracking-widest uppercase rounded-bl-xl border-l border-b border-primary/20">
                🎫 SUPPORT TICKET
              </div>

              <div className="space-y-1">
                <h2 className="text-lg font-bold text-foreground">Submit Support Ticket</h2>
                <p className="text-xs text-muted-foreground">Submit your query. Our gaming technicians are online 24/7/365.</p>
              </div>

              {ticketSuccess ? (
                <div className="p-6 rounded-xl border border-primary/20 bg-primary/5 text-center space-y-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-foreground">Ticket Created!</h3>
                    <p className="text-xs text-primary font-mono font-bold">{generatedTicketId}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Your ticket has been logged in our queue. A technician has been assigned and will respond via email within 15 minutes.
                    </p>
                  </div>
                  <button
                    onClick={() => setTicketSuccess(false)}
                    className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground border border-border text-xs font-bold hover:bg-muted transition-all"
                  >
                    Submit Another Ticket
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={ticketName}
                        onChange={(e) => setTicketName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-[#141517] text-xs text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground/50"
                        placeholder="Steve"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={ticketEmail}
                        onChange={(e) => setTicketEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-[#141517] text-xs text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground/50"
                        placeholder="steve@minecraft.net"
                      />
                    </div>
                  </div>

                  {/* Priority & Server ID */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Priority Level</label>
                      <select
                        value={ticketPriority}
                        onChange={(e) => setTicketPriority(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-[#141517] text-xs text-foreground focus:outline-none focus:border-primary"
                      >
                        <option value="low">Low (General Query)</option>
                        <option value="medium">Medium (Standard)</option>
                        <option value="high">High (Server Offline!)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Server ID (Optional)</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 rounded-lg border border-border bg-[#141517] text-xs text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground/30 font-mono"
                        placeholder="daemon-mc-01"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Subject *</label>
                    <input
                      type="text"
                      required
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-[#141517] text-xs text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground/50"
                      placeholder="Can't connect to FTP server"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Message Details *</label>
                    <textarea
                      required
                      rows={4}
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-[#141517] text-xs text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground/50 resize-none leading-relaxed"
                      placeholder="Please describe your technical issue here in detail..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-95 transition-all text-xs flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin h-3.5 w-3.5 border-b-2 border-current rounded-full" />
                        <span>Submitting to Queue...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Submit Support Ticket</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Alternative Support Channels */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl border border-border bg-card flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 flex-shrink-0">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-foreground">Community Discord</h3>
              <p className="text-xs text-muted-foreground">Join our active Discord community. Chat with other server owners and get quick peer-to-peer advice.</p>
              <span className="text-[10px] text-primary font-bold block pt-1 hover:underline cursor-pointer">Join Discord Server &rarr;</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 flex-shrink-0">
              <Mail className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-foreground">Email Support</h3>
              <p className="text-xs text-muted-foreground">Prefer direct email? Send your inquiries directly to our support inbox for non-urgent queries.</p>
              <span className="text-[10px] text-primary font-bold block pt-1 hover:underline cursor-pointer">support@nivle.host</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 flex-shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-foreground">SLA response times</h3>
              <p className="text-xs text-muted-foreground">Our support technicians are strictly bound by SLA guarantees. High priority issues are resolved within 15 minutes.</p>
              <span className="text-[10px] text-emerald-500 font-bold block pt-1 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                99.8% SLA compliance today
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Detail Modal View */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141517] border border-border rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-card p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-primary uppercase tracking-wider bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded">
                  {selectedArticle.category}
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {selectedArticle.readTime}
                </span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-zinc-300">
              <h3 className="text-lg font-extrabold text-foreground">{selectedArticle.title}</h3>
              <p className="text-sm text-muted-foreground italic">{selectedArticle.description}</p>
              
              <div className="border-t border-border/40 pt-4 space-y-4">
                <p>To perform this technical configuration on your Nivle Host server, follow these steps:</p>
                
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-[10px] flex-shrink-0">1</span>
                    <p>Log in to your <strong>Nivle Host Control Panel</strong> and select your active server container.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-[10px] flex-shrink-0">2</span>
                    <p>Navigate to the <strong>File Manager</strong> tab in the sidebar navigation window.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-[10px] flex-shrink-0">3</span>
                    <p>Locate the configuration file (e.g. <code>server.properties</code> or <code>paper.yml</code>) and click to open the inline code editor.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-[10px] flex-shrink-0">4</span>
                    <p>Modify the necessary variables to match your network properties, and click the <strong>Save File</strong> button.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-[10px] flex-shrink-0">5</span>
                    <p>Return to the <strong>Terminal Console</strong> and click the <strong>Restart</strong> button to apply the updated configurations to your server container runtime.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-[11px] text-muted-foreground">
                  <strong>Need further help?</strong> If you encounter any errors during this setup, click the button below to pre-populate a support ticket with this guide referenced.
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-card p-4 border-t border-border flex justify-end gap-2">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-lg border border-border text-xs font-bold hover:bg-muted transition-all"
              >
                Close Article
              </button>
              <button
                onClick={() => {
                  setTicketSubject(`Help regarding: ${selectedArticle.title}`);
                  setTicketMessage(`I was reading your guide "${selectedArticle.title}" but I need help with...`);
                  setSelectedArticle(null);
                  document.getElementById("ticket-form")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all text-xs"
              >
                Ask Support Team
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
