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

**Scope:** Система автоматизированной проверки доступности комнат в смарт-кампусе обрабатывает запросы на бронирование, анализируя текущее время, ограничения по длительности, статусы блокировки помещений и список существующих броней для предотвращения временных конфликтов.

### 2.2 The acceptance criteria in my own words

| AC | In my own words |
| --- | --- |
| AC1 | Время задается целыми минутами после полуночи (0 ≤ start < end ≤ 1440). Время начала (start) должно быть строго больше текущего времени (now). |
| AC2 | Длительность бронирования не должна превышать 120 минут (ровно 120 минут разрешено). |
| AC3 | Если комната заблокирована (blocked = True), любой запрос на бронирование получает отказ. |
| AC4 | Пересечение запрашиваемого интервала с любой существующей бронью дает отказ. Касание интервалов концами (например, конец первой брони совпадает с началом второй) не считается пересечением. |
| AC5 | Результат проверки (Available или Unavailable) отображается однозначно и наглядно. Существующие брони в базе данных/состоянии не изменяются. |
| AC6 | Интерфейс предоставляет понятные и читаемые сообщения об ошибках ввода, а также удобен для просмотра на узких мобильных экранах. |

### 2.3 Likely failure points

<!-- At least two. The brief's examples: endpoint overlap, starts-now. -->

| # | Failure point | AC | How I will check it |
| --- | --- | --- | --- |
| 1 | Граничные условия и операторы сравнения: ошибки вида < вместо <= при проверке лимита длительности в 120 минут или при касании концов броней. | AC2, AC4 | Тесты с ровно 120 минутами длительности и со стыкующимися интервалами (конец одной брони равен началу другой). |
| 2 | Неупорядоченные данные: набор existing передан в случайном порядке, что может нарушить логику проверки интервалов. | AC4, AC5 | Передача в тестах перемешанных наборов existing для подтверждения устойчивости алгоритма. |

### 2.4 The contract

| Parameter | Meaning | Type and allowed values |
| --- | --- | --- |
| `start` | время начала желаемого бронирования | int, минуты после полуночи, 0–1440 |
| `end` | время окончания желаемого бронирования | int, минуты после полуночи, 0–1440 |
| `now` | текущее время | int, 0–1439, всегда корректно |
| `blocked` | административная блокировка комнаты | bool: True или False |
| `existing` | уже существующие брони комнаты | набор или список пар (start, end) |
| returns | можно ли забронировать | строго bool: True (возможно) или False (запрещено) |

### 2.5 Initial assumptions and manual checks

**Assumptions:**

1. Параметр now всегда корректен и находится в диапазоне 0–1439, а временная шкала в рамках одних суток строго ограничена 1440 минутами.
2. Статус блокировки комнаты передается единым флагом blocked, действующим на весь проверяемый период.

**Checked manually:**

- Проверить работу системы при вводе значений на самых границах суток (возле 0 и 1440 минут).
- Вручную переключить состояние блокировки в интерфейсе и проверить реакцию формы.

## 3. Python v1 review

<!-- One row per conditional branch in code/original/booking_v1.py (your language's v1 on
     Path B). Quote the condition exactly. AC1-AC4 must all appear in the AC column. -->

| Branch in v1 (quoted) | AC | Satisfies it? | Why |
| --- | --- | --- | --- |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |

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

<!-- Main generated files or components, with their path inside web/original/
     (for example src/App.tsx). At least two. -->

| Generated file or component | Path | Its role |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |

**What v1 does:**

- (write here)

## 5. Test cases — executed on both artifacts

<!-- Base for every case unless the row says otherwise: now = 540, blocked = False,
     existing = [(600, 660)]. Do not change the first four columns.
     Python columns: True, False or Error (it raised) — what the call actually returned.
       T11: the result of the SECOND call. T12: n/a.
       Path A: the checker runs both of your files on T1-T11 and compares (C2, C3).
     Page columns: Available, Unavailable or Not testable — what the page actually showed.
     Never write a result you did not observe. -->

| Case | Name | Input | Expected | Python v1 | Python final | Page v1 | Page final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | Touching | 660–720 | Available | | | | |
| T2 | Overlap | 630–690 | Unavailable | | | | |
| T3 | Blocked | 660–720, blocked | Unavailable | | | | |
| T4 | Exactly 120 min | 720–840 | Available | | | | |
| T5 | 121 min | 720–841 | Unavailable | | | | |
| T6 | Starts now | 540–570 | Unavailable | | | | |
| T7 | Reversed | 720–660 | Unavailable | | | | |
| T8 | Ends at midnight | 1380–1440 | Available | | | | |
| T9 | Past midnight | 1380–1441 | Unavailable | | | | |
| T10 | Second booking | 720–780, existing (600–660), (700–760) | Unavailable | | | | |
| T11 | Same check twice | 660–720, twice | Available | | | | |
| T12 | Narrow screen | T1 at ~375 px wide | Available | n/a | n/a | | |

## 6. Traceability

<!-- His table. Implementation / file: where the rule lives (booking.py line, a component).
     Test input: the case IDs from section 5. v1 / final actual: what those cases gave. -->

| AC | Implementation / file | Test input | Expected | v1 actual | Final actual |
| --- | --- | --- | --- | --- | --- |
| AC1 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC2 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC3 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC4 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC5 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC6 | (write here) | (write here) | (write here) | (write here) | (write here) |

## 7. Issue log

<!-- At least two, from v1 — a functional defect and a usability or code-quality issue where you
     have them. If every case passed on v1, log the preventive cleanup and say why.
     Reproduction names a case (T1-T12) or an AC. Priority: High, Medium or Low.
     Prompt / change: the focused prompt you sent, and what changed. Never "make it better". -->

| # | Issue | Reproduction | Priority | Prompt / change | Retest result |
| --- | --- | --- | --- | --- | --- |
| 1 | (write here) | (write here) | (write here) | (write here) | (write here) |
| 2 | (write here) | (write here) | (write here) | (write here) | (write here) |

**Before / after:** `evidence/before-1.png` → `evidence/after-1.png` show issue (write here)

## 8. Critique decisions

<!-- The AI's review against AC1-AC6 (stage C), claim by claim. At least three rows.
     How I verified it: the case, test or run that confirmed or refuted the claim.
     Decision: accept, reject or modify. At least one reject or modify — the reflection asks for it. -->

| # | AI claim or recommendation | How I verified it | Decision | Reason (AC or case) |
| --- | --- | --- | --- | --- |
| 1 | (write here) | (write here) | (write here) | (write here) |
| 2 | (write here) | (write here) | (write here) | (write here) |
| 3 | (write here) | (write here) | (write here) | (write here) |

## 9. Coding-agent analysis

### 9.1 The loop

<!-- One real pass through the loop from this assignment — with your assistant or with Bolt. -->

| Step | What happened in this assignment |
| --- | --- |
| User goal | (write here) |
| Model / plan | (write here) |
| Tool call | (write here) |
| Observation | (write here) |
| Next step | (write here) |
| Human review | (write here) |

### 9.2 Context, tools and permissions

<!-- At least three rows. Last column: Observed (you saw it happen) or Assumed (you infer it
     about the internals). Use both at least once. -->

| Tool | Context it used | Tools or permissions | Observed or assumed |
| --- | --- | --- | --- |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |

### 9.3 Checkpoint and dependability

**Safety checkpoint:** (write here)

**Reliability, security, responsibility:** (write here)

## 10. Reflection

<!-- 100-200 words, in your own words, no AI. Compare AI-assisted coding (the Python part) with
     vibe coding (the Bolt part); one example each of a reliability, an availability/usability and
     a security risk; why review, tool permissions and tests stay human responsibilities; one AI
     recommendation you rejected or modified, and why; what you would improve next without
     expanding the scope. -->

(write here)

## 11. Appendix A — AI exchanges

<!-- At least four. Complete prompts and complete responses, as text — never screenshots. Paste
     each inside the ~~~~ block that follows its label.
     Stage: Plan, Generate, Critique or Repair (the brief's A-D) — at least one of each.
     Source: this SIS, week-05 or week-06. Reused exchanges keep their original date.
     The Generate exchange for Python must contain your v1 exactly as it is in code/original/.
     Add B5, B6 … if you ran more. -->

### B1

- **Tool:** (FILL IN: the tool that actually produced this plan)
- **Model:** (FILL IN: exact model, or: not displayed)
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
(1) План для Python-функции can_book
Порядок проверок (Checks in Order)
Валидация базовых диапазонов и AC1 (Старт после Now):
Проверить, что 0 <= start < end <= 1440.
Проверить, что start > now. Если нет — вернуть False.
Проверка AC2 (Длительность):
Проверить, что (end - start) <= 120 минут (ровно 120 разрешено). Если больше 120 — вернуть False.
Проверка AC3 (Блокировка комнаты):
Проверить флаг blocked. Если True, вернуть False на любой запрос.
Проверка AC4 (Пересечения с существующими бронями):
Пройти циклом по списку existing. Для каждой пары (ex_start, ex_end) проверить условие пересечения: интервалы пересекаются, если start < ex_end и ex_start < end.
Примечание: Касание концами (например, бронь заканчивается в момент начала следующей) не является пересечением (< вместо <=), поэтому стыкующиеся интервалы разрешены. Если найдено пересечение — вернуть False.
Успешный результат (AC5):
Если все проверки пройдены успешно, вернуть True. Функция чистая (pure function) и не изменяет исходный список existing.
Допущения (Assumptions)
Параметры start, end, now передаются как целые числа (минуты от 0 до 1440).
blocked — строго булево значение (True или False).
existing — итерируемая коллекция пар (start, end).
Граничные тесты для реализации (test_booking.py)
start == now (должно вернуть False).
end - start == 120 (максимально допустимая длительность — должно вернуть True).
end - start == 121 (превышение лимита — должно вернуть False).
blocked = True (при любых валидных временах должно вернуть False).
Стыкующиеся интервалы (касание концами): существующая бронь (100, 200), запрос (200, 300) или (0, 100) (должно вернуть True).
Пересекающиеся интервалы: существующая бронь (100, 200), запрос (150, 250) (должно вернуть False).

(2) Промпт для Bolt.new
Скопируйте этот текст и вставьте его в поле ввода на bolt.new:

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

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Stage:** (write here)
- **Source:** (write here)

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

### B3

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Stage:** (write here)
- **Source:** (write here)

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

### B4

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Stage:** (write here)
- **Source:** (write here)

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

## 12. Appendix B — Test output

### 12.1 Your suite

<!-- The complete terminal output of your final suite. Path A: python -m unittest -v, run inside
     code/ — the part ending in "Ran N tests" and OK or FAILED. -->

~~~~text
(paste here)
~~~~

### 12.2 Path B only — three faults you planted

<!-- Path A: leave this table as it is. Path B: three rows — the line you broke, the AC it
     breaks, the test that failed. -->

| # | Line you broke | AC | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

## 13. Remaining limitations and known fails

<!-- One row per check ID in submission.yml known_fails, and any limitation you know of.
     If the checker is clean and you know of none, one row that says so. -->

| Check ID or limitation | Why it stays | What I would do next |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
