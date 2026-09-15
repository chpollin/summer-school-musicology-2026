# Summer School Musicology 2026 · Research Data Workflows and LLMs

Gemeinsame Lehrwebsite für Christophers vier Sessions am 16. und 17. September 2026. Sie verbindet aktuelle Google Slides und Lecture Notes mit Übungsdateien und dem IIIF-Viewer.

**Website:** https://chpollin.github.io/summer-school-musicology-2026/

## Struktur

- `index.html`: die Kursseite mit Sessionübersicht (Titelfolien als Bilder), einem Abschnitt je Session mit Slides, Skript, Exportlinks und Materialien sowie dem Downloadbereich.
- `materials/m3gim-fulltext.html`: die M³GIM-Übung; `sessions/` und `materials/index.html` sind Weiterleitungen auf die Anker der Kursseite.
- `tools/iiif-viewer/`: XML-/IIIF-Dateiauswahl und Mirador.
- `downloads/`: Python-/IIIF-Paket, PDF-zu-Bildern-Übung und M³GIM-Paket.
- `assets/`: Stylesheet, Favicon und die Titelfolien unter `assets/slides/`.
- `scripts/sessions.mjs`: das Materialverzeichnis der Sessions; `scripts/build-site.mjs` erzeugt daraus alle Seiten, `--check` prüft Drift und lokale Links; `scripts/fetch-title-slides.mjs` holt die Titelfolien; `scripts/build-iiif-package.py` packt das IIIF-Paket.
- `knowledge/`: Projektwissen nach der Promptotyping-Konvention, Einstieg über `knowledge/INDEX.md`.

## Materialquellen

Die Titel und IDs der vier aktuellen Decks und Skripten wurden am 15. September 2026 im Google-Drive-Kursordner abgeglichen. Insbesondere Session 3 und 4 verwenden die am 14. September neu angelegten Decks. Das frühere gemeinsame Skriptum ist inzwischen das Skript von Session 1; Sessions 2–4 haben eigene Dokumente.

Google Drive bleibt der Bearbeitungsort. Einbettungen und PDF-/Office-Exportlinks zeigen auf die jeweiligen aktuellen Google-Dokumente. Die Website verändert deren Freigaben nicht. Weitere Quelldateien bleiben in ihren vorhandenen Drive-Übungsordnern verlinkt.

Kursordner: https://drive.google.com/drive/folders/1TaqB-BvNt20uAvOCCnQMQBk_2cV0gLjW

Das PDF-Übungspaket stammt aus dem im Vault gepflegten Lehrpaket „PDF pages as images“. Sein README dokumentiert die Bildquelle, CC-BY-Angabe und Ableitung des PDFs. Das IIIF-Paket enthält synthetische Beispielbilder.

## M³GIM-Übung: Faksimiles, Metadaten und TEI

Die Übung unter `materials/m3gim-fulltext.html` schließt in Session 2 an „Prompting Strategies“ an. Sie führt von sieben PDFs mit 40 Scanseiten über Volltext und Metadaten zu sieben einfachen TEI-Dokumenten. Das Paket enthält PNGs, Konverter, drei Prompts, eine TEI-Vorlage, eine Anleitung und fünf englische Folientexte mit Sprechhinweisen. Session 3 greift die erzeugten TEI-Dateien und Bilder auf.

`downloads/m3gim-fulltext/` enthält die Downloads. Die PDFs stammen aus den bereitgestellten UAKUG/NIM-Materialien; die PNGs wurden mit dem mitgelieferten Konverter neu erzeugt. Die Rohtranskriptionen stammen aus dem bestehenden M³GIM-Demonstrationslauf vom 8. September 2026. Der Lauf zeichnet `gemini-3.8-flash` als Modellkennung auf. Im Lehrpaket werden keine API-Protokolle veröffentlicht.

Die redigierte Referenz enthält alle 40 Scanseiten. Codex hat alle Bilder auf Vollständigkeit und Layout gesichtet, einzelne Lesungen korrigiert und die Besetzungstabelle aus Dokument _11 zeilenweise rekonstruiert. Das Korrekturprotokoll unterscheidet diese Prüfung von einer ausstehenden fachlichen Abnahme als kritische Edition. Quellenvarianten und unsichere Lesungen bleiben erhalten. Das Paket ist eine eigenständige Lehrableitung; es ändert das Editionsprojekt nicht.

Die Metadaten in `metadata.json` dokumentieren Titel, Sprachen, Dokumenttyp, Datum und Datumsart, Ort, gegebenenfalls Verlag, Kennung und Umfang mit Quellenbelegen. Angekündigte Aufführungen bleiben von Publikationsdaten unterschieden. Die TEI-Dateien erhalten den redigierten Volltext einschließlich der Unsicherheitszeichen. `pb/@facs` verbindet jede Scanseite mit dem passenden PNG.

Die Seitentexte liegen in `scripts/m3gim-exercise.mjs`, die Lehrtexte im Downloadordner. Nach Änderungen zuerst `uv run scripts/build-m3gim-tei.py`, dann `node scripts/build-site.mjs` ausführen. Der erste Schritt erzeugt TEI und CSV und aktualisiert Anleitungs-, Referenz- und Folgepaket. Rohtranskriptionen liest er aus dem bestehenden Referenzarchiv; die PNGs aus dem bestehenden Bildarchiv.

`m3gim-next-session.zip` enthält die vollständige Ordnerstruktur mit sieben TEI-Dateien, 40 PNGs, Metadaten und lokalem Prüfer. Die TEI-Dateien wurden gegen TEI Lite 4.12.0 validiert. Ein Text-Roundtrip bestätigte die vollständige Erhaltung aller 40 Scanseiten; im entpackten Paket wurden sämtliche Bildpfade geprüft. Der mitgelieferte Prüfer weist kaputtes XML und falsche Bildzuordnungen ab. Die fachliche Prüfung von Transkription und Metadaten bleibt von diesen technischen Checks getrennt.

## IIIF-Viewer

Der Viewer akzeptiert das vereinfachte Projekt-XML im Namespace `http://gams.uni-graz.at/viewer` oder das mitgelieferte Python-erzeugte IIIF-Presentation-3-Manifest sowie JPEG-/PNG-Bilder. Er verarbeitet die ausgewählten Dateien ausschließlich im Browser. Bildadressen werden durch temporäre Blob-Adressen ersetzt; fremde Ressourcen aus Manifesten werden nicht geladen. Die Dateiauswahl veröffentlicht kein dauerhaft erreichbares Objekt.

Die Lehrtransformation flacht `div`-Gruppen in eine Seitenfolge ab. Sie erzeugt weder METS noch einen produktiven GAMS-Ingest. Historische Richtigkeit wird nicht automatisch geprüft. Mirador 3.3.0 und seine Lizenzhinweise liegen unter `tools/iiif-viewer/vendor/`.

## Weiterentwicklung und Veröffentlichung

Die Kursseiten werden bei Änderungen am Materialverzeichnis mit `node scripts/build-site.mjs` neu erzeugt; `node scripts/build-site.mjs --check` prüft vor einem Commit, dass die versionierten Seiten dem Skript entsprechen und alle lokalen Links auflösen. Nach einer Änderung an einem Deck holt `node scripts/fetch-title-slides.mjs` die Titelfolien neu. Die generierten HTML-Dateien und Titelbilder werden mit versioniert. Lizenzen: Code MIT (`LICENSE`), Texte und Lehrmaterial CC BY 4.0 (`LICENSE-CONTENT.md`). GitHub Pages veröffentlicht den Repository-Root von `main`; ein Build auf GitHub ist nicht nötig.

Das frühere Repository `chpollin/xml-iiif-workshop` bleibt als Weiterleitung zum neuen Viewer erhalten. Bereits ausgegebene Downloadlinks bleiben erreichbar.

## Herkunft

Christopher Pollin hat die Lehrwebsite und die Dateiverarbeitung mit GPT-6 Astra in Codex entwickeln lassen. Die Bildanzeige übernimmt der bestehende Open-Source-Viewer Mirador. Die Kurstexte und Dokumente stammen aus den zugehörigen Lehrmaterialien.

- https://github.com/ProjectMirador/mirador/tree/v3.3.0
- https://iiif.io/api/cookbook/recipe/0009-book-1/
