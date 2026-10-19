import { useEffect, useState } from 'react';

const USERS = [
  { id: 1, name: 'Ana Cruz', role: 'Developer' },
  { id: 2, name: 'Ben Lim', role: 'Designer' },
  { id: 3, name: 'Cara Yu', role: 'Tester' },
  { id: 4, name: 'Dan Go', role: 'Developer' }
];

function SessionTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Functional update avoids the stale `seconds` captured by the first render.
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id); // cleanup on unmount
  }, []);

  return <p><strong>Session timer:</strong> {seconds}s</p>;
}

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(USERS);
  const [searching, setSearching] = useState(false);
  const [showTimer, setShowTimer] = useState(true);

  // Simulated search request with cancellation of the previous one.
  useEffect(() => {
    setSearching(true);
    const id = setTimeout(() => {
      const q = query.trim().toLowerCase();
      setResults(
        USERS.filter((u) => u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q))
      );
      setSearching(false);
    }, 400);
    return () => clearTimeout(id); // cancels the outdated search
  }, [query]);

  // Synchronize the document title with the visible result count.
  useEffect(() => {
    document.title = `${results.length} result${results.length === 1 ? '' : 's'}`;
  }, [results.length]);

  return (
    <main>
      <h1>Live Search and Timer</h1>
      <section className="card">
        {showTimer && <SessionTimer />}
        <button className="secondary" onClick={() => setShowTimer((s) => !s)}>
          {showTimer ? 'Unmount timer' : 'Mount timer'}
        </button>
      </section>
      <section className="card">
        <label htmlFor="q">Search by name or role</label>
        <input id="q" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type to search" />
        <p className="muted" aria-live="polite">
          {searching ? 'Searching...' : `${results.length} visible result(s)`}
        </p>
        <ul>
          {results.map((u) => (
            <li key={u.id}>{u.name} - {u.role}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
