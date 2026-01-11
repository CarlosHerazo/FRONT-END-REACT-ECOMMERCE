export interface Product {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  price: number;
  stock: number;
  category: string | null;
  rating: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  onClick?: (productId: string) => void; 
}