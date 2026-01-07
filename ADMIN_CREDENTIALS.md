# Admin Access Credentials

## Login Details

- **Admin URL**: `/admin/login`
- **Email**: `admin@mauliindustries.co.in`
- **Password**: `admin123`

## Admin Dashboard Features

Once logged in, you'll have access to:

### 1. **Dashboard Overview** (`/admin/dashboard`)
   - Central hub for all admin features
   - Quick access to all management tools

### 2. **Theme Management**
   - Customize color schemes (neutral, accent, success, error)
   - Choose from 50+ predefined color palettes
   - Select Google Fonts for typography
   - Preview changes in real-time
   - Export/import theme configurations

### 3. **Content Management**
   - Edit home page hero section
   - Manage company information (About page)
   - Update products and services
   - Edit client information
   - Modify contact details

### 4. **Widget Management**
   - Configure footer widgets across 4 columns
   - 5 widget types available:
     - Text widgets
     - HTML/Rich content
     - Link lists
     - Contact information
     - Social media links
   - Drag and drop reordering
   - Show/hide individual widgets

### 5. **Menu Management**
   - Manage 3 menu locations:
     - Header (Main navigation)
     - Footer menu
     - Mobile menu
   - 3 menu item types:
     - Page links (internal)
     - Custom links
     - External links
   - Full customization (ordering, labels, CSS classes, target options)

## Security Notes

⚠️ **Important**: These are default credentials for development purposes only.

For production deployment, you should:
1. Change the default email and password
2. Implement proper authentication (e.g., JWT, OAuth)
3. Add password hashing (bcrypt, argon2)
4. Implement session management
5. Add CSRF protection
6. Enable HTTPS
7. Set up proper role-based access control

## Quick Start

1. Navigate to: `http://localhost:5173/admin/login`
2. Enter credentials:
   - Email: `admin@mauliindustries.co.in`
   - Password: `admin123`
3. Click "Login"
4. Start managing your site!

## Data Persistence

All admin changes are stored in the browser's localStorage:
- Theme settings: `theme-config`
- Widget data: `footer-widgets`
- Menu data: `site-menus`
- CMS content: `cms-data`

**Note**: This means data is local to each browser. For production, integrate with a backend database (e.g., Supabase, Firebase, PostgreSQL).

## Troubleshooting

**Can't log in?**
- Verify you're using the correct credentials
- Check browser console for errors
- Clear localStorage and try again

**Changes not saving?**
- Check localStorage isn't full
- Ensure localStorage is enabled in browser
- Check browser console for errors

**Widgets/Menus not showing?**
- Make sure items are enabled (toggle switch)
- Verify the correct location is selected
- Check that items are saved before navigating away

## Support Documentation

- Widget & Menu System: See `WIDGET_MENU_SYSTEM.md`
- CMS Features: See `CMS_IMPROVEMENTS_SUMMARY.md`
- Quick Reference: See `QUICK_START_GUIDE.md`
- Theme System: See `THEME_SYSTEM.md`
- Rich Text Editor: See `RICH_TEXT_EDITOR.md`
