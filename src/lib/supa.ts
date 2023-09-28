import { createClient } from '@supabase/supabase-js'

const supaurl = process.env.SUPABASE_URL as string;
const supakey = process.env.SUPABASE_KEY as string;

export const supabase = createClient(supaurl, supakey)


