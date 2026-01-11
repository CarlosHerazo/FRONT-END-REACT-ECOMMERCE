/**
 * Redux Middleware for Cart Persistence
 * Automatically saves cart state to localStorage after every cart action
 */

import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { saveToLocalStorage } from '../../utils/localStorage';

// Key used to store cart data in localStorage
export const CART_STORAGE_KEY = 'ecommerce_cart';

/**
 * Middleware that listens to cart actions and persists the state to localStorage
 *
 * How it works:
 * 1. Every time a Redux action is dispatched
 * 2. The middleware checks if it's a cart-related action (starts with 'cart/')
 * 3. If yes, it lets the action pass through to the reducer
 * 4. After the state is updated, it saves the cart state to localStorage
 */
export const localStorageMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  // Let the action pass through to the reducer first
  const result = next(action);

  // Check if this is a cart action
  if (typeof action === 'object' && action !== null && 'type' in action) {
    const actionType = action.type as string;

    // Only persist if it's a cart action
    if (actionType.startsWith('cart/')) {
      const state = store.getState();
      const cartState = state.cart;

      // Save to localStorage
      saveToLocalStorage(CART_STORAGE_KEY, cartState);
    }
  }

  return result;
};
