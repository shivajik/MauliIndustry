import { useState } from "react";
import { Save, X, Globe, Image as ImageIcon } from "lucide-react";
import { useCmsDataApi as useCmsData } from "../../hooks/use-cms-data-api";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Textarea } from "../ui/textarea/textarea";
import { Card } from "../ui/card/card";
import { Label } from "../ui/label/label";
import styles from "./site-identity-settings.module.css";

export function SiteIdentitySettings() {
  const { company, updateCompany } = useCmsData();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: company.name,
    tagline: company.tagline,
    description: company.description,
    logo: "",
    favicon: "",
  });

  const handleSave = () => {
    updateCompany({ ...company, ...form });
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({
      name: company.name,
      tagline: company.tagline,
      description: company.description,
      logo: "",
      favicon: "",
    });
    setEditing(false);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Site Identity</h3>
            <p className={styles.cardDescription}>
              Manage your site's title, tagline, and branding
            </p>
          </div>
          {!editing && (
            <Button onClick={() => setEditing(true)}>Edit</Button>
          )}
        </div>

        {editing ? (
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <Label htmlFor="site-title">Site Title</Label>
              <Input
                id="site-title"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="My Awesome Site"
              />
              <p className={styles.fieldHint}>
                In most themes, the site title is displayed in the header.
              </p>
            </div>

            <div className={styles.formGroup}>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                placeholder="Just another great website"
              />
              <p className={styles.fieldHint}>
                In a few words, explain what this site is about.
              </p>
            </div>

            <div className={styles.formGroup}>
              <Label htmlFor="description">Site Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="A detailed description of your site..."
                rows={4}
              />
              <p className={styles.fieldHint}>
                This text may be used in SEO and site descriptions.
              </p>
            </div>

            <div className={styles.separator} />

            <div className={styles.mediaSection}>
              <h4 className={styles.sectionTitle}>Site Logo</h4>
              <div className={styles.mediaUpload}>
                <div className={styles.mediaPreview}>
                  {form.logo ? (
                    <img src={form.logo} alt="Site logo" className={styles.logoPreview} />
                  ) : (
                    <div className={styles.mediaPlaceholder}>
                      <ImageIcon size={32} />
                      <span>No logo set</span>
                    </div>
                  )}
                </div>
                <div className={styles.mediaActions}>
                  <Input
                    placeholder="Enter logo URL"
                    value={form.logo}
                    onChange={(e) => setForm({ ...form, logo: e.target.value })}
                  />
                  <p className={styles.fieldHint}>
                    Upload a logo or enter a URL. Recommended size: 200x80px
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.separator} />

            <div className={styles.mediaSection}>
              <h4 className={styles.sectionTitle}>Site Icon (Favicon)</h4>
              <div className={styles.mediaUpload}>
                <div className={styles.mediaPreview}>
                  {form.favicon ? (
                    <img src={form.favicon} alt="Site icon" className={styles.faviconPreview} />
                  ) : (
                    <div className={styles.mediaPlaceholder} style={{ width: "64px", height: "64px" }}>
                      <Globe size={24} />
                    </div>
                  )}
                </div>
                <div className={styles.mediaActions}>
                  <Input
                    placeholder="Enter favicon URL"
                    value={form.favicon}
                    onChange={(e) => setForm({ ...form, favicon: e.target.value })}
                  />
                  <p className={styles.fieldHint}>
                    Site Icons are what you see in browser tabs and bookmarks. Size: 512x512px or larger, square.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.formActions}>
              <Button onClick={handleSave}>
                <Save size={16} />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X size={16} />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.displayView}>
            <div className={styles.displayGroup}>
              <Label>Site Title</Label>
              <p className={styles.displayValue}>{company.name}</p>
            </div>

            <div className={styles.displayGroup}>
              <Label>Tagline</Label>
              <p className={styles.displayValue}>{company.tagline}</p>
            </div>

            <div className={styles.displayGroup}>
              <Label>Description</Label>
              <p className={styles.displayValue}>{company.description}</p>
            </div>
          </div>
        )}
      </Card>

      <Card className={styles.card}>
        <h3 className={styles.cardTitle}>Preview</h3>
        <p className={styles.cardDescription}>
          See how your site identity appears to visitors
        </p>
        <div className={styles.preview}>
          <div className={styles.previewBrowser}>
            <div className={styles.previewBrowserBar}>
              <div className={styles.previewBrowserDots}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.previewBrowserUrl}>
                <Globe size={12} />
                <span>yoursite.com</span>
              </div>
            </div>
            <div className={styles.previewContent}>
              <div className={styles.previewHeader}>
                <h1 className={styles.previewTitle}>{form.name}</h1>
                <p className={styles.previewTagline}>{form.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
