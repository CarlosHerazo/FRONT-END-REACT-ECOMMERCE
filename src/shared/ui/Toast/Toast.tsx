import { useEffect } from 'react';
import Icon from '../Icon';
import styles from './Toast.module.css';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type,
  duration = 5000,
  onClose,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  };

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.toastIcon}>
        <Icon name={getIcon()} />
      </div>
      <div className={styles.toastContent}>
        <p className={styles.toastMessage}>{message}</p>
      </div>
      <button
        className={styles.toastCloseButton}
        onClick={() => onClose(id)}
        aria-label="Close notification"
      >
        <Icon name="close" />
      </button>
    </div>
  );
};
