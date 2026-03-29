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
import { Lock, Eye, Database, Globe, ArrowLeft } from 'lucide-react';
import { PrathamButton } from '@/components/classroom/ClassroomUI';

export default function PrivacyPage() {
  const points = [
    {
      title: "Data Sovereignty",
      desc: "We believe a student's data is their own. In 'Sovereign Mode', all pedagogical progress and coin balances are stored strictly on-device using IndexedDB and encrypting local storage.",
      icon: <Globe className="w-5 h-5 text-indigo-500" />
    },
    {
      title: "Pedagogical Diagnostics",
      desc: "To provide adaptive learning, our AI Agents log session success rates and accuracy. This data is used exclusively to refine the 'Socratic Bridge' AI logic and improve student retention.",
      icon: <Database className="w-5 h-5 text-indigo-500" />
    },
    {
      title: "Zero Third-Party Sharing",
      desc: "PrathamOne never shares student profiles, learning patterns, or performance analytics with third-party advertisers or external platforms.",
      icon: <Lock className="w-5 h-5 text-indigo-500" />
    },
    {
      title: "Parental Oversight",
      desc: "Only verified parents or guardians can access a student's performance dashboard. All diagnostic data is presented clearly to empower parents in their child's educational journey.",
      icon: <Eye className="w-5 h-5 text-indigo-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 selection:bg-brand-primary/10">
      {/* Premium Header */}
      <header className="bg-white border-b border-gray-100 py-24 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 rounded-l-[100px] -mr-20 animate-pulse" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-8">
               <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600">
                  <Lock className="w-6 h-6" />
               </div>
               <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Security First</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">Privacy Policy</h1>
            <p className="text-xl text-gray-500 font-medium max-w-2xl leading-relaxed">
              Your data is your legacy. We protect the digital footprint of Bharat's future scholars.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Grid Section */}
      <main className="max-w-4xl mx-auto py-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {points.map((point, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-primary/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                 {point.icon}
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">{point.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Institutional Contact Section */}
        <div className="bg-brand-primary rounded-[48px] p-12 md:p-20 text-white relative overflow-hidden">
           <div className="absolute bottom-0 right-0 p-12 opacity-10">
              <Globe className="w-48 h-48" />
           </div>
           <div className="max-w-2xl relative z-10">
              <h2 className="text-3xl font-black mb-6">Data Privacy Office</h2>
              <p className="text-indigo-100 font-medium mb-10 leading-relaxed text-lg">
                If you have any questions regarding how your data is handled in the PrathamOne Sovereign Network, our Data Protection Officers at AITDL are ready to assist.
              </p>
              <div className="flex flex-wrap gap-4">
                 <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 font-bold hover:bg-white/20 transition-colors">
                    privacy@aitdl.com
                 </div>
                 <PrathamButton onClick={() => window.history.back()}>
                    <div className="flex items-center gap-2">
                       <ArrowLeft className="w-4 h-4" /> Go Back
                    </div>
                 </PrathamButton>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
