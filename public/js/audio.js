// Deutschify - Audio & Sprachausgabe Modul
// Web Audio API für Sound-Effekte + Web Speech API für deutsches Vorlesen

class SoundEffects {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
  }

  _initContext() {
    if (!this.audioCtx) {
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

  setSoundEnabled(enabled) {
    this.soundEnabled = Boolean(enabled);
  }
}

class SpeechService {
  constructor() {
    this.speechSynthesis = window.speechSynthesis || null;
    this.germanVoice = null;
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

  speak(text) {
    if (!this.speechSynthesis) {
      console.info('Sprachsynthese im Browser nicht unterstützt.');
      return;
    }

    try {
      this.speechSynthesis.cancel(); // Vorherige Sprachausgabe stoppen
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.92; // Leicht verlangsamt für klares Sprachverständnis
      utterance.pitch = 1.0;

      if (this.germanVoice) {
        utterance.voice = this.germanVoice;
      }

      this.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Fehler bei Sprachausgabe:', e);
    }
  }

  stop() {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
  }
}

export const sounds = new SoundEffects();
export const speech = new SpeechService();
