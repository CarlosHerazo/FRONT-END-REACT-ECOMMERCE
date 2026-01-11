/**
 * useCheckout Hook
 * Custom hook that encapsulates all checkout logic including:
 * - Form state management (card data, customer data)
 * - Validation states
 * - Payment processing logic
 * - Error handling
 * - Navigation and redirects
 */

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { clearCart } from '../../cart/store/cartSlice';
import { paymentService } from '../../payments/services/payment.service';
import { wompiService } from '../../payments/services/wompi.service';
import { useToast } from '../../../shared/ui/Toast';
import type { CreditCardData } from '../components/CreditCardForm/CreditCardForm';
import type { CustomerData } from '../components/CustomerDataForm/CustomerDataForm';
import type { Client } from '../../clients/types/clients.types';

export interface CheckoutSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export function useCheckout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { showSuccess: showSuccessToast, showError } = useToast();

  // Get customer data from navigation state
  const customerFromCart = location.state?.customer as Client | undefined;

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
    fullName: customerFromCart?.fullName || '',
    email: customerFromCart?.email || '',
    phone: customerFromCart?.phone || '',
    address: customerFromCart?.address || '',
    city: customerFromCart?.city || '',
    region: '',
    country: customerFromCart?.country || 'CO',
    postalCode: customerFromCart?.postalCode || '',
  });

  // Validation states
  const [isCardValid, setIsCardValid] = useState(false);
  const [isCustomerDataValid, setIsCustomerDataValid] = useState(false);

  // Process states
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  /**
   * Redirect if cart is empty or no customer data
   */
  useEffect(() => {
    if (cartItems.length === 0 && !showSuccess) {
      navigate('/cart');
    }
    if (!customerFromCart && !showSuccess) {
      navigate('/cart');
    }
  }, [cartItems.length, navigate, showSuccess, customerFromCart]);

  /**
   * Calculate order summary (subtotal, shipping, tax, total)
   */
  const calculateSummary = (): CheckoutSummary => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const shipping = subtotal > 20000 ? 0 : 3000; // Free shipping over 20,000
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
  };

  /**
   * Process payment
   * 1. Tokenize card with Wompi
   * 2. Send payment to backend
   * 3. Handle success/error
   */
  const handlePayment = async () => {
    // Validate forms
    if (!isCardValid || !isCustomerDataValid) {
      setError('Please fill in all required fields correctly');
      return;
    }

    if (!customerFromCart?.id) {
      setError('Customer information is missing. Please go back to cart.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const summary = calculateSummary();

      // Step 1: Tokenize the card using Wompi SDK directly from frontend
      setProcessingStep('Validating card information with Wompi...');
      const [month, year] = cardData.expiry.split('/');

      const tokenizeResponse = await wompiService.tokenizeCard({
        number: cardData.number.replace(/\s/g, ''),
        cvc: cardData.cvc,
        exp_month: month.padStart(2, '0'), // Ensure 2 digits (MM)
        exp_year: year.length === 4 ? year.slice(-2) : year.padStart(2, '0'), // Ensure 2 digits (YY)
        card_holder: cardData.name,
      });

      console.log('Card tokenized successfully with Wompi:', tokenizeResponse);

      // Step 2: Process the payment with correct payload structure
      setProcessingStep('Processing payment... This may take a few seconds.');
      const paymentResponse = await paymentService.processPayment({
        customerId: customerFromCart.id,
        customerEmail: customerData.email,
        amountInCents: Math.round(summary.total * 100), // Convert to cents
        currency: 'COP',
        paymentMethod: {
          type: 'CARD',
          token: tokenizeResponse.data.id,
          installments: 1,
        },
        customerFullName: customerData.fullName,
        customerPhoneNumber: customerData.phone,
        shippingAddress: {
          addressLine1: customerData.address,
          city: customerData.city,
          region: customerData.region,
          country: customerData.country,
          phoneNumber: customerData.phone,
          postalCode: customerData.postalCode,
        },
        metadata: {
          orderId: `ORDER-${Date.now()}`,
          productIds: cartItems.map((item) => item.id),
        },
        products: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });

      console.log('Payment processed successfully:', paymentResponse);

      // Handle both response structures: wrapped in success/transaction or direct
      const isSuccess = paymentResponse.success
        ? paymentResponse.transaction.status === 'APPROVED'
        : (paymentResponse as any).status === 'APPROVED';

      const transactionId = paymentResponse.success
        ? paymentResponse.transaction.id
        : (paymentResponse as any).transactionId;

      if (isSuccess) {
        setProcessingStep('Payment approved! Preparing your order...');

        // Clear cart
        dispatch(clearCart());

        // Show success toast
        showSuccessToast('Payment approved! Your order has been placed successfully.');

        // Show success message
        setShowSuccess(true);

        // Redirect to success page or home after 7 seconds
        setTimeout(() => {
          navigate('/products', {
            state: {
              message: 'Payment successful! Your order has been placed.',
              transactionId: transactionId,
            },
          });
        }, 7000);
      } else {
        const errorMessage = 'Payment was declined. Please try again with a different card.';
        setError(errorMessage);
        showError(errorMessage);
      }
    } catch (err) {
      console.error('Payment error:', err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'An error occurred while processing your payment. Please try again.';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  /**
   * Navigate back to cart
   */
  const goBackToCart = () => {
    navigate('/cart');
  };

  return {
    // Data
    cartItems,
    customerFromCart,
    summary: calculateSummary(),

    // Form states
    cardData,
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
  };
}
