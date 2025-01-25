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