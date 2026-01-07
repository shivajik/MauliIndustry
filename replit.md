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

## Environment Variables
The project uses Supabase and requires the following secrets:
- `SESSION_SECRET`
- Database connection variables (PGHOST, PGPORT, etc.)

## Deployment
Configured for autoscale deployment with:
- Build: `npm run build`
- Start: `npm run start`
