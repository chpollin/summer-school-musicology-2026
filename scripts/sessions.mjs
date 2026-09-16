/** Course data for the generated pages. Google Drive stays the editing location; the IDs were verified against the course folder on 15 September 2026. */

export const site = 'https://chpollin.github.io/summer-school-musicology-2026/';
export const course = 'Summer School Musicology 2026 · Research Data Workflows and LLMs';
export const event = 'Summer School “Gender – Knowledge – Mobility. Digital Perspectives in Musicology”';
export const venue = 'University of Music and Performing Arts Graz';
export const drive = 'https://drive.google.com/drive/folders/1TaqB-BvNt20uAvOCCnQMQBk_2cV0gLjW';
export const prep = 'https://docs.google.com/presentation/d/19zybf1mABP3qM65GXv0xEGVososbhM03P9_INInYPj8';
export const data = 'https://drive.google.com/drive/folders/1Q5iiPsBfiaAWOK7Tuy9Z5LyiO0EUaZFJ';
export const practice = 'https://drive.google.com/drive/folders/1KhFwP1L1iUO6PBKQZGP4p8rxU2vZSfG0';

// `exercise` selects the exercise text; downloads and additional resources use repository-relative URLs.
export const sessions = [
  {
    id: 'session-1', n: 1,
    title: 'Archival sources',
    slides: '1vMd2UfI9MydUEN6MMOYT0LZcJ6MYv2DmK9AQbyzJ7xc', notes: '1DU6UbE4xURFZ3fkPn7MD2loZ2naPysFYX1ypeI0D_Kg',
    exercise: 'iiif',
    downloads: [
      { url: 'downloads/xml-iiif-workshop.zip', label: 'XML to IIIF · input files and instructions · ZIP', note: 'Python script, XML template, example images and guide for generating and viewing an IIIF manifest.' },
      { url: 'downloads/pdf-to-images.zip', label: 'PDF pages as images · input and instructions · ZIP', note: 'Script, source PDF and instructions for the single-PDF conversion exercise.' },
    ],
    additional: [
      { url: 'downloads/shared/schulnachricht.jpg', label: 'Schulnachricht exercise · source image · JPG' },
      { url: drive, label: 'All exercises · optional original materials on Google Drive' },
    ],
  },
  {
    id: 'session-2', n: 2,
    title: 'Large language models',
    slides: '1GUzZEVdCq2gRphzXIsnZ1Gg_4bGdqYy_aiwl8kErJUc', notes: '18DUWW5ju8R827mf7LNPU_zSoxd2R8WF8ienI8fCcFrM',
    exercise: 'm3gim',
    downloads: [
      { url: 'downloads/szd-facsimiles.zip', label: 'Hands-on 1 · Zweig transcription · input images ZIP', note: 'The two facsimiles for transcription and comparison.' },
      { url: 'downloads/m3gim-mobility-evidence.csv', label: 'Hands-on 2 · Mobility timeline · input CSV', companion: { url: 'downloads/m3gim-mobility-evidence-source.txt', label: 'Hands-on 2 · source description and evidence guidance · TXT' } },
      { url: 'downloads/m3gim-fulltext/m3gim-instructions.zip', label: 'From Facsimiles to TEI · instructions, prompts & template · ZIP', companion: { url: 'downloads/m3gim-fulltext/m3gim-pdf.zip', label: 'From Facsimiles to TEI · input PDFs · ZIP' }, note: 'Select one or two documents, or use all seven.' },
    ],
    additional: [
      { url: 'downloads/shared/szd-facsimile-0.jpg', label: 'Hands-on 1 · Zweig transcription · individual input image 1 · JPG' },
      { url: 'downloads/shared/szd-facsimile-1.jpg', label: 'Hands-on 1 · Zweig transcription · individual input image 2 · JPG' },
      { url: 'downloads/m3gim-fulltext/m3gim-png.zip', label: 'From Facsimiles to TEI · optional input images · PNG ZIP' },
      { url: 'downloads/m3gim-fulltext/m3gim-reference.zip', label: 'From Facsimiles to TEI · optional reference solutions · ZIP' },
      { url: 'downloads/m3gim-fulltext/reference.json', label: 'From Facsimiles to TEI · optional reference transcriptions · JSON' },
      { url: 'downloads/m3gim-fulltext/metadata.csv', label: 'From Facsimiles to TEI · optional reference metadata · CSV' },
      { url: `${prep}/preview`, label: 'All hands-on exercises · optional technical preparation guide' },
    ],
  },
  {
    id: 'session-3', n: '3 and 4',
    label: 'Sessions 3 and 4',
    title: 'Promptotyping',
    description: 'Use LLMs for coding and build small research tools through Promptotyping.',
    slides: '1IOCdHFnlxyNuMwiyUNviyQ53KwD13k4_tRXpieXHgOo', notes: '138Kl6CCtpZI3BM6VHGEgpFuZPVZJTfJT5FH8ASIdHPA',
    exercise: 'm3gim-next',
    downloads: [
      { url: 'downloads/m3gim-mobility-evidence.csv', label: 'Start here · AI Harness data explorer · input CSV', companion: { url: 'downloads/m3gim-harness-exercise.txt', label: 'Two prompts, local preview and checks · TXT' }, note: 'The same CSV as in Session 2. Put it in an empty folder and open that folder in your harness.' },
      { url: 'downloads/m3gim-fulltext/NEXT-SESSION.md', label: 'Static web publication · instructions · Markdown', note: 'Reuse your TEI files and images from Session 2.' },
    ],
    additional: [
      { url: 'downloads/m3gim-mobility-evidence-source.txt', label: 'Data explorer · source description and evidence guidance · TXT' },
      { url: 'downloads/python-vscode.zip', label: 'Optional preparation · Python in Visual Studio Code · ZIP', note: 'Guide, script and seven input PDFs.' },
      { url: 'downloads/ai-harness.zip', label: 'Optional preparation · PDF conversion with an AI Harness · ZIP', note: 'Guide, script and the same input PDFs.' },
      { url: 'downloads/m3gim-jsonld-example.jsonld', label: 'M³GIM exploration · JSON-LD example with context', companion: { url: 'downloads/m3gim-jsonld-example-source.md', label: 'M³GIM exploration · example explanation and source' } },
      { url: 'downloads/m3gim-fulltext/m3gim-next-session.zip', label: 'Static web publication · optional reference TEI + images · ZIP', note: 'Complete seven-document corpus as a fallback, with working image links.' },
      { url: 'downloads/shared-materials.zip', label: 'Session 4 · Optional examples and source material · ZIP', note: 'Bundle for independent work; choose the files relevant to your research requirement.' },
      { url: 'downloads/shared/prompts.md', label: 'Session 4 · Optional Cast Explorer · Bayreuth 1953 prompts' },
      { url: 'downloads/shared/orte-lookup.csv', label: 'Session 4 · Optional source material · place lookup CSV' },
      { url: 'downloads/shared/plakattext-pl04.txt', label: 'Session 4 · Optional source material · poster text TXT' },
      { url: 'downloads/shared/personenindex-uebung.xlsx', label: 'Session 4 · Optional person-index exercise · XLSX' },
    ],
  },
];
