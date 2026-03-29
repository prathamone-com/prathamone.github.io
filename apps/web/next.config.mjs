import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Explicitly set empty turbopack config to silence the webpack plugin error in Next.js 16
  turbopack: {},
  // Modern Next.js 15+ standard
  transpilePackages: ['@prathamone/ai', '@prathamone/db', '@prathamone/ui'],
  // Required for some LangChain server modules
  serverExternalPackages: ['@langchain/core', '@langchain/langgraph']
};

export default withPWA(nextConfig);
