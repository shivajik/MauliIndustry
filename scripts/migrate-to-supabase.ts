#!/usr/bin/env node
/**
 * Migration script to migrate data from static files to Supabase
 * 
 * Usage:
 *   npm run migrate
 *   or
 *   npx tsx scripts/migrate-to-supabase.ts
 * 
 * Environment variables required:
 *   SUPABASE_PROJECT_URL - Your Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY - Your Supabase service role key (for admin operations)
 */

import { config } from "dotenv";
config();

import { createClient } from "@supabase/supabase-js";
import { productCategories } from "../app/data/products";
import { clients } from "../app/data/clients";
import { companyInfo } from "../app/data/company";

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials!");
  console.error("Please set SUPABASE_PROJECT_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTables() {
  console.log("📋 Checking database tables...");
  console.log("ℹ️  Note: Tables should be created via Supabase SQL Editor or migrations.");
  console.log("ℹ️  Run the following SQL in your Supabase SQL Editor:\n");
  
  const sql = `
-- Products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Company info table
CREATE TABLE IF NOT EXISTS company_info (
  id TEXT PRIMARY KEY DEFAULT 'default',
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  address_country TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  profile_brief TEXT,
  profile_mission TEXT,
  profile_vision TEXT,
  profile_history TEXT,
  certifications TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Pages table
CREATE TABLE IF NOT EXISTS pages (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  status TEXT DEFAULT 'draft',
  author TEXT,
  featured_image TEXT,
  excerpt TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
  `.trim();
  
  console.log(sql);
  console.log("\n✅ Please create tables manually in Supabase SQL Editor, then run this script again.");
  console.log("   Or the tables will be auto-created on first use if using PostgreSQL connection.\n");
}

async function migrateProducts() {
  console.log("\n📦 Migrating products...");

  // Check if products already exist
  const { data: existingProducts } = await supabase.from("products").select("id").limit(1);

  if (existingProducts && existingProducts.length > 0) {
    console.log("⚠️  Products already exist, skipping migration");
    return;
  }

  const productsToInsert = productCategories.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    image_url: p.imageUrl,
  }));

  const { error } = await supabase.from("products").insert(productsToInsert);

  if (error) {
    console.error("❌ Error migrating products:", error.message);
    throw error;
  }

  console.log(`✅ Migrated ${productsToInsert.length} products`);
}

async function migrateClients() {
  console.log("\n👥 Migrating clients...");

  // Check if clients already exist
  const { data: existingClients } = await supabase.from("clients").select("id").limit(1);

  if (existingClients && existingClients.length > 0) {
    console.log("⚠️  Clients already exist, skipping migration");
    return;
  }

  const clientsToInsert = clients.map((c) => ({
    id: c.id,
    name: c.name,
    logo_url: c.logoUrl,
  }));

  const { error } = await supabase.from("clients").insert(clientsToInsert);

  if (error) {
    console.error("❌ Error migrating clients:", error.message);
    throw error;
  }

  console.log(`✅ Migrated ${clientsToInsert.length} clients`);
}

async function migrateCompanyInfo() {
  console.log("\n🏢 Migrating company info...");

  // Check if company info already exists
  const { data: existingCompany } = await supabase
    .from("company_info")
    .select("id")
    .eq("id", "default")
    .single();

  if (existingCompany) {
    console.log("⚠️  Company info already exists, skipping migration");
    return;
  }

  const { error } = await supabase.from("company_info").insert({
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
  });

  if (error) {
    console.error("❌ Error migrating company info:", error.message);
    throw error;
  }

  console.log("✅ Migrated company info");
}

async function migratePages() {
  console.log("\n📄 Migrating default pages...");

  // Check if pages already exist
  const { data: existingPages } = await supabase.from("pages").select("id").limit(1);

  if (existingPages && existingPages.length > 0) {
    console.log("⚠️  Pages already exist, skipping migration");
    return;
  }

  const defaultPages = [
    {
      id: "1",
      title: "Precision Engineering for Steel & Rolling Mill Industries",
      slug: "home",
      content:
        "With 20+ years of experience, we deliver reliable, high-quality industrial components tailored to your requirements.",
      status: "published",
      author: "Admin",
      excerpt: "ISO 9001:2015 certified precision tool room",
    },
    {
      id: "2",
      title: "About Mauli Industries",
      slug: "about",
      content: "Mauli Industries is an ISO 9001:2015 certified precision tool room.",
      status: "published",
      author: "Admin",
      excerpt: "Excellence in Precision Engineering",
    },
    {
      id: "3",
      title: "Contact Us",
      slug: "contact",
      content: "Get in touch with Mauli Industries for all your precision engineering needs.",
      status: "published",
      author: "Admin",
      excerpt: "We are Here to Help You",
    },
  ];

  const { error } = await supabase.from("pages").insert(defaultPages);

  if (error) {
    console.error("❌ Error migrating pages:", error.message);
    throw error;
  }

  console.log(`✅ Migrated ${defaultPages.length} default pages`);
}

async function main() {
  console.log("🚀 Starting migration to Supabase...\n");

  try {
    await createTables();
    await migrateProducts();
    await migrateClients();
    await migrateCompanyInfo();
    await migratePages();

    console.log("\n✅ Migration completed successfully!");
    console.log("\n📝 Next steps:");
    console.log("   1. Verify data in your Supabase dashboard");
    console.log("   2. Update your environment variables:");
    console.log("      - SUPABASE_PROJECT_URL");
    console.log("      - SUPABASE_API_KEY (or SUPABASE_SERVICE_ROLE_KEY)");
    console.log("   3. Restart your development server");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

main();

