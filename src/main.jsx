import React from 'react';
import ReactDOM from 'react-dom/client';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import App from './App';
import { paypalConfig } from './config/paypal';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PayPalScriptProvider options={paypalConfig}>
      <App />
    </PayPalScriptProvider>
  </React.StrictMode>,
);