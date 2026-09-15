# From XML Metadata to an IIIF Viewer

## Open the viewer

Visit **https://chpollin.github.io/xml-iiif-workshop/**. Click **Try the example** to see the supplied two-page object.

## Use your XML and images

1. Edit `metadata.xml`. Use one `<page xlink:href="images/page-001.jpg"/>` per image in the intended order.
2. On the website, select your XML under **1. Metadata**.
3. Under **2. Page images**, select all referenced JPEG/PNG files together. Use Ctrl/Cmd or Shift to select several files.
4. Click **Open in Mirador**. Inspect the title, metadata and page order.
5. Change your XML, save, select the updated file and open it again.

Filenames must match the references and be unique. The website reads files in your browser; it does not upload them to a server. Reloading the page clears the object.

## Generate the manifest with Python

Extract the ZIP and open the folder in VS Code. Select **Terminal → New Terminal**. Python 3.11 or later is required.

```sh
python --version
python -m pip install "lxml>=5,<7" "Pillow>=10,<13"
python build_manifest.py metadata.xml
```

On macOS/Linux, use `python3` if required. If your Python installation requires an isolated environment, run `python -m venv .venv` and activate it before installing the libraries. Windows PowerShell uses `.venv\Scripts\Activate.ps1`; macOS/Linux uses `source .venv/bin/activate`.

The script generates `manifest.json`. Select that file and the images on the website, then click **Open in Mirador**. No local server is required. The same XML can also be opened directly on the website if Python is unavailable.

Compare your XML with the generated JSON. Change the title or reverse the page references, run Python again and reopen the files in the viewer.

## What this exercise does

The script maps the XML title to the manifest label, description fields to display metadata and page references to an ordered sequence of IIIF Canvases. It reads image dimensions from the files. The manifest references images; it does not contain the image data itself.

The example uses ordinary JPEG/PNG files, without a IIIF image server. The browser substitutes temporary image addresses so that your local files can be displayed. The generated manifest uses demonstration URLs; selecting files does not publish them as a shareable online resource.

This demonstrates transformation and access. It does not perform a GAMS ingest or convert to METS. The supplied images are synthetic teaching examples. Replace them with your own exercise images and revise the metadata accordingly.
