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

interface PrathamButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
}

export const PrathamButton = React.forwardRef<HTMLButtonElement, PrathamButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variantStyles: Record<string, string> = {
      primary: 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30 active:scale-95',
      secondary: 'bg-white border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5 active:scale-95',
      ghost: 'bg-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-100',
      danger: 'bg-red-600 text-white shadow-lg shadow-red-600/20 hover:shadow-red-600/30 active:scale-95',
      success: 'bg-brand-success text-white shadow-lg shadow-brand-success/20 hover:shadow-brand-success/30 active:scale-95',
    };

    const sizeStyles: Record<string, string> = {
      sm: 'px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl',
      md: 'px-4 py-2.5 text-xs font-black uppercase tracking-widest rounded-2xl',
      lg: 'px-6 py-4 text-sm font-black uppercase tracking-widest rounded-3xl',
      xl: 'px-8 py-6 text-base font-black uppercase tracking-widest rounded-[40px]',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'relative flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden',
          variantStyles[variant as string] || variantStyles.primary,
          sizeStyles[size as string] || sizeStyles.md,
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {children as React.ReactNode}
        </span>
      </motion.button>
    );
  }
);

PrathamButton.displayName = 'PrathamButton';

