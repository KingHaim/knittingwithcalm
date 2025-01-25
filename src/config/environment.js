// Environment configuration with fallbacks
export const env = {
  paypal: {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'sandbox',
    currency: import.meta.env.VITE_PAYPAL_CURRENCY || 'USD',
    intent: import.meta.env.VITE_PAYPAL_INTENT || 'capture'
  },
  isDevelopment: import.meta.env.DEV
};