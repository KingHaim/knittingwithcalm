import { supabase } from '../config/supabase';
import { fileToDataUrl } from '../utils/compressImage';
import { slugify } from '../utils/slugify';

const TABLE = 'blog_posts';
const IMAGE_BUCKETS = ['blog-images', 'patterns-images'];
const STATUS_OPTIONS = ['draft', 'published'];
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function normalizeStatus(status, fallback = 'draft') {
  return STATUS_OPTIONS.includes(status) ? status : fallback;
}

function applyStatusFilter(query, status) {
  if (status && status !== 'all') {
    return query.eq('status', normalizeStatus(status, 'published'));
  }
  return query;
}

function isBucketMissingError(error) {
  return /bucket not found/i.test(error?.message || '');
}

function buildImagePath(bucket, folder, fileExt) {
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  if (bucket === 'patterns-images') {
    return `blog/${folder}/${fileName}`;
  }
  return folder ? `${folder}/${fileName}` : fileName;
}

async function uploadImage(file, folder = 'content') {
  const fileExt = file.name.split('.').pop();
  let lastError = null;

  for (const bucket of IMAGE_BUCKETS) {
    const filePath = buildImagePath(bucket, folder, fileExt);
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);
      return publicUrl;
    }

    lastError = uploadError;
    if (!isBucketMissingError(uploadError)) throw uploadError;
  }

  if (isBucketMissingError(lastError)) {
    console.warn(
      'Supabase storage buckets are missing. Embedding image inline. ' +
        'Run "npm run setup:storage" after adding SUPABASE_SERVICE_ROLE_KEY to .env.'
    );
    return fileToDataUrl(file);
  }

  throw lastError || new Error('Failed to upload image.');
}

async function resolveImageUrl(image, imageFile) {
  if (imageFile instanceof File) {
    return uploadImage(imageFile, 'featured');
  }
  return image ?? '';
}

function mapRow(row) {
  if (!row) return null;
  let tags = [];
  if (Array.isArray(row.tags)) tags = row.tags;
  else if (row.tags && typeof row.tags === 'string') {
    try {
      tags = JSON.parse(row.tags);
    } catch {
      tags = [];
    }
  }
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    author: row.author,
    date: row.created_at,
    readTime: row.read_time,
    image: row.image,
    category: row.category,
    tags,
    status: normalizeStatus(row.status),
  };
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string') return tags.split(',').map((t) => t.trim()).filter(Boolean);
  return [];
}

async function getAvailableSlug(value, currentId) {
  const baseSlug = slugify(value);
  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('id')
      .eq('slug', candidate)
      .maybeSingle();

    if (error) throw error;
    if (!data || data.id === currentId) return candidate;

    const suffixText = `-${suffix}`;
    candidate = `${baseSlug.slice(0, 80 - suffixText.length).replace(/-+$/g, '')}${suffixText}`;
    suffix += 1;
  }
}

export const blogService = {
  uploadImage,

  async getPosts({ status } = {}) {
    let query = supabase
      .from(TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    query = applyStatusFilter(query, status);

    const { data, error } = await query;

    if (error) throw error;
    return (data || []).map(mapRow);
  },

  async getPublishedPosts() {
    return this.getPosts({ status: 'published' });
  },

  async getPostById(id, { status } = {}) {
    let query = supabase
      .from(TABLE)
      .select('*')
      .eq('id', id);

    query = applyStatusFilter(query, status);

    const { data, error } = await query.single();

    if (error) throw error;
    return mapRow(data);
  },

  async getPostByHandle(handle, { status } = {}) {
    const normalizedHandle = String(handle || '').trim();
    if (!normalizedHandle) return null;

    let query = supabase
      .from(TABLE)
      .select('*')
      .eq('slug', normalizedHandle);
    query = applyStatusFilter(query, status);

    const { data, error } = await query.maybeSingle();
    if (error) throw error;
    if (data) return mapRow(data);

    if (UUID_PATTERN.test(normalizedHandle)) {
      return this.getPostById(normalizedHandle, { status });
    }

    return null;
  },

  async getPublishedPostByHandle(handle) {
    return this.getPostByHandle(handle, { status: 'published' });
  },

  async createPost(payload) {
    const imageUrl = await resolveImageUrl(payload.image, payload.imageFile);
    const slug = await getAvailableSlug(payload.slug || payload.title);
    const row = {
      title: payload.title,
      slug,
      excerpt: payload.excerpt ?? '',
      content: payload.content ?? '',
      author: payload.author ?? '',
      read_time: payload.read_time ?? payload.readTime ?? '',
      image: imageUrl,
      category: payload.category ?? '',
      tags: normalizeTags(payload.tags),
      status: normalizeStatus(payload.status),
    };
    const { data, error } = await supabase.from(TABLE).insert([row]).select().single();
    if (error) throw error;
    return mapRow(data);
  },

  async updatePost(id, payload) {
    const row = {
      title: payload.title,
      excerpt: payload.excerpt ?? '',
      content: payload.content ?? '',
      author: payload.author ?? '',
      read_time: payload.read_time ?? payload.readTime ?? undefined,
      category: payload.category ?? undefined,
      updated_at: new Date().toISOString(),
    };
    if (payload.slug !== undefined || payload.title !== undefined) {
      row.slug = await getAvailableSlug(payload.slug || payload.title, id);
    }
    if (payload.status !== undefined) {
      row.status = normalizeStatus(payload.status);
    }
    if (payload.imageFile instanceof File) {
      row.image = await resolveImageUrl(payload.image, payload.imageFile);
    } else if (payload.image !== undefined) {
      row.image = payload.image;
    }
    if (payload.tags !== undefined) {
      row.tags = normalizeTags(payload.tags);
    }
    const { data, error } = await supabase.from(TABLE).update(row).eq('id', id).select().single();
    if (error) throw error;
    return mapRow(data);
  },

  async deletePost(id) {
    const { error } = await supabase.from(TABLE).delete().eq('id', id);
    if (error) throw error;
  },
};
