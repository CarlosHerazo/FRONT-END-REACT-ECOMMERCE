import React, { useState } from 'react';
import { type CartSummaryProps } from './CartSummary.types';
import styles from './CartSummary.module.css';
import Icon from '../../../../shared/ui/Icon';

const CartSummary: React.FC<CartSummaryProps> = ({ 
  summary, 
  onCheckout,
  onApplyPromoCode 
}) => {
  const [promoCode, setPromoCode] = useState('');

  const handleApplyPromo = () => {
    if (promoCode.trim() && onApplyPromoCode) {
      onApplyPromoCode(promoCode.trim());
      setPromoCode('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyPromo();
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const isFreeShipping = summary.shipping === 0;

  return (
    <div className={styles.cartSummary}>
      <h2 className={styles.summaryTitle}>Order Summary</h2>
      
      <div className={styles.summaryDetails}>
        <div className={styles.summaryRow}>
          <span className={styles.rowLabel}>Subtotal</span>
          <span className={styles.rowValue}>{formatPrice(summary.subtotal)}</span>
        </div>
        
        <div className={styles.summaryRow}>
          <span className={styles.rowLabel}>Shipping</span>
          <span className={`${styles.rowValue} ${isFreeShipping ? styles.freeShipping : ''}`}>
            {isFreeShipping ? 'FREE' : formatPrice(summary.shipping)}
          </span>
        </div>
        
        <div className={styles.summaryRow}>
          <span className={styles.rowLabel}>Estimated Tax</span>
          <span className={styles.rowValue}>{formatPrice(summary.tax)}</span>
        </div>
        
        <div className={styles.totalRow}>
          <div className={styles.totalLabel}>
            <span className={styles.totalText}>Total</span>
          </div>
          <div className={styles.totalAmount}>
            <span className={styles.totalValue}>{formatPrice(summary.total)}</span>
            <span className={styles.currency}>COP</span>
          </div>
        </div>
      </div>

      <button
        className={styles.checkoutButton}
        onClick={onCheckout}
        disabled={!onCheckout}
        aria-label="Proceed to checkout"
      >
        <span>Proceed to Checkout</span>
        <Icon name="arrow_forward" />
      </button>

      <div className={styles.promoSection}>
        <div className={styles.promoInputWrapper}>
          <input
            className={styles.promoInput}
            type="text"
            placeholder="Promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            onKeyPress={handleKeyPress}
            aria-label="Enter promo code"
          />
          <button 
            className={styles.promoButton}
            onClick={handleApplyPromo}
            disabled={!promoCode.trim()}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;