// Deutschify - 10-Sätze Zeitplan-Scheduler & Anki Analytics Engine
// Wählt intelligent 10 Sätze basierend auf Fälligkeit (Due Date),
// Behaltewahrscheinlichkeit (Retrievability R) und Neuheit aus.

import { fsrs, FSRS_STATE } from './fsrs.js';

export class SessionScheduler {
  /**
   * Stellt eine 10-Sätze-Lerneinheit zusammen
   * Priorität:
   * 1. Fällige Sätze (due <= now), sortiert nach niedrigster Retrievability (dringendste zuerst)
   * 2. Neue Sätze (noch nie geübt)
   * 3. Vorab-Wiederholungen (früheste nächste Fälligkeit), falls keine neuen Sätze mehr da sind
   * 
   * @param {Array} exercises - Alle Sätze des Themas (oder globaler Pool)
   * @param {Object} scheduleStore - Map von exerciseId -> CardState aus LocalStorage
   * @param {Number} sessionSize - Standard: 10
   * @param {Number} now - Zeitstempel (ms)
   * @returns {Array} Genau 10 Sätze (oder alle, falls Pool kleiner als 10)
   */
  static buildSession(exercises, scheduleStore = {}, sessionSize = 10, now = Date.now()) {
    if (!exercises || exercises.length === 0) return [];
    if (exercises.length <= sessionSize) {
      // Wenn der Pool <= 10 ist, mischen und alle nehmen
      return [...exercises].sort(() => Math.random() - 0.5);
    }

    const dueList = [];
    const newList = [];
    const upcomingList = [];

    exercises.forEach((ex) => {
      const card = scheduleStore[ex.id];
      if (!card || card.reps === 0 || card.state === FSRS_STATE.NEW) {
        newList.push(ex);
      } else if (card.due <= now) {
        // Fällig: Berechne R für exakte Dringlichkeit
        const r = fsrs.getRetrievability(card, now);
        dueList.push({ ex, card, r });
      } else {
        // Zukünftig fällig
        upcomingList.push({ ex, card });
      }
    });

    // 1. Fällige Sätze nach Dringlichkeit sortieren (geringste Retrievability zuerst)
    dueList.sort((a, b) => a.r - b.r || a.card.due - b.card.due);

    // 2. Neue Sätze leicht durchmischen für Abwechslung
    const shuffledNew = [...newList].sort(() => Math.random() - 0.5);

    // 3. Zukünftige Sätze nach nächster Fälligkeit sortieren (früheste zuerst)
    upcomingList.sort((a, b) => a.card.due - b.card.due);

    const session = [];

    // Fülle aus Fälligkeitsliste
    for (const item of dueList) {
      if (session.length >= sessionSize) break;
      session.push(item.ex);
    }

    // Fülle mit neuen Sätzen auf
    for (const ex of shuffledNew) {
      if (session.length >= sessionSize) break;
      session.push(ex);
    }

    // Falls immer noch nicht voll (alle gelernt & weniger als 10 fällig): mit anstehenden Wiederholungen auffüllen
    for (const item of upcomingList) {
      if (session.length >= sessionSize) break;
      session.push(item.ex);
    }

    // Durchmischen der ausgewählten 10 Sätze, damit neue und Wiederholungen organisch verteilt sind
    return session.sort(() => Math.random() - 0.5);
  }

  /**
   * Zählt, wie viele Sätze in einem Thema aktuell fällig sind
   */
  static getTopicDueCount(exercises, scheduleStore = {}, now = Date.now()) {
    if (!exercises) return 0;
    return exercises.filter((ex) => {
      const card = scheduleStore[ex.id];
      return card && card.reps > 0 && card.due <= now;
    }).length;
  }

  /**
   * Aggregiert Anki-ähnliche Gedächtnisstatistiken & 7-Tage-Prognose über alle Themen
   */
  static getLibraryStats(topics, scheduleStore = {}, now = Date.now()) {
    const allExercises = [];
    topics.forEach((t) => {
      if (t.exercises) allExercises.push(...t.exercises);
    });

    let dueCount = 0;
    let learningCount = 0;
    let reviewCount = 0;
    let newCount = 0;
    let totalRetrievability = 0;
    let activeCardCount = 0;

    // Start- und Endzeitpunkte für die nächsten 7 Tage ermitteln
    const oneDayMs = 24 * 60 * 60 * 1000;
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayStartMs = todayStart.getTime();

    // 7-Tage Forecast Initialisierung
    const forecastDays = [
      { dayIndex: 0, label: 'Heute', count: 0 },
      { dayIndex: 1, label: '+1 T.', count: 0 },
      { dayIndex: 2, label: '+2 T.', count: 0 },
      { dayIndex: 3, label: '+3 T.', count: 0 },
      { dayIndex: 4, label: '+4 T.', count: 0 },
      { dayIndex: 5, label: '+5 T.', count: 0 },
      { dayIndex: 6, label: '+6 T.', count: 0 }
    ];

    allExercises.forEach((ex) => {
      const card = scheduleStore[ex.id];
      if (!card || card.reps === 0 || card.state === FSRS_STATE.NEW) {
        newCount++;
      } else {
        activeCardCount++;
        const r = fsrs.getRetrievability(card, now);
        totalRetrievability += r;

        if (card.due <= now) {
          dueCount++;
        } else if (card.state === FSRS_STATE.LEARNING || card.stability < 1.0) {
          learningCount++;
        } else {
          reviewCount++;
        }

        // Fälligkeit in den 7-Tage-Forecast einsortieren
        const daysFromNow = Math.floor((card.due - todayStartMs) / oneDayMs);
        if (daysFromNow <= 0) {
          forecastDays[0].count++;
        } else if (daysFromNow < 7) {
          forecastDays[daysFromNow].count++;
        }
      }
    });

    const averageRetention =
      activeCardCount > 0 ? Math.round((totalRetrievability / activeCardCount) * 100) : 100;

    return {
      total: allExercises.length,
      due: dueCount,
      learning: learningCount,
      review: reviewCount,
      newCards: newCount,
      activeCount: activeCardCount,
      averageRetention,
      forecast: forecastDays
    };
  }
}