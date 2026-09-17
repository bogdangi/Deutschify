// Deutschify - Deutsche Lückentext-Lerninhalte
// Themen: Kollokationen, Präpositionen, Redewendungen, Adjektive

export const TOPICS = [
  {
    id: "kollokationen",
    title: "Kollokationen (Nomen-Verb)",
    shortDescription: "Feste Nomen-Verb-Verbindungen für authentisches Deutsch (B1–C1)",
    icon: "🔗",
    level: "B1 – C1",
    color: "#10b981",
    exercises: [
      {
        id: "kol-1",
        prefix: "Nach langer Beratung mussten die Direktoren endlich eine wichtige",
        gapPlaceholder: "Nomen",
        suffix: "treffen.",
        correctAnswer: "Entscheidung",
        acceptableAnswers: ["Entscheidung", "entscheidung"],
        options: ["Entscheidung", "Erlaubnis", "Meinung", "Hoffnung"],
        collocation: "eine Entscheidung treffen",
        meaning: "etwas verbindlich beschließen / sich entscheiden",
        example: "Wir haben uns Zeit gelassen, um die richtige Entscheidung zu treffen.",
        tip: "Verbindung aus 'treffen' + feminines Substantiv (die ...)."
      },
      {
        id: "kol-2",
        prefix: "Ein Wechsel der Arbeitsstelle kommt für mich derzeit überhaupt nicht in",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Frage",
        acceptableAnswers: ["Frage", "frage"],
        options: ["Frage", "Sicht", "Antwort", "Gedanken"],
        collocation: "in Frage kommen",
        meaning: "möglich sein / denkbar sein / in Betracht kommen",
        example: "Eine Preiserhöhung kommt aktuell nicht in Frage.",
        tip: "Bedeutet: Das ist völlig ausgeschlossen oder unmöglich."
      },
      {
        id: "kol-3",
        prefix: "Für weitere Rückfragen stehe ich Ihnen jederzeit gerne zur",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Verfügung",
        acceptableAnswers: ["Verfügung", "verfügung"],
        options: ["Verfügung", "Bereitschaft", "Auskunft", "Möglichkeit"],
        collocation: "zur Verfügung stehen",
        meaning: "verfügbar sein / bereitstehen / genutzt werden können",
        example: "Das Konferenzzimmer steht den ganzen Nachmittag zur Verfügung.",
        tip: "Klassische Formulierung in deutschen Geschäftsbriefen."
      },
      {
        id: "kol-4",
        prefix: "Am Bahnhof mussten wir schweren Herzens von unseren Freunden Abschied",
        gapPlaceholder: "Verb",
        suffix: ".",
        correctAnswer: "nehmen",
        acceptableAnswers: ["nehmen"],
        options: ["nehmen", "geben", "machen", "halten"],
        collocation: "Abschied nehmen",
        meaning: "sich von jemandem oder etwas verabschieden",
        example: "Es fiel allen schwer, nach dem Auslandsjahr Abschied zu nehmen.",
        tip: "Kollokation mit dem Verb 'nehmen' im Infinitiv."
      },
      {
        id: "kol-5",
        prefix: "Kannst du mir bitte bis morgen",
        gapPlaceholder: "Nomen",
        suffix: "geben, ob du zur Feier kommst?",
        correctAnswer: "Bescheid",
        acceptableAnswers: ["Bescheid", "bescheid"],
        options: ["Bescheid", "Bericht", "Nachricht", "Hinweis"],
        collocation: "Bescheid geben / sagen",
        meaning: "jemanden zeitnah informieren oder benachrichtigen",
        example: "Ich gebe dir Bescheid, sobald ich die Ergebnisse kenne.",
        tip: "Feste Verbindung mit 'geben' (maskulin: der Bescheid)."
      },
      {
        id: "kol-6",
        prefix: "Beim Autofahren in der Stadt muss man besonders auf Fußgänger Rücksicht",
        gapPlaceholder: "Verb",
        suffix: ".",
        correctAnswer: "nehmen",
        acceptableAnswers: ["nehmen"],
        options: ["nehmen", "haben", "leisten", "bringen"],
        collocation: "Rücksicht nehmen auf (+ Akk)",
        meaning: "die Bedürfnisse oder Sicherheit anderer beachten und respektieren",
        example: "Bitte nehmen Sie Rücksicht auf die schlafenden Kinder.",
        tip: "Verbindet sich stets mit der Präposition 'auf' und dem Verb 'nehmen'."
      },
      {
        id: "kol-7",
        prefix: "Wer ein eigenes Unternehmen gründet, muss auch das finanzielle Risiko in Kauf",
        gapPlaceholder: "Verb",
        suffix: ".",
        correctAnswer: "nehmen",
        acceptableAnswers: ["nehmen"],
        options: ["nehmen", "setzen", "stellen", "legen"],
        collocation: "in Kauf nehmen",
        meaning: "Nachteile oder Gefahren bewusst akzeptieren",
        example: "Für einen kurzen Arbeitsweg nehme ich eine höhere Miete in Kauf.",
        tip: "Typische Redewendung/Kollokation für das Akzeptieren von Kompromissen."
      },
      {
        id: "kol-8",
        prefix: "Für dieses anspruchsvolle Großprojekt muss die Projektleiterin die volle Verantwortung",
        gapPlaceholder: "Verb",
        suffix: ".",
        correctAnswer: "übernehmen",
        acceptableAnswers: ["übernehmen", "uebernehmen"],
        options: ["übernehmen", "übergeben", "festhalten", "auftragen"],
        collocation: "Verantwortung übernehmen",
        meaning: "für eine Aufgabe oder die Folgen geradestehen",
        example: "Er weigert sich nicht, für den entstandenen Fehler die Verantwortung zu übernehmen.",
        tip: "Verb mit untrennbarem Präfix 'über-'."
      },
      {
        id: "kol-9",
        prefix: "Wir sollten bei der Urlaubsplanung auch die Reisezeit in Betracht",
        gapPlaceholder: "Verb",
        suffix: ".",
        correctAnswer: "ziehen",
        acceptableAnswers: ["ziehen"],
        options: ["ziehen", "stellen", "werfen", "halten"],
        collocation: "in Betracht ziehen",
        meaning: "etwas gründlich überlegen, erwägen oder einplanen",
        example: "Hast du schon in Betracht gezogen, mit der Bahn zu reisen?",
        tip: "Feste Verbindung: 'in Betracht' + 'ziehen'."
      },
      {
        id: "kol-10",
        prefix: "Der junge Pianist hat mit seinem Konzert sein außergewöhnliches Talent unter Beweis",
        gapPlaceholder: "Partizip II",
        suffix: ".",
        correctAnswer: "gestellt",
        acceptableAnswers: ["gestellt"],
        options: ["gestellt", "gelegt", "gebracht", "gesetzt"],
        collocation: "unter Beweis stellen",
        meaning: "etwas eindeutig beweisen oder demonstrieren",
        example: "Sie hat ihre fachliche Kompetenz im Vorstellungsgespräch unter Beweis gestellt.",
        tip: "Partizip II von 'stellen'."
      },
      {
        id: "kol-11",
        prefix: "In der Debatte übte die Opposition heftige",
        gapPlaceholder: "Nomen",
        suffix: "an den Regierungsplänen.",
        correctAnswer: "Kritik",
        acceptableAnswers: ["Kritik", "kritik"],
        options: ["Kritik", "Vorwurf", "Meinung", "Sorge"],
        collocation: "Kritik üben an (+ Dat)",
        meaning: "jemanden oder etwas sachlich oder deutlich kritisieren",
        example: "Der Journalist übte scharfe Kritik an den neuen Gesetzesentwürfen.",
        tip: "Verbindet sich mit 'üben' + femininem Substantiv (die Kritik)."
      },
      {
        id: "kol-12",
        prefix: "Um das Visum zu erhalten, müssen Sie bei der Botschaft einen offiziellen Antrag",
        gapPlaceholder: "Verb",
        suffix: ".",
        correctAnswer: "stellen",
        acceptableAnswers: ["stellen"],
        options: ["stellen", "legen", "schreiben", "fordern"],
        collocation: "einen Antrag stellen",
        meaning: "offiziell etwas beantragen (z. B. Beihilfe, Visum, Bürgergeld)",
        example: "Wir haben den Antrag auf Baugenehmigung rechtzeitig gestellt.",
        tip: "Verbindung mit dem Verb 'stellen'."
      },
      {
        id: "kol-13",
        prefix: "Bei dieser wichtigen Verhandlung wird Geld nur eine untergeordnete",
        gapPlaceholder: "Nomen",
        suffix: "spielen.",
        correctAnswer: "Rolle",
        acceptableAnswers: ["Rolle", "rolle"],
        options: ["Rolle", "Sache", "Bedeutung", "Wirkung"],
        collocation: "eine Rolle spielen",
        meaning: "von Bedeutung oder Wichtigkeit sein",
        example: "Erfahrung spielt bei der Stellenbesetzung eine entscheidende Rolle.",
        tip: "Feminines Nomen (die Rolle) mit dem Verb 'spielen'."
      },
      {
        id: "kol-14",
        prefix: "Wir sollten alle vorgeschlagenen Optionen sorgfältig in Betracht",
        gapPlaceholder: "Verb",
        suffix: ", bevor wir eine Wahl treffen.",
        correctAnswer: "ziehen",
        acceptableAnswers: ["ziehen"],
        options: ["ziehen", "nehmen", "stellen", "legen"],
        collocation: "in Betracht ziehen",
        meaning: "etwas erwägen oder als Möglichkeit berücksichtigen",
        example: "Haben Sie alle Alternativen in Betracht gezogen?",
        tip: "Kollokation mit dem Infinitiv 'ziehen'."
      },
      {
        id: "kol-15",
        prefix: "Der avantgardistische Entwurf des Architekten wird international großes Aufsehen",
        gapPlaceholder: "Verb",
        suffix: ".",
        correctAnswer: "erregen",
        acceptableAnswers: ["erregen"],
        options: ["erregen", "machen", "wecken", "bringen"],
        collocation: "Aufsehen erregen",
        meaning: "starke öffentliche Aufmerksamkeit oder Bewunderung hervorrufen",
        example: "Die wissenschaftliche Entdeckung erregte weltweit großes Aufsehen.",
        tip: "Feste gehobene Verbindung mit dem Verb 'erregen'."
      },
      {
        id: "kol-16",
        prefix: "Die beiden Partner konnten nach zähen Verhandlungen eine faire",
        gapPlaceholder: "Nomen",
        suffix: "treffen.",
        correctAnswer: "Vereinbarung",
        acceptableAnswers: ["Vereinbarung", "vereinbarung"],
        options: ["Vereinbarung", "Erlaubnis", "Diskussion", "Gewohnheit"],
        collocation: "eine Vereinbarung treffen",
        meaning: "sich vertraglich oder mündlich auf etwas einigen",
        example: "Die Minister trafen eine zukunftsweisende Vereinbarung zum Klimaschutz.",
        tip: "Kollokation mit 'treffen' + feminines Substantiv (die Vereinbarung)."
      },
      {
        id: "kol-17",
        prefix: "Vor komplizierten Verträgen sollte man sich in",
        gapPlaceholder: "Nomen",
        suffix: "nehmen.",
        correctAnswer: "Acht",
        acceptableAnswers: ["Acht", "acht"],
        options: ["Acht", "Anspruch", "Angriff", "Auswahl"],
        collocation: "sich in Acht nehmen vor",
        meaning: "aufpassen, vorsichtig sein",
        example:
          "Vor unbekannten Angeboten sollte man sich in Acht nehmen.",
        tip: "Feste Verbindung: sich in Acht nehmen vor + Dativ."
      },

      {
        id: "kol-18",
        prefix: "Es ist wichtig, auch der Konkurrenz",
        gapPlaceholder: "Nomen",
        suffix: "entgegenzubringen.",
        correctAnswer: "Achtung",
        acceptableAnswers: ["Achtung", "achtung"],
        options: ["Achtung", "Angst", "Kritik", "Hoffnung"],
        collocation: "jdm. Achtung entgegenbringen",
        meaning: "jemanden achten und respektieren",
        example:
          "Auch gegenüber seinen Konkurrenten sollte man Achtung entgegenbringen.",
        tip: "Feste Verbindung: jemandem Achtung entgegenbringen + Dativ."
      },

      {
        id: "kol-19",
        prefix: "Ich habe die",
        gapPlaceholder: "Nomen",
        suffix: ", Karriere zu machen.",
        correctAnswer: "Absicht",
        acceptableAnswers: ["Absicht", "absicht"],
        options: ["Absicht", "Auffassung", "Auswahl", "Anforderung"],
        collocation: "die Absicht haben, etwas zu tun",
        meaning: "etwas beabsichtigen",
        example:
          "Sie hat die Absicht, nach Berlin umzuziehen.",
        tip: "Typische Struktur: die Absicht haben, etwas zu tun."
      },

      {
        id: "kol-20",
        prefix: "Alle Mitarbeitenden können jederzeit eine",
        gapPlaceholder: "Nomen",
        suffix: "an ihrem Passwort vornehmen.",
        correctAnswer: "Änderung",
        acceptableAnswers: ["Änderung", "änderung"],
        options: ["Änderung", "Anforderung", "Anfrage", "Auswahl"],
        collocation: "eine Änderung vornehmen",
        meaning: "etwas ändern",
        example:
          "Sie können jederzeit eine Änderung Ihrer persönlichen Daten vornehmen.",
        tip: "Feste Verbindung: eine Änderung vornehmen."
      },

      {
        id: "kol-21",
        prefix: "Die Leistungen des Konzerns finden weltweit",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Anerkennung",
        acceptableAnswers: ["Anerkennung", "anerkennung"],
        options: ["Anerkennung", "Anwendung", "Aufmerksamkeit", "Auswahl"],
        collocation: "Anerkennung finden",
        meaning: "anerkannt oder positiv bewertet werden",
        example:
          "Seine wissenschaftlichen Leistungen finden international Anerkennung.",
        tip: "Feste Verbindung: Anerkennung finden."
      },

      {
        id: "kol-22",
        prefix: "Sarina erfüllt alle",
        gapPlaceholder: "Nomen",
        suffix: "in der Stellenausschreibung.",
        correctAnswer: "Anforderungen",
        acceptableAnswers: ["Anforderungen", "anforderungen"],
        options: ["Anforderungen", "Angelegenheiten", "Angebote", "Auswirkungen"],
        collocation: "eine Anforderung erfüllen",
        meaning: "einer geforderten Bedingung entsprechen; genügen",
        example:
          "Der Bewerber erfüllt alle Anforderungen der ausgeschriebenen Stelle.",
        tip: "Plural: die Anforderungen. Man erfüllt Anforderungen."
      },

      {
        id: "kol-23",
        prefix: "Für die Renovierungsarbeiten haben wir bereits eine",
        gapPlaceholder: "Nomen",
        suffix: "an einen Handwerksbetrieb gestellt.",
        correctAnswer: "Anfrage",
        acceptableAnswers: ["Anfrage", "anfrage"],
        options: ["Anfrage", "Anforderung", "Absicht", "Änderung"],
        collocation: "eine Anfrage stellen an",
        meaning: "jemanden nach Informationen oder einem Angebot fragen",
        example:
          "Wir haben eine Anfrage an mehrere Handwerksbetriebe gestellt.",
        tip: "Feste Verbindung: eine Anfrage stellen an + Akkusativ."
      },

      {
        id: "kol-24",
        prefix: "Die Firma hat mir ein tolles",
        gapPlaceholder: "Nomen",
        suffix: "gemacht.",
        correctAnswer: "Angebot",
        acceptableAnswers: ["Angebot", "angebot"],
        options: ["Angebot", "Anliegen", "Antrag", "Auftrag"],
        collocation: "ein Angebot machen / unterbreiten",
        meaning: "etwas anbieten",
        example:
          "Die Firma hat mir ein attraktives Angebot unterbreitet.",
        tip: "Beide Formen sind üblich: ein Angebot machen / ein Angebot unterbreiten."
      },

      {
        id: "kol-25",
        prefix: "Ich werde die Bestellung des Kunden gleich in",
        gapPlaceholder: "Nomen",
        suffix: "nehmen.",
        correctAnswer: "Angriff",
        acceptableAnswers: ["Angriff", "angriff"],
        options: ["Angriff", "Anspruch", "Anwendung", "Ausdruck"],
        collocation: "etwas in Angriff nehmen",
        meaning: "mit etwas beginnen und sich darum kümmern",
        example:
          "Nach der Pause werden wir die nächsten Aufgaben in Angriff nehmen.",
        tip: "Feste Verbindung: etwas in Angriff nehmen."
      },

      {
        id: "kol-26",
        prefix: "Der Gedanke an meinen ersten Arbeitstag macht mir",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Angst",
        acceptableAnswers: ["Angst", "angst"],
        options: ["Angst", "Achtung", "Hoffnung", "Freude"],
        collocation: "Angst machen",
        meaning: "jemanden ängstigen oder jemanden beunruhigen",
        example:
          "Die unsichere finanzielle Situation macht vielen Menschen Angst.",
        tip: "Typische Struktur: etwas macht jemandem Angst."
      },

      {
        id: "kol-27",
        prefix: "Es ist mir ein großes",
        gapPlaceholder: "Nomen",
        suffix: ", dass die Sache schnell geklärt wird.",
        correctAnswer: "Anliegen",
        acceptableAnswers: ["Anliegen", "anliegen"],
        options: ["Anliegen", "Angebot", "Antrag", "Auftrag"],
        collocation: "ein Anliegen sein",
        meaning: "wichtig sein; einem wichtig sein",
        example:
          "Es ist mir ein großes Anliegen, Ihnen persönlich zu helfen.",
        tip: "Typische Struktur: Es ist mir ein Anliegen, dass ..."
      },

      {
        id: "kol-28",
        prefix: "Sie haben",
        gapPlaceholder: "Nomen",
        suffix: "auf mindestens 20 Tage Urlaub pro Jahr.",
        correctAnswer: "Anspruch",
        acceptableAnswers: ["Anspruch", "anspruch"],
        options: ["Anspruch", "Antrag", "Anteil", "Auftrag"],
        collocation: "einen Anspruch haben auf",
        meaning: "das Recht auf etwas haben",
        example:
          "Arbeitnehmer haben Anspruch auf bezahlten Urlaub.",
        tip: "Anspruch auf + Akkusativ."
      },

      {
        id: "kol-29",
        prefix: "Wir sollten die Fördermöglichkeiten durch den Staat stärker in",
        gapPlaceholder: "Nomen",
        suffix: "nehmen.",
        correctAnswer: "Anspruch",
        acceptableAnswers: ["Anspruch", "anspruch"],
        options: ["Anspruch", "Angriff", "Anwendung", "Ausdruck"],
        collocation: "etwas in Anspruch nehmen",
        meaning: "etwas benutzen oder beanspruchen",
        example:
          "Viele Familien nehmen staatliche Unterstützung in Anspruch.",
        tip: "Nicht mit 'Anspruch haben auf' verwechseln: etwas in Anspruch nehmen = etwas nutzen."
      },

      {
        id: "kol-30",
        prefix: "Martina hat einen",
        gapPlaceholder: "Nomen",
        suffix: "auf einen Gründungszuschuss gestellt.",
        correctAnswer: "Antrag",
        acceptableAnswers: ["Antrag", "antrag"],
        options: ["Antrag", "Anspruch", "Auftrag", "Angebot"],
        collocation: "einen Antrag stellen auf",
        meaning: "etwas offiziell beantragen",
        example:
          "Er hat einen Antrag auf finanzielle Unterstützung gestellt.",
        tip: "Antrag auf + Akkusativ."
      },

      {
        id: "kol-31",
        prefix: "Die Ergebnisse aus den Besprechungen kommen oft nicht zur",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Anwendung",
        acceptableAnswers: ["Anwendung", "anwendung"],
        options: ["Anwendung", "Anerkennung", "Auswahl", "Auffassung"],
        collocation: "zur Anwendung kommen",
        meaning: "angewendet werden",
        example:
          "Diese Regel kommt in der Praxis nur selten zur Anwendung.",
        tip: "Feste Verbindung: zur Anwendung kommen = angewendet werden."
      },

      {
        id: "kol-32",
        prefix: "Die Adressliste wartet auf mich, ich muss wieder an die",
        gapPlaceholder: "Nomen",
        suffix: "gehen.",
        correctAnswer: "Arbeit",
        acceptableAnswers: ["Arbeit", "arbeit"],
        options: ["Arbeit", "Anwendung", "Auswahl", "Anfrage"],
        collocation: "an die Arbeit gehen",
        meaning: "anfangen zu arbeiten",
        example:
          "Die Pause ist vorbei, jetzt müssen wir wieder an die Arbeit gehen.",
        tip: "Feste Verbindung: an die Arbeit gehen."
      },

      {
        id: "kol-33",
        prefix: "Wir haben einen neuen großen Kunden gewonnen. Ihr habt sehr gute",
        gapPlaceholder: "Nomen",
        suffix: "geleistet.",
        correctAnswer: "Arbeit",
        acceptableAnswers: ["Arbeit", "arbeit"],
        options: ["Arbeit", "Anwendung", "Anerkennung", "Aufmerksamkeit"],
        collocation: "gute Arbeit leisten",
        meaning: "etwas gut machen",
        example:
          "Das Team hat bei diesem Projekt hervorragende Arbeit geleistet.",
        tip: "Typische Verbindung: gute / hervorragende Arbeit leisten."
      },

      {
        id: "kol-34",
        prefix: "Die Pflege unserer Kunden macht viel",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Arbeit",
        acceptableAnswers: ["Arbeit", "arbeit"],
        options: ["Arbeit", "Angst", "Aufmerksamkeit", "Anerkennung"],
        collocation: "Arbeit machen",
        meaning: "mühsam oder aufwendig sein",
        example:
          "Die Pflege eines großen Gartens macht viel Arbeit.",
        tip: "Etwas macht Arbeit = etwas ist mühsam oder aufwendig."
      },

      {
        id: "kol-35",
        prefix: "Komm, die Pause ist vorbei! Machen wir uns wieder an die",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Arbeit",
        acceptableAnswers: ["Arbeit", "arbeit"],
        options: ["Arbeit", "Anwendung", "Auswahl", "Aufmerksamkeit"],
        collocation: "sich an die Arbeit machen",
        meaning: "mit der Arbeit beginnen",
        example:
          "Nach dem Frühstück machte ich mich sofort an die Arbeit.",
        tip: "Reflexive Verbindung: sich an die Arbeit machen."
      },

      {
        id: "kol-36",
        prefix: "Wo ist das Angebot für die Firma Klaxon? – Das ist in",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Arbeit",
        acceptableAnswers: ["Arbeit", "arbeit"],
        options: ["Arbeit", "Anspruch", "Anwendung", "Auswahl"],
        collocation: "in Arbeit sein",
        meaning: "im Moment bearbeitet werden",
        example:
          "Der neue Vertrag ist bereits in Arbeit.",
        tip: "in Arbeit sein = gerade bearbeitet oder erstellt werden."
      },

      {
        id: "kol-37",
        prefix: "Ich bin zu der",
        gapPlaceholder: "Nomen",
        suffix: "gelangt, dass wir der Kundin eine Entschädigung anbieten sollten.",
        correctAnswer: "Auffassung",
        acceptableAnswers: ["Auffassung", "auffassung"],
        options: ["Auffassung", "Anforderung", "Anerkennung", "Anwendung"],
        collocation: "zu der Auffassung gelangen",
        meaning: "zu einer bestimmten Erkenntnis oder Meinung kommen",
        example:
          "Nach langer Diskussion gelangten wir zu der Auffassung, dass eine Änderung notwendig ist.",
        tip: "Auffassung = Meinung oder Ansicht. Typisch: zu der Auffassung gelangen."
      },

      {
        id: "kol-38",
        prefix: "Mit einer kleinen Anekdote gewinnen Sie leicht die",
        gapPlaceholder: "Nomen",
        suffix: "Ihrer Zuhörer.",
        correctAnswer: "Aufmerksamkeit",
        acceptableAnswers: ["Aufmerksamkeit", "aufmerksamkeit"],
        options: ["Aufmerksamkeit", "Anerkennung", "Achtung", "Anwendung"],
        collocation: "die Aufmerksamkeit gewinnen",
        meaning: "jemanden aufmerksam machen",
        example:
          "Mit einer interessanten Frage kann man schnell die Aufmerksamkeit des Publikums gewinnen.",
        tip: "die Aufmerksamkeit von jemandem gewinnen."
      },

      {
        id: "kol-39",
        prefix: "Der Chef hat den",
        gapPlaceholder: "Nomen",
        suffix: "erteilt, alle Dokumente zu überprüfen.",
        correctAnswer: "Auftrag",
        acceptableAnswers: ["Auftrag", "auftrag"],
        options: ["Auftrag", "Antrag", "Anspruch", "Angebot"],
        collocation: "einen Auftrag geben / erteilen",
        meaning: "jemanden mit einer Aufgabe beauftragen",
        example:
          "Der Projektleiter hat dem Team den Auftrag erteilt, die Daten zu analysieren.",
        tip: "Beide Varianten sind möglich: einen Auftrag geben / einen Auftrag erteilen."
      },

      {
        id: "kol-40",
        prefix: "Er brachte im Meeting seine Besorgnis zum",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Ausdruck",
        acceptableAnswers: ["Ausdruck", "ausdruck"],
        options: ["Ausdruck", "Anwendung", "Auftrag", "Anspruch"],
        collocation: "etwas zum Ausdruck bringen",
        meaning: "etwas äußern oder ausdrücken",
        example:
          "Sie brachte ihre Unzufriedenheit deutlich zum Ausdruck.",
        tip: "Feste Verbindung: etwas zum Ausdruck bringen."
      },

      {
        id: "kol-41",
        prefix: "Heute stehen viele zukunftsweisende Berufe zur",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Auswahl",
        acceptableAnswers: ["Auswahl", "auswahl"],
        options: ["Auswahl", "Anwendung", "Anerkennung", "Auffassung"],
        collocation: "zur Auswahl stehen",
        meaning: "angeboten werden oder ausgewählt werden können",
        example:
          "Für die Stelle stehen mehrere Bewerber zur Auswahl.",
        tip: "zur Auswahl stehen = als Möglichkeit angeboten werden."
      },

      {
        id: "kol-42",
        prefix: "Die Wartungsarbeiten haben",
        gapPlaceholder: "Nomen",
        suffix: "auf den gesamten Betrieb.",
        correctAnswer: "Auswirkungen",
        acceptableAnswers: ["Auswirkungen", "auswirkungen"],
        options: ["Auswirkungen", "Anforderungen", "Aufmerksamkeiten", "Anwendungen"],
        collocation: "Auswirkungen haben auf",
        meaning: "sich auf etwas auswirken",
        example:
          "Die Entscheidung wird erhebliche Auswirkungen auf den gesamten Betrieb haben.",
        tip: "Auswirkungen haben auf + Akkusativ."
      },
      {
        id: "kol-43",
        prefix: "Alternative Arbeitsmodelle finden momentan große",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Beachtung",
        acceptableAnswers: ["Beachtung", "beachtung"],
        options: ["Beachtung", "Anerkennung", "Aufmerksamkeit", "Bedeutung"],
        collocation: "Beachtung finden",
        meaning: "beachtet werden",
        example:
          "Alternative Arbeitsmodelle finden momentan große Beachtung.",
        tip: "Feste Verbindung: Beachtung finden = beachtet werden."
      },

      {
        id: "kol-44",
        prefix: "Jeder kann einen",
        gapPlaceholder: "Nomen",
        suffix: "zur Verbesserung der Arbeitsabläufe leisten.",
        correctAnswer: "Beitrag",
        acceptableAnswers: ["Beitrag", "beitrag"],
        options: ["Beitrag", "Bezug", "Bescheid", "Beruf"],
        collocation: "einen Beitrag leisten",
        meaning: "zu etwas beitragen",
        example:
          "Jeder Mitarbeiter kann einen Beitrag zur Verbesserung des Arbeitsklimas leisten.",
        tip: "Typische Verbindung: einen Beitrag zu etwas leisten."
      },

      {
        id: "kol-45",
        prefix: "Sie übt ihren",
        gapPlaceholder: "Nomen",
        suffix: "als Sozialarbeiterin schon seit vielen Jahren aus.",
        correctAnswer: "Beruf",
        acceptableAnswers: ["Beruf", "beruf"],
        options: ["Beruf", "Beitrag", "Bescheid", "Bezug"],
        collocation: "einen Beruf ausüben",
        meaning: "arbeiten; einen Beruf beruflich machen",
        example:
          "Sie übt ihren Beruf als Ärztin mit großer Leidenschaft aus.",
        tip: "Feste Verbindung: einen Beruf ausüben."
      },

      {
        id: "kol-46",
        prefix: "Ich wollte schon immer einen",
        gapPlaceholder: "Nomen",
        suffix: "im Hotel ergreifen.",
        correctAnswer: "Beruf",
        acceptableAnswers: ["Beruf", "beruf"],
        options: ["Beruf", "Beitrag", "Bescheid", "Berufung"],
        collocation: "einen Beruf ergreifen",
        meaning: "beginnen, beruflich in einem bestimmten Bereich zu arbeiten",
        example:
          "Nach dem Studium möchte er einen Beruf im sozialen Bereich ergreifen.",
        tip: "einen Beruf ergreifen = einen bestimmten beruflichen Weg einschlagen."
      },

      {
        id: "kol-47",
        prefix: "Können Sie mir bitte",
        gapPlaceholder: "Nomen",
        suffix: "geben, wenn die Datenbank aktualisiert ist?",
        correctAnswer: "Bescheid",
        acceptableAnswers: ["Bescheid", "bescheid"],
        options: ["Bescheid", "Beitrag", "Beruf", "Bezug"],
        collocation: "Bescheid geben / sagen",
        meaning: "informieren",
        example:
          "Bitte geben Sie mir Bescheid, sobald Sie eine Antwort erhalten.",
        tip: "Sehr häufig im Alltag: jemandem Bescheid geben."
      },

      {
        id: "kol-48",
        prefix: "Über die Rechte von Arbeitnehmern wissen viele immer noch zu wenig",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Bescheid",
        acceptableAnswers: ["Bescheid", "bescheid"],
        options: ["Bescheid", "Beitrag", "Beruf", "Bezug"],
        collocation: "über etwas Bescheid wissen",
        meaning: "über etwas informiert sein",
        example:
          "Ich weiß über die neuen Regelungen noch nicht genau Bescheid.",
        tip: "Korrekte Struktur: über etwas Bescheid wissen."
      },

      {
        id: "kol-49",
        prefix: "Wir haben unsere",
        gapPlaceholder: "Nomen",
        suffix: "bereits vor einer Stunde aufgegeben.",
        correctAnswer: "Bestellung",
        acceptableAnswers: ["Bestellung", "bestellung"],
        options: ["Bestellung", "Bezahlung", "Bewerbung", "Beratung"],
        collocation: "eine Bestellung aufgeben",
        meaning: "etwas bestellen",
        example:
          "Ich habe gestern eine Bestellung im Online-Shop aufgegeben.",
        tip: "Feste Verbindung: eine Bestellung aufgeben."
      },

      {
        id: "kol-50",
        prefix: "Zur Lösung des Problems kommen mehrere Möglichkeiten in",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Betracht",
        acceptableAnswers: ["Betracht", "betracht"],
        options: ["Betracht", "Betrieb", "Bezug", "Druck"],
        collocation: "in Betracht kommen",
        meaning: "möglich sein",
        example:
          "Für die Reise kommen mehrere Hotels in Betracht.",
        tip: "in Betracht kommen = möglich sein."
      },

      {
        id: "kol-51",
        prefix: "Viele Menschen ziehen",
        gapPlaceholder: "Nomen",
        suffix: ", wegen einer Arbeitsstelle umzuziehen.",
        correctAnswer: "in Betracht",
        acceptableAnswers: ["in Betracht", "in betracht"],
        options: ["in Betracht", "in Anspruch", "in Angriff", "zum Ausdruck"],
        collocation: "in Betracht ziehen",
        meaning: "überlegen; erwägen",
        example:
          "Wir ziehen in Betracht, nächstes Jahr nach Hamburg umzuziehen.",
        tip: "in Betracht ziehen = etwas als Möglichkeit erwägen."
      },

      {
        id: "kol-52",
        prefix: "Seit heute ist im Büro die neue Lüftungsanlage in",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Betrieb",
        acceptableAnswers: ["Betrieb", "betrieb"],
        options: ["Betrieb", "Betracht", "Bezug", "Druck"],
        collocation: "im Betrieb sein",
        meaning: "laufen; eingeschaltet sein",
        example:
          "Die neue Maschine ist seit Montag im Betrieb.",
        tip: "im Betrieb sein = funktionieren oder laufen."
      },

      {
        id: "kol-53",
        prefix: "Ich nehme",
        gapPlaceholder: "Nomen",
        suffix: "auf Ihr Schreiben vom 13. Februar.",
        correctAnswer: "Bezug",
        acceptableAnswers: ["Bezug", "bezug"],
        options: ["Bezug", "Betrieb", "Bescheid", "Beitrag"],
        collocation: "Bezug nehmen auf",
        meaning: "sich beziehen auf",
        example:
          "Ich nehme Bezug auf Ihre E-Mail vom vergangenen Montag.",
        tip: "Formelle Verbindung: Bezug nehmen auf + Akkusativ."
      },

      {
        id: "kol-54",
        prefix: "Die neue Chefin muss ihr Können erst noch unter",
        gapPlaceholder: "Nomen",
        suffix: "stellen.",
        correctAnswer: "Beweis",
        acceptableAnswers: ["Beweis", "beweis"],
        options: ["Beweis", "Druck", "Ausdruck", "Einfluss"],
        collocation: "etwas unter Beweis stellen",
        meaning: "etwas beweisen",
        example:
          "Im Vorstellungsgespräch konnte sie ihre Fachkenntnisse unter Beweis stellen.",
        tip: "Feste Verbindung: etwas unter Beweis stellen."
      },

      {
        id: "kol-55",
        prefix: "Verschiedene Lösungen stehen zur",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Diskussion",
        acceptableAnswers: ["Diskussion", "diskussion"],
        options: ["Diskussion", "Auswahl", "Anwendung", "Verfügung"],
        collocation: "zur Diskussion stehen",
        meaning: "diskutiert werden",
        example:
          "Mehrere Vorschläge stehen derzeit zur Diskussion.",
        tip: "zur Diskussion stehen = Gegenstand einer Diskussion sein."
      },

      {
        id: "kol-56",
        prefix: "Arbeitnehmer stehen heute enorm unter",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Druck",
        acceptableAnswers: ["Druck", "druck"],
        options: ["Druck", "Beweis", "Einfluss", "Betrieb"],
        collocation: "unter Druck stehen",
        meaning: "gestresst sein; stark belastet sein",
        example:
          "Viele Beschäftigte stehen wegen des Zeitdrucks unter großer Belastung.",
        tip: "unter Druck stehen = stark unter Stress oder Belastung stehen."
      },

      {
        id: "kol-57",
        prefix: "Das Engagement des ganzen Teams macht großen",
        gapPlaceholder: "Nomen",
        suffix: "auf mich.",
        correctAnswer: "Eindruck",
        acceptableAnswers: ["Eindruck", "eindruck"],
        options: ["Eindruck", "Einfluss", "Ausdruck", "Aufwand"],
        collocation: "Eindruck machen auf",
        meaning: "beeindrucken",
        example:
          "Seine professionelle Präsentation hat einen guten Eindruck auf mich gemacht.",
        tip: "Eindruck machen auf + Akkusativ."
      },

      {
        id: "kol-58",
        prefix: "Ich möchte auf diese Entscheidung keinen",
        gapPlaceholder: "Nomen",
        suffix: "nehmen.",
        correctAnswer: "Einfluss",
        acceptableAnswers: ["Einfluss", "einfluss"],
        options: ["Einfluss", "Eindruck", "Ausdruck", "Aufwand"],
        collocation: "Einfluss nehmen auf",
        meaning: "beeinflussen",
        example:
          "Die Medien können großen Einfluss auf die öffentliche Meinung nehmen.",
        tip: "Einfluss nehmen auf + Akkusativ."
      },

      {
        id: "kol-59",
        prefix: "Wir müssen die Umstrukturierung endlich zu",
        gapPlaceholder: "Nomen",
        suffix: "bringen.",
        correctAnswer: "Ende",
        acceptableAnswers: ["Ende", "ende"],
        options: ["Ende", "Ausdruck", "Anwendung", "Auswahl"],
        collocation: "etwas zu Ende bringen",
        meaning: "etwas beenden oder abschließen",
        example:
          "Wir müssen die Arbeiten noch heute zu Ende bringen.",
        tip: "zu Ende bringen = etwas erfolgreich abschließen."
      },

      {
        id: "kol-60",
        prefix: "Ich habe endlich den",
        gapPlaceholder: "Nomen",
        suffix: "gefasst zu kündigen.",
        correctAnswer: "Entschluss",
        acceptableAnswers: ["Entschluss", "entschluss"],
        options: ["Entschluss", "Eindruck", "Einfluss", "Entwurf"],
        collocation: "einen Entschluss fassen",
        meaning: "beschließen; sich entschließen",
        example:
          "Nach langem Überlegen fasste er den Entschluss, eine neue Stelle zu suchen.",
        tip: "einen Entschluss fassen = eine Entscheidung treffen."
      },

      {
        id: "kol-61",
        prefix: "Haben Sie wegen der neuen Stelle schon eine",
        gapPlaceholder: "Nomen",
        suffix: "getroffen?",
        correctAnswer: "Entscheidung",
        acceptableAnswers: ["Entscheidung", "entscheidung"],
        options: ["Entscheidung", "Entschließung", "Erlaubnis", "Auffassung"],
        collocation: "eine Entscheidung treffen",
        meaning: "entscheiden",
        example:
          "Wir müssen heute eine wichtige Entscheidung treffen.",
        tip: "Sehr häufige Verbindung: eine Entscheidung treffen."
      },

      {
        id: "kol-62",
        prefix: "Mein größter Wunsch ist in",
        gapPlaceholder: "Nomen",
        suffix: "gegangen.",
        correctAnswer: "Erfüllung",
        acceptableAnswers: ["Erfüllung", "erfüllung"],
        options: ["Erfüllung", "Anwendung", "Auswahl", "Anerkennung"],
        collocation: "in Erfüllung gehen",
        meaning: "sich erfüllen; wahr werden",
        example:
          "Endlich ist mein großer Traum in Erfüllung gegangen.",
        tip: "in Erfüllung gehen = wahr werden."
      },

      {
        id: "kol-63",
        prefix: "Die Geschäftsführung erteilte den Mitarbeitenden die",
        gapPlaceholder: "Nomen",
        suffix: ", im Homeoffice zu arbeiten.",
        correctAnswer: "Erlaubnis",
        acceptableAnswers: ["Erlaubnis", "erlaubnis"],
        options: ["Erlaubnis", "Entscheidung", "Anforderung", "Anerkennung"],
        collocation: "die Erlaubnis erteilen",
        meaning: "erlauben",
        example:
          "Der Arbeitgeber erteilte ihm die Erlaubnis, früher zu gehen.",
        tip: "die Erlaubnis erteilen = etwas offiziell erlauben."
      },

      {
        id: "kol-64",
        prefix: "Ich beging einen",
        gapPlaceholder: "Nomen",
        suffix: ", als ich mir ohne Rücksprache Urlaub nahm.",
        correctAnswer: "Fehler",
        acceptableAnswers: ["Fehler", "fehler"],
        options: ["Fehler", "Entschluss", "Einfluss", "Fortschritt"],
        collocation: "einen Fehler begehen",
        meaning: "etwas falsch machen",
        example:
          "Er hat einen schweren Fehler begangen.",
        tip: "einen Fehler begehen ist etwas formeller als einen Fehler machen."
      },

      {
        id: "kol-65",
        prefix: "Die Entwicklung der letzten Jahre hat",
        gapPlaceholder: "Nomen",
        suffix: ", dass wir neue Märkte erschließen.",
        correctAnswer: "zur Folge",
        acceptableAnswers: ["zur Folge", "zur folge"],
        options: ["zur Folge", "zur Auswahl", "zur Anwendung", "zur Verfügung"],
        collocation: "zur Folge haben",
        meaning: "bewirken; zu etwas führen",
        example:
          "Die Umstrukturierung hatte zahlreiche Veränderungen zur Folge.",
        tip: "etwas zur Folge haben = etwas bewirken oder verursachen."
      },

      {
        id: "kol-66",
        prefix: "Er stellt ganz schön viele",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Forderungen",
        acceptableAnswers: ["Forderungen", "forderungen"],
        options: ["Forderungen", "Fragen", "Fehler", "Fortschritte"],
        collocation: "eine Forderung stellen",
        meaning: "etwas fordern",
        example:
          "Die Gewerkschaft stellt mehrere Forderungen an den Arbeitgeber.",
        tip: "Forderung stellen an + Akkusativ."
      },

      {
        id: "kol-67",
        prefix: "Im Seminar gehen wir der",
        gapPlaceholder: "Nomen",
        suffix: "nach, wie man mit Arbeitsstress am besten umgeht.",
        correctAnswer: "Frage",
        acceptableAnswers: ["Frage", "frage"],
        options: ["Frage", "Forderung", "Folge", "Funktion"],
        collocation: "einer Frage nachgehen",
        meaning: "forschen; etwas genauer untersuchen oder herausfinden",
        example:
          "Die Wissenschaftler gehen der Frage nach, warum die Ergebnisse so unterschiedlich sind.",
        tip: "einer Frage nachgehen + Dativ."
      },

      {
        id: "kol-68",
        prefix: "Es steht völlig außer",
        gapPlaceholder: "Nomen",
        suffix: ", dass wir diese Frist einhalten müssen.",
        correctAnswer: "Frage",
        acceptableAnswers: ["Frage", "frage"],
        options: ["Frage", "Zweifel", "Gefahr", "Lage"],
        collocation: "außer Frage stehen",
        meaning: "zweifellos richtig sein / unbestreitbar sein",
        example: "Es steht außer Frage, dass er den Job bekommt.",
        tip: "Bedeutet: Es gibt absolut nichts daran zu zweifeln."
      },
      {
        id: "kol-69",
        prefix: "Darf ich Ihnen vor der Entscheidung noch eine kurze",
        gapPlaceholder: "Nomen",
        suffix: "stellen?",
        correctAnswer: "Frage",
        acceptableAnswers: ["Frage", "frage"],
        options: ["Frage", "Rolle", "Bedingung", "Auskunft"],
        collocation: "eine Frage stellen",
        meaning: "etwas fragen",
        example: "Die Journalisten durften dem Minister mehrere Fragen stellen.",
        tip: "Typische Kollokation: 'eine Frage' + 'stellen'."
      },
      {
        id: "kol-70",
        prefix: "Über meine berufliche Zukunft mache ich mir derzeit viele",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Gedanken",
        acceptableAnswers: ["Gedanken", "gedanken"],
        options: ["Gedanken", "Sorgen", "Zweifel", "Pläne"],
        collocation: "sich Gedanken machen über (+ Akk)",
        meaning: "nachdenken / etwas genau überlegen",
        example: "Du solltest dir Gedanken über deine Ausbildung machen.",
        tip: "Reflexiv: sich (Dativ) Gedanken machen über etwas."
      },
      {
        id: "kol-71",
        prefix: "Wenn wir nicht sofort handeln, ist das gesamte Projekt in",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Gefahr",
        acceptableAnswers: ["Gefahr", "gefahr"],
        options: ["Gefahr", "Not", "Sorge", "Verlegenheit"],
        collocation: "in Gefahr sein",
        meaning: "gefährdet sein / vom Scheitern bedroht sein",
        example: "Durch den Sturm sind viele Ernten in Gefahr.",
        tip: "Feste Präpositionalverbindung: 'in Gefahr sein'."
      },
      {
        id: "kol-72",
        prefix: "Hattest du schon die",
        gapPlaceholder: "Nomen",
        suffix: ", dich mit dem neuen Teamleiter zu unterhalten?",
        correctAnswer: "Gelegenheit",
        acceptableAnswers: ["Gelegenheit", "gelegenheit"],
        options: ["Gelegenheit", "Möglichkeit", "Erlaubnis", "Absicht"],
        collocation: "die Gelegenheit haben zu",
        meaning: "die Chance haben, etwas zu tun",
        example: "Ich hatte leider noch keine Gelegenheit, das Buch zu lesen.",
        tip: "Feminines Nomen: die Gelegenheit."
      },
      {
        id: "kol-73",
        prefix: "Mit dem Abteilungsleiter habe ich gestern ein klärendes",
        gapPlaceholder: "Nomen",
        suffix: "geführt.",
        correctAnswer: "Gespräch",
        acceptableAnswers: ["Gespräch", "gespräch"],
        options: ["Gespräch", "Inhalt", "Verhandlung", "Interview"],
        collocation: "ein Gespräch führen mit/über",
        meaning: "sich unterhalten / ein altes oder wichtiges Thema besprechen",
        example: "Wir müssen dringend ein ernstes Gespräch über die Finanzen führen.",
        tip: "Verbindung aus 'führen' + neutrum Nomen (das Gespräch)."
      },
      {
        id: "kol-74",
        prefix: "Der Manager wollte für sein abruptes Kündigen keinen",
        gapPlaceholder: "Nomen",
        suffix: "angeben.",
        correctAnswer: "Grund",
        acceptableAnswers: ["Grund", "grund"],
        options: ["Grund", "Beweis", "Bericht", "Bescheid"],
        collocation: "den Grund angeben",
        meaning: "etwas begründen / Ursachen nennen",
        example: "Bitte geben Sie einen Grund für Ihre Stornierung an.",
        tip: "Maskulines Substantiv: der Grund."
      },
      {
        id: "kol-75",
        prefix: "Es gehört zum guten Ton, einen freundlichen Gruß höflich zu",
        gapPlaceholder: "Verb",
        suffix: ".",
        correctAnswer: "erwidern",
        acceptableAnswers: ["erwidern"],
        options: ["erwidern", "beantworten", "zurückgeben", "bestätigen"],
        collocation: "einen Gruß erwidern",
        meaning: "zurückgrüßen",
        example: "Er lächelte und erwiderte ihren freundlichen Gruß.",
        tip: "Gehobener Ausdruck: 'erwidern'."
      },
      {
        id: "kol-76",
        prefix: "Das neue Produktkonzept konnte beim Kunden sofort großes",
        gapPlaceholder: "Nomen",
        suffix: "wecken.",
        correctAnswer: "Interesse",
        acceptableAnswers: ["Interesse", "interesse"],
        options: ["Interesse", "Gefühl", "Aufsehen", "Verständnis"],
        collocation: "Interesse wecken für",
        meaning: "jemanden für etwas begeistern / neugierig machen",
        example: "Der Vortrag hat mein Interesse für Informatik geweckt.",
        tip: "Verbindung mit dem Verb 'wecken' (Neutrum: das Interesse)."
      },
      {
        id: "kol-77",
        prefix: "Wir müssen diese Regelung leider offiziell zur",
        gapPlaceholder: "Nomen",
        suffix: "nehmen.",
        correctAnswer: "Kenntnis",
        acceptableAnswers: ["Kenntnis", "kenntnis"],
        options: ["Kenntnis", "Achtung", "Meinung", "Ansicht"],
        collocation: "zur Kenntnis nehmen",
        meaning: "etwas wahrnehmen, zur Kenntnis erhalten und akzeptieren",
        example: "Ich habe Ihre Absage bedauernd zur Kenntnis genommen.",
        tip: "Verbindung mit 'nehmen': etwas zur Kenntnis nehmen."
      },
      {
        id: "kol-78",
        prefix: "Sie sollten direkt mit der Personalabteilung",
        gapPlaceholder: "Nomen",
        suffix: "aufnehmen.",
        correctAnswer: "Kontakt",
        acceptableAnswers: ["Kontakt", "kontakt"],
        options: ["Kontakt", "Verbindung", "Beziehung", "Anfrage"],
        collocation: "Kontakt aufnehmen mit",
        meaning: "jemanden kontaktieren",
        example: "Wir werden in den nächsten Tagen Kontakt mit Ihnen aufnehmen.",
        tip: "Nomen-Verb-Verbindung mit 'aufnehmen'."
      },
      {
        id: "kol-79",
        prefix: "Wer trägt nach diesem Transportschaden eigentlich die finanziellen",
        gapPlaceholder: "Nomen (Plural)",
        suffix: "?",
        correctAnswer: "Kosten",
        acceptableAnswers: ["Kosten", "kosten"],
        options: ["Kosten", "Folgen", "Verluste", "Rechnungen"],
        collocation: "die Kosten tragen",
        meaning: "für etwas bezahlen",
        example: "Die Versicherung hat die gesamten Kosten getragen.",
        tip: "Pluralwort: die Kosten."
      },
      {
        id: "kol-80",
        prefix: "Ich bin wegen meiner Kopfschmerzen heute leider nicht in der",
        gapPlaceholder: "Nomen",
        suffix: ", die Präsentation zu halten.",
        correctAnswer: "Lage",
        acceptableAnswers: ["Lage", "lage"],
        options: ["Lage", "Bereitschaft", "Verfassung", "Form"],
        collocation: "in der Lage sein zu",
        meaning: "fähig sein / etwas tun können",
        example: "Bist du in der Lage, das Auto selbst zu reparieren?",
        tip: "Formel für Fähigkeit: in der Lage sein zu + Infinitiv."
      },
      {
        id: "kol-81",
        prefix: "Es erfordert Geduld, diesen zähen Prozess am",
        gapPlaceholder: "Nomen",
        suffix: "zu halten.",
        correctAnswer: "Laufen",
        acceptableAnswers: ["Laufen", "laufen"],
        options: ["Laufen", "Gehen", "Fließen", "Arbeiten"],
        collocation: "am Laufen halten",
        meaning: "dafür sorgen, dass etwas weiterfunktioniert/weiterläuft",
        example: "Es ist schwer, das Geschäft während der Krise am Laufen zu halten.",
        tip: "Substantivierter Infinitiv: das Laufen."
      },
      {
        id: "kol-82",
        prefix: "Halten Sie mich bitte bezüglich aller Entscheidungen auf dem",
        gapPlaceholder: "Nomen",
        suffix: "!",
        correctAnswer: "Laufenden",
        acceptableAnswers: ["Laufenden", "laufenden"],
        options: ["Laufenden", "Stand", "Neuesten", "Wissen"],
        collocation: "auf dem Laufenden sein / halten",
        meaning: "informiert sein / kontinuierlich informieren",
        example: "Ich halte dich über die Entwicklung auf dem Laufenden.",
        tip: "Substantiviertes Adjektiv: auf dem Laufenden."
      },
      {
        id: "kol-83",
        prefix: "Das neue E-Auto soll im Herbst diesen Jahres auf den",
        gapPlaceholder: "Nomen",
        suffix: "gebracht werden.",
        correctAnswer: "Markt",
        acceptableAnswers: ["Markt", "markt"],
        options: ["Markt", "Verkauf", "Handel", "Start"],
        collocation: "auf den Markt bringen",
        meaning: "etwas zum ersten Mal zum Verkauf anbieten",
        example: "Das Unternehmen bringt eine neue Software auf den Markt.",
        tip: "Maskulines Substantiv: der Markt."
      },
      {
        id: "kol-84",
        prefix: "Der Auszubildende gibt sich große",
        gapPlaceholder: "Nomen",
        suffix: ", um keine Fehler zu machen.",
        correctAnswer: "Mühe",
        acceptableAnswers: ["Mühe", "muehe"],
        options: ["Mühe", "Arbeit", "Sorge", "Kraft"],
        collocation: "sich Mühe geben",
        meaning: "sich bemühen / fleißig sein",
        example: "Er hat sich viel Mühe gegeben, um die Prüfung zu bestehen.",
        tip: "Feste reflexive Verbindung: sich Mühe geben."
      },
      {
        id: "kol-85",
        prefix: "Dieses ständige und laute Hupen geht mir gehörig auf die",
        gapPlaceholder: "Nomen (Plural)",
        suffix: ".",
        correctAnswer: "Nerven",
        acceptableAnswers: ["Nerven", "nerven"],
        options: ["Nerven", "Gedanken", "Ohren", "Gefühle"],
        collocation: "auf die Nerven gehen",
        meaning: "jemanden extrem nerven oder stören",
        example: "Seine Unpünktlichkeit geht mir wirklich auf die Nerven.",
        tip: "Pluralform: die Nerven."
      },
      {
        id: "kol-86",
        prefix: "Trotz anfänglicher Kritik hielt der Erfinder starr an seinem",
        gapPlaceholder: "Nomen",
        suffix: "fest.",
        correctAnswer: "Plan",
        acceptableAnswers: ["Plan", "plan"],
        options: ["Plan", "Traum", "Wunsch", "Ziel"],
        collocation: "an einem Plan festhalten",
        meaning: "eine Idee oder ein Vorhaben nicht aufgeben",
        example: "Wir sollten unbedingt an unserem ursprünglichen Plan festhalten.",
        tip: "Trennbare Verbindung mit 'festhalten an' + Dativ."
      },
      {
        id: "kol-87",
        prefix: "Nach drei Jahren Lehrzeit muss er nun seine praktische",
        gapPlaceholder: "Nomen",
        suffix: "ablegen.",
        correctAnswer: "Prüfung",
        acceptableAnswers: ["Prüfung", "pruefung"],
        options: ["Prüfung", "Aufgabe", "Arbeit", "Kontrolle"],
        collocation: "eine Prüfung ablegen",
        meaning: "geprüft werden / an einer Prüfung teilnehmen",
        example: "Morgen lege ich meine Sprachprüfung auf C1-Niveau ab.",
        tip: "Kollokation mit 'ablegen': eine Prüfung ablegen."
      },
      {
        id: "kol-88",
        prefix: "Bitte geben Sie mir bis Freitag eine kurze",
        gapPlaceholder: "Nomen",
        suffix: "zu den Terminvorschlägen.",
        correctAnswer: "Rückmeldung",
        acceptableAnswers: ["Rückmeldung", "rueckmeldung"],
        options: ["Rückmeldung", "Antwort", "Bescheid", "Auskunft"],
        collocation: "Rückmeldung geben zu",
        meaning: "sich zurückmelden / Feedback geben",
        example: "Der Chef hat mir noch keine Rückmeldung zu meinem Antrag gegeben.",
        tip: "Feminines Nomen: die Rückmeldung."
      },
      {
        id: "kol-89",
        prefix: "In heiklen Situationen ist es extrem wichtig, stets Ruhe zu",
        gapPlaceholder: "Verb",
        suffix: ".",
        correctAnswer: "bewahren",
        acceptableAnswers: ["bewahren"],
        options: ["bewahren", "halten", "machen", "haben"],
        collocation: "Ruhe bewahren",
        meaning: "ruhig bleiben / gelassen bleiben",
        example: "Bitte bewahren Sie Ruhe und verlassen Sie das Gebäude.",
        tip: "Standard-Verbindung: Ruhe bewahren."
      },
      {
        id: "kol-90",
        prefix: "Obwohl der Fehler gravierend war, nahm die Chefin ihren Mitarbeiter in",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Schutz",
        acceptableAnswers: ["Schutz", "schutz"],
        options: ["Schutz", "Sicherheit", "Anspruch", "Hut"],
        collocation: "in Schutz nehmen",
        meaning: "beschützen / verteidigen",
        example: "Er nimmt seine Freunde immer sofort in Schutz.",
        tip: "Nomen-Verb-Verbindung mit 'in Schutz nehmen'."
      },
      {
        id: "kol-91",
        prefix: "Du solltest dir wegen der kleinen Verspätung nicht gleich große",
        gapPlaceholder: "Nomen (Plural)",
        suffix: "machen.",
        correctAnswer: "Sorgen",
        acceptableAnswers: ["Sorgen", "sorgen"],
        options: ["Sorgen", "Gedanken", "Zweifel", "Ängste"],
        collocation: "sich Sorgen machen um",
        meaning: "sich um jemanden oder etwas sorgen",
        example: "Die Eltern machen sich Sorgen um die Gesundheit ihres Kindes.",
        tip: "Verbindung im Plural mit 'um': sich Sorgen machen um."
      },
      {
        id: "kol-92",
        prefix: "Mit dieser unüberlegten Investition hast du das gesamte Firmenkapital aufs",
        gapPlaceholder: "Nomen",
        suffix: "gesetzt.",
        correctAnswer: "Spiel",
        acceptableAnswers: ["Spiel", "spiel"],
        options: ["Spiel", "Risiko", "Glück", "Geld"],
        collocation: "aufs Spiel setzen",
        meaning: "etwas wertvolles riskieren",
        example: "Er wollte seinen guten Ruf nicht aufs Spiel setzen.",
        tip: "Feste Wendung: aufs Spiel setzen."
      },
      {
        id: "kol-93",
        prefix: "Wir müssen das Problem bei der nächsten Besprechung unbedingt zur",
        gapPlaceholder: "Nomen",
        suffix: "bringen.",
        correctAnswer: "Sprache",
        acceptableAnswers: ["Sprache", "sprache"],
        options: ["Sprache", "Diskussion", "Rede", "Meinung"],
        collocation: "zur Sprache bringen",
        meaning: "ein Thema ansprechen oder einbringen",
        example: "Sie hat die hohen Kosten endlich zur Sprache gebracht.",
        tip: "Verbindung mit 'bringen': zur Sprache bringen."
      },
      {
        id: "kol-94",
        prefix: "Ich stehe fest auf dem",
        gapPlaceholder: "Nomen",
        suffix: ", dass Überstunden bezahlt werden müssen.",
        correctAnswer: "Standpunkt",
        acceptableAnswers: ["Standpunkt", "standpunkt"],
        options: ["Standpunkt", "Gedanken", "Grundsatz", "Meinung"],
        collocation: "auf dem Standpunkt stehen",
        meaning: "eine bestimmte gefestigte Meinung haben",
        example: "Er steht auf dem Standpunkt, dass Ehrlichkeit das Wichtigste ist.",
        tip: "Zusammengesetztes Nomen: der Standpunkt."
      },
      {
        id: "kol-95",
        prefix: "Der Pressesprecher wollte zu den Gerüchten bislang keine",
        gapPlaceholder: "Nomen",
        suffix: "nehmen.",
        correctAnswer: "Stellung",
        acceptableAnswers: ["Stellung", "stellung"],
        options: ["Stellung", "Meinung", "Auskunft", "Kritik"],
        collocation: "Stellung nehmen zu",
        meaning: "seine Meinung zu einem Vorfall oder Vorwurf äußern",
        example: "Wir bitten Sie, zu diesen Vorwürfen Stellung zu nehmen.",
        tip: "Kollokation mit 'nehmen': Stellung nehmen zu + Dativ."
      },
      {
        id: "kol-96",
        prefix: "Setzen Sie sich bei weiteren technischen Fragen bitte direkt mit der IT-Abteilung in",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Verbindung",
        acceptableAnswers: ["Verbindung", "verbindung"],
        options: ["Verbindung", "Kontakt", "Gespräch", "Beziehung"],
        collocation: "sich in Verbindung setzen mit",
        meaning: "jemanden kontaktieren",
        example: "Ich werde mich zeitnah mit Ihnen in Verbindung setzen.",
        tip: "Reflexiv: sich in Verbindung setzen mit + Dativ."
      },
      {
        id: "kol-97",
        prefix: "Mit dieser sehr persönlichen Frage hat er den Gast in arge",
        gapPlaceholder: "Nomen",
        suffix: "gebracht.",
        correctAnswer: "Verlegenheit",
        acceptableAnswers: ["Verlegenheit", "verlegenheit"],
        options: ["Verlegenheit", "Sorge", "Gefahr", "Angst"],
        collocation: "in Verlegenheit bringen",
        meaning: "jemanden verlegen, unsicher oder verlegen machen",
        example: "Seine Komplimente brachten sie spürbar in Verlegenheit.",
        tip: "Feminines Substantiv: die Verlegenheit."
      },
      {
        id: "kol-98",
        prefix: "Das Kundenzentrum stellt allen Besuchern kostenloses WLAN zur",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Verfügung",
        acceptableAnswers: ["Verfügung", "verfuegung"],
        options: ["Verfügung", "Auswahl", "Bereitschaft", "Anwendung"],
        collocation: "zur Verfügung stellen",
        meaning: "dafür sorgen, dass etwas genutzt werden kann",
        example: "Die Firma stellt ihren Mitarbeitenden Dienstwagen zur Verfügung.",
        tip: "Kollokation mit 'stellen' (Aktiv-Funktion)."
      },
      {
        id: "kol-99",
        prefix: "Ich kann für sein unfreundliches Verhalten absolut kein",
        gapPlaceholder: "Nomen",
        suffix: "aufbringen.",
        correctAnswer: "Verständnis",
        acceptableAnswers: ["Verständnis", "verstaendnis"],
        options: ["Verständnis", "Mitleid", "Gefühl", "Interesse"],
        collocation: "Verständnis aufbringen für",
        meaning: "etwas verstehen / nachvollziehen können",
        example: "Für solche Ausreden kann ich leider kein Verständnis aufbringen.",
        tip: "Nomen-Verb-Verbindung mit 'aufbringen'."
      },
      {
        id: "kol-100",
        prefix: "Wenn zwei Qualifikationen gleichwertig sind, sollte man der erfahreneren Person den",
        gapPlaceholder: "Nomen",
        suffix: "geben.",
        correctAnswer: "Vorzug",
        acceptableAnswers: ["Vorzug", "vorzug"],
        options: ["Vorzug", "Vorteil", "Wert", "Rang"],
        collocation: "jemandem den Vorzug geben",
        meaning: "jemanden oder etwas bevorzugen",
        example: "Bei der Auswahl gab die Jury dem jüngeren Kandidaten den Vorzug.",
        tip: "Gehobener Ausdruck für bevorzugen: jemandem den Vorzug geben."
      },
      {
        id: "kol-101",
        prefix: "Seit unserem Streit versucht er mir im Büro konsequent aus dem",
        gapPlaceholder: "Nomen",
        suffix: "zu gehen.",
        correctAnswer: "Weg",
        acceptableAnswers: ["Weg", "weg"],
        options: ["Weg", "Blick", "Platz", "Fokus"],
        collocation: "jemandem aus dem Weg gehen",
        meaning: "jemanden meiden / ausweichen",
        example: "Er geht schwierigen Aufgaben gerne aus dem Weg.",
        tip: "Feste Redewendung: jemandem aus dem Weg gehen."
      },
      {
        id: "kol-102",
        prefix: "Bei unserer Firmenphilosophie steht die Kundenzufriedenheit stets im",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Zentrum",
        acceptableAnswers: ["Zentrum", "zentrum"],
        options: ["Zentrum", "Fokus", "Mittelpunkt", "Hauptteil"],
        collocation: "im Zentrum stehen",
        meaning: "am wichtigsten sein / das Zentrale sein",
        example: "Das Wohl der Patienten steht in diesem Krankenhaus im Zentrum.",
        tip: "Verbindung: im Zentrum stehen."
      },
      {
        id: "kol-103",
        prefix: "Der Rückgang der Absatzzahlen steht in direktem",
        gapPlaceholder: "Nomen",
        suffix: "mit den gestiegenen Preisen.",
        correctAnswer: "Zusammenhang",
        acceptableAnswers: ["Zusammenhang", "zusammenhang"],
        options: ["Zusammenhang", "Vergleich", "Kontakt", "Einfluss"],
        collocation: "im Zusammenhang stehen mit",
        meaning: "zusammenhängen / eine Verbindung aufweisen",
        example: "Die beiden Ereignisse stehen in keinem kausalen Zusammenhang.",
        tip: "Maskulines Substantiv: der Zusammenhang."
      },
      {
        id: "kol-104",
        prefix: "Ich habe erhebliche",
        gapPlaceholder: "Nomen (Plural)",
        suffix: "an der Richtigkeit dieser Angaben.",
        correctAnswer: "Zweifel",
        acceptableAnswers: ["Zweifel", "zweifel"],
        options: ["Zweifel", "Sorgen", "Fragen", "Bedenken"],
        collocation: "Zweifel haben an (+ Dat)",
        meaning: "etwas bezweifeln",
        example: "Hast du keine Zweifel an seinen Aussagen?",
        tip: "Nomen mit Präposition: Zweifel haben an + Dativ."
      },
      {
        id: "kol-105",
        prefix: "Es steht außer",
        gapPlaceholder: "Nomen",
        suffix: ", dass sie für diesen Job die beste Kandidatin ist.",
        correctAnswer: "Zweifel",
        acceptableAnswers: ["Zweifel", "zweifel"],
        options: ["Zweifel", "Frage", "Gefahr", "Sorge"],
        collocation: "außer Zweifel stehen",
        meaning: "gar nicht bezweifelt werden / sicher sein",
        example: "Seine fachliche Qualifikation steht völlig außer Zweifel.",
        tip: "Bedeutet: Es gibt keinerlei Zweifel daran."
      }
    ]
  },
  {
    id: "praepositionen",
    title: "Verben mit Präpositionen",
    shortDescription: "Feste Präpositionen und der richtige Kasus (Akkusativ / Dativ)",
    icon: "🎯",
    level: "A2 – B2",
    color: "#3b82f6",
    exercises: [
      {
        id: "prep-1",
        prefix: "Seit mehr als einer halben Stunde warten wir schon ungeduldig",
        gapPlaceholder: "Präposition",
        suffix: "den verspäteten Bus.",
        correctAnswer: "auf",
        acceptableAnswers: ["auf"],
        options: ["auf", "für", "an", "nach"],
        collocation: "warten auf (+ Akkusativ)",
        meaning: "auf das Eintreffen einer Person oder Sache hoffen",
        example: "Worauf wartest du noch? Steig ein!",
        tip: "Verlangt stets 'auf' gefolgt vom Akkusativ (den Bus)."
      },
      {
        id: "prep-2",
        prefix: "Mein Bruder interessiert sich seit seiner Kindheit brennend",
        gapPlaceholder: "Präposition",
        suffix: "Astronomie und Raumfahrt.",
        correctAnswer: "für",
        acceptableAnswers: ["für", "fuer"],
        options: ["für", "an", "über", "mit"],
        collocation: "sich interessieren für (+ Akkusativ)",
        meaning: "Aufmerksamkeit oder Neugier für ein Thema haben",
        example: "Interessierst du dich für klassische Musik?",
        tip: "Reflexives Verb mit 'für' + Akkusativ."
      },
      {
        id: "prep-3",
        prefix: "Mehr als zweihundert Experten nehmen dieses Jahr",
        gapPlaceholder: "Präposition",
        suffix: "der internationalen Konferenz teil.",
        correctAnswer: "an",
        acceptableAnswers: ["an"],
        options: ["an", "bei", "in", "zu"],
        collocation: "teilnehmen an (+ Dativ)",
        meaning: "bei einer Veranstaltung oder Aktivität mitmachen",
        example: "Wer möchte an dem Sprachkurs teilnehmen?",
        tip: "Trennung: teil|nehmen an + Dativ (der Konferenz)."
      },
      {
        id: "prep-4",
        prefix: "Wir freuen uns schon riesig",
        gapPlaceholder: "Präposition",
        suffix: "den kommenden Sommerurlaub in den Bergen.",
        correctAnswer: "auf",
        acceptableAnswers: ["auf"],
        options: ["auf", "über", "an", "von"],
        collocation: "sich freuen auf (+ Akkusativ)",
        meaning: "freudige Erwartung auf ein zukünftiges Ereignis",
        example: "Die Kinder freuen sich schon auf Weihnachten.",
        tip: "'auf' = Zukunft (Vorfreude); 'über' = Gegenwart oder Vergangenheit."
      },
      {
        id: "prep-5",
        prefix: "Der Erfolg unseres Projekts hängt maßgeblich",
        gapPlaceholder: "Präposition",
        suffix: "der guten Zusammenarbeit im Team ab.",
        correctAnswer: "von",
        acceptableAnswers: ["von"],
        options: ["von", "an", "aus", "über"],
        collocation: "abhängen von (+ Dativ)",
        meaning: "bedingt sein durch / von etwas bestimmt werden",
        example: "Das hängt ganz von deinen persönlichen Wünschen ab.",
        tip: "Trennung: ab|hängen von + Dativ."
      },
      {
        id: "prep-6",
        prefix: "Ich muss den ganzen Tag",
        gapPlaceholder: "Präposition",
        suffix: "unser spannendes Gespräch von gestern Abend denken.",
        correctAnswer: "an",
        acceptableAnswers: ["an"],
        options: ["an", "über", "in", "auf"],
        collocation: "denken an (+ Akkusativ)",
        meaning: "sich gedanklich mit jemandem oder etwas beschäftigen",
        example: "Denk bitte daran, die Schlüssel mitzunehmen!",
        tip: "Präposition 'an' verlangt hier den Akkusativ."
      },
      {
        id: "prep-7",
        prefix: "Zuverlässigkeit und Pünktlichkeit gehören zweifellos",
        gapPlaceholder: "Präposition",
        suffix: "den wichtigsten Tugenden im Berufsleben.",
        correctAnswer: "zu",
        acceptableAnswers: ["zu"],
        options: ["zu", "nach", "in", "bei"],
        collocation: "gehören zu (+ Dativ)",
        meaning: "Bestandteil oder Teil einer Gruppe sein",
        example: "Wien gehört zu den lebenswertesten Städten der Welt.",
        tip: "Verlangt immer 'zu' + Dativ (den Tugenden)."
      },
      {
        id: "prep-8",
        prefix: "Darf ich Sie ganz kurz",
        gapPlaceholder: "Präposition",
        suffix: "Ihre geschätzte Aufmerksamkeit bitten?",
        correctAnswer: "um",
        acceptableAnswers: ["um"],
        options: ["um", "für", "nach", "an"],
        collocation: "bitten um (+ Akkusativ)",
        meaning: "einen Wunsch äußern / höflich verlangen",
        example: "Ich möchte dich um einen kleinen Gefallen bitten.",
        tip: "'bitten' verbindet sich fest mit 'um' (nicht mit 'für'!)."
      },
      {
        id: "prep-9",
        prefix: "Niemand im Kollegium zweifelt",
        gapPlaceholder: "Präposition",
        suffix: "seiner fachlichen Eignung für diese Position.",
        correctAnswer: "an",
        acceptableAnswers: ["an"],
        options: ["an", "von", "über", "in"],
        collocation: "zweifeln an (+ Dativ)",
        meaning: "Unsicherheit bezüglich einer Tatsache oder Fähigkeit empfinden",
        example: "Er zweifelte keine Sekunde an seinem Entschluss.",
        tip: "Feste Verbindung: 'zweifeln' + 'an' + Dativ."
      },
      {
        id: "prep-10",
        prefix: "Nach einigen Monaten habe ich mich endlich",
        gapPlaceholder: "Präposition",
        suffix: "das unbeständige deutsche Wetter gewöhnt.",
        correctAnswer: "an",
        acceptableAnswers: ["an"],
        options: ["an", "auf", "mit", "zu"],
        collocation: "sich gewöhnen an (+ Akkusativ)",
        meaning: "sich mit einer neuen Situation vertraut machen",
        example: "Man gewöhnt sich schnell an die Ruhe auf dem Land.",
        tip: "Reflexiv: 'sich gewöhnen' + 'an' + Akkusativ."
      },
      {
        id: "prep-11",
        prefix: "Gesundheitsbewusste Menschen verzichten im Alltag oft ganz bewusst",
        gapPlaceholder: "Präposition",
        suffix: "übermäßigen Zuckerkonsum.",
        correctAnswer: "auf",
        acceptableAnswers: ["auf"],
        options: ["auf", "an", "von", "über"],
        collocation: "verzichten auf (+ Akkusativ)",
        meaning: "freiwillig nicht von etwas Gebrauch machen",
        example: "Für den Umweltschutz verzichtet die Familie weitgehend auf Flugreisen.",
        tip: "Feste Verbindung: 'verzichten' + 'auf' + Akkusativ."
      },
      {
        id: "prep-12",
        prefix: "Regelmäßige Bewegung und gesunder Schlaf können maßgeblich",
        gapPlaceholder: "Präposition",
        suffix: "einer höheren Lebensqualität beitragen.",
        correctAnswer: "zu",
        acceptableAnswers: ["zu"],
        options: ["zu", "an", "für", "bei"],
        collocation: "beitragen zu (+ Dativ)",
        meaning: "einen fördernden Anteil an einem Resultat haben",
        example: "Jeder Mitarbeiter trug zum Erfolg des Projekts bei.",
        tip: "Feste Verbindung: 'beitragen' + 'zu' + Dativ."
      },
      {
        id: "prep-13",
        prefix: "Die traditionelle Schwarzwälder Kirschtorte besteht im Wesentlichen",
        gapPlaceholder: "Präposition",
        suffix: "Biskuitboden, Sauerkirschen und frischer Schlagsahne.",
        correctAnswer: "aus",
        acceptableAnswers: ["aus"],
        options: ["aus", "von", "in", "mit"],
        collocation: "bestehen aus (+ Dativ)",
        meaning: "aus bestimmten Materialien oder Teilen zusammengesetzt sein",
        example: "Das Prüfungskomitee besteht aus drei erfahrenen Professoren.",
        tip: "Zusammensetzung: 'bestehen aus' + Dativ (im Unterschied zu 'bestehen auf' = beharren)."
      },
      {
        id: "prep-14",
        prefix: "Die neue Forschungsgruppe befasst sich seit Monaten intensiv",
        gapPlaceholder: "Präposition",
        suffix: "den wirtschaftlichen Folgen der Digitalisierung.",
        correctAnswer: "mit",
        acceptableAnswers: ["mit"],
        options: ["mit", "über", "um", "an"],
        collocation: "sich befassen mit (+ Dativ)",
        meaning: "sich eingehend und forschend mit einer Materie beschäftigen",
        example: "Wir müssen uns dringend mit diesem Problem befassen.",
        tip: "Reflexives Verb mit Präposition: 'sich befassen' + 'mit' + Dativ."
      },
      {
        id: "prep-15",
        prefix: "Viele Menschen in verkehrsreichen Innenstädten leiden zunehmend",
        gapPlaceholder: "Präposition",
        suffix: "dem ständigen Lärmpegel.",
        correctAnswer: "unter",
        acceptableAnswers: ["unter"],
        options: ["unter", "an", "von", "durch"],
        collocation: "leiden unter (+ Dativ)",
        meaning: "durch äußere Umstände oder Belastungen seelisch/körperlich beeinträchtigt sein",
        example: "Die Landwirtschaft leidet unter der anhaltenden Trockenheit.",
        tip: "Merke: 'leiden unter' bei äußeren Umständen/Lärm, aber 'leiden an' bei Krankheiten."
      }
    ]
  },
  {
    id: "redewendungen",
    title: "Redewendungen & Sprichwörter",
    shortDescription: "Typische bildhafte Redensarten aus dem deutschen Alltag",
    icon: "💡",
    level: "B1 – C2",
    color: "#f59e0b",
    exercises: [
      {
        id: "red-1",
        prefix: "Morgen hast du deine praktische Fahrprüfung? Ich werde dir ganz fest die Daumen",
        gapPlaceholder: "Verb",
        suffix: "!",
        correctAnswer: "drücken",
        acceptableAnswers: ["drücken", "druecken"],
        options: ["drücken", "halten", "drehen", "zeigen"],
        collocation: "die Daumen drücken",
        meaning: "jemandem Glück und Erfolg für eine Prüfung oder Herausforderung wünschen",
        example: "Ich drücke dir für das Vorstellungsgespräch alle Daumen!",
        tip: "Verb 'drücken' (im Englischen: to cross one's fingers)."
      },
      {
        id: "red-2",
        prefix: "Wenn ich auf dem Weg zur Post auch gleich einkaufe, schlage ich zwei Fliegen mit einer",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Klappe",
        acceptableAnswers: ["Klappe", "klappe"],
        options: ["Klappe", "Hand", "Falle", "Kelle"],
        collocation: "zwei Fliegen mit einer Klappe schlagen",
        meaning: "zwei Dinge mit einem einzigen Aufwand gleichzeitig erledigen",
        example: "Mit der Fahrgemeinschaft sparen wir Geld und schonen das Klima – zwei Fliegen mit einer Klappe!",
        tip: "Substantiv: die Klappe (ursprünglich von der Fliegenklappe)."
      },
      {
        id: "red-3",
        prefix: "Mit seiner unbedachten Bemerkung über das Alter der Chefin ist er voll ins Fettnäpfchen",
        gapPlaceholder: "Partizip II",
        suffix: ".",
        correctAnswer: "getreten",
        acceptableAnswers: ["getreten"],
        options: ["getreten", "gefallen", "gesprungen", "geraten"],
        collocation: "ins Fettnäpfchen treten",
        meaning: "sich ungeschickt oder peinlich verhalten und jemanden verletzen",
        example: "Da bin ich wohl ins Fettnäpfchen getreten, tut mir leid!",
        tip: "Partizip II des unregelmäßigen Verbs 'treten' (treten - trat - getreten)."
      },
      {
        id: "red-4",
        prefix: "Es reicht mir jetzt wirklich! Ich habe die Nase gestrichen",
        gapPlaceholder: "Adjektiv",
        suffix: "von diesen ständigen Ausreden.",
        correctAnswer: "voll",
        acceptableAnswers: ["voll"],
        options: ["voll", "leer", "satt", "fertig"],
        collocation: "die Nase voll haben von (+ Dat)",
        meaning: "von einer Situation oder Person völlig genervt sein",
        example: "Ich habe die Nase voll vom ständigen Stau am Morgen.",
        tip: "Verbindung mit dem Wörtchen 'voll' (die Nase voll haben)."
      },
      {
        id: "red-5",
        prefix: "Hör bitte auf mit den Ausflüchten und schenk mir endlich reinen",
        gapPlaceholder: "Nomen",
        suffix: "ein!",
        correctAnswer: "Wein",
        acceptableAnswers: ["Wein", "wein"],
        options: ["Wein", "Saft", "Tee", "Kaffee"],
        collocation: "reinen Wein einschenken",
        meaning: "jemandem die ungeschminkte Wahrheit sagen",
        example: "Es ist besser, ihm gleich reinen Wein einzuschenken, als ihn zu belügen.",
        tip: "Maskulines Substantiv: der Wein."
      },
      {
        id: "red-6",
        prefix: "Das Schild stand direkt vor deiner Nase. Hast du etwa Tomaten auf den",
        gapPlaceholder: "Nomen (Plural)",
        suffix: "?",
        correctAnswer: "Augen",
        acceptableAnswers: ["Augen", "augen"],
        options: ["Augen", "Ohren", "Händen", "Fingern"],
        collocation: "Tomaten auf den Augen haben",
        meaning: "etwas völlig Offensichtliches übersehen oder nicht wahrnehmen",
        example: "Ich habe meinen Schlüssel gesucht, obwohl er direkt vor mir lag – echte Tomaten auf den Augen!",
        tip: "Pluralform von 'das Auge'."
      },
      {
        id: "red-7",
        prefix: "Bei dem schweren Glatteisunfall ist niemandem etwas passiert – da haben alle echtes",
        gapPlaceholder: "Nomen",
        suffix: "gehabt!",
        correctAnswer: "Schwein",
        acceptableAnswers: ["Schwein", "schwein"],
        options: ["Schwein", "Pferd", "Huhn", "Glückchen"],
        collocation: "Schwein haben",
        meaning: "großes, unerwartetes Glück im Unglück haben",
        example: "Der Zug hatte Verspätung, so haben wir ihn noch erwischt. Da hatten wir Schwein!",
        tip: "Typisch deutsche umgangssprachliche Wendung für Glück (das Schwein)."
      },
      {
        id: "red-8",
        prefix: "Deine Vermutung stimmt leider überhaupt nicht, du bist völlig auf dem",
        gapPlaceholder: "Nomen",
        suffix: "unterwegs.",
        correctAnswer: "Holzweg",
        acceptableAnswers: ["Holzweg", "holzweg"],
        options: ["Holzweg", "Umweg", "Irrweg", "Waldweg"],
        collocation: "auf dem Holzweg sein",
        meaning: "sich gründlich irren oder eine falsche Schlussfolgerung ziehen",
        example: "Wer glaubt, Deutsch lerne sich von allein, ist auf dem Holzweg.",
        tip: "Zusammengesetztes Nomen: das Holz + der Weg = der Holzweg."
      },
      {
        id: "red-9",
        prefix: "Mit deiner treffenden Bemerkung hast du den Nagel genau auf den",
        gapPlaceholder: "Nomen",
        suffix: "getroffen.",
        correctAnswer: "Kopf",
        acceptableAnswers: ["Kopf", "kopf"],
        options: ["Kopf", "Punkt", "Boden", "Tisch"],
        collocation: "den Nagel auf den Kopf treffen",
        meaning: "etwas ganz genau und treffend benennen oder beschreiben",
        example: "Ihre Erklärung traf den Nagel auf den Kopf.",
        tip: "Maskulines Substantiv: der Kopf (Akkusativ: auf den Kopf)."
      },
      {
        id: "red-10",
        prefix: "Nur weil die erste Bewerbung abgelehnt wurde, solltest du nicht gleich die Flinte ins",
        gapPlaceholder: "Nomen",
        suffix: "werfen.",
        correctAnswer: "Korn",
        acceptableAnswers: ["Korn", "korn"],
        options: ["Korn", "Gras", "Feld", "Wasser"],
        collocation: "die Flinte ins Korn werfen",
        meaning: "vorzeitig den Mut verlieren oder entmutigt aufgeben",
        example: "Gib noch nicht auf und wirf nicht gleich die Flinte ins Korn!",
        tip: "Historische Redewendung: ins Korn (das Getreidefeld) werfen."
      },
      {
        id: "red-11",
        prefix: "Weil es sein allererstes Versehen war, wollte der Prüfer noch einmal ein Auge",
        gapPlaceholder: "Verb",
        suffix: ".",
        correctAnswer: "zudrücken",
        acceptableAnswers: ["zudrücken", "zudruecken"],
        options: ["zudrücken", "schließen", "zumachen", "öffnen"],
        collocation: "ein Auge zudrücken",
        meaning: "einen kleineren Fehler wohlwollend nachsehen oder ignorieren",
        example: "Die Lehrerin drückte bei der Verspätung noch ein Auge zu.",
        tip: "Zusammengesetztes trennbares Verb: 'zudrücken'."
      },
      {
        id: "red-12",
        prefix: "Als die Mitarbeiter von der plötzlichen Werksschließung erfuhren, fielen sie aus allen",
        gapPlaceholder: "Nomen",
        suffix: ".",
        correctAnswer: "Wolken",
        acceptableAnswers: ["Wolken", "wolken"],
        options: ["Wolken", "Himmeln", "Träumen", "Sternen"],
        collocation: "aus allen Wolken fallen",
        meaning: "völlig überrascht und schockiert über eine Nachricht sein",
        example: "Bei der Bekanntgabe des Ergebnisses fiel ich aus allen Wolken.",
        tip: "Pluralform von 'die Wolke': aus allen Wolken."
      }
    ]
  },
  {
    id: "adjektive",
    title: "Adjektive mit Präpositionen",
    shortDescription: "Feste Kombinationen von Eigenschaftswörtern und Präpositionen",
    icon: "⭐",
    level: "B1 – B2",
    color: "#8b5cf6",
    exercises: [
      {
        id: "adj-1",
        prefix: "Die Eltern sind unheimlich stolz",
        gapPlaceholder: "Präposition",
        suffix: "die hervorragenden schulischen Leistungen ihrer Tochter.",
        correctAnswer: "auf",
        acceptableAnswers: ["auf"],
        options: ["auf", "über", "für", "an"],
        collocation: "stolz sein auf (+ Akkusativ)",
        meaning: "große Freude und Genugtuung über jemanden oder eine Leistung empfinden",
        example: "Du kannst wirklich stolz auf dich sein!",
        tip: "Verbindet sich stets mit 'auf' gefolgt vom Akkusativ."
      },
      {
        id: "adj-2",
        prefix: "Mit dem neuen Smartphone und der Akkulaufzeit bin ich überaus zufrieden",
        gapPlaceholder: "Präposition",
        suffix: "meiner Kaufentscheidung.",
        correctAnswer: "mit",
        acceptableAnswers: ["mit"],
        options: ["mit", "über", "an", "von"],
        collocation: "zufrieden sein mit (+ Dativ)",
        meaning: "keine Beschwerden haben und glücklich mit einem Zustand sein",
        example: "Sind Sie mit unserem Kundenservice zufrieden?",
        tip: "Verlangt immer die Präposition 'mit' + Dativ."
      },
      {
        id: "adj-3",
        prefix: "Der Wissenschaftler ist fest davon überzeugt,",
        gapPlaceholder: "Präposition",
        suffix: "der Richtigkeit seiner Theorie keinen Zweifel mehr zu lassen.",
        correctAnswer: "von",
        acceptableAnswers: ["von"],
        options: ["von", "über", "an", "mit"],
        collocation: "überzeugt sein von (+ Dativ)",
        meaning: "keinerlei Zweifel an einer Tatsache haben",
        example: "Ich bin fest von ihrem Erfolg überzeugt.",
        tip: "Adjektiv 'überzeugt' verlangt 'von' + Dativ."
      },
      {
        id: "adj-4",
        prefix: "Ohne eigenes Auto ist man auf dem Land stark angewiesen",
        gapPlaceholder: "Präposition",
        suffix: "den öffentlichen Nahverkehr.",
        correctAnswer: "auf",
        acceptableAnswers: ["auf"],
        options: ["auf", "an", "zu", "nach"],
        collocation: "angewiesen sein auf (+ Akkusativ)",
        meaning: "Hilfe oder Unterstützung von jemandem oder etwas zwingend benötigen",
        example: "Wir sind auf die finanzielle Unterstützung der Förderer angewiesen.",
        tip: "'angewiesen sein auf' + Akkusativ."
      },
      {
        id: "adj-5",
        prefix: "Die Studentin ist sehr interessiert",
        gapPlaceholder: "Präposition",
        suffix: "zeitgenössischer deutscher Literatur und Kunst.",
        correctAnswer: "an",
        acceptableAnswers: ["an"],
        options: ["an", "für", "mit", "über"],
        collocation: "interessiert sein an (+ Dativ)",
        meaning: "großes Interesse an einem Fachgebiet oder Thema haben",
        example: "Sind Sie an einer Mitgliedschaft in unserem Verein interessiert?",
        tip: "Achtung: 'sich interessieren FÜR' (Akk), aber 'interessiert sein AN' (Dat)!"
      },
      {
        id: "adj-6",
        prefix: "Wir sind allen Helferinnen und Helfern überaus dankbar",
        gapPlaceholder: "Präposition",
        suffix: "ihre unermüdliche Unterstützung bei den Aufräumarbeiten.",
        correctAnswer: "für",
        acceptableAnswers: ["für", "fuer"],
        options: ["für", "über", "an", "mit"],
        collocation: "dankbar sein für (+ Akkusativ)",
        meaning: "Dankbarkeit für eine Handlung oder Sache empfinden",
        example: "Ich bin dir für deinen wertvollen Rat sehr dankbar.",
        tip: "'dankbar sein' verlangt 'für' + Akkusativ für die Sache."
      },
      {
        id: "adj-7",
        prefix: "Das gesamte Publikum war nach dem Konzert restlos begeistert",
        gapPlaceholder: "Präposition",
        suffix: "der mitreißenden Darbietung des Orchesters.",
        correctAnswer: "von",
        acceptableAnswers: ["von"],
        options: ["von", "über", "an", "für"],
        collocation: "begeistert sein von (+ Dativ)",
        meaning: "volle Begeisterung und Faszination für etwas empfinden",
        example: "Alle waren von der neuen Produktidee begeistert.",
        tip: "Feste Verbindung: 'begeistert sein' + 'von' + Dativ."
      },
      {
        id: "adj-8",
        prefix: "Frau Schmidt ist ab diesem Monat hauptverantwortlich und zuständig",
        gapPlaceholder: "Präposition",
        suffix: "die Betreuung der internationalen Austauschstudenten.",
        correctAnswer: "für",
        acceptableAnswers: ["für", "fuer"],
        options: ["für", "an", "zu", "über"],
        collocation: "zuständig sein für (+ Akkusativ)",
        meaning: "die behördliche oder fachliche Verantwortung für etwas tragen",
        example: "Wer ist in dieser Abteilung für die IT-Sicherheit zuständig?",
        tip: "Verbindet sich stets mit 'für' + Akkusativ."
      },
      {
        id: "adj-9",
        prefix: "Mit ausreichend Konzentration und Ausdauer ist der Mensch fähig",
        gapPlaceholder: "Präposition",
        suffix: "außergewöhnlichen Höchstleistungen.",
        correctAnswer: "zu",
        acceptableAnswers: ["zu"],
        options: ["zu", "für", "an", "nach"],
        collocation: "fähig sein zu (+ Dativ)",
        meaning: "die geistige oder physische Kraft besitzen, etwas zu vollbringen",
        example: "Sie ist zu großen Leistungen fähig.",
        tip: "Adjektiv 'fähig' verlangt die Präposition 'zu' + Dativ."
      },
      {
        id: "adj-10",
        prefix: "Die Einheimischen waren sehr überrascht",
        gapPlaceholder: "Präposition",
        suffix: "den ungewöhnlich frühen Wintereinbruch im Oktober.",
        correctAnswer: "über",
        acceptableAnswers: ["über", "ueber"],
        options: ["über", "von", "an", "auf"],
        collocation: "überrascht sein über (+ Akkusativ)",
        meaning: "durch ein unerwartetes Ereignis in Erstaunen versetzt werden",
        example: "Wir waren über das hervorragende Wahlergebnis überrascht.",
        tip: "'überrascht sein' steht mit 'über' + Akkusativ (oder seltener mit 'von' + Dativ)."
      },
      {
        id: "adj-11",
        prefix: "Er war nach der ungerechtfertigten Kritik verständlicherweise wütend",
        gapPlaceholder: "Präposition",
        suffix: "seinen Vorgesetzten.",
        correctAnswer: "auf",
        acceptableAnswers: ["auf"],
        options: ["auf", "über", "an", "gegen"],
        collocation: "wütend sein auf (+ Akkusativ)",
        meaning: "großen Zorn gegenüber einer Person verspüren",
        example: "Sei bitte nicht wütend auf mich, es war keine Absicht.",
        tip: "Merke: 'wütend sein AUF' eine Person (Akk), aber 'wütend sein ÜBER' eine Sache (Akk)."
      },
      {
        id: "adj-12",
        prefix: "Die Grundschüler sind inzwischen vollkommen",
        gapPlaceholder: "Präposition",
        suffix: "den Umgang mit digitalen Medien gewöhnt.",
        correctAnswer: "an",
        acceptableAnswers: ["an"],
        options: ["an", "zu", "auf", "mit"],
        collocation: "gewöhnt sein an (+ Akkusativ)",
        meaning: "an eine Gegebenheit oder Situation angepasst sein",
        example: "Wir sind an das raue norddeutsche Klima gewöhnt.",
        tip: "Adjektivische Fügung: 'gewöhnt sein' + 'an' + Akkusativ."
      }
    ]
  }
];
