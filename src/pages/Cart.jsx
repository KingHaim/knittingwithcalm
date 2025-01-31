import React from 'react';
import { useCart } from '../stores/cartStore';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

export default function Cart() {
  const { items, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  
  const total = items.reduce((sum, item) => sum + Number(item.price), 0);

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
          // If multiple items, join their names with commas
          pattern_names: items.map(item => item.title).join(', '),
          // Generate download links for each pattern
          download_links: items.map(item => item.downloadUrl).join('\n'),
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
      <h1 className="text-4xl font-primary mb-8">Shopping Cart</h1>
      
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-gray-600">${Number(item.price).toFixed(2)}</p>
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
          <span className="font-medium">${total.toFixed(2)}</span>
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
  );
}