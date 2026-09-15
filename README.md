# From XML to IIIF

Lehranwendung für die Summer School Musicology 2026 an der Kunstuniversität Graz. Sie öffnet ein projektspezifisches XML oder ein mitgeliefertes Python-erzeugtes IIIF-Presentation-3-Manifest zusammen mit ausgewählten JPEG-/PNG-Bildern in Mirador.

**Website:** https://chpollin.github.io/xml-iiif-workshop/

## Nutzung

1. Website öffnen und entweder **Try the example** wählen oder eine eigene XML-/JSON-Datei auswählen.
2. Sämtliche referenzierten Bilddateien gemeinsam auswählen.
3. **Open in Mirador** anklicken und Metadaten sowie Seitenfolge prüfen.
4. XML ändern, speichern, erneut auswählen und wieder öffnen.

Die Dateiauswahl verarbeitet die Dateien ausschließlich im Browser. Ein lokaler Server, Benutzerkonto oder Upload zum Repository ist nicht erforderlich. Die Seite selbst wird von GitHub Pages geladen. Die Anwendung sendet ausgewählte Inhalte nicht an GitHub oder andere Dienste.

## Python-Übung

Das [Lehrpaket](xml-iiif-workshop.zip) enthält `build_manifest.py`, `metadata.xml`, zwei synthetische Beispielbilder und eine englische Anleitung. Mit Python ab 3.11:

```sh
python -m pip install "lxml>=5,<7" "Pillow>=10,<13"
python build_manifest.py metadata.xml
```

Danach auf der Website `manifest.json` und die Bilder auswählen. Python bleibt damit als sichtbarer Transformationsschritt erhalten. Alternativ verarbeitet die Website das XML direkt im Browser.

## Modellierung und Grenzen

- Eingabevokabular: `book` im Namespace `http://gams.uni-graz.at/viewer`; Bildreferenzen als `xlink:href`.
- XML-Titel wird Manifesttitel, beschreibende Felder werden Anzeigemetadaten, die Folge der `page`-Elemente wird zur Canvas-Reihenfolge.
- Gruppierungen innerhalb von `div` werden in diesem Lehrbeispiel zu einer Seitenfolge zusammengefasst. IIIF Ranges werden nicht erzeugt.
- Ein Canvas enthält genau eine Bildannotation. Die Abmessungen werden aus dem ausgewählten Bild gelesen. JPEG/PNG werden vollständig geladen, ohne IIIF Image Service.
- Bilddateien müssen eindeutige Namen besitzen. Der Browser ordnet Referenzen nach ihrem Dateinamen zu und ersetzt Bild-URLs durch temporäre Blob-Adressen. Externe Ressourcen aus importierten Manifesten werden nicht abgerufen.
- Das zusammengesetzte Owner-Feld bleibt eine beschriftete Angabe. Es wird keine formale Lizenz daraus abgeleitet.
- Syntax- und Eingabeprüfungen sind keine vollständige Schema-Validierung oder historische Prüfung.
- Keine METS-/TEI-Konvertierung, kein produktiver GAMS-Ingest, keine dauerhafte Publikation der ausgewählten Objekte. Nach Neuladen werden Dateien erneut ausgewählt.

## Herkunft

Christopher Pollin hat die Anwendung für die Lehrveranstaltung mit GPT-6 Astra in Codex entwickeln lassen. Die XML-Verarbeitung, Dateiauswahl und Lehranleitung gehören zu dieser Anpassung. Die Bildanzeige übernimmt der bestehende Mirador-Viewer.

Mirador 3.3.0 ist lokal im Repository enthalten; es gibt keine CDN-Abhängigkeit zur Laufzeit. Originaldistribution: https://unpkg.com/mirador@3.3.0/dist/mirador.min.js. Mirador und enthaltene Bibliotheken tragen ihre jeweiligen Lizenzhinweise unter `vendor/`.

Die zwei Beispielbilder wurden mit Pillow als synthetisches Lehrmaterial erzeugt. Sie enthalten keine historischen Quellen oder Angaben Dritter.

## Quellen

- https://github.com/ProjectMirador/mirador/tree/v3.3.0
- https://iiif.io/api/cookbook/recipe/0001-mvm-image/
- https://iiif.io/api/cookbook/recipe/0009-book-1/

## Betrieb

Statische Website ohne Build. GitHub Pages veröffentlicht den Root von `main`. Für die lokale Entwicklung genügt `python -m http.server` im Repository. Browserprüfungen decken XML- und JSON-Dateiauswahl, Seitenwechsel, wiederholtes Laden, fehlende Bilder und fehlerhaftes XML ab.
