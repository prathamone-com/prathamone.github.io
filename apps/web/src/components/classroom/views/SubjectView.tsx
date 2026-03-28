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

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, Trophy } from 'lucide-react';
import { useCurriculumStore } from '@/lib/store/curriculum';
import { useProgressStore } from '@/lib/store/progress';
import { 
  SUBJECTS, getChapters, getTranslation, 
  calculateMasteryBadge 
} from '@prathamone/db/curriculum';

interface SubjectViewProps {
  activeSubject: string | null;
  onSetView: (view: any) => void;
  onSetActiveSubject: (subject: string | null) => void;
  onSetActiveChapter: (chapter: string | null) => void;
  onSetActiveTopic: (topic: any | null) => void;
}

export const SubjectView: React.FC<SubjectViewProps> = ({
  activeSubject,
  onSetView,
  onSetActiveSubject,
  onSetActiveChapter,
  onSetActiveTopic
}) => {
  const { selectedLanguage, selectedBoard, selectedGrade, customChapters } = useCurriculumStore();
  const { completedChapters, activeBounties } = useProgressStore();
  
  const t = (key: string) => getTranslation(selectedLanguage, key);

  const getMasteryBadgeData = (subject: string, chapterName: string) => {
    const entry = completedChapters.find(c => c.subject === subject && c.chapter === chapterName);
    if (!entry) return null;
    return calculateMasteryBadge(entry.accuracy || 70);
  };

  return (
    <div className="flex-1 overflow-y-auto flex flex-col items-center p-6 pb-20">
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl w-full">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest text-gray-400">
          <button onClick={() => { onSetActiveSubject(null); onSetView('dashboard'); }} className="hover:text-brand-primary transition-colors">Home</button>
          {activeSubject && (
            <>
              <ChevronRight className="w-3 h-3" />
              <button onClick={() => onSetActiveSubject(null)} className="hover:text-brand-primary transition-colors">{activeSubject}</button>
            </>
          )}
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-primary/60">{activeSubject ? 'Select Chapter' : 'Select Subject'}</span>
        </nav>
        
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl font-black text-gray-900 leading-tight">
              {activeSubject ? activeSubject : 'Curriculum'}
            </h2>
            <p className="text-gray-500 font-medium mt-1">
              {activeSubject ? `Pick a chapter from your ${selectedBoard} syllabus.` : 'What would you like to master today?'}
            </p>
          </div>
          {activeSubject && (
             <button 
               onClick={() => onSetActiveSubject(null)}
               className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-500 hover:border-brand-primary hover:text-brand-primary transition-all"
             >
               <ArrowLeft className="w-4 h-4" /> Change Subject
             </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {!activeSubject ? (
            <motion.div 
               key="subject-list"
               initial={{ opacity: 0, scale: 0.95 }} 
               animate={{ opacity: 1, scale: 1 }} 
               exit={{ opacity: 0, scale: 0.95 }}
               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {SUBJECTS.map((sub, i) => {
                 const subjectChapters = getChapters(selectedBoard, selectedGrade || 10, sub.id);
                 const completedInSubject = completedChapters.filter(c => c.subject === sub.id).length;
                 const progressPct = Math.min(100, Math.round((completedInSubject / (subjectChapters.length || 1)) * 100));
                 
                 return (
                   <motion.button
                     key={sub.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.05 }}
                     whileHover={{ y: -8, transition: { duration: 0.2 } }}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => onSetActiveSubject(sub.id)}
                     className="group relative bg-white/70 backdrop-blur-xl p-8 rounded-[32px] border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all text-left overflow-hidden"
                   >
                     <div className={`absolute -top-10 -right-10 w-40 h-40 ${sub.bg} rounded-full opacity-20 blur-3xl group-hover:scale-125 transition-transform duration-500`} />
                     
                     <div className="relative z-10">
                       <div className={`w-16 h-16 rounded-2xl ${sub.bg} flex items-center justify-center text-3xl mb-8 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)] group-hover:rotate-6 transition-transform`}>
                         {sub.icon}
                       </div>
                       
                       <div className="flex items-center justify-between mb-2">
                         <h3 className={`text-2xl font-black ${sub.color}`}>{sub.label}</h3>
                         {progressPct > 0 && (
                           <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${sub.bg} ${sub.color}`}>
                             {progressPct}% {t('done') || 'Done'}
                           </span>
                         )}
                       </div>
                       
                       <p className="text-sm text-gray-500 font-bold mb-6">
                         {completedInSubject} of {subjectChapters.length} {t('chapters_mastered') || 'Chapters Mastered'}
                       </p>
                       
                       <div className="h-2 bg-gray-100/50 rounded-full overflow-hidden mb-6">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${progressPct}%` }}
                           transition={{ duration: 1, delay: 0.3 }}
                           className={`h-full bg-gradient-to-r from-current to-white/20 ${sub.color.replace('text-', 'bg-')}`}
                         />
                       </div>

                       <div className="flex items-center gap-2 text-brand-primary">
                          <span className="text-xs font-black uppercase tracking-widest group-hover:mr-1 transition-all">{t('start_learning')}</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                       </div>
                     </div>
                   </motion.button>
                 );
              })}
            </motion.div>
          ) : (
            <motion.div 
               key="chapter-list"
               initial={{ opacity: 0, y: 15 }} 
               animate={{ opacity: 1, y: 0 }}
               className="bg-white/60 backdrop-blur-xl rounded-[40px] p-10 border border-white/40 shadow-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  ...getChapters(selectedBoard, selectedGrade || 10, activeSubject).map(c => ({ name: c, isCustom: false })),
                  ...(customChapters || [])
                    .filter((c: any) => c.subject === activeSubject)
                    .map((c: any) => ({ name: c.title, isCustom: true }))
                ].map((chapObj: any, idx: number) => {
                   const chap = chapObj.name;
                   const isDone = completedChapters.some(c => c.subject === activeSubject && c.chapter === chap);
                   const mastery = getMasteryBadgeData(activeSubject || '', chap);
                   const hasBounty = activeBounties.find(b => b.chapterId === chap);
                   
                   return (
                     <motion.button
                       key={chap}
                       whileHover={{ x: 4, backgroundColor: 'rgba(56, 189, 248, 0.05)' }}
                       whileTap={{ scale: 0.98 }}
                       onClick={() => { onSetActiveChapter(chap); onSetActiveTopic(null); onSetView('topic'); }}
                       className="group flex items-center justify-between p-6 rounded-3xl bg-white border border-gray-100/50 hover:border-brand-primary/30 transition-all text-left shadow-sm"
                     >
                       <div className="flex items-center gap-5">
                         <div className="relative">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black transition-all ${
                             isDone 
                               ? 'bg-brand-success/10 text-brand-success border border-brand-success/20' 
                               : 'bg-gray-50 text-gray-400 border border-gray-100/50 group-hover:bg-brand-primary/10 group-hover:text-brand-primary'
                           }`}>
                             {isDone ? '✓' : idx + 1}
                           </div>
                           {mastery && (
                             <motion.div 
                               initial={{ scale: 0 }} animate={{ scale: 1 }}
                               className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100"
                             >
                               <span className="text-xs">{mastery.icon}</span>
                             </motion.div>
                           )}
                         </div>
                         
                         <div className="flex-1">
                           <span className={`font-extrabold text-lg block leading-tight ${isDone ? 'text-gray-400' : 'text-gray-800'} group-hover:text-brand-primary transition-colors`}>
                             {chap}
                           </span>

                           {chapObj.isCustom && (
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-md">
                                  Teacher-Led Session
                                </span>
                                {hasBounty && (
                                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-100 px-2 py-0.5 rounded-md animate-pulse">
                                    ₹ {hasBounty.amount} Bounty
                                  </span>
                                )}
                              </div>
                           )}

                           {mastery ? (
                             <div className="flex items-center gap-1.5 mt-1">
                               <span className={`text-[10px] font-black uppercase tracking-widest ${mastery.color}`}>
                                 {mastery.label} {t('mastery_level')}
                               </span>
                               <div className="w-1 h-1 rounded-full bg-gray-300" />
                               <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                 Re-visit Lesson
                               </span>
                             </div>
                           ) : !chapObj.isCustom && (
                             <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1 block">
                               {t('ready_to_start')} • 15m Est.
                             </span>
                           )}
                         </div>
                       </div>
                       <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-brand-primary group-hover:text-white transition-all transform group-hover:rotate-[-45deg]">
                         <ChevronRight className="w-5 h-5" />
                       </div>
                     </motion.button>
                   );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
