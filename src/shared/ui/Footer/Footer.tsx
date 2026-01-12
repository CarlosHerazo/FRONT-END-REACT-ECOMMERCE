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
              <h2 className={styles.brandName}>ShopHerazo</h2>
            </div>
            <p className={styles.brandDescription}>
              Productos minimalistas de alta calidad para el profesional moderno.
              Diseñados con precisión y elaborados para la durabilidad.
            </p>
          </div>

          <div className={styles.linksSection}>
            <h4 className={styles.linksTitle}>Tienda</h4>
            <ul className={styles.linksList}>
              <li><a href="#">Todos los Productos</a></li>
              <li><a href="#">Categorías</a></li>
              <li><a href="#">Nuevos Productos</a></li>
              <li><a href="#">Descuentos</a></li>
            </ul>
          </div>

          <div className={styles.linksSection}>
            <h4 className={styles.linksTitle}>Soporte</h4>
            <ul className={styles.linksList}>
              <li><a href="#">Seguimiento de Pedidos</a></li>
              <li><a href="#">Devoluciones y Reembolsos</a></li>
              <li><a href="#">Contáctanos</a></li>
              <li><a href="#">Política de Privacidad</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © 2024 ShopHerazo Inc. Todos los derechos reservados.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Sitio web">
              <Icon name="language" />
            </a>
            <a href="#" aria-label="Compartir">
              <Icon name="share" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;