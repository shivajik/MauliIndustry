# Mauli Industries Website

## Overview
A React Router v7 application with server-side rendering for Mauli Industries - a precision engineering company for Steel & Rolling Mill Industries.

## Tech Stack
- **Framework**: React Router v7 with SSR
- **Build Tool**: Vite
- **Styling**: CSS Modules with custom design tokens
- **UI Components**: Radix UI primitives
- **Database**: Supabase (configured via environment variables)
- **Rich Text**: TipTap editor

## Project Structure
```
app/
├── components/     # UI components (admin, footer, header, ui/)
├── data/          # Static data (clients, company, products)
├── hooks/         # Custom React hooks
├── routes/        # Page routes (home, about, contact, products, admin)
├── styles/        # Global styles and design tokens
├── utils/         # Utility functions
├── root.tsx       # App root with layout
└── routes.ts      # Route configuration
```

## Development
- Dev server runs on port 5000
- Uses SSR for improved SEO and performance

## Database Integration
The application uses Supabase PostgreSQL for data persistence:
- **Connection**: Uses transaction pooler URL (port 6543) for Replit compatibility
- **Auto-initialization**: Tables (products, clients, company_info, pages) are created automatically on first connection
- **Auto-seeding**: Default data is seeded if tables are empty
- **Fallback**: Static data files used if database unavailable

### Tables
- `products` - Product catalog (14 items)
- `clients` - Client list (22 companies)
- `company_info` - Company details and profile
- `pages` - CMS pages

## Environment Variables
The project uses Supabase and requires:
- `SUPABASE_DATABASE_URL` - Supabase transaction pooler connection string (port 6543)

## Deployment

### Vercel (Recommended)
This project is configured for Vercel deployment with the `@vercel/react-router` preset:
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Select "React Router" as framework preset
4. Add environment variable: `SUPABASE_DATABASE_URL`
5. Deploy

Build commands (auto-detected):
- Build: `npm run build`
- Output: Vercel serverless functions

### Replit Autoscale
- Build: `npm run build`
- Start: `npm run start`
