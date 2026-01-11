import { useState } from 'react';
import { transactionsService } from '../../features/transactions/services/transactions.service';
import type { Transaction } from '../../features/transactions/types/Transactions.type';
import { TransactionCard } from '../../features/transactions/components/TransactionCard';
import Icon from '../../shared/ui/Icon';
import { useToast } from '../../shared/ui/Toast/ToastContext';
import styles from './TransactionsPage.module.css';

export function TransactionsPage() {
  const [email, setEmail] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');
  const { showError, showSuccess, showInfo } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Please enter an email address');
      return;
    }

    setIsLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const results = await transactionsService.listTransactionsByCustomer(email);
      setTransactions(results);

      if (results.length === 0) {
        showInfo(`No transactions found for ${email}`);
      } else {
        showSuccess(`Found ${results.length} transaction${results.length > 1 ? 's' : ''}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch transactions';
      setError(errorMessage);
      showError(errorMessage);
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className={`container ${styles.transactionsPage}`}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Transaction History</h1>
        <p className={styles.pageSubtitle}>
          Search and view transaction details by customer email
        </p>
      </div>

      <div className={styles.searchSection}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchInputGroup}>
            <div className={styles.inputWrapper}>
              <Icon name="mail" className={styles.inputIcon} />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter customer email address"
                className={styles.searchInput}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className={styles.searchButton}
              disabled={isLoading || !email.trim()}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  Searching...
                </>
              ) : (
                <>
                  <Icon name="search" />
                  Search Transactions
                </>
              )}
            </button>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              <Icon name="error" />
              {error}
            </div>
          )}
        </form>
      </div>

      <div className={styles.resultsSection}>
        {!hasSearched ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Icon name="search" />
            </div>
            <h3 className={styles.emptyTitle}>Search for Transactions</h3>
            <p className={styles.emptyDescription}>
              Enter a customer email address to view their transaction history
            </p>
          </div>
        ) : isLoading ? (
          <div className={styles.loadingState}>
            <span className={styles.spinner}></span>
            <p>Loading transactions...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Icon name="inbox" />
            </div>
            <h3 className={styles.emptyTitle}>No Transactions Found</h3>
            <p className={styles.emptyDescription}>
              No transactions found for <strong>{email}</strong>
            </p>
          </div>
        ) : (
          <>
            <div className={styles.resultsHeader}>
              <h2 className={styles.resultsTitle}>
                Transactions for {email}
              </h2>
              <span className={styles.resultsCount}>
                {transactions.length} transaction{transactions.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className={styles.transactionsList}>
              {transactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}