// Automated test for FSRS and SessionScheduler
import { FSRSEngine, FSRS_RATING, FSRS_STATE } from '../public/js/fsrs.js';
import { SessionScheduler } from '../public/js/scheduler.js';

function assert(condition, message) {
  if (!condition) {
    console.error('FAIL:', message);
    process.exit(1);
  }
}

console.log('--- Testing FSRS Engine ---');
const engine = new FSRSEngine();
const now = Date.now();

// 1. Initial rating (Good)
const card1 = engine.rate(null, FSRS_RATING.GOOD, now);
console.log('Card 1 after Good:', card1);
assert(card1.reps === 1, 'Card reps should be 1');
assert(card1.stability > 1, 'Stability should be > 1 day');
assert(card1.due > now, 'Due time should be in the future');
assert(card1.state === FSRS_STATE.REVIEW, 'State should be review');

// 2. Initial rating (Again)
const cardAgain = engine.rate(null, FSRS_RATING.AGAIN, now);
console.log('Card Again:', cardAgain);
assert(cardAgain.lapses === 1, 'Lapse count should be 1');
assert(cardAgain.state === FSRS_STATE.LEARNING, 'State should be learning');

// 3. Repeat after 3 days
const threeDaysLater = now + 3 * 24 * 60 * 60 * 1000;
const rBefore = engine.getRetrievability(card1, threeDaysLater);
console.log('Retrievability after 3 days:', rBefore);
assert(rBefore > 0.4 && rBefore <= 1.0, 'R should decay reasonably');

const card1SecondReview = engine.rate(card1, FSRS_RATING.GOOD, threeDaysLater);
console.log('Card 1 after 2nd Good:', card1SecondReview);
assert(card1SecondReview.reps === 2, 'Reps should be 2');
assert(card1SecondReview.stability > card1.stability, 'Stability should increase after successful recall');

console.log('--- Testing SessionScheduler ---');
// Mock 20 exercises
const mockExercises = Array.from({ length: 20 }, (_, i) => ({
  id: `ex-${i + 1}`,
  prefix: `Satz ${i + 1}`,
  suffix: '.'
}));

// Mock scheduleStore:
// ex-1 and ex-2 are overdue
// ex-3 is future
// rest are new
const mockSchedule = {
  'ex-1': { reps: 2, due: now - 3600000, stability: 2.0, lastReview: now - 86400000 * 3, state: 'review' },
  'ex-2': { reps: 1, due: now - 7200000, stability: 1.0, lastReview: now - 86400000 * 2, state: 'review' },
  'ex-3': { reps: 3, due: now + 86400000 * 5, stability: 5.0, lastReview: now, state: 'review' }
};

const session = SessionScheduler.buildSession(mockExercises, mockSchedule, 10, now);
console.log('Session length:', session.length);
assert(session.length === 10, 'Session must have exactly 10 exercises');

const sessionIds = session.map(e => e.id);
assert(sessionIds.includes('ex-1'), 'Overdue ex-1 must be included');
assert(sessionIds.includes('ex-2'), 'Overdue ex-2 must be included');
console.log('Session IDs:', sessionIds);

const stats = SessionScheduler.getLibraryStats([{ exercises: mockExercises }], mockSchedule, now);
console.log('Library stats:', stats);
assert(stats.total === 20, 'Total exercises should be 20');
assert(stats.due === 2, 'Due count should be 2');
assert(stats.newCards === 17, 'New cards should be 17');
assert(stats.forecast.length === 7, 'Forecast should have 7 days');

console.log('✅ ALL FSRS & SCHEDULER TESTS PASSED!');
