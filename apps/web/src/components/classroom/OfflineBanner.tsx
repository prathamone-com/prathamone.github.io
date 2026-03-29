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

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, WifiOff } from 'lucide-react';

interface OfflineBannerProps {
  isOnline: boolean;
  message: string;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOnline, message }) => {
  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div 
          initial={{ y: -50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          exit={{ y: -50, opacity: 0 }}
          className="bg-gradient-to-r from-brand-primary via-amber-600 to-brand-primary text-white py-2 px-6 text-center relative z-[100] shadow-2xl border-b border-white/10"
        >
          <div className="flex items-center justify-center gap-4">
             <div className="flex items-center gap-2 px-2 py-0.5 rounded-md bg-white/10 border border-white/20">
                <ShieldCheck className="w-3 h-3 text-amber-300" />
                <span className="text-[9px] font-black uppercase tracking-widest">Sovereign Mode</span>
             </div>
             
             <div className="flex items-center gap-2">
                <WifiOff className="w-3.5 h-3.5 opacity-70" />
                <span className="text-[10px] font-bold tracking-wider">{message}</span>
             </div>

             <div className="hidden sm:flex items-center gap-2 opacity-50">
                <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                <span className="text-[9px] font-medium italic">Data is local & secure</span>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

