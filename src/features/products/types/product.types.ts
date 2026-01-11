/**
 * Product entity from API
 * Matches GET /products response
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  price: number;
  stock: number;
  category: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Product creation payload
 * Matches POST /products request
 */
export interface CreateProductDto {
  name: string;
  description: string;
  imgUrl: string;
  price: number;
  stock: number;
  category: string;
  rating: number;
}

/**
 * Product update payload
 * Matches PATCH /products/:id request
 * All fields are optional
 */
export interface UpdateProductDto {
  name?: string;
  description?: string;
  imgUrl?: string;
  price?: number;
  stock?: number;
  category?: string;
  rating?: number;
}

/**
 * Product filters for listing
 */
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
}

/**
 * Product categories available
 */
export type ProductCategory =
  | 'Clothing'
  | 'Electronics'
  | 'Computing'
  | 'Accessories'
  | 'Home & Living'
  | 'Apparel'
  | 'New Arrivals';
