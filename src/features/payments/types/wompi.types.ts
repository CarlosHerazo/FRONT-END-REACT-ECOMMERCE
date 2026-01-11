export interface WompiConfig {
  currency: string;
  amountInCents: number;
  reference: string;
  publicKey: string;
  redirectUrl?: string;
  taxInCents?: {
    vat?: number;
    consumption?: number;
  };
  customerData?: {
    email: string;
    fullName: string;
    phoneNumber: string;
    phoneNumberPrefix: string;
    legalId?: string;
    legalIdType?: string;
  };
  shippingAddress?: {
    addressLine1: string;
    city: string;
    phoneNumber: string;
    region: string;
    country: string;
  };
}

export interface WompiResult {
  transaction: {
    id: string;
    status: string;
    reference: string;
    amount_in_cents: number;
    currency: string;
    payment_method_type: string;
    payment_method: {
      type: string;
      extra: {
        bin: string;
        name: string;
        brand: string;
        exp_year: string;
        exp_month: string;
        last_four: string;
        card_holder: string;
      };
      installments: number;
    };
  };
}

export interface TokenizeCardParams {
  number: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
  card_holder: string;
}

export interface TokenizeCardResponse {
  status: string;
  data: {
    id: string; // This is the token
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

