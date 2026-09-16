# KUG Summer School 2026 — Bayreuth 1953 prompts

These optional prompts support an independent Cast Explorer project. Follow the final-project workflow in the Sessions 3 and 4 slides and record sources and requirements in knowledge/data.md and knowledge/research.md. They use the Bayreuth Festival 1953 programme booklets from the M³GIM source packet. Work on one page at a time and keep the supplied `source_id` and `page_id` unchanged.

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

Use the supplied validated JSON and the four project knowledge files:
- project.md defines the question, scope, and users.
- data-model.md defines occurrences, participations, functions, stage roles, evidence types, and uncertainty.
- design.md defines the views and interaction rules.
- validation.md defines acceptance checks.

Required views:
1. Performance list with date, work, and evidence type.
2. Cast matrix or filterable person list showing functions and stage roles. A participation with two roles must display both roles.
3. Evidence detail showing source_id, page_id, evidence type, exact quotation, certainty, and validation note.

Required behaviour:
- Filters update visible records without changing the underlying data.
- Every displayed assignment links to its evidence detail.
- Conflicting source statements remain side by side and are labelled by evidence type.
- Missing and uncertain values remain visible.
- The interface uses no map as its primary view because the selected performance occurrences share the same festival location.
- The application runs locally as a static HTML, CSS, and JavaScript project.

Before implementation, summarize the proposed data flow and list any schema mismatch. After implementation, test the double-role case, source filtering, evidence links, missing values, and narrow-screen layout. Record the test results in validation.md.
```

## Workshop acceptance checks

- The transcription can be aligned with the page image.
- Every participation carries a source and page reference.
- Functions and stage roles remain distinct.
- Multiple roles for one person remain within one participation.
- Source-type differences remain visible during comparison.
- The prototype uses the human-validated dataset and exposes its evidence.
