import React from 'react';
import {type TrustSignal } from '../../types/cart.types';
import styles from './TrustSignals.module.css';
import Icon from '../../../../shared/ui/Icon';

const TrustSignals: React.FC = () => {
  const signals: TrustSignal[] = [
    { icon: 'verified_user', label: 'Secure Payment' },
    { icon: 'local_shipping', label: 'Free Shipping on $500+' },
    { icon: 'replay', label: '30 Day Returns' }
  ];

  return (
    <div className={styles.trustSignals}>
      {signals.map((signal, index) => (
        <div key={index} className={styles.signalItem}>
          <Icon name={signal.icon} className={styles.signalIcon} />
          <span className={styles.signalLabel}>{signal.label}</span>
        </div>
      ))}
    </div>
  );
};

export default TrustSignals;