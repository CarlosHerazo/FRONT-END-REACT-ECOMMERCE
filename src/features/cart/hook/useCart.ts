import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useToast } from '../../../shared/ui/Toast';
import { deleteItem, updateItemQuantity, applyPromo, clearPromo } from '../store/cartSlice';
import { discountService } from '../../discounts/services/discount.service';
import type { CartSummary as CartSummaryType } from '../types/cart.types';

export const useCartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showSuccess, showError, showInfo } = useToast();

  const cartItems = useAppSelector((state) => state.cart.items);
  const { promoCode = '', discount = 0, discountCodeId = '' } = useAppSelector((state) => state.cart);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);

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
  const handleApplyPromoCode = async (code: string) => {
    const normalizedCode = code.toUpperCase();

    if (discount && discount > 0) {
      showInfo('Ya tienes un código promocional aplicado');
      return;
    }

    setIsValidatingPromo(true);

    try {
      const response = await discountService.validateCode(normalizedCode);

      if (!response.valid) {
        showError('Código promocional inválido');
        return;
      }

      const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const discountAmount = subtotal * (response.discountCode.discountPercentage / 100);

      dispatch(
        applyPromo({
          promoCode: normalizedCode,
          discount: discountAmount,
          discountCodeId: response.discountCode.id,
          discountPercentage: response.discountCode.discountPercentage,
        })
      );

      showSuccess(`Código ${normalizedCode} aplicado - ${response.discountCode.discountPercentage}% de descuento`);
    } catch {
      showError('Código promocional inválido o expirado');
    } finally {
      setIsValidatingPromo(false);
    }
  };

  const handleRemovePromoCode = () => {
    dispatch(clearPromo());
    showInfo('Código promocional eliminado');
  };

  /* ------------------ Summary ------------------ */
  const calculateSummary = (): CartSummaryType => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shipping = subtotal > 20000 || cartItems.length === 0 ? 0 : 3000;
    const tax = subtotal * 0.19;

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
    discountCodeId,

    // UI state
    isEmailModalOpen,
    setIsEmailModalOpen,
    isValidatingPromo,

    // handlers
    handleUpdateQuantity,
    handleRemoveItem,
    handleCheckout,
    handleContinueShopping,
    handleApplyPromoCode,
    handleRemovePromoCode,
  };
};
