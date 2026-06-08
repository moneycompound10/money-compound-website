import { createClient } from '@supabase/supabase-js'

// Server-only client — uses the SECRET service_role key.
// NEVER import this into client components. Only use it inside API routes
// (pages/api/*) or server-side code. It bypasses Row Level Security.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})
