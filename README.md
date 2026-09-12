# Deutschify 🇩🇪

> **Interaktive Progressive Web App (PWA) zum Meistern deutscher Kollokationen, fester Nomen-Verb-Verbindungen, Präpositionen und Redewendungen.**

Vollständig auf Deutsch verfasst, offlinefähig und bereit für die Bereitstellung über **Firebase Hosting**.

---

## ✨ Hauptfunktionen

- 🇩🇪 **100% Deutsche Benutzeroberfläche**: Alle Menüs, Lückentexte, grammatikalischen Erklärungen und Feedback-Nachrichten sind auf natürlichem Deutsch verfasst.
- 🔗 **Fokus auf Kollokationen**: Vertiefe feste Nomen-Verb-Verbindungen (z. B. *eine Entscheidung treffen*, *zur Verfügung stehen*, *in Frage kommen*), Präpositionalverben und gebräuchliche Redewendungen.
- 📝 **Interaktive Lückentext-Übungen**:
  - **Auswahlmodus (Multiple-Choice-Chips)**: Schnelles, intuitives Lernen für unterwegs mit 4 Antwortkarten (inkl. Tastaturkürzel `1`–`4`).
  - **Tippmodus (Freitext mit Umlaut-Tastatur)**: Aktives Schreiben mit Schnelltasten für deutsche Sonderzeichen (`ä`, `ö`, `ü`, `ß`).
- 🗣️ **Audio & Aussprache**:
  - Muttersprachliche deutsche Sprachausgabe (Web Speech API, `de-DE`) für jeden Beispielsatz.
  - Generative Soundeffekte (Web Audio API) für direktes akustisches Feedback – blitzschnell und ohne externe MP3-Dateien.
- 📱 **Progressive Web App (PWA)**:
  - Installierbar als native App auf iOS, Android, macOS und Windows.
  - Vollständiger Offline-Betrieb dank Service Worker Caching.
- 📊 **Fortschritt & Streaks**:
  - Tägliche Serie (Streak) mit Motivations-Animationen und Konfetti-Effekten.
  - Detaillierte Statistiken und Speicher im `localStorage`.
- 🎨 **Modernes Design**:
  - Deep-Slate-Ästhetik mit Glassmorphism-Effekten.
  - Umschaltbar zwischen **Dark Mode** und **Light Mode**.
  - Mobil-optimiert (Touch-Bedienung im Daumenbereich).

---

## 🗂️ Lernthemen im Überblick

| Thema | GER-Niveau | Beispiele |
| :--- | :---: | :--- |
| **Kollokationen (Nomen-Verb)** | B1 – C1 | *eine Entscheidung treffen*, *zur Verfügung stehen*, *in Kauf nehmen*, *Abschied nehmen* |
| **Verben mit Präpositionen** | A2 – B2 | *warten auf (+ Akk)*, *sich interessieren für (+ Akk)*, *teilnehmen an (+ Dat)*, *abhängen von (+ Dat)* |
| **Redewendungen & Sprichwörter** | B1 – C2 | *die Daumen drücken*, *zwei Fliegen mit einer Klappe schlagen*, *reinen Wein einschenken* |
| **Adjektive mit Präpositionen** | B1 – B2 | *stolz auf (+ Akk)*, *zufrieden mit (+ Dat)*, *angewiesen auf (+ Akk)* |

---

## 🚀 Schnellstart & Lokale Entwicklung

Deutschify setzt auf moderne Webstandards (HTML5, Vanilla CSS3, native ES-Module) und benötigt keinen komplexen Build-Schritt.

### 1. Repository klonen
```bash
git clone https://github.com/bogdangi/Deutschify.git
cd Deutschify
```

### 2. Lokalen Server starten

Da die Anwendung ES-Module und Service Worker verwendet, sollte sie über einen lokalen HTTP-Server aufgerufen werden:

**Option A: Mit Python 3**
```bash
python3 -m http.server 8080 --directory public
```

**Option B: Mit Node.js (npx serve)**
```bash
npx serve public
```

**Option C: Mit Firebase Emulator**
```bash
firebase emulators:start --only hosting
```

Öffne anschließend [http://localhost:8080](http://localhost:8080) in deinem Webbrowser.

---

## 📁 Projektstruktur

```text
Deutschify/
├── public/                 # Alle produktiven Anwendungsdateien (Firebase Root)
│   ├── index.html          # Semantisches HTML-Hauptdokument
│   ├── manifest.json       # PWA-Manifest (Icons, Name, Standalone-Modus)
│   ├── sw.js               # Service Worker für Offline-Caching
│   ├── css/
│   │   └── style.css       # Design-System, Theme-Variablen & Animationen
│   ├── icons/
│   │   └── icon.svg        # Vektorbasiertes App-Icon
│   └── js/
│       ├── app.js          # Haupt-Controller & Benutzeroberflächenlogik
│       ├── storage.js      # LocalStorage-Verwaltung für Lernstand & Serie
│       ├── audio.js        # Soundeffekte & deutsche Sprachausgabe
│       └── data/
│           └── topics.js   # Themendatensätze & Lückentext-Aufgaben
├── docs/                   # Erweiterte Dokumentation
│   ├── ARCHITECTURE.md     # Technische Architektur & Datenfluss
│   └── CONTENT_GUIDE.md    # Anleitung zum Hinzufügen neuer Übungen & Themen
├── firebase.json           # Firebase Hosting Konfiguration
├── .firebaserc             # Firebase Projektzuordnung
└── README.md               # Diese Dokumentation
```

---

## 🔥 Bereitstellung auf Firebase Hosting

Die Anwendung ist standardmäßig für **Firebase Hosting** eingerichtet (`public: "public"` in `firebase.json`).

### 1. Firebase CLI installieren & einloggen
```bash
npm install -g firebase-tools
firebase login
```

### 2. Projekt verknüpfen (falls noch nicht geschehen)
```bash
firebase use <deine-projekt-id>
```

### 3. Auf Firebase veröffentlichen
```bash
firebase deploy --only hosting
```

Deine App ist sofort unter `https://<deine-projekt-id>.web.app` weltweit erreichbar.

---

## ⌨️ Tastatur-Bedienung (Shortcuts)

Für schnelles und barrierefreies Lernen auf dem Desktop:

- `1`, `2`, `3`, `4`: Antwortoption 1 bis 4 auswählen (im Auswahlmodus)
- `Enter ↵`: Antwort überprüfen bzw. zur nächsten Übung springen
- `Tab`: Durch Elemente navigieren

---

## 📚 Weitere Dokumentation

- 📖 [Content-Leitfaden (docs/CONTENT_GUIDE.md)](file:///Users/bogdan/Work/github.com/bogdangi/Deutschify/docs/CONTENT_GUIDE.md): Wie erstelle und erweitere ich Übungen und Kollokationen?
- 🏛️ [Architektur-Dokumentation (docs/ARCHITECTURE.md)](file:///Users/bogdan/Work/github.com/bogdangi/Deutschify/docs/ARCHITECTURE.md): Detaillierter Überblick über Datenfluss, Audio-Synthese und Caching.

---

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.
