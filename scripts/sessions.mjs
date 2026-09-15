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
      { url: 'downloads/shared/schulnachricht.jpg', local: true, label: 'Schulnachricht · source image' },
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
    id: 'session-3', n: '3 and 4', day: 'Thursday 17 September', time: '15:00–16:30 and 17:00–18:30',
    label: 'Sessions 3 and 4',
    title: 'Large Language Models for Research Data Workflows: Hands-On Practice',
    short: 'Promptotyping · guided practice and independent work',
    description: 'Use LLMs for coding and build small research tools through Promptotyping. Maintain project knowledge, select useful context and guide tool-supported agent work with checks and feedback.',
    stages: [
      { title: 'Session 3 · Guided hands-on · 15:00–16:30', text: 'Work through a cumulative exercise with the supplied research materials. Inspect the inputs, document the requirements, use an agent to implement a first working tool and check the result together.' },
      { title: 'Session 4 · Independent work · 17:00–18:30', text: 'Continue from the guided exercise. Choose a research requirement, provide the relevant project context, implement it with the agent and inspect the result against the sources.' },
    ],
    slides: '1IOCdHFnlxyNuMwiyUNviyQ53KwD13k4_tRXpieXHgOo', notes: '138Kl6CCtpZI3BM6VHGEgpFuZPVZJTfJT5FH8ASIdHPA',
    panel: 'm3gim-next',
    resources: [
      { url: 'downloads/python-vscode.zip', local: true, label: 'Hands-on 1 · Python in Visual Studio Code · ZIP', note: 'Instructions, Python script and all seven input PDFs.' },
      { url: 'downloads/ai-harness.zip', local: true, label: 'Hands-on 2 · AI Harness · ZIP', note: 'Repeat the same workflow with an agent using the supplied script and PDFs.' },
      { url: practice, label: 'Original exercise folders on Google Drive' },
      { url: 'https://drive.google.com/drive/folders/1bS_F8yDOWWK89cLeFzj6nFxz9GBH18Qa', label: 'Hands-on 1 · Python in Visual Studio Code' },
      { url: 'https://drive.google.com/drive/folders/1tbZvvloLe4gZ5IBe9gsqqQfiiScgbP3F', label: 'Hands-on 2 · AI Harness' },
      { url: data, label: 'Shared source material and exercise files' },
    ],
  },
];
