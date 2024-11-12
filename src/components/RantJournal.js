'use client';

import { useState, useEffect } from 'react';

export default function RantJournal({ addRant }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedMood, setSelectedMood] = useState(null);
    const [gifUrl, setGifUrl] = useState('');

    const moods = [
        { emoji: '😊', label: 'Happy' },
        { emoji: '😢', label: 'Sad' },
        { emoji: '😡', label: 'Angry' },
        { emoji: '😴', label: 'Tired' },
        { emoji: '🥳', label: 'Excited' },
        { emoji: '🤔', label: 'Thoughtful' },
    ];

    useEffect(() => {
        if (selectedMood) {
            fetch(
                `https://api.giphy.com/v1/gifs/translate?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&s=${selectedMood.label}`,
                { mode: 'cors' }
            )
             .then((response) => response.json())
             .then((data) => {
                setGifUrl(data.data.images?.downsized_medium?.url || '');
             })
             .catch((error) => console.error('Error fetching GIF: ', error));
        }
    }, [selectedMood]);

    const handleSubmit = (e) => {
        e.preventDefault();
        addRant({
            title,
            mood: selectedMood ? selectedMood.label : '',
            content,
            gifUrl,
            date: new Date().toLocaleDateString(),
        });
        setTitle('');
        setContent('');
        setSelectedMood('');
        setGifUrl('');
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
                    <img src={gifUrl} alt="Mood GIF" className="w-full h-60 object-cover rounded-lg shadow-md"></img>
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
                className="w-full py-2 px-4 bg-blue-500 text-whitw rounded-lg hover:bg-blue-600"
            >Add Rant</button>
        </form>
        </>
    )
}   