# Hands-on 2: AI Harness

Ask an AI agent in a harness with access to local files and a terminal to execute
the same PDF-to-image workflow. Both hands-ons contain the same Python script
and the same source PDFs.

## Folder structure

Download the **whole exercise folder** from Google Drive and extract the ZIP file.
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

1. Download and extract this exercise folder separately from Hands-on 1.
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
> errors. If output/ already exists, use a new output folder.

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

