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
 * PrathamOne - NCERT-Aligned Quiz Question Bank
 * Covers Class 10–12 CBSE / ICSE curriculum
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

type QuestionBank = Record<string, QuizQuestion[]>;

export const QUESTION_BANK: QuestionBank = {
  'calculus': [
    {
      id: 'calc-1',
      question: 'What is the derivative of sin(x)?',
      options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'],
      correctIndex: 0,
      explanation: 'The derivative of sin(x) is cos(x). This is one of the fundamental trigonometric derivatives derived from the limit definition.',
      difficulty: 'easy',
      topic: 'Differentiation',
    },
    {
      id: 'calc-2',
      question: 'The derivative of x³ using the power rule is:',
      options: ['3x', '3x²', 'x²', '2x³'],
      correctIndex: 1,
      explanation: 'Power Rule: d/dx(xⁿ) = nxⁿ⁻¹. So d/dx(x³) = 3x³⁻¹ = 3x².',
      difficulty: 'easy',
      topic: 'Power Rule',
    },
    {
      id: 'calc-3',
      question: 'Chain rule is applied when we differentiate:',
      options: ['Sum of two functions', 'Product of two functions', 'A composite function', 'A constant'],
      correctIndex: 2,
      explanation: 'Chain rule: If y = f(g(x)), then dy/dx = f\'(g(x)) · g\'(x). It is used exclusively for composite functions.',
      difficulty: 'medium',
      topic: 'Chain Rule',
    },
    {
      id: 'calc-4',
      question: 'What is ∫x dx?',
      options: ['x²', 'x²/2 + C', '2x + C', 'x + C'],
      correctIndex: 1,
      explanation: 'Integration power rule: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C. So ∫x dx = x¹⁺¹/(1+1) + C = x²/2 + C.',
      difficulty: 'easy',
      topic: 'Integration',
    },
    {
      id: 'calc-5',
      question: 'If f(x) = eˣ, then f\'(x) is:',
      options: ['eˣ⁻¹', 'eˣ', 'x·eˣ', '1/eˣ'],
      correctIndex: 1,
      explanation: 'The exponential function eˣ is its own derivative. This is the unique property: d/dx(eˣ) = eˣ.',
      difficulty: 'easy',
      topic: 'Exponential Functions',
    },
  ],

  'matrices': [
    {
      id: 'mat-1',
      question: 'Order of a matrix with 3 rows and 4 columns is:',
      options: ['4×3', '3×4', '12×1', '1×12'],
      correctIndex: 1,
      explanation: 'Matrix order is always written as Rows × Columns. So 3 rows, 4 columns = 3×4 matrix.',
      difficulty: 'easy',
      topic: 'Matrix Basics',
    },
    {
      id: 'mat-2',
      question: 'A square matrix A is called symmetric if:',
      options: ['A = -Aᵀ', 'A = Aᵀ', 'det(A) = 0', 'A² = A'],
      correctIndex: 1,
      explanation: 'A symmetric matrix equals its own transpose: A = Aᵀ. This means element aᵢⱼ = aⱼᵢ for all i, j.',
      difficulty: 'medium',
      topic: 'Types of Matrices',
    },
  ],

  'optics': [
    {
      id: 'opt-1',
      question: 'The speed of light in vacuum is approximately:',
      options: ['3×10⁶ m/s', '3×10⁸ m/s', '3×10¹⁰ m/s', '3×10⁴ m/s'],
      correctIndex: 1,
      explanation: 'c = 3×10⁸ m/s (approximately 300,000 km/s). This is the universal speed limit according to Einstein\'s Special Relativity.',
      difficulty: 'easy',
      topic: 'Light',
    },
    {
      id: 'opt-2',
      question: 'When light moves from denser to rarer medium, it:',
      options: ['Slows down and bends toward normal', 'Speeds up and bends away from normal', 'Slows down and bends away from normal', 'Speed and direction remain unchanged'],
      correctIndex: 1,
      explanation: 'Snell\'s Law: When light enters a rarer medium (lower n), it speeds up and bends away from the normal.',
      difficulty: 'medium',
      topic: 'Refraction',
    },
  ],

  'probability': [
    {
      id: 'prob-1',
      question: 'The sum of all probabilities in a sample space is always:',
      options: ['0', '0.5', '1', 'Depends on events'],
      correctIndex: 2,
      explanation: 'By the axiom of probability, the probability of the entire sample space = 1. All individual event probabilities must sum to 1.',
      difficulty: 'easy',
      topic: 'Basics of Probability',
    },
    {
      id: 'prob-2',
      question: 'P(A ∪ B) = P(A) + P(B) is true when A and B are:',
      options: ['Dependent events', 'Mutually exclusive events', 'Complementary events', 'Independent events'],
      correctIndex: 1,
      explanation: 'For mutually exclusive events, P(A ∩ B) = 0, so the addition formula P(A ∪ B) = P(A) + P(B) - P(A ∩ B) simplifies to P(A) + P(B).',
      difficulty: 'medium',
      topic: 'Addition Theorem',
    },
  ],

  'nationalism': [
    {
      id: 'hist-1',
      question: 'Who was responsible for the unification of Germany?',
      options: ['Otto von Bismarck', 'Giuseppe Mazzini', 'Napoleon Bonaparte', 'Victor Emmanuel II'],
      correctIndex: 0,
      explanation: 'Otto von Bismarck, the Prussian Chancellor, was the architect of German unification through his policy of "Blood and Iron".',
      difficulty: 'easy',
      topic: 'German Unification',
    },
    {
      id: 'hist-2',
      question: 'The Rowlatt Act (1919) was passed to:',
      options: ['Improve education', 'Give more power to Indians', 'Curb political activities and allow detention without trial', 'Promote trade'],
      correctIndex: 2,
      explanation: 'The Rowlatt Act gave the British government enormous powers to repress political activities and allowed detention of political prisoners without trial for two years.',
      difficulty: 'medium',
      topic: 'Nationalism in India',
    },
  ],

  'science': [
    {
      id: 'sci-1',
      question: 'What is the SI unit of electric current?',
      options: ['Volt', 'Ohm', 'Ampere', 'Watt'],
      correctIndex: 2,
      explanation: 'The Ampere (A) is the SI base unit of electric current, named after André-Marie Ampère.',
      difficulty: 'easy',
      topic: 'Electricity',
    },
    {
      id: 'sci-2',
      question: 'The process of losing electrons is called:',
      options: ['Reduction', 'Oxidation', 'Ionization', 'Hydration'],
      correctIndex: 1,
      explanation: 'Oxidation is the loss of electrons during a reaction by a molecule, atom or ion.',
      difficulty: 'medium',
      topic: 'Chemical Reactions',
    },
  ],
};

export const LOCALIZED_QUESTION_BANK: Record<string, QuestionBank> = {
  hi: {
    'calculus': [
      {
        id: 'hi-calc-1',
        question: 'sin(x) का अवकलज (derivative) क्या है?',
        options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'],
        correctIndex: 0,
        explanation: 'sin(x) का अवकलज cos(x) होता है। यह सीमा परिभाषा (limit definition) से प्राप्त बुनियादी त्रिकोणमितीय अवकलज है।',
        difficulty: 'easy',
        topic: 'अवकलन (Differentiation)',
      }
    ],
    'science': [
      {
        id: 'hi-sci-1',
        question: 'विद्युत धारा (electric current) का SI मात्रक क्या है?',
        options: ['वोल्ट', 'ओम', 'एम्पियर', 'वाट'],
        correctIndex: 2,
        explanation: 'एम्पियर (A) विद्युत धारा का SI मात्रक है, जिसका नाम आंद्रे-मैरी एम्पियर के नाम पर रखा गया है।',
        difficulty: 'easy',
        topic: 'बिजली (Electricity)',
      }
    ]
  },
  mr: {
    'calculus': [
      {
        id: 'mr-calc-1',
        question: 'sin(x) चे डेरिव्हेटिव्ह (derivative) काय आहे?',
        options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'],
        correctIndex: 0,
        explanation: 'sin(x) चे डेरिव्हेटिव्ह cos(x) आहे. हे मूलभूत त्रिकोणमितीय डेरिव्हेटिव्हपैकी एक आहे.',
        difficulty: 'easy',
        topic: 'डिफरन्शिएशन (Differentiation)',
      }
    ],
    'science': [
      {
        id: 'mr-sci-1',
        question: 'विद्युत प्रवाहाचे (electric current) SI एकक काय आहे?',
        options: ['व्होल्ट', 'ओहम', 'अँपिअर', 'वॅट'],
        correctIndex: 2,
        explanation: 'अँपिअर (A) हे विद्युत प्रवाहाचे SI एकक आहे.',
        difficulty: 'easy',
        topic: 'विद्युत (Electricity)',
      }
    ]
  }
};

/**
 * Gets questions for a given chapter/topic with adaptive logic.
 * Prioritizes weak areas and difficulty matching.
 */
export function getQuestionsForChapter(
  chapter: string, 
  count = 3, 
  weakAreas: string[] = [],
  targetDifficulty: 'easy' | 'medium' | 'hard' = 'medium',
  language = 'en'
): QuizQuestion[] {
  const lowerChapter = chapter.toLowerCase();
  let candidateQuestions: QuizQuestion[] = [];
  
  // Choose bank based on language
  const bank = (language !== 'en' && LOCALIZED_QUESTION_BANK[language]) 
    ? { ...QUESTION_BANK, ...LOCALIZED_QUESTION_BANK[language] } 
    : QUESTION_BANK;

  // 1. Find directly matching questions
  for (const [key, questions] of Object.entries(bank)) {
    if (lowerChapter.includes(key) || key.includes(lowerChapter)) {
      candidateQuestions = [...candidateQuestions, ...questions];
    }
  }
  
  // 2. If no direct matches, check if any weak area keywords match
  if (candidateQuestions.length === 0) {
    for (const area of weakAreas) {
      const lowerArea = area.toLowerCase();
      for (const [key, questions] of Object.entries(QUESTION_BANK)) {
         if (lowerArea.includes(key)) {
           candidateQuestions = [...candidateQuestions, ...questions];
         }
      }
    }
  }

  // 3. Fallback: Take random questions from all bank
  if (candidateQuestions.length === 0) {
    candidateQuestions = Object.values(QUESTION_BANK).flat();
  }

  // 4. Adaptive Filtering: Prioritize target difficulty + Shuffle
  const difficultyMap = { easy: 1, medium: 2, hard: 3 };
  
  // Intelligence: If chapter is in weakAreas, override target to 'easy' for confidence building
  let finalTargetDifficulty = targetDifficulty;
  if (weakAreas.includes(chapter)) {
    finalTargetDifficulty = 'easy';
  }

  const targetLevel = difficultyMap[finalTargetDifficulty as keyof typeof difficultyMap] || 2;

  const sortedByDifficulty = shuffleArray(candidateQuestions).sort((a, b) => {
    const diffA = Math.abs(difficultyMap[a.difficulty as keyof typeof difficultyMap] - targetLevel);
    const diffB = Math.abs(difficultyMap[b.difficulty as keyof typeof difficultyMap] - targetLevel);
    
    // Primary sort: Closest to target difficulty
    if (diffA !== diffB) return diffA - diffB;
    
    // Secondary sort: Harder questions first if at the same "distance" from target (to challenge)
    return difficultyMap[b.difficulty as keyof typeof difficultyMap] - difficultyMap[a.difficulty as keyof typeof difficultyMap];
  });

  return sortedByDifficulty.slice(0, count);
}

/**
 * Simulates an AI generating a new question based on context.
 * In a real-world app, this would call an LLM API.
 */
export async function generateAIQuestion(context: { subject: string, topic: string, level: string }): Promise<QuizQuestion> {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    id: `ai-${Date.now()}`,
    question: `AI GENERATED: Given the context of ${context.topic} in ${context.subject}, what is the most significant fundamental principle?`,
    options: ['Principle A', 'Principle B', 'Principle C', 'Principle D'],
    correctIndex: 0,
    explanation: 'This is a simulated AI-generated question for demonstration purposes.',
    difficulty: context.level as any || 'medium',
    topic: context.topic,
  };
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
