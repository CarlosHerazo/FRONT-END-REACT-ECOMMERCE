import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartState } from '../types/cart.types';

interface AddItemPayload {
  id: string;
  name: string;
  sku: string;
  price: number;
  imageUrl: string;
  description?: string;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  promoCode: '',
  discount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AddItemPayload>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalPrice += newItem.price;
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (!existingItem) {
        return;
      }

      state.totalQuantity--;
      state.totalPrice -= existingItem.price;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },

    deleteItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (!existingItem) {
        return;
      }

      state.totalQuantity -= existingItem.quantity;
      state.totalPrice -= existingItem.totalPrice;
      state.items = state.items.filter(item => item.id !== id);
    },

    updateItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (!existingItem || quantity < 1) {
        return;
      }

      const quantityDifference = quantity - existingItem.quantity;
      state.totalQuantity += quantityDifference;
      state.totalPrice += existingItem.price * quantityDifference;
      existingItem.quantity = quantity;
      existingItem.totalPrice = existingItem.price * quantity;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    applyPromo: (state, action: PayloadAction<{ promoCode: string; discount: number }>) => {
      state.promoCode = action.payload.promoCode;
      state.discount = action.payload.discount;
    },

    clearPromo: (state) => {
      state.promoCode = '';
      state.discount = 0;
    },
  },
});

export const { addItem, removeItem, deleteItem, updateItemQuantity, clearCart, applyPromo, clearPromo } = cartSlice.actions;
export default cartSlice.reducer;