import { topicRepo } from './data/TopicRepository.js';
import { storage } from './storage.js';
import { sounds, speech } from './audio.js';
import { FSRSEngine } from './fsrs.js';
import { SessionScheduler } from './scheduler.js';
import { notificationManager } from './notifications.js';
import { backgroundPlayer } from './audio-player.js';

class DeutschifyApp {
  constructor() {
    this.currentTopic = null;
    this.cachedTopics = [];
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
    this.initNotifications();
    this.initAudioPlayerEvents();
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
    this.viewAudio = document.getElementById('view-audio');

    // Header & Controls
    this.btnLogoHome = document.getElementById('btn-logo-home');
    this.headerStreakPill = document.getElementById('header-streak-pill');
    this.streakCounterVal = document.getElementById('streak-counter-val');
    this.btnToggleSound = document.getElementById('btn-toggle-sound');
    this.soundIcon = document.getElementById('sound-icon');
    this.btnOpenAudioMode = document.getElementById('btn-open-audio-mode');
    this.btnToggleNotifications = document.getElementById('btn-toggle-notifications');
    this.notificationIcon = document.getElementById('notification-icon');
    this.btnToggleTheme = document.getElementById('btn-toggle-theme');
    this.themeIcon = document.getElementById('theme-icon');
    this.btnOpenStats = document.getElementById('btn-open-stats');

    // Home / Topics & Smart Training
    this.smartTrainingCard = document.getElementById('smart-training-card');
    this.smartCardDesc = document.getElementById('smart-card-desc');
    this.btnSmartStart = document.getElementById('btn-smart-start');
    this.audioTrainingCard = document.getElementById('audio-training-card');
    this.audioCardDesc = document.getElementById('audio-card-desc');
    this.btnAudioStart = document.getElementById('btn-audio-start');
    this.topicsContainer = document.getElementById('topics-container');
    this.modeBtnChips = document.getElementById('mode-btn-chips');
    this.modeBtnTyping = document.getElementById('mode-btn-typing');
    this.modeBtnAudio = document.getElementById('mode-btn-audio');

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

    // Notification UI in Stats Modal
    this.notifPermissionBadge = document.getElementById('notif-permission-badge');
    this.btnEnableNotifications = document.getElementById('btn-enable-notifications');
    this.btnTestNotification = document.getElementById('btn-test-notification');
    this.notifStatusNote = document.getElementById('notif-status-note');

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

    // Audio-Modus Elemente
    this.btnExitAudio = document.getElementById('btn-exit-audio');
    this.audioTrackCounter = document.getElementById('audio-track-counter');
    this.audioEmptyCard = document.getElementById('audio-empty-card');
    this.audioPlayerContent = document.getElementById('audio-player-content');
    this.btnEmptyStartLearning = document.getElementById('btn-empty-start-learning');
    this.audioTopicBadge = document.getElementById('audio-topic-badge');
    this.audioDifficultyBadge = document.getElementById('audio-difficulty-badge');
    this.audioDifficultyVal = document.getElementById('audio-difficulty-val');
    this.audioVisualizer = document.getElementById('audio-visualizer');
    this.audioStepBadge = document.getElementById('audio-step-badge');
    this.audioSentenceDisplay = document.getElementById('audio-sentence-display');
    this.audioCollocationDisplay = document.getElementById('audio-collocation-display');
    this.audioMeaningDisplay = document.getElementById('audio-meaning-display');
    this.audioExampleRow = document.getElementById('audio-example-row');
    this.audioExampleDisplay = document.getElementById('audio-example-display');
    this.audioProgressFill = document.getElementById('audio-progress-fill');
    this.btnAudioRepeat = document.getElementById('btn-audio-repeat');
    this.btnAudioRepeatCount = document.getElementById('btn-audio-repeat-count');
    this.audioRepeatCountVal = document.getElementById('audio-repeat-count-val');
    this.btnAudioPrev = document.getElementById('btn-audio-prev');
    this.btnAudioPlayPause = document.getElementById('btn-audio-play-pause');
    this.audioPlayIcon = document.getElementById('audio-play-icon');
    this.btnAudioNext = document.getElementById('btn-audio-next');
    this.btnAudioSpeed = document.getElementById('btn-audio-speed');
    this.audioSpeedVal = document.getElementById('audio-speed-val');
    this.toggleAudioSentence = document.getElementById('toggle-audio-sentence');
    this.toggleAudioRepeat2x = document.getElementById('toggle-audio-repeat-2x');
    this.toggleAudioCollocation = document.getElementById('toggle-audio-collocation');
    this.toggleAudioMeaning = document.getElementById('toggle-audio-meaning');
    this.toggleAudioExample = document.getElementById('toggle-audio-example');
    this.audioQueueBadge = document.getElementById('audio-queue-badge');
    this.audioQueueList = document.getElementById('audio-queue-list');

    // Mini-Player Elemente
    this.audioMiniPlayer = document.getElementById('audio-mini-player');
    this.miniPlayerClickable = document.getElementById('mini-player-clickable');
    this.miniPlayerCollocation = document.getElementById('mini-player-collocation');
    this.miniPlayerSentence = document.getElementById('mini-player-sentence');
    this.miniBtnPlayPause = document.getElementById('mini-btn-play-pause');
    this.miniPlayIcon = document.getElementById('mini-play-icon');
    this.miniBtnNext = document.getElementById('mini-btn-next');
    this.miniBtnClose = document.getElementById('mini-btn-close');
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

    // Audio Repetition Preference
    if (prefs.audioRepeatCount) {
      this.setAudioRepeatCount(Number(prefs.audioRepeatCount));
    }
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

    // Notification Toggles & Testing
    if (this.btnToggleNotifications) {
      this.btnToggleNotifications.addEventListener('click', () => this.handleNotificationToggle());
    }
    if (this.btnEnableNotifications) {
      this.btnEnableNotifications.addEventListener('click', () => this.handleNotificationToggle());
    }
    if (this.btnTestNotification) {
      this.btnTestNotification.addEventListener('click', () => {
        notificationManager.sendTestNotification();
        this.updateNotificationUI();
      });
    }

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
    if (this.modeBtnAudio) {
      this.modeBtnAudio.addEventListener('click', () => this.openAudioMode());
    }

    // Audio-Hintergrundmodus Entrypoints & Navigation
    if (this.btnOpenAudioMode) {
      this.btnOpenAudioMode.addEventListener('click', () => this.openAudioMode());
    }
    if (this.btnAudioStart) {
      this.btnAudioStart.addEventListener('click', () => this.openAudioMode());
    }
    if (this.btnExitAudio) {
      this.btnExitAudio.addEventListener('click', () => this.showView('topics'));
    }
    if (this.btnEmptyStartLearning) {
      this.btnEmptyStartLearning.addEventListener('click', () => this.showView('topics'));
    }

    // Audio Player Controls
    if (this.btnAudioPlayPause) {
      this.btnAudioPlayPause.addEventListener('click', () => backgroundPlayer.togglePlay());
    }
    if (this.btnAudioPrev) {
      this.btnAudioPrev.addEventListener('click', () => backgroundPlayer.previous());
    }
    if (this.btnAudioNext) {
      this.btnAudioNext.addEventListener('click', () => backgroundPlayer.next());
    }
    if (this.btnAudioRepeat) {
      this.btnAudioRepeat.addEventListener('click', () => {
        const nextRepeat = !backgroundPlayer.options.repeatOne;
        backgroundPlayer.setOption('repeatOne', nextRepeat);
        this.btnAudioRepeat.classList.toggle('is-active', nextRepeat);
        this.btnAudioRepeat.title = nextRepeat ? 'Satz-Wiederholung aktiv' : 'Diesen Satz wiederholen';
      });
    }
    if (this.btnAudioRepeatCount) {
      this.btnAudioRepeatCount.addEventListener('click', () => {
        const current = backgroundPlayer.options.repeatCount || 1;
        const next = current === 2 ? 1 : 2;
        this.setAudioRepeatCount(next);
      });
    }
    if (this.btnAudioSpeed) {
      const speeds = [0.8, 0.92, 1.15];
      let speedIdx = 1;
      this.btnAudioSpeed.addEventListener('click', () => {
        speedIdx = (speedIdx + 1) % speeds.length;
        const newSpeed = speeds[speedIdx];
        backgroundPlayer.setSpeed(newSpeed);
        if (this.audioSpeedVal) {
          this.audioSpeedVal.textContent = `${newSpeed.toFixed(1)}x`;
        }
      });
    }

    // Audio Toggles
    if (this.toggleAudioSentence) {
      this.toggleAudioSentence.addEventListener('change', (e) => {
        backgroundPlayer.setOption('speakSentence', e.target.checked);
      });
    }
    if (this.toggleAudioRepeat2x) {
      this.toggleAudioRepeat2x.addEventListener('change', (e) => {
        this.setAudioRepeatCount(e.target.checked ? 2 : 1);
      });
    }
    if (this.toggleAudioCollocation) {
      this.toggleAudioCollocation.addEventListener('change', (e) => {
        backgroundPlayer.setOption('speakCollocation', e.target.checked);
      });
    }
    if (this.toggleAudioMeaning) {
      this.toggleAudioMeaning.addEventListener('change', (e) => {
        backgroundPlayer.setOption('speakMeaning', e.target.checked);
      });
    }
    if (this.toggleAudioExample) {
      this.toggleAudioExample.addEventListener('change', (e) => {
        backgroundPlayer.setOption('speakExample', e.target.checked);
      });
    }

    // Mini-Player Controls
    if (this.miniBtnPlayPause) {
      this.miniBtnPlayPause.addEventListener('click', (e) => {
        e.stopPropagation();
        backgroundPlayer.togglePlay();
      });
    }
    if (this.miniBtnNext) {
      this.miniBtnNext.addEventListener('click', (e) => {
        e.stopPropagation();
        backgroundPlayer.next();
      });
    }
    if (this.miniBtnClose) {
      this.miniBtnClose.addEventListener('click', (e) => {
        e.stopPropagation();
        backgroundPlayer.stop();
        if (this.audioMiniPlayer) this.audioMiniPlayer.style.display = 'none';
      });
    }
    if (this.miniPlayerClickable) {
      this.miniPlayerClickable.addEventListener('click', () => {
        this.showView('audio');
      });
    }

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

    // Global Hotkeys (Enter / 1-4 for exercise, Space / Arrows for Audio-Modus)
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
      } else if (this.viewAudio && this.viewAudio.classList.contains('active')) {
        if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
          e.preventDefault();
          backgroundPlayer.togglePlay();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          backgroundPlayer.next();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          backgroundPlayer.previous();
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
        navigator.serviceWorker.register('/sw.js').then((reg) => {
          notificationManager.setServiceWorkerRegistration(reg);
        }).catch((err) => {
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
    // Falls Audio im Hintergrund aktiv ist, Sprachausgabe nicht grundlos stoppen
    if (backgroundPlayer.state !== 'playing') {
      speech.stop();
    }

    this.viewTopics.classList.remove('active');
    this.viewExercise.classList.remove('active');
    this.viewSummary.classList.remove('active');
    if (this.viewAudio) this.viewAudio.classList.remove('active');

    if (viewName === 'topics') {
      this.viewTopics.classList.add('active');
      this.renderTopics();
      this.updateGlobalHeader();
    } else if (viewName === 'exercise') {
      this.viewExercise.classList.add('active');
    } else if (viewName === 'summary') {
      this.viewSummary.classList.add('active');
    } else if (viewName === 'audio') {
      if (this.viewAudio) this.viewAudio.classList.add('active');
    }

    // Mini-Player anzeigen, wenn Audio im Hintergrund läuft und wir eine andere Ansicht betrachten
    if (this.audioMiniPlayer) {
      if (viewName !== 'audio' && backgroundPlayer.state === 'playing') {
        this.audioMiniPlayer.style.display = 'flex';
      } else {
        this.audioMiniPlayer.style.display = 'none';
      }
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

  async renderTopics() {
    let topics = topicRepo.getAllCachedTopics();
    if (topics.length === 0) {
      topics = await topicRepo.loadAll();
    }

    this.topicsContainer.innerHTML = '';
    const scheduleStore = storage.getAllSchedule();

    let totalDueCount = 0;

    topics.forEach((topic) => {
      const exerciseCount = topic.totalExercises || (topic.exercises ? topic.exercises.length : 0);
      const progress = storage.getTopicProgress(topic.id, exerciseCount);
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

    // Audio-Hintergrundmodus Card konfigurieren
    if (this.audioTrainingCard) {
      this.audioTrainingCard.style.display = 'flex';
      const workedList = SessionScheduler.getWorkedExercisesSortedByDifficulty(topics, scheduleStore);
      if (workedList.length > 0) {
        this.audioCardDesc.textContent = `${workedList.length} geübte Sätze bereit – automatisch nach den schwierigsten Aufgaben sortiert.`;
        this.btnAudioStart.innerHTML = `Audio starten (${workedList.length} Sätze) <span>▶</span>`;
      } else {
        this.audioCardDesc.textContent = `Höre alle bereits geübten Sätze im Hintergrund – schließe zuerst eine Übung ab!`;
        this.btnAudioStart.innerHTML = `Audio-Modus öffnen <span>▶</span>`;
      }
    }

    this.cachedTopics = topics;

    // Fällige Wiederholungen prüfen & ggf. genau einmal benachrichtigen (wenn >= 10)
    notificationManager.checkDueAndNotify(topics, scheduleStore);
  }

  async startTopic(topicId) {
    const topic = await topicRepo.getTopic(topicId);
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

  async startSmartSession() {
    await topicRepo.loadAll();
    const allExercises = topicRepo.getAllExercises();

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

    // Nach Rundenabschluss Wiederholungsstand prüfen & Latch ggf. zurücksetzen
    notificationManager.checkDueAndNotify(this.cachedTopics, storage.getAllSchedule());
  }

  initNotifications() {
    notificationManager.init({
      onStartSession: () => this.startSmartSession()
    });
    this.updateNotificationUI();
  }

  updateNotificationUI() {
    const status = notificationManager.getPermissionStatus();
    const notifState = storage.getNotificationState();

    if (this.notifPermissionBadge) {
      this.notifPermissionBadge.className = `notif-badge ${status}`;
      if (status === 'granted') {
        this.notifPermissionBadge.textContent = 'Aktiviert';
      } else if (status === 'denied') {
        this.notifPermissionBadge.textContent = 'Blockiert';
      } else if (status === 'unsupported') {
        this.notifPermissionBadge.textContent = 'Nicht unterstützt';
      } else {
        this.notifPermissionBadge.textContent = 'Aus';
      }
    }

    if (this.btnEnableNotifications) {
      if (status === 'granted') {
        this.btnEnableNotifications.textContent = 'Benachrichtigungen aktiv ✓';
        this.btnEnableNotifications.classList.add('is-active');
      } else if (status === 'denied') {
        this.btnEnableNotifications.textContent = 'Im Browser blockiert ⚠';
        this.btnEnableNotifications.classList.remove('is-active');
      } else {
        this.btnEnableNotifications.textContent = 'Benachrichtigungen aktivieren';
        this.btnEnableNotifications.classList.remove('is-active');
      }
    }

    if (this.btnToggleNotifications) {
      if (status === 'granted') {
        this.btnToggleNotifications.classList.add('notif-active');
        this.btnToggleNotifications.title = 'Wiederholungs-Erinnerungen aktiv (bei 10 fälligen Sätzen)';
      } else {
        this.btnToggleNotifications.classList.remove('notif-active');
        this.btnToggleNotifications.title = 'Wiederholungs-Erinnerungen aktivieren';
      }
    }

    if (this.notifStatusNote) {
      if (status === 'granted') {
        if (notifState.notifiedForCurrentBatch) {
          this.notifStatusNote.textContent = 'Hinweis: Du wurdest für die aktuellen fälligen Sätze bereits benachrichtigt. Nach dem nächsten Üben wird beim nächsten Erreichen von 10 Sätzen erneut benachrichtigt.';
        } else {
          this.notifStatusNote.textContent = 'Bereit: Sobald 10 Sätze fällig werden, erhältst du genau eine Benachrichtigung auf dein Gerät.';
        }
      } else if (status === 'denied') {
        this.notifStatusNote.textContent = 'Benachrichtigungen sind in den Browser-Einstellungen für diese Seite deaktiviert. In-App-Hinweise funktionieren weiterhin.';
      } else if (status === 'unsupported') {
        this.notifStatusNote.textContent = 'Dieser Browser unterstützt keine System-Benachrichtigungen. Deutschify blendet Hinweise direkt in der App ein.';
      } else {
        this.notifStatusNote.textContent = 'Klicke auf aktivieren, damit dich Deutschify benachrichtigt, sobald 10 Sätze zur Wiederholung anstehen.';
      }
    }
  }

  async handleNotificationToggle() {
    const status = notificationManager.getPermissionStatus();
    if (status === 'default') {
      const res = await notificationManager.requestPermission();
      this.updateNotificationUI();
      if (res === 'granted') {
        notificationManager.showToast({
          title: '🔔 Benachrichtigungen aktiviert!',
          message: 'Deutschify erinnert dich genau einmal, sobald 10 Sätze zur Wiederholung bereitstehen.',
          actionText: 'Prima!'
        });
      }
    } else if (status === 'denied') {
      notificationManager.showToast({
        title: 'Benachrichtigungen blockiert',
        message: 'Bitte erlaube Benachrichtigungen in den Website-Einstellungen deines Browsers.',
        actionText: 'Verstanden'
      });
    } else if (status === 'granted') {
      this.openStatsModal();
    } else {
      notificationManager.showToast({
        title: 'Nicht unterstützt',
        message: 'Dein Browser unterstützt keine System-Benachrichtigungen. In-App-Meldungen bleiben aktiv.',
        actionText: 'OK'
      });
    }
  }

  async openStatsModal() {
    const stats = storage.getGlobalStats();
    this.statsTotalAnswered.textContent = stats.totalExercisesAnswered;
    this.statsAccuracy.textContent = `${stats.accuracy}%`;
    this.statsCurrentStreak.textContent = stats.currentStreak;
    this.statsBestStreak.textContent = stats.bestStreak;

    // Anki-Style FSRS Repetition Analytics berechnen
    const scheduleStore = storage.getAllSchedule();
    let topics = topicRepo.getAllCachedTopics();
    if (topics.length === 0) {
      topics = await topicRepo.loadAll();
    }
    const libraryStats = SessionScheduler.getLibraryStats(topics, scheduleStore);

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

    this.updateNotificationUI();
    document.body.classList.add('modal-open');
    this.modalStats.classList.add('active');
  }

  closeStatsModal() {
    this.modalStats.classList.remove('active');
    document.body.classList.remove('modal-open');
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

  // ==========================================================================
  // AUDIO-HINTERGRUNDMODUS (HANDS-FREE LISTENING METHODS)
  // ==========================================================================

  initAudioPlayerEvents() {
    backgroundPlayer.on('trackChange', (item, index, total) => {
      this.updateAudioPlayerUI(item, index, total);
    });

    backgroundPlayer.on('stateChange', (state) => {
      this.updateAudioPlayerStateUI(state);
    });

    backgroundPlayer.on('stepChange', (step, meta) => {
      this.updateAudioPlayerStepUI(step, meta);
    });

    backgroundPlayer.on('playlistUpdate', (playlist) => {
      this.renderAudioQueue(playlist);
    });
  }

  setAudioRepeatCount(count) {
    const is2x = count === 2;
    backgroundPlayer.setOption('repeatCount', count);
    storage.setPreference('audioRepeatCount', count);
    if (this.audioRepeatCountVal) {
      this.audioRepeatCountVal.textContent = is2x ? '2x' : '1x';
    }
    if (this.btnAudioRepeatCount) {
      this.btnAudioRepeatCount.classList.toggle('is-active', is2x);
      this.btnAudioRepeatCount.title = is2x
        ? 'Wiederholung: 2x (Klick für 1x)'
        : 'Satz/Beispiel 2x wiederholen';
    }
    if (this.toggleAudioRepeat2x) {
      this.toggleAudioRepeat2x.checked = is2x;
    }
  }

  async openAudioMode() {
    let topics = topicRepo.getAllCachedTopics();
    if (topics.length === 0) {
      topics = await topicRepo.loadAll();
    }
    const scheduleStore = storage.getAllSchedule();
    const workedList = SessionScheduler.getWorkedExercisesSortedByDifficulty(topics, scheduleStore);

    this.showView('audio');

    if (workedList.length === 0) {
      if (this.audioEmptyCard) this.audioEmptyCard.style.display = 'block';
      if (this.audioPlayerContent) this.audioPlayerContent.style.display = 'none';
      if (this.audioTrackCounter) this.audioTrackCounter.textContent = '0 / 0';
    } else {
      if (this.audioEmptyCard) this.audioEmptyCard.style.display = 'none';
      if (this.audioPlayerContent) this.audioPlayerContent.style.display = 'block';
      backgroundPlayer.setPlaylist(workedList);
      if (backgroundPlayer.state !== 'playing') {
        backgroundPlayer.play();
      }
    }
  }

  updateAudioPlayerUI(item, index, total) {
    if (!item) return;

    if (this.audioTrackCounter) {
      this.audioTrackCounter.textContent = `${index + 1} / ${total}`;
    }

    if (this.audioProgressFill) {
      const pct = total > 0 ? Math.round(((index + 1) / total) * 100) : 0;
      this.audioProgressFill.style.width = `${pct}%`;
    }

    if (this.audioTopicBadge) {
      this.audioTopicBadge.textContent = `${item.topicIcon || '📌'} ${item.topicTitle || 'Thema'}`;
    }

    const diff = typeof item.card?.difficulty === 'number' ? item.card.difficulty : 5.0;
    const diffStr = diff.toFixed(1);
    const lapses = item.card?.lapses || 0;

    if (this.audioDifficultyVal) {
      this.audioDifficultyVal.textContent = `Schwierigkeit: ${diffStr} / 10${lapses > 0 ? ` • ${lapses} Fehlversuch${lapses > 1 ? 'e' : ''}` : ''}`;
    }

    if (this.audioDifficultyBadge) {
      this.audioDifficultyBadge.className = 'audio-difficulty-pill';
      if (diff >= 7.5) {
        this.audioDifficultyBadge.classList.add('diff-hard');
      } else if (diff >= 5.5) {
        this.audioDifficultyBadge.classList.add('diff-medium');
      } else {
        this.audioDifficultyBadge.classList.add('diff-easy');
      }
    }

    if (this.audioSentenceDisplay) {
      this.audioSentenceDisplay.innerHTML = `
        ${this.escapeHTML(item.prefix)} <span class="audio-highlight">${this.escapeHTML(item.correctAnswer)}</span> ${this.escapeHTML(item.suffix)}
      `;
    }

    if (this.audioCollocationDisplay) {
      this.audioCollocationDisplay.textContent = item.collocation || item.correctAnswer;
    }

    if (this.audioMeaningDisplay) {
      this.audioMeaningDisplay.textContent = item.meaning || '-';
    }

    if (this.audioExampleDisplay && this.audioExampleRow) {
      if (item.example) {
        this.audioExampleRow.style.display = 'flex';
        this.audioExampleDisplay.textContent = `„${item.example}“`;
      } else {
        this.audioExampleRow.style.display = 'none';
      }
    }

    // Mini-Player Text aktualisieren
    if (this.miniPlayerCollocation) {
      this.miniPlayerCollocation.textContent = item.collocation || item.correctAnswer;
    }
    if (this.miniPlayerSentence) {
      this.miniPlayerSentence.textContent = `${item.prefix} ${item.correctAnswer} ${item.suffix}`.replace(/\s+/g, ' ').trim();
    }

    // Aktiven Eintrag in Queue hervorheben
    if (this.audioQueueList) {
      const items = this.audioQueueList.querySelectorAll('.queue-item');
      items.forEach((el, idx) => {
        if (idx === index) {
          el.classList.add('active');
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          el.classList.remove('active');
        }
      });
    }
  }

  updateAudioPlayerStateUI(state) {
    const isPlaying = state === 'playing';

    if (this.audioPlayIcon) {
      this.audioPlayIcon.textContent = isPlaying ? '⏸' : '▶';
    }
    if (this.miniPlayIcon) {
      this.miniPlayIcon.textContent = isPlaying ? '⏸' : '▶';
    }

    if (this.audioVisualizer) {
      if (isPlaying) {
        this.audioVisualizer.classList.add('is-playing');
      } else {
        this.audioVisualizer.classList.remove('is-playing');
      }
    }

    // Mini-Player anzeigen, wenn Audio aktiv ist und eine andere Seite geöffnet ist
    if (this.audioMiniPlayer) {
      if (isPlaying && !this.viewAudio.classList.contains('active')) {
        this.audioMiniPlayer.style.display = 'flex';
      } else if (!isPlaying && state === 'stopped') {
        this.audioMiniPlayer.style.display = 'none';
      }
    }
  }

  updateAudioPlayerStepUI(step, meta = {}) {
    if (!this.audioStepBadge) return;

    if (step === 'sentence') {
      if (meta.totalRepeats > 1) {
        this.audioStepBadge.innerHTML = `<span>🔁</span> Satz wird vorgelesen (${meta.repeatIndex}/${meta.totalRepeats})...`;
      } else {
        this.audioStepBadge.innerHTML = '<span>🗣️</span> Ganzer Satz wird vorgelesen...';
      }
    } else if (step === 'collocation') {
      this.audioStepBadge.innerHTML = '<span>🔗</span> Kollokation wird vorgelesen...';
    } else if (step === 'meaning') {
      this.audioStepBadge.innerHTML = '<span>💡</span> Bedeutung wird erklärt...';
    } else if (step === 'example') {
      if (meta.totalRepeats > 1) {
        this.audioStepBadge.innerHTML = `<span>🔁</span> Beispielsatz (${meta.repeatIndex}/${meta.totalRepeats})...`;
      } else {
        this.audioStepBadge.innerHTML = '<span>📖</span> Beispielsatz wird vorgelesen...';
      }
    } else if (step === 'pause') {
      this.audioStepBadge.innerHTML = '<span>⏳</span> Pause zum Nachsprechen...';
    } else {
      this.audioStepBadge.innerHTML = '<span>🎧</span> Bereit zum Anhören';
    }
  }

  renderAudioQueue(playlist) {
    if (!this.audioQueueList) return;

    if (this.audioQueueBadge) {
      this.audioQueueBadge.textContent = `${playlist.length} Sätze`;
    }

    this.audioQueueList.innerHTML = '';
    playlist.forEach((item, idx) => {
      const diff = typeof item.card?.difficulty === 'number' ? item.card.difficulty : 5.0;
      const diffClass = diff >= 7.5 ? 'diff-hard' : (diff >= 5.5 ? 'diff-medium' : 'diff-easy');
      const isActive = idx === backgroundPlayer.currentIndex;

      const row = document.createElement('div');
      row.className = `queue-item ${isActive ? 'active' : ''}`;
      row.dataset.index = idx;
      row.innerHTML = `
        <span class="queue-rank">#${idx + 1}</span>
        <div class="queue-item-info">
          <div class="queue-item-collocation">${this.escapeHTML(item.collocation || item.correctAnswer)}</div>
          <div class="queue-item-sentence">${this.escapeHTML(item.prefix)} ${this.escapeHTML(item.correctAnswer)} ${this.escapeHTML(item.suffix)}</div>
        </div>
        <span class="queue-diff-pill ${diffClass}">D: ${diff.toFixed(1)}</span>
      `;

      row.addEventListener('click', () => {
        backgroundPlayer.jumpTo(idx);
      });

      this.audioQueueList.appendChild(row);
    });
  }
}

// Initialisierung bei DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  window.app = new DeutschifyApp();
});
