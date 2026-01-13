import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../Icon';
import Sidebar from '../Sidebar';
import styles from './Header.module.css';
import { useAppSelector } from '../../../store/hooks';

const Header: React.FC = () => {
  const totalQuantity = useAppSelector(state => state.cart.totalQuantity);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <div className={styles.leftSection}>
            <button
              className={styles.menuButton}
              onClick={toggleSidebar}
              aria-label="Abrir menú"
            >
              <Icon name="menu" />
            </button>

            {/* Logo sí puede seguir siendo Link */}
            <Link to="/" className={styles.logoSection}>
              <div className={styles.logoContent}>
                <img className={styles.logoImg} src="/logoShop.webp" alt="ShopHerazo" />
              </div>
              <h2 className={styles.logoText}>ShopHerazo</h2>
            </Link>
          </div>

          {/* NAV */}
          <nav className={styles.nav}>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              Productos
            </NavLink>

            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              Transacciones
            </NavLink>
          </nav>

          <div className={styles.rightSection}>
            <div className={styles.searchContainer}>
              <Icon name="search" />
              <input
                className={styles.searchInput}
                placeholder="Buscar productos..."
                type="text"
              />
            </div>

            <Link to="/cart" className={styles.cartButton} aria-label="Ver carrito">
              <Icon name="shopping_cart" />
              <span className={styles.cartBadge}>{totalQuantity}</span>
            </Link>
          </div>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;
