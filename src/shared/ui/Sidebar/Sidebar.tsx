import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../Icon';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: 'home' },
    { path: '/products', label: 'Products', icon: 'inventory_2' },
    { path: '/transactions', label: 'Transactions', icon: 'receipt_long' },
    { path: '/cart', label: 'Cart', icon: 'shopping_cart' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className={styles.overlay} onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoSection}>
            <div className={styles.logoIcon}>
              <Icon name="shopping_bag" />
            </div>
            <h2 className={styles.logoText}>ShopHerazo</h2>
          </div>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close menu"
          >
            <Icon name="close" />
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
              onClick={onClose}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
