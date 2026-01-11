/**
 * Environment configuration
 * Centralized access to environment variables
 */
export const env = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  wompiPublicKey: import.meta.env.VITE_WOMPI_PUBLIC_KEY || 'pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7',
  environment: import.meta.env.MODE || 'development',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;
