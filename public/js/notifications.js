// Deutschify - Wiederholungs-Benachrichtigungs-Manager
// Benachrichtigt den Nutzer genau einmal, sobald 10 Sätze zur Wiederholung bereitstehen (FSRS)
// Unterstützt System-Web-Notifications (Browser/OS), Service Worker Push & In-App Toast Fallback

import { storage } from './storage.js';
import { sounds } from './audio.js';
import { SessionScheduler } from './scheduler.js';

export const DUE_NOTIFICATION_THRESHOLD = 10;

class NotificationManager {
  constructor() {
    this.swRegistration = null;
    this.onStartSessionCallback = null;
    this.toastContainer = null;
    this.checkTimer = null;
  }

  /**
   * Initialisiert den NotificationManager mit Callbacks und DOM-Referenzen
   */
  init({ onStartSession } = {}) {
    if (onStartSession) {
      this.onStartSessionCallback = onStartSession;
    }

    this.ensureToastContainer();

    // ServiceWorker Registrierung abfangen für System-Benachrichtigungen
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        this.swRegistration = reg;
      }).catch(() => {});
    }

    // Beim Tab-Wechsel (Sichtbarkeit) automatisch fällige Sätze prüfen
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && window.app) {
        this.checkDueAndNotify(
          window.app.cachedTopics || [],
          storage.getAllSchedule()
        );
      }
    });

    // Regelmäßige Überprüfung alle 60 Sekunden (während der Tab offen ist)
    if (this.checkTimer) clearInterval(this.checkTimer);
    this.checkTimer = setInterval(() => {
      if (window.app) {
        this.checkDueAndNotify(
          window.app.cachedTopics || [],
          storage.getAllSchedule()
        );
      }
    }, 60000);
  }

  setServiceWorkerRegistration(reg) {
    this.swRegistration = reg;
  }

  isSupported() {
    return 'Notification' in window;
  }

  getPermissionStatus() {
    if (!this.isSupported()) return 'unsupported';
    return Notification.permission; // 'granted', 'denied', 'default'
  }

  /**
   * Fordert die Erlaubnis für Browser-Benachrichtigungen an
   */
  async requestPermission() {
    if (!this.isSupported()) {
      return 'unsupported';
    }

    try {
      const permission = await Notification.requestPermission();
      storage.setNotificationState({
        enabled: permission === 'granted'
      });
      return permission;
    } catch (err) {
      console.warn('Fehler bei der Benachrichtigungsanfrage:', err);
      return this.getPermissionStatus();
    }
  }

  /**
   * Prüft, ob mindestens 10 Sätze fällig sind, und benachrichtigt genau einmal!
   * @param {Array} topics
   * @param {Object} scheduleStore
   * @param {Number} now
   * @returns {Object} { triggered: boolean, dueCount: number }
   */
  checkDueAndNotify(topics, scheduleStore = {}, now = Date.now()) {
    if (!topics || topics.length === 0) {
      return { triggered: false, dueCount: 0 };
    }

    const dueCount = SessionScheduler.getTotalDueCount(topics, scheduleStore, now);
    const notifState = storage.getNotificationState();

    if (dueCount >= DUE_NOTIFICATION_THRESHOLD) {
      // Wenn für diesen Batch von >= 10 noch nicht benachrichtigt wurde:
      if (!notifState.notifiedForCurrentBatch) {
        this.triggerNotification(dueCount);

        // Latch aktivieren: Genau EINMAL für diesen Zustand benachrichtigen!
        storage.setNotificationState({
          notifiedForCurrentBatch: true,
          lastNotifiedAt: now,
          lastNotifiedCount: dueCount
        });

        return { triggered: true, dueCount };
      }
    } else {
      // Wenn der Nutzer geübt hat und fällige Sätze < 10 sind:
      // Latch zurücksetzen, damit beim nächsten Erreichen von 10 wieder 1x benachrichtigt wird
      if (notifState.notifiedForCurrentBatch) {
        storage.setNotificationState({
          notifiedForCurrentBatch: false
        });
      }
    }

    return { triggered: false, dueCount };
  }

  /**
   * Löst die Benachrichtigung aus (System-Notification + In-App Toast + Ton)
   */
  triggerNotification(dueCount) {
    const title = '⚡ 10 Wiederholungen fällig!';
    const body = `${dueCount} Sätze sind bereit zur Wiederholung nach deinem FSRS-Zeitplan. Jetzt kurz üben!`;

    // Ton abspielen
    sounds.playNotification();

    // 1. System Notification (wenn erlaubt)
    if (this.getPermissionStatus() === 'granted') {
      this.sendSystemNotification(title, body, {
        tag: 'deutschify-due-10',
        data: { action: 'start-smart' }
      });
    }

    // 2. In-App Toast anzeigen (immer sichtbar, wenn die App aktiv ist)
    this.showToast({
      title,
      message: body,
      actionText: '10 Sätze starten →',
      onAction: () => {
        if (this.onStartSessionCallback) {
          this.onStartSessionCallback();
        }
      }
    });
  }

  /**
   * Sendet eine System-Benachrichtigung über ServiceWorker oder Notification API
   */
  async sendSystemNotification(title, body, options = {}) {
    const icon = '/icons/icon.svg';
    const tag = options.tag || 'deutschify-notification';

    try {
      if (this.swRegistration && 'showNotification' in this.swRegistration) {
        await this.swRegistration.showNotification(title, {
          body,
          icon,
          badge: icon,
          tag,
          renotify: false,
          data: options.data || {}
        });
        return;
      }

      if ('Notification' in window && Notification.permission === 'granted') {
        const notif = new Notification(title, {
          body,
          icon,
          tag
        });

        notif.onclick = () => {
          window.focus();
          notif.close();
          if (this.onStartSessionCallback) {
            this.onStartSessionCallback();
          }
        };
      }
    } catch (e) {
      console.warn('System-Benachrichtigung konnte nicht gesendet werden:', e);
    }
  }

  /**
   * Ermöglicht dem Nutzer das direkte Testen der Benachrichtigung
   */
  async sendTestNotification() {
    const perm = this.getPermissionStatus();
    if (perm === 'default') {
      const result = await this.requestPermission();
      if (result !== 'granted') {
        this.showToast({
          title: 'Hinweis',
          message: 'Browser-Benachrichtigungen wurden nicht erlaubt. In-App-Hinweise funktionieren weiterhin.',
          actionText: 'OK'
        });
        return;
      }
    }

    sounds.playNotification();

    if (this.getPermissionStatus() === 'granted') {
      this.sendSystemNotification(
        '🔔 Deutschify Test-Benachrichtigung',
        'System-Benachrichtigungen funktionieren einwandfrei! Du wirst benachrichtigt, sobald 10 Sätze fällig sind.',
        { tag: 'deutschify-test' }
      );
    }

    this.showToast({
      title: '🔔 Test-Benachrichtigung gesendet',
      message: 'Sobald mindestens 10 Sätze fällig sind, erhältst du genau einmal diese Benachrichtigung.',
      actionText: 'Verstanden'
    });
  }

  /**
   * Stellt sicher, dass der Toast-Container im DOM existiert
   */
  ensureToastContainer() {
    let container = document.getElementById('toast-notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-notification-container';
      container.className = 'toast-notification-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }
    this.toastContainer = container;
  }

  /**
   * Zeigt einen eleganten In-App-Toast an
   */
  showToast({ title, message, actionText, onAction, duration = 9000 }) {
    this.ensureToastContainer();

    const toast = document.createElement('div');
    toast.className = 'app-toast';
    toast.setAttribute('role', 'alert');

    const iconSpan = document.createElement('span');
    iconSpan.className = 'toast-icon';
    iconSpan.textContent = '⚡';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'toast-content';

    const titleEl = document.createElement('strong');
    titleEl.className = 'toast-title';
    titleEl.textContent = title;

    const descEl = document.createElement('p');
    descEl.className = 'toast-desc';
    descEl.textContent = message;

    contentDiv.appendChild(titleEl);
    contentDiv.appendChild(descEl);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'toast-actions';

    if (actionText) {
      const actionBtn = document.createElement('button');
      actionBtn.type = 'button';
      actionBtn.className = 'toast-action-btn';
      actionBtn.textContent = actionText;
      actionBtn.addEventListener('click', () => {
        this.dismissToast(toast);
        if (onAction) onAction();
      });
      actionsDiv.appendChild(actionBtn);
    }

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'toast-close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Schließen');
    closeBtn.addEventListener('click', () => {
      this.dismissToast(toast);
    });
    actionsDiv.appendChild(closeBtn);

    toast.appendChild(iconSpan);
    toast.appendChild(contentDiv);
    toast.appendChild(actionsDiv);

    this.toastContainer.appendChild(toast);

    if (duration > 0) {
      setTimeout(() => {
        this.dismissToast(toast);
      }, duration);
    }
  }

  dismissToast(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.add('toast-leave');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }
}

export const notificationManager = new NotificationManager();
