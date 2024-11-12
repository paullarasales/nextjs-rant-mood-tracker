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
          <RantJournal />
        </ProtectedRoute>
      </div>
    </div>
  );
}
