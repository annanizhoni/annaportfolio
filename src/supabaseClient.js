import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://niybpkzfotwxowffxpps.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY; // Use REACT_APP_ prefix
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
