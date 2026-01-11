import React from 'react';
import type { CartItem } from '../../../cart/types/cart.types';
import styles from './OrderSummary.module.css';
import Icon from '../../../../shared/ui/Icon';
import { formatPrice } from '../../../../utils/utils';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
}) => {

  return (
    <div className={styles.orderSummary}>
      <h3 className={styles.summaryTitle}>Order Summary</h3>

      <div className={styles.itemsList}>
        {items.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemImage}>
              <img src={item.imageUrl} alt={item.name} />
            </div>
            <div className={styles.itemDetails}>
              <h4 className={styles.itemName}>{item.name}</h4>
              <p className={styles.itemSku}>SKU: {item.sku}</p>
              <p className={styles.itemQuantity}>Qty: {item.quantity}</p>
            </div>
            <div className={styles.itemPrice}>
              {formatPrice(item.totalPrice)}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.divider} />

      <div className={styles.summaryDetails}>
        <div className={styles.summaryRow}>
          <span className={styles.rowLabel}>Subtotal</span>
          <span className={styles.rowValue}>{formatPrice(subtotal)}</span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.rowLabel}>Shipping</span>
          <span className={`${styles.rowValue} ${shipping === 0 ? styles.freeShipping : ''}`}>
            {shipping === 0 ? 'FREE' : formatPrice(shipping)}
          </span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.rowLabel}>Tax</span>
          <span className={styles.rowValue}>{formatPrice(tax)}</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total</span>
          <div className={styles.totalAmount}>
            <span className={styles.totalValue}>{formatPrice(total)}</span>
            <span className={styles.currency}>COP</span>
          </div>
        </div>
      </div>

      <div className={styles.securePayment}>
        <Icon name="lock" />
        <span>Secure Payment</span>
      </div>
    </div>
  );
};
