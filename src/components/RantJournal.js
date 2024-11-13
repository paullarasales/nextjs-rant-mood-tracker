'use client';
import { useState, useEffect } from 'react';

export default function RantJournal() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [gifUrl, setGifUrl] = useState('');
  const [rants, setRants] = useState([]);

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '😡', label: 'Angry' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '🥳', label: 'Excited' },
    { emoji: '🤔', label: 'Thoughtful' },
  ];

  useEffect(() => {
    const fetchRants = async () => {
      try {
        const response = await fetch('/api/rants');
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setRants(data);
        } else {
          console.error('Data fetched is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching rants:', error);
      }
    };
    fetchRants();
  }, []);
  

  const fetchGif = async (moodLabel) => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&s=${moodLabel}`,
        { mode: 'cors' }
      );
      const data = await response.json();
      setGifUrl(data.data.images?.downsized_medium?.url || '');
    } catch (error) {
      console.error('Error fetching GIF: ', error);
    }
  };

  useEffect(() => {
    if (selectedMood) {
      fetchGif(selectedMood.label);
    }
  }, [selectedMood]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRant = {
      title,
      mood: selectedMood ? selectedMood.label : '',
      content,
      gifUrl,
      date: new Date().toLocaleDateString(),
    };

    try {
      const response = await fetch('/api/rants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRant),
      });

      if (response.ok) {
        const savedRant = await response.json();
        setRants([savedRant, ...rants]);
        setTitle('');
        setContent('');
        setSelectedMood(null);
        setGifUrl('');
      } else {
        console.error('Error saving rant: ', response.statusText);
      }
    } catch (error) {
      console.error('Error saving rant: ', error);
    }
  };

  return (
    <>
      <h1 className="text-4xl text-center font-semibold text-black tracking-wide">Rant and Mood Tracker</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a title"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Choose Your Mood</label>
          <div className="flex space-x-2 mt-2">
            {moods.map((mood) => (
              <button
                key={mood.label}
                type="button"
                onClick={() => setSelectedMood(mood)}
                className={`p-2 rounded-lg transitions ${
                  selectedMood?.label === mood.label
                    ? 'bg-blue-100 ring-2 ring-blue-500'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span role="img" aria-label={mood.label} className="text-2xl">
                  {mood.emoji}
                </span>
              </button>
            ))}
          </div>
        </div>

        {gifUrl && (
          <div className="mt-4">
            <img
              src={gifUrl}
              alt="Mood GIF"
              className="w-full h-60 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <div>
          <label className="block text-gray-700 font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="text-black w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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

      <div className="mt-6">
        <h3 className="text-xl font-medium text-gray-600 mb-4">Rant Entries</h3>
          <ul className="space-y-4">
            {(Array.isArray(rants) ? rants : []).map((rant, index) => (
              <li
                key={index}
                className="p-5 rounded-lg bg-gray-100 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold">{rant.title}</h3>
                <p className="text-gray-700">{rant.content}</p>
                {rant.gifUrl && <img src={rant.gifUrl} alt="Gif" className="mt-3" />}
                <div className="text-sm text-gray-500 mt-2">{rant.date}</div>
              </li>
            ))}
          </ul>
        </div>
    </>
  );
}
