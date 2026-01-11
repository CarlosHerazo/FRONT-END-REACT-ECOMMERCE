import { HttpClient } from './httpClient';
import { env } from '../../config/env';

/**
 * Singleton instance of HTTP client
 * Used across the application for API calls
 */
export const httpClient = new HttpClient(env.apiUrl);

export { HttpClient } from './httpClient';
