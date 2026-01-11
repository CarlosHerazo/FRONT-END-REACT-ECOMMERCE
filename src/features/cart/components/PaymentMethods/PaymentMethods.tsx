import React from 'react';
import {type PaymentMethod } from '../../types/cart.types';
import styles from './PaymentMethods.module.css';

const PaymentMethods: React.FC = () => {
  const methods: PaymentMethod[] = [
    { name: 'VISA', code: 'VISA' },
    { name: 'AMEX', code: 'AMEX' },
    { name: 'PAYPAL', code: 'PAYPAL' },
    { name: 'MASTERCARD', code: 'MASTERCARD' }
  ];

  return (
    <div className={styles.paymentMethods}>
      {methods.map((method) => (
        <div key={method.code} className={styles.methodCard}>
          <span className={styles.methodText}>{method.code}</span>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethods;