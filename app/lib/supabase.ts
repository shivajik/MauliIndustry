import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client
// This should only be used in server-side code (loaders, actions, API routes)
export function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
  const supabaseKey = process.env.SUPABASE_API_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase credentials not configured. Using fallback mode.");
    return null;
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Database types matching the schema
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
      };
      clients: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          logo_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo_url?: string | null;
          created_at?: string;
        };
      };
      company_info: {
        Row: {
          id: string;
          name: string;
          tagline: string | null;
          description: string | null;
          address_line1: string | null;
          address_line2: string | null;
          address_country: string | null;
          phone: string | null;
          email: string | null;
          website: string | null;
          profile_brief: string | null;
          profile_mission: string | null;
          profile_vision: string | null;
          profile_history: string | null;
          certifications: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          tagline?: string | null;
          description?: string | null;
          address_line1?: string | null;
          address_line2?: string | null;
          address_country?: string | null;
          phone?: string | null;
          email?: string | null;
          website?: string | null;
          profile_brief?: string | null;
          profile_mission?: string | null;
          profile_vision?: string | null;
          profile_history?: string | null;
          certifications?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          tagline?: string | null;
          description?: string | null;
          address_line1?: string | null;
          address_line2?: string | null;
          address_country?: string | null;
          phone?: string | null;
          email?: string | null;
          website?: string | null;
          profile_brief?: string | null;
          profile_mission?: string | null;
          profile_vision?: string | null;
          profile_history?: string | null;
          certifications?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      pages: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string | null;
          status: string;
          author: string | null;
          featured_image: string | null;
          excerpt: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          title: string;
          slug: string;
          content?: string | null;
          status?: string;
          author?: string | null;
          featured_image?: string | null;
          excerpt?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: string | null;
          status?: string;
          author?: string | null;
          featured_image?: string | null;
          excerpt?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

