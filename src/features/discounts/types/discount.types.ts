export interface DiscountCode {
  id: string;
  code: string;
  discountPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface ValidateDiscountCodeResponse {
  valid: boolean;
  discountCode: DiscountCode;
  message: string;
}
