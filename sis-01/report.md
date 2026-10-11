# SIS #01 — Software Engineering Fundamentals, With an AI in the Loop

<!--
  This is the only file you write your report in. README.md tells you what goes where.

  Rules the checker relies on:
  - Do not delete, rename or renumber the ## headings, the ### headings, or the **Label:** words.
  - Replace every "(write here)" and "(paste here)". None may be left when you submit.
  - Comments like this one are ignored by the word counter. Delete them or leave them.
-->

**Topic:** 1.9

<!-- Exactly one of 1.1 … 1.10, e.g.  **Topic:** 1.4  -->

---

## 1. Scenario

<!-- 100–150 words, labels included. One small scenario, used in every prompt and in your
     whole answer. Anything fictional is labelled in Assumptions. -->

**Question:** How do the eight principles of the ACM/IEEE-CS Software Engineering Code of Ethics apply to a small marks analyzer, and which matter most?

**Users:** A university teacher (fictional: Ms. Aigerim) who pastes the marks of one class of 30 students. The students are affected too: their results depend on the output.

**Problem:** The program prints the number of valid marks, average, highest, lowest and pass rate. It ignores invalid input (text, empty values, -5, 101) without crashing.

**Constraints:** (1) Fixed rules: a valid mark is 0 to 100; a mark passes at 50 or more. (2) One student developer, one week, no budget.

**Risk:** A wrong average or pass rate could cause an unfair decision, for example a student sent to a retake by mistake.

**Assumptions:** Fictional: Ms. Aigerim, the class of 30, the one-week limit. Not fictional: the marking rules come from my Practice 01 task.

## 2. Analysis

<!-- 350–400 words. Your answer to the question, the trade-offs, and how it applies to your
     scenario. Explain at least two engineering decisions and why they fit the scenario. -->

The eight principles of the ACM/IEEE-CS Software Engineering Code of Ethics all apply to a small marks analyzer, but not equally. In my scenario a teacher (fictional: Ms. Aigerim) pastes the marks of one class and reads the average and the pass rate. I think CLIENT AND EMPLOYER and PRODUCT matter most, and PUBLIC sets the limit for both.

PRODUCT matters because the output is useful only if it is correct. A wrong average or pass rate could cause an unfair decision about a student. Clause 3.10 asks for adequate testing, and clause 1.03 says to approve software only with a well-founded belief that it passes appropriate tests and does not diminish quality of life.

CLIENT AND EMPLOYER matters because the developer serves the teacher's real need. But the Code says this principle works consistently with the public interest, and clause 1.02 asks the developer to moderate the client's interests with the public good. A student sent to a retake by a calculation error loses something real, and fair marks support public trust in education. So PUBLIC is wider than physical safety, although I do not claim the two are the same.

JUDGMENT, PROFESSION, COLLEAGUES and SELF apply more lightly: a solo student developer should judge honestly, describe the software accurately (clauses 6.07 and 6.08), accept review from others, and keep learning. MANAGEMENT applies least, because the Code addresses it to managers and leaders, and this project has no manager.

The main trade-off is speed against robustness. With one week and no budget, the developer cannot build a large validation suite. I make two decisions. First, I test the fixed rules with expected values written by hand from the rules (for example 0, 50, 100, -5, 101 and an empty value), not copied from the program's own output. The rules are short, so exact boundary tests are cheap, and a coding mistake cannot hide inside its own tests. Second, I give Ms. Aigerim a short note that lists what the program ignores and what it does not check. Clause 3.01 asks that significant trade-offs are clear to the client, clause 3.11 asks for documentation of discovered problems, and clause 6.08 asks the developer to detect, correct and report errors. The note takes minutes, so it fits a one-week project.

Two assumptions stay unverified: the class of 30, and that a wrong output would cause an unfair retake.

## 3. Review

<!-- 250–300 words. What Prompt B's critique said and what you did with it; your two source
     checks and your two substantive revisions, each with a reason. Point at the rows of the
     tables in section 9 ("verification row 2", "change-log row 1"). -->

Prompt B returned four criticisms, and I judged each one.

1. The draft covered only some of the eight principles. I accepted this, and the final text now says something about every principle.
2. The critique said that "public" means health and safety, not students. I qualified this. The Preamble ties the code to the health, safety and welfare of the public, and clause 1.03 adds quality of life, so fair marks can fit the public interest, but I do not say PUBLIC is the same as physical safety (verification row 2, change-log row 2).
3. The critique said my idea about hiding limitations was not linked to clauses. I accepted the point but rejected the clauses it offered (verification row 1). The sentence it quoted as 2.03 is clause 2.02 in the Full Version, clause 2.03 is about a client's property, and 3.03 only asks to address ethical issues in general. I used 3.01, 3.11, 6.07 and 6.08 instead (change-log row 1).
4. The critique said AI-written tests are not part of my scenario. I accepted this: the final text uses them only as a reason to write expected values by hand.

Two more revisions came from checking the second AI draft against the scenario and the source. It listed "30 students" as a fact, but that detail is fictional, so it is now an assumption (change-log row 3). It also said MANAGEMENT is about managing a solo timeline and that clause 1.03 refers to "inappropriate tests". The Full Version addresses Principle 5 to managers and leaders, and clause 1.03 says "appropriate tests" (change-log row 4).

One thing I could not check is whether a real university lets a teacher act on such output without reviewing it. That stays an assumption.

## 4. Conclusion

<!-- 100–150 words. Your recommendation for the scenario and its main limitation. -->

For Ms. Aigerim's marks analyzer I recommend two actions before the program is used: test the fixed rules with expected values written by hand from the rules, and give the teacher a short note about what the program ignores and does not check. These actions serve PRODUCT and CLIENT AND EMPLOYER and stay inside the public interest, because they protect students from unfair decisions. The main limitation is that this analysis rests on a fictional scenario and one source. The Code gives principles, not rules, and it does not say how much testing is enough for a one-week project. I also did not verify whether a real university lets a teacher act on the program's output without checking the marks, so the size of the risk is uncertain.

## 5. Reflection

<!-- 150–200 words. NOT part of the main total. Written by you, not by the assistant:
     what helped, what you changed, what you learned. Specific beats flattering. -->


What helped me the most during this assignment was analyzing the critical feedback from Prompt B against my initial ideas. Seeing where the AI pointed out missing principles and vague claims forced me to look closely at the actual text of the ACM/IEEE-CS Code of Ethics rather than relying on general assumptions. 

In the process, I changed several key parts of my analysis. Most importantly, I removed superficial claims about "public safety" and replaced them with a more accurate discussion on how educational software impacts the quality of life, institutional trust, and fairness for students. I also corrected specific clause citations after checking the original source on the computer.org website, fixing the AI's mistakes regarding clauses and management principles.

From this assignment, I learned that AI tools are very helpful for drafting and structuring arguments, but they can easily confuse clause numbers or oversimplify ethical concepts. Therefore, critical review and independent verification of every source and claim are essential. Relying blindly on an assistant without checking primary sources leads to subtle errors that a software engineer must catch and fix personally.

## 6. References

<!-- Full references, one per line, each starting with "- ". Only sources you actually opened.
     Every URL used in the verification table must also appear here. Example:
     - Sommerville, I. (2016). Software Engineering, 10th ed., Global Edition. Pearson. Ch. 1.
-->

- IEEE-CS/ACM Joint Task Force on Software Engineering Ethics and Professional Practices (SEEPP). (1999). Software Engineering Code of Ethics and Professional Practice, Short Version and Full Version (web page "Code of Ethics for Software Engineers"). IEEE Computer Society and ACM. https://www.computer.org/education/code-of-ethics (accessed 2026-10-11).

## 7. Appendix A — Initial outline

<!-- Written BEFORE you run Prompt A. Five points, your own words, numbered. These are the
     "five points" you paste into Prompt A. -->

<!-- The ideas are mine, written in Russian before any prompt. The assistant only translated them into
     simple English; I did not change their meaning. -->

1. The most important principle for a marks analyzer is CLIENT AND EMPLOYER, because the client and the people who use the program suffer if it makes a mistake.
2. A mistake could hurt a student: by accident, the student could be sent to the summer semester or to a retake unfairly.
3. The developer should always test edge cases and should not trust the tests that the AI writes for its own code.
4. If a client asks to hide a known limitation, wrong marks could appear at the end of the course. Such a problem must be fixed, not hidden.
5. I am not sure about PUBLIC (act in the public interest). I cannot explain what it means in practice, and I want to check it.

---

## 8. Appendix B — AI exchanges

<!-- Complete prompts and complete responses, as text. -->

### B1 — Draft (Prompt A)

- **Tool:** Gemini (web)
- **Model:** Gemini 2.5 Flash
- **Date:** 2026-10-11
- **Purpose:** contextual draft

**Prompt:**

```text
Act as a software engineering tutor. Help me analyze topic 1.9 (How do the eight principles of the ACM/IEEE-CS Software Engineering Code of Ethics apply to a small marks analyzer, and which matter most?) for a first-year-level university assignment.

My scenario is: users: a university teacher (fictional: Ms. Aigerim) who pastes the marks of one class of 30 students, and the students, whose results depend on the output; problem: the program prints the number of valid marks, average, highest, lowest and pass rate, and ignores invalid input (text, empty values, -5, 101) without crashing; constraints: fixed rules (a valid mark is 0 to 100, and a mark passes at 50 or more) and one student developer with one week and no budget; risk: a wrong average or pass rate could cause an unfair decision, for example a student sent to a retake by mistake. My initial ideas are: 1. The most important principle for a marks analyzer is CLIENT AND EMPLOYER, because the client and the people who use the program suffer if it makes a mistake. 2. A mistake could hurt a student: by accident, the student could be sent to the summer semester or to a retake unfairly. 3. The developer should always test edge cases and should not trust the tests that the AI writes for its own code. 4. If a client asks to hide a known limitation, wrong marks could appear at the end of the course. Such a problem must be fixed, not hidden. 5. I am not sure about PUBLIC (act in the public interest). I cannot explain what it means in practice, and I want to check it. Draft a 400–500 word explanation using these details.

Separate facts from assumptions. Explain trade-offs and identify claims I should verify. Do not invent quotations, references or page numbers.
```

**Response:**

```text
Ethical Analysis of the Marks Analyzer Scenario
Applying the eight principles of the ACM/IEEE-CS Software Engineering Code of Ethics to Ms. Aigerim’s marks analyzer highlights how even small academic software projects carry significant ethical weight.
1. Prioritizing Principles: Client, Product, and Public
While all eight principles (Public, Client and Employer, Product, Judgment, Management, Profession, Colleagues, and Self) matter, Client and Employer and Product are the most critical here. The developer must serve Ms. Aigerim’s immediate pedagogical needs while ensuring the software meets professional standards.
The Public principle—acting consistently with the public interest—applies directly in an educational setting. In practice, the "public" here is the student body and the academic community. Ensuring accurate, unbiased calculations protects institutional integrity and preserves trust in academic evaluations.
2. Facts versus Assumptions

* Facts: The application handles 30 students, enforces strict boundaries (valid marks are 0 to 100, passing is 50 or more), ignores invalid inputs without crashing, and is built by a single developer under a one-week timeline with zero budget.
* Assumptions: It is assumed that an incorrect pass rate or average output will automatically trigger an unjust retake. In real-world academic workflows, professors typically cross-reference automated tool outputs against raw gradebooks before finalizing penalties or retakes.

3. Core Trade-Offs and Risks
The primary trade-off is speed versus robustness. Given a one-week constraint and no budget, a single developer cannot build an exhaustive enterprise-grade validation suite. This creates real risks: if a calculation error skews the pass rate, a student could face an unjust academic penalty.
Furthermore, relying blindly on AI-generated tests violates core quality standards. AI can easily generate tests that validate flawed internal logic rather than challenging edge cases. As noted correctly in your initial ideas, hiding known software limitations is entirely unethical; bugs or edge cases must be fixed transparently rather than concealed to meet a tight deadline.
4. Claims to Verify

* Claim: "A calculation error in the program will directly cause an unfair student retake." This should be verified against university policy, as official grade submission normally requires human instructor sign-off.
* Claim: "AI-written tests are inherently unreliable for validating edge cases." While AI tools accelerate development, treating them as infallible bypasses the independent verification required by professional engineering standards.

By balancing rigorous boundary testing with transparent communication regarding system limitations, the developer can uphold professional ethics even under severe time constraints.
Follow-up Question: What specific testing strategy would you implement to validate the boundary conditions (such as inputting 0, 100, -5, or 101) within your one-week development window?
```

### B2 — Critique (Prompt B)

- **Tool:** Gemini (web)
- **Model:** Gemini 2.5 Flash
- **Date:** 2026-10-11
- **Purpose:** critical review of the draft

**Prompt:**

```text
Review the draft below against my chosen question and scenario. Identify inaccuracies, missing reasoning, vague claims and unsupported assumptions.
For each concern, explain why it matters and how I could check it. Include a counterexample or alternative interpretation. Do not rewrite the answer yet.
Question: How do the eight principles of the ACM/IEEE-CS Software Engineering Code of Ethics apply to a small marks analyzer, and which matter most?. Scenario: users: a university teacher (fictional: Ms. Aigerim) who pastes the marks of one class of 30 students, and the students, whose results depend on the output; problem: the program prints the number of valid marks, average, highest, lowest and pass rate, and ignores invalid input (text, empty values, -5, 101) without crashing; constraints: fixed rules (a valid mark is 0 to 100, and a mark passes at 50 or more) and one student developer with one week and no budget; risk: a wrong average or pass rate could cause an unfair decision, for example a student sent to a retake by mistake. Draft: Ethical Analysis of the Marks Analyzer Scenario
Applying the eight principles of the ACM/IEEE-CS Software Engineering Code of Ethics to Ms. Aigerim’s marks analyzer highlights how even small academic software projects carry significant ethical weight.
1. Prioritizing Principles: Client, Product, and Public
While all eight principles (Public, Client and Employer, Product, Judgment, Management, Profession, Colleagues, and Self) matter, Client and Employer and Product are the most critical here. The developer must serve Ms. Aigerim’s immediate pedagogical needs while ensuring the software meets professional standards.
The Public principle—acting consistently with the public interest—applies directly in an educational setting. In practice, the "public" here is the student body and the academic community. Ensuring accurate, unbiased calculations protects institutional integrity and preserves trust in academic evaluations.
2. Facts versus Assumptions

* Facts: The application handles 30 students, enforces strict boundaries (valid marks are 0 to 100, passing is 50 or more), ignores invalid inputs without crashing, and is built by a single developer under a one-week timeline with zero budget.
* Assumptions: It is assumed that an incorrect pass rate or average output will automatically trigger an unjust retake. In real-world academic workflows, professors typically cross-reference automated tool outputs against raw gradebooks before finalizing penalties or retakes.

3. Core Trade-Offs and Risks
The primary trade-off is speed versus robustness. Given a one-week constraint and no budget, a single developer cannot build an exhaustive enterprise-grade validation suite. This creates real risks: if a calculation error skews the pass rate, a student could face an unjust academic penalty.
Furthermore, relying blindly on AI-generated tests violates core quality standards. AI can easily generate tests that validate flawed internal logic rather than challenging edge cases. As noted correctly in your initial ideas, hiding known software limitations is entirely unethical; bugs or edge cases must be fixed transparently rather than concealed to meet a tight deadline.
4. Claims to Verify

* Claim: "A calculation error in the program will directly cause an unfair student retake." This should be verified against university policy, as official grade submission normally requires human instructor sign-off.
* Claim: "AI-written tests are inherently unreliable for validating edge cases." While AI tools accelerate development, treating them as infallible bypasses the independent verification required by professional engineering standards.

By balancing rigorous boundary testing with transparent communication regarding system limitations, the developer can uphold professional ethics even under severe time constraints.
Follow-up Question: What specific testing strategy would you implement to validate the boundary conditions (such as inputting 0, 100, -5, or 101) within your one-week development window?
```

**Response:**

```text
Here is a detailed review of the draft against your question and scenario, broken down by inaccuracies, missing reasoning, vague claims, and unsupported assumptions.

1. Incomplete Coverage of the Eight Principles
The Issue: Your prompt explicitly asks: "How do the eight principles... apply... and which matter most?" The draft names two or three principles (Client and Employer, Product, and a brief mention of Public), but completely ignores the remaining five (Judgment, Management, Profession, Colleagues, and Self).

Why it matters: For a university grading rubric, omitting most of the core framework requested by the prompt will result in lost points. Even in a small 30-student script, principles like Self (improving one's own competence) and Judgment (maintaining integrity in technical decisions) are highly relevant to a solo student developer working under tight constraints.

How to check it: Review the official text of the ACM/IEEE-CS Software Engineering Code of Ethics and map at least a brief sentence or two for how all eight principles touch upon either the developer, Ms. Aigerim, or the students.

Counterexample / Alternative Interpretation: You could argue that Management and Colleagues do not apply because there is no team or management hierarchy. However, a developer managing their own one-week timeline is exercising self-management and professional accountability, which still ties back to the spirit of the code.

2. Vague Claim Regarding the "Public" Principle
The Issue: The draft states that the "public" in this educational setting is the student body and the academic community. While this makes intuitive sense, it stretches the standard definition of "public interest" in software engineering ethics.

Why it matters: In traditional engineering ethics, "public" refers to public health, safety, and welfare (e.g., software controlling medical devices, bridges, or public transport). Equating a classroom marks analyzer to public safety without nuance can look like a misunderstanding of professional ethics terminology.

How to check it: Read standard case studies on the ACM Code where "Public" (Principle 1) is applied to non-critical or internal software systems.

Counterexample / Alternative Interpretation: Instead of treating students as "the general public," an alternative interpretation is that the public interest relates to maintaining public trust in educational institutions and fairness in credentialing. If an institution certifies unqualified students due to software bugs, it harms the wider public labor market trust.

3. Disconnection of the "Hiding Limitations" Risk from Specific Principles
The Issue: Your initial idea #4 noted that a client might ask to hide a known limitation, and that bugs must be fixed rather than hidden. The draft mentions this briefly in passing under trade-offs, but fails to tie it explicitly to the Client and Employer or Product principles.

Why it matters: Connecting your specific scenario details directly to the official code clauses is what university tutors look for. If you mention hiding limitations without linking it to a rule, it reads as a generic opinion rather than a code-based analysis.

How to check it: Check ACM Principle 2.03 ("Not knowingly use software that is obtained or retained either illegally or unethically") or Principle 3.03 ("Identify, define and address ethical, economic, cultural, legal and environmental issues related to work products").

Counterexample / Alternative Interpretation: A client (Ms. Aigerim) might argue, "Just get it working for the 30 students today; we can fix the edge cases next semester." Ethically, an engineer cannot agree to conceal a known calculation flaw that could misreport a pass rate, because it violates professional integrity toward the client and the users (students).

4. Unsupported Assumption About AI-Generated Tests
The Issue: The draft makes a strong assertion that "relying blindly on AI-generated tests violates core quality standards. AI can easily generate tests that validate flawed internal logic..." While this is a real-world risk, the base scenario does not explicitly state that AI-written tests are being used—it was part of your initial brainstorming notes regarding code reliability.

Why it matters: Treating an assumption or brainstorming thought as a hard factual constraint of the scenario introduces external premises that weren't given in the core prompt.

How to check it: Re-read the scenario text: it mentions constraints of 1 week, no budget, 30 students, fixed rules, and one student developer. AI testing is a risk factor you brought up, but presenting it as an absolute reality of Ms. Aigerim's project is an unsupported leap.

Counterexample / Alternative Interpretation: A solo developer working with zero budget and a strict one-week deadline must leverage AI-assisted tools to build and test quickly. The ethical dilemma isn't using AI, but whether the developer takes responsibility for verifying the tests rather than treating AI outputs as infallible.

Follow-up Question: Would you like to adjust how we integrate all eight principles before we move on to drafting the final 400–500 word response?
```

### B3 — Revision (Prompt C)

- **Tool:** Gemini (web)
- **Model:** Gemini 2.5 Flash
- **Date:** 2026-10-11
- **Purpose:** revision using my decisions and verified evidence

<!-- Two copy-paste timestamp markers added by the chat window were removed from the response; the text is otherwise unchanged. -->

**Prompt:**

```text
Revise the draft using my review decisions and source notes below. Keep the answer relevant to my scenario and preserve uncertainty where evidence is limited.

My decisions: 1. Draft covered only some of the eight principles. ACCEPT: it must briefly cover all eight, because the question asks how the eight principles apply and which matter most. 2. Critique said 'public' means health and safety, not students. QUALIFY: the Code's preamble and Principle 1 speak about the health, safety and welfare of the public and the public good, and clause 1.03 says to approve software only with a well-founded belief that it passes appropriate tests and does not diminish quality of life; fair marks support public trust in education, so PUBLIC applies, but I should not claim it is the same as physical safety. 3. Critique said hiding a known limitation is not tied to specific clauses. ACCEPT: I must link my idea (a known limitation must be fixed or disclosed, not hidden) to real clauses. But REJECT the clauses the critique gave: the quoted text belongs to clause 2.02, not 2.03; clause 2.03 is about the client's property; neither is about hiding limitations; 3.03 only says to address ethical issues in general. Use clauses 3.01, 6.07 and 6.08 instead. 4. Critique said AI-written tests are not part of the scenario. ACCEPT: present it as a risk and a precaution that comes from my own outline, not as a fact of Ms. Aigerim's project. 5. Correction I add myself: the draft lists 'The application handles 30 students' under Facts, but the class of 30 is a fictional detail of my scenario, so it belongs to assumptions.. Verified evidence: Source: Software Engineering Code of Ethics and Professional Practice (Version 5.2), IEEE-CS/ACM Joint Task Force, Short Version and Full Version, https://www.computer.org/education/code-of-ethics (accessed 2026-10-11). Notes in my own words: (a) The Short Version lists eight principles: PUBLIC, CLIENT AND EMPLOYER, PRODUCT, JUDGMENT, MANAGEMENT, PROFESSION, COLLEAGUES and SELF; MANAGEMENT is addressed to managers and leaders, COLLEAGUES is about being fair to and supportive of colleagues, SELF is about lifelong learning. (b) The Preamble and Principle 1 (PUBLIC) speak about protecting the interests and well-being of the public; the Preamble puts the public interest at the centre. (c) Clause 1.03: approve software only when there is a well-founded belief that it is safe, meets specifications, passes appropriate tests and does not diminish quality of life. (d) Clause 2.02 is about not knowingly using software obtained or retained illegally or unethically; clause 2.03 is about using a client's or employer's property only with authorization and consent; clause 3.03 says to identify, define and address ethical, economic, cultural, legal and environmental issues related to work projects. (e) Clause 3.01: significant trade-offs must be clear to and accepted by the employer and the client, and available to the user and the public. (f) Clause 6.07: be accurate when stating the characteristics of software, avoiding false, misleading or doubtful claims. (g) Clause 6.08: take responsibility for detecting, correcting and reporting errors in software and its documents.. Draft: Ethical Analysis of the Marks Analyzer Scenario
Applying the eight principles of the ACM/IEEE-CS Software Engineering Code of Ethics to Ms. Aigerim’s marks analyzer highlights how even small academic software projects carry significant ethical weight.
1. Prioritizing Principles: Client, Product, and Public
While all eight principles (Public, Client and Employer, Product, Judgment, Management, Profession, Colleagues, and Self) matter, Client and Employer and Product are the most critical here. The developer must serve Ms. Aigerim’s immediate pedagogical needs while ensuring the software meets professional standards.
The Public principle—acting consistently with the public interest—applies directly in an educational setting. In practice, the "public" here is the student body and the academic community. Ensuring accurate, unbiased calculations protects institutional integrity and preserves trust in academic evaluations.
2. Facts versus Assumptions

* Facts: The application handles 30 students, enforces strict boundaries (valid marks are 0 to 100, passing is 50 or more), ignores invalid inputs without crashing, and is built by a single developer under a one-week timeline with zero budget.
* Assumptions: It is assumed that an incorrect pass rate or average output will automatically trigger an unjust retake. In real-world academic workflows, professors typically cross-reference automated tool outputs against raw gradebooks before finalizing penalties or retakes.

3. Core Trade-Offs and Risks
The primary trade-off is speed versus robustness. Given a one-week constraint and no budget, a single developer cannot build an exhaustive enterprise-grade validation suite. This creates real risks: if a calculation error skews the pass rate, a student could face an unjust academic penalty.
Furthermore, relying blindly on AI-generated tests violates core quality standards. AI can easily generate tests that validate flawed internal logic rather than challenging edge cases. As noted correctly in your initial ideas, hiding known software limitations is entirely unethical; bugs or edge cases must be fixed transparently rather than concealed to meet a tight deadline.
4. Claims to Verify

* Claim: "A calculation error in the program will directly cause an unfair student retake." This should be verified against university policy, as official grade submission normally requires human instructor sign-off.
* Claim: "AI-written tests are inherently unreliable for validating edge cases." While AI tools accelerate development, treating them as infallible bypasses the independent verification required by professional engineering standards.

By balancing rigorous boundary testing with transparent communication regarding system limitations, the developer can uphold professional ethics even under severe time constraints.
Follow-up Question: What specific testing strategy would you implement to validate the boundary conditions (such as inputting 0, 100, -5, or 101) within your one-week development window?

Show what you changed and why. Use only the sources I supplied. Flag remaining gaps instead of inventing details.
```

**Response:**

```text
Summary of Changes and Why They Were Made
Coverage of All Eight Principles: Expanded the analysis to briefly address all eight ACM/IEEE-CS principles (Public, Client and Employer, Product, Judgment, Management, Profession, Colleagues, and Self) to fully answer the prompt's requirement.
Qualified the "Public" Principle: Shifted away from treating students as literal public safety targets. Using the Preamble, Principle 1, and Clause 1.03, "public" is framed around protecting general well-being and not diminishing quality of life, linking fair educational evaluation to public trust.
Corrected Code Clauses for Hiding Limitations: Rejected the critic's mistaken citation of clauses 2.02 and 2.03. Instead, linked the necessity of fixing/disclosing limitations to Clause 3.01 (making significant trade-offs clear), Clause 6.07 (accurate, non-deceptive characteristics), and Clause 6.08 (taking responsibility for detecting and correcting errors).
Reframed AI Tests and 30 Students: Moved "the application handles 30 students" from facts to assumptions (as it is a scenario parameter), and reframed AI testing as a risk management precaution rather than an absolute project fact.
Revised Draft: Ethical Analysis of the Marks Analyzer Scenario
Applying the eight principles of the ACM/IEEE-CS Software Engineering Code of Ethics to Ms. Aigerim’s marks analyzer reveals that even small-scale academic scripts carry significant professional and ethical weight.
1. Prioritizing Principles
All eight principles—Public, Client and Employer, Product, Judgment, Management, Profession, Colleagues, and Self—guide professional behavior, though they apply differently here. Client and Employer (serving Ms. Aigerim's pedagogical needs) and Product (ensuring correct calculations) are the most critical.
The Public principle also applies: under the Preamble and Principle 1, software engineers must prioritize public welfare. While traditional public safety relates to physical health, Clause 1.03 states software must not diminish quality of life or pass inappropriate tests. In education, accurate evaluations preserve institutional trust and public confidence in academic credentials. Secondary principles like Management (managing the solo 1-week timeline), Judgment, Profession (Clauses 6.07 and 6.08 on accuracy and error correction), Colleagues, and Self (maintaining technical competence) round out the developer's professional obligations.
2. Facts versus Assumptions
Facts: The application operates under fixed rules (valid marks are 0 to 100, passing is 50 or more), ignores invalid inputs (text, empty values, -5, 101) without crashing, and is built by a solo developer under a one-week timeline with zero budget.
Assumptions: It is assumed that the class size is exactly 30 students, that an incorrect calculation will automatically cause an unjust student retake without manual gradebook checks, and that AI-assisted testing might be used under time pressure.
3. Core Trade-Offs and Risks
The primary trade-off is speed versus robustness. With only one week and no budget, a solo developer cannot build an exhaustive enterprise-grade validation suite. This creates a risk that a hidden calculation flaw could skew pass rates.
Furthermore, ethical standards forbid hiding known bugs or system limitations. Per Clause 3.01, significant trade-offs must be clear and accepted by the client. Per Clauses 6.07 and 6.08, developers must accurately state software characteristics without deceptive claims and take full responsibility for detecting, correcting, and reporting errors rather than concealing them to meet a deadline.
4. Claims to Verify
Claim: "A calculation error in the program will directly cause an unfair student retake." This must be verified against university policy, which typically requires human instructor oversight before final penalties are issued.
Claim: "AI-generated tests can be trusted implicitly." This should be verified through independent human code reviews to ensure edge cases are properly handled.
By balancing rigorous boundary testing with transparent communication regarding software limitations, the developer upholds professional ethics despite severe time constraints.
Follow-up Question: What specific testing strategy would you implement to validate the boundary conditions (such as inputting 0, 100, -5, or 101) within your one-week development window?
```

## 9. Appendix C — Evidence tables

### Verification table

<!-- At least two complete rows. Source and locator: title + page / slide / section / chapter,
     or title + URL + access date (YYYY-MM-DD). Decision: keep, qualify or reject — one word. -->

| AI claim | Source and locator | Evidence found | Decision |
| --- | --- | --- | --- |
| Prompt B critique: "Check ACM Principle 2.03 ("Not knowingly use software that is obtained or retained either illegally or unethically") or Principle 3.03 ("Identify, define and address ethical, economic, cultural, legal and environmental issues related to work products")." | Software Engineering Code of Ethics and Professional Practice, Full Version, Principles 2 and 3, clauses 2.02, 2.03, 3.03; https://www.computer.org/education/code-of-ethics (accessed 2026-10-11) | The first quoted sentence is clause 2.02, not 2.03. Clause 2.03 is about using a client's or employer's property only with authorization and consent. Clause 3.03 says "work projects", not "work products", and only asks to address ethical issues in general. None of them is about hiding limitations; clauses 3.01, 6.07 and 6.08 are. | qualify |
| Prompt B critique: "In traditional engineering ethics, "public" refers to public health, safety, and welfare" | Software Engineering Code of Ethics and Professional Practice, Preamble, Principle 1 (clauses 1.02 and 1.03); https://www.computer.org/education/code-of-ethics (accessed 2026-10-11) | The Preamble does tie the Eight Principles to the health, safety and welfare of the public, so the definition is correct. But clause 1.03 also asks that software does not diminish quality of life, and clause 1.02 asks to moderate the interests of the engineer, employer, client and users with the public good. So "welfare" is wider than physical safety, which is why I qualified the critique's conclusion about students (review point 2). | keep |

### Change log

<!-- At least two substantive revisions. Your final version must differ from the AI wording,
     and the reason must say which evidence or scenario constraint made you change it. -->

| AI wording / suggestion | Your final version | Reason for change |
| --- | --- | --- |
| Prompt B critique pointed to clauses 2.03 and 3.03 to link "hiding limitations" to the Code. | The analysis uses clauses 3.01, 3.11, 6.07 and 6.08 for the limitation note, and does not use 2.03 or 3.03. | Verification row 1: the quoted text is clause 2.02, 2.03 is about client property, and neither concerns hiding limitations. 3.01, 3.11, 6.07 and 6.08 name trade-offs, documented problems, accurate claims and error reporting. |
| Draft B1: "the 'public' here is the student body and the academic community". | "PUBLIC is wider than physical safety, although I do not claim the two are the same", and PUBLIC sets the limit for CLIENT AND EMPLOYER and PRODUCT. | Verification row 2: the Preamble speaks about health, safety and welfare, clause 1.03 adds quality of life, and clause 1.02 asks to moderate the client's interests with the public good. |
| Draft B1, Facts: "The application handles 30 students". | The class of 30 is listed as an unverified assumption. | The scenario (section 1) labels the class of 30 as fictional, so it cannot be a fact. |
| Revision B3: "Management (managing the solo 1-week timeline)" and "Clause 1.03 states software must not ... pass inappropriate tests". | MANAGEMENT "applies least, because the Code addresses it to managers and leaders"; clause 1.03 is described as asking for software that "passes appropriate tests". | The Full Version text of Principle 5 and clause 1.03 (verification row 2) says the opposite of the AI wording on both points. |
