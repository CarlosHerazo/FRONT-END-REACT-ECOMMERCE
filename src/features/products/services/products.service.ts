import { httpClient } from '../../../shared/api';
import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from '../types';

/**
 * Products API Service
 * Handles all product-related API calls
 * Base URL: https://nest-back.testbydevelopment.space/api/v1
 */
export class ProductsService {
  private readonly baseEndpoint = '/products';


  async getProducts(): Promise<Product[]> {
    return httpClient.get<Product[]>(this.baseEndpoint);
  }

  /**
   * Get a single product by ID
   * GET /products/:id
   * @param id - Product UUID
   * @returns Promise<Product> Product details
   */
  async getProductById(id: string): Promise<Product> {
    return httpClient.get<Product>(`${this.baseEndpoint}/${id}`);
  }

  /**
   * Create a new product
   * POST /products
   * @param data - Product creation data
   * @returns Promise<Product> Created product
   */
  async createProduct(data: CreateProductDto): Promise<Product> {
    return httpClient.post<Product>(this.baseEndpoint, data);
  }

  /**
   * Update an existing product
   * PATCH /products/:id
   * @param id - Product UUID
   * @param data - Partial product data to update
   * @returns Promise<Product> Updated product
   */
  async updateProduct(id: string, data: UpdateProductDto): Promise<Product> {
    return httpClient.patch<Product>(`${this.baseEndpoint}/${id}`, data);
  }

  /**
   * Filter products by category
   * @param category - Category name
   * @returns Promise<Product[]> Filtered products
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    const products = await this.getProducts();
    return products.filter((product) => product.category === category);
  }

  /**
   * Search products by name or description
   * @param query - Search query
   * @returns Promise<Product[]> Matching products
   */
  async searchProducts(query: string): Promise<Product[]> {
    const products = await this.getProducts();
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery)
    );
  }
}

// Singleton instance
export const productsService = new ProductsService();
