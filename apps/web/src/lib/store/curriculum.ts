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

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BoardId, BOARDS, LanguageCode } from '@prathamone/db/curriculum';

interface CurriculumState {
  selectedBoard: BoardId;
  selectedGrade: number | null;
  selectedSubject: string | null;
  selectedLanguage: LanguageCode;
  customChapters: any[];
  
  // Actions
  setBoard: (boardId: BoardId) => void;
  setGrade: (grade: number) => void;
  setSubject: (subject: string) => void;
  setLanguage: (lang: LanguageCode) => void;
  addCustomChapter: (chapter: any) => void;
  
  // Computed (helper)
  getBoardName: () => string;
}

export const useCurriculumStore = create<CurriculumState>()(
  persist(
    (set, get) => ({
      selectedBoard: 'CBSE',
      selectedGrade: null,
      selectedSubject: null,
      selectedLanguage: 'en',
      customChapters: [],
      
      setBoard: (boardId) => set({ 
        selectedBoard: boardId,
        selectedLanguage: BOARDS[boardId].defaultLanguage as LanguageCode
      }),
      setGrade: (grade) => set({ selectedGrade: grade }),
      setSubject: (subject) => set({ selectedSubject: subject }),
      setLanguage: (lang) => set({ selectedLanguage: lang }),
      
      addCustomChapter: (chapter) => set((state: any) => ({
        customChapters: [...(state.customChapters || []), chapter]
      })),
      
      getBoardName: () => BOARDS[get().selectedBoard].name,
    }),
    {
      name: 'prathamone-curriculum-storage',
    }
  )
);
