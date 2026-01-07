import { useState } from "react";
import { Palette, Menu, LayoutGrid, Settings, Image, Type, Monitor } from "lucide-react";
import { Card } from "../ui/card/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs/tabs";
import { ThemeManager } from "./theme-manager";
import { WidgetManager } from "./widget-manager";
import { MenuManager } from "./menu-manager";
import { SiteIdentitySettings } from "./site-identity-settings";
import styles from "./appearance-settings.module.css";

type AppearanceTab = "themes" | "menus" | "widgets" | "identity" | "customizer";

interface AppearanceSettingsProps {
  initialSection?: string;
}

export function AppearanceSettings({ initialSection }: AppearanceSettingsProps) {
  const [activeTab, setActiveTab] = useState<AppearanceTab>((initialSection as AppearanceTab) || "identity");

  const appearanceTabs = [
    { id: "identity" as AppearanceTab, label: "Site Identity", icon: Image, description: "Site title, logo, and icon" },
    { id: "themes" as AppearanceTab, label: "Themes", icon: Palette, description: "Customize colors and styles" },
    { id: "menus" as AppearanceTab, label: "Menus", icon: Menu, description: "Manage navigation menus" },
    { id: "widgets" as AppearanceTab, label: "Widgets", icon: LayoutGrid, description: "Add and arrange widgets" },
    { id: "customizer" as AppearanceTab, label: "Additional CSS", icon: Type, description: "Add custom styling" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Appearance</h2>
          <p className={styles.subtitle}>Customize the look and feel of your website</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <nav className={styles.sidebarNav}>
            {appearanceTabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.sidebarItem} ${activeTab === tab.id ? styles.sidebarItemActive : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={18} className={styles.sidebarIcon} />
                <div className={styles.sidebarContent}>
                  <span className={styles.sidebarLabel}>{tab.label}</span>
                  <span className={styles.sidebarDescription}>{tab.description}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        <div className={styles.main}>
          {activeTab === "identity" && <SiteIdentitySettings />}
          {activeTab === "themes" && <ThemeManager />}
          {activeTab === "menus" && <MenuManager />}
          {activeTab === "widgets" && <WidgetManager />}
          {activeTab === "customizer" && <CustomCSSEditor />}
        </div>
      </div>
    </div>
  );
}

function CustomCSSEditor() {
  const [customCSS, setCustomCSS] = useState("");

  return (
    <div className={styles.section}>
      <Card className={styles.card}>
        <h3 className={styles.cardTitle}>Additional CSS</h3>
        <p className={styles.cardDescription}>
          Add custom CSS to personalize your site's appearance. Changes will be applied site-wide.
        </p>
        <div className={styles.formGroup}>
          <textarea
            className={styles.codeEditor}
            value={customCSS}
            onChange={(e) => setCustomCSS(e.target.value)}
            placeholder={`/* Add your custom CSS here */\n\n.my-custom-class {\n  color: var(--color-accent-9);\n}`}
            rows={15}
            spellCheck={false}
          />
        </div>
        <div className={styles.editorHint}>
          <Monitor size={14} />
          <span>Changes will be previewed in real-time on your site</span>
        </div>
      </Card>
    </div>
  );
}
