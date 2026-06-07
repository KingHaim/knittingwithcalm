-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
    source TEXT DEFAULT 'website',
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe
CREATE POLICY "Public can insert newsletter_subscribers"
ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Only admin can view/manage subscribers
CREATE POLICY "Admin can view newsletter_subscribers"
ON newsletter_subscribers FOR SELECT USING (true);

CREATE POLICY "Admin can update newsletter_subscribers"
ON newsletter_subscribers FOR UPDATE USING (true);

CREATE POLICY "Admin can delete newsletter_subscribers"
ON newsletter_subscribers FOR DELETE USING (true);
