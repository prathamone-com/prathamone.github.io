/**
 * PrathamOne - Sovereign DB Initialization Script (Vanilla JS)
 * Usage: node scripts/init-sovereign-db.js [DATABASE_URL]
 * 
 * NOTE: The DATABASE_URL is your direct Postgres connection string:
 * postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
 */

// Bypass SSL certificate validation for one-off deployment
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function main() {
  const dbUrl = process.argv[2] || process.env.DATABASE_URL;

  if (!dbUrl) {
    console.error('\n\x1b[31m%s\x1b[0m', 'ERROR: DATABASE_URL is missing.');
    console.log('---------------------------------------------------------');
    console.log('Please provide your Supabase direct Postgres connection string.');
    console.log('You can find this in Supabase -> Settings -> Database -> Connection string -> URI');
    console.log('\nUsage:');
    console.log('node scripts/init-sovereign-db.js "postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"');
    console.log('---------------------------------------------------------');
    process.exit(1);
  }

  const client = new Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to Sovereign Cloud DB (Postgres)...');
    await client.connect();
    console.log('\x1b[32m%s\x1b[0m', '✔ Connected successfully.');

    // Path to the migration file
    const migrationPath = path.join(__dirname, '../apps/web/supabase/migrations/20260329_sovereign_profiles.sql');
    
    if (!fs.existsSync(migrationPath)) {
        throw new Error(`Migration file not found at: ${migrationPath}`);
    }

    const sql = fs.readFileSync(migrationPath, 'utf8');

    console.log('Executing Sovereign Sync Migration (Creating Tables & RLS)...');
    await client.query(sql);
    
    console.log('\n\x1b[32m%s\x1b[0m', '🚀 SUCCESS: Sovereign_Profiles table created and RLS policies applied.');
    console.log('Sovereign Sync Bridge is now LIVE 🌉.');

  } catch (err) {
    console.error('\n\x1b[31m%s\x1b[0m', '❌ DEPLOYMENT FAILED:');
    console.error(err.message);
    
    if (err.message.includes('pg')) {
        console.log('\nTIP: Please run "pnpm install" or "npm install pg" in the root directory first.');
    }
    
    if (err.message.includes('authentication failed')) {
        console.log('\nTIP: Double-check your database password. Reset it in Supabase Settings if needed.');
    }
  } finally {
    await client.end();
  }
}

main();
