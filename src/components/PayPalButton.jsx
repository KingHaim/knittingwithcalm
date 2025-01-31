import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from '../stores/cartStore';
import { useNavigate } from 'react-router-dom';

export function PayPalButton() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  
  const createOrder = (data, actions) => {
    // Format each item price and calculate total
    const formattedItems = items.map(item => ({
      name: item.title || "Digital Pattern",
      unit_amount: {
        currency_code: "USD",
        value: Number(item.price).toFixed(2)
      },
      quantity: "1",
      category: "DIGITAL_GOODS"
    }));

    // Calculate total from formatted prices
    const itemTotal = formattedItems.reduce((sum, item) => {
      return sum + (Number(item.unit_amount.value) * Number(item.quantity));
    }, 0).toFixed(2);

    console.log('Debug - Items:', formattedItems);
    console.log('Debug - Total:', itemTotal);

    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [{
        items: formattedItems,
        amount: {
          currency_code: "USD",
          value: itemTotal,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: itemTotal
            }
          }
        }
      }]
    });
  };

  // Don't render if cart is empty
  if (!items.length) {
    return null;
  }

  return (
    <div className="paypal-button-container">
      <PayPalButtons
        createOrder={createOrder}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          console.log('Payment successful:', order);
          clearCart();
          navigate('/thank-you');
        }}
        onError={(err) => {
          console.error('PayPal Error:', {
            message: err.message,
            details: err.details
          });
        }}
        style={{
          layout: 'vertical',
          shape: 'rect'
        }}
      />
    </div>
  );
} 