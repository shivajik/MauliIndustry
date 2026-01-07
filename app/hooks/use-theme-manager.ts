import { useState, useEffect } from 'react';

export interface Theme {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
  thumbnail?: string;
  colors: {
    neutral: string;
    accent: string;
    success: string;
    error: string;
  };
  fonts: {
    display: string;
    heading: string;
    subheading: string;
    body: string;
    caption: string;
    code: string;
  };
  customCSS?: string;
}

const DEFAULT_THEMES: Theme[] = [
  {
    id: 'default',
    name: 'Default Theme',
    description: 'Clean and professional default theme',
    author: 'Mauli Industries',
    version: '1.0.0',
    thumbnail: 'https://placehold.co/400x300/4F46E5/white?text=Default+Theme',
    colors: {
      neutral: 'slate',
      accent: 'indigo',
      success: 'green',
      error: 'red',
    },
    fonts: {
      display: 'Montserrat',
      heading: 'Montserrat',
      subheading: 'Montserrat',
      body: 'Open Sans',
      caption: 'Open Sans',
      code: 'monospace',
    },
  },
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Contemporary design with blue accents',
    author: 'Mauli Industries',
    version: '1.0.0',
    thumbnail: 'https://placehold.co/400x300/0EA5E9/white?text=Modern+Blue',
    colors: {
      neutral: 'slate',
      accent: 'blue',
      success: 'teal',
      error: 'red',
    },
    fonts: {
      display: 'Poppins',
      heading: 'Poppins',
      subheading: 'Poppins',
      body: 'Inter',
      caption: 'Inter',
      code: 'monospace',
    },
  },
  {
    id: 'elegant-purple',
    name: 'Elegant Purple',
    description: 'Sophisticated purple theme',
    author: 'Mauli Industries',
    version: '1.0.0',
    thumbnail: 'https://placehold.co/400x300/9333EA/white?text=Elegant+Purple',
    colors: {
      neutral: 'mauve',
      accent: 'purple',
      success: 'jade',
      error: 'crimson',
    },
    fonts: {
      display: 'Playfair Display',
      heading: 'Playfair Display',
      subheading: 'Raleway',
      body: 'Lato',
      caption: 'Lato',
      code: 'monospace',
    },
  },
  {
    id: 'nature-green',
    name: 'Nature Green',
    description: 'Fresh and organic green theme',
    author: 'Mauli Industries',
    version: '1.0.0',
    thumbnail: 'https://placehold.co/400x300/10B981/white?text=Nature+Green',
    colors: {
      neutral: 'sage',
      accent: 'grass',
      success: 'green',
      error: 'tomato',
    },
    fonts: {
      display: 'Nunito',
      heading: 'Nunito',
      subheading: 'Nunito',
      body: 'Source Sans Pro',
      caption: 'Source Sans Pro',
      code: 'monospace',
    },
  },
  {
    id: 'corporate-navy',
    name: 'Corporate Navy',
    description: 'Professional navy blue theme',
    author: 'Mauli Industries',
    version: '1.0.0',
    thumbnail: 'https://placehold.co/400x300/1E3A8A/white?text=Corporate+Navy',
    colors: {
      neutral: 'slate',
      accent: 'indigo',
      success: 'cyan',
      error: 'red',
    },
    fonts: {
      display: 'Roboto',
      heading: 'Roboto',
      subheading: 'Roboto',
      body: 'Roboto',
      caption: 'Roboto',
      code: 'monospace',
    },
  },
];

export function useThemeManager() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [activeThemeId, setActiveThemeId] = useState<string>('default');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadThemes();
  }, []);

  const loadThemes = () => {
    // Only run in browser
    if (typeof window === 'undefined') {
      setThemes(DEFAULT_THEMES);
      setIsLoading(false);
      return;
    }

    try {
      const storedThemes = localStorage.getItem('cms-themes');
      const storedActiveTheme = localStorage.getItem('cms-active-theme');

      if (storedThemes) {
        const customThemes = JSON.parse(storedThemes);
        setThemes([...DEFAULT_THEMES, ...customThemes]);
      } else {
        setThemes(DEFAULT_THEMES);
      }

      if (storedActiveTheme) {
        setActiveThemeId(storedActiveTheme);
        applyThemeToDOM(storedActiveTheme);
      }
    } catch (error) {
      console.error('Error loading themes:', error);
      setThemes(DEFAULT_THEMES);
    } finally {
      setIsLoading(false);
    }
  };

  const applyThemeToDOM = (themeId: string) => {
    // Only run in browser
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Get the theme from stored custom themes
    const storedThemes = localStorage.getItem('cms-themes');
    const customThemes: Theme[] = storedThemes ? JSON.parse(storedThemes) : [];
    const allThemes = [...DEFAULT_THEMES, ...customThemes];
    const theme = allThemes.find((t) => t.id === themeId);
    if (!theme) return;

    const root = document.documentElement;

    // Apply color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      for (let i = 1; i <= 12; i++) {
        root.style.setProperty(
          `--color-${key}-${i}`,
          `var(--${value}-${i})`
        );
      }
      root.style.setProperty(
        `--color-${key}-contrast`,
        `var(--${value}-contrast)`
      );
    });

    // Apply font variables
    Object.entries(theme.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });

    // Apply custom CSS if exists
    let customStyleElement = document.getElementById('theme-custom-css');
    if (theme.customCSS) {
      if (!customStyleElement) {
        customStyleElement = document.createElement('style');
        customStyleElement.id = 'theme-custom-css';
        document.head.appendChild(customStyleElement);
      }
      customStyleElement.textContent = theme.customCSS;
    } else if (customStyleElement) {
      customStyleElement.remove();
    }

    // Trigger a re-render by dispatching a custom event
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { themeId } }));
  };

  const activateTheme = (themeId: string) => {
    setActiveThemeId(themeId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cms-active-theme', themeId);
    }
    applyThemeToDOM(themeId);
  };

  const addCustomTheme = (theme: Theme) => {
    const customThemes = themes.filter(
      (t) => !DEFAULT_THEMES.find((dt) => dt.id === t.id)
    );
    const newCustomThemes = [...customThemes, theme];
    
    setThemes([...DEFAULT_THEMES, ...newCustomThemes]);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cms-themes', JSON.stringify(newCustomThemes));
    }
  };

  const deleteTheme = (themeId: string) => {
    // Don't allow deleting default themes
    if (DEFAULT_THEMES.find((t) => t.id === themeId)) {
      return false;
    }

    const customThemes = themes.filter(
      (t) => !DEFAULT_THEMES.find((dt) => dt.id === t.id) && t.id !== themeId
    );
    
    setThemes([...DEFAULT_THEMES, ...customThemes]);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cms-themes', JSON.stringify(customThemes));
    }

    // If deleting active theme, switch to default
    if (activeThemeId === themeId) {
      activateTheme('default');
    }

    return true;
  };

  const updateTheme = (themeId: string, updates: Partial<Theme>) => {
    const customThemes = themes.filter(
      (t) => !DEFAULT_THEMES.find((dt) => dt.id === t.id)
    );
    const themeIndex = customThemes.findIndex((t) => t.id === themeId);
    
    if (themeIndex === -1) return false;

    customThemes[themeIndex] = { ...customThemes[themeIndex], ...updates };
    setThemes([...DEFAULT_THEMES, ...customThemes]);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cms-themes', JSON.stringify(customThemes));
    }

    // If updating active theme, reapply it
    if (activeThemeId === themeId) {
      applyThemeToDOM(themeId);
    }

    return true;
  };

  const getActiveTheme = () => {
    return themes.find((t) => t.id === activeThemeId);
  };

  return {
    themes,
    activeThemeId,
    activeTheme: getActiveTheme(),
    isLoading,
    activateTheme,
    addCustomTheme,
    deleteTheme,
    updateTheme,
  };
}
