import React from 'react';
import styles from './Breadcrumbs.module.css';
import Icon from '../Icon';

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          {index > 0 && (
            <Icon name="chevron_right" />
          )}
          {item.href ? (
            <a href={item.href} className={styles.breadcrumbLink}>
              {item.label}
            </a>
          ) : (
            <span className={styles.breadcrumbCurrent}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;