import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add your newsletter signup logic here
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-primary mb-4">Join Our Newsletter</h2>
          <p className="text-gray-600 mb-8">
            Get updates on new patterns, tutorials, and exclusive offers.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1 max-w-md"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
          {status === 'success' && (
            <p className="text-green-600 mt-4">Thank you for subscribing!</p>
          )}
          {status === 'error' && (
            <p className="text-red-600 mt-4">Something went wrong. Please try again.</p>
          )}
        </div>
      </div>
    </section>
  );
} 