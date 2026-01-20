import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { clearCart, clearPromo } from '../../cart/store/cartSlice';
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
  discount: number;
  promoCode: string;
}

export function useCheckout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { showSuccess: showSuccessToast, showError } = useToast();

  // Obtener datos del cliente desde el estado de navegación
  const customerFromCart = location.state?.customer as Client | undefined;

  // Datos del carrito desde Redux
  const cartItems = useAppSelector((state) => state.cart.items);
  const { discount = 0, promoCode = '', discountCodeId = '' } = useAppSelector((state) => state.cart);

  // Estados del formulario
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

  // Estados de validación
  const [isCardValid, setIsCardValid] = useState(false);
  const [isCustomerDataValid, setIsCustomerDataValid] = useState(false);

  // Estados de proceso
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  /**
   * Redirigir si el carrito está vacío o no hay datos del cliente
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
   * Calcular resumen de la orden (subtotal, envío, impuestos, total)
   */
  const calculateSummary = (): CheckoutSummary => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const currentDiscount = discount || 0;
    const shipping = subtotal > 20000 || cartItems.length === 0 ? 0 : 3000;
    const baseTotal = subtotal + shipping - currentDiscount;
    const tax = baseTotal * 0.19;
    const total = Math.max(baseTotal + tax, 0);

    return { subtotal, shipping, tax, total, discount: currentDiscount, promoCode };
  };

  /**
   * Procesar el pago
   * 1. Tokenizar la tarjeta con Wompi
   * 2. Enviar el pago al backend
   * 3. Manejar éxito o error
   */
  const handlePayment = async () => {
    // Validar formularios
    if (!isCardValid || !isCustomerDataValid) {
      setError('Por favor completa correctamente todos los campos requeridos');
      return;
    }

    if (!customerFromCart?.id) {
      setError('La información del cliente no está disponible. Regresa al carrito.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Paso 1: Tokenizar la tarjeta usando Wompi desde el frontend
      setProcessingStep('Validando información de la tarjeta con Wompi...');
      const [month, year] = cardData.expiry.split('/');

      const tokenizeResponse = await wompiService.tokenizeCard({
        number: cardData.number.replace(/\s/g, ''),
        cvc: cardData.cvc,
        exp_month: month.padStart(2, '0'),
        exp_year: year.length === 4 ? year.slice(-2) : year.padStart(2, '0'),
        card_holder: cardData.name,
      });

      // Paso 2: Procesar el pago
      setProcessingStep('Procesando el pago... Esto puede tardar unos segundos.');
      const paymentResponse = await paymentService.processPayment({
        customerId: customerFromCart.id,
        customerEmail: customerData.email,
        products: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        ...(discountCodeId && { discountCodeId }),
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
      });

      const isSuccess = paymentResponse.status === 'APPROVED';
      const transactionId = paymentResponse.transactionId;

      if (isSuccess) {
        setProcessingStep('¡Pago aprobado! Preparando tu pedido...');

        // Vaciar carrito
        dispatch(clearCart());
        dispatch(clearPromo());

        // Mostrar toast de éxito
        showSuccessToast('¡Pago aprobado! Tu pedido fue realizado exitosamente.');

        setShowSuccess(true);

        // Redirigir después de 7 segundos
        setTimeout(() => {
          navigate('/products', {
            state: {
              message: 'Pago exitoso. Tu pedido ha sido confirmado.',
              transactionId,
            },
          });
        }, 7000);
      } else {
        const errorMessage =
          'El pago fue rechazado. Por favor intenta con otra tarjeta.';
        setError(errorMessage);
        showError(errorMessage);
      }
    } catch (err) {
      console.error('Error en el pago:', err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Ocurrió un error al procesar el pago. Intenta nuevamente.';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  /**
   * Volver al carrito
   */
  const goBackToCart = () => {
    navigate('/cart');
  };

  return {
    cartItems,
    customerFromCart,
    summary: calculateSummary(),

    cardData,
    setCardData,
    customerData,
    setCustomerData,

    isCardValid,
    setIsCardValid,
    isCustomerDataValid,
    setIsCustomerDataValid,

    isProcessing,
    processingStep,
    error,
    showSuccess,

    handlePayment,
    goBackToCart,
  };
}
