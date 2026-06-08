import { createClient } from '@supabase/supabase-js'

// Public (browser-safe) client — uses the anon key.
// Used for reading published content and for admin login (auth).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
