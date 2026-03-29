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

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Coins, ShoppingBag, 
  Sparkles, ShieldCheck, Award, 
  CreditCard, ChevronRight, Lock, 
  UserCircle2, Cpu
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useProgressStore } from '@/lib/store/progress';
import { useCurriculumStore } from '@/lib/store/curriculum';
import { getTranslation } from '@prathamone/db/curriculum';
import { PrathamButton, PrathamCard } from '@/components/classroom/ClassroomUI';

export default function RewardsShop() {
  const router = useRouter();
  const { selectedLanguage } = useCurriculumStore();
  const { 
    coins = 450, 
    unlockedItems = [], 
    spendCoins 
  } = useProgressStore();
  
  const t = (key: string) => getTranslation(selectedLanguage, key);
  const [activeTab, setActiveTab] = useState<'all' | 'avatars' | 'boosts' | 'cert'>('all');
  const [unlocking, setUnlocking] = useState<string | null>(null);

  const handleUnlock = async (item: typeof ITEMS[0]) => {
    if (unlockedItems.includes(item.id)) return;
    if (coins < item.cost) return;

    setUnlocking(item.id);
    // Simulate premium transaction delay
    setTimeout(() => {
      const success = spendCoins(item.cost, item.id, item.name);
      if (success) {
        // Achievement unlocked
      }
      setUnlocking(null);
    }, 800);
  };

  const ITEMS = [
    { id: 'av_1', type: 'avatars', name: 'Digital Acharya', cost: 150, icon: <UserCircle2 />, rarity: 'Common' },
    { id: 'av_2', type: 'avatars', name: 'AI Scholar Alpha', cost: 500, icon: <Cpu />, rarity: 'Legendary' },
    { id: 'bst_1', type: 'boosts', name: 'Offline Surge', cost: 200, icon: <Sparkles />, rarity: 'Rare', desc: 'Sync 2x faster in Sovereign Mode.' },
    { id: 'cert_1', type: 'cert', name: 'Mastery Diploma', cost: 1000, icon: <Award />, rarity: 'Epic', desc: 'Institutional certificate for topic mastery.' },
  ];

  const filteredItems = activeTab === 'all' ? ITEMS : ITEMS.filter(i => i.type === activeTab);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Premium Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => router.back()}
              className="p-3 hover:bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100 text-gray-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl font-black text-gray-900 tracking-tight">{t('reward_shop') || 'Sovereign Reward Shop'}</h1>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">{t('exchange_coins') || 'Exchange Coins for Excellence'}</p>
            </div>
          </div>
          
          {/* Real-time Coin Balance */}
          <div className="flex items-center gap-3 bg-yellow-50 px-6 py-3 rounded-2xl border border-yellow-100 shadow-xl shadow-yellow-500/5">
            <Coins className="text-yellow-600 w-5 h-5" />
            <div className="flex flex-col leading-none">
               <span className="text-xl font-black text-gray-900">{coins}</span>
               <span className="text-[9px] font-black uppercase text-yellow-600 tracking-widest">{t('pratham_coins') || 'Pratham Coins'}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full p-6 md:p-10 flex flex-col gap-10">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-[28px] border border-gray-100 self-center shadow-sm">
           {[
             { id: 'all', label: 'All Artifacts', icon: <ShoppingBag size={14} /> },
             { id: 'avatars', label: 'Avatars', icon: <UserCircle2 size={14} /> },
             { id: 'boosts', label: 'Performance', icon: <Sparkles size={14} /> },
             { id: 'cert', label: 'Diplomas', icon: <Award size={14} /> },
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                 activeTab === tab.id 
                 ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                 : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
               }`}
             >
               {tab.icon}
               <span>{tab.label}</span>
             </button>
           ))}
        </div>

        {/* Featured Card */}
        <div className="relative h-64 bg-brand-primary rounded-[48px] overflow-hidden shadow-2xl shadow-brand-primary/20">
           <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
           <div className="absolute inset-0 flex items-center justify-between px-12 text-white">
              <div className="max-w-md">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-[9px] font-black uppercase tracking-widest mb-4">Limited Edition</div>
                 <h2 className="text-4xl font-black mb-4 leading-none tracking-tight">AI Scholar Alpha</h2>
                 <p className="text-indigo-100 font-medium text-sm leading-relaxed mb-6">Unlock the prestige avatar and a 5% bonus to Sovereign Sync accuracy.</p>
                 <PrathamButton variant="secondary" className="bg-white text-brand-primary border-none shadow-xl shadow-black/10">Unlock for 500 Coins</PrathamButton>
              </div>
              <div className="hidden lg:block">
                 <Cpu size={120} className="text-white/20 -mr-10 opacity-50" />
              </div>
           </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {filteredItems.map((item) => (
             <motion.div 
               key={item.id}
               layout
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="group flex flex-col"
             >
               <PrathamCard variant="white" className="flex-1 flex flex-col p-6 items-center text-center gap-6 group-hover:border-brand-primary/20 transition-all relative overflow-hidden">
                  <div className={`absolute top-4 right-4 text-[8px] font-black uppercase px-2 py-1 rounded-full ${
                    item.rarity === 'Legendary' ? 'bg-orange-100 text-orange-600' : 
                    item.rarity === 'Epic' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {item.rarity}
                  </div>
                  
                  <div className="w-20 h-20 bg-gray-50 rounded-[28px] flex items-center justify-center text-gray-300 group-hover:text-brand-primary group-hover:bg-brand-primary/5 transition-all shadow-inner">
                    {React.cloneElement(item.icon as any, { size: 32 })}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-2">{item.name}</h3>
                    {item.desc && <p className="text-[10px] text-gray-400 font-medium leading-relaxed">{item.desc}</p>}
                  </div>

                  <div className="w-full pt-4 border-t border-gray-50 flex items-center justify-between">
                     <div className="flex items-center gap-1.5">
                        <Coins className="w-3.5 h-3.5 text-yellow-600" />
                        <span className="text-sm font-black text-gray-900">{item.cost}</span>
                     </div>
                     <button 
                       disabled={coins < item.cost || unlockedItems.includes(item.id) || unlocking === item.id}
                       onClick={() => handleUnlock(item)}
                       className={`p-3 rounded-xl transition-all ${
                         unlockedItems.includes(item.id)
                         ? 'bg-brand-success/10 text-brand-success cursor-default'
                         : coins >= item.cost 
                         ? 'bg-brand-primary text-white hover:scale-110 active:scale-95 shadow-lg shadow-brand-primary/20' 
                         : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                       }`}
                     >
                       {unlockedItems.includes(item.id) ? (
                         <ShieldCheck size={18} />
                       ) : unlocking === item.id ? (
                         <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                       ) : coins >= item.cost ? (
                         <ChevronRight size={18} />
                       ) : (
                         <Lock size={18} />
                       )}
                     </button>
                  </div>
               </PrathamCard>
             </motion.div>
           ))}
        </div>

      </main>
    </div>
  );
}
