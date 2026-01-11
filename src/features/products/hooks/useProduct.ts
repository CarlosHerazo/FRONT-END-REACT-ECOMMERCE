import { useState, useEffect, useCallback } from 'react';
import { productsService } from '../services';
import type { Product } from '../types';

interface UseProductState {
  product: Product | null;
  loading: boolean;
  error: Error | null;
}

interface UseProductReturn extends UseProductState {
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch a single product by ID
 * @param productId - Product UUID
 */
export const useProduct = (productId: string): UseProductReturn => {
  const [state, setState] = useState<UseProductState>({
    product: null,
    loading: true,
    error: null,
  });

  const fetchProduct = useCallback(async () => {
    if (!productId) {
      setState({ product: null, loading: false, error: null });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await productsService.getProductById(productId);
      setState({ product: data, loading: false, error: null });
    } catch (err) {
      setState({
        product: null,
        loading: false,
        error: err instanceof Error ? err : new Error('Failed to fetch product'),
      });
    }
  }, [productId]);

  const refetch = useCallback(async () => {
    await fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    ...state,
    refetch,
  };
};
