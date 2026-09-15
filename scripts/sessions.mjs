/** Course data for the generated pages. Google Drive stays the editing location; the IDs were verified against the course folder on 15 September 2026. */

export const site = 'https://chpollin.github.io/summer-school-musicology-2026/';
export const course = 'Summer School Musicology 2026 · Research Data Workflows and LLMs';
export const event = 'Summer School “Gender – Knowledge – Mobility. Digital Perspectives in Musicology”';
export const venue = 'University of Music and Performing Arts Graz';
export const drive = 'https://drive.google.com/drive/folders/1TaqB-BvNt20uAvOCCnQMQBk_2cV0gLjW';
export const prep = 'https://docs.google.com/presentation/d/19zybf1mABP3qM65GXv0xEGVososbhM03P9_INInYPj8';
export const data = 'https://drive.google.com/drive/folders/1Q5iiPsBfiaAWOK7Tuy9Z5LyiO0EUaZFJ';
export const practice = 'https://drive.google.com/drive/folders/1KhFwP1L1iUO6PBKQZGP4p8rxU2vZSfG0';

// `exercise` selects the exercise text; `local` marks a path relative to the repository root.
export const sessions = [
  {
    id: 'session-1', n: 1,
    title: 'Archival sources',
    slides: '1vMd2UfI9MydUEN6MMOYT0LZcJ6MYv2DmK9AQbyzJ7xc', notes: '1DU6UbE4xURFZ3fkPn7MD2loZ2naPysFYX1ypeI0D_Kg',
    exercise: 'iiif',
    resources: [
      { url: 'downloads/pdf-to-images.zip', local: true, label: 'PDF to images · Python exercise package', note: 'Script, two-page source PDF and instructions.' },
      { url: 'downloads/shared/schulnachricht.jpg', local: true, label: 'Schulnachricht · source image' },
    ],
  },
  {
    id: 'session-2', n: 2,
    title: 'Large language models',
    slides: '1GUzZEVdCq2gRphzXIsnZ1Gg_4bGdqYy_aiwl8kErJUc', notes: '18DUWW5ju8R827mf7LNPU_zSoxd2R8WF8ienI8fCcFrM',
    exercise: 'm3gim',
    resources: [
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
    resources: [],
  },
];
