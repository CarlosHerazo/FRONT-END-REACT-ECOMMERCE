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
  discount?: number;
  promoCode?: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
  discount = 0,
  promoCode = '',
}) => {

  return (
    <div className={styles.orderSummary}>
      <h3 className={styles.summaryTitle}>Resumen del Pedido</h3>

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
          <span className={styles.rowLabel}>Envío</span>
          <span className={`${styles.rowValue} ${shipping === 0 ? styles.freeShipping : ''}`}>
            {shipping === 0 ? 'GRATIS' : formatPrice(shipping)}
          </span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.rowLabel}>Impuesto estimado</span>
          <span className={styles.rowValue}>{formatPrice(tax)}</span>
        </div>

        {discount > 0 && (
          <div className={styles.summaryRow}>
            <span className={styles.rowLabel}>Descuento {promoCode && `(${promoCode})`}</span>
            <span className={styles.rowValue}>-{formatPrice(discount)}</span>
          </div>
        )}

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
        <span>Pago Seguro</span>
      </div>
    </div>
  );
};
