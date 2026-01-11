export interface CategoryChipsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}