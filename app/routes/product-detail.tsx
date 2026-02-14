import { useState } from "react";
import { useParams, Link } from "react-router";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";
import { productCategories, type SubProduct } from "~/data/products";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
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

function SubProductCard({ sub, index }: { sub: SubProduct; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`${styles.subProductCard} ${expanded ? styles.subProductCardExpanded : ""}`}>
      <button
        className={styles.subProductHeader}
        onClick={() => sub.specs && sub.specs.length > 0 && setExpanded(!expanded)}
        type="button"
      >
        <span className={styles.subProductNumber}>{index + 1}</span>
        <div className={styles.subProductInfo}>
          <span className={styles.subProductName}>{sub.name}</span>
          <p className={styles.subProductDesc}>{sub.description}</p>
        </div>
        {sub.specs && sub.specs.length > 0 && (
          <span className={styles.expandIcon}>
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </span>
        )}
      </button>
      {expanded && sub.specs && (
        <div className={styles.specTableWrap}>
          <table className={styles.specTable}>
            <thead>
              <tr>
                <th>Particular</th>
                <th>Specifications</th>
              </tr>
            </thead>
            <tbody>
              {sub.specs.map((row, i) => (
                <tr key={i}>
                  <td>{row.Particular}</td>
                  <td>{row.Specifications}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
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

            {product.specs && product.specs.length > 0 && (
              <div className={styles.mainSpecSection}>
                <h3 className={styles.specSectionTitle}>Specifications</h3>
                <table className={styles.specTable}>
                  <thead>
                    <tr>
                      <th>Particular</th>
                      <th>Specifications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.specs.map((row, i) => (
                      <tr key={i}>
                        <td>{row.Particular}</td>
                        <td>{row.Specifications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {product.subProducts && product.subProducts.length > 0 && (
          <div className={styles.subProductsSection}>
            <h2 className={styles.subProductsTitle}>
              Product Range & Variants
            </h2>
            <div className={styles.subProductsGrid}>
              {product.subProducts.map((sub, i) => (
                <SubProductCard key={i} sub={sub} index={i} />
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
