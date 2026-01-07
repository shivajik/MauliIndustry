import { useState } from 'react';
import { useThemeManager, type Theme } from '~/hooks/use-theme-manager';
import { Button } from '~/components/ui/button/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog/dialog';
import { Input } from '~/components/ui/input/input';
import { Label } from '~/components/ui/label/label';
import { Textarea } from '~/components/ui/textarea/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '~/components/ui/alert-dialog/alert-dialog';
import { Check, Palette, Plus, Trash2, User, Package } from 'lucide-react';
import styles from '~/routes/admin/themes.module.css';

const COLOR_SCALES = [
  'gray', 'mauve', 'slate', 'sage', 'olive', 'sand',
  'tomato', 'red', 'ruby', 'crimson', 'pink', 'plum',
  'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan',
  'sky', 'teal', 'jade', 'green', 'grass', 'lime',
  'mint', 'bronze', 'gold', 'brown', 'orange', 'amber', 'yellow'
];

const FONT_OPTIONS = [
  'Montserrat', 'Open Sans', 'Poppins', 'Inter', 'Playfair Display',
  'Raleway', 'Lato', 'Nunito', 'Source Sans Pro', 'Roboto',
  'Ubuntu', 'Merriweather', 'Work Sans', 'Quicksand', 'monospace'
];

export function ThemeManager() {
  const { themes, activeThemeId, activateTheme, addCustomTheme, deleteTheme } = useThemeManager();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [deleteDialogTheme, setDeleteDialogTheme] = useState<string | null>(null);
  const [newTheme, setNewTheme] = useState<Partial<Theme>>({
    name: '',
    description: '',
    author: '',
    version: '1.0.0',
    thumbnail: '',
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
    customCSS: '',
  });

  const handleCreateTheme = () => {
    if (!newTheme.name) return;

    const theme: Theme = {
      id: `custom-${Date.now()}`,
      name: newTheme.name,
      description: newTheme.description || '',
      author: newTheme.author || 'Custom',
      version: newTheme.version || '1.0.0',
      thumbnail: newTheme.thumbnail,
      colors: newTheme.colors!,
      fonts: newTheme.fonts!,
      customCSS: newTheme.customCSS,
    };

    addCustomTheme(theme);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewTheme({
      name: '',
      description: '',
      author: '',
      version: '1.0.0',
      thumbnail: '',
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
      customCSS: '',
    });
  };

  const handleDeleteTheme = () => {
    if (deleteDialogTheme) {
      deleteTheme(deleteDialogTheme);
      setDeleteDialogTheme(null);
    }
  };

  const isDefaultTheme = (themeId: string) => {
    return ['default', 'modern-blue', 'elegant-purple', 'nature-green', 'corporate-navy'].includes(themeId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Themes</h1>
        <p className={styles.description}>
          Customize your website's appearance with beautiful themes
        </p>
      </div>

      <div className={styles.actions}>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={16} />
              Create Custom Theme
            </Button>
          </DialogTrigger>
          <DialogContent className={styles.editorDialog}>
            <DialogHeader>
              <DialogTitle>Create Custom Theme</DialogTitle>
            </DialogHeader>
            <div className={styles.editorForm}>
              <div className={styles.formGroup}>
                <Label htmlFor="theme-name">Theme Name</Label>
                <Input
                  id="theme-name"
                  value={newTheme.name}
                  onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
                  placeholder="My Awesome Theme"
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="theme-description">Description</Label>
                <Textarea
                  id="theme-description"
                  value={newTheme.description}
                  onChange={(e) => setNewTheme({ ...newTheme, description: e.target.value })}
                  placeholder="A beautiful theme for..."
                />
              </div>

              <div className={styles.colorGrid}>
                <div className={styles.formGroup}>
                  <Label htmlFor="color-neutral">Neutral Color</Label>
                  <Select
                    value={newTheme.colors?.neutral}
                    onValueChange={(value) =>
                      setNewTheme({
                        ...newTheme,
                        colors: { ...newTheme.colors!, neutral: value },
                      })
                    }
                  >
                    <SelectTrigger id="color-neutral">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COLOR_SCALES.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className={styles.formGroup}>
                  <Label htmlFor="color-accent">Accent Color</Label>
                  <Select
                    value={newTheme.colors?.accent}
                    onValueChange={(value) =>
                      setNewTheme({
                        ...newTheme,
                        colors: { ...newTheme.colors!, accent: value },
                      })
                    }
                  >
                    <SelectTrigger id="color-accent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COLOR_SCALES.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className={styles.formGroup}>
                  <Label htmlFor="color-success">Success Color</Label>
                  <Select
                    value={newTheme.colors?.success}
                    onValueChange={(value) =>
                      setNewTheme({
                        ...newTheme,
                        colors: { ...newTheme.colors!, success: value },
                      })
                    }
                  >
                    <SelectTrigger id="color-success">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COLOR_SCALES.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className={styles.formGroup}>
                  <Label htmlFor="color-error">Error Color</Label>
                  <Select
                    value={newTheme.colors?.error}
                    onValueChange={(value) =>
                      setNewTheme({
                        ...newTheme,
                        colors: { ...newTheme.colors!, error: value },
                      })
                    }
                  >
                    <SelectTrigger id="color-error">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COLOR_SCALES.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className={styles.fontGrid}>
                <div className={styles.formGroup}>
                  <Label htmlFor="font-heading">Heading Font</Label>
                  <Select
                    value={newTheme.fonts?.heading}
                    onValueChange={(value) =>
                      setNewTheme({
                        ...newTheme,
                        fonts: { ...newTheme.fonts!, heading: value, display: value, subheading: value },
                      })
                    }
                  >
                    <SelectTrigger id="font-heading">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_OPTIONS.map((font) => (
                        <SelectItem key={font} value={font}>
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className={styles.formGroup}>
                  <Label htmlFor="font-body">Body Font</Label>
                  <Select
                    value={newTheme.fonts?.body}
                    onValueChange={(value) =>
                      setNewTheme({
                        ...newTheme,
                        fonts: { ...newTheme.fonts!, body: value, caption: value },
                      })
                    }
                  >
                    <SelectTrigger id="font-body">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_OPTIONS.map((font) => (
                        <SelectItem key={font} value={font}>
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="theme-thumbnail">Thumbnail URL (optional)</Label>
                <Input
                  id="theme-thumbnail"
                  value={newTheme.thumbnail}
                  onChange={(e) => setNewTheme({ ...newTheme, thumbnail: e.target.value })}
                  placeholder="https://example.com/theme-preview.jpg"
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="custom-css">Custom CSS (optional)</Label>
                <Textarea
                  id="custom-css"
                  value={newTheme.customCSS}
                  onChange={(e) => setNewTheme({ ...newTheme, customCSS: e.target.value })}
                  placeholder=".custom-class { color: red; }"
                  className={styles.formTextarea}
                />
              </div>

              <div className={styles.formActions}>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTheme} disabled={!newTheme.name}>
                  Create Theme
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className={styles.themesGrid}>
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`${styles.themeCard} ${theme.id === activeThemeId ? styles.active : ''}`}
          >
            {theme.id === activeThemeId && (
              <div className={styles.activeBadge}>
                <Check size={12} />
                Active
              </div>
            )}
            <img
              src={theme.thumbnail || 'https://placehold.co/400x300/333/white?text=No+Preview'}
              alt={theme.name}
              className={styles.thumbnail}
            />
            <div className={styles.themeContent}>
              <h3 className={styles.themeName}>{theme.name}</h3>
              <p className={styles.themeDescription}>{theme.description}</p>
              <div className={styles.themeMeta}>
                <div className={styles.metaItem}>
                  <User size={12} />
                  {theme.author}
                </div>
                <div className={styles.metaItem}>
                  <Package size={12} />
                  v{theme.version}
                </div>
              </div>
              <div className={styles.colorPalette}>
                <div
                  className={styles.colorSwatch}
                  style={{ background: `var(--${theme.colors.neutral}-9)` }}
                  data-color="neutral"
                />
                <div
                  className={styles.colorSwatch}
                  style={{ background: `var(--${theme.colors.accent}-9)` }}
                  data-color="accent"
                />
                <div
                  className={styles.colorSwatch}
                  style={{ background: `var(--${theme.colors.success}-9)` }}
                  data-color="success"
                />
                <div
                  className={styles.colorSwatch}
                  style={{ background: `var(--${theme.colors.error}-9)` }}
                  data-color="error"
                />
              </div>
              <div className={styles.themeActions}>
                {theme.id !== activeThemeId && (
                  <Button onClick={() => activateTheme(theme.id)} size="sm">
                    <Palette size={14} />
                    Activate
                  </Button>
                )}
                {!isDefaultTheme(theme.id) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteDialogTheme(theme.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!deleteDialogTheme} onOpenChange={() => setDeleteDialogTheme(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Theme</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this theme? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTheme}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
