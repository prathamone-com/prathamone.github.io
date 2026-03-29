/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Version      : 1.0.0
 * Release Date : 29 March 2026
 * ==========================================================
 */

/**
 * SOVEREIGN CONTENT REGISTRY
 * Hardened pedagogical content for the Static Lesson View.
 */

export interface SovereignContent {
  microConcept: string;
  visualization: string; // LaTeX or Code
  pillars: string[];
  hots: {
    question: string;
    answer: string;
    hint?: string;
  };
}

export const SOVEREIGN_CONTENT: Record<string, SovereignContent> = {
  // --- MATHEMATICS (CLASS 10) ---
  'linear_equations_in_two_variables': {
    microConcept: 'A linear equation in two variables is of the form $ax + by + c = 0$, where a, b, and c are real numbers. The solution represents a point on a straight line in a 2D coordinate plane.',
    visualization: 'ax + by + c = 0',
    pillars: [
      'Understand the Graphical Method of solution.',
      'Master Algebraic Methods: Substitution and Elimination.',
      'Apply Cramer\'s Rule (Determinant Method) for quick verification.'
    ],
    hots: {
      question: 'If the lines represented by $3x + 2ky = 2$ and $2x + 5y + 1 = 0$ are parallel, find the value of k.',
      answer: 'For parallel lines, $a_1/a_2 = b_1/b_2 \neq c_1/c_2$. So, $3/2 = 2k/5 \Rightarrow 15 = 4k \Rightarrow k = 15/4$.'
    }
  },
  'quadratic_equations': {
    microConcept: 'An equation of the form $ax^2 + bx + c = 0$ (a ≠ 0). The roots are determined by the Discriminant ($D = b^2 - 4ac$).',
    visualization: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    pillars: [
      'Determine the nature of roots using the Discriminant.',
      'Solve via spectral factorization and completing the square.',
      'Model real-world projectile and optimization problems.'
    ],
    hots: {
      question: 'Find k if the quadratic equation $kx(x-2) + 6 = 0$ has two equal roots.',
      answer: '$kx^2 - 2kx + 6 = 0$. For equal roots, $D = 0 \Rightarrow (2k)^2 - 4(k)(6) = 0 \Rightarrow 4k^2 - 24k = 0 \Rightarrow 4k(k-6) = 0$. Since k ≠ 0, k = 6.'
    }
  },
  'real_numbers': {
    microConcept: 'Real numbers include all rational and irrational numbers. Fundamental theorems revolve around Euclid\'s Division Lemma and the Fundamental Theorem of Arithmetic.',
    visualization: 'a = bq + r, \\quad 0 \\le r < b',
    pillars: [
      'Apply Euclid\'s Division Algorithm for HCF.',
      'Prove the irrationality of numbers like $\\sqrt{2}$ and $\\pi$.',
      'Analyze decimal expansions for terminating/non-terminating behavior.'
    ],
    hots: {
      question: 'Explain why $7 \times 11 \times 13 + 13$ is a composite number.',
      answer: '$13(7 \times 11 + 1) = 13(78)$. Since it has factors other than 1 and itself, it is composite by the Fundamental Theorem of Arithmetic.'
    }
  },

  // --- SCIENCE (CLASS 10) ---
  'gravitation': {
    microConcept: 'Every object in the universe attracts every other object with a force proportional to the product of their masses and inversely to the square of the distance between them.',
    visualization: 'F = G \\frac{m_1 m_2}{r^2}',
    pillars: [
      'Distinguish between Mass (scalar) and Weight (vector).',
      'Calculate Free Fall and Acceleration due to gravity (g).',
      'Analyze Kepler\'s Laws of Planetary Motion.'
    ],
    hots: {
      question: 'What happens to the gravitational force between two objects if the distance between them is tripled?',
      answer: 'By the Inverse Square Law, if distance (r) becomes 3r, the force (F) becomes $F/ (3^2) = F/9$. The force decreases by a factor of 9.'
    }
  },
  'chemical_reactions_and_equations': {
    microConcept: 'Chemical reactions involve the breaking and making of bonds between atoms. Equations must be balanced to satisfy the Law of Conservation of Mass.',
    visualization: 'Reactants \\rightarrow Products',
    pillars: [
      'Balance chemical equations using the hit-and-trial method.',
      'Identify types: Combination, Decomposition, Displacement, and Redox.',
      'Observe evidence: Gas evolution, color change, or temperature shifts.'
    ],
    hots: {
      question: 'Identify the oxidant and reductant in: $CuO + H_2 \rightarrow Cu + H_2O$.',
      answer: 'CuO is reduced to Cu (Oxidant), $H_2$ is oxidized to $H_2O$ (Reductant).'
    }
  },
  'electricity': {
    microConcept: 'Electricity is the flow of charge. Ohm\'s Law relates Voltage, Current, and Resistance in a closed circuit.',
    visualization: 'V = I \\times R',
    pillars: [
      'Calculate equivalent resistance in Series and Parallel.',
      'Apply Joule\'s Law of Heating: $H = I^2Rt$.',
      'Understand Electric Power and Energy consumption (kWh).'
    ],
    hots: {
      question: 'A wire of resistance R is cut into five equal parts. What is the ratio of R to the equivalent resistance of these parts in parallel?',
      answer: 'Each part has R/5. In parallel, $1/R\' = 5(1/(R/5)) = 25/R \Rightarrow R\' = R/25$. Ratio $R/R\' = 25$.'
    }
  },

  // --- MATHEMATICS (CLASS 12) ---
  'differentiation': {
    microConcept: 'The derivative represents the instantaneous rate of change and the slope of the tangent to a curve at any point.',
    visualization: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}',
    pillars: [
      'Apply Chain Rule for composite functions.',
      'Solve Implicit and Parametric differentiation.',
      'Analyze Second-order derivatives for concavity and inflection.'
    ],
    hots: {
      question: 'Differentiate $x^{\sin x}$ with respect to x.',
      answer: 'Let $y = x^{\sin x}$. $\log y = \sin x \log x$. $1/y (dy/dx) = \cos x \log x + \sin x / x \Rightarrow dy/dx = x^{\sin x} (\cos x \log x + \sin x / x)$.'
    }
  },
  'matrices_12': {
    microConcept: 'A matrix is a rectangular array of numbers. Matrix multiplication is non-commutative and serves as a foundation for linear transformations.',
    visualization: 'C_{ij} = \\sum A_{ik} B_{kj}',
    pillars: [
      'Master Matrix Algebra and Transpose properties.',
      'Find Inverse via Adjoint (A⁻¹ = adj(A)/|A|).',
      'Solve Systems of Linear Equations using Matrix Method.'
    ],
    hots: {
      question: 'If A is a square matrix such that $A^2 = A$, then find $(I + A)^3 - 7A$.',
      answer: '$(I+A)^3 = I + 3A + 3A^2 + A^3$. Since $A^2=A$, $A^3 = A^2 \cdot A = A \cdot A = A$. So $(I+A)^3 = I + 3A + 3A + A = I + 7A$. $(I+7A) - 7A = I$.'
    }
  }
};

/**
 * Helper to fetch content with fallback mechanism
 */
export function getSovereignContent(chapterId: string): SovereignContent | null {
  const id = chapterId.toLowerCase().replace(/\s+/g, '_');
  
  // Try direct match
  if (SOVEREIGN_CONTENT[id]) return SOVEREIGN_CONTENT[id];

  // Try partial match
  const match = Object.keys(SOVEREIGN_CONTENT).find(key => 
    id.includes(key) || key.includes(id)
  );

  return match ? SOVEREIGN_CONTENT[match] : null;
}
