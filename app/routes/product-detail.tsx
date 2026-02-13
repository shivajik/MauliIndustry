import { useParams, Link } from "react-router";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";
import { productCategories } from "~/data/products";
import { ArrowLeft } from "lucide-react";
import styles from "./product-detail.module.css";

export function meta({ params }: { params: { id: string } }) {
  const product = productCategories.find((p) => p.id === params.id);
  return [
    { title: `${product?.name || "Product"} - Mauli Industries` },
    {
      name: "description",
      content: product?.description || "Product details from Mauli Industries",
    },
  ];
}

export default function ProductDetail() {
  const { id } = useParams();
  const product = productCategories.find((p) => p.id === id);

  if (!product) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.notFound}>
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/products" className={styles.backLink}>
            <ArrowLeft size={18} /> Back to Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.hero}>
        <Link to="/products" className={styles.backLink}>
          <ArrowLeft size={18} /> Back to Products
        </Link>
        <h1 className={styles.heroTitle}>{product.name}</h1>
      </section>

      <section className={styles.content}>
        <div className={styles.productLayout}>
          <div className={styles.imageSection}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className={styles.productImage}
            />
          </div>

          <div className={styles.infoSection}>
            <h2 className={styles.aboutTitle}>About This Product</h2>
            <p className={styles.description}>{product.description}</p>
          </div>
        </div>

        {product.subProducts && product.subProducts.length > 0 && (
          <div className={styles.subProductsSection}>
            <h2 className={styles.subProductsTitle}>
              Product Range & Variants
            </h2>
            <div className={styles.subProductsGrid}>
              {product.subProducts.map((sub, i) => (
                <div key={i} className={styles.subProductCard}>
                  <span className={styles.subProductNumber}>{i + 1}</span>
                  <span className={styles.subProductName}>{sub}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
