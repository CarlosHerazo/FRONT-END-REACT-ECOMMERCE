import React from 'react';
import styles from './CategoryChips.module.css';
import type { CategoryChipsProps } from './CategoryChips.types';

const CategoryChips: React.FC<CategoryChipsProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <div className={styles.chipsContainer}>
      {categories.map((category) => (
        <button
          key={category}
          className={`${styles.chip} ${
            activeCategory === category ? styles.active : ''
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;