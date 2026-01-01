-- Create coupons table
CREATE TABLE IF NOT EXISTS coupons (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('percentage', 'fixed')),
    value DECIMAL NOT NULL,
    applies_to TEXT NOT NULL CHECK (applies_to IN ('all', 'specific')),
    applicable_pattern_ids UUID[] DEFAULT '{}',
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE,
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Policies for Admin (assuming service_role or admin check)
CREATE POLICY "Admins can manage coupons" 
ON coupons 
FOR ALL 
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public can view active coupons" 
ON coupons 
FOR SELECT 
USING (
    (start_date <= NOW()) AND 
    (end_date IS NULL OR end_date >= NOW()) AND
    (usage_limit IS NULL OR used_count < usage_limit)
);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_coupons_updated_at
    BEFORE UPDATE ON coupons
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
