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
import { useSearchParams, useRouter } from 'next/navigation';
import { useProgressStore } from '@/lib/store/progress';
import { 
  GraduationCap, 
  Users, 
  School, 
  ArrowRight, 
  Mail, 
  Lock, 
  AlertCircle,
  Loader2,
  ChevronRight
} from 'lucide-react';

type Role = 'STUDENT' | 'LECTURER' | 'PARENT';

export default function LoginPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center font-black">Loading...</div>}>
      <LoginForm />
    </React.Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');
  
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [selectedRole, setSelectedRole] = useState<Role>('STUDENT');
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { id: 'STUDENT', label: 'Student', icon: <GraduationCap className="w-5 h-5" />, desc: 'Learn with AI' },
    { id: 'LECTURER', label: 'Teacher', icon: <Users className="w-5 h-5" />, desc: 'Manage Batches' },
    { id: 'PARENT', label: 'Parent', icon: <School className="w-5 h-5" />, desc: 'Track Progress' },
  ];

  const router = useRouter();
  const { initializeDemoData } = useProgressStore();

  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();

      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        // Success routing based on selected role
        if (selectedRole === 'STUDENT') router.push('/student/classroom');
        else if (selectedRole === 'PARENT') router.push('/parent');
        else router.push('/admin');

      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setFormError('Account created! Please verify your email.');
      }
    } catch (err: any) {
      console.error(err);
      setFormError(err.message || "An error occurred during authentication.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDemoLogin = (role: Role) => {
    setIsLoading(true);
    initializeDemoData();
    // Set demo cookie for middleware bypass
    document.cookie = "pratham_demo_mode=true; path=/; max-age=3600; SameSite=Lax";

    setTimeout(() => {
      if (role === 'STUDENT') router.push('/student/classroom');
      else if (role === 'PARENT') router.push('/parent');
      else router.push('/student/classroom');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#fafcff] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-100/20 rounded-full blur-[120px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white/70 backdrop-blur-2xl rounded-[40px] shadow-2xl border border-white/50 overflow-hidden relative z-10"
      >
        {/* Left Side: Brand & Visuals */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-950 p-12 text-white flex flex-col justify-between relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <School className="w-64 h-64 -mr-20 -mt-20" />
          </div>
          
          <div>
            <motion.div 
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               className="flex items-center gap-2 mb-12"
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <span className="text-blue-900 font-black text-xl">P1</span>
              </div>
              <span className="text-2xl font-black tracking-tighter">PrathamOne</span>
            </motion.div>
            
            <h1 className="text-5xl font-black leading-[1.1] mb-6">
              Sovereign AI <br />
              <span className="text-blue-400">Classroom for Bharat.</span>
            </h1>
            <p className="text-blue-100/80 text-lg font-medium max-w-md">
              The intelligent educational ledger designed for the next generation of Indian excellence.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white/10 bg-blue-800 flex items-center justify-center text-[10px] font-black">AI</div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white/10 bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] font-black">+10k</div>
            </div>
            <p className="text-sm font-bold text-blue-200/60 uppercase tracking-widest">Bridging Bharat to the Future</p>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center">
            <div className="inline-flex p-1 bg-gray-100 rounded-2xl mb-8">
              <button 
                onClick={() => setMode('login')}
                className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all ${mode === 'login' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setMode('signup')}
                className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all ${mode === 'signup' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
              >
                Join Now
              </button>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-400 font-medium">Select your role to continue</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-10">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id as Role)}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                  selectedRole === role.id 
                    ? 'border-blue-900 bg-blue-50/50' 
                    : 'border-gray-100 hover:border-gray-200 bg-white'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  selectedRole === role.id ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                }`}>
                  {role.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-wider ${
                  selectedRole === role.id ? 'text-blue-900' : 'text-gray-400'
                }`}>{role.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {(error || formError) && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error || formError}
              </motion.div>
            )}

            {message && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-3 text-blue-600 text-sm font-bold"
              >
                <ChevronRight className="w-5 h-5 flex-shrink-0" />
                {message}
              </motion.div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="name@institute.com"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-900/10 focus:bg-white rounded-2xl outline-none text-sm font-semibold transition-all"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  name="password"
                  type="password"
                  placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-900/10 focus:bg-white rounded-2xl outline-none text-sm font-semibold transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {mode === 'login' ? 'Secure Login' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Sovereign Demo Access */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Explore as Guest</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleDemoLogin('STUDENT')}
                className="py-4 px-6 rounded-2xl bg-orange-50 border border-orange-100 text-orange-600 font-black text-[10px] uppercase tracking-widest hover:bg-orange-100 transition-all flex items-center justify-center gap-2"
              >
                Student Demo
              </button>
              <button
                onClick={() => handleDemoLogin('PARENT')}
                className="py-4 px-6 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 text-brand-primary font-black text-[10px] uppercase tracking-widest hover:bg-brand-primary/10 transition-all flex items-center justify-center gap-2"
              >
                Parent Demo
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
            By continuing, you agree to the Sovereign AI Policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

