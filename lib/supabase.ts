import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Public client (uses Anon Key) - used for most operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Private client (uses Service Role Key) - ONLY use in server environments for administrative tasks
// Note: In Next.js Server Actions, using the Anon Key is usually sufficient if RLS is configured correctly.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
