import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useToast } from '../../../shared/ui/Toast';
import { deleteItem, updateItemQuantity, applyPromo } from '../store/cartSlice';
import type {CartSummary as CartSummaryType } from '../types/cart.types';



const PROMO_CODES: Record<string, (subtotal: number) => number> = {
  DESCUENTO10: (subtotal) => subtotal * 0.1,
  DESCUENTO20: (subtotal) => subtotal * 0.2,
};

export const useCartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showSuccess, showError, showInfo } = useToast();

  const cartItems = useAppSelector((state) => state.cart.items);

  const { promoCode = '', discount = 0 } = useAppSelector((state) => state.cart);
 
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  /* ------------------ Cart actions ------------------ */
  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateItemQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(deleteItem(id));
  };

  const handleCheckout = () => {
    setIsEmailModalOpen(true);
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  /* ------------------ Promo code ------------------ */
 const handleApplyPromoCode = (code: string) => {
  const normalizedCode = code.toUpperCase();

  if (!PROMO_CODES[normalizedCode]) {
    showError('Código promocional inválido');
    return;
  }

  if (discount && discount > 0) {
    showInfo('Ya tienes un código promocional aplicado');
    return;
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountAmount = PROMO_CODES[normalizedCode](subtotal);

  dispatch(
    applyPromo({
      promoCode: normalizedCode,
      discount: discountAmount,
    })
  );

  showSuccess(`Código ${normalizedCode} aplicado`);
};


  /* ------------------ Summary ------------------ */
  const calculateSummary = (): CartSummaryType => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shipping = subtotal > 20000 || cartItems.length === 0 ? 0 : 3000;
    const tax = subtotal * 0.08;

    const currentDiscount = discount || 0;
    const totalBeforeDiscount = subtotal + shipping + tax;
    const total = Math.max(totalBeforeDiscount - currentDiscount, 0);

    return {
      subtotal,
      shipping,
      tax,
      total,
      discount: currentDiscount,
      promoCode: promoCode || '',
      itemsCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    };
  };

  /* ------------------ Reset promo if cart changes ------------------ */
  return {
    cartItems,
    summary: calculateSummary(),
    
    // Promo state
    promoCode,
    discount,

    // UI state
    isEmailModalOpen,
    setIsEmailModalOpen,

    // handlers
    handleUpdateQuantity,
    handleRemoveItem,
    handleCheckout,
    handleContinueShopping,
    handleApplyPromoCode,
  };
};
