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

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useCurriculumStore } from '@/lib/store/curriculum';
import { useProgressStore } from '@/lib/store/progress';
import { 
  getTranslation, fetchTopicsFromDB, getTopicsForChapter 
} from '@prathamone/db/curriculum';

// Modular Views
import { DashboardView } from '@/components/classroom/views/DashboardView';
import { SubjectView } from '@/components/classroom/views/SubjectView';
import { TopicView } from '@/components/classroom/views/TopicView';
import { SessionView } from '@/components/classroom/views/SessionView';
import { StaticLessonView } from '@/components/classroom/views/StaticLessonView';
import { ShopView } from '@/components/classroom/views/ShopView';
import { IntroSplash, LanguageSwitcher } from '@/components/classroom/ClassroomUI';

import { useOnlineStatus } from '@/lib/hooks/useOnlineStatus';

export default function ClassroomPage() {
  const isOnline = useOnlineStatus();
  const { selectedBoard, selectedGrade, selectedLanguage } = useCurriculumStore();
  const { currentStreak, weakAreas } = useProgressStore();
  const t = (key: string) => getTranslation(selectedLanguage, key);

  // Orchestration State
  const [currentView, setCurrentView] = useState<'dashboard' | 'subject' | 'topic' | 'session' | 'static_lesson' | 'shop'>('dashboard');
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<any | null>(null);
  const [lessonPhase, setLessonPhase] = useState<'concept' | 'example' | 'practice' | 'summary' | 'doubt'>('concept');
  
  // Topic Loading Logic
  const [liveTopics, setLiveTopics] = useState<any[]>([]);
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [useMock, setUseMock] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  // Sovereign Offline Routing
  useEffect(() => {
    if (!isOnline && currentView === 'session') {
      setCurrentView('static_lesson');
    }
  }, [isOnline, currentView]);

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => setShowIntro(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  useEffect(() => {
    if (currentView === 'topic' && activeChapter && selectedBoard && selectedGrade) {
      setTopicsLoading(true);
      fetchTopicsFromDB(selectedBoard, selectedGrade, activeSubject || 'Mathematics', activeChapter)
        .then(topics => { setLiveTopics(topics); setTopicsLoading(false); })
        .catch(() => {
          setLiveTopics(getTopicsForChapter(selectedBoard, selectedGrade || 12, activeSubject || 'Mathematics', activeChapter));
          setTopicsLoading(false);
        });
    }
  }, [currentView, activeChapter, selectedBoard, selectedGrade, activeSubject]);

  if (currentView === 'session' && isOnline) {
    return (
      <SessionView 
        activeSubject={activeSubject}
        activeChapter={activeChapter}
        activeTopic={activeTopic}
        lessonPhase={lessonPhase}
        useMock={useMock}
        onSetView={setCurrentView}
        onSetLessonPhase={setLessonPhase}
        onToggleMock={() => setUseMock(!useMock)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-brand-primary/10">
      <AnimatePresence>
        {!isOnline && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}
            className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 text-white py-2.5 px-6 text-center text-[10px] font-black uppercase tracking-[0.3em] relative z-[100] shadow-2xl border-b border-orange-400/30"
          >
            <div className="flex items-center justify-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
               <span>{t('sovereign_mode_active') || 'Sovereign Mode: Local Curriculum Active'}</span>
               <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showIntro && currentView === 'dashboard' && <IntroSplash currentStreak={currentStreak} />}
      </AnimatePresence>

      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 flex-none px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20 overflow-hidden border border-brand-primary/10">
            <img src="/logo-ganesha.png" alt="P1" className="w-full h-full object-cover scale-110" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 leading-none">PrathamOne</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">AI Classroom • {activeSubject || 'Dashboard'}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          {currentView !== 'dashboard' && currentView !== 'shop' && (
             <button 
               onClick={() => {
                 if (currentView === 'topic') setCurrentView('subject');
                 else if (currentView === 'static_lesson') setCurrentView('topic');
                 else { setCurrentView('dashboard'); setActiveSubject(null); }
               }}
               className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-primary transition-colors"
            >
               <ArrowLeft className="w-4 h-4" />
               <span>{currentView === 'static_lesson' ? 'Back' : currentView === 'topic' ? 'Chapters' : t('back_to_subjects') || 'Subjects'}</span>
            </button>
          )}

          <div className="hidden md:flex items-center gap-4">
             <button
               onClick={() => setUseMock(!useMock)}
               disabled={!isOnline}
               className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
                 !isOnline ? 'bg-gray-100 text-gray-400 border-gray-200 opacity-50' :
                 useMock ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 'bg-green-50 text-green-600 border-green-200 shadow-sm'
               }`}
             >
                <span className="text-sm">{!isOnline ? '🚫' : useMock ? '🧪' : '⚡'}</span>
                {useMock ? 'Mock API' : 'Live AI'}
             </button>
             <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <DashboardView 
              isOnline={isOnline}
              onSetView={setCurrentView}
              onSetActiveSubject={setActiveSubject}
              onSetActiveChapter={setActiveChapter}
              onSetLessonPhase={setLessonPhase}
              onSetQuizQuestions={() => {}} // Handled in SessionView now
            />
          )}

          {currentView === 'subject' && (
            <SubjectView 
              activeSubject={activeSubject}
              onSetView={setCurrentView}
              onSetActiveSubject={setActiveSubject}
              onSetActiveChapter={setActiveChapter}
              onSetActiveTopic={setActiveTopic}
            />
          )}

          {currentView === 'topic' && (
            <TopicView 
              activeSubject={activeSubject}
              activeChapter={activeChapter}
              liveTopics={liveTopics}
              topicsLoading={topicsLoading}
              onSetView={(view) => {
                if (!isOnline && view === 'session') setCurrentView('static_lesson');
                else setCurrentView(view);
              }}
              onSetActiveTopic={setActiveTopic}
            />
          )}

          {currentView === 'static_lesson' && (
            <StaticLessonView 
               activeSubject={activeSubject}
               activeChapter={activeChapter}
               activeTopic={activeTopic}
               onSetView={setCurrentView}
            />
          )}

          {currentView === 'shop' && <ShopView onSetView={setCurrentView} />}
        </AnimatePresence>

        {currentView !== 'dashboard' && currentView !== 'shop' && (
          <div className="w-full mt-auto bg-white/50 backdrop-blur-md border-t border-gray-100 py-3 px-6 text-center shrink-0">
            <p className="text-[10px] text-gray-400 font-medium max-w-4xl mx-auto leading-relaxed">
              Syllabus artifacts provided under the Open Access Policy of the eBalbharati Bureau, Pune.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
