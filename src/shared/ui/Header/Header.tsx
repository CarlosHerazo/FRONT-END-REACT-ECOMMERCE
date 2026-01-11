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
          <a className={`${styles.navLink} ${styles.active}`} href="/products">
            Products
          </a>
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

          <div className={styles.avatar}>
            <div 
              className={styles.avatarImage}
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBNk1nr7k8MVyFXaC0d5OOBpTH2iUuMsXsME2oA8m6ubJOEtEFL0VQEdVe1Jc9YdFZIXq39PQtaYaRFlIPHgR3J0XEjfvzqUqw2gZOEsFtciBaZkx8B7HU_zoiAjvGK4V4wPjhrmu2hh-9PwstD7xlTJx8zh45DlKQ2JkTQwLD1ncsKhEZ32rg4QwWD7TCZ6X6L5mOt_bj0JiFhby6RCn-hTVOQ5QLLB_mA4iuYmft3L_MF_b-UqhXiwjxDe77hrmStRywl2EoI2Xc")'
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;