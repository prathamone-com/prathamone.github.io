/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Version      : 1.1.1
 * Release Date : 29 March 2026
 * ==========================================================
 */

/**
 * SOVEREIGN REMEDIATION REGISTRY (Class 10 Math)
 * Targeted 'Healing Plans' for core misconceptions in Math.
 */

export interface RemediationPlan {
  chapterId: string;
  focus: string;
  concept: string;
  visualization: string;
  stepByStep: string[];
}

export const SOVEREIGN_REMEDIATION: Record<string, RemediationPlan> = {
  'goods_and_services_tax_(gst)': {
    chapterId: 'goods_and_services_tax_(gst)',
    focus: 'Misconception: Percentages as Ratios',
    concept: "Think of GST as 'Sharing the Value'. Every rupee spent is divided into the Base Price and the Tax Component. If the GST is 12%, for every ₹100, the government takes ₹12.",
    visualization: "🟦🟦🟦🟦🟦🟦🟦🟦 (Base: 88%) + 🟧 (GST: 12%) = 🟩 (Total: 100%)",
    stepByStep: [
      "Identify the Net Selling Price (Before Tax).",
      "Calculate the Total GST (SP * Rate).",
      "Divide the GST into CGST and SGST (50/50 for Intra-state).",
      "Sum SP + CGST + SGST for the Final Bill."
    ]
  },
  'quadratic_equations': {
    chapterId: 'quadratic_equations',
    focus: 'Misconception: The Zero Product Rule',
    concept: "A quadratic equation is like a balanced scale. To factorize, we must first bring all terms to one side so the other side is ZERO. If A * B = 0, then EITHER A is 0 or B is 0.",
    visualization: "(x - p)(x - q) = 0  => x=p OR x=q",
    stepByStep: [
      "Arrange the equation in Standard Form: ax² + bx + c = 0.",
      "Identify two numbers that multiply to 'c' and add to 'b'.",
      "Split the middle term and factor by grouping.",
      "Solve each linear factor separately."
    ]
  },
  'arithmetic_progression': {
    chapterId: 'arithmetic_progression',
    focus: 'Misconception: Constant Difference vs. Total Sum',
    concept: "An A.P. is like a staircase. Each step is exactly the same height (d). Finding the n-th term tells you where you are standing. Finding the Sum (Sn) tells you the total distance you have climbed.",
    visualization: "1 -> 1+d -> 1+2d -> 1+3d ...",
    stepByStep: [
      "Identify the first term (a) and common difference (d).",
      "Use an = a + (n-1)d to find any specific position.",
      "Use Sn = n/2 [2a + (n-1)d] for the cumulative total.",
      "Always verify if 'd' is negative (decreasing staircase)."
    ]
  },
  'circles': {
    chapterId: 'circles',
    focus: 'Misconception: Tangent Properties',
    concept: "A tangent is a line that 'kisses' the circle at exactly ONE point. The most important rule is: The radius at the point of contact is ALWAYS perpendicular (90°) to the tangent.",
    visualization: "Radius(R) ⊥ Tangent(T) @ Point(P)",
    stepByStep: [
      "Draw the circle and the tangent from an external point.",
      "Draw the radius to the point of contact.",
      "Form a Right-Angled Triangle with the center and external point.",
      "Apply Pythagoras Theorem: (R)² + (Tangent Length)² = (Distance to Center)²."
    ]
  }
};

/**
 * Returns a remediation plan for an offline chapter
 */
export function getSovereignRemediation(chapterId: string): RemediationPlan | null {
  const normalizedId = chapterId.toLowerCase().replace(/\s+/g, '_');
  return SOVEREIGN_REMEDIATION[normalizedId] || SOVEREIGN_REMEDIATION['circles']; 
}
