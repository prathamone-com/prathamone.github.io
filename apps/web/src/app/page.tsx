'use client';

/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Organization : AITDL Network | PrathamOne
 * Framework    : Autonomous AI Agent Development
 * Authored By  : Jawahar R Mallah
 * Version      : 1.0.0
 * Release Date : 28 March 2026
 * Environment  : Production
 *
 * Signature    : Engineered by Jawahar R Mallah
 * Motto        : Crafted with Logic, Vision & AI
 * ==========================================================
 */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Languages, GraduationCap, ChevronRight, School } from 'lucide-react';
import { useCurriculumStore } from '@/lib/store/curriculum';
import { BOARDS, UI_BOARD_CATEGORIES, STATE_BOARDS, INTL_BOARDS, type BoardId, LANGUAGES } from '@prathamone/db';
import { PrathamButton, PrathamCard } from '@prathamone/ui';

/**
 * PrathamOne - Main Landing Page
 */

export default function LandingPage() {
  const router = useRouter();
  const { 
    selectedBoard, setBoard, 
    selectedGrade, setGrade, 
    selectedLanguage, setLanguage 
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
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-6 mb-10">
            <div className="bg-white px-8 py-10 md:px-16 md:py-12 rounded-3xl shadow-2xl border border-slate-200 group hover:shadow-indigo-500/10 transition-all cursor-default w-full max-w-2xl mx-auto flex items-center justify-center overflow-hidden">
              <img 
                src="/branding/logo-full.png" 
                alt="PrathamOne Official Logo" 
                className="w-full h-auto max-h-[85px] object-contain"
              />
            </div>
          </motion.div>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            The intelligent AI classroom designed for Bharat. Optimized for Indian boards, curricula, and regional languages.
          </motion.p>
        </header>

        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {/* Curriculum Selection Card */}
          <div className="pratham-card p-8 flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <School className="w-6 h-6 text-brand-primary" />
              <h2 className="text-xl font-bold">Curriculum Details</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-2">Select Board</label>
                <div className="grid grid-cols-2 gap-2">
                  {UI_BOARD_CATEGORIES.map((cat) => {
                    const isActive = 
                       cat.id === selectedBoard ||
                       (cat.id === 'STATE_BOARD' && STATE_BOARDS.includes(selectedBoard as BoardId)) ||
                       (cat.id === 'INTL_BOARD' && INTL_BOARDS.includes(selectedBoard as BoardId));

                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                           if (cat.id === 'STATE_BOARD') setBoard(STATE_BOARDS[0]);
                           else if (cat.id === 'INTL_BOARD') setBoard(INTL_BOARDS[0]);
                           else setBoard(cat.id as BoardId);
                        }}
                        className={`p-3 text-sm rounded-md border text-left transition-all ${
                          isActive
                            ? 'border-brand-primary bg-brand-primary/5 font-bold shadow-sm' 
                            : 'border-gray-100 hover:border-gray-300'
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
                      animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <select 
                        value={selectedBoard || ''} 
                        onChange={(e) => setBoard(e.target.value as BoardId)}
                        className="w-full p-3 text-sm rounded-md border border-gray-200 bg-gray-50 text-gray-700 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary cursor-pointer font-medium"
                      >
                        {STATE_BOARDS.map(b => (
                          <option key={b} value={b}>{BOARDS[b].region} ({BOARDS[b].name})</option>
                        ))}
                      </select>
                    </motion.div>
                  )}

                  {INTL_BOARDS.includes(selectedBoard as BoardId) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <select 
                        value={selectedBoard || ''} 
                        onChange={(e) => setBoard(e.target.value as BoardId)}
                        className="w-full p-3 text-sm rounded-md border border-gray-200 bg-gray-50 text-gray-700 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary cursor-pointer font-medium"
                      >
                        {INTL_BOARDS.map(b => (
                          <option key={b} value={b}>{BOARDS[b].name}</option>
                        ))}
                      </select>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-2">Grade / Class</label>
                <div className="flex flex-wrap gap-2">
                  {(showAllGrades ? [1,2,3,4,5,6,7,8,9,10,11,12] : [6,7,8,9,10,11,12]).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGrade(g)}
                      className={`w-12 h-12 flex items-center justify-center rounded-full border text-sm font-bold transition-all ${
                        selectedGrade === g 
                          ? 'bg-brand-primary text-white border-brand-primary shadow-md scale-110' 
                          : 'border-gray-100 hover:border-brand-primary/30 hover:bg-brand-primary/5'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                  <button 
                    onClick={() => setShowAllGrades((v: boolean) => !v)}
                    className="px-4 h-12 rounded-full border border-dashed border-gray-300 text-gray-400 text-xs font-semibold hover:border-brand-primary/40 hover:text-brand-primary transition-colors"
                  >
                    {showAllGrades ? 'Less ↑' : '1–5 ↓'}
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
                      ? 'border-brand-secondary bg-brand-secondary/5 shadow-sm' 
                      : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg font-bold">{lang.nativeName}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center">
          <PrathamButton 
            disabled={!selectedGrade}
            onClick={() => router.push('/student/classroom')}
            size="lg"
            className="px-12"
          >
            Enter Classroom
            <ChevronRight className="w-6 h-6" />
          </PrathamButton>
        </motion.div>

        <motion.footer 
          variants={itemVariants}
          className="mt-24 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm"
        >
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="flex items-center gap-1 group cursor-default">
              <BookOpen className="w-4 h-4 text-brand-success" />
              <span className="group-hover:text-gray-600 transition-colors">NCERT Aligned</span>
            </div>
            <div className="w-1 h-1 bg-gray-200 rounded-full" />
            <span>AI Powered</span>
            <div className="w-1 h-1 bg-gray-200 rounded-full" />
            <span>Built for India</span>
          </div>
          <p>© 2026 PrathamOne AI. Supporting NEP 2020 Guidelines.</p>
        </motion.footer>
        {/* Footer section with legal and branding attribution */}
        <footer className="mt-20 py-12 border-t border-slate-100 bg-slate-50/50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-slate-600 font-medium mb-4">
              <span>© {new Date().getFullYear()} Prathamone</span>
              <span className="hidden md:inline h-1 w-1 bg-slate-300 rounded-full" />
              <span>Powered & Managed by <a href="https://aitdl.com" className="text-brand-primary hover:underline transition-all">AITDL NETWORK</a></span>
            </div>
            
            <div className="flex justify-center items-center gap-6 text-sm text-brand-primary font-bold mb-8">
              <a href="https://aitdl.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">aitdl.com</a>
              <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full" />
              <a href="https://prathamone.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">prathamone.com</a>
            </div>

            <div className="p-4 bg-white/50 rounded-xl border border-slate-200 inline-block max-w-2xl">
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Syllabus artifacts provided under the Open Access Policy of the eBalbharati Bureau, Pune.
              </p>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
