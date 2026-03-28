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
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useCurriculumStore } from '@/lib/store/curriculum';
import { getTopicsForChapter } from '@prathamone/db/curriculum';

interface TopicViewProps {
  activeSubject: string | null;
  activeChapter: string | null;
  liveTopics: any[];
  topicsLoading: boolean;
  onSetView: (view: any) => void;
  onSetActiveTopic: (topic: any | null) => void;
}

export const TopicView: React.FC<TopicViewProps> = ({
  activeSubject,
  activeChapter,
  liveTopics,
  topicsLoading,
  onSetView,
  onSetActiveTopic
}) => {
  const { selectedBoard, selectedGrade } = useCurriculumStore();

  return (
    <div className="flex-1 overflow-y-auto flex flex-col items-center p-6 pb-20">
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl w-full">
        <nav className="flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest text-gray-400">
          <button onClick={() => onSetView('dashboard')} className="hover:text-brand-primary transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => onSetView('subject')} className="hover:text-brand-primary transition-colors">{activeSubject}</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-primary/60">{activeChapter}</span>
        </nav>

        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl font-black text-gray-900 leading-tight">
              Select a Topic
            </h2>
            <p className="text-gray-500 font-medium mt-1">
              What specific part of {activeChapter} do you want to learn?
            </p>
          </div>
        </div>

        <motion.div className="bg-white/60 backdrop-blur-xl rounded-[40px] p-10 border border-white/40 shadow-xl">
          {topicsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-36 rounded-3xl bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(liveTopics.length > 0 ? liveTopics : getTopicsForChapter(selectedBoard, selectedGrade || 10, activeSubject || '', activeChapter || '')).map((t: any, idx: number) => (
              <motion.div
                key={t.id || t.title}
                whileHover={{ y: -4 }}
                className="group flex flex-col justify-between gap-4 p-6 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-brand-primary/20 transition-all text-left overflow-hidden relative"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                     <span className="font-extrabold text-gray-900 text-lg leading-tight group-hover:text-brand-primary transition-colors">{t.title}</span>
                     <span className={`text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded-full border ${
                       t.difficulty === 'Easy' ? 'bg-green-50 text-green-600 border-green-100' :
                       t.difficulty === 'Hard' ? 'bg-red-50 text-red-600 border-red-100' :
                       'bg-orange-50 text-orange-600 border-orange-100'
                     }`}>
                       {t.difficulty || 'Medium'}
                     </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-400">Master this concept to unlock advanced module tracking.</p>
                </div>

                <div className="flex gap-2 w-full mt-2">
                   <button 
                     onClick={() => { onSetActiveTopic(t); onSetView('session'); }}
                     className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-brand-primary text-white rounded-xl text-xs font-black shadow-md hover:scale-[1.02] transition-transform"
                   >
                     <span>🤖</span> Live AI
                   </button>
                   <button 
                     onClick={() => { onSetActiveTopic(t); onSetView('static_lesson'); }}
                     className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-black shadow-md hover:scale-[1.02] transition-transform"
                   >
                     <span>📖</span> Advance Level
                   </button>
                </div>
              </motion.div>
            ))}
           </div>
          )} 
        </motion.div>
      </motion.div>
    </div>
  );
};
