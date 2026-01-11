export interface Transaction {
  id: string;
  customerId: string;
  customerEmail: string;
  amountInCents: string;
  currency: string;
  status: string;
  reference: string;
  paymentMethod: PaymentMethod;
  wompiTransactionId: string;
  redirectUrl: string | null;
  paymentLinkId: string | null;
  customerFullName: string;
  customerPhoneNumber: string;
  shippingAddress: ShippingAddress;
  metadata: TransactionMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentMethod {
  type: string;
  token: string;
  installments: number;
}

export interface ShippingAddress {
  addressLine1: string;
  city: string;
  region: string;
  country: string;
  phoneNumber: string;
  postalCode: string;
}

export interface TransactionMetadata {
  orderId: string;
  productIds: string[];
}