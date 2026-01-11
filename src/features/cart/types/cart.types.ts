export interface CartItem {
  id: string;
  name: string;
  sku: string;
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
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
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