import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { useToast } from '../../../shared/ui/Toast';
import { useProducts } from '../../products';
import { addItem } from '../../cart/store/cartSlice';


export const useHomePage = () => {
  const dispatch = useAppDispatch();
  const { showSuccess } = useToast();
  const { products, loading, error, filterByCategory, resetFilters } = useProducts();

  const [activeCategory, setActiveCategory] = useState<string>('Todos los artículos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  // Detectar si se está filtrando
  useEffect(() => {
    setIsFiltering(activeCategory !== 'Todos los artículos');
  }, [activeCategory]);

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      dispatch(addItem({
        id: product.id,
        name: product.name,
        sku: `SKU-${product.id}`,
        price: product.price,
        imageUrl: product.imgUrl,
        description: product.description,
      }));
      showSuccess(`¡${product.name} agregado al carrito!`);
    }
  };

  const handleToggleFavorite = (productId: string) => {
    console.log('Toggled favorite:', productId);
    // TODO: implementar favoritos
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setIsFiltering(true);

    if (category === 'Todos los artículos') {
      resetFilters();
      setIsFiltering(false);
    } else {
      filterByCategory(category);
    }
  };

  const handleClearFilters = () => {
    setActiveCategory('Todos los artículos');
    setSearchQuery('');
    resetFilters();
    setIsFiltering(false);
  };

  const shouldShowStateExamples = loading || (isFiltering && products.length === 0);

  return {
    products,
    loading,
    error,
    activeCategory,
    searchQuery,
    isFiltering,
    shouldShowStateExamples,

    // Handlers
    handleAddToCart,
    handleToggleFavorite,
    handleCategoryChange,
    handleClearFilters,
    setSearchQuery,
  };
};
