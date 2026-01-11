import React from 'react';
import Icon from '../Icon';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.footerMain}>
          <div className={styles.brandSection}>
            <div className={styles.brandLogo}>
              <div className={styles.logoIcon}>
                <Icon name="shopping_bag" />
              </div>
              <h2 className={styles.brandName}>ShopModern</h2>
            </div>
            <p className={styles.brandDescription}>
              High-quality minimalist goods for the modern professional.
              Designed with precision and crafted for durability.
            </p>
          </div>

          <div className={styles.linksSection}>
            <h4 className={styles.linksTitle}>Shop</h4>
            <ul className={styles.linksList}>
              <li><a href="#">All Products</a></li>
              <li><a href="#">Categories</a></li>
              <li><a href="#">New Arrivals</a></li>
              <li><a href="#">Discounts</a></li>
            </ul>
          </div>

          <div className={styles.linksSection}>
            <h4 className={styles.linksTitle}>Support</h4>
            <ul className={styles.linksList}>
              <li><a href="#">Order Tracking</a></li>
              <li><a href="#">Returns & Refunds</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © 2024 ShopModern Inc. All rights reserved.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Website">
              <Icon name="language" />
            </a>
            <a href="#" aria-label="Share">
              <Icon name="share" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;