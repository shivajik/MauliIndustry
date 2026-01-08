import type { Route } from "./+types/contact";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";
import { dbService } from "~/lib/services/database";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { Textarea } from "~/components/ui/textarea/textarea";
import { Label } from "~/components/ui/label/label";
import styles from "./contact.module.css";

export async function loader() {
  const [company, pages] = await Promise.all([
    dbService.getCompanyInfo(),
    dbService.getPages(),
  ]);
  return { company, pages };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Us - Mauli Industries" },
    {
      name: "description",
      content: "Get in touch with Mauli Industries. Located in MIDC Waluj, Aurangabad, Maharashtra.",
    },
  ];
}

export default function Contact({ loaderData }: Route.ComponentProps) {
  const { company, pages } = loaderData;
  const contactPage = pages.find((p: any) => p.slug === 'contact' && p.status === 'published');

  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>{contactPage?.title || "Contact Us"}</h1>
        <p className={styles.heroSubtitle}>{contactPage?.excerpt || "We're Here to Help You"}</p>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <MapPin className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Our Location</h3>
            <div className={styles.cardContent}>
              <div className={styles.contactItem}>
                <MapPin className={styles.contactItemIcon} size={20} />
                <div>
                  <div>{company.address_line1}</div>
                  <div>{company.address_line2}</div>
                  <div>{company.address_country}</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <Phone className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Phone</h3>
            <div className={styles.cardContent}>
              <div className={styles.contactItem}>
                <Phone className={styles.contactItemIcon} size={20} />
                <a href={`tel:${company.phone}`} className={styles.link}>
                  {company.phone}
                </a>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <Mail className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Email</h3>
            <div className={styles.cardContent}>
              <div className={styles.contactItem}>
                <Mail className={styles.contactItemIcon} size={20} />
                <a href={`mailto:${company.email}`} className={styles.link}>
                  {company.email}
                </a>
              </div>
              <div className={styles.contactItem}>
                <Mail className={styles.contactItemIcon} size={20} />
                <span>sales@mauliindustries.co.in</span>
              </div>
              <div className={styles.contactItem}>
                <Mail className={styles.contactItemIcon} size={20} />
                <span>support@mauliindustries.co.in</span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <Globe className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Website</h3>
            <div className={styles.cardContent}>
              <div className={styles.contactItem}>
                <Globe className={styles.contactItemIcon} size={20} />
                <a
                  href={`https://${company.website}`}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {company.website}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Send Us a Message</h2>
          <p className={styles.formSubtitle}>Fill out the form below and we'll get back to you soon</p>
          
          <form className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" name="name" required placeholder="Your name" />
              </div>
              
              <div className={styles.formGroup}>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required placeholder="your.email@example.com" />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+91 1234567890" />
            </div>
            
            <div className={styles.formGroup}>
              <Label htmlFor="subject">Subject *</Label>
              <Input id="subject" name="subject" required placeholder="How can we help?" />
            </div>
            
            <div className={styles.formGroup}>
              <Label htmlFor="message">Message *</Label>
              <Textarea id="message" name="message" required placeholder="Tell us more about your requirements..." rows={6} />
            </div>
            
            <Button type="submit" className={styles.submitButton}>
              Send Message
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
