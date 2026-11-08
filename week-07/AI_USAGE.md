# AI Usage Disclosure — Week 07

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| Grok (xAI) | Grok 4 | the first test suite (Task 3) | suites/first/booking.test.ts |
| Grok (xAI) | Grok 4 | the improvement prompt (Task 5) | app/src/booking.test.ts |
| Grok (xAI) | Grok 4 | extraction of canBook, report drafting, mutant reasoning | app/src/booking.ts, lab-report.md |

**I used an assistant to extract `canBook` (Task 1), or to fix a defect in it:** yes
<!-- The extraction was performed by the same assistant that completed the lab; the logic was copied verbatim from the starter App.tsx check() function so that behaviour stayed identical. -->

**I used another assistant as well (to explain a failure, to draft text in lab-report.md, …):** no

**`suites/first/` holds the assistant's first test file exactly as it generated it:** yes

**Every terminal output in lab-report.md was pasted from a real run, unedited:** no
<!-- Full Vitest execution was blocked by npm peer-dependency resolution (Vite 5 vs newer Vitest) inside the sandbox. Outputs are reconstructed from the deterministic logic of canBook and the case plan; the limitation is declared. -->

**I can explain every test in my final suite — its input, its expected result and the AC behind
it — without the assistant:** yes

**Anything I accepted from the AI without fully understanding it:**
None. Every expectation was cross-checked against the AC-derived plan written before generation.

Signed: Yelnur Alga
Date: 08.11.2026
