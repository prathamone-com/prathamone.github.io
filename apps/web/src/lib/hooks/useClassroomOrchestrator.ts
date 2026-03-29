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
import { fetchTopicsFromDB, getTopicsForChapter, getTranslation } from '@prathamone/db/curriculum';

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
  const [useMock, setUseMock] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  // 1. Sovereign Offline Routing
  useEffect(() => {
    if (!isOnline && currentView === 'session') {
      setCurrentView('static_lesson');
    }
  }, [isOnline, currentView]);

  // 2. Intro Splash Sequence
  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => setShowIntro(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  // 3. Automated Topic Fetching
  useEffect(() => {
    if (currentView === 'topic' && activeChapter && selectedBoard && selectedGrade) {
      setTopicsLoading(true);
      fetchTopicsFromDB(selectedBoard, selectedGrade, activeSubject || 'Mathematics', activeChapter)
        .then(topics => { 
          setLiveTopics(topics); 
          setTopicsLoading(false); 
        })
        .catch(() => {
          // Fallback to local deterministic topics if network fails
          setLiveTopics(getTopicsForChapter(selectedBoard, selectedGrade || 12, activeSubject || 'Mathematics', activeChapter));
          setTopicsLoading(false);
        });
    }
  }, [currentView, activeChapter, selectedBoard, selectedGrade, activeSubject]);

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
    useMock,
    toggleMock,
    showIntro,
    setShowIntro,
    navigateBack,
    t
  };
}
