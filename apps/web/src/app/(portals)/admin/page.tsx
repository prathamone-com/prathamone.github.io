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
 *
 * Signature    : Engineered by Jawahar R Mallah
 * Motto        : Crafted with Logic, Vision & AI
 * ==========================================================
 */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Palette, Users, Globe, 
  ChevronRight, ArrowUpRight, BarChart3, 
  Settings, Building2, Upload, Plus, Search, 
  CheckCircle2, AlertCircle, Trash2, Edit3, Heart, Database, Coins
} from 'lucide-react';
import { PrathamButton, PrathamCard } from '@/components/classroom/ClassroomUI';
import { useProgressStore } from '@/lib/store/progress';
import { useCurriculumStore } from '@/lib/store/curriculum';
import { getTranslation } from '@prathamone/db/curriculum';

/**
 * PrathamOne - Admin Command Center (10/10 Sovereignty)
 * Focused on: White-labeling, Control, and Scale.
 */

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState('Branding');
  const [primaryColor, setPrimaryColor] = useState('#6366F1'); // Default Indigo
  
  const { selectedLanguage, setLanguage } = useCurriculumStore();
  const t = (key: string) => getTranslation(selectedLanguage, key);

  // Mock data for analytics
  const stats = [
    { label: t('active_students') || 'Active Students', val: '1,420', trend: '+12%', color: 'blue' },
    { label: t('sovereign_sync') || 'Sovereign Node Status', val: '99.9%', trend: 'OPTIMAL', color: 'green' },
    { label: t('ai_tokens_used') || 'AI Tokens Used', val: '8.2K', trend: '-2%', color: 'purple' },
  ];

  const { activeBounties } = useProgressStore();
  const totalCirculatingCoins = 245000; // Mock aggregate
  const totalBounties = activeBounties.length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row">
      
      {/* Sidebar Navigation */}
      <nav className="w-full lg:w-72 bg-white border-r border-gray-100 p-8 space-y-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-primary/20">A</div>
          <h1 className="text-xl font-black tracking-tight text-gray-900 uppercase leading-none">Command Center</h1>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Management</p>
          {[
            { id: 'Branding', label: t('branding') || 'Branding', icon: Palette },
            { id: 'Students', label: t('students') || 'Students', icon: Users },
            { id: 'Lecturers', label: t('lecturers') || 'Lecturers', icon: ShieldCheck },
            { id: 'Analytics', label: t('analytics') || 'Analytics', icon: BarChart3 },
            { id: 'Ledger', label: t('ledger') || 'Ledger', icon: Database },
            { id: 'Settings', label: t('settings') || 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-[28px] transition-all ${
                activeView === item.id 
                ? 'bg-brand-primary/5 text-brand-primary font-black shadow-sm' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm uppercase tracking-tight">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Support Card */}
        <div className="bg-brand-primary/5 p-6 rounded-[32px] border border-brand-primary/10">
          <p className="text-sm font-black text-brand-primary uppercase tracking-tight mb-2">Need Support?</p>
          <p className="text-xs font-bold text-gray-500 leading-relaxed mb-4">Contact your PrathamOne Eduwork manager.</p>
          <PrathamButton variant="secondary" size="sm" className="w-full bg-white text-brand-primary border-none">Get Help</PrathamButton>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-12 max-w-7xl mx-auto w-full space-y-12">
        
        {/* Header with Search */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-gray-900 leading-none mb-2">Sovereign Control</h2>
            <p className="text-gray-400 font-bold text-sm tracking-tight uppercase">Managing: Little Flowers High School</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input 
              type="text" 
              placeholder="Search students/lectures..."
              className="w-full h-14 bg-white border border-gray-100 rounded-full pl-12 pr-6 outline-none focus:border-brand-primary transition-all text-sm font-bold shadow-sm"
            />
          </div>
        </header>

        {/* Global Stats bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-black/5 transition-all">
               <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/5 rounded-full blur-3xl -mr-12 -mt-12`} />
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
               <div className="flex items-end gap-3">
                 <h3 className="text-4xl font-black text-gray-900 leading-none">{stat.val}</h3>
                 <span className={`text-[10px] font-black text-${stat.trend.startsWith('+') ? 'green' : 'red'}-500 mb-1`}>{stat.trend}</span>
               </div>
            </div>
          ))}
        </div>

        {/* Active View Content */}
        <AnimatePresence mode="wait">
          {activeView === 'Branding' && (
            <motion.div 
              key="branding"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              <div className="space-y-8">
                <PrathamCard variant="glass" className="space-y-8">
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Identity & Theming</h3>
                  
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Primary Brand Color</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="color" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-16 h-16 rounded-2xl cursor-pointer border-none p-0 overflow-hidden" 
                      />
                      <input 
                        type="text" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="flex-1 h-16 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-brand-primary outline-none px-6 font-black text-gray-900 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Institute Logo</label>
                      <button className="w-full aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center text-gray-400 hover:text-brand-primary hover:border-brand-primary transition-all">
                        <Upload size={32} className="mb-2" />
                        <span className="text-[10px] font-black uppercase">Upload SVG/PNG</span>
                      </button>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Favicon</label>
                      <button className="w-full aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center text-gray-400 hover:text-brand-primary hover:border-brand-primary transition-all">
                        <Globe size={32} className="mb-2" />
                        <span className="text-[10px] font-black uppercase">Upload ICO</span>
                      </button>
                    </div>
                  </div>
                  
                  <PrathamButton className="w-full h-16 rounded-full font-black uppercase tracking-widest">Update Branding</PrathamButton>
                </PrathamCard>
              </div>

              <div className="space-y-8">
                <div className="sticky top-12">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] px-4 mb-4">Branding Preview</h3>
                  <div className="bg-white border-8 border-gray-200 rounded-[48px] overflow-hidden shadow-2xl relative aspect-[10/14]">
                    {/* Mock Portal Preview */}
                    <div className="h-48 relative overflow-hidden" style={{ backgroundColor: primaryColor }}>
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white shadow-xl rounded-3xl" />
                      </div>
                    </div>
                    <div className="p-8 space-y-4">
                      <div className="w-3/4 h-8 bg-gray-100 rounded-full" />
                      <div className="w-1/2 h-4 bg-gray-50 rounded-full" />
                      <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="aspect-video bg-gray-50 rounded-3xl" />
                        <div className="aspect-video bg-gray-50 rounded-3xl" />
                      </div>
                      <div className="h-14 mt-8 rounded-full" style={{ backgroundColor: primaryColor }} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'Students' && (
             <motion.div 
               key="students"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="space-y-8"
             >
               <PrathamCard variant="glass" className="flex items-center justify-between">
                 <div>
                   <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Active Roster</h3>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">1,420 students enrolled across 12 batches</p>
                 </div>
                 <div className="flex gap-4">
                   <PrathamButton variant="secondary" size="sm" className="flex items-center gap-2">
                     <Upload size={16} /> Import CSV
                   </PrathamButton>
                   <PrathamButton size="sm" className="flex items-center gap-2">
                     <Plus size={16} /> Add Student
                   </PrathamButton>
                 </div>
               </PrathamCard>

               <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden">
                 <table className="w-full text-left">
                   <thead className="bg-gray-50/50">
                     <tr className="border-b border-gray-100">
                       <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Name</th>
                       <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Roll ID</th>
                       <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Grade</th>
                       <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                       <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody>
                     {[
                       { name: 'Rahul Sharma', id: 'LF-2026-001', grade: 'Class 10-A', status: 'Active' },
                       { name: 'Priya Singh', id: 'LF-2026-102', grade: 'Class 9-B', status: 'Pending' },
                       { name: 'Amit Verma', id: 'LF-2026-042', grade: 'Class 10-A', status: 'Active' },
                     ].map((s, i) => (
                       <tr key={i} className="border-b border-gray-50 last:border-none group">
                         <td className="p-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-gray-400 group-hover:bg-brand-primary group-hover:text-white transition-all text-xs">
                                {s.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-bold text-sm text-gray-900">{s.name}</span>
                            </div>
                         </td>
                         <td className="p-6 text-sm font-bold text-gray-400 tracking-tight">{s.id}</td>
                         <td className="p-6 text-sm font-bold text-gray-400 tracking-tight">{s.grade}</td>
                         <td className="p-6">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              s.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                            }`}>
                              {s.status}
                            </span>
                         </td>
                         <td className="p-6 text-right space-x-2">
                            <button className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-brand-primary transition-all"><Edit3 size={16} /></button>
                            <button className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
                 <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-center">
                    <PrathamButton variant="ghost" size="sm" className="text-gray-400 font-bold uppercase tracking-widest">Load More Students</PrathamButton>
                 </div>
               </div>
             </motion.div>
          )}

           {activeView === 'Ledger' && (
             <motion.div 
               key="ledger"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="space-y-8"
             >
               <PrathamCard variant="glass" className="flex items-center justify-between">
                 <div>
                   <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Sovereign Gamification Ledger</h3>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Macro-economic oversight of institutional engagement.</p>
                 </div>
               </PrathamCard>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-yellow-50 rounded-[40px] p-8 border border-yellow-100 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Coins className="text-yellow-600" />
                            <span className="text-xs font-black uppercase tracking-widest text-yellow-600">Total Coins Minted</span>
                        </div>
                        <h2 className="text-5xl font-black text-gray-900 leading-none">{totalCirculatingCoins.toLocaleString()}</h2>
                        <p className="text-xs font-bold text-gray-500 mt-2 uppercase">12,000 Coins burned in Reward Shop</p>
                    </div>
                 </div>

                 <div className="bg-blue-50 rounded-[40px] p-8 border border-blue-100 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Database className="text-blue-600" />
                            <span className="text-xs font-black uppercase tracking-widest text-blue-600">Active Institutional Bounties</span>
                        </div>
                        <h2 className="text-5xl font-black text-gray-900 leading-none">{totalBounties}</h2>
                        <p className="text-xs font-bold text-gray-500 mt-2 uppercase">Driving {totalBounties * 150} target masteries.</p>
                    </div>
                 </div>
               </div>

               <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm">
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 border-b pb-4">Recent Economy Logs</h4>
                  <div className="space-y-4">
                      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
                          <span className="text-xs font-bold text-gray-400">Mar 28, 2026 - 10:45 AM</span>
                          <span className="text-sm border bg-white px-3 py-1 rounded-full font-black text-green-600">MINT</span>
                          <span className="text-xs font-bold text-gray-900 w-1/3">Batch 10-A completed Algebra</span>
                          <span className="text-sm font-black text-yellow-600">+1,400 Coins</span>
                      </div>
                      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
                          <span className="text-xs font-bold text-gray-400">Mar 28, 2026 - 11:20 AM</span>
                          <span className="text-sm border bg-white px-3 py-1 rounded-full font-black text-red-500">BURN</span>
                          <span className="text-xs font-bold text-gray-900 w-1/3">Student ID LF-042 unlocked Avatar</span>
                          <span className="text-sm font-black text-gray-400">-150 Coins</span>
                      </div>
                  </div>
               </div>
             </motion.div>
           )}

           {activeView === 'Analytics' && (
             <motion.div 
               key="analytics"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="space-y-8"
             >
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-8">Pedagogical Stream Adoption</h3>
                    <div className="space-y-6">
                       {[
                         { label: 'English Medium', val: 450, color: '#6366F1' },
                         { label: 'Hindi Medium', val: 320, color: '#F59E0B' },
                         { label: 'Marathi Medium', val: 380, color: '#10B981' },
                         { label: 'Gujarati Medium', val: 270, color: '#EC4899' },
                       ].map((stream) => (
                         <div key={stream.label} className="space-y-2">
                            <div className="flex justify-between text-xs font-black uppercase tracking-tight">
                               <span className="text-gray-400">{stream.label}</span>
                               <span className="text-gray-900">{stream.val} Students</span>
                            </div>
                            <div className="h-4 bg-gray-50 rounded-full overflow-hidden border border-gray-100 p-0.5">
                               <motion.div 
                                 initial={{ width: 0 }} animate={{ width: `${(stream.val/1420)*100}%` }}
                                 className="h-full rounded-full" style={{ backgroundColor: stream.color }} 
                               />
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>
                  
                  <div className="bg-brand-primary rounded-[40px] p-8 text-white flex flex-col justify-between shadow-2xl shadow-brand-primary/30">
                     <div className="space-y-4">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center font-black text-xl italic shadow-inner">P1</div>
                        <h4 className="text-2xl font-black leading-tight uppercase tracking-tighter">Sovereign Node Integrity</h4>
                        <p className="text-sm font-bold opacity-60">Your institutional node is serving 88% of requests via local edge caching.</p>
                     </div>
                     <div className="pt-8 border-t border-white/10 mt-8">
                        <div className="flex items-center gap-2 mb-2">
                           <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-green-400">Node Synchronized</span>
                        </div>
                        <p className="text-[10px] font-bold opacity-40">LAST SYNC: JUST NOW</p>
                     </div>
                  </div>
               </div>
             </motion.div>
           )}

           {activeView === 'Settings' && (
             <motion.div 
               key="settings"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="grid grid-cols-1 lg:grid-cols-2 gap-12"
             >
               <PrathamCard variant="glass" className="space-y-8">
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">System Configuration</h3>
                  
                  <div className="space-y-6">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Regional Language (Gujarati Parity)</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 bg-gray-50 rounded-[32px] border border-gray-100">
                       {[
                         { code: 'en', name: 'English' },
                         { code: 'hi', name: 'Hindi' },
                         { code: 'mr', name: 'Marathi' },
                         { code: 'gu', name: 'ગુજરાતી' }
                       ].map(lang => (
                         <button 
                           key={lang.code}
                           onClick={() => setLanguage(lang.code as any)}
                           className={`h-14 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all ${
                             selectedLanguage === lang.code 
                             ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20 scale-105' 
                             : 'text-gray-400 hover:text-gray-600 hover:bg-white'
                           }`}
                         >
                           {lang.name}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Institutional Domain</label>
                    <input 
                      type="text" 
                      placeholder="littleflowers.prathamone.com" 
                      defaultValue="littleflowers.prathamone.com"
                      className="w-full h-16 rounded-2xl bg-gray-50 border-transparent focus:border-brand-primary outline-none px-6 font-bold text-gray-900" 
                    />
                  </div>

                  <PrathamButton className="w-full">Save Configuration</PrathamButton>
               </PrathamCard>

               <div className="space-y-8">
                  <div className="p-8 bg-blue-50/50 rounded-[40px] border border-blue-100">
                     <div className="flex items-center gap-3 mb-6">
                        <Globe className="text-blue-600" />
                        <span className="text-xs font-black uppercase tracking-widest text-blue-600">Sovereign Edge Network</span>
                     </div>
                     <p className="text-sm font-bold text-gray-600 leading-relaxed">
                        Your institution is currently synced with the **Sovereign Bharat Node**. This ensures 99.9% uptime even during regional connectivity drops.
                     </p>
                  </div>
               </div>
             </motion.div>
           )}
        </AnimatePresence>

      </main>
    </div>
  );
}

