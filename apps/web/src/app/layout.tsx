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

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PrathamOne | AI Classroom for Bharat",
    template: "%s | PrathamOne"
  },
  description: "The intelligent AI classroom designed for Indian education boards (CBSE, State Boards). Multi-agent pedagogical support in regional languages.",
  manifest: "/manifest.json",
  themeColor: "#38bdf8",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PrathamOne",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icons/icon-192x192.png",
  },
  metadataBase: new URL('https://prathamone.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/en',
      'hi-IN': '/hi',
    },
  },
  openGraph: {
    title: 'PrathamOne AI Classroom',
    description: 'Transforming education in Bharat with multi-agent AI teachers.',
    url: 'https://prathamone.com',
    siteName: 'PrathamOne Platform',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PrathamOne Educational Dashboard',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrathamOne AI Classroom',
    description: 'The intelligent AI classroom designed for Bharat.',
    creator: '@aitdlnetwork',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-id',
    yandex: 'yandex-verification-id',
    yahoo: 'yahoo-verification-id',
    other: {
      me: ['info@prathamone.com', 'https://prathamone.com'],
      // Specific Bing verification hook
      'msvalidate.01': ['bing-site-verification-id'], 
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
