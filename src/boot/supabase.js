 // src/boot/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://escrgndsjsmpjduqqgbv.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzY3JnbmRzanNtcGpkdXFxZ2J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2OTA0MjcsImV4cCI6MjA3ODI2NjQyN30.Uq22vF_jfp8GTpEGxjtlmrgTh8d5jw8Ox8_rfaZT5d4'
export const supabase = createClient(supabaseUrl, supabaseKey)
