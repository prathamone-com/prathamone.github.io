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

import { useState, useEffect } from 'react';
import { useCurriculumStore } from '@/lib/store/curriculum';
import { useOnlineStatus } from '@/lib/hooks/useOnlineStatus';
import { getChapters, getTopicsForChapter, getTranslation } from '@prathamone/db/curriculum';
import { getOfflineRemediation } from '../utils/curriculum-offline';

export type ClassroomView = 'dashboard' | 'subject' | 'topic' | 'session' | 'static_lesson' | 'shop';
export type LessonPhase = 'concept' | 'example' | 'practice' | 'summary' | 'remediation' | 'doubt';

export function useClassroomOrchestrator() {
  const isOnline = useOnlineStatus();
  const { selectedBoard, selectedGrade, selectedLanguage } = useCurriculumStore();
  
  const t = (key: string) => getTranslation(selectedLanguage, key);

  // Core State
  const [currentView, setCurrentView] = useState<ClassroomView>('dashboard');
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<any | null>(null);
  const [lessonPhase, setLessonPhase] = useState<LessonPhase>('concept');
  
  // Topic Management
  const [liveTopics, setLiveTopics] = useState<any[]>([]);
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [remediationPlan, setRemediationPlan] = useState<any | null>(null);
  const [useMock, setUseMock] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  // 1. Splash Sequence Control
  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => setShowIntro(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  // 3. Automated Topic Fetching (Sovereign Local-First)
  useEffect(() => {
    if (activeChapter && selectedBoard && selectedGrade) {
      setTopicsLoading(true);
      const topics = getTopicsForChapter(
        selectedBoard, 
        selectedGrade, 
        activeSubject || 'Mathematics', 
        activeChapter
      );
      setLiveTopics(topics || []);
      setTopicsLoading(false);
    } else {
      setLiveTopics([]);
    }
  }, [activeChapter, selectedBoard, selectedGrade, activeSubject]);

  // 3.5 Sovereign Prefetching (Hardening)
  useEffect(() => {
    if (isOnline && activeSubject && selectedBoard && selectedGrade) {
      console.log(`Sovereign Sync: Prefetching curriculum for ${activeSubject}...`);
      const chapters = getChapters(selectedBoard, selectedGrade, activeSubject);
      if (chapters) {
        // "Touch" each chapter's topics to ensure they are parsed and ready in memory/cache
        chapters.slice(0, 5).forEach(chapter => {
           getTopicsForChapter(selectedBoard, selectedGrade, activeSubject, chapter);
        });
      }
    }
  }, [activeSubject, isOnline, selectedBoard, selectedGrade]);

  // 4. Remediation Logic
  useEffect(() => {
    if (lessonPhase === 'remediation' && activeChapter) {
      setRemediationPlan(getOfflineRemediation(activeChapter));
    } else {
      setRemediationPlan(null);
    }
  }, [lessonPhase, activeChapter]);

  const navigateBack = () => {
    if (currentView === 'topic') setCurrentView('subject');
    else if (currentView === 'static_lesson') setCurrentView('topic');
    else { 
      setCurrentView('dashboard'); 
      setActiveSubject(null); 
    }
  };

  const toggleMock = () => setUseMock(prev => !prev);

  return {
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
    remediationPlan,
    useMock,
    toggleMock,
    showIntro,
    setShowIntro,
    navigateBack,
    t
  };
}
