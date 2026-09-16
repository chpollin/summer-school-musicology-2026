# KUG Summer School 2026 — Bayreuth 1953 prompts

These optional prompts provide a Cast Explorer example for **Promptotyping Project: A Small Digital Edition or Research Dashboard** in Sessions 3 and 4. Maintain `knowledge/data.md`, `knowledge/research.md` and `knowledge/specification.md` using the workflow in the slides. The prompts use the Bayreuth Festival 1953 programme booklets from the M³GIM source packet. Work on one page at a time and keep the supplied `source_id` and `page_id` unchanged.

The source types support different claims. A daily programme documents an announced cast for one date. A season list documents a season-level assignment. A biography documents a statement made in that biography. None of these sources independently proves that a performance took place exactly as announced.

## Prompt 1 — Source-faithful page transcription

Upload one permitted page image and insert its identifiers.

```text
You are preparing a source-faithful working transcription for a research-data exercise.

SOURCE_ID: [insert the M3GIM object identifier]
PAGE_ID: [insert the scan page or folio identifier]
DOCUMENT_TYPE: [daily_program | season_list | biography]

Transcribe only the supplied page image.

Rules:
- Preserve spelling, capitalization, punctuation, abbreviations, and visible line breaks.
- Preserve the reading order of columns. Insert [COLUMN BREAK] between columns.
- Mark an unreadable passage as [unclear]. Do not guess.
- Mark a partly readable passage as [unclear: possible reading].
- Do not silently correct names, dates, roles, or typographical errors.
- Do not translate, summarize, normalize, or explain the text.
- Do not add information from general knowledge.

Return exactly this structure:

SOURCE_ID: ...
PAGE_ID: ...
DOCUMENT_TYPE: ...
TRANSCRIPTION:
...
```

## Prompt 2 — Evidence-linked cast extraction

Provide the checked transcription from Prompt 1. The schema represents a performance as an `occurrence` and a person's contribution as a `participation`. One participation may contain several stage roles.

```text
Transform the supplied checked transcription into JSON for a source-critical cast dataset.

Research question:
How do daily programmes, season lists, and biographies represent who was announced to do what at the Bayreuth Festival in 1953?

Extraction rules:
- Use only statements explicitly supported by the supplied transcription.
- Preserve SOURCE_ID and PAGE_ID exactly.
- Set evidence_type to daily_program, season_list, biography, or object_metadata.
- Treat a daily programme or season list as evidence of an announced or documented assignment. Do not claim that the performance was realised as announced.
- Represent the dated work or programme as an occurrence.
- Represent each person's contribution as one participation.
- Put musical or production functions such as conductor, chorus director, or stage director in functions.
- Put performed characters in stage_roles.
- If one person has two characters in the same occurrence, keep one participation and record both values in stage_roles.
- Preserve source spelling in value_as_written. Add normalized only when the match is supported by the supplied data.
- Copy a short exact evidence quotation for every participation.
- Use null for absent values. Do not invent identifiers.
- Put unresolved readings or classifications in unresolved.

Return valid JSON only and follow this structure:

{
  "source_id": "...",
  "page_id": "...",
  "evidence_type": "daily_program | season_list | biography | object_metadata",
  "occurrences": [
    {
      "occurrence_id": "...",
      "status": "announced | documented",
      "date": {
        "value_as_written": "...",
        "normalized": "YYYY-MM-DD or null",
        "certainty": "certain | uncertain"
      },
      "work": {
        "value_as_written": "...",
        "normalized": "... or null",
        "work_id": null
      },
      "place": {
        "value_as_written": "... or null",
        "normalized": "... or null",
        "place_id": null
      },
      "participations": [
        {
          "participation_id": "...",
          "person": {
            "value_as_written": "...",
            "normalized": "... or null",
            "person_id": null
          },
          "functions": ["..."],
          "stage_roles": ["..."],
          "evidence": {
            "source_id": "...",
            "page_id": "...",
            "quote": "..."
          },
          "certainty": "certain | uncertain"
        }
      ]
    }
  ],
  "document_statements": [],
  "unresolved": [
    {
      "value": "...",
      "reason": "...",
      "evidence": {
        "source_id": "...",
        "page_id": "...",
        "quote": "..."
      }
    }
  ]
}
```

## Prompt 3 — Cross-source validation without silent merging

Provide two or more extracted JSON objects and, where possible, the relevant page transcriptions.

```text
Compare the supplied Bayreuth 1953 records at assertion level.

Validation rules:
- Keep daily_program, season_list, biography, and object_metadata as distinct evidence types.
- Compare dates, works, names, functions, and stage roles with their source quotations.
- Report spelling differences separately from substantive differences.
- Report when the same person has several functions or stage roles.
- Do not choose a preferred value unless the supplied evidence justifies that decision.
- Do not merge conflicting statements.
- Do not infer that an announced cast was the realised cast.
- Preserve every source_id and page_id.

First return a Markdown table with these columns:
assertion | source and page | evidence type | extracted value | comparison | decision | reason

Then return corrected JSON objects under the heading CORRECTED JSON. Corrections must preserve source-specific statements and must include a short reason in unresolved or validation_notes.
```

## Prompt 4 — Promptotype a Bayreuth 1953 cast explorer

Use a small human-validated JSON dataset. Do not build the application directly from unchecked model output.

```text
Build a small static browser application called Bayreuth 1953 Cast Explorer.

Research question:
How do daily programmes, season lists, and biographies represent who was announced to do what at the Bayreuth Festival in 1953?

Use the supplied validated JSON and the three project knowledge documents:
- knowledge/data.md describes sources, structure, provenance and limitations.
- knowledge/research.md defines the question, method and research decisions.
- knowledge/specification.md defines scope, requirements and acceptance criteria.

First version:
- Create one view listing documented cast assignments with person, work and date.
- Implement one core interaction: selecting an assignment reveals its source_id, page_id, evidence type, quotation, certainty and validation note within the same view.
- Show functions and stage roles separately. Display both roles when a participation has two roles.
- Conflicting source statements remain side by side and are labelled by evidence type.
- Missing and uncertain values remain visible.
- Use short labels and a compact interface.
- Preserve original sources and identifiers.
- Build a local static website using only plain HTML, CSS and JavaScript.
- Use no libraries, frameworks, external dependencies, backend, database or build tools.
- Keep application assets and data local. Source links may point to their original location.

Before implementation, read knowledge/ and report any mismatch between the data and requirements. Implement the agreed first version, start it locally and give me the browser URL with brief start and stop instructions.
```

## Iterate with the project knowledge

Run these prompts separately and review each result before continuing.

```text
Verify: Check the result against knowledge/specification.md and the source data. Check the double-role case, evidence selection, missing values and narrow-screen layout. Report what passed, failed or remains unverified. Give me a short checklist for scholarly review.
```

```text
Fix and refactor the code: Fix confirmed errors first and verify the fixes. Then simplify the code and remove duplication without changing behaviour. Repeat the affected checks.
```

```text
Update and refactor the knowledge: Update knowledge/ with what we learned. Remove duplication and flag contradictions or outdated assumptions. Keep data findings in data.md, research decisions in research.md, and requirements in specification.md. Distinguish verified findings from open questions.
```

```text
Plan the next iteration: Compare the current result with our research question and requirements. Propose the next small milestone and explain what it would improve. Keep later features outside the first version until we choose to add them.
```

## Workshop acceptance checks

- The transcription can be aligned with the page image.
- Every participation carries a source and page reference.
- Functions and stage roles remain distinct.
- Multiple roles for one person remain within one participation.
- Source-type differences remain visible during comparison.
- The prototype uses the human-validated dataset and exposes its evidence.
