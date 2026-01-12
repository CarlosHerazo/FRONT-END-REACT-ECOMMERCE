import { env } from '../../../config/env';
import type { TokenizeCardParams, TokenizeCardResponse, WompiConfig, WompiResult } from '../types/wompi.types';

// Extend Window interface to include Wompi
declare global {
  interface Window {
    WidgetCheckout?: {
      configure: (config: WompiConfig) => void;
      open: (callback: (result: WompiResult) => void) => void;
      close: () => void;
    };
  }
}


/**
 * Wompi Service for tokenizing cards using their API directly
 */
export class WompiService {
  private readonly publicKey: string;
  private readonly apiUrl: string;
  private readonly environment: 'staging' | 'test' | 'production';

  constructor() {
    this.publicKey = env.wompiPublicKey;

    // se detecta el entorno según la clave pública
    if (this.publicKey.startsWith('pub_stagtest_')) {
      this.environment = 'staging';
      this.apiUrl = 'https://api-sandbox.co.uat.wompi.dev/v1'; // Ambiente STAGING/UAT
    } else if (this.publicKey.startsWith('pub_test_')) {
      this.environment = 'test';
      this.apiUrl = 'https://sandbox.wompi.co/v1'; // Ambiente SANDBOX/TEST
    } else {
      this.environment = 'production';
      this.apiUrl = 'https://production.wompi.co/v1'; // Ambiente PRODUCCIÓN
    }
    console.log(`Wompi environment set to: ${this.environment}`);
    if (!this.publicKey) {
      throw new Error('Wompi public key is not defined in environment variables.');
    }
  }

  async tokenizeCard(cardData: TokenizeCardParams): Promise<TokenizeCardResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/tokens/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.publicKey}`,
        },
        body: JSON.stringify({
          number: cardData.number.replace(/\s/g, ''), 
          cvc: cardData.cvc,
          exp_month: cardData.exp_month,
          exp_year: cardData.exp_year,
          card_holder: cardData.card_holder,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error?.message ||
          `Failed to tokenize card: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Wompi tokenization error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to tokenize card. Please check your card information.');
    }
  }

  validateCardNumber(cardNumber: string): boolean {
    const cleanNumber = cardNumber.replace(/\s/g, '');

    if (!/^\d+$/.test(cleanNumber)) {
      return false;
    }

    let sum = 0;
    let isEven = false;

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i], 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  getCardBrand(cardNumber: string): string {
    const cleanNumber = cardNumber.replace(/\s/g, '');

    if (/^4/.test(cleanNumber)) return 'VISA';
    if (/^5[1-5]/.test(cleanNumber)) return 'MASTERCARD';

    return 'UNKNOWN';
  }
}

export const wompiService = new WompiService();
