/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Organization : AITDL Network | PrathamOne
 * Framework    : Autonomous AI Agent Development
 * Authored By  : Jawahar R Mallah
 * Version      : 1.1.2
 * Release Date : 29 March 2026
 * Environment  : Production
 * ==========================================================
 */

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Mic, Send, Check, Trophy 
} from 'lucide-react';
import { useCurriculumStore } from '@/lib/store/curriculum';
import { useProgressStore } from '@/lib/store/progress';
import { PERSONAS } from '@prathamone/ai';
import { InteractiveStage } from '@/components/classroom/InteractiveStage';
import { QuizCard } from '@/components/classroom/QuizCard';
import { 
  calculateMasteryBadge, getTranslation, 
  getQuestionsForChapter 
} from '@prathamone/db/curriculum';
import { useClassroomStream } from '@/lib/hooks/useClassroomStream';
import { extractJSONFromMessage, normalizePracticeQuestions } from '@/lib/utils/quiz';

interface SessionViewProps {
  activeSubject: string | null;
  activeChapter: string | null;
  activeTopic: any | null;
  lessonPhase: 'concept' | 'example' | 'practice' | 'summary' | 'remediation' | 'doubt';
  useMock: boolean;
  onSetView: (view: any) => void;
  onSetLessonPhase: (phase: 'concept' | 'example' | 'practice' | 'summary' | 'remediation' | 'doubt') => void;
  onToggleMock: () => void;
}

export const SessionView: React.FC<SessionViewProps> = ({
  activeSubject,
  activeChapter,
  activeTopic,
  lessonPhase,
  useMock,
  onSetView,
  onSetLessonPhase,
  onToggleMock
}) => {
  const { selectedBoard, selectedGrade, selectedLanguage } = useCurriculumStore();
  const { markChapterComplete, addWeakArea, weakAreas, currentStreak } = useProgressStore();
  const t = (key: string) => getTranslation(selectedLanguage, key);

  const { 
    messages, isStreaming, currentTeacherId, activePersona, startStream, setMessages 
  } = useClassroomStream();

  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [doubtInput, setDoubtInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [lastQuizScore, setLastQuizScore] = useState<number | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const LESSON_PHASES: { key: typeof lessonPhase; label: string; icon: string }[] = [
    { key: 'concept', label: t('concept') || 'Concept', icon: '📖' },
    { key: 'example', label: t('example') || 'Example', icon: '🧮' },
    { key: 'practice', label: t('practice') || 'Practice', icon: '✍️' },
    { key: 'summary', label: t('summary') || 'Summary', icon: '🎯' },
  ];

  // AI Orchestrator: Selects the best teacher for the current context
  const autoSelectTeacher = useCallback(() => {
     if (activeSubject?.toLowerCase().includes('sanskrit')) return 'pandit-ji';
     if ((selectedGrade || 10) < 6) return 'shanti-maam';
     if (lessonPhase === 'practice' || lessonPhase === 'remediation') return 'vikram-sir';
     return 'vikram-sir'; // Default senior lead
  }, [activeSubject, selectedGrade, lessonPhase]);

  const currentTeacher = activePersona || PERSONAS.find(p => p.id === autoSelectTeacher()) || PERSONAS[1];

  // Map phase to functional agent role
  const getFunctionalRole = () => {
    if (lessonPhase === 'concept') return 'Lecture Composer';
    if (lessonPhase === 'example') return 'Pedagogical Optimizer';
    if (lessonPhase === 'practice') return 'Assessment Agent';
    if (lessonPhase === 'remediation') return 'Socratic Bridge';
    if (lessonPhase === 'doubt') return 'Socratic Bridge';
    if (lessonPhase === 'summary') return 'Report Agent';
    return 'Director Agent';
  };

  const isPushMode = currentStreak > 5 && lessonPhase === 'practice'; // Example condition

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  // Effect to trigger initial stream or phase changes
  useEffect(() => {
    const triggerStream = async () => {
      await startStream({
        board: selectedBoard,
        grade: selectedGrade || 10,
        subject: activeSubject || 'Science',
        language: selectedLanguage,
        topic: activeTopic?.title || activeChapter || t('welcome_session') || 'Welcome Session',
        lessonPhase: activeSubject === 'General' ? 'doubt' : lessonPhase,
        teacherId: autoSelectTeacher(),
        useMock
      });
    };
    
    triggerStream();
  }, [lessonPhase, activeTopic, activeChapter, activeSubject, selectedLanguage, useMock, startStream, selectedBoard, selectedGrade, autoSelectTeacher, t]);


  // Handle Practice phase JSON parsing
  useEffect(() => {
    if (lessonPhase === 'practice' && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      
      // Only attempt to parse if the message is marked as complete by the stream
      if (lastMsg.isComplete) {
        const parsed = extractJSONFromMessage<any>(lastMsg.text);
        if (parsed) {
          setQuizQuestions(normalizePracticeQuestions(parsed));
        } else {
          // Fallback to deterministic questions if AI output is malformed
          setQuizQuestions(getQuestionsForChapter(activeChapter || '', 3, weakAreas, 'medium', selectedLanguage));
        }
      }
    }
  }, [lessonPhase, messages, activeChapter, weakAreas, selectedLanguage]);

  const advancePhase = (phase: typeof lessonPhase) => {
    onSetLessonPhase(phase);
  };

  const sendDoubt = () => {
    if (!doubtInput.trim() || isStreaming) return;
    startStream({
      board: selectedBoard,
      grade: selectedGrade || 10,
      subject: activeSubject || 'General',
      language: selectedLanguage,
      topic: doubtInput.trim(),
      lessonPhase: 'doubt',
      useMock
    });
    setDoubtInput('');
    onSetLessonPhase('doubt');
  };

  const handleMicClick = () => {
    if (isStreaming) return;
    setIsRecording(true);
    setVoiceTranscript(t('listening'));
    
    setTimeout(() => {
      setVoiceTranscript(t('doubt_sim') || ('I have a doubt about ' + (activeChapter || 'this topic') + '...'));
      setTimeout(() => {
        const simulatedDoubt = 'Can you explain the main principles of ' + (activeChapter || 'this lesson') + ' again?';
        setDoubtInput(simulatedDoubt);
        setIsRecording(false);
        setVoiceTranscript('');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-brand-background overflow-hidden animate-in fade-in duration-500">
      <header className="h-auto border-b border-gray-100 bg-white px-4 sm:px-6 shrink-0">
        <div className="h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
               onClick={() => { setMessages([]); onSetLessonPhase('concept'); onSetView(activeTopic ? 'topic' : 'dashboard'); }}
               className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
               <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <span className="font-bold text-brand-primary text-sm">PrathamOne Classroom</span>
              <div className="text-xs text-gray-400 font-medium">
                {activeSubject} • {activeTopic ? activeTopic.title : activeChapter}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
               onClick={onToggleMock}
               className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full h-8 transition-all flex items-center gap-2 ${
                 useMock ? 'bg-amber-100 text-amber-700 border border-amber-200 shadow-sm' : 'bg-green-50 text-green-600 border border-green-200'
               }`}
            >
               <span className="text-sm">{useMock ? '🛡️' : '☁️'}</span>
               {useMock ? 'Sovereign Mode' : 'Cloud Online'}
            </button>
          </div>
        </div>

        {activeSubject !== 'General' && lessonPhase !== 'doubt' && (
          <div className="flex items-center gap-1.5 pb-4 px-2">
            {LESSON_PHASES.map((phase, idx) => {
              const phases = ['concept','example','practice','summary'];
              const currentIdx = phases.indexOf(lessonPhase);
              const phaseIdx = phases.indexOf(phase.key);
              const isPast = phaseIdx < currentIdx;
              const isCurrent = phase.key === lessonPhase;
              
              return (
                <React.Fragment key={phase.key}>
                  <motion.button
                    initial={false}
                    animate={{ 
                      scale: isCurrent ? 1.05 : 1,
                      backgroundColor: isCurrent ? 'var(--brand-primary)' : isPast ? 'rgba(16, 185, 129, 0.1)' : 'rgba(243, 244, 246, 1)'
                    }}
                    onClick={() => advancePhase(phase.key)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      isCurrent ? 'text-white shadow-lg z-10' : isPast ? 'text-brand-success border border-brand-success/20' : 'text-gray-400 border border-transparent hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-sm">{phase.icon}</span>
                    <span className="hidden sm:inline">{phase.label}</span>
                    {isPast && <Check className="w-3 h-3 text-brand-success stroke-[4px]" />}
                    {isCurrent && (
                      <motion.div layoutId="active-pill" className="absolute inset-0 bg-brand-primary rounded-2xl -z-10" />
                    )}
                  </motion.button>
                  {idx < LESSON_PHASES.length - 1 && (
                    <div className="flex-1 max-w-[40px] h-[2px] bg-gray-100 rounded-full overflow-hidden">
                       <motion.div animate={{ width: isPast ? '100%' : '0%' }} className="h-full bg-brand-success" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </header>

      <main className="flex-1 flex overflow-hidden p-4 sm:p-6 gap-6 justify-center">
        {lessonPhase === 'summary' && activeChapter ? (
           <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-3xl w-full flex flex-col items-center justify-center space-y-10 py-12">
             <div className="bg-white/90 backdrop-blur-2xl rounded-[60px] p-12 sm:p-20 shadow-2xl border border-white/40 relative overflow-hidden w-full text-center">
               <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 via-transparent to-brand-success/5 pointer-events-none" />
               <motion.div 
                 initial={{ scale: 0.5 }} animate={{ scale: 1 }}
                 className="w-32 h-32 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-[40px] flex items-center justify-center mx-auto mb-10 shadow-2xl"
               >
                 <Trophy className="w-16 h-16 text-white" />
               </motion.div>
               <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
                 {selectedLanguage === 'sa' ? 'भारत-शिक्षा सिद्धा!' : t('learning_mastered') || 'Bharat Learning Mastered!'}
               </h2>
               <p className="text-xl text-gray-500 font-medium mb-12 max-w-lg mx-auto leading-relaxed">
                 {t('congratulations') || 'Congratulations! You\'ve successfully conquered'} <span className="text-brand-primary font-black">{activeChapter}</span>.
               </p>

               {lastQuizScore !== null && (
                 <motion.div 
                   initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                   className="w-full bg-white/50 border border-gray-100 rounded-[32px] p-8 mb-12 text-left"
                 >
                   <div className="flex items-center justify-between mb-6">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-xl">📊</div>
                       <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">{t('pedagogical_report') || 'Pedagogical Report'}</h3>
                     </div>
                     <div className="text-2xl font-black text-brand-primary">{lastQuizScore}%</div>
                   </div>
                   
                   <div className="flex gap-4 p-4 bg-brand-primary/5 rounded-2xl border border-brand-primary/10">
                     <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                       <span className="text-2xl">📝</span>
                     </div>
                     <div>
                       <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-1">{t('report_agent') || 'Report Agent'}</p>
                       <p className="text-sm text-gray-700 font-medium leading-relaxed">
                         {lastQuizScore >= 80 
                           ? (t('mastery_advice_high') || 'Exceptional work! You have shown a deep understanding of the concepts. Proceed to more advanced topics.')
                           : (t('mastery_advice_mid') || 'Good progress. Review the weak areas identified during practice to achieve full mastery.')}
                       </p>
                     </div>
                   </div>
                 </motion.div>
               )}

               <div className="flex flex-col sm:flex-row gap-5">
                 <button onClick={() => { onSetView('dashboard'); onSetLessonPhase('concept'); }} className="flex-1 px-10 py-6 bg-white border-2 border-gray-100 text-gray-700 rounded-3xl font-black text-lg">
                   {t('done_for_today')}
                 </button>
                 <button onClick={() => { onSetView('subject'); onSetLessonPhase('concept'); }} className="flex-1 px-10 py-6 bg-brand-primary text-white rounded-3xl font-black text-lg">
                   {t('next_chapter')}
                 </button>
               </div>
             </div>
           </motion.div>
        ) : (
          <>
            <section className="flex-1 flex flex-col gap-4 min-w-0">
              <div className="relative flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="absolute inset-0 z-0 overflow-y-auto">
                  {lessonPhase === 'practice' && quizQuestions.length > 0 ? (
                    <div className="p-6">
                      <QuizCard
                        questions={quizQuestions}
                        chapter={activeChapter || ''}
                        subject={activeSubject || ''}
                        onComplete={(score, total) => {
                          const pct = Math.round((score / total) * 100);
                          setLastQuizScore(pct);
                          if (pct < 70) addWeakArea(activeChapter || '');
                          markChapterComplete(activeSubject || '', activeChapter || '', ['concept', 'practice'], pct);
                        }}
                        onAdvance={() => {
                          // Adaptive Routing: If score < 70%, trigger remediation
                          if (lastQuizScore !== null && lastQuizScore < 70) {
                            onSetLessonPhase('remediation');
                          } else {
                            advancePhase('summary');
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <InteractiveStage 
                      content={messages.length > 0 ? messages[messages.length - 1].text : ''} 
                      isStreaming={isStreaming} 
                      topic={activeChapter || 'General Doubt'} 
                    />
                  )}
                </div>
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="absolute bottom-6 right-6 w-60 h-auto bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/60 p-5 flex flex-col items-center group transition-all hover:bg-white/95"
                >
                  {isPushMode && (
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="absolute -top-3 -left-3 px-4 py-1.5 bg-gradient-to-r from-red-600 to-orange-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg border border-red-400 z-10"
                    >
                      {t('the_push_mode') || 'THE PUSH MODE'}
                    </motion.div>
                  )}
                  
                  <div className="w-full aspect-square rounded-[24px] bg-brand-primary/5 mb-4 overflow-hidden border border-brand-primary/10 relative">
                    <img src={currentTeacher.avatar} alt={currentTeacher.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>
                  
                  <div className="text-center w-full">
                    <div className="flex flex-col gap-0.5 mb-4">
                      <p className="font-black text-base text-gray-900 leading-tight">{currentTeacher.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{currentTeacher.role}</p>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100/50 flex flex-col gap-2">
                      <div className="flex items-center justify-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-brand-success animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                         <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest opacity-70">
                            {t('active_agent') || 'Agent Online'}
                         </span>
                      </div>
                      <span className="text-[11px] font-black text-gray-800 bg-gray-50/50 py-2.5 rounded-xl border border-gray-100/50 shadow-sm px-3 backdrop-blur-sm">
                         {t(getFunctionalRole().toLowerCase().replace(/ /g, '_')) || getFunctionalRole()}
                      </span>
                    </div>
                  </div>
                </motion.div>


              </div>
            </section>

            <aside className="hidden lg:flex flex-col w-96 shrink-0 gap-4">
              <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                  <span className="font-bold text-sm">{t('class_discussion') || 'Class Discussion'}</span>
                </div>
                <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
                  {messages.map((msg) => {
                    const t = PERSONAS.find(p => p.id === msg.teacherId);
                    const isLead = t?.role?.includes('Teacher') || t?.role?.includes('Scholar');
                    return (
                      <div key={msg.id} className={`flex flex-col gap-1 max-w-[85%] ${isLead ? 'self-start' : 'self-end items-end'}`}>
                        <span className="text-[10px] font-bold text-gray-400 mx-1">
                          {t?.name || 'Agent'} 
                          {!msg.isComplete && <span className="ml-1 animate-pulse italic">typing...</span>}
                        </span>
                        <div className={`p-3 rounded-2xl text-sm shadow-sm transition-all ${
                          isLead ? 'bg-gray-100 text-gray-700' : 'bg-brand-primary text-white scale-100'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}
                  {!isStreaming && messages.length > 0 && activeSubject !== 'General' && (
                    <div className="self-start flex flex-wrap gap-2 mt-2">
                      {lessonPhase === 'concept' && <button onClick={() => advancePhase('example')} className="px-3 py-2 bg-brand-primary text-white text-xs font-bold rounded-xl">🧮 {t('see_example') || 'See Example'}</button>}
                      {lessonPhase === 'example' && <button onClick={() => advancePhase('practice')} className="px-3 py-2 bg-brand-primary text-white text-xs font-bold rounded-xl">✍️ {t('practice_now') || 'Practice Now'}</button>}
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 border-t border-gray-100 bg-white">
                  <div className="flex gap-2">
                    <button onClick={handleMicClick} disabled={isStreaming} className={`p-3.5 rounded-xl ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-50 text-gray-400'}`}>
                      <Mic className="w-5 h-5" />
                    </button>
                    <div className="relative flex-1">
                      <input 
                        type="text" value={doubtInput}
                        onChange={e => setDoubtInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendDoubt()}
                        disabled={isStreaming}
                        placeholder={isStreaming ? t('responding') || 'Responding...' : t('ask_a_doubt') || 'Ask a doubt...'}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-4 pr-12 py-3.5 text-sm outline-none"
                      />
                      <button onClick={sendDoubt} disabled={isStreaming || !doubtInput.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-primary text-white rounded-lg">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </>
        )}
      </main>

      <AnimatePresence>
        {isRecording && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-8 text-center">
            <Mic className="w-24 h-24 text-red-500 mb-10 animate-pulse" />
            <h3 className="text-2xl font-black text-gray-900 mb-2">{t('listen_mode_active') || 'Listen-Mode Active'}</h3>
            <p className="text-brand-primary font-black text-lg mb-8">{voiceTranscript}</p>
            <button onClick={() => setIsRecording(false)} className="px-10 py-5 bg-gray-900 text-white rounded-3xl font-black uppercase text-sm">{t('cancel') || 'Cancel'}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

