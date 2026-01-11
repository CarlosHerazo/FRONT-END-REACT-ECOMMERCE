import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../../features/products/hooks';
import ProductDetail from '../../features/products/components/DetailProduct/DetailProduct';
import styles from './ProductDetailPage.module.css'; // Crea este archivo CSS

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id || '');

  const handleAddToCart = (productId: string) => {
    console.log('Added to cart:', productId);
  };

  const handleBuyNow = (productId: string) => {
    console.log('Buy now:', productId);
  };

  const handleQuantityChange = (quantity: number) => {
    console.log('Quantity changed:', quantity);
  };

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
          <h2 className={styles.errorTitle}>Error loading product</h2>
          <p className={styles.errorMessage}>{error.message}</p>
          <button
            onClick={() => navigate('/')}
            className={styles.errorButton}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.notFoundContainer}>
          <h2 className={styles.notFoundTitle}>Product not found</h2>
          <p className={styles.notFoundMessage}>
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/')}
            className={styles.notFoundButton}
          >
            Back to Home
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
      />
    </div>
  );
};