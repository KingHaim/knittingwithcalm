import React, { useState } from 'react';
import { newsletterService } from '../../services/newsletterService';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const result = await newsletterService.subscribe(email);

      if (result.alreadySubscribed) {
        setStatus('info');
        setMessage("You're already subscribed! We'll keep you updated.");
      } else if (result.resubscribed) {
        setStatus('success');
        setMessage('Welcome back! Your subscription has been reactivated.');
      } else {
        setStatus('success');
        setMessage('Thank you for subscribing! Check your inbox for a welcome email.');
      }

      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
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
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {status === 'success' && (
            <p className="text-green-600 mt-4">{message}</p>
          )}
          {status === 'info' && (
            <p className="text-blue-600 mt-4">{message}</p>
          )}
          {status === 'error' && (
            <p className="text-red-600 mt-4">{message}</p>
          )}
        </div>
      </div>
    </section>
  );
}
