import { useState } from "react";
import { Settings, Shield, Zap, Link as LinkIcon } from "lucide-react";
import { GeneralSettings } from "./general-settings";
import styles from "./settings-panel.module.css";

type SettingsTab = "general" | "security" | "integrations" | "advanced";

export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");

  const settingsTabs = [
    { id: "general" as SettingsTab, label: "General", icon: Settings, description: "Basic site settings" },
    { id: "security" as SettingsTab, label: "Security", icon: Shield, description: "Password and authentication" },
    { id: "integrations" as SettingsTab, label: "Integrations", icon: LinkIcon, description: "Connect external services" },
    { id: "advanced" as SettingsTab, label: "Advanced", icon: Zap, description: "Performance and technical" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Settings</h2>
          <p className={styles.subtitle}>Configure your site's global settings and preferences</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <nav className={styles.sidebarNav}>
            {settingsTabs.map((tab) => (
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
          {activeTab === "general" && <GeneralSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "integrations" && <IntegrationsSettings />}
          {activeTab === "advanced" && <AdvancedSettings />}
        </div>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className={styles.placeholder}>
      <Shield size={48} className={styles.placeholderIcon} />
      <h3>Security Settings</h3>
      <p>Password management and security options coming soon</p>
    </div>
  );
}

function IntegrationsSettings() {
  return (
    <div className={styles.placeholder}>
      <LinkIcon size={48} className={styles.placeholderIcon} />
      <h3>Integrations</h3>
      <p>Connect with third-party services and APIs</p>
    </div>
  );
}

function AdvancedSettings() {
  return (
    <div className={styles.placeholder}>
      <Zap size={48} className={styles.placeholderIcon} />
      <h3>Advanced Settings</h3>
      <p>Performance optimization and technical configuration</p>
    </div>
  );
}
