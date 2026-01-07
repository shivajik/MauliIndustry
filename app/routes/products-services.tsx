import type { Route } from "./+types/products-services";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";
import { useProductsData } from "~/hooks/use-cms-data";
import styles from "./products-services.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products & Services - Mauli Industries" },
    {
      name: "description",
      content:
        "Explore our comprehensive range of industrial products including shearing blades, gearboxes, hydraulic cylinders, and more.",
    },
  ];
}

export default function ProductsServices() {
  const productCategories = useProductsData();

  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Products & Services</h1>
        <p className={styles.heroSubtitle}>Comprehensive Industrial Solutions for Steel & Rolling Mill Industries</p>
      </section>

      <section className={styles.section}>
        <div className={styles.productsGrid}>
          {productCategories.length > 0 ? productCategories.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img src={product.imageUrl || (product as any).image} alt={product.name} className={styles.productImage} />
              <div className={styles.productContent}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
              </div>
            </div>
          )) : (
            <p className={styles.noProducts}>No products available.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
