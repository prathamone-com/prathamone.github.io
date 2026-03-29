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
 * Version      : 1.1.0
 * Release Date : 29 March 2026
 * Environment  : Production
 * ==========================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Target, TrendingUp, Award, Calendar, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useProgressStore, computeBadges } from '@/lib/store/progress';
import { useCurriculumStore } from '@/lib/store/curriculum';
import { getTranslation } from '@prathamone/db/curriculum';

export default function ProgressPage() {
  const router = useRouter();
  const { selectedLanguage } = useCurriculumStore();
  const progressState = useProgressStore();
  const { 
    completedChapters, currentStreak, weakAreas, retentionHistory, recentActivity 
  } = progressState;
  
  // Calculate Sovereign Mode Engagement (Mock for now, but linked to completedChapters)
  const sovereignSyncPercent = completedChapters.length > 0 ? 88 : 0; 
  const preferredMedium = selectedLanguage === 'en' ? 'English' : selectedLanguage === 'hi' ? 'Hindi' : selectedLanguage === 'mr' ? 'Marathi' : 'Gujarati';

  const t = (key: string) => getTranslation(selectedLanguage, key);
  const badges = computeBadges(progressState);
  const earnedBadges = badges.filter(b => b.earned);

  // Calculate average accuracy
  const avgAccuracy = completedChapters.length > 0 
    ? Math.round(completedChapters.reduce((acc, c) => acc + (c.accuracy || 0), 0) / completedChapters.length)
    : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col overflow-x-hidden">
      {/* Premium Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => router.back()}
              className="p-3 hover:bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100 text-gray-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl font-black text-gray-900 tracking-tight">{t('my_progress') || 'My Learning Journey'}</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">{t('sovereign_analytics') || 'Sovereign Mastery Analytics'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-brand-primary/5 px-4 py-2 rounded-2xl border border-brand-primary/10">
            <img src="/logo-ganesha.png" alt="Ganesha-P" className="w-8 h-8 object-contain" />
            <span className="font-black text-xs text-brand-primary uppercase tracking-widest hidden sm:block">PrathamOne</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full p-6 md:p-10 flex flex-col gap-8 flex-1">
        
        {/* Top Banner Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={<Trophy className="text-yellow-500" />} 
            label={t('mastery_score') || 'Mastery Score'} 
            value={`${avgAccuracy}%`}
            subLabel={t('overall_accuracy') || 'Overall Accuracy'}
            color="bg-yellow-50"
          />
          <StatCard 
            icon={<TrendingUp className="text-brand-primary" />} 
            label={t('current_streak') || 'Learning Streak'} 
            value={`${currentStreak} ${t('days') || 'Days'}`}
            subLabel={t('keep_it_up') || 'Consistency is Key'}
            color="bg-brand-primary/10"
          />
          <StatCard 
            icon={<Target className="text-orange-600" />} 
            label={t('sovereign_sync') || 'Sovereign Sync'} 
            value={`${sovereignSyncPercent}%`}
            subLabel={t('offline_engagement') || 'Progress made offline'}
            color="bg-orange-50"
          />
          <StatCard 
            icon={<BookOpen className="text-brand-success" />} 
            label={t('chapters_done') || 'Syllabus Done'} 
            value={completedChapters.length}
            subLabel={`${Math.round((completedChapters.length / 50) * 100)}% of Curriculum`}
            color="bg-brand-success/10"
          />
          <StatCard 
            icon={<Award className="text-brand-secondary" />} 
            label={t('medium_mastery') || 'Medium Mastery'} 
            value={preferredMedium}
            subLabel={t('primary_instruction') || 'Primary Instruction Stream'}
            color="bg-brand-secondary/10"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Mastery Chart (Visual Only) */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm overflow-hidden relative">
               <div className="flex items-center justify-between mb-8">
                 <h2 className="text-2xl font-black text-gray-900 tracking-tight">{t('retention_analysis') || 'Retention Analysis'}</h2>
                 <div className="flex gap-2">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest"><div className="w-2 h-2 rounded-full bg-brand-primary" /> Mastery</span>
                 </div>
               </div>

               <div className="h-64 w-full flex items-end justify-between gap-3 pt-10 px-4">
                  {retentionHistory.length > 0 ? (
                    retentionHistory.slice(-14).map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-3">
                         <div className="w-full relative group">
                            <motion.div 
                              initial={{ height: 0 }} animate={{ height: `${h.score}%` }}
                              className="w-full bg-brand-primary/10 rounded-t-xl hover:bg-brand-primary/30 transition-colors"
                            />
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                              {h.score}%
                            </div>
                         </div>
                         <span className="text-[9px] font-black text-gray-400 uppercase rotate-45 origin-left whitespace-nowrap">{h.date.split('-').slice(1).join('/')}</span>
                      </div>
                    ))
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                      <Target className="w-12 h-12 mb-4 opacity-20" />
                      <p className="font-bold">{t('start_lessons_to_see_data') || 'Complete lessons to see data'}</p>
                    </div>
                  )}
               </div>
            </section>

            {/* Subject Breakdown */}
            <section className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
               <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-8">{t('subject_breakdown') || 'Subject Breakdown'}</h2>
               <div className="space-y-6">
                 {['Mathematics', 'Science', 'English', 'Computer Science'].map((sub) => {
                    const chaps = completedChapters.filter(c => c.subject === sub);
                    const avgSubAccuracy = chaps.length > 0 
                      ? Math.round(chaps.reduce((acc, c) => acc + (c.accuracy || 0), 0) / chaps.length) 
                      : 0;
                    
                    return (
                      <div key={sub} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between px-1">
                           <span className="font-black text-gray-800 text-sm tracking-tight">{sub}</span>
                           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{chaps.length} Chapters • {avgSubAccuracy}% Mastery</span>
                        </div>
                        <div className="h-3 bg-gray-50 rounded-full border border-gray-100 overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }} animate={{ width: `${avgSubAccuracy}%` }}
                             className={`h-full ${avgSubAccuracy >= 80 ? 'bg-brand-success' : avgSubAccuracy > 50 ? 'bg-brand-primary' : 'bg-orange-400'}`}
                           />
                        </div>
                      </div>
                    );
                 })}
               </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-8">
             {/* Recent Achievements */}
             <section className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-black text-gray-900 tracking-tight mb-6">{t('recent_achievements') || 'Badges & Milestones'}</h2>
                <div className="flex flex-wrap gap-3">
                   {earnedBadges.length > 0 ? earnedBadges.map((b) => (
                      <motion.div 
                        key={b.id}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-14 h-14 rounded-2xl ${b.color.replace('text', 'bg').replace('-500', '/10').replace('-600', '/10')} flex flex-col items-center justify-center cursor-help`}
                        title={b.description}
                      >
                         <span className="text-2xl">{b.icon}</span>
                      </motion.div>
                   )) : (
                     <p className="text-xs text-gray-400 font-medium">{t('complete_chapters_to_earn') || 'Complete chapters to earn badges!'}</p>
                   )}
                </div>
             </section>

             {/* Recent Activity Feed */}
             <section className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-black text-gray-900 tracking-tight mb-6">{t('recent_activity') || 'Activity Feed'}</h2>
                <div className="space-y-6">
                   {recentActivity.length > 0 ? recentActivity.map((act) => (
                      <div key={act.id} className="flex gap-4">
                         <div className="text-xl">{act.icon}</div>
                         <div className="flex-1">
                            <p className="font-bold text-[13px] text-gray-900 leading-tight">{act.title}</p>
                            <p className="text-[11px] text-gray-500 font-medium mt-0.5">{act.description}</p>
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1">
                               <Calendar className="w-2.5 h-2.5" />
                               {new Date(act.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                            </p>
                         </div>
                      </div>
                   )) : (
                     <p className="text-xs text-gray-400 font-medium">No recent activity detected.</p>
                   )}
                </div>
             </section>
          </aside>

        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, subLabel, color }: { icon: React.ReactNode, label: string, value: string | number, subLabel: string, color: string }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm flex flex-col gap-4"
    >
      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center shadow-sm`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-2xl font-black text-gray-900 tracking-tight mb-2">{value}</p>
        <p className="text-xs font-bold text-gray-500 opacity-80">{subLabel}</p>
      </div>
    </motion.div>
  );
}
