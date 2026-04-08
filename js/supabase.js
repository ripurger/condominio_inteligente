import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://SEU-PROJECT-ID.supabase.co'
const SUPABASE_ANON_KEY = 'SUA-ANON-KEY-AQUI'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)