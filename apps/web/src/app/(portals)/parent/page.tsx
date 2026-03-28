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
 * ==========================================================
 */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Zap, CreditCard, ChevronRight, 
  Award, Bell, ShieldCheck, CheckCircle2, Coins
} from 'lucide-react';
import { PrathamButton, PrathamCard } from '@prathamone/ui';
import { useProgressStore } from '@/lib/store/progress';
import { useCurriculumStore } from '@/lib/store/curriculum';

export default function ParentDashboard() {
  const { selectedLanguage } = useCurriculumStore();
  const { 
    studentName, completedChapters, currentStreak, verifiedChapters, coins, verifyChapter, loadChildProfile 
  } = useProgressStore();
  
  const [showRecharge, setShowRecharge] = useState(false);
  const [activeChildId, setActiveChildId] = useState('c1');

  const handleChildSwitch = (id: string) => {
    setActiveChildId(id);
    loadChildProfile(id);
  };

  const pendingVerification = completedChapters.filter(c => !verifiedChapters.includes(c.chapter));
  const masteryPercentage = Math.min(Math.round((completedChapters.length / 50) * 100), 100);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <nav className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary rounded-2xl flex items-center justify-center text-white font-black text-xl overflow-hidden p-1">
            <img src="/logo-ganesha.png" alt="P" className="w-full h-full object-contain invert brightness-0" />
          </div>
          <h1 className="text-xl font-black tracking-tight text-gray-900 uppercase">Sovereign Parent</h1>
        </div>
      </nav>

      <main className="px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        <div className="lg:col-span-8 space-y-8">
          {/* Child Selection (Multi-Child Switcher) */}
          <div className="flex items-center gap-4">
             <div className="relative group">
                <button className="flex items-center gap-3 px-6 py-4 rounded-[32px] bg-white shadow-xl shadow-black/5 border-2 border-brand-primary min-w-[240px]">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary font-bold">
                    {studentName[0] || 'S'}
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-black text-sm uppercase tracking-tight text-gray-900">{studentName}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{activeChildId === 'c1' ? 'Class 10' : 'Class 8'}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 rotate-90" />
                </button>
                
                {/* Simulated Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                   <button 
                     onClick={() => handleChildSwitch('c1')}
                     className={`w-full text-left p-4 rounded-2xl font-bold text-sm ${activeChildId === 'c1' ? 'bg-brand-primary/5 text-brand-primary' : 'text-gray-500 hover:bg-gray-50'}`}
                   >
                     Demo Scholar (Class 10)
                   </button>
                   <button 
                     onClick={() => handleChildSwitch('c2')}
                     className={`w-full text-left p-4 rounded-2xl font-bold text-sm ${activeChildId === 'c2' ? 'bg-brand-primary/5 text-brand-primary' : 'text-gray-500 hover:bg-gray-50'}`}
                   >
                     Junior Scholar (Class 8)
                   </button>
                </div>
             </div>
          </div>

          <PrathamCard variant="glass">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-gray-900 leading-none mb-2">
                  {studentName}'s Mastery
                </h2>
                <p className="text-gray-500 font-bold text-sm tracking-tight uppercase">
                  Performing through the PrathamOne Sovereign Node
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="bg-orange-50/50 p-6 rounded-[32px] border border-orange-100">
                <Zap size={20} className="text-orange-500 mb-4" />
                <p className="text-4xl font-black text-gray-900 leading-none mb-1">{currentStreak}</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Day Streak</p>
              </div>
              <div className="bg-brand-primary/5 p-6 rounded-[32px] border border-brand-primary/10">
                <TrendingUp size={20} className="text-brand-primary mb-4" />
                <p className="text-4xl font-black text-gray-900 leading-none mb-1">{masteryPercentage}%</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Syllabus Done</p>
              </div>
              <div className="bg-yellow-50/50 p-6 rounded-[32px] border border-yellow-100">
                <Coins size={20} className="text-yellow-600 mb-4" />
                <p className="text-4xl font-black text-gray-900 leading-none mb-1">{coins}</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Pratham Coins</p>
              </div>
            </div>
          </PrathamCard>

          {/* Mastery Approval Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-primary" /> Approval Requests
            </h3>
            {pendingVerification.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {pendingVerification.map((c) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={c.chapter} 
                    className="bg-white p-6 rounded-[32px] flex items-center justify-between border border-gray-100 shadow-sm"
                  >
                    <div>
                      <p className="font-black text-lg text-gray-900 leading-tight mb-1">{c.chapter}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">{c.subject} • {c.accuracy}% Accuracy</p>
                    </div>
                    <PrathamButton 
                      size="sm" 
                      className="rounded-2xl px-6 h-12"
                      onClick={() => verifyChapter(c.chapter)}
                    >
                      Verify
                    </PrathamButton>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border border-dashed border-gray-200 p-12 rounded-[40px] text-center">
                 <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">All milestones approved</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          {/* AI Sovereign Credits */}
          <PrathamCard variant="glass" className="bg-brand-primary text-white text-center border-none shadow-2xl shadow-brand-primary/20">
             <CreditCard size={32} className="mx-auto mb-4 opacity-80" />
             <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80 text-white/70">AI Subscription</p>
             <h3 className="text-4xl font-black mb-6 uppercase tracking-tight">Sovereign Unlimited</h3>
             <PrathamButton variant="secondary" className="w-full bg-white text-brand-primary border-none font-black text-xs h-14 rounded-2xl">Manage Family Node</PrathamButton>
          </PrathamCard>

          {/* Verification Log */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Mastery Certification Log</h4>
            <div className="space-y-4">
              {verifiedChapters.length > 0 ? verifiedChapters.slice().reverse().map(id => (
                <div key={id} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-brand-success/10 flex items-center justify-center text-brand-success">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="font-bold text-sm text-gray-700 tracking-tight">{id}</span>
                </div>
              )) : (
                <p className="text-[10px] text-gray-400 font-bold uppercase italic">No history yet.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
