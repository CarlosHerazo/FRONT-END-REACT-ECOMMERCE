import React, { useState } from 'react';
import { type CartSummaryProps } from './CartSummary.types';
import styles from './CartSummary.module.css';
import Icon from '../../../../shared/ui/Icon';
import { formatPrice } from '../../../../utils/utils';

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


  const isFreeShipping = summary.subtotal > 20000;

  return (
    <div className={styles.cartSummary}>
      <h2 className={styles.summaryTitle}>Resumen del Pedido</h2>

      <div className={styles.summaryDetails}>
        <div className={styles.summaryRow}>
          <span className={styles.rowLabel}>Subtotal</span>
          <span className={styles.rowValue}>{formatPrice(summary.subtotal)}</span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.rowLabel}>Envío</span>
          <span className={`${styles.rowValue} ${isFreeShipping ? styles.freeShipping : ''}`}>
            {isFreeShipping ? 'GRATIS' : formatPrice(summary.shipping)}
          </span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.rowLabel}>Impuesto Estimado</span>
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
        aria-label="Proceder al pago"
      >
        <span>Proceder al Pago</span>
        <Icon name="arrow_forward" />
      </button>

      <div className={styles.promoSection}>
        <div className={styles.promoInfo}>
          {summary.discount && summary.discount > 0 ? (
            <div className={styles.appliedPromo}>
              <span className={styles.textAppliedPromo}>Código "{summary.promoCode}" aplicado:</span>
              <span className={styles.discountAmount}>
                -{formatPrice(summary.discount)}
              </span>
            </div>
          ) : (
            <div className={styles.promoPromptContainer}>
             
              <span className={styles.promoPrompt}>
                ¿Tienes un código promocional? APLICA:  <span className={styles.promoCode}>DESCUENTO10</span>
              </span>
              
            </div>
          )}
        </div>

        <div className={styles.promoInputWrapper}>
          <input
            className={styles.promoInput}
            type="text"
            placeholder="Código promocional"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            onKeyDown={handleKeyPress}
            aria-label="Ingresa código promocional"
          />
          <button
            className={styles.promoButton}
            onClick={handleApplyPromo}
            disabled={!promoCode.trim()}
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;