import { supabase } from '../config/supabase';

const TABLE = 'blog_posts';

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
    excerpt: row.excerpt,
    content: row.content,
    author: row.author,
    date: row.created_at,
    readTime: row.read_time,
    image: row.image,
    category: row.category,
    tags,
  };
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string') return tags.split(',').map((t) => t.trim()).filter(Boolean);
  return [];
}

export const blogService = {
  async getPosts() {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(mapRow);
  },

  async createPost(payload) {
    const row = {
      title: payload.title,
      excerpt: payload.excerpt ?? '',
      content: payload.content ?? '',
      author: payload.author ?? '',
      read_time: payload.read_time ?? payload.readTime ?? '',
      image: payload.image ?? '',
      category: payload.category ?? '',
      tags: normalizeTags(payload.tags),
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
      image: payload.image ?? undefined,
      category: payload.category ?? undefined,
      updated_at: new Date().toISOString(),
    };
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
