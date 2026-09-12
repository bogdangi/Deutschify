// Deutschify - Haupt-Anwendungslogik (Controller)
// Vollständige deutsche Interaktion, Lückentext-Prüfung, Audio, PWA & FSRS-Spaced-Repetition

import { TOPICS } from './data/topics.js';
import { storage } from './storage.js';
import { sounds, speech } from './audio.js';
import { FSRSEngine } from './fsrs.js';
import { SessionScheduler } from './scheduler.js';

class DeutschifyApp {
  constructor() {
    this.currentTopic = null;
    this.exerciseQueue = [];
    this.currentIndex = 0;
    this.selectedAnswer = '';
    this.isAnswerChecked = false;
    this.hintUsedForCurrent = false;
    this.roundCorrect = 0;
    this.roundTotal = 0;
    this.inputMode = storage.getPreferences().inputMode || 'chips';
    this.deferredPrompt = null;

    this.cacheDOM();
    this.initPreferences();
    this.bindEvents();
    this.initPWA();
    this.renderTopics();
    this.updateGlobalHeader();
  }

  cacheDOM() {
    // Views
    this.viewTopics = document.getElementById('view-topics');
    this.viewExercise = document.getElementById('view-exercise');
    this.viewSummary = document.getElementById('view-summary');

    // Header & Controls
    this.btnLogoHome = document.getElementById('btn-logo-home');
    this.headerStreakPill = document.getElementById('header-streak-pill');
    this.streakCounterVal = document.getElementById('streak-counter-val');
    this.btnToggleSound = document.getElementById('btn-toggle-sound');
    this.soundIcon = document.getElementById('sound-icon');
    this.btnToggleTheme = document.getElementById('btn-toggle-theme');
    this.themeIcon = document.getElementById('theme-icon');
    this.btnOpenStats = document.getElementById('btn-open-stats');

    // Home / Topics & Smart Training
    this.smartTrainingCard = document.getElementById('smart-training-card');
    this.smartCardDesc = document.getElementById('smart-card-desc');
    this.btnSmartStart = document.getElementById('btn-smart-start');
    this.topicsContainer = document.getElementById('topics-container');
    this.modeBtnChips = document.getElementById('mode-btn-chips');
    this.modeBtnTyping = document.getElementById('mode-btn-typing');

    // Exercise View
    this.btnExitExercise = document.getElementById('btn-exit-exercise');
    this.exerciseTopicTitle = document.getElementById('exercise-topic-title');
    this.exerciseRoundProgress = document.getElementById('exercise-round-progress');
    this.exerciseRoundCounter = document.getElementById('exercise-round-counter');
    this.sentenceDisplay = document.getElementById('sentence-display');
    this.btnReadSentence = document.getElementById('btn-read-sentence');

    // Input containers
    this.optionsChipsContainer = document.getElementById('options-chips-container');
    this.typingInputContainer = document.getElementById('typing-input-container');
    this.textGapInput = document.getElementById('text-gap-input');
    this.umlautButtons = document.querySelectorAll('.umlaut-btn');

    // Exercise Actions
    this.btnShowHint = document.getElementById('btn-show-hint');
    this.btnCheckAnswer = document.getElementById('btn-check-answer');

    // Feedback Drawer
    this.feedbackDrawer = document.getElementById('feedback-drawer');
    this.feedbackIcon = document.getElementById('feedback-icon');
    this.feedbackTitle = document.getElementById('feedback-title');
    this.feedbackCollocation = document.getElementById('feedback-collocation');
    this.feedbackMeaning = document.getElementById('feedback-meaning');
    this.feedbackExample = document.getElementById('feedback-example');
    this.feedbackIntervalRow = document.getElementById('feedback-interval-row');
    this.feedbackIntervalVal = document.getElementById('feedback-interval-val');
    this.btnNextExercise = document.getElementById('btn-next-exercise');

    // Summary View
    this.summaryEmoji = document.getElementById('summary-emoji');
    this.summaryTitle = document.getElementById('summary-title');
    this.summarySubtitle = document.getElementById('summary-subtitle');
    this.summaryCorrectVal = document.getElementById('summary-correct-val');
    this.summaryAccuracyVal = document.getElementById('summary-accuracy-val');
    this.summaryStreakVal = document.getElementById('summary-streak-val');
    this.btnRestartRound = document.getElementById('btn-restart-round');
    this.btnSummaryHome = document.getElementById('btn-summary-home');

    // Stats Modal
    this.modalStats = document.getElementById('modal-stats');
    this.btnCloseStats = document.getElementById('btn-close-stats');
    this.statsTotalAnswered = document.getElementById('stats-total-answered');
    this.statsAccuracy = document.getElementById('stats-accuracy');
    this.statsCurrentStreak = document.getElementById('stats-current-streak');
    this.statsBestStreak = document.getElementById('stats-best-streak');
    this.btnResetStats = document.getElementById('btn-reset-stats');

    // Anki Repetition Analytics Elements
    this.ankiRetentionBadge = document.getElementById('anki-retention-badge');
    this.segDue = document.getElementById('seg-due');
    this.segLearning = document.getElementById('seg-learning');
    this.segReview = document.getElementById('seg-review');
    this.segNew = document.getElementById('seg-new');
    this.ankiCountDue = document.getElementById('anki-count-due');
    this.ankiCountLearning = document.getElementById('anki-count-learning');
    this.ankiCountReview = document.getElementById('anki-count-review');
    this.ankiCountNew = document.getElementById('anki-count-new');
    this.forecastChart = document.getElementById('forecast-chart');

    // PWA Banner
    this.pwaBanner = document.getElementById('pwa-banner');
    this.pwaInstallAction = document.getElementById('pwa-install-action');
    this.pwaDismissAction = document.getElementById('pwa-dismiss-action');

    // Canvas
    this.canvas = document.getElementById('confetti-canvas');
  }

  initPreferences() {
    const prefs = storage.getPreferences();

    // Sound
    sounds.setSoundEnabled(prefs.soundEnabled);
    this.soundIcon.textContent = prefs.soundEnabled ? '🔊' : '🔇';

    // Theme
    document.documentElement.setAttribute('data-theme', prefs.theme);
    this.themeIcon.textContent = prefs.theme === 'light' ? '☀️' : '🌙';

    // Mode
    this.setInputMode(prefs.inputMode || 'chips');
  }

  bindEvents() {
    // Navigation
    this.btnLogoHome.addEventListener('click', () => this.showView('topics'));
    this.btnExitExercise.addEventListener('click', () => this.showView('topics'));
    this.btnSummaryHome.addEventListener('click', () => this.showView('topics'));
    this.btnRestartRound.addEventListener('click', () => {
      if (this.currentTopic) {
        if (this.currentTopic.id === 'smart-mix') {
          this.startSmartSession();
        } else {
          this.startTopic(this.currentTopic.id);
        }
      }
    });

    // Smart Daily Training Start
    if (this.btnSmartStart) {
      this.btnSmartStart.addEventListener('click', () => this.startSmartSession());
    }

    // Sound & Theme Toggle
    this.btnToggleSound.addEventListener('click', () => {
      const prefs = storage.getPreferences();
      const next = !prefs.soundEnabled;
      storage.setPreference('soundEnabled', next);
      sounds.setSoundEnabled(next);
      this.soundIcon.textContent = next ? '🔊' : '🔇';
    });

    this.btnToggleTheme.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      storage.setPreference('theme', next);
      this.themeIcon.textContent = next === 'light' ? '☀️' : '🌙';
    });

    // Stats Modal
    this.btnOpenStats.addEventListener('click', () => this.openStatsModal());
    this.btnCloseStats.addEventListener('click', () => this.closeStatsModal());
    this.modalStats.addEventListener('click', (e) => {
      if (e.target === this.modalStats) this.closeStatsModal();
    });
    this.btnResetStats.addEventListener('click', () => {
      if (confirm('Möchtest du deinen gesamten Lernfortschritt und Zeitplan wirklich zurücksetzen?')) {
        storage.resetAll();
        this.updateGlobalHeader();
        this.renderTopics();
        this.closeStatsModal();
      }
    });

    // Mode Switcher Buttons
    this.modeBtnChips.addEventListener('click', () => this.setInputMode('chips'));
    this.modeBtnTyping.addEventListener('click', () => this.setInputMode('typing'));

    // Exercise Interaction
    this.btnCheckAnswer.addEventListener('click', () => this.checkAnswer());
    this.btnNextExercise.addEventListener('click', () => this.nextExercise());
    this.btnReadSentence.addEventListener('click', () => this.readCurrentSentence());
    this.btnShowHint.addEventListener('click', () => this.showHint());

    // Typing Mode Input & Umlauts
    this.textGapInput.addEventListener('input', () => {
      this.selectedAnswer = this.textGapInput.value.trim();
      this.updateGapDisplay(this.selectedAnswer);
      this.btnCheckAnswer.disabled = this.selectedAnswer.length === 0;
    });

    this.textGapInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !this.btnCheckAnswer.disabled && !this.isAnswerChecked) {
        e.preventDefault();
        this.checkAnswer();
      }
    });

    this.umlautButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const char = btn.getAttribute('data-char');
        this.insertUmlaut(char);
      });
    });

    // Global Hotkeys (Enter to check/continue, 1-4 for options)
    window.addEventListener('keydown', (e) => {
      if (this.viewExercise.classList.contains('active')) {
        if (e.key === 'Enter') {
          if (this.isAnswerChecked) {
            this.nextExercise();
          } else if (!this.btnCheckAnswer.disabled) {
            this.checkAnswer();
          }
        } else if (!this.isAnswerChecked && this.inputMode === 'chips') {
          const num = parseInt(e.key, 10);
          if (num >= 1 && num <= 4) {
            const chips = this.optionsChipsContainer.querySelectorAll('.option-chip');
            if (chips[num - 1]) chips[num - 1].click();
          }
        }
      }
    });

    // PWA Install Events
    this.pwaInstallAction.addEventListener('click', async () => {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          this.pwaBanner.classList.remove('active');
        }
        this.deferredPrompt = null;
      }
    });

    this.pwaDismissAction.addEventListener('click', () => {
      this.pwaBanner.classList.remove('active');
    });
  }

  initPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch((err) => {
          console.warn('ServiceWorker-Registrierung fehlgeschlagen:', err);
        });
      });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.pwaBanner.classList.add('active');
    });
  }

  showView(viewName) {
    // Reset any speaking audio
    speech.stop();

    this.viewTopics.classList.remove('active');
    this.viewExercise.classList.remove('active');
    this.viewSummary.classList.remove('active');

    if (viewName === 'topics') {
      this.viewTopics.classList.add('active');
      this.renderTopics();
      this.updateGlobalHeader();
    } else if (viewName === 'exercise') {
      this.viewExercise.classList.add('active');
    } else if (viewName === 'summary') {
      this.viewSummary.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateGlobalHeader() {
    const stats = storage.getGlobalStats();
    this.streakCounterVal.textContent = stats.currentStreak;
    if (stats.currentStreak > 0) {
      this.headerStreakPill.style.display = 'inline-flex';
    } else {
      this.headerStreakPill.style.display = 'none';
    }
  }

  setInputMode(mode) {
    this.inputMode = mode;
    storage.setPreference('inputMode', mode);

    if (mode === 'chips') {
      this.modeBtnChips.classList.add('active');
      this.modeBtnTyping.classList.remove('active');
      this.optionsChipsContainer.style.display = 'grid';
      this.typingInputContainer.style.display = 'none';
    } else {
      this.modeBtnChips.classList.remove('active');
      this.modeBtnTyping.classList.add('active');
      this.optionsChipsContainer.style.display = 'none';
      this.typingInputContainer.style.display = 'block';
    }
  }

  renderTopics() {
    this.topicsContainer.innerHTML = '';
    const scheduleStore = storage.getAllSchedule();

    let totalDueCount = 0;

    TOPICS.forEach((topic) => {
      const progress = storage.getTopicProgress(topic.id, topic.exercises.length);
      const dueCount = SessionScheduler.getTopicDueCount(topic.exercises, scheduleStore);
      totalDueCount += dueCount;

      const card = document.createElement('div');
      card.className = 'topic-card';
      card.style.setProperty('--topic-color', topic.color);

      const dueBadgeHTML = dueCount > 0
        ? `<span class="topic-due-badge" title="${dueCount} Sätze fällig zur Wiederholung">⚡ ${dueCount} fällig</span>`
        : '';

      card.innerHTML = `
        <div>
          <div class="topic-header">
            <div class="topic-icon">${topic.icon}</div>
            <div style="display: flex; gap: 6px; align-items: center;">
              ${dueBadgeHTML}
              <span class="level-badge">${topic.level}</span>
            </div>
          </div>
          <h2 class="topic-title">${topic.title}</h2>
          <p class="topic-desc">${topic.shortDescription}</p>
        </div>
        <div class="topic-footer">
          <div class="topic-progress-info">
            <span>Fortschritt (10 Sätze / Runde)</span>
            <span><strong>${progress.completed}</strong> / ${progress.total} (${progress.percent}%)</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${progress.percent}%"></div>
          </div>
        </div>
      `;

      card.addEventListener('click', () => this.startTopic(topic.id));
      this.topicsContainer.appendChild(card);
    });

    // Smart-Training Card konfigurieren
    if (this.smartTrainingCard) {
      this.smartTrainingCard.style.display = 'flex';
      if (totalDueCount > 0) {
        this.smartCardDesc.textContent = `${totalDueCount} fällige Wiederholungen vor dem Vergessen bewahren.`;
        this.btnSmartStart.innerHTML = `Jetzt 10 Sätze wiederholen <span>→</span>`;
      } else {
        this.smartCardDesc.textContent = `10 ausgewählte Sätze: Neue Kollokationen & Grammatik festigen.`;
        this.btnSmartStart.innerHTML = `10 Sätze starten <span>→</span>`;
      }
    }
  }

  startTopic(topicId) {
    const topic = TOPICS.find((t) => t.id === topicId);
    if (!topic) return;

    this.currentTopic = topic;
    const scheduleStore = storage.getAllSchedule();

    // 10 Sätze nach Fälligkeit (FSRS) und Relevanz zusammenstellen
    this.exerciseQueue = SessionScheduler.buildSession(topic.exercises, scheduleStore, 10);
    this.currentIndex = 0;
    this.roundCorrect = 0;
    this.roundTotal = this.exerciseQueue.length;

    this.showView('exercise');
    this.loadExercise();
  }

  startSmartSession() {
    const allExercises = [];
    TOPICS.forEach((t) => {
      if (t.exercises) allExercises.push(...t.exercises);
    });

    this.currentTopic = {
      id: 'smart-mix',
      title: 'Tägliches Smart-Training',
      icon: '⚡'
    };

    const scheduleStore = storage.getAllSchedule();
    this.exerciseQueue = SessionScheduler.buildSession(allExercises, scheduleStore, 10);
    this.currentIndex = 0;
    this.roundCorrect = 0;
    this.roundTotal = this.exerciseQueue.length;

    this.showView('exercise');
    this.loadExercise();
  }

  loadExercise() {
    this.isAnswerChecked = false;
    this.hintUsedForCurrent = false;
    this.selectedAnswer = '';
    this.btnCheckAnswer.disabled = true;
    this.feedbackDrawer.classList.remove('active', 'is-correct', 'is-incorrect');
    if (this.feedbackIntervalRow) {
      this.feedbackIntervalRow.style.display = 'none';
    }

    const currentEx = this.exerciseQueue[this.currentIndex];
    const currentNum = this.currentIndex + 1;

    // Aktualisiere Header & Fortschrittsbalken
    this.exerciseTopicTitle.textContent = `${this.currentTopic.icon} ${this.currentTopic.title}`;
    this.exerciseRoundCounter.textContent = `${currentNum} / ${this.roundTotal}`;
    const progressPercent = Math.round((this.currentIndex / this.roundTotal) * 100);
    this.exerciseRoundProgress.style.width = `${progressPercent}%`;

    // Satz mit Lücke rendern
    this.sentenceDisplay.innerHTML = `
      ${this.escapeHTML(currentEx.prefix)}
      <span class="gap-highlight empty" id="gap-span">${currentEx.gapPlaceholder}</span>
      ${this.escapeHTML(currentEx.suffix)}
    `;

    // Multiple Choice Chips rendern
    this.optionsChipsContainer.innerHTML = '';
    const shuffledOptions = [...currentEx.options].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach((optionText, index) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'option-chip';
      chip.innerHTML = `
        <span>${this.escapeHTML(optionText)}</span>
        <span class="chip-number">${index + 1}</span>
      `;

      chip.addEventListener('click', () => {
        if (this.isAnswerChecked) return;

        this.optionsChipsContainer.querySelectorAll('.option-chip').forEach((c) => c.classList.remove('selected'));
        chip.classList.add('selected');
        this.selectedAnswer = optionText;
        this.updateGapDisplay(optionText);
        this.btnCheckAnswer.disabled = false;
      });

      this.optionsChipsContainer.appendChild(chip);
    });

    // Reset Freitext-Eingabe
    this.textGapInput.value = '';
    if (this.inputMode === 'typing') {
      setTimeout(() => this.textGapInput.focus(), 100);
    }
  }

  updateGapDisplay(text) {
    const gapSpan = document.getElementById('gap-span');
    if (!gapSpan) return;

    if (!text || text.trim() === '') {
      gapSpan.className = 'gap-highlight empty';
      gapSpan.textContent = this.exerciseQueue[this.currentIndex].gapPlaceholder;
    } else {
      gapSpan.className = 'gap-highlight';
      gapSpan.textContent = text;
    }
  }

  insertUmlaut(char) {
    if (this.isAnswerChecked) return;
    const input = this.textGapInput;
    const start = input.selectionStart || input.value.length;
    const end = input.selectionEnd || input.value.length;
    const val = input.value;

    input.value = val.substring(0, start) + char + val.substring(end);
    input.selectionStart = input.selectionEnd = start + char.length;
    input.focus();

    this.selectedAnswer = input.value.trim();
    this.updateGapDisplay(this.selectedAnswer);
    this.btnCheckAnswer.disabled = this.selectedAnswer.length === 0;
  }

  readCurrentSentence() {
    const ex = this.exerciseQueue[this.currentIndex];
    const word = this.isAnswerChecked ? ex.correctAnswer : (this.selectedAnswer || '...');
    const fullSentence = `${ex.prefix} ${word} ${ex.suffix}`.replace(/\s+/g, ' ').trim();
    speech.speak(fullSentence);
  }

  showHint() {
    this.hintUsedForCurrent = true;
    const ex = this.exerciseQueue[this.currentIndex];
    alert(`💡 Grammatik-Tipp:\n\n${ex.tip}`);
  }

  checkAnswer() {
    if (this.isAnswerChecked || !this.selectedAnswer) return;
    this.isAnswerChecked = true;
    this.btnCheckAnswer.disabled = true;

    const ex = this.exerciseQueue[this.currentIndex];
    const normalizedInput = this.selectedAnswer.trim().toLowerCase();
    const isCorrect = ex.acceptableAnswers.some(
      (ans) => ans.trim().toLowerCase() === normalizedInput
    );

    // FSRS-Fortschritt registrieren
    const statsUpdate = storage.recordAnswer(this.currentTopic.id, ex.id, isCorrect, {
      hintUsed: this.hintUsedForCurrent,
      inputMode: this.inputMode
    });
    this.updateGlobalHeader();

    const gapSpan = document.getElementById('gap-span');

    // Visuelle Aktualisierung der Multiple-Choice Chips
    const chips = this.optionsChipsContainer.querySelectorAll('.option-chip');
    chips.forEach((chip) => {
      chip.disabled = true;
      const chipText = chip.querySelector('span:first-child')?.textContent?.trim().toLowerCase();
      if (chipText === ex.correctAnswer.toLowerCase()) {
        chip.classList.add('correct');
      } else if (chipText === normalizedInput && !isCorrect) {
        chip.classList.add('incorrect');
      }
    });

    if (isCorrect) {
      this.roundCorrect++;
      gapSpan.className = 'gap-highlight correct';
      gapSpan.textContent = ex.correctAnswer;
      sounds.playSuccess();

      this.feedbackDrawer.className = 'feedback-drawer active is-correct';
      this.feedbackIcon.textContent = '🎉';
      this.feedbackTitle.textContent = 'Hervorragend! Richtig gelöst.';

      // Streaks feiern (bei Serie von 3, 5, 10, ...)
      if (statsUpdate.currentStreak >= 3 && statsUpdate.currentStreak % 2 === 1) {
        this.triggerCelebrationParticles(40);
      }
    } else {
      gapSpan.className = 'gap-highlight incorrect';
      gapSpan.textContent = `${this.selectedAnswer} ✗ (${ex.correctAnswer})`;
      sounds.playError();

      this.feedbackDrawer.className = 'feedback-drawer active is-incorrect';
      this.feedbackIcon.textContent = '💡';
      this.feedbackTitle.textContent = `Richtige Antwort: „${ex.correctAnswer}“`;
    }

    // Feedback-Inhalte füllen
    this.feedbackCollocation.textContent = ex.collocation;
    this.feedbackMeaning.textContent = ex.meaning;
    this.feedbackExample.textContent = `„${ex.example}“`;

    // FSRS Wiederholungsintervall anzeigen
    if (this.feedbackIntervalRow && statsUpdate.card) {
      this.feedbackIntervalRow.style.display = 'flex';
      const formattedInterval = FSRSEngine.formatInterval(statsUpdate.card.intervalDays);
      this.feedbackIntervalVal.textContent = formattedInterval;
    }

    // Satz automatisch aussprechen zur akustischen Festigung
    setTimeout(() => {
      speech.speak(`${ex.prefix} ${ex.correctAnswer} ${ex.suffix}`);
    }, 250);
  }

  nextExercise() {
    this.currentIndex++;
    if (this.currentIndex < this.roundTotal) {
      this.loadExercise();
    } else {
      this.finishRound();
    }
  }

  finishRound() {
    sounds.playComplete();
    this.triggerCelebrationParticles(100);

    const accuracy = Math.round((this.roundCorrect / this.roundTotal) * 100);
    this.summaryCorrectVal.textContent = `${this.roundCorrect} / ${this.roundTotal}`;
    this.summaryAccuracyVal.textContent = `${accuracy}%`;
    this.summaryStreakVal.textContent = storage.getGlobalStats().currentStreak;

    if (accuracy >= 80) {
      this.summaryEmoji.textContent = '🏆';
      this.summaryTitle.textContent = 'Fantastische Leistung!';
      this.summarySubtitle.textContent = `Du hast ${accuracy}% der 10 Aufgaben dieser Einheit erfolgreich gemeistert.`;
    } else if (accuracy >= 50) {
      this.summaryEmoji.textContent = '👏';
      this.summaryTitle.textContent = 'Gut gemacht!';
      this.summarySubtitle.textContent = 'Solide Runde! Durch die zeitgesteuerten Wiederholungen sitzt jede Kollokation bald felsenfest.';
    } else {
      this.summaryEmoji.textContent = '💪';
      this.summaryTitle.textContent = 'Dranbleiben!';
      this.summarySubtitle.textContent = 'FSRS bringt diese Sätze automatisch bald wieder zur Festigung.';
    }

    this.showView('summary');
  }

  openStatsModal() {
    const stats = storage.getGlobalStats();
    this.statsTotalAnswered.textContent = stats.totalExercisesAnswered;
    this.statsAccuracy.textContent = `${stats.accuracy}%`;
    this.statsCurrentStreak.textContent = stats.currentStreak;
    this.statsBestStreak.textContent = stats.bestStreak;

    // Anki-Style FSRS Repetition Analytics berechnen
    const scheduleStore = storage.getAllSchedule();
    const libraryStats = SessionScheduler.getLibraryStats(TOPICS, scheduleStore);

    if (this.ankiRetentionBadge) {
      this.ankiRetentionBadge.textContent = `Behaltequote: ${libraryStats.averageRetention}%`;
    }

    // Zähler aktualisieren
    if (this.ankiCountDue) this.ankiCountDue.textContent = libraryStats.due;
    if (this.ankiCountLearning) this.ankiCountLearning.textContent = libraryStats.learning;
    if (this.ankiCountReview) this.ankiCountReview.textContent = libraryStats.review;
    if (this.ankiCountNew) this.ankiCountNew.textContent = libraryStats.newCards;

    // Segmentierter Speicherbalken
    const total = libraryStats.total || 1;
    if (this.segDue) this.segDue.style.width = `${(libraryStats.due / total) * 100}%`;
    if (this.segLearning) this.segLearning.style.width = `${(libraryStats.learning / total) * 100}%`;
    if (this.segReview) this.segReview.style.width = `${(libraryStats.review / total) * 100}%`;
    if (this.segNew) this.segNew.style.width = `${(libraryStats.newCards / total) * 100}%`;

    // 7-Tage-Forecast Balkendiagramm rendern
    if (this.forecastChart && libraryStats.forecast) {
      const maxCount = Math.max(1, ...libraryStats.forecast.map((f) => f.count));
      this.forecastChart.innerHTML = libraryStats.forecast
        .map((f, idx) => {
          const heightPercent = f.count > 0 ? Math.max(15, Math.round((f.count / maxCount) * 100)) : 4;
          const isToday = idx === 0 ? 'is-today' : '';
          return `
            <div class="forecast-col ${isToday}">
              <span class="forecast-val">${f.count}</span>
              <div class="forecast-bar-track">
                <div class="forecast-bar-fill" style="height: ${heightPercent}%"></div>
              </div>
              <span class="forecast-lbl">${f.label}</span>
            </div>
          `;
        })
        .join('');
    }

    this.modalStats.classList.add('active');
  }

  closeStatsModal() {
    this.modalStats.classList.remove('active');
  }

  escapeHTML(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
  }

  // Leichtgewichtiger, eleganter Konfetti-Effekt
  triggerCelebrationParticles(count = 50) {
    if (!this.canvas) return;
    const ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    const colors = ['#10b981', '#38bdf8', '#fbbf24', '#f43f5e', '#a855f7'];
    const particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: this.canvas.width * (0.2 + Math.random() * 0.6),
        y: this.canvas.height * 0.4,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.8) * 14,
        size: 5 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }

    let animationFrame;
    const render = () => {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      let aliveCount = 0;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // Schwerkraft
        p.rotation += p.vr;
        p.opacity -= 0.012;

        if (p.opacity > 0) {
          aliveCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      if (aliveCount > 0) {
        animationFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        cancelAnimationFrame(animationFrame);
      }
    };

    render();
  }
}

// Initialisierung bei DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  window.app = new DeutschifyApp();
});
