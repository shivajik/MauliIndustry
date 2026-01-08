# Supabase Setup Guide

This guide will help you set up Supabase for the Mauli Industries website.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A new Supabase project created

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in project details:
   - Name: Mauli Industries
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
4. Wait for project to be created (2-3 minutes)

## Step 2: Get Your Credentials

1. Go to Project Settings → API
2. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Service Role Key** (for admin operations) - Keep this secret!
   - **Anon Key** (for client-side operations)

## Step 3: Create Database Tables

1. Go to SQL Editor in your Supabase dashboard
2. Run the following SQL:

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

3. Click "Run" to execute the SQL

## Step 4: Set Up Row Level Security (RLS)

For production, you should set up RLS policies. For now, we'll use the service role key which bypasses RLS.

### Optional: Enable RLS

```sql
-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Create policies (example - adjust based on your needs)
CREATE POLICY "Allow public read access" ON products FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write access" ON products FOR ALL USING (auth.role() = 'authenticated');
```

## Step 5: Configure Environment Variables

Create a `.env` file in your project root (or set in your deployment platform):

```env
# Supabase Configuration
SUPABASE_PROJECT_URL=https://xxxxx.supabase.co
SUPABASE_API_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Optional: For PostgreSQL direct connection (alternative to Supabase client)
SUPABASE_DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres

# Admin credentials (change in production!)
ADMIN_EMAIL=admin@mauliindustries.co.in
ADMIN_PASSWORD=admin123
```

**Important**: 
- Never commit `.env` files to version control
- Use the Service Role Key only on the server-side
- The Anon Key can be used client-side (if needed)

## Step 6: Migrate Data

Run the migration script to populate your database with initial data:

```bash
npm run migrate
```

This will:
- Check if tables exist
- Migrate products from `app/data/products.ts`
- Migrate clients from `app/data/clients.ts`
- Migrate company info from `app/data/company.ts`
- Create default pages

## Step 7: Verify Setup

1. Check your Supabase dashboard → Table Editor
2. Verify that data has been migrated:
   - `products` table should have 14 rows
   - `clients` table should have 22 rows
   - `company_info` table should have 1 row
   - `pages` table should have 3 rows

## Step 8: Test the API

Start your development server:

```bash
npm run dev
```

Test the API endpoints:

```bash
# List products (no auth required)
curl http://localhost:5000/api/products

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mauliindustries.co.in","password":"admin123"}'

# Create a product (requires auth - use session cookie from login)
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Cookie: session-id=YOUR_SESSION_ID" \
  -d '{"id":"test-product","name":"Test Product","description":"Test"}'
```

## Troubleshooting

### Connection Issues

1. **Check credentials**: Verify your `SUPABASE_PROJECT_URL` and `SUPABASE_API_KEY` are correct
2. **Check network**: Ensure your IP is not blocked by Supabase
3. **Check logs**: Look at Supabase dashboard → Logs for errors

### Migration Issues

1. **Tables already exist**: The migration script skips existing data. To re-run, delete data manually or modify the script
2. **Permission errors**: Ensure you're using the Service Role Key for migrations
3. **Connection timeout**: Check your network connection and Supabase project status

### API Issues

1. **401 Unauthorized**: Check that you're sending the session cookie
2. **404 Not Found**: Verify the route is registered in `app/routes.ts`
3. **500 Server Error**: Check server logs and Supabase dashboard logs

## Production Considerations

1. **Change default admin credentials** - Update `ADMIN_EMAIL` and `ADMIN_PASSWORD`
2. **Use environment variables** - Never hardcode credentials
3. **Enable RLS** - Set up proper Row Level Security policies
4. **Use HTTPS** - Always use HTTPS in production
5. **Monitor usage** - Keep an eye on Supabase dashboard for usage and limits
6. **Backup regularly** - Set up automated backups in Supabase
7. **Rate limiting** - Consider adding rate limiting to API endpoints

## Alternative: Using PostgreSQL Direct Connection

If you prefer to use PostgreSQL directly instead of Supabase client:

1. Get your connection string from Supabase dashboard → Settings → Database
2. Use the "Connection pooling" mode (port 6543) or "Direct connection" (port 5432)
3. Set `SUPABASE_DATABASE_URL` in your environment variables
4. The system will automatically use the PostgreSQL pool connection

## Support

For issues:
- Check Supabase documentation: https://supabase.com/docs
- Check project logs in Supabase dashboard
- Review API documentation in `API_DOCUMENTATION.md`

