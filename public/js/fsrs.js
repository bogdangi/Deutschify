// Deutschify - FSRS (Free Spaced Repetition Scheduler) Engine
// Basiert auf dem Three-Component-Modell des menschlichen Gedächtnisses:
// Difficulty (D), Stability (S), Retrievability (R)

export const FSRS_RATING = {
  AGAIN: 1, // Falsch beantwortet / vergessen
  HARD: 2,  // Mit Grammatik-Tipp oder Verzögerung gelöst
  GOOD: 3,  // Richtig gelöst (Auswahlmodus)
  EASY: 4   // Richtig gelöst im Freitext-/Tippmodus
};

export const FSRS_STATE = {
  NEW: 'new',
  LEARNING: 'learning',
  REVIEW: 'review'
};

// Standard-Parameter (angelehnt an FSRS-4.5 / Anki Default Weights)
const PARAMS = {
  requestRetention: 0.90, // Ziel-Behaltequote 90%
  maximumInterval: 365,   // Maximales Intervall in Tagen
  w: [
    0.40255, 1.18385, 3.173, 15.69105, // Initial stability for Again, Hard, Good, Easy (in days)
    7.1949, 0.5345,                   // Initial difficulty parameters
    1.4604, 0.0046,                   // Difficulty update weights
    1.5457, 0.1525, 1.0081,           // Recall stability weights
    1.9813, 0.0953, 0.2975, 0.4922,   // Lapse stability weights
    0.2492, 2.9466                    // Retrieval curve factors
  ]
};

export class FSRSEngine {
  constructor(params = {}) {
    this.p = { ...PARAMS, ...params };
  }

  /**
   * Erzeugt eine neue FSRS-Karte
   */
  createCard() {
    return {
      difficulty: 5.0,
      stability: 0,
      reps: 0,
      lapses: 0,
      state: FSRS_STATE.NEW,
      lastReview: null,
      due: Date.now() // Neue Karten sind sofort verfügbar
    };
  }

  /**
   * Berechnet die aktuelle Abrufwahrscheinlichkeit R (Retrievability) zum Zeitpunkt `now`
   * R(t, S) = (1 + 19 * t / S)^(-0.5)
   */
  getRetrievability(card, now = Date.now()) {
    if (!card || card.stability <= 0 || !card.lastReview) {
      return 0;
    }
    const elapsedDays = Math.max(0, (now - card.lastReview) / (1000 * 60 * 60 * 24));
    if (elapsedDays === 0) return 1.0;

    // FSRS Potenzkurve: bei t = S ist R exakt 0.90 ((1 + (19/81))^(-0.5) = (100/81)^(-0.5) = 9/10 = 0.90)
    const factor = 19.0 / 81.0;
    const power = -0.5;
    const r = Math.pow(1.0 + (factor * elapsedDays) / card.stability, power);
    return Math.max(0, Math.min(1.0, r));
  }

  /**
   * Berechnet das nächste Wiederholungsintervall in Tagen für die Ziel-Behaltequote (0.90)
   */
  calculateInterval(stability) {
    if (stability <= 0) return 0.01; // ~15 Minuten bei neuen / fehlgeschlagenen Karten
    const intervalDays = stability; // Bei 90% Target Retention entspricht I genau S
    return Math.min(this.p.maximumInterval, Math.max(0.01, intervalDays));
  }

  /**
   * Bewertet eine Karte und erzeugt den nächsten Zustand (Next Memory State)
   * @param {Object} card - Vorheriger Zustand
   * @param {Number} rating - 1 (Again), 2 (Hard), 3 (Good), 4 (Easy)
   * @param {Number} now - Zeitstempel (ms)
   */
  rate(card, rating, now = Date.now()) {
    const prev = card ? { ...card } : this.createCard();
    const isNew = prev.state === FSRS_STATE.NEW || prev.reps === 0;

    let nextDifficulty = prev.difficulty;
    let nextStability = prev.stability;
    let nextState = prev.state;
    let lapses = prev.lapses;
    let reps = prev.reps + 1;

    if (isNew) {
      // 1. Erstmalige Einstufung (Initial D & S)
      nextDifficulty = this._initDifficulty(rating);
      nextStability = this._initStability(rating);
      nextState = rating === FSRS_RATING.AGAIN ? FSRS_STATE.LEARNING : FSRS_STATE.REVIEW;
      if (rating === FSRS_RATING.AGAIN) lapses++;
    } else {
      // 2. Wiederholungs-Aktualisierung
      const r = this.getRetrievability(prev, now);
      nextDifficulty = this._nextDifficulty(prev.difficulty, rating);

      if (rating === FSRS_RATING.AGAIN) {
        // Lapse: Vergessen -> Stabilität bricht ein
        lapses++;
        nextState = FSRS_STATE.LEARNING;
        nextStability = this._nextLapseStability(prev.difficulty, prev.stability, r);
      } else {
        // Erfolgreicher Recall -> Stabilität wächst
        nextState = FSRS_STATE.REVIEW;
        nextStability = this._nextRecallStability(prev.difficulty, prev.stability, r, rating);
      }
    }

    // Intervall bestimmen
    const intervalDays = rating === FSRS_RATING.AGAIN ? 0.01 : this.calculateInterval(nextStability);
    const dueTime = now + Math.round(intervalDays * 24 * 60 * 60 * 1000);

    return {
      difficulty: Number(nextDifficulty.toFixed(2)),
      stability: Number(nextStability.toFixed(2)),
      reps,
      lapses,
      state: nextState,
      lastReview: now,
      due: dueTime,
      intervalDays: Number(intervalDays.toFixed(2))
    };
  }

  // --- FSRS Mathematische Hilfsfunktionen ---

  _initDifficulty(rating) {
    const d = this.p.w[4] - (rating - 3) * this.p.w[5];
    return Math.min(10.0, Math.max(1.0, d));
  }

  _initStability(rating) {
    const idx = Math.min(3, Math.max(0, rating - 1));
    return Math.max(0.1, this.p.w[idx]);
  }

  _nextDifficulty(prevD, rating) {
    const delta = -this.p.w[6] * (rating - 3);
    const meanReversion = this.p.w[7] * this.p.w[4] + (1 - this.p.w[7]) * (prevD + delta);
    return Math.min(10.0, Math.max(1.0, meanReversion));
  }

  _nextRecallStability(d, s, r, rating) {
    const hardPenalty = rating === FSRS_RATING.HARD ? this.p.w[15] : 1.0;
    const easyBonus = rating === FSRS_RATING.EASY ? this.p.w[16] : 1.0;

    const factor =
      Math.exp(this.p.w[8]) *
      (11 - d) *
      Math.pow(Math.max(0.1, s), -this.p.w[9]) *
      (Math.exp((1 - r) * this.p.w[10]) - 1) *
      hardPenalty *
      easyBonus;

    const newS = s * (1 + Math.max(0.1, factor));
    return Math.min(this.p.maximumInterval, Math.max(s * 1.05, newS));
  }

  _nextLapseStability(d, s, r) {
    const lapseS =
      this.p.w[11] *
      Math.pow(d, -this.p.w[12]) *
      (Math.pow(s + 1, this.p.w[13]) - 1) *
      Math.exp((1 - r) * this.p.w[14]);

    return Math.max(0.2, Math.min(s * 0.5, lapseS));
  }

  /**
   * Formatiert ein Zeitintervall benutzerfreundlich auf Deutsch
   * @param {Number} intervalDays - Intervall in Tagen
   */
  static formatInterval(intervalDays) {
    if (intervalDays < 0.05) {
      return 'in 15 Min.';
    }
    if (intervalDays < 0.95) {
      const hours = Math.round(intervalDays * 24);
      return hours <= 1 ? 'in 1 Std.' : `in ${hours} Std.`;
    }
    const days = Math.round(intervalDays);
    if (days === 1) return 'morgen';
    if (days < 7) return `in ${days} Tagen`;
    if (days < 30) {
      const weeks = Math.round(days / 7);
      return weeks === 1 ? 'in 1 Woche' : `in ${weeks} Wochen`;
    }
    const months = Math.round(days / 30);
    return months === 1 ? 'in 1 Monat' : `in ${months} Monaten`;
  }
}

export const fsrs = new FSRSEngine();
