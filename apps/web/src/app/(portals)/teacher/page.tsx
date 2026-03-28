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

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Presentation, FileText, CheckCircle2, 
  ChevronRight, Play, Layout, Plus, Search, 
  Filter, Calendar, Clock, BarChart3, Settings, Users
} from 'lucide-react';
import { PrathamButton, PrathamCard } from '@prathamone/ui';
import { useCurriculumStore } from '@/lib/store/curriculum';
import { useProgressStore } from '@/lib/store/progress';

/**
 * PrathamOne - Teacher Portal
 * Focused on: Speed, Quality, and Automation.
 */

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('Lectures');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [topic, setTopic] = useState('');
  const [showReview, setShowReview] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);
  const [bountyAmount, setBountyAmount] = useState('100');
  
  const { addCustomChapter } = useCurriculumStore();
  const { setBounty, activeBounties } = useProgressStore();

  // Mock data for lectures
  const recentLectures = [
    { title: 'Tissues: The Building Blocks', subject: 'Biology', date: 'Today, 10:00 AM', status: 'Ready' },
    { title: 'Laws of Motion', subject: 'Physics', date: 'Yesterday', status: 'Delivered' },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowGenerator(false);
      
      // Seed mock AI questions for review
      setGeneratedQuestions([
        { id: 'q1', question: 'What is the primary function of DNA?', options: ['Protein Synthesis', 'Genetic Information', 'Energy Storage', 'Cell Structure'], answer: 1 },
        { id: 'q2', question: 'Who discovered the double helix structure of DNA?', options: ['Mendel', 'Darwin', 'Watson & Crick', 'Pasteur'], answer: 2 },
        { id: 'q3', question: 'Which base pairs with Adenine in DNA?', options: ['Cytosine', 'Guanine', 'Thymine', 'Uracil'], answer: 2 }
      ]);
      setShowReview(true);
    }, 2500);
  };

  const handleApproveChapter = () => {
    addCustomChapter({
      id: Math.random().toString(36).substr(2, 9),
      title: topic,
      subject: 'Science',
      questions: generatedQuestions,
      generatedAt: new Date().toISOString()
    });
    setShowReview(false);
    setTopic('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-24 bg-white border-r border-gray-100 flex flex-col items-center py-8 gap-10">
        <div className="w-12 h-12 bg-brand-primary rounded-[20px] flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-brand-primary/20">
          P
        </div>
        <nav className="flex flex-col items-center gap-6">
          {[Layout, Calendar, Presentation, BarChart3, Users, Settings].map((Icon, i) => (
            <button 
              key={i}
              className={`p-4 rounded-2xl transition-all ${i === 0 ? 'bg-brand-primary/5 text-brand-primary' : 'text-gray-300 hover:text-gray-600'}`}
            >
              <Icon size={24} />
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-12 max-w-7xl mx-auto w-full">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 leading-tight">Welcome back, Professor!</h1>
            <p className="text-gray-400 font-bold text-sm tracking-tight uppercase mt-2">Ready to inspire today?</p>
          </div>
          <div className="flex gap-4">
            <PrathamButton 
              size="lg" 
              className="rounded-full shadow-2xl shadow-brand-primary/20 flex items-center gap-2"
              onClick={() => setShowGenerator(true)}
            >
              <Zap size={20} fill="currentColor" />
              One-Click Lecture
            </PrathamButton>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Schedule & Active Lectures */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Hours Taught', val: '124', color: 'blue' },
                { label: 'Questions Solved', val: '1.2K', color: 'purple' },
                { label: 'Student Mastery', val: '82%', color: 'green' },
              ].map((stat, i) => (
                <PrathamCard key={i} variant="glass" className="p-6">
                  <p className="text-[10px] font-black text-gray-400 tracking-[0.2em] mb-2 uppercase">{stat.label}</p>
                  <p className="text-4xl font-black text-gray-900 leading-none">{stat.val}</p>
                </PrathamCard>
              ))}
            </div>

            {/* Lecture Feed */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Lecture Vault</h3>
                <PrathamButton variant="ghost" size="sm" className="text-brand-primary font-black">View All</PrathamButton>
              </div>
              
              {recentLectures.map((l, i) => (
                <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center justify-between hover:shadow-xl hover:shadow-black/5 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-brand-primary overflow-hidden">
                      {l.status === 'Ready' ? <Presentation size={24} /> : <CheckCircle2 size={24} className="text-green-500" />}
                    </div>
                    <div>
                      <p className="font-black text-lg text-gray-900 uppercase tracking-tight">{l.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-black bg-gray-100 px-2 py-1 rounded-md text-gray-400 uppercase tracking-widest">{l.subject}</span>
                        <span className="text-[10px] font-bold text-gray-300 uppercase">{l.date}</span>
                      </div>
                    </div>
                  </div>
                  <PrathamButton variant={l.status === 'Ready' ? 'primary' : 'ghost'} size="sm" className="rounded-full px-6">
                    {l.status === 'Ready' ? 'Launch' : 'Playback'}
                  </PrathamButton>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Assistant & Tools */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* AI Assistant Insight */}
            <div className="bg-brand-primary text-white p-8 rounded-[40px] relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Zap size={20} fill="currentColor" />
                </div>
                <h4 className="text-xl font-black mb-3">AI Content Insight</h4>
                <p className="text-sm font-bold opacity-80 leading-relaxed mb-6">
                  "Most students in Class 10B struggled with 'Newton's 3rd Law' in the last quiz. Shall I prep a 10-minute reinforcement session?"
                </p>
                <PrathamButton variant="secondary" className="bg-white text-brand-primary border-none w-full">Generate Session</PrathamButton>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
            </div>

            {/* Bounty Creator */}
            <div className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                        <Zap size={20} fill="currentColor" />
                    </div>
                    <h4 className="text-xl font-black text-gray-900">Set Bounty</h4>
                </div>
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Amount</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-orange-500 mb-0.5">₹</span>
                            <input 
                                type="number" 
                                value={bountyAmount}
                                onChange={(e) => setBountyAmount(e.target.value)}
                                className="w-full h-12 bg-gray-50 border-none rounded-2xl pl-10 pr-4 font-black text-gray-900 outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Challenge</label>
                        <select className="w-full h-12 bg-gray-50 border-none rounded-2xl px-4 font-bold text-gray-900 outline-none">
                            <option>DNA Structure</option>
                            <option>Periodic Table</option>
                            <option>Laws of Motion</option>
                        </select>
                    </div>
                    <PrathamButton 
                        variant="primary" 
                        className="w-full rounded-2xl h-14 font-black tracking-widest uppercase transition-all hover:scale-[1.02]"
                        onClick={() => {
                            setBounty({
                                chapterId: 'DNA Structure',
                                amount: parseInt(bountyAmount),
                                creator: 'TEACHER',
                                expiresAt: new Date(Date.now() + 86400000).toISOString()
                            });
                            alert('Bounty Set for class 10B!');
                        }}
                    >
                        Deploy Bounty
                    </PrathamButton>
                    {activeBounties.length > 0 && (
                        <p className="text-[10px] text-center font-bold text-gray-300 uppercase mt-4">
                            {activeBounties.length} Active Bounties Deployed
                        </p>
                    )}
                </div>
            </div>

          </div>

        </div>

      </main>

      {/* Generator Modal Overlay */}
      <AnimatePresence>
        {showGenerator && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl flex items-end md:items-center justify-center p-0 md:p-6"
            onClick={() => setShowGenerator(false)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="bg-white rounded-t-[48px] md:rounded-[48px] w-full max-w-2xl p-8 md:p-12 relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                  <Zap size={32} fill="currentColor" />
                </div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase leading-none">One-Click Lecture</h2>
                <p className="text-gray-400 font-bold text-sm mt-3 uppercase tracking-widest">Transform a topic into a cinematic lesson</p>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-4">Lecture Topic</label>
                  <input 
                    type="text" 
                    placeholder="E.g. The Structure of DNA"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full h-16 rounded-[28px] bg-gray-50 border-2 border-transparent focus:border-brand-primary focus:bg-white outline-none px-6 font-black text-lg text-gray-900 transition-all placeholder:text-gray-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-4">Language</label>
                    <select className="w-full h-16 rounded-[28px] bg-gray-50 border-2 border-transparent outline-none px-6 font-bold text-gray-900 appearance-none">
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Marathi</option>
                      <option>Gujarati</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-4">Duration</label>
                    <select className="w-full h-16 rounded-[28px] bg-gray-50 border-2 border-transparent outline-none px-6 font-bold text-gray-900 appearance-none">
                      <option>45 Minutes</option>
                      <option>30 Minutes</option>
                      <option>60 Minutes</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <PrathamButton 
                    className="w-full h-20 rounded-[32px] text-lg font-black uppercase tracking-widest shadow-2xl shadow-brand-primary/20"
                    onClick={handleGenerate}
                    disabled={isGenerating || !topic}
                  >
                    {isGenerating ? 'Synthesizing...' : 'Ignite Lecture'}
                  </PrathamButton>
                  <button 
                    className="text-gray-400 font-bold text-xs uppercase tracking-widest p-4 hover:text-gray-600 transition-all"
                    onClick={() => setShowGenerator(false)}
                  >
                    Maybe Later
                  </button>
                </div>
              </div>

              {/* Progress Indicator */}
              <AnimatePresence>
                {isGenerating && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-12 text-center"
                  >
                    <div className="relative mb-8">
                       <div className="w-20 h-20 border-4 border-brand-primary/10 rounded-full" />
                       <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 border-t-brand-primary rounded-full"
                       />
                    </div>
                    <h4 className="text-2xl font-black text-gray-900 uppercase">Constructing Universe...</h4>
                    <p className="text-gray-400 font-bold text-sm mt-2 max-w-xs">Our AI Agents are assembling scripts, slide visuals, and assessment quizzes for you.</p>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Review Modal */}
      <AnimatePresence>
        {showReview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-blue-900/95 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-4xl bg-white rounded-[56px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 lg:p-12">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 leading-none">AI Quality Control</h2>
                    <p className="text-gray-400 font-bold text-sm uppercase tracking-widest mt-2 px-1">Reviewing: {topic}</p>
                  </div>
                  <div className="w-16 h-16 rounded-3xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <FileText size={32} />
                  </div>
                </div>

                <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                  {generatedQuestions.map((q, idx) => (
                    <div key={idx} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 relative group">
                      <div className="flex items-start gap-4">
                        <span className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-black shrink-0">{idx + 1}</span>
                        <div className="flex-1">
                          <p className="font-black text-gray-900 text-lg leading-tight mb-4">{q.question}</p>
                          <div className="grid grid-cols-2 gap-3">
                            {q.options.map((opt: string, i: number) => (
                              <div key={i} className={`px-4 py-2 rounded-xl text-xs font-bold ${i === q.answer ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-white text-gray-400 border border-gray-100'}`}>
                                {opt}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-6 mt-12">
                   <PrathamButton 
                    variant="ghost" 
                    className="h-20 rounded-[32px] font-black tracking-widest uppercase text-gray-400 hover:text-red-500 hover:bg-red-50"
                    onClick={() => setShowReview(false)}
                   >
                     Regenerate
                   </PrathamButton>
                   <PrathamButton 
                    variant="primary" 
                    className="h-20 rounded-[32px] font-black tracking-widest uppercase shadow-2xl shadow-brand-primary/20"
                    onClick={handleApproveChapter}
                   >
                     Approve & Deploy
                   </PrathamButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

