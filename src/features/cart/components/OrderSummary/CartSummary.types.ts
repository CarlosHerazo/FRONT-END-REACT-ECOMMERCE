export interface CartSummaryProps {
  summary: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    discount?: number;
    promoCode: string;
    itemsCount: number;
  };
  onCheckout?: () => void;
  onApplyPromoCode?: (code: string) => void;
}