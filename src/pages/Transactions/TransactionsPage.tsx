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
      setError('Por favor ingresa una dirección de correo electrónico');
      return;
    }

    setIsLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const results = await transactionsService.listTransactionsByCustomer(email);
      setTransactions(results);

      if (results.length === 0) {
        showInfo(`No se encontraron transacciones para ${email}`);
      } else {
        showSuccess(`Se encontraron ${results.length} transacción${results.length > 1 ? 'es' : ''}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener las transacciones';
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
        <h1 className={styles.pageTitle}>Historial de Transacciones</h1>
        <p className={styles.pageSubtitle}>
          Busca y visualiza los detalles de transacciones por correo del cliente
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
                placeholder="Ingresa el correo del cliente"
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
                  Buscando...
                </>
              ) : (
                <>
                  <Icon name="search" />
                  Buscar Transacciones
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
            <h3 className={styles.emptyTitle}>Buscar Transacciones</h3>
            <p className={styles.emptyDescription}>
              Ingresa el correo de un cliente para ver su historial de transacciones
            </p>
          </div>
        ) : isLoading ? (
          <div className={styles.loadingState}>
            <span className={styles.spinner}></span>
            <p>Cargando transacciones...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Icon name="inbox" />
            </div>
            <h3 className={styles.emptyTitle}>No se Encontraron Transacciones</h3>
            <p className={styles.emptyDescription}>
              No se encontraron transacciones para <strong>{email}</strong>
            </p>
          </div>
        ) : (
          <>
            <div className={styles.resultsHeader}>
              <h2 className={styles.resultsTitle}>
                Transacciones para {email}
              </h2>
              <span className={styles.resultsCount}>
                {transactions.length} transacción{transactions.length > 1 ? 'es' : ''}
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