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
import { ShieldCheck, WifiOff, RefreshCcw, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useProgressStore } from '@/lib/store/progress';
import { formatDistanceToNow } from 'date-fns';

interface OfflineBannerProps {
  isOnline: boolean;
  message: string;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOnline, message }) => {
  const { isSyncing, lastSyncedAt, syncError, syncOfflineProgress } = useProgressStore();

  return (
    <div className="relative z-[100]">
      <AnimatePresence>
        {/* Offline Banner: Only visible when network is lost */}
        {!isOnline && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: -50, opacity: 0 }}
            className="bg-gradient-to-r from-brand-primary via-amber-600 to-brand-primary text-white py-1.5 px-6 text-center shadow-2xl border-b border-white/10"
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

        {/* Sync Status / Errors: Visible when online */}
        {isOnline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-2 right-4 flex items-center gap-3 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-100 shadow-sm transition-all hover:bg-white"
          >
            {syncError ? (
              <button 
                onClick={() => syncOfflineProgress('scholar_1')}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
              >
                <AlertTriangle className="w-3 h-3" />
                <span className="text-[9px] font-black uppercase tracking-tighter">Sync Failed - Retry?</span>
              </button>
            ) : isSyncing ? (
              <>
                <RefreshCcw className="w-3 h-3 text-brand-primary animate-spin" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Syncing...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3 h-3 text-brand-success" />
                <span className="text-[10px] font-medium text-gray-400">
                  {lastSyncedAt ? `Synced ${formatDistanceToNow(new Date(lastSyncedAt))} ago` : 'Synced to Cloud'}
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

