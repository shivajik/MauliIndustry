#!/usr/bin/env node
/**
 * Check environment variables setup
 */

import { config } from "dotenv";
config();

console.log("🔍 Checking environment variables...\n");

const required = {
  "SUPABASE_PROJECT_URL": process.env.SUPABASE_PROJECT_URL,
  "SUPABASE_API_KEY": process.env.SUPABASE_API_KEY,
  "SUPABASE_SERVICE_ROLE_KEY": process.env.SUPABASE_SERVICE_ROLE_KEY,
};

const optional = {
  "SUPABASE_DATABASE_URL": process.env.SUPABASE_DATABASE_URL,
  "ADMIN_EMAIL": process.env.ADMIN_EMAIL,
  "ADMIN_PASSWORD": process.env.ADMIN_PASSWORD,
};

let allRequired = true;

console.log("Required variables:");
for (const [key, value] of Object.entries(required)) {
  if (value) {
    const masked = key.includes("KEY") || key.includes("SECRET") 
      ? `${value.substring(0, 10)}...` 
      : value;
    console.log(`  ✅ ${key}: ${masked}`);
  } else {
    console.log(`  ❌ ${key}: Missing`);
    allRequired = false;
  }
}

console.log("\nOptional variables:");
for (const [key, value] of Object.entries(optional)) {
  if (value) {
    const masked = key.includes("PASSWORD") || key.includes("URL") && key.includes("DATABASE")
      ? `${value.substring(0, 30)}...` 
      : value;
    console.log(`  ✅ ${key}: ${masked}`);
  } else {
    console.log(`  ⚠️  ${key}: Not set`);
  }
}

console.log();

if (allRequired) {
  console.log("✅ All required variables are set!");
  console.log("   You can now run: npm run test-supabase");
  console.log("   Then: npm run migrate");
} else {
  console.log("❌ Missing required variables.");
  console.log("\nTo get your Supabase credentials:");
  console.log("1. Go to https://supabase.com/dashboard");
  console.log("2. Select your project");
  console.log("3. Go to Settings → API");
  console.log("4. Copy Project URL, anon key, and service_role key");
  console.log("5. Add them to your .env file");
}

