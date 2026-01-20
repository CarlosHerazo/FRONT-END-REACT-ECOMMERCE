import { httpClient } from "../../../shared/api";
import type { ValidateDiscountCodeResponse } from "../types/discount.types";

export class DiscountService {
  async validateCode(code: string): Promise<ValidateDiscountCodeResponse> {
    return httpClient.get<ValidateDiscountCodeResponse>(`/discount-codes/validate/${code}`);
  }
}

export const discountService = new DiscountService();
