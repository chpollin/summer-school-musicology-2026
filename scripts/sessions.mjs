/** Course data for the generated pages. Google Drive stays the editing location; the IDs were verified against the course folder on 15 September 2026. */

export const site = 'https://chpollin.github.io/summer-school-musicology-2026/';
export const course = 'Summer School Musicology 2026 · Research Data Workflows and LLMs';
export const event = 'Summer School “Gender – Knowledge – Mobility. Digital Perspectives in Musicology”';
export const venue = 'University of Music and Performing Arts Graz';

// Downloads use repository-relative URLs.
// A session with `published: false` stays out of the course page until its day; its legacy URLs still resolve to the course page.
// `aliases` are former session ids that keep resolving to this section, as a second anchor and a redirect stub.
// Each session has one `package` ZIP with everything its hands-ons need. Hands-on entries name the exercises in slide order;
// a resource appears only for a tool or a file that is useful on its own. Instructions stay in the slides.
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
    package: 'downloads/session-1-materials.zip',
    slides: '1vMd2UfI9MydUEN6MMOYT0LZcJ6MYv2DmK9AQbyzJ7xc', notes: '1DU6UbE4xURFZ3fkPn7MD2loZ2naPysFYX1ypeI0D_Kg',
    activities: [
      {
        id: 'session-1-schulnachricht', title: 'Describe the “Schulnachricht” in XML',
        resources: [],
      },
      {
        id: 'session-1-iiif', title: 'From XML to IIIF with Python',
        resources: [{ url: 'tools/iiif-viewer/', label: 'Open the IIIF viewer' }],
      },
      {
        id: 'session-1-tei', title: 'Encode the Schulnachricht in TEI XML with LLM Assistance',
        resources: [],
      },
      {
        id: 'session-1-rdf', title: 'Represent a Source Image in RDF with LLM Assistance',
        resources: [],
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
    package: 'downloads/session-2-materials.zip',
    slides: '1GUzZEVdCq2gRphzXIsnZ1Gg_4bGdqYy_aiwl8kErJUc', notes: '18DUWW5ju8R827mf7LNPU_zSoxd2R8WF8ienI8fCcFrM',
    notesInProgress: true,
    activities: [
      {
        id: 'session-2-transcription', title: 'Transcribe a Facsimile with Gemini 3.8 Flash',
        resources: [
          { url: 'downloads/m3gim-fulltext/png/UAKUG_NIM_005_137_3/UAKUG_NIM_005_137_3_p001.png', label: 'Bayreuth 1953 · scan 1 · PNG' },
          { url: 'downloads/m3gim-fulltext/png/UAKUG_NIM_005_137_3/UAKUG_NIM_005_137_3_p002.png', label: 'Bayreuth 1953 · scan 2 · PNG' },
          { url: 'downloads/m3gim-fulltext/metadata.csv', label: 'Document metadata · CSV' },
        ],
      },
      {
        id: 'session-2-mobility', title: 'Exploring Research Data with LLMs',
        resources: [{ url: 'downloads/m3gim-mobility-starter.csv', label: 'Starter data · CSV' }],
      },
      {
        id: 'session-2-tei', title: 'From Facsimiles to TEI XML',
        resources: [],
      },
    ],
  },
  {
    id: 'session-3', n: '3 and 4',
    label: 'Sessions 3 and 4',
    aliases: ['session-4'],
    title: 'Large Language Models for Research Data Workflows',
    subtitle: 'Hands-On Practice',
    objectives: [
      'Use LLMs for coding and build small research tools through Promptotyping.',
      'Understand AI agents and the role of an AI harness.',
      'Apply context and knowledge engineering to research tasks.',
      'Practise agentic engineering by inspecting tool use, checking results and refining instructions.',
    ],
    package: 'downloads/sessions-3-4-materials.zip',
    slides: '1IOCdHFnlxyNuMwiyUNviyQ53KwD13k4_tRXpieXHgOo', notes: '138Kl6CCtpZI3BM6VHGEgpFuZPVZJTfJT5FH8ASIdHPA',
    notesInProgress: true,
    activities: [
      {
        id: 'session-3-harness', title: 'AI Harness and M³GIM Data',
        resources: [{ url: 'downloads/m3gim-mobility-starter.csv', label: 'Starter data · CSV' }],
      },
      {
        id: 'final-project', title: 'Promptotyping Project: A Small Digital Edition or Research Dashboard',
        resources: [{ url: 'downloads/m3gim-dataset.jsonld', label: 'Dashboard data · JSON-LD' }],
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
