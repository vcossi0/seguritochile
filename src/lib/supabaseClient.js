import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[Supabase] Credenciales no configuradas — algunas funciones no estarán disponibles.");
    return {
      auth: { getSession: () => Promise.resolve({ data: { session: null } }) },
      from: () => ({ select: () => Promise.resolve({ data: [], error: null }) }),
    };
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseClient();
