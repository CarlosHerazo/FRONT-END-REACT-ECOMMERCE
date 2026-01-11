export interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailSubmit: (email: string, isExistingCustomer: boolean, newCustomerData?: NewCustomerData) => void;
}

export interface CustomerInfo {
  email: string;
  isExisting: boolean;
  name?: string;
  membershipLevel?: 'basic' | 'premium' | 'vip';
  joinDate?: string;
}

export interface NewCustomerData {
  fullName: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
}