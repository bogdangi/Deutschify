// Automated Test for 10-Item Repetition Notifications and 'Notify Only Once' Latch
import { SessionScheduler } from '../public/js/scheduler.js';
import { DUE_NOTIFICATION_THRESHOLD } from '../public/js/notifications.js';

function assert(condition, message) {
  if (!condition) {
    console.error('❌ FAIL:', message);
    process.exit(1);
  }
}

console.log('--- Testing 10-Example Notification Logic ---');

const now = Date.now();

// 1. Setup mock topics with 15 exercises
const mockExercises = Array.from({ length: 15 }, (_, i) => ({
  id: `ex-${i + 1}`,
  prefix: `Satz ${i + 1}`,
  gapPlaceholder: '[___]',
  suffix: '.'
}));

const mockTopics = [
  { id: 'topic-1', exercises: mockExercises.slice(0, 8) },
  { id: 'topic-2', exercises: mockExercises.slice(8, 15) }
];

// Test empty schedule
let scheduleStore = {};
let dueCount = SessionScheduler.getTotalDueCount(mockTopics, scheduleStore, now);
assert(dueCount === 0, `Due count should initially be 0, got ${dueCount}`);

// Mock storage state
let notifState = {
  enabled: true,
  notifiedForCurrentBatch: false,
  lastNotifiedAt: null,
  lastNotifiedCount: 0
};

// Simulation helper matching checkDueAndNotify logic
function simulateCheck(topics, schedule, currentTime) {
  const count = SessionScheduler.getTotalDueCount(topics, schedule, currentTime);
  let triggered = false;

  if (count >= DUE_NOTIFICATION_THRESHOLD) {
    if (!notifState.notifiedForCurrentBatch) {
      triggered = true;
      notifState.notifiedForCurrentBatch = true;
      notifState.lastNotifiedAt = currentTime;
      notifState.lastNotifiedCount = count;
    }
  } else {
    if (notifState.notifiedForCurrentBatch) {
      notifState.notifiedForCurrentBatch = false;
    }
  }

  return { triggered, dueCount: count };
}

// 2. Add 9 overdue exercises (below threshold of 10)
for (let i = 1; i <= 9; i++) {
  scheduleStore[`ex-${i}`] = {
    reps: 1,
    due: now - 10000,
    stability: 1.0,
    state: 'review'
  };
}

let result = simulateCheck(mockTopics, scheduleStore, now);
console.log('Result with 9 due items:', result);
assert(result.dueCount === 9, 'Due count must be 9');
assert(result.triggered === false, 'Must NOT trigger when below 10 items');
assert(notifState.notifiedForCurrentBatch === false, 'Batch latch must still be false');

// 3. Add 10th overdue exercise (reaches threshold of 10!)
scheduleStore['ex-10'] = {
  reps: 1,
  due: now - 10000,
  stability: 1.0,
  state: 'review'
};

result = simulateCheck(mockTopics, scheduleStore, now);
console.log('Result when hitting 10 items:', result);
assert(result.dueCount === 10, 'Due count must be 10');
assert(result.triggered === true, 'MUST trigger when hitting 10 items');
assert(notifState.notifiedForCurrentBatch === true, 'Batch latch must be true');

// 4. Test "Notify Only Once": subsequent checks while due >= 10 must NOT trigger
console.log('Testing "Notify Only Once" guarantee...');
for (let check = 1; check <= 5; check++) {
  // Even if more items become due (e.g. 11, 12 items)
  if (check === 2) {
    scheduleStore['ex-11'] = { reps: 1, due: now - 5000, stability: 1.0, state: 'review' };
  }
  const nextResult = simulateCheck(mockTopics, scheduleStore, now + check * 60000);
  assert(nextResult.triggered === false, `Check #${check} must NOT trigger notification again!`);
}
console.log('✅ "Notify Only Once" verified: zero redundant notifications sent while queue >= 10.');

// 5. User studies and reduces due items below 10 (e.g. down to 0)
console.log('Simulating user completing review session (due count drops below 10)...');
for (let i = 1; i <= 11; i++) {
  // Reschedule into the future
  scheduleStore[`ex-${i}`].due = now + 86400000 * 3;
}

result = simulateCheck(mockTopics, scheduleStore, now);
console.log('Result after user completes session:', result);
assert(result.dueCount === 0, 'Due count must be 0 after study');
assert(result.triggered === false, 'Must not trigger on drop');
assert(notifState.notifiedForCurrentBatch === false, 'Batch latch must reset so future batches can notify');

// 6. Next batch of 10 items becomes due in the future
console.log('Simulating future batch of 10 items becoming due...');
const futureTime = now + 86400000 * 4;
for (let i = 1; i <= 10; i++) {
  scheduleStore[`ex-${i}`].due = futureTime - 1000;
}
scheduleStore['ex-11'].due = futureTime + 86400000;

result = simulateCheck(mockTopics, scheduleStore, futureTime);
console.log('Result for new batch of 10 items:', result);
assert(result.dueCount === 10, 'Due count must be 10 in future');
assert(result.triggered === true, 'MUST trigger once for the new batch!');
assert(notifState.notifiedForCurrentBatch === true, 'Batch latch active again');

// And again, only once for this batch:
result = simulateCheck(mockTopics, scheduleStore, futureTime + 60000);
assert(result.triggered === false, 'Must NOT trigger again for same new batch');

console.log('🎉 ALL NOTIFICATION TESTS PASSED!');
