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

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Trophy, Target } from 'lucide-react';
import type { QuizQuestion } from '@prathamone/db/curriculum';
import { AIReviewCard } from './AIReviewCard';

interface QuizCardProps {
  questions: QuizQuestion[];
  chapter: string;
  subject: string;
  onComplete: (score: number, total: number) => void;
  onAdvance: () => void;
}

type AnswerState = 'idle' | 'correct' | 'wrong' | 'explained';

export function QuizCard({ questions, chapter, subject, onComplete, onAdvance }: QuizCardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const current = questions[currentIdx];
  const total = questions.length;
  const progressPct = Math.round(((currentIdx) / total) * 100);

  const handleSelect = (idx: number) => {
    if (answerState !== 'idle') return;
    setSelectedOption(idx);
    const isCorrect = idx === current.correctIndex;
    setAnswerState(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => setShowExplanation(true), 400);
  };

  const handleNext = () => {
    if (currentIdx < total - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOption(null);
      setAnswerState('idle');
      setShowExplanation(false);
    } else {
      setIsFinished(true);
      onComplete(score + (answerState === 'correct' ? 1 : 0), total);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setIsFinished(false);
    setAnswerState('idle');
    setSelectedOption(null);
    setShowExplanation(false);
  };

  // Calculate weak topics from incorrent answers
  const weakTopics = Array.from(new Set(
    questions.filter((q, idx) => {
      // This is a bit tricky since we don't store "history" of all answers here yet
      // but we can infer it if we add a history state or just use the current chapter
      return q.difficulty === 'hard'; // Placeholder logic for now
    }).map(q => q.topic)
  )).slice(0, 3);

  if (isFinished) {
    return (
      <AIReviewCard 
        score={score}
        total={total}
        chapter={chapter}
        subject={subject}
        onRetry={handleRestart}
        onContinue={onAdvance}
        weakTopics={weakTopics.length > 0 ? weakTopics : [chapter]}
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Progress Bar */}
      <div className="h-1.5 bg-gray-100">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-brand-primary" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{current.topic}</span>
          </div>
          <span className="text-xs font-bold text-gray-400">
            Q {currentIdx + 1} / {total}
          </span>
        </div>

        {/* Difficulty Badge */}
        <div className="mb-4">
          <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full ${
            current.difficulty === 'easy' ? 'bg-brand-success/10 text-brand-success' :
            current.difficulty === 'medium' ? 'bg-orange-50 text-orange-500' :
            'bg-red-50 text-red-500'
          }`}>
            {current.difficulty}
          </span>
        </div>

        {/* Question */}
        <p className="text-lg font-bold text-gray-900 mb-6 leading-snug">{current.question}</p>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {current.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === current.correctIndex;
            let stateCls = 'border-gray-100 bg-gray-50 hover:border-brand-primary/40 hover:bg-brand-primary/5';

            if (answerState !== 'idle') {
              if (isCorrect) {
                stateCls = 'border-brand-success bg-brand-success/5 text-brand-success';
              } else if (isSelected && !isCorrect) {
                stateCls = 'border-red-300 bg-red-50 text-red-600';
              } else {
                stateCls = 'border-gray-100 bg-gray-50 opacity-50';
              }
            }

            return (
              <motion.button
                key={idx}
                whileTap={{ scale: answerState === 'idle' ? 0.98 : 1 }}
                onClick={() => handleSelect(idx)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left font-semibold text-sm transition-all ${stateCls} ${
                  answerState === 'idle' ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <span className={`w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full border text-xs font-bold ${
                  isSelected && answerState !== 'idle'
                    ? isCorrect ? 'bg-brand-success border-brand-success text-white' : 'bg-red-500 border-red-500 text-white'
                    : isCorrect && answerState !== 'idle'
                    ? 'bg-brand-success border-brand-success text-white'
                    : 'border-gray-200 text-gray-400'
                }`}>
                  {answerState !== 'idle' && isCorrect
                    ? <CheckCircle className="w-4 h-4" />
                    : answerState !== 'idle' && isSelected && !isCorrect
                    ? <XCircle className="w-4 h-4" />
                    : String.fromCharCode(65 + idx)}
                </span>
                {opt}
              </motion.button>
            );
          })}
        </div>

        {/* AI Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`overflow-hidden mb-6 rounded-xl p-4 border ${
                answerState === 'correct'
                  ? 'bg-brand-success/5 border-brand-success/20'
                  : 'bg-orange-50 border-orange-200'
              }`}
            >
              <p className="text-xs font-extrabold uppercase tracking-widest mb-1.5 text-gray-500">
                {answerState === 'correct' ? '✅ Correct!' : '❌ Incorrect — Here\'s why:'}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">{current.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Button */}
        {showExplanation && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleNext}
            className="w-full py-3.5 bg-brand-primary text-white font-bold text-sm rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-2"
          >
            {currentIdx < total - 1 ? 'Next Question' : 'See Results'}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
