import { supabase } from '../config/supabase';

const TABLE = 'tutorials';

/**
 * Map DB row to shape expected by TutorialCard / public UI
 */
function mapRow(row) {
  if (!row) return null;
  let topics = [];
  if (Array.isArray(row.topics)) topics = row.topics;
  else if (row.topics && typeof row.topics === 'string') {
    try {
      topics = JSON.parse(row.topics);
    } catch {
      topics = [];
    }
  }
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    duration: row.duration,
    skillLevel: row.skill_level,
    thumbnail: row.thumbnail,
    videoUrl: row.video_url,
    topics,
  };
}

export const tutorialService = {
  async getTutorials() {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(mapRow);
  },

  _normalizeTopics(topics) {
    if (Array.isArray(topics)) return topics;
    if (typeof topics === 'string') return topics.split(',').map((t) => t.trim()).filter(Boolean);
    return [];
  },

  async createTutorial(payload) {
    const topics = this._normalizeTopics(payload.topics);
    const row = {
      title: payload.title,
      description: payload.description ?? '',
      duration: payload.duration ?? '',
      skill_level: payload.skill_level || payload.skillLevel || 'Beginner',
      thumbnail: payload.thumbnail || '',
      video_url: payload.video_url || payload.videoUrl || '',
      topics,
    };
    const { data, error } = await supabase.from(TABLE).insert([row]).select().single();
    if (error) throw error;
    return mapRow(data);
  },

  async updateTutorial(id, payload) {
    const row = {
      title: payload.title,
      description: payload.description ?? '',
      duration: payload.duration ?? '',
      skill_level: payload.skill_level ?? payload.skillLevel ?? undefined,
      thumbnail: payload.thumbnail ?? undefined,
      video_url: payload.video_url ?? payload.videoUrl ?? undefined,
      updated_at: new Date().toISOString(),
    };
    if (payload.topics !== undefined) {
      row.topics = this._normalizeTopics(payload.topics);
    }
    const { data, error } = await supabase.from(TABLE).update(row).eq('id', id).select().single();
    if (error) throw error;
    return mapRow(data);
  },

  async deleteTutorial(id) {
    const { error } = await supabase.from(TABLE).delete().eq('id', id);
    if (error) throw error;
  },
};
