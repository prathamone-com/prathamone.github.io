/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Organization : AITDL Network | PrathamOne
 * Framework    : Autonomous AI Agent Development
 * Authored By  : Jawahar R Mallah
 * Version      : 1.1.1
 * Release Date : 29 March 2026
 * Environment  : Production
 * ==========================================================
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurriculumStore } from '@/lib/store/curriculum';
import { getTranslation, getSovereignContent, SovereignContent } from '@prathamone/db/curriculum';
import { BoardPracticeOverlay } from '../BoardPracticeOverlay';

interface StaticLessonViewProps {
  activeSubject: string | null;
  activeChapter: string | null;
  activeTopic: any | null;
  lessonPhase?: string;
  remediationPlan?: any | null;
  onSetView: (view: any) => void;
}

export const StaticLessonView: React.FC<StaticLessonViewProps> = ({
  activeSubject,
  activeChapter,
  activeTopic,
  lessonPhase,
  remediationPlan,
  onSetView
}) => {
  const { selectedBoard, selectedGrade, selectedLanguage } = useCurriculumStore();
  const t = (key: string) => getTranslation(selectedLanguage, key);

  const [showSolution, setShowSolution] = React.useState(false);
  const [practiceTest, setPracticeTest] = React.useState<'easy' | 'medium' | 'hard' | null>(null);
  
  // Resolve Pedagogical Content
  const chapterId = activeChapter?.toLowerCase().replace(/^\d+\.\s*/, '').replace(/\s+/g, '_') || '';
  const content = getSovereignContent(chapterId);

  // Subject-Aware Content Selection
  const isMath = activeSubject?.toLowerCase().includes('math');
  const isScience = activeSubject?.toLowerCase().includes('science');

  return (
    <div className="flex-1 overflow-y-auto flex flex-col p-6 sm:p-12 pb-32 bg-[#fafcff]">
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl mx-auto w-full">
         
         {/* Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
           <div>
             <div className="flex items-center gap-2 mb-4">
               <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-lg text-xs font-black uppercase tracking-widest">
                 {t('advance_level_pedagogy') || 'Advance Level Pedagogy'}
               </span>
               <span className="px-3 py-1 bg-gray-200 text-gray-500 rounded-lg text-xs font-black uppercase tracking-widest">
                 {t('offline_mode') || 'Offline Mode'}
               </span>
             </div>
             <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-2">
               {activeTopic?.title || activeChapter}
             </h1>
             <p className="text-gray-500 font-medium text-lg">
               {t('chapter')}: {activeChapter} • {t('subject')}: {activeSubject} • {t('board')}: {selectedBoard}
             </p>
           </div>
           <a 
             href="https://books.ebalbharati.in/" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-700 hover:border-brand-primary hover:text-brand-primary shadow-sm transition-all"
           >
             <span>📚</span> {t('download_pdf') || 'Download Official eBalbharati PDF'}
           </a>
         </div>

         {/* Grid Layout */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Left Column: Theory & HOTS */}
           <div className="lg:col-span-2 flex flex-col gap-8">
             
             {/* Concept Mastery Box */}
             <div className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
               <div className="flex items-center gap-3 mb-6">
                 <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">🧠</span>
                 <h2 className="text-2xl font-black text-gray-900">{t('concept_mastery') || 'Concept Mastery'}</h2>
               </div>
               <div className="prose prose-lg text-gray-600 font-medium max-w-none">
                  {content ? (
                    <>
                      <p>{content.microConcept}</p>
                      <div className="my-8 p-6 bg-slate-900 text-brand-success font-mono text-center rounded-2xl shadow-inner text-lg font-bold overflow-x-auto">
                        {content.visualization}
                      </div>
                      <ul className="space-y-3 mt-6">
                        {content.pillars.map((pillar, i) => (
                           <li key={i} className="flex items-start gap-3">
                             <span className="text-brand-primary">✦</span> {pillar}
                           </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      <p>{t('module_intro_prefix') || 'This module covers the advanced principles of'} <strong>{activeTopic?.title || activeChapter}</strong> {t('module_intro_suffix') || `mapped strictly to the ${selectedBoard} syllabus architecture.`}</p>
                      
                      {isMath ? (
                        <div className="my-8 p-6 bg-slate-900 text-brand-success font-mono text-center rounded-2xl shadow-inner text-lg font-bold overflow-x-auto">
                          f&apos;(x) = lim(h→0) [f(x+h) - f(x)] / h
                        </div>
                      ) : isScience ? (
                         <div className="my-8 p-6 bg-slate-900 text-brand-success font-mono text-center rounded-2xl shadow-inner text-lg font-bold overflow-x-auto">
                           PV = nRT (Ideal Gas Equation)
                         </div>
                      ) : (
                         <div className="my-8 p-6 bg-slate-900 text-brand-success font-mono text-center rounded-2xl shadow-inner text-lg font-bold overflow-x-auto">
                           &lt;Structural Logic Analysis /&gt;
                         </div>
                      )}

                      <ul className="space-y-3 mt-6">
                        <li className="flex items-start gap-3"><span className="text-brand-primary">✦</span> {t('pedagogy_step_1') || 'Identify core variables dynamically.'}</li>
                        <li className="flex items-start gap-3"><span className="text-brand-primary">✦</span> {t('pedagogy_step_2') || 'Understand theorem constraints in boundary cases.'}</li>
                        <li className="flex items-start gap-3"><span className="text-brand-primary">✦</span> {t('pedagogy_step_3') || 'Apply concepts across multi-dimensional planes.'}</li>
                      </ul>
                    </>
                  )}
                </div>
             </div>

             {/* HOTS Box */}
             <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[32px] p-8 md:p-10 border border-indigo-100 shadow-sm relative overflow-hidden">
               <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-200/40 rounded-full blur-3xl" />
               <div className="relative z-10">
                 <div className="flex items-center justify-between mb-2">
                   <div className="flex items-center gap-3 mb-4">
                     <span className="w-10 h-10 rounded-xl bg-white text-indigo-600 shadow-sm flex items-center justify-center text-xl">🔥</span>
                     <h2 className="text-2xl font-black text-indigo-900">{t('hots_title') || 'Higher Order Thinking (HOTS)'}</h2>
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-white px-3 py-1 rounded-full">{t('advance_level') || 'Advance Level'}</span>
                 </div>
                 <p className="text-indigo-900/80 font-semibold mb-6">{t('hots_desc') || 'Test your bounds of logic with competitive-grade puzzles that appear in standard MHT-CET and JEE Main examinations.'}</p>
                 
                 <div className="space-y-4">
                   <div className="p-6 bg-white rounded-2xl shadow-sm border border-indigo-50">
                     <p className="font-bold text-gray-800 mb-4 text-base">
                       {content?.hots?.question || (
                         isMath ? 'Q1. If a variable line passes through the point of intersection of L1 and L2, what locus does the centroid form?' 
                         : isScience ? 'Q1. Explain why the rate of reaction doubles when the temperature increases by 10K according to Arrhenius theory?'
                         : 'Q1. Analyze the structural impact of this concept on the overall syllabus framework.'
                       )}
                     </p>
                     
                     <AnimatePresence>
                       {showSolution ? (
                         <motion.div 
                           initial={{ opacity: 0, height: 0 }}
                           animate={{ opacity: 1, height: 'auto' }}
                           className="pt-4 border-t border-indigo-50 text-indigo-700 text-sm font-medium leading-relaxed"
                         >
                           <p className="mb-2"><strong>{t('advanced_logic') || 'Advanced Logic'}:</strong></p>
                           {content?.hots?.answer || (
                              isMath ? 'The locus forms an elliptical plane centered at the origin of the coordinate transformation.'
                              : 'This is due to the exponential increase in collisions with energy greater than activation energy (Ea).'
                           )}
                         </motion.div>
                       ) : (
                         <button 
                           onClick={() => setShowSolution(true)}
                           className="text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-2"
                         >
                           {t('reveal_solution') || 'Reveal Advanced Solution'} ✨
                         </button>
                       )}
                     </AnimatePresence>
                   </div>
                 </div>
               </div>
             </div>
           </div>

           {/* AI Teacher Remediation Layer (Only in Remediation Phase) */}
           <AnimatePresence>
              {lessonPhase === 'remediation' && remediationPlan && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="lg:col-span-3 mb-12"
                >
                  <div className="bg-gradient-to-br from-brand-primary/5 to-transparent border-2 border-brand-primary/20 rounded-[40px] p-10 shadow-2xl overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-6 mb-10">
                         <div className="w-16 h-16 rounded-3xl bg-brand-primary flex items-center justify-center text-3xl shadow-xl shadow-brand-primary/20 animate-pulse">
                            🩹
                         </div>
                         <div>
                            <h2 className="text-3xl font-black text-gray-900 leading-tight">
                               {t('remediation_active') || 'Remediation Active: Foundation Repair'}
                            </h2>
                            <p className="text-brand-primary font-bold uppercase tracking-widest text-sm mt-1">
                               {remediationPlan.focus}
                            </p>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         <div className="space-y-6">
                            <h3 className="text-xl font-black text-gray-800 flex items-center gap-3">
                               <span className="text-brand-primary">🎯</span> {t('the_root_concept') || 'The Root Concept'}
                            </h3>
                            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm text-gray-600 font-medium leading-relaxed italic">
                               &ldquo;{remediationPlan.concept}&rdquo;
                            </div>
                            <div className="p-6 bg-slate-900 rounded-2xl text-brand-success font-mono text-center text-lg font-black tracking-widest leading-relaxed">
                               {remediationPlan.visualization}
                            </div>
                         </div>

                         <div className="space-y-6">
                            <h3 className="text-xl font-black text-gray-800 flex items-center gap-3">
                               <span className="text-brand-primary">🛠️</span> {t('healing_steps') || 'Healing Steps'}
                            </h3>
                            <div className="space-y-4">
                               {remediationPlan.stepByStep.map((step: string, i: number) => (
                                 <motion.div 
                                   key={i}
                                   initial={{ x: -20, opacity: 0 }}
                                   animate={{ x: 0, opacity: 1 }}
                                   transition={{ delay: i * 0.1 }}
                                   className="flex gap-4 p-4 hover:bg-white rounded-2xl transition-all"
                                 >
                                    <div className="w-8 h-8 shrink-0 rounded-full bg-brand-primary text-white flex items-center justify-center font-black text-xs">
                                       {i + 1}
                                    </div>
                                    <p className="text-sm text-gray-700 font-bold leading-relaxed">{step}</p>
                                 </motion.div>
                               ))}
                            </div>
                            <button 
                              onClick={() => onSetView('session')}
                              className="w-full py-5 bg-brand-primary text-white rounded-[24px] font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-primary/20 hover:scale-[1.02] transition-all"
                            >
                               {t('re_verify_mastery') || 'Re-Verify Mastery'}
                            </button>
                         </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

           {/* Right Column: Practice & Tools */}
           <div className="flex flex-col gap-8">
             <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
               <div className="flex items-center gap-3 mb-6">
                 <span className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl">📋</span>
                 <h2 className="text-xl font-black text-gray-900">{t('board_practice') || 'Board Practice'}</h2>
               </div>
               <p className="text-sm font-semibold text-gray-500 mb-6">{t('pyq_desc') || `Based on previous 5-year PYQs from ${selectedBoard} Grade ${selectedGrade || 10}.`}</p>
               
               <div className="space-y-3">
                  {[1, 2, 3].map((num) => {
                    const difficulty = num === 1 ? 'easy' : num === 2 ? 'medium' : 'hard';
                    return (
                      <div 
                        key={num} 
                        onClick={() => setPracticeTest(difficulty)}
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-brand-primary/30 hover:bg-brand-primary/5 cursor-pointer transition-all group"
                      >
                        <span className="text-sm font-bold text-gray-700">{t('offline_test') || 'Offline Test'} {num} ({num === 1 ? 'Basic' : num === 2 ? 'Medium' : 'Advance'})</span>
                        <span className="text-gray-400 group-hover:text-brand-primary group-hover:translate-x-1 transition-all">→</span>
                      </div>
                    );
                  })}
                </div>
             </div>

             <div className="bg-slate-900 rounded-[32px] p-8 relative overflow-hidden group">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
               <div className="relative z-10 text-center flex flex-col items-center">
                 <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">🤖</span>
                 <h3 className="text-white font-black text-xl mb-2">{t('need_tutor') || 'Need a Tutor?'}</h3>
                 <p className="text-slate-400 text-sm font-semibold mb-6">{t('switch_ai_desc') || 'Switch back to the AI Livestream for real-time doubt clearing.'}</p>
                 <button 
                   onClick={() => onSetView('session')}
                   className="w-full py-3 bg-brand-primary text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:bg-brand-secondary transition-colors"
                 >
                   {t('start_ai_session') || 'Start AI Session'}
                 </button>
               </div>
             </div>

           </div>
         </div>

       </motion.div>

       {/* Practice Modal */}
       <AnimatePresence>
         {practiceTest && (
           <BoardPracticeOverlay 
              chapter={activeChapter || 'Chapter'}
              difficulty={practiceTest}
              onClose={() => setPracticeTest(null)}
           />
         )}
       </AnimatePresence>
    </div>
  );
};
