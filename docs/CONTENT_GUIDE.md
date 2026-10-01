# Leitfaden zur Erstellung von Lerninhalten (Content Guide)

Dieser Leitfaden erklärt, wie neue Themen, Kollokationen, Nomen-Verb-Verbindungen und Lückentext-Übungen zu **Deutschify** hinzugefügt und gepflegt werden können.

---

## 📁 Trennung von Code und Daten (Data Architecture)

Die Lerndaten sind vollständig vom Anwendungscode getrennt und liegen als reine JSON-Dateien im Verzeichnis `public/data/`:

```text
public/data/
├── topics.json                  <-- Manifest aller Themen (Metadaten & Index)
└── topics/                      <-- Modulare Themen-Dateien
    ├── kollokationen.json       <-- Nomen-Verb-Verbindungen (105 Sätze)
    ├── praepositionen.json      <-- Verben mit Präpositionen (168 Sätze)
    ├── nomen-praepositionen.json<-- Nomen mit Präpositionen (157 Sätze)
    ├── redewendungen.json       <-- Redewendungen (12 Sätze)
    ├── adjektive.json           <-- Adjektive mit Präpositionen (69 Sätze)
    └── konjunktionen.json       <-- Konnektoren (32 Sätze)
```

Der Code (`public/js/`) greift ausschließlich über den Service **`TopicRepository`** (`public/js/data/TopicRepository.js`) auf die Daten zu.

---

## 🏗️ 1. Themen-Manifest (`public/data/topics.json`)

Jedes Thema wird im zentralen Manifest registriert:

```json
[
  {
    "id": "kollokationen",
    "title": "Kollokationen (Nomen-Verb)",
    "shortDescription": "Feste Nomen-Verb-Verbindungen für authentisches Deutsch (B1–C1)",
    "icon": "🔗",
    "level": "B1 – C1",
    "color": "#10b981",
    "totalExercises": 105,
    "file": "topics/kollokationen.json"
  }
]
```

---

## ✍️ 2. Struktur einer Themen-Datei (`public/data/topics/<id>.json`)

Jede Datei enthält die Metadaten des Themas und das Array aller Übungen:

```json
{
  "id": "kollokationen",
  "title": "Kollokationen (Nomen-Verb)",
  "shortDescription": "Feste Nomen-Verb-Verbindungen für authentisches Deutsch (B1–C1)",
  "icon": "🔗",
  "level": "B1 – C1",
  "color": "#10b981",
  "totalExercises": 105,
  "exercises": [
    {
      "id": "kol-13",
      "prefix": "Vor Beginn der Verhandlung müssen wir klare Bedingungen",
      "gapPlaceholder": "Verb",
      "suffix": ".",
      "correctAnswer": "festlegen",
      "acceptableAnswers": ["festlegen"],
      "options": ["festlegen", "erfinden", "behalten", "erwarten"],
      "collocation": "Bedingungen festlegen",
      "meaning": "Kriterien oder Voraussetzungen verbindlich definieren",
      "example": "Die Vertragspartner haben gemeinsam strenge Bedingungen festgelegt.",
      "tip": "Verbindung mit dem trennbaren Verb 'festlegen' (Infinitiv)."
    }
  ]
}
```

### Feldbeschreibungen im Detail:

| Feld | Typ | Beschreibung |
| :--- | :--- | :--- |
| `id` | `String` | Eindeutiger Bezeichner innerhalb der gesamten App (wird für FSRS Spaced Repetition und Fortschrittsspeicherung verwendet). |
| `prefix` | `String` | Textteil des Satzes **vor** der Lücke. |
| `gapPlaceholder` | `String` | Platzhaltertext in der leeren Lücke (z. B. `Nomen`, `Verb`, `Präposition`, `Adjektiv`). |
| `suffix` | `String` | Textteil des Satzes **nach** der Lücke (inkl. Satzzeichen am Ende). |
| `correctAnswer` | `String` | Die kanonische richtige Lösung. |
| `acceptableAnswers` | `Array<String>` | Akzeptierte Schreibweisen (z. B. `["für", "fuer"]`). Die Eingabeprüfung erfolgt automatisch *case-insensitive*. |
| `options` | `Array<String>` | Mindestens 2 (empfohlen 4) Auswahloptionen für den **Auswahlmodus**. Eine davon **muss** die richtige Lösung sein; die restlichen Optionen sind plausible Distraktoren. |
| `collocation` | `String` | Die vollständige deutsche Nomen-Verb-Verbindung bzw. Kollokation. |
| `meaning` | `String` | Kurze, verständliche Erklärung der Bedeutung auf Deutsch. |
| `example` | `String` | Ein vollständiger, authentischer deutscher Beispielsatz. |
| `tip` | `String` | Grammatik-Hinweis für den „💡 Tipp“-Button (z. B. Kasusforderung, Rektion, Wortart). |

---

## 🛡️ 3. Automatische Datenvalidierung

Vor jedem Commit oder Release können alle Daten per Befehl gegen das Schema und auf referenzielle Integrität (eindeutige IDs, korrekte Optionen, Dateiverknüpfungen) geprüft werden:

```bash
npm run validate:data
```

Oder alle Tests zusammen ausführen:
```bash
npm test
```

---

## 🎯 Best Practices für gute Übungen

1. **Kontextorientierte Sätze**:
   Der Beispielsatz sollte genügend Kontext liefern, damit die Wahl der Kollokation natürlich und eindeutig ist.
2. **Plausible Distraktoren**:
   Wähle Distraktoren aus derselben Wortart und grammatikalischen Form (z. B. 4 Verben im Infinitiv oder 4 feminine Substantive im Akkusativ).
3. **Kasus-Angaben bei Präpositionen**:
   Bei Präpositionalverben empfiehlt es sich, im `tip`- oder `collocation`-Feld den geforderten Kasus explizit anzugeben (z. B. `warten auf (+ Akkusativ)`).
4. **Vollständigkeit bei Umlauten**:
   Trage in `acceptableAnswers` alternative Transkriptionen ein (z. B. `["drücken", "druecken"]`), damit Nutzer auch ohne deutsches Tastaturlayout erfolgreich tippen können.
