'use client';

import { useState } from 'react';

export default function RantJournal({ addRant }) {
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addRant({
      title,
      mood,
      content,
      date: new Date().toLocaleDateString(),
    });
    setTitle('');
    setMood('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a title"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Mood</label>
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your mood"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Write your rant"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Rant
      </button>
    </form>
  );
}