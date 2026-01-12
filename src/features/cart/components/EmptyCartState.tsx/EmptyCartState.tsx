import React from 'react';
import styles from './EmptyCartState.module.css';
import { Icon } from '../../../../shared/ui';

interface EmptyCartStateProps {
  onContinueShopping: () => void;
}

const EmptyCartState: React.FC<EmptyCartStateProps> = ({ onContinueShopping }) => {
  return (
    <div className={styles.emptyCart}>
      <div className={styles.iconWrapper}>
        <Icon name="shopping_cart" />
      </div>

      <h3 className={styles.title}>Tu carrito está vacío</h3>

      <p className={styles.description}>
        Aún no has agregado productos. Explora nuestra tienda y encuentra lo que necesitas.
      </p>

      <button
        className={styles.shopButton}
        onClick={onContinueShopping}
      >
        Explorar productos
      </button>
    </div>
  );
};

export default EmptyCartState;
