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
import { BookOpen, HelpCircle, FileText, BarChart } from 'lucide-react';
import { useProgressStore } from '@/lib/store/progress';
import { useCurriculumStore } from '@/lib/store/curriculum';
import { SUBJECTS, getChapters, getQuestionsForChapter, getTranslation } from '@prathamone/db/curriculum';
import { useRouter } from 'next/navigation';

interface DashboardViewProps {
  isOnline?: boolean;
  onSetView: (view: 'dashboard' | 'subject' | 'topic' | 'session' | 'static_lesson' | 'shop') => void;
  onSetActiveSubject: (subject: string | null) => void;
  onSetActiveChapter: (chapter: string | null) => void;
  onSetLessonPhase: (phase: any) => void;
  onSetQuizQuestions: (questions: any[]) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  isOnline = true,
  onSetView,
  onSetActiveSubject,
  onSetActiveChapter,
  onSetLessonPhase,
  onSetQuizQuestions
}) => {
  const router = useRouter();
  const { selectedLanguage, selectedBoard, selectedGrade } = useCurriculumStore();
  const { currentStreak, completedChapters, weakAreas, recentActivity, coins, verifiedChapters } = useProgressStore();
  
  const t = (key: string) => getTranslation(selectedLanguage, key);

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8">
      {/* Top Stats Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="px-5 py-2.5 bg-orange-50 rounded-2xl border border-orange-100 flex items-center gap-3 shadow-sm hover:shadow-md transition-all">
          <span className="text-xl">🔥</span>
          <span className="text-sm font-black text-orange-600 tracking-tight">{currentStreak} {t('day_streak')}</span>
        </div>
        <button 
          onClick={() => onSetView('shop')}
          className="px-5 py-2.5 bg-yellow-50 rounded-2xl border border-yellow-100 flex items-center gap-3 shadow-sm hover:shadow-md hover:bg-yellow-100 hover:scale-[1.02] transition-all cursor-pointer"
        >
          <span className="text-xl font-black text-yellow-500 mb-0.5">₹</span>
          <span className="text-sm font-black text-yellow-600 tracking-tight">{coins} Pratham Coins</span>
        </button>
        <div className="px-5 py-2.5 bg-brand-primary/5 rounded-2xl border border-brand-primary/10 flex items-center gap-3 shadow-sm hover:shadow-md transition-all">
          <span className="text-xl">🛡️</span>
          <span className="text-sm font-black text-brand-primary tracking-tight">{verifiedChapters.length} Verified Masteries</span>
        </div>
      </div>

      {/* Epic 4-Card Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.button 
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => onSetView('subject')}
          className="group relative bg-white rounded-2xl p-8 border hover:border-brand-primary shadow-sm hover:shadow-xl transition-all text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
          <div className="w-14 h-14 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-6">
             <BookOpen className="w-7 h-7 text-brand-primary" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('learn_chapter')}</h3>
          <p className="text-gray-500 font-medium">{t('learn_desc')}</p>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => { onSetActiveSubject('General'); onSetActiveChapter(t('ask_doubt')); onSetView('session'); }}
          className="group relative bg-white rounded-2xl p-8 border hover:border-brand-secondary shadow-sm hover:shadow-xl transition-all text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
          <div className="w-14 h-14 rounded-xl bg-brand-secondary/10 flex items-center justify-center mb-6">
             <HelpCircle className="w-7 h-7 text-brand-secondary" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Ask a Doubt</h3>
          <p className="text-gray-500 font-medium">Stuck? Chat instantly with Vikram Sir to clear concepts.</p>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (weakAreas.length > 0) {
              const area = weakAreas[0];
              let foundSubject = 'Mathematics';
              for (const s of SUBJECTS.map(sub => sub.id)) {
                const chaps = getChapters(selectedBoard, selectedGrade || 10, s);
                if (chaps.includes(area)) { foundSubject = s; break; }
              }
              onSetActiveSubject(foundSubject);
              onSetActiveChapter(area);
              onSetLessonPhase('practice');
              onSetQuizQuestions(getQuestionsForChapter(area, 5, weakAreas));
              onSetView('session');
            } else {
              onSetView('subject');
            }
          }}
          className="group relative bg-white rounded-2xl p-8 border hover:border-brand-primary shadow-sm hover:shadow-xl transition-all text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
          <div className="w-14 h-14 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-6">
             <FileText className="w-7 h-7 text-brand-primary" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Practice Questions</h3>
          <p className="text-gray-500 font-medium">
            {weakAreas.length > 0 ? `Improve in ${weakAreas[0]} and more.` : 'Adaptive tests based on your weak areas.'}
          </p>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/student/progress')}
          className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-brand-primary shadow-sm hover:shadow-xl transition-all text-left flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-6">
               <BarChart className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">My Progress</h3>
            <p className="text-sm text-gray-500">Track your weak areas.</p>
          </div>
          
          <div className="mt-4 bg-gray-50 rounded-lg p-3 text-sm text-gray-600 font-semibold border border-gray-100">
             {currentStreak > 0 ? `🔥 ${currentStreak} Day Streak` : `📚 ${completedChapters.length} chapters done`}
          </div>
        </motion.button>
      </div>

      {/* Recent Achievements & Activity Feed */}
      {recentActivity.length > 0 && (
        <div className="mt-12 bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
              <span className="text-xl">🏆</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Recent Achievements</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentActivity.slice(0, 3).map((act) => (
              <motion.div 
                key={act.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100/50"
              >
                <div className="text-2xl mt-1">{act.icon}</div>
                <div>
                  <p className="font-bold text-sm text-gray-900 leading-tight">{act.title}</p>
                  <p className="text-xs text-gray-500 font-medium mt-1">{act.description}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2">
                    {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
