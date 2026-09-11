// Deutschify - Speicher- und Fortschritts-Verwaltung (LocalStorage)

const STORAGE_KEY = 'deutschify_state_v1';

const defaultState = {
  preferences: {
    theme: 'dark',
    soundEnabled: true,
    inputMode: 'chips' // 'chips' (Auswahlmodus) oder 'typing' (Tippmodus)
  },
  stats: {
    totalExercisesAnswered: 0,
    correctCount: 0,
    incorrectCount: 0,
    currentStreak: 0,
    bestStreak: 0,
    lastPracticedDate: null
  },
  topicProgress: {
    // topicId: { completedIds: [], accuracy: 0, attempts: 0 }
  }
};

class StorageManager {
  constructor() {
    this.state = this._load();
    this._checkStreakContinuity();
  }

  _load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return { ...defaultState, ...JSON.parse(data) };
      }
    } catch (e) {
      console.error('Fehler beim Laden von LocalStorage:', e);
    }
    return JSON.parse(JSON.stringify(defaultState));
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Fehler beim Speichern in LocalStorage:', e);
    }
  }

  _checkStreakContinuity() {
    const today = new Date().toISOString().split('T')[0];
    const last = this.state.stats.lastPracticedDate;

    if (!last) return;

    const lastDate = new Date(last);
    const currentDate = new Date(today);
    const diffDays = Math.round((currentDate - lastDate) / (1000 * 60 * 60 * 24));

    // Wenn mehr als 1 Tag vergangen ist, wird die Tages-Serie zurückgesetzt
    if (diffDays > 1) {
      this.state.stats.currentStreak = 0;
      this.save();
    }
  }

  recordAnswer(topicId, exerciseId, isCorrect) {
    const today = new Date().toISOString().split('T')[0];
    this.state.stats.lastPracticedDate = today;
    this.state.stats.totalExercisesAnswered++;

    if (isCorrect) {
      this.state.stats.correctCount++;
      this.state.stats.currentStreak++;
      if (this.state.stats.currentStreak > this.state.stats.bestStreak) {
        this.state.stats.bestStreak = this.state.stats.currentStreak;
      }
    } else {
      this.state.stats.incorrectCount++;
      this.state.stats.currentStreak = 0;
    }

    // Fortschritt des Themas aktualisieren
    if (!this.state.topicProgress[topicId]) {
      this.state.topicProgress[topicId] = {
        completedIds: [],
        correctAnswers: 0,
        totalAttempts: 0
      };
    }

    const tProg = this.state.topicProgress[topicId];
    tProg.totalAttempts++;

    if (isCorrect) {
      tProg.correctAnswers++;
      if (!tProg.completedIds.includes(exerciseId)) {
        tProg.completedIds.push(exerciseId);
      }
    }

    this.save();
    return {
      currentStreak: this.state.stats.currentStreak,
      bestStreak: this.state.stats.bestStreak
    };
  }

  getTopicProgress(topicId, totalExercisesInTopic) {
    const prog = this.state.topicProgress[topicId] || {
      completedIds: [],
      correctAnswers: 0,
      totalAttempts: 0
    };

    const completed = prog.completedIds.length;
    const percent = totalExercisesInTopic > 0
      ? Math.round((completed / totalExercisesInTopic) * 100)
      : 0;

    return {
      completed,
      total: totalExercisesInTopic,
      percent,
      accuracy: prog.totalAttempts > 0
        ? Math.round((prog.correctAnswers / prog.totalAttempts) * 100)
        : 0
    };
  }

  getGlobalStats() {
    const { totalExercisesAnswered, correctCount, currentStreak, bestStreak } = this.state.stats;
    const accuracy = totalExercisesAnswered > 0
      ? Math.round((correctCount / totalExercisesAnswered) * 100)
      : 0;

    return {
      totalExercisesAnswered,
      correctCount,
      accuracy,
      currentStreak,
      bestStreak
    };
  }

  getPreferences() {
    return this.state.preferences;
  }

  setPreference(key, value) {
    this.state.preferences[key] = value;
    this.save();
  }

  resetAll() {
    this.state = JSON.parse(JSON.stringify(defaultState));
    this.save();
  }
}

export const storage = new StorageManager();
