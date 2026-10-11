# AI Usage Disclosure — Week 05

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| Claude (Anthropic, claude.ai) | Claude Sonnet 5.5 | the plan (Task 1) | `lab-report.md` §2 |
| Claude (Anthropic, claude.ai) | Claude Sonnet 5.5 | the first version, v1 (Task 2) | `code/original/booking_v1.py`, `code/booking.py` |
| Claude (Anthropic, claude.ai) | Claude Sonnet 5.5 | the tests, the critique (Task 5), the comment-only change, drafts of `lab-report.md` (sections 1–8, 9.2, 9.3, 10), `AI_USAGE.md` and `submission.yml` | `code/test_booking.py`, `code/booking.py` (comments only), `lab-report.md`, `AI_USAGE.md`, `submission.yml` |

**The assistant wrote, or helped write, my tests in `code/`:** yes
<!-- The assistant wrote all 23 tests. Each expected value was written from the AC listed for it in
     lab-report.md §4, not taken from running the function. A first suite of 20 tests missed M10 (AC5),
     and tests 21–23 were then added. -->

**`code/original/` holds the assistant's first answer exactly as returned:** yes

**Everything I submitted, I can explain and defend in class — including the overlap condition:** yes

**Anything I accepted from the AI without fully understanding it:**
I did not read all 23 tests line by line. I rely on the AC column in lab-report.md §4 and on the checker (all F, S and M checks pass).

**How the work was done (disclosure of the process):** The plan, v1, the tests, the critique and
the drafts of the report were produced by the assistant in one long chat that also contained unrelated
earlier conversation, not in a fresh chat, and the prompts of Tasks 1, 2 and 5 were not sent
word for word as in the README. The plan text was written after v1, in the same session. The text of
sections 9.2, 9.3 and 10 of `lab-report.md` was written by the assistant in simple English from ideas
we discussed; I read it and agree with it.

Signed: Yelnur Alga
Date: 11.10.2026