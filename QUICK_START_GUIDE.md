# Quick Start Guide - CMS Management

A quick reference for managing your WordPress-like CMS.

---

## 🚀 Getting Started

### Access Admin Dashboard

1. Navigate to: `/admin/login`
2. Login (default: check your authentication)
3. Dashboard sidebar shows all sections

---

## 📝 Pages Management

### Create a New Page
```
1. Click: Pages → Add New Page
2. Enter: Title (auto-generates URL slug)
3. Choose: Published or Draft
4. Add: Featured image URL (optional)
5. Write: Content using rich text editor
6. Click: Create Page
```

### Edit Existing Page
```
1. Go to: Pages section
2. Find page in table
3. Click: Edit icon
4. Make changes
5. Click: Save
```

---

## 🎨 Theme Management

### Apply a Theme
```
1. Go to: Themes
2. Browse available themes
3. Click: Activate on desired theme
4. Theme applies instantly
```

### Create Custom Theme
```
1. Themes → Create Custom Theme
2. Choose colors:
   - Neutral (grays)
   - Accent (primary color)
   - Success (green tones)
   - Error (red tones)
3. Select font
4. Add thumbnail URL (optional)
5. Click: Create Theme
```

---

## 🧩 Widget Management

### Add a Widget

**Text Widget:**
```
1. Widgets → Add Widget
2. Title: "About Us"
3. Type: Text Widget
4. Area: Footer Column 1
5. Content: Your text
6. Click: Create Widget
```

**Links Widget:**
```
1. Type: Links Widget
2. Content (JSON):
   [
     {"label": "Home", "url": "/"},
     {"label": "About", "url": "/about"}
   ]
```

**Contact Widget:**
```
1. Type: Contact Widget
2. Content (JSON):
   [
     {"icon": "MapPin", "text": "123 Main St"},
     {"icon": "Phone", "text": "+1 234 567 8900"}
   ]
```

**Social Links:**
```
1. Type: Social Links
2. Content (JSON):
   [
     {"platform": "Facebook", "url": "https://..."},
     {"platform": "Twitter", "url": "https://..."}
   ]
```

---

## 🔗 Menu Management

### Add Menu Item
```
1. Menus → Select menu (Main/Footer/Mobile)
2. Click: Add Menu Item
3. Fill in:
   - Label: Display text
   - URL: Link destination
   - Type: Page/Custom/External
   - Order: Position number
4. Optional:
   - CSS Class: custom-class
   - Open in new tab: ☑
5. Click: Add Item
```

### Reorder Menu Items
```
1. Edit menu item
2. Change "Order" number
   - 1 = First
   - 2 = Second, etc.
3. Save
```

---

## 🏢 Company Info

### Update Company Details
```
1. Go to: Company Info
2. Click: Edit
3. Update:
   - Name
   - Tagline
   - Email
   - Phone
   - Description
   - Address
4. Click: Save Changes
```

---

## 📦 Products Management

### Add Product
```
1. Products → Add Product
2. Fill in:
   - Product Name
   - Category
   - Description
   - Image URL
3. Click: Add Product
```

### Edit Product
```
1. Find product card
2. Click: Edit
3. Update details
4. Click: Save
```

---

## 👥 Clients Management

### Add Client
```
1. Clients → Add Client
2. Enter:
   - Client Name
   - Logo URL
3. Click: Add Client
```

---

## ✏️ Rich Text Editor

### Formatting Toolbar

**Text Styles:**
- **B** = Bold
- *I* = Italic
- U = Underline
- ~~S~~ = Strikethrough
- `</>` = Code

**Headings:**
- H1 = Large heading
- H2 = Medium heading
- H3 = Small heading

**Lists:**
- • = Bullet list
- 1. = Numbered list
- ❝ = Blockquote

**Alignment:**
- ← = Left align
- ■ = Center align
- → = Right align
- ≡ = Justify

**Insert:**
- 🔗 = Add link
- 🖼️ = Add image
- — = Horizontal line

**Actions:**
- ↶ = Undo
- ↷ = Redo

---

## 🎯 Quick Tips

### Widgets
- ✅ Use 2-3 widgets per footer column
- ✅ Test on mobile after adding
- ✅ Keep JSON format valid
- ✅ Use show/hide for testing

### Menus
- ✅ Main menu: 5-7 items max
- ✅ External links: enable "new tab"
- ✅ Use clear, short labels
- ✅ Test mobile menu

### Themes
- ✅ Preview before deleting active theme
- ✅ Default theme can't be deleted
- ✅ Colors auto-adapt for dark mode
- ✅ Choose readable color combinations

### Pages
- ✅ Use descriptive titles
- ✅ Add featured images for visual appeal
- ✅ Write compelling excerpts
- ✅ Publish when ready

---

## 🔍 Troubleshooting

### Widget Not Showing
```
1. Check: Widget is enabled (eye icon)
2. Verify: Correct footer area selected
3. Validate: JSON format (if applicable)
4. Try: Refresh browser
```

### Menu Not Updating
```
1. Check: Menu item is enabled
2. Verify: Correct menu location
3. Try: Hard refresh (Ctrl+F5)
4. Check: URL format is correct
```

### Theme Not Applying
```
1. Verify: Theme is activated
2. Try: Refresh browser
3. Check: Browser console for errors
4. Test: Different browser
```

### Rich Text Not Saving
```
1. Ensure: Content is entered
2. Check: Form is filled completely
3. Try: Different browser
4. Verify: No console errors
```

---

## 📱 Mobile Testing

Always test your changes on mobile:

```
1. Use browser DevTools
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test different screen sizes:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1280px
4. Check:
   - Menu collapses
   - Footer stacks
   - Buttons are clickable
   - Text is readable
```

---

## 💾 Data Backup

Your data is stored in browser localStorage:

**Export Data:**
```javascript
// Open browser console
// Copy widgets
copy(localStorage.getItem('widgets'))

// Copy menus
copy(localStorage.getItem('menus'))

// Copy themes
copy(localStorage.getItem('themes'))
```

**Import Data:**
```javascript
// Paste in console
localStorage.setItem('widgets', 'PASTE_HERE')
localStorage.setItem('menus', 'PASTE_HERE')
localStorage.setItem('themes', 'PASTE_HERE')
```

---

## 🌐 Going Live

Before launching:

- [ ] Update all company info
- [ ] Add real product images
- [ ] Configure all widgets
- [ ] Set up navigation menus
- [ ] Choose and activate theme
- [ ] Test all links
- [ ] Check mobile responsiveness
- [ ] Add real client logos
- [ ] Publish all pages
- [ ] Test contact form
- [ ] Verify social links
- [ ] Check all images load

---

## 📚 Additional Resources

- **WIDGET_MENU_SYSTEM.md** - Detailed widget/menu guide
- **THEME_SYSTEM.md** - Theme customization guide
- **RICH_TEXT_EDITOR.md** - Editor feature guide
- **CMS_IMPROVEMENTS_SUMMARY.md** - Technical overview

---

## 🆘 Need Help?

1. Check documentation files
2. Review this quick start guide
3. Test in different browsers
4. Check browser console for errors
5. Verify JSON syntax online

---

**Happy CMS Managing! 🎉**
