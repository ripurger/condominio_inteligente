import { supabase } from './supabase.js'

export async function login(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha })
  if (error) throw error

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  if (profile.role === 'super_admin') window.location.href = '/super-admin.html'
  else if (profile.role === 'administradora') window.location.href = '/administradora.html'
  else if (profile.role === 'morador') window.location.href = '/morador.html'
}

export async function logout() {
  await supabase.auth.signOut()
  window.location.href = '/index.html'
}

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return { ...user, profile }
}

export async function requireRole(role) {
  const user = await getUser()
  if (!user || user.profile.role !== role) {
    window.location.href = '/index.html'
    return null
  }
  return user
}