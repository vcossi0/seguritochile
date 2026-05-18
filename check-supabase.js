import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://fueavhrzlgwmmxurcbaf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1ZWF2aHJ6bGd3bW14dXJjYmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NzE2MjYsImV4cCI6MjA5MTQ0NzYyNn0.oEC47GPBjcRHpLO8RQv50wkwI-KHptpyg7vtFqmJxkw";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTables() {
  const tables = ['leads', 'vendedores', 'notas'];
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    if (error) {
      console.log(`Table ${table}: Error - ${error.message}`);
    } else {
      console.log(`Table ${table}: Success - Found ${data?.length || 0} records`);
    }
  }
}

checkTables();
