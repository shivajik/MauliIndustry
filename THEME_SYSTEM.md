# WordPress-Like Theme Management System

## Overview

This application now includes a powerful WordPress-like theme management system that allows you to easily customize the appearance of your website through pre-built themes or create your own custom themes.

## Features

### 🎨 Pre-Built Themes

The system comes with 5 professionally designed themes ready to use:

1. **Default Theme** - Clean and professional with indigo accents
2. **Modern Blue** - Contemporary design with blue color scheme
3. **Elegant Purple** - Sophisticated purple aesthetic
4. **Nature Green** - Fresh and organic green theme
5. **Corporate Navy** - Professional navy blue design

### ✨ Theme Customization

Each theme can be customized with:

- **Color Scales**: Choose from 30+ color scales for:
  - Neutral colors (background, borders)
  - Accent colors (primary brand color)
  - Success colors (positive actions)
  - Error colors (warnings and errors)

- **Typography**: Select fonts for:
  - Display/Heading text
  - Body text
  - Captions
  - Code blocks

- **Custom CSS**: Add your own CSS rules for advanced customization

### 🛠️ Theme Management Features

- **Live Preview**: See theme thumbnails before activating
- **One-Click Activation**: Switch between themes instantly
- **Create Custom Themes**: Build your own themes from scratch
- **Delete Custom Themes**: Remove themes you no longer need
- **Persistent Storage**: Themes are saved locally and persist across sessions

## How to Use

### Accessing Theme Manager

1. Log in to the admin dashboard at `/admin/login`
2. Navigate to the **Themes** section from the sidebar menu
3. You'll see all available themes displayed in a grid

### Switching Themes

1. Browse the available themes
2. Click **Activate** on the theme you want to use
3. The theme is applied instantly across your entire website

### Creating a Custom Theme

1. Click **Create Custom Theme** button
2. Fill in the theme details:
   - **Theme Name**: Give your theme a unique name
   - **Description**: Describe your theme
   - **Author**: Your name or organization
   - **Colors**: Select color scales for neutral, accent, success, and error
   - **Fonts**: Choose heading and body fonts
   - **Thumbnail** (optional): URL to a preview image
   - **Custom CSS** (optional): Add custom CSS rules

3. Click **Create Theme**
4. Your custom theme appears in the themes grid
5. Click **Activate** to apply it

### Deleting Custom Themes

1. Find the custom theme you want to delete
2. Click the trash icon button
3. Confirm the deletion
4. If the deleted theme was active, the system automatically switches to the default theme

## Available Color Scales

### Gray Scales
- gray, mauve, slate, sage, olive, sand

### Reds & Pinks
- tomato, red, ruby, crimson, pink

### Purples & Blues
- plum, purple, violet, iris, indigo, blue, cyan, sky

### Greens
- teal, jade, green, grass, lime, mint

### Browns & Yellows
- bronze, gold, brown, orange, amber, yellow

## Available Fonts

- Montserrat
- Open Sans
- Poppins
- Inter
- Playfair Display
- Raleway
- Lato
- Nunito
- Source Sans Pro
- Roboto
- Ubuntu
- Merriweather
- Work Sans
- Quicksand
- monospace (for code)

## Technical Details

### Theme Structure

Each theme consists of:
```typescript
{
  id: string;               // Unique identifier
  name: string;             // Display name
  description: string;      // Theme description
  author: string;           // Theme creator
  version: string;          // Version number
  thumbnail?: string;       // Preview image URL
  colors: {
    neutral: string;        // Gray scale name
    accent: string;         // Primary color scale
    success: string;        // Success color scale
    error: string;          // Error color scale
  };
  fonts: {
    display: string;        // Large headings
    heading: string;        // Section headings
    subheading: string;     // Subheadings
    body: string;           // Body text
    caption: string;        // Small text
    code: string;           // Code blocks
  };
  customCSS?: string;       // Custom CSS rules
}
```

### Storage

- **Default Themes**: Built-in, cannot be deleted
- **Custom Themes**: Stored in browser localStorage under `cms-themes`
- **Active Theme**: Stored in localStorage under `cms-active-theme`

### How It Works

1. Theme data is stored in localStorage
2. On app load, the active theme is detected and applied
3. CSS custom properties are dynamically updated to match the theme
4. Changes take effect immediately without page reload

## Tips & Best Practices

### Creating Effective Themes

1. **Choose Harmonious Colors**: Select color scales that complement each other
2. **Test Readability**: Ensure text is readable on all backgrounds
3. **Consistent Fonts**: Use fonts that work well together
4. **Preview First**: Check the theme preview before activating
5. **Custom CSS**: Use sparingly for specific adjustments

### Color Combinations

Some suggested combinations:
- **Professional**: slate + indigo + green + red
- **Creative**: mauve + purple + jade + crimson
- **Nature**: sage + grass + green + tomato
- **Tech**: slate + blue + cyan + red
- **Warm**: sand + orange + amber + red

### Font Pairings

Popular combinations:
- **Modern**: Poppins + Inter
- **Classic**: Playfair Display + Lato
- **Clean**: Montserrat + Open Sans
- **Friendly**: Nunito + Source Sans Pro
- **Professional**: Roboto + Roboto

## Troubleshooting

**Theme not applying?**
- Clear browser cache and reload
- Check browser console for errors
- Ensure localStorage is enabled

**Custom theme disappeared?**
- Check that localStorage hasn't been cleared
- Try creating the theme again

**Colors look wrong?**
- Verify you've selected valid color scale names
- Check that custom CSS isn't overriding theme colors

## Future Enhancements

Potential features for future updates:
- Export/import themes as JSON files
- Theme marketplace
- Live theme preview mode
- More granular color customization
- Font upload support
- Theme categories and tags
- Theme ratings and reviews

---

**Need Help?**
The theme system is designed to be intuitive and user-friendly. If you encounter any issues or have suggestions, please reach out to your system administrator.
