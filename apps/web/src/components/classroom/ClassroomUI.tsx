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
import { useCurriculumStore } from '@/lib/store/curriculum';
import { useProgressStore } from '@/lib/store/progress';
import { LANGUAGES, getTranslation } from '@prathamone/db/curriculum';

/**
 * IntroSplash: Cinematic welcome experience for the student.
 */
export const IntroSplash = ({ currentStreak }: { currentStreak: number }) => {
  const { selectedLanguage } = useCurriculumStore();
  const t = (key: string) => getTranslation(selectedLanguage, key);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 text-center"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-md w-full"
      >
        <div className="w-32 h-32 bg-brand-primary rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-brand-primary/20 overflow-hidden border-2 border-brand-primary/10">
           <img src="/logo-ganesha.png" alt="PrathamOne" className="w-full h-full object-cover scale-110" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">PrathamOne</h1>
        <p className="text-xl text-gray-400 font-medium mb-12 uppercase tracking-[0.3em] text-[10px]">AI Classroom for Bharat</p>
        
        <div className="flex flex-col items-center gap-6">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-6 py-3 bg-orange-50 rounded-2xl border border-orange-100">
                 <span className="text-2xl">🔥</span>
                 <span className="text-lg font-black text-orange-600">{currentStreak} {t('day_streak')}</span>
              </div>
              
              <div className="flex items-center gap-3 px-6 py-3 bg-yellow-50 rounded-2xl border border-yellow-100">
                 <span className="text-2xl font-black text-yellow-500 mb-0.5">₹</span>
                 <span className="text-lg font-black text-yellow-600">{(useProgressStore.getState() as any).coins || 0}</span>
              </div>
           </div>
           
           <div className="flex items-center gap-2">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-2 h-2 rounded-full bg-brand-success" 
              />
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{t('ready_to_start')}</span>
           </div>
        </div>
      </motion.div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl -z-10" />
    </motion.div>
  );
};

/**
 * LanguageSwitcher: Toggle between English, Hindi, and Regional languages.
 */
export const LanguageSwitcher = () => {
  const { selectedLanguage, setLanguage } = useCurriculumStore();
  
  return (
    <div className="flex items-center gap-1.5 p-1.5 bg-gray-100 rounded-2xl border border-gray-200 shadow-sm">
      {Object.values(LANGUAGES).map(lang => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${
            selectedLanguage === lang.code 
              ? 'bg-white text-brand-primary shadow-sm' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {lang.nativeName}
        </button>
      ))}
    </div>
  );
};

/**
 * PrathamButton: Standardized premium button for the platform.
 */
export const PrathamButton = ({ 
  children, 
  onClick, 
  className = '',
  disabled = false,
  variant = 'primary',
  size = 'md'
}: { 
  children: React.ReactNode, 
  onClick?: () => void, 
  className?: string,
  disabled?: boolean,
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline',
  size?: 'sm' | 'md' | 'lg'
}) => {
  const variants = {
    primary: 'bg-brand-primary text-white hover:shadow-brand-primary/20',
    secondary: 'bg-white text-brand-primary border-2 border-brand-primary/10 hover:bg-brand-primary/5',
    ghost: 'bg-transparent text-gray-500 hover:bg-gray-50',
    outline: 'bg-transparent text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-white'
  };

  const sizes = {
    sm: 'px-4 py-2 text-[9px]',
    md: 'px-8 py-4 text-[11px]',
    lg: 'px-12 py-5 text-sm'
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center gap-2
        rounded-2xl font-black uppercase tracking-widest 
        transition-all shadow-sm hover:shadow-xl
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant as keyof typeof variants]}
        ${sizes[size as keyof typeof sizes]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

/**
 * PrathamCard: Premium container with consistent shadows and glassmorphism.
 */
export const PrathamCard = ({ 
  children, 
  className = '',
  variant = 'white'
}: { 
  children: React.ReactNode, 
  className?: string,
  variant?: 'white' | 'glass' | 'blue'
}) => {
  const variants = {
    white: 'bg-white border-gray-100',
    glass: 'bg-white/70 backdrop-blur-xl border-white/50 shadow-2xl',
    blue: 'bg-brand-primary text-white border-white/10 shadow-indigo-500/20'
  };

  return (
    <div className={`
      p-8 rounded-[40px] border shadow-sm
      ${variants[variant as keyof typeof variants]}
      ${className}
    `}>
      {children}
    </div>
  );
};
