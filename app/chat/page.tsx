"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MOCK_USERS } from "@/lib/mockData";
import { formatRelativeTime } from "@/lib/utils";
import { Send, Search, MoreVertical, Phone, Video, ArrowLeft, Smile, Paperclip } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  content: string;
  time: Date;
}

const MOCK_MESSAGES: Message[] = [
  { id: "1", senderId: "2", content: "Hey! I saw your profile and I think we'd be a great match for a skill swap 🎨", time: new Date(Date.now() - 3600000) },
  { id: "2", senderId: "1", content: "Hi Fatima! I totally agree. I've been looking for a UI/UX mentor for a while now.", time: new Date(Date.now() - 3500000) },
  { id: "3", senderId: "2", content: "Perfect! I need to learn React for my projects. How many hours per week can you commit?", time: new Date(Date.now() - 3400000) },
  { id: "4", senderId: "1", content: "I can do 2-3 hours per week, evenings usually. How about you?", time: new Date(Date.now() - 3300000) },
  { id: "5", senderId: "2", content: "Same here! Let's do one 90-minute session each week. I'll teach you Figma and UX principles, you teach me React 💪", time: new Date(Date.now() - 3200000) },
  { id: "6", senderId: "1", content: "That sounds perfect! Can we start this Saturday? I'll send a Google Meet link.", time: new Date(Date.now() - 3100000) },
  { id: "7", senderId: "2", content: "Saturday works great! Really excited about this swap 🚀", time: new Date(Date.now() - 60000) },
];

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(MOCK_USERS[1]);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, {
      id: String(Date.now()),
      senderId: "1",
      content: input.trim(),
      time: new Date(),
    }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        id: String(Date.now() + 1),
        senderId: selectedUser._id,
        content: "Great! Looking forward to our session 😊",
        time: new Date(),
      }]);
    }, 1500);
  };

  const conversations = MOCK_USERS.filter((u) => u._id !== "1").map((u) => ({
    user: u,
    lastMessage: u._id === "2" ? "Saturday works great! Really excited..." : "Hey, interested in swapping skills!",
    time: u._id === "2" ? new Date(Date.now() - 60000) : new Date(Date.now() - 86400000),
    unread: u._id === "2" ? 1 : 0,
  }));

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <aside className={`${mobileView === "chat" ? "hidden md:flex" : "flex"} flex-col w-full md:w-72 xl:w-80 glass border-r border-white/5 flex-shrink-0`}>
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-4">
            <Link href="/dashboard" className="text-white/40 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h2 className="font-bold text-white">Messages</h2>
            <div className="w-5" />
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search conversations..." className="input-cyber w-full pl-9 pr-4 py-2.5 rounded-xl text-sm" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-white/5">
          {conversations.map((conv) => (
            <button key={conv.user._id} onClick={() => { setSelectedUser(conv.user); setMobileView("chat"); }} className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-white/3 transition-colors text-left ${selectedUser._id === conv.user._id ? "bg-neon-green/5 border-l-2 border-neon-green" : ""}`}>
              <div className="relative flex-shrink-0">
                <Image src={conv.user.image || ""} alt={conv.user.name} width={40} height={40} className="w-10 h-10 rounded-full" />
                {conv.user.isOnline && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-neon-green rounded-full border-2 border-background" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white truncate">{conv.user.name}</p>
                  <span className="text-xs text-white/25 flex-shrink-0">{formatRelativeTime(conv.time)}</span>
                </div>
                <p className="text-xs text-white/40 truncate mt-0.5">{conv.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>
      <main className={`${mobileView === "list" ? "hidden md:flex" : "flex"} flex-1 flex-col min-w-0`}>
        <div className="glass border-b border-white/5 px-4 sm:px-6 py-4 flex items-center gap-3">
          <button onClick={() => setMobileView("list")} className="md:hidden text-white/40 hover:text-white"><ArrowLeft size={20} /></button>
          <div className="relative">
            <Image src={selectedUser.image || ""} alt={selectedUser.name} width={40} height={40} className="w-10 h-10 rounded-full" />
            {selectedUser.isOnline && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-neon-green rounded-full border-2 border-background" />}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white text-sm">{selectedUser.name}</p>
            <p className="text-xs text-white/30">{selectedUser.isOnline ? "Online now" : `Last seen ${formatRelativeTime(selectedUser.lastSeen)}`}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-white/30 hover:text-neon-green transition-colors rounded-lg hover:bg-neon-green/10"><Phone size={17} /></button>
            <button className="p-2 text-white/30 hover:text-neon-cyan transition-colors rounded-lg hover:bg-neon-cyan/10"><Video size={17} /></button>
            <button className="p-2 text-white/30 hover:text-white transition-colors rounded-lg hover:bg-white/5"><MoreVertical size={17} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isMe = msg.senderId === "1";
            return (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
                {!isMe && <Image src={selectedUser.image || ""} alt="" width={28} height={28} className="w-7 h-7 rounded-full mb-1" />}
                <div className={`max-w-xs ${isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isMe ? "bg-neon-green text-black font-medium rounded-br-md" : "glass border border-white/8 text-white/80 rounded-bl-md"}`}>{msg.content}</div>
                  <span className="text-xs text-white/20">{formatRelativeTime(msg.time)}</span>
                </div>
              </motion.div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="glass border-t border-white/5 p-4 flex items-center gap-3">
          <button className="p-2 text-white/25 hover:text-white/60 transition-colors"><Paperclip size={18} /></button>
          <div className="flex-1 relative">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()} placeholder="Type a message..." className="input-cyber w-full px-4 py-3 pr-12 rounded-2xl text-sm" />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"><Smile size={18} /></button>
          </div>
          <button onClick={sendMessage} disabled={!input.trim()} className="w-11 h-11 bg-neon-green text-black rounded-2xl flex items-center justify-center hover:bg-neon-green/90 transition-all shadow-neon disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"><Send size={16} /></button>
        </div>
      </main>
    </div>
  );
}
