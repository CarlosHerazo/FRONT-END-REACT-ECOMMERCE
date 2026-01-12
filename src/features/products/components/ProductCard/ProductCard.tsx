import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import { type ProductCardProps } from './ProductCard.types';
import styles from './ProductCard.module.css';
import Icon from '../../../../shared/ui/Icon';
import { formatPrice } from '../../../../utils/utils';

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart,
  onToggleFavorite,
}) => {

  // Función para agregar al carrito sin navegar a la página de detalles
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita que el Link nos lleve a /products/:id
    e.stopPropagation(); // Evita que el click "suba" al contenedor padre
    onAddToCart?.(product.id);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(product.id);
  };

  return (
    <Link 
      to={`/products/${product.id}`} 
      className={styles.productCardLink}
    >
      <div className={styles.productCard}>
        {/* Contenedor de Imagen (Optimizado para LCP) */}
        <div className={styles.imageContainer}>
          <img
            src={product.imgUrl}
            alt={product.name}
            className={styles.productImage}
            fetchPriority="high" 
            loading="eager" 
          />
          <button
            className={styles.favoriteButton}
            onClick={handleToggleFavorite}
            type="button"
            aria-label="Agregar a favoritos"
          >
            <Icon name="favorite" />
          </button>
        </div>

        {/* Información del Producto */}
        <div className={styles.productInfo}>
          <div className={styles.categoryRating}>
            <span className={styles.category}>{product.category || 'General'}</span>
            <div className={styles.rating}>
              <Icon name="star" />
              <span>{product.rating?.toFixed(1) || '0.0'}</span>
            </div>
          </div>

          <h3 className={styles.productName}>{product.name}</h3>

          <div className={styles.priceCart}>
            {/* Formateamos el precio usando tu utilidad */}
            <span className={styles.price}>${formatPrice(product.price)}</span>
            
            {/* BOTÓN AGREGAR AL CARRITO */}
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
              type="button"
              aria-label="Agregar al carrito"
            >
              <Icon name="add_shopping_cart" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};