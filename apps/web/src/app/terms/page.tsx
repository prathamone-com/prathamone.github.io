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
 * Release Date : 29 March 2026
 * Environment  : Production
 * ==========================================================
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Book, UserCheck, Globe, History } from 'lucide-react';
import { PrathamButton } from '@/components/classroom/ClassroomUI';

export default function TermsPage() {
  const sections = [
    {
      title: "1. Pedagogical Integrity & AI Usage",
      content: "PrathamOne utilizes advanced AI Agents to provide a personalized learning experience. These agents are designed to act as 'Socratic Bridges'—guiding students toward answers rather than providing direct solutions. Users must use the platform for educational purposes only.",
      icon: <Shield className="w-5 h-5 text-brand-primary" />
    },
    {
      title: "2. Content Attribution (eBalbharati)",
      content: "All syllabus artifacts, chapters, and curriculum structure related to the Maharashtra State Board are provided under the Open Access Policy of the eBalbharati Bureau, Pune. PrathamOne acts as an intelligent delivery layer and does not claim ownership of the primary syllabus source.",
      icon: <Book className="w-5 h-5 text-brand-primary" />
    },
    {
      title: "3. Sovereign (Offline) Mode Data",
      content: "Students in zero-connectivity areas can utilize 'Sovereign Mode.' In this state, data remains strictly local to the device. By using the platform, users agree to periodic synchronization of progress once a connection is restored to maintain pedagogical history.",
      icon: <Globe className="w-5 h-5 text-brand-primary" />
    },
    {
      title: "4. Student Code of Conduct",
      content: "PrathamOne is a safe space for learning. Any attempt to manipulate the AI, bypass adaptive practice engines, or use the platform for non-educational communication is strictly prohibited and may result in profile suspension.",
      icon: <UserCheck className="w-5 h-5 text-brand-primary" />
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-brand-primary/10">
      {/* Premium Header */}
      <header className="bg-brand-primary text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-10">
           <Shield className="w-64 h-64" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-6">
               <div className="bg-white/10 p-2 rounded-xl border border-white/20">
                  <Shield className="w-6 h-6" />
               </div>
               <span className="text-xs font-black uppercase tracking-widest text-indigo-200">Governance & Trust</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">Terms of Use</h1>
            <p className="text-xl text-indigo-100/80 font-medium max-w-2xl leading-relaxed">
              Establishing the boundaries of intelligent pedagogical collaboration in Bharat.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Content Section */}
      <main className="max-w-4xl mx-auto py-24 px-6">
        <div className="space-y-16">
          {sections.map((section, idx) => (
            <motion.section 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-8 group"
            >
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/5 flex items-center justify-center group-hover:bg-brand-primary transition-all group-hover:scale-110 shadow-sm">
                   <div className="group-hover:text-white transition-colors">
                      {section.icon}
                   </div>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-black text-gray-900 group-hover:text-brand-primary transition-colors">
                  {section.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                  {section.content}
                </p>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Footer Audit Signature */}
        <div className="mt-28 p-12 rounded-[40px] bg-gray-50 border border-gray-100 flex flex-col items-center text-center">
           <History className="w-10 h-10 text-brand-primary/20 mb-6" />
           <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Last Updated</p>
           <p className="text-sm font-bold text-gray-900">March 29, 2026 — Phase 1: Production Hardening</p>
           <div className="mt-10">
              <PrathamButton onClick={() => window.history.back()}>
                 Return to Platform
              </PrathamButton>
           </div>
        </div>
      </main>
    </div>
  );
}
