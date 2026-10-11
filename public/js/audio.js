// Deutschify - Audio & Sprachausgabe Modul
// Web Audio API für Sound-Effekte + Web Speech API für deutsches Vorlesen

class SoundEffects {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
  }

  _initContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playSuccess() {
    if (!this.soundEnabled) return;
    try {
      this._initContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      // Dreiklang (C5, E5, G5) für ein positives Erlebnis
      const notes = [523.25, 659.25, 783.99];

      notes.forEach((freq, i) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, now + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.4);
      });
    } catch (e) {
      console.warn('Audio nicht verfügbar:', e);
    }
  }

  playError() {
    if (!this.soundEnabled) return;
    try {
      this._initContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(190, now + 0.25);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      console.warn('Audio nicht verfügbar:', e);
    }
  }

  playComplete() {
    if (!this.soundEnabled) return;
    try {
      this._initContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const fanfare = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      fanfare.forEach((freq, index) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.12);

        gain.gain.setValueAtTime(0, now + index * 0.12);
        gain.gain.linearRampToValueAtTime(0.25, now + index * 0.12 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.12 + (index === 3 ? 0.8 : 0.4));

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + index * 0.12);
        osc.stop(now + index * 0.12 + (index === 3 ? 0.85 : 0.45));
      });
    } catch (e) {
      console.warn('Audio nicht verfügbar:', e);
    }
  }

  playNotification() {
    if (!this.soundEnabled) return;
    try {
      this._initContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      // Sanfter Zweiklang (E5 -> G#5) für eine dezente, angenehme Erinnerung
      const notes = [659.25, 830.61];

      notes.forEach((freq, i) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);

        gain.gain.setValueAtTime(0, now + i * 0.12);
        gain.gain.linearRampToValueAtTime(0.2, now + i * 0.12 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.35);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.4);
      });
    } catch (e) {
      console.warn('Audio nicht verfügbar:', e);
    }
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = Boolean(enabled);
  }
}

class SpeechService {
  constructor() {
    this.speechSynthesis = (typeof window !== 'undefined' && window.speechSynthesis) || null;
    this.germanVoice = null;
    this.activeUtterance = null;
    this.currentReject = null;
    this.keepAliveTimer = null;
    this.defaultRate = 0.92;
    this.initVoice();
  }

  initVoice() {
    if (!this.speechSynthesis) return;

    const findVoice = () => {
      const voices = this.speechSynthesis.getVoices();
      // Suche nach natürlicher deutscher Stimme
      this.germanVoice = voices.find(v => v.lang === 'de-DE' || v.lang.startsWith('de')) || null;
    };

    findVoice();
    if (this.speechSynthesis.onvoiceschanged !== undefined) {
      this.speechSynthesis.onvoiceschanged = findVoice;
    }
  }

  speak(text, options = {}) {
    this.speakAsync(text, options).catch(() => {});
  }

  /**
   * Liest einen deutschen Text asynchron vor und gibt ein Promise zurück,
   * das auflöst, sobald das Vorlesen abgeschlossen ist.
   * Behebt außerdem bekannte Browser-Bugs (Garbage Collection & Timeout-Pause).
   */
  speakAsync(text, options = {}) {
    if (!this.speechSynthesis) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      this.stop(); // Laufende Ausgaben abbrechen

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = options.rate || this.defaultRate;
      utterance.pitch = options.pitch || 1.0;

      if (this.germanVoice) {
        utterance.voice = this.germanVoice;
      }

      this.activeUtterance = utterance;
      this.currentReject = reject;

      let isResolved = false;
      const cleanup = () => {
        if (this.keepAliveTimer) {
          clearInterval(this.keepAliveTimer);
          this.keepAliveTimer = null;
        }
        if (this.activeUtterance === utterance) {
          this.activeUtterance = null;
        }
        this.currentReject = null;
      };

      utterance.onend = () => {
        if (!isResolved) {
          isResolved = true;
          cleanup();
          resolve();
        }
      };

      utterance.onerror = (event) => {
        if (!isResolved) {
          isResolved = true;
          cleanup();
          // Bei 'interrupted' oder 'canceled' sauber als beendet betrachten
          if (event && (event.error === 'interrupted' || event.error === 'canceled')) {
            resolve();
          } else {
            resolve(); // Nicht werfen, damit der Audio-Loop ungestört weiterspielen kann
          }
        }
      };

      // Chrome Bugfix: Lange Utterances pausieren nach 14s stumm
      this.keepAliveTimer = setInterval(() => {
        if (this.speechSynthesis && this.speechSynthesis.speaking) {
          this.speechSynthesis.pause();
          this.speechSynthesis.resume();
        } else {
          cleanup();
        }
      }, 10000);

      try {
        this.speechSynthesis.speak(utterance);
        // Falls Browser sofort im pausierten Zustand startet (iOS Bug):
        if (this.speechSynthesis.paused) {
          this.speechSynthesis.resume();
        }
      } catch (e) {
        cleanup();
        resolve();
      }
    });
  }

  pause() {
    if (this.speechSynthesis && this.speechSynthesis.speaking) {
      this.speechSynthesis.pause();
    }
  }

  resume() {
    if (this.speechSynthesis && this.speechSynthesis.paused) {
      this.speechSynthesis.resume();
    }
  }

  stop() {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
    if (this.speechSynthesis) {
      try {
        this.speechSynthesis.cancel();
      } catch (e) {
        // Ignorieren falls nicht verfügbar
      }
    }
    if (this.currentReject) {
      try {
        this.currentReject(new Error('canceled'));
      } catch (e) {}
      this.currentReject = null;
    }
    this.activeUtterance = null;
  }

  isSpeaking() {
    return Boolean(this.speechSynthesis && this.speechSynthesis.speaking);
  }
}

/**
 * BackgroundAudioKeepalive
 * Spielt im Hintergrund eine unhörbare stille Schleife über ein HTML5-Audio-Element ab,
 * um den Audiokontext des Browsers / Smartphones im Hintergrund (auch bei gesperrtem Bildschirm)
 * aktiv zu halten und die MediaSession-API für Sperrbildschirm-Steuerung zu aktivieren.
 */
class BackgroundAudioKeepalive {
  constructor() {
    this.audioEl = null;
    this.isActive = false;
    // 1 Sekunde stummer WAV-Stream (Base64)
    this.silentWavUri = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
    this.initAudioElement();
  }

  initAudioElement() {
    if (typeof document === 'undefined') return;
    this.audioEl = document.createElement('audio');
    this.audioEl.id = 'deutschify-bg-keepalive';
    this.audioEl.setAttribute('playsinline', '');
    this.audioEl.setAttribute('webkit-playsinline', '');
    this.audioEl.loop = true;
    this.audioEl.preload = 'auto';
    this.audioEl.src = this.silentWavUri;
    this.audioEl.volume = 0.01; // Nahezu unhörbar aber aktiv
    this.audioEl.style.display = 'none';
    document.body.appendChild(this.audioEl);
  }

  async start() {
    if (!this.audioEl) this.initAudioElement();
    if (!this.audioEl) return;

    try {
      this.isActive = true;
      await this.audioEl.play();
      this.setPlaybackState('playing');
    } catch (e) {
      console.warn('Hintergrund-Audio konnte nicht gestartet werden (Autoplay):', e);
    }
  }

  stop() {
    this.isActive = false;
    if (this.audioEl) {
      try {
        this.audioEl.pause();
      } catch (e) {}
    }
    this.setPlaybackState('none');
  }

  setMediaMetadata({ title, artist, album }) {
    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator && window.MediaMetadata) {
      try {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: title || 'Deutschify Audio-Modus',
          artist: artist || 'Deutschify • FSRS Spaced Repetition',
          album: album || 'Deutsche Kollokationen & Grammatik',
          artwork: [
            { src: '/icons/icon.svg', sizes: '192x192', type: 'image/svg+xml' },
            { src: '/icons/icon.svg', sizes: '512x512', type: 'image/svg+xml' }
          ]
        });
      } catch (e) {
        console.warn('Fehler beim Aktualisieren der MediaMetadata:', e);
      }
    }
  }

  setPlaybackState(state) {
    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
      try {
        navigator.mediaSession.playbackState = state; // 'playing' | 'paused' | 'none'
      } catch (e) {}
    }
  }

  setActionHandlers({ onPlay, onPause, onNext, onPrevious }) {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;

    const safeSetHandler = (action, handler) => {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch (e) {
        // Manche Browser unterstützen nicht alle Actions
      }
    };

    safeSetHandler('play', onPlay || null);
    safeSetHandler('pause', onPause || null);
    safeSetHandler('nexttrack', onNext || null);
    safeSetHandler('previoustrack', onPrevious || null);
  }
}

export const sounds = new SoundEffects();
export const speech = new SpeechService();
export const bgAudioKeepalive = new BackgroundAudioKeepalive();

