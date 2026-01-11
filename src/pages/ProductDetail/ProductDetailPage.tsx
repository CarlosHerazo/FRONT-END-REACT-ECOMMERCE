import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useProduct } from '../../features/products/hooks';
import ProductDetail from '../../features/products/components/DetailProduct/DetailProduct';
import { useAppDispatch } from '../../store/hooks';
import { addItem } from '../../features/cart/store/cartSlice';
import { useToast } from '../../shared/ui/Toast';
import styles from './ProductDetailPage.module.css';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showSuccess, showInfo } = useToast();
  const { product, loading, error } = useProduct(id || '');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (productId: string) => {
    if (!product) return;

    // Add items to cart based on quantity
    for (let i = 0; i < quantity; i++) {
      dispatch(addItem({
        id: product.id,
        name: product.name,
        sku: `SKU-${product.id}`,
        price: product.price,
        imageUrl: product.imgUrl,
        description: product.description,
      }));
    }

    showSuccess(`${quantity} x ${product.name} added to cart!`);
  };

  const handleBuyNow = (productId: string) => {
    if (!product) return;

    // Add items to cart
    for (let i = 0; i < quantity; i++) {
      dispatch(addItem({
        id: product.id,
        name: product.name,
        sku: `SKU-${product.id}`,
        price: product.price,
        imageUrl: product.imgUrl,
        description: product.description,
      }));
    }

    showInfo('Redirecting to cart...');

    // Navigate to cart page
    setTimeout(() => {
      navigate('/cart');
    }, 500);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
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