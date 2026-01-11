import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { deleteItem, updateItemQuantity } from '../../features/cart/store/cartSlice';
import CartItem from '../../features/cart/components/CartItem/CartItem';
import CartSummary from '../../features/cart/components/OrderSummary/CartSummary';
import TrustSignals from '../../features/cart/components/TrustSignals/TrustSignals';
import PaymentMethods from '../../features/cart/components/PaymentMethods/PaymentMethods';
import Icon from '../../shared/ui/Icon';
import type { CartSummary as CartSummaryType } from './../../features/cart/types/cart.types';
import styles from './CartPage.module.css';
import EmailModal from '../../shared/ui/EmailModal/EmailModal';

export const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // State for email modal
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [isExistingCustomer, setIsExistingCustomer] = useState(false);

  // Obtener items del carrito desde Redux
  const cartItems = useAppSelector((state) => state.cart.items);

  // buscar cliente
   const handleEmailSubmit = (email: string, isExisting: boolean) => {
    setCustomerEmail(email);
    setIsExistingCustomer(isExisting);
    
    // Aquí puedes hacer algo con la información del cliente
    console.log(`Customer email: ${email}, Existing: ${isExisting}`);
    
    // Por ejemplo, actualizar el carrito con descuentos si es cliente existente
    if (isExisting) {
      // Aplicar descuento de cliente fiel
    }
  };
  const calculateSummary = (): CartSummaryType => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 20000 ? 0 : 3000;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return {
      subtotal,
      shipping,
      tax,
      total,
      itemsCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    };
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateItemQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(deleteItem(id));
  };

  const handleCheckout = () => {
    // Abrir el modal de email para buscar el cliente
    setIsEmailModalOpen(true);
  };

  const handleApplyPromoCode = (code: string) => {
    console.log('Applying promo code:', code);
    // Aquí iría la lógica para aplicar el código promocional
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const summary = calculateSummary();

  return (
    <div className={styles.cartPage}>
      <div className="container">
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            Your Cart <span className={styles.itemsCount}>({summary.itemsCount} items)</span>
          </h1>
          <button
            className={styles.continueShoppingButton}
            onClick={handleContinueShopping}
          >
            <Icon name="arrow_back" />
            Continue Shopping
          </button>
        </div>

        {/* Main Content Grid */}
        <div className={styles.cartGrid}>
          {/* Left Column: Cart Items */}
          <div className={styles.cartItemsSection}>
            {cartItems.length > 0 ? (
              <div className={styles.cartItemsList}>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyCart}>
                <Icon name="shopping_cart" />
                <h3>Your cart is empty</h3>
                <p>Add some items to get started</p>
                <button
                  className={styles.shopButton}
                  onClick={handleContinueShopping}
                >
                  Start Shopping
                </button>
              </div>
            )}

            {/* Trust Signals */}
            <TrustSignals />
          </div>

          {/* Right Column: Cart Summary */}
          <div className={styles.cartSummarySection}>
            <CartSummary
              summary={summary}
              onCheckout={handleCheckout}
              onApplyPromoCode={handleApplyPromoCode}
            />
            
            {/* Payment Methods */}
            <PaymentMethods />

             <EmailModal
              isOpen={isEmailModalOpen}
              onClose={() => setIsEmailModalOpen(false)}
              onEmailSubmit={handleEmailSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

