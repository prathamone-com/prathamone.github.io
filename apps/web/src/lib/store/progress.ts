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

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createClient } from '@/lib/supabase/client';
import { indexedDBStorage } from '@/lib/utils/storage';

// ==================== Types ====================

export interface CompletedChapter {
  subject: string;
  chapter: string;
  completedAt: string; // ISO string
  phasesCompleted: string[];
  accuracy?: number; // 0-100
  retentionScore?: number; // 0-100
  lastReviewed?: string; // ISO string
}

export interface DailySession {
  date: string; // YYYY-MM-DD
  chaptersStudied: number;
  minutesStudied: number;
}

// ==================== Badge System ====================

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
}

export const BADGE_DEFINITIONS: Omit<Badge, 'earned'>[] = [
  { id: 'first_lesson',   icon: '🌱', title: 'First Step',       description: 'Complete your first chapter',      color: 'text-brand-success' },
  { id: 'streak_3',       icon: '🔥', title: '3-Day Fire',       description: '3 days in a row',                  color: 'text-orange-500'    },
  { id: 'streak_7',       icon: '⚡', title: 'Week Warrior',     description: '7 day learning streak',            color: 'text-yellow-500'    },
  { id: 'streak_30',      icon: '👑', title: 'Month Champion',   description: '30 day learning streak',           color: 'text-brand-primary' },
  { id: 'chapter_5',      icon: '📚', title: 'Dedicated Learner',description: 'Complete 5 chapters',               color: 'text-purple-600'    },
  { id: 'chapter_10',     icon: '🏆', title: 'Scholar',          description: 'Complete 10 chapters',             color: 'text-brand-secondary'},
  { id: 'perfect_score',  icon: '⭐', title: 'Perfect Score',    description: 'Get 100% on any quiz',             color: 'text-yellow-500'    },
  { id: 'speed_learner',  icon: '🚀', title: 'Speed Learner',    description: 'Study 3 chapters in one day',       color: 'text-brand-primary' },
  { id: 'multi_subject',  icon: '🌍', title: 'All-Rounder',      description: 'Complete chapters in 3+ subjects',  color: 'text-brand-success' },
  { id: 'no_weak_areas',  icon: '💪', title: 'Problem Solver',   description: 'Clear all weak areas',             color: 'text-brand-secondary'},
];

export function computeBadges(state: Pick<ProgressState, 'completedChapters' | 'currentStreak' | 'longestStreak' | 'weakAreas' | 'dailySessions'>): Badge[] {
  const { completedChapters, longestStreak, weakAreas, dailySessions } = state;
  const uniqueSubjects = new Set(completedChapters.map(c => c.subject)).size;
  const hasPercentScore = completedChapters.some(c => (c.accuracy || 0) >= 100);
  const maxDayChapters = Math.max(...dailySessions.map(s => s.chaptersStudied), 0);

  const conditions: Record<string, boolean> = {
    first_lesson:  completedChapters.length >= 1,
    streak_3:      longestStreak >= 3,
    streak_7:      longestStreak >= 7,
    streak_30:     longestStreak >= 30,
    chapter_5:     completedChapters.length >= 5,
    chapter_10:    completedChapters.length >= 10,
    perfect_score: hasPercentScore,
    speed_learner: maxDayChapters >= 3,
    multi_subject: uniqueSubjects >= 3,
    no_weak_areas: weakAreas.length === 0 && completedChapters.length >= 1,
  };

  return BADGE_DEFINITIONS.map(b => ({ ...b, earned: !!conditions[b.id] }));
}

export interface Activity {
  id: string;
  type: 'mastery' | 'streak' | 'chapter' | 'coins' | 'verification';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

export interface ProgressState {
  studentName: string;
  completedChapters: CompletedChapter[];
  dailySessions: DailySession[];
  currentStreak: number;
  longestStreak: number;
  totalMinutesStudied: number;
  weakAreas: string[];
  retentionHistory: { date: string; score: number }[];
  recentActivity: Activity[];
  coins: number;
  verifiedChapters: string[];
  activeBounties: { id: string; chapterId: string; amount: number; creator: string; expiresAt: string }[];
  unlockedItems: string[];
  
  // Sync Status
  isSyncing: boolean;
  lastSyncedAt: string | null;
  syncError: string | null;

  // Actions
  setStudentName: (name: string) => void;
  markChapterComplete: (subject: string, chapter: string, phasesCompleted: string[], accuracy?: number) => void;
  recordSession: (minutesStudied: number) => void;
  addWeakArea: (area: string) => void;
  removeWeakArea: (area: string) => void;
  updateRetention: (score: number) => void;
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  addCoins: (amount: number) => void;
  verifyChapter: (chapterId: string) => void;
  setBounty: (bounty: { chapterId: string; amount: number; creator: string; expiresAt: string }) => void;
  initializeDemoData: () => void;
  loadChildProfile: (profileId: string) => void;
  fetchSovereignProfile: (profileId: string) => Promise<void>;
  syncOfflineProgress: (profileId: string) => Promise<void>;
  resetProgress: () => void;
  spendCoins: (amount: number, itemId: string, itemName: string) => boolean;
}

// ==================== Helper Functions ====================

function getTodayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function calculateStreak(sessions: DailySession[]): number {
  if (sessions.length === 0) return 0;
  
  const today = getTodayDate();
  const sortedDates = [...new Set(sessions.map(s => s.date))].sort().reverse();
  
  if (sortedDates[0] !== today && sortedDates[0] !== getPreviousDate(today)) return 0;
  
  let streak = 0;
  let expectedDate = today;
  
  for (const date of sortedDates) {
    if (date === expectedDate) {
      streak++;
      expectedDate = getPreviousDate(expectedDate);
    } else {
      break;
    }
  }
  return streak;
}

function getPreviousDate(dateStr: string): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

// ==================== Store ====================

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      studentName: 'Jawahar',
      completedChapters: [],
      dailySessions: [],
      currentStreak: 0,
      longestStreak: 0,
      totalMinutesStudied: 0,
      weakAreas: [],
      retentionHistory: [],
      recentActivity: [],
      coins: 0,
      verifiedChapters: [],
      activeBounties: [],
      unlockedItems: [],
      isSyncing: false,
      lastSyncedAt: null,
      syncError: null,

      setStudentName: (name) => set({ studentName: name }),

      markChapterComplete: (subject, chapter, phasesCompleted, accuracy) => {
        const existing = get().completedChapters;
        const alreadyDone = existing.find(c => c.subject === subject && c.chapter === chapter);
        
        const entry: CompletedChapter = {
          subject,
          chapter,
          completedAt: new Date().toISOString(),
          phasesCompleted,
          accuracy,
          retentionScore: accuracy, // Initial retention matches accuracy
          lastReviewed: new Date().toISOString(),
        };

        const updatedChapters = alreadyDone
          ? existing.map(c => c.subject === subject && c.chapter === chapter ? entry : c)
          : [...existing, entry];

        set({ completedChapters: updatedChapters });

        // Automated Activity Logging
        if (!alreadyDone) {
          get().addActivity({
            type: 'chapter',
            title: 'Chapter Conquered',
            description: `Finished ${chapter} in ${subject}`,
            icon: '✅'
          });
        }

        if (accuracy && accuracy >= 80) {
          get().addActivity({
            type: 'mastery',
            title: 'Mastery Earned',
            description: `Silver/Gold level in ${chapter}`,
            icon: accuracy >= 90 ? '🥇' : '🥈'
          });
        }

        // Record session and update global retention history
        get().recordSession(20);
        if (accuracy !== undefined) {
          get().updateRetention(accuracy);
          
          // Reward Coins
          let reward = 10;
          if (accuracy >= 100) reward = 50;
          else if (accuracy >= 80) reward = 25;
          
          // Check for active bounties
          const activeBounty = get().activeBounties.find(b => b.chapterId === chapter);
          let bountyBonus = 0;
          if (activeBounty) {
            bountyBonus = activeBounty.amount;
            set({ activeBounties: get().activeBounties.filter(b => b.id !== activeBounty.id) });
          }

          get().addCoins(reward + bountyBonus);
          
          get().addActivity({
            type: 'coins',
            title: 'Coins Earned',
            description: `+${reward + bountyBonus} Pratham Coins${bountyBonus > 0 ? ` (Includes +${bountyBonus} Bounty!)` : ''}`,
            icon: '💰'
          });
        }
      },

      addActivity: (activity) => {
        const newActivity: Activity = {
          ...activity,
          id: Math.random().toString(36).substring(2, 9),
          timestamp: new Date().toISOString()
        };
        set({ recentActivity: [newActivity, ...get().recentActivity].slice(0, 10) });
      },

      recordSession: (minutesStudied) => {
        const today = getTodayDate();
        const sessions = get().dailySessions;
        const todaySessionIdx = sessions.findIndex(s => s.date === today);

        let updatedSessions: DailySession[];
        if (todaySessionIdx >= 0) {
          updatedSessions = sessions.map((s, i) =>
            i === todaySessionIdx
              ? { ...s, chaptersStudied: s.chaptersStudied + 1, minutesStudied: s.minutesStudied + minutesStudied }
              : s
          );
        } else {
          updatedSessions = [...sessions, { date: today, chaptersStudied: 1, minutesStudied }];
        }

        const streak = calculateStreak(updatedSessions);
        const oldStreak = get().currentStreak;

        set({
          dailySessions: updatedSessions,
          currentStreak: streak,
          longestStreak: Math.max(streak, get().longestStreak),
          totalMinutesStudied: get().totalMinutesStudied + minutesStudied,
        });

        // Milestone: Streak Increase
        if (streak > oldStreak) {
          get().addActivity({
            type: 'streak',
            title: 'Streak Alive',
            description: `${streak} days of consistent learning!`,
            icon: '🔥'
          });
        }
      },

      addWeakArea: (area) => {
        const current = get().weakAreas;
        if (!current.includes(area)) {
          set({ weakAreas: [...current, area] });
        }
      },

      removeWeakArea: (area) => {
        set({ weakAreas: get().weakAreas.filter(a => a !== area) });
      },

      updateRetention: (score) => {
        const today = getTodayDate();
        const history = get().retentionHistory;
        const existingIdx = history.findIndex(h => h.date === today);

        let updatedHistory;
        if (existingIdx >= 0) {
          // Average the score for the day
          updatedHistory = history.map((h, i) => 
            i === existingIdx ? { ...h, score: Math.round((h.score + score) / 2) } : h
          );
        } else {
          updatedHistory = [...history, { date: today, score }];
        }
        set({ retentionHistory: updatedHistory });
      },

      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),

      verifyChapter: (chapterId) => set((state) => {
        const alreadyVerified = state.verifiedChapters.includes(chapterId);
        if (alreadyVerified) return state;

        return {
          verifiedChapters: [...state.verifiedChapters, chapterId],
          recentActivity: [
            {
              id: Math.random().toString(36).substr(2, 9),
              timestamp: new Date().toISOString(),
              type: 'verification' as const,
              title: 'Parent Verified',
              description: `Mastery confirmed for ${chapterId}`,
              icon: '🛡️'
            },
            ...state.recentActivity
          ].slice(0, 10)
        };
      }),

      setBounty: (bounty) => set((state) => ({
        activeBounties: [
          ...state.activeBounties,
          { ...bounty, id: Math.random().toString(36).substr(2, 9) }
        ]
      })),

      spendCoins: (amount, itemId, itemName) => {
        const { coins, unlockedItems, recentActivity } = get();
        if (coins < amount) return false;
        
        const newActivity: Activity = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toISOString(),
          type: 'coins',
          title: 'Item Unlocked',
          description: `Spent ${amount} Coins on ${itemName}`,
          icon: '🛍️'
        };

        set({
          coins: coins - amount,
          unlockedItems: [...unlockedItems, itemId],
          recentActivity: [newActivity, ...recentActivity].slice(0, 10),
        });
        
        return true;
      },

      initializeDemoData: () => set({
        studentName: 'Demo Scholar',
        currentStreak: 12,
        longestStreak: 15,
        totalMinutesStudied: 840,
        coins: 550,
        activeBounties: [],
        completedChapters: [
          { subject: 'Mathematics', chapter: 'Trigonometry', completedAt: new Date().toISOString(), phasesCompleted: ['concept', 'practice'], accuracy: 92, retentionScore: 88, lastReviewed: new Date().toISOString() },
          { subject: 'Science', chapter: 'Periodic Classification', completedAt: new Date().toISOString(), phasesCompleted: ['concept'], accuracy: 75, retentionScore: 70, lastReviewed: new Date().toISOString() }
        ],
        verifiedChapters: ['Trigonometry'],
        recentActivity: [
           { id: 'demo1', type: 'mastery', title: 'Mastery Earned', description: 'Gold level in Trigonometry', icon: '🥇', timestamp: new Date().toISOString() },
           { id: 'demo2', type: 'coins', title: 'Coins Earned', description: '+50 Pratham Coins', icon: '₹', timestamp: new Date().toISOString() },
           { id: 'demo3', type: 'streak', title: 'Streak Alive', description: '12 days of consistent learning!', icon: '🔥', timestamp: new Date().toISOString() }
        ]
      }),

      loadChildProfile: (profileId: string) => {
        if (profileId === 'c2') {
          set({
            studentName: 'Junior Scholar',
            currentStreak: 3,
            longestStreak: 5,
            totalMinutesStudied: 120,
            coins: 45,
            activeBounties: [],
            unlockedItems: [],
            completedChapters: [
              { subject: 'Mathematics', chapter: 'Algebra', completedAt: new Date().toISOString(), phasesCompleted: ['concept'], accuracy: 65, retentionScore: 60, lastReviewed: new Date().toISOString() }
            ],
            verifiedChapters: [],
            recentActivity: []
          });
        } else {
          get().initializeDemoData();
        }
      },

      fetchSovereignProfile: async (profileId: string) => {
        try {
          const supabase = createClient();
          
          if (!supabase) {
             console.warn("Supabase credentials missing. Falling back to Mock State.");
             get().loadChildProfile(profileId);
             return;
          }

          const { data, error } = await supabase
            .from('Sovereign_Profiles')
            .select('*')
            .eq('id', profileId)
            .single();

          if (error) {
             // Handle 42P01 (Undefined Table) specifically
             if (error.code === '42P01') {
                console.error("CRITICAL: 'Sovereign_Profiles' table missing in Supabase. Run the provided SQL schema.");
             } else {
                console.warn("Supabase Fetch Error. Falling back to Local.", error.message);
             }
             get().loadChildProfile(profileId);
             return;
          }

          if (!data) {
             get().loadChildProfile(profileId);
             return;
          }

          // Conflict Resolution: Only sync if cloud data is newer than local (or if local is empty)
          const localLastSync = get().lastSyncedAt;
          const cloudLastSync = data.last_sync;

          if (localLastSync && cloudLastSync && new Date(localLastSync) > new Date(cloudLastSync)) {
             console.log("Sovereign Sync: Local progress is more recent. Skipping cloud restore.");
             return;
          }

          set({
             studentName: data.studentName,
             coins: data.coins,
             currentStreak: data.currentStreak,
             completedChapters: data.completedChapters || [],
             recentActivity: data.recentActivity || [],
             unlockedItems: data.unlockedItems || [],
             activeBounties: data.activeBounties || [],
             lastSyncedAt: data.last_sync
          });

        } catch (e) {
          console.error("Unexpected error during profile fetch:", e);
          get().loadChildProfile(profileId);
        }
      },

      syncOfflineProgress: async (profileId: string) => {
        try {
          const supabase = createClient();
          const state = get();
          
          if (!supabase) {
            console.warn("Supabase credentials missing. Sync skipped.");
            return;
          }

          set({ isSyncing: true, syncError: null });

          const { error } = await supabase
            .from('Sovereign_Profiles')
            .upsert({
              id: profileId,
              studentName: state.studentName,
              coins: state.coins,
              currentStreak: state.currentStreak,
              completedChapters: state.completedChapters,
              recentActivity: state.recentActivity,
              unlockedItems: state.unlockedItems,
              totalMinutes: state.totalMinutesStudied,
              last_sync: new Date().toISOString()
            });

          if (error) {
            // Handle missing table gracefully with actionable guidance
            if (error.code === '42P01') {
               const msg = "SOVEREIGN SYNC ERROR: Table 'Sovereign_Profiles' is missing.";
               console.error(msg);
               set({ syncError: 'Table missing in Supabase' });
            } else {
               set({ syncError: error.message });
               throw error;
            }
          } else {
            console.log("Sovereign Sync Successful: Scholar state backed up to cloud.");
            set({ lastSyncedAt: new Date().toISOString(), syncError: null });
          }

        } catch (e: any) {
          console.error("Sovereign Sync Failed:", e.message || e);
        } finally {
          set({ isSyncing: false });
        }
      },

      resetProgress: () => set({
        completedChapters: [],
        dailySessions: [],
        currentStreak: 0,
        longestStreak: 0,
        totalMinutesStudied: 0,
        weakAreas: [],
        retentionHistory: [],
        recentActivity: [],
        coins: 0,
        verifiedChapters: []
      }),
    }),
    {
      name: 'prathamone-progress-storage',
      storage: createJSONStorage(() => indexedDBStorage),
    }
  )
);
