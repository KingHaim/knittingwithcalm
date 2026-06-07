import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ComingSoon from './pages/ComingSoon';
import SignIn from './pages/SignIn';
import Dashboard from './pages/admin/Dashboard';
import AdminPatterns from './pages/admin/Patterns';
import AdminBundles from './pages/admin/Bundles';
import AdminTutorials from './pages/admin/Tutorials';
import AdminDiscounts from './pages/admin/Discounts';
import AdminBlog from './pages/admin/Blog';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PAYPAL_CLIENT_ID } from './config/paypal';

const queryClient = new QueryClient();

function App() {
  return (
    <PayPalScriptProvider options={{ 'client-id': PAYPAL_CLIENT_ID }}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<ComingSoon />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/patterns" element={<AdminPatterns />} />
            <Route path="/admin/bundles" element={<AdminBundles />} />
            <Route path="/admin/tutorials" element={<AdminTutorials />} />
            <Route path="/admin/discounts" element={<AdminDiscounts />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </PayPalScriptProvider>
  );
}

export default App;
