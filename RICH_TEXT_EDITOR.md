# Rich Text Editor - WordPress-Style Content Editing

The admin dashboard now includes a powerful rich text editor (WYSIWYG) for editing page content, similar to WordPress.

## Features

### Formatting Options

**Text Formatting:**
- Bold (Ctrl/Cmd + B)
- Italic (Ctrl/Cmd + I)
- Underline (Ctrl/Cmd + U)
- Strikethrough
- Inline Code

**Headings:**
- Heading 1 (large titles)
- Heading 2 (section titles)
- Heading 3 (subsection titles)

**Lists:**
- Bullet Lists (unordered)
- Numbered Lists (ordered)
- Blockquotes

**Alignment:**
- Align Left
- Align Center
- Align Right
- Justify

**Media & Links:**
- Add Links (with URL prompt)
- Add Images (with URL prompt)
- Horizontal Line/Divider

**Actions:**
- Undo (Ctrl/Cmd + Z)
- Redo (Ctrl/Cmd + Shift + Z)

## How to Use

### Editing Page Content

1. **Navigate to Admin Dashboard**
   - Go to `/admin/login` and log in
   - Click on "Pages" in the sidebar

2. **Edit a Page**
   - Click the "Edit" button next to any page
   - The rich text editor will appear with the current page content

3. **Format Your Content**
   - Use the toolbar buttons to format text
   - Add headings, lists, images, and links
   - Apply text alignment and styling

4. **Save Changes**
   - Click "Save" to update the page
   - Changes are immediately reflected on the frontend

### Creating New Pages

1. Click "Add New Page" button
2. Enter page title (slug is auto-generated)
3. Set status (Draft or Published)
4. Add featured image URL (optional)
5. Write excerpt (optional)
6. Use the rich text editor to create your content
7. Click "Create Page" to save

## Content Structure

### Home Page
- The home page extracts plain text from HTML content for the hero section
- Formatting is preserved but rendered as plain text

### About Page
- Content is parsed to extract different sections:
  - Company Profile
  - Mission
  - Vision
  - History
- Use headings (H2 or H3) to separate sections in the editor

### Custom Pages
- Full HTML content is stored
- Use the `HtmlContent` component to render rich content on the frontend

## Technical Details

### Components

**RichTextEditor** (`app/components/ui/rich-text-editor/`)
- Built with TipTap (modern rich text editor)
- Full toolbar with formatting options
- Returns HTML content

**HtmlContent** (`app/components/html-content/`)
- Safely renders HTML content
- Sanitizes HTML to prevent XSS attacks
- Includes CSS styling for rendered content

### Utilities

**html-utils.ts** (`app/utils/`)
- `extractTextFromHtml()` - Extracts plain text from HTML
- `sanitizeHtml()` - Removes dangerous HTML (scripts, event handlers)

### Storage

- Content is stored as HTML in localStorage
- Format: `{ content: "<p>HTML content...</p>" }`
- Automatically synchronized across all pages using the CMS

## Styling

The rich text editor includes:
- Professional toolbar with icon buttons
- Syntax highlighting for code blocks
- Responsive design
- Dark mode support via CSS variables
- Consistent styling with the rest of the admin panel

## Best Practices

1. **Use Semantic Headings**
   - H1 for page titles
   - H2 for main sections
   - H3 for subsections

2. **Image URLs**
   - Use royalty-free sources (Unsplash, Pexels)
   - Ensure images are web-optimized
   - Provide descriptive alt text (will be added in future update)

3. **Links**
   - Use full URLs (including https://)
   - Links open in new tab by default
   - Internal links use React Router navigation

4. **Content Organization**
   - Break content into paragraphs
   - Use lists for enumerated items
   - Add visual breaks with horizontal lines

## Future Enhancements

Planned features:
- Image upload functionality
- Media library
- Custom color picker
- Table support
- Font size controls
- Copy/paste from Word with formatting cleanup
- Autosave functionality
- Revision history
