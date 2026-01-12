import ProductDetail from '../../features/products/components/DetailProduct/DetailProduct';
import { useProductDetailPage } from '../../features/products/hooks/useProductDetail';
import styles from './ProductDetailPage.module.css';

export const ProductDetailPage = () => {
  const {
    product,
    loading,
    error,
    quantity,
    handleQuantityChange,
    handleAddToCart,
    handleBuyNow,
    handleGoHome,
  } = useProductDetailPage();

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.skeleton}>
          <div className={`${styles.skeletonBreadcrumb} ${styles.skeletonAnimated}`}></div>
          <div className={styles.skeletonGrid}>
            <div className={`${styles.skeletonImage} ${styles.skeletonAnimated}`}></div>
            <div className={styles.skeletonInfo}>
              <div className={`${styles.skeletonTitle} ${styles.skeletonAnimated}`}></div>
              <div className={`${styles.skeletonSubtitle} ${styles.skeletonAnimated}`}></div>
              <div className={`${styles.skeletonDescription} ${styles.skeletonAnimated}`}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Error al cargar el producto</h2>
          <p className={styles.errorMessage}>{error.message}</p>
          <button onClick={handleGoHome} className={styles.errorButton}>
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.notFoundContainer}>
          <h2 className={styles.notFoundTitle}>Producto no encontrado</h2>
          <p className={styles.notFoundMessage}>
            El producto que buscas no existe.
          </p>
          <button onClick={handleGoHome} className={styles.notFoundButton}>
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ProductDetail
        product={product}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onQuantityChange={handleQuantityChange}
        quantity={quantity}
      />
    </div>
  );
};
