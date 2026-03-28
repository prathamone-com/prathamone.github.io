import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft, Star, Shield, Zap, Sparkles } from 'lucide-react';
import { useProgressStore } from '@/lib/store/progress';

interface ShopViewProps {
  onSetView: (view: any) => void;
}

const SHOP_ITEMS = [
  {
    id: 'avatar_ganesha_gold',
    name: 'Ganesha-P Gold Avatar',
    description: 'A premium, animated avatar border indicating Sovereign Excellence.',
    price: 150,
    icon: <Star size={24} className="text-yellow-600" />,
    color: 'bg-yellow-50 border-yellow-200 text-yellow-600',
  },
  {
    id: 'streak_freeze',
    name: 'Golden Streak Freeze',
    description: 'Protects your learning streak for one full day if missed.',
    price: 300,
    icon: <Shield size={24} className="text-blue-600" />,
    color: 'bg-blue-50 border-blue-200 text-blue-600',
  },
  {
    id: 'ai_priority',
    name: 'Sovereign AI Priority',
    description: 'Instant AI processing during peak hours for 7 days.',
    price: 500,
    icon: <Zap size={24} className="text-orange-600" />,
    color: 'bg-orange-50 border-orange-200 text-orange-600',
  }
];

export const ShopView: React.FC<ShopViewProps> = ({ onSetView }) => {
  const { coins, unlockedItems, spendCoins } = useProgressStore();
  const [feedbackMsg, setFeedbackMsg] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  const handlePurchase = (id: string, name: string, price: number) => {
    if (unlockedItems.includes(id)) {
      setFeedbackMsg({ msg: 'You already own this item!', type: 'error' });
      return;
    }
    
    if (coins < price) {
      setFeedbackMsg({ msg: 'Insufficient Pratham Coins.', type: 'error' });
      return;
    }

    const success = spendCoins(price, id, name);
    if (success) {
      setFeedbackMsg({ msg: 'Purchase Successful!', type: 'success' });
    }
    
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto flex flex-col items-center p-6 pb-20 bg-[#F8FAFC]">
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl w-full">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest text-gray-400">
          <button onClick={() => onSetView('dashboard')} className="hover:text-brand-primary transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-primary/60">Reward Shop</span>
        </nav>
        
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl font-black text-gray-900 leading-tight flex items-center gap-3">
               Pratham Shop <Sparkles className="text-brand-primary w-8 h-8" />
            </h2>
            <p className="text-gray-500 font-medium mt-1 uppercase tracking-widest text-[10px] font-black">
               Exchange mastery for premium assets
            </p>
          </div>
          <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Your Balance</span>
              <div className="px-5 py-2.5 rounded-2xl bg-yellow-100 border border-yellow-200 text-yellow-700 font-black text-xl flex items-center gap-2 shadow-sm">
                  ₹ {coins}
              </div>
          </div>
        </div>

        {feedbackMsg && (
            <motion.div 
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className={`mb-8 p-4 rounded-2xl border font-bold text-sm text-center shadow-sm ${feedbackMsg.type === 'error' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}
            >
                {feedbackMsg.msg}
            </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHOP_ITEMS.map((item, i) => {
                const isOwned = unlockedItems.includes(item.id);
                const canAfford = coins >= item.price;
                
                return (
                    <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`bg-white rounded-[32px] p-8 border hover:shadow-xl transition-all flex flex-col justify-between ${isOwned ? 'opacity-70 border-gray-200' : 'border-gray-100 hover:border-brand-primary/30'}`}
                    >
                        <div>
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${item.color}`}>
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-black text-gray-900 leading-tight mb-2">{item.name}</h3>
                            <p className="text-xs font-bold text-gray-400 leading-relaxed">{item.description}</p>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-gray-100">
                             <button
                                onClick={() => handlePurchase(item.id, item.name, item.price)}
                                disabled={isOwned}
                                className={`w-full py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
                                    isOwned 
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                    : canAfford 
                                        ? 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20 hover:scale-[1.02]' 
                                        : 'bg-red-50 text-red-500 border border-red-100 hover:bg-red-100'
                                }`}
                             >
                                 {isOwned ? 'Already Owned' : `${item.price} Coins`}
                             </button>
                        </div>
                    </motion.div>
                )
            })}
        </div>

      </motion.div>
    </div>
  );
};
