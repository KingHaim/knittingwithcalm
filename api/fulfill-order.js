import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe is not configured' });
  }

  const session_id =
    req.query?.session_id || req.body?.session_id;

  if (!session_id) {
    return res.status(400).json({ error: 'Missing session_id' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const email = session.customer_email || session.customer_details?.email;
    let items = [];

    if (session.metadata?.cart) {
      try {
        items = JSON.parse(session.metadata.cart);
      } catch {
        items = [];
      }
    }

    return res.status(200).json({ email, items });
  } catch (err) {
    console.error('Fulfill order error:', err);
    return res.status(500).json({
      error: err.message || 'Failed to retrieve order',
    });
  }
}
