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
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Load the JSON file safely (avoids ESM import assertion errors)
const mathData = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'maharashtra_12_math.json'), 'utf-8')
);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = 
  process.env.SUPABASE_SECRET_KEY ||            // New Supabase UI format
  process.env.SUPABASE_SERVICE_ROLE_KEY ||       // Old format
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY; // Fallback (limited)

if (!supabaseUrl || !supabaseKey) {
  console.error('âŒ Missing SUPABASE_URL or a Secret/Service Role Key in .env.local');
  console.error('   Add: SUPABASE_SECRET_KEY=sb_secret_... (from Supabase Settings > API)');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  console.log('ðŸš€ Starting Academic Engine data seed...');

  try {
    // 1. Insert Board
    const { data: boardRes, error: boardErr } = await supabase
      .from('boards')
      .upsert({
         id: '7aaee0b7-c81b-4171-b0e6-5c56c221cf62', // deterministic UUID for demo or let it generate
         short_name: mathData.board.short_name,
         name: mathData.board.name,
         language_options: mathData.board.language_options
      }, { onConflict: 'short_name' })
      .select()
      .single();

    if (boardErr) throw boardErr;
    const boardId = boardRes.id;
    console.log(`âœ… Board Created: ${boardRes.name}`);

    // 2. Insert Class
    const { data: classRes, error: classErr } = await supabase
      .from('classes')
      .upsert({
         id: '1a50bdf5-d8aa-4eac-aed3-29471f0dfab2',
         board_id: boardId,
         name: mathData.class.name,
         stream: mathData.class.stream
      }, { onConflict: 'id' }) // Just using naive upsert for the demo script
      .select()
      .single();

    if (classErr) throw classErr;
    const classId = classRes.id;
    console.log(`âœ… Class Created: ${classRes.name}`);

    // 3. Insert Subject
    const { data: subRes, error: subErr } = await supabase
      .from('subjects')
      .upsert({
         id: 'f9d2757a-9a00-410a-9d93-bf019dbca4ab',
         class_id: classId,
         name: mathData.subject.name,
         code: mathData.subject.code,
         icon: 'ðŸ“'
      }, { onConflict: 'id' })
      .select()
      .single();

    if (subErr) throw subErr;
    const subjectId = subRes.id;
    console.log(`âœ… Subject Created: ${subRes.name}`);

    // 4. Loop over Curriculum / Chapters
    for (const chapter of mathData.curriculum) {
       const { data: chapData, error: chapErr } = await supabase
         .from('chapters')
         .insert({
           subject_id: subjectId,
           chapter_no: chapter.chapter_no,
           title: chapter.title,
           book_reference_url: chapter.book_reference
         })
         .select()
         .single();
         
       if (chapErr) {
         console.log(`âš ï¸ Skipped Chapter ${chapter.title} (may already exist or error: ${chapErr.message})`);
         continue;
       }

       console.log(`  ðŸ“˜ Chapter Inserted: ${chapData.title}`);

       // Insert Topics for the chapter
       let orderIndex = 1;
       const topicsToInsert = chapter.topics.map((topic: { title: string; difficulty: string }) => ({
           chapter_id: chapData.id,
           title: topic.title,
           difficulty: topic.difficulty,
           order_index: orderIndex++
       }));

       const { error: topicErr } = await supabase
         .from('topics')
         .insert(topicsToInsert);

       if (topicErr) {
          console.log(`     âŒ Error inserting topics for ${chapter.title}:`, topicErr.message);
       } else {
          console.log(`     ðŸ§  Inserted ${topicsToInsert.length} topics`);
       }
    }

    console.log('ðŸŽ‰ Seeding Complete!');

  } catch (error) {
    console.error('ðŸ”¥ Error during seeding:', error);
  }
}

seedDatabase();

