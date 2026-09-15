# M³GIM JSON-LD example

This teaching excerpt accompanies the research-data workflow slide in Sessions 3 and 4. It includes the context needed to interpret every term in the example.

The excerpt selects record `m3gim-data:NIM_003_1_1` and its Potsdam location from the [public M³GIM dataset](https://dhcraft.org/m3gim/data/m3gim.jsonld), retrieved on 15 September 2026. The original record also includes Salzburg and further description and provenance fields. The original location list is shortened to one object here, as on the slide.

`@id` identifies the record, `@type` identifies the entity class, and `rico:hasOrHadLocation` connects the record with a place. The project-specific role classifies Potsdam as a performance place. `@context` maps the shortened prefixes and the terms `name` and `role` to their full identifiers.

This is a statement recorded in the current project data. It does not by itself establish that Ira Malaniuk performed there. Use the linked archival evidence to investigate what the record supports. The M³GIM interface and dataset are works in progress.

The example is a valid standalone JSON-LD fragment containing selected fields from the original record. The [JSON-LD 1.1 specification](https://www.w3.org/TR/json-ld11/) explains the context mechanism.
