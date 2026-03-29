/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Version      : 1.1.0
 * Release Date : 29 March 2026
 * ==========================================================
 */

/**
 * SOVEREIGN CURRICULUM REGISTRY (Class 10 English Medium)
 * Standardized data structure for all major boards for offline use.
 */

export interface SovereignChapter {
  id: string;
  title: string;
  unit?: string;
}

export const SOVEREIGN_MATH_10_EN: Record<string, { units: { name: string; chapters: string[] }[] }> = {
  CBSE: {
    units: [
      { name: "Number Systems", chapters: ["Real Numbers"] },
      { name: "Algebra", chapters: ["Polynomials", "Pair of Linear Equations in Two Variables", "Quadratic Equations", "Arithmetic Progressions"] },
      { name: "Coordinate Geometry", chapters: ["Coordinate Geometry"] },
      { name: "Geometry", chapters: ["Triangles", "Circles"] },
      { name: "Trigonometry", chapters: ["Introduction to Trigonometry", "Trigonometric Identities", "Heights and Distances"] },
      { name: "Mensuration", chapters: ["Areas Related to Circles", "Surface Areas and Volumes"] },
      { name: "Statistics and Probability", chapters: ["Statistics", "Probability"] }
    ]
  },
  ICSE: {
    units: [
      { name: "Commercial Mathematics", chapters: ["Goods and Services Tax (GST)", "Banking (Recurring Deposits)", "Shares and Dividends"] },
      { name: "Algebra", chapters: ["Linear Inequations", "Quadratic Equations", "Factorisation of Polynomials", "Ratio and Proportion", "Matrices", "Arithmetic and Geometric Progressions", "Co-ordinate Geometry"] },
      { name: "Geometry", chapters: ["Similarity", "Loci", "Circles"] },
      { name: "Mensuration", chapters: ["Area and Volume of Solids"] },
      { name: "Trigonometry", chapters: ["Trigonometric Identities", "Heights and Distances"] },
      { name: "Statistics", chapters: ["Mean, Median, Mode", "Histograms and Ogives"] },
      { name: "Probability", chapters: ["Fundamental Concepts of Probability"] }
    ]
  },
  MSBSHSE: {
    units: [
      { name: "Mathematics Part-I (Algebra)", chapters: ["Linear Equations in Two Variables", "Quadratic Equations", "Arithmetic Progression", "Financial Planning", "Probability", "Statistics"] },
      { name: "Mathematics Part-II (Geometry)", chapters: ["Similarity", "Pythagoras Theorem", "Circle", "Geometric Constructions", "Coordinate Geometry", "Trigonometry", "Mensuration"] }
    ]
  },
  GSEB: {
    units: [
      { name: "Arithmetic & Numbers", chapters: ["Real Numbers", "Arithmetic Progressions"] },
      { name: "Algebra", chapters: ["Polynomials", "Pair of Linear Equations in Two Variables", "Quadratic Equations"] },
      { name: "Geometry", chapters: ["Triangles", "Coordinate Geometry", "Circles", "Constructions"] },
      { name: "Trigonometry", chapters: ["Introduction to Trigonometry", "Some Applications of Trigonometry"] },
      { name: "Mensuration", chapters: ["Areas Related to Circles", "Surface Areas and Volumes"] },
      { name: "Data Handling", chapters: ["Statistics", "Probability"] }
    ]
  },
  IGCSE: {
    units: [
      { name: "Number & Algebra", chapters: ["Number Systems", "Algebra and Graphs"] },
      { name: "Geometry & Trigonometry", chapters: ["Coordinate Geometry", "Geometry", "Mensuration", "Trigonometry"] },
      { name: "Analysis & Randomness", chapters: ["Transformations and Vectors", "Probability", "Statistics"] }
    ]
  },
  IB_MYP: {
    units: [
      { name: "Number & Algebra", chapters: ["Standard Form & Operations", "Quadratic Expressions", "Systems of Equations", "Functions", "Sequences and Series"] },
      { name: "Geometry & Trigonometry", chapters: ["Sine/Cosine/Tangent Ratios", "Coordinate Geometry", "Circle Geometry", "Vectors"] },
      { name: "Statistics & Probability", chapters: ["Data Analysis & Dispersion", "Probability Independence"] }
    ]
  }
};

/**
 * Returns a flat list of chapters for Sovereign Mode
 */
export function getSovereignChapters(boardVal: string, subjectVal: string, gradeVal: number = 10): SovereignChapter[] {
  if (subjectVal.toLowerCase() !== 'mathematics' || gradeVal !== 10) return [];
  
  const board = SOVEREIGN_MATH_10_EN[boardVal] || SOVEREIGN_MATH_10_EN['CBSE'];
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
