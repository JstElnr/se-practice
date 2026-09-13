Build a small program that processes a list of student marks and prints:
average, highest, lowest, and pass rate.

Rocket

Sep 13, 2026, 8:45 PMmessage timestamp

Agent detected prompt score : 63%
This is good enough score to proceed. However, a few answers to my questions will help enhance prompt completeness and generate more accurate results.

Who will be using this tool — is it just for you, or will a team use it too?

Just me (A personal tool I run to process and view results myself)

Rocket

Sep 13, 2026, 8:45 PMmessage timestamp

Thank you for your responses. Your final prompt score is 89%.

I have redrafted your prompt as under and will proceed to execute on the same.

Rocket Enhanced

A personal student marks processor where you input a list of marks and instantly see the average score, highest mark, lowest mark, and pass rate — all in a clean, single-screen interface built for quick personal use.

Building with Next.js and TypeScript.

Rocket

Sep 13, 2026, 8:45 PMmessage timestamp


Built MarksProcessor Web App

What I did

Built a single-screen Student Marks Processor with paste/input panel and live-computed stats (average, highest, lowest, pass rate, total count)
Added five color-coded KPI cards, a grade distribution bar chart, and a sortable/filterable parsed entries table
Included a configurable pass threshold slider so you can adjust the passing mark and instantly see updated pass rate




input: 88, 47, -5, 101, abc, 73, 50,  , 100. Expected from you - Valid marks: 5
Average: 71.60
Highest: 100
Lowest: 47
Pass rate: 80.0%

You correctly skipped -5, abc, and ' ', but you include 101, which is beyond 0-100. Fix this right now


Show less

Sep 13, 2026, 9:17 PMmessage



Rocket

Sep 13, 2026, 9:17 PMmessage timestamp

On it — tightening the validation to reject anything outside the 0–100 range.

Rocket


Fixed Mark Validation Range






What I did

Fixed mark validation to reject values outside 0–100 (e.g. 101, -5) instead of clamping them — only marks in the inclusive range 0–100 are now counted as valid

