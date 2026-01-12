import React from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import type { Product } from '../../types';
import styles from './ProductsGrid.module.css';

interface ProductsGridProps {
  products: Product[];
  onAddToCart: (productId: string) => void;
  onToggleFavorite: (productId: string) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  onAddToCart,
  onToggleFavorite
}) => {
  return (
    <div className={styles.gridContainer}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
