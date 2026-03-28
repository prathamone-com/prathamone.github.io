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
 * ==========================================================
 */
import math12Maha from './maharashtra_12_math.json';

export interface Subject {
  id: string;
  label: string;
  icon: string;
  color: string;
  bg: string;
}

export const SUBJECTS: Subject[] = [
  { id: 'Mathematics', label: 'Mathematics', icon: '📐', color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
  { id: 'Science', label: 'Science', icon: '🔬', color: 'text-brand-secondary', bg: 'bg-brand-secondary/10' },
  { id: 'English', label: 'English', icon: '📖', color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'Social Science', label: 'Social Science', icon: '🌍', color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'Hindi', label: 'Hindi / Regional', icon: '🗣️', color: 'text-brand-success', bg: 'bg-brand-success/10' },
];

/**
 * Curriculum Data structure: [BoardID][Grade][SubjectID]
 * Supported Grades for demo: 10, 12
 */
export const CURRICULUM_DATA: Record<string, Record<number, Record<string, string[]>>> = {
  'CBSE': {
    10: {
      'Mathematics': [
        '1. Real Numbers',
        '2. Polynomials',
        '3. Pair of Linear Equations',
        '4. Quadratic Equations',
        '5. Arithmetic Progressions',
        '6. Triangles',
        '7. Coordinate Geometry',
        '8. Introduction to Trigonometry',
        '9. Some Applications of Trigonometry',
        '10. Circles',
      ],
      'Science': [
        '1. Chemical Reactions and Equations',
        '2. Acids, Bases and Salts',
        '3. Metals and Non-metals',
        '4. Carbon and its Compounds',
        '5. Life Processes',
        '6. Control and Coordination',
        '7. How do Organisms Reproduce?',
        '8. Heredity and Evolution',
        '9. Light – Reflection and Refraction',
        '10. The Human Eye and the Colourful World',
      ],
      'English': [
        '1. A Letter to God',
        '2. Nelson Mandela: Long Walk to Freedom',
        '3. Two Stories about Flying',
        '4. From the Diary of Anne Frank',
        '5. Glimpses of India',
        '6. Madam Rides the Bus',
      ],
      'Social Science': [
        '1. The Rise of Nationalism in Europe',
        '2. Nationalism in India',
        '3. The Making of a Global World',
        '4. Resources and Development',
        '5. Power Sharing',
        '6. Federalism',
      ]
    },
    12: {
      'Mathematics': [
        '1. Relations and Functions',
        '2. Inverse Trigonometric Functions',
        '3. Matrices',
        '4. Determinants',
        '5. Continuity and Differentiability',
        '6. Applications of Derivatives',
        '13. Probability'
      ],
      'Science': [
        '1. Electric Charges and Fields',
        '2. Electrostatic Potential and Capacitance',
        '3. Current Electricity',
        '4. Moving Charges and Magnetism',
        '10. Wave Optics'
      ]
    }
  },
  'MSBSHSE': {
    10: {
      'Mathematics': [
        '1. Linear Equations in Two Variables',
        '2. Quadratic Equations',
        '3. Arithmetic Progression',
        '4. Financial Planning',
        '5. Probability',
        '6. Statistics',
        '7. Similarity',
        '8. Pythagoras Theorem',
        '9. Circle',
        '10. Trigonometry'
      ],
      'Science': [
        '1. Gravitation',
        '2. Periodic Classification of Elements',
        '3. Chemical Reactions and Equations',
        '4. Effects of Electric Current',
        '5. Heat',
        '6. Refraction of Light',
        '7. Lenses',
        '8. Metallurgy',
        '9. Carbon Compounds',
        '10. Space Missions',
        '11. Heredity and Evolution',
        '12. Life Processes in Living Organisms Part 1',
        '13. Life Processes in Living Organisms Part 2'
      ]
    },
    12: {
      'Mathematics': [
        '1. Mathematical Logic',
        '2. Matrices',
        '3. Trigonometric Functions',
        '4. Pair of Straight Lines',
        '5. Vectors',
        '6. Line and Plane',
        '7. Linear Programming',
        '8. Differentiation',
        '9. Applications of Derivatives',
        '10. Indefinite Integration',
        '11. Definite Integration',
        '12. Application of Definite Integration',
        '13. Differential Equations',
        '14. Probability Distribution',
        '15. Binomial Distribution'
      ],
      'Science': [
        '1. Rotational Dynamics',
        '2. Mechanical Properties of Fluids',
        '3. Kinetic Theory of Gases and Radiation',
        '4. Thermodynamics',
        '5. Oscillations',
        '6. Superposition of Waves',
        '7. Wave Optics',
        '8. Electrostatics'
      ]
    }
  }
};

// Fallback logic helper
export function getChapters(board: string, grade: number, subject: string): string[] {
  return CURRICULUM_DATA[board]?.[grade]?.[subject] || CURRICULUM_DATA['CBSE'][10][subject] || [];
}

/**
 * Returns granular topics for a specific chapter.
 * Uses the precise JSON dataset we built for Class 12 Maharashtra Maths.
 */
export function getTopicsForChapter(board: string, grade: number, subject: string, chapterTitle: string): any[] {
  if (board === 'MSBSHSE' && grade === 12 && subject === 'Mathematics') {
    // Strip the "number. " prefix from our chapter dropdowns, e.g., "1. Mathematical Logic" -> "Mathematical Logic"
    const cleanChapterName = chapterTitle.replace(/^\d+\.\s*/, '').trim();
    
    // Find the chapter in our JSON framework
    const chapterData = math12Maha.curriculum.find(c => c.title === cleanChapterName);
    
    // If we have topics, return them directly
    if (chapterData && chapterData.topics) {
      return chapterData.topics;
    }
  }

  // Fallback mock topics if it's CBSE or some other subject currently stubbed out
  return [
    { id: 't_mock_1', title: 'Introduction to ' + chapterTitle, difficulty: 'Easy' },
    { id: 't_mock_2', title: 'Core Concepts', difficulty: 'Medium' },
    { id: 't_mock_3', title: 'Advanced Applications', difficulty: 'Hard' }
  ];
}

/**
 * ASYNC version: fetches topics from Supabase via the API.
 * Use this in React components with useEffect or SWR.
 * Falls back gracefully to the static getTopicsForChapter() if API fails.
 */
export async function fetchTopicsFromDB(
  board: string,
  grade: number,
  subject: string,
  chapterTitle: string
): Promise<any[]> {
  try {
    const params = new URLSearchParams({ board, grade: String(grade), subject, chapter: chapterTitle });
    const res = await fetch(`/api/curriculum/topics?${params}`);
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    if (json.topics && json.topics.length > 0) return json.topics;
  } catch {
    // silent fall-through to static data
  }
  // Fallback to the static JSON-based reader
  return getTopicsForChapter(board, grade, subject, chapterTitle);
}
