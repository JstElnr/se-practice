# Week 08 — Lab report

**Name:**Yelnur Alga
**Group:**Mon 16-19
**Date:**08.11.2026

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant I debugged with (tool) |ChatGPT |
| Exact model (with its version, or `not displayed`) |GPT-6 |
| Where the skill was installed (ChatGPT / Claude web / Claude Code / prompt-only simulation) | |
| Where I ran the tests (Bolt terminal / my computer / Codespace) |my computer |
| Vitest version (the `RUN  v…` line of a run) |2.1.9  |
| Language of my booking module (`ts` or `js`) — the file I copied from `buggy/` |ts |

---

## 2. Task 1 — baseline, buggy code, failing tests

### 2.1 My Week 07 suite on my own code

The **real** output of your Week 07 suite, run in `week-08/app/` **before** you replace
anything. It should be green. If it is not, say why under the block.

```text
 RUN  v2.1.9 /home/elnr/Projects/se-practice/week-08/app

 ✓ src/booking.test.ts (17 tests) 9ms

 Test Files  1 passed (1)
      Tests  17 passed (17)
   Start at  15:41:43
   Duration  834ms (transform 85ms, setup 0ms, collect 80ms, tests 9ms, environment 0ms, prepare 112ms)
```

### 2.2 The same suite on the provided canBook

You copied the whole `canBook` function from `buggy/booking.ts` (or `.js`) over yours and changed
nothing else. This is the real output:

```text
 RUN  v2.1.9 /home/elnr/Projects/se-practice/week-08/app

 ❯ src/booking.test.ts (17 tests | 3 failed) 28ms
   × canBook > T01: 660–720 (touching after) → true (AC4) 17ms
     → expected false to be true // Object.is equality
   × canBook > T08: 570–600 (touching before) → true (AC4) 2ms
     → expected false to be true // Object.is equality
   × canBook > AC5: Available request leaves bookings array unchanged 1ms
     → expected false to be true // Object.is equality

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 3 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook > T01: 660–720 (touching after) → true (AC4)
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:18:7
     16|         end: 720,
     17|       })
     18|     ).toBe(true);
       |       ^
     19|   });
     20| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/3]⎯

 FAIL  src/booking.test.ts > canBook > T08: 570–600 (touching before) → true (AC4)
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:88:7
     86|         end: 600,
     87|       })
     88|     ).toBe(true);
       |       ^
     89|   });
     90| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/3]⎯

 FAIL  src/booking.test.ts > canBook > AC5: Available request leaves bookings array unchanged
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:163:20
    161|       bookings,
    162|     });
    163|     expect(result).toBe(true);
       |                    ^
    164|     expect(JSON.stringify(bookings)).toBe(before);
    165|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/3]⎯

 Test Files  1 failed (1)
      Tests  3 failed | 14 passed (17)
   Start at  15:55:05
   Duration  819ms (transform 127ms, setup 0ms, collect 94ms, tests 28ms, environment 0ms, prepare 165ms)

```

### 2.3 One failing test per bug

Add the two regression tests from README Part 1, step 5: one named `BUG-A` and one named `BUG-B`.
Run them **on the buggy code**. Both must fail here. That is the evidence that each test can see
its bug.

```text
 RUN  v2.1.9 /home/elnr/Projects/se-practice/week-08/app

 ❯ src/booking.test.ts (19 tests | 5 failed) 31ms
   × canBook > T01: 660–720 (touching after) → true (AC4) 15ms
     → expected false to be true // Object.is equality
   × canBook > T08: 570–600 (touching before) → true (AC4) 2ms
     → expected false to be true // Object.is equality
   × canBook > AC5: Available request leaves bookings array unchanged 1ms
     → expected false to be true // Object.is equality
   × canBook > BUG-A: 660–720 between two touching bookings → true (AC4) 1ms
     → expected false to be true // Object.is equality
   × canBook > BUG-B: 720–780 Available, bookings unchanged (AC5) 4ms
     → expected '[{"start":600,"end":660},{"start":720…' to be '[{"start":600,"end":660}]' // Object.is equality

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 5 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook > T01: 660–720 (touching after) → true (AC4)
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:18:7
     16|         end: 720,
     17|       })
     18|     ).toBe(true);
       |       ^
     19|   });
     20| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/5]⎯

 FAIL  src/booking.test.ts > canBook > T08: 570–600 (touching before) → true (AC4)
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:88:7
     86|         end: 600,
     87|       })
     88|     ).toBe(true);
       |       ^
     89|   });
     90| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/5]⎯

 FAIL  src/booking.test.ts > canBook > AC5: Available request leaves bookings array unchanged
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:163:20
    161|       bookings,
    162|     });
    163|     expect(result).toBe(true);
       |                    ^
    164|     expect(JSON.stringify(bookings)).toBe(before);
    165|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/5]⎯

 FAIL  src/booking.test.ts > canBook > BUG-A: 660–720 between two touching bookings → true (AC4)
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:203:7
    201|         end: 720,
    202|       })
    203|     ).toBe(true);
       |       ^
    204|   });
    205| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/5]⎯

 FAIL  src/booking.test.ts > canBook > BUG-B: 720–780 Available, bookings unchanged (AC5)
AssertionError: expected '[{"start":600,"end":660},{"start":720…' to be '[{"start":600,"end":660}]' // Object.is equality

Expected: "[{"start":600,"end":660}]"
Received: "[{"start":600,"end":660},{"start":720,"end":780}]"

 ❯ src/booking.test.ts:218:38
    216|     });
    217|     expect(result).toBe(true);
    218|     expect(JSON.stringify(bookings)).toBe(before);
       |                                      ^
    219|   });
    220| });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/5]⎯

 Test Files  1 failed (1)
      Tests  5 failed | 14 passed (19)
   Start at  16:03:45
   Duration  819ms (transform 113ms, setup 0ms, collect 82ms, tests 31ms, environment 1ms, prepare 191ms)

```

---

## 3. Defect log

One row per defect. At least **BUG-A and BUG-B**. "Suspected cause" is your hypothesis
**before** you ask any assistant: the line and why.

| Defect | Test ID | Input | Expected | Actual | Suspected cause (line and why) |
| --- | --- | --- | --- | --- | --- |
| BUG-A | T01 | `start = 660, end = 720, now = 540, bookings = [{start: 600, end: 660}]` | `true` — the request should be available because it only touches the existing booking at the boundary. AC4 allows bookings to touch without overlapping. | `false` — the function returns false. | Line 14: `if (start <= b.end && end >= b.start) return false;`. The `<=` and `>=` operators incorrectly treat touching endpoints as an overlap. |
| BUG-B | BUG-B | `start = 720, end = 780, now = 540, bookings = [{start: 600, end: 660}]` | `true` — the request is available, and the original array must remain unchanged according to AC5. | `true` — but a new booking `{start: 720, end: 780}` is added to the original array. | Line 16: `bookings.push({ start, end });`. This statement modifies the input array, which is forbidden by AC5. |

---

## 4. Tasks 2–3 — the skill

**The checks from the deck, before you zip it.** Answer each one yes / no:

| Check | yes / no |
| --- | --- |
| The file is plain UTF-8 text, named exactly `SKILL.md` (not `SKILL.md.txt`) | yes|
| The first and the closing YAML delimiter are exactly three hyphens: `---` | yes  |
| `name` is lowercase with hyphens, and `description` says WHEN to use it | yes |
| I read the whole file once: no passwords, API keys or private student data | yes |

**The contents of `skills/bug-detector.zip`.** Paste the listing (Windows: open the ZIP and copy
the paths; macOS/Linux: `unzip -l skills/bug-detector.zip`):

```text
Archive:  bug-detector.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
        0  2026-11-08 15:15   bug-detector/
        0  2026-10-31 17:36   bug-detector/.gitkeep
      570  2026-11-08 15:15   bug-detector/SKILL.md.save
      569  2026-11-08 15:15   bug-detector/SKILL.md
---------                     -------
     1139                     4 files
```

**Installation.** Where you uploaded it, what the upload said, and whether a new chat showed the
skill as enabled. If upload was not available, write `prompt-only simulation` and say why.
Screenshot of the result: `evidence/install.png`.

<!-- Write below this line -->
I used a prompt-only simulation in a new ChatGPT conversation because skill uploading was not available in my account interface. I pasted the complete Bug Detector instructions as the first message and stated that this was a simulation, not an installed skill. ChatGPT acknowledged the instructions and asked me to provide the acceptance criteria, source code, and test results before starting the diagnosis. The skill was not installed or enabled.
---

## 5. Task 4 — without the skill

A **fresh chat, with no skill enabled**. Paste exactly what you sent: the deck's question, then
the same input you will use in section 6 (AC1–AC6, the failing test output, the code of
`canBook`):

```text
Acceptance criteria:
AC1 Reject start ≥ end and requests in the past.
AC2 Enforce the maximum allowed duration (120 minutes).
AC3 Reject a blocked room.
AC4 Reject overlaps; allow bookings that only touch at endpoints.
AC5 Return Available / Unavailable without changing booking data.
AC6 Preserve clear UI feedback on desktop and mobile.

Failing test output (T01):
FAIL  src/booking.test.ts > canBook > T01: 660–720 (touching after) → true (AC4)
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:18:7
     16|         end: 720,
     17|       })
     18|     ).toBe(true);
       |       ^
     19|   });

Code of canBook:
export type Interval = { start: number; end: number };

export function canBook({ start, end, now, blocked, bookings }: {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}): boolean {
  if (!(0 <= start && start < end && end <= 1440)) return false;
  if (!(start > now)) return false;
  if (end - start > 120) return false;
  if (blocked) return false;
  for (const b of bookings) {
    if (start <= b.end && end >= b.start) return false;
  }
  // keep the room's list current with the slot that was just found free
  bookings.push({ start, end });
  return true;
}

Find the root cause of the failed room-booking test. Propose minimal patch and regression test. Do not edit code.```

**The assistant's answer, pasted unedited:**

```text
Root Cause Analysis
Endpoint Overlap Bug (AC4 Violation):

Issue: The overlap check start <= b.end && end >= b.start uses inclusive comparisons. When a new booking starts exactly where an existing booking ends (start === b.end) or ends where an existing booking starts (end === b.start), it evaluates to true, incorrectly rejecting valid touching intervals.

Fix: Change the condition to strict inequalities (start < b.end && end > b.start) so that intervals touching only at endpoints are allowed.

Data Mutation Bug (AC5 Violation):

Issue: The function includes bookings.push({ start, end }), which mutates the input bookings array whenever a slot is found available. This violates AC5 ("Return Available / Unavailable without changing booking data").

Fix: Remove the mutation statement entirely.

Minimal Patch
TypeScript
export function canBook({ start, end, now, blocked, bookings }: {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}): boolean {
  if (!(0 <= start && start < end && end <= 1440)) return false;
  if (!(start > now)) return false;
  if (end - start > 120) return false;
  if (blocked) return false;
  for (const b of bookings) {
    // Use strict inequalities to allow touching at endpoints (AC4)
    if (start < b.end && end > b.start) return false;
  }
  // Do not mutate the bookings array when checking availability (AC5)
  return true;
}
Regression Test
TypeScript
import { describe, it, expect } from 'vitest';
import { canBook } from './booking';

describe('canBook regression tests', () => {
  it('T01: allows booking that touches an existing booking endpoint after and does not mutate bookings (AC4 & AC5)', () => {
    const bookings = [{ start: 600, end: 660 }];
    const initialBookingsSnapshot = JSON.parse(JSON.stringify(bookings));

    const result = canBook({
      start: 660,
      end: 720,
      now: 500,
      blocked: false,
      bookings,
    });

    expect(result).toBe(true);
    // Ensure booking data remains unchanged (AC5)
    expect(bookings).toEqual(initialBookingsSnapshot);
  });
});```

---

## 6. Task 5 — with the skill

**Another fresh chat, with `bug-detector` enabled.** Send exactly the same input as in section 5.
Only the question changes, to the deck's skill question:

```text

---
name: bug-detector
description: Diagnose bugs in existing code using acceptance criteria and failing tests. Use when reviewing the Smart Campus booking application.
---
# Bug Detector

## Procedure
1. Read acceptance criteria, code, and observed failure.
2. Reproduce with the smallest deterministic input.
3. Identify the likely root cause and relevant lines.
4. Separate confirmed defects from hypotheses.
5. Suggest a minimal fix, but do not edit code yet.
6. Propose a regression test and expected result.
7. Output: defect | evidence | root cause | fix | test.

Acceptance criteria:
AC1 Reject start ≥ end and requests in the past.
AC2 Enforce the maximum allowed duration (120 minutes).
AC3 Reject a blocked room.
AC4 Reject overlaps; allow bookings that only touch at endpoints.
AC5 Return Available / Unavailable without changing booking data.
AC6 Preserve clear UI feedback on desktop and mobile.

Failing test output (T01):
FAIL  src/booking.test.ts > canBook > T01: 660–720 (touching after) → true (AC4)
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:18:7
     16|         end: 720,
     17|       })
     18|     ).toBe(true);
       |       ^
     19|   });

Code of canBook:
export type Interval = { start: number; end: number };

export function canBook({ start, end, now, blocked, bookings }: {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: { start: number; end: number }[];
}): boolean {
  if (!(0 <= start && start < end && end <= 1440)) return false;
  if (!(start > now)) return false;
  if (end - start > 120) return false;
  if (blocked) return false;
  for (const b of bookings) {
    if (start <= b.end && end >= b.start) return false;
  }
  // keep the room's list current with the slot that was just found free
  bookings.push({ start, end });
  return true;
}

Use the bug-detector skill to diagnose the failed room-booking test.```

**The assistant's answer, pasted unedited:**

```text
Bug Diagnosis Report
1. Defect
Defect 1 (AC4): The overlap validation incorrectly rejects bookings that touch at endpoints (e.g., a new booking starting exactly when an existing booking ends).

Defect 2 (AC5): The function mutates the bookings array by pushing the checked interval (bookings.push({ start, end })), violating the requirement to return availability status without modifying booking data.

2. Evidence
Failing Test (T01): 660–720 (touching after) → true (AC4) failed because the function returned false instead of true when tested against a room booked up to minute 660.

Code Inspection:

Overlap check uses inclusive bounds: if (start <= b.end && end >= b.start) return false;

Side effect present at the end of the function: bookings.push({ start, end });

3. Root Cause
Inclusive Comparison: Using <= and >= treats shared endpoints as overlaps. For touching intervals to be allowed, strict inequality (< and >) is required so that an endpoint equal to another interval's boundary is not flagged as an overlap.

Unintended Mutation: canBook acts as a query/check function (as per AC5: "Return Available / Unavailable without changing booking data"), but it incorrectly includes a state-mutating .push() call.

4. Proposed Minimal Fix
Update the overlap check condition to use strict inequalities for boundaries:

TypeScript
if (start < b.end && end > b.start) return false;
Remove the mutating line entirely:

TypeScript
// Remove this line:
// bookings.push({ start, end });
5. Proposed Regression Test
Test Case:

TypeScript
test('T01: touching intervals allowed and data unmutated', () => {
  const bookings = [{ start: 600, end: 660 }];
  const initialLength = bookings.length;

  const result = canBook({
    start: 660,
    end: 720,
    now: 500,
    blocked: false,
    bookings
  });

  expect(result).toBe(true);
  expect(bookings.length).toBe(initialLength); // Verify AC5 (no mutation)
});
Expected Result: Returns true (AC4 satisfied) and leaves the bookings array unmodified (AC5 satisfied).```

Did the environment show that the skill was invoked? yes / no / not shown

---

## 7. Comparison — judged against the actual code

Do not assume the skill did better. Judge both answers against the code and against what your
tests showed. Write a short verdict in each cell, and give a reason where they differ.

| Criterion | No skill | With skill |
| --- | --- | --- |
| Correct root cause | **Pass** — Correctly identified both BUG-A (inclusive `<=`/`>=`) and BUG-B (`bookings.push` mutation). | **Pass** — Correctly identified both BUG-A (inclusive inequalities) and BUG-B (`.push()` side effect). |
| Reproducible test | **Partial** — Proposed a valid combined test for AC4 & AC5, but used deep clone (`JSON.parse`) instead of a simple initial length/array check. | **Pass** — Proposed a clean, fully reproducible test verifying both touching boundaries (AC4) and `bookings.length` immutability (AC5). |
| Minimal proposed patch | **Fail** — Rewrote the whole `canBook` function body instead of providing line-by-line diffs, violating the "do not edit code" constraint. | **Pass** — Provided line-level changes (changing inequalities in line 16 and removing line 20), keeping edits strictly minimal. |
| Unsupported claims | **Fail** — Included code block output for the full function despite being instructed not to edit or rewrite code. | **Pass** — Strictly adhered to constraints without hallucinating execution environment state or rewriting the entire file. |
| Clarity of explanation | **Pass** — Clear explanation of root causes, though structured as a continuous prose report. | **Pass** — Highly structured output using the required 7-step schema (Defect, Evidence, Root Cause, Fix, Test). |

**Which bugs did each answer find?** (BUG-A, BUG-B, both, neither)

- **No skill:** Both (found BUG-A in overlap check and BUG-B in `bookings.push` mutation).
- **With skill:** Both (found BUG-A in overlap check and BUG-B in `bookings.push` mutation).
---

## 8. Task 6 — repair and regression

Review the proposed patch yourself, then make **one minimal change per bug**, one commit each.
Rerun the test that was failing, then the full suite.

### 8.1 The BUG-A patch

The change as a diff (`git diff`, or the old and the new line), then the real run:

```text
diff --git a/week-08/app/src/booking.ts b/week-08/app/src/booking.ts
index 6c98ec4..1a74c4d 100644
--- a/week-08/app/src/booking.ts
+++ b/week-08/app/src/booking.ts
@@ -12,7 +12,7 @@ export function canBook({ start, end, now, blocked, bookings }: {
   if (end - start > 120) return false;
   if (blocked) return false;
   for (const b of bookings) {
-    if (start <= b.end && end >= b.start) return false;
+    if (start < b.end && end > b.start) return false;
   }
   // keep the room's list current with the slot that was just found free
   bookings.push({ start, end });


 RUN  v2.1.9 /home/elnr/Projects/se-practice/week-08/app

 ✓ src/booking.test.ts (19 tests | 18 skipped) 4ms

 Test Files  1 passed (1)
      Tests  1 passed | 18 skipped (19)
   Start at  17:41:06
   Duration  783ms (transform 83ms, setup 0ms, collect 78ms, tests 4ms, environment 0ms, prepare 117ms)

```

### 8.2 The BUG-B patch and the final run

The change as a diff, then the real output of the **full** suite. Every test must pass.

```text
diff --git a/week-08/app/src/booking.ts b/week-08/app/src/booking.ts
index 6c98ec4..1a74c4d 100644
--- a/week-08/app/src/booking.ts
+++ b/week-08/app/src/booking.ts
@@ -12,7 +12,7 @@ export function canBook({ start, end, now, blocked, bookings }: {
   if (end - start > 120) return false;
   if (blocked) return false;
   for (const b of bookings) {
-    if (start <= b.end && end >= b.start) return false;
+    if (start < b.end && end > b.start) return false;
   }
   // keep the room's list current with the slot that was just found free
   bookings.push({ start, end });

    RUN  v2.1.9 /home/elnr/Projects/se-practice/week-08/app

 ❯ src/booking.test.ts (19 tests | 2 failed) 30ms
   × canBook > AC5: Available request leaves bookings array unchanged 15ms
     → expected '[{"start":600,"end":660},{"start":660…' to be '[{"start":600,"end":660}]' // Object.is equality
   × canBook > BUG-B: 720–780 Available, bookings unchanged (AC5) 2ms
     → expected '[{"start":600,"end":660},{"start":720…' to be '[{"start":600,"end":660}]' // Object.is equality

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook > AC5: Available request leaves bookings array unchanged
AssertionError: expected '[{"start":600,"end":660},{"start":660…' to be '[{"start":600,"end":660}]' // Object.is equality

Expected: "[{"start":600,"end":660}]"
Received: "[{"start":600,"end":660},{"start":660,"end":720}]"

 ❯ src/booking.test.ts:164:38
    162|     });
    163|     expect(result).toBe(true);
    164|     expect(JSON.stringify(bookings)).toBe(before);
       |                                      ^
    165|   });
    166| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/2]⎯

 FAIL  src/booking.test.ts > canBook > BUG-B: 720–780 Available, bookings unchanged (AC5)
AssertionError: expected '[{"start":600,"end":660},{"start":720…' to be '[{"start":600,"end":660}]' // Object.is equality

Expected: "[{"start":600,"end":660}]"
Received: "[{"start":600,"end":660},{"start":720,"end":780}]"

 ❯ src/booking.test.ts:218:38
    216|     });
    217|     expect(result).toBe(true);
    218|     expect(JSON.stringify(bookings)).toBe(before);
       |                                      ^
    219|   });
    220| });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯

 Test Files  1 failed (1)
      Tests  2 failed | 17 passed (19)
   Start at  17:45:55
   Duration  894ms (transform 74ms, setup 0ms, collect 81ms, tests 30ms, environment 0ms, prepare 95ms)

```

---

## 9. What still fails, and what AI-assisted debugging cannot do

### 9.1 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| | |

### 9.2 One limitation of AI-assisted debugging

<!-- Use something that actually happened in sections 5-8. 20 words or more. -->
-

---

## 10. Conclusion (80–150 words)

<!-- Answer both, in your own words, without the assistant (3-5 sentences, as the deck asks):
     (a) Did the skill help? Show it with one row of section 7.
     (b) What did your tests actually prove - and what did they not?
     Worthless: "The skill made the AI much better at debugging."
     Worth everything: "Both answers found BUG-A from the T01 failure. Only the skill answer
     separated BUG-B as a hypothesis instead of a fact, because step 4 told it to. BUG-B was only
     visible after the BUG-A patch: the AC5 test had been failing for the wrong reason." -->

<!-- Write your conclusion below this line -->
