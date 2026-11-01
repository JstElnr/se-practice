# AI Usage Disclosure — SIS #03

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched | Reused from |
| --- | --- | --- | --- | --- |
| Gemini | not displayed | the plan (stage A) and the Bolt prompt | `report.md` section 4, section 11 B1 | this SIS |
| Claude (claude.ai) | Claude Sonnet 5.5 | Python v1 (stage B) | `code/original/booking_v1.py` | this SIS (fresh) |
| Bolt.new | not displayed | web prototype v1 (stage B) | `web/original/` | this SIS (fresh) |
| Claude (claude.ai) | Claude Sonnet 5.5 | critique (stage C) | `report.md` section 8 and B3 | this SIS |
| Claude (claude.ai) | Claude Sonnet 5.5 | repair (stage D): five changes, rebuild, retest | `web/final/`, `report.md` section 7 and B4 | this SIS |
| Claude (claude.ai) | Claude Sonnet 5.5 | test runs, screenshots, report structural data | `report.md` sections 3–9 and 12–13, `evidence/before-1.png`, `after-1.png`, `final-narrow.png`, `submission.yml`, this file | this SIS |

**The assistant wrote, or helped write, my tests in `code/`:** yes
<!-- `code/test_booking.py` (23 tests) and `code/booking.py` come from my Week 05 work, which Claude wrote. Each expected value was written from the AC in Week 05 lab-report section 4, not taken from running the function; in this SIS Claude re-ran them and the checker (U1, U2, M1–M10 pass) and the T1–T11 results match AC1–AC5. -->

**`code/original/` and `web/original/` hold the AI's first versions exactly as returned:** yes
<!-- `booking_v1.py` is Claude's first answer in section 11 B2, saved before any change. `web/original/` is the unedited Bolt export. -->

**Every result in report.md section 5 was actually run or seen, not assumed:** yes
<!-- Python results were run with the real files. Page results were run by Claude in headless Chromium (Playwright) with the clock fixed at 09:00; I did not click through them myself. -->

**Everything I submitted, I can explain and defend in class — including the overlap condition
and what the agent did in section 9:** yes
<!-- I must re-read section 3 and section 9 before class. -->

**Anything I accepted from the AI without fully understanding it:**
`web/final/src/components/RequestForm.tsx` (the `fromInputValue` parsing) and `web/final/src/App.tsx` (`defaultStart`); the 23 unit tests in `code/test_booking.py` I did not read line by line.

**How the work was done (disclosure of the process):**

- Claude (claude.ai) performed steps at my request: it produced Python v1, the critique and the repairs, ran the tests, took the three screenshots `before-1.png`, `after-1.png` and `final-narrow.png` with headless Chromium, and drafted technical structures in `report.md` (sections 3–9, 12–13) and `submission.yml`.
- The prompts of B2, B3 and B4 were composed by Claude and run in the chat.
- My own work: section 2 of `report.md` (written in my own words), Section 10 Reflection (written in my own words reflecting my findings), the choice of tools, the Bolt run (prompt, v1 export, `web-v1.png`, `bolt-preview-2.png`, `bolt-preview-3.png`), and final review, commits and pull request.
- The plan B1 was produced by another assistant, named in the first row of the table above.

Signed: Yelnur Alga
Date: 2026-11-01