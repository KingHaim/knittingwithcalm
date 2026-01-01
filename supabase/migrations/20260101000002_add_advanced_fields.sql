-- Add advanced fields to patterns table
ALTER TABLE patterns 
ADD COLUMN IF NOT EXISTS slug text UNIQUE,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
ADD COLUMN IF NOT EXISTS categories text[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS size_tag text,
ADD COLUMN IF NOT EXISTS main_image text,
ADD COLUMN IF NOT EXISTS previous_price decimal(10,2),
ADD COLUMN IF NOT EXISTS pdf_files jsonb DEFAULT '[]'::jsonb;

-- Populate existing patterns with a simple slug based on title if any exist
UPDATE patterns SET slug = lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g')) WHERE slug IS NULL;
