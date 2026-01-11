export interface CartSummaryProps {
  summary: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  onCheckout?: () => void;
  onApplyPromoCode?: (code: string) => void;
}