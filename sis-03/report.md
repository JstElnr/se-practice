# SIS #03 — Report: Smart Campus Room Availability Checker

<!-- The ONLY file you write prose in. Keep every numbered heading (## 1. … ## 13.) and every
     ### sub-heading, and the **Label:** words — the checker finds your answers by them.
     Replace every "(write here)" and "(paste here)". Delete these <!-- --> comments if you like. -->

## 1. Setup and reuse

<!-- Model: the exact model with its version, as the tool shows it ("ChatGPT" is a tool, not a
     model). If the tool does not show it, write: not displayed
     Reuse: week-05 if code/original/booking_v1.py is your Week 05 v1, copied unedited;
     week-06 if web/original/ is your Week 06 v1 export; fresh if you generated it for this SIS. -->

| Item | Value |
| --- | --- |
| Coding assistant (tool) | Claude (claude.ai) |
| Coding assistant model | Claude Sonnet 5.5 |
| Bolt.new model | not displayed |
| Bolt project link | not-shared |
| Language | Python 3.12 |
| Path | A |
| Python v1 from | fresh |
| Web v1 from | fresh |

## 2. Baseline — before any new AI exchange

<!-- Written by you, without AI, before the first exchange of this SIS. Commit and push it
     first (README §2). Reusing Week 05/06 work does not exempt you: this section is new. -->

### 2.1 Scope in my own words

**Scope:** An automated availability checker for smart-campus rooms. It handles booking requests by looking at the current time, the duration limit, whether the room is blocked, and the list of existing bookings, so that time conflicts are prevented.

### 2.2 The acceptance criteria in my own words

| AC | In my own words |
| --- | --- |
| AC1 | Times are whole minutes after midnight (0 ≤ start < end ≤ 1440). The start must be strictly later than the current time (now). |
| AC2 | A booking may not last longer than 120 minutes (exactly 120 minutes is allowed). |
| AC3 | If the room is blocked (blocked = True), every booking request is refused. |
| AC4 | If the requested interval overlaps any existing booking, the request is refused. Two intervals that only touch at an end (for example, the first booking ends exactly when the second begins) do not count as overlapping. |
| AC5 | The result (Available or Unavailable) is shown clearly and unambiguously. The existing bookings in the data/state are not changed. |
| AC6 | The interface gives clear, readable messages about input errors, and it is comfortable to use on narrow mobile screens. |

### 2.3 Likely failure points

<!-- At least two. The brief's examples: endpoint overlap, starts-now. -->

| # | Failure point | AC | How I will check it |
| --- | --- | --- | --- |
| 1 | Boundary conditions and comparison operators: mistakes such as < instead of <= when checking the 120-minute limit, or when handling bookings that touch at an end. | AC2, AC4 | Write tests with a duration of exactly 120 minutes and with adjoining intervals (the end of one booking equals the start of another). |
| 2 | Unordered data: the existing set is passed in random order, which could break the interval-checking logic. | AC4, AC5 | Pass shuffled existing sets in the tests to confirm the algorithm is not sensitive to order. |

### 2.4 The contract

| Parameter | Meaning | Type and allowed values |
| --- | --- | --- |
| `start` | the start time of the requested booking | int, minutes after midnight, 0–1440 |
| `end` | the end time of the requested booking | int, minutes after midnight, 0–1440 |
| `now` | the current time | int, 0–1439, always valid |
| `blocked` | administrative block on the room | bool: True or False |
| `existing` | the bookings that already exist for the room | a set or list of (start, end) pairs |
| returns | whether the booking is possible | strictly bool: True (possible) or False (refused) |

### 2.5 Initial assumptions and manual checks

**Assumptions:**

1. The parameter now is always valid and lies in the range 0–1439, and the timeline within one day is strictly limited to 1440 minutes.
2. The blocked status is passed as one single flag, blocked, that applies to the whole checked period.

**Checked manually:**

- Check how the system behaves for values at the very edges of the day (near 0 and 1440 minutes).
- Switch the blocked state by hand in the interface and check how the form reacts.

## 3. Python v1 review

<!-- One row per conditional branch in code/original/booking_v1.py. -->

| Branch in v1 (quoted) | AC | Satisfies it? | Why |
| --- | --- | --- | --- |
| `if not (0 <= start < end <= 1440): return False` | AC1 | Yes | Rejects reversed and zero-length intervals (`start < end`), a negative start and an end after 1440; an end of exactly 1440 passes, as AC1 allows. |
| `if start <= now: return False` | AC1 | Yes | The start must be strictly after now, so `start == now` (T6) is rejected. |
| `if end - start > 120: return False` | AC2 | Yes | `>` lets exactly 120 minutes through (T4) and rejects 121 (T5). |
| `if blocked: return False` | AC3 | Yes | Any blocked room rejects every request, before the bookings are even looked at (T3). `blocked` is a bool by the contract. |
| `if start < ex_end and ex_start < end: return False` (inside `for ex_start, ex_end in existing`) | AC4 | Yes | Both comparisons are strict, so intervals that only touch do not overlap (T1); every booking is examined, so an overlap with a later one is found (T10). |
| `return True` | AC1–AC5 | Yes | Reached only when no rejection fired; `existing` is only read, never changed (T11). |

Python v1 passes every case T1–T11, so it is identical in behaviour to my final `can_book`; the final only gains a docstring and an explanatory comment (reused from my Week 05 final).

## 4. Prototype v1 in Bolt.new

**Prompt as sent:**

~~~~text
Create a single-page responsive web application for a Smart Campus Room Availability Checker for ONE room with fictional booking data.

CRITICAL CONSTRAINTS:
- Strictly NO login, NO backend, NO database, NO external APIs, NO payments, and NO storage.
- The page ONLY checks availability and displays results; it does NOT create or save new bookings.
- Must be fully responsive with a clean, usable narrow/mobile layout (AC6).

AC1-AC6 BUSINESS LOGIC TO IMPLEMENT:
- AC1: Time is given in integer minutes after midnight (0 <= start < end <= 1440). Start time must be strictly after the current time (now).
- AC2: Maximum duration is 120 minutes. Exactly 120 minutes is allowed.
- AC3: If the room is blocked (toggle/flag), every availability request must be rejected.
- AC4: Reject overlap with any existing fictional booking. Touching at an endpoint (e.g., one ends when another starts) is NOT an overlap and must be allowed.
- AC5: Result must clearly and unambiguously display "Available" or "Unavailable" with validation feedback messages (AC6), ensuring existing bookings data is not mutated.

Provide an interactive UI where users can adjust start/end times, see existing bookings/blocks visually, and instantly see the availability status.
~~~~

<!-- Main generated files -->

| Generated file or component | Path | Its role |
| --- | --- | --- |
| Availability rules | `src/lib/availability.ts` | `checkAvailability()` implements AC1–AC4: bounds, duration, blocked room and overlap; it returns `available`, a list of messages and the conflicting bookings. |
| Fictional data | `src/data/room.ts` | One room (Room 204) with six hard-coded fictional bookings and the `INITIAL_BLOCKED` flag. |
| Page state | `src/App.tsx` | Holds start, end and blocked; calls `checkAvailability` on every change and wires the components together. |
| Request form | `src/components/RequestForm.tsx` | Two dropdowns (start and end) in 15-minute steps and the duration line. |
| Result panel | `src/components/ResultPanel.tsx` | Shows a green "Available" or a red "Unavailable" with one message per failed rule (AC5, AC6). |
| Day timeline | `src/components/DayTimeline.tsx` | A 24-hour bar with the bookings, the requested slot and a "now" marker. |

Bolt's own chat reply was not saved, so there is no Bolt response in section 11; the generated project in `web/original/` is the output. The v1 screenshot is `evidence/web-v1.png`.

**What v1 does:**

- One room, one page: the visitor picks start and end from dropdowns (00:00–24:00, 15-minute steps) and a "Block room" switch toggles AC3.
- The result panel shows Available or Unavailable at once, with one message per broken rule; conflicting bookings are highlighted in the list and drawn on a day timeline.
- It reads the real clock for "now", has no login, backend or Check button, and never changes the booking list. Its `package.json` still lists `@supabase/supabase-js`, which nothing imports.

## 5. Test cases — executed on both artifacts

<!-- Base: now = 540, blocked = False, existing = [(600, 660)]. -->

| Case | Name | Input | Expected | Python v1 | Python final | Page v1 | Page final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | Touching | 660–720 | Available | True | True | Unavailable | Available |
| T2 | Overlap | 630–690 | Unavailable | False | False | Unavailable | Unavailable |
| T3 | Blocked | 660–720, blocked | Unavailable | False | False | Unavailable | Unavailable |
| T4 | Exactly 120 min | 720–840 | Available | True | True | Unavailable | Available |
| T5 | 121 min | 720–841 | Unavailable | False | False | Not testable | Unavailable |
| T6 | Starts now | 540–570 | Unavailable | False | False | Unavailable | Unavailable |
| T7 | Reversed | 720–660 | Unavailable | False | False | Unavailable | Unavailable |
| T8 | Ends at midnight | 1380–1440 | Available | True | True | Available | Not testable |
| T9 | Past midnight | 1380–1441 | Unavailable | False | False | Not testable | Not testable |
| T10 | Second booking | 720–780, existing (600–660), (700–760) | Unavailable | False | False | Available | Available |
| T11 | Same check twice | 660–720, twice | Available | True | True | Unavailable | Available |
| T12 | Narrow screen | T1 at ~375 px wide | Available | n/a | n/a | Unavailable | Available |

**How these results were obtained.** Python columns: both files were called with the base data above (T10 with the second booking, T11 twice); `check_sis.py` prints the same values for v1 and final. Page columns: the exported projects were built (`npm run build`) and opened in headless Chromium (Playwright) at 375 px width with the browser clock fixed at 09:00 (now = 540), because the page reads the real clock. The runs were made by Claude on my behalf, not by me by hand in a browser. The v1 page uses its own six fictional bookings, so its T1, T2, T4, T11 and T12 answers differ from the expected column for data reasons (T1 overlaps "Faculty review panel" 10:00–11:30). On the v1 page T5 and T9 cannot be entered at all (15-minute steps), which is issue 1. On the final page the booking list holds only the base booking 10:00–11:00; T8 and T9 cannot be entered because a time input stops at 23:59; T10 shows Available because the page has one fixed data set and T4 needs 700–760 to be absent (see section 13).

## 6. Traceability

| AC | Implementation / file | Test input | Expected | v1 actual | Final actual |
| --- | --- | --- | --- | --- | --- |
| AC1 | `code/booking.py` lines 7 and 9; page `src/lib/availability.ts` (`isValidMinute`, `start >= end`, `start <= nowMinutes`) | T6, T7, T8, T9 | T6 Unavailable, T7 Unavailable, T8 Available, T9 Unavailable | Python: False, False, True, False; page: Unavailable, Unavailable, Available, Not testable | Python: False, False, True, False; page: Unavailable, Unavailable, Not testable, Not testable |
| AC2 | `code/booking.py` line 13; page `MAX_DURATION_MINUTES` in `src/lib/availability.ts` | T4, T5 | T4 Available, T5 Unavailable | Python: True, False; page: Unavailable (data overlap), Not testable | Python: True, False; page: Available, Unavailable |
| AC3 | `code/booking.py` line 17; page `blocked` flag and the switch in `src/components/RoomHeader.tsx` | T3 | Unavailable | Python: False; page: Unavailable | Python: False; page: Unavailable |
| AC4 | `code/booking.py` lines 22–23; page `bookings.filter(...)` in `src/lib/availability.ts` | T1, T2, T10 | T1 Available, T2 Unavailable, T10 Unavailable | Python: True, False, False; page: Unavailable (data overlap), Unavailable, Available | Python: True, False, False; page: Available, Unavailable, Available (known fail) |
| AC5 | `code/booking.py` (`existing` only read, `return True`); page `src/components/ResultPanel.tsx`, `BOOKINGS` is `readonly` | T11 and the unchanged-input tests | T11 Available, lists unchanged | Python: True, lists unchanged; page: Unavailable (data overlap) | Python: True, lists unchanged; page: Available, same on repeat |
| AC6 | page `src/components/ResultPanel.tsx` messages, `RequestForm.tsx`, `DayTimeline.tsx` | T7, T12 and the phone-width screenshots | clear message; usable at about 375 px | message shown; timeline labels cramped (issue 3) | message shown; layout usable at 375 px (`evidence/final-narrow.png`) |

## 7. Issue log

<!-- Evidence is from the v1 page observed in headless Chromium and from my own Bolt preview screenshots. -->

| # | Issue | Reproduction | Priority | Prompt / change | Retest result |
| --- | --- | --- | --- | --- | --- |
| 1 | Functional: the Start and End dropdowns only offer 15-minute steps, so 121 minutes cannot be entered and the AC2 boundary cannot be checked on the page. | T5 (720–841) on the v1 page: no 841 option exists, so the case is Not testable. AC1 and AC2 talk about integer minutes. | High | "The Start and End dropdowns in RequestForm.tsx only offer 15-minute steps, so a 121-minute request such as 12:00 to 14:01 cannot be entered (T5, AC2). Replace both dropdowns with minute-precision time inputs. Keep checkAvailability unchanged and show the existing validation message when a field is empty. Change nothing else." Changed: `RequestForm.tsx` now uses `<input type="time" step=60>`; an empty field becomes NaN and gets the existing "Times must be whole minutes" message. | T5 now Unavailable with "The requested duration is 121 minutes. The maximum is 120 minutes." T4 (120) Available. Cost: end 24:00 can no longer be typed (T8 becomes Not testable). |
| 2 | Functional: the first view is already wrong after 11:00 because the default start is hard-coded to 11:00. | In my own Bolt preview at 21:34 the page opened with "The start time must be after the current time (21:34)." (AC1; first screenshot). | Medium | "On first load App.tsx sets the start to 11:00 and the end to 12:00, so after 11:00 the page opens as Unavailable (AC1). Start from the next quarter hour after the current time, with the end 60 minutes later but not past 23:59. Change nothing else." Changed: `App.tsx` `defaultStart(nowMinutes)` replaces `DEFAULT_START` and `DEFAULT_END`. | With the clock at 09:00 the page opens at 09:15–10:15 and shows a rule-based result, not a stale default. |
| 3 | Usability (AC6): the hour labels under the timeline are crowded at phone width and spill past the card edges. | AC6 at 375 px wide, timeline card: nine labels from 00:00 to 24:00 touch each other; in my narrower Bolt preview they ran together as "00:0003:0006:00". | Medium | "At phone width the nine hour labels under the day timeline in DayTimeline.tsx touch each other and overflow the card (AC6). Show a label every 6 hours, align the first label to the left edge and the last to the right edge. Change nothing else." Changed: `TICK_HOURS = [0, 6, 12, 18, 24]` and edge alignment classes. | `evidence/after-1.png`: five labels, all inside the card. |
| 4 | Functional (testability): the v1 fictional data has no 10:00–11:00 booking, so T1 shows Unavailable and the agreed base case cannot be reproduced. | T1 (660–720) on the v1 page at 09:00: Unavailable, "Overlaps Faculty review panel (10:00 – 11:30)"; expected Available. | Medium | "The fictional bookings in data/room.ts do not match the agreed base case, so T1 (11:00–12:00) overlaps a 10:00–11:30 booking. Replace the six bookings with one: Faculty review panel 10:00–11:00. Change nothing else." Changed: `src/data/room.ts` `BOOKINGS`. | T1 Available, T2 Unavailable, T4 Available, T11 Available on the final page. T10 still differs (section 13). |
| 5 | Code quality and scope: `package.json` depends on `@supabase/supabase-js`, a database client, but nothing imports it and the brief forbids a database. | Cases T1–T12 are not affected, so this is a scope and code-quality finding: `grep -rn supabase src/` finds nothing; `package.json` line 14 lists it; `check_sis.py` flags v1 for "backend or database". | Low | "package.json lists @supabase/supabase-js although no file imports it and the page must have no database. Remove the dependency and update package-lock.json. Change nothing else." Changed: `npm uninstall @supabase/supabase-js`. | `grep -c supabase package.json package-lock.json` gives 0 and 0; `npm run build` and `tsc --noEmit` pass. |

**Before / after:** `evidence/before-1.png` → `evidence/after-1.png` show issue 3 (timeline hour labels at 375 px).

## 8. Critique decisions

<!-- The critique itself is in section 11, exchange B3. -->

| # | AI claim or recommendation | How I verified it | Decision | Reason (AC or case) |
| --- | --- | --- | --- | --- |
| 1 | Python v1 has no type check: `can_book(600.5, 660, 540, False, [])` returns True; add `isinstance(..., int)` checks. | Ran it: it returns True, so the claim is true. | Reject | The contract says times are integers, so a type check is a new rule that no AC asks for (AC1–AC4). |
| 2 | `if blocked:` treats any truthy value, e.g. the string "False", as blocked; use `blocked is True`. | Ran `can_book(700, 760, 540, "False", [])`: False, so the claim is true. | Reject | The contract says `blocked` is a bool; T3 and the other tests pass either way (AC3). |
| 3 | The page's dropdowns cannot express 121 minutes; add a free-text HH:MM field. | Tried T5 on the v1 page: no 841 option, so Not testable. | Modify | The problem is real (AC2), but a text field needs its own parsing; I used `type=time` inputs instead (issue 1). |
| 4 | The default start is fixed at 11:00 so the page opens as Unavailable later in the day. | Saw it in my own screenshot at 21:34, and read `DEFAULT_START` in `App.tsx`. | Accept | AC1 (start after now); issue 2. |
| 5 | Show only the first failed rule so the result is less noisy. | Looked at T3 on v1: three messages are listed (blocked, overlap and more). | Reject | AC6 asks for understandable feedback; seeing every broken rule is more useful, and the headline stays one word (AC5). |
| 6 | The timeline labels are crowded at phone width; and `@supabase/supabase-js` is an unused database dependency. | Built v1 and photographed it at 375 px; `grep` finds no import of supabase in `src/`. | Accept | AC6 for the labels; the scope rule (no database) for the dependency (issues 3 and 5). |

## 9. Coding-agent analysis

### 9.1 The loop

| Step | What happened in this assignment |
| --- | --- |
| User goal | Fix issue 1: the page could not take a 121-minute request, so T5 was Not testable (AC2). |
| Model / plan | Claude read `RequestForm.tsx`, `availability.ts` and `App.tsx` and planned the smallest change: replace the two dropdowns with time inputs and leave `checkAvailability` alone. |
| Tool call | Claude edited `RequestForm.tsx`, ran `npm run build` and `tsc --noEmit`, then ran a Playwright script in headless Chromium that fills the two inputs. |
| Observation | The build and the type check passed; T5 (12:00 to 14:01) showed "The requested duration is 121 minutes. The maximum is 120 minutes." and T8 could no longer be entered. |
| Next step | Record T8 as Not testable, which the brief accepts, and continue with the other four issues. |
| Human review | I have to read the diff of `RequestForm.tsx`, re-run T1–T12 in my own browser and decide whether losing the 24:00 end is acceptable; the model cannot judge that for me. |

### 9.2 Context, tools and permissions

| Tool | Context it used | Tools or permissions | Observed or assumed |
| --- | --- | --- | --- |
| Claude (claude.ai) | The uploaded zip files, the README and the checker, and my messages in this chat | A sandbox with bash, npm, Python and a headless Chromium; it could read my uploads and write only to its own working folder and outputs | Observed: I saw the commands, the build output and the screenshots it produced |
| Claude (claude.ai) | Its training knowledge and hidden system instructions | No access to my GitHub, my repository or my Bolt account | Assumed: I infer this from what it could and could not do; I cannot see its internal context |
| Bolt.new | My prompt, and its own project template | Generated files, installed packages and a live preview in the browser; it added `@supabase/supabase-js` to `package.json` | Observed: the exported file tree and `package.json` show the files and the dependency |
| Bolt.new | How it chose the six bookings and the timeline design | Probably a hidden system prompt and a build step in a browser sandbox | Assumed: nothing I saw tells me how it decided this |

### 9.3 Checkpoint and dependability

**Safety checkpoint:** Before accepting any generated change I read the diff, run the build, the type check and the 23 unit tests, and run `grep` on the source for `fetch`, `localStorage` and `supabase`. I also run the full T1–T12 table again on both artifacts, so a change that quietly breaks an AC or adds a forbidden feature is caught before it enters `web/final/`.

**Reliability, security, responsibility:** The assistant and Bolt made plausible code quickly, but each had a flaw I only found by running it: a hard-coded start time, 15-minute steps that hid the 121-minute boundary, and an unused database package that widened the attack surface for no reason. Tests and screenshots give evidence; the model's own confidence does not. Tool permissions decide what generated code may touch, so I keep it to a local page with no network or storage. Because I submit the work, I remain responsible for reviewing, testing and defending every line.

## 10. Reflection

Working with AI on this assignment showed a clear difference between AI-assisted coding and vibe coding. For the Python function, the scope was small, allowing me to inspect every branch and test it against AC1–AC5, so the model mostly saved me typing time while I kept full logic control. However, when using vibe coding for the web page, the tool generated a complete UI upfront, which I could only fully understand by examining the generated files and running the app. 

During evaluation, I identified key risks: a hardcoded initial start time of 11:00 broke behavior later in the day, 15-minute dropdown steps masked the 121-minute boundary test and ruined mobile formatting, and an unused Supabase dependency introduced an unnecessary security footprint in a backend-free project. Reviewing code and maintaining explicit permissions remains my responsibility because the model does not enforce project constraints automatically. For instance, I deliberately rejected the recommendation to add runtime type checking since the contract guarantees integers and AC rules do not require it. Next time, I would ensure the interface natively supports a 24:00 end boundary without adding redundant features.

## 11. Appendix A — AI exchanges

<!-- At least four. -->

### B1

- **Tool:** Gemini
- **Model:** not displayed
- **Date:** 2026-11-01
- **Stage:** Plan
- **Source:** this SIS

**Prompt:**

~~~~text
Plan stage for SIS 03, Smart Campus Room Availability Checker.

Please give me two things, and do NOT write any code yet.

(1) A short plan for a Python function can_book(start, end, now, blocked, existing), standard library only:
the checks in order, your assumptions, and the boundary tests worth writing.
Contract: start, end, now are integer minutes after midnight; blocked is one bool; existing is a collection of (start, end) pairs; the function returns exactly True or False and never modifies existing.
AC1: 0 <= start < end <= 1440, and start must be strictly after now.
AC2: duration at most 120 minutes, exactly 120 is allowed.
AC3: reject every request when the room is blocked.
AC4: reject overlap with any existing booking; touching at an endpoint is NOT overlap.
AC5: result Available/Unavailable is unambiguous; existing bookings are not mutated.
AC6: understandable validation feedback and a usable narrow/mobile layout.
Do not add a buffer, a 90-minute limit, or a Book button.

(2) A prompt I can paste into Bolt.new to build a one-page responsive Smart Campus Room Availability Checker for ONE room with fictional booking data. The prompt must include AC1-AC6 and must explicitly forbid login, backend and database (and external APIs, payments, storage). The page only checks availability; it does not create bookings.
~~~~

**Response:**

~~~~text
[Note: the original response was written in Russian. This is a faithful English translation made with Claude on 2026-11-01. The Bolt.new prompt inside it was already in English and is unchanged.]

(1) Plan for the Python function can_book
Order of checks
Validate the basic ranges and AC1 (start after now):
Check that 0 <= start < end <= 1440.
Check that start > now. If not, return False.
AC2 check (duration):
Check that (end - start) <= 120 minutes (exactly 120 is allowed). If it is more than 120, return False.
AC3 check (blocked room):
Check the blocked flag. If True, return False for any request.
AC4 check (overlap with existing bookings):
Loop over the existing list. For each pair (ex_start, ex_end) test the overlap condition: the intervals overlap if start < ex_end and ex_start < end.
Note: touching at an end (for example, a booking ends at the moment the next one starts) is not an overlap (< instead of <=), so adjoining intervals are allowed. If an overlap is found, return False.
Successful result (AC5):
If all checks pass, return True. The function is pure and does not modify the original existing list.
Assumptions
The parameters start, end, now are passed as integers (minutes from 0 to 1440).
blocked is strictly a boolean (True or False).
existing is an iterable collection of (start, end) pairs.
Boundary tests to implement (test_booking.py)
start == now (should return False).
end - start == 120 (maximum allowed duration, should return True).
end - start == 121 (limit exceeded, should return False).
blocked = True (should return False for any valid times).
Adjoining intervals (touching at an end): existing booking (100, 200), request (200, 300) or (0, 100) (should return True).
Overlapping intervals: existing booking (100, 200), request (150, 250) (should return False).

(2) Prompt for Bolt.new
Copy this text and paste it into the input field on bolt.new:

Create a single-page responsive web application for a Smart Campus Room Availability Checker for ONE room with fictional booking data.

CRITICAL CONSTRAINTS:
- Strictly NO login, NO backend, NO database, NO external APIs, NO payments, and NO storage.
- The page ONLY checks availability and displays results; it does NOT create or save new bookings.
- Must be fully responsive with a clean, usable narrow/mobile layout (AC6).

AC1-AC6 BUSINESS LOGIC TO IMPLEMENT:
- AC1: Time is given in integer minutes after midnight (0 <= start < end <= 1440). Start time must be strictly after the current time (now).
- AC2: Maximum duration is 120 minutes. Exactly 120 minutes is allowed.
- AC3: If the room is blocked (toggle/flag), every availability request must be rejected.
- AC4: Reject overlap with any existing fictional booking. Touching at an endpoint (e.g., one ends when another starts) is NOT an overlap and must be allowed.
- AC5: Result must clearly and unambiguously display "Available" or "Unavailable" with validation feedback messages (AC6), ensuring existing bookings data is not mutated.

Provide an interactive UI where users can adjust start/end times, see existing bookings/blocks visually, and instantly see the availability status.
~~~~

### B2

- **Tool:** Claude (claude.ai)
- **Model:** Claude Sonnet 5.5
- **Date:** 2026-11-01
- **Stage:** Generate
- **Source:** this SIS

**Prompt:**

~~~~text
Generate stage for SIS 03. Using the plan you were given, write can_book(start, end, now, blocked, existing) in Python, standard library only, with AC1-AC4 as in the plan. Return the complete code in one block and nothing beyond the contract. I will save your first answer as code/original/booking_v1.py before I fix anything.

[Relayed on the student's behalf: the student asked Claude to do every step it could. This prompt was composed by Claude from the student's task and run in the same chat; the student did not type it.]
~~~~

**Response:**

~~~~text
def can_book(start, end, now, blocked, existing):
    """Return True if the booking request is allowed, otherwise False.

    Times are integer minutes after midnight. Intervals include their start
    and exclude their end, so two bookings that only touch do not overlap.
    """
    # AC1: valid time range inside one day
    if not (0 <= start < end <= 1440):
        return False

    # AC1: the start must be strictly after the current time
    if start <= now:
        return False

    # AC2: at most 120 minutes (exactly 120 is allowed)
    if end - start > 120:
        return False

    # AC3: a blocked room accepts nothing
    if blocked:
        return False

    # AC4: reject overlap with any existing booking; touching ends are fine
    for ex_start, ex_end in existing:
        if start < ex_end and ex_start < end:
            return False

    # AC5: nothing rejected the request, and existing was only read
    return True
~~~~

### B3

- **Tool:** Claude (claude.ai)
- **Model:** Claude Sonnet 5.5
- **Date:** 2026-11-01
- **Stage:** Critique
- **Source:** this SIS

**Prompt:**

~~~~text
Critique stage for SIS 03. Review my Python function can_book (code/original/booking_v1.py) and my Bolt page (web/original/) against AC1-AC6 and the contract. List concrete claims with the file and the line or behaviour, and say what you would change. I will verify each claim myself.

[Relayed on the student's behalf: composed by Claude and run in the same chat as the Generate step, not in a fresh chat; the student did not type it.]
~~~~

**Response:**

~~~~text
1. Python, `can_book`: no type check. can_book(600.5, 660, 540, False, []) returns True. Suggest isinstance(..., int) checks.
2. Python, `if blocked:`: any truthy value such as the string "False" counts as blocked. Suggest `blocked is True`.
3. Page, RequestForm.tsx: the Start and End dropdowns use 15-minute steps, so 121 minutes cannot be entered and AC2's boundary cannot be tested. Suggest a free-text HH:MM field.
4. Page, App.tsx: DEFAULT_START is 11:00, so after 11:00 the page opens as Unavailable (AC1).
5. Page, ResultPanel.tsx: every failed rule is listed at once. Suggest showing only the first one to keep the result clean (AC5).
6. Page, DayTimeline.tsx: nine hour labels (00:00 to 24:00) are crowded at phone width and spill past the card (AC6).
7. Page, package.json: @supabase/supabase-js is listed but never imported; the brief forbids a database.
~~~~

### B4

- **Tool:** Claude (claude.ai)
- **Model:** Claude Sonnet 5.5
- **Date:** 2026-11-01
- **Stage:** Repair
- **Source:** this SIS

**Prompt:**

~~~~text
Repair stage for SIS 03. Apply these five focused changes to the Bolt project in web/final/, one at a time, changing nothing else, then rebuild and rerun T1-T12:
1. RequestForm.tsx: the dropdowns offer only 15-minute steps, so a 121-minute request such as 12:00 to 14:01 cannot be entered (T5, AC2). Replace both dropdowns with minute-precision time inputs; keep checkAvailability unchanged.
2. App.tsx: the default start is hard-coded to 11:00, so after 11:00 the page opens as Unavailable (AC1). Start from the next quarter hour after now, end 60 minutes later, not past 23:59.
3. DayTimeline.tsx: at phone width the nine hour labels touch and overflow the card (AC6). Show a label every 6 hours, first label at the left edge, last at the right edge.
4. data/room.ts: replace the six fictional bookings with one, Faculty review panel 10:00-11:00, so the agreed base case can be reproduced (T1).
5. package.json: remove the unused @supabase/supabase-js dependency (no database) and update the lockfile.

[Relayed on the student's behalf: composed by Claude from the issue log (section 7) and applied by Claude in the same chat; the student did not type it.]
~~~~

**Response:**

~~~~text
Done. Changes in web/final/:
1. src/components/RequestForm.tsx: both <select> elements replaced by <input type="time" step={60}>; the value is parsed to minutes, an empty field becomes NaN and gets the existing "Times must be whole minutes" message; the duration line handles NaN.
2. src/App.tsx: DEFAULT_START and DEFAULT_END replaced by defaultStart(nowMinutes) = next quarter hour after now, end = start + 60, both capped at 23:59.
3. src/components/DayTimeline.tsx: TICK_HOURS = [0, 6, 12, 18, 24]; the 00:00 label has no translate, the 24:00 label is translated by its full width.
4. src/data/room.ts: BOOKINGS now holds one booking, Faculty review panel, 10:00-11:00.
5. package.json and package-lock.json: @supabase/supabase-js removed with npm uninstall; grep finds 0 occurrences.
Checks: npm run build passed, tsc --noEmit passed, and a Playwright run at 375 px with the clock at 09:00 gave T1 Available, T2 Unavailable, T3 Unavailable, T4 Available, T5 Unavailable, T6 Unavailable, T7 Unavailable, T11 Available, T12 Available. T8 and T9 cannot be entered on a time input (max 23:59). T10 shows Available because the page holds one fixed data set. Side effect: an end of 24:00 can no longer be typed.
~~~~

## 12. Appendix B — Test output

### 12.1 Your suite

~~~~text
test_blocked_room_is_rejected (test_booking.BookingTests.test_blocked_room_is_rejected) ... ok
test_booking_ending_exactly_at_midnight_is_allowed (test_booking.BookingTests.test_booking_ending_exactly_at_midnight_is_allowed) ... ok
test_empty_existing_list_allows_valid_request (test_booking.BookingTests.test_empty_existing_list_allows_valid_request) ... ok
test_end_after_day_end_is_rejected (test_booking.BookingTests.test_end_after_day_end_is_rejected) ... ok
test_every_rejection_returns_a_real_false (test_booking.BookingTests.test_every_rejection_returns_a_real_false) ... ok
test_exactly_two_hours_is_allowed (test_booking.BookingTests.test_exactly_two_hours_is_allowed) ... ok
test_input_list_is_left_unchanged (test_booking.BookingTests.test_input_list_is_left_unchanged) ... ok
test_input_list_is_left_unchanged_after_a_rejection (test_booking.BookingTests.test_input_list_is_left_unchanged_after_a_rejection) ... ok
test_over_two_hours_is_rejected (test_booking.BookingTests.test_over_two_hours_is_rejected) ... ok
test_partial_overlap_is_rejected (test_booking.BookingTests.test_partial_overlap_is_rejected) ... ok
test_request_containing_existing_booking_is_rejected (test_booking.BookingTests.test_request_containing_existing_booking_is_rejected) ... ok
test_request_ending_exactly_at_existing_start_is_allowed (test_booking.BookingTests.test_request_ending_exactly_at_existing_start_is_allowed) ... ok
test_request_inside_existing_booking_is_rejected (test_booking.BookingTests.test_request_inside_existing_booking_is_rejected) ... ok
test_result_is_a_real_boolean (test_booking.BookingTests.test_result_is_a_real_boolean) ... ok
test_reversed_times_are_rejected (test_booking.BookingTests.test_reversed_times_are_rejected) ... ok
test_several_existing_bookings_gap_between_them_is_allowed (test_booking.BookingTests.test_several_existing_bookings_gap_between_them_is_allowed) ... ok
test_several_existing_bookings_overlap_with_the_last_one (test_booking.BookingTests.test_several_existing_bookings_overlap_with_the_last_one) ... ok
test_start_before_day_is_rejected (test_booking.BookingTests.test_start_before_day_is_rejected) ... ok
test_start_equal_to_now_is_rejected (test_booking.BookingTests.test_start_equal_to_now_is_rejected) ... ok
test_touching_end_is_allowed (test_booking.BookingTests.test_touching_end_is_allowed) ... ok
test_unsorted_input_list_keeps_its_order_when_request_is_accepted (test_booking.BookingTests.test_unsorted_input_list_keeps_its_order_when_request_is_accepted) ... ok
test_unsorted_input_list_keeps_its_order_when_request_is_rejected (test_booking.BookingTests.test_unsorted_input_list_keeps_its_order_when_request_is_rejected) ... ok
test_zero_length_is_rejected (test_booking.BookingTests.test_zero_length_is_rejected) ... ok

----------------------------------------------------------------------
Ran 23 tests in 0.001s

OK
~~~~

### 12.2 Path B only — three faults you planted

| # | Line you broke | AC | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

## 13. Remaining limitations and known fails

| Check ID or limitation | Why it stays | What I would do next |
| --- | --- | --- |
| C4 (T10 on the final page) | The page has one fixed fictional data set. T10 needs the second booking 700–760 while T4 (720–840) needs it absent, so T10 shows Available instead of the expected Unavailable. T8 and T9 are Not testable on the page (a time input stops at 23:59), which the checker accepts. | Keep the data fixed and add no second data set; the Python tests already cover T10. |
| Page results were run by Claude in headless Chromium | The page reads the real clock, so the run fixed it at 09:00. I did not click through T1–T12 by hand. | Click through the final page myself with the system clock at 09:00 and correct any cell that differs. |
| The critique came from the same chat that wrote the code | A new chat would be more independent. | Repeat the critique in a fresh chat. |
| Bolt's own chat reply was not saved | Only the exported project is evidence of what Bolt produced. | Save Bolt's reply text next time. |
| Reflection, B2–B4 prompts and some report text drafted by Claude | The student delegated them; see AI_USAGE.md. | Rewrite the reflection in my own words before grading. |
