# Quick Supabase Setup Guide

Since you already have Supabase set up, follow these steps to connect your application:

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (for `SUPABASE_API_KEY`)
   - **service_role key** (for `SUPABASE_SERVICE_ROLE_KEY`) - Keep this secret!

## Step 2: Create .env File

Create a `.env` file in the project root (copy from `.env.example`):

```env
SUPABASE_PROJECT_URL=https://your-project.supabase.co
SUPABASE_API_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_EMAIL=admin@mauliindustries.co.in
ADMIN_PASSWORD=admin123
```

## Step 3: Verify Tables Exist

Run the connection test:

```bash
npx tsx scripts/test-supabase-connection.ts
```

This will:
- Test your Supabase connection
- Check if tables exist
- Show current data counts

## Step 4: Create Tables (if needed)

If tables don't exist, run this SQL in your Supabase SQL Editor:

```sql
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
```

## Step 5: Run Migration

Once tables are created, migrate your data:

```bash
npm run migrate
```

This will populate:
- 14 products
- 22 clients
- Company information
- 3 default pages

## Step 6: Test the API

Restart your dev server and test:

```bash
npm run dev
```

Then test the API:
```bash
# List products (should come from Supabase now)
curl http://localhost:5000/api/products
```

## Troubleshooting

### Connection Issues
- Verify your credentials are correct
- Check that your Supabase project is active
- Ensure you're using the correct project URL

### Table Errors
- Make sure tables are created with exact column names
- Check for typos in table/column names
- Verify RLS policies if you have them enabled

### Migration Issues
- Check if data already exists (migration skips existing data)
- Verify table structure matches the schema
- Check Supabase logs for detailed errors

## Next Steps

After successful migration:
1. ✅ Your API will use Supabase instead of fallback data
2. ✅ All CRUD operations will persist to Supabase
3. ✅ You can manage data through Supabase dashboard or API
4. ✅ Data will be available across all instances

