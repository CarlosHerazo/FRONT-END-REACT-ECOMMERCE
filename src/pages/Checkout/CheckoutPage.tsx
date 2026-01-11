import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { clearCart } from '../../features/cart/store/cartSlice';
import { CreditCardForm, type CreditCardData } from './components/CreditCardForm/CreditCardForm';
import { CustomerDataForm, type CustomerData } from './components/CustomerDataForm/CustomerDataForm';
import { OrderSummary } from './components/OrderSummary/OrderSummary';
import { paymentService } from '../../features/payments/services/payment.service';
import Icon from '../../shared/ui/Icon';
import styles from './CheckoutPage.module.css';

export function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Cart data from Redux
  const cartItems = useAppSelector((state) => state.cart.items);

  // Form states
  const [cardData, setCardData] = useState<CreditCardData>({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });
  const [customerData, setCustomerData] = useState<CustomerData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    country: 'CO',
    postalCode: '',
  });

  // Validation states
  const [isCardValid, setIsCardValid] = useState(false);
  const [isCustomerDataValid, setIsCustomerDataValid] = useState(false);

  // Process states
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !showSuccess) {
      navigate('/cart');
    }
  }, [cartItems.length, navigate, showSuccess]);

  // Calculate order summary
  const calculateSummary = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const shipping = subtotal > 20000 ? 0 : 3000;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
  };

  const summary = calculateSummary();

  const handlePayment = async () => {
    if (!isCardValid || !isCustomerDataValid) {
      setError('Please fill in all required fields correctly');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Step 1: Tokenize the card
      const [month, year] = cardData.expiry.split('/');
      const tokenizeResponse = await paymentService.tokenizeCard({
        number: cardData.number.replace(/\s/g, ''),
        cvc: cardData.cvc,
        exp_month: month,
        exp_year: year,
        card_holder: cardData.name,
      });

      console.log('Card tokenized successfully:', tokenizeResponse);

      // Step 2: Process the payment
      const paymentResponse = await paymentService.processPayment({
        amountInCents: Math.round(summary.total * 100), // Convert to cents
        currency: 'COP',
        customerEmail: customerData.email,
        paymentMethod: {
          type: 'CARD',
          token: tokenizeResponse.data.id,
          installments: 1,
        },
        customerData: {
          phoneNumber: customerData.phone,
          fullName: customerData.fullName,
        },
        shippingAddress: {
          addressLine1: customerData.address,
          city: customerData.city,
          region: customerData.region,
          country: customerData.country,
        },
      });

      console.log('Payment processed successfully:', paymentResponse);

      if (paymentResponse.success && paymentResponse.transaction.status === 'APPROVED') {
        // Clear cart
        dispatch(clearCart());

        // Show success message
        setShowSuccess(true);

        // Redirect to success page or home after 3 seconds
        setTimeout(() => {
          navigate('/products', {
            state: {
              message: 'Payment successful! Your order has been placed.',
              transactionId: paymentResponse.transaction.id
            }
          });
        }, 3000);
      } else {
        setError('Payment was declined. Please try again with a different card.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while processing your payment. Please try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (showSuccess) {
    return (
      <div className={styles.checkoutPage}>
        <div className="container">
          <div className={styles.successContainer}>
            <div className={styles.successIcon}>
              <Icon name="check_circle" />
            </div>
            <h1 className={styles.successTitle}>Payment Successful!</h1>
            <p className={styles.successMessage}>
              Thank you for your purchase. Your order has been confirmed and is being processed.
            </p>
            <div className={styles.successDetails}>
              <Icon name="local_shipping" />
              <span>You will receive a confirmation email shortly.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      <div className="container">
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <button
            className={styles.backButton}
            onClick={() => navigate('/cart')}
          >
            <Icon name="arrow_back" />
            Back to Cart
          </button>
          <h1 className={styles.pageTitle}>Checkout</h1>
        </div>

        {/* Main Content Grid */}
        <div className={styles.checkoutGrid}>
          {/* Left Column: Forms */}
          <div className={styles.formsSection}>
            {/* Customer Information */}
            <div className={styles.formCard}>
              <div className={styles.formCardHeader}>
                <div className={styles.stepNumber}>1</div>
                <h2 className={styles.formCardTitle}>Shipping Information</h2>
              </div>
              <CustomerDataForm
                initialData={{
                  email: customerData.email,
                  fullName: customerData.fullName,
                  phone: customerData.phone,
                }}
                onDataChange={setCustomerData}
                onValidityChange={setIsCustomerDataValid}
              />
            </div>

            {/* Payment Information */}
            <div className={styles.formCard}>
              <div className={styles.formCardHeader}>
                <div className={styles.stepNumber}>2</div>
                <h2 className={styles.formCardTitle}>Payment Information</h2>
              </div>
              <CreditCardForm
                onCardDataChange={setCardData}
                onValidityChange={setIsCardValid}
              />

              {/* Test Cards Info */}
              <div className={styles.testCardsInfo}>
                <div className={styles.testCardsHeader}>
                  <Icon name="info" />
                  <span>Test Cards (Sandbox)</span>
                </div>
                <div className={styles.testCardsList}>
                  <div className={styles.testCard}>
                    <span className={styles.testCardNumber}>4242 4242 4242 4242</span>
                    <span className={styles.testCardStatus}>✅ Approved</span>
                  </div>
                  <div className={styles.testCard}>
                    <span className={styles.testCardNumber}>4111 1111 1111 1111</span>
                    <span className={styles.testCardStatus}>❌ Declined</span>
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

            {/* Place Order Button */}
            <button
              className={styles.placeOrderButton}
              onClick={handlePayment}
              disabled={!isCardValid || !isCustomerDataValid || isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className={styles.spinner}></span>
                  Processing Payment...
                </>
              ) : (
                <>
                  <Icon name="payment" />
                  Place Order - ${summary.total.toFixed(2)}
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
