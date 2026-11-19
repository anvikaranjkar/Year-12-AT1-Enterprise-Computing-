window.STUDY_PLAN=[
  [
    "Get comfortable in the grid",
    "Read spreadsheet foundations. Do lab lessons 1–3; repeat them in Excel Online.",
    "Build a six-row table and calculate a total independently.",
    "Foundations"
  ],
  [
    "References that survive copying",
    "Do lessons 4–5. Change the fixed target and inspect the copied formulas.",
    "Explain B2, $B$2, B$2 and $B2.",
    "Foundations"
  ],
  [
    "Sort and filter safely",
    "Read sorting and cleaning notes; do lessons 6–7. Use two filters together, then clear them.",
    "Find North Express records and distinguish SUM from SUBTOTAL.",
    "Filtering"
  ],
  [
    "AVERAGEIF from zero",
    "Read conditional functions; do lesson 8. Hand-check each matching record.",
    "Write AVERAGEIF without copying and explain its three arguments.",
    "Core practical"
  ],
  [
    "Counts and conditional totals",
    "Do lessons 9 and 15; compare COUNT, COUNTA, COUNTIF and SUMIF.",
    "Choose count, total or mean from the wording of a question.",
    "Core practical"
  ],
  [
    "IF and boundary conditions",
    "Do lessons 10–11; test below, at and above a threshold.",
    "Use <= correctly and explain AND versus OR.",
    "Core practical"
  ],
  [
    "Exact VLOOKUP",
    "Read lookups and complete lesson 12. Deliberately search a missing ID.",
    "Find an ID with FALSE and explain #N/A.",
    "Core practical"
  ],
  [
    "Lookups and mixed revision",
    "Do lesson 13; rebuild AVERAGEIF, IF and VLOOKUP on a fresh sheet.",
    "Solve a changed example with aligned ranges and locked references.",
    "Core practical"
  ],
  [
    "Charts and pivot summaries",
    "Read chart notes and Booklet 2 Visual stories. Do Harbour Dispatch lessons 17–18, then try Chart clinic.",
    "Compare two figures with a difference and a unit.",
    "Visualisation"
  ],
  [
    "Data types and collection",
    "Read data types, measurement scales and sampling; use flashcards and topic quizzes.",
    "Classify both collection dimensions, sampling method and measurement scale.",
    "Data science"
  ],
  [
    "Quality, limitations and bias",
    "Read data evaluation and Booklet 2 Errors and bias. Evaluate a weekday-only survey and try the outlier experiment.",
    "Write limitation → decision impact → improvement.",
    "Data quality"
  ],
  [
    "Dashboard recommendations",
    "Read dashboard and Booklet 2 UX notes. Complete the dashboard lab, then one Booklet 2 written response.",
    "Support a recommendation with exact figures and a qualified conclusion.",
    "Enterprise analysis"
  ],
  [
    "Databases and system changes",
    "Read databases and Booklet 2 warehousing. Try the OLAP explorer and forecast lab; practise the Forecast review workbook.",
    "Explain mechanism, benefit, operational risk and mitigation.",
    "Systems"
  ],
  [
    "Ethics and inclusive design",
    "Review Booklet 2 security, governance, social behaviour and technology concepts. Use targeted quizzes and explain one risk/control per topic.",
    "Give a scenario-specific risk and a suitable control.",
    "Responsible data"
  ],
  [
    "Mock 1 · 80 minutes",
    "Export the mock dataset and work in Excel Online without notes, hints or AI. Finish before revealing solutions.",
    "Self-mark honestly; record every lost mark in the mistake log.",
    "Timed practice"
  ],
  [
    "Repair your weak spots",
    "Redo missed mock skills with changed values. Revisit the relevant explanation.",
    "Get each missed skill right twice without copying.",
    "Targeted practice"
  ],
  [
    "Mock 2 · 80 minutes",
    "Sit the second mock under the same restrictions; reserve checking time.",
    "Work towards 40/40, checking both formulas and evidence.",
    "Timed practice"
  ],
  [
    "Independent rehearsal",
    "Do a short mixed set, review errors and verify the lockdown browser and exact school instructions.",
    "Complete the main skills unaided. Finish early and rest.",
    "Consolidation"
  ]
];
window.LAB_ROWS=[["D101","North","Mon","Express",12,2,5],["D102","South","Mon","Standard",28,4,4],["D103","North","Tue","Standard",20,1,4],["D104","South","Tue","Standard",35,6,4],["D105","North","Wed","Express",15,3,5],["D106","West","Wed","Standard",18,2,4],["D107","South","Thu","Standard",25,5,4],["D108","West","Thu","Express",25,4,5],["D109","North","Fri","Express",13,2,5],["D110","South","Fri","Standard",20,7,4],["D111","North","Sat","Standard",18,3,4],["D112","West","Sat","Express",19,3,5]];
window.LAB_LESSONS=[
  {
    "id": "s1",
    "title": "1. Meet the spreadsheet",
    "skill": "Cells & ranges",
    "task": "Click E2: column E, row 2. In K2 enter a formula that references E2.",
    "cell": "K2",
    "value": 12,
    "solution": "=E2",
    "hint": "A formula starts with =. Reading E2 does not change E2.",
    "why": "E2 contains 12 minutes. Change E2 and see K2 update."
  },
  {
    "id": "s2",
    "title": "2. Calculate row revenue",
    "skill": "Arithmetic",
    "task": "In H2 calculate parcels × fee for the first order.",
    "cell": "H2",
    "value": 10,
    "solution": "=F2*G2",
    "hint": "Multiply with *. F2 contains 2 parcels and G2 a $5 fee.",
    "why": "2 × $5 = $10 revenue. Costs are missing, so this is not profit."
  },
  {
    "id": "s3",
    "title": "3. Summarise a range",
    "skill": "SUM",
    "task": "In K3 calculate the total number of parcels across all 12 records.",
    "cell": "K3",
    "value": 42,
    "solution": "=SUM(F2:F13)",
    "hint": "The colon includes all cells from the first to the last address.",
    "why": "2+4+1+6+3+2+5+4+2+7+3+3 =42 parcels."
  },
  {
    "id": "s4",
    "title": "4. Lock a reference",
    "skill": "Absolute references",
    "task": "J2 is the target 20. In I2 use IF to show Met if E2 is <= target, otherwise Late. Lock J2.",
    "cell": "I2",
    "value": "Met",
    "solution": "=IF(E2<=$J$2,\"Met\",\"Late\")",
    "hint": "Use $J$2 to fix both column and row.",
    "why": "E2 moves when filled down; $J$2 remains the target."
  },
  {
    "id": "s5",
    "title": "5. Fill a formula down",
    "skill": "Fill down",
    "task": "After lesson 4, select I2. Enter I13 in Fill through and fill. Inspect I13.",
    "cell": "I13",
    "value": "Met",
    "solution": "=IF(E13<=$J$2,\"Met\",\"Late\")",
    "hint": "Use the Fill through control above the grid.",
    "why": "19 minutes meets a 20-minute target. Check the formula uses E13 and $J$2."
  },
  {
    "id": "s6",
    "title": "6. Use two filters",
    "skill": "Filter",
    "task": "Filter Zone = North AND Service = Express. Enter the visible record count in K17.",
    "cell": "K17",
    "value": 3,
    "solution": "3",
    "hint": "Both filter controls are above the grid. Different columns combine with AND.",
    "why": "D101, D105 and D109 match. Filtering hides records, without deleting them."
  },
  {
    "id": "s7",
    "title": "7. Visible rows versus all rows",
    "skill": "SUBTOTAL",
    "task": "Keep North + Express filters. In K18 calculate the visible parcel total only.",
    "cell": "K18",
    "value": 7,
    "solution": "=SUBTOTAL(109,F2:F13)",
    "hint": "SUM includes hidden rows. SUBTOTAL(109,range) sums visible rows.",
    "why": "Visible parcel counts 2,3,2 total 7. SUM still returns 42."
  },
  {
    "id": "s8",
    "title": "8. Average one group",
    "skill": "AVERAGEIF",
    "task": "Clear filters. In K6 calculate the mean dispatch time for North orders.",
    "cell": "K6",
    "value": 15.6,
    "solution": "=AVERAGEIF(B2:B13,\"North\",E2:E13)",
    "hint": "Check zone labels, match North, average the corresponding times.",
    "why": "North times 12,20,15,13,18 total 78. 78÷5 =15.6 minutes."
  },
  {
    "id": "s9",
    "title": "9. Count by a condition",
    "skill": "COUNTIF",
    "task": "In K7 count orders with a dispatch time greater than 20 minutes.",
    "cell": "K7",
    "value": 4,
    "solution": "=COUNTIF(E2:E13,\">20\")",
    "hint": "Put the comparison criterion in double quotation marks.",
    "why": "28,35,25 and 25 exceed 20. Exactly 20 does not."
  },
  {
    "id": "s10",
    "title": "10. Test a boundary",
    "skill": "IF",
    "task": "Row 4 is exactly 20 minutes. In K8 show Met when it is 20 or less, otherwise Late.",
    "cell": "K8",
    "value": "Met",
    "solution": "=IF(E4<=20,\"Met\",\"Late\")",
    "hint": "20 or less includes exactly 20: use <=.",
    "why": "20<=20 is TRUE. Test below, at and above each limit."
  },
  {
    "id": "s11",
    "title": "11. Combine conditions",
    "skill": "IF + AND",
    "task": "In K9 show Priority when row 2 is Express AND its time is greater than 10; otherwise Normal.",
    "cell": "K9",
    "value": "Priority",
    "solution": "=IF(AND(D2=\"Express\",E2>10),\"Priority\",\"Normal\")",
    "hint": "AND requires both comparisons to be TRUE.",
    "why": "Row 2 is Express and 12>10. OR would accept either condition alone."
  },
  {
    "id": "s12",
    "title": "12. Find an exact ID",
    "skill": "VLOOKUP",
    "task": "In K10 look up D108’s dispatch time using an exact-match VLOOKUP.",
    "cell": "K10",
    "value": 25,
    "solution": "=VLOOKUP(\"D108\",A2:G13,5,FALSE)",
    "hint": "The ID is in the first column. Dispatch time is the 5 th column within the table.",
    "why": "D108 has 25 minutes. FALSE requests an exact match."
  },
  {
    "id": "s13",
    "title": "13. Separate match and return",
    "skill": "INDEX + MATCH",
    "task": "In K11 find D108’s dispatch time with INDEX and MATCH.",
    "cell": "K11",
    "value": 25,
    "solution": "=INDEX(E2:E13,MATCH(\"D108\",A2:A13,0))",
    "hint": "MATCH finds the position in IDs; INDEX returns that position in times.",
    "why": "0 means exact match. Return and search ranges align to the same records."
  },
  {
    "id": "s14",
    "title": "14. Compare group means",
    "skill": "Chart interpretation",
    "task": "In K12 calculate the South mean minus the North mean. Then build a summary: group B, value E, Mean.",
    "cell": "K12",
    "value": 11.4,
    "solution": "=AVERAGEIF(B2:B13,\"South\",E2:E13)-AVERAGEIF(B2:B13,\"North\",E2:E13)",
    "hint": "Subtract North 15.6 from South 27. Use two AVERAGEIF functions.",
    "why": "South averages 11.4 minutes longer. This describes a difference; it does not prove a cause."
  },
  {
    "id": "s15",
    "title": "15. Total one category",
    "skill": "SUMIF",
    "task": "In K13 total the parcels for Express orders.",
    "cell": "K13",
    "value": 14,
    "solution": "=SUMIF(D2:D13,\"Express\",F2:F13)",
    "hint": "Check services in D; add corresponding parcel counts in F.",
    "why": "Express parcel counts 2,3,4,2,3 total 14 parcels."
  }
];
window.GLOSSARY=[
  [
    "Active collection",
    "People deliberately provide information, such as completing a survey. This is independent of whether recording is manual or computerised."
  ],
  [
    "Passive collection",
    "Information is recorded through observation or activity without a direct response, such as sensor readings. Ethical consent and notice still matter."
  ],
  [
    "Primary data",
    "Data collected first-hand for the current investigation."
  ],
  [
    "Secondary data",
    "Existing data reused for this investigation; check source, method, age and suitability."
  ],
  [
    "Quantitative data",
    "Numerical counts or measurements suitable for meaningful arithmetic. An ID written as digits is still a label."
  ],
  [
    "Qualitative data",
    "Descriptions or categories, such as service type or written feedback."
  ],
  [
    "Nominal",
    "Categories without an inherent order: zone or product type."
  ],
  [
    "Ordinal",
    "Ordered categories with no guaranteed equal gaps: satisfaction ratings."
  ],
  [
    "Interval",
    "Equal differences, no true zero: temperature in Celsius.20°C is not twice as hot as10°C."
  ],
  [
    "Ratio",
    "Equal differences and a true zero: duration, distance and units sold.20 minutes is twice10 minutes."
  ],
  [
    "Accuracy",
    "How closely values match the correct or true values."
  ],
  [
    "Validity",
    "Whether the method measures what the investigation intends to measure."
  ],
  [
    "Reliability",
    "Consistency when the process is repeated under comparable conditions."
  ],
  [
    "Relevance",
    "Whether the data suits the question, audience, population and time period."
  ],
  [
    "Bias",
    "A systematic distortion favouring particular groups or conclusions. A larger sample does not automatically remove it."
  ],
  [
    "Informatics",
    "Using computing to organise, process and interpret information for a purpose."
  ],
  [
    "Volume",
    "How much data is collected."
  ],
  [
    "Velocity",
    "How quickly data is generated, received and processed."
  ],
  [
    "Variety",
    "Different formats and sources: tables, text, images or sensor streams."
  ],
  [
    "Structured data",
    "Data with predefined fields and organisation, such as a relational table."
  ],
  [
    "Unstructured data",
    "Content with no fixed tabular schema, such as images or free-text reviews."
  ],
  [
    "Data warehouse",
    "Integrated historical data from multiple sources, organised to support analysis."
  ],
  [
    "Relational database",
    "Related tables connected through keys, with integrity rules."
  ],
  [
    "SQL",
    "A language for querying and managing relational data."
  ],
  [
    "Pivot table",
    "A configurable grouped summary using counts, sums, means and other aggregates."
  ],
  [
    "KPI",
    "Key performance indicator: a measure connected to an enterprise objective and often a target."
  ],
  [
    "Dashboard",
    "A focused view of metrics and visualisations that supports a particular audience’s decisions. It is not necessarily live."
  ],
  [
    "What-if modelling",
    "Changing assumptions to explore possible outcomes. Results depend on assumptions and are not promises."
  ],
  [
    "Statistical modelling",
    "Using mathematical relationships and assumptions to describe data or estimate outcomes."
  ],
  [
    "Machine learning",
    "Models learn patterns from examples; their outputs can be uncertain, inaccurate or biased."
  ],
  [
    "Cloud storage",
    "Data stored on remote services accessed over a network; synchronisation alone is not a complete backup strategy."
  ],
  [
    "Blockchain",
    "A distributed ledger linking records cryptographically; useful in specific trust contexts but not required for ordinary spreadsheet analysis."
  ],
  [
    "ICIP",
    "Indigenous Cultural and Intellectual Property: rights and interests connected to Indigenous knowledge, cultural expression and heritage. Community protocols and authority matter."
  ],
  [
    "Indigenous data sovereignty",
    "The right of Indigenous peoples to govern data about their peoples, cultures, lands and resources."
  ],
  [
    "Computational thinking",
    "Breaking down problems, recognising patterns, abstracting relevant detail and designing algorithms."
  ],
  [
    "Emoticon / emoji",
    "Emoticons use characters like :-) ; emoji are pictographs. Their interpretation varies by context and culture."
  ],
  [
    "Meme",
    "Replicated and adapted cultural content; useful feedback in context, but not a representative survey by itself."
  ]
];
