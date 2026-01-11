import React from 'react';
import styles from './CategoryChips.module.css';

interface CategoryChipsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

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