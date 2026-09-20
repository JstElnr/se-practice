# Lab report — Practice #02: The Prompt Is an Engineering Input

**Name:**Yelnur
**Group:**Mon 16-19
**Date:**20.09.2026

> Fill in every section. **Do not delete or renumber the headings** — the grading pass reads them
> by number. If something did not happen, write "did not happen" and why; an empty section and a
> fabricated one are graded the same way.

---

## 1. The frozen experiment

| | |
| --- | --- |
| AI assistant |ChatGPT |
| Exact model name |GPT-5.6 Luna |
| Implementation language |Python |
| Date of the runs |20.09.2026 |

**Non-Python students only** — paste your substituted Prompt B text here, so the substitution can
be checked:

```
(paste here, or write "n/a — used Python")
```

**Confirmations:**

- Each prompt was sent in a **fresh chat**: yes 
- No follow-up questions were asked before Part 7: yes 
- Every output was saved **before** any editing: yes 

---

## 2. Prompt A — minimal

**Prompt sent** (should be exactly one sentence):

```
Write Python code to analyze student marks.
```

**Assumptions the AI made that I never gave it** — list them, one per line. A data format, a pass
threshold, a rounding rule, an input method, an invented feature all count.

1.It created data format and input itself
2.It created output itself, but prompt did not ask about that
3.It made no assumption about a pass threshold or a rounding rule - it jusr used the data as given

**Questions it should have asked and did not:**

1.What is input method?
2.Do you need some function?

**Is the function named `analyze_marks` with the required signature?**  no — if no, what is it
called: there is no function at all, just for loop.

**First impression before testing** (one sentence — you will compare this with section 6 later): not what we asked, but it's sjust good example, not more.

---

## 3. Prompt B — structured context

**Prompt sent** (paste it in full, including any substitutions):

```
You are a Python developer. Implement analyze_marks(marks, pass_mark=50). Return
average, highest, lowest, and pass_rate in a dictionary. Accept marks from 0 to 100;
raise ValueError for an empty list, non-numeric values, or out-of-range values. Use
no external libraries. Return code plus a short explanation.
```

**What B fixed compared to A:**

1.created functiono analyze_marks
2.returns a dictionary with right keys

**What B still leaves open:**

1.pass_rate is not rounded
2.no validation of pass_mark

---

## 4. Prompt C — examples and tests

**What I appended to Prompt B:**

```
Example: analyze_marks([40, 60, 80], 50) → average 60, highest 80, lowest 40,
pass_rate 66.67. Include tests for: one mark, decimals, custom pass_mark, empty list,
text value, and marks below 0 or above 100. State any remaining assumptions before
the code.
```

**Tests the AI wrote for itself** — how many, and which situations do they cover? 8
1. Normal example
2. One mark
3. Decimal marks
4. Custom pass_mark
5. Empty list
6. Text value
7. Mark below 0
8. Mark above 100

| Situation | Covered by the AI's tests? |
| --- | --- |
| one mark |yes |
| decimals |yes |
| custom pass_mark |yes |
| empty list |yes |
| text value |yes |
| below 0 / above 100 |yes |

**Do the AI's own tests pass against the AI's own code?** yes 

**Do they agree with the harness in section 6?** yes — if no, where do they disagree:

**Assumptions C stated explicitly before the code:**
Assumptions
marks must be a non-empty iterable of numeric values; in practice, the function expects a list-like collection.
bool values are rejected even though Python considers True and False numeric subclasses.
pass_mark is assumed to be numeric and between 0 and 100; otherwise, ValueError is raised.
pass_rate is the percentage of marks greater than or equal to pass_mark.
The returned average is a normal floating-point value; pass_rate is rounded to 2 decimal places.
---

## 5. Prompt D — my combined prompt

**The complete prompt I wrote** (one message, sent to a fresh chat):

```
You are a Python developer. Implement analyze_marks(marks, pass_mark=50). Return
average, highest, lowest, and pass_rate in a dictionary. Accept marks from 0 to 100;
raise ValueError for an empty list, non-numeric values, or out-of-range values. Use
no external libraries. Return code plus a short explanation.Example: analyze_marks([40, 60, 80], 50) → average 60, highest 80, lowest 40,
pass_rate 66.67. Include tests for: one mark, decimals, custom pass_mark, empty list,
text value, and marks below 0 or above 100. State any remaining assumptions before
the code.Round pass_rate
to exactly 2 decimal places. Validate pass_mark - if it is non-numeric or bool or not between 0-100 -> raise ValueError.
```

**What I deliberately added that A, B and C did not have:**

1.rounding rule for pass_rate
2.specified validation rule for pass_mark
3.test cases for invalid pass_mark

**The ambiguity I found in the specification, and how I resolved it inside Prompt D:**
specification of rounding. B did not round and was passed only because of tolerance 0.01, and C was passed because it added itself rounding, so I added instruction round pass_rate to 2 decimal, removing additions from AI in that part.
---

## 6. Test results — the evidence

Six cases × four prompts. Verdicts are **PASS**, **FAIL** or **ERROR** only.

| # | Call | Required | A | B | C | D |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `analyze_marks([40, 60, 80], 50)` | avg 60 · high 80 · low 40 · rate 66.67 | ERROR | PASS | PASS | PASS |
| 2 | `analyze_marks([100], 50)` | avg 100 · high 100 · low 100 · rate 100 | ERROR | PASS | PASS | PASS |
| 3 | `analyze_marks([49.5, 50], 50)` | avg 49.75 · high 50 · low 49.5 · rate 50 | ERROR | PASS | PASS | PASS |
| 4 | `analyze_marks([], 50)` | raises ValueError | ERROR | PASS | PASS | PASS |
| 5 | `analyze_marks([40, "60"], 50)` | raises ValueError | ERROR | PASS | PASS | PASS |
| 6 | `analyze_marks([-1, 50, 101], 50)` | raises ValueError | ERROR | PASS | PASS | PASS |
| | **Totals** | | **0/6** | **6/6** | **6/6** | **6/6** |

**For every FAIL and ERROR above, one line: what was returned or raised instead.**

| Prompt | Case | What actually happened |
| --- | --- | --- |
|A |1-6 |analyze_marks is not defined, the file only prints hardcoded student data - every case fails to load the function and counts as ERROR |
| | | |
| | | |

### Pasted terminal output — all four runs

> This is the part that makes the table above count. Paste the **whole** output, unedited,
> including the header lines. A table with nothing behind it is not accepted.

**Prompt A**

```
Студент: Алиса
  Средний балл: 86.25
  Максимальная оценка: 92
  Минимальная оценка: 78

Студент: Боб
  Средний балл: 73.25
  Максимальная оценка: 80
  Минимальная оценка: 68

Студент: Чарли
  Средний балл: 92.75
  Максимальная оценка: 97
  Минимальная оценка: 88

ERROR: week-02/code/prompt_a.py defines no callable named 'analyze_marks'.
All six cases count as ERROR. Record that in lab-report.md.
```

**Prompt B**

```
========================================================================
analyze_marks harness — week-02/code/prompt_b.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.66666666666666
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: Marks list cannot be empty
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: All marks must be numeric
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: Marks must be between 0 and 100
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (week-02/code/prompt_b.py)
========================================================================
```

**Prompt C**

```
All tests passed.
========================================================================
analyze_marks harness — week-02/code/prompt_c.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.67
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: marks cannot be empty
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: all marks must be numeric
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: marks must be between 0 and 100
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (week-02/code/prompt_c.py)
========================================================================
```

**Prompt D**

```
{'average': 60.0, 'highest': 80, 'lowest': 40, 'pass_rate': 66.67}
========================================================================
analyze_marks harness — week-02/code/prompt_d.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.67
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: marks must be a non-empty list
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: all marks must be numeric
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: all marks must be between 0 and 100
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (week-02/code/prompt_d.py)
========================================================================
```

---

## 7. Scoring

0–2 per criterion, using the rubric in `README.md` Part 7.

| Criterion | A | B | C | D |
| --- | --- | --- | --- | --- |
| Correctness (cases passed) |0 |2 |2 |2 |
| Requirement coverage |0 |2 |2 |2 |
| Verifiability (tests) |0 |0 |2 |2 |
| Assumptions stated |0 |0 |2 |2 |
| Noise (2 = none) |0 |2 |1 |2 |
| **Total / 10** |0 |6 |9 |10 |

**Prompt length, in words:** A _7___ · B __44__ · C __84__ · D ___107_

**Words added per point gained** — B over A +37/+6 points, C over B +40/+3p, D over C +23/+1. One line on what that ratio says: from A to B was the most efficient, less words for points, and from C to D was the most expensive - +23words, but only +1 point.

---

## 8. Conclusion — 150–200 words

Answer in this order: (1) which prompt scored best, and whether it is the one you would actually
use at work; (2) which single addition bought the most correctness, naming the exact case that
changed verdict; (3) what was pure noise; (4) the ambiguity and your resolution.

Name test cases and real returned values. "More detailed prompts work better" scores zero.

```
(150–200 words)
It is clear that last D prompt is the best because it's detailed, and in compare with C, it removes additions from AI. The biggest jump in correctness came from prompt B. It took the result from 0/6 to 6/6, which is ERROR on every case, because prompt A never defined analyze_marks at all, and it just did by giving signature. Prompt C added tests and stated assumptions, but also noises. It validated pass_mark itself, no one asked it about it in prompt B. 
The ambiguity that I found was pass_rate should be rounded. In prompt B left it unrounded, so result was like 66.666... and passed only because tolerance was 0.01. Prompt C rounded it correctly, but not because we asked it, it saw in example. It is a real problem, so I resolved it by stating "Round pass_rate to 2 decimal" and so on. And there is left some guessing work for AI in pass_mark part. It should be validated the same way, which I asked in prompt D. 

```

**Word count:**174+-

---

## 9. Two questions for the debrief

Written before class, answered in class.

1.How much can we rely on models that picking up unstated intent from examples versus writing it out explicitly every time?
2.Prompt C added pass_mark without being asked, and it is real fix. B crushed with TypeError instead of ValueError on bad pass_mark. Where is the line between useful addition and noise?
