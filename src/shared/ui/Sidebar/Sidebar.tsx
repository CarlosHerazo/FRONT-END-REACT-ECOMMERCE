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
    { path: '/', label: 'Inicio', icon: 'home' },
    { path: '/products', label: 'Productos', icon: 'inventory_2' },
    { path: '/transactions', label: 'Transacciones', icon: 'receipt_long' },
    { path: '/cart', label: 'Carrito', icon: 'shopping_cart' },
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
            <div className={styles.logoContent}>
                <img className={styles.logoImg} src="/logoShop.webp" alt="" />
              </div>
              <h2 className={styles.logoText}>ShopHerazo</h2>
          </div>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Cerrar menú"
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
