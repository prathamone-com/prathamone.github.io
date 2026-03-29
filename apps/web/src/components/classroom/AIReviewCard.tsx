/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Organization : AITDL Network | PrathamOne
 * Framework    : Autonomous AI Agent Development
 * Authored By  : Jawahar R Mallah
 * Version      : 1.1.0
 * Release Date : 29 March 2026
 * Environment  : Production
 * ==========================================================
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Brain, Target, 
  TrendingUp, HelpCircle, ArrowRight,
  CheckCircle2, AlertTriangle
} from 'lucide-react';

interface AIReviewCardProps {
  score: number;
  total: number;
  chapter: string;
  subject: string;
  onRetry: () => void;
  onContinue: () => void;
  weakTopics: string[];
}

export function AIReviewCard({ 
  score, total, chapter, subject, onRetry, onContinue, weakTopics 
}: AIReviewCardProps) {
  const accuracy = Math.round((score / total) * 100);
  
  // Logic-based AI Persona Feedback
  const getAiFeedback = () => {
    if (accuracy >= 90) return {
      title: "Exceptional Performance!",
      message: `Brilliant work on ${chapter}! You have a solid grasp of the core concepts. You're ready to proceed to the next chapter or try a 'Hard' level challenge.`,
      icon: <Sparkles className="text-yellow-500" />,
      color: "text-brand-success",
      bg: "bg-brand-success/5"
    };
    if (accuracy >= 70) return {
      title: "Strong Foundation!",
      message: `Well done! You understand the key principles of ${chapter}. A little more practice on ${weakTopics[0] || 'advanced applications'} will make you a master.`,
      icon: <Target className="text-brand-primary" />,
      color: "text-brand-primary",
      bg: "bg-brand-primary/5"
    };
    return {
      title: "Keep Growing!",
      message: `You're making progress! ${chapter} has some tricky parts. Let's revisit the ${weakTopics[0] || 'fundamental'} examples before trying the quiz again.`,
      icon: <Brain className="text-orange-500" />,
      color: "text-orange-600",
      bg: "bg-orange-50"
    };
  };

  const feedback = getAiFeedback();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-2xl rounded-[40px] border border-white/50 shadow-2xl p-10 max-w-2xl w-full mx-auto overflow-hidden relative"
    >
      {/* Premium Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-success" />
      
      {/* Header Section */}
      <div className="flex flex-col items-center mb-10">
        <div className={`w-20 h-20 rounded-3xl ${feedback.bg} flex items-center justify-center text-4xl mb-6 shadow-xl`}>
          {feedback.icon}
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">{feedback.title}</h2>
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 uppercase tracking-widest text-[10px] font-black text-gray-400">
          <span>{subject}</span>
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{chapter}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="p-6 rounded-[24px] bg-gray-50/50 border border-gray-100 text-center group hover:bg-white transition-all shadow-sm">
          <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Accuracy</p>
          <p className={`text-4xl font-black ${feedback.color}`}>{accuracy}%</p>
        </div>
        <div className="p-6 rounded-[24px] bg-gray-50/50 border border-gray-100 text-center group hover:bg-white transition-all shadow-sm">
          <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Correct</p>
          <p className="text-4xl font-black text-brand-success">{score}</p>
        </div>
        <div className="p-6 rounded-[24px] bg-gray-50/50 border border-gray-100 text-center group hover:bg-white transition-all shadow-sm">
          <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Total</p>
          <p className="text-4xl font-black text-gray-800">{total}</p>
        </div>
      </div>

      {/* AI Intelligence Box */}
      <div className="bg-brand-primary/5 rounded-[32px] p-8 border border-brand-primary/10 relative overflow-hidden group mb-10">
         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Sparkles className="w-12 h-12 text-brand-primary" />
         </div>
         <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-brand-primary flex items-center justify-center shrink-0 shadow-lg">
               <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
               <p className="text-xs font-black uppercase tracking-widest text-brand-primary mb-2">AI Retention Analysis</p>
               <p className="text-gray-700 font-medium leading-relaxed">{feedback.message}</p>
            </div>
         </div>
      </div>

      {/* Topics to Improve */}
      {weakTopics.length > 0 && (
        <div className="mb-10 px-4">
           <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-orange-400" /> Topics to Re-Visit
           </h4>
           <div className="flex flex-wrap gap-3">
              {weakTopics.map(topic => (
                 <div key={topic} className="px-4 py-2 bg-white border border-gray-200 rounded-xl flex items-center gap-2 group hover:border-brand-primary transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 group-hover:bg-brand-primary" />
                    <span className="text-sm font-bold text-gray-700">{topic}</span>
                 </div>
              ))}
           </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {accuracy < 80 && (
          <button 
            onClick={onRetry}
            className="flex-1 px-8 py-5 rounded-2xl bg-gray-100 text-gray-700 font-extrabold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          >
            Practice Again
          </button>
        )}
        <button 
          onClick={onContinue}
          className="flex-1 px-8 py-5 rounded-2xl bg-brand-primary text-white font-extrabold text-sm hover:scale-[1.02] shadow-xl shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 group"
        >
          {accuracy >= 80 ? 'Master the Next Topic' : accuracy < 70 ? 'Quick Re-Learn' : 'Proceed to Summary'}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
        </button>
      </div>

      {/* Retention Footer Badge */}
      <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-center gap-2 opacity-60">
         <CheckCircle2 className="w-4 h-4 text-brand-success" />
         <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Knowledge Retention Score Saved to Profile</span>
      </div>
    </motion.div>
  );
}
