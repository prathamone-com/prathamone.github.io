/**
 * PrathamOne - Sovereign DB Initialization Script (Vanilla JS)
 * Usage: node scripts/init-sovereign-db.js [DATABASE_URL]
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function main() {
  const dbUrl = process.argv[2] || process.env.DATABASE_URL;

  if (!dbUrl) {
    console.error('ERROR: DATABASE_URL is missing.');
    console.log('Usage: node scripts/init-sovereign-db.js "postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"');
    process.exit(1);
  }

  const client = new Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to Supabase (Postgres)...');
    await client.connect();
    console.log('Connected successfully.');

    // Path to the migration file
    const migrationPath = path.join(__dirname, '../apps/web/supabase/migrations/20260329_sovereign_profiles.sql');
    
    if (!fs.existsSync(migrationPath)) {
        throw new Error(`Migration file not found at: ${migrationPath}`);
    }

    const sql = fs.readFileSync(migrationPath, 'utf8');

    console.log('Executing Sovereign Sync Migration (Creating Tables & RLS)...');
    await client.query(sql);
    
    console.log('\n\x1b[32m%s\x1b[0m', 'SUCCESS: Sovereign_Profiles table created and RLS policies applied.');
    console.log('Sovereign Sync Bridge is now LIVE 🌉.');

  } catch (err) {
    console.error('\n\x1b[31m%s\x1b[0m', 'DEPLOYMENT FAILED:');
    console.error(err.message);
    if (err.message.includes('pg')) {
        console.log('\nTIP: Please run "pnpm install" or "npm install pg" in the root directory first.');
    }
  } finally {
    await client.end();
  }
}

main();
