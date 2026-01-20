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
  customerId: string;
  customerEmail: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  discountCodeId?: string;
  paymentMethod: {
    type: string;
    token: string;
    installments: number;
  };
  customerFullName: string;
  customerPhoneNumber: string;
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    region: string;
    country: string;
    phoneNumber: string;
    postalCode?: string;
  };
}

export interface ProcessPaymentResponse {
  transactionId: string;
  wompiTransactionId: string;
  reference: string;
  status: string;
  priceBreakdown: {
    subtotalInCents: number;
    discountInCents: number;
    totalInCents: number;
    discountCode?: string;
  };
  info: {
    message: string;
    nextStep: string;
  };
  createdAt: string;
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
