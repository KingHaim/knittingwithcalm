import React, { useState, useEffect } from 'react';

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const initialForm = {
  title: '',
  description: '',
  duration: '',
  skill_level: 'Beginner',
  thumbnail: '',
  video_url: '',
  topics: [],
};

export default function TutorialForm({ tutorial, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState(initialForm);
  const [topicsInput, setTopicsInput] = useState('');

  useEffect(() => {
    if (tutorial) {
      setFormData({
        title: tutorial.title || '',
        description: tutorial.description || '',
        duration: tutorial.duration || '',
        skill_level: tutorial.skillLevel || tutorial.skill_level || 'Beginner',
        thumbnail: tutorial.thumbnail || '',
        video_url: tutorial.videoUrl || tutorial.video_url || '',
        topics: Array.isArray(tutorial.topics) ? tutorial.topics : [],
      });
      setTopicsInput(Array.isArray(tutorial.topics) ? tutorial.topics.join(', ') : '');
    }
  }, [tutorial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const topics = topicsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    onSubmit({ ...formData, topics });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g. Basic Knitting Techniques"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Short description of the tutorial"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. 45:00 or 1:15:00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skill level</label>
          <select
            name="skill_level"
            value={formData.skill_level}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {SKILL_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
        <input
          type="url"
          name="video_url"
          value={formData.video_url}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="https://youtube.com/... or direct video URL"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
        <input
          type="text"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Image URL for the tutorial card"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Topics (comma-separated)</label>
        <input
          type="text"
          value={topicsInput}
          onChange={(e) => setTopicsInput(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g. Cast on, Knit stitch, Purl stitch"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLoading ? 'Saving…' : tutorial ? 'Update Tutorial' : 'Add Tutorial'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
