import { createClient } from '@supabase/supabase-js'

const supabaseUrl ='https://xvpdbapjbaelnxgsrecc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2cGRiYXBqYmFlbG54Z3NyZWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MjQxODgsImV4cCI6MjA2NDMwMDE4OH0.qYKDZlikgMPKlTe4wn9H_LifcZXoyqg_HQOwDmjGC08'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
