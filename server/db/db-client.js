import { createClient } from '@supabase/supabase-js'

export const db = createClient('https://gkroftdqlbjhcpqxjamu.supabase.co', process.env.SUPABASE_KEY)
