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

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Flame, Target, Clock, TrendingUp, ChevronRight, Star, AlertCircle, Brain } from 'lucide-react';
import { useProgressStore, computeBadges } from '@/lib/store/progress';
import { useCurriculumStore } from '@/lib/store/curriculum';
import { RetentionChart, MasteryCircle, TopicHeatmap } from '@/components/progress/ProgressCharts';

export default function ProgressPage() {
  const router = useRouter();
  const {
    studentName,
    completedChapters,
    currentStreak,
    longestStreak,
    totalMinutesStudied,
    weakAreas,
    dailySessions,
    retentionHistory,
    removeWeakArea,
  } = useProgressStore();
  const { selectedBoard, selectedGrade } = useCurriculumStore();

  const totalHours = Math.floor(totalMinutesStudied / 60);
  const totalMins = totalMinutesStudied % 60;

  const subjectMap = completedChapters.reduce<Record<string, { count: number, accuracy: number }>>((acc, c) => {
    if (!acc[c.subject]) acc[c.subject] = { count: 0, accuracy: 0 };
    acc[c.subject].count += 1;
    acc[c.subject].accuracy = Math.round((acc[c.subject].accuracy + (c.accuracy || 80)) / (acc[c.subject].count > 1 ? 2 : 1));
    return acc;
  }, {});

  const avgAccuracy = completedChapters.length > 0
    ? Math.round(completedChapters.reduce((sum, c) => sum + (c.accuracy || 80), 0) / completedChapters.length)
    : 0;

  const avgRetention = completedChapters.length > 0
    ? Math.round(completedChapters.reduce((sum, c) => sum + (c.retentionScore || 80), 0) / completedChapters.length)
    : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = { hidden: { y: 16, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  const badges = computeBadges({ completedChapters, currentStreak, longestStreak, weakAreas, dailySessions });
  const earnedCount = badges.filter(b => b.earned).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => router.push('/classroom')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-extrabold text-xl text-brand-primary">My Progress</h1>
          <p className="text-xs text-gray-400 font-medium">{selectedBoard} • Class {selectedGrade}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Welcome Banner */}
          <motion.div
            variants={itemVariants}
            className="relative bg-gradient-to-br from-brand-primary to-brand-primary/80 rounded-3xl p-8 text-white overflow-hidden shadow-lg"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-10 -mb-10" />
            <div className="relative">
              <p className="text-white/70 font-bold text-xs mb-1 uppercase tracking-widest">Mastery Report</p>
              <h2 className="text-3xl font-black mb-6">{studentName} 🎓</h2>
              <div className="flex flex-wrap gap-12">
                <div>
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Chapters</p>
                  <p className="text-5xl font-black">{completedChapters.length}</p>
                </div>
                <div>
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Retention Index</p>
                  <p className="text-5xl font-black">{avgRetention}%</p>
                </div>
                <div>
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Total Time</p>
                  <p className="text-5xl font-black">{totalHours}h <span className="text-2xl opacity-60">{totalMins}m</span></p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Retention Trends Card */}
          <motion.div variants={itemVariants} className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-xl overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
            
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                   <TrendingUp className="w-5 h-5 text-brand-primary" />
                   <h3 className="font-black text-2xl text-gray-900">Retention Discovery</h3>
                </div>
                <p className="text-sm text-gray-400 font-medium tracking-tight">AI-predicted knowledge durability across concepts</p>
              </div>
              <div className="text-right">
                <span className="text-4xl font-black text-brand-primary">{avgAccuracy}%</span>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">Global Mastery</p>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-12 relative z-10">
              <div className="flex-1">
                <div className="mb-6 flex items-center justify-between">
                   <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest">Memory Decay Curve</h4>
                   <span className="text-[10px] font-bold text-brand-success bg-brand-success/10 px-2 py-0.5 rounded-md">Growth: +12%</span>
                </div>
                <RetentionChart data={retentionHistory} />
              </div>
              <div className="lg:w-px lg:h-48 bg-gray-100" />
              <div className="flex flex-wrap md:flex-col justify-center gap-8">
                {Object.entries(subjectMap).slice(0, 3).map(([sub, data]) => (
                   <MasteryCircle key={sub} score={data.accuracy} label={sub} color={sub === 'Mathematics' ? 'var(--brand-primary)' : sub === 'Science' ? 'var(--brand-secondary)' : 'var(--brand-success)'} />
                ))}
              </div>
            </div>

            {/* Knowledge Heatmap Section */}
            <div className="mt-12 pt-10 border-t border-gray-50 relative z-10">
               <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-6 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-brand-primary" /> Multi-Topic Knowledge Graph
               </h4>
               <TopicHeatmap 
                 topics={completedChapters.map(c => ({ name: c.chapter, score: c.accuracy || 80 }))} 
               />
            </div>
          </motion.div>

          {/* Streak + Stats Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <p className="text-3xl font-black text-gray-900">{currentStreak}</p>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Day Streak</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-brand-primary" />
              </div>
              <p className="text-3xl font-extrabold text-gray-900">{longestStreak}</p>
              <p className="text-xs font-semibold text-gray-500 text-center">Best Streak</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-brand-success/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-brand-success" />
              </div>
              <p className="text-3xl font-extrabold text-gray-900">{totalMinutesStudied}</p>
              <p className="text-xs font-semibold text-gray-500 text-center">Mins Studied</p>
            </div>
          </motion.div>

          {/* Badges / Achievements */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xl">🏅</span>
                <h3 className="font-extrabold text-lg text-gray-900">Achievements</h3>
              </div>
              <span className="text-sm font-bold text-gray-400">{earnedCount}/{badges.length} Earned</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {badges.map(badge => (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.04 }}
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                    badge.earned
                      ? 'bg-white border-gray-200 shadow-sm'
                      : 'bg-gray-50 border-gray-100 opacity-40 grayscale'
                  }`}
                >
                  {badge.earned && (
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-success rounded-full flex items-center justify-center">
                      <span className="text-white text-[9px] font-bold">✓</span>
                    </div>
                  )}
                  <span className="text-3xl">{badge.icon}</span>
                  <p className="text-xs font-extrabold text-gray-800 text-center leading-tight">{badge.title}</p>
                  <p className="text-[10px] text-gray-400 text-center leading-tight">{badge.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {Object.keys(subjectMap).length > 0 && (
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5 text-brand-primary" />
                <h3 className="font-extrabold text-lg text-gray-900">Subject Progress</h3>
              </div>
              <div className="space-y-4">
                {Object.entries(subjectMap).map(([subject, data]) => {
                  const totalChapters = subject === 'Mathematics' ? 5 : 4;
                  const pct = Math.min(100, Math.round((data.count / totalChapters) * 100));
                  return (
                    <div key={subject}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-semibold text-sm text-gray-700">{subject}</span>
                        <span className="text-xs font-bold text-gray-500">{data.count}/{totalChapters} chapters</span>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Weak Areas */}
          {weakAreas.length > 0 && (
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                <h3 className="font-extrabold text-lg text-gray-900">Weak Areas to Revise</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {weakAreas.map(area => (
                  <div key={area} className="flex items-center gap-2 px-3 py-2 bg-orange-50 border border-orange-100 rounded-xl">
                    <span className="text-sm font-semibold text-orange-700">{area}</span>
                    <button
                      onClick={() => removeWeakArea(area)}
                      className="text-orange-400 hover:text-orange-600 text-xs font-bold transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => router.push('/classroom')}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-primary text-white font-bold text-sm hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                Fix Weak Areas with AI
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Recently Completed */}
          {completedChapters.length > 0 && (
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <BookOpen className="w-5 h-5 text-brand-success" />
                <h3 className="font-extrabold text-lg text-gray-900">Completed Chapters</h3>
              </div>
              <div className="space-y-3">
                {[...completedChapters].reverse().slice(0, 6).map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-success/10 flex items-center justify-center text-brand-success font-bold text-xs">✓</div>
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{c.chapter}</p>
                        <p className="text-xs text-gray-400">{c.subject} • {new Date(c.completedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                      </div>
                    </div>
                    {c.accuracy !== undefined && (
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${c.accuracy >= 80 ? 'bg-brand-success/10 text-brand-success' : 'bg-orange-50 text-orange-500'}`}>
                        {c.accuracy}%
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {completedChapters.length === 0 && (
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-primary/5 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-brand-primary/40" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No chapters completed yet</h3>
              <p className="text-gray-500 text-sm mb-6">Start your first lesson and your progress will appear here.</p>
              <button
                onClick={() => router.push('/classroom')}
                className="px-8 py-3 bg-brand-primary text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                Start Learning
              </button>
            </motion.div>
          )}

          {/* Daily Activity Heatmap */}
          {dailySessions.length > 0 && (
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-extrabold text-lg text-gray-900 mb-5">Recent Activity</h3>
              <div className="flex gap-2 flex-wrap">
                {dailySessions.slice(-14).map(session => (
                  <div key={session.date} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${
                        session.chaptersStudied >= 3 
                          ? 'bg-brand-primary text-white' 
                          : session.chaptersStudied >= 1 
                          ? 'bg-brand-primary/30 text-brand-primary' 
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {session.chaptersStudied}
                    </div>
                    <span className="text-[9px] text-gray-400 font-medium">
                      {new Date(session.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
