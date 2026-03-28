<!--
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
-->

# PrathamOne - Intelligent AI Classroom for Bharat

PrathamOne is a next-generation AI-powered educational platform tailored for the Indian education ecosystem. It features multi-agent orchestration, interactive curriculum delivery, and support for major Indian boards and languages.

## 🌟 Key Features

*   **Multi-Board Curriculum Matrix**: Native support for **CBSE (NCERT)**, **Maharashtra (MSBSHSE)**, and **UP State Boards (UPMSP)**.
*   **Indic Language Nuance**: Multilingual support encompassing Hindi, English, Marathi, Gujarati, and Sanskrit.
*   **AI Pedagogical Personas**: A unique multi-agent system where different digital teachers (e.g., Shanti Ma'am, Vikram Sir) collaborate to teach concepts.
*   **Real-time LangGraph Streaming**: Complex AI reasoning orchestrated through LangGraph, streamed to the UI in real-time using Next.js SSE (Server-Sent Events).
*   **Premium "Bharat" Design**: A custom Tailwind CSS palette emphasizing professionalism with Deep Navy, Saffron, and Indian Emerald.

## 🏗️ Architecture

The project leverages a robust modern stack:
*   **Framework**: Next.js 16 (App Router)
*   **Styling**: Tailwind CSS v4, Radix UI UI Primitives, Framer Motion
*   **State Management**: Zustand & Immer
*   **AI Orchestration**: LangGraph, Vercel AI SDK
*   **LLMs Provider Layer**: Unified abstraction supporting Google Gemini, OpenAI, and Anthropic.

## 🚀 Getting Started

First, set up your environment variables:
```bash
cp .env.example .env.local
```
Add your respective API keys for actual AI generation (e.g. `GOOGLE_GENAI_API_KEY`). If omitted, the system will gracefully fall back to mock generation for UI testing.

Run the development server:
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the PrathamOne Classroom.

## 📜 Legal & Authorship

Engineered by **Jawahar R Mallah** | AITDL Network.
Crafted with Logic, Vision & AI.
