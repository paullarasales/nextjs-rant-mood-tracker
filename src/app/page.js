'use client';
import { useState } from 'react';
import ProtectedRoute from "../components/ProtectedRoute";
import RantJournal from "../components/RantJournal";

export default function Home() {
  const [rants, setRants] = useState([]);
  const addRant = (rant) => setRants([rant, ...rants]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <ProtectedRoute>
          <RantJournal addRant={addRant} />
          <div className="mt-8">
            <h3 className="text-xl font-medium text-gray-600 mb-4">Rant Entries</h3>
            <ul className="space-y-4">
              {rants.map((rant, index) => (
                <li
                  key={index}
                  className="p-5 rounded-lg bg-gray-100 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold text-gray-800">{rant.mood}</span>
                    <span className="text-sm text-gray-500">{rant.date}</span>
                  </div>
                  <div className="text-gray-700">
                    <p className="font-semibold text-gray-800 text-lg">{rant.title}</p>
                    <p className="text-gray-600 mt-1">{rant.content}</p>
                    {rant.gifUrl && (
                      <img
                        src={rant.gifUrl}
                        alt="Rant GIF"
                        className="mt-4 w-full max-h-64 object-cover rounded-lg shadow-md"
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ProtectedRoute>
      </div>
    </div>
  );
}
