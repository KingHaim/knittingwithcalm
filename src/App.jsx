import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Bundles from './pages/Bundles';
import Tutorials from './pages/Tutorials';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/admin/Dashboard';
import AdminPatterns from './pages/admin/Patterns';
import AdminBundles from './pages/admin/Bundles';
import AdminTutorials from './pages/admin/Tutorials';
import AdminDiscounts from './pages/admin/Discounts';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PAYPAL_CLIENT_ID } from './config/paypal';
import Success from './pages/Success';
import ThankYou from './pages/ThankYou';

const queryClient = new QueryClient();

function App() {
  return (
    <PayPalScriptProvider options={{ 'client-id': PAYPAL_CLIENT_ID }}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/bundles" element={<Bundles />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/patterns" element={<AdminPatterns />} />
              <Route path="/admin/bundles" element={<AdminBundles />} />
              <Route path="/admin/tutorials" element={<AdminTutorials />} />
              <Route path="/admin/discounts" element={<AdminDiscounts />} />
              <Route path="/shop/:slug" element={<PatternPage />} />
              <Route path="/success" element={<Success />} />
              <Route path="/thank-you" element={<ThankYou />} />
            </Routes>
          </Layout>
        </Router>
      </QueryClientProvider>
    </PayPalScriptProvider>
  );
}

export default App;