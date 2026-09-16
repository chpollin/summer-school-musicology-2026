# Optional preparation: PDF conversion with an AI Harness

This package lets an agent run a provided PDF-to-image script. It is optional technical preparation. It contains the same script and seven source PDFs as the [Python preparation package](https://chpollin.github.io/summer-school-musicology-2026/downloads/python-vscode.zip).

The introductory AI Harness exercise uses the mobility starter CSV. The final project offers two paths, a PDF-to-TEI edition or a dashboard using the full M³GIM dataset. Follow the working instructions on the slides. Both final paths use `knowledge/data.md` and `knowledge/research.md` to document the data and research requirements.

## Package contents

- `pdf_to_images.py`, the conversion script.
- `input/`, seven M³GIM source PDFs.
- This README with an optional conversion task.

Download the [AI Harness preparation package](https://chpollin.github.io/summer-school-musicology-2026/downloads/ai-harness.zip), extract it and open the folder containing `pdf_to_images.py` in your harness. The agent needs access to the folder and a terminal. Keep any earlier conversion result in a separate folder.

## Optional task

> Inspect the supplied script and input PDFs. Run pdf_to_images.py to convert them to PNG images. Prepare its dependencies in a local environment if needed. Keep the script and source PDFs unchanged. Check page counts and report the output location and any errors. Distinguish checks you performed from checks I need to make. Use a new output folder if output/ already exists.

Observe which files the agent reads and which commands it runs. Inspect the resulting images yourself.

## Expected result

The script requires Python 3.11 or newer. It reads every PDF directly in `input/` and creates `output/`, with one subfolder per PDF and one PNG per page at 150 DPI. Compare image counts with the PDFs and inspect page order, orientation and readability. Check the terminal summary for errors.

For another run, the command is `python pdf_to_images.py --output output-new`. Use `python3` on macOS/Linux if required. The output contains page images; transcriptions and TEI are separate work in the final edition project.
