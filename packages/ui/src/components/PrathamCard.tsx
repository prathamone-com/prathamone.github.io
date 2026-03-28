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

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PrathamCardProps extends HTMLMotionProps<"div"> {
  variant?: 'glass' | 'flat' | 'elevated' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const PrathamCard = React.forwardRef<HTMLDivElement, PrathamCardProps>(
  ({ className, variant = 'glass', padding = 'md', children, ...props }, ref) => {
    const variantStyles: Record<string, string> = {
      glass: 'bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl shadow-black/5',
      flat: 'bg-gray-50 border border-gray-100',
      elevated: 'bg-white shadow-xl shadow-black/5 border border-gray-50',
      outline: 'bg-transparent border-2 border-gray-100 hover:border-brand-primary/20 transition-all',
    };

    const paddingStyles: Record<string, string> = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6 ms:p-8',
      lg: 'p-10 ms:p-12',
      xl: 'p-16 ms:p-20',
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          'rounded-[40px] overflow-hidden relative',
          variantStyles[variant as string] || variantStyles.glass,
          paddingStyles[padding as string] || paddingStyles.md,
          className
        )}
        {...props}
      >
        {variant === 'glass' && (
           <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
        )}
        <div className="relative z-10 h-full">
           {children as React.ReactNode}
        </div>
      </motion.div>
    );
  }
);

PrathamCard.displayName = 'PrathamCard';

