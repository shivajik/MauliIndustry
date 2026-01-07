import type { Route } from "./+types/about";
import { Building2, Target, Eye, History } from "lucide-react";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";
import { getCompanyInfo, getPages } from "~/lib/db";
import styles from "./about.module.css";

export async function loader() {
  const [company, pages] = await Promise.all([
    getCompanyInfo(),
    getPages(),
  ]);
  return { company, pages };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us - Mauli Industries" },
    {
      name: "description",
      content:
        "Learn about Mauli Industries - ISO 9001:2015 certified precision tool room with 20+ years of experience.",
    },
  ];
}

export default function About({ loaderData }: Route.ComponentProps) {
  const { company, pages } = loaderData;
  const aboutPage = pages.find((p: any) => p.slug === 'about' && p.status === 'published');

  const sections = {
    profile: company.profile_brief || '',
    mission: company.profile_mission || '',
    vision: company.profile_vision || '',
    history: company.profile_history || ''
  };

  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>{aboutPage?.title || `About ${company.name}`}</h1>
        <p className={styles.heroSubtitle}>{aboutPage?.excerpt || "Excellence in Precision Engineering Since 20+ Years"}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Building2 className={styles.sectionIcon} size={32} />
          Company Profile
        </h2>
        <div className={styles.sectionText}>
          {sections.profile.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <section className={styles.cardsSection}>
        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <Target className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Our Mission</h3>
            <div className={styles.cardText}>
              {sections.mission.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <Eye className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Our Vision</h3>
            <div className={styles.cardText}>
              {sections.vision.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <History className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Our History</h3>
            <div className={styles.cardText}>
              {sections.history.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
