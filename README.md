# Summer School Musicology 2026 · Research Data Workflows and LLMs

Gemeinsame Lehrwebsite für Christophers vier Sessions am 16. und 17. September 2026. Sie verbindet aktuelle Google Slides und Lecture Notes mit Übungsdateien und dem IIIF-Viewer.

**Website:** https://chpollin.github.io/summer-school-musicology-2026/

## Struktur

- `index.html`: Einstieg und vier Sessions.
- `sessions/session-1.html` bis `session-4.html`: eigene Seiten mit eingebetteten Slides, Skripten, Exportlinks und Materialien.
- `materials/`: zentrale Übersicht der Dokumente und Downloads.
- `tools/iiif-viewer/`: XML-/IIIF-Dateiauswahl und Mirador.
- `downloads/`: Python-/IIIF-Paket und PDF-zu-Bildern-Übung.
- `scripts/build-site.mjs`: erzeugt die statischen Kursseiten aus dem dort gepflegten Materialverzeichnis.

## Materialquellen

Die Titel und IDs der vier aktuellen Decks und Skripten wurden am 15. September 2026 im Google-Drive-Kursordner abgeglichen. Insbesondere Session 3 und 4 verwenden die am 14. September neu angelegten Decks. Das frühere gemeinsame Skriptum ist inzwischen das Skript von Session 1; Sessions 2–4 haben eigene Dokumente.

Google Drive bleibt der Bearbeitungsort. Einbettungen und PDF-/Office-Exportlinks zeigen auf die jeweiligen aktuellen Google-Dokumente. Die Website verändert deren Freigaben nicht. Weitere Quelldateien bleiben in ihren vorhandenen Drive-Übungsordnern verlinkt.

Kursordner: https://drive.google.com/drive/folders/1TaqB-BvNt20uAvOCCnQMQBk_2cV0gLjW

Das PDF-Übungspaket stammt aus dem im Vault gepflegten Lehrpaket „PDF pages as images“. Sein README dokumentiert die Bildquelle, CC-BY-Angabe und Ableitung des PDFs. Das IIIF-Paket enthält synthetische Beispielbilder.

## IIIF-Viewer

Der Viewer akzeptiert das vereinfachte Projekt-XML im Namespace `http://gams.uni-graz.at/viewer` oder das mitgelieferte Python-erzeugte IIIF-Presentation-3-Manifest sowie JPEG-/PNG-Bilder. Er verarbeitet die ausgewählten Dateien ausschließlich im Browser. Bildadressen werden durch temporäre Blob-Adressen ersetzt; fremde Ressourcen aus Manifesten werden nicht geladen. Die Dateiauswahl veröffentlicht kein dauerhaft erreichbares Objekt.

Die Lehrtransformation flacht `div`-Gruppen in eine Seitenfolge ab. Sie erzeugt weder METS noch einen produktiven GAMS-Ingest. Historische Richtigkeit wird nicht automatisch geprüft. Mirador 3.3.0 und seine Lizenzhinweise liegen unter `tools/iiif-viewer/vendor/`.

## Weiterentwicklung und Veröffentlichung

Die Kursseiten werden bei Änderungen am Materialverzeichnis mit `node scripts/build-site.mjs` neu erzeugt. Die generierten HTML-Dateien werden mit versioniert. GitHub Pages veröffentlicht den Repository-Root von `main`; ein Build auf GitHub ist nicht nötig.

Das frühere Repository `chpollin/xml-iiif-workshop` bleibt als Weiterleitung zum neuen Viewer erhalten. Bereits ausgegebene Downloadlinks bleiben erreichbar.

## Herkunft

Christopher Pollin hat die Lehrwebsite und die Dateiverarbeitung mit GPT-6 Astra in Codex entwickeln lassen. Die Bildanzeige übernimmt der bestehende Open-Source-Viewer Mirador. Die Kurstexte und Dokumente stammen aus den zugehörigen Lehrmaterialien.

- https://github.com/ProjectMirador/mirador/tree/v3.3.0
- https://iiif.io/api/cookbook/recipe/0009-book-1/
