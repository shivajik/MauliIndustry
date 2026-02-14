import { useState } from "react";
import { Link, useParams } from "react-router";
import { productCategories } from "~/data/products";
import { ChevronRight, List, X } from "lucide-react";
import classNames from "classnames";
import styles from "./product-sidebar.module.css";

export function ProductSidebar() {
  const { id: activeCategory, subId: activeSubProduct } = useParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(activeCategory ? [activeCategory] : [])
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const sidebarContent = (
    <>
      <div className={styles.sidebarTitle}>Product Range</div>
      {productCategories.map((category) => {
        const isActive = activeCategory === category.id && !activeSubProduct;
        const isExpanded = expandedCategories.has(category.id);
        const hasSubs = category.subProducts && category.subProducts.length > 0;

        return (
          <div key={category.id} className={styles.categoryItem}>
            <div
              className={classNames(styles.categoryButton, {
                [styles.categoryButtonActive]: activeCategory === category.id,
              })}
              role="button"
              tabIndex={0}
              onClick={() => {
                if (hasSubs) toggleCategory(category.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && hasSubs) toggleCategory(category.id);
              }}
            >
              <Link
                to={`/products/${category.id}`}
                style={{ color: "inherit", textDecoration: "none", flex: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileOpen(false);
                }}
              >
                {category.name}
              </Link>
              {hasSubs && (
                <ChevronRight
                  size={16}
                  className={classNames(styles.chevronIcon, {
                    [styles.chevronIconOpen]: isExpanded,
                  })}
                />
              )}
            </div>

            {hasSubs && isExpanded && (
              <ul className={styles.subList}>
                {category.subProducts!.map((sub) => (
                  <li key={sub.id} className={styles.subItem}>
                    <Link
                      to={`/products/${category.id}/${sub.id}`}
                      className={classNames(styles.subLink, {
                        [styles.subLinkActive]:
                          activeCategory === category.id && activeSubProduct === sub.id,
                      })}
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </>
  );

  return (
    <>
      <button
        className={styles.mobileToggle}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle product navigation"
      >
        {mobileOpen ? <X size={22} /> : <List size={22} />}
      </button>

      {mobileOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={classNames(styles.sidebar, {
          [styles.sidebarOpen]: mobileOpen,
        })}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
