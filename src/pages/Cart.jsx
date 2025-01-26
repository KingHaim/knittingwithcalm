import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useCart } from '../stores/cartStore';
import Button from '../components/ui/Button';

export default function Cart() {
  const { items, removeItem, clearCart } = useCart();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handlePaypalApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      // Handle successful purchase
      clearCart();
      // Here you would typically:
      // 1. Save the order to your database
      // 2. Send the patterns to the customer's email
      // 3. Redirect to a success page
      alert('Thank you for your purchase! Check your email for the patterns.');
    });
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
      <h1 className="text-3xl font-primary mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {items.map(item => (
              <div key={item.id} className="p-4 border-b last:border-b-0">
                <div className="flex items-center gap-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-6">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: total.toFixed(2),
                        currency_code: "USD"
                      },
                      description: `KnitPatterns - ${items.length} pattern${items.length > 1 ? 's' : ''}`
                    }
                  ]
                });
              }}
              onApprove={handlePaypalApprove}
              style={{ layout: "vertical" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}