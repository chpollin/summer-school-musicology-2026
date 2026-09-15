# Hands-on 1: Python in Visual Studio Code

Render every page of every input PDF as a PNG image using the provided script.

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

## Run the script yourself

1. Use Python 3.11 or newer and Visual Studio Code.
2. In VS Code, choose **File → Open Folder** and select the extracted hands-on
   folder containing `pdf_to_images.py` and `input/`.
3. Choose **Terminal → New Terminal**. The terminal should start in this same
   hands-on folder.
4. Install the two required Python packages:

```bash
python -m pip install "pypdfium2>=4.30,<6" "Pillow>=11,<13"
```

5. Run the provided script:

```bash
python pdf_to_images.py
```

No PDF file names need to be entered. You do not need to create `output/`.

If your computer uses `python3` instead of `python`, use `python3` in both
commands. On Windows, `py` may be available instead. Use the same Python command
for installation and execution.

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

