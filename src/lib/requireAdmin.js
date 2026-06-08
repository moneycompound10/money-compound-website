import { supabaseAdmin } from './supabaseAdmin'

// Verify the Supabase access token sent by the admin UI.
// Returns the user object if valid, otherwise null.
export async function requireAdmin(req) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return null
  const { data, error } = await supabaseAdmin.auth.getUser(token)
  if (error || !data?.user) return null
  return data.user
}
