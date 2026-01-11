import { HttpClient } from './httpClient';
import { env } from '../../config/env';

/**
 * Singleton instance of HTTP client
 * Used across the application for API calls
 * Timeout: 30 seconds for production environments with payment processing
 */
export const httpClient = new HttpClient(env.apiUrl, 30000);

export { HttpClient } from './httpClient';
