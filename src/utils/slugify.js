const DEFAULT_SLUG = 'blog-post';
const MAX_SLUG_LENGTH = 80;

export function slugify(value, fallback = DEFAULT_SLUG) {
  const slug = String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX_SLUG_LENGTH)
    .replace(/-+$/g, '');

  return slug || fallback;
}

export function buildBlogPath(post) {
  return `/blog/${post.slug || post.id}`;
}
