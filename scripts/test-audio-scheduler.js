// Automated test for Audio Player Scheduler & Difficulty Sorting
import { SessionScheduler } from '../public/js/scheduler.js';

function assert(condition, message) {
  if (!condition) {
    console.error('FAIL:', message);
    process.exit(1);
  }
}

console.log('--- Testing Worked Exercises Difficulty Sorting ---');

const mockTopics = [
  {
    id: 'kollokationen',
    title: 'Kollokationen',
    icon: '🔗',
    exercises: [
      { id: 'ex-easy', prefix: 'Er hat', correctAnswer: 'Glück', suffix: 'gehabt.', collocation: 'Glück haben', meaning: 'Erfolg haben' },
      { id: 'ex-hard', prefix: 'Wir müssen eine', correctAnswer: 'Entscheidung', suffix: 'treffen.', collocation: 'eine Entscheidung treffen', meaning: 'entscheiden' },
      { id: 'ex-medium', prefix: 'Sie nimmt', correctAnswer: 'Rücksicht', suffix: 'auf ihn.', collocation: 'Rücksicht nehmen', meaning: 'respektieren' }
    ]
  },
  {
    id: 'praepositionen',
    title: 'Präpositionen',
    icon: '🎯',
    exercises: [
      { id: 'ex-nightmare', prefix: 'Er leidet', correctAnswer: 'an', suffix: 'einer Krankheit.', collocation: 'leiden an + Dativ', meaning: 'krank sein' },
      { id: 'ex-unworked', prefix: 'Sie wartet', correctAnswer: 'auf', suffix: 'den Bus.', collocation: 'warten auf', meaning: 'erwarten' }
    ]
  }
];

const now = Date.now();

// Mock scheduleStore:
// ex-nightmare: difficulty 9.5, lapses 3, stability 0.5 (HARDDEST)
// ex-hard: difficulty 8.2, lapses 2, stability 1.2
// ex-medium: difficulty 6.0, lapses 0, stability 2.5
// ex-easy: difficulty 4.0, lapses 0, stability 5.0 (EASIEST)
// ex-unworked: not in schedule (reps 0)
const mockSchedule = {
  'ex-easy': { reps: 4, difficulty: 4.0, lapses: 0, stability: 5.0, lastReview: now - 86400000, due: now + 86400000 * 5 },
  'ex-hard': { reps: 3, difficulty: 8.2, lapses: 2, stability: 1.2, lastReview: now - 3600000, due: now + 3600000 * 24 },
  'ex-medium': { reps: 2, difficulty: 6.0, lapses: 0, stability: 2.5, lastReview: now - 7200000, due: now + 86400000 * 2 },
  'ex-nightmare': { reps: 5, difficulty: 9.5, lapses: 3, stability: 0.5, lastReview: now - 1800000, due: now + 3600000 }
};

const workedSorted = SessionScheduler.getWorkedExercisesSortedByDifficulty(mockTopics, mockSchedule, now);

console.log('Worked count:', workedSorted.length);
assert(workedSorted.length === 4, 'Should contain exactly 4 worked exercises (unworked excluded)');

console.log('Order of IDs:', workedSorted.map(e => `${e.id} (D: ${e.card.difficulty})`));

assert(workedSorted[0].id === 'ex-nightmare', '1st should be highest difficulty (ex-nightmare, D: 9.5)');
assert(workedSorted[1].id === 'ex-hard', '2nd should be ex-hard (D: 8.2)');
assert(workedSorted[2].id === 'ex-medium', '3rd should be ex-medium (D: 6.0)');
assert(workedSorted[3].id === 'ex-easy', '4th should be ex-easy (D: 4.0)');

// Test with tie in difficulty: lapses tie-breaker
const mockTopicsTies = [
  {
    id: 't1',
    exercises: [
      { id: 'tie-1', prefix: 'A', correctAnswer: 'B', suffix: 'C' },
      { id: 'tie-2', prefix: 'D', correctAnswer: 'E', suffix: 'F' }
    ]
  }
];

const mockScheduleTies = {
  'tie-1': { reps: 2, difficulty: 7.0, lapses: 1, stability: 2.0, lastReview: now },
  'tie-2': { reps: 3, difficulty: 7.0, lapses: 3, stability: 1.0, lastReview: now }
};

const sortedTies = SessionScheduler.getWorkedExercisesSortedByDifficulty(mockTopicsTies, mockScheduleTies, now);
assert(sortedTies[0].id === 'tie-2', 'Tie in difficulty should be broken by higher lapses (tie-2 with 3 lapses)');
assert(sortedTies[1].id === 'tie-1', 'tie-1 with 1 lapse should come second');

// Test with empty schedule (no worked exercises)
const emptyWorked = SessionScheduler.getWorkedExercisesSortedByDifficulty(mockTopics, {}, now);
assert(emptyWorked.length === 0, 'Empty schedule must yield empty list');

console.log('✅ ALL AUDIO SCHEDULER & DIFFICULTY SORTING TESTS PASSED!');
