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
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';

// Load .env automatically if running via ts-node
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

/**
 * ==========================================================
 * PRATHAMONE PDF -> JSON SYLLABUS EXTRACTOR
 * Author: Jawahar R Mallah & AITDL Network
 * ==========================================================
 * This powerful script uses Gemini 1.5 Pro to natively parse
 * official eBalbharati PDFs (including complex Math symbols)
 * and generate perfectly structured JSON arrays ready to be
 * directly uploaded to Supabase or rendered on the offline UI.
 * 
 * USAGE: 
 * Put 'maharashtra-12th-maths-chapter1.pdf' in the same folder.
 * npx ts-node src/lib/curriculum/pdf-extractor.ts 
 */

async function main() {
  console.log('ðŸš€ Initializing PrathamOne PDF-to-JSON Pipeline...');

  const pdfFilename = 'sample_chapter.pdf'; // CHANGE THIS to your downloaded pdf
  const pdfPath = path.resolve(__dirname, pdfFilename);

  if (!fs.existsSync(pdfPath)) {
    console.error(`âŒ ERROR: Could not find ${pdfFilename}.`);
    console.log(`Please download an official eBalbharati chapter PDF and place it at:\n${pdfPath}`);
    process.exit(1);
  }

  console.log(`ðŸ“„ Reading Document: ${pdfFilename}`);
  const pdfBuffer = fs.readFileSync(pdfPath); // Load PDF

  console.log('ðŸ§  Sending to Gemini 1.5 Pro for Structural Math Analysis...');
  console.log('   (This might take a minute depending on PDF length...)');

  try {
    const { object } = await generateObject({
      model: google('gemini-1.5-pro'), 
      schema: z.object({
        chapter_name: z.string(),
        topics: z.array(
          z.object({
            topic_title: z.string(),
            difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('Estimate the difficulty of this topic based on complexity.'),
            concept_mastery_html: z.string().describe('Extract the theoretical explanation for this topic. Use HTML <p>, <ul>, and <strong> tags. Format mathematical formulas accurately using LaTeX inside $$ brackets.'),
            hots_question: z.object({
              question: z.string(),
              solution: z.string()
            }).describe('Identify one difficult/Higher Order Thinking Question from the exercises related to this topic.'),
            practice_questions: z.array(
              z.object({
                question: z.string(),
                options: z.array(z.string()),
                correct_answer: z.string()
              })
            ).describe('Extract 2-3 standard Multiple Choice Questions from the textbook exercises.').max(3)
          })
        )
      }),
      messages: [
        {
          role: 'system',
          content: 'You are an elite educational AI architect. Your task is to extract learning material from the provided State Board textbook PDF chapter. Ensure you capture mathematical notations perfectly. Do NOT change facts, but transform the layout into structured JSON.'
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Extract and structure the entire syllabus of this chapter into the required JSON schema.' },
            { 
              type: 'file', 
              data: pdfBuffer, 
              mimeType: 'application/pdf' 
            }
          ]
        }
      ]
    });

    console.log('\nâœ… EXTRACTION SUCCESSFUL!\n');
    console.log('====================================================');
    console.log(`Chapter Detected: ${object.chapter_name}`);
    console.log(`Topics Parsed: ${object.topics.length}`);
    console.log('====================================================\n');

    // Save output to JSON file
    const outputPath = path.resolve(__dirname, `extracted_${object.chapter_name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(object, null, 2));
    
    console.log(`ðŸ’¾ JSON safely saved to:\n${outputPath}`);
    console.log('\nYou can now integrate this JSON blob directly into your database mapping!');

  } catch (error) {
    console.error('âŒ EXTRACTION FAILED:');
    console.error(error);
  }
}

main().catch(console.error);

