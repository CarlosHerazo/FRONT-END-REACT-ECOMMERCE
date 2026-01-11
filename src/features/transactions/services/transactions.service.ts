import { httpClient } from "../../../shared/api";
import type { Transaction } from "../types/Transactions.type";


export class TransactionsService {

  async getTransactionById(transactionId: string): Promise<Transaction> {
    return httpClient.get<Transaction>(`/transactions/${transactionId}`);
  }
    async listTransactionsByCustomer(email: string): Promise<Transaction[]> {
    return httpClient.get<Transaction[]>(`/transactions/email/${email}`);
  }
}

export const transactionsService = new TransactionsService();