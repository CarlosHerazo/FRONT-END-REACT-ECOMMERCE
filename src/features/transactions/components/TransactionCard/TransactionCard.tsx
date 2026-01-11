import Icon from '../../../../shared/ui/Icon';
import type { Transaction } from '../../types/Transactions.type';
import { useTransactionCard } from '../../hooks/useTransactionCard';
import styles from './TransactionCard.module.css';

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const { formatDate, formatAmount, getStatusColor } = useTransactionCard();

  return (
    <div className={styles.transactionCard}>
      <div className={styles.cardHeader}>
        <div className={styles.transactionId}>
          <Icon name="receipt" />
          <span>#{transaction.reference}</span>
        </div>
        <span className={`${styles.statusBadge} ${styles[getStatusColor(transaction.status)]}`}>
          {transaction.status}
        </span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.mainInfo}>
          <div className={styles.amount}>
            {formatAmount(transaction.amountInCents, transaction.currency)}
          </div>
          <div className={styles.date}>
            <Icon name="schedule" />
            {formatDate(transaction.createdAt)}
          </div>
        </div>

        <div className={styles.customerInfo}>
          <div className={styles.infoRow}>
            <Icon name="person" />
            <span>{transaction.customerFullName}</span>
          </div>
          <div className={styles.infoRow}>
            <Icon name="phone" />
            <span>{transaction.customerPhoneNumber}</span>
          </div>
        </div>

        <div className={styles.shippingInfo}>
          <div className={styles.sectionTitle}>
            <Icon name="local_shipping" />
            Shipping Address
          </div>
          <div className={styles.addressText}>
            {transaction.shippingAddress.addressLine1}<br />
            {transaction.shippingAddress.city}, {transaction.shippingAddress.region}<br />
            {transaction.shippingAddress.country} {transaction.shippingAddress.postalCode}
          </div>
        </div>

        <div className={styles.paymentInfo}>
          <div className={styles.paymentRow}>
            <span className={styles.label}>Payment Method:</span>
            <span className={styles.value}>{transaction.paymentMethod.type}</span>
          </div>
          {transaction.paymentMethod.installments > 1 && (
            <div className={styles.paymentRow}>
              <span className={styles.label}>Installments:</span>
              <span className={styles.value}>{transaction.paymentMethod.installments}x</span>
            </div>
          )}
        </div>

        {transaction.metadata && (
          <div className={styles.metadata}>
            <div className={styles.metadataRow}>
              <span className={styles.label}>Order ID:</span>
              <span className={styles.value}>{transaction.metadata.orderId}</span>
            </div>
            {transaction.metadata.productIds && transaction.metadata.productIds.length > 0 && (
              <div className={styles.metadataRow}>
                <span className={styles.label}>Products:</span>
                <span className={styles.value}>
                  {transaction.metadata.productIds.length} item{transaction.metadata.productIds.length > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.transactionIds}>
          <span className={styles.idLabel}>Transaction ID:</span>
          <span className={styles.idValue}>{transaction.id}</span>
        </div>
        {transaction.wompiTransactionId && (
          <div className={styles.transactionIds}>
            <span className={styles.idLabel}>Wompi ID:</span>
            <span className={styles.idValue}>{transaction.wompiTransactionId}</span>
          </div>
        )}
      </div>
    </div>
  );
}
