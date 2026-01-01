-- Update coupons table to support free pattern gifts
ALTER TABLE coupons DROP CONSTRAINT IF EXISTS coupons_type_check;
ALTER TABLE coupons ADD CONSTRAINT coupons_type_check CHECK (type IN ('percentage', 'fixed', 'free_pattern'));

ALTER TABLE coupons ADD COLUMN IF NOT EXISTS gift_pattern_id UUID REFERENCES patterns(id);
