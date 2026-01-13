import React from 'react';
import { type CartItemProps } from './CartItem.types';
import styles from './CartItem.module.css';
import Icon from '../../../../shared/ui/Icon';
import { formatPrice } from '../../../../utils/utils';

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}) => {
  const handleIncrease = () => {
    console.log(item.quantity, item.stock);
    onUpdateQuantity(item.id, item.quantity + 1);

  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemInfo}>
        <div 
          className={styles.itemImage}
          style={{ backgroundImage: `url(${item.imageUrl})` }}
          role="img"
          aria-label={item.name}
        />
        <div className={styles.itemDetails}>
          <h3 className={styles.itemName}>{item.name}</h3>
          <p className={styles.itemSku}>SKU: {item.sku}</p>
          <p className={styles.itemPrice}>{formatPrice(item.price)}</p>
        </div>
      </div>

      <div className={styles.itemControls}>
        <div className={styles.quantityControls}>
          <button
            className={styles.quantityButton}
            onClick={handleDecrease}
            aria-label="Decrease quantity"
            disabled={item.quantity <= 1}
          >
            <Icon name="remove" />
          </button>
          <span className={styles.quantityValue}>{item.quantity}</span>
          <button
            className={styles.quantityButton}
            onClick={handleIncrease}
            aria-label="Increase quantity"
            disabled={item.quantity >= item.stock}
          >
            <Icon name="add" />
          </button>
        </div>

        <button
          className={styles.removeButton}
          onClick={handleRemove}
          aria-label="Remove item from cart"
        >
          <Icon name="delete" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;