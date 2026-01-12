import { CreditCardForm } from '../../features/checkout/components/CreditCardForm/CreditCardForm';
import { CustomerDataForm } from '../../features/checkout/components/CustomerDataForm/CustomerDataForm';
import { OrderSummary } from '../../features/checkout/components/OrderSummary/OrderSummary';
import { useCheckout } from '../../features/checkout/hooks/useCheckout';
import Icon from '../../shared/ui/Icon';
import styles from './CheckoutPage.module.css';

export function CheckoutPage() {
  // Get all checkout logic from custom hook
  const {
    // Data
    cartItems,
    summary,

    // Form states
    setCardData,
    customerData,
    setCustomerData,

    // Validation states
    isCardValid,
    setIsCardValid,
    isCustomerDataValid,
    setIsCustomerDataValid,

    // Process states
    isProcessing,
    processingStep,
    error,
    showSuccess,

    // Actions
    handlePayment,
    goBackToCart,
  } = useCheckout();

  // Success screen
  if (showSuccess) {
    return (
      <div className={styles.checkoutPage}>
        <div className="container">
          <div className={styles.successContainer}>
            <div className={styles.successIcon}>
              <Icon name="check_circle" />
            </div>
            <h1 className={styles.successTitle}>¡Pago Exitoso!</h1>
            <p className={styles.successMessage}>
              Gracias por tu compra. Tu pedido ha sido confirmado y está siendo procesado.
            </p>
            <div className={styles.successDetails}>
              <Icon name="local_shipping" />
              <span>Recibirás un correo de confirmación en breve.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main checkout screen
  return (
    <div className={styles.checkoutPage}>
      <div className="container">
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <button className={styles.backButton} onClick={goBackToCart}>
            <Icon name="arrow_back" />
            Volver al Carrito
          </button>
          <h1 className={styles.pageTitle}>Finalizar Compra</h1>
        </div>

        {/* Main Content Grid */}
        <div className={styles.checkoutGrid}>
          {/* Left Column: Forms */}
          <div className={styles.formsSection}>
            {/* Customer Information */}
            <div className={styles.formCard}>
              <div className={styles.formCardHeader}>
                <div className={styles.stepNumber}>1</div>
                <h2 className={styles.formCardTitle}>Información de Envío</h2>
              </div>
              <CustomerDataForm
                initialData={customerData}
                onDataChange={setCustomerData}
                onValidityChange={setIsCustomerDataValid}
              />
            </div>

            {/* Payment Information */}
            <div className={styles.formCard}>
              <div className={styles.formCardHeader}>
                <div className={styles.stepNumber}>2</div>
                <h2 className={styles.formCardTitle}>Información de Pago</h2>
              </div>
              <CreditCardForm
                onCardDataChange={setCardData}
                onValidityChange={setIsCardValid}
              />

              {/* Test Cards Info */}
              <div className={styles.testCardsInfo}>
                <div className={styles.testCardsHeader}>
                  <Icon name="info" />
                  <span>Tarjetas de Prueba (Sandbox)</span>
                </div>
                <div className={styles.testCardsList}>
                  <div className={styles.testCard}>
                      <span className={styles.testCardNumber}>4242 4242 4242 4242</span>
                      <span className={styles.testCardStatus}><Icon name="check_circle" /> Aprobada</span>
                  </div>
                  <div className={styles.testCard}>
                      <span className={styles.testCardNumber}>4111 1111 1111 1111</span>
                      <span className={styles.testCardStatus}><Icon name="cancel" /> Rechazada</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className={styles.errorMessage}>
                <Icon name="error" />
                <span>{error}</span>
              </div>
            )}

            {/* Processing Status Message */}
            {isProcessing && processingStep && (
              <div className={styles.processingMessage}>
                <Icon name="info" />
                <span>{processingStep}</span>
              </div>
            )}

            {/* Place Order Button */}
            <button
              className={styles.placeOrderButton}
              onClick={handlePayment}
              disabled={!isCardValid || !isCustomerDataValid || isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className={styles.spinner}></span>
                  {processingStep || 'Procesando Pago...'}
                </>
              ) : (
                <>
                  <Icon name="payment" />
                  Realizar Pedido - ${summary.total.toFixed(2)}
                </>
              )}
            </button>
          </div>

          {/* Right Column: Order Summary */}
          <div className={styles.summarySection}>
            <OrderSummary
              items={cartItems}
              subtotal={summary.subtotal}
              shipping={summary.shipping}
              tax={summary.tax}
              total={summary.total}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
