'use client';

import { useState } from 'react';
import RantJournal from '../components/RantJournal';

export default function Home() {
  const [rants, setRants] = useState([]);
  const addRant = (rant) => setRants([rant, ...rants]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Mood & Rant Tracker</h1>

        <div className="grid grid-cols-1 gap-8">

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Rant Journal</h2>
            <RantJournal addRant={addRant} />
            <div className="mt-4">
              <h3 className="text-xl font-medium text-gray-700 mb-2">Rant Entries</h3>
              <ul className="space-y-4">
                {rants.map((rant, index) => (
                  <li key={index} className="p-4 border rounded-lg bg-gray-50">
                    <strong>{rant.date}</strong> - <em className="text-blue-600">{rant.mood}</em> - <span className="font-semibold">{rant.title}</span>
                    <p className="text-gray-600">{rant.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
