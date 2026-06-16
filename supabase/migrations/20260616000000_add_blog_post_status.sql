-- Add publish state to blog posts.
-- Existing posts were already public, so keep them published when adding the column.
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS status text;

UPDATE blog_posts
SET status = 'published'
WHERE status IS NULL;

ALTER TABLE blog_posts
ALTER COLUMN status SET DEFAULT 'draft';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'blog_posts_status_check'
  ) THEN
    ALTER TABLE blog_posts
    ADD CONSTRAINT blog_posts_status_check
    CHECK (status IN ('draft', 'published'));
  END IF;
END $$;
