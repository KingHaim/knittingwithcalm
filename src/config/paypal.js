import { env } from './environment';

export const paypalConfig = {
  "client-id": "AYsOmsJ-BaZgz45H8oiqHZ2Xgtz0uPaCf-OTo9qK1Xdo2Wl3L3RnjL1-dpZlNtg-aDZslsbZS-RXo6TA",
  currency: "EUR",
  intent: "capture",
  // Enable sandbox mode for development
  "enable-funding": "card",
  "components": "buttons",
  "debug": true
};

export const PAYPAL_CLIENT_ID = 'AYsOmsJ-BaZgz45H8oiqHZ2Xgtz0uPaCf-OTo9qK1Xdo2Wl3L3RnjL1-dpZlNtg-aDZslsbZS-RXo6TA';

export const PAYPAL_OPTIONS = {
  currency: 'EUR',
  intent: 'capture'
};