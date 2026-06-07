import { supabase } from '../config/supabase';

const TABLE = 'newsletter_subscribers';

export const newsletterService = {
    async subscribe(email) {
        const { data: existing } = await supabase
            .from(TABLE)
            .select('id, status')
            .eq('email', email.toLowerCase().trim())
            .maybeSingle();

        if (existing) {
            if (existing.status === 'active') {
                return { alreadySubscribed: true };
            }
            // Re-activate a previously unsubscribed user
            const { error } = await supabase
                .from(TABLE)
                .update({ status: 'active', unsubscribed_at: null })
                .eq('id', existing.id);
            if (error) throw error;
            return { resubscribed: true };
        }

        const { error } = await supabase
            .from(TABLE)
            .insert([{ email: email.toLowerCase().trim() }]);

        if (error) throw error;

        // Send welcome email via Resend (if configured)
        await this.sendWelcomeEmail(email);

        return { success: true };
    },

    async unsubscribe(email) {
        const { error } = await supabase
            .from(TABLE)
            .update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
            .eq('email', email.toLowerCase().trim());

        if (error) throw error;
        return { success: true };
    },

    async getSubscribers() {
        const { data, error } = await supabase
            .from(TABLE)
            .select('*')
            .eq('status', 'active')
            .order('subscribed_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    async sendWelcomeEmail(email) {
        const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;
        if (!resendApiKey) return;

        try {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${resendApiKey}`,
                },
                body: JSON.stringify({
                    from: import.meta.env.VITE_RESEND_FROM_EMAIL || 'Knitting With Calm <newsletter@knittingwithcalm.com>',
                    to: [email],
                    subject: 'Welcome to Knitting With Calm! 🧶',
                    html: `
                        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                            <h1 style="font-size: 24px; color: #1a1a1a;">Welcome to Knitting With Calm</h1>
                            <p style="color: #555; line-height: 1.8; font-size: 16px;">
                                Thank you for subscribing to our newsletter! You'll be the first to know about:
                            </p>
                            <ul style="color: #555; line-height: 2; font-size: 16px;">
                                <li>New knitting patterns</li>
                                <li>Exclusive tutorials and tips</li>
                                <li>Special offers and discounts</li>
                            </ul>
                            <p style="color: #555; line-height: 1.8; font-size: 16px;">
                                Happy knitting! 🧶
                            </p>
                            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                            <p style="color: #999; font-size: 12px;">
                                You received this email because you subscribed at knittingwithcalm.com
                            </p>
                        </div>
                    `,
                }),
            });
        } catch (err) {
            console.warn('Welcome email failed (non-blocking):', err);
        }
    },
};
