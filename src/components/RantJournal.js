import { useState } from 'react';

export default function MoodForm({ addEntry }) {
    const [mood, setMood] = useState('');
    const [reflection, setReflection] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mood && reflection) {
            addEntry({ mood, reflection, date: new Date().toLocaleDateString() });
            setMood('');
            setReflection('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="Mood (e.g., Happy)"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
            />
            <textarea 
                placeholder="Write a short reflection..."
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
            />
            <button type="submit">Add Mood</button>
        </form>
    )
}