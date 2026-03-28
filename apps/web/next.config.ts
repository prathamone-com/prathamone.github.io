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

import type { NextConfig } from "next";
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Silence Turbopack lockfile warning and force current workspace
  turbopack: {
    // Let Next.js know which root to use
    // Using string path because process.cwd() might evaluate inconsistently in some bundlers
    resolveAlias: {
      '@': './src'
    }
  },
  // Transpile workspace packages
  transpilePackages: ['@prathamone/ai', '@prathamone/db', '@prathamone/ui'],
  // Required for some LangChain server modules
  serverExternalPackages: ['@langchain/core', '@langchain/langgraph']
};

export default withPWA(nextConfig);

