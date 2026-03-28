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

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Classroom | PrathamOne AI',
  description: 'Join the Interactive AI Classroom. Stream highly visual, context-aware curriculum spanning CBSE, State Boards, and International curriculums natively configured with intelligent smart-board mechanics.',
  openGraph: {
    title: 'Live Classroom | PrathamOne AI',
    description: 'Join the Interactive AI Classroom with Shanti Ma\'am and Vikram Sir.',
    url: 'https://prathamone.com/classroom',
  },
  twitter: {
    title: 'Live Classroom | PrathamOne AI',
    description: 'Join the Interactive AI Classroom with Shanti Ma\'am and Vikram Sir.',
  }
};

export default function ClassroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
