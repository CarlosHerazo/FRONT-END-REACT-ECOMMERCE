export interface Product {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  images?: string[];
  price: number;
  stock: number;
  category: string | null;
  rating: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDetailProps {
  product: Product;
  quantity: number;
  onAddToCart?: (productId: string) => void;
  onBuyNow?: (productId: string) => void;
  onQuantityChange?: (quantity: number) => void;
}

export interface StorageOption {
  capacity: string;
  price: number;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratings: {
    [key: number]: number; // 1-5 stars with percentage
  };
}