/* Original revision exercises, not official assessment solutions. */
window.QUIZ_BANK = [
  {
    "id": "q01",
    "topic": "Excel foundations",
    "question": "Which expression correctly adds values in B2 and C2?",
    "options": [
      "B2+C2",
      "=B2+C2",
      "=ADD(B2:C2)",
      "B2=C2"
    ],
    "correct": 1,
    "explanation": "Formulas begin with =. The + operator adds values. Excel has SUM, not a standard ADD function."
  },
  {
    "id": "q02",
    "topic": "Excel foundations",
    "question": "What does B2:B8 describe?",
    "options": [
      "Only B2 and B8",
      "The entire second row",
      "All seven cells from B2 through B8",
      "Eight cells in column B"
    ],
    "correct": 2,
    "explanation": "A colon defines an inclusive range: rows 2 through 8 make seven cells."
  },
  {
    "id": "q03",
    "topic": "Cell references",
    "question": "=B2*$H$1 is copied one row down. What does it become?",
    "options": [
      "=B3*$H$1",
      "=B3*$H$2",
      "=B2*$H$1",
      "=C2*$I$1"
    ],
    "correct": 0,
    "explanation": "Relative B2 moves to B3. Both parts of $H$1 are locked, so the parameter stays fixed."
  },
  {
    "id": "q04",
    "topic": "Cell references",
    "question": "Which part of $B2 is locked?",
    "options": [
      "Row 2",
      "Nothing",
      "Both parts",
      "Column B"
    ],
    "correct": 3,
    "explanation": "A dollar sign locks the part immediately following it. $B2 fixes column B but lets the row change."
  },
  {
    "id": "q05",
    "topic": "Summary functions",
    "question": "A2:A5 contains 10, 20, a blank and 0. What is =AVERAGE(A2:A5)?",
    "options": [
      "7.5",
      "10",
      "15",
      "30"
    ],
    "correct": 1,
    "explanation": "AVERAGE ignores an empty cell but includes numeric zero: (10+20+0)/3 =10. Missing and zero are different."
  },
  {
    "id": "q06",
    "topic": "Summary functions",
    "question": "Which formula counts cells labelled North in A2:A30?",
    "options": [
      "=COUNT(A2:A30,\"North\")",
      "=SUMIF(A2:A30,\"North\")",
      "=COUNTIF(A2:A30,\"North\")",
      "=COUNTA(\"North\")"
    ],
    "correct": 2,
    "explanation": "COUNTIF counts cells meeting a condition. COUNT counts numbers; SUMIF adds matching values."
  },
  {
    "id": "q07",
    "topic": "Conditional summaries",
    "question": "Zones are in B2:B21 and delays in D2:D21. Which formula finds mean North delay?",
    "options": [
      "=AVERAGEIF(B2:B21,\"North\",D2:D21)",
      "=AVERAGEIF(D2:D21,\"North\",B2:B21)",
      "=AVERAGE(B2:B21,\"North\")",
      "=SUMIF(B2:B21,\"North\",D2:D21)"
    ],
    "correct": 0,
    "explanation": "AVERAGEIF takes criteria range, criterion, then average range. It tests zones and averages corresponding delays."
  },
  {
    "id": "q08",
    "topic": "Conditional summaries",
    "question": "Why must AVERAGEIF ranges refer to corresponding records?",
    "options": [
      "Excel sorts both ranges first",
      "Only matching row numbers hold numbers",
      "It improves the font",
      "Each label must pair with the correct measurement"
    ],
    "correct": 3,
    "explanation": "Records are evaluated position by position. Misaligned ranges can average unrelated measurements even when the answer looks plausible."
  },
  {
    "id": "q09",
    "topic": "Logical rules",
    "question": "What does =IF(D2>=80,\"Met\",\"Not met\") return when D2 is 80?",
    "options": [
      "Not met",
      "Met",
      "#VALUE!",
      "80"
    ],
    "correct": 1,
    "explanation": ">= includes equality. Test below, at and above a threshold to confirm the intended boundary."
  },
  {
    "id": "q10",
    "topic": "Logical rules",
    "question": "Flag Priority only if revenue exceeds $100 AND delay exceeds 5. Which formula works?",
    "options": [
      "=IF(OR(E2>100,D2>5),\"Priority\",\"Standard\")",
      "=IF(E2>100+D2>5,\"Priority\",\"Standard\")",
      "=IF(AND(E2>100,D2>5),\"Priority\",\"Standard\")",
      "=IF(AND(E2>=100,D2>=5),\"Priority\",\"Standard\")"
    ],
    "correct": 2,
    "explanation": "AND requires both conditions. Exceeds means >, not >=. OR would accept either condition."
  },
  {
    "id": "q11",
    "topic": "Logical rules",
    "question": "Which COUNTIF criterion means at least 5?",
    "options": [
      "\">=5\"",
      "\">5\"",
      "\"=>5\"",
      "\"5+\""
    ],
    "correct": 0,
    "explanation": "At least includes five. Operator-plus-value criteria are placed in quotation marks."
  },
  {
    "id": "q12",
    "topic": "Lookups",
    "question": "In =VLOOKUP(H2,A2:F21,6,FALSE), what does FALSE request?",
    "options": [
      "Descending order",
      "Only false results",
      "Approximate matching",
      "Exact matching"
    ],
    "correct": 3,
    "explanation": "FALSE requires the exact lookup value in the first column. Omitting it can allow approximate matching, risky for IDs."
  },
  {
    "id": "q13",
    "topic": "Lookups",
    "question": "A lookup table spans C2:F20. Which column is column index 3?",
    "options": [
      "C",
      "E",
      "F",
      "D"
    ],
    "correct": 1,
    "explanation": "Count within the selected table: C=1, D=2, E=3, F=4. This is not the worksheet column number."
  },
  {
    "id": "q14",
    "topic": "Lookups",
    "question": "Why can VLOOKUP fail when the selected table starts in B but IDs are in A?",
    "options": [
      "FALSE cannot search text",
      "The table is too long",
      "VLOOKUP searches its selected table’s first column",
      "Lookup tables must be on another sheet"
    ],
    "correct": 2,
    "explanation": "The first column of B:F is B. Include the lookup ID at the left edge of the table array."
  },
  {
    "id": "q15",
    "topic": "Lookups",
    "question": "What does MATCH(\"North\",A2:A10,0) return?",
    "options": [
      "The exact match’s relative position within A2:A10",
      "The adjacent value",
      "The number of North records",
      "Always the worksheet row"
    ],
    "correct": 0,
    "explanation": "MATCH returns a relative position. If North is in A4 its position within A2:A10 is 3; INDEX can retrieve the value at that position."
  },
  {
    "id": "q16",
    "topic": "Spreadsheet errors",
    "question": "A lookup returns #N/A. What should you check first?",
    "options": [
      "Replace it with zero",
      "Hide the column",
      "Change FALSE to TRUE",
      "Whether the ID exists and whether spaces or types differ"
    ],
    "correct": 3,
    "explanation": "Check missing IDs, whitespace and text-versus-number mismatches. Do not disguise a real lookup problem with a plausible zero."
  },
  {
    "id": "q17",
    "topic": "Filtering",
    "question": "Zone=North and Delay>5 filters leave which records?",
    "options": [
      "All North plus all delayed records",
      "Only North records delayed more than 5",
      "The first matching North record",
      "All other records are deleted"
    ],
    "correct": 1,
    "explanation": "Different-column filters combine as AND. Filtering hides records; it does not delete them."
  },
  {
    "id": "q18",
    "topic": "Filtering",
    "question": "After filtering, which formula sums visible rows and also excludes manually hidden rows?",
    "options": [
      "=SUMIF(E2:E21,\"Visible\")",
      "=COUNT(E2:E21)",
      "=SUBTOTAL(109,E2:E21)",
      "=AVERAGE(E2:E21)"
    ],
    "correct": 2,
    "explanation": "SUBTOTAL function 109 sums visible cells and excludes filtered-out and manually hidden rows. SUM includes filtered-out rows."
  },
  {
    "id": "q19",
    "topic": "Sorting and cleaning",
    "question": "What is dangerous about sorting only Revenue rather than the entire dataset?",
    "options": [
      "Revenue may become attached to the wrong customer",
      "Duplicates are deleted",
      "Numbers become text",
      "Headers become absolute references"
    ],
    "correct": 0,
    "explanation": "A row is one record. Sorting one column independently can break relationships between its fields without an obvious error."
  },
  {
    "id": "q20",
    "topic": "Sorting and cleaning",
    "question": "Two customers share a name. What should happen before duplicate removal?",
    "options": [
      "Delete the second automatically",
      "Assume matching names prove duplication",
      "Delete both",
      "Check unique IDs and relevant fields"
    ],
    "correct": 3,
    "explanation": "Names are not unique keys. Use a justified identifier or combination of fields to avoid deleting legitimate records."
  },
  {
    "id": "q21",
    "topic": "Data quality",
    "question": "A scale consistently reads 2 kg too high. Which judgement fits?",
    "options": [
      "Accurate but unreliable",
      "Reliable under repeated conditions but inaccurate",
      "Automatically accurate and valid",
      "Relevant because it gives numbers"
    ],
    "correct": 1,
    "explanation": "Repeated consistency indicates reliability. The systematic offset reduces accuracy against true mass."
  },
  {
    "id": "q22",
    "topic": "Data quality",
    "question": "To measure waiting time, a survey asks only whether customers like the food. What is wrong?",
    "options": [
      "The answers are quantitative",
      "It is too reliable",
      "It lacks validity for the intended question",
      "Computers cannot store opinions"
    ],
    "correct": 2,
    "explanation": "Validity asks whether the method measures the intended concept. Food preference does not directly measure waiting time."
  },
  {
    "id": "q23",
    "topic": "Data quality",
    "question": "Perfectly recorded sales from five years ago inform current stock ordering. What needs checking?",
    "options": [
      "Relevance and currency for current demand",
      "Whether rows exist",
      "Whether accurate data is possible",
      "Only font colour"
    ],
    "correct": 0,
    "explanation": "Products, prices and behaviour may have changed. Accurate recording does not guarantee present suitability."
  },
  {
    "id": "q24",
    "topic": "Sampling",
    "question": "Which action best reduces bias in a survey of all gym members?",
    "options": [
      "Survey more weekday morning members",
      "Survey only friends",
      "Delete negative responses",
      "Sample membership types across different times"
    ],
    "correct": 3,
    "explanation": "Improve representativeness. A larger sample selected through the same narrow process can retain systematic bias."
  },
  {
    "id": "q25",
    "topic": "Collection",
    "question": "A person writes down answers in face-to-face interviews. What classification applies?",
    "options": [
      "Computerised and passive",
      "Manual and active",
      "Manual and passive",
      "Computerised and active"
    ],
    "correct": 1,
    "explanation": "Manual/computerised describes recording; active/passive describes whether participants directly supply a requested response."
  },
  {
    "id": "q26",
    "topic": "Collection",
    "question": "A checkout system automatically logs purchase timestamps. Which description fits?",
    "options": [
      "Manual and active",
      "Manual and passive",
      "Computerised and passive",
      "Quantitative and therefore active"
    ],
    "correct": 2,
    "explanation": "A system records normal activity without requesting a separate research answer. Passive collection still requires appropriate notice, permission and safeguards."
  },
  {
    "id": "q27",
    "topic": "Data types",
    "question": "Which variable is ordinal?",
    "options": [
      "Very dissatisfied to very satisfied",
      "Postcode",
      "Celsius temperature",
      "Parcel mass"
    ],
    "correct": 0,
    "explanation": "Ordinal categories are ordered but not guaranteed equally spaced. Postcodes are nominal identifiers, Celsius interval and mass ratio."
  },
  {
    "id": "q28",
    "topic": "Data types",
    "question": "Why is Celsius interval rather than ratio?",
    "options": [
      "Decimals are impossible",
      "It is a category",
      "It is manual",
      "Zero Celsius is not the absence of temperature"
    ],
    "correct": 3,
    "explanation": "Equal differences are meaningful but there is no true zero. 20°C is not twice as hot as 10°C on this scale."
  },
  {
    "id": "q29",
    "topic": "Data types",
    "question": "Which statement about ratio data is correct?",
    "options": [
      "It is always whole numbers",
      "A true zero makes ratios such as twice the mass meaningful",
      "It has no order",
      "Postcodes are ratio because they use digits"
    ],
    "correct": 1,
    "explanation": "Ratio has equal intervals and a meaningful zero. It can be continuous, like mass, or discrete, like order counts."
  },
  {
    "id": "q30",
    "topic": "Charts",
    "question": "Which chart best shows monthly revenue across one year?",
    "options": [
      "Pie",
      "Network diagram",
      "Line",
      "Unlabelled 3D chart"
    ],
    "correct": 2,
    "explanation": "A line chart emphasises change over ordered time. Pie charts show a small number of parts of one whole."
  },
  {
    "id": "q31",
    "topic": "Charts",
    "question": "Bars range from 96 to 100 but the axis starts at 95. What is the risk?",
    "options": [
      "Small differences look exaggerated",
      "All values look equal",
      "It proves false data",
      "Labels are unnecessary"
    ],
    "correct": 0,
    "explanation": "Bar length encodes magnitude, so truncated baselines can exaggerate differences. A zero baseline is normally appropriate for bars."
  },
  {
    "id": "q32",
    "topic": "Charts",
    "question": "A satisfaction score rises from 60% to 75%. What is the increase?",
    "options": [
      "15% relative only",
      "75 percentage points",
      "25 percentage points",
      "15 percentage points or 25% relative"
    ],
    "correct": 3,
    "explanation": "Difference: 75−60=15 percentage points. Relative change: 15/60 ×100=25%. State which measure you mean."
  },
  {
    "id": "q33",
    "topic": "Enterprise decisions",
    "question": "Which recommendation is best supported?",
    "options": [
      "Buy equipment because the chart looks busy",
      "Trial evening staff because mean waits are 12 minutes against a 5-minute target; review waits and cost",
      "Always choose the highest revenue",
      "Remove weak services immediately"
    ],
    "correct": 1,
    "explanation": "Link a specific action to numerical evidence and enterprise goals, then check outcomes and costs. A trial recognises uncertainty."
  },
  {
    "id": "q34",
    "topic": "Enterprise decisions",
    "question": "One branch has twice the complaints but ten times the orders. What helps compare performance?",
    "options": [
      "Font size",
      "Only complaint totals",
      "Complaint rate per order over the same period",
      "Branch name length"
    ],
    "correct": 2,
    "explanation": "Rates account for unequal exposure. Use compatible definitions and periods before comparing service quality."
  },
  {
    "id": "q35",
    "topic": "Dashboard UX",
    "question": "What helps users with colour vision differences?",
    "options": [
      "Labels or symbols alongside colour",
      "Red and green without labels",
      "Flashing colours",
      "Remove context"
    ],
    "correct": 0,
    "explanation": "Colour must not carry meaning alone. Labels, symbols, contrast and clear units help users interpret status."
  },
  {
    "id": "q36",
    "topic": "Dashboard UX",
    "question": "A user selects one week. What should update consistently?",
    "options": [
      "Only the heading",
      "Only the largest chart",
      "The background",
      "Relevant KPIs, charts and tables, with period shown"
    ],
    "correct": 3,
    "explanation": "Inconsistent filter scope misleads. Show selected period, definitions, sources and refresh information."
  },
  {
    "id": "q37",
    "topic": "Databases",
    "question": "Why use CustomerID as a primary key?",
    "options": [
      "It identifies the richest customer",
      "It uniquely identifies each customer record",
      "It must be a full name",
      "It puts all customers on one order"
    ],
    "correct": 1,
    "explanation": "Primary keys are unique and non-null. A foreign key in Orders can refer to a customer’s key."
  },
  {
    "id": "q38",
    "topic": "Databases",
    "question": "Which SQL retrieves North deliveries?",
    "options": [
      "SELECT North FROM Zone;",
      "GET * IN Deliveries IF North;",
      "SELECT * FROM Deliveries WHERE Zone = 'North';",
      "SELECT * WHERE Deliveries = North;"
    ],
    "correct": 2,
    "explanation": "SELECT chooses fields, FROM identifies the table and WHERE restricts records. SQL text literals commonly use single quotes."
  },
  {
    "id": "q39",
    "topic": "Security",
    "question": "A manager needs to read a dashboard but not edit customer data. What fits?",
    "options": [
      "View-only role-based access",
      "Administrator access for all",
      "One shared password",
      "No authentication"
    ],
    "correct": 0,
    "explanation": "Least privilege grants only needed permissions. Authentication verifies identity; authorisation determines allowed actions."
  },
  {
    "id": "q40",
    "topic": "Ethics",
    "question": "How should an enterprise use Indigenous community knowledge in a public map?",
    "options": [
      "Publish if it appears online",
      "Assume de-identification fixes every concern",
      "Treat all knowledge as freely reusable",
      "Work with the relevant community on authority, consent, uses and control"
    ],
    "correct": 3,
    "explanation": "ICIP and Indigenous data governance include collective rights, cultural protocols and control. Public availability is not automatic permission to republish or commercialise."
  },
  {
    "id": "q41",
    "topic": "System change",
    "question": "What is a balanced effect of automated stock ordering?",
    "options": [
      "It eliminates all errors",
      "It reduces manual work, but poor forecasts may cause overstock, requiring monitoring",
      "It never affects suppliers",
      "It only changes colours"
    ],
    "correct": 1,
    "explanation": "Explain a process change, a linked benefit, a specific risk and mitigation. Consider data quality, training, integration and fallback procedures."
  },
  {
    "id": "q42",
    "topic": "Data interpretation",
    "question": "Ice-cream sales and beach rescues rise together in summer. What can be concluded?",
    "options": [
      "Ice-cream causes rescues",
      "Rescues cause purchases",
      "They are associated; weather may influence both",
      "No relationship is possible"
    ],
    "correct": 2,
    "explanation": "Correlation is not proof of causation. A common factor such as heat may affect both; a causal claim needs more evidence."
  }
];
window.FLASHCARDS = [
  {
    "front": "Data versus information",
    "back": "Data are recorded facts; information is data processed and interpreted in context. Example: 120 orders becomes 20% more orders than last week.",
    "topic": "Foundations"
  },
  {
    "front": "Enterprise use of data",
    "back": "Evidence supports a defined objective such as reducing delays, with quality checks, context and safeguards.",
    "topic": "Foundations"
  },
  {
    "front": "Qualitative versus quantitative",
    "back": "Qualitative describes qualities or categories; quantitative measures or counts quantities. Numeric-looking IDs remain categorical.",
    "topic": "Data types"
  },
  {
    "front": "Nominal",
    "back": "Categories with no inherent order, such as zone or product type. Arithmetic on category codes is generally meaningless.",
    "topic": "Data types"
  },
  {
    "front": "Ordinal",
    "back": "Ordered categories without guaranteed equal gaps, such as low, medium and high satisfaction.",
    "topic": "Data types"
  },
  {
    "front": "Interval",
    "back": "Equal differences, but zero is not a true absence. Celsius is an example; 20°C is not twice 10°C.",
    "topic": "Data types"
  },
  {
    "front": "Ratio",
    "back": "Equal intervals and true zero, such as kilograms or order counts. Meaningful ratios are possible.",
    "topic": "Data types"
  },
  {
    "front": "Primary versus secondary",
    "back": "Primary is collected for this investigation; secondary is reused from another purpose. Neither is automatically better.",
    "topic": "Collection"
  },
  {
    "front": "Active versus passive",
    "back": "Active requests responses such as a survey; passive records observation or normal activity such as checkout logs. Both need ethical safeguards.",
    "topic": "Collection"
  },
  {
    "front": "Manual versus computerised",
    "back": "Manual recording uses people; computerised recording uses digital systems. This is separate from active/passive.",
    "topic": "Collection"
  },
  {
    "front": "Accuracy",
    "back": "Closeness to the true or accepted value. Check records, units, calculations and instrument calibration.",
    "topic": "Data quality"
  },
  {
    "front": "Reliability",
    "back": "Consistency under comparable repeated conditions. A miscalibrated instrument can be reliable but inaccurate.",
    "topic": "Data quality"
  },
  {
    "front": "Validity",
    "back": "Whether a method measures its intended concept. Asking about food preference does not directly measure queue time.",
    "topic": "Data quality"
  },
  {
    "front": "Relevance",
    "back": "Fit to the question, population, period and context. Accurate old data may be irrelevant now.",
    "topic": "Data quality"
  },
  {
    "front": "Large samples and bias",
    "back": "More records from the same biased process do not fix systematic exclusion. Improve representativeness.",
    "topic": "Sampling"
  },
  {
    "front": "Relative and absolute references",
    "back": "=B2 changes when copied; =$B$2 locks both parts. $B2 locks the column, B$2 the row.",
    "topic": "Excel"
  },
  {
    "front": "AVERAGEIF",
    "back": "=AVERAGEIF(criteria_range, criterion, average_range). Test labels and average corresponding measurements.",
    "topic": "Excel"
  },
  {
    "front": "COUNTIF",
    "back": "=COUNTIF(range, criterion), for example =COUNTIF(D2:D21,\">5\"). Count matching cells.",
    "topic": "Excel"
  },
  {
    "front": "SUMIF",
    "back": "=SUMIF(criteria_range, criterion, sum_range). Add matching numeric values.",
    "topic": "Excel"
  },
  {
    "front": "IF",
    "back": "=IF(logical_test, value_if_true, value_if_false). Check below, at and above boundaries.",
    "topic": "Excel"
  },
  {
    "front": "Exact VLOOKUP",
    "back": "=VLOOKUP(value, table, column_index, FALSE). IDs must be in the table’s first column.",
    "topic": "Excel"
  },
  {
    "front": "INDEX and MATCH",
    "back": "=INDEX(return_range,MATCH(value,lookup_range,0)). MATCH finds a position; INDEX returns that position’s value.",
    "topic": "Excel"
  },
  {
    "front": "Filtered total trap",
    "back": "SUM includes filtered-out rows. SUBTOTAL(109,range) sums visible cells and excludes manually hidden rows too.",
    "topic": "Excel"
  },
  {
    "front": "Pivot table",
    "back": "Groups records and aggregates values, such as mean delay by zone. Verify Sum, Count or Average in Values.",
    "topic": "Excel"
  },
  {
    "front": "Chart choice",
    "back": "Line for time, bar for categories, scatter for numeric relationships, pie for a few parts of a whole, map for geography.",
    "topic": "Visualisation"
  },
  {
    "front": "Percentage points versus percent",
    "back": "60% to 75% is +15 percentage points; relative increase is 15/60 ×100 =25%.",
    "topic": "Interpretation"
  },
  {
    "front": "Strong recommendation",
    "back": "Action + relevant figures + link to enterprise goal + limitation + practical review.",
    "topic": "Enterprise"
  },
  {
    "front": "Strong limitation answer",
    "back": "Identify a specific limitation, explain how it could distort this decision, and propose targeted additional evidence.",
    "topic": "Enterprise"
  },
  {
    "front": "Primary and foreign keys",
    "back": "A primary key uniquely identifies a record. A foreign key refers to a key in another table to link records.",
    "topic": "Databases"
  },
  {
    "front": "Authentication versus authorisation",
    "back": "Authentication verifies identity; authorisation sets permissions. Encryption protects confidentiality; tested backups enable recovery.",
    "topic": "Security"
  },
  {
    "front": "ICIP and Indigenous data",
    "back": "Respect relevant community authority, consent, cultural protocols, control and permitted uses. Online availability is not blanket reuse permission.",
    "topic": "Ethics"
  },
  {
    "front": "System-change explanation",
    "back": "Technology → changed process → enterprise benefit → risk or cost → mitigation or evaluation.",
    "topic": "Enterprise"
  }
];
window.MOCKS = [
  {
    "id": "dispatch",
    "title": "Mock 1 · Harbour Dispatch",
    "scenario": "Original fictional revision scenario. Harbour Dispatch wants to reduce delays. The 20 orders below cover two weekday mornings. Delay_minutes means minutes later than the promised time. Each row is one order. Use all records unless asked to filter. Within limit means a delay of at most five minutes. The dashboard is a separate longer-period summary. This is not your actual assessment.",
    "headers": [
      "OrderID",
      "Zone",
      "Parcels",
      "Delay_minutes",
      "Revenue",
      "Customer_rating"
    ],
    "rows": [
      [
        "D101",
        "North",
        4,
        3,
        48,
        4
      ],
      [
        "D102",
        "South",
        3,
        8,
        39,
        3
      ],
      [
        "D103",
        "East",
        5,
        6,
        65,
        4
      ],
      [
        "D104",
        "West",
        2,
        2,
        28,
        5
      ],
      [
        "D105",
        "North",
        6,
        7,
        72,
        3
      ],
      [
        "D106",
        "South",
        4,
        4,
        52,
        4
      ],
      [
        "D107",
        "East",
        3,
        10,
        42,
        3
      ],
      [
        "D108",
        "West",
        5,
        5,
        60,
        4
      ],
      [
        "D109",
        "North",
        2,
        2,
        26,
        5
      ],
      [
        "D110",
        "South",
        7,
        9,
        84,
        3
      ],
      [
        "D111",
        "East",
        4,
        4,
        50,
        4
      ],
      [
        "D112",
        "West",
        6,
        7,
        78,
        3
      ],
      [
        "D113",
        "North",
        3,
        6,
        38,
        4
      ],
      [
        "D114",
        "South",
        5,
        3,
        64,
        5
      ],
      [
        "D115",
        "East",
        2,
        8,
        30,
        3
      ],
      [
        "D116",
        "West",
        4,
        4,
        49,
        4
      ],
      [
        "D117",
        "North",
        6,
        5,
        74,
        3
      ],
      [
        "D118",
        "South",
        3,
        6,
        41,
        4
      ],
      [
        "D119",
        "East",
        5,
        3,
        62,
        5
      ],
      [
        "D120",
        "West",
        7,
        9,
        88,
        3
      ]
    ],
    "summary": [
      {
        "Zone": "North",
        "Mean delay (min)": 4.6
      },
      {
        "Zone": "South",
        "Mean delay (min)": 6
      },
      {
        "Zone": "East",
        "Mean delay (min)": 6.2
      },
      {
        "Zone": "West",
        "Mean delay (min)": 5.4
      }
    ],
    "chart": {
      "labels": [
        "North",
        "South",
        "East",
        "West"
      ],
      "values": [
        4.6,
        6,
        6.2,
        5.4
      ],
      "title": "Mean delay by zone: sampled orders",
      "unit": "minutes"
    },
    "dashboard": {
      "title": "Six-week operations dashboard",
      "headers": [
        "Zone",
        "Orders",
        "Late orders",
        "Revenue ($)",
        "Mean delay (min)"
      ],
      "rows": [
        [
          "North",
          600,
          150,
          7800,
          7.2
        ],
        [
          "South",
          1200,
          240,
          15000,
          6.1
        ],
        [
          "East",
          500,
          75,
          6400,
          4.8
        ],
        [
          "West",
          800,
          80,
          10200,
          3.5
        ]
      ],
      "context": "Fictional six weeks ending 30 November. Late means over five minutes. Gross revenue is not profit. Driver costs, route distances and peak-hour patterns are missing. The spreadsheet is a small morning sample; this dashboard covers a longer period. Do not assume the populations are identical."
    },
    "questions": [
      {
        "id": "A1",
        "section": "A",
        "marks": 2,
        "prompt": "Filter Zone to North and Delay_minutes to greater than 5. Give the count and matching IDs.",
        "answer": "2 orders: D105, D113.",
        "working": "Suggested practice rubric, not official: 1 mark for correct selection/count; 1 for all IDs. Conditions combine as AND. Clear filters afterwards."
      },
      {
        "id": "A2",
        "section": "A",
        "marks": 4,
        "prompt": "Using all records, write AVERAGEIF for mean North delay. Give the result and explain the ranges.",
        "answer": "=AVERAGEIF(B2:B21,\"North\",D2:D21) returns 4.6 minutes. B contains zones; D contains delays.",
        "working": "Suggested practice rubric, not official: 2 marks for aligned formula and criterion; 1 for result; 1 for explanation. North delays 3,7,2,6,5 sum to 23; divide by 5 =4.6."
      },
      {
        "id": "A3",
        "section": "A",
        "marks": 2,
        "prompt": "Calculate total sample revenue with a formula and state the result.",
        "answer": "=SUM(E2:E21) returns $1,090.00.",
        "working": "Suggested practice rubric, not official: 1 mark for correct function/range; 1 for dollar result. SUM includes filtered-out rows."
      },
      {
        "id": "A4",
        "section": "A",
        "marks": 4,
        "prompt": "In G2 use IF to label delays of five minutes or less \"Within limit\", otherwise \"Over limit\". Give D101 and D105 results and a boundary test.",
        "answer": "=IF(D2<=5,\"Within limit\",\"Over limit\"). D101: Within limit. D105: Over limit. A delay of exactly 5 must return Within limit.",
        "working": "Suggested practice rubric, not official: 2 marks for syntax and inclusive condition; 1 for both labels; 1 for testing the boundary. Also test 4 and 6."
      },
      {
        "id": "A5",
        "section": "A",
        "marks": 4,
        "prompt": "Use exact-match VLOOKUP to return revenue for D110. State the result and explain 5 and FALSE.",
        "answer": "=VLOOKUP(\"D110\",A2:F21,5,FALSE) returns $84. Five selects Revenue within A:F; FALSE requires an exact ID match.",
        "working": "Suggested practice rubric, not official: 2 marks for valid formula; 1 for result; 1 for both argument explanations."
      },
      {
        "id": "A6",
        "section": "A",
        "marks": 2,
        "prompt": "J2 holds a 10% fuel levy as 0.10. In H2 write revenue including levy, safe to copy down.",
        "answer": "=E2*(1+$J$2). D101 returns $52.80.",
        "working": "Suggested practice rubric, not official: 1 mark for increase; 1 for locking J2. =E2*$J$2 calculates only the levy, not the total."
      },
      {
        "id": "A7",
        "section": "A",
        "marks": 2,
        "prompt": "Use COUNTIF to count delays greater than five minutes. Give the count.",
        "answer": "=COUNTIF(D2:D21,\">5\") returns 10.",
        "working": "Suggested practice rubric, not official: 1 mark for range/criterion; 1 for count. Exactly five is excluded."
      },
      {
        "id": "A8",
        "section": "A",
        "marks": 4,
        "prompt": "Read the mean-delay chart: identify highest and lowest zones, calculate their gap, and give a careful interpretation.",
        "answer": "East: 6.2 minutes (highest). North: 4.6 minutes (lowest). Gap: 1.6 minutes. Investigate the higher-delay zone, but the short sample cannot establish cause or represent every shift.",
        "working": "Suggested practice rubric, not official: 1 mark for zones; 1 for figures; 1 for gap with unit; 1 for supported qualified interpretation."
      },
      {
        "id": "B1",
        "section": "B",
        "marks": 4,
        "prompt": "From the six-week dashboard compare North and South late-order rates. Explain why raw counts alone could mislead.",
        "answer": "North: 150/600 ×100 =25%. South: 240/1200 ×100 =20%. North is worse by 5 percentage points despite fewer late orders. South handled twice the volume.",
        "working": "Suggested practice rubric, not official: 1 mark per rate; 1 for correct rate comparison; 1 for volume explanation. A percentage-point gap is not a relative percent change."
      },
      {
        "id": "B2",
        "section": "B",
        "marks": 4,
        "prompt": "Recommend one operational action using at least two dashboard figures. Explain the enterprise benefit.",
        "answer": "Trial extra dispatch support or revised routing in North at peak times. Its late rate is 25% against West’s 10%, and its mean delay is 7.2 minutes against 3.5. A focused trial could improve reliability and reduce late deliveries. Check costs and performance before expanding.",
        "working": "Suggested practice rubric, not official: 1 mark for specific feasible action; 1 for figures; 1 for linking evidence to action; 1 for enterprise benefit. Other justified actions can earn credit."
      },
      {
        "id": "B3",
        "section": "B",
        "marks": 4,
        "prompt": "Explain a limitation affecting the recommendation and identify additional data to collect.",
        "answer": "Route distances, staffing costs and hourly demand are missing. North may have longer routes, so extra staff might not address the cause and could reduce profit. Collect delays by route and time plus driver hours and costs before choosing staffing or routing changes.",
        "working": "Suggested practice rubric, not official: 1 mark for specific limitation; 1 for interpretation effect; 1 for decision consequence; 1 for targeted additional evidence."
      },
      {
        "id": "B4",
        "section": "B",
        "marks": 4,
        "prompt": "AI-assisted route scheduling is proposed. Explain a process change, operational benefit, risk and response.",
        "answer": "Software could combine orders, road conditions and capacity to sequence stops, reducing planning work and travel time. Incomplete addresses or unrealistic travel estimates could create delays. Train dispatchers, retain manual override and fallback schedules, and trial it while monitoring late-order rate and cost per delivery.",
        "working": "Suggested practice rubric, not official: 1 mark for changed workflow; 1 for linked benefit; 1 for specific risk; 1 for mitigation or review. AI does not guarantee improvement."
      }
    ],
    "rubricNote": "Original revision mock; suggested practice marking guide, not an official marking scheme. Complete independently with notes and solutions closed. In the actual supervised assessment use only resources expressly authorised by your teacher."
  },
  {
    "id": "fitness",
    "title": "Mock 2 · Summit Fitness",
    "scenario": "Original fictional revision scenario. Summit Fitness is reviewing demand. Each row is one session in a two-week sample. Bookings counts reservations, not confirmed attendance. Revenue is gross booking revenue before refunds, wages and other costs. Use all 20 records unless instructed otherwise. Strong demand means bookings at least 80% of capacity. The dashboard is a separate six-week summary.",
    "headers": [
      "SessionID",
      "Class",
      "Trainer",
      "Bookings",
      "Capacity",
      "Revenue"
    ],
    "rows": [
      [
        "F101",
        "Yoga",
        "Alex",
        16,
        20,
        192
      ],
      [
        "F102",
        "HIIT",
        "Sam",
        18,
        24,
        270
      ],
      [
        "F103",
        "Strength",
        "Jamie",
        20,
        24,
        360
      ],
      [
        "F104",
        "Yoga",
        "Alex",
        14,
        20,
        168
      ],
      [
        "F105",
        "HIIT",
        "Sam",
        15,
        24,
        225
      ],
      [
        "F106",
        "Yoga",
        "Jamie",
        18,
        20,
        216
      ],
      [
        "F107",
        "HIIT",
        "Alex",
        20,
        24,
        300
      ],
      [
        "F108",
        "Strength",
        "Sam",
        22,
        24,
        396
      ],
      [
        "F109",
        "Yoga",
        "Jamie",
        16,
        20,
        192
      ],
      [
        "F110",
        "HIIT",
        "Alex",
        17,
        24,
        255
      ],
      [
        "F111",
        "Yoga",
        "Sam",
        12,
        20,
        144
      ],
      [
        "F112",
        "HIIT",
        "Jamie",
        16,
        24,
        240
      ],
      [
        "F113",
        "Strength",
        "Alex",
        24,
        24,
        432
      ],
      [
        "F114",
        "Yoga",
        "Sam",
        18,
        20,
        216
      ],
      [
        "F115",
        "HIIT",
        "Jamie",
        19,
        24,
        285
      ],
      [
        "F116",
        "Yoga",
        "Alex",
        14,
        20,
        168
      ],
      [
        "F117",
        "HIIT",
        "Sam",
        18,
        24,
        270
      ],
      [
        "F118",
        "Strength",
        "Jamie",
        20,
        24,
        360
      ],
      [
        "F119",
        "Yoga",
        "Alex",
        20,
        20,
        240
      ],
      [
        "F120",
        "HIIT",
        "Sam",
        15,
        24,
        225
      ]
    ],
    "summary": [
      {
        "Class": "Yoga",
        "Mean occupancy (%)": 80.0
      },
      {
        "Class": "HIIT",
        "Mean occupancy (%)": 71.88
      },
      {
        "Class": "Strength",
        "Mean occupancy (%)": 89.58
      }
    ],
    "chart": {
      "labels": [
        "Yoga",
        "HIIT",
        "Strength"
      ],
      "values": [
        80.0,
        71.88,
        89.58
      ],
      "title": "Mean booking occupancy by class",
      "unit": "% of capacity"
    },
    "dashboard": {
      "title": "Six-week class review",
      "headers": [
        "Class",
        "Sessions",
        "Bookings",
        "Available places",
        "Waitlist requests",
        "Revenue ($)"
      ],
      "rows": [
        [
          "Yoga",
          30,
          420,
          600,
          8,
          5040
        ],
        [
          "HIIT",
          30,
          540,
          720,
          14,
          8100
        ],
        [
          "Strength",
          30,
          660,
          720,
          72,
          11880
        ]
      ],
      "context": "Fictional six weeks ending 30 November. Bookings can include no-shows. Waitlist requests may repeat the same person. Costs, equipment constraints and availability by time are missing. The spreadsheet covers a shorter period, so its means need not equal these six-week rates."
    },
    "questions": [
      {
        "id": "A1",
        "section": "A",
        "marks": 2,
        "prompt": "Filter Class to Yoga and Bookings to at least 15. Give count and matching IDs.",
        "answer": "5 sessions: F101, F106, F109, F114, F119.",
        "working": "Suggested practice rubric, not official: 1 mark for correct selection/count; 1 for complete IDs. At least includes equality. Clear filters afterwards."
      },
      {
        "id": "A2",
        "section": "A",
        "marks": 4,
        "prompt": "Use AVERAGEIF to calculate mean Yoga bookings. Give the result and explain the ranges.",
        "answer": "=AVERAGEIF(B2:B21,\"Yoga\",D2:D21) returns 16.00. B has class labels; D has corresponding booking counts.",
        "working": "Suggested practice rubric, not official: 2 marks for aligned formula; 1 for result; 1 for explaining ranges. Means can be fractional even when individual counts are whole numbers."
      },
      {
        "id": "A3",
        "section": "A",
        "marks": 2,
        "prompt": "Use a formula to calculate total gross revenue in the sample.",
        "answer": "=SUM(F2:F21) returns $5,154.00.",
        "working": "Suggested practice rubric, not official: 1 mark for formula/range; 1 for dollar total. Gross revenue is not profit."
      },
      {
        "id": "A4",
        "section": "A",
        "marks": 4,
        "prompt": "In G2 label occupancy of at least 80% \"Strong demand\", otherwise \"Review\". Give F101 and F102 labels and a boundary test.",
        "answer": "=IF(D2/E2>=0.8,\"Strong demand\",\"Review\"). F101: Strong demand (16/20 =80%). F102: Review (18/24 =75%). Exactly 80% must return Strong demand.",
        "working": "Suggested practice rubric, not official: 2 marks for ratio and inclusive IF; 1 for labels; 1 for boundary. Do not compare raw bookings to 80."
      },
      {
        "id": "A5",
        "section": "A",
        "marks": 4,
        "prompt": "Use exact VLOOKUP to find revenue for F109. Give the result and explain 6 and FALSE.",
        "answer": "=VLOOKUP(\"F109\",A2:F21,6,FALSE) returns $192.00. Six selects Revenue within A:F; FALSE requires the exact ID.",
        "working": "Suggested practice rubric, not official: 2 marks for correct lookup formula; 1 for result; 1 for explanations."
      },
      {
        "id": "A6",
        "section": "A",
        "marks": 2,
        "prompt": "J2 holds a 5% price increase as 0.05. In H2 write projected revenue with unchanged bookings and a safe reference to copy down.",
        "answer": "=F2*(1+$J$2). F101 projects $201.60. This assumes bookings are unchanged by higher prices.",
        "working": "Suggested practice rubric, not official: 1 mark for applying increase; 1 for absolute $J$2. The unchanged-bookings assumption limits the projection."
      },
      {
        "id": "A7",
        "section": "A",
        "marks": 2,
        "prompt": "Use COUNTIF to count sessions with at least 18 bookings. Give its result.",
        "answer": "=COUNTIF(D2:D21,\">=18\") returns 11 sessions.",
        "working": "Suggested practice rubric, not official: 1 mark for range/criterion; 1 for count. Eighteen is included."
      },
      {
        "id": "A8",
        "section": "A",
        "marks": 4,
        "prompt": "Use the occupancy chart: identify highest and lowest classes, calculate the gap and give a careful interpretation.",
        "answer": "Strength: 89.58% (highest). HIIT: 71.88% (lowest). Gap: 17.70 percentage points from displayed chart values (about 17.71 using unrounded means). Strength looks most heavily booked, but reservations alone do not establish attendance or profitability.",
        "working": "Suggested practice rubric, not official: 1 mark for classes; 1 for figures; 1 for percentage-point gap; 1 for interpretation. Reasonable rounding is acceptable."
      },
      {
        "id": "B1",
        "section": "B",
        "marks": 4,
        "prompt": "Calculate six-week Yoga and Strength booking occupancy. Compare demand using the dashboard.",
        "answer": "Yoga: 420/600 ×100 =70%. Strength: 660/720 ×100 =91.67%. Strength is 21.67 percentage points higher. Its 72 waitlist requests versus Yoga’s 8 also indicate capacity pressure, but may not represent unique people.",
        "working": "Suggested practice rubric, not official: 1 mark per rate; 1 for percentage-point comparison; 1 for supported interpretation."
      },
      {
        "id": "B2",
        "section": "B",
        "marks": 4,
        "prompt": "Recommend a timetable action using two dashboard figures and explain a likely enterprise benefit.",
        "answer": "Trial an extra Strength session at a suitable time. Its 660 bookings for 720 places give 91.67% occupancy, with 72 waitlist requests. Additional capacity could improve access and gross revenue. Confirm trainer and equipment availability, then review attendance and net contribution after the trial.",
        "working": "Suggested practice rubric, not official: 1 mark for action; 1 for figures; 1 for linking evidence; 1 for benefit. Revenue alone cannot establish profit."
      },
      {
        "id": "B3",
        "section": "B",
        "marks": 4,
        "prompt": "Explain a limitation that could change the timetable decision and suggest an appropriate further check.",
        "answer": "Bookings do not show actual attendance and waitlist requests may duplicate members. Unmet demand could be overstated. Check unique member requests and check-in attendance by time; ask affected members which alternatives they could attend before adding recurring sessions.",
        "working": "Suggested practice rubric, not official: 1 mark for limitation; 1 for effect on measure; 1 for decision consequence; 1 for targeted check. A cost limitation is also valid if explained."
      },
      {
        "id": "B4",
        "section": "B",
        "marks": 4,
        "prompt": "Explain how integrated booking/check-in and automated waitlist offers could affect operations. Include benefit, risk and response.",
        "answer": "Check-ins distinguish attendance from reservations, while automatic offers can fill cancelled places with less staff administration. Wrong contact details, duplicates or outages could cause missed offers or double bookings. Validate IDs, set expiry rules, train staff and keep a manual fallback. Review no-show rate, filled cancellations and handling time.",
        "working": "Suggested practice rubric, not official: 1 mark for changed process; 1 for linked benefit; 1 for specific risk; 1 for mitigation or monitoring."
      }
    ],
    "rubricNote": "Original revision mock; suggested practice marking guide, not an official marking scheme. Complete independently with notes and solutions closed. In the actual supervised assessment use only resources expressly authorised by your teacher."
  }
];
