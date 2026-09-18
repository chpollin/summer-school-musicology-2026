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
updated: 2026-09-18
language: de
related: [handoff, project, specification]
---

# Journal

Kuratierter Provenienzindex der Kurswebsite, neueste Einträge zuerst. Den aktuellen Stand beschreiben `project.md` und `specification.md`, offene Übergabepunkte `handoff.md`.

## 2026-09-18 · geprüft · Öffentliche Kursmaterialien

Der Veröffentlichungsreview setzt auf dem aktuellen Remote-Stand a3ff46d auf. Der ältere lokale Checkout enthält eigenständige, uncommittete Überarbeitungen und bleibt unverändert; die Integration erfolgt in einem separaten Worktree. Die kompakte Kursseite bleibt erhalten. Der Link zum unveröffentlichten M³GIM-Prototyp ist durch den vorhandenen Lehrdatensatz ersetzt. Die Autorbereinigung der nativen Slides und Lecture Notes bleibt im Handoff.

Das Session-2-Paket enthielt die für die Kontextübung benötigten Metadaten nicht. CSV, Metadatenbelege und Quellenmanifest sind ergänzt. Alle Sessionpakete enthalten die Lizenzbedingungen; der Website-Footer benennt die gesonderten Rechte an Fremdmaterial. Der Paketgenerator schreibt atomar und reproduzierbar. WebP-Varianten verringern den Bildtransfer, Downloadgrößen sind sichtbar, Social-Media-Metadaten und der ältere Schulnachricht-Bildpfad sind ergänzt. README und Aktionsschicht sind auf die englische öffentliche Dokumentation abgestimmt.

Die formalen Prüfungen umfassen Seitengenerierung, Syntax, externe Materiallinks, sechs öffentliche PDF-Exporte, Paketbestand und TEI-Schema samt sämtlichen Bildverweisen. Die Kursseite wurde im Browser bei Desktopbreite und 320 Pixeln geprüft; der IIIF-Viewer öffnet sein Beispiel ohne Konsolenfehler. Die Prüfungen bestätigen technische Verwendbarkeit im genannten Umfang. Die fachliche Abnahme der Referenztranskriptionen und die angekündigten Löschungen in nativen Lehrmaterialien bleiben davon getrennt.

Der erweiterte Linkcheck der Lecture-Notes-Textexporte unterscheidet reservierte Beispieladressen und lokale Übungsserver von öffentlichen Links. Die OpenAI-Quelle [Emergent tool use from multi-agent interaction](https://openai.com/index/emergent-tool-use/) antwortete im letzten Skriptlauf mit HTTP 403, war im anschließenden direkten Webabruf vollständig lesbar. Dieser Befund ist als Zugriffsbeschränkung des automatisierten Checks eingeordnet; der Skriptbericht bleibt unverändert erhalten.

## 2026-09-17 · verdichtet · Markdown-Dokumentation

README, CLAUDE.md und der Wissensordner wurden auf den Stand nach Commit 112431e neu geschnitten. Die Spezifikation beschreibt nur noch den geltenden Zustand, die Herkunft der Illustrationen und die Prüfprotokolle sind in dieses Journal gewandert, Drive-IDs stehen allein in `sessions.mjs`. Das README ist eine Orientierung nach Aufbau, Materialien, Befehlen und Lizenz statt eines Arbeitsprotokolls. Der Handoff führt seine Punkte mit den Pflichtfeldern der Konvention. Der Punkt zum Referenzpaket ging in die Spezifikation ein, der Punkt zur Offline-Kopie der Decks entfiel, weil die Sessions erreicht sind. Frühere Wortlaute bewahrt Git.

## 2026-09-17 · integriert · Sessions 2 und 3–4 freigeschaltet

Die Flags `published: false` für Session 2 und den gemeinsamen Abschnitt der Sessions 3 und 4 wurden entfernt. Die Kursseite zeigt alle Sessions, die Weiterleitungsstubs zeigen auf ihre Anker. Beide Lecture Notes bleiben als Work in progress markiert.

## 2026-09-16 · integriert · Session 1 allein sichtbar, ein Paket pro Session

Session 2 und Sessions 3 und 4 erhielten `published: false` bis zu ihrem Tag. Jede Session bietet ein Materialpaket als ZIP mit einem Button im Kopf des Downloadbereichs. Hands-on-Zeilen nennen nur den Folientitel und verlinken allein Viewer, M³GIM-Prototyp und Starter-CSV. Beschreibungssätze, Anhänge, Hinweistexte und der Abschnitt zu optionalen Materialien entfielen, die Vorgaben stehen in den Folien. Der Viewer-Link wanderte aus dem Header in einen Abschnitt Tools am Seitenende, die Viewer-Seite wurde eine Card ohne Aufklapper. Refactoring des Bauwerkzeugs: der IIIF-Packer ging in `build-shared-packages.py` auf, ungenutzte Drive-Konstanten entfielen, der Session-4-Alias kommt aus einem `aliases`-Feld statt aus Sonderfällen im Build.

## 2026-09-16 · integriert · Aktuelle Hands-on-Folge und vereinfachte TEI-Übung

Die Sessionmaterialien wurden gegen die zuletzt gelieferten Folienexporte und die Nutzerkorrekturen abgeglichen. Die TEI-Übung beginnt mit einem Dokument und zwei Scans im Chat, ein Harness bleibt optional. Das Promptotyping-Projekt nennt drei Wissensdokumente und den lokalen HTML/CSS/JS-Rahmen ohne Abhängigkeiten, erste Fassung mit einer Hauptansicht und einer Kerninteraktion, Code-Refactoring und Wissens-Refactoring als getrennte Schritte. Die optionalen Cast-Explorer- und PDF-Vorbereitungsanleitungen wurden nachgezogen. Der letzte Folienexport enthielt noch die überholte Zwei-Dokumente-Formulierung, Google Slides wurden in diesem Auftrag nicht verändert.

## 2026-09-16 · integriert · Bearbeitungsstand der Lecture Notes sichtbar

Alle Lecture Notes tragen auf der Kursseite den Hinweis auf KI-Unterstützung. Session 2 und Sessions 3 und 4 sind zusätzlich als Work in progress gekennzeichnet, Session 1 erhält keine Fertigstellungsaussage. Der Status kommt aus `notesInProgress` in `sessions.mjs`.

## 2026-09-16 · integriert · Hands-ons und Materialzugänge konsolidiert

Session 1 erhielt die Schulnachricht als Hauptquelle einschließlich Bild im IIIF-Paket. Session 2 verwendet die Starter-CSV für ein Chat-Artefakt, die historischen CSV-Links auf den Folien wurden korrigiert. Sessions 3 und 4 führen von Prototyperkundung und CSV-Übung zum Abschlussprojekt mit zwei Wegen, Edition aus PDFs über TEI oder Dashboard aus dem vollständigen M³GIM-Graphen. Der Graphsnapshot entspricht seiner gepinnten Quelle bytegenau. Überholte Übergaben und Hands-on-Nummern wurden in den lokalen Anleitungen und Archivkopien bereinigt.

## 2026-09-16 · verworfen · Alte Mobilitätsdownloads

Beide Sessions verwenden ausschließlich die Starter-CSV. Die frühere 40-Zeilen-Datei und ihr Begleittext wurden gelöscht, der Ableitungsschritt liest seine historische Eingabe aus Commit f2d0608. Die separate TXT-Anleitung zum Harness-Einstieg und ihr Downloadlink entfielen ebenfalls, Prompts und Startanleitung gehören auf die Folien.

## 2026-09-16 · integriert · Vereinfachter Mobilitätsdatensatz

Die Harness-Einstiegsübung verwendet eine abgeleitete Auswahl aus zwölf Aussagen, sechs Dokumenten und drei Orten (Bayreuth, München, Wien, 1952 bis 1957). Originalfelder und IDs bleiben unverändert, `date_type` und `date_status` machen dokumentierte Datumsbedeutungen und Unsicherheiten nutzbar, `year_requires_review` markiert zwei Folgeereignisse mit erschlossenem Jahr. Die Daten wurden gegen die 40-Zeilen-CSV geprüft, nicht erneut gegen Faksimiles. Ein statisches Referenzbeispiel unter `tools/mobility-starter/` zeigt die Auswahl einschließlich überlappender Punkte.

## 2026-09-16 · integriert · Sessionübersicht auf Lernziele verdichtet

Vollständige Sessiontitel und Untertitel folgen den Nutzerangaben, Session 1 heißt „Making Estate Materials Digitally Accessible“ mit Untertitel „Research Data Workflows in Stefan Zweig Digital“. Jede Session zeigt ihre Lernziele, ausführliche Übungsschritte stehen in den verlinkten Anleitungen. Die doppelte Pflege der Übungstexte im Seitengenerator entfiel.

## 2026-09-16 · integriert · CSV-Einstieg in den AI Harness

Session 3 beginnt mit einem Ordner und der Mobilitäts-CSV. Die Anleitung trennt ausgeführte Python-Analyse und Erstellung einer einfachen HTML/CSS/JavaScript-Timeline in zwei Prompts und ergänzt lokale Startbefehle und Quellenprüfung. Die damalige 40-Zeilen-CSV wurde geprüft, eindeutige Belegkennungen, Dokumentkennungen, Datumsbereich und Ortsschreibweisen.

## 2026-09-15 · integriert · Seitenkopf vereinfacht, Downloads pro Session

Untertitel und Sprungbuttons im Seitenkopf entfielen. Die Downloads wurden den Sessions zugeordnet, die zentrale Downloadliste und doppelte Paketlinks im Übungstext entfielen, der alte Downloadanker bleibt erreichbar. Reste des Website-Refactorings wurden bereinigt, ungenutzte CSS-Regeln für frühere Kartenbilder und Folieneinbettungen sowie drei überholte Titelillustrationen. Aktuelle Bilder und Generierungsprompts bleiben erhalten.

## 2026-09-15 · korrigiert · Titelillustrationen

Der Nutzer verwarf generische Forschendenbilder und präzisierte die Bildsprache. Die Opernsängerin aus Session 1 ist die einzige menschliche Figur, der schwarze Kubuskopf mit Tentakeln das Motiv der opaken Modellfunktion. Session 2 zeigt Textgenerierung, Sessions 3 und 4 die Sängerin programmierend am Laptop über dem kugelförmigen Promptotyping-Symbol des Nutzers mit Quellen- und Forschungsoberflächen-Ebene und Rückkopplung. Auf Nutzerwunsch erhielt der Laptopdeckel einen M³GIM-Sticker statt Codezeilen. Die Bildspalten wurden in den vorhandenen Titelbildobjekten ersetzt, native Titeltexte, Metadaten und Folienbestand blieben unverändert. Referenzen und Bearbeitungsprompts liegen unter `assets/illustrations/`.

Die Kursseite wurde zugleich auf eine Überschrift pro Session mit Titelbild und Information in einer Zeile reduziert. Uhrzeiten, Sessiondatumszeilen, Unterkarten, Vorspanntexte und Folieneinbettungen entfielen, Abstände ersetzen Trennlinien, der Footer führt Autor, Lizenz und Quellcode.

## 2026-09-15 · integriert · Übungsfolge, Titelbilder und Materialzugang

Website, gemeinsame Lecture Notes und Hands-on-Anleitungen wurden auf dieselbe Übungsfolge abgestimmt. Eigene Skriptausführung und Agentenausführung bereiten den Bau eines kleinen Forschungswerkzeugs durch Promptotyping vor, Session 4 führt die Arbeit mit einer selbstgewählten Forschungsanforderung fort. Der Abschnitt zu Context Engineering, Agentic Engineering und AI Harnesses samt Quellenanmerkungen ging in die Notes ein, ergänzt um Knowledge Engineering. Der alte Session-4-Foliensatz und dessen Reader wurden in den Drive-Ordner Superseded Materials verschoben, die Kursmaterialien einheitlich benannt. Beide Anleitungen wurden unter ihren bestehenden Drive-IDs aktualisiert, die ZIPs neu gepackt. Der Konverter verarbeitete alle PDFs fehlerfrei zu PNG-Seiten.

## 2026-09-15 · integriert · Gemeinsame Materialien für Session 3 und 4

Session 3 und 4 wurden einem vorhandenen gemeinsamen Deck und gemeinsamen Lecture Notes zugeordnet. Das bestätigte Hauptziel ist die Nutzung von LLMs zum Programmieren und zum Bau kleiner Forschungswerkzeuge durch Promptotyping, die Lernzielfolie wurde entsprechend korrigiert. Allgemeine Inhalte des älteren Session-4-Skripts gingen in den Abschnitt zum selbständigen Arbeiten ein, der dort festgelegte Cast Explorer ist kein Pflichtziel mehr. Gespeicherte Dateien aus den Drive-Unterordnern wurden als direkte Downloads ergänzt, jede Herkunft ist in `downloads/drive-materials.json` nachgewiesen.

## 2026-09-15 · vereinheitlicht · Native Lehrmaterialien und Übungspakete

Die vier Decks wurden direkt in Google Slides korrigiert, Fachbegriffe, Plattformbefehle, Bildformate und Arbeitsanweisungen, deutsche Lehrpassagen ins Englische übertragen, zwei Textüberlappungen behoben. Übungsfolge und Originalsprache der Transkription sind in Slides, Lecture Notes und Anleitungen abgestimmt. Der TEI-Prüfer akzeptiert eine nichtleere Auswahl oder mit `--full-corpus` den vollständigen Bestand. Bei der XLSX-Datei wurde das beschädigte Theme ersetzt. Der Nutzer entschied, das separate Kartenbeispiel aus Kursdownloads und Sammelpaket zu entfernen, die Orts- und Plakatdaten bleiben als optionale Quellen. Das JSON-LD-Beispiel der Workflowfolie ist mit auflösbarem Kontext und Herkunftsnachweis herunterladbar.

## 2026-09-15 · integriert · Materialzugang und Webpublikation auf der Hauptseite

Sämtliche Übungszugänge liegen direkt bei den Sessions. Der Header führt den offiziellen Veranstaltungsnamen, Sessionlinks in der Topnavigation und die doppelte Veranstaltungszeile entfallen. Session 2 erlaubt Dokumentauswahl und originalsprachige Transkription mit AI Harness oder LLM-Chat. Der frühere M³GIM-Inhaltsseitengenerator wurde entfernt, seine URL leitet anhand der vorhandenen Anker auf die Hauptseite weiter, die Lehrdateien bleiben erhalten.

## 2026-09-15 · korrigiert · Viewer maskiert Manifest-Labels nicht mehr

`tools/iiif-viewer/app.js` hatte Titel, Labels und Metadatenwerte HTML-maskiert, bevor sie ins erzeugte Manifest kamen. Mirador rendert den Fenstertitel als Text und bereinigt Metadaten selbst, ein maskiertes Et-Zeichen erschien deshalb wörtlich. Die Werte werden unmaskiert übergeben.

## 2026-09-15 · integriert · Eine Kursseite mit Titelfolien und gemeinsamem Rahmen

Eine Prüfung des ersten Standes fand zwei Designsysteme, vierfache Wiederholung von Titel und Datum, eine Materialseite mit allen Sessionlinks, zwei Google-Iframes pro Sessionseite, keine Lizenz. Der Umbau brachte `scripts/sessions.mjs` als Datenquelle, eine Kursseite mit Sessionabschnitten, Weiterleitungsstubs für die alten Pfade, Viewer und M³GIM-Seite im gemeinsamen Rahmen, `assets/site.css` im Hausstil mit hellem OKLCH-Token-Set, per `fetch-title-slides.mjs` geholte Titelfolien, einen `--check`-Modus im Build, die beiden Lizenzdateien und diesen Wissensordner.

## 2026-09-15 · integriert · Repository mit Codex angelegt

Aus den Lehrmaterialien auf Google Drive und den Lehrpaketen im Vault baute Codex das Repository mit einer mehrseitigen Site, dem IIIF-Viewer mit Mirador, den PDF-zu-Bild- und IIIF-Paketen und der M³GIM-Volltextübung, später um Metadaten und TEI erweitert. Dies war der erste öffentliche Stand, mit deutschem README und deutschen Commit-Nachrichten.

## 2026-09-17 · integriert · Hands-on 1 auf das Bayreuther Programmheft umgestellt

Die Gemini-Transkriptionsübung in Session 2 arbeitet mit dem Programmheft UAKUG_NIM_005_137_3 (Neunte Symphonie, Bayreuth 1953) statt mit dem Zweig-Faksimile. Die zwei Scans liegen als Einzel-PNGs unter `downloads/m3gim-fulltext/png/`, aus `m3gim-png.zip` kopiert, und sind zusammen mit `metadata.csv` bei Hands-on 1 verlinkt. Den Kontext des Prompts tragen die Teilnehmenden aus der Metadatenzeile selbst ein. Dasselbe Dokument ist Startpunkt der TEI-Übung.
