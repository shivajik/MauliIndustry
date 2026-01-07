import type { Route } from "./+types/products-services";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";
import { getProducts } from "~/lib/db";
import styles from "./products-services.module.css";

export async function loader() {
  const products = await getProducts();
  return { products };
}

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

export default function ProductsServices({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;

  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Products & Services</h1>
        <p className={styles.heroSubtitle}>Comprehensive Industrial Solutions for Steel & Rolling Mill Industries</p>
      </section>

      <section className={styles.section}>
        <div className={styles.productsGrid}>
          {products.length > 0 ? products.map((product: any) => (
            <div key={product.id} className={styles.productCard}>
              <img src={product.image_url || product.imageUrl || product.image} alt={product.name} className={styles.productImage} />
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
