import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials not configured. Using fallback data.");
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image_url: string;
  created_at?: string;
}

export interface Client {
  id: string;
  name: string;
  logo_url: string;
  created_at?: string;
}

export interface CompanyInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  address_line1: string;
  address_line2: string;
  address_country: string;
  phone: string;
  email: string;
  website: string;
  profile_brief: string;
  profile_mission: string;
  profile_vision: string;
  profile_history: string;
  certifications: string[];
  created_at?: string;
  updated_at?: string;
}

export async function getProducts(): Promise<ProductCategory[]> {
  if (!supabase) {
    const { productCategories } = await import("~/data/products");
    return productCategories.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      image_url: p.imageUrl,
    }));
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching products:", error);
    const { productCategories } = await import("~/data/products");
    return productCategories.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      image_url: p.imageUrl,
    }));
  }

  return data || [];
}

export async function getClients(): Promise<Client[]> {
  if (!supabase) {
    const { clients } = await import("~/data/clients");
    return clients.map(c => ({
      id: c.id,
      name: c.name,
      logo_url: c.logoUrl,
    }));
  }

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching clients:", error);
    const { clients } = await import("~/data/clients");
    return clients.map(c => ({
      id: c.id,
      name: c.name,
      logo_url: c.logoUrl,
    }));
  }

  return data || [];
}

export async function getCompanyInfo(): Promise<CompanyInfo | null> {
  if (!supabase) {
    const { companyInfo } = await import("~/data/company");
    return {
      id: "default",
      name: companyInfo.name,
      tagline: companyInfo.tagline,
      description: companyInfo.description,
      address_line1: companyInfo.address.line1,
      address_line2: companyInfo.address.line2,
      address_country: companyInfo.address.country,
      phone: companyInfo.contact.phone,
      email: companyInfo.contact.email,
      website: companyInfo.contact.website,
      profile_brief: companyInfo.profile.brief,
      profile_mission: companyInfo.profile.mission,
      profile_vision: companyInfo.profile.vision,
      profile_history: companyInfo.profile.history,
      certifications: companyInfo.certifications,
    };
  }

  const { data, error } = await supabase
    .from("company_info")
    .select("*")
    .single();

  if (error) {
    console.error("Error fetching company info:", error);
    const { companyInfo } = await import("~/data/company");
    return {
      id: "default",
      name: companyInfo.name,
      tagline: companyInfo.tagline,
      description: companyInfo.description,
      address_line1: companyInfo.address.line1,
      address_line2: companyInfo.address.line2,
      address_country: companyInfo.address.country,
      phone: companyInfo.contact.phone,
      email: companyInfo.contact.email,
      website: companyInfo.contact.website,
      profile_brief: companyInfo.profile.brief,
      profile_mission: companyInfo.profile.mission,
      profile_vision: companyInfo.profile.vision,
      profile_history: companyInfo.profile.history,
      certifications: companyInfo.certifications,
    };
  }

  return data;
}
