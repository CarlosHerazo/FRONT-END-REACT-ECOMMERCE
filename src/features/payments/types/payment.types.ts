export interface TokenizeCardDto {
  number: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
  card_holder: string;
}

export interface TokenizeCardResponse {
  status: string;
  data: {
    id: string;
    created_at: string;
    brand: string;
    name: string;
    last_four: string;
    bin: string;
    exp_year: string;
    exp_month: string;
    card_holder: string;
    expires_at: string;
  };
}

export interface ProcessPaymentDto {
  amountInCents: number;
  currency: string;
  customerEmail: string;
  paymentMethod: {
    type: string;
    token: string;
    installments: number;
  };
  customerData: {
    phoneNumber: string;
    fullName: string;
  };
  shippingAddress: {
    addressLine1: string;
    city: string;
    region: string;
    country: string;
  };
}

export interface ProcessPaymentResponse {
  success: boolean;
  transaction: {
    id: string;
    reference: string;
    status: string;
    amountInCents: number;
    currency: string;
    wompiTransactionId: string;
    customerId: string;
    customerEmail: string;
    redirectUrl: string | null;
    paymentLinkId: string | null;
    createdAt: string;
    updatedAt: string;
  };
  delivery: {
    id: string;
    transactionId: string;
    customerName: string;
    customerPhone: string;
    address: {
      addressLine1: string;
      city: string;
      region: string;
      country: string;
    };
    status: string;
    trackingNumber: string | null;
    estimatedDeliveryDate: string;
    actualDeliveryDate: string | null;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}

export interface AcceptanceTokensResponse {
  presigned_acceptance: {
    acceptance_token: string;
    permalink: string;
    type: string;
  };
  presigned_personal_data_auth: {
    acceptance_token: string;
    permalink: string;
    type: string;
  };
}
