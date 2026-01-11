import { httpClient } from "../../../shared/api";
import type {
  TokenizeCardDto,
  TokenizeCardResponse,
  ProcessPaymentDto,
  ProcessPaymentResponse
} from "../types/payment.types";


export class PaymentService {

  async tokenizeCard(data: TokenizeCardDto): Promise<TokenizeCardResponse> {
    return httpClient.post<TokenizeCardResponse>("/wompi/tokenize-card", data);
  }

  async processPayment(data: ProcessPaymentDto): Promise<ProcessPaymentResponse> {
    return httpClient.post<ProcessPaymentResponse>("/payments/process", data);
  }

  async checkPaymentStatus(wompiTransactionId: string): Promise<any> {
    return httpClient.get<any>(`/payments/status/${wompiTransactionId}`);
  }
}

export const paymentService = new PaymentService();
