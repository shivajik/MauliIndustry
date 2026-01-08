#!/usr/bin/env node
/**
 * Test Supabase connection and verify tables exist
 */

import { config } from "dotenv";
config();

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials!");
  console.error("\nPlease set the following environment variables:");
  console.error("  - SUPABASE_PROJECT_URL");
  console.error("  - SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_API_KEY)");
  console.error("\nYou can create a .env file in the project root with:");
  console.error("  SUPABASE_PROJECT_URL=https://xxxxx.supabase.co");
  console.error("  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("🔍 Testing Supabase connection...\n");

  try {
    // Test connection by querying a table
    const { data, error } = await supabase.from("products").select("count").limit(1);

    if (error) {
      // If products table doesn't exist, check other tables
      const { error: clientsError } = await supabase.from("clients").select("count").limit(1);
      if (clientsError) {
        console.log("⚠️  Tables not found. You may need to create them first.");
        console.log("   Run the SQL from SUPABASE_SETUP.md in your Supabase SQL Editor.\n");
        return false;
      }
    }

    console.log("✅ Connection successful!\n");
    return true;
  } catch (error) {
    console.error("❌ Connection failed:", error);
    return false;
  }
}

async function checkTables() {
  console.log("📋 Checking database tables...\n");

  const tables = ["products", "clients", "company_info", "pages"];
  const results: Record<string, { exists: boolean; count: number }> = {};

  for (const table of tables) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select("*", { count: "exact", head: true });

      if (error) {
        results[table] = { exists: false, count: 0 };
      } else {
        results[table] = { exists: true, count: count || 0 };
      }
    } catch (error) {
      results[table] = { exists: false, count: 0 };
    }
  }

  // Display results
  for (const [table, result] of Object.entries(results)) {
    if (result.exists) {
      console.log(`  ✅ ${table}: ${result.count} rows`);
    } else {
      console.log(`  ❌ ${table}: Table not found`);
    }
  }

  console.log();
  return results;
}

async function main() {
  const connected = await testConnection();
  if (!connected) {
    process.exit(1);
  }

  const tables = await checkTables();

  const allTablesExist = Object.values(tables).every((t) => t.exists);
  if (!allTablesExist) {
    console.log("⚠️  Some tables are missing. Please create them using the SQL from SUPABASE_SETUP.md\n");
  } else {
    console.log("✅ All tables exist!\n");
    
    const hasData = Object.values(tables).some((t) => t.count > 0);
    if (!hasData) {
      console.log("📦 No data found. Ready to run migration:\n");
      console.log("   npm run migrate\n");
    } else {
      console.log("📊 Database already has data.\n");
      console.log("   To re-run migration, delete existing data first or modify the migration script.\n");
    }
  }
}

main();

