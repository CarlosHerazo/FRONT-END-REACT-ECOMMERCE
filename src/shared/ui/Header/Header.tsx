import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import styles from './Header.module.css';
import { useAppSelector } from '../../../store/hooks';

const Header: React.FC = () => {
  const totalQuantity = useAppSelector(state => state.cart.totalQuantity);
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>
            <Icon name="shopping_bag" />
          </div>
          <h2 className={styles.logoText}>ShopModern</h2>
        </div>

        <nav className={styles.nav}>
          <Link className={`${styles.navLink} ${styles.active}`} to="/products">
            Products
          </Link>
          <Link className={styles.navLink} to="/transactions">
            Transactions
          </Link>
        </nav>
        

        <div className={styles.rightSection}>
          <div className={styles.searchContainer}>
            <Icon name="search" />
            <input
              className={styles.searchInput}
              placeholder="Search products..."
              type="text"
            />
          </div>

          <Link to="/cart" className={styles.cartButton} aria-label="View cart">
            <Icon name="shopping_cart" />
            <span className={styles.cartBadge}>{totalQuantity}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;