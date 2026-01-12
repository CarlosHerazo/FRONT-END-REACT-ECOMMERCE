import CartItem from '../../features/cart/components/CartItem/CartItem';
import CartSummary from '../../features/cart/components/OrderSummary/CartSummary';
import TrustSignals from '../../features/cart/components/TrustSignals/TrustSignals';
import PaymentMethods from '../../features/cart/components/PaymentMethods/PaymentMethods';
import Icon from '../../shared/ui/Icon';
import EmailModal from '../../shared/ui/EmailModal/EmailModal';
import styles from './CartPage.module.css';
import { clientsService } from '../../features/clients/services/clients.service';
import { useToast } from '../../shared/ui/Toast';
import type { NewCustomerData } from '../../shared/ui/EmailModal/types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCartPage } from '../../features/cart/hook/useCart';
import EmptyCartState from '../../features/cart/components/EmptyCartState.tsx/EmptyCartState';

export const CartPage = () => {
  const navigate = useNavigate();
  const { showSuccess, showError, showInfo } = useToast();

  const {
    cartItems,
    summary,
    isEmailModalOpen,
    setIsEmailModalOpen,
    handleUpdateQuantity,
    handleRemoveItem,
    handleCheckout,
    handleContinueShopping,
    handleApplyPromoCode,
  } = useCartPage();

  const [_customerEmail, setCustomerEmail] = useState('');
  const [_isExistingCustomer, setIsExistingCustomer] = useState(false);

  const handleEmailSubmit = async (
    email: string,
    isExisting: boolean,
    newCustomerData?: NewCustomerData
  ) => {
    setCustomerEmail(email);
    setIsExistingCustomer(isExisting);

    try {
      let customerData = null;

      if (isExisting) {
        const customers = await clientsService.getClientByEmail({ email });
        if (customers) {
          customerData = customers;
          showInfo(`¡Bienvenido de nuevo, ${customers.fullName}!`);
        }
      } else if (newCustomerData) {
        customerData = await clientsService.createClient({
          fullName: newCustomerData.fullName,
          email,
          phone: newCustomerData.phone,
          address: newCustomerData.address,
          city: newCustomerData.city,
          country: newCustomerData.country,
          postalCode: newCustomerData.postalCode,
        });

        showSuccess(`¡Cuenta creada exitosamente!`);
      }

      if (customerData) {
        navigate('/checkout', { state: { customer: customerData } });
      }
    } catch (error) {
      console.error(error);
      showError('Hubo un error al procesar tu solicitud');
    }
  };

  return (
    <div className={styles.cartPage}>
      <div className="container">
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            Carrito <span className={styles.itemsCount}>({summary.itemsCount} artículos)</span>
          </h1>
          <button className={styles.continueShoppingButton} onClick={handleContinueShopping}>
            <Icon name="arrow_back" /> Continuar Comprando
          </button>
        </div>

        <div className={styles.cartGrid}>
          <div className={styles.cartItemsSection}>
            {cartItems.length ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))
            ) : (
              <EmptyCartState onContinueShopping={handleContinueShopping} />
            )}
            <TrustSignals />
          </div>

          <div className={styles.cartSummarySection}>
            <CartSummary
              summary={summary}
              onCheckout={cartItems.length ? handleCheckout : undefined}
              onApplyPromoCode={handleApplyPromoCode}
            />
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
