# Optional preparation: Python in Visual Studio Code

This package converts PDF pages to PNG images with a provided Python script. It is optional technical preparation for working with source images.

The introductory AI Harness exercise uses the mobility starter CSV. **Promptotyping Project: A Small Digital Edition or Research Dashboard** offers two paths, a PDF-to-TEI edition or a dashboard using the full M³GIM dataset. Follow the slides and maintain `knowledge/data.md` for sources and limitations, `knowledge/research.md` for the question and method, and `knowledge/specification.md` for requirements and acceptance criteria.

The final website starts with one view and one core interaction. Use local, plain HTML, CSS and JavaScript without libraries, frameworks, external dependencies, backend, database or build tools. The Python dependencies below serve only the optional PDF preparation.

## Package contents

- `pdf_to_images.py`, the conversion script.
- `input/`, seven M³GIM source PDFs.
- This README with local execution instructions.

Download the [Python preparation package](https://chpollin.github.io/summer-school-musicology-2026/downloads/python-vscode.zip), extract it and open the folder containing `pdf_to_images.py` in VS Code. Keep the script and `input/` together.

## Run the conversion

Use Python 3.11 or newer. Open a terminal in the extracted folder and run:

```bash
python -m pip install "pypdfium2>=4.30,<6" "Pillow>=11,<13"
python pdf_to_images.py
```

Use `python3` on macOS/Linux if required, or `py` on Windows. Use the same command for installation and execution.

The script reads every PDF directly in `input/` and creates `output/`, with one subfolder per PDF and one PNG per page at 150 DPI. Source PDFs remain unchanged. Compare image counts with the PDFs and inspect page order, orientation and readability. Check the terminal summary for errors.

An existing output folder is preserved. For another run, choose a new folder:

```bash
python pdf_to_images.py --output output-new
```

You can compare manual execution with the optional [AI Harness conversion package](https://chpollin.github.io/summer-school-musicology-2026/downloads/ai-harness.zip), which contains the same script and PDFs. Neither conversion package contains transcriptions or TEI.
