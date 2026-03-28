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

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RetentionPoint {
  date: string;
  score: number;
}

interface RetentionChartProps {
  data: RetentionPoint[];
}

export function RetentionChart({ data }: RetentionChartProps) {
  if (data.length < 2) {
    return (
      <div className="h-48 flex items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <p className="text-xs text-gray-400 font-medium italic">Complete more chapters to unlock retention trends.</p>
      </div>
    );
  }

  // Simplified SVG Line Chart Logic
  const width = 400;
  const height = 150;
  const padding = 20;
  const points = data.slice(-7); // Last 7 points
  
  const getX = (i: number) => (i / (points.length - 1)) * (width - 2 * padding) + padding;
  const getY = (score: number) => height - ((score / 100) * (height - 2 * padding) + padding);

  const pathData = points.reduce((acc, point, i) => {
    const x = getX(i);
    const y = getY(point.score);
    return acc + (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
  }, "");

  return (
    <div className="relative w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-sm">
        {/* Grid Lines */}
        {[0, 25, 50, 75, 100].map(level => (
           <line 
             key={level} 
             x1={padding} y1={getY(level)} x2={width - padding} y2={getY(level)} 
             stroke="#f1f1f1" strokeWidth="1" 
           />
        ))}
        
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Area */}
        <path
          d={`${pathData} L ${getX(points.length - 1)} ${height - padding} L ${getX(0)} ${height - padding} Z`}
          fill="url(#chartGradient)"
        />

        {/* Line */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Data Points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={getX(i)}
            cy={getY(p.score)}
            r="4"
            fill="white"
            stroke="var(--brand-primary)"
            strokeWidth="2"
          />
        ))}
      </svg>
      
      {/* Labels */}
      <div className="flex justify-between px-2 mt-2">
        {points.map((p, i) => (
          <span key={i} className="text-[9px] font-bold text-gray-400">
            {new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </span>
        ))}
      </div>
    </div>
  );
}

interface MasteryCircleProps {
  score: number;
  label: string;
  color?: string;
}

export function MasteryCircle({ score, label, color = "var(--brand-primary)" }: MasteryCircleProps) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#eee"
            strokeWidth="6"
            fill="transparent"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-sm font-black text-gray-800">{score}%</span>
      </div>
      <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">{label}</span>
    </div>
  );
}

interface TopicHeatmapProps {
  topics: { name: string; score: number }[];
}

export function TopicHeatmap({ topics }: TopicHeatmapProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {topics.map((topic, i) => {
        const opacity = Math.max(0.1, topic.score / 100);
        return (
          <motion.div
            key={topic.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02 }}
            className="group relative h-16 rounded-xl border border-gray-100 flex flex-col items-center justify-center p-2 hover:shadow-md transition-all cursor-help"
            style={{ backgroundColor: `rgba(56, 189, 248, ${opacity * 0.3})` }}
          >
            <p className="text-[10px] font-black uppercase tracking-tight text-gray-600 text-center leading-none mb-1 line-clamp-2">
              {topic.name}
            </p>
            <p className="text-xs font-black text-brand-primary">{topic.score}%</p>
            
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 p-2 bg-gray-900 text-white text-[9px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 text-center">
               Mastery Level: {topic.score >= 90 ? 'Expert' : topic.score >= 70 ? 'Proficient' : 'Learning'}
               <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

