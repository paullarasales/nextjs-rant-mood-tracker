export default function MoodList({ entries }) {
    return (
      <div className="mt-4">
        <h3 className="text-xl font-medium text-gray-700 mb-2">Mood Entries</h3>
        <ul className="space-y-4">
          {entries.map((entry, index) => (
            <li key={index} className="p-4 border rounded-lg bg-gray-50">
              <strong>{entry.date}</strong> - <em className="text-blue-600">{entry.mood}</em>
              <p className="text-gray-600">{entry.reflection}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }