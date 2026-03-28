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

/**
 * PrathamOne - Indian Education Boards
 */
export type BoardId = 'CBSE' | 'MSBSHSE' | 'UPMSP' | 'ICSE' | 'IB' | 'Cambridge';

export interface BoardDefinition {
  id: BoardId;
  name: string;
  fullName: string;
  region: string;
  availableLanguages: string[];
  defaultLanguage: string;
}

export const BOARDS: Record<BoardId, BoardDefinition> = {
  CBSE: {
    id: 'CBSE',
    name: 'CBSE',
    fullName: 'Central Board of Secondary Education',
    region: 'National',
    availableLanguages: ['en', 'hi'],
    defaultLanguage: 'en',
  },
  MSBSHSE: {
    id: 'MSBSHSE',
    name: 'Maharashtra State Board',
    fullName: 'Maharashtra State Board of Secondary and Higher Secondary Education',
    region: 'Maharashtra',
    availableLanguages: ['en', 'mr', 'hi'],
    defaultLanguage: 'en',
  },
  UPMSP: {
    id: 'UPMSP',
    name: 'UP Board',
    fullName: 'Uttar Pradesh Madhyamik Shiksha Parishad',
    region: 'Uttar Pradesh',
    availableLanguages: ['en', 'hi'],
    defaultLanguage: 'hi',
  },
  ICSE: {
    id: 'ICSE',
    name: 'ICSE',
    fullName: 'Council for the Indian School Certificate Examinations',
    region: 'National',
    availableLanguages: ['en'],
    defaultLanguage: 'en',
  },
  IB: {
    id: 'IB',
    name: 'IB Board',
    fullName: 'International Baccalaureate',
    region: 'International',
    availableLanguages: ['en'],
    defaultLanguage: 'en',
  },
  Cambridge: {
    id: 'Cambridge',
    name: 'Cambridge Board',
    fullName: 'Cambridge Assessment International Education',
    region: 'International',
    availableLanguages: ['en'],
    defaultLanguage: 'en',
  },
};

export const UI_BOARD_CATEGORIES = [
  { id: 'CBSE', label: 'CBSE' },
  { id: 'ICSE', label: 'ICSE' },
  { id: 'STATE_BOARD', label: 'State Board' },
  { id: 'INTL_BOARD', label: 'IB / Cambridge' },
] as const;

export const STATE_BOARDS: BoardId[] = ['MSBSHSE', 'UPMSP'];
export const INTL_BOARDS: BoardId[] = ['IB', 'Cambridge'];
