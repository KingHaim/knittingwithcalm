/*
  # Extend Patterns and Create Discount Codes

  1. Extensions to `patterns` table:
    - `pdf_url` (text)
    - `video_url` (text)
    - `materials` (jsonb)
    - `languages` (text[])
    - `difficulty_level` (text) - using this instead of skill_level for consistency with user request
  
  2. New `discount_codes` table:
    - `id` (uuid, pk)
    - `code` (text, unique)
    - `discount_type` (text: percentage, fixed)
    - `value` (decimal)
    - `active` (boolean)
    - `created_at` (timestamptz)

  3. New `offers` table:
    - `id` (uuid, pk)
    - `title` (text)
    - `description` (text)
    - `discount_percentage` (decimal)
    - `start_date` (timestamptz)
    - `end_date` (timestamptz)
    - `active` (boolean)
*/

-- Add new columns to patterns
ALTER TABLE patterns 
ADD COLUMN IF NOT EXISTS pdf_url text,
ADD COLUMN IF NOT EXISTS video_url text,
ADD COLUMN IF NOT EXISTS materials jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS languages text[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS difficulty_level text;

-- Create discount_codes table
CREATE TABLE IF NOT EXISTS discount_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_type text NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  value decimal(10,2) NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create offers table
CREATE TABLE IF NOT EXISTS offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  discount_percentage decimal(5,2) NOT NULL,
  start_date timestamptz,
  end_date timestamptz,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

-- Admin policies for discount_codes
CREATE POLICY "Allow admin full access to discount_codes"
  ON discount_codes
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'admin@example.com'
  ));

-- Admin policies for offers
CREATE POLICY "Allow admin full access to offers"
  ON offers
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'admin@example.com'
  ));

-- Public read access for offers (active ones)
CREATE POLICY "Allow public read access to active offers"
  ON offers
  FOR SELECT
  USING (active = true);
