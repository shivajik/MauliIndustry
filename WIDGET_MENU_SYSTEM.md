# Widget & Menu Management System

A comprehensive WordPress-like Widget and Menu management system for your application.

## Features

### Widget Manager

#### Available Widget Types

1. **Text Widget**
   - Simple text content display
   - Perfect for descriptions, about sections, etc.

2. **HTML Widget**
   - Custom HTML content
   - Full flexibility for advanced layouts

3. **Links Widget**
   - List of navigational links
   - Supports internal and external URLs

4. **Contact Widget**
   - Contact information with icons
   - Supports multiple contact methods

5. **Social Links Widget**
   - Social media links with icons
   - Auto-styled circular buttons

#### Widget Areas

- **Footer Column 1** - Primary footer area
- **Footer Column 2** - Secondary footer area
- **Footer Column 3** - Tertiary footer area
- **Footer Column 4** - Quaternary footer area

#### Widget Features

- **Drag & Drop** - Visual reordering (indicated by grip handle)
- **Show/Hide** - Toggle widget visibility
- **Ordering** - Numeric order control
- **Preview** - See content before saving
- **Delete** - Remove unwanted widgets

---

### Menu Manager

#### Menu Locations

1. **Main Menu (Header)**
   - Primary navigation menu
   - Displayed in site header
   - Mobile-responsive

2. **Footer Menu**
   - Footer navigation
   - Compact link list

3. **Mobile Menu**
   - Mobile-specific navigation
   - Optimized for small screens

#### Menu Item Types

1. **Page** - Internal page links
2. **Custom** - Custom links
3. **External** - External URLs

#### Menu Features

- **Visual Ordering** - Drag & drop reordering
- **Enable/Disable** - Show/hide menu items
- **New Tab Option** - Open links in new window
- **CSS Classes** - Custom styling support
- **Hierarchical** - Parent-child relationships (future)

---

## Usage Guide

### Creating a Widget

1. **Access Widget Manager**
   - Go to Admin Dashboard → Widgets

2. **Add New Widget**
   - Click "Add Widget" button
   - Fill in widget details:
     - Title: Widget heading
     - Type: Choose widget type
     - Footer Area: Select column (1-4)
     - Order: Numeric position
     - Content: Type-specific content

3. **Configure Content**
   
   **Text Widget:**
   ```
   Title: About Us
   Content: Your text here...
   ```

   **Links Widget (JSON):**
   ```json
   [
     {"label": "Home", "url": "/"},
     {"label": "About", "url": "/about"}
   ]
   ```

   **Contact Widget (JSON):**
   ```json
   [
     {"icon": "MapPin", "text": "123 Main St"},
     {"icon": "Phone", "text": "+1 234 567 8900"},
     {"icon": "Mail", "text": "info@example.com"}
   ]
   ```

   **Social Links (JSON):**
   ```json
   [
     {"platform": "Facebook", "url": "https://facebook.com/yourpage"},
     {"platform": "Twitter", "url": "https://twitter.com/yourhandle"}
   ]
   ```

4. **Save & Preview**
   - Click "Create Widget"
   - Check frontend to see changes

### Managing Widgets

- **Edit**: Click "Edit" button on widget card
- **Hide**: Click eye icon to toggle visibility
- **Delete**: Click "Delete" to remove widget
- **Reorder**: Use order number or drag handle

---

### Creating Menu Items

1. **Access Menu Manager**
   - Go to Admin Dashboard → Menus

2. **Select Menu**
   - Choose tab: Main Menu, Footer Menu, or Mobile Menu

3. **Add Menu Item**
   - Click "Add Menu Item" button
   - Configure:
     - **Label**: Display text (e.g., "Home")
     - **URL**: Link destination (e.g., "/" or "https://example.com")
     - **Type**: Page, Custom, or External
     - **Order**: Numeric position
     - **CSS Class**: Optional custom styling
     - **New Tab**: Check to open in new window

4. **Save**
   - Click "Add Item"
   - Menu updates instantly

### Managing Menu Items

- **Edit**: Click "Edit" icon
- **Show/Hide**: Toggle visibility with eye icon
- **Reorder**: Change order number
- **Delete**: Remove unwanted items

---

## Available Icons

### Contact Icons
- MapPin
- Phone
- Mail

### Social Media Icons
- Facebook
- Twitter
- Linkedin
- Instagram
- Youtube

---

## Best Practices

### Widgets

1. **Keep It Simple**
   - Use 2-3 widgets per footer column
   - Avoid overcrowding

2. **Consistent Styling**
   - Match widget content to site theme
   - Use similar text lengths

3. **Strategic Placement**
   - Column 1: Company info
   - Column 2: Quick links
   - Column 3: Contact info
   - Column 4: Social/newsletter

4. **Mobile Optimization**
   - Footer stacks on mobile
   - Keep content concise

### Menus

1. **Logical Order**
   - Most important links first
   - Group related items

2. **Clear Labels**
   - Use descriptive names
   - Keep labels short

3. **External Links**
   - Always enable "new tab" for external URLs
   - Add visual indicator

4. **Limit Items**
   - Header: 5-7 items max
   - Footer: 3-5 items
   - Mobile: Essential only

---

## JSON Format Examples

### Links Widget
```json
[
  {"label": "Home", "url": "/"},
  {"label": "Products", "url": "/products"},
  {"label": "Services", "url": "/services"},
  {"label": "Contact", "url": "/contact"}
]
```

### Contact Widget
```json
[
  {
    "icon": "MapPin",
    "text": "123 Industrial Area, City, State 12345"
  },
  {
    "icon": "Phone",
    "text": "+1 (234) 567-8900"
  },
  {
    "icon": "Mail",
    "text": "info@company.com"
  }
]
```

### Social Widget
```json
[
  {"platform": "Facebook", "url": "https://facebook.com/yourcompany"},
  {"platform": "Twitter", "url": "https://twitter.com/yourcompany"},
  {"platform": "Linkedin", "url": "https://linkedin.com/company/yourcompany"},
  {"platform": "Instagram", "url": "https://instagram.com/yourcompany"}
]
```

---

## Troubleshooting

### Widgets Not Showing

1. Check widget is **enabled** (eye icon)
2. Verify correct footer area selected
3. Ensure content is valid JSON (for complex widgets)
4. Clear browser cache

### Menu Not Updating

1. Verify menu item is **enabled**
2. Check correct menu location
3. Refresh page to see changes
4. Verify URL format is correct

### JSON Errors

- Use online JSON validator
- Check for missing quotes
- Ensure proper comma placement
- Validate bracket matching

---

## Technical Details

### Data Storage
- Widgets stored in localStorage: `"widgets"`
- Menus stored in localStorage: `"menus"`
- Data persists across sessions
- Export/backup recommended

### Hooks
- `useWidgetManager()` - Widget CRUD operations
- `useMenuManager()` - Menu CRUD operations

### Components
- `<WidgetManager />` - Admin widget interface
- `<MenuManager />` - Admin menu interface
- Footer automatically renders widgets
- Header automatically renders menu

---

## Future Enhancements

### Planned Features

- [ ] Drag & drop visual reordering
- [ ] Widget templates library
- [ ] Menu item nesting (submenus)
- [ ] Import/export functionality
- [ ] Widget duplication
- [ ] Menu item icons
- [ ] Conditional visibility rules
- [ ] A/B testing support

---

## Support

For issues or questions:
1. Check this documentation
2. Verify JSON syntax
3. Review browser console for errors
4. Test in different browsers

---

**Last Updated**: December 2024
**Version**: 1.0.0
