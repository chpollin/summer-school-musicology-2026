# Summer School Musicology 2026 · Research Data Workflows and LLMs

Kurswebsite für die vier Sessions von Christopher Pollin an der Summer School „Gender – Knowledge – Mobility. Digital Perspectives in Musicology“ der Kunstuniversität Graz am 16. und 17. September 2026. Die Seite verbindet Folien und Lecture Notes auf Google Drive mit den Übungsdownloads und den Hands-on-Werkzeugen. Sessions 3 und 4 teilen sich ein Deck, ein Skript und einen Abschnitt auf der Kursseite.

Website: https://chpollin.github.io/summer-school-musicology-2026/

Kursordner auf Google Drive: https://drive.google.com/drive/folders/1TaqB-BvNt20uAvOCCnQMQBk_2cV0gLjW

## Aufbau

- `index.html` ist die Kursseite mit einer Zeile pro Session, links das Titelbild, rechts Titel, Lernziele, Material- und Downloadbereich, am Ende ein Abschnitt Tools.
- `sessions/` und `materials/` enthalten Weiterleitungsstubs für früher verteilte Adressen. `materials/m3gim-fulltext.html` führt zur TEI-Übung in Session 2, ihr Anker `#next-session` zum Abschlussprojekt.
- `tools/iiif-viewer/` zeigt eine XML-Beschreibung oder ein IIIF-Presentation-3-Manifest samt Bildern in Mirador, vollständig im Browser. `build_manifest.py` darin ist die Lehrtransformation, die Teilnehmende selbst ausführen.
- `tools/mobility-starter/` ist das Referenzbeispiel für die Mobilitäts-CSV.
- `downloads/` enthält ein Materialpaket pro Session, die Einzeldateien und älteren Pakete, aus denen sie gebaut werden, sowie zu jedem abgeleiteten Artefakt einen Herkunftsnachweis.
- `assets/` enthält Stylesheet, Favicon, die Titelfolien unter `assets/slides/` und die Titelillustrationen mit ihren Generierungsprompts unter `assets/illustrations/`.
- `scripts/` enthält die Datenquelle `sessions.mjs` und die Generatoren, siehe Befehle.
- `knowledge/` hält das Projektwissen nach der Promptotyping-Konvention, Einstieg über `knowledge/INDEX.md`.

## Materialien

Folien und Lecture Notes bleiben native Google Slides und Docs auf Drive. Die Seite verlinkt Vorschau und PDF-Export und versioniert nur das Titelbild jedes Decks. Das ältere Session-4-Deck und sein Reader liegen unverändert im Drive-Ordner [Superseded Materials](https://drive.google.com/drive/folders/1HqmFO4TNbQmGIH8JBFc_Ua780GcYqaxV).

Session 1 arbeitet mit der Schulnachricht als Quelle für XML, IIIF, TEI und RDF. Das Sessionpaket enthält das Bild und den IIIF-Übungsordner.

Session 2 beginnt die TEI-Übung mit einem Dokument aus den Ira-Malaniuk-Materialien des Archivs der Kunstuniversität Graz (UAKUG, Bestand NIM) in einem LLM-Chat mit PDF- oder Bildunterstützung. Das Sessionpaket enthält PDFs, vorbereitete PNGs und die Anleitung. `downloads/m3gim-fulltext/` hält die vollständige Lehrableitung mit redigierten Volltexten, Metadaten, TEI-Dateien, Prompts, Schema und lokalem Prüfer. Die Rohtranskriptionen stammen aus einem Demonstrationslauf des M³GIM-Projekts vom 8. September 2026 mit dem Modell `gemini-3.8-flash`. Die redigierte Referenz ist eine eigenständige Lehrableitung und keine kritische Edition.

Sessions 3 und 4 beginnen mit `downloads/m3gim-mobility-starter.csv`, einer kleinen Auswahl belegter Ortsangaben, in einem AI Harness. Das Abschlussprojekt bietet zwei Wege, eine Edition aus PDFs über TEI XML oder ein Forschungsdashboard aus dem vollständigen veröffentlichten M³GIM-Graphen in `downloads/m3gim-dataset.jsonld`. Beide Wege arbeiten mit Promptotyping über drei Wissensdokumente und laufen mit reinem HTML, CSS und JavaScript über einen lokalen statischen Server. `downloads/m3gim-fulltext/NEXT-SESSION.md` beschreibt die Materialien beider Wege.

`downloads/shared/` enthält ergänzende Quellen und Prompts für selbständiges Arbeiten, darunter zwei Faksimiles aus Stefan Zweig Digital mit Herkunftsnachweis. Die PDF-Konvertierungspakete `python-vscode.zip` und `ai-harness.zip` bereiten den Übergang von eigener Skriptausführung über einen Agenten zum Programmieren mit einem LLM vor.

## Befehle

Seitengenerierung mit Node ohne Abhängigkeiten:

```
node scripts/build-site.mjs            # index.html, Viewer-Seite und Weiterleitungsstubs erzeugen
node scripts/build-site.mjs --check    # rendern ohne zu schreiben, Abbruch bei Drift oder toten lokalen Links
node scripts/fetch-title-slides.mjs    # Titelfolien nach einer Deckänderung neu holen
```

Downloadpakete und Lehrdaten mit Python, aus dem Repository-Root:

```
uv run scripts/build-m3gim-tei.py        # TEI, CSV, Anleitungen und die m3gim-fulltext-ZIPs
python scripts/build-shared-packages.py  # Sessionpakete und gemeinsame Archive, Hashes in drive-materials.json
python scripts/build-mobility-starter.py # Starter-CSV und Daten des Referenzbeispiels
python scripts/build-m3gim-dataset.py    # gepinnten JSON-LD-Snapshot prüfen oder neu holen
```

Generierte Seiten, Titelbilder und ZIPs sind versioniert und werden nie von Hand bearbeitet. Nach einer Änderung an `scripts/sessions.mjs` wird gebaut und `--check` ist das Abnahmetor vor einem Commit. GitHub Pages veröffentlicht den Repository-Root von `main` ohne Build.

## Lizenzen und Herkunft

Code steht unter MIT (`LICENSE`), Texte und Lehrmaterial unter CC BY 4.0 (`LICENSE-CONTENT.md`). Material Dritter behält seine Bedingungen, benannt in `LICENSE-CONTENT.md`, darunter Mirador 3.3.0 unter `tools/iiif-viewer/vendor/` und die UAKUG/NIM-Scans.

Die Website und die Dateiverarbeitung wurden mit GPT-6 Astra in Codex und mit Claude Code entwickelt. Das frühere Repository `chpollin/xml-iiif-workshop` leitet auf den neuen Viewer weiter.

- https://github.com/ProjectMirador/mirador/tree/v3.3.0
- https://iiif.io/api/cookbook/recipe/0009-book-1/
