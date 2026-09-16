---
title: Journal
project:
  name: Summer School Musicology 2026
  repository: https://github.com/chpollin/summer-school-musicology-2026
method:
  name: Promptotyping
  url: https://lisa.gerda-henkel-stiftung.de/digitale_geschichte_pollin
status: active
created: 2026-09-15
updated: 2026-09-15
language: en
related: [handoff, project, specification]
---

# Journal

## 2026-09-16 · Alte Mobilitätsdownloads entfernt

Auf Nutzerauftrag verwenden beide Sessions ausschließlich die Starter-CSV. Die frühere 40-Zeilen-Datei und ihr Begleittext wurden gelöscht, aktive Downloadverweise ersetzt und der Zusatzdownload entfernt. Der Ableitungsschritt liest seine historische Eingabe aus Git-Commit f2d0608.

## 2026-09-16 · Vereinfachter Mobilitätsdatensatz

Die Harness-Einstiegsübung verwendet eine abgeleitete Auswahl aus zwölf Aussagen, sechs Dokumenten und drei Orten (Bayreuth, München, Wien; 1952–1957). Originalfelder und IDs bleiben unverändert; date_type und date_status machen dokumentierte Datumsbedeutungen und Unsicherheiten nutzbar. Die gesondert bezeichnete Vorsichtsmarkierung year_requires_review betrifft zwei Folgeereignisse der Anfrage mit erschlossenem Jahr. Originalnotizen werden vollständig zusammengeführt. Die Daten wurden gegen die 40-Zeilen-CSV geprüft, nicht erneut gegen Faksimiles. Die vollständige CSV bleibt in Session 2 und als Zusatzmaterial erhalten. Ein statisches Referenzbeispiel unter tools/mobility-starter zeigt die Auswahl einschließlich überlappender Punkte. Es wird nicht als fertige Lösung im primären Übungsdownload angeboten. Ein Lauf mit Sonnet 5 / Low Effort wurde nicht ausgeführt.

## 2026-09-16 · Harness-Anleitung ausschließlich auf Folien

Auf Nutzerwunsch entfallen die separate TXT-Anleitung und ihr Downloadlink. Die Kursseite stellt die CSV bereit; Prompts und Startanleitung gehören auf die Folien. Die bisherige TXT-Fassung bleibt über Git nachvollziehbar.

## 2026-09-16 · Sessionübersicht auf Lernziele verdichtet

Die vollständigen Sessiontitel und Untertitel folgen den Nutzerangaben. Jede Session zeigt einen beschreibenden Satz und die zugehörigen Lernziele; ausführliche Übungsschritte stehen in den verlinkten Anleitungen. Die doppelte Pflege der Übungstexte im Seitengenerator entfällt. Materiallinks und der Session-4-Anker bleiben erhalten.

## 2026-09-16 · Titel von Session 1

Session 1 trägt auf Nutzerangabe den Titel „Making Estate Materials Digitally Accessible“ und den Untertitel „Research Data Workflows in Stefan Zweig Digital“. Materialverzeichnis und generierte Kursseite wurden entsprechend aktualisiert.

## 2026-09-16 · CSV-Einstieg in den AI Harness

Auf Nutzerauftrag beginnt Session 3 mit einem Ordner und der bestehenden Mobilitäts-CSV. Die neue TXT-Anleitung trennt ausgeführte Python-Analyse und Erstellung einer einfachen HTML/CSS/JavaScript-Timeline in zwei Prompts, ergänzt lokale Startbefehle und Quellenprüfung. Die Downloadnavigation priorisiert CSV und Anleitung; bestehende PDF-Konvertierungsübungen bleiben optional erreichbar. Python bestätigte 40 Zeilen, 40 eindeutige evidence_id, 23 document_id und den Bereich 1952-01-29 bis 1968-11-18. Neun Orts-Schreibweisen entsprechen acht Orten bei Vergleich ohne Groß-/Kleinschreibung. Das gemeinsame Datumsfeld wird über Rollen und Notizen eingeordnet. Seitengenerierung und Prüfung aller acht Seiten einschließlich lokaler Links bestanden.

Curated provenance index of the course website, read alongside `project.md` and `specification.md` for the current state and `handoff.md` for open handover points.

## 2026-09-15 · vereinfacht · Seitenkopf und Downloads pro Session

Auf Nutzerwunsch entfielen der Untertitel und die Sprungbuttons im Seitenkopf. Die Downloads wurden den jeweiligen Sessions zugeordnet: zwei beziehungsweise drei zentrale Pakete bleiben rechts beim Inhalt sichtbar, zusätzliche Materialien lassen sich über native Aufklappelemente öffnen. Die bisherige zentrale Downloadliste und doppelte Paketlinks im Übungstext entfielen. Der alte Downloadanker bleibt erreichbar. Seitengenerierung und lokale Links wurden geprüft; alle drei Aufklappelemente ließen sich mit Enter bedienen. Bei 320 Pixel Breite trat auch mit geöffneten Listen kein horizontaler Überlauf auf.

## 2026-09-15 · bereinigt · Reste des Website-Refactorings

Die Navigation der M³GIM-Übung führt direkt zu den Sessionankern. Ungenutzte CSS-Regeln für frühere Kartenbilder und Folieneinbettungen sowie die drei überholten Titelillustrationen für Sessions 3 und 4 wurden entfernt. Die aktuellen Bilder und Generierungsprompts bleiben erhalten; frühere Bilddateien sind über Git rekonstruierbar. Bereits veröffentlichte Seitenadressen bleiben als Weiterleitungen erreichbar. Der erledigte Linkpunkt wurde aus dem Handoff entfernt und die Spezifikation nachgezogen.

Seitengenerierung, lokale Links und Anker, JavaScript-Syntax und Diff-Prüfung bestanden nach der Bereinigung.

## 2026-09-15 · korrigiert · Laptopdeckel mit M³GIM-Sticker

Die sichtbare Rückseite des Laptops erhielt auf Nutzerwunsch einen M³GIM-Sticker. Die zuvor dort abgebildeten Codezeilen entfielen. Der Nutzer bestätigte die korrigierte Illustration; sie wurde in das vorhandene Titelbildobjekt für Sessions 3 und 4 übernommen. Der frische Folienexport wurde visuell geprüft, die Reihenfolge der 15 vorgefundenen Folien und die übrigen Titelobjekte blieben identisch.

## 2026-09-15 · integriert · Promptotyping-Symbol und programmierende Opernsängerin

Der Nutzer stellte sein kugelförmiges Promptotyping-Symbol als Referenz für die Abbildung von Daten auf Forschungsoberflächen bereit. Die bestehende Illustration für Sessions 3 und 4 wurde daran angepasst. Zwei gekrümmte Flächen bilden Quellen und Forschungsoberfläche ab; dazwischen steht das opake Tentakelmodell. Nach positiver Nutzerbewertung wurde das Notenblatt der Sängerin durch einen Laptop ersetzt, an dem sie selbst programmiert. Die überarbeitete Bildspalte wurde im bestehenden Titelbildobjekt ersetzt. Native Titeltexte, Metadaten und der bei der Mutation vorgefundene Folienbestand blieben unverändert. Die frische Titelfolienexportdatei wurde visuell geprüft. Referenzbeschreibung und Bearbeitungsprompts sind unter `assets/illustrations/` dokumentiert.

Weitere Nutzerkorrekturen führten zur gemeinsamen Darstellung von Titelbild und Sessioninformationen in einer Zeile. Die separate Übersicht entfiel. Horizontale Trennlinien wurden durch Abstände ersetzt, der Footer auf Autor, Lizenz- und Quellcodelinks reduziert. Ein violetter Downloadbereich mit dekorativen Dateisymbolen hebt die Pakete und Referenzen hervor. Die Darstellung wurde auf Desktop und bei 320 Pixel Breite geprüft; Bilder stehen mobil über den Texten, die Seite hat keinen horizontalen Überlauf. Build, lokale Links und bestehende Session-Anker wurden kontrolliert.

## 2026-09-15 · korrigiert · Bildsprache und flache Sessionstruktur

Der Nutzer verwarf die generischen Forschendenbilder und präzisierte die Bildsprache. Die Opernsängerin aus Session 1 ist in den beiden Ersatzbildern die einzige menschliche Figur. Der vorhandene schwarze Kubuskopf mit Tentakeln dient als Motiv für die opake Modellfunktion. Im unteren Bildbereich erscheinen Textgenerierung beziehungsweise Werkzeugbau mit Prüfung und Rückkopplung. Die vollständigen linken Bildspalten der bestehenden Titel wurden ersetzt; die frühere untere Grafik von Sessions 3 und 4 entfiel. Native Titeltexte und Metadaten sowie Folienbestand und Reihenfolge blieben erhalten. Referenzen, Generierung und Korrekturprompts liegen bei den v2-Bildern.

Auf weitere Nutzerkorrektur wurde die Kursseite auf eine Überschrift pro Session reduziert. Uhrzeiten, separate Sessiondatumszeilen, Unterkarten, zusätzliche Vorspanntexte und Folieneinbettungen entfielen. Eine direkte Materialzeile führt zu Slides, Notes und PDF-Exporten. Das Hauptlernziel steht einmal im gewöhnlichen Übungstext. Die aufbauende Übung und der Anker für Session 4 bleiben erhalten. Build und lokale Links wurden geprüft, die neuen Titel und die flache Darstellung im Browser visuell kontrolliert.

## 2026-09-15 · integriert · Übungsfolge, Titelbilder und Materialzugang

Auf Nutzerauftrag wurden Website, gemeinsame Lecture Notes und Hands-on-Anleitungen auf dieselbe Übungsfolge abgestimmt. Eigene Skriptausführung und Agentenausführung bereiten den Bau eines kleinen Forschungswerkzeugs durch Promptotyping vor. Session 4 führt die Arbeit mit einer selbstgewählten Forschungsanforderung fort. Der vorhandene Abschnitt 1.2 mit Quellenanmerkungen [8]–[12] sowie native Fußnoten und Dokumentchips blieben erhalten. Alle elf exportierten Notes-Seiten wurden visuell geprüft. Der Folienchip führt zum gemeinsamen Deck, zeigt jedoch weiterhin seinen von Google zwischengespeicherten früheren Titel.

Die Kursseite erhielt drei kompakte Übersichtskarten und gegliederte Downloads. Zwei mit dem integrierten Imagegen-Werkzeug erzeugte Pop-Art-Illustrationen ergänzen die vorhandenen Titelfolien. Bestehende Titelobjekte blieben unverändert; gleichzeitig erfolgte externe Änderungen innerhalb von Session 2 wurden erhalten. Prompts und Strukturprüfung liegen bei den Bilddateien. Der alte Session-4-Foliensatz und dessen Reader wurden in den benachbarten Drive-Ordner `1HqmFO4TNbQmGIH8JBFc_Ua780GcYqaxV` verschoben, die Kursmaterialien einheitlich benannt.

Beide Anleitungen wurden unter ihren bestehenden Drive-IDs aktualisiert und durch erneuten Download bytegenau geprüft. Die neu gepackten ZIPs enthalten jeweils dieselben neun Dateien wie die lokalen Quellen. Der bereitgestellte Konverter verarbeitete alle sieben PDFs zu 40 PNG-Seiten ohne Fehler. Build- und lokale Linkprüfung bestanden; die aktualisierten Titel wurden visuell geprüft. Die fachliche Abnahme der Lehrkonzeption bleibt beim Lehrenden.

## 2026-09-15 · integriert · Gemeinsame Materialien für Session 3 und 4

Auf Nutzerauftrag wurden Session 3 und 4 einem vorhandenen gemeinsamen Deck und gemeinsamen Lecture Notes zugeordnet. Die angeleitete, aufbauende Übung geht in selbständiges Arbeiten über. Das bestätigte Hauptziel ist die Nutzung von LLMs zum Programmieren und zum Bau kleiner Forschungswerkzeuge durch Promptotyping. Die vorhandene Lernzielfolie wurde entsprechend korrigiert; Folienbestand und Reihenfolge blieben identisch. Der gelieferte Abschnitt zu Context Engineering, Agentic Engineering und AI Harnesses einschließlich seiner Quellenanmerkungen wurde in die Notes integriert und um die Einordnung von Knowledge Engineering ergänzt. Allgemeine Inhalte des älteren Session-4-Skripts gingen in den Abschnitt zum selbständigen Arbeiten ein; dessen festgelegter Cast Explorer wurde als Pflichtziel aufgehoben.

Die Website führt beide ursprünglichen Zeitblöcke und gemeinsame Dokumentlinks. Gespeicherte Dateien aus den Drive-Unterordnern wurden als direkte Downloads ergänzt. Die PDF-Kopien beider Hands-on-Pakete stimmen per SHA-256 mit den bereits veröffentlichten Quellen überein; jede Herkunft ist in `downloads/drive-materials.json` nachgewiesen. Die ZIPs wurden auf Vollständigkeit geprüft, die Website mit dem Build- und Linkcheck sowie im Browser und die geänderte Lernzielfolie visuell kontrolliert. Die übertragenen Python-Skripte wurden dabei nicht erneut ausgeführt. Der ursprüngliche Session-4-Reader bleibt als Quelldokument in Drive erhalten.

## 2026-09-15 · integrated · Repository created with Codex

From the teaching materials on Google Drive and the vault teaching packages, Codex built the repository with a multi-page site (home, four session pages, materials overview), the IIIF viewer with Mirador, the PDF-to-images and IIIF packages and the M³GIM full-text exercise, later extended with metadata and TEI for Session 3. The result was the first public state of the site, generated by `scripts/build-site.mjs` from a session list inside the script, with German README and commit messages.

## 2026-09-15 · integrated · Single course page with title slides and shared shell

A review of the first state found two design systems, a four-fold repetition of title and date, a materials page repeating every session link, two Google iframes loading on every session page, no licence and no schedule. The rebuild introduced `scripts/sessions.mjs` as the data source, one course page with card grid, per-session sections and a downloads section, redirect stubs for the old page paths, the viewer and the M³GIM page under the shared frame, `assets/site.css` rebuilt in the house style with a light OKLCH token set, `assets/viewer.css`, title slides fetched by `scripts/fetch-title-slides.mjs`, the IIIF package packed by `scripts/build-iiif-package.py`, a `--check` mode in the build, `LICENSE` and `LICENSE-CONTENT.md`, and this knowledge folder. Session times were taken from the vault workshop document. The decisions are recorded in `specification.md`.

## 2026-09-15 · corrected · Viewer no longer HTML-escapes manifest labels

`tools/iiif-viewer/app.js` escaped title, labels and metadata values before placing them in the generated IIIF manifest. Mirador renders the window title as plain text and sanitises metadata values itself, so an escaped ampersand appeared literally in the title. The values are now passed unescaped.

## 2026-09-15 · integriert · Materialzugang und Webpublikation auf der Hauptseite

Der bestätigte Website-Auftrag bündelt sämtliche Übungszugänge direkt bei den Sessions. Der Header führt den offiziellen Veranstaltungsnamen und den IIIF-Viewer; Sessionlinks in der Topnavigation und die doppelte Veranstaltungszeile entfallen. Slides und Lecture Notes haben jeweils ein SVG-Symbol und einen zugeordneten PDF-Link. Downloads benennen Übung und Funktion, weitere Referenzen bleiben aufklappbar.

Session 2 erlaubt eine Dokumentauswahl und originalsprachige Transkription mit AI Harness oder LLM-Chat. Session 3 verwendet TEI und Bilder für eine angeleitete statische Webpublikation, ergänzt um eine kurze Exploration des M³GIM-Prototyps. Der frühere Inhaltsseitengenerator wurde entfernt; seine URL leitet anhand der vorhandenen Anker auf die Hauptseite weiter. Die Lehrdateien bleiben erhalten. Desktop und mobile Ansicht, Materialausklapper und alle drei Weiterleitungsziele wurden im Browser geprüft. Der gemeinsame Build samt lokalen Links besteht nach Integration aller Downloads. Nachweislich ungenutzte CSS-Regeln der entfernten Strukturen wurden gelöscht; die Viewer-Regeln bleiben erhalten.

## 2026-09-15 · vereinheitlicht · Native Lehrmaterialien und Übungspakete

Die vier vorhandenen Decks wurden direkt in Google Slides korrigiert. Session 1 hat weiterhin 41 Folien, Session 2 hat 38, Sessions 3 und 4 haben 16 und die Vorbereitung hat 17. Der abschließende native Abgleich bestätigt identische Folien- und Element-IDs sowie unveränderten Bildbestand. Fachbegriffe, Plattformbefehle, Bildformate und konkrete Arbeitsanweisungen wurden berichtigt; vorhandene deutsche Lehrpassagen wurden ins Englische übertragen. Die gemeinsame Übungsfolge und die Originalsprache der Transkription sind in Slides, allen drei Lecture Notes und den Anleitungen abgestimmt. Die überarbeiteten Folien wurden gerendert und visuell kontrolliert; zwei dabei erkannte Textüberlappungen wurden behoben.

Der TEI-Prüfer akzeptiert eine nichtleere Auswahl oder mit `--full-corpus` den vollständigen Bestand. Tests mit einem, zwei und sieben Dokumenten bestanden; leere Bestände, kaputtes XML, fehlende Bilder und eine unvollständige Auswahl im Vollkorpusmodus scheiterten erwartungsgemäß. Das Folgepaket enthält sieben TEI-Dateien, sieben redigierte TXT-Dateien und 40 PNGs mit geprüften relativen Bildpfaden. Die beiden Einstiegsguides wurden unter ihren bestehenden Drive-IDs aktualisiert und nach dem Rücklesen bytegenau mit lokalen Quellen und ZIPs verglichen.

Bei der XLSX-Datei wurde das beschädigte Theme ersetzt; die übrigen Archiveinträge blieben bytegleich. Der Nutzer entschied, das separate Kartenbeispiel aus den Kursdownloads zu entfernen. Es entfällt auch aus dem Sammelpaket und dessen Erzeugungsskript. Die eigenständigen Orts- und Plakatdaten bleiben als optionale Quellen erhalten. Die Mobilitätsaufgabe in Session 2 und die Exploration des M³GIM-Prototyps bleiben Teil des Kurses. Die lokalen Archive und Herkunftshashes wurden neu erzeugt. Der IIIF-Viewer lädt das zweitseitige XML-Beispiel erfolgreich.

Das JSON-LD-Beispiel der vorhandenen Workflowfolie ist mit vollständig auflösbarem Kontext und einem Herkunftsnachweis herunterladbar. Die JSON-LD-Expansion wurde geprüft. Der Nachweis beschreibt die gekürzte Ortsliste und verhindert die Gleichsetzung einer Datenbankbeziehung mit einem belegten Auftritt. Die fachliche Abnahme der Quellenauswertung bleibt beim Lehrenden.
