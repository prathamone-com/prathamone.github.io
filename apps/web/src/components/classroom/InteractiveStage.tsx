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

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InteractiveStageProps {
  content: string;
  isStreaming: boolean;
  topic?: string;
}

export function InteractiveStage({ content, isStreaming, topic }: InteractiveStageProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Intelligent Auto-scroll (Indian EdTech standard)
  useEffect(() => {
    if (scrollRef.current && isStreaming) {
      const el = scrollRef.current;
      // Scroll to bottom if user hasn't heavily scrolled up
      const isScrolledUp = el.scrollHeight - el.scrollTop > el.clientHeight + 100;
      if (!isScrolledUp) {
        el.scrollTop = el.scrollHeight;
      }
    }
  }, [content, isStreaming]);

  return (
    <div className="relative w-full h-full bg-[#0d1526] rounded-3xl border-[12px] border-slate-900 shadow-2xl overflow-hidden flex flex-col group/board">
      {/* Board Header / Frame Top */}
      <div className="h-12 bg-slate-900 border-b border-slate-800/50 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/40 border border-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/40 border border-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-500/40 border border-green-500/20" />
          </div>
          <div className="h-4 w-px bg-slate-800 mx-2" />
          <span className="font-mono text-slate-500 text-[10px] tracking-[0.3em] uppercase font-black">
            PrathamOne Smart Slate v1.0
          </span>
        </div>
        {topic && (
          <div className="px-3 py-1 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">{topic}</span>
          </div>
        )}
      </div>

      {/* Deep Slate Surface */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-10 sm:p-16 font-sans text-slate-100/95 text-[1.15rem] leading-[1.8] tracking-wide relative"
        style={{
           scrollBehavior: isStreaming ? 'smooth' : 'auto',
           backgroundImage: `
             radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.15) 0%, transparent 80%),
             url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")
           `
        }}
      >
        <AnimatePresence>
          {!content && (
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0, scale: 0.95 }}
               className="h-full flex flex-col items-center justify-center text-slate-700/40 font-black tracking-[0.5em] uppercase text-sm"
            >
              Slate Initializing...
            </motion.div>
          )}
        </AnimatePresence>
        
        {content && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="whitespace-pre-wrap relative z-10"
          >
            {content.split('\n').map((line, i) => {
              const trimmed = line.trim();
              
              // 1. Headers (Double Asterisk)
              if (line.includes('**')) {
                return (
                   <motion.div 
                     key={i} 
                     initial={{ opacity: 0, x: -5 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="mt-8 mb-4 relative"
                   >
                     <span className="text-brand-secondary text-2xl font-black tracking-tight drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                       {line.replace(/\*\*/g, '').trim()}
                     </span>
                     <div className="h-1 w-24 bg-brand-secondary/30 mt-1 rounded-full" />
                   </motion.div>
                );
              }

              // 2. Math Formulas (Starting with $$)
              if (trimmed.startsWith('$$')) {
                return (
                  <div key={i} className="my-10 p-8 bg-slate-800/30 rounded-3xl border border-slate-800/50 backdrop-blur-sm text-center">
                    <span className="text-2xl font-mono text-brand-success font-bold drop-shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      {trimmed.replace(/\$\$/g, '').trim()}
                    </span>
                  </div>
                );
              }

              // 3. Key Highlights (Bracketed)
              if (line.includes('[') && line.includes(']')) {
                const parts = line.split(/(\[.*?\])/);
                return (
                  <p key={i} className="mb-5">
                    {parts.map((part, pi) => {
                      if (part.startsWith('[') && part.endsWith(']')) {
                        return (
                          <span key={pi} className="px-2 py-0.5 bg-brand-primary/20 text-brand-primary border border-brand-primary/30 rounded-md font-bold mx-1">
                            {part.slice(1, -1)}
                          </span>
                        );
                      }
                      return <span key={pi}>{part}</span>;
                    })}
                  </p>
                );
              }

              // 4. Bullet Points
              if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                return (
                   <div key={i} className="flex items-start gap-4 mb-3 ml-6 group/item">
                     <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary mt-2.5 shadow-[0_0_10px_rgba(249,115,22,0.5)] group-hover/item:scale-125 transition-transform" />
                     <span className="flex-1 font-medium text-slate-200">{line.replace(/^[-*]\s/, '')}</span>
                   </div>
                );
              }

              // Default Text
              if (!trimmed) return <div key={i} className="h-4" />;
              return (
                 <p key={i} className="mb-5 text-slate-300 font-medium">
                   {line}
                 </p>
              );
            })}
            
            {isStreaming && (
              <motion.span 
                animate={{ 
                  opacity: [1, 0, 1],
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 10px rgba(16,185,129,0.5)",
                    "0 0 20px rgba(16,185,129,0.8)",
                    "0 0 10px rgba(16,185,129,0.5)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="inline-block w-3 h-7 bg-brand-success ml-2 align-middle rounded-sm"
              />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
