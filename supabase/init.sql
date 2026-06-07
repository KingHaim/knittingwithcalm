-- =====================================================================
-- Knitting With Calm — consolidated database setup
-- =====================================================================
-- Run this ONCE against a fresh database (e.g. a self-hosted Supabase
-- instance on Railway). Paste it into the Studio SQL editor, or run:
--   psql "$DATABASE_URL" -f supabase/init.sql
--
-- NOTE ON SECURITY: this app has no real server-side auth (admin login
-- is mocked client-side and all access uses the anon key). Therefore
-- every table below uses permissive RLS policies (USING true). Do NOT
-- treat this database as private — anyone with the anon key + URL can
-- read/write these tables. Add real auth before storing sensitive data.
-- =====================================================================

-- Required for uuid_generate_v4() used by the coupons table.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------
-- Shared trigger function: keep updated_at fresh
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------------------
-- patterns
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS patterns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  images text[] NOT NULL DEFAULT '{}',
  category text NOT NULL,
  yarn_weight text NOT NULL,
  skill_level text NOT NULL,
  pdf_url text,
  video_url text,
  materials jsonb DEFAULT '{}'::jsonb,
  languages text[] DEFAULT '{}'::text[],
  difficulty_level text,
  slug text UNIQUE,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  categories text[] DEFAULT '{}'::text[],
  size_tag text,
  main_image text,
  previous_price decimal(10,2),
  pdf_files jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ---------------------------------------------------------------------
-- bundles + bundle_patterns
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bundles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  savings decimal(10,2) NOT NULL,
  image text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bundle_patterns (
  bundle_id uuid REFERENCES bundles(id) ON DELETE CASCADE,
  pattern_id uuid REFERENCES patterns(id) ON DELETE CASCADE,
  PRIMARY KEY (bundle_id, pattern_id)
);

-- ---------------------------------------------------------------------
-- tutorials
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tutorials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  duration text DEFAULT '',
  skill_level text DEFAULT 'Beginner' CHECK (skill_level IN ('Beginner', 'Intermediate', 'Advanced')),
  thumbnail text DEFAULT '',
  video_url text DEFAULT '',
  topics jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ---------------------------------------------------------------------
-- discount_codes
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS discount_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_type text NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  value decimal(10,2) NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- ---------------------------------------------------------------------
-- offers
-- ---------------------------------------------------------------------
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

-- ---------------------------------------------------------------------
-- coupons
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS coupons (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  code text UNIQUE NOT NULL,
  type text NOT NULL CHECK (type IN ('percentage', 'fixed', 'free_pattern')),
  value decimal NOT NULL,
  applies_to text NOT NULL CHECK (applies_to IN ('all', 'specific')),
  applicable_pattern_ids uuid[] DEFAULT '{}',
  gift_pattern_id uuid REFERENCES patterns(id),
  start_date timestamptz DEFAULT now(),
  end_date timestamptz,
  usage_limit integer,
  used_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ---------------------------------------------------------------------
-- blog_posts
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  excerpt text DEFAULT '',
  content text DEFAULT '',
  author text DEFAULT '',
  read_time text DEFAULT '',
  image text DEFAULT '',
  category text DEFAULT '',
  tags jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ---------------------------------------------------------------------
-- newsletter_subscribers
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  status text DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  source text DEFAULT 'website',
  subscribed_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz
);

-- ---------------------------------------------------------------------
-- updated_at triggers (idempotent)
-- ---------------------------------------------------------------------
DROP TRIGGER IF EXISTS update_patterns_updated_at ON patterns;
CREATE TRIGGER update_patterns_updated_at BEFORE UPDATE ON patterns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bundles_updated_at ON bundles;
CREATE TRIGGER update_bundles_updated_at BEFORE UPDATE ON bundles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tutorials_updated_at ON tutorials;
CREATE TRIGGER update_tutorials_updated_at BEFORE UPDATE ON tutorials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_coupons_updated_at ON coupons;
CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------
-- Row Level Security: enable + permissive policies for the anon key.
-- (App has no real auth; access is via the anon role only.)
-- ---------------------------------------------------------------------
-- Make sure the API roles can reach the public schema. These roles are
-- created by every Supabase install (self-hosted included). Guarded so the
-- script still runs on a vanilla Postgres without them.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public
      GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO anon, authenticated, service_role;
  END IF;
END $$;

DO $$
DECLARE
  t text;
  has_api_roles boolean := EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon');
  tables text[] := ARRAY[
    'patterns', 'bundles', 'bundle_patterns', 'tutorials',
    'discount_codes', 'offers', 'coupons', 'blog_posts',
    'newsletter_subscribers'
  ];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', t);
    EXECUTE format('DROP POLICY IF EXISTS "Public full access" ON %I;', t);
    EXECUTE format(
      'CREATE POLICY "Public full access" ON %I FOR ALL USING (true) WITH CHECK (true);',
      t
    );
    IF has_api_roles THEN
      EXECUTE format(
        'GRANT SELECT, INSERT, UPDATE, DELETE ON %I TO anon, authenticated, service_role;',
        t
      );
    END IF;
  END LOOP;
END $$;
