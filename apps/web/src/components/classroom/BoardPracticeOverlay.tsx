/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Version      : 1.0.0
 * Release Date : 29 March 2026
 * ==========================================================
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getQuestionsForChapter, QuizQuestion } from '@prathamone/db/curriculum';

interface BoardPracticeOverlayProps {
  chapter: string;
  difficulty: 'easy' | 'medium' | 'hard';
  onClose: () => void;
}

export const BoardPracticeOverlay: React.FC<BoardPracticeOverlayProps> = ({ chapter, difficulty, onClose }) => {
  const [questions, setQuestions] = React.useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [answered, setAnswered] = React.useState(false);

  React.useEffect(() => {
    // Generate 5 questions for the practice test
    const q = getQuestionsForChapter(chapter, 5, [], difficulty);
    setQuestions(q);
  }, [chapter, difficulty]);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelectedOption(idx);
  };

  const handleNext = () => {
    const isCorrect = selectedOption === questions[currentIndex].correctIndex;
    if (isCorrect) setScore(s => s + 1);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setAnswered(true);
  };

  if (questions.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl"
      >
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">{chapter}</h2>
            <p className="text-xs font-bold text-brand-primary uppercase tracking-widest mt-1">
              Board Practice Test ({difficulty})
            </p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-400 transition-colors">
            ✕
          </button>
        </div>

        <div className="p-10">
          {!showResult ? (
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-brand-primary text-white rounded-2xl font-black text-sm">
                  {currentIndex + 1} / {questions.length}
                </span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    className="h-full bg-brand-primary"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 leading-tight">
                {questions[currentIndex].question}
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {questions[currentIndex].options.map((opt, i) => {
                  const isSelected = selectedOption === i;
                  const isCorrect = i === questions[currentIndex].correctIndex;
                  
                  let borderColor = "border-gray-100";
                  let bgColor = "bg-white";
                  let textColor = "text-gray-700";

                  if (answered) {
                    if (isCorrect) {
                      borderColor = "border-brand-success";
                      bgColor = "bg-brand-success/10";
                      textColor = "text-brand-success";
                    } else if (isSelected) {
                      borderColor = "border-red-500";
                      bgColor = "bg-red-50";
                      textColor = "text-red-600";
                    }
                  } else if (isSelected) {
                    borderColor = "border-brand-primary";
                    bgColor = "bg-brand-primary/5";
                    textColor = "text-brand-primary";
                  }

                  return (
                    <button
                      key={i}
                      disabled={answered}
                      onClick={() => handleSelect(i)}
                      className={`p-6 rounded-2xl border-2 text-left font-bold transition-all flex items-center gap-4 ${borderColor} ${bgColor} ${textColor} ${!answered && 'hover:border-brand-primary/30'}`}
                    >
                      <span className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center border-2 ${isSelected ? 'border-transparent bg-white shadow-sm' : 'border-gray-100'}`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-gray-100">
                {!answered ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={handleCheck}
                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest disabled:opacity-50 transition-all hover:bg-slate-800"
                  >
                    Check Answer
                  </button>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl text-xs font-semibold text-gray-600 leading-relaxed">
                      <strong className="text-brand-primary uppercase tracking-widest block mb-2">Explanation:</strong>
                      {questions[currentIndex].explanation}
                    </div>
                    <button
                      onClick={handleNext}
                      className="w-full py-5 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest hover:bg-brand-secondary transition-all"
                    >
                      {currentIndex === questions.length - 1 ? 'Finish & See Results' : 'Next Question'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 space-y-6">
              <div className="relative inline-block">
                <div className="text-9xl mb-4">🏆</div>
                <motion.div 
                   initial={{ scale: 0 }} 
                   animate={{ scale: 1 }} 
                   className="absolute -right-4 -top-4 w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg"
                >
                  {score}/{questions.length}
                </motion.div>
              </div>
              <h2 className="text-4xl font-black text-gray-900">Great Job!</h2>
              <p className="text-gray-500 font-bold max-w-sm mx-auto">
                You correctly answered {score} out of {questions.length} questions in this offline board practice session.
              </p>
              <button
                onClick={onClose}
                className="w-full max-w-xs py-5 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest hover:bg-brand-secondary transition-all shadow-xl shadow-brand-primary/20"
              >
                Back to Lesson
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
