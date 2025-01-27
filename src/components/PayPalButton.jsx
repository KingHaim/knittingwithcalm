import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from '../stores/cartStore';
import { useNavigate } from 'react-router-dom';

export function PayPalButton() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  
  const createOrder = (data, actions) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total.toString(),
            currency_code: "EUR"
          },
          description: "Knitting Patterns Purchase"
        }
      ]
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      console.log('Payment completed:', details);
      clearCart();
      navigate('/success'); // Redirect to success page
    });
  };

  const onError = (err) => {
    console.error('PayPal error:', err);
    alert('There was an error processing your payment. Please try again.');
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
      style={{ layout: "horizontal" }}
    />
  );
} 