# Hands-on 2: AI Harness

Ask an AI agent in a harness with access to local files and a terminal to execute
the same PDF-to-image workflow. Both hands-ons contain the same Python script
and the same source PDFs.
If you are new to running scripts, complete Hands-on 1 first to compare the agent's actions and results with your own execution. With prior experience, begin here. You can already use an AI Harness for the Session 2 transcription exercise.

## Folder structure

Download [Hands-on 2 from the course website](https://chpollin.github.io/summer-school-musicology-2026/downloads/ai-harness.zip)
and extract the ZIP file separately from Hands-on 1. If you are already reading
this README in the extracted folder, continue below. The
[original Google Drive folder](https://drive.google.com/drive/folders/1tbZvvloLe4gZ5IBe9gsqqQfiiScgbP3F)
is an alternative download source.
Open the extracted folder that contains `pdf_to_images.py`. Keep the script and
`input` together:

```text
Hands-on folder/
├── pdf_to_images.py
├── README.md
└── input/
    ├── UAKUG_NIM_005_137_3.pdf
    ├── UAKUG_NIM_005_137_7.pdf
    ├── UAKUG_NIM_005_137_8.pdf
    ├── UAKUG_NIM_005_137_9.pdf
    ├── UAKUG_NIM_005_137_10.pdf
    ├── UAKUG_NIM_005_137_11.pdf
    └── UAKUG_NIM_005_137_12.pdf
```

You can add your own PDFs directly to `input/`. File names are unrestricted by
the script: no source file name is hardcoded. It processes every PDF directly in
this folder, including files with an uppercase `.PDF` extension. It does not
search nested input folders.

## Run the workflow with an AI harness

1. Use the extracted folder for Hands-on 2, keeping the Hands-on 1 result separate.
2. Open it as the working folder in your AI harness. The agent needs access to
   the folder containing `pdf_to_images.py` and `input/`, and to a terminal.
3. Give the agent this task:

> Inspect the provided pdf_to_images.py script and the input folder. Use this
> script to convert every PDF directly in input/ into PNG images at 150 DPI.
> Check that Python 3.11 or newer is available and install the required packages
> in a local environment if needed. Run the script as provided, without changing
> its code. Let it create output/ automatically, with one subfolder per PDF and
> one image per page. Preserve all source PDFs. Check the terminal summary,
> verify the image count for each PDF against its page count, and inspect sample
> images for orientation and readability. Report the output location and any
> errors. Distinguish checks you executed from checks that require my inspection.
> If output/ already exists, use a new output folder.

4. Follow the agent's actions: reading the script, preparing dependencies,
   running the command, inspecting files and reporting results.
5. Check the resulting image folders yourself and compare the workflow with
   the manual execution in Hands-on 1.

The conversion command is `python pdf_to_images.py`. The script handles batch
processing, folder creation and page numbering.

## Result

The script automatically creates `output/` next to itself, with one subfolder
per PDF. Each subfolder uses the PDF file name without `.pdf`. Each page becomes
one PNG at 150 DPI, in its original page order:

```text
Hands-on folder/
├── pdf_to_images.py
├── README.md
├── input/
│   └── ... all source PDFs remain here
└── output/                         ← created by the script
    ├── UAKUG_NIM_005_137_3/
    │   ├── page-001.png
    │   └── page-002.png
    ├── UAKUG_NIM_005_137_7/
    │   └── ... one PNG per page
    └── ... one folder per PDF
```

Check the terminal summary and compare the number of images in each subfolder
with the page count of its source PDF. Open several images and check page order,
orientation and readability.

The script leaves source PDFs unchanged. It reports unreadable or
password-protected PDFs and continues with the remaining files. A failed PDF
does not leave a completed-looking image folder; the terminal summary lists the
number of errors.

An existing output folder is preserved. For another run, choose a new folder:

```bash
python pdf_to_images.py --output output-new
```

To change the resolution or input folder:

```bash
python pdf_to_images.py --input input --output output-300dpi --dpi 300
```

## Continue to Programming with an LLM

You have now used an agent to execute an existing script. The next guided step
uses an LLM to build a small static web publication through Promptotyping.
Return to [Sessions 3 and 4 on the course website](https://chpollin.github.io/summer-school-musicology-2026/#session-3)
and follow the shared Lecture Notes. Use the TEI XML and matching PNG images
from your selected one or two documents, or all seven, from Session 2. The complete reference corpus is an optional fallback. The PDF-to-image outputs alone
do not include transcriptions or TEI.

Record the purpose, input relationships and display decisions in `project.md`.
Give the agent the relevant context, inspect the resulting tool against a source
example and return concrete feedback. Session 4 continues with a research
requirement you choose yourself.
