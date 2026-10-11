# Week 05 — Lab report

**Name:** Yelnur Alga
**Group:** Mon 16-19
**Date:** 11.10.2026

Fill in every section. **Do not delete, rename or renumber the headings** — the checker and the
grader find your answers by them. Add rows to any table; never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant (tool) | Claude (Anthropic, claude.ai) |
| **Exact** model name | Claude Sonnet 5.5 |
| Language and version | Python 3.12 |
| Path | A |
| My Week 04 declaration for touching bookings | did not submit |

I did not submit Week 04, so there is no Week 04 model to compare with AC4. Touching bookings are
allowed by AC4 in this lab, and `can_book` follows that.

---

## 2. Task 1 — the plan

**The assistant's plan, pasted unedited:**

```text
Implementation plan for can_book

Checks, in order:
1. AC1, time order and day bounds: reject unless 0 <= start < end <= 1440.
2. AC1, the future: reject unless start > now.
3. AC2, duration: reject if end - start > 120.
4. AC3, blocked room: reject if blocked is True.
5. AC4, overlap: for every (s, e) in existing, reject if start < e and end > s.
   Touching endpoints do not overlap because the comparisons are strict.
6. AC5: if no check rejected the request, return True.

Assumptions:
- Intervals are half-open [start, end), so (660, 720) next to (600, 660) is allowed.
- existing is not assumed to be sorted, so every booking is examined.
- existing is only read, never modified or sorted in place (AC5).
- The inputs are valid as the contract says, so no type validation is added.

Boundary cases that could expose a wrong implementation:
- start == now, and start == now + 1
- start == end, and start > end
- start == 0, start == -1, end == 1440, end == 1441
- duration exactly 120 and exactly 121
- a request that touches an existing booking at its start, and at its end
- a request inside, around, and partly overlapping an existing booking
- empty existing, and several existing bookings (the overlap is with the last one)
- blocked=True with an otherwise valid request
- existing is unchanged after the call, on both the accepted and the rejected path
```

**What the plan invented or changed.** One row for every rule in the plan that is not in the
contract or in AC1–AC5, or that says something different from them. If you found none, write one
row saying which lines of the plan you checked against which AC.

| # | What the plan said | What the contract or the AC says | What I did |
| --- | --- | --- | --- |
| 1 | Nothing invented. I checked steps 1–2 against AC1, step 3 against AC2, step 4 against AC3, step 5 against AC4, step 6 against AC5. | Each step has an AC line. The assumptions (half-open intervals, `existing` not sorted, `existing` not modified, no type validation) follow from the contract lines "Intervals include the start and exclude the end", AC4, AC5 and "existing contains valid tuples". | Kept the plan unchanged. |

**Boundary cases the assistant suggested that I kept as tests:**

- start == now → `test_start_equal_to_now_is_rejected`
- start == end and start > end → `test_zero_length_is_rejected`, `test_reversed_times_are_rejected`
- start below 0, end 1441, end exactly 1440 → `test_start_before_day_is_rejected`, `test_end_after_day_end_is_rejected`, `test_booking_ending_exactly_at_midnight_is_allowed`
- duration 120 and 121 → `test_exactly_two_hours_is_allowed`, `test_over_two_hours_is_rejected`
- touching an existing booking → `test_touching_end_is_allowed`, `test_request_ending_exactly_at_existing_start_is_allowed`
- inside, around, partly overlapping → `test_request_inside_existing_booking_is_rejected`, `test_request_containing_existing_booking_is_rejected`, `test_partial_overlap_is_rejected`
- empty and several existing → `test_empty_existing_list_allows_valid_request`, the two `test_several_existing_bookings_*` tests
- blocked room → `test_blocked_room_is_rejected`
- existing unchanged on both paths → `test_input_list_is_left_unchanged`, `test_input_list_is_left_unchanged_after_a_rejection`

---

## 3. Task 2 — the first version (v1), read before it was run

v1 is saved as `code/original/booking_v1.py`, exactly as the assistant returned it: yes

**AC map.** One row per condition in v1. Quote the line.

| # | Line in v1 | AC it implements | Correct as written? If not, why |
| --- | --- | --- | --- |
| 1 | `if not (0 <= start < end <= 1440): return False` | AC1 (order and day bounds) | Yes. `start < end` rejects zero-length and reversed times; `end <= 1440` allows an end exactly at midnight. |
| 2 | `if start <= now: return False` | AC1 (`start > now`) | Yes. `<=` rejects start == now, as AC1 requires. |
| 3 | `if end - start > 120: return False` | AC2 | Yes. `>` lets exactly 120 minutes through. |
| 4 | `if blocked: return False` | AC3 | Yes. |
| 5 | `if start < existing_end and end > existing_start: return False` inside `for ... in existing` | AC4 | Yes. The strict `<` and `>` let touching endpoints through; the loop looks at every booking. |
| 6 | `return True` | AC5 | Yes. It is reached only when no check rejected, and `existing` is never modified. |

What I expected to fail before running anything: nothing in AC1–AC5. The one risk I saw was a
time that is not an integer, because no line checks the type.

**Anything in v1 that no AC asks for** (extra validation, a buffer between bookings, logging,
saving the booking, a different return type):

- Nothing. v1 has no extra validation, no buffer, no logging and returns a plain Boolean.

---

## 4. Task 3 — my tests

Base input for every row unless the row says otherwise: `now=540, blocked=False, existing=[(600, 660)]`.

| # | Test name | Request (start, end) | What differs from the base input | Expected | AC | Result on v1 | Result on final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | test_touching_end_is_allowed | (660, 720) | nothing | True | AC4 | pass | pass |
| 2 | test_partial_overlap_is_rejected | (630, 690) | nothing | False | AC4 | pass | pass |
| 3 | test_blocked_room_is_rejected | (660, 720) | blocked=True | False | AC3 | pass | pass |
| 4 | test_exactly_two_hours_is_allowed | (720, 840) | nothing | True | AC2 | pass | pass |
| 5 | test_over_two_hours_is_rejected | (720, 841) | nothing | False | AC2 | pass | pass |
| 6 | test_start_equal_to_now_is_rejected | (540, 570) | nothing | False | AC1 | pass | pass |
| 7 | test_zero_length_is_rejected | (700, 700) | existing=[] | False | AC1 | pass | pass |
| 8 | test_reversed_times_are_rejected | (760, 700) | existing=[] | False | AC1 | pass | pass |
| 9 | test_start_before_day_is_rejected | (-10, 30) | now=0, existing=[] | False | AC1 | pass | pass |
| 10 | test_end_after_day_end_is_rejected | (1400, 1460) | existing=[] | False | AC1 | pass | pass |
| 11 | test_booking_ending_exactly_at_midnight_is_allowed | (1380, 1440) | existing=[] | True | AC1 | pass | pass |
| 12 | test_empty_existing_list_allows_valid_request | (700, 760) | existing=[] | True | AC4 | pass | pass |
| 13 | test_several_existing_bookings_overlap_with_the_last_one | (820, 850) | existing=[(600,660),(700,760),(800,860)] | False | AC4 | pass | pass |
| 14 | test_several_existing_bookings_gap_between_them_is_allowed | (760, 800) | existing=[(600,660),(700,760),(800,860)] | True | AC4 | pass | pass |
| 15 | test_request_inside_existing_booking_is_rejected | (615, 645) | nothing | False | AC4 | pass | pass |
| 16 | test_request_containing_existing_booking_is_rejected | (570, 690) | nothing | False | AC4 | pass | pass |
| 17 | test_request_ending_exactly_at_existing_start_is_allowed | (541, 600) | nothing | True | AC4 | pass | pass |
| 18 | test_input_list_is_left_unchanged | (660, 700) | existing=[(600,660),(700,760)] | True, list unchanged | AC5 | pass | pass |
| 19 | test_input_list_is_left_unchanged_after_a_rejection | (630, 690) | nothing | False, list unchanged | AC5 | pass | pass |
| 20 | test_result_is_a_real_boolean | (700, 760) and (630, 690) | existing=[] for the first | type is bool on both | AC5 | pass | pass |
| 21 | test_unsorted_input_list_keeps_its_order_when_request_is_accepted | (900, 960) | existing=[(800,860),(600,660),(700,760)] | True, list unchanged | AC5 | pass | pass |
| 22 | test_unsorted_input_list_keeps_its_order_when_request_is_rejected | (610, 650) | existing=[(800,860),(600,660),(700,760)] | False, list unchanged | AC5 | pass | pass |
| 23 | test_every_rejection_returns_a_real_false | six rejected calls, one per rule | one rule fails in each call | `False` each time | AC1–AC4, AC5 | pass | pass |

Every expected value was written from the AC in the AC column, not from running the function.

---

## 5. Task 4 — debugging with evidence

One row per defect you found — in v1, in a later version, or in your own tests. If v1 passed
everything, the row is the **new edge case you added**, with expected and actual equal, and the
cause column says why no change was needed.

| # | Input (the full call) | Expected | Actual | Cause (quote the line) | Fix | Who proposed the fix |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `can_book(600.5, 660, 540, False, [])` (a non-integer start) | `False` was my first guess; the contract does not say | `True` | `if not (0 <= start < end <= 1440):` compares numbers and never checks the type | None. I declared `not-handled` and removed the test (see §9.2 and §6, point 1) | the assistant noticed it; the decision is mine |
| 2 | Checker M10 (AC5): a faulty `can_book` passed my first 20 tests | M10 caught | M10 NOT caught | In my tests, not in `can_book`: every `existing` list I used was already sorted | Added tests 21–23 with an unsorted `existing` and a Boolean check on every rejection path. M10 is then caught by tests 21 and 22 | the assistant |

**The debug prompt I sent, and the assistant's answer** (leave the block empty if you did not use it):

```text
```

I did not send the debug prompt: v1 passed F1–F10 and every test, so there was no failing
test to explain. Row 1 was found by running a test, not by the checker.

---

## 6. Task 5 — the critique

**The assistant's critique, pasted unedited:**

```text
1. Line: `if not (0 <= start < end <= 1440):`
   Contract line: "Times are integers on one date". The function never checks the type, so
   can_book(600.5, 660, 540, False, []) returns True.
2. Line: `for existing_start, existing_end in existing:`
   Contract line: "existing contains valid (start, end) tuples". A malformed entry (for
   example a 3-tuple) would raise ValueError, and nothing handles it.
3. Line: `if blocked:`
   Contract line: "blocked is a Boolean". Any truthy value, such as the string "False",
   is treated as blocked.
4. Line: `# AC4: no overlap with existing bookings (touching endpoints allowed)` (in v1)
   Contract line: "Intervals include the start and exclude the end". The comment does not
   say why the comparisons are strict, so a reader may "fix" them to <= and >=.
```

| # | Suggestion | accept / reject | Reason — cite the AC or the contract line | Suite after the change |
| --- | --- | --- | --- | --- |
| 1 | Check that start and end are integers | reject | The contract guarantees integers, and AC5 defines the result only through AC1–AC4: it asks for True or False, not for a new rule. The grading asks for nothing added beyond the contract. | no change, 23 tests OK |
| 2 | Handle malformed entries in `existing` | reject | The contract says `existing` contains valid tuples. Catching errors would also hide real defects. | no change, 23 tests OK |
| 3 | Treat only the Boolean True as blocked | reject | The contract says `blocked` is a Boolean, so there is no other value to handle. | no change, 23 tests OK |
| 4 | Explain in a comment why the comparisons are strict | accept | It documents the contract line "Intervals include the start and exclude the end" and protects the AC4 touching rule. It changes no behaviour. | 23 tests OK |

---

## 7. Change log — v1 to final

| # | What changed (the line, before → after) | Why | Evidence: the test or check that moved |
| --- | --- | --- | --- |
| 1 | Comments only. The docstring now says "Intervals include the start and exclude the end: [start, end)". The AC4 comment `# AC4: no overlap with existing bookings (touching endpoints allowed)` became two lines that say the comparisons are strict so touching endpoints pass. The code lines are identical to v1. | Critique point 4 | No test or check moved: suite 23 OK before and after; F1–F10 and M1–M10 PASS before and after. |

---

## 8. Evidence — real output

### 8.1 My suite, final run

Paste the **complete** terminal output. For Python: everything `python -m unittest -v` printed.

```text
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
```

### 8.2 The checker, final run

Paste the **complete** output of `python tests/check_booking.py`. Paste it **last**: if you edit
this file afterwards, run the checker again and paste again.

```text
(paste here)Week 05 - can_book: the function, your tests, the evidence   (Path A)

PASS   F1   the six cases from the task table           6 of 6 cases
PASS   F2   AC1 time order and day bounds               5 of 5 cases
PASS   F3   AC1 the start is in the future              5 of 5 cases
PASS   F4   AC2 at most 120 minutes                     3 of 3 cases
PASS   F5   AC3 a blocked room accepts nothing          2 of 2 cases
PASS   F6   AC4 every kind of overlap is rejected       5 of 5 cases
PASS   F7   AC4 touching endpoints are allowed          3 of 3 cases
PASS   F8   AC4 every existing booking is checked       4 of 4 cases
PASS   F9   AC5 the result is a real Boolean            3 of 3 cases
PASS   F10  AC5 the inputs are left unchanged           2 of 2 cases
PASS   O1   the assistant's first version is kept       v1 kept (23 lines)
PASS   S1   your suite has at least 11 tests            23 tests
PASS   S2   your suite is green on your own code        23 tests, OK
PASS   M1   your tests catch a fault in AC1             caught by test_start_equal_to_now_is_rejected
PASS   M2   your tests catch a fault in AC1             caught by test_end_after_day_end_is_rejected, test_every_rejection_returns_a_real_false
PASS   M3   your tests catch a fault in AC1             caught by test_every_rejection_returns_a_real_false, test_zero_length_is_rejected
PASS   M4   your tests catch a fault in AC2             caught by test_exactly_two_hours_is_allowed
PASS   M5   your tests catch a fault in AC3             caught by test_blocked_room_is_rejected, test_every_rejection_returns_a_real_false
PASS   M6   your tests catch a fault in AC4             caught by test_request_ending_exactly_at_existing_start_is_allowed, test_several_existing_bookings_gap_between_them_is_allowed, test_touching_end_is_allowed
PASS   M7   your tests catch a fault in AC4             caught by test_several_existing_bookings_overlap_with_the_last_one, test_unsorted_input_list_keeps_its_order_when_request_is_rejected
PASS   M8   your tests catch a fault in AC4             caught by test_request_containing_existing_booking_is_rejected
PASS   M9   your tests catch a fault in AC5             caught by test_input_list_is_left_unchanged, test_unsorted_input_list_keeps_its_order_when_request_is_accepted
PASS   M10  your tests catch a fault in AC5             caught by test_unsorted_input_list_keeps_its_order_when_request_is_accepted, test_unsorted_input_list_keeps_its_order_when_request_is_rejected
PASS   L1   report 1: tool, model and language          tool, model and language recorded
PASS   L2   report 2: the plan, and what you corrected  plan pasted, 1 row(s) on what you corrected or verified
PASS   L3   report 3: v1 mapped to AC1-AC4              6 conditions mapped, AC1-AC4 all present
PASS   L4   report 4: at least 11 of your tests listed  23 tests listed
PASS   L5   report 5: debugging evidence                2 row(s) of input / expected / actual
PASS   L6   report 6: the critique, each point judged   critique pasted, 4 points judged
PASS   L7   report 7: change log                        1 change-log row(s)
PASS   L8   report 8.1: real output of your suite       suite output pasted
PASS   L9   report 10: conclusion of 120-180 words      163 words
------------------------------------------------------------------------------
v1 (code/original/booking_v1.py): passes F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 - fails nothing - identical to your final: no
SUMMARY pass=32 fail=0 error=0   (32 checks)
Behaviour and shape are clean. This says nothing about the quality of your review.
```

### 8.3 Path B only — three faults I planted myself

Path A: not used.

---

## 9. What still fails, and what the contract does not say

### 9.1 Checks I am keeping as FAIL or ERROR

The same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| none | none |

### 9.2 Outside the contract

The contract says times are integers. It does not say what `can_book` does when one is not —
`600.5`, or the string `"600"`. What does **your** function do, and why is that the right call?

- My function does not check the type. For `600.5` it returns `True`, because the comparisons in AC1 work with any number. I decided not to handle this case. The contract says that times are integers, and AC5 only describes `True` and `False` from AC1–AC4, so a type check would be a new rule that nobody asked for.

### 9.3 A bound that never decides

One of the bounds written in AC1 can never be the *only* reason a request is rejected. Which one,
and why?

- (write here, in your own words) The bound `0 <= start` can never be the only reason for a rejection. The contract says `now` is at least 0, and AC1 also requires `start > now`. So every request with `start < 0` already fails `start > now`. For example, with `start=-10` and `now=0`, the request is rejected because `-10 > 0` is false.

---

## 10. Conclusion (120–180 words)

<!-- Answer all three, in your own words, without the assistant:
     (a) Explain the overlap condition in your final code — why those two comparisons, and why
         they let touching bookings through.
     (b) Which fault did your tests miss the longest, and what did the missing test have in common
         with the ones you already had?
     (c) What did you have to decide that neither the contract nor the assistant decided for you?
     Worthless: "the AI made a mistake and I fixed it."
     Worth everything: "F7 failed on can_book(570, 600, ...): v1 compared with <= on the start
     side, so a booking that ends exactly when another begins was rejected." -->

<!-- Write your conclusion below this line -->My final `can_book` passes all the checks. It rejects a wrong time interval, a start time that is not in the future, a booking longer than 120 minutes, a blocked room, and an overlap with an existing booking.

The overlap rule is `start < existing_end and end > existing_start`. Two bookings overlap only if each one starts before the other one ends. The comparisons are strict, so a booking that ends exactly when another begins is allowed. For example, (660, 720) and (600, 660) do not overlap, because 660 < 660 is false.

My tests missed one fault for the longest time. It was checker M10, about AC5. All my `existing` lists were already sorted, so my tests did not catch it. After I added tests with an unsorted list, they caught it.

I also had to decide what to do with a non-integer time such as 600.5. The contract does not say, so I chose not to add a new check.