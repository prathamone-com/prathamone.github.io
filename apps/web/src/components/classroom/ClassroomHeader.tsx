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

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { LanguageSwitcher } from '@/components/classroom/ClassroomUI';

interface ClassroomHeaderProps {
  currentView: string;
  activeSubject: string | null;
  isOnline: boolean;
  useMock: boolean;
  onNavigateBack: () => void;
  onToggleMock: () => void;
  backButtonLabel: string;
}

export const ClassroomHeader: React.FC<ClassroomHeaderProps> = ({
  currentView,
  activeSubject,
  isOnline,
  useMock,
  onNavigateBack,
  onToggleMock,
  backButtonLabel
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 flex-none px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20 overflow-hidden border border-brand-primary/10">
          <img src="/logo-ganesha.png" alt="P1" className="w-full h-full object-cover scale-110" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 leading-none">PrathamOne</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
            AI Classroom • {activeSubject || 'Dashboard'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        {currentView !== 'dashboard' && currentView !== 'shop' && (
           <button 
             onClick={onNavigateBack}
             className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-primary transition-colors"
           >
             <ArrowLeft className="w-4 h-4" />
             <span>{backButtonLabel}</span>
          </button>
        )}

        <div className="hidden md:flex items-center gap-4">
           <button
             onClick={onToggleMock}
             className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest transition-all ${
               !isOnline ? 'bg-amber-100 text-amber-700 border-amber-200' :
               useMock ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-sm' : 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-sm'
             }`}
           >
              <span className="text-sm">{!isOnline ? '📴' : useMock ? '🛡️' : '☁️'}</span>
              {!isOnline ? 'Sovereign Mode' : useMock ? 'Sovereign (Offline)' : 'Public Cloud (Online)'}
           </button>
           <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};
