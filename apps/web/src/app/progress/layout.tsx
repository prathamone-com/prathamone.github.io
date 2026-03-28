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

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Progress | PrathamOne AI Classroom',
  description: 'Track your CBSE, ICSE and State Board learning progress — chapters completed, streaks, accuracy and AI-recommended next steps.',
  openGraph: {
    title: 'My Learning Progress | PrathamOne',
    description: 'Track your Indian Board syllabus progress with AI-powered weak area detection.',
    type: 'website',
  },
};

export default function ProgressLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

