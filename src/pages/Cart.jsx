import React, { useState } from 'react';
import { useCart } from '../stores/cartStore';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

export default function Cart() {
  const { items, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const [stripeLoading, setStripeLoading] = useState(false);
  const [stripeError, setStripeError] = useState(null);

  const total = items.reduce((sum, item) => sum + Number(item.price), 0);

  const handleStripeCheckout = async () => {
    setStripeError(null);
    setStripeLoading(true);
    try {
      const origin = window.location.origin;
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/cart`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      if (data.url) window.location.href = data.url;
      else throw new Error('No checkout URL returned');
    } catch (err) {
      setStripeError(err.message || 'Something went wrong');
    } finally {
      setStripeLoading(false);
    }
  };

  const createOrder = (data, actions) => {
    const orderItems = items.map(item => ({
      name: item.title,
      unit_amount: {
        currency_code: 'USD',
        value: Number(item.price).toFixed(2)
      },
      quantity: '1'
    }));

    const itemTotal = total.toFixed(2);

    return actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: itemTotal,
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: itemTotal
            }
          }
        },
        items: orderItems
      }]
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();
      const buyerEmail = order.payer.email_address;

      // Send email with download links
      await emailjs.send(
        'service_8k4945f',
        'template_fdwy6o6',
        {
          to_email: buyerEmail,
          pattern_names: items.map(item => item.title).join(', '),
          // Generate download links for all available PDFs of each pattern
          download_links: items.map(item => {
            if (item.pdf_files && item.pdf_files.length > 0) {
              return item.pdf_files.map(p => `${item.title} (${p.language}): ${p.url}`).join('\n');
            }
            return `${item.title}: ${item.pdf_url || 'No link available'}`;
          }).join('\n\n'),
          order_id: order.id
        },
        '1przYY0tg7DiXXvf7'
      );

      clearCart();
      navigate('/thank-you', {
        state: {
          buyerEmail,
          patterns: items
        }
      });

    } catch (error) {
      console.error('Payment/Email Error:', error);
      // Handle error appropriately
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-primary mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Browse our patterns to find your next project!</p>
          <Button href="/shop">Browse Patterns</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-primary mb-2">Shopping Cart</h1>
      <p className="text-gray-600 mb-8">
        {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
      </p>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-gray-600">€{Number(item.price).toFixed(2)}</p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Total:</span>
          <span className="font-medium">€{total.toFixed(2)}</span>
        </div>

        <div className="space-y-4">
          <div>
            <button
              type="button"
              onClick={handleStripeCheckout}
              disabled={stripeLoading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {stripeLoading ? 'Redirecting to checkout…' : 'Pay with Stripe (card)'}
            </button>
            {stripeError && (
              <p className="mt-2 text-sm text-red-600">{stripeError}</p>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">or pay with</span>
            </div>
          </div>

          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            style={{ layout: 'vertical' }}
            onError={(err) => {
              console.error('PayPal Error:', err);
            }}
          />
        </div>
      </div>
    </div>
  );
}