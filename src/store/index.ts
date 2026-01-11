import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/store/cartSlice';
import { localStorageMiddleware, CART_STORAGE_KEY } from './middleware/localStorageMiddleware';
import { loadFromLocalStorage } from '../utils/localStorage';
import type { CartState } from '../features/cart/types/cart.types';

// Combine all reducers
const rootReducer = combineReducers({
  cart: cartReducer,
});

// Load persisted cart state from localStorage
const persistedCartState = loadFromLocalStorage<CartState>(CART_STORAGE_KEY);

// Create store with localStorage persistence
export const store = configureStore({
  reducer: rootReducer,
  // Add custom middleware for localStorage persistence
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  // Preload state from localStorage if available
  preloadedState: persistedCartState
    ? {
        cart: persistedCartState,
      }
    : undefined,
});

// Infer types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
