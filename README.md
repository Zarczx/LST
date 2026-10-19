# Exam 2 - Live Search and Timer (useEffect, useState)

Run: `npm install` then `npm run dev`. Uses local data only.

## Completed requirements
- Filter runs in an effect after `query` changes, with a 400 ms delay that simulates a request.
- The previous delayed search is cancelled (`clearTimeout` in the effect cleanup), so fast typing never shows outdated results.
- One-second session timer using `setInterval`; the interval is cleared on unmount (use the Unmount/Mount button to verify).
- `document.title` shows the visible result count and updates whenever the count changes.

## Debugging cases
- **Effect that updates its own dependency:** an effect like `useEffect(() => setResults([...results, x]), [results])`
  changes `results`, which re-triggers the effect forever. Fix: depend only on the true input (`[query]`) and compute from that input, not from the state the effect sets.
- **Timer stuck at 1:** `setInterval(() => setSeconds(seconds + 1), 1000)` with `[]` captures `seconds = 0` forever.
  Fix: `setSeconds((s) => s + 1)`.
- **Cleanup functions:** the search cleanup (`clearTimeout`) runs before the next effect run and on unmount, so only the latest delayed
  search can update state. The interval cleanup (`clearInterval`) stops the timer on unmount so duplicates never stack up.

## Known limitations
- The delay is simulated; there is no real request or loading error state.
- Search matches name or role (case-insensitive substring).

## Test steps
1. Type "dev" quickly: after about 0.4 s only Ana Cruz and Dan Go appear; the tab title says "2 results".
2. Type then quickly clear: only the final query's result shows.
3. Timer increases by 1 each second. Click Unmount timer, then Mount timer: it restarts at 0 with a single interval.
