import { useLocation } from 'react-router-dom';

export function ThankYou() {
  const location = useLocation();
  const { buyerEmail } = location.state || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Thank You for Your Purchase!</h1>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <p className="text-lg mb-2">🎉 Your payment has been completed successfully!</p>
          <p className="text-gray-600">
            We've sent your knitting pattern to:
            <br />
            <span className="font-medium">{buyerEmail}</span>
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-gray-600">
            Please check your email inbox for the download link.
            <br />
            <span className="text-sm">(Don't forget to check your spam folder if you don't see it)</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ThankYou; 