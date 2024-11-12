'use client';

import { useState } from 'react';

export default function MoodForm({ addEntry }) {
  const [mood, setMood] = useState('');
  const [reflection, setReflection] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addEntry({
      mood,
      reflection,
      date: new Date().toLocaleDateString(),
    });
    setMood('');
    setReflection('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <label className="block text-gray-700 font-medium">Reflection</label>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Share your thoughts"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Mood Entry
      </button>
    </form>
  );
}
