import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import { type ProductCardProps } from './ProductCard.types';
import styles from './ProductCard.module.css';
import Icon from '../../../../shared/ui/Icon';
import { formatPrice } from '../../../../utils/utils';

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart,
  onToggleFavorite,
}) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Previene la navegación del Link
    e.stopPropagation(); // Previene la propagación del evento
    onAddToCart?.(product.id);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Previene la navegación del Link
    e.stopPropagation(); // Previene la propagación al contenedor
    onToggleFavorite?.(product.id);
  };

  // Formatear precio


  return (
    // Usando Link para navegación
    <Link 
      to={`/products/${product.id}`} 
      className={styles.productCardLink}
    >
      <div className={styles.productCard}>
        <div className={styles.imageContainer}>
          <div
            className={styles.productImage}
            style={{ backgroundImage: `url(${product.imgUrl})` }}
            role="img"
            aria-label={product.name}
          />

          <button
            className={styles.favoriteButton}
            onClick={handleToggleFavorite}
            aria-label="Add to favorites"
            type="button"
          >
            <Icon name="favorite" />
          </button>
        </div>

        <div className={styles.productInfo}>
          <div className={styles.categoryRating}>
            <span className={styles.category}>{product.category || 'Uncategorized'}</span>
            <div className={styles.rating}>
              <Icon name="star" />
              <span className={styles.ratingValue}>
                {product.rating?.toFixed(1) || 'N/A'}
              </span>
            </div>
          </div>

          <h3 className={styles.productName}>{product.name}</h3>

          <div className={styles.priceCart}>
            <span className={styles.price}>${formatPrice(product.price)}</span>
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
              aria-label="Add to cart"
              type="button"
            >
              <Icon name="add_shopping_cart" />
            </button>
          </div>
        </div>
      </div>
    </Link>
    
   
  );
};

export default ProductCard;