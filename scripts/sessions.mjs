/** Course data for the generated pages. Google Drive stays the editing location; the IDs were verified against the course folder on 15 September 2026. */

export const site = 'https://chpollin.github.io/summer-school-musicology-2026/';
export const course = 'Summer School Musicology 2026 · Research Data Workflows and LLMs';
export const event = 'Summer School “Gender – Knowledge – Mobility. Digital Perspectives in Musicology”';
export const venue = 'University of Music and Performing Arts Graz';
export const drive = 'https://drive.google.com/drive/folders/1TaqB-BvNt20uAvOCCnQMQBk_2cV0gLjW';
export const prep = 'https://docs.google.com/presentation/d/19zybf1mABP3qM65GXv0xEGVososbhM03P9_INInYPj8';
export const data = 'https://drive.google.com/drive/folders/1Q5iiPsBfiaAWOK7Tuy9Z5LyiO0EUaZFJ';
export const practice = 'https://drive.google.com/drive/folders/1KhFwP1L1iUO6PBKQZGP4p8rxU2vZSfG0';

// Downloads and additional resources use repository-relative URLs.
export const sessions = [
  {
    id: 'session-1', n: 1,
    title: 'Making Estate Materials Digitally Accessible',
    subtitle: 'Research Data Workflows in Stefan Zweig Digital',
    description: 'Explore how Stefan Zweig Digital turns estate materials into accessible research data through metadata standards and digital workflows.',
    objectives: [
      'Understand what research data is and why it matters.',
      'Understand research data workflows and the role of metadata standards.',
      'Understand the principles of the Semantic Web and Linked Open Data.',
    ],
    slides: '1vMd2UfI9MydUEN6MMOYT0LZcJ6MYv2DmK9AQbyzJ7xc', notes: '1DU6UbE4xURFZ3fkPn7MD2loZ2naPysFYX1ypeI0D_Kg',
    activities: [
      {
        id: 'session-1-research-data', title: 'What Counts as Research Data, and Who Decides?',
        note: 'Discuss the source and the questions in the slides. No download is required.',
        resources: [{ url: 'https://gams.uni-graz.at/o:szd.947', label: 'Open the Clarissa source' }],
      },
      {
        id: 'session-1-xml-reading', title: 'Reading an XML Metadata Record',
        note: 'Read the XML example in the slides. No additional file is required.',
        resources: [],
      },
      {
        id: 'session-1-schulnachricht', title: 'Describe the “Schulnachricht” in XML',
        note: 'Use the source image and the template in the slides. Save your description as metadata.xml for the next exercise.',
        resources: [{ url: 'downloads/shared/schulnachricht.jpg', label: 'Source image · Schulnachricht · JPG' }],
      },
      {
        id: 'session-1-iiif', title: 'From XML to IIIF with Python',
        note: 'Continue with your XML description. The package includes the Schulnachricht image, example XML, a script and instructions.',
        resources: [
          { url: 'downloads/xml-iiif-workshop.zip', label: 'XML to IIIF · complete exercise package · ZIP' },
          { url: 'tools/iiif-viewer/', label: 'Open the IIIF viewer' },
        ],
      },
      {
        id: 'session-1-tei', title: 'Encode the Schulnachricht in TEI XML with LLM Assistance',
        note: 'Use the slide prompt, check the transcription against the image and save schulnachricht.xml.',
        resources: [{ url: 'downloads/shared/schulnachricht.jpg', label: 'Source image · Schulnachricht · JPG' }],
      },
      {
        id: 'session-1-rdf', title: 'Represent a Source Image in RDF with LLM Assistance',
        note: 'Use the same image and the slide prompt. Save the generated Turtle as source-draft.ttl.',
        resources: [{ url: 'downloads/shared/schulnachricht.jpg', label: 'Source image · Schulnachricht · JPG' }],
      },
      {
        id: 'session-1-rdf-review', title: 'Improve the RDF Model with LLM Assistance',
        note: 'Continue with your source-draft.ttl and the Schulnachricht image. Review the proposed changes using the slides.',
        resources: [],
      },
    ],
    appendix: [
      {
        id: 'session-1-appendix-iiif', title: 'Explore IIIF Manifests in Mirador',
        note: 'Appendix exercise. The manifest links and comparison questions are in the slides.',
        resources: [],
      },
      {
        id: 'session-1-appendix-dc', title: 'Analyse a Dublin Core Record',
        note: 'Appendix exercise. Use the Dublin Core record and questions in the slides.',
        resources: [],
      },
    ],
    additional: [
      { url: 'downloads/pdf-to-images.zip', label: 'Optional preparation · PDF pages as images · ZIP', note: 'Standalone conversion practice; not required for the Session 1 exercises.' },
      { url: drive, label: 'Original course materials on Google Drive' },
    ],
  },
  {
    id: 'session-2', n: 2,
    title: 'Large Language Models for Research Data Workflows',
    subtitle: 'An Introduction',
    description: 'Explore how LLMs can help extract, structure and verify research data through practical work with historical sources.',
    objectives: [
      'Develop a basic understanding of large language models (LLMs).',
      'Understand the fundamentals of prompt and context engineering.',
      'Gain initial hands-on experience using LLMs in research data workflows.',
    ],
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
    additional: [
      { url: 'downloads/shared/szd-facsimile-0.jpg', label: 'Transcription demonstration · individual image · JPG' },
      { url: 'downloads/shared/szd-facsimile-1.jpg', label: 'Transcription exercise · individual image · JPG' },
      { url: 'downloads/m3gim-fulltext/m3gim-reference.zip', label: 'From Facsimiles to TEI XML · reference solutions · ZIP' },
      { url: 'downloads/m3gim-fulltext/reference.json', label: 'From Facsimiles to TEI XML · reference transcriptions · JSON' },
      { url: 'downloads/m3gim-fulltext/metadata.csv', label: 'From Facsimiles to TEI XML · reference metadata · CSV' },
      { url: `${prep}/preview`, label: 'Technical preparation guide' },
    ],
  },
  {
    id: 'session-3', n: '3 and 4',
    label: 'Sessions 3 and 4',
    title: 'Large Language Models for Research Data Workflows',
    subtitle: 'Hands-On Practice',
    description: 'Explore M³GIM, try an AI harness with a small CSV, then use Promptotyping to build a digital edition or research dashboard.',
    objectives: [
      'Use LLMs for coding and build small research tools through Promptotyping.',
      'Understand AI agents and the role of an AI harness.',
      'Apply context and knowledge engineering to research tasks.',
      'Practise agentic engineering by inspecting tool use, checking results and refining instructions.',
    ],
    slides: '1IOCdHFnlxyNuMwiyUNviyQ53KwD13k4_tRXpieXHgOo', notes: '138Kl6CCtpZI3BM6VHGEgpFuZPVZJTfJT5FH8ASIdHPA',
    notesInProgress: true,
    activities: [
      {
        id: 'session-3-exploration', title: 'Exploring M³GIM',
        note: 'Investigate the prototype, inspect source evidence and turn a gap into a research requirement. No download is required.',
        resources: [{ url: 'https://dhcraft.org/m3gim', label: 'Open the M³GIM prototype' }],
      },
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
    additional: [
      { url: 'downloads/m3gim-fulltext/m3gim-next-session.zip', label: 'Final project · reference transcriptions, TEI and page images · ZIP', companion: { url: 'downloads/m3gim-fulltext/NEXT-SESSION.md', label: 'Reference package contents and reuse · Markdown' }, note: 'Optional fallback with seven documents and 40 scans. Use your own work where available.' },
      { url: 'downloads/m3gim-jsonld-example.jsonld', label: 'M³GIM exploration · single-record JSON-LD example', companion: { url: 'downloads/m3gim-jsonld-example-source.md', label: 'Example explanation and source' } },
      { url: 'downloads/python-vscode.zip', label: 'Optional preparation · run PDF conversion in VS Code · ZIP' },
      { url: 'downloads/ai-harness.zip', label: 'Optional preparation · delegate PDF conversion to an AI harness · ZIP', note: 'Both conversion packages contain the same script and seven PDFs.' },
      { url: 'downloads/shared/prompts.md', label: 'Optional project example · Bayreuth Cast Explorer prompts', note: 'Use with suitable programme pages from the source PDFs.' },
      { url: 'downloads/shared/plakattext-pl04.txt', label: 'Optional project example · poster text · TXT', note: 'Text input for an extraction or edition experiment.' },
      { url: 'downloads/shared/orte-lookup.csv', label: 'Optional project example · place lookup · CSV', note: 'A separate place-data example; verify matches before combining it with another dataset.' },
      { url: 'downloads/shared/personenindex-uebung.xlsx', label: 'Optional project example · person index · XLSX', note: 'A separate exercise for inspecting and structuring person data.' },
      { url: 'downloads/shared-materials.zip', label: 'Optional examples · collected files · ZIP', note: 'The examples above plus the Schulnachricht and Zweig images; choose only the files relevant to your project.' },
    ],
  },
];
