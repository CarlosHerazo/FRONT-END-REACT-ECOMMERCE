export interface CartItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  price: number;
  quantity: number;
  imageUrl: string;
  description?: string;
  totalPrice: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  promoCode: string;
  discount: number;
  discountCodeId: string;
  discountPercentage: number;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  discount?: number;
  promoCode: string;
  itemsCount: number;
}

export interface TrustSignal {
  icon: string;
  label: string;
}

export interface PaymentMethod {
  name: string;
  code: string;
}