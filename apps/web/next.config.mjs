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

import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Silence Turbopack lockfile warning and force current workspace
  experimental: {
    // Transpile workspace packages
    transpilePackages: ['@prathamone/ai', '@prathamone/db', '@prathamone/ui'],
  },
  // Required for some LangChain server modules
  serverExternalPackages: ['@langchain/core', '@langchain/langgraph']
};

export default withPWA(nextConfig);
