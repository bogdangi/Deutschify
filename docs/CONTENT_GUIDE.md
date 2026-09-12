# Leitfaden zur Erstellung von Lerninhalten (Content Guide)

Dieser Leitfaden erklärt, wie neue Themen, Kollokationen, Nomen-Verb-Verbindungen und Lückentext-Übungen zu **Deutschify** hinzugefügt werden können.

---

## 📁 Speicherort der Daten

Alle Lerndaten liegen als ES-Modul in folgender Datei:
```text
public/js/data/topics.js
```

---

## 🏗️ Struktur eines Themas (`Topic`)

Jedes Thema ist ein Objekt im Array `TOPICS` mit folgenden Pflichtfeldern:

```javascript
{
  id: "themen_id",             // Eindeutige Kennung (lowercase, kebab-case)
  title: "Titel des Themas",   // Deutscher Titel für Menü und Anzeige
  shortDescription: "Kurze Beschreibung des Lernziels",
  icon: "🔗",                  // Emoji oder Symbol für die Themenkarte
  level: "B1 – C1",            // Zielniveau nach GER (A1, A2, B1, B2, C1, C2)
  color: "#10b981",            // Akzentfarbe für Fortschrittsbalken und Kartenränder
  exercises: [ /* Array von Übungen */ ]
}
```

---

## ✍️ Struktur einer Lückentext-Aufgabe (`Exercise`)

Jede Übung innerhalb eines Themas folgt diesem Schema:

```javascript
{
  id: "kol-13",
  prefix: "Vor Beginn der Verhandlung müssen wir klare Bedingungen",
  gapPlaceholder: "Verb",
  suffix: ".",
  correctAnswer: "festlegen",
  acceptableAnswers: ["festlegen"],
  options: ["festlegen", "erfinden", "behalten", "erwarten"],
  collocation: "Bedingungen festlegen",
  meaning: "Kriterien oder Voraussetzungen verbindlich definieren",
  example: "Die Vertragspartner haben gemeinsam strenge Bedingungen festgelegt.",
  tip: "Verbindung mit dem trennbaren Verb 'festlegen' (Infinitiv)."
}
```

### Feldbeschreibungen im Detail:

| Feld | Typ | Beschreibung |
| :--- | :--- | :--- |
| `id` | `String` | Eindeutiger Bezeichner innerhalb der App (wird für den Lernfortschritt gespeichert). |
| `prefix` | `String` | Textteil des Satzes **vor** der Lücke. |
| `gapPlaceholder` | `String` | Platzhaltertext in der leeren Lücke (z. B. `Nomen`, `Verb`, `Präposition`, `Adjektiv`). |
| `suffix` | `String` | Textteil des Satzes **nach** der Lücke (inkl. Satzzeichen am Ende). |
| `correctAnswer` | `String` | Die kanonische richtige Lösung. |
| `acceptableAnswers` | `Array<String>` | Akzeptierte Schreibweisen (z. B. mit/ohne Umlautersetzung wie `["für", "fuer"]`). Die Eingabeprüfung erfolgt automatisch *case-insensitive*. |
| `options` | `Array<String>` | Genau 4 Auswahloptionen für den **Auswahlmodus**. Eine davon **muss** die richtige Lösung sein; die anderen drei sollten plausible Distraktoren sein. |
| `collocation` | `String` | Die vollständige deutsche Nomen-Verb-Verbindung bzw. Kollokation. |
| `meaning` | `String` | Kurze, verständliche Erklärung der Bedeutung auf Deutsch. |
| `example` | `String` | Ein vollständiger, authentischer deutscher Beispielsatz. |
| `tip` | `String` | Grammatik-Hinweis für den „💡 Tipp“-Button (z. B. Kasusforderung, Rektion, Wortart). |

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
