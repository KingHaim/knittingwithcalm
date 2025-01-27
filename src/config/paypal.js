import { env } from './environment';

export const paypalConfig = {
  "client-id": env.paypal.clientId,
  currency: env.paypal.currency,
  intent: env.paypal.intent,
  // Enable sandbox mode for development
  ...(env.isDevelopment && {
    "enable-funding": "card",
    "components": "buttons",
    "debug": true
  })
};

export const PAYPAL_CLIENT_ID = 'your_client_id_here';

export const PAYPAL_OPTIONS = {
  currency: 'EUR',
  intent: 'capture'
};