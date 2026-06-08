-- Public buckets for blog and pattern images
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('blog-images', 'blog-images', true),
  ('patterns-images', 'patterns-images', true)
ON CONFLICT (id) DO NOTHING;

DO $$
DECLARE
  b text;
  buckets text[] := ARRAY['blog-images', 'patterns-images'];
BEGIN
  FOREACH b IN ARRAY buckets LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Public read %s" ON storage.objects;', b);
    EXECUTE format(
      'CREATE POLICY "Public read %s" ON storage.objects FOR SELECT USING (bucket_id = %L);',
      b, b
    );
    EXECUTE format('DROP POLICY IF EXISTS "Upload %s" ON storage.objects;', b);
    EXECUTE format(
      'CREATE POLICY "Upload %s" ON storage.objects FOR INSERT WITH CHECK (bucket_id = %L);',
      b, b
    );
    EXECUTE format('DROP POLICY IF EXISTS "Update %s" ON storage.objects;', b);
    EXECUTE format(
      'CREATE POLICY "Update %s" ON storage.objects FOR UPDATE USING (bucket_id = %L);',
      b, b
    );
    EXECUTE format('DROP POLICY IF EXISTS "Delete %s" ON storage.objects;', b);
    EXECUTE format(
      'CREATE POLICY "Delete %s" ON storage.objects FOR DELETE USING (bucket_id = %L);',
      b, b
    );
  END LOOP;
END $$;
