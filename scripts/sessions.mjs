/** Course data for the generated pages. Google Drive stays the editing location; the IDs were verified against the course folder on 15 September 2026. */

export const site = 'https://chpollin.github.io/summer-school-musicology-2026/';
export const course = 'Summer School Musicology 2026 · Research Data Workflows and LLMs';
export const event = 'Summer School “Gender – Knowledge – Mobility. Digital Perspectives in Musicology”';
export const venue = 'University of Music and Performing Arts Graz';
export const drive = 'https://drive.google.com/drive/folders/1TaqB-BvNt20uAvOCCnQMQBk_2cV0gLjW';
export const prep = 'https://docs.google.com/presentation/d/19zybf1mABP3qM65GXv0xEGVososbhM03P9_INInYPj8';
export const data = 'https://drive.google.com/drive/folders/1Q5iiPsBfiaAWOK7Tuy9Z5LyiO0EUaZFJ';
export const practice = 'https://drive.google.com/drive/folders/1KhFwP1L1iUO6PBKQZGP4p8rxU2vZSfG0';

// `panel` names a card rendered above the resources; `local` marks a path relative to the repository root.
export const sessions = [
  {
    id: 'session-1', n: 1, day: 'Wednesday 16 September', time: '17:00–19:00',
    title: 'Making Estate Materials Digitally Accessible',
    short: 'Archival sources and research data',
    description: 'Follow an archival object from digitisation through catalogue description to digital access, using Stefan Zweig Digital.',
    slides: '1vMd2UfI9MydUEN6MMOYT0LZcJ6MYv2DmK9AQbyzJ7xc', notes: '1DU6UbE4xURFZ3fkPn7MD2loZ2naPysFYX1ypeI0D_Kg',
    panel: 'iiif',
    resources: [
      { url: 'downloads/pdf-to-images.zip', local: true, label: 'PDF to images · Python exercise package', note: 'Script, two-page source PDF and instructions.' },
      { url: data, label: 'Source images and shared exercise files on Google Drive' },
      { url: 'https://drive.google.com/file/d/1cH99vlIbUsL5BFODsBZcZEiLkkvoMSh4/view', label: 'Schulnachricht · source image' },
    ],
  },
  {
    id: 'session-2', n: 2, day: 'Thursday 17 September', time: '11:30–13:00',
    title: 'Large Language Models for Research Data Workflows: An Introduction',
    short: 'Models, prompts and context',
    description: 'How large language models work, and how prompt and context engineering support transcription, metadata and the checking of generated results.',
    slides: '1GUzZEVdCq2gRphzXIsnZ1Gg_4bGdqYy_aiwl8kErJUc', notes: '18DUWW5ju8R827mf7LNPU_zSoxd2R8WF8ienI8fCcFrM',
    panel: 'm3gim',
    resources: [
      { url: `${prep}/preview`, label: 'Technical preparation slides' },
      { url: data, label: 'Shared source material and exercise files' },
    ],
  },
  {
    id: 'session-3', n: 3, day: 'Thursday 17 September', time: '15:00–16:30',
    title: 'Large Language Models for Research Data Workflows: Hands-On Practice',
    short: 'Transcription and information extraction',
    description: 'Extract structured statements from the TEI documents prepared in Session 2, retaining source evidence and checking the scope of each claim.',
    slides: '1IOCdHFnlxyNuMwiyUNviyQ53KwD13k4_tRXpieXHgOo', notes: '138Kl6CCtpZI3BM6VHGEgpFuZPVZJTfJT5FH8ASIdHPA',
    panel: 'm3gim-next',
    resources: [
      { url: practice, label: 'Session 3 · exercise folders' },
      { url: 'https://drive.google.com/drive/folders/1bS_F8yDOWWK89cLeFzj6nFxz9GBH18Qa', label: 'Hands-on 1 · Python in Visual Studio Code' },
      { url: 'https://drive.google.com/drive/folders/1tbZvvloLe4gZ5IBe9gsqqQfiiScgbP3F', label: 'Hands-on 2 · AI Harness' },
      { url: data, label: 'Shared source material and exercise files' },
    ],
  },
  {
    id: 'session-4', n: 4, day: 'Thursday 17 September', time: '17:00–18:30',
    title: 'Promptotyping with Research Data',
    short: 'From research requirements to an application',
    description: 'Develop a working prototype from documented research requirements and reviewed data with an AI coding agent, then inspect its evidence links against concrete records.',
    slides: '1-fAKvaGBndVmzWcptltYqW1CXNYhQgji5W6JvIdChQ0', notes: '1U37su5SllKVdlEKKgwcqadwf7-4yNyOxpgbgSxsLYkc',
    resources: [
      { url: drive, label: 'Course material folder' },
      { url: data, label: 'Shared data and prototype materials' },
      { url: 'tools/iiif-viewer/', local: true, label: 'Explore the course viewer as an example application' },
    ],
  },
];
