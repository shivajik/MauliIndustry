import { Link, useLocation } from "react-router";
import { Factory, Menu, X } from "lucide-react";
import { useState } from "react";
import classNames from "classnames";
import { useCompanyData } from "~/hooks/use-cms-data";
import { useMenuManager } from "~/hooks/use-menu-manager";
import styles from "./header.module.css";

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const company = useCompanyData();
  const { getMenuByLocation } = useMenuManager();
  
  const mainMenu = getMenuByLocation("header");
  const navLinks = mainMenu?.items.filter(item => item.enabled).sort((a, b) => a.order - b.order) || [];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <Factory className={styles.logoIcon} />
          <div className={styles.logoText}>
            <span className={styles.logoName}>{company.name}</span>
            <span className={styles.logoTagline}>{company.tagline}</span>
          </div>
        </Link>

        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.url}
              className={classNames(styles.navLink, link.cssClass, {
                [styles.active]: location.pathname === link.url,
              })}
              target={link.openInNewTab ? "_blank" : undefined}
              rel={link.openInNewTab ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button className={styles.mobileMenuButton} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.url}
              className={classNames(styles.navLink, link.cssClass, {
                [styles.active]: location.pathname === link.url,
              })}
              onClick={() => setMobileMenuOpen(false)}
              target={link.openInNewTab ? "_blank" : undefined}
              rel={link.openInNewTab ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
