import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { useEffect } from "react";
import type { Route } from "./+types/root";
import { Toaster } from "./components/ui/toaster/toaster";
import colorSchemeApi from "@dazl/color-scheme/client?url";

import "./styles/reset.css";
import "./styles/global.css";
import "./styles/tokens/keyframes.css";
import "./styles/tokens/animations.css";
import "./styles/tokens/colors.css";
import "./styles/tokens/decorations.css";
import "./styles/tokens/spacings.css";
import "./styles/tokens/typography.css";
import "./styles/theme.css";
import { useColorScheme } from "@dazl/color-scheme/react";
import favicon from "/favicon.svg";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "icon",
    href: favicon,
    type: "image/svg+xml",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&family=Playfair+Display:wght@400;500;600;700;800&family=Raleway:wght@300;400;500;600;700&family=Lato:wght@300;400;700;900&family=Nunito:wght@400;600;700;800&family=Source+Sans+Pro:wght@300;400;600;700&family=Roboto:wght@300;400;500;700;900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { rootCssClass, resolvedScheme } = useColorScheme();
  return (
    <html lang="en" suppressHydrationWarning className={rootCssClass} style={{ colorScheme: resolvedScheme }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <script src={colorSchemeApi}></script>
        <Links />
      </head>
      <body>
        {children}
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useEffect(() => {
    // Initialize theme on app load
    const activeThemeId = localStorage.getItem('cms-active-theme') || 'default';
    const customThemes = localStorage.getItem('cms-themes');
    
    // Default themes
    const defaultThemes = [
      {
        id: 'default',
        colors: { neutral: 'slate', accent: 'indigo', success: 'green', error: 'red' },
        fonts: { display: 'Montserrat', heading: 'Montserrat', subheading: 'Montserrat', body: 'Open Sans', caption: 'Open Sans', code: 'monospace' }
      },
      {
        id: 'modern-blue',
        colors: { neutral: 'slate', accent: 'blue', success: 'teal', error: 'red' },
        fonts: { display: 'Poppins', heading: 'Poppins', subheading: 'Poppins', body: 'Inter', caption: 'Inter', code: 'monospace' }
      },
      {
        id: 'elegant-purple',
        colors: { neutral: 'mauve', accent: 'purple', success: 'jade', error: 'crimson' },
        fonts: { display: 'Playfair Display', heading: 'Playfair Display', subheading: 'Raleway', body: 'Lato', caption: 'Lato', code: 'monospace' }
      },
      {
        id: 'nature-green',
        colors: { neutral: 'sage', accent: 'grass', success: 'green', error: 'tomato' },
        fonts: { display: 'Nunito', heading: 'Nunito', subheading: 'Nunito', body: 'Source Sans Pro', caption: 'Source Sans Pro', code: 'monospace' }
      },
      {
        id: 'corporate-navy',
        colors: { neutral: 'slate', accent: 'indigo', success: 'cyan', error: 'red' },
        fonts: { display: 'Roboto', heading: 'Roboto', subheading: 'Roboto', body: 'Roboto', caption: 'Roboto', code: 'monospace' }
      }
    ];
    
    const parsedCustomThemes = customThemes ? JSON.parse(customThemes) : [];
    const allThemes = [...defaultThemes, ...parsedCustomThemes];
    const theme = allThemes.find(t => t.id === activeThemeId) || defaultThemes[0];
    
    const root = document.documentElement;
    
    // Apply colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      for (let i = 1; i <= 12; i++) {
        root.style.setProperty(`--color-${key}-${i}`, `var(--${value}-${i})`);
      }
      root.style.setProperty(`--color-${key}-contrast`, `var(--${value}-contrast)`);
    });
    
    // Apply fonts
    Object.entries(theme.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value as string);
    });
  }, []);
  
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
