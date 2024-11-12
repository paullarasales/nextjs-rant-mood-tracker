export default function MoodList({ entries }) {
    return (
        <div>
            <h2>Mood History</h2>
            <ul>
                {entries.map((entry, index) => (
                    <li key={index}>
                        <strong>{entry.date}</strong> - {entry.mood} - {entry.reflection}
                    </li>
                ))}
            </ul>
        </div>
    );
}