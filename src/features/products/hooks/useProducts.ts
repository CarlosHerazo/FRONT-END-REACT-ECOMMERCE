import { useState, useEffect, useCallback } from 'react';
import { productsService } from '../services';
import type { Product } from '../types';

interface UseProductsState {
  products: Product[];
  loading: boolean;
  error: Error | null;
}

interface UseProductsReturn extends UseProductsState {
  refetch: () => Promise<void>;
  filterByCategory: (category: string) => void;
  searchProducts: (query: string) => void;
  resetFilters: () => void;
}

/**
 * Custom hook to fetch and manage products
 * Provides loading states, error handling, and data management
 */
export const useProducts = (): UseProductsReturn => {
  const [state, setState] = useState<UseProductsState>({
    products: [],
    loading: true,
    error: null,
  });

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchProducts = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await productsService.getProducts();
      setAllProducts(data);
      setState({ products: data, loading: false, error: null });
    } catch (err) {
      setState({
        products: [],
        loading: false,
        error: err instanceof Error ? err : new Error('Failed to fetch products'),
      });
    }
  }, []);

  const filterByCategory = useCallback(
    (category: string) => {
      setActiveCategory(category);
      setSearchQuery('');

      if (category === 'All Items' || !category) {
        setState((prev) => ({ ...prev, products: allProducts }));
      } else {
        const filtered = allProducts.filter((product) => product.category === category);
        setState((prev) => ({ ...prev, products: filtered }));
      }
    },
    [allProducts]
  );

  const searchProducts = useCallback(
    (query: string) => {
      setSearchQuery(query);
      setActiveCategory(null);

      if (!query.trim()) {
        setState((prev) => ({ ...prev, products: allProducts }));
        return;
      }

      const lowercaseQuery = query.toLowerCase();
      const filtered = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercaseQuery) ||
          product.description.toLowerCase().includes(lowercaseQuery)
      );
      setState((prev) => ({ ...prev, products: filtered }));
    },
    [allProducts]
  );

  const resetFilters = useCallback(() => {
    setActiveCategory(null);
    setSearchQuery('');
    setState((prev) => ({ ...prev, products: allProducts }));
  }, [allProducts]);

  const refetch = useCallback(async () => {
    await fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    ...state,
    refetch,
    filterByCategory,
    searchProducts,
    resetFilters,
  };
};
