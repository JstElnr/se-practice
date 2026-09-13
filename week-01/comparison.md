# Week 01 — Manual vs AI: Comparison

**Name:** Yelnur Alga
**Group:**
**Date:**

---

## 1. Facts

| | Manual (Part 1) | Rocket (Part 2) |
| --- | --- | --- |
| Language / stack used | Python| Next.js + TypeScript (chosen by Rocket, not requested)|
| Time to first version that ran |18:42 | few minutes|
| Time to all 4 test cases passing |20:17 | few minutes|
| Number of attempts / prompts needed | 1| 2|
| Lines of code you actually wrote | 56| 0|
| Did it handle invalid marks (case B)? |yes | no, 101 was included|
| Did it handle an empty list (case D)? |no, at first |yes |
| Did it use the ≥ 50 pass threshold? | yes| no at first used 60|
| Output format matches the spec? | yes|yes |
| Can you explain every line of it? | yes| no|

## 2. Test results

| Case | Input | Manual output | Rocket output | Spec says | Match? |
| --- | --- | --- | --- | --- | --- |
| A | `85, 23, 45, 90, 92` | | | |yes|
| B | `88, 47, -5, 101, abc, 73, 50, , 100` | | | |yes |
| C | `10, 20, 30` | | | avg 20.00 · high 30 · low 10 · pass 0.0% |yes |
| D | `abc, , xyz` | | | clear message, no crash | yes|

## 3. What the AI added that I never asked for

<!-- Tech stack, UI, extra features, a pass threshold it invented, styling, etc. -->

- Next.js + TypeScript
- Built dashboard
- Added a grading scale

## 4. What the AI got wrong or silently skipped

<!-- Be concrete: input, expected, actual. -->

- Case B: input 88, 47, -5, 101, abc, 73, 50, , 100 should give 5 valid marks. Rocket correctly rejected -5 and abc, but instead of rejecting 101, it included it too


## 5. The defect I asked Rocket to fix

**Prompt I used:**
input: 88, 47, -5, 101, abc, 73, 50,  , 100. Expected from you - Valid marks: 5
Average: 71.60
Highest: 100
Lowest: 47
Pass rate: 80.0%

You correctly skipped -5, abc, and ' ', but you include 101, which is beyond 0-100. Fix this right now
**Result:** (fixed / partly fixed / broke something else)
fixed
**What this tells me:**
It didn't test edge cases by itself
---

## 6. Reflection (200–300 words)

Answer all four, in your own words:

1. Which parts of the work did the AI genuinely speed up?
Rocket produced a working, visually complete web app in minutes from a one-line prompt
2. Where did the AI cost you time, or give you something that looked right but was not?
edge case from B with 101. Without testing it I would trust it
3. Which of these two artefacts would you be willing to put your name on, and why?
mine, because I never saw what Rocket actually did underlying
4. What must a human engineer still be responsible for after this experiment?
Testing what exactly did AI, which unrequested stack is acceptable, which is not
<!-- Write your reflection below this line sorry i did not see that and now time is 23:51 so I should be fast -->
