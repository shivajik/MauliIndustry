import type { Route } from "./+types/about";
import { Building2, Target, Eye, History } from "lucide-react";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";
import { useCompanyData, usePagesData } from "~/hooks/use-cms-data";
import styles from "./about.module.css";

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

export default function About() {
  const company = useCompanyData();
  const pages = usePagesData();
  const aboutPage = pages.find(p => p.slug === 'about' && p.status === 'published');

  // Parse the HTML content from CMS
  const parseAboutContent = (content: string) => {
    const sections = {
      profile: company.profile.brief,
      mission: company.profile.mission,
      vision: company.profile.vision,
      history: company.profile.history
    };

    if (!content || typeof window === 'undefined') return sections;

    // Extract text from HTML headings and content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    const headings = doc.querySelectorAll('h1, h2, h3');
    
    headings.forEach((heading) => {
      const text = heading.textContent || '';
      let nextElement = heading.nextElementSibling;
      const contentParts: string[] = [];
      
      // Collect content until next heading
      while (nextElement && !nextElement.matches('h1, h2, h3')) {
        if (nextElement.textContent?.trim()) {
          contentParts.push(nextElement.textContent.trim());
        }
        nextElement = nextElement.nextElementSibling;
      }
      
      const sectionContent = contentParts.join('\n\n');
      
      if (text.toLowerCase().includes('company profile')) {
        sections.profile = sectionContent || sections.profile;
      } else if (text.toLowerCase().includes('mission')) {
        sections.mission = sectionContent || sections.mission;
      } else if (text.toLowerCase().includes('vision')) {
        sections.vision = sectionContent || sections.vision;
      } else if (text.toLowerCase().includes('history')) {
        sections.history = sectionContent || sections.history;
      }
    });

    return sections;
  };

  const sections = parseAboutContent(aboutPage?.content || '');

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
