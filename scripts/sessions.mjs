/** Course data for the generated pages. Google Drive stays the editing location; the IDs were verified against the course folder on 15 September 2026. */

export const site = 'https://chpollin.github.io/summer-school-musicology-2026/';
export const course = 'Summer School Musicology 2026 · Research Data Workflows and LLMs';
export const event = 'Summer School “Gender – Knowledge – Mobility. Digital Perspectives in Musicology”';
export const venue = 'University of Music and Performing Arts Graz';
export const drive = 'https://drive.google.com/drive/folders/1TaqB-BvNt20uAvOCCnQMQBk_2cV0gLjW';
export const prep = 'https://docs.google.com/presentation/d/19zybf1mABP3qM65GXv0xEGVososbhM03P9_INInYPj8';
export const data = 'https://drive.google.com/drive/folders/1Q5iiPsBfiaAWOK7Tuy9Z5LyiO0EUaZFJ';
export const practice = 'https://drive.google.com/drive/folders/1KhFwP1L1iUO6PBKQZGP4p8rxU2vZSfG0';

// Downloads use repository-relative URLs.
// A session with `published: false` stays out of the course page until its day; its legacy URLs still resolve to the course page.
// Hands-on entries list only exercises with material to download or open; instructions stay in the slides.
export const sessions = [
  {
    id: 'session-1', n: 1,
    title: 'Making Estate Materials Digitally Accessible',
    subtitle: 'Research Data Workflows in Stefan Zweig Digital',
    objectives: [
      'Understand what research data is and why it matters.',
      'Understand research data workflows and the role of metadata standards.',
      'Understand the principles of the Semantic Web and Linked Open Data.',
    ],
    slides: '1vMd2UfI9MydUEN6MMOYT0LZcJ6MYv2DmK9AQbyzJ7xc', notes: '1DU6UbE4xURFZ3fkPn7MD2loZ2naPysFYX1ypeI0D_Kg',
    activities: [
      {
        id: 'session-1-schulnachricht', title: 'Describe the “Schulnachricht” in XML',
        resources: [{ url: 'downloads/shared/schulnachricht.jpg', label: 'Source image · Schulnachricht · JPG' }],
      },
      {
        id: 'session-1-iiif', title: 'From XML to IIIF with Python',
        resources: [
          { url: 'downloads/xml-iiif-workshop.zip', label: 'XML to IIIF · complete exercise package · ZIP' },
          { url: 'tools/iiif-viewer/', label: 'Open the IIIF viewer' },
        ],
      },
      {
        id: 'session-1-tei', title: 'Encode the Schulnachricht in TEI XML with LLM Assistance',
        resources: [{ url: 'downloads/shared/schulnachricht.jpg', label: 'Source image · Schulnachricht · JPG' }],
      },
      {
        id: 'session-1-rdf', title: 'Represent a Source Image in RDF with LLM Assistance',
        resources: [{ url: 'downloads/shared/schulnachricht.jpg', label: 'Source image · Schulnachricht · JPG' }],
      },
    ],
  },
  {
    id: 'session-2', n: 2,
    title: 'Large Language Models for Research Data Workflows',
    subtitle: 'An Introduction',
    objectives: [
      'Develop a basic understanding of large language models (LLMs).',
      'Understand the fundamentals of prompt and context engineering.',
      'Gain initial hands-on experience using LLMs in research data workflows.',
    ],
    published: false,
    slides: '1GUzZEVdCq2gRphzXIsnZ1Gg_4bGdqYy_aiwl8kErJUc', notes: '18DUWW5ju8R827mf7LNPU_zSoxd2R8WF8ienI8fCcFrM',
    notesInProgress: true,
    activities: [
      {
        id: 'session-2-transcription', title: 'Transcribe a Facsimile with Gemini 3.8 Flash',
        note: 'Two Zweig facsimiles for the demonstration and your transcription exercise.',
        resources: [{ url: 'downloads/szd-facsimiles.zip', label: 'Input images · ZIP' }],
      },
      {
        id: 'session-2-mobility', title: 'Exploring Research Data with LLMs',
        note: 'Inspect 12 statements from 6 documents and 3 places, then create an interactive timeline as a chat artifact. Follow the prompts in the slides.',
        resources: [{ url: 'downloads/m3gim-mobility-starter.csv', label: 'Mobility starter data · CSV', companion: { url: 'downloads/m3gim-mobility-starter-source.txt', label: 'Sources and field definitions · TXT' } }],
      },
      {
        id: 'session-2-tei', title: 'From Facsimiles to TEI XML',
        note: 'Start with UAKUG_NIM_005_137_3.pdf (2 scans). Use an LLM chat with PDF/image support; an AI harness is optional. Create simple TEI XML, check a passage and a metadata value against the scans, and check XML syntax. Keep your TEI and matching images for the final project. Additional documents are optional.',
        resources: [
          { url: 'downloads/m3gim-fulltext/m3gim-pdf.zip', label: 'Source PDFs · ZIP' },
          { url: 'downloads/m3gim-fulltext/m3gim-png.zip', label: 'Prepared scan images · PNG ZIP', note: 'Use these if your chat needs images; PDF conversion is optional.' },
          { url: 'downloads/m3gim-fulltext/m3gim-instructions.zip', label: 'Instructions, prompts and TEI template · ZIP' },
        ],
      },
    ],
  },
  {
    id: 'session-3', n: '3 and 4',
    label: 'Sessions 3 and 4',
    title: 'Large Language Models for Research Data Workflows',
    subtitle: 'Hands-On Practice',
    objectives: [
      'Use LLMs for coding and build small research tools through Promptotyping.',
      'Understand AI agents and the role of an AI harness.',
      'Apply context and knowledge engineering to research tasks.',
      'Practise agentic engineering by inspecting tool use, checking results and refining instructions.',
    ],
    published: false,
    slides: '1IOCdHFnlxyNuMwiyUNviyQ53KwD13k4_tRXpieXHgOo', notes: '138Kl6CCtpZI3BM6VHGEgpFuZPVZJTfJT5FH8ASIdHPA',
    notesInProgress: true,
    activities: [
      {
        id: 'session-3-harness', title: 'AI Harness and M³GIM Data',
        note: 'Use the 12-statement CSV to inspect data and build one interactive view with plain HTML, CSS and JavaScript. Run it locally; use no libraries, frameworks or build tools. Prompts and preview instructions are in the slides.',
        resources: [{ url: 'downloads/m3gim-mobility-starter.csv', label: 'Mobility starter data · CSV', companion: { url: 'downloads/m3gim-mobility-starter-source.txt', label: 'Sources and field definitions · TXT' } }],
      },
      {
        id: 'final-project', title: 'Promptotyping Project: A Small Digital Edition or Research Dashboard',
        note: 'Choose a research question and create knowledge/data.md, knowledge/research.md and knowledge/specification.md. Follow the slides to plan, implement, verify and refine both code and project knowledge. Work in an AI harness, or upload files to a chat and save its outputs into your project folder.',
        scope: 'Build a local static web application using only plain HTML, CSS and JavaScript. No libraries, frameworks, package installations, build tools, backend, database or external services. Run it via a local static server. Start with one main view and one core interaction.',
        resources: [
          { url: 'downloads/m3gim-fulltext/m3gim-pdf.zip', label: 'Edition · source PDFs · ZIP', note: 'Start from PDFs, reuse any existing transcriptions and develop TEI XML for a small digital edition.' },
          { url: 'downloads/m3gim-dataset.jsonld', label: 'Dashboard · full published M³GIM dataset · JSON-LD', companion: { url: 'downloads/m3gim-dataset-source.txt', label: 'Dataset scope, source revision and licence · TXT' }, note: 'The complete published archive graph for your dashboard; facsimile files are separate.' },
        ],
      },
    ],
  },
];

// Hands-on tools built for this course; listed in their own section at the end of the course page.
export const tools = [
  {
    url: 'tools/iiif-viewer/', title: 'From XML to IIIF viewer',
    note: 'Built for the Session 1 hands-on with Claude Fable 5.1. Select your XML description or generated IIIF manifest with its page images and see them as a digital object in Mirador, entirely in your browser.',
  },
];
