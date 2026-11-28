# Enterprise Study Studio 2.5.1

A Year 12 Enterprise Computing study website for HSC 2027. This lightweight package retains every interactive study feature while keeping large source documents outside the Git upload.

## Open or deploy

Open `index.html` after extracting the ZIP. If your browser restricts saving progress from a local file, serve this folder with `python3 -m http.server 8000` and open http://localhost:8000. Progress belongs to the browser and origin; export a backup before changing where you study.

For GitHub and Vercel:

1. Extract the ZIP and upload the **files inside it** to your GitHub repository. Include subfolders. `index.html`, `app.js` and `vercel.json` must be at the repository root.
2. Do not upload the ZIP itself or the older full source-material folder. GitHub does not unpack ZIPs into websites.
3. Import the repository in Vercel. Choose **Other**, leave the build command empty, and use `.` as the output directory if an override is needed. No database, dependencies, environment variables or API keys are required.
4. Open the deployed site and check Learn & revise, Booklets and Spreadsheet lab.

This package is prepared for deployment. It has not been pushed to your GitHub repository or deployed to your Vercel account.

## Your seven-day Enterprise timetable

The website starts on **Saturday 28 November 2026** and schedules Enterprise preparation to finish on **Friday 4 December 2026**.

| Date | Enterprise focus | Study time |
| --- | --- | ---: |
| Sat 28 Nov | Foundations, cells and references | 90 min |
| Sun 29 Nov | Filtering, cleaning and conditional summaries | 120 min |
| Mon 30 Nov | Rules, exact lookups and statistics | 90 min |
| Tue 1 Dec | Graphs, dashboards and recommendations | 90 min |
| Wed 2 Dec | First full mock and marking | 100 min |
| Thu 3 Dec | Repair gaps, systems and responsible data | 90 min |
| Fri 4 Dec | Second full mock and final checks | 110 min |

Total: **11 h 30 min**, about 90–120 minutes a day. Add short breaks between learning/practice blocks; keep the 80-minute mocks continuous. These are planning estimates.

Open **Seven-day plan** for dated tasks, completion checkboxes, teaching-note and workbook links, progress, carry-over reminders and export/print. Change the start or Enterprise class date as needed. The finish remains seven inclusive days after the selected start; an early assessment date raises a warning. The start stays anchored after reload.

All 25 teaching modules are linked across the relevant days. The full exercise library remains available; the plan focuses on assessed skills and changed examples rather than requiring every optional exercise.

Completed Enterprise checkboxes from the previous version remain completed. Learned notes, spreadsheet work, quiz results, booklets and mock attempts are also retained. The original 18-day checklist remains separately archived. Progress backups include the current plan; restoring an earlier backup adds the current timetable without treating old day numbers as completed new tasks.

## Highlight notes and make booklets

- Open any of the 25 Learn & revise modules, a cheat-sheet section, or one of the seven graph guides.
- Select a passage, choose yellow, mint, blue or pink, choose a destination booklet, and press **Save highlight**. You can add an annotation before saving.
- Use **Save whole note to booklet** to keep a complete text copy of a lesson or reference section.
- Open **Booklets** in the sidebar. Create named booklets, add your own explanations, edit annotations, search, filter by type/colour, move entries, change highlight colours and remove entries.
- **Return to source** opens the original lesson and scrolls to the saved highlight where its source text is still unchanged.
- Export a booklet as text or use Print / PDF. For a complete restorable copy, use **Resources & setup → Export progress backup**. This backup includes highlights, full-note copies, annotations, all booklets and your existing study progress.

Highlights are also shown when you revisit the source lesson. Saving the same passage twice into one booklet does not make duplicates. The same passage can be saved in different booklets. If a future content update changes the exact passage, its saved text remains in your booklet; the site will not highlight unrelated text at the old position.

Booklets are saved on this browser only. They do not sync between devices. Clearing browser data can erase them. Keep progress backups somewhere you control.

## Included study material

- 25 teaching modules, a 58-term glossary and a dated seven-day Enterprise plan.
- Seven spreadsheet workbooks with 100 checkpoints, a spreadsheet-style simulator, generated unseen challenges, formula help, filtering, sorting, conditional calculations, exact lookups, references, cleaning, validation, pivots, charts and what-if practice.
- 72 knowledge checks and 56 flashcards.
- Four original 80-minute, 40-mark mocks: Section A 24 marks, Section B 16 marks, with datasets, charts, dashboard evidence, saved responses and self-marking guides.
- A full 17-section cheat sheet, seven graph guides, 12 chart-selection cases, 21 Part A justification prompts, 24 teacher activity-family guides and links to all 16 spreadsheet tutorial lessons.
- A Booklet 2 companion with 23 mapped sections, 11 note modules, 23 written prompts, chart/outlier experiments, an OLAP explorer and forecast-error practice.
- A dashboard decision lab, mistake log, dark mode, searchable notes and progress backup/restore.
- The teacher's small dashboard workbook and template, the glossary, practice CSV and printable cheat sheet.

The broader Intelligent Systems and Enterprise Project topics do not have dedicated courses here. This version focuses on the first Data Science and Visualisation assessment.

## Original documents and file size

The original assessment PDF, five weekly PDFs, spreadsheet tutorial, compressed 47-page Booklet 2 reading copy, dashboard archive and scenario screenshots open through links to your ChatGPT account. Sign in with the same account used for this study project. Source page references remain visible; the links open the document rather than guaranteeing an automatic page jump.

All teaching notes, questions, graphs, datasets and interactive exercises are included in this package and do not need those PDFs to run. The original PDFs and screenshots have not been deleted from your Mac. The full offline copy remains in `Latest-Enterprise-Study/enterprise-study` alongside its full ZIP.

The lightweight folder contains no PDFs, PNG screenshots or nested ZIPs. Every included file is under 200 KB. It starts a fresh local Git history so older large blobs are not carried over. The `.git` directory is excluded from the downloadable ZIP.

## Exam preparation

The supplied notification describes an 80-minute, 40-mark practical worth 25%: spreadsheet analysis (24 marks) and dashboard/enterprise reasoning (16 marks). Its class dates are 7, 9 and 11 December 2026. Confirm your own class date with your teacher.

Use the site to prepare before the assessment. Practise independently in the authorised Excel software and follow your teacher's lockdown-browser instructions. Original revision exercises and predicted question types are not official marking schemes or guaranteed exam questions. Aiming for full marks requires independent performance; the site does not guarantee a result.

## Spreadsheet scope

The grid is a teaching simulator rather than a full Excel implementation. It supports selected arithmetic, references, statistics, conditional summaries, lookup and text functions, including AVERAGEIF, IF, VLOOKUP, XLOOKUP, HLOOKUP, MODE, STDEV and visible-count SUBTOTAL variants. Exact supported functions are listed in its guide. Native Excel features and menu steps still need practice in your authorised version of Excel.

The grid is bounded to 120 rows and 16 columns. CSV export contains calculated values; progress backups retain raw formulas. Sort views preserve source addresses, while a separate sorted-values copy keeps whole records together. This differs from Excel's native sorting of dependent formulas.

## Privacy and compatibility

There is no app account, analytics, remote AI or external JavaScript dependency. CSVs and answers are processed in the browser. External document/reference links open only when selected and may require their own account access. The hosting provider may retain normal access logs.

Existing progress uses the same `enterprise-studio-v1` browser storage key and version 1 backup format. The booklets field is additive. Export progress before moving between a local file, localhost and a deployed URL; those locations do not share storage.

## Check the project

Run `npm test` with Node installed. The checks cover spreadsheet formulas, guided exercises, generated challenges, quiz keys, mock mark splits, chart figures, boundary conditions, booklet mathematics, statistical functions, saved-booklet data, overlapping highlights, changed-source protection and deployment resource links.

No build is needed. The ZIP opens directly and can be hosted as static files. Vercel configuration includes a restrictive content security policy; scripts are local external files.
