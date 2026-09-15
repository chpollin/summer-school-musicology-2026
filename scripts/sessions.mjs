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
      { url: 'downloads/xml-iiif-workshop.zip', label: 'XML to IIIF · Python package', note: 'Script, XML template, example images and guide.' },
      { url: 'downloads/pdf-to-images.zip', label: 'PDF pages as images · Python package', note: 'Script, source PDF and instructions.' },
    ],
    additional: [
      { url: 'downloads/shared/schulnachricht.jpg', label: 'Schulnachricht · source image' },
      { url: drive, label: 'Original course folders on Google Drive' },
    ],
  },
  {
    id: 'session-2', n: 2,
    title: 'Large language models',
    slides: '1GUzZEVdCq2gRphzXIsnZ1Gg_4bGdqYy_aiwl8kErJUc', notes: '18DUWW5ju8R827mf7LNPU_zSoxd2R8WF8ienI8fCcFrM',
    exercise: 'm3gim',
    downloads: [
      { url: 'downloads/m3gim-fulltext/m3gim-pdf.zip', label: 'Source documents · PDF ZIP' },
      { url: 'downloads/m3gim-fulltext/m3gim-instructions.zip', label: 'Instructions, prompts & TEI template · ZIP' },
    ],
    additional: [
      { url: 'downloads/m3gim-fulltext/m3gim-png.zip', label: 'All 40 scan images · PNG ZIP' },
      { url: 'downloads/m3gim-fulltext/m3gim-reference.zip', label: 'Reference solutions · ZIP' },
      { url: 'materials/m3gim-fulltext.html#reference', label: 'Inspect TEI, metadata and full texts' },
      { url: `${prep}/preview`, label: 'Technical preparation slides' },
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
      { url: 'downloads/python-vscode.zip', label: 'Hands-on 1 · Python in Visual Studio Code · ZIP', note: 'Guide, script and seven input PDFs.' },
      { url: 'downloads/ai-harness.zip', label: 'Hands-on 2 · AI Harness · ZIP', note: 'Guide, script and the same input PDFs.' },
      { url: 'downloads/m3gim-fulltext/m3gim-next-session.zip', label: 'Reference TEI + all images · ZIP', note: 'Complete corpus with working image links.' },
    ],
    additional: [
      { url: 'materials/m3gim-fulltext.html#next-session', label: 'TEI corpus layout & guide' },
      { url: 'downloads/shared-materials.zip', label: 'Additional source material and examples · ZIP' },
      { url: 'downloads/shared/prompts.md', label: 'Bayreuth 1953 · extraction and prototype prompts' },
      { url: 'downloads/shared/orte-lookup.csv', label: 'Place lookup · CSV' },
      { url: 'downloads/shared/plakattext-pl04.txt', label: 'Poster text · TXT' },
      { url: 'downloads/shared/personenindex-uebung.xlsx', label: 'Person-index exercise · XLSX' },
      { url: 'downloads/shared/m3gim-map-demo.zip', label: 'Map example · ZIP' },
    ],
  },
];
