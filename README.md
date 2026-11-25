# Enterprise Study Studio

A complete Data Science and Data Visualisation study workspace for a Year 12 student sitting Enterprise Computing in 2027. Preparation is matched to the supplied first assessment notification:80 minutes,40 marks,24 spreadsheet marks and 16 dashboard/decision marks.

## Start studying immediately

Extract the ZIP and open `index.html` in Safari, Chrome or Edge. The core app uses ordinary local scripts and has no external dependencies. If your browser restricts saving progress from a local file, use a local server or the Vercel deployment. Back up progress before changing where you open the app.

Optional local server, from this directory:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Stop the server with Ctrl+C.

## Deploy on Vercel

This is a static website. It needs no database, API key, paid AI service, build step or environment variable.

1. Extract the ZIP. Find the folder containing `index.html`, `app.js`, `styles.css` and `vercel.json`.
2. Create a private GitHub repository and upload the CONTENTS of that folder, including the `resources` subfolder. `index.html` should be at the root of the repository. Keep the original classroom materials within an audience appropriate for your course.
3. In Vercel, choose Add New → Project and import that repository.
4. Choose **Other** as the framework preset. Set the Root Directory to the folder that contains `index.html` (normally leave it at the repository root).
5. Leave the Build Command empty. Set Output Directory to `.` if an override is required. No install command or environment variables are needed.
6. Deploy. Open the resulting URL. Check that both Spreadsheet Lab and Resources load.

For the GitHub route, extract this ZIP first and upload its contents. Uploading a ZIP to GitHub does not unpack it into a website. This package has not been deployed to your Vercel account by ChatGPT.

Official deployment references:
- https://vercel.com/docs/builds/configure-a-build
- https://vercel.com/docs/builds

## What is included

- 18-day adjustable programme with class examination dates and daily mastery checkpoints.
- 24 original teaching modules, approximately 12,000 words, with worked examples and practice prompts.
- 90 spreadsheet exercises across six practice workbooks, linked worksheets, range selection, undo/redo, formatting, validation, cleaning, multi-level sorts, pivots, slicers, five chart types, forms and what-if practice.
- Timed, generated unseen challenges and a searchable guide with 31 formula/reference entries plus 16 practical walkthroughs.
- 72 multiple-choice questions with explanations and a targeted set of previously missed questions.
- 56 flashcards with 1/3/7/14-day review intervals.
- A Booklet 2 companion with 23 mapped sections, 11 new note modules, chart-scale/outlier experiments, an OLAP explorer, an editable forecast-error lab and 23 saved written-response prompts with revision guides.
- A dashboard decision lab with rates, totals, missing-data reasoning, written prompts and a transparent what-if calculation.
- Three original 80-minute practice assessments,40 marks each, unseen datasets, chart and dashboard evidence, saved responses, worked solutions and suggested self-marking rubrics.
- A corrected 58-term glossary, searchable notes, printable modules, mistake log, dark mode and progress backup/restore.
- Bundled assessment notification, spreadsheet tutorial, original glossary, dashboard archive and an upright compressed Booklet 2 reading copy. Weeks1–5 open through Canvas links, keeping this deployment package small.

The broader Year 12 Intelligent Systems and Enterprise Project areas do not yet have dedicated courses in this version. This package focuses on your first Data Science and Visualisation assessment and the supplied course content.

## Recommended learning routine

Start with Excel foundations in Learn & revise, then complete Spreadsheet Lab lesson 1. Read the explanation, try the task, use a hint only if needed, then repeat the skill from memory in Excel Online. Aim to explain why a formula answers a question, not just reproduce its syntax.

For a mock, download its CSV, open it in Excel Online and put headings in row 1. Start the 80-minute timer and work without notes, hints or AI. Record all requested formulas, results, units and explanations. Finish before opening the guide. Mark your own responses honestly and log errors. The marking guide is original practice material, not your teacher’s official scheme.

## Assessment dates from the supplied notification

- 7 December 2026: Skelton, periods 3–4.
- 9 December 2026: Daveson, periods 5–6.
- 11 December 2026: Kaur, periods 3–4.

Confirm the date for your class with your teacher. Starting 18November gives 19 days to the earliest listed date; the app’s 18-day programme is a configurable preparation sequence.

## Progress and privacy

Progress is stored only in browser localStorage. It does not automatically sync between devices, browsers, a file URL, localhost or Vercel. Use Resources & setup → Export progress backup, then restore it on another device or origin. Browser data deletion can erase progress. A backup is the reliable way to preserve it.

There are no analytics, logins, remote AI calls or third-party JavaScript libraries. Imported CSVs and written answers are processed in your browser. External official reference links open only when selected. The hosting provider serves the files and may retain ordinary access logs.

## Spreadsheet scope

The grid is a focused learning simulator, not Microsoft Excel. Supports same-sheet and cross-sheet references, arithmetic, ranges, absolute/mixed references, SUM, AVERAGE, MIN, MAX, COUNT, COUNTA, COUNTIF, SUMIF, AVERAGEIF, IF, AND, OR, NOT, ROUND, IFERROR, VLOOKUP, INDEX, MATCH, CONCATENATE, CONCAT, TRIM, UPPER, LOWER and SUBTOTAL. Additional functions: SUMIFS, COUNTIFS, AVERAGEIFS, MEDIAN, COUNTBLANK, XLOOKUP, LEN, LEFT, RIGHT and ABS. No eval or remote code execution is used.

Sort view preserves original cell addresses. A separate sorted-values copy keeps whole records together while retaining the source. Excel’s native Sort behaviour differs for dependent references. The app states this distinction. CSV export saves current values, while the progress backup retains raw formulas. The grid is bounded to 120 total rows and 16 columns; imported headings and records must fit within that range. The bundled original XLSX workbook is available inside the resource archive and should be opened in Excel.

A green formula corner is a visual cue. The summary builder demonstrates grouped aggregation; it does not reproduce Excel’s entire native PivotTable interface. Repeat those operations in Excel Online, the software used in the assessment.

## Source basis

The supplied assessment notification, Spreadsheet Skills tutorial, Weeks 1–5, glossary and Booklet 2 establish the school scope. Original explanations and practice scenarios are added for learning. The attached dashboard archive is preserved unchanged; its screenshots and workbook are supporting resources, not evidence of what will appear in the exam.

Official Microsoft formula documentation and NESA syllabus links are included in the app. Check teacher advice if menus, school permissions or assessment conditions change. Use only teacher-authorised resources during the actual supervised assessment; the notification forbids generative AI, prepared notes and prior solutions in that session.

## Verification

Formula-engine regression tests: run `node engine-tests.cjs` (159 checks). Exercise and lab helper regressions: run `node lab-tests.cjs` (66 guided formula/linked exercises, generated challenge answers, validation, CSV, selections and fill checks). Syntax checks use `node --check` on JavaScript files. Browser checks covered formula entry, conditional averages, two-column filtering, visible subtotals, guided feedback, dashboards, quizzes, flashcards, mock timing and answer review, self-marking, saved mistakes and note search. Vercel deployment itself must be completed in your own account.

## Spreadsheet Studio v2

Select a practice workbook at the top. Use Home for formatting and fill, Data & cleaning for filters, sorts and safe copies, Formulas for function help, Pivot & charts for summaries and visualisations, and Forms & what-if for validation, conditional formatting, record entry and driver cells.

Click to select a cell; double-click or press F2 to edit. Shift-click or type a range such as C2:D13 into the range box. Enter moves down and Tab moves right. Ctrl/Cmd+Z and Undo/Redo keep 35 recent changes per active workbook session. Use the sheet tabs to practise cross-sheet references. New challenge datasets have fresh values; the clock continues while away.

Formula checking compares the requested calculation and probes relevant source values in disposable copies to catch hardcoded matching results. Guided and independent completions are tracked separately. Written interpretation still requires your own judgement. Export a progress backup before moving to a different URL or browser.

The app intentionally does not reproduce all native Excel behaviour: native Goal Seek, Scenario Manager, full date handling, PivotTable dialogs and complex charts still need practice in Excel Online or the authorised desktop software. The 16-stage guide explains the relevant workflow and alternatives.

## Booklet 2 update (v2.1.0)

Open **Booklet 2 companion** from the sidebar. Its guide maps all 23 section headings in the supplied 24-scan document to explanations and source pages. The original repeats the number 26 for Legal Issues; the map preserves this distinction. The bundled reading copy contains 47 upright single pages, approximately 11.3 MB. It is a compressed derivative; the original upload remains unchanged. Some source illustrations have repeated labels or unclear units, so the notes explain how to critique and verify them. Handwriting in the scan is not treated as an official answer key.

Chart clinic demonstrates bar baselines and transparent outlier sensitivity. OLAP explorer uses 18 fictional monthly product/region records to demonstrate measures, dimensions, filters, pivoting, roll-up and access to underlying records. Forecast lab applies a supplied teaching rule and measures errors; it does not train a model or calculate confidence intervals. Written practice saves answers, optional criteria checks, self-marks and mistake-log entries.

The sixth spreadsheet workbook, Forecast review, provides 12 checkpoints on signed/absolute error, totals, mean absolute error, median, COUNTIF, VLOOKUP, IF, linked-sheet prediction, conditional formatting and charts. Existing progress remains compatible; export a backup before changing the app URL. The progress backup now also contains Booklet 2 responses and experiment settings.

Run `npm test` for the formula engine, guided workbook checks and Booklet 2 coverage/mathematics checks. New browser checks include baseline changes, outlier summaries, OLAP subsets, forecasts, invalid inputs and saved written responses.

## Teacher guidance update (v2.2.0)

Open Test priorities and likely question types in Learn & revise, or use the home-page Test priorities button. The note distinguishes confirmed assessment structure from evidence-based question predictions. It maps all five spreadsheet modules (16 lessons) and Booklet 2 Lessons14–19, and explains the school Dispatch Performance / IT Support Ticket practice sequence. Confidence levels are qualitative, not numerical probabilities.

Mock3 is a new original40-mark service-desk rehearsal:24 spreadsheet marks and16 dashboard/enterprise marks. Its twelve-record CSV is available in Resources and in `resources/teacher-focus-dataset.csv`. The separate dashboard uses a different four-week population; the paper asks students to keep that scope distinction clear. Answer guides appear only after finishing the timed paper.

`Exam-Predictions.html` is a lightweight readable companion with the priorities, practice data, questions and revealable answer guides. It opens on its own; its links to the timed app and CSV work when kept with the extracted folder.

The guidance prioritises combined filters, conditional means, exact lookups, IF rules, target changes, chart interpretation, numerical recommendations, limitations and operational effects. It does not claim the actual test questions, function list, enterprise or individual marks are known. Rehearse in the Excel version and lockdown workflow authorised by the teacher. The notification names Excel Online and submission through Canvas.

Additional verification: `node exam-focus-tests.cjs` checks the paper’s section totals, CSV record count, selection results, formula answers, fixed-target change and dashboard comparisons.


Version 2.3.0: Exam preparation
-----------------------------
Open Exam preparation in the sidebar: full cheat sheet, graph choices, 21 justification prompts, 24 teacher activity-family sets, all 16 tutorial links and Mock 4. The five original weekly PDFs and dashboard workbook/template/screenshots are bundled. Some separate Canvas HTML labs and quiz datasets require the original school links; UX Evaluation Lab is a placeholder in the supplied PDF. Revision guides are original, not official answers. Existing progress IDs and the browser storage key are retained. New writing is included in progress backups.

This package is larger because it retains the weekly sources. Extract the ZIP and upload its CONTENTS to your Vercel repository; do not upload the ZIP itself. No individual packaged source file exceeds 25 MiB. Keep index.html at the repository root; use Framework Other, no build command and repository root output. A local edit does not update an already deployed Vercel URL until you redeploy it.

Statistics practice: a seventh workbook adds 10 checkpoints for MODE/MODE.SNGL, STDEV/STDEV.S, STDEV.P, HLOOKUP and visible counts. The engine now supports these functions and SUBTOTAL count codes, with regression coverage. There are 100 spreadsheet checkpoints in total.
