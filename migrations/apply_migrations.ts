import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_ROLE_SECRET
);

async function applyMigration(filePath: string) {
  console.log(`Applying migration: ${filePath}`);
  const sql = fs.readFileSync(filePath, 'utf8');
  
  const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
  
  if (error) {
    console.error(`Error applying migration ${filePath}:`, error);
    throw error;
  }
  
  console.log(`Successfully applied migration: ${filePath}`);
}

async function main() {
  try {
    // Get all SQL files in migrations directory
    const files = fs.readdirSync(__dirname)
      .filter(file => file.endsWith('.sql'))
      .sort();
    
    // Apply each migration in order
    for (const file of files) {
      await applyMigration(path.join(__dirname, file));
    }
    
    console.log('All migrations applied successfully');
  } catch (error) {
    console.error('Error applying migrations:', error);
    process.exit(1);
  }
}

main(); 