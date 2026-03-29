"use client";

/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Organization : AITDL Network | PrathamOne
 * Framework    : Autonomous AI Agent Development
 * Authored By  : Jawahar R Mallah
 * Version      : 1.1.0
 * Release Date : 29 March 2026
 * Environment  : Production
 *
 * Signature    : Engineered by Jawahar R Mallah
 * Motto        : Crafted with Logic, Vision & AI
 * ==========================================================
 */

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Languages,
  GraduationCap,
  ChevronRight,
  School,
  ShieldCheck,
  Zap,
  Globe,
  Cpu
} from "lucide-react";
import { useCurriculumStore } from "@/lib/store/curriculum";
import {
  BOARDS,
  UI_BOARD_CATEGORIES,
  STATE_BOARDS,
  INTL_BOARDS,
  type BoardId,
  LANGUAGES,
} from "@prathamone/db";
import { PrathamButton, PrathamCard } from "@/components/classroom/ClassroomUI";

/**
 * PrathamOne - Main Landing Page
 */

export default function LandingPage() {
  const router = useRouter();
  const {
    selectedBoard,
    setBoard,
    selectedGrade,
    setGrade,
    selectedLanguage,
    setLanguage,
  } = useCurriculumStore();
  const [showAllGrades, setShowAllGrades] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-secondary rounded-full blur-[120px]" />
      </div>

      <motion.div
        className="max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <header className="text-center mb-12">
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-6 mb-10"
          >
            <div className="bg-white px-8 py-10 md:px-16 md:py-12 rounded-3xl shadow-2xl border border-slate-200 group hover:shadow-indigo-500/10 transition-all cursor-default w-full max-w-2xl mx-auto flex items-center justify-center overflow-hidden">
              <img
                src="/branding/logo-full.png"
                alt="PrathamOne Official Logo"
                className="w-full h-auto max-h-[85px] object-contain"
              />
            </div>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1]"
          >
            Sovereign AI Classroom <br />
            <span className="text-brand-primary">for the Future of Bharat.</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            The intelligent, offline-first educational ledger designed for Indian excellence. 
            Optimized for regional streams and indigenous curricula.
          </motion.p>
        </header>

        {/* Feature Highlights */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
           <FeatureCard 
             icon={<Cpu className="text-brand-primary" />} 
             title="Sovereign Engine" 
             desc="Offline-first AI pedagogy with local data sovereignty."
           />
           <FeatureCard 
             icon={<Languages className="text-brand-secondary" />} 
             title="Multi-Stream Parity" 
             desc="Native instruction in English, Hindi, Marathi, & Gujarati."
           />
           <FeatureCard 
             icon={<ShieldCheck className="text-brand-success" />} 
             title="Institutional Grade" 
             desc="Secure, white-labeled control for schools and government."
           />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {/* Curriculum Selection Card */}
          <div className="pratham-card p-8 flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <School className="w-6 h-6 text-brand-primary" />
              <h2 className="text-xl font-bold">Curriculum Details</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-2">
                  Select Board
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {UI_BOARD_CATEGORIES.map((cat) => {
                    const isActive =
                      cat.id === selectedBoard ||
                      (cat.id === "STATE_BOARD" &&
                        STATE_BOARDS.includes(selectedBoard as BoardId)) ||
                      (cat.id === "INTL_BOARD" &&
                        INTL_BOARDS.includes(selectedBoard as BoardId));

                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          if (cat.id === "STATE_BOARD")
                            setBoard(STATE_BOARDS[0]);
                          else if (cat.id === "INTL_BOARD")
                            setBoard(INTL_BOARDS[0]);
                          else setBoard(cat.id as BoardId);
                        }}
                        className={`p-3 text-sm rounded-md border text-left transition-all ${
                          isActive
                            ? "border-brand-primary bg-brand-primary/5 font-bold shadow-sm"
                            : "border-gray-100 hover:border-gray-300"
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {STATE_BOARDS.includes(selectedBoard as BoardId) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <select
                        value={selectedBoard || ""}
                        onChange={(e) => setBoard(e.target.value as BoardId)}
                        className="w-full p-3 text-sm rounded-md border border-gray-200 bg-gray-50 text-gray-700 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary cursor-pointer font-medium"
                      >
                        {STATE_BOARDS.map((b) => (
                          <option key={b} value={b}>
                            {BOARDS[b].region} ({BOARDS[b].name})
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  )}

                  {INTL_BOARDS.includes(selectedBoard as BoardId) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <select
                        value={selectedBoard || ""}
                        onChange={(e) => setBoard(e.target.value as BoardId)}
                        className="w-full p-3 text-sm rounded-md border border-gray-200 bg-gray-50 text-gray-700 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary cursor-pointer font-medium"
                      >
                        {INTL_BOARDS.map((b) => (
                          <option key={b} value={b}>
                            {BOARDS[b].name}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-2">
                  Grade / Class
                </label>
                <div className="flex flex-wrap gap-2">
                  {(showAllGrades
                    ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                    : [6, 7, 8, 9, 10, 11, 12]
                  ).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGrade(g)}
                      className={`w-12 h-12 flex items-center justify-center rounded-full border text-sm font-bold transition-all ${
                        selectedGrade === g
                          ? "bg-brand-primary text-white border-brand-primary shadow-md scale-110"
                          : "border-gray-100 hover:border-brand-primary/30 hover:bg-brand-primary/5"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                  <button
                    onClick={() => setShowAllGrades((v: boolean) => !v)}
                    className="px-4 h-12 rounded-full border border-dashed border-gray-300 text-gray-400 text-xs font-semibold hover:border-brand-primary/40 hover:text-brand-primary transition-colors"
                  >
                    {showAllGrades ? "Less ↑" : "1–5 ↓"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Language Selection Card */}
          <div className="pratham-card p-8 flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <Languages className="w-6 h-6 text-brand-secondary" />
              <h2 className="text-xl font-bold">Medium of Instruction</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {Object.values(LANGUAGES).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`p-4 rounded-md border flex flex-col transition-all ${
                    selectedLanguage === lang.code
                      ? "border-brand-secondary bg-brand-secondary/5 shadow-sm"
                      : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <span className="text-lg font-bold">{lang.nativeName}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">
                    {lang.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
          <PrathamButton
            disabled={!selectedGrade}
            onClick={() => router.push("/student/classroom")}
            size="lg"
            className="px-16 h-20 text-xl shadow-2xl shadow-brand-primary/20"
          >
            Enter Sovereign Classroom
            <ChevronRight className="w-8 h-8" />
          </PrathamButton>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Authorized Access Only • Sovereign Node Active</p>
        </motion.div>

        {/* Trust Layer */}
        <motion.div 
          variants={itemVariants}
          className="mt-28 flex flex-col items-center gap-8 opacity-40 grayscale"
        >
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Powered by the Sovereign Bharat Network</span>
           <div className="flex flex-wrap justify-center gap-12">
              <div className="flex items-center gap-2 font-black text-xl italic tracking-tighter opacity-50">PRATHAMONE</div>
              <div className="flex items-center gap-2 font-black text-xl italic tracking-tighter opacity-50 underline decoration-4 decoration-brand-primary">AITDL.NETWORK</div>
           </div>
        </motion.div>

        {/* 🏛️ Absolute Full-width Global Footer breakout */}
        <footer className="relative mt-28 bg-brand-primary text-white py-16 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-16 items-start">
              {/* BRAND SECTION (IDENTITY) */}
              <div className="space-y-4 col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1.5 rounded-xl shadow-xl shadow-white/10 group hover:scale-110 transition-transform">
                    <img
                      src="/logo-ganesha.png"
                      alt="Logo"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-black tracking-tighter leading-none">
                      PrathamOne
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary">
                      Sovereign AI
                    </span>
                  </div>
                </div>
                <p className="text-indigo-50/70 text-[13px] leading-relaxed max-w-xs font-medium italic">
                  Empowering Bharat with pedagogical excellence through Sovereign (Offline-First) AI. 
                </p>
              </div>

              {/* ACCESS SECTION (PORTALS / LOGIN) */}
              <div className="flex flex-col gap-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-secondary mb-1">
                  Portal Access
                </h4>
                <a
                  href="/student"
                  className="text-sm font-bold text-white hover:text-brand-secondary transition-all flex items-center gap-2 group"
                >
                  <div className="w-1 h-1 rounded-full bg-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Student Classroom
                </a>
                <a
                  href="/admin"
                  className="text-sm font-bold text-white hover:text-brand-secondary transition-all flex items-center gap-2 group"
                >
                  <div className="w-1 h-1 rounded-full bg-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Admin Dashboard
                </a>
                <div className="pt-2">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white/40">
                    Staff Hub Coming Soon
                  </span>
                </div>
              </div>

              {/* GOVERNANCE SECTION (LEGAL) */}
              <div className="flex flex-col gap-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-secondary mb-1">
                  Governance
                </h4>
                <a
                  href="/terms"
                  className="text-sm font-bold text-white hover:text-brand-secondary transition-all flex items-center gap-2 group"
                >
                  <div className="w-1 h-1 rounded-full bg-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Terms of Use
                </a>
                <a
                  href="/privacy"
                  className="text-sm font-bold text-white hover:text-brand-secondary transition-all flex items-center gap-2 group"
                >
                  <div className="w-1 h-1 rounded-full bg-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Privacy Policy
                </a>
              </div>

              {/* NETWORK SECTION (RESOURCES) */}
              <div className="flex flex-col gap-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-secondary mb-1">
                  Network
                </h4>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://aitdl.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white hover:text-brand-secondary transition-all"
                  >
                    aitdl.com
                  </a>
                  <a
                    href="https://prathamone.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white hover:text-brand-secondary transition-all"
                  >
                    prathamone.com
                  </a>
                </div>
              </div>
            </div>

            {/* LEGAL ATTRIBUTION - ZERO FORMAT (CRYSTAL CLEAR SECONDARY TEXT) */}
            <div className="mb-8 pt-4 border-t border-white/10">
              <p className="text-[11px] text-white/40 leading-relaxed font-medium tracking-normal max-w-4xl">
                Pedagogical syllabus artifacts and curriculum hierarchies are provided under the Open Access Policy of the
                eBalbharati Bureau, Pune. PrathamOne is an independent AI delivery platform.
              </p>
            </div>

            {/* FINAL COPYRIGHT BAR (CRYSTAL CLEAR SUBTLE BAR) */}
            <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white/20">
              <div className="flex items-center gap-2">
                <span>© {new Date().getFullYear()} PrathamOne Eduwork</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden md:inline">•</span>
                <span>
                  Engineered by{" "}
                  <a
                    href="https://aitdl.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-all text-brand-secondary"
                  >
                    AITDL NETWORK
                  </a>
                </span>
              </div>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white/50 backdrop-blur-sm p-8 rounded-[32px] border border-white/50 shadow-sm flex flex-col gap-4 text-center items-center group hover:bg-white transition-all">
       <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
         {icon}
       </div>
       <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">{title}</h3>
       <p className="text-xs font-medium text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}
