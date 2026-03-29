/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Version      : 1.2.0
 * Release Date : 29 March 2026
 * ==========================================================
 */

import math12Maha from './maharashtra_12_math.json';

/**
 * SOVEREIGN CURRICULUM REGISTRY (Hardened Offline Curriculum)
 * Standardized data structure for all major boards for offline use.
 */

export interface SovereignChapter {
  id: string;
  title: string;
  unit?: string;
}

// ==========================================
// CLASS 10 REGISTRIES
// ==========================================

export const SOVEREIGN_MATH_10_EN: Record<string, { units: { name: string; chapters: string[] }[] }> = {
  CBSE: {
    units: [
      { name: "Number Systems", chapters: ["Real Numbers"] },
      { name: "Algebra", chapters: ["Polynomials", "Pair of Linear Equations", "Quadratic Equations", "Arithmetic Progressions"] },
      { name: "Coordinate Geometry", chapters: ["Coordinate Geometry"] },
      { name: "Geometry", chapters: ["Triangles", "Circles"] },
      { name: "Trigonometry", chapters: ["Introduction to Trigonometry", "Trigonometric Identities", "Heights and Distances"] },
      { name: "Mensuration", chapters: ["Areas Related to Circles", "Surface Areas and Volumes"] },
      { name: "Statistics and Probability", chapters: ["Statistics", "Probability"] }
    ]
  },
  MSBSHSE: {
    units: [
      { name: "Algebra (Part 1)", chapters: ["Linear Equations in Two Variables", "Quadratic Equations", "Arithmetic Progression", "Financial Planning", "Probability", "Statistics"] },
      { name: "Geometry (Part 2)", chapters: ["Similarity", "Pythagoras Theorem", "Circle", "Geometric Constructions", "Coordinate Geometry", "Trigonometry", "Mensuration"] }
    ]
  },
  ICSE: {
    units: [
      { name: "Commercial Math", chapters: ["GST", "Banking", "Shares and Dividends"] },
      { name: "Algebra", chapters: ["Linear Inequations", "Quadratic Equations", "Factorisation", "Matrices", "Arithmetic and Geometric Progressions"] },
      { name: "Geometry", chapters: ["Similarity", "Loci", "Circles"] },
      { name: "Trigonometry", chapters: ["Trigonometric Identities", "Heights and Distances"] }
    ]
  },
  GSEB: {
    units: [
      { name: "Arithmetic", chapters: ["Real Numbers", "Arithmetic Progressions"] },
      { name: "Algebra", chapters: ["Polynomials", "Pair of Linear Equations", "Quadratic Equations"] },
      { name: "Geometry", chapters: ["Triangles", "Coordinate Geometry", "Circles", "Constructions"] },
      { name: "Trigonometry", chapters: ["Trigonometry", "Applications of Trigonometry"] }
    ]
  }
};

export const SOVEREIGN_SCIENCE_10_EN: Record<string, { units: { name: string; chapters: string[] }[] }> = {
  CBSE: {
    units: [
      { name: "Chemical Substances", chapters: ["Chemical Reactions and Equations", "Acids, Bases and Salts", "Metals and Non-metals", "Carbon and its Compounds"] },
      { name: "Living World", chapters: ["Life Processes", "Control and Coordination", "How do Organisms Reproduce?", "Heredity and Evolution"] },
      { name: "Natural Phenomena", chapters: ["Light – Reflection and Refraction", "The Human Eye"] },
      { name: "Effects of Current", chapters: ["Electricity", "Magnetic Effects of Electric Current"] }
    ]
  },
  MSBSHSE: {
    units: [
      { name: "Science Part 1", chapters: ["Gravitation", "Periodic Classification", "Chemical Reactions", "Effects of Electric Current", "Heat", "Refraction of Light", "Lenses", "Metallurgy", "Carbon Compounds", "Space Missions"] },
      { name: "Science Part 2", chapters: ["Heredity and Evolution", "Life Processes 1", "Life Processes 2", "Environmental Management", "Green Energy", "Animal Classification", "Microbiology", "Cell Biology"] }
    ]
  },
  GSEB: {
    units: [
      { name: "Chemistry", chapters: ["Chemical Reactions", "Acids, Bases and Salts", "Metals and Non-metals", "Carbon and its Compounds", "Periodic Classification"] },
      { name: "Biology", chapters: ["Life Processes", "Control and Coordination", "Organism Reproduction", "Heredity and Evolution"] },
      { name: "Physics", chapters: ["Light", "Human Eye", "Electricity", "Magnetic Effects", "Sources of Energy"] }
    ]
  }
};

export const SOVEREIGN_SOCIAL_10_EN: Record<string, { units: { name: string; chapters: string[] }[] }> = {
  CBSE: {
    units: [
      { name: "History", chapters: ["Nationalism in Europe", "Nationalism in India", "Making of a Global World", "Industrialisation", "Print Culture"] },
      { name: "Geography", chapters: ["Resources", "Forest and Wildlife", "Water", "Agriculture", "Minerals", "Manufacturing"] },
      { name: "Civics", chapters: ["Power Sharing", "Federalism", "Gender Religion Caste", "Political Parties", "Democracy Outcomes"] },
      { name: "Economics", chapters: ["Development", "Sectors of Economy", "Money and Credit", "Globalisation"] }
    ]
  },
  GSEB: {
    units: [
      { name: "Heritage", chapters: ["Heritage of India", "Fine Arts & Handicrafts", "Sculpture & Architecture", "Literary Heritage", "Science & Technology Heritage", "Heritage Places"] },
      { name: "Resources", chapters: ["Natural Resources", "Forest & Wildlife Resources", "Agriculture", "Water Resources", "Mining & Minerals"] },
      { name: "Economics", chapters: ["Economic Development", "Liberalization & Globalization", "Economic Problems", "Consumer Awareness", "Human Development"] }
    ]
  }
};

// ==========================================
// CLASS 12 REGISTRIES
// ==========================================

export const SOVEREIGN_MATH_12_EN: Record<string, { units: { name: string; chapters: string[] }[] }> = {
  CBSE: {
    units: [
      { name: "Relations and Functions", chapters: ["Relations and Functions", "Inverse Trigonometric Functions"] },
      { name: "Algebra", chapters: ["Matrices", "Determinants"] },
      { name: "Calculus", chapters: ["Continuity and Differentiability", "Applications of Derivatives", "Integrals", "Applications of Integrals", "Differential Equations"] },
      { name: "Vectors & 3D Geometry", chapters: ["Vectors", "Three Dimensional Geometry"] },
      { name: "Linear Programming", chapters: ["Linear Programming"] },
      { name: "Probability", chapters: ["Probability"] }
    ]
  },
  MSBSHSE: {
    units: [
      { name: "Part 1 (Mathematical Logic/Matrices)", chapters: ["Mathematical Logic", "Matrices", "Trigonometric Functions", "Pair of Straight Lines", "Vectors", "Line and Plane", "Linear Programming"] },
      { name: "Part 2 (Calculus/Statistics)", chapters: ["Differentiation", "Applications of Derivatives", "Indefinite Integration", "Definite Integration", "Applications of Definite Integration", "Differential Equations", "Probability Distribution", "Binomial Distribution"] }
    ]
  }
};

// ==========================================
// REGIONAL REGISTRIES
// ==========================================

export const SOVEREIGN_HINDI_10: Record<string, { units: { name: string; chapters: string[] }[] }> = {
  CBSE: {
    units: [
      { name: "Sparsh (Prose/Poetry)", chapters: ["Kabir", "Meera", "Bihari", "Mythili Sharan Gupt", "Premchand", "Leeladhar Mandloi"] },
      { name: "Sanchayan", chapters: ["Harihar Kaka", "Sapno Ke Se Din", "Topi Shukla"] }
    ]
  },
  MSBSHSE: {
    units: [
      { name: "Lokbharati (Hindi)", chapters: ["Bharat Mahima", "Lakshmi", "Wah Re Hamdard", "Man", "Ghazal", "Giridhar Gagar"] }
    ]
  }
};

/**
 * Returns a flat list of chapters for Sovereign Mode
 */
export function getSovereignChapters(boardVal: string, subjectVal: string, gradeVal: number = 10): SovereignChapter[] {
  const sub = subjectVal.toLowerCase();
  
  // Subject Flags
  const isMath = sub === 'mathematics' || sub === 'maths';
  const isScience = sub === 'science' || sub === 'science and technology' || sub === 'science & technology';
  const isSocial = sub === 'social science' || sub === 'history' || sub === 'geography' || sub === 'civics' || sub === 'economics';
  const isEnglish = sub === 'english';
  const isHindi = sub === 'hindi' || sub === 'regional';

  let registry: Record<string, { units: { name: string; chapters: string[] }[] }> | null = null;
  
  if (gradeVal === 10) {
    if (isMath) registry = SOVEREIGN_MATH_10_EN;
    else if (isScience) registry = SOVEREIGN_SCIENCE_10_EN;
    else if (isSocial) registry = SOVEREIGN_SOCIAL_10_EN;
    else if (isHindi) registry = SOVEREIGN_HINDI_10;
  } else if (gradeVal === 12) {
    if (isMath) registry = SOVEREIGN_MATH_12_EN;
  }
  
  if (!registry) return [];
  
  const board = registry[boardVal] || registry['CBSE'];
  const chapters: SovereignChapter[] = [];
  
  board.units.forEach(unit => {
    unit.chapters.forEach(chapterTitle => {
      chapters.push({
        id: chapterTitle.toLowerCase().replace(/\s+/g, '_'),
        title: chapterTitle,
        unit: unit.name
      });
    });
  });
  
  return chapters;
}
