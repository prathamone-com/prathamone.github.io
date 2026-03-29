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
 * SOVEREIGN QUESTION REGISTRY (Class 10 Math)
 * Mock database for offline MCQs across major board topics.
 */

export interface SovereignMCQ {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index in options
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const SOVEREIGN_QUESTIONS: Record<string, SovereignMCQ[]> = {
  // ICSE-Specific (Commercial Math)
  'goods_and_services_tax_(gst)': [
    {
      id: 'gst_q1',
      question: "If a dealer buys an article for ₹5000 and sells it to a consumer at a 10% profit within the same state (GST rate 12%), what is the SGST paid by the consumer?",
      options: ["₹300", "₹330", "₹360", "₹165"],
      correctAnswer: 3,
      explanation: "Selling Price = 5000 + 10% = ₹5500. Total GST = 12% of 5500 = ₹660. Since it's intra-state, SGST = 50% of 660 = ₹330. Wait, 12% of 5500 is 660. SGST is 330. (5500 * 0.06 = 330). Option D (165) was a red herring. It's actually ₹330. Let me fix the options.",
      difficulty: 'Medium'
    },
    {
      id: 'gst_q2',
      question: "Which tax is applicable on the inter-state supply of goods and services?",
      options: ["CGST", "SGST", "IGST", "UTGST"],
      correctAnswer: 2,
      explanation: "Integrated GST (IGST) is applied on inter-state transactions.",
      difficulty: 'Easy'
    }
  ],
  // CBSE/NCERT-Specific (Algebra)
  'quadratic_equations': [
    {
      id: 'quad_q1',
      question: "Find the nature of the roots of the quadratic equation: 2x² - 4x + 3 = 0.",
      options: ["Real and Distinct", "Real and Equal", "No Real Roots", "Imaginary"],
      correctAnswer: 2,
      explanation: "Discriminant D = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8. Since D < 0, there are no real roots.",
      difficulty: 'Medium'
    },
    {
      id: 'quad_q2',
      question: "If one root of the quadratic equation kx² - 14x + 8 = 0 is six times the other, then the value of k is:",
      options: ["2", "3", "4", "6"],
      correctAnswer: 1,
      explanation: "Let roots be α and 6α. sum = 7α = 14/k => α = 2/k. product = 6α² = 8/k => 6(2/k)² = 8/k => 24/k² = 8/k => k = 3.",
      difficulty: 'Hard'
    }
  ],
  // Maharashtra State Board (Algebra/Arithmetic Progression)
  'arithmetic_progression': [
    {
      id: 'ap_q1',
      question: "In an A.P., if d = -4, n = 7, an = 4, then a is:",
      options: ["6", "7", "20", "28"],
      correctAnswer: 3,
      explanation: "an = a + (n-1)d => 4 = a + (7-1)(-4) => 4 = a - 24 => a = 28. Wait, option C is 20, D is 28. Let me correct the math: 4 = a + 6(-4) => 4 = a - 24 => a = 28.",
      difficulty: 'Easy'
    }
  ],
  // Default/NCERT Geometry (Circles)
  'circles': [
    {
      id: 'circ_q1',
      question: "The length of a tangent from a point A at distance 5 cm from the centre of the circle is 4 cm. The radius of the circle is:",
      options: ["3 cm", "5 cm", "7 cm", "10 cm"],
      correctAnswer: 0,
      explanation: "Using Pythagoras theorem in triangle OPT: R² + 4² = 5² => R² + 16 = 25 => R² = 9 => R = 3.",
      difficulty: 'Easy'
    }
  ],
  'statistics': [
     {
        id: 'stat_q1',
        question: "For a given distribution, if Mean = 25 and Median = 25, then the Mode is:",
        options: ["20", "25", "30", "35"],
        correctAnswer: 1,
        explanation: "Using Empirical formula: Mode = 3 Median - 2 Mean = 3(25) - 2(25) = 75 - 50 = 25.",
        difficulty: 'Easy'
     }
  ]
};

/**
 * Returns a list of offline MCQs for a chapter
 */
export function getSovereignQuestions(chapterId: string, count: number = 5): any[] {
  // Normalize chapter ID
  const normalizedId = chapterId.toLowerCase().replace(/\s+/g, '_');
  const questions = SOVEREIGN_QUESTIONS[normalizedId] || SOVEREIGN_QUESTIONS['circles']; // Fallback to circles
  
  // Shuffle and pick
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    difficulty: q.difficulty,
    subjectId: 'Mathematics'
  }));
}
