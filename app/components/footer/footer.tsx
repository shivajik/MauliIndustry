import { Link } from "react-router";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { useCompanyData } from "~/hooks/use-cms-data";
import { useWidgetManager } from "~/hooks/use-widget-manager";
import styles from "./footer.module.css";

const iconMap: Record<string, any> = {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube
};

export function Footer() {
  const company = useCompanyData();
  const { getWidgetsByArea } = useWidgetManager();
  
  const footer1Widgets = getWidgetsByArea("footer-1");
  const footer2Widgets = getWidgetsByArea("footer-2");
  const footer3Widgets = getWidgetsByArea("footer-3");
  const footer4Widgets = getWidgetsByArea("footer-4");
  
  const renderWidget = (widget: any) => {
    switch (widget.type) {
      case "text":
        return (
          <div className={styles.section} key={widget.id}>
            <h3 className={styles.title}>{widget.title}</h3>
            <p className={styles.text}>{widget.content.text}</p>
          </div>
        );
      
      case "html":
        return (
          <div className={styles.section} key={widget.id}>
            <h3 className={styles.title}>{widget.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: widget.content.html }} />
          </div>
        );
      
      case "links":
        return (
          <div className={styles.section} key={widget.id}>
            <h3 className={styles.title}>{widget.title}</h3>
            <ul className={styles.linkList}>
              {widget.content.links?.map((link: any, i: number) => (
                <li key={i}>
                  <Link to={link.url} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      
      case "contact":
        return (
          <div className={styles.section} key={widget.id}>
            <h3 className={styles.title}>{widget.title}</h3>
            {widget.content.contactItems?.map((item: any, i: number) => {
              const IconComponent = iconMap[item.icon] || Mail;
              return (
                <div key={i} className={styles.contactItem}>
                  <IconComponent className={styles.contactIcon} size={20} />
                  <div>{item.text}</div>
                </div>
              );
            })}
          </div>
        );
      
      case "social":
        return (
          <div className={styles.section} key={widget.id}>
            <h3 className={styles.title}>{widget.title}</h3>
            <div className={styles.socialLinks}>
              {widget.content.socialLinks?.map((link: any, i: number) => {
                const IconComponent = iconMap[link.platform] || Facebook;
                return (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {footer1Widgets.length > 0 && footer1Widgets.map(renderWidget)}
          {footer2Widgets.length > 0 && footer2Widgets.map(renderWidget)}
          {footer3Widgets.length > 0 && footer3Widgets.map(renderWidget)}
          {footer4Widgets.length > 0 && footer4Widgets.map(renderWidget)}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p className={styles.credit}>
            Designed & Developed by{" "}
            <a
              href="https://ksoftsolution.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.creditLink}
            >
              KSoft Solution
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
