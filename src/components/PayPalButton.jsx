import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from '../stores/cartStore';

export function PayPalButton() {
  const { items, clearCart } = useCart();
  
  const createOrder = (data, actions) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total.toString(),
            currency_code: "EUR"
          }
        }
      ]
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      clearCart();
      // Add your success handling here (e.g., redirect to success page)
    });
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
    />
  );
} 