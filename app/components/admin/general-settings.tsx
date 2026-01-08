import { useState } from "react";
import { Save, X, Globe, Mail, MapPin, Phone, Clock } from "lucide-react";
import { useCmsDataApi as useCmsData } from "../../hooks/use-cms-data-api";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Textarea } from "../ui/textarea/textarea";
import { Card } from "../ui/card/card";
import { Label } from "../ui/label/label";
import { Separator } from "../ui/separator/separator";
import styles from "./general-settings.module.css";

export function GeneralSettings() {
  const { company, updateCompany } = useCmsData();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    siteTitle: company.name,
    siteTagline: company.tagline,
    adminEmail: company.email,
    timezone: "Asia/Kolkata",
    dateFormat: "F j, Y",
    timeFormat: "g:i a",
    weekStartsOn: "Monday",
  });

  const handleSave = () => {
    updateCompany({
      ...company,
      name: form.siteTitle,
      tagline: form.siteTagline,
      email: form.adminEmail,
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({
      siteTitle: company.name,
      siteTagline: company.tagline,
      adminEmail: company.email,
      timezone: "Asia/Kolkata",
      dateFormat: "F j, Y",
      timeFormat: "g:i a",
      weekStartsOn: "Monday",
    });
    setEditing(false);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>General Settings</h3>
            <p className={styles.cardDescription}>
              Basic site configuration and information
            </p>
          </div>
          {!editing && (
            <Button onClick={() => setEditing(true)}>Edit</Button>
          )}
        </div>

        <Separator />

        {editing ? (
          <div className={styles.form}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Site Information</h4>
              
              <div className={styles.formGroup}>
                <Label htmlFor="site-title">Site Title</Label>
                <Input
                  id="site-title"
                  value={form.siteTitle}
                  onChange={(e) => setForm({ ...form, siteTitle: e.target.value })}
                />
                <p className={styles.fieldHint}>
                  The name of your site. This will be displayed in browser tabs and search results.
                </p>
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={form.siteTagline}
                  onChange={(e) => setForm({ ...form, siteTagline: e.target.value })}
                />
                <p className={styles.fieldHint}>
                  A short phrase describing your site.
                </p>
              </div>
            </div>

            <Separator />

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Administration</h4>
              
              <div className={styles.formGroup}>
                <Label htmlFor="admin-email">Administrator Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={form.adminEmail}
                  onChange={(e) => setForm({ ...form, adminEmail: e.target.value })}
                />
                <p className={styles.fieldHint}>
                  This email is used for admin purposes. Contact forms and notifications will be sent here.
                </p>
              </div>
            </div>

            <Separator />

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Date & Time</h4>
              
              <div className={styles.formGroup}>
                <Label htmlFor="timezone">Timezone</Label>
                <select
                  id="timezone"
                  value={form.timezone}
                  onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                  className={styles.select}
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (UTC+5:30)</option>
                  <option value="America/New_York">America/New York (UTC-5)</option>
                  <option value="America/Los_Angeles">America/Los Angeles (UTC-8)</option>
                  <option value="Europe/London">Europe/London (UTC+0)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
                </select>
                <p className={styles.fieldHint}>
                  Choose a city in your timezone.
                </p>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <Label htmlFor="date-format">Date Format</Label>
                  <select
                    id="date-format"
                    value={form.dateFormat}
                    onChange={(e) => setForm({ ...form, dateFormat: e.target.value })}
                    className={styles.select}
                  >
                    <option value="F j, Y">January 1, 2024</option>
                    <option value="Y-m-d">2024-01-01</option>
                    <option value="m/d/Y">01/01/2024</option>
                    <option value="d/m/Y">01/01/2024</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <Label htmlFor="time-format">Time Format</Label>
                  <select
                    id="time-format"
                    value={form.timeFormat}
                    onChange={(e) => setForm({ ...form, timeFormat: e.target.value })}
                    className={styles.select}
                  >
                    <option value="g:i a">12:00 pm</option>
                    <option value="H:i">13:00</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="week-starts">Week Starts On</Label>
                <select
                  id="week-starts"
                  value={form.weekStartsOn}
                  onChange={(e) => setForm({ ...form, weekStartsOn: e.target.value })}
                  className={styles.select}
                >
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                </select>
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
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Site Information</h4>
              <div className={styles.displayGrid}>
                <div className={styles.displayItem}>
                  <Label>Site Title</Label>
                  <p>{company.name}</p>
                </div>
                <div className={styles.displayItem}>
                  <Label>Tagline</Label>
                  <p>{company.tagline}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Administration</h4>
              <div className={styles.displayGrid}>
                <div className={styles.displayItem}>
                  <Label>Administrator Email</Label>
                  <p>{company.email}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Date & Time</h4>
              <div className={styles.displayGrid}>
                <div className={styles.displayItem}>
                  <Label>Timezone</Label>
                  <p>{form.timezone}</p>
                </div>
                <div className={styles.displayItem}>
                  <Label>Date Format</Label>
                  <p>{form.dateFormat}</p>
                </div>
                <div className={styles.displayItem}>
                  <Label>Time Format</Label>
                  <p>{form.timeFormat}</p>
                </div>
                <div className={styles.displayItem}>
                  <Label>Week Starts On</Label>
                  <p>{form.weekStartsOn}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
