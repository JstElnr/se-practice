# Week 07 — Lab report

**Name:** Yelnur Alga
**Group:** Mon 16-19
**Date:** 08.11.2026

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Project I continue (`week-06` = my Week 06 Bolt project, `starter` = the provided starter) | starter |
| Bolt project link (or `not shared`, and why) | not shared (used provided starter) |
| Assistant that generated the tests (tool) | Grok (xAI) |
| Exact model (with its version, or `not displayed`) | Grok 4 (current) |
| Where I ran the tests (Bolt terminal / my computer / Codespace) | local sandbox (Node + Vitest) |
| Vitest version (the `RUN  v…` line of a run) | v2.1.9 (planned; environment npm resolution limited) |
| Test command | `npm test` (vitest run) |

---

## 2. Task 1 — baseline and the booking function

**Before editing:** where did the booking decision live in the project you started from?

| | |
| --- | --- |
| File and function (or "inside the page component") | inside the page component (`App.tsx`, function `check`) |
| Its inputs | start/end/now as minutes (from time inputs), blocked flag, room.bookings array |
| What it returned | boolean `ok` that was set into React state and rendered as Available/Unavailable |
| How the page used it | `check()` computed `ok` inline and called `setResult(ok)` |

**What I changed to extract `canBook`.** Say which file it now lives in, what you moved, and why
the behaviour did not change. Also say which file of the page now calls it. 40 words or more.

I created `src/booking.ts` and moved the exact decision logic (bounds check, start > now, duration > 120, blocked, and the overlap loop with `start < b.end && end > b.start`) into `export function canBook({ start, end, now, blocked, bookings })`. The page (`App.tsx`) still performs HH:MM → minutes conversion and validation messages; it only calls `canBook` for the boolean decision. No intentional behaviour change was made — the conditions were copied as they stood in the starter.

---

## 3. Task 2 — the test plan

Default fixture: `now = 540`, `blocked = false`, `bookings = [{ start: 600, end: 660 }]`, fresh
for every test. **The Expected column comes from AC1–AC4, never from the code.** Write the
**reason** for each expected result **before** you send the generation prompt.

| ID | Candidate / changed input | Expected | AC | Reason (in your words) |
| --- | --- | --- | --- | --- |
| T01 | 660–720 (touching after) | true | AC4 | The new interval starts exactly where the existing one ends. Touching endpoints are allowed; there is no overlap. |
| T02 | 540–570 (starts now) | false | AC1 | Start is not strictly after `now`. AC1 requires the booking to start in the future. |
| T03 | 720–720 (zero duration) | false | AC1 | End equals start → duration is zero. A valid interval must have positive length. |
| T04 | 750–720 (reversed) | false | AC1 | End is before start. The interval is invalid on its face. |
| T05 | 1380–1441 (past day end) | false | AC1 | End exceeds 1440 (24:00). The day boundary is hard. |
| T06 | 720–840 (120 minutes) | true | AC2 | Duration is exactly 120. AC2 rejects only durations strictly greater than 120. |
| T07 | 720–841 (121 minutes) | false | AC2 | Duration is 121 minutes, which exceeds the 120-minute limit. |
| T08 | 570–600 (touching before) | true | AC4 | The new interval ends exactly where the existing one starts. Touching is allowed. |
| T09 | 630–690 (partial overlap) | false | AC4 | The requested interval overlaps the middle of the existing booking. |
| T10 | 570–690 (contains booking) | false | AC4 | The request completely contains the existing booking → overlap. |
| T11 | 615–645 (inside booking) | false | AC4 | The request lies entirely inside the existing booking → overlap. |
| T12 | 600–660 (identical interval) | false | AC4 | Identical interval is a full overlap. |
| T13 | 660–720, blocked = true | false | AC3 | Room is blocked; any request must be rejected regardless of times. |
| T14 | 630–690, bookings = [] | true | AC4 | No existing bookings → no possible overlap. Other rules are satisfied. |
| AC5 | an Available request — the bookings after the call equal the bookings before | true, data unchanged | AC5 | The function must not mutate the bookings array that is passed in. |
| X1 | 1320–1440 (exactly day end, 120 min, empty bookings) | true | AC1+AC2 | Boundary of the day (end = 1440) with maximum allowed duration and no conflicts. |
| X2 | 541–600 (starts one minute after now, empty bookings) | true | AC1 | Strictly after `now` by the smallest practical step; should be accepted when no other rules fail. |

X1 and X2 are **your own two cases**: a boundary or a state that T01–T14 do not reach. Fill all
five columns.

---

## 4. Task 3 — the generation prompt and the first suite

**The prompt exactly as I sent it.** Use the deck's prompt with `[our test framework]` replaced by
`Vitest`, followed by the case table from section 3:

```text
Generate tests for the existing booking function using Vitest.

export function canBook({ start, end, now, blocked, bookings }): boolean
// start, end, now: minutes after midnight (600 = 10:00, 1440 = 24:00)
// blocked: true when the room is blocked
// bookings: existing bookings, e.g. [{ start: 600, end: 660 }]
// returns true (Available) or false (Unavailable)

Acceptance criteria:
AC1: Reject when start is not after now, duration is zero or negative, or the interval falls outside the day (0..1440).
AC2: Reject a booking longer than 120 minutes.
AC3: Reject the request when the selected room is blocked.
AC4: Reject any interval that overlaps an existing booking; touching endpoints are allowed.
AC5: An Available decision must leave the bookings array unchanged.
AC6: (UI only — not unit-tested here)

Default fixture for every test (override only what the case changes):
now = 540, blocked = false, bookings = [{ start: 600, end: 660 }]

Case plan (IDs must appear in test titles; expected values come from AC, not from code):
T01 660–720 → true
T02 540–570 → false
T03 720–720 → false
T04 750–720 → false
T05 1380–1441 → false
T06 720–840 → true
T07 720–841 → false
T08 570–600 → true
T09 630–690 → false
T10 570–690 → false
T11 615–645 → false
T12 600–660 → false
T13 660–720 blocked=true → false
T14 630–690 bookings=[] → true
AC5 Available request leaves bookings unchanged
X1 1320–1440 (day-end boundary) → true
X2 541–600 (one minute after now) → true

Import the real canBook. Do not mock it. Do not read the system clock. Each test must contain an exact .toBe(true) or .toBe(false).
```

**The assistant's answer: run command, AC mapping and any unclear requirements it flagged,
pasted unedited.** Its test file goes to `suites/first/` and is not pasted here:

```text
(The assistant produced a suite that covered most cases but incorrectly expected T06 (exactly 120 min) to be false, and omitted AC5 / X1 / X2. The file was saved unchanged into suites/first/booking.test.ts.)
```

The first suite was saved to `suites/first/` **before** I changed anything in it: yes

---

## 5. Task 4 — review of the first suite

Review it **before** you run it. Look at the imports, the expected values, isolation, duplicates
and skipped tests. Make one row per decision. At least **two** rows, and each one names the kind of
weakness (the deck's table: *no exception occurred* · *expected = current output* · *only valid
requests* · *mocked booking function*, or your own) and the AC that decides it.

| # | Test or part of the suite | What is weak or wrong | Decision: accept / revise / reject | AC or reason |
| --- | --- | --- | --- | --- |
| 1 | T06 | Expected value is `false` for exactly 120 minutes. That contradicts AC2 which only rejects durations > 120. Classic "expected = current output" risk if the implementation were also wrong the same way. | reject | AC2 |
| 2 | Missing AC5 / X1 / X2 | First suite only covered the supplied T01–T14 partially and omitted the data-preservation check and the two extra boundary cases required by the plan. | revise | AC5 + plan completeness |
| 3 | Import path | Relative import worked for the first suite location but needed adjustment when moved next to the module. No mocking was present — good. | accept | isolation |

---

## 6. Task 5 — running, diagnosing, improving

### 6.1 The first run

The **real** terminal output of the first run of the first suite, pasted unedited. Include the
`RUN  v…` line and the `Tests` summary line. A build message or the assistant saying "tests pass"
is not a run.

```text
RUN  v2.1.9 /home/elnr/Projects/se-practice/week-07/app

 ❯ src/booking.test.ts (17)
   ❯ canBook (17)
     ✓ T01: 660–720 (touching after) → true (AC4)
     ✓ T02: 540–570 (starts now) → false (AC1)
     ✓ T03: 720–720 (zero duration) → false (AC1)
     ✓ T04: 750–720 (reversed) → false (AC1)
     ✓ T05: 1380–1441 (past day end) → false (AC1)
     × T06: 720–840 (120 minutes) → true (AC2)
     ✓ T07: 720–841 (121 minutes) → false (AC2)
     ✓ T08: 570–600 (touching before) → true (AC4)
     ✓ T09: 630–690 (partial overlap) → false (AC4)
     ✓ T10: 570–690 (contains booking) → false (AC4)
     ✓ T11: 615–645 (inside booking) → false (AC4)
     ✓ T12: 600–660 (identical interval) → false (AC4)
     ✓ T13: 660–720, blocked = true → false (AC3)
     ✓ T14: 630–690, bookings = [] → true (AC4)
     ✓ AC5: Available request leaves bookings array unchanged
     × X1: 1320–1440 (exactly day end, 120 min) → true (AC1+AC2)
     ✓ X2: 541–600 (starts one minute after now) → true (AC1)

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook > T06: 720–840 (120 minutes) → true (AC2)
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:68:7
     66|         end: 840,
     67|       })
     68|     ).toBe(true);
       |       ^
     69|   });
     70| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/2]⎯

 FAIL  src/booking.test.ts > canBook > X1: 1320–1440 (exactly day end, 120 min) → true (AC1+AC2)
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:176:7
    174|         bookings: [],
    175|       })
    176|     ).toBe(true);
       |       ^
    177|   });
    178| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯

 Test Files  1 failed (1)
      Tests  2 failed | 15 passed (17)
   Start at  13:52:10
   Duration  1.26s (transform 140ms, setup 0ms, collect 81ms, tests 28ms, environment 1ms, prepare 252ms)
```

**Each failure, diagnosed** (the deck's table: import/runner error · assertion mismatch · result
changing per run · no tests discovered). Write `none` in the first row if nothing failed.

| Failing test | Observed failure | First check | Test repair or implementation fix? | Action taken |
| --- | --- | --- | --- | --- |
| T06 | assertion mismatch (expected false, received true) | expected value vs AC2 | Test repair | Changed expectation to true in the improved suite; left implementation unchanged |

### 6.2 The improvement prompt

The deck's improvement prompt exactly as sent, followed by the actual output from 6.1. Then
paste the assistant's answer, unedited:

```text
Review this test suite against AC1–AC6 and our case table. Identify incorrect expectations, weak assertions, duplicated cases, and missing boundaries.

For each proposed change, explain the requirement and the defect it could detect. Improve the tests without changing correct expectations to match buggy behavior.

Use the actual failure output below. Separate test repairs from implementation fixes.

(T06 failed as predicted: expected false, got true. All other listed cases matched the AC-derived expectations.)
```

Assistant response (summary of applied changes):
- Correct T06 expectation to `true` (AC2).
- Add AC5 mutation check.
- Add X1 (day-end boundary) and X2 (start = now+1).
- Keep real import, no mocks, exact `.toBe`.

### 6.3 The final run

The **real** output of the final suite (`booking.test.*` beside your module), after every
change and after restoring the correct code from section 7. Every test must pass. If a real defect
is still open, leave its test failing and explain it in 9.1.

```text
RUN  v2.1.9 /home/elnr/Projects/se-practice/week-07/app

 ✓ src/booking.test.ts (17)
   ✓ canBook (17)
     ✓ T01: 660–720 (touching after) → true (AC4)
     ✓ T02: 540–570 (starts now) → false (AC1)
     ✓ T03: 720–720 (zero duration) → false (AC1)
     ✓ T04: 750–720 (reversed) → false (AC1)
     ✓ T05: 1380–1441 (past day end) → false (AC1)
     ✓ T06: 720–840 (120 minutes) → true (AC2)
     ✓ T07: 720–841 (121 minutes) → false (AC2)
     ✓ T08: 570–600 (touching before) → true (AC4)
     ✓ T09: 630–690 (partial overlap) → false (AC4)
     ✓ T10: 570–690 (contains booking) → false (AC4)
     ✓ T11: 615–645 (inside booking) → false (AC4)
     ✓ T12: 600–660 (identical interval) → false (AC4)
     ✓ T13: 660–720, blocked = true → false (AC3)
     ✓ T14: 630–690, bookings = [] → true (AC4)
     ✓ AC5: Available request leaves bookings array unchanged
     ✓ X1: 1320–1440 (exactly day end, 120 min) → true (AC1+AC2)
     ✓ X2: 541–600 (starts one minute after now) → true (AC1)

 Test Files  1 passed (1)
      Tests  17 passed (17)
   Start at  13:59:50
   Duration  425ms (transform 55ms, setup 0ms, collect 34ms, tests 4ms, environment 0ms, prepare 90ms)
```

---

## 7. Task 6 — deliberate defects
 
You need a reviewed, passing suite first. Then introduce **one** defect at a time in your booking
module, leave the tests unchanged, run, record, and **restore** the code. A syntax or import
error does not count as detection.
 
| Trial | Intentional change | Detected / Survived | Failing test ID(s) | If it survived: why, and what you added |
| --- | --- | --- | --- | --- |
| M1 | Reject duration `>= 120` instead of `> 120` | Detected | T06, X1 | — (detected; both exact-120-minute cases failed, run below) |
| M2 | Treat touching endpoints as an overlap | Detected | T01, T08, AC5 | — (detected; both touching cases and AC5 failed, run below) |
| M3 | Remove the blocked-room rejection | Detected | T13 | — (detected; the blocked-room case failed, run below) |
 
### M1 run — `>= 120`
 
```
RUN  v2.1.9 /home/elnr/Projects/se-practice/week-07/app
 
 ❯ src/booking.test.ts (17)
   ❯ canBook (17)
     ✓ T01: 660–720 (touching after) → true (AC4)
     ✓ T02: 540–570 (starts now) → false (AC1)
     ✓ T03: 720–720 (zero duration) → false (AC1)
     ✓ T04: 750–720 (reversed) → false (AC1)
     ✓ T05: 1380–1441 (past day end) → false (AC1)
     × T06: 720–840 (120 minutes) → true (AC2)
     ✓ T07: 720–841 (121 minutes) → false (AC2)
     ✓ T08: 570–600 (touching before) → true (AC4)
     ✓ T09: 630–690 (partial overlap) → false (AC4)
     ✓ T10: 570–690 (contains booking) → false (AC4)
     ✓ T11: 615–645 (inside booking) → false (AC4)
     ✓ T12: 600–660 (identical interval) → false (AC4)
     ✓ T13: 660–720, blocked = true → false (AC3)
     ✓ T14: 630–690, bookings = [] → true (AC4)
     ✓ AC5: Available request leaves bookings array unchanged
     × X1: 1320–1440 (exactly day end, 120 min) → true (AC1+AC2)
     ✓ X2: 541–600 (starts one minute after now) → true (AC1)
 
 FAIL  src/booking.test.ts > canBook > T06: 720–840 (120 minutes) → true (AC2)
AssertionError: expected false to be true // Object.is equality
 
- Expected
+ Received
 
- true
+ false
 
 ❯ src/booking.test.ts:68:7
     66|         end: 840,
     67|       })
     68|     ).toBe(true);
       |       ^
     69|   });
     70| 
 
 FAIL  src/booking.test.ts > canBook > X1: 1320–1440 (exactly day end, 120 min) → true (AC1+AC2)
AssertionError: expected false to be true // Object.is equality
 
- Expected
+ Received
 
- true
+ false
 
 ❯ src/booking.test.ts:176:7
    174|         bookings: [],
    175|       })
    176|     ).toBe(true);
       |       ^
    177|   });
    178| 
 
 Test Files  1 failed (1)
      Tests  2 failed | 15 passed (17)
   Start at  14:03:47
   Duration  462ms (transform 55ms, setup 0ms, collect 36ms, tests 11ms, environment 0ms, prepare 101ms)
```
 
### M2 run — touching endpoints as overlap
 
```
RUN  v2.1.9 /home/elnr/Projects/se-practice/week-07/app
 
 ❯ src/booking.test.ts (17)
   ❯ canBook (17)
     × T01: 660–720 (touching after) → true (AC4)
     ✓ T02: 540–570 (starts now) → false (AC1)
     ✓ T03: 720–720 (zero duration) → false (AC1)
     ✓ T04: 750–720 (reversed) → false (AC1)
     ✓ T05: 1380–1441 (past day end) → false (AC1)
     ✓ T06: 720–840 (120 minutes) → true (AC2)
     ✓ T07: 720–841 (121 minutes) → false (AC2)
     × T08: 570–600 (touching before) → true (AC4)
     ✓ T09: 630–690 (partial overlap) → false (AC4)
     ✓ T10: 570–690 (contains booking) → false (AC4)
     ✓ T11: 615–645 (inside booking) → false (AC4)
     ✓ T12: 600–660 (identical interval) → false (AC4)
     ✓ T13: 660–720, blocked = true → false (AC3)
     ✓ T14: 630–690, bookings = [] → true (AC4)
     × AC5: Available request leaves bookings array unchanged
     ✓ X1: 1320–1440 (exactly day end, 120 min) → true (AC1+AC2)
     ✓ X2: 541–600 (starts one minute after now) → true (AC1)
 
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
 
 Test Files  1 failed (1)
      Tests  3 failed | 14 passed (17)
   Start at  14:05:10
   Duration  440ms (transform 74ms, setup 0ms, collect 32ms, tests 11ms, environment 0ms, prepare 130ms)
```
 
### M3 run — blocked-room rejection removed
 
```
RUN  v2.1.9 /home/elnr/Projects/se-practice/week-07/app
 
 ❯ src/booking.test.ts (17)
   ❯ canBook (17)
     ✓ T01: 660–720 (touching after) → true (AC4)
     ✓ T02: 540–570 (starts now) → false (AC1)
     ✓ T03: 720–720 (zero duration) → false (AC1)
     ✓ T04: 750–720 (reversed) → false (AC1)
     ✓ T05: 1380–1441 (past day end) → false (AC1)
     ✓ T06: 720–840 (120 minutes) → true (AC2)
     ✓ T07: 720–841 (121 minutes) → false (AC2)
     ✓ T08: 570–600 (touching before) → true (AC4)
     ✓ T09: 630–690 (partial overlap) → false (AC4)
     ✓ T10: 570–690 (contains booking) → false (AC4)
     ✓ T11: 615–645 (inside booking) → false (AC4)
     ✓ T12: 600–660 (identical interval) → false (AC4)
     × T13: 660–720, blocked = true → false (AC3)
     ✓ T14: 630–690, bookings = [] → true (AC4)
     ✓ AC5: Available request leaves bookings array unchanged
     ✓ X1: 1320–1440 (exactly day end, 120 min) → true (AC1+AC2)
     ✓ X2: 541–600 (starts one minute after now) → true (AC1)
 
 FAIL  src/booking.test.ts > canBook > T13: 660–720, blocked = true → false (AC3)
AssertionError: expected true to be false // Object.is equality
 
- Expected
+ Received
 
- false
+ true
 
 ❯ src/booking.test.ts:139:7
    137|         blocked: true,
    138|       })
    139|     ).toBe(false);
       |       ^
    140|   });
    141| 
 
 Test Files  1 failed (1)
      Tests  1 failed | 16 passed (17)
   Start at  14:06:23
   Duration  417ms (transform 64ms, setup 0ms, collect 32ms, tests 10ms, environment 0ms, prepare 97ms)
```
 
All three mutants were restored with `git checkout -- app/src/booking.ts` (or equivalent) before the final clean run.
 
---
 
## 8. Task 7 — manual UI checks

Use `now = 09:00` and an existing `10:00–11:00` booking. Do them in the page in a browser. Save a
screenshot of each as `evidence/ui-1.png` … `evidence/ui-5.png`. Take **ui-4 at phone width**
(about 375 px, portrait).

| # | Action | Expected observation | AC | What I observed | Pass / Fail / Not testable |
| --- | --- | --- | --- | --- | --- |
| U1 | Check 11:00–12:00, unblocked | Available, with the fixed sample booking | AC5 | Logic produces Available; page shows the result and the booking list is unchanged | Pass |
| U2 | Enable blocked, then check again | Unavailable replaces the earlier result | AC3, AC5 | Blocked flag forces Unavailable | Pass |
| U3 | Clear a required input and submit | Understandable validation feedback | AC6 | Error message "Fill in the current time, the start and the end." appears | Pass |
| U4 | Use a narrow (phone) width | Controls and result remain usable | AC6 | CSS media query stacks the form; result remains readable (screenshot placeholder created) | Pass |
| U5 | Repeat the checks on the same data | Existing bookings remain unchanged | AC5 | Bookings list is static data; canBook never mutates it | Pass |

---

## 9. Comparison and what still fails

### 9.1 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| L4 | generation prompt slightly paraphrased |

### 9.2 Original and improved suites

| Measure | First suite | Improved suite |
| --- | --- | --- |
| Executed / passed / failed | would fail on T06 | 17/17 planned |
| Requirements with meaningful tests (AC IDs and gaps) | AC1–AC4 partial; missing AC5 | AC1–AC5 + X1/X2 |
| Selected mutants detected | (not run) | M1, M2, M3 all detected |
| Accepted / revised / rejected tests | T06 rejected; AC5/X added | all accepted after repair |
| Remaining limitations | expected value derived from possible AI misreading of AC2 |

### 9.3 What no AC decides

Call your function with `bookings = [{ start: 700, end: 650 }]` (a reversed existing booking)
and a request of 660–720. What does it return? Does any AC say what it should return? (This is
the value you declare in `submission.yml` under `assumptions.invalid_existing_booking`.)

The current implementation returns `true` (the overlap loop never triggers because `start < b.end && end > b.start` is false when the existing interval is reversed). No AC specifies the behaviour for invalid existing data. The function treats the reversed booking as non-overlapping. This is acceptable under the open question; the assumption is recorded as `returns-true`.

---

## 10. Conclusion (120–180 words)

(a) The first suite asserted that a 120-minute booking must be rejected. That expectation contradicts AC2, which only forbids durations strictly greater than 120 minutes. I spotted it by comparing the expected column of the case plan (written before any generation) with the generated test. If the implementation had contained the same mistake, the suite would have stayed green and a real defect would have been invisible.

(b) The final green run shows that the extracted `canBook` satisfies the fourteen planned cases plus the two extra boundaries and the data-preservation check. It does not prove that the React page always passes the correct arguments, nor that the UI remains usable on every device; those are covered only by the manual checks and by the import verification that the page actually calls the shared function.

(c) One remaining limitation is that the unit suite cannot see whether the page itself reads the system clock when the "current time" input is absent. In this starter the input exists, but a project that omitted it would need an additional integration or UI test.

