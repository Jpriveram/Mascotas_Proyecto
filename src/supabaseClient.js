import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fiexunhmxgwjsslyduwr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZXh1bmhteGd3anNzbHlkdXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExODIzNDEsImV4cCI6MjA3Njc1ODM0MX0.kERIHtcpWQzj2mIm-Ho9z5JkeARu04sjrRJhr3s8CTE";
export const supabase = createClient(supabaseUrl, supabaseKey);