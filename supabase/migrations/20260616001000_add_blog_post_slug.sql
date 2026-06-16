-- Add editable URL handles to blog posts.
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS slug text;

WITH base_slugs AS (
  SELECT
    id,
    created_at,
    COALESCE(
      NULLIF(
        regexp_replace(
          lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g')),
          '(^-|-$)',
          '',
          'g'
        ),
        ''
      ),
      'blog-post'
    ) AS base_slug
  FROM blog_posts
  WHERE slug IS NULL OR slug = ''
),
ranked_slugs AS (
  SELECT
    id,
    base_slug,
    row_number() OVER (PARTITION BY base_slug ORDER BY created_at, id) AS duplicate_number
  FROM base_slugs
),
final_slugs AS (
  SELECT
    id,
    CASE
      WHEN duplicate_number = 1 THEN left(base_slug, 80)
      ELSE concat(
        left(base_slug, 71),
        '-',
        left(id::text, 8)
      )
    END AS slug
  FROM ranked_slugs
)
UPDATE blog_posts
SET slug = final_slugs.slug
FROM final_slugs
WHERE blog_posts.id = final_slugs.id;

ALTER TABLE blog_posts
ALTER COLUMN slug SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_key
ON blog_posts (slug);
