// Deutschify - Background Audio Player (Hands-Free Listening Mode)
// Ermöglicht das kontinuierliche Anhören bereits geübter Sätze im Hintergrund,
// sortiert nach FSRS-Schwierigkeit (schwierigste Aufgaben zuerst).
// Unterstützt MediaSession API & Background Audio Keepalive für Mobilgeräte & Sperrbildschirm.

import { speech, bgAudioKeepalive } from './audio.js';

export class BackgroundAudioPlayer {
  constructor() {
    this.playlist = [];
    this.currentIndex = 0;
    this.state = 'stopped'; // 'playing' | 'paused' | 'stopped'
    this.currentStep = 'idle'; // 'sentence' | 'collocation' | 'meaning' | 'pause'
    this.isCancelling = false;

    this.options = {
      speed: 0.92,
      speakSentence: true,
      speakCollocation: true,
      speakMeaning: true,
      repeatOne: false,
      autoAdvance: true,
      pauseAfterSentenceMs: 1200,
      pauseAfterCollocationMs: 1000,
      pauseBeforeNextMs: 2500
    };

    // Event Listeners
    this.listeners = {
      trackChange: [],
      stateChange: [],
      stepChange: [],
      playlistUpdate: []
    };

    this._setupMediaSessionHandlers();
  }

  _setupMediaSessionHandlers() {
    bgAudioKeepalive.setActionHandlers({
      onPlay: () => this.play(),
      onPause: () => this.pause(),
      onNext: () => this.next(),
      onPrevious: () => this.previous()
    });
  }

  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  emit(event, ...args) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((cb) => {
        try {
          cb(...args);
        } catch (e) {
          console.error(`Error in audio player listener '${event}':`, e);
        }
      });
    }
  }

  setPlaylist(items = []) {
    this.playlist = Array.isArray(items) ? [...items] : [];
    if (this.currentIndex >= this.playlist.length) {
      this.currentIndex = 0;
    }
    this.emit('playlistUpdate', this.playlist);
    if (this.getCurrentItem()) {
      this.emit('trackChange', this.getCurrentItem(), this.currentIndex, this.playlist.length);
    }
  }

  getCurrentItem() {
    return this.playlist[this.currentIndex] || null;
  }

  setSpeed(speed) {
    this.options.speed = Number(speed) || 0.92;
  }

  setOption(key, val) {
    this.options[key] = val;
  }

  async play() {
    if (this.playlist.length === 0) return;

    if (this.state === 'paused') {
      this.state = 'playing';
      this.emit('stateChange', this.state);
      bgAudioKeepalive.start();
      bgAudioKeepalive.setPlaybackState('playing');
      speech.resume();
      // Falls pausiert im Pausen-Timeout war, starten wir den Loop neu für den Track
      if (!speech.isSpeaking()) {
        this._runPlaybackLoop();
      }
      return;
    }

    this.state = 'playing';
    this.emit('stateChange', this.state);
    await bgAudioKeepalive.start();
    bgAudioKeepalive.setPlaybackState('playing');
    this._runPlaybackLoop();
  }

  pause() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    speech.pause();
    bgAudioKeepalive.setPlaybackState('paused');
    this.emit('stateChange', this.state);
  }

  togglePlay() {
    if (this.state === 'playing') {
      this.pause();
    } else {
      this.play();
    }
  }

  stop() {
    this.isCancelling = true;
    this.state = 'stopped';
    this.currentStep = 'idle';
    speech.stop();
    bgAudioKeepalive.stop();
    this.emit('stateChange', this.state);
    this.emit('stepChange', this.currentStep);
  }

  next() {
    if (this.playlist.length === 0) return;
    this.isCancelling = true;
    speech.stop();

    if (this.currentIndex < this.playlist.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Zurück zum Anfang
    }

    this._onTrackAdvanced();
  }

  previous() {
    if (this.playlist.length === 0) return;
    this.isCancelling = true;
    speech.stop();

    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.playlist.length - 1;
    }

    this._onTrackAdvanced();
  }

  jumpTo(index) {
    if (index < 0 || index >= this.playlist.length) return;
    this.isCancelling = true;
    speech.stop();
    this.currentIndex = index;
    this._onTrackAdvanced();
  }

  _onTrackAdvanced() {
    const item = this.getCurrentItem();
    this.emit('trackChange', item, this.currentIndex, this.playlist.length);
    this._updateMediaMetadata(item);

    if (this.state === 'playing') {
      // Kurze Verzögerung für sauberen Abbruch der vorherigen Utterance
      setTimeout(() => {
        this.isCancelling = false;
        this._runPlaybackLoop();
      }, 150);
    } else {
      this.isCancelling = false;
    }
  }

  _updateMediaMetadata(item) {
    if (!item) return;
    const diff = item.card?.difficulty ? item.card.difficulty.toFixed(1) : '5.0';
    bgAudioKeepalive.setMediaMetadata({
      title: item.collocation || item.correctAnswer || 'Deutschify Audio',
      artist: `Deutschify • D: ${diff}/10 (Schwierigste zuerst)`,
      album: item.topicTitle || 'Kollokationen & Grammatik'
    });
  }

  async _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async _runPlaybackLoop() {
    this.isCancelling = false;

    while (this.state === 'playing' && !this.isCancelling) {
      const item = this.getCurrentItem();
      if (!item) break;

      this._updateMediaMetadata(item);
      this.emit('trackChange', item, this.currentIndex, this.playlist.length);

      // STEP 1: Vollständiger Beispielsatz
      if (this.options.speakSentence && this.state === 'playing' && !this.isCancelling) {
        this.currentStep = 'sentence';
        this.emit('stepChange', this.currentStep);

        const fullSentence = `${item.prefix} ${item.correctAnswer} ${item.suffix}`
          .replace(/\s+/g, ' ')
          .trim();

        await speech.speakAsync(fullSentence, { rate: this.options.speed });
        if (this.state !== 'playing' || this.isCancelling) break;

        await this._sleep(this.options.pauseAfterSentenceMs);
        if (this.state !== 'playing' || this.isCancelling) break;
      }

      // STEP 2: Kollokation & Lösung
      if (this.options.speakCollocation && this.state === 'playing' && !this.isCancelling) {
        this.currentStep = 'collocation';
        this.emit('stepChange', this.currentStep);

        const textToSpeak = item.collocation
          ? `Kollokation: ${item.collocation}`
          : `Lösung: ${item.correctAnswer}`;

        await speech.speakAsync(textToSpeak, { rate: this.options.speed });
        if (this.state !== 'playing' || this.isCancelling) break;

        await this._sleep(this.options.pauseAfterCollocationMs);
        if (this.state !== 'playing' || this.isCancelling) break;
      }

      // STEP 3: Bedeutung / Erklärung
      if (this.options.speakMeaning && item.meaning && this.state === 'playing' && !this.isCancelling) {
        this.currentStep = 'meaning';
        this.emit('stepChange', this.currentStep);

        const meaningText = `Bedeutung: ${item.meaning}`;
        await speech.speakAsync(meaningText, { rate: this.options.speed });
        if (this.state !== 'playing' || this.isCancelling) break;

        await this._sleep(this.options.pauseBeforeNextMs);
        if (this.state !== 'playing' || this.isCancelling) break;
      } else {
        // Kurze Pause vor dem nächsten Satz
        await this._sleep(this.options.pauseBeforeNextMs);
        if (this.state !== 'playing' || this.isCancelling) break;
      }

      // Nächsten Satz ermitteln
      if (this.options.repeatOne) {
        // Selben Satz wiederholen
        continue;
      } else if (this.currentIndex < this.playlist.length - 1) {
        this.currentIndex++;
      } else if (this.options.autoAdvance) {
        // Playlist von vorne beginnen
        this.currentIndex = 0;
      } else {
        // Am Ende der Playlist anhalten
        this.stop();
        break;
      }
    }
  }
}

export const backgroundPlayer = new BackgroundAudioPlayer();
