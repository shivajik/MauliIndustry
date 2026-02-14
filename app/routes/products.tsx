import { Link } from "react-router";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";
import { productCategories } from "~/data/products";
import styles from "./products.module.css";

export function meta() {
  return [
    { title: "Our Products - Mauli Industries" },
    {
      name: "description",
      content: "Explore our comprehensive range of industrial products including shearing blades, gearboxes, hydraulic cylinders, and more.",
    },
  ];
}

export default function Products() {
  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Our Products</h1>
        <p className={styles.heroSubtitle}>Precision Industrial Components for Steel & Rolling Mill Industries</p>
      </section>

      <section className={styles.section}>
        <div className={styles.productsGrid}>
          {productCategories.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className={styles.productCard}>
              <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
              <div className={styles.productContent}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
