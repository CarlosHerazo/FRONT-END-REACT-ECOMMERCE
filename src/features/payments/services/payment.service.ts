import { httpClient } from "../../../shared/api";
import type {
  TokenizeCardDto,
  TokenizeCardResponse,
  ProcessPaymentDto,
  ProcessPaymentResponse,
  AcceptanceTokensResponse,
} from "../types/payment.types";

/**
 * Payment API Service
 * Handles all payment-related API calls
 * Base URL: https://nest-back.testbydevelopment.space/api/v1
 */
export class PaymentService {
  /**
   * Tokenize a credit/debit card
   * POST /wompi/tokenize-card
   * @param data - Card data
   * @returns Promise<TokenizeCardResponse> Token and card details
   */
  async tokenizeCard(data: TokenizeCardDto): Promise<TokenizeCardResponse> {
    return httpClient.post<TokenizeCardResponse>("/wompi/tokenize-card", data);
  }

  /**
   * Get acceptance tokens from Wompi
   * GET /wompi/acceptance-tokens
   * @returns Promise<AcceptanceTokensResponse> Acceptance tokens
   */
  async getAcceptanceTokens(): Promise<AcceptanceTokensResponse> {
    return httpClient.get<AcceptanceTokensResponse>("/wompi/acceptance-tokens");
  }

  /**
   * Process a complete payment
   * POST /payments/process
   * @param data - Payment data
   * @returns Promise<ProcessPaymentResponse> Transaction and delivery details
   */
  async processPayment(data: ProcessPaymentDto): Promise<ProcessPaymentResponse> {
    return httpClient.post<ProcessPaymentResponse>("/payments/process", data);
  }

  /**
   * Check payment status
   * GET /payments/status/:wompiTransactionId
   * @param wompiTransactionId - Wompi transaction ID
   * @returns Promise<any> Payment status
   */
  async checkPaymentStatus(wompiTransactionId: string): Promise<any> {
    return httpClient.get<any>(`/payments/status/${wompiTransactionId}`);
  }
}

export const paymentService = new PaymentService();
