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
import { AnimatePresence } from 'framer-motion';
import { useProgressStore } from '@/lib/store/progress';

// Modular Hooks & UI
import { useClassroomOrchestrator } from '@/lib/hooks/useClassroomOrchestrator';
import { OfflineBanner } from '@/components/classroom/OfflineBanner';
import { ClassroomHeader } from '@/components/classroom/ClassroomHeader';
import { DashboardView } from '@/components/classroom/views/DashboardView';
import { SubjectView } from '@/components/classroom/views/SubjectView';
import { TopicView } from '@/components/classroom/views/TopicView';
import { SessionView } from '@/components/classroom/views/SessionView';
import { StaticLessonView } from '@/components/classroom/views/StaticLessonView';
import { ShopView } from '@/components/classroom/views/ShopView';
import { IntroSplash } from '@/components/classroom/ClassroomUI';
import { useSovereignSync } from '@/lib/hooks/useSovereignSync';

/**
 * PrathamOne - Main Classroom Portal
 * Orchestrates the transition between various pedagogical views.
 */
export default function ClassroomPage() {
  const { currentStreak } = useProgressStore();
  
  // Custom Orchestrator handles all navigation, topic loading, and offline logic
  const {
    isOnline,
    currentView,
    setCurrentView,
    activeSubject,
    setActiveSubject,
    activeChapter,
    setActiveChapter,
    activeTopic,
    setActiveTopic,
    lessonPhase,
    setLessonPhase,
    liveTopics,
    topicsLoading,
    useMock,
    toggleMock,
    showIntro,
    navigateBack,
    t
  } = useClassroomOrchestrator();

  // Activate Sovereign Sync (Offline-to-Online data bridge)
  useSovereignSync('scholar_1');

  // Full-screen Session rendering (Live AI OR Sovereign Offline AI)
  if (currentView === 'session') {
    return (
      <SessionView 
        activeSubject={activeSubject}
        activeChapter={activeChapter}
        activeTopic={activeTopic}
        lessonPhase={lessonPhase}
        useMock={useMock}
        onSetView={setCurrentView}
        onSetLessonPhase={setLessonPhase}
        onToggleMock={toggleMock}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-brand-primary/10">
      {/* 1. Notifications & Overlays */}
      <OfflineBanner 
        isOnline={isOnline} 
        message={t('sovereign_mode_active') || 'Sovereign Mode: Local Curriculum Active'} 
      />
      
      <AnimatePresence>
        {showIntro && currentView === 'dashboard' && <IntroSplash currentStreak={currentStreak} />}
      </AnimatePresence>

      {/* 2. Global Navigation */}
      <ClassroomHeader 
        currentView={currentView}
        activeSubject={activeSubject}
        isOnline={isOnline}
        useMock={useMock}
        onNavigateBack={navigateBack}
        onToggleMock={toggleMock}
        backButtonLabel={
          currentView === 'static_lesson' ? 'Back' : 
          currentView === 'topic' ? 'Chapters' : 
          t('back_to_subjects') || 'Subjects'
        }
      />

      {/* 3. Dynamic View Engine */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <DashboardView 
              isOnline={isOnline}
              onSetView={setCurrentView}
              onSetActiveSubject={setActiveSubject}
              onSetActiveChapter={setActiveChapter}
              onSetLessonPhase={setLessonPhase}
              onSetQuizQuestions={() => {}}
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

        {/* Global Attribution Footer (only visible in focused views) */}
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
