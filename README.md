# Summer School Musicology 2026 · Research Data Workflows and LLMs

Gemeinsame Lehrwebsite für Christophers vier Sessions am 16. und 17. September 2026. Session 3 und 4 verwenden einen gemeinsamen Foliensatz und gemeinsame Lecture Notes. Die Website verbindet die Lehrmaterialien mit direkten Übungsdownloads und dem IIIF-Viewer.

**Website:** https://chpollin.github.io/summer-school-musicology-2026/

## Struktur

- `index.html`: die Kursseite mit je einer Sessionzeile aus Titelbild links und Informationen rechts, mobil untereinander, sowie einem Downloadbereich direkt bei jeder Session.
- `materials/m3gim-fulltext.html`, `sessions/` und `materials/index.html`: Weiterleitungen auf die Kursseite. Die frühere M³GIM-URL führt zu Session 2, ihr Anker `#reference` zu den optionalen Referenzen und `#next-session` zu Session 3.
- `tools/iiif-viewer/`: XML-/IIIF-Dateiauswahl und Mirador.
- `downloads/`: Python-/IIIF-Paket, PDF-zu-Bildern-Übung und M³GIM-Paket.
- `assets/`: Stylesheet, Favicon und die Titelfolien unter `assets/slides/`; die neuen Illustrationen und ihre Generierungsprompts liegen unter `assets/illustrations/`.
- `scripts/sessions.mjs`: das Materialverzeichnis der Sessions; `scripts/build-site.mjs` erzeugt daraus alle Seiten, `--check` prüft Drift und lokale Links; `scripts/fetch-title-slides.mjs` holt die Titelfolien; `scripts/build-iiif-package.py` packt das IIIF-Paket.
- `knowledge/`: Projektwissen nach der Promptotyping-Konvention, Einstieg über `knowledge/INDEX.md`.

## Materialquellen

Session 3 beginnt mit der unveränderten Mobilitäts-CSV aus Session 2. `downloads/m3gim-harness-exercise.txt` enthält zwei Prompts für Datenanalyse und einfache statische Timeline sowie Startbefehle für die lokale Vorschau. Ein leerer Ordner mit CSV genügt; zusätzliche Wissensdokumente sind für diesen Einstieg nicht erforderlich. Die TEI-Webpublikation folgt als Vertiefung. Die PDF-Konvertierungspakete stehen unter den optionalen Materialien.

Die Titel und IDs wurden am 15. September 2026 im Google-Drive-Kursordner abgeglichen. Session 1 und 2 haben eigene Decks und Skripten. Session 3 und 4 verwenden das bestehende gemeinsame Deck und das zusammengeführte Skript unter der bisherigen Session-3-Dokument-ID. Jede Session erscheint einmal mit Titelbild, knapper Überschrift, direkten Materiallinks und flachen Übungstexten. Abstände ersetzen Trennlinien. Jede Session zeigt zwei bis drei zentrale Downloads in einer violetten Fläche mit Downloadsymbol; zusätzliche Materialien lassen sich aufklappen. Untertitel und Sprungbuttons im Seitenkopf entfallen. Der Footer enthält Autor, Lizenzen und Quellcode. Uhrzeiten und separate Datumszeilen entfallen. Session 3 führt eine aufbauende Übung an; Session 4 geht in selbständiges Arbeiten über. Das gemeinsame Hauptziel lautet „Use LLMs for coding and build small research tools through Promptotyping“. Knowledge Engineering, Context Engineering und Agentic Engineering bilden den begrifflichen Rahmen. Die angeleitete Übung erstellt eine kleine statische Webpublikation aus TEI-Dateien und Bildern. Der offizielle Veranstaltungsname steht im responsiven Header; Slides und Lecture Notes bilden jeweils eine kompakte Gruppe mit zugeordnetem PDF-Link.

Google Drive bleibt der Bearbeitungsort der nativen Dokumente. Vorschau- und PDF-Exportlinks zeigen auf die aktuellen Google-Dokumente. Die Website verändert deren Freigaben nicht. Die gespeicherten Übungsdateien aus den Unterordnern liegen zusätzlich als direkte Downloads vor. `downloads/drive-materials.json` dokumentiert ihre Herkunft. Die Programm-PDFs aus beiden Hands-on-Ordnern wurden per SHA-256 mit den bestehenden lokalen PDFs verglichen und stimmen bytegenau überein.

`downloads/python-vscode.zip` und `downloads/ai-harness.zip` enthalten jeweils Anleitung, unverändertes Python-Skript und die sieben PDFs im Unterordner `input/`. Die Anleitungen erläutern den Übergang von eigener Skriptausführung über die Ausführung durch einen Agenten zum Programmieren mit einem LLM. Sie sind in Drive und den ZIPs bytegleich. Der Konverter wurde mit allen sieben PDFs ausgeführt und erzeugte 40 PNG-Seiten ohne Fehler.

`downloads/shared-materials.zip` enthält fünf Materialien des Drive-Datenordners sowie die beiden Zweig-Faksimiles und deren Herkunftsnachweis. Sie sind außerdem einzeln unter `downloads/shared/` erreichbar. Das separate Kartenbeispiel wurde auf Nutzerwunsch aus Kursdownloads und Sammelpaket entfernt. Die Mobilitätsaufgabe in Session 2 und die Exploration des M³GIM-Prototyps bleiben erhalten. Die Schulnachricht trägt die Endung `.jpg`, weil die in Drive als `.png` benannte Datei JPEG-Daten enthält. Bei der XLSX-Datei wurde ausschließlich das defekte Theme ersetzt; die Reparatur ist in `downloads/drive-materials.json` dokumentiert. Die ursprünglichen Drive-Dateien bleiben erhalten. Ergänzende Quellen und Extraktionsprompts dienen der selbständigen Arbeit.

`scripts/build-shared-packages.py` erzeugt die gemeinsamen Archive aus ihren lokalen Quellen mit festen Zeitstempeln. Die aktualisierten Python- und AI-Harness-Anleitungen wurden unter ihren bestehenden Drive-IDs gespeichert und anschließend mit den lokalen Dateien und ZIP-Inhalten bytegenau verglichen.

`downloads/m3gim-jsonld-example.jsonld` ergänzt den Ausschnitt auf der vorhandenen M³GIM-Workflowfolie um einen vollständigen Kontext. Der begleitende Herkunftsnachweis beschreibt den ausgewählten Datensatz und die Grenzen des Ausschnitts. Eine JSON-LD-Expansion prüft seine Begriffsauflösung; die Ortsbeziehung allein belegt keinen Auftritt Malaniuks.

Die aktuellen Drive-Dateien tragen einheitliche Session- und Materialbezeichnungen. Das frühere Session-4-Deck und dessen Reader liegen unverändert im benachbarten Ordner [Superseded Materials](https://drive.google.com/drive/folders/1HqmFO4TNbQmGIH8JBFc_Ua780GcYqaxV). Die Kursübersicht zeigt ausschließlich die aktuellen Materialien. Die neuen Titelillustrationen wurden in die vorhandenen Titelfolien von Session 2 und Sessions 3 und 4 eingefügt. Es wurden keine Folien erzeugt.

Kursordner: https://drive.google.com/drive/folders/1TaqB-BvNt20uAvOCCnQMQBk_2cV0gLjW

Das PDF-Übungspaket stammt aus dem im Vault gepflegten Lehrpaket „PDF pages as images“. Sein README dokumentiert die Bildquelle, CC-BY-Angabe und Ableitung des PDFs. Das IIIF-Paket enthält synthetische Beispielbilder.

## M³GIM-Übung: Faksimiles, Metadaten und TEI

Die Übung „From Facsimiles to TEI“ steht mit allen Materialzugängen direkt bei Session 2. Teilnehmende wählen ein oder zwei Dokumente oder alle sieben und können bereits einen AI Harness oder alternativ einen LLM-Chat verwenden. Sie transkribieren originalsprachig, prüfen Volltext und Metadaten und erzeugen TEI. Übersetzung ist optional. Session 3 verwendet ihre TEI-Dateien und Bilder für eine kleine statische Webpublikation; das vollständige Referenzpaket mit sieben Dokumenten und 40 Scanseiten dient als optionaler Rückgriff. Der manuelle PDF-Workflow und sein Agentvergleich bleiben als Einstieg je nach Kenntnisstand erhalten. Eine kurze Exploration des M³GIM-Prototyps führt von konkreten Belegen und fehlenden Daten oder Funktionen zu einer eigenen Anforderung für Session 4.

`downloads/m3gim-fulltext/` enthält die Downloads. Die PDFs stammen aus den bereitgestellten UAKUG/NIM-Materialien; die PNGs wurden mit dem mitgelieferten Konverter neu erzeugt. Die Rohtranskriptionen stammen aus dem bestehenden M³GIM-Demonstrationslauf vom 8. September 2026. Der Lauf zeichnet `gemini-3.8-flash` als Modellkennung auf. Im Lehrpaket werden keine API-Protokolle veröffentlicht.

Die redigierte Referenz enthält alle 40 Scanseiten. Codex hat alle Bilder auf Vollständigkeit und Layout gesichtet, einzelne Lesungen korrigiert und die Besetzungstabelle aus Dokument _11 zeilenweise rekonstruiert. Das Korrekturprotokoll unterscheidet diese Prüfung von einer ausstehenden fachlichen Abnahme als kritische Edition. Quellenvarianten und unsichere Lesungen bleiben erhalten. Das Paket ist eine eigenständige Lehrableitung; es ändert das Editionsprojekt nicht.

Die Metadaten in `metadata.json` dokumentieren Titel, Sprachen, Dokumenttyp, Datum und Datumsart, Ort, gegebenenfalls Verlag, Kennung und Umfang mit Quellenbelegen. Angekündigte Aufführungen bleiben von Publikationsdaten unterschieden. Die TEI-Dateien erhalten den redigierten Volltext einschließlich der Unsicherheitszeichen. `pb/@facs` verbindet jede Scanseite mit dem passenden PNG.

Die Übungstexte der Hauptseite liegen in `scripts/build-site.mjs`, das Materialverzeichnis in `scripts/sessions.mjs` und die ausführlichen Lehrtexte im Downloadordner. Nach Änderungen zuerst `uv run scripts/build-m3gim-tei.py`, dann `node scripts/build-site.mjs` ausführen. Der erste Schritt erzeugt TEI und CSV und aktualisiert Anleitungs-, Referenz- und Folgepaket. Rohtranskriptionen liest er aus dem bestehenden Referenzarchiv; die PNGs aus dem bestehenden Bildarchiv.

`m3gim-next-session.zip` enthält die vollständige Ordnerstruktur mit sieben TEI-Dateien, sieben redigierten TXT-Dateien, 40 PNGs, Metadaten und lokalem Prüfer. Die TEI-Dateien wurden gegen TEI Lite 4.12.0 validiert. Ein Text-Roundtrip bestätigte die vollständige Erhaltung aller 40 Scanseiten; im entpackten Paket wurden sämtliche Bildpfade geprüft. Der mitgelieferte Prüfer akzeptiert eine vollständige Auswahl von einem oder mehreren Dokumenten. `--full-corpus` verlangt alle sieben. Leere Bestände, kaputtes XML und fehlende Bilder werden zurückgewiesen. Die fachliche Prüfung von Transkription und Metadaten bleibt von diesen technischen Checks getrennt.

## IIIF-Viewer

Der Viewer akzeptiert das vereinfachte Projekt-XML im Namespace `http://gams.uni-graz.at/viewer` oder das mitgelieferte Python-erzeugte IIIF-Presentation-3-Manifest sowie JPEG-/PNG-Bilder. Er verarbeitet die ausgewählten Dateien ausschließlich im Browser. Bildadressen werden durch temporäre Blob-Adressen ersetzt; fremde Ressourcen aus Manifesten werden nicht geladen. Die Dateiauswahl veröffentlicht kein dauerhaft erreichbares Objekt.

Die Lehrtransformation flacht `div`-Gruppen in eine Seitenfolge ab. Sie erzeugt weder METS noch einen produktiven GAMS-Ingest. Historische Richtigkeit wird nicht automatisch geprüft. Mirador 3.3.0 und seine Lizenzhinweise liegen unter `tools/iiif-viewer/vendor/`.

## Weiterentwicklung und Veröffentlichung

Die Kursseiten werden bei Änderungen am Materialverzeichnis mit `node scripts/build-site.mjs` neu erzeugt; `node scripts/build-site.mjs --check` prüft vor einem Commit, dass die versionierten Seiten dem Skript entsprechen und alle lokalen Links auflösen. Nach einer Änderung an einem Deck holt `node scripts/fetch-title-slides.mjs` die Titelfolien neu. Die generierten HTML-Dateien und Titelbilder werden mit versioniert. Lizenzen: Code MIT (`LICENSE`), Texte und Lehrmaterial CC BY 4.0 (`LICENSE-CONTENT.md`). GitHub Pages veröffentlicht den Repository-Root von `main`; ein Build auf GitHub ist nicht nötig.

Das frühere Repository `chpollin/xml-iiif-workshop` bleibt als Weiterleitung zum neuen Viewer erhalten. Bereits ausgegebene Downloadlinks bleiben erreichbar.

## Herkunft

Christopher Pollin hat die Lehrwebsite und die Dateiverarbeitung mit GPT-6 Astra in Codex und mit Claude Code entwickeln lassen. Die Bildanzeige übernimmt der bestehende Open-Source-Viewer Mirador. Die Kurstexte und Dokumente stammen aus den zugehörigen Lehrmaterialien.

- https://github.com/ProjectMirador/mirador/tree/v3.3.0
- https://iiif.io/api/cookbook/recipe/0009-book-1/
